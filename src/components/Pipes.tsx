/* The plumbing circuit.

   Brass tubing frames the page and divides it into sections:

   - <PipeFrame>  perimeter loop — four runs joined by corner elbows,
                  rendered as an overlay in the shell's gutter.
   - <PipeColumn> vertical branch in its own grid column, splitting the
                  sidebar from the main content.
   - <PipeRail>   horizontal branch in its own grid row, splitting the
                  header from the content below.

   The two branches are grid items rather than percentage-positioned
   overlays, so they always land in the gutters no matter how the
   content reflows. Their ends carry T-junction fittings and reach into
   the shell padding to meet the perimeter runs. */

import clsx from 'clsx';
import styles from './Pipes.module.css';

/** Corner elbow: a bolted block that turns the run 90°. */
function Elbow({ className }: { className?: string }) {
  return (
    <svg className={className} width="46" height="46" viewBox="0 0 46 46" aria-hidden>
      <defs>
        <linearGradient id="elbBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e0a2" />
          <stop offset="0.42" stopColor="#b78f36" />
          <stop offset="1" stopColor="#4a340f" />
        </linearGradient>
        <radialGradient id="elbBoss" cx="38%" cy="30%" r="74%">
          <stop offset="0" stopColor="#fff6cc" />
          <stop offset="0.4" stopColor="#e3c069" />
          <stop offset="0.76" stopColor="#7d5c22" />
          <stop offset="1" stopColor="#241804" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="42" height="42" rx="12" fill="url(#elbBody)" stroke="#1d1202" strokeWidth="1.6" />
      <rect x="6" y="6" width="34" height="34" rx="9" fill="none" stroke="rgba(255,248,220,0.42)" strokeWidth="1.1" />
      <rect x="7.4" y="7.4" width="31.2" height="31.2" rx="8" fill="none" stroke="rgba(29,18,2,0.5)" strokeWidth="0.9" />
      <circle cx="23" cy="23" r="7.6" fill="url(#elbBoss)" stroke="#1d1202" strokeWidth="1" />
      <circle cx="23" cy="23" r="4" fill="none" stroke="rgba(29,18,2,0.42)" strokeWidth="0.8" />
    </svg>
  );
}

/** Perimeter loop, absolutely positioned in the shell gutter. */
export function PipeFrame() {
  return (
    <div className={styles.frame} aria-hidden>
      <span className={clsx(styles.run, styles.runTop)}>
        <span className={styles.collarH} style={{ left: '44%' }} />
        <span className={styles.collarH} style={{ left: '78%' }} />
      </span>
      <span className={clsx(styles.run, styles.runBottom)}>
        <span className={styles.collarH} style={{ left: '32%' }} />
        <span className={styles.collarH} style={{ left: '68%' }} />
      </span>
      <span className={clsx(styles.run, styles.runLeft)}>
        <span className={styles.collarV} style={{ top: '24%' }} />
        <span className={styles.collarV} style={{ top: '64%' }} />
      </span>
      <span className={clsx(styles.run, styles.runRight)}>
        <span className={styles.collarV} style={{ top: '34%' }} />
        <span className={styles.collarV} style={{ top: '72%' }} />
      </span>

      <Elbow className={clsx(styles.elbow, styles.elbowTL)} />
      <Elbow className={clsx(styles.elbow, styles.elbowTR)} />
      <Elbow className={clsx(styles.elbow, styles.elbowBL)} />
      <Elbow className={clsx(styles.elbow, styles.elbowBR)} />
    </div>
  );
}

/** Vertical branch: sidebar | main. Grid item, reaches the top and
    bottom runs where it terminates in T-fittings. */
export function PipeColumn({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.column, className)} aria-hidden>
      <span className={styles.columnPipe}>
        <span className={styles.collarV} style={{ top: '28%' }} />
        <span className={styles.collarV} style={{ top: '76%' }} />
      </span>
      <span className={clsx(styles.tee, styles.teeV, styles.teeTop)} />
      <span className={clsx(styles.tee, styles.teeV, styles.teeBottom)} />
    </div>
  );
}

/** Horizontal branch: header | content. Grid item, tees into the
    vertical branch on the left and the right-hand run on the right. */
export function PipeRail({ className }: { className?: string }) {
  return (
    <div className={clsx(styles.rail, className)} aria-hidden>
      <span className={styles.railPipe}>
        <span className={styles.collarH} style={{ left: '46%' }} />
      </span>
      <span className={clsx(styles.tee, styles.teeH, styles.teeLeft)} />
      <span className={clsx(styles.tee, styles.teeH, styles.teeRight)} />
    </div>
  );
}
