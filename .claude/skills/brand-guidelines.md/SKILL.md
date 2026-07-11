---
name: brand-guidelines
description: Applies BitBooth's official brand colors and typography to any sort of artifact that may benefit from having BitBooth's look-and-feel. Use it when brand colors or style guidelines, visual formatting, or company design standards apply.
license: Complete terms in LICENSE.txt
---

# BitBooth Brand Styling

## Overview

To access BitBooth's official brand identity and style resources, use this skill.

**Keywords**: branding, corporate identity, visual identity, post-processing, styling, brand colors, typography, BitBooth brand, visual formatting, visual design

## Brand Guidelines

### Colors

**Main Colors:**

- Dark blue: `#15253E` - Primary text on light background, or for dark backgrounds
- Light silver: `#F9F7F8` - Light backgrounds and primary text on dark backgrounds
- Light blue: `#99D0F2` - Accent text color on dark backgrounds

**Accent Colors:**

- Purple: `#7B68DF` - Primary accent
- Gold: `#D6A319` - Secondary accent
- Green: `#788c5d` - Tertiary accent

### Typography

- **Title**: Playfair Display (with Georgia fallback)
- **Headings**: Figtree (with Arial fallback)
- **Body Text**: Figtree (with Arial fallback)
- **Note**: Use Google Fonts for best results

## Features

### Smart Font Application

- Applies Figtree font to headings (24pt and larger)
- Applies Figtree font to body text
- Automatically falls back to Arial/Georgia if custom fonts unavailable
- Preserves readability across all systems

### Text Styling

- Headings (24pt+): Figtree font
- Body text: Figtree font
- Smart color selection based on background
- Preserves text hierarchy and formatting

### Shape and Accent Colors

- Non-text shapes use accent colors
- Cycles through orange, blue, and green accents
- Maintains visual interest while staying on-brand

## Technical Details

### Font Management

- Uses Google Fonts for Figtree and Playfair Display fonts when available
- Provides automatic fallback to Arial (headings) and Georgia (body)
- No font installation required - works with existing system fonts

### Color Application

- Uses RGB color values for precise brand matching
- Applied via python-pptx's RGBColor class
- Maintains color fidelity across different systems
