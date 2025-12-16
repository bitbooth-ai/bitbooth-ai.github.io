# BitBooth Design Showcase

A static website with A/B testing support for multiple design variants. Built with pure HTML, CSS, and vanilla JavaScript.

## Project Structure

```
/
├── index.html              # Design showcase hub (links to all designs)
├── designs/
│   ├── 01-calm/
│   │   └── index.html      # First design variant
│   ├── 02-modern/
│   │   └── index.html      # Second design variant (example)
│   └── ...
├── services.html           # Services page
├── README.md
└── LICENSE
```

## Adding a New Design

### Step 1: Create the Design Folder

```bash
mkdir -p designs/XX-name
```

Use the naming convention: `XX-name` where:
- `XX` = two-digit number (02, 03, 04...)
- `name` = short lowercase descriptor (modern, minimal, bold, etc.)

### Step 2: Add Your Design

Create `designs/XX-name/index.html` with your complete design.

### Step 3: Add a Card to the Hub

Edit `index.html` (root) and add a new card in the `designs-grid` section:

```html
<a href="designs/XX-name/" class="design-card">
    <div class="design-preview">
        <span class="preview-label">XX</span>
    </div>
    <div class="design-info">
        <h2 class="design-name">Design Name</h2>
        <p class="design-description">Brief description of the design approach and visual style.</p>
        <span class="design-badge">New</span>
    </div>
</a>
```

### Badge Options

- `<span class="design-badge current">Current</span>` - Green badge for active/recommended design
- `<span class="design-badge">New</span>` - Purple badge for new designs

## AI Agent Skills

Two skills are available in `.claude/skills/` to assist with design creation:

### frontend-design

**Invoke this skill first when creating a new design.**

Creates distinctive, production-grade frontend interfaces with high design quality. Avoids generic "AI slop" aesthetics and generates creative, polished code.

Features:
- Bold aesthetic direction (minimalist, maximalist, retro-futuristic, etc.)
- Distinctive typography choices (no generic fonts like Arial/Inter)
- Creative color palettes with intentional choices
- Motion and micro-interactions
- Unexpected layouts and spatial composition

### brand-guidelines

**Use when designs should follow BitBooth's visual identity.**

Applies official brand colors and typography for consistency across designs.

Provides:
- Brand color palette (Dark Blue, Light Silver, accent colors)
- Typography specs (Playfair Display for titles, Figtree for body)
- Smart font application and fallbacks

### Recommended Workflow for AI Agents

1. Invoke `frontend-design` skill
2. Create `designs/XX-name/index.html` with the new design
3. Optionally invoke `brand-guidelines` if brand consistency is needed
4. Add a card to root `index.html` linking to the new design

## Technology Stack

**Pure Static Site:**
- HTML5
- CSS3 (custom properties, grid, flexbox)
- Vanilla JavaScript (no frameworks)
- Google Fonts

**No build process required** - edit and deploy directly.

## Brand Colors

Defined in the hub page's `:root` CSS:

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Blue | `#15253E` | Primary text, dark backgrounds |
| Light Silver | `#F9F7F8` | Light backgrounds, primary text on dark |
| Light Blue | `#99D0F2` | Accent text on dark backgrounds |
| Purple | `#7B68DF` | Primary accent |
| Gold | `#D6A319` | Secondary accent |
| Green | `#788c5d` | Tertiary accent, "current" badge |

## Typography

- **Titles**: Playfair Display (serif) with Georgia fallback
- **Body/Headings**: Figtree (sans-serif) with Arial fallback

Load via Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">
```

## Testing Locally

### Simple HTTP Server (Recommended)

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server -p 8000

# PHP
php -S localhost:8000
```

Then open: http://localhost:8000

### Direct Browser Opening

```bash
# macOS
open index.html

# Linux
xdg-open index.html

# Windows
start index.html
```

### VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"
3. Auto-opens at `http://127.0.0.1:5500`

## Responsive Breakpoints

Test at these widths:
- **Mobile**: 375px, 414px
- **Tablet**: 768px
- **Desktop**: 1024px, 1440px, 1920px

## Deployment

### GitHub Pages

Automatically deploys from `main` branch to: `https://bitbooth-ai.github.io`

### Custom Domain

1. Create `CNAME` file with your domain
2. Configure DNS:
   - CNAME: `www` → `bitbooth-ai.github.io`
   - A records for apex domain to GitHub IPs

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Modern features used:**
- CSS Custom Properties
- CSS Grid Layout
- Flexbox
- ES6 JavaScript

## File Conventions

- All styles inline (no external CSS files)
- All scripts inline (no external JS files)
- Fonts loaded from Google Fonts CDN
- Each design is self-contained in its folder

## License

MIT License - See LICENSE file for details.
