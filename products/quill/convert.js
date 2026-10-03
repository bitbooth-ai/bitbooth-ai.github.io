const TEXT = 0, WS = 1, ATOM = 2, CODE = 3;
const BOLD = 1, ITALIC = 2, STRIKE = 4;
const MARK = { 1: '**', 2: '*', 4: '~~' };
const OPEN_TAG = { 1: '<strong>', 2: '<em>', 4: '<del>' };
const CLOSE_TAG = { 1: '</strong>', 2: '</em>', 4: '</del>' };
const BR = '';
const BR_ALL = //g;

const BLOCK = new Set([
  'address', 'article', 'aside', 'blockquote', 'body', 'caption', 'center', 'dd', 'details',
  'dialog', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'html', 'legend', 'li', 'main',
  'menu', 'nav', 'ol', 'p', 'pre', 'section', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th',
  'thead', 'tr', 'ul',
]);
const BLOCK_SELECTOR = [...BLOCK].filter(t => t !== 'body' && t !== 'html').join(',');
const PARAGRAPH = new Set(['p', 'caption', 'figcaption', 'summary', 'legend', 'dt', 'address']);
const SKIP = new Set([
  'script', 'style', 'head', 'meta', 'link', 'title', 'noscript', 'template', 'iframe', 'object',
  'embed', 'canvas', 'audio', 'video', 'select', 'button', 'textarea', 'svg', 'math', 'rp',
  'o:p', 'v:shape', 'v:shapetype', 'v:imagedata', 'xml',
]);
const ITALIC_TAGS = new Set(['i', 'em', 'cite', 'dfn', 'var']);
const CODE_TAGS = new Set(['code', 'kbd', 'samp', 'tt']);
const STRIKE_TAGS = new Set(['s', 'del', 'strike']);

