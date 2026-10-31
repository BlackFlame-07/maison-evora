# 🏛️ Maison Evora — Architectural & Interior Design Studio

> **Live Reference:** [https://maison-evora.framer.website/](https://maison-evora.framer.website/)  
> **Transpilation & Performance Engineering:** Floor 2 Dev (Ryan Howard) | Blackflame Designs  

A mathematically identical, 1:1 performance-optimized showcase of **Maison Evora**—a high-ticket architectural and interior design studio with a warm brutalist, Mediterranean quiet-luxury aesthetic.

---

## ⚡ Performance & Engineering Highlights

* **Standalone 60fps Lenis Physics:** Bypasses cloud-dependent React hydration freezes with an independent, zero-latency Lenis smooth-scroll runner (`lerp: 0.12`).
* **98.8% Stylesheet Payload Drop:** Purged 779 redundant `@font-face` and media query blocks across Framer's compiled output. Transferred size drops from **3.18 MB down to 36.1 KB** over the wire.
* **Hardware-Accelerated WebP Transcoding:** Converted 38 heavy photographic assets to responsive WebP with up to 60.4% byte reduction.
* **Zero-FOIT Font Architecture:** Preloaded `.woff2` files for *Mona Sans* and *Instrument Sans* in `<head>` for instant rendering without font flash.
* **Eager LCP Optimization:** Hero visual flagged with `fetchpriority="high"` and `loading="eager"`, with all below-the-fold project cards lazy-loaded.
* **Zero AI Slop / Zero Dependencies:** 100% self-contained offline bundle. Runs without external CDNs, tracker beacons, or NPM bloat.

---

## 🌐 Complete 19-Route Multi-Page Architecture

All routes feature dual nested directory (`<slug>/index.html`) and flat alias (`<slug>.html`) resolution:

* **Core Pages:**
  * `index.html` — Home (Hero, Studio Philosophy, Services 01-05, Featured Works)
  * `about/` — About Us (Ethos, Founder Statement, Team, Press)
  * `services/` — Services (Interior Design, Custom Furniture, Space Planning, Renovation, Project Mgmt)
  * `project/` — Projects Archive (Curated portfolio grid)
  * `contact/` — Contact & Inquiries (Studio inquiry form, location details)
  * `get-template/` — Template Handoff
  * `privacy-policy/` — Legal & Privacy Policy
  * `404.html` — Custom 404 Experience

* **11 CMS Case Study Details:**
  * `project/the-nordic-courtyard/`
  * `project/solterra-hills-residence/`
  * `project/namib-dune-retreat/`
  * `project/aurora-pavilion-residence/`
  * `project/case-bruma-sintra/`
  * `project/senda-retreat-residence/`
  * `project/mayfair-garden-escape-home/`
  * `project/villa-lumen-ubud/`
  * `project/casa-lume-evora/`
  * `project/azure-cliff-residence/`
  * `project/horizon-atelier-residence/`

---

## 🚀 Quick Start & Local Preview

### Prerequisites
Node.js 18+ (no npm install required).

### Run Locally
```bash
node preview.js
```
*Or on Windows: double-click `preview.cmd`.*

Server runs at `http://localhost:3000` (or pass custom port: `node preview.js 3002`).

---

## ☁️ 1-Click Deployment (Vercel / Netlify)

Pre-configured with production `vercel.json`:
* `cleanUrls: true`
* Immutable 1-year asset cache headers (`/assets/*`)
* Anti-sniff and clickjacking security headers

Deploy instantly:
```bash
vercel --prod
```

---

## 📄 License

MIT © [BlackFlame-07](https://github.com/BlackFlame-07)
