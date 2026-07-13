/* The plumbing system: a continuous pipe loop around the page
   perimeter with junction boxes at the corners, threaded couplings
   along each run, and a T-connected divider pipe that splits the
   sidebar from the main content. Plus the valve wheel instrument. */

import clsx from 'clsx';
import styles from './Ornaments.module.css';

/** Square junction box with slotted screws and a domed center boss —
    terminates the pipe runs at each corner of the loop. */
export function JunctionBox({ className }: { className?: string }) {
  return (
    <svg className={className} width="44" height="44" viewBox="0 0 44 44" aria-hidden>
      <defs>
        <linearGradient id="jbP" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6a2c" />
          <stop offset="0.45" stopColor="#5a421b" />
          <stop offset="1" stopColor="#2e2008" />
        </linearGradient>
        <radialGradient id="jbBoss" cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fff6cc" />
          <stop offset="0.4" stopColor="#d9b45e" />
          <stop offset="0.78" stopColor="#6e521c" />
          <stop offset="1" stopColor="#241804" />
        </radialGradient>
        <radialGradient id="jbS" cx="36%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff1bc" />
          <stop offset="0.45" stopColor="#c19a3c" />
          <stop offset="1" stopColor="#241804" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="41" height="41" rx="9" fill="url(#jbP)" stroke="#1a1002" strokeWidth="1.5" />
      <rect x="5" y="5" width="34" height="34" rx="6.5" fill="none" stroke="rgba(248,231,174,0.45)" strokeWidth="1.1" />
      <rect x="6.3" y="6.3" width="31.4" height="31.4" rx="5.5" fill="none" stroke="rgba(20,12,2,0.55)" strokeWidth="0.9" />
      <circle cx="22" cy="22" r="7.5" fill="url(#jbBoss)" stroke="#1a1002" strokeWidth="1" />
      <circle cx="22" cy="22" r="4" fill="none" stroke="rgba(20,12,2,0.4)" strokeWidth="0.8" />
      {[
        [11, 11, 25],
        [33, 11, 70],
        [11, 33, 115],
        [33, 33, 160],
      ].map(([x, y, a]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="3.4" fill="url(#jbS)" stroke="#1a1002" strokeWidth="0.8" />
          <line
            x1={x - 2}
            y1={y}
            x2={x + 2}
            y2={y}
            stroke="#1a1002"
            strokeWidth="1"
            transform={`rotate(${a} ${x} ${y})`}
          />
        </g>
      ))}
    </svg>
  );
}

/** Continuous pipe loop hugging the inside of the page frame:
    four tube runs joined by corner junction boxes, couplings spaced
    along each run. Rendered absolutely inside the shell. */
export function PipeLoop() {
  return (
    <div className={styles.loop} aria-hidden>
      <span className={clsx(styles.run, styles.runTop)}>
        <span className={styles.collarH} style={{ left: '56%' }} />
        <span className={styles.collarH} style={{ left: '84%' }} />
      </span>
      <span className={clsx(styles.run, styles.runBottom)}>
        <span className={styles.collarH} style={{ left: '44%' }} />
        <span className={styles.collarH} style={{ left: '78%' }} />
      </span>
      <span className={clsx(styles.run, styles.runLeft)}>
        <span className={styles.collarV} style={{ top: '26%' }} />
        <span className={styles.collarV} style={{ top: '66%' }} />
      </span>
      <span className={clsx(styles.run, styles.runRight)}>
        <span className={styles.collarV} style={{ top: '26%' }} />
        <span className={styles.collarV} style={{ top: '66%' }} />
      </span>
      <JunctionBox className={clsx(styles.box, styles.boxTL)} />
      <JunctionBox className={clsx(styles.box, styles.boxTR)} />
      <JunctionBox className={clsx(styles.box, styles.boxBL)} />
      <JunctionBox className={clsx(styles.box, styles.boxBR)} />
    </div>
  );
}

/** Vertical pipe that separates the sidebar from the main content.
    Its ends carry T-fittings that meet the loop's top and bottom
    runs, so the whole system reads as one connected circuit. */
export function PipeDivider({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.divider, className)} aria-hidden>
      <span className={styles.dividerPipe} />
      <span className={styles.tee} style={{ top: 0 }} />
      <span className={styles.collarV} style={{ top: '42%' }} />
      <span className={styles.tee} style={{ bottom: 0 }} />
    </div>
  );
}

export function ValveWheel({ size = 40 }: { size?: number }) {
  const spokes = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="vwRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4dc9a" />
          <stop offset="0.55" stopColor="#b08a34" />
          <stop offset="1" stopColor="#46320f" />
        </linearGradient>
        <radialGradient id="vwHub" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fdf2c0" />
          <stop offset="0.5" stopColor="#c19a3c" />
          <stop offset="1" stopColor="#46320f" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="19" fill="none" stroke="url(#vwRim)" strokeWidth="5" />
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="#241a06" strokeWidth="1" />
      <circle cx="24" cy="24" r="16.5" fill="none" stroke="#241a06" strokeWidth="0.8" />
      {spokes.map((deg) => (
        <line
          key={deg}
          x1="24"
          y1="24"
          x2="24"
          y2="7"
          stroke="url(#vwRim)"
          strokeWidth="3.4"
          strokeLinecap="round"
          transform={`rotate(${deg} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="6" fill="url(#vwHub)" stroke="#241a06" strokeWidth="1" />
      <rect x="21.4" y="21.4" width="5.2" height="5.2" rx="1" fill="#46320f" opacity="0.55" />
    </svg>
  );
}
