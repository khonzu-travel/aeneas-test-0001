/* The plumbing circuit.

   Built the way real pipework goes together:

   - straight tube runs, each ending in a raised hub shoulder where it
     sockets into a fitting;
   - swept 90° elbows at the corners (the tube actually bends — the bore
     is shaded by a radial gradient centred on the bend, so the highlight
     follows the curve);
   - tee fittings where a branch leaves a main: a barrel that the run
     passes through, a perpendicular outlet stub, and a bolted hub at
     each of the three openings;
   - sleeve couplings along the runs, rimmed at both ends.

   <PipeFrame>  perimeter loop (overlay in the shell gutter)
   <PipeColumn> vertical branch: sidebar | content   (grid item)
   <PipeRail>   horizontal branch: header | content  (grid item)

   Geometry contract with App.module.css:
     shell padding 40px · pipe track 34px · gaps 20px
     tube bore 17px, so every run centreline sits 8.5px from the edge. */

import clsx from 'clsx';
import styles from './Pipes.module.css';
import { ValveWheel } from './Instruments';

/* ------------------------------------------------------------------
   Swept-bend shading.

   A single rotated gradient cannot shade all four elbows: the light is
   fixed at the top-left, so which side of the bend it strikes changes
   corner to corner. At the top-left elbow the light falls on the
   OUTSIDE of the curve; at the bottom-right it falls on the INSIDE;
   at the other two it crosses from one to the other along the arc.

   So each elbow is stroked as a series of sub-arcs, and each sub-arc
   gets its own gradient whose highlight is placed from the dot product
   of the local surface normal with the light direction. The result
   matches the straight runs where they meet at every corner.
   ------------------------------------------------------------------ */

const BEND_R = 26.5; // bend radius to the tube centreline
const TUBE = 8.5; // tube radius (17px bore)
const BOX = 35; // BEND_R + TUBE — elbow box, arc ends land on its edges
const SEGMENTS = 6;

/** Unit vector pointing from the surface toward the light (y grows down). */
const LIGHT_X = -Math.SQRT1_2;
const LIGHT_Y = -Math.SQRT1_2;

/** Cross-section brightness profile of a straight tube, as
    [fraction across the bore from the lit face, colour]. */
const PROFILE: ReadonlyArray<readonly [number, string]> = [
  [0, '#150c02'],
  [0.14, '#664a1a'],
  [0.33, '#e9d091'],
  [0.52, '#a98430'],
  [0.78, '#5a4116'],
  [1, '#130b02'],
];

/**
 * Gradient stops for a sub-arc whose outward normal has dot product `s`
 * with the light. s = +1 → the outside of the bend faces the light and
 * the highlight sits 33% in from the outer edge (matching a straight
 * tube); s = -1 → the inside faces the light; s = 0 → lit head-on, so
 * the highlight centres.
 */
function bendStops(s: number) {
  const hl = 0.5 - 0.17 * s; // highlight position, 0 = outer edge
  const remap = (p: number) =>
    p <= 0.33 ? (p * hl) / 0.33 : hl + ((p - 0.33) * (1 - hl)) / 0.67;

  return PROFILE.map(([p, color]) => {
    const across = remap(p); // 0 = outer edge of the bend, 1 = inner
    const radius = BOX - across * 2 * TUBE;
    return { offset: radius / BOX, color };
  }).sort((a, b) => a.offset - b.offset);
}

/** Corner geometry: centre of curvature and the arc's start angle. */
const CORNERS = {
  tl: { cx: BOX, cy: BOX, from: 180 },
  tr: { cx: 0, cy: BOX, from: 270 },
  br: { cx: 0, cy: 0, from: 0 },
  bl: { cx: BOX, cy: 0, from: 90 },
} as const;

type CornerKey = keyof typeof CORNERS;

