import styles from './GaugeCluster.module.css';

/** Decorative brass plumbing and instrumentation closing out the sidebar. */
export function GaugeCluster() {
  return (
    <div className={styles.cluster} aria-hidden>
      <svg viewBox="0 0 260 132" className={styles.svg} focusable="false">
        <defs>
          <linearGradient id="gc-pipe" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4c2d0c" />
            <stop offset="18%" stopColor="#9a6420" />
            <stop offset="40%" stopColor="#f4d693" />
            <stop offset="58%" stopColor="#c08a35" />
            <stop offset="82%" stopColor="#6b3f11" />
            <stop offset="100%" stopColor="#2a1806" />
          </linearGradient>
          <linearGradient id="gc-pipe-v" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3d240a" />
            <stop offset="22%" stopColor="#b8842f" />
            <stop offset="44%" stopColor="#f4d693" />
            <stop offset="70%" stopColor="#95601d" />
            <stop offset="100%" stopColor="#2a1806" />
          </linearGradient>
          <radialGradient id="gc-bezel" cx="34%" cy="26%" r="78%">
            <stop offset="0%" stopColor="#f6dc9f" />
            <stop offset="38%" stopColor="#c08a35" />
            <stop offset="72%" stopColor="#7a4a17" />
            <stop offset="100%" stopColor="#33200a" />
          </radialGradient>
          <radialGradient id="gc-dial" cx="38%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#f0dcb4" />
            <stop offset="62%" stopColor="#d8bd8c" />
            <stop offset="100%" stopColor="#a98a56" />
          </radialGradient>
        </defs>

        {/* Plumbing behind the instruments */}
        <g>
          <rect x="0" y="104" width="260" height="15" rx="7" fill="url(#gc-pipe)" />
          <rect x="196" y="14" width="15" height="96" rx="7" fill="url(#gc-pipe-v)" />
          <rect x="150" y="18" width="62" height="14" rx="7" fill="url(#gc-pipe)" />
          {/* Pipe collars */}
          {[36, 96, 168, 236].map((x) => (
            <rect key={x} x={x} y="101" width="11" height="21" rx="3" fill="url(#gc-pipe)" stroke="#2a1806" strokeWidth="0.8" />
          ))}
          <rect x="193" y="56" width="21" height="11" rx="3" fill="url(#gc-pipe-v)" stroke="#2a1806" strokeWidth="0.8" />
        </g>

        {/* Small auxiliary gauge */}
        <g transform="translate(46 76)">
          <circle r="27" fill="url(#gc-bezel)" />
          <circle r="21" fill="url(#gc-dial)" stroke="#4c2d0c" strokeWidth="1.2" />
          {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => (
            <rect key={deg} x="-0.7" y="-19" width="1.4" height="4.5" fill="#4a3116" transform={`rotate(${deg})`} />
          ))}
          <path d="M0 2.5 -1.8 0 0 -16 1.8 0Z" fill="#2b1608" transform="rotate(-52)" />
          <circle r="2.6" fill="#7a4a17" stroke="#2a1806" strokeWidth="0.8" />
        </g>

        {/* Primary pressure gauge */}
        <g transform="translate(133 66)">
          <circle r="47" fill="url(#gc-bezel)" />
          <circle r="46" fill="none" stroke="#2a1806" strokeWidth="1" opacity="0.7" />
          <circle r="38" fill="url(#gc-dial)" stroke="#4c2d0c" strokeWidth="1.4" />
          {/* Bezel screws */}
          {[45, 135, 225, 315].map((deg) => (
            <circle key={deg} cx="0" cy="-42" r="2.2" fill="#e0bf7e" stroke="#3d240a" strokeWidth="0.7" transform={`rotate(${deg})`} />
          ))}
          {/* Ticks: long every 30°, short between */}
          {Array.from({ length: 24 }, (_, i) => i * 15).map((deg) => (
            <rect
              key={deg}
              x={deg % 30 === 0 ? -0.9 : -0.55}
              y="-35"
              width={deg % 30 === 0 ? 1.8 : 1.1}
              height={deg % 30 === 0 ? 7 : 4}
              fill="#4a3116"
              transform={`rotate(${deg})`}
            />
          ))}
          {/* Quarter numerals, placed by polar coordinates so they stay upright */}
          {['XII', 'III', 'VI', 'IX'].map((numeral, i) => {
            const angle = (i * 90 - 90) * (Math.PI / 180);
            return (
              <text
                key={numeral}
                className={styles.numeral}
                x={Math.cos(angle) * 26}
                y={Math.sin(angle) * 26}
                textAnchor="middle"
                dominantBaseline="central"
                fill="#3f2a10"
              >
                {numeral}
              </text>
            );
          })}
          <path d="M0 5 -2.6 0 0 -29 2.6 0Z" fill="#2b1608" transform="rotate(118)" />
          <circle r="4" fill="url(#gc-bezel)" stroke="#2a1806" strokeWidth="1" />
          {/* Glass sheen */}
          <path d="M-34 -12A38 38 0 0 1 14 -35 46 46 0 0 0 -30 5Z" fill="#fff8e4" opacity="0.22" />
        </g>

        {/* Valve wheel */}
        <g transform="translate(222 92)" stroke="#3d240a" strokeWidth="1">
          <circle r="18" fill="none" stroke="url(#gc-pipe)" strokeWidth="5" />
          {Array.from({ length: 6 }, (_, i) => i * 60).map((deg) => (
            <rect key={deg} x="-1.6" y="-17" width="3.2" height="17" fill="#a06d24" transform={`rotate(${deg})`} />
          ))}
          <circle r="4.5" fill="url(#gc-bezel)" />
        </g>
      </svg>
    </div>
  );
}
