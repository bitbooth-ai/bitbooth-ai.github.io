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
Twenty single-file designs (design-02, design-05, the 2026-07-11 second batch design-11…design-15, the 2026-07-11 third batch design-16…design-20, and the 2026-07-11 fourth batch design-22, design-24…design-30) + index.html gallery linking them. All use relative `images/…` paths. Eight earlier directions were removed on 2026-07-11 after review (see "Removed designs" below). Micro-animation language throughout (staggered reveals, clip-wipe image entrances, directional button fills; all gated behind prefers-reduced-motion).

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

**Verdict (owner review, 2026-07-11): OK, not great.** All five pass the criteria but land as passable, not impressive. Despite the different named references, they read as variations of the same design: a nav bar, a hero with a photo, product cards/rows, a quote band, an order form, a footer — same skeleton, different costume. Nothing makes you stop and think "wow, they really thought about this." Keep the files for reference, but none of these is the answer.

## Direction for the next batch
- **Do NOT use any design skills/frameworks next time.** They produce competent-but-samey output. Let Fable design freely from scratch.
- Aim for **wow**, not passable: a design unlike any of the seven so far, possibly combining ideas from different areas/genres in unexpected ways.
- **Dense with micro-animations and small details** — the kind of touches that make a visitor think "oh wow, they have really thought about this." Craft over template.
- The existing review criteria still apply (light, joyful, readable dark-on-light, great on mobile) — they're the floor, not the goal.