const HIDDEN_STYLE = /display\s*:\s*none|mso-hide\s*:\s*all/i;
const BOLD_STYLE = /font-weight\s*:\s*(?:bold|[6-9]00)/i;
const NORMAL_STYLE = /font-weight\s*:\s*(?:normal|[1-5]00)/i;
const ITALIC_STYLE = /font-style\s*:\s*italic/i;
const STRIKE_STYLE = /text-decoration[^;]*line-through/i;
const SUPER_STYLE = /vertical-align\s*:\s*(super|sub)/i;
const PRE_STYLE = /white-space\s*:\s*pre/i;
const FIRST_FONT = /font-family\s*:\s*["']?([^,;"']+)/i;
const MONO_FONT = /mono|courier|consolas|menlo|monaco|cascadia|inconsolata|fixedsys|terminal/i;
const LANG_CLASS = /(?:^|\s)(?:lang(?:uage)?-|highlight-source-)([\w#+.-]+)/;

const INVISIBLE = /[​﻿­]/g;
const SPACES = /[ \t\n\r\f ]+/g;
const SPECIAL = /[\\`*_[\]<&~|]/;
const SPECIAL_ALL = /[\\`*_[\]<&~|]/g;
const ASCII_PUNCT = /[!-/:-@[-`{-~]/;
const WORD_CHAR = /[\p{L}\p{N}]/u;
const PUNCT = /[\p{P}\p{S}]/u;
const TRAILING_PUNCT = /([\p{L}\p{N}])([!-[\]-`{-~]+)$/u;
const LEADING_PUNCT = /^([!-[\]-`{-~]+)(?=[\p{L}\p{N}])/u;
const ENTITY = /^&(?:#\d+|#x[\da-f]+|\w+);/i;

let inLink = 0;
let inCell = false;

function monospace(style) {
  const m = FIRST_FONT.exec(style);
  return m !== null && MONO_FONT.test(m[1]);
}

function escapeText(t) {
  if (!SPECIAL.test(t)) return t;
  return t.replace(SPECIAL_ALL, (ch, i) => {
    const prev = t[i - 1], next = t[i + 1];
    switch (ch) {
      case '\\': return next === undefined || ASCII_PUNCT.test(next) ? '\\\\' : ch;
      case '*':
      case '~': return prev === ' ' && next === ' ' ? ch : '\\' + ch;
      case '_': return prev && next && WORD_CHAR.test(prev) && WORD_CHAR.test(next) ? ch : '\\_';
      case ']': return inLink ? '\\]' : ch;
      case '<': return next && /[A-Za-z/!?]/.test(next) ? '\\<' : ch;
      case '&': return ENTITY.test(t.slice(i, i + 12)) ? '\\&' : ch;
      case '|': return inCell ? '\\|' : ch;
      default: return '\\' + ch;
    }
  });
}

function escapeLineStart(l) {
  const c = l.charCodeAt(0);
  if (c === 35) return /^#{1,6}(?:\s|$)/.test(l) ? '\\' + l : l;
  if (c === 62) return '\\' + l;
  if (c === 43 || c === 45 || c === 61) {
    return /^(?:[-+](?:\s|$)|=+\s*$|-+\s*$)/.test(l) ? '\\' + l : l;
  }
  if (c >= 48 && c <= 57) {
    const m = /^\d{1,9}(?=[.)](?:\s|$))/.exec(l);
    if (m) return m[0] + '\\' + l.slice(m[0].length);
  }
  return l;
}

function unwrapUrl(href) {
  try {
    if (/^https:\/\/[^/]*safelinks\.protection\.outlook\.com\//i.test(href)) {
      return new URL(href).searchParams.get('url') || href;
    }
    if (/^https?:\/\/(?:www\.)?google\.[a-z.]+\/url\?/i.test(href)) {
      return new URL(href).searchParams.get('q') || href;
    }
  } catch {}
  return href;
}

function destination(url) {
  url = url.trim().replace(/[ \t\n\r]/g, c => c === ' ' ? '%20' : '').replace(/</g, '%3C').replace(/>/g, '%3E');
  if (inCell) url = url.replace(/\|/g, '%7C');
  let depth = 0, balanced = true;
  for (let i = 0; i < url.length && balanced; i++) {
    const c = url[i];
    if (c === '(') depth++;
    else if (c === ')' && --depth < 0) balanced = false;
  }
  if (!balanced || depth !== 0) url = url.replace(/\(/g, '%28').replace(/\)/g, '%29');
  return url;
}

function codeSpan(raw) {
  let longest = 0, run = 0;
  for (let i = 0; i < raw.length; i++) {
    if (raw[i] === '`') { if (++run > longest) longest = run; } else run = 0;
  }
  const fence = '`'.repeat(longest + 1);
  const pad = raw[0] === '`' || raw[raw.length - 1] === '`' ||
    (raw[0] === ' ' && raw[raw.length - 1] === ' ') ? ' ' : '';
  if (inCell) raw = raw.replace(/\|/g, '\\|');
  return fence + pad + raw + pad + fence;
}

function pushText(runs, data, f) {
  const t = data.replace(INVISIBLE, '').replace(SPACES, ' ');
  if (t === '') return;
  if (t === ' ') { runs.push({ k: WS, t, f }); return; }
  const lead = t[0] === ' ', trail = t[t.length - 1] === ' ';
  if (lead) runs.push({ k: WS, t: ' ', f });
  runs.push({ k: TEXT, t: escapeText(t.slice(lead ? 1 : 0, trail ? -1 : undefined)), f });
  if (trail) runs.push({ k: WS, t: ' ', f });
}

function pushCode(runs, text, f) {
  const t = text.replace(INVISIBLE, '').replace(SPACES, ' ');
  if (t === '') return;
  const core = t.trim();
  if (core === '') { runs.push({ k: WS, t: ' ', f }); return; }
  if (t[0] === ' ') runs.push({ k: WS, t: ' ', f });
  runs.push({ k: CODE, t: core, f });
  if (t[t.length - 1] === ' ') runs.push({ k: WS, t: ' ', f });
}

function collectChildren(el, f, runs) {
  for (let c = el.firstChild; c !== null; c = c.nextSibling) collect(c, f, runs);
}

function collect(node, f, runs) {
  if (node.nodeType === 3) { pushText(runs, node.data, f); return; }
  if (node.nodeType !== 1) return;
  const tag = node.localName;
  if (SKIP.has(tag)) return;
  const style = node.getAttribute('style');
  if (style !== null && HIDDEN_STYLE.test(style)) return;

  switch (tag) {
    case 'br': runs.push({ k: WS, t: inLink ? ' ' : BR, f }); return;
    case 'wbr': return;
    case 'img': image(node, f, runs); return;
    case 'a': link(node, f, runs); return;
    case 'input':
      if (node.getAttribute('type') === 'checkbox') {
        runs.push({ k: ATOM, t: node.hasAttribute('checked') ? '[x]' : '[ ]', f }, { k: WS, t: ' ', f });
      }
      return;
    case 'sup': case 'sub':
      runs.push({ k: ATOM, t: `<${tag}>`, f });
      collectChildren(node, f, runs);
      runs.push({ k: ATOM, t: `</${tag}>`, f });
      return;
  }
  if (CODE_TAGS.has(tag) || (style !== null && monospace(style))) {
    pushCode(runs, node.textContent, f);
    return;
  }

  let g = f;
  if (tag === 'b' || tag === 'strong') {
    if (style === null || !NORMAL_STYLE.test(style)) g |= BOLD;
  } else if (ITALIC_TAGS.has(tag)) g |= ITALIC;
  else if (STRIKE_TAGS.has(tag)) g |= STRIKE;
  if (style !== null) {
    if (BOLD_STYLE.test(style)) g |= BOLD;
    if (ITALIC_STYLE.test(style)) g |= ITALIC;
    if (STRIKE_STYLE.test(style)) g |= STRIKE;
    const sup = SUPER_STYLE.exec(style);
    if (sup !== null) {
      const t = sup[1].toLowerCase() === 'super' ? 'sup' : 'sub';
      runs.push({ k: ATOM, t: `<${t}>`, f });
      collectChildren(node, g, runs);
      runs.push({ k: ATOM, t: `</${t}>`, f });
      return;
    }
  }

  if (tag === 'q') {
    runs.push({ k: TEXT, t: '"', f: g });
    collectChildren(node, g, runs);
    runs.push({ k: TEXT, t: '"', f: g });
  } else if (BLOCK.has(tag)) {
    const br = { k: WS, t: inLink ? ' ' : BR, f };
    runs.push(br);
    collectChildren(node, g, runs);
    runs.push(br);
  } else {
    collectChildren(node, g, runs);
  }
}

function image(el, f, runs) {
  const src = (el.getAttribute('src') || '').trim();
  if (src === '' || /^(?:data|file|blob|cid|about|javascript):/i.test(src)) return;
  if (el.getAttribute('width') === '1' && el.getAttribute('height') === '1') return;
  const alt = (el.getAttribute('alt') || '').replace(SPACES, ' ').trim().replace(/[\\[\]]/g, '\\$&');
  runs.push({ k: ATOM, t: `![${alt}](${destination(src)})`, f });
}

function link(el, f, runs) {
  const href = el.getAttribute('href');
  if (inLink || href === null || /^\s*(?:javascript:|$)/i.test(href)) {
    collectChildren(el, f, runs);
    return;
  }
  const url = unwrapUrl(href.trim());
  const inner = [];
  inLink++;
  collectChildren(el, f, inner);
  inLink--;
  const text = emit(inner, f).replace(SPACES, ' ');
  const core = text.trim();
  if (text[0] === ' ') runs.push({ k: WS, t: ' ', f });
  const plain = el.textContent.replace(SPACES, ' ').trim();
  const autolink = /^[a-z][a-z\d+.-]{1,31}:[^\s<>]*$/i.test(url);
  if (core === '') {
    if (autolink) runs.push({ k: ATOM, t: `<${url}>`, f });
  } else if (autolink && (plain === url || plain === href.trim())) {
    runs.push({ k: ATOM, t: inCell ? `<${url.replace(/\|/g, '%7C')}>` : `<${url}>`, f });
  } else if (/^mailto:/i.test(url) && url.slice(7) === plain && /^[^\s@<>]+@[^\s@<>]+$/.test(plain)) {
    runs.push({ k: ATOM, t: `<${plain}>`, f });
  } else {
    runs.push({ k: ATOM, t: `[${core}](${destination(url)})`, f });
  }
  if (text.length > 1 && text[text.length - 1] === ' ') runs.push({ k: WS, t: ' ', f });
}

function emit(runs, base) {
  let s = '', ws = '', have = 0, lastText = false;
  const stack = [];
  for (let i = 0; i < runs.length; i++) {
    const r = runs[i];
    if (r.k === WS) { ws += r.t; continue; }
    let t = r.t;
    if (r.k === CODE) {
      while (i + 1 < runs.length && runs[i + 1].k === CODE && runs[i + 1].f === r.f) t += runs[++i].t;
      t = codeSpan(t);
    }
    const want = r.f & ~base;
    const breakAll = ws.indexOf(BR) !== ws.lastIndexOf(BR);
    if (want !== have || breakAll) {
      let j = 0;
      if (!breakAll) while (j < stack.length && (want & stack[j].bit)) j++;
      if (j < stack.length) s = close(s, stack, j, lastText && ws === '' && WORD_CHAR.test(t[0]), ws === '' ? t[0] : ' ');
      for (let k = j; k < stack.length; k++) have &= ~stack[k].bit;
      stack.length = j;
      s += ws;
      const bits = [];
      for (const bit of [BOLD, ITALIC, STRIKE]) if ((want & bit) && !(have & bit)) bits.push(bit);
      if (bits.length) {
        let html = false;
        if (s !== '' && WORD_CHAR.test(s[s.length - 1]) && PUNCT.test(t[0])) {
          const m = r.k === TEXT ? LEADING_PUNCT.exec(t) : null;
          if (m !== null) { s += m[1]; t = t.slice(m[1].length); } else html = true;
        }
        for (const bit of bits) {
          stack.push({ bit, pos: s.length, html });
          have |= bit;
          s += html ? OPEN_TAG[bit] : MARK[bit];
        }
      }
    } else {
      s += ws;
    }
    ws = '';
    s += t;
    lastText = r.k === TEXT;
  }
  if (stack.length) s = close(s, stack, 0, false, ' ');
  return s + ws;
}

function close(s, stack, from, canShift, next) {
  let tail = '', html = false;
  if (PUNCT.test(s[s.length - 1]) && WORD_CHAR.test(next)) {
    const m = canShift ? TRAILING_PUNCT.exec(s) : null;
    if (m !== null) { tail = m[2]; s = s.slice(0, s.length - tail.length); } else html = true;
  }
  for (let k = stack.length - 1; k >= from; k--) {
    const e = stack[k];
    if (html && !e.html) {
      s = s.slice(0, e.pos) + OPEN_TAG[e.bit] + s.slice(e.pos + MARK[e.bit].length);
      e.html = true;
    }
    s += e.html ? CLOSE_TAG[e.bit] : MARK[e.bit];
  }
  return s + tail;
}

function paragraph(runs, out) {
  if (runs.length === 0) return;
  const lines = emit(runs, 0).replace(/ {2,}/g, ' ').split(BR);
  let buf = [];
  for (const raw of lines) {
    const l = raw.trim();
    if (l !== '') buf.push(escapeLineStart(l));
    else if (buf.length) { out.push({ md: buf.join('\\\n'), kind: 'p' }); buf = []; }
  }
  if (buf.length) out.push({ md: buf.join('\\\n'), kind: 'p' });
}

function heading(el, level, out) {
  const runs = [];
  collectChildren(el, 0, runs);
  let text = emit(runs, BOLD).replace(BR_ALL, ' ').replace(/ {2,}/g, ' ').trim();
  if (text === '') return;
  text = text.replace(/(^|\s)(#+)$/, '$1\\$2');
  out.push({ md: '#'.repeat(level) + ' ' + text, kind: 'h' });
}

function preText(el) {
  let s = '', last = '\n';
  const walk = node => {
    for (let c = node.firstChild; c !== null; c = c.nextSibling) {
      if (c.nodeType === 3) {
        if (c.data !== '') { s += c.data; last = c.data[c.data.length - 1]; }
      } else if (c.nodeType === 1) {
        const tag = c.localName;
        if (SKIP.has(tag)) continue;
        if (tag === 'br') { s += '\n'; last = '\n'; continue; }
        const block = BLOCK.has(tag);
        if (block && last !== '\n') { s += '\n'; last = '\n'; }
        walk(c);
        if (block && last !== '\n') { s += '\n'; last = '\n'; }
      }
    }
  };
  walk(el);
  return s;
}

let editorLanguage = '';

function codeBlock(el, out) {
  const text = preText(el).replace(/\r\n?/g, '\n').replace(/ /g, ' ').replace(/^\n+|\n+$/g, '');
  let lang = '';
  for (let n = el; n !== null && lang === ''; n = n.firstElementChild) {
    const m = LANG_CLASS.exec(n.getAttribute('class') || '');
    if (m) lang = m[1];
    else lang = n.getAttribute('data-language') || n.getAttribute('data-lang') || '';
    if (n.childElementCount !== 1) break;
  }
  if (lang === '') lang = editorLanguage;
  let longest = 0;
  const runs = text.match(/`{3,}/g);
  if (runs) for (const r of runs) if (r.length > longest) longest = r.length;
  const fence = '`'.repeat(Math.max(3, longest + 1));
  out.push({ md: `${fence}${lang}\n${text}\n${fence}`, kind: 'code' });
}

function prefixLines(md, first, rest) {
  return md.split('\n').map((l, i) => i === 0 ? first + l : l === '' ? '' : rest + l).join('\n');
}

function list(el, out) {
  const ordered = el.localName === 'ol';
  const prev = out.length ? out[out.length - 1] : null;
  const alternate = prev !== null && prev.kind === (ordered ? 'ol' : 'ul') && !prev.alt;
  const bullet = alternate ? '*' : '-';
  const delim = alternate ? ')' : '.';
  let n = parseInt(el.getAttribute('start'), 10);
  if (!(n >= 0)) n = 1;

  const items = [];
  let tight = true;
  for (let c = el.firstChild; c !== null; c = c.nextSibling) {
    if (c.nodeType === 1 && c.localName === 'li') {
      const blocks = [];
      container(c, blocks);
      if (c.getAttribute('role') === 'checkbox') {
        const box = c.getAttribute('aria-checked') === 'true' ? '[x]' : '[ ]';
        if (blocks.length && blocks[0].kind === 'p') blocks[0].md = box + ' ' + blocks[0].md;
        else blocks.unshift({ md: box, kind: 'p' });
      }
      const value = parseInt(c.getAttribute('value'), 10);
      if (value >= 0) n = value;
      items.push({ blocks, number: n++ });
    } else if (c.nodeType === 1 || (c.nodeType === 3 && c.data.trim() !== '')) {
      if (items.length === 0) items.push({ blocks: [], number: n++ });
      const target = items[items.length - 1].blocks;
      if (c.nodeType === 1) block(c, target);
      else paragraph(collectList(c), target);
    }
  }
  for (const item of items) {
    const b = item.blocks;
    for (let i = 0; i < b.length && tight; i++) {
      const k = b[i].kind;
      if (!(k === 'ul' || k === 'ol' || (k === 'p' && i === 0))) tight = false;
    }
  }
  const md = items.map(item => {
    const marker = ordered ? item.number + delim : bullet;
    const body = item.blocks.map(b => b.md).join(tight ? '\n' : '\n\n');
    return body === '' ? marker : prefixLines(body, marker + ' ', ' '.repeat(marker.length + 1));
  }).join(tight ? '\n' : '\n\n');
  if (md !== '') out.push({ md, kind: ordered ? 'ol' : 'ul', alt: alternate });
}

function collectList(node) {
  const runs = [];
  collect(node, 0, runs);
  return runs;
}

function cellText(cell) {
  const runs = [];
  collectChildren(cell, 0, runs);
  const base = cell.localName === 'th' ? BOLD : 0;
  return emit(runs, base).replace(/ {2,}/g, ' ').split(BR).map(l => l.trim()).filter(Boolean).join('<br>');
}

function table(el, out) {
  const rows = el.rows;
  let cols = 0, nested = false;
  for (let i = 0; i < rows.length && !nested; i++) {
    let w = 0;
    for (const cell of rows[i].cells) w += Math.max(1, cell.colSpan | 0);
    if (w > cols) cols = w;
  }
  nested = el.querySelector('table') !== null;
  if (rows.length === 0 || cols < 2 || nested) {
    for (let i = 0; i < rows.length; i++) {
      for (const cell of rows[i].cells) container(cell, out);
    }
    if (rows.length === 0) container(el, out);
    return;
  }

  const grid = [];
  const carry = [];
  inCell = true;
  try {
    for (let i = 0; i < rows.length; i++) {
      const row = [];
      let col = 0;
      const place = () => {
        while (carry[col] > 0) { carry[col]--; row.push(''); col++; }
      };
      for (const cell of rows[i].cells) {
        place();
        const span = Math.max(1, cell.colSpan | 0);
        const rowSpan = Math.max(1, cell.rowSpan | 0);
        row.push(cellText(cell));
        for (let s = 0; s < span; s++) {
          if (s > 0) row.push('');
          if (rowSpan > 1) carry[col] = rowSpan - 1;
          col++;
        }
      }
      place();
      grid.push(row);
    }
  } finally {
    inCell = false;
  }

  for (const row of grid) if (row.length > cols) cols = row.length;
  const width = new Array(cols).fill(3);
  for (const row of grid) {
    while (row.length < cols) row.push('');
    for (let c = 0; c < cols; c++) if (row[c].length > width[c]) width[c] = row[c].length;
  }

  const align = new Array(cols).fill('');
  let c = 0;
  for (const cell of rows[0].cells) {
    const a = (cell.getAttribute('align') || /text-align\s*:\s*(\w+)/i.exec(cell.getAttribute('style') || '')?.[1] || '').toLowerCase();
    if (c < cols) align[c] = a;
    c += Math.max(1, cell.colSpan | 0);
  }

  const line = row => '| ' + row.map((v, i) => align[i] === 'right' ? v.padStart(width[i]) : v.padEnd(width[i])).join(' | ') + ' |';
  const rule = '| ' + width.map((w, i) => {
    const a = align[i];
    if (a === 'center') return ':' + '-'.repeat(w - 2) + ':';
    if (a === 'right') return '-'.repeat(w - 1) + ':';
    if (a === 'left') return ':' + '-'.repeat(w - 1);
    return '-'.repeat(w);
  }).join(' | ') + ' |';
  const lines = [line(grid[0]), rule];
  for (let i = 1; i < grid.length; i++) lines.push(line(grid[i]));
  out.push({ md: lines.join('\n'), kind: 'table' });
}

function isCodeContainer(el) {
  const style = el.getAttribute('style');
  return style !== null && PRE_STYLE.test(style) && monospace(style);
}

function block(el, out) {
  const tag = el.localName;
  if (SKIP.has(tag)) return;
  const style = el.getAttribute('style');
  if (style !== null && HIDDEN_STYLE.test(style)) return;

  if (tag.length === 2 && tag[0] === 'h' && tag[1] >= '1' && tag[1] <= '6') heading(el, +tag[1], out);
  else if (PARAGRAPH.has(tag)) {
    if (isCodeContainer(el)) codeBlock(el, out);
    else paragraph(collectBlockRuns(el), out);
  } else if (tag === 'pre' || isCodeContainer(el)) codeBlock(el, out);
  else if (tag === 'ul' || tag === 'ol' || tag === 'menu' || tag === 'dir') list(el, out);
  else if (tag === 'table') table(el, out);
  else if (tag === 'hr') out.push({ md: '---', kind: 'hr' });
  else if (tag === 'blockquote') {
    const inner = [];
    container(el, inner);
    if (inner.length) {
      out.push({ md: inner.map(b => b.md).join('\n\n').split('\n').map(l => l === '' ? '>' : '> ' + l).join('\n'), kind: 'quote' });
    }
  } else container(el, out);
}

function collectBlockRuns(el) {
  const runs = [];
  collectChildren(el, 0, runs);
  return runs;
}

function container(el, out) {
  let runs = [];
  for (let c = el.firstChild; c !== null; c = c.nextSibling) {
    if (c.nodeType === 1) {
      const tag = c.localName;
      if (BLOCK.has(tag) || (tag !== 'a' && !SKIP.has(tag) && c.firstElementChild !== null && c.querySelector(BLOCK_SELECTOR) !== null)) {
        paragraph(runs, out);
        runs = [];
        block(c, out);
        continue;
      }
    }
    collect(c, 0, runs);
  }
  paragraph(runs, out);
}

function nestEntries(doc, entries, anchor) {
  const first = entries[0];
  const root = doc.createElement(first.ordered ? 'ol' : 'ul');
  if (first.ordered && first.start > 1) root.setAttribute('start', first.start);
  anchor.parentNode.insertBefore(root, anchor);
  const stack = [];
  for (const e of entries) {
    const li = doc.createElement('li');
    while (e.node.firstChild) li.appendChild(e.node.firstChild);
    e.node.remove();
    while (stack.length && stack[stack.length - 1].level > e.level) stack.pop();
    let top = stack[stack.length - 1];
    if (!top) {
      top = { list: root, level: e.level, li: null };
      stack.push(top);
    } else if (top.level < e.level) {
      const sub = doc.createElement(e.ordered ? 'ol' : 'ul');
      if (e.ordered && e.start > 1) sub.setAttribute('start', e.start);
      (top.li || top.list).appendChild(sub);
      top = { list: sub, level: e.level, li: null };
      stack.push(top);
    }
    top.list.appendChild(li);
    top.li = li;
  }
}

function wordMarker(p) {
  let text = '';
  for (let c = p.firstChild; c !== null; c = c.nextSibling) {
    if (c.nodeType === 8 && /^\[if !supportLists\]/.test(c.data)) {
      let n = c;
      while (n !== null && !(n.nodeType === 8 && /^\[endif\]/.test(n.data))) {
        const next = n.nextSibling;
        text += n.nodeType === 8 ? '' : n.textContent;
        n.remove();
        n = next;
      }
      if (n !== null) n.remove();
      return text;
    }
  }
  const ignore = p.querySelector('[style*="mso-list:Ignore"],[style*="mso-list: Ignore"]');
  if (ignore !== null) {
    text = ignore.textContent;
    ignore.remove();
  }
  return text;
}

function normalizeWordLists(doc) {
  let entries = [], prev = null;
  const flush = () => {
    if (entries.length) nestEntries(doc, entries, entries[0].node);
    entries = [];
  };
  for (const p of doc.querySelectorAll('[style*="mso-list"]')) {
    const m = /mso-list\s*:\s*l\d+\s+level(\d+)/i.exec(p.getAttribute('style'));
    if (m === null || !BLOCK.has(p.localName)) continue;
    if (prev === null || p.previousElementSibling !== prev) flush();
    const marker = wordMarker(p).replace(SPACES, ' ').trim();
    entries.push({
      level: +m[1],
      ordered: /^[([]?[\dA-Za-z]{1,5}[.)\]]$/.test(marker),
      start: parseInt(marker.replace(/^\D+/, ''), 10),
      node: p,
    });
    prev = p;
  }
  flush();
}

function normalizeWordOnlineLists(doc) {
  let entries = [], prevTop = null, anchor = null;
  const tops = [];
  const flush = () => {
    if (entries.length) nestEntries(doc, entries, anchor);
    entries = [];
  };
  for (const li of doc.querySelectorAll('li[data-aria-level]')) {
    const list = li.parentElement;
    if (list === null) continue;
    const wrapper = list.parentElement;
    const top = wrapper !== null && wrapper.classList.contains('ListContainerWrapper') ? wrapper : list;
    if (top !== prevTop && (prevTop === null || prevTop.nextElementSibling !== top)) {
      flush();
      anchor = top;
    }
    if (top !== prevTop) tops.push(top);
    prevTop = top;
    entries.push({ level: +li.getAttribute('data-aria-level') || 1, ordered: list.localName === 'ol', start: 1, node: li });
  }
  flush();
  for (const t of tops) if (t.textContent.trim() === '' && t.querySelector('img') === null) t.remove();
}

export function htmlToMarkdown(html, options = {}) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  if (html.indexOf('mso-list') !== -1) normalizeWordLists(doc);
  if (html.indexOf('data-aria-level') !== -1) normalizeWordOnlineLists(doc);
  editorLanguage = options.language || '';
  inLink = 0;
  inCell = false;
  const out = [];
  container(doc.body, out);
  return out.length ? out.map(b => b.md).join('\n\n') + '\n' : '';
}

export function textToMarkdown(text) {
  text = text.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
  const lines = text.split('\n');
  const tabs = lines[0].split('\t').length;
  if (lines.length > 1 && tabs > 1 && lines.every(l => l.split('\t').length === tabs)) {
    const rows = [];
    let table = '<table>';
    for (const l of lines) {
      rows.push('<tr>' + l.split('\t').map(c => '<td>' + c.replace(/&/g, '&amp;').replace(/</g, '&lt;') + '</td>').join('') + '</tr>');
    }
    table += rows.join('') + '</table>';
    return htmlToMarkdown(table);
  }
  return text === '' ? '' : text + '\n';
}

export function detectSource(html) {
  if (html.indexOf('docs-internal-guid') !== -1) return 'Google Docs';
  if (html.indexOf('google-sheets-html-origin') !== -1) return 'Google Sheets';
  if (/urn:schemas-microsoft-com:office:excel|ProgId content=Excel/i.test(html)) return 'Excel';
  if (/urn:schemas-microsoft-com:office:powerpoint|ProgId content=PowerPoint/i.test(html)) return 'PowerPoint';
  if (/urn:schemas-microsoft-com:office:word|class="?Mso/i.test(html)) return 'Word / Outlook';
  if (html.indexOf('ListContainerWrapper') !== -1 || html.indexOf('NormalTextRun') !== -1) return 'Word Online';
  if (html.indexOf('OneNote') !== -1) return 'OneNote';
  if (/white-space:\s*pre/i.test(html) && /font-family:[^;]*(?:consolas|monospace)/i.test(html)) return 'Code editor';
  return 'HTML';
}
