# AENEAS Delivery Platform

A responsive React reproduction of the steampunk AENEAS delivery dashboard —
brass framing, riveted panels, parchment surfaces and engraved serif type. The
reference capture lives at [`design/steampunk-dashboard.png`](design/steampunk-dashboard.png).

## Stack

| Concern | Choice |
| --- | --- |
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | CSS Modules over a shared token layer |
| Ornament | Raster slices of the reference art, applied as 9-slice `border-image` |
| Nav glyphs | Hand-authored inline SVG |
| Visual regression | Playwright screenshots at three breakpoints |

## How the chrome works

The brasswork was first built procedurally (CSS gradients plus SVG
`feTurbulence`). That got the structure right but never matched the reference,
which is a painted raster: pipes with elbows and collars, rivets studded along
every run, filigree scrollwork, a damask watermark, chiselled lettering. Those
survive being *sliced*, not being *approximated*.

So the ornament is now cut from `design/steampunk-dashboard.png` by
[`tools/extract-art.py`](tools/extract-art.py) into `public/art/`, and applied
as CSS 9-slice `border-image`:

```css
.frameCard {
  border-style: solid;
  border-color: transparent;
  border-width: 28px;
  border-image-source: url('/art/frame-card.png');
  border-image-slice: 28;
  border-image-repeat: round;
}
```

**This stays fully responsive.** The four corners are drawn at fixed size, the
four edges tile with `round`, and the interior is left to the element's own
repeating parchment background — so a panel can be any width or height and the
brasswork neither stretches nor smears. Scaling for a breakpoint is just
`border-width`: `border-image` renders each slice into the border box it is
given, so a narrower border shrinks the ornament proportionally.

Three things the extractor has to do, all in `tools/extract-art.py`:

- **Scrub the straight runs.** A card's corner gusset reaches ~28px in, but the
  brass along the edge is only ~11px thick. Everything past that in an edge
  strip is panel content in the source (lettering, status lamps), and
  `border-image` would tile it along the run. Those bands are painted over with
  clean stock; the corner blocks, which hold the gussets, are left untouched.
- **Mirror along the tiling axis only.** Pipe runs are cylinders — mirroring
  across the axis would flip the specular highlight.
- **Patch baked-in data.** The reference bell has a notification disc cast into
  it and the plates carry their labels. Counts and labels are data, so those
  regions are patched out and re-rendered as live type.

All live text — titles, stat values, status labels, nav, the section-rule
label, the blocked reason — is real DOM text over the art, not baked pixels.
The one exception is the AENEAS wordmark, which is part of the casting in the
reference; it ships as a sprite with its name carried by `alt` text.

Total art weight is ~240 KB across 34 palette-quantised PNGs.

To re-cut the art after changing the reference:

```bash
python3 tools/extract-art.py
```

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production bundle
npm run typecheck
```

## Layout

The shell is one CSS Grid: a sidebar column spanning both rows, with the header
and main content stacked beside it.

```css
grid-template-columns: minmax(220px, 280px) 1fr;
grid-template-rows: auto 1fr;
```

Everything inside aligns to the shared `--gutter` / `--sp-*` spacing scale.
Absolute positioning is reserved for decorative overlays — the notification
badge and the pipe riser running up the gutter.

### Breakpoints

| Width | Sidebar | Stat cards | Feature grid |
| --- | --- | --- | --- |
| > 1280px | full, 220–280px | 4 across | 3 across |
| 900–1280px | icon rail (84px) | 4 → 2 across | 2 across |
| 720–900px | icon rail | 2 across | 2 → 1 across |
| ≤ 720px | overlay drawer | 2 across | 1 across |

The sidebar's collapse is driven entirely by media queries; only the phone
drawer's open/closed state lives in React.

## Structure

```
src/
├── App.tsx                     outer brass chassis + responsive shell
├── types.ts                    Feature / Stat / NavEntry models
├── data/dashboard.ts           the data the screen renders
├── icons/index.tsx             nav glyphs, clock, header fleuron
├── styles/
│   ├── tokens.css              type, spacing, ink and accent colours
│   ├── art.module.css          9-slice frames, tiling stock, pipe runs
│   └── global.css              reset + base type
└── components/
    ├── sidebar/                LogoPlate · NavMenu · StatusLamp · GaugeCluster
    ├── header/                 HeaderBar · IconButton
    └── main/                   StatCardRow · SectionRule · FeatureGrid
                                FeatureCard · PhaseProgress · StageBadge
```

The six feature cards are one `<FeatureCard>` driven by a typed `Feature`
object, so stage colour, phase pills, task rollup and the blocked ribbon are all
data-derived rather than hand-tuned per card.

```ts
interface Feature {
  title: string;
  stage: 'intent' | 'analysis' | 'scheduling' | 'build' | 'release';
  phase: { current: number; total: number };
  progress: { done: number; total: number } | null;  // null renders as "—"
  story: ItemState;
  spec: ItemState;
  lastEventAgo: string;
  blocked?: { reason: string };
}
```

`ItemState` adds `in-build` to the states in the original sketch, since the
reference screen shows "Spec: In Build".

## Visual regression tests

```bash
npx playwright install chromium   # first run only
npm run test:visual
npm run test:visual:update        # accept intentional visual changes
```

Screenshots are captured at 1402×1122 (the mockup's native size), 900×1200 and
390×1400, and stored in `tests/__screenshots__`. They are **sanity checks, not
per-pixel diffs** — `maxDiffPixelRatio` is 2%, enough to catch a broken layout
while tolerating font rasterisation differences. The suite also covers the
content contract (nav, stat and card counts, the single blocked card, phase
progress exposed to assistive tech) and the phone drawer interaction.

Snapshots are platform-sensitive; regenerate them on the platform CI runs on.

If your environment ships a prebuilt Chromium whose revision doesn't match the
pinned Playwright release, point the runner at it:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/path/to/chromium npm run test:visual
```

## Accessibility notes

Ornament (`GaugeCluster`, the pipe riser, fleurons, rivets) is `aria-hidden`
and inert to pointers; the logo sprite carries the product name as `alt` text.
Status is conveyed by text as well as lamp colour, phase
pills expose `role="progressbar"` with an `aria-valuetext`, badge counts are
announced with context ("Notifications (8 new)"), and the whole UI honours
`prefers-reduced-motion`.
