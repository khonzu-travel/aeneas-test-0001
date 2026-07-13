/* Decorative machine hardware: riveted corner plates and vertical
   brass pipes with threaded couplings, end flanges and a valve wheel. */

import clsx from 'clsx';
import styles from './Ornaments.module.css';

export function PipeColumn({
  variant,
  className,
}: {
  variant: 'left' | 'right';
  className?: string;
}) {
  const slim = variant === 'right';
  return (
    <div className={clsx(styles.pipeCol, slim && styles.slim, className)} aria-hidden>
      <span className={styles.pipeBody} />
      <span className={styles.flange} style={{ top: -2 }} />
      <span className={styles.coupling} style={{ top: '16%' }} />
      {!slim && <span className={styles.coupling} style={{ top: '46%' }} />}
      <span className={styles.coupling} style={{ top: slim ? '58%' : '74%' }} />
      <span className={styles.flange} style={{ bottom: -2 }} />
      {!slim && (
        <span className={styles.valve}>
          <ValveWheel size={44} />
        </span>
      )}
    </div>
  );
}

export function ValveWheel({ size = 40 }: { size?: number }) {
  const spokes = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="vwRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d489" />
          <stop offset="0.55" stopColor="#b8912f" />
          <stop offset="1" stopColor="#4e3712" />
        </linearGradient>
        <radialGradient id="vwHub" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fdf2c0" />
          <stop offset="0.5" stopColor="#c19a3c" />
          <stop offset="1" stopColor="#4e3712" />
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
      <rect x="21.4" y="21.4" width="5.2" height="5.2" rx="1" fill="#4e3712" opacity="0.55" />
    </svg>
  );
}

export function CornerPlate({ className }: { className?: string }) {
  return (
    <svg className={className} width="52" height="52" viewBox="0 0 52 52" aria-hidden>
      <defs>
        <linearGradient id="cpB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eed189" />
          <stop offset="0.5" stopColor="#a67e28" />
          <stop offset="1" stopColor="#5e4315" />
        </linearGradient>
        <radialGradient id="cpS" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#fff1bc" />
          <stop offset="0.45" stopColor="#b8912f" />
          <stop offset="1" stopColor="#302108" />
        </radialGradient>
      </defs>
      <rect x="1.5" y="1.5" width="49" height="49" rx="11" fill="url(#cpB)" stroke="#241a06" strokeWidth="1.5" />
      <rect x="6" y="6" width="40" height="40" rx="8" fill="none" stroke="rgba(255,240,200,0.4)" strokeWidth="1.2" />
      <rect x="7.5" y="7.5" width="37" height="37" rx="7" fill="none" stroke="rgba(36,26,6,0.5)" strokeWidth="1" />
      {[
        [14, 14, 20],
        [38, 14, 65],
        [14, 38, 110],
        [38, 38, 155],
      ].map(([x, y, a]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="4.8" fill="url(#cpS)" stroke="#241a06" strokeWidth="0.9" />
          <line
            x1={x - 2.8}
            y1={y}
            x2={x + 2.8}
            y2={y}
            stroke="#241a06"
            strokeWidth="1.2"
            transform={`rotate(${a} ${x} ${y})`}
          />
        </g>
      ))}
    </svg>
  );
}
