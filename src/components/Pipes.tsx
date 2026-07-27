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

/**
 * Tee fitting. Drawn with the main barrel horizontal through the centre
 * and the branch outlet leaving downward; rotated to suit each junction.
 * The viewBox is centred on the main axis so rotation about the centre
 * keeps the barrel aligned with its run.
 */
function Tee({ className }: { className?: string }) {
  return (
    <svg className={className} width="58" height="58" viewBox="0 0 58 58" aria-hidden>
      <defs>
        {/* across a horizontal tube */}
        <linearGradient id="teeH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#150c02" />
          <stop offset="0.14" stopColor="#664a1a" />
          <stop offset="0.33" stopColor="#e9d091" />
          <stop offset="0.52" stopColor="#a98430" />
          <stop offset="0.78" stopColor="#5a4116" />
          <stop offset="1" stopColor="#130b02" />
        </linearGradient>
        {/* across a vertical tube */}
        <linearGradient id="teeV" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#150c02" />
          <stop offset="0.14" stopColor="#664a1a" />
          <stop offset="0.33" stopColor="#e9d091" />
          <stop offset="0.52" stopColor="#a98430" />
          <stop offset="0.78" stopColor="#5a4116" />
          <stop offset="1" stopColor="#130b02" />
        </linearGradient>
      </defs>

      {/* branch outlet stub + its hub (drawn first so the barrel laps over it) */}
      <rect x="18" y="29" width="22" height="17" rx="3" fill="url(#teeV)" stroke="#150c02" strokeWidth="0.9" />
      <rect x="14.5" y="43" width="29" height="9" rx="2.5" fill="url(#teeV)" stroke="#150c02" strokeWidth="0.9" />

      {/* main barrel: the run passes through this */}
      <rect x="4" y="17.5" width="50" height="23" rx="5" fill="url(#teeH)" stroke="#150c02" strokeWidth="1" />
      {/* hub shoulders at the two run openings */}
      <rect x="0.5" y="14.5" width="8" height="29" rx="2.5" fill="url(#teeH)" stroke="#150c02" strokeWidth="0.9" />
      <rect x="49.5" y="14.5" width="8" height="29" rx="2.5" fill="url(#teeH)" stroke="#150c02" strokeWidth="0.9" />

      {/* flange bolts */}
      <g fill="#f4dc9e" stroke="#150c02" strokeWidth="0.6">
        <circle cx="4.5" cy="20" r="2" />
        <circle cx="4.5" cy="38" r="2" />
        <circle cx="53.5" cy="20" r="2" />
        <circle cx="53.5" cy="38" r="2" />
        <circle cx="19" cy="47.5" r="2" />
        <circle cx="39" cy="47.5" r="2" />
      </g>
      {/* casting highlight along the top of the barrel */}
      <rect x="7" y="19" width="44" height="2.4" rx="1.2" fill="#fff4c8" opacity="0.4" />
    </svg>
  );
}

/** Perimeter loop: four runs joined by swept elbows. */
export function PipeFrame() {
  return (
    <div className={styles.frame} aria-hidden>
      <span className={clsx(styles.run, styles.runTop)}>
        <span className={styles.coupling} style={{ left: '42%' }} />
        <span className={styles.coupling} style={{ left: '76%' }} />
      </span>
      <span className={clsx(styles.run, styles.runBottom)}>
        <span className={styles.coupling} style={{ left: '30%' }} />
        <span className={styles.coupling} style={{ left: '66%' }} />
      </span>
      <span className={clsx(styles.run, styles.runLeft)}>
        <span className={styles.coupling} style={{ top: '26%' }} />
        <span className={styles.coupling} style={{ top: '66%' }} />
      </span>
      <span className={clsx(styles.run, styles.runRight)}>
        <span className={styles.coupling} style={{ top: '36%' }} />
        <span className={styles.coupling} style={{ top: '74%' }} />
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
        <span className={styles.coupling} style={{ top: '30%' }} />
        <span className={styles.coupling} style={{ top: '74%' }} />
      </span>
      <Tee className={clsx(styles.tee, styles.teeTop)} />
      <Tee className={clsx(styles.tee, styles.teeBottom)} />
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
      <Tee className={clsx(styles.tee, styles.teeLeft)} />
      <Tee className={clsx(styles.tee, styles.teeRight)} />
    </div>
  );
}
