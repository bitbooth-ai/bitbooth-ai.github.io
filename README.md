# BitBooth ApS - Static Website

Professional static website for BitBooth ApS - AI consulting for Nordic investment firms.

## About

BitBooth ApS provides specialized AI consulting for Nordic investment firms. Founded by Omar Sheikh-Omar, who led the AI engineering team at Novo Holdings (€142B AUM) and built the Halo platform.

**Services:**
- 90-Day AI Capability Sprint (€60K-90K)
- Technical Due Diligence (€15K-25K per deal)
- Fractional AI Leadership (€8K-15K/month)

## Design Philosophy

**Nordic Dark Mode Aesthetic:**
- Deep navy backgrounds with crisp white text
- Crimson Pro (serif) + IBM Plex Sans (body) + IBM Plex Mono (data)
- Atmospheric depth with subtle noise textures
- Bloomberg Terminal meets Scandinavian design

**Target Audience:**
- Private equity and venture capital partners
- Family office principals
- Investment firm managing directors
- Nordic investment professionals

## Technology Stack

**Pure Static Site:**
- HTML5
- CSS3 (custom properties, animations)
- Vanilla JavaScript (no frameworks)
- Google Fonts (Crimson Pro, IBM Plex Sans, IBM Plex Mono)

**Performance:**
- File size: 42KB (ultra-lightweight)
- No build process required
- Ready for GitHub Pages deployment
- Target load time: <3 seconds

## Testing Locally

The BitBooth website is a pure static HTML site that can be tested using multiple methods. Choose the approach that best fits your workflow:

### Method 1: Direct Browser Opening (Simplest)

The fastest way to preview the site:

```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

**Note:** This method works for basic testing but may have limitations with some JavaScript features that require HTTP protocol (like certain CORS requests or service workers, though this site doesn't use them).

### Method 2: Simple HTTP Server (Recommended)

For a more accurate preview that matches how the site will be served online:

**Using Python 3:**
```bash
# Navigate to the repository directory
cd /path/to/bitbooth-ai.github.io

# Start a local HTTP server on port 8000
python3 -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

**Using Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Using Node.js (npx):**
```bash
npx http-server -p 8000
```

**Using PHP:**
```bash
php -S localhost:8000
```

**Using Ruby:**
```bash
ruby -run -e httpd . -p 8000
```

### Method 3: GitHub Pages Environment (Jekyll)

To test the site exactly as GitHub Pages will serve it, follow the official GitHub Pages testing guide:

**Prerequisites:**
- Ruby 2.1.0 or higher
- Bundler

**Installation:**

1. **Install Ruby and Bundler** (if not already installed):

   ```bash
   # Check Ruby version (requires 2.1.0+)
   ruby --version

   # Install Bundler
   gem install bundler
   ```

2. **Create a Gemfile** in the repository root:

   ```bash
   # Create Gemfile with GitHub Pages dependencies
   cat > Gemfile <<'EOF'
   source 'https://rubygems.org'
   gem 'github-pages', group: :jekyll_plugins
   gem 'webrick'  # Required for Ruby 3.0+
   EOF
   ```

3. **Install dependencies:**

   ```bash
   bundle install
   ```

4. **Serve the site:**

   ```bash
   bundle exec jekyll serve
   ```

5. **View in browser:**

   Open: **http://localhost:4000**

**Jekyll Live Reload:**

For automatic browser refresh when files change:

```bash
bundle exec jekyll serve --livereload
```

**Jekyll with Specific Branch:**

To test the exact configuration that GitHub Pages will use:

```bash
# Serve with verbose output
bundle exec jekyll serve --verbose

# Build without serving (for testing build process)
bundle exec jekyll build
```

**Reference:** [Testing your GitHub Pages site locally with Jekyll](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/testing-your-github-pages-site-locally-with-jekyll)

### Method 4: VS Code Live Server (For Development)

If using Visual Studio Code:

1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Site opens automatically at `http://127.0.0.1:5500`

**Benefits:**
- Auto-reload on save
- Mobile device testing over network
- Easy port configuration

## Testing Checklist

When testing locally, verify:

- [ ] **Hero section** loads with fade-in animations
- [ ] **Navigation** is fixed at top and shows shadow on scroll
- [ ] **Mobile menu** toggle works on small screens (<768px)
- [ ] **Smooth scrolling** works for all anchor links
- [ ] **Hover effects** work on buttons and cards
- [ ] **Metrics bar** displays three key numbers correctly
- [ ] **Comparison table** is readable and scrollable on mobile
- [ ] **Service cards** have staggered layout on desktop
- [ ] **Fonts** load correctly (Crimson Pro, IBM Plex Sans, IBM Plex Mono)
- [ ] **Email link** opens mail client when clicked
- [ ] **All sections** are visible and properly spaced
- [ ] **Footer** displays copyright and links