function polar(cx: number, cy: number, deg: number, r: number) {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

/** Swept 90° elbow, shaded for the light at its actual corner. */
function Elbow({ corner, className }: { corner: CornerKey; className?: string }) {
  const { cx, cy, from } = CORNERS[corner];
  const step = 90 / SEGMENTS;

  const segments = Array.from({ length: SEGMENTS }, (_, i) => {
    // overlap neighbours slightly so the seams between gradients hide
    const a0 = from + i * step - (i === 0 ? 0 : 0.9);
    const a1 = from + (i + 1) * step;
    const mid = ((a0 + a1) / 2) * (Math.PI / 180);
    const s = Math.cos(mid) * LIGHT_X + Math.sin(mid) * LIGHT_Y;
    const [x0, y0] = polar(cx, cy, a0, BEND_R);
    const [x1, y1] = polar(cx, cy, a1, BEND_R);
    return {
      id: `bend-${corner}-${i}`,
      d: `M${x0.toFixed(2)} ${y0.toFixed(2)} A${BEND_R} ${BEND_R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`,
      stops: bendStops(s),
    };
  });

  const [ox0, oy0] = polar(cx, cy, from, BOX);
  const [ox1, oy1] = polar(cx, cy, from + 90, BOX);
  const [ix0, iy0] = polar(cx, cy, from, BEND_R - TUBE);
  const [ix1, iy1] = polar(cx, cy, from + 90, BEND_R - TUBE);

  return (
    <svg className={className} width={BOX} height={BOX} viewBox={`0 0 ${BOX} ${BOX}`} aria-hidden>
      <defs>
        {segments.map((seg) => (
          <radialGradient
            key={seg.id}
            id={seg.id}
            gradientUnits="userSpaceOnUse"
            cx={cx}
            cy={cy}
            r={BOX}
          >
            {seg.stops.map((st, j) => (
              <stop key={j} offset={st.offset} stopColor={st.color} />
            ))}
          </radialGradient>
        ))}
      </defs>

      {segments.map((seg) => (
        <path key={seg.id} d={seg.d} fill="none" stroke={`url(#${seg.id})`} strokeWidth={2 * TUBE} />
      ))}

      {/* bore edges */}
      <path
        d={`M${ox0.toFixed(2)} ${oy0.toFixed(2)} A${BOX} ${BOX} 0 0 1 ${ox1.toFixed(2)} ${oy1.toFixed(2)}`}
        fill="none"
        stroke="#120a01"
        strokeWidth="1"
        opacity="0.85"
      />
      <path
        d={`M${ix0.toFixed(2)} ${iy0.toFixed(2)} A${BEND_R - TUBE} ${BEND_R - TUBE} 0 0 1 ${ix1.toFixed(2)} ${iy1.toFixed(2)}`}
        fill="none"
        stroke="#120a01"
        strokeWidth="1"
        opacity="0.7"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Tee fitting.

   As with the elbows, the fitting cannot simply be rotated: rotating
   the SVG carries its gradients round with it, so the highlight would
   leave the top-left. Instead the geometry is transposed/mirrored per
   orientation while the two gradients stay fixed in world space — one
   shading across a horizontal tube (highlight 33% down from the top),
   one across a vertical tube (33% in from the left).
   ------------------------------------------------------------------ */

const TEE = 58; // viewBox, centred on the junction

/** Which way the branch outlet points. */
type Outlet = 'down' | 'up' | 'right' | 'left';

interface TeeRect {
  x: number;
  y: number;
  w: number;
  h: number;
  rx: number;
  part: 'main' | 'stub';
}

/* Fitting drawn with the main barrel horizontal and the outlet down. */
const TEE_RECTS: readonly TeeRect[] = [
  { x: 18, y: 29, w: 22, h: 17, rx: 3, part: 'stub' }, // outlet stub
  { x: 14.5, y: 43, w: 29, h: 9, rx: 2.5, part: 'stub' }, // stub hub
  { x: 4, y: 17.5, w: 50, h: 23, rx: 5, part: 'main' }, // barrel
  { x: 0.5, y: 14.5, w: 8, h: 29, rx: 2.5, part: 'main' }, // hub
  { x: 49.5, y: 14.5, w: 8, h: 29, rx: 2.5, part: 'main' }, // hub
];

const TEE_BOLTS: ReadonlyArray<readonly [number, number]> = [
  [4.5, 20],
  [4.5, 38],
  [53.5, 20],
  [53.5, 38],
  [19, 47.5],
  [39, 47.5],
];

function teeRect(o: Outlet, r: { x: number; y: number; w: number; h: number }) {
  switch (o) {
    case 'down':
      return { x: r.x, y: r.y, w: r.w, h: r.h };
    case 'up':
      return { x: r.x, y: TEE - r.y - r.h, w: r.w, h: r.h };
    case 'right': // transpose
      return { x: r.y, y: r.x, w: r.h, h: r.w };
    case 'left': // transpose, then mirror
      return { x: TEE - r.y - r.h, y: r.x, w: r.h, h: r.w };
  }
}

function teePoint(o: Outlet, x: number, y: number): [number, number] {
  switch (o) {
    case 'down':
      return [x, y];
    case 'up':
      return [x, TEE - y];
    case 'right':
      return [y, x];
    case 'left':
      return [TEE - y, x];
  }
}

function Tee({ outlet, className }: { outlet: Outlet; className?: string }) {
  // after transposing, the barrel runs vertically for the side outlets
  const mainIsHorizontal = outlet === 'down' || outlet === 'up';
  const gradFor = (part: 'main' | 'stub') =>
    (part === 'main') === mainIsHorizontal ? 'teeH' : 'teeV';

  const barrel = teeRect(outlet, TEE_RECTS[2]);

  return (
    <svg className={className} width={TEE} height={TEE} viewBox={`0 0 ${TEE} ${TEE}`} aria-hidden>
      <defs>
        {/* across a horizontal tube — lit from above */}
        <linearGradient id="teeH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#150c02" />
          <stop offset="0.14" stopColor="#664a1a" />
          <stop offset="0.33" stopColor="#e9d091" />
          <stop offset="0.52" stopColor="#a98430" />
          <stop offset="0.78" stopColor="#5a4116" />
          <stop offset="1" stopColor="#130b02" />
        </linearGradient>
        {/* across a vertical tube — lit from the left */}
        <linearGradient id="teeV" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#150c02" />
          <stop offset="0.14" stopColor="#664a1a" />
          <stop offset="0.33" stopColor="#e9d091" />
          <stop offset="0.52" stopColor="#a98430" />
          <stop offset="0.78" stopColor="#5a4116" />
          <stop offset="1" stopColor="#130b02" />
        </linearGradient>
      </defs>

      {TEE_RECTS.map((r, i) => {
        const t = teeRect(outlet, r);
        return (
          <rect
            key={i}
            x={t.x}
            y={t.y}
            width={t.w}
            height={t.h}
            rx={r.rx}
            fill={`url(#${gradFor(r.part)})`}
            stroke="#150c02"
            strokeWidth={r.part === 'main' && i === 2 ? 1 : 0.9}
          />
        );
      })}

      <g fill="#f4dc9e" stroke="#150c02" strokeWidth="0.6">
        {TEE_BOLTS.map(([bx, by], i) => {
          const [x, y] = teePoint(outlet, bx, by);
          return <circle key={i} cx={x} cy={y} r="2" />;
        })}
      </g>

      {/* casting highlight, always on the barrel's lit face */}
      {mainIsHorizontal ? (
        <rect x={barrel.x + 3} y={barrel.y + 1.5} width={barrel.w - 6} height="2.4" rx="1.2" fill="#fff4c8" opacity="0.4" />
      ) : (
        <rect x={barrel.x + 1.5} y={barrel.y + 3} width="2.4" height={barrel.h - 6} rx="1.2" fill="#fff4c8" opacity="0.4" />
      )}
    </svg>
  );
}

/** Perimeter loop: four runs joined by swept elbows. */
export function PipeFrame() {
  return (
    <div className={styles.frame} aria-hidden>
      <span className={clsx(styles.run, styles.runTop)}>
        <span className={styles.coupling} style={{ left: '20%' }} />
        <PipeFlange axis="h" style={{ left: '42%' }} />
        <span className={styles.coupling} style={{ left: '60%' }} />
        <PipeSpur dir="down" style={{ left: '72%' }} />
        <span className={styles.coupling} style={{ left: '88%' }} />
      </span>
      <span className={clsx(styles.run, styles.runBottom)}>
        <span className={styles.coupling} style={{ left: '16%' }} />
        <PipeSpur dir="up" style={{ left: '30%' }} />
        <PipeFlange axis="h" style={{ left: '50%' }} />
        <span className={styles.coupling} style={{ left: '66%' }} />
        <span className={styles.coupling} style={{ left: '86%' }} />
      </span>
      <span className={clsx(styles.run, styles.runLeft)}>
        <span className={styles.coupling} style={{ top: '13%' }} />
        <PipeValve axis="v" style={{ top: '30%' }} />
        <PipeFlange axis="v" style={{ top: '52%' }} />
        <span className={styles.coupling} style={{ top: '78%' }} />
      </span>
      <span className={clsx(styles.run, styles.runRight)}>
        <span className={styles.coupling} style={{ top: '15%' }} />
        <PipeFlange axis="v" style={{ top: '36%' }} />
        <span className={styles.coupling} style={{ top: '56%' }} />
        <PipeSpur dir="left" style={{ top: '74%' }} />
        <span className={styles.coupling} style={{ top: '88%' }} />
      </span>

      <Elbow corner="tl" className={clsx(styles.elbow, styles.elbowTL)} />
      <Elbow corner="tr" className={clsx(styles.elbow, styles.elbowTR)} />
      <Elbow corner="br" className={clsx(styles.elbow, styles.elbowBR)} />
      <Elbow corner="bl" className={clsx(styles.elbow, styles.elbowBL)} />
    </div>
  );
}

/** Vertical branch dividing sidebar from content. */
export function PipeColumn({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.column, className)} aria-hidden>
      <span className={styles.columnPipe}>
        <span className={styles.coupling} style={{ top: '18%' }} />
        <PipeValve axis="v" style={{ top: '40%' }} />
        <PipeFlange axis="v" style={{ top: '62%' }} />
        <span className={styles.coupling} style={{ top: '84%' }} />
      </span>
      <Tee outlet="down" className={clsx(styles.tee, styles.teeTop)} />
      <Tee outlet="up" className={clsx(styles.tee, styles.teeBottom)} />
    </div>
  );
}

/**
 * Inline gate valve: a bulged body between flange rims, with a bonnet
 * carrying a handwheel out to one side.
 */
export function PipeValve({
  axis,
  className,
  style,
}: {
  axis: 'v' | 'h';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={clsx(styles.valve, axis === 'v' ? styles.valveV : styles.valveH, className)}
      style={style}
      aria-hidden
    >
      <span className={styles.valveBody} />
      <span className={clsx(styles.valveRim, styles.valveRimA)} />
      <span className={clsx(styles.valveRim, styles.valveRimB)} />
      {/* handwheel faces the viewer, so the valve stays inside the
          narrow gutter the run occupies */}
      <span className={styles.valveWheel}>
        <ValveWheel size={26} />
      </span>
    </span>
  );
}

/** Bolted flange joint — two faces drawn up against each other. */
export function PipeFlange({
  axis,
  className,
  style,
}: {
  axis: 'v' | 'h';
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={clsx(styles.flange, axis === 'v' ? styles.flangeV : styles.flangeH, className)}
      style={style}
      aria-hidden
    >
      <span className={styles.flangeFace} />
      <span className={styles.flangeFace} />
    </span>
  );
}

/** Capped spur — a blanked-off port branching from a run. */
export function PipeSpur({
  dir,
  className,
  style,
}: {
  dir: 'down' | 'up' | 'right' | 'left';
  className?: string;
  style?: React.CSSProperties;
}) {
  const dirClass = {
    down: styles.spurDown,
    up: styles.spurUp,
    right: styles.spurRight,
    left: styles.spurLeft,
  }[dir];
  return (
    <span className={clsx(styles.spur, dirClass, className)} style={style} aria-hidden>
      <span className={styles.spurPipe} />
      <span className={styles.spurCap} />
    </span>
  );
}

/**
 * Drop stub with a union nut — hangs an instrument off the feed line
 * beneath it, the way a bottom-entry gauge is plumbed in. `length`
 * sets how far the instrument stands off the feed, so a cluster can be
 * stepped without moving the line.
 */
export function PipeStub({ length, className }: { length?: number; className?: string }) {
  return (
    <span
      className={clsx(styles.stub, className)}
      style={length === undefined ? undefined : { height: length }}
      aria-hidden
    >
      <span className={styles.stubPipe} />
      <span className={styles.union} />
    </span>
  );
}

/**
 * Feed line running beneath the instrument cluster: its left end tees
 * off the left-hand main run, its right end is capped off.
 */
export function PipeFeed({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.feed, className)} aria-hidden>
      <span className={styles.feedPipe}>
        <span className={styles.coupling} style={{ left: '68%' }} />
      </span>
      <Tee outlet="right" className={clsx(styles.tee, styles.feedTee)} />
    </div>
  );
}

/** Horizontal branch dividing the header from the content. */
export function PipeRail({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.rail, className)} aria-hidden>
      <span className={styles.railPipe}>
        <span className={styles.coupling} style={{ left: '52%' }} />
      </span>
      <Tee outlet="right" className={clsx(styles.tee, styles.teeLeft)} />
      <Tee outlet="left" className={clsx(styles.tee, styles.teeRight)} />
    </div>
  );
}
