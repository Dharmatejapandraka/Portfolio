# Dharmateja — Full Stack Developer Portfolio

A premium, animated personal portfolio built with **HTML5, CSS3, Bootstrap 5 (grid/utilities only), and vanilla JavaScript** — no React/Vue/Angular/Tailwind.

Every section lives in **its own file**, as requested, and is stitched together at runtime.

## ⚠️ Run this with a local server (important)

`index.html` loads each section (`sections/hero.html`, `sections/about.html`, etc.) with `fetch()`, so it can keep every section in its own file. Browsers block `fetch()` of local files when you open `index.html` directly (`file://…`) — you'll see blank sections.

Pick any one of these to serve the folder over `http://`:

```bash
# Python (built-in, easiest)
cd Portfolio
python3 -m http.server 8000
# then open http://localhost:8000

# Node
npx serve .

# VS Code
# install the "Live Server" extension → right-click index.html → "Open with Live Server"
```

## Folder structure

```
Portfolio/
├── index.html                 # Shell: head, loader, placeholders, script tags
├── README.md
│
├── css/
│   ├── variables.css          # Dark + light theme tokens (CSS variables)
│   ├── base.css               # Resets, typography, loader, cursor, scroll progress
│   ├── navbar.css
│   ├── hero.css
│   ├── about.css
│   ├── skills.css
│   ├── projects.css
│   ├── certificates.css
│   ├── education.css
│   ├── contact.css
│   ├── footer.css
│   └── animations.css         # Shared keyframes (fade, zoom, float, shimmer…)
│
├── js/
│   ├── main.js                 # Entry point — loads sections, then wires everything up
│   ├── sections-loader.js      # Fetches each sections/*.html into index.html
│   ├── theme.js                # Dark/light toggle + localStorage
│   ├── loader.js                # Hides the loading screen
│   ├── cursor.js                # Custom cursor + mouse glow
│   ├── scrollprogress.js        # Top scroll progress bar
│   ├── navbar.js                # Sticky glass navbar, mobile menu, active link, back-to-top
│   ├── typing.js                # Hero role typewriter effect
│   ├── counters.js              # Animated "About" stat counters
│   ├── skills.js                # Skill category tabs + animated progress bars
│   ├── projects.js              # Project filtering + 3D tilt hover
│   ├── certificates.js          # Certificate preview modal
│   ├── contact.js                # Contact form validation (no backend wired up)
│   └── effects.js                # Ripple button clicks + scroll-reveal animations
│
├── sections/                  # One standalone HTML file per section
│   ├── navbar.html
│   ├── hero.html
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── certificates.html
│   ├── education.html
│   ├── contact.html
│   └── footer.html
│
├── images/                    # Replace these placeholders with your real images
│   ├── profile.jpg
│   ├── project1.png
│   ├── project2.png
│   ├── project3.png
│   └── certificate1.png
│
└── resume/
    └── Resume.pdf              # Placeholder — replace with your real resume
```

## What to customize

- **Text & links**: edit the relevant file in `sections/` — e.g. project copy is in `sections/projects.html`, skill percentages are in `sections/skills.html`.
- **Images/resume**: swap the files in `images/` and `resume/` (keep the same filenames, or update the `src`/`href` in the matching section file).
- **Colors**: only `css/variables.css` — every other file reads from these CSS variables.
- **Contact form**: `js/contact.js` currently only validates and simulates sending. Wire it to a real endpoint (Formspree, EmailJS, your own API) inside the `submit` handler.
- **Social links**: GitHub/LinkedIn/email URLs appear in `sections/hero.html`, `sections/contact.html`, and `sections/footer.html`.

## Notes

- Theme preference is saved with `localStorage` and respected on reload — no backend required.
- Images use `loading="lazy"`; add real, appropriately sized files for best performance.
- Motion respects `prefers-reduced-motion`.
- Built to be readable and modular — each JS file exposes one small object (e.g. `window.PortfolioTheme`) and `main.js` is the only file that calls all of them, in order.
