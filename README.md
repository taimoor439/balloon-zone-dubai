# Balloon Zone Dubai — Next-Level Website

A premium rebuild of balloonzonedubai.com in **Next.js 14 (App Router) + TypeScript + Tailwind CSS (compiled, not CDN)**.

Design references (from live competitor research, 11 Nov 2026):
- **The Sky Balloons** — dark-green + cream, serif headings, photographic hero, product configurator.
- **BalloonDekor** — search-first header, occasion carousels, transparent package tiers.
- **800Flower** — burgundy luxury typography, generous whitespace.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## What is included

- Home: hero, occasion tiles with product counts, carousels, trust strip
  (same-day before 6 PM, fully inflated, delivery guarantee), reviews, FAQ preview.
- Shop (`/shop`): search, category / occasion filters, price filter, sort.
- Product detail (`/product/[slug]`): colour-palette picker, age/number
  swatches, priced Party Extras add-ons, quantity stepper.
- Cart: localStorage cart, cart drawer, quantity / remove.
- Checkout (`/checkout`): **guest checkout — no sign-in required, demo only,
  no payment is taken**. Order-success screen with a demo order number.
- About (`/about`), FAQ (`/faq`), Contact (`/contact`):
  Street 25 A, Al Quoz 3, Dubai, UAE · +971 55 682 1424 ·
  info@balloonzonedubai.com

## Prices — what is verified vs demo

Verified live prices from the 11 Nov 2026 audit of balloonzonedubai.com are
used where stated, e.g. Luxury Birthday Gala Package AED 1,300, Classic Cocoa
Birthday Cake AED 190, Baby Shower Setup AED 1,045, Graduation Setup AED 1,330,
New Year Balloon Decoration AED 3,200.

Any price or add-on labelled **“Demo price”** in the site is not a verified
live price — confirm it at launch. Party Extras add-on pricing
(+AED 9 / 27 / 45 / 90) is demo pricing, modelled on the competitor
configurator pattern.

## Deploy

- **GitHub Pages (live):** `GITHUB_PAGES=true npm run build` produces the
  static export in `out/`, which is pushed to the `gh-pages` branch.
  Live at https://taimoor439.github.io/balloon-zone-dubai/ — the `basePath`
  is only set when `GITHUB_PAGES=true`, so a Vercel deploy at a root domain
  needs no prefix.
- **Vercel:** plain `npm run build` (no `GITHUB_PAGES` flag).

## Audit fixes applied

- Unique page titles and meta descriptions on every page.
- Home H1: “Balloon Delivery & Balloon Decorations in Dubai”.
- No duplicated reviews; no “Splash 30” or “Urban Wraps” text anywhere.
- Guest checkout (no forced sign-in), clean category structure
  (occasions + balloon types, not 113 duplicate categories).
- No order is placed and no payment is processed in this demo build.
