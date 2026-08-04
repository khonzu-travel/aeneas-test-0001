import styles from './PipeFrame.module.css';

/**
 * A run of brass tubing around the perimeter of its (positioned) parent.
 *
 * Straight runs are CSS so they stretch with the container; the corner bends
 * are SVG, since a gradient cannot follow a curve. Each elbow is a stack of
 * concentric arcs — widest and darkest first, narrowest and brightest last —
 * which reads as a cylinder through the bend the same way the linear-gradient
 * runs do along the straights.
 */
export function PipeFrame({ withValve = false }: { withValve?: boolean }) {
  return (
    <span className={styles.pipes} aria-hidden>
      <span className={styles.runTop} />
      <span className={styles.runBottom} />
      <span className={styles.runLeft} />
      <span className={styles.runRight} />

      <Elbow className={styles.elbowTl} />
      <Elbow className={styles.elbowTr} />
      <Elbow className={styles.elbowBr} />
      <Elbow className={styles.elbowBl} />

      {/* Unions part-way along each straight, as on the reference plumbing. */}
      <span className={styles.collarTop} />
      <span className={styles.collarBottom} />
      <span className={styles.collarLeft} />
      <span className={styles.collarRight} />

      {withValve && <Valve className={styles.valve} />}
    </span>
  );
}

/** Quarter bend. Drawn for the top-left corner; the rest are rotated in CSS. */
function Elbow({ className }: { className: string }) {
  const d = 'M46 8 A38 38 0 0 0 8 46';
  return (
    <svg className={className} viewBox="0 0 54 54" width="54" height="54" focusable="false" aria-hidden>
      <g fill="none" strokeLinecap="butt">
        <path d={d} stroke="#060200" strokeWidth="16.5" />
        <path d={d} stroke="#241403" strokeWidth="15" />
        <path d={d} stroke="#543310" strokeWidth="13" />
        <path d={d} stroke="#7d5019" strokeWidth="10.5" />
        <path d={d} stroke="#c08c34" strokeWidth="7" />
        <path d={d} stroke="#f2d795" strokeWidth="2.6" />
      </g>
    </svg>
  );
}

/** Hand valve tapped into the bottom-left run. */
function Valve({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 44 44" width="44" height="44" focusable="false" aria-hidden>
      <defs>
        <radialGradient id="pv-boss" cx="34%" cy="28%" r="76%">
          <stop offset="0%" stopColor="#f6dc9f" />
          <stop offset="46%" stopColor="#a26c22" />
          <stop offset="100%" stopColor="#2a1806" />
        </radialGradient>
      </defs>
      <g transform="translate(22 22)">
        <circle r="17" fill="none" stroke="#0e0600" strokeWidth="7" />
        <circle r="17" fill="none" stroke="#a26c22" strokeWidth="4.5" />
        <circle r="17" fill="none" stroke="#f0cd84" strokeWidth="1.6" />
        {Array.from({ length: 6 }, (_, i) => i * 60).map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <rect x="-2.4" y="-17" width="4.8" height="17" fill="#0e0600" />
            <rect x="-1.5" y="-17" width="3" height="17" fill="#b8842f" />
          </g>
        ))}
        <circle r="6" fill="url(#pv-boss)" stroke="#1d1103" strokeWidth="1.2" />
      </g>
    </svg>
  );
}