## Responsive Testing

Test the site at these breakpoints:

- **Mobile**: 375px (iPhone SE), 414px (iPhone Pro Max)
- **Tablet**: 768px (iPad)
- **Desktop**: 1024px, 1440px, 1920px

**Browser DevTools:**

```
Chrome/Edge: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
Firefox: F12 → Responsive Design Mode (Ctrl+Shift+M)
Safari: Cmd+Option+I → Responsive Design Mode
```

## Accessibility Testing

Verify accessibility features:

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Ensure visible focus indicators
   - Test Enter/Space on buttons

2. **Screen Reader:**
   - Check ARIA labels (nav toggle button)
   - Verify heading hierarchy (H1 → H2 → H3)
   - Test link descriptions

3. **Color Contrast:**
   - Text/background ratios meet WCAG AA
   - Interactive elements clearly visible

4. **Automated Testing:**
   ```bash
   # Use Chrome Lighthouse
   # DevTools → Lighthouse → Run Audit (Accessibility)
   ```

## Performance Testing

**Lighthouse Audit:**

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"

**Target Scores:**
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

**Manual Performance Check:**

```bash
# Check file size
ls -lh index.html

# Verify gzip compression benefit (if server supports it)
gzip -c index.html | wc -c
```

## Deployment

### GitHub Pages Automatic Deployment

Once merged to the `main` branch, the site will automatically deploy to:

**URL:** `https://bitbooth-ai.github.io`

### Custom Domain Setup (Optional)

To use `www.bitbooth.dk`:

1. **Create CNAME file:**
   ```bash
   echo "www.bitbooth.dk" > CNAME
   git add CNAME
   git commit -m "Add custom domain configuration"
   git push
   ```

2. **Configure DNS** at your domain registrar:

   **CNAME Record:**
   ```
   Type: CNAME
   Host: www
   Value: bitbooth-ai.github.io
   TTL: 3600
   ```

   **A Records (for apex domain bitbooth.dk):**
   ```
   Type: A
   Host: @
   Value: 185.199.108.153

   Type: A
   Host: @
   Value: 185.199.109.153

   Type: A
   Host: @
   Value: 185.199.110.153

   Type: A
   Host: @
   Value: 185.199.111.153
   ```

3. **Enable HTTPS** in GitHub Pages settings (automatic after DNS propagation)

### Deployment Verification

After deployment, verify:

1. Site loads at GitHub Pages URL
2. All fonts load correctly (check Google Fonts)
3. Navigation works across all sections
4. Mobile responsive design functions
5. HTTPS certificate is active (if custom domain)
6. No console errors in browser DevTools

## File Structure

```
bitbooth-ai.github.io/
├── index.html          # Complete website (42KB)
├── README.md           # This file
├── LICENSE             # MIT License
└── .github/
    └── workflows/      # GitHub Actions (if needed)
```

**No external dependencies:**
- No CSS files (all styles inline)
- No JavaScript files (all scripts inline)
- No images (SVG noise texture inline)
- Fonts loaded from Google Fonts CDN

## Browser Support

**Tested and supported:**
- Chrome 90+ (Desktop, Mobile)
- Firefox 88+ (Desktop, Mobile)
- Safari 14+ (Desktop, iOS)
- Edge 90+ (Desktop)

**Features requiring modern browsers:**
- CSS Custom Properties (CSS Variables)
- CSS Grid Layout
- Intersection Observer API (scroll animations)
- ES6 JavaScript (arrow functions, const/let)

**Graceful degradation:**
- Animations degrade to static presentation
- Grid layouts fall back to stacked columns
- Modern fonts fall back to system fonts

## Maintenance

**Updating content:**

1. Edit `index.html` directly
2. Test locally using one of the methods above
3. Commit changes with descriptive message
4. Push to repository
5. GitHub Pages auto-deploys within 1-2 minutes

**Common updates:**
- Metrics in hero section (lines 806-816)
- Service pricing (lines 927, 942, 957)
- Contact email (lines 1076, 1081)
- Footer year (line 1097)

## Support

**For website issues:**
- Check browser console for JavaScript errors
- Verify fonts are loading from Google Fonts
- Test in multiple browsers
- Clear cache and hard reload (Ctrl+Shift+R)

**For hosting questions:**
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Troubleshooting GitHub Pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/troubleshooting-jekyll-build-errors-for-github-pages-sites)

## License

MIT License - See LICENSE file for details.

## Contact

**BitBooth ApS**
Copenhagen, Denmark
Email: omar@bitbooth.dk
Website: https://bitbooth-ai.github.io

---

*Built with Nordic professionalism. Investment-grade AI consulting for serious firms.*
