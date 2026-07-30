# AENEAS Delivery Platform — Dashboard

A responsive React reproduction of the steampunk **AENEAS Delivery Platform**
dashboard: brass plumbing running through the page, riveted brass frames around
aged-parchment panels, engraved serif typography, a left sidebar, a header bar,
four summary stat cards, and a data-driven grid of feature-status cards.

Built **CSS/SVG-first** and dependency-light, fluidly responsive from wide
desktop down to phone rather than pinned to fixed canvas dimensions.

## Stack

- **React 19 + TypeScript** — component model for the repetitive card UI.
- **Vite** — dev server, HMR, static SPA build.
- **CSS Modules + custom-property tokens** — all bespoke art direction; no
  utility framework or component kit.
- **`clsx`** — conditional variant classes.
- **Inline SVG** — hand-authored icons, emblems and instruments.

## Rendering strategy

| Tier | Technique | Used for |
| --- | --- | --- |
| Pure CSS | layered gradients + `box-shadow` + blend modes | pipes and fittings, brass frames, rivets, progress pills, status LEDs, enamel badges, knurled medallions, engraved text |
| SVG | hand-authored paths + gradients | icons, ship's-wheel emblem, valve wheel, pocket-watch clock, pressure gauge, pipe elbows |
| Procedural texture | inline `feTurbulence` tiles (data-URIs) | metal grain, brushed-brass streaks, aged-paper stains, walnut mottle — no raster assets |

### Material system

Four seamless `feTurbulence` tiles are defined once in `tokens.css` and
composited under gradients with `background-blend-mode`:

- `--tx-grain` — fine isotropic noise, soft-light, on every metal and paper surface
- `--tx-streak` — anisotropic noise, overlay, gives brass its brushed sheen
- `--tx-stain` — low-frequency brown mottling, multiply, ages the parchment
- `--tx-dark` — dark mottle for the walnut ground and plaques

Two shared gradients (`--pipe-h` / `--pipe-v`) shade every tube in the plumbing,
so pipes, collars and fittings all read as one continuous run of metal.

### The pipe circuit

`Pipes.tsx` renders the plumbing that frames and divides the page:

- **`PipeFrame`** — perimeter loop: four runs joined by bolted corner elbows,
  with threaded couplings spaced along each run. Absolutely positioned in the
  shell's gutter.
- **`PipeColumn`** — vertical branch separating the sidebar from the content.
- **`PipeRail`** — horizontal branch separating the header from the content.

Both branches are **grid items occupying their own tracks**, not
percentage-positioned overlays, so they always land in the gutters however the
content reflows. Their ends extend into the shell padding and terminate in
T-junction fittings that meet the perimeter runs, so the whole system reads as
one connected circuit. The geometry contract (40px padding, 34px pipe track,
20px gaps) is documented in both `App.module.css` and `Pipes.module.css`.

## Responsiveness

CSS Grid with shared tokens and `clamp()`-based fluid type and spacing:

- **Stat row** — `auto-fit, minmax(180px, 1fr)`: 4-up → 2-up → 1-up.
- **Feature grid** — `auto-fill, minmax(320px, 1fr)`: 3 → 2 → 1 columns.
- Below **900px** the sidebar collapses to a hamburger drawer with a dimming
  scrim, and the pipe circuit withdraws with it.

Verified with headless-Chromium captures at desktop (1440), tablet (820) and
phone (400) — no horizontal overflow at any width.

## Project structure

```
src/
├─ main.tsx
├─ App.tsx / App.module.css        — shell grid, pipe tracks, drawer state
├─ styles/
│  ├─ tokens.css                   — palette, texture tiles, pipe gradients, type scale
│  └─ global.css                   — reset, .parchment / .brass-frame / .rivets / .plaque / engraving
├─ data/features.ts                — typed Feature + Stat model and dashboard data
└─ components/
   ├─ Pipes.tsx                    — PipeFrame, PipeColumn, PipeRail, elbows, tees
   ├─ Sidebar.tsx                  — banner plaque, nav, status lamp, instrument cluster
   ├─ HeaderBar.tsx                — title plate + knurled gear / bell medallions
   ├─ StatCard.tsx                 — value + label, tone variants
   ├─ SectionRule.tsx              — finial-capped rod + engraved label plate
   ├─ FeatureCard.tsx              — one data-driven card (badge, pills, status, blocked ribbon)
   ├─ Icons.tsx                    — inline SVG icon set
   └─ Instruments.tsx              — wheel emblem, valve wheel, clock, gauge
```

The six feature cards are **one typed, data-driven component** — variants
(stage, story/spec state, task count, blocked ribbon) derive from the `Feature`
objects in `src/data/features.ts` rather than being hand-tuned per card.

## Getting started

```bash
npm install
npm run dev      # Vite dev server
npm run build    # type-check (tsc -b) + production build to dist/
npm run preview  # preview the production build
```

Fonts (*Cinzel Decorative*, *Cinzel*, *EB Garamond*) load from Google Fonts with
serif fallbacks, so the app degrades gracefully offline.
