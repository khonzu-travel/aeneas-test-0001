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

/* Cylinder shading for a swept bend. The gradient is centred on the
   bend's centre of curvature, so the bands run perpendicular to the
   tube everywhere along the arc — the highlight rides the outside of
   the curve, as it does on real bent tube. */
function BendShading({ id }: { id: string }) {
  return (
    <radialGradient id={id} gradientUnits="userSpaceOnUse" cx="34.5" cy="34.5" r="34.5">
      <stop offset="0.507" stopColor="#130b02" />
      <stop offset="0.615" stopColor="#5a4116" />
      <stop offset="0.744" stopColor="#a98430" />
      <stop offset="0.838" stopColor="#e9d091" />
      <stop offset="0.931" stopColor="#664a1a" />
      <stop offset="1" stopColor="#150c02" />
    </radialGradient>
  );
}

/** Swept 90° elbow. Drawn for the top-left corner; rotated for the rest. */
function Elbow({ className }: { className?: string }) {
  return (
    <svg className={className} width="43" height="43" viewBox="0 0 43 43" aria-hidden>
      <defs>
        <BendShading id="bend" />
      </defs>
      {/* the bend itself: centreline arc stroked to the tube bore */}
      <path
        d="M8.5 34.5 A26 26 0 0 1 34.5 8.5"
        fill="none"
        stroke="url(#bend)"
        strokeWidth="17"
      />
      {/* bore edges */}
      <path d="M0 34.5 A34.5 34.5 0 0 1 34.5 0" fill="none" stroke="#120a01" strokeWidth="1" opacity="0.85" />
      <path d="M17 34.5 A17.5 17.5 0 0 1 34.5 17" fill="none" stroke="#120a01" strokeWidth="1" opacity="0.7" />
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

      <Elbow className={clsx(styles.elbow, styles.elbowTL)} />
      <Elbow className={clsx(styles.elbow, styles.elbowTR)} />
      <Elbow className={clsx(styles.elbow, styles.elbowBR)} />
      <Elbow className={clsx(styles.elbow, styles.elbowBL)} />
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
