# AENEAS Delivery Platform — Dashboard

A responsive React reproduction of the steampunk-themed **AENEAS Delivery
Platform** dashboard: ornate brass/copper frames, riveted parchment panels,
engraved serif typography, a left sidebar, a header bar, four summary stat
cards, and a data-driven grid of feature-status cards.

Built following the project proposal — **CSS/SVG-first**, dependency-light, and
fluidly responsive from wide desktop down to phone (rather than pinned to a
fixed canvas).

## Stack

- **React 19 + TypeScript** — component model for the repetitive card UI.
- **Vite** — dev server, HMR, static SPA build.
- **CSS Modules + CSS custom-property tokens** — all bespoke art direction; no
  utility or component framework.
- **`clsx`** — conditional variant classes on cards/badges.
- **Inline SVG** — hand-authored nav glyphs, gear, bell, clock, the ship's-wheel
  emblem, and the sidebar gauge cluster.

## Rendering strategy

| Tier | Technique | Used for |
| --- | --- | --- |
| Pure CSS | layered `border` + `box-shadow` + gradients + blend modes | frames, rivets, pipes & couplings, progress pills, status LEDs, enamel badges, knurled medallions, text engraving |
| SVG | hand-authored paths + gradients | all icons, wheel emblem, pocket-watch clock, pressure gauges, valve wheel, corner plates, divider flourish |
| Procedural texture | inline SVG `feTurbulence` tiles (data-URIs in `tokens.css`) | metal grain, brushed-brass streaks, aged-paper stains, dark leather mottle, rivet strips — no raster assets required |

### Material system

Five seamless `feTurbulence` tiles (defined once as CSS custom properties)
are composited under/over gradients with `background-blend-mode`:

- `--tx-grain` — fine isotropic noise, soft-light, on every metal and paper surface
- `--tx-streak` — anisotropic noise, overlay, gives brass its brushed sheen
- `--tx-stain` — low-frequency brown mottling with alpha, multiply, ages the parchment
- `--tx-dark` — dark mottle with alpha for the leather/iron backgrounds
- `--rivet-h` / `--rivet-v` — repeating rivet tiles for the outer frame's riveted band

Hardware ornaments (`Ornaments.tsx`): vertical pipe runs with cylindrical
highlight gradients, threaded couplings, end flanges and a valve wheel; riveted
corner plates with slotted screws on the outer frame.

## Responsiveness

Layout uses **CSS Grid with shared spacing tokens** and `clamp()`-based fluid
type/spacing, not absolute positioning:

- **Stat row** — `auto-fit, minmax(180px, 1fr)`: 4-up → 2-up → 1-up.
- **Feature grid** — `auto-fill, minmax(320px, 1fr)`: 3 → 2 → 1 columns.
- Below **860px** the sidebar collapses to a slide-in drawer opened by a
  hamburger button in the header, with a dimming scrim.

Verified with headless-Chromium screenshots at desktop (1440), tablet (820),
and phone (400) — no horizontal overflow at any width.

## Project structure

```
src/
├─ main.tsx
├─ App.tsx / App.module.css        — brass shell + responsive grid + drawer state
├─ styles/
│  ├─ tokens.css                   — palette, fluid type/spacing, fonts
│  └─ global.css                   — reset, .parchment / .brass-frame / .rivets / .engrave primitives
├─ data/features.ts                — typed Feature / Stat model + dashboard data
└─ components/
   ├─ Sidebar.tsx                  — dark leather panel: logo plaque, gold nav, status lamp, clock cluster
   ├─ HeaderBar.tsx                — parchment title plate + knurled gear / bell medallions
   ├─ StatCard.tsx                 — value + label, tone variants
   ├─ SectionRule.tsx              — finial-capped brass rod + bronze label plate
   ├─ FeatureCard.tsx              — one data-driven card (badge, pills, status, blocked banner)
   ├─ Ornaments.tsx                — pipe columns with couplings, valve wheel, riveted corner plates
   ├─ Icons.tsx                    — inline SVG icon set
   └─ Emblems.tsx                  — ship's-wheel emblem, pocket-watch clock, pressure gauges
```

The six feature cards are **one typed, data-driven component** (`FeatureCard`),
driven by the `Feature` objects in `src/data/features.ts` — variants (stage,
story/spec state, task count, blocked ribbon) are derived from data, not
hand-tuned per card.

## Getting started

```bash
npm install
npm run dev      # start the Vite dev server
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # preview the production build
```

Fonts (*Cinzel Decorative*, *Cinzel*, *EB Garamond*) load from Google Fonts with
serif fallbacks; the app degrades gracefully offline.