- **design-11 — Butter & Sun.** Lemonade-stand butter-yellow drench; the joyful *yellow* half of the palette finally leads. Rotating sun-ray hero, arch-shaped photos, scalloped "piped frosting" dividers, alternating left/right rows (salvaged from design-01). Baloo 2 single-family. Ref: Mailchimp-yellow commitment × a June lemonade stand.
- **design-12 — The Bake Sale.** County-fair gingham, cherry red + sky blue on white. Blue-ribbon rosette, three tilted plates, pinked-edge recipe cards (one wide, not an identical grid), gingham "ring the bell" order card. Alfa Slab One + Karla. Ref: small-town fair bake-sale table.
- **design-13 — The Sweet Market.** The Thai-heritage lane done light (Siam Jade's fix): mango/coral awning stripes on white rice-paper ground, market-stall product cards with striped roofs, Mali hand-lettered price tags, Thai script accents (ตลาดหวาน, ลูกชุบ). Kanit + Mali (both Cadson Demak — register-true). Ref: Bangkok fruit stall at 9am, not 9pm.
- **design-14 — The Ribbon Box.** Powder-pink pastry box tied with a powder-blue ribbon; centered symmetry, double-rule page frame, ribbon-and-bow hero, `<dialog>` order form styled as a gift note. Josefin Sans + Pinyon Script. Ref: Mendl's box (Grand Budapest Hotel) — elegance kept warm so it can't drift into design-07's cold-gallery failure.
- **design-15 — The Funny Pages.** Sunday-comics edition: the macarons have faces, so they talk. Halftone panels, speech bubbles, a fake advertisement, clip-out coupon order form. Bangers + Patrick Hand. Ref: newspaper funnies × Peanuts.

## Third batch (2026-07-11) — five "wow" attempts, designed freely (no skills/frameworks)
Built to the "Direction for the next batch" brief: no design skills used, each direction is a genre transplant that breaks the nav/hero/cards/form skeleton, and each is dense with micro-interactions. All still meet the floor criteria (light, joyful, dark-on-light type, mobile-first, prefers-reduced-motion gating, minimal call-me-back form). Numbered 16–20.

- **design-16 — Sugar Trail.** The site is a board game you play by scrolling. A dotted SVG path snakes down the page; a macaron token with a piped face travels the path in sync with scroll (traveled segment tints pink behind it). Products are numbered game stops with "board effect" jokes; bonus tiles between stops; a fixed 🎲 button jump-scrolls to a random stop; the order form is the FINISH prize card with a confetti burst. Fredoka + Nunito on cream with pink/yellow/mint/lilac tiles. Ref: Candy Land × a patisserie.
- **design-17 — CheekyOS.** The bakery as a pastel retro operating system. Boot splash with loading bar ("warming the oven… loading buttercream drivers"), live-clock menu bar with working drop-down menus full of jokes, draggable/z-stacking windows (Macarons.jpg preview, Flowers 📁 and Thai Sweets 📁 folders with clickable thumbnails that open a viewer window, kitchen-cam.mov, ReadMe.txt), a magnifying dock, toast notifications, ⌘O opens Order.app — a system dialog with Cancel/Send buttons. On mobile the windows reflow into a stacked feed. Pixelify Sans + Nunito, sky-blue grid desktop, pink chrome. Ref: Mac System 7 rebuilt in buttercream.
- **design-18 — The Buttercream Color System.** The products catalogued as a Pantone-style swatch book: "every shade here is edible." Fanned chip deck hero that spreads on load, chip cards with punch-notches, sampled color bars, mono spec codes (CB 617-P "Peony Pink"), spec pills (FINISH: MATTE · REAL: NO); clicking a chip copies its code with a toast ("it tastes like it looks"). Order form is "mix your palette" — selectable shade chips + contact. Fixed registration marks in the viewport corners. Space Grotesk + Space Mono on warm white. Ref: a paint-standard catalogue that melts at room temperature.
- **design-19 — A Field Guide to Buttercream Flora.** Victorian naturalist field guide: engraved-style cover plate, table of contents with dotted leaders, numbered plates (pinned, with Caveat hand annotations) presenting each product as a species — *Paeonia cremora*, *Dahlia sacchara*, *Fructus siamensis* (look choup), *Ursus macaron* — each with a taxonomy box (Kingdom: Confectionery, Order: Buttercreamales, Habitat: celebration tables). Photos develop from sepia to color on reveal. Order form is a clipboard "Specimen Request Form" that slams an APPROVED stamp on submit. Cormorant Garamond + Caveat on aged cream. Ref: Audubon, if Audubon painted with a piping bag.
- **design-20 — Sweet Talk.** The whole site is a messaging thread with the baker. Sticky chat header with rotating status ("online · painting eyebrows"), date dividers, staggered message pop-ins, photos as picture messages with tappable ❤️ reaction counters (hearts fly), a fake voice note with animated waveform, quick-reply chips that jump the thread, and an in-chat "call-me-back card" whose submission appends real sent/reply bubbles with read receipts. Quicksand on butter-yellow; inherently mobile-perfect, centered phone column on desktop. Ref: the DM conversation every customer actually has with a home baker, art-directed.

## Fourth batch (2026-07-11) — "high-end class" round, sketches approved before build
Owner feedback on the third batch: inventive but lacking high-end class. This batch borrows its *structure* from a luxury world while keeping the floor criteria (light, joyful, dark-on-light type, mobile-first, reduced-motion gating, minimal call-me-back form) — "happiness in luxury packaging." No design skills/frameworks used. Ten sketches were pitched and reviewed before building; only approved ones were built. Rejected at sketch stage: №21 couture lookbook (bakery × fashion doesn't make sense) and №23 high-jewelry vitrine. Constraints confirmed in review: not stuffy dining (22), no Thai script — English only, Thai register in feel at most (28), keep the museum concept light, not dark (29).

- **design-22 — The Tasting Menu.** The site is a single cream menu card: Courses I–VII in centered fine-dining typography with hairline double-border frame, circular "plates" whose photos bloom into view, and playful pairing notes ("pairs well with: people who talk to their food"). Course VII, The Call, is the order form — "served by telephone." Cormorant Garamond + Jost. *Only text-led direction; typography carries it.*
- **design-24 — The Invitation Suite.** A wedding-stationery flat-lay on blush linen: an envelope that opens its flap and raises its wax seal on load, deckle-edged (clip-path) cards with blind-emboss headers, a ribbon-banded menu card, taped photo prints, and the order form as an RSVP card with dotted lines and handwriting-font (Caveat) input, sealed with an animated wax stamp on submit. EB Garamond + Great Vibes. *Every section is a physical printed card; the form is diegetic.*
- **design-25 — Looks Like / Tastes Like.** The reframe of the rejected perfume concept onto the two senses that matter: sight and taste. Each product is a flip card — SIGHT face (photo, sampled color swatches, "looks like: a peony in June") flips to a TASTE face (flavor poem with staggered line reveals, "tastes like: vanilla-bean silk… and a birthday afternoon"). Fraunces + Karla on warm white with per-product pastel taste-panels. *Only direction organized around a sensory duality with a flip interaction.*
- **design-26 — Lot & Provenance.** Deadpan auction catalogue, Sale № 001: "Sweetness & Light." Each lot gets museum-grade documentation — medium ("buttercream on genoise"), provenance ("piped this morning, one pair of hands"), literature ("Instagram, passim"), condition ("flawless, briefly") — and estimates like "priceless — enquire." Hover stamps ("Not actual fruit"), and the order form registers a bidder paddle that raises with a random number on submit. Libre Caslon Text + IBM Plex Mono. *The humor IS the luxury: Monet gravity applied to a smiling cookie.*
- **design-27 — The Sweet Issue.** A glossy print magazine: SWEET masthead cover with staggered cover lines, a contents page with dotted leaders, drop-cap feature spreads (alternating photo sides), a pull-quote band, a Q&A interview with the baker, a photo essay, and the order form as one ad in a back-page classifieds column surrounded by joke ads ("LOST: self-control, vicinity of a bouquet cake"). Playfair Display + Source Sans 3. *Only long-form editorial direction.*
- **design-28 — The House of Small Treasures.** The heritage lane in palace register, all English (per review — no Thai script anywhere): jasmine-white ground, gold rules that bloom from center, a CB crest, lotus-scalloped white "treasure" frames with gold-leaf shimmer sweeps on hover, ceremonial centered chapters (Treasury I–IV), and an order form framed as "requesting an audience." Marcellus + Mulish. *Ceremonial-gift register; distinct from design-13's market-stall take on the same products.*
- **design-29 — The Porcelain Room.** A warm, light museum (explicit fix brief: must not drift dark or cold): products set inside gilt-rimmed porcelain plates with powder-blue pattern rings, hung salon-style on an asymmetric six-column grid, each with a brass caption plaque ("Still Life with Fruit (Attrib.) — attribution disputed: not actually fruit"), a bench interlude ("please do not lick the exhibits"), and an Acquisitions Desk order form. Plates iris-open (clip-path circle) on reveal. Gilda Display + Lato. *Only plate-framed, salon-hung layout.*
- **design-30 — Le Grand Hôtel Cheeky.** A belle-époque grand hotel with a staff of one: SVG crest, a three-tier tea-stand hero (brass rod + finial, dishes that assemble tier by tier on load — one tier per product line), "floors" instead of sections, a guest-book quote, a fixed concierge bell that dings with rotating toast messages, and the order form as a room-service door-hanger card (masked hole punched in the top). DM Serif Display + Nunito Sans. *Only vertical-service structure with hotel ephemera.*

## Removed designs (2026-07-11) — and why
1. **design-01 — Patisserie Noir.** Dark theme; brand sells happiness, wants light. White text over photos was unreadable on smaller screens (photos contain white areas). Static top bar didn't react to scroll (should highlight a commission CTA that opens an instant order form, not scroll away). Bottom image strip was murky and unclearly demarcated. Commission-by-email adds friction — should be a minimal form (email/phone + optional message, "call me" is enough). Mobile design was poor. (Worth salvaging elsewhere: large photographic backgrounds, alternating left/right image alignment, the "commission your piece" closing section.)
2. **design-03 — Siam Jade.** Dark jade-green theme — fails the light-theme rule.
3. **design-04 — The Atelier Index.** Light but stark black-and-white archive; clinical and joyless — fails the happiness criterion.
4. **design-06 — Nocturne.** Near-black plum luxury — dark theme.
5. **design-07 — The White Gallery.** Light and readable but "cold luxury" gallery austerity — fails the joyful criterion.
6. **design-08 — Verdigris.** White serif text over full-bleed photography — the same readability failure as design-01.
7. **design-09 — Bleu Sucre.** Light but cold cobalt/cream editorial, and it leans on the same fast marquee flagged as a problem in design-02.
8. **design-10 — Dégustation.** Charcoal-slate dark theme.
