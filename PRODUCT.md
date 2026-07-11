# PRODUCT.md — Cheeky Bite

## What this is
Brand website for **Cheeky Bite**, a one-woman artisan bakery. She hand-crafts:
- **Character macarons** (bears, lemons, seasonal/Christmas sets)
- **Thai sweets** — *look choup* (fruit-shaped mung-bean marzipan) and *rose pia* cakes
- **Buttercream flower cakes** — peonies, dahlias, roses, full bouquet cakes
- Occasional pastry (blueberry roulade)

## Register
`brand` — design IS the product. Image-led. The photography carries the site.

## Platform
web

## Voice
Handmade, whimsical, meticulous. "Sweet as art." Every piece is piped, shaped, and painted by one person.

## Assets (images/ — all real product photos)
| File | Content | Orientation |
|---|---|---|
| 1780894899980.jpg | Character macarons (bear, lemon) on plate, window light | portrait |
| 1782399388868.jpg | Styled character-macaron ad shot, blush bg, Cheeky Bite branding | portrait |
| 1782399389268.jpg | Christmas macarons banner | landscape |
| 1782399389340.jpg | Blueberry roulade banner | landscape |
| 1782399389414.jpg | Look choup (Thai fruit sweets) banner | landscape |
| 1782399389465.jpg | Rose pia cake banner | landscape |
| 1783770350417.jpg | Hands piping faces onto macarons (workshop) | landscape |
| 229499.jpg | Cream buttercream chrysanthemum close-up | landscape |
| 229500.jpg | Purple buttercream peonies | landscape |
| 229501.jpg | Pink buttercream blossoms on flower nails | landscape |
| 229617.jpg | Pink & cream peonies | landscape |
| 229618.jpg | Lilac buttercream roses | portrait |
| 229619.jpg | White buttercream dahlias | landscape |
| 229625.jpg | Square bouquet-box cake (pink/gold/blue) | landscape |
| 229626.jpg | Pastel bouquet cake with lilies | landscape |
| 229627.jpg | Pastel bouquet cake, alternate angle | landscape |

## Deliverables
Seven single-file designs (design-02, design-05, and the 2026-07-11 second batch design-11…design-15) + index.html gallery linking them. All use relative `images/…` paths. Eight earlier directions were removed on 2026-07-11 after review (see "Removed designs" below). Micro-animation language throughout (staggered reveals, clip-wipe image entrances, directional button fills; all gated behind prefers-reduced-motion).

## Design criteria (from review, 2026-07-11)
The brand sells happiness and good times, so every direction must be:
- **Light theme.** No dark/near-black backgrounds.
- **Joyful palette.** Pink/yellow "delicious" energy, not clinical or austere.
- **Readable text.** No white type over photographs — it breaks on smaller screens where photo highlights sit behind the text.
- **Good mobile design.** Must hold up at phone widths.

## The surviving lanes
- **design-02 — Sugar Rush.** Candy-pop maximalism. Hot pink/yellow/red full palette, chunky type, stickers, marquee. Ref: Liquid-Death-energy for macarons. *Kept: exactly the joyful pink/yellow "something delicious" feel the brand wants.* Known issues to fix in the next iteration: marquee ticker moves too fast and steals attention from the imagery (drop it or slow it down); no section navigation — add side dots/markers that scroll to each section; consider gentle motion on the wavy dividers or a subtle three.js background; horizontal lineup may not scale as products are added (wrap to new lines on mobile).
- **design-05 — Pressed Flowers.** Lilac-drenched scrapbook romance. Rotated polaroids, hand-drawn SVG florals, script annotations. Ref: botanical journal / wedding keepsake album. *Kept: light, whimsical, dark-on-light readable type, personal warmth.*

## Second batch (2026-07-11) — five new directions, all built to the review criteria
All five: light theme, dark-on-light type only, joyful palettes, mobile-first grids, IntersectionObserver reveals that enhance a visible default (gated behind prefers-reduced-motion), and a minimal "call me back" order form (email/phone required, everything else optional — the design-01 lesson). Numbered 11–15 so they can't be confused with the removed 01–10.

- **design-11 — Butter & Sun.** Lemonade-stand butter-yellow drench; the joyful *yellow* half of the palette finally leads. Rotating sun-ray hero, arch-shaped photos, scalloped "piped frosting" dividers, alternating left/right rows (salvaged from design-01). Baloo 2 single-family. Ref: Mailchimp-yellow commitment × a June lemonade stand.
- **design-12 — The Bake Sale.** County-fair gingham, cherry red + sky blue on white. Blue-ribbon rosette, three tilted plates, pinked-edge recipe cards (one wide, not an identical grid), gingham "ring the bell" order card. Alfa Slab One + Karla. Ref: small-town fair bake-sale table.
- **design-13 — The Sweet Market.** The Thai-heritage lane done light (Siam Jade's fix): mango/coral awning stripes on white rice-paper ground, market-stall product cards with striped roofs, Mali hand-lettered price tags, Thai script accents (ตลาดหวาน, ลูกชุบ). Kanit + Mali (both Cadson Demak — register-true). Ref: Bangkok fruit stall at 9am, not 9pm.
- **design-14 — The Ribbon Box.** Powder-pink pastry box tied with a powder-blue ribbon; centered symmetry, double-rule page frame, ribbon-and-bow hero, `<dialog>` order form styled as a gift note. Josefin Sans + Pinyon Script. Ref: Mendl's box (Grand Budapest Hotel) — elegance kept warm so it can't drift into design-07's cold-gallery failure.
- **design-15 — The Funny Pages.** Sunday-comics edition: the macarons have faces, so they talk. Halftone panels, speech bubbles, a fake advertisement, clip-out coupon order form. Bangers + Patrick Hand. Ref: newspaper funnies × Peanuts.

## Removed designs (2026-07-11) — and why
1. **design-01 — Patisserie Noir.** Dark theme; brand sells happiness, wants light. White text over photos was unreadable on smaller screens (photos contain white areas). Static top bar didn't react to scroll (should highlight a commission CTA that opens an instant order form, not scroll away). Bottom image strip was murky and unclearly demarcated. Commission-by-email adds friction — should be a minimal form (email/phone + optional message, "call me" is enough). Mobile design was poor. (Worth salvaging elsewhere: large photographic backgrounds, alternating left/right image alignment, the "commission your piece" closing section.)
2. **design-03 — Siam Jade.** Dark jade-green theme — fails the light-theme rule.
3. **design-04 — The Atelier Index.** Light but stark black-and-white archive; clinical and joyless — fails the happiness criterion.
4. **design-06 — Nocturne.** Near-black plum luxury — dark theme.
5. **design-07 — The White Gallery.** Light and readable but "cold luxury" gallery austerity — fails the joyful criterion.
6. **design-08 — Verdigris.** White serif text over full-bleed photography — the same readability failure as design-01.
7. **design-09 — Bleu Sucre.** Light but cold cobalt/cream editorial, and it leans on the same fast marquee flagged as a problem in design-02.
8. **design-10 — Dégustation.** Charcoal-slate dark theme.
