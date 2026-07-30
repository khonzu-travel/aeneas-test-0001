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
| Icons & ornament | Hand-authored inline SVG |
| Visual regression | Playwright screenshots at three breakpoints |

There are no image assets. Every texture — paper tooth, staining, brushed
brass — is an inline SVG `feTurbulence` data URI declared once in
`src/styles/tokens.css` and blended through CSS gradients.

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
Absolute positioning is reserved for decorative overlays — corner rivets, the
notification badge, the pipe running up the gutter.

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
├── icons/index.tsx             every glyph and ornament
├── styles/
│   ├── tokens.css              colour, type, spacing, textures, gradients
│   ├── surfaces.module.css     brass frame / parchment / plate / rivet recipes
│   └── global.css              reset + base type
└── components/
    ├── common/Corners.tsx      riveted corner gussets
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

Ornament (`Corners`, `GaugeCluster`, fleurons, rivets) is `aria-hidden` and
inert to pointers. Status is conveyed by text as well as lamp colour, phase
pills expose `role="progressbar"` with an `aria-valuetext`, badge counts are
announced with context ("Notifications (8 new)"), and the whole UI honours
`prefers-reduced-motion`.
