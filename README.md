# Jay Dholu — Portfolio v2

A modern, minimal developer portfolio built with **React + Vite + Tailwind CSS**, featuring a dual-mode design system — **Minimal Light** in light mode and **Dark Monochrome** in dark mode, inspired by [Resend.com](https://resend.com).

---

## ✨ Features

- **Dual-mode design** — Distinct aesthetic per theme. Dot grid background in light, noise texture in dark.
- **Fraunces + Space Grotesk** typography — Rare, editorial font pairing.
- **Custom cursor** — Dot + ring cursor with blend mode, desktop only.
- **Canvas orbital animation** — Rotating rings and floating orbs in the hero section.
- **Typewriter hero** — Cycles through words with a smooth typing animation.
- **Zigzag project layout** — Alternating image-left / image-right rows.
- **Scroll-aware navbar** — Blur + border appears on scroll, active section tracking.
- **Section animations** — Staggered fade-up on scroll via IntersectionObserver.
- **Framer Motion ready** — Motion library installed and available.
- **React Router** — Multi-page routing for Skills, Projects, Certificates.
- **Web3Forms contact** — Working contact form with success/error states.
- **Fully responsive** — Mobile-first, collapses gracefully at all breakpoints.

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v6 |
| Animation | Framer Motion + CSS animations |
| Icons | Lucide React |
| Fonts | Fraunces + Space Grotesk (Google Fonts) |
| Forms | Web3Forms |
| Language | JavaScript (JSX) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Scroll-aware, active section tracking, mobile slide-out
│   ├── Hero.jsx            # Typewriter, canvas orbital animation, floating badges
│   ├── About.jsx           # Editorial portrait, traits grid
│   ├── Skills.jsx          # Staggered 3-col card grid (preview)
│   ├── Projects.jsx        # Zigzag image/text rows (top 3)
│   ├── Certificates.jsx    # 3-col card grid (top 3)
│   ├── Contact.jsx         # Web3Forms-powered contact form
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx            # All sections composed
│   ├── AllSkills.jsx       # Search + level filter
│   ├── AllProjects.jsx     # Search + full zigzag list
│   └── AllCertificates.jsx # Search + full grid
├── hooks/
│   ├── useTheme.js         # Dark/light toggle with localStorage
│   └── useInView.js        # IntersectionObserver scroll trigger
├── App.jsx                 # Router, custom cursor, background orbs
├── main.jsx
└── index.css               # Design tokens, dot grid, noise texture, animations
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/jaydholu/portfolio.git
cd portfolio

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

---

## 🎨 Design System

### Color Tokens

| Token | Light | Dark |
|---|---|---|
| `--bg` | `#ffffff` | `#0a0a0a` |
| `--surface` | `#ffffff` | `#111111` |
| `--surface-2` | `#f3f3f3` | `#1a1a1a` |
| `--border` | `#e5e5e5` | `#1f1f1f` |
| `--text-primary` | `#0a0a0a` | `#f5f5f5` |
| `--text-secondary` | `#555555` | `#888888` |
| `--text-muted` | `#999999` | `#555555` |

### Typography

```css
--font-display: 'Fraunces', Georgia, serif;   /* Headings */
--font-body:    'Space Grotesk', system-ui;   /* Body, UI */
```

### Backgrounds

- **Light mode** — Dot grid (`24px` spacing, `#d0d0d0`, `45%` opacity)
- **Dark mode** — SVG fractal noise overlay (`mix-blend-mode: overlay`, `4%` opacity)

---

## 📦 Data Files

All portfolio content lives in `public/data/` as JSON — no backend needed.

```
public/
├── data/
│   ├── skills.json        # { name, icon, description, level }
│   ├── projects.json      # { name, description, image, tags, demolink, githubrepo }
│   └── certificates.json  # { name, issuer, date, image, tags, score, verifylink }
└── images/
    ├── me/
    └── projects/
    └── certificates/
```

To add a new project, simply append an object to `projects.json` — no code changes needed.

---

## 📬 Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com). The access key is already configured. To use your own:

1. Go to [web3forms.com](https://web3forms.com) and get a free access key
2. In `src/components/Contact.jsx`, replace:
```js
access_key: '2e269e46-16d3-469f-8177-bffd25a34e6a',
```
with your own key.

---

## 🌐 Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Drag and drop the dist/ folder to netlify.com/drop
```

### GitHub Pages

Add to `vite.config.js`:
```js
base: '/your-repo-name/'
```
Then push to GitHub and enable Pages from the `dist` branch.

---

## 📄 License

MIT © [Jay Dholu](https://jaydholu.in)

---

> Built with ☕ and a love for clean, purposeful design.
