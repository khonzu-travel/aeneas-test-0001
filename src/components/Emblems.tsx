/* Decorative SVG instrument art: ship's-wheel emblem, pocket-watch
   clock, and pressure gauges for the sidebar footer. */

import { ValveWheel } from './Ornaments';

export function WheelEmblem({ size = 34 }: { size?: number }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ color: '#e0bd68' }}
    >
      <defs>
        <radialGradient id="wheelHub" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#f6e6b4" />
          <stop offset="60%" stopColor="#c19a3c" />
          <stop offset="100%" stopColor="#6e4f1a" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="21" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="14.5" stroke="currentColor" strokeWidth="2.4" />
      {spokes.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 24 24)`}>
          <line x1="24" y1="9.5" x2="24" y2="2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="24" y1="14.5" x2="24" y2="6" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="3" r="1.7" fill="currentColor" />
        </g>
      ))}
      <circle cx="24" cy="24" r="6" fill="url(#wheelHub)" stroke="#4c3712" strokeWidth="1" />
      <circle cx="22.5" cy="22.5" r="1.6" fill="#fff3d0" opacity="0.7" />
    </svg>
  );
}

/** Pocket-watch style clock: knurled brass bezel, parchment face,
    ornate hands frozen at 10:09. */
export function ClockFace({ size = 92 }: { size?: number }) {
  const knurl = Array.from({ length: 48 }, (_, i) => (i * 360) / 48);
  const ticks = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="ckBez" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f0d489" />
          <stop offset="0.55" stopColor="#a67e28" />
          <stop offset="1" stopColor="#4e3712" />
        </linearGradient>
        <radialGradient id="ckFace" cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#efdfb2" />
          <stop offset="75%" stopColor="#d3b878" />
          <stop offset="100%" stopColor="#a5854a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ckBez)" stroke="#241a06" strokeWidth="1.4" />
      {knurl.map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="2.5"
          x2="50"
          y2="7"
          stroke="rgba(36,26,6,0.55)"
          strokeWidth="1.3"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="41" fill="url(#ckFace)" stroke="#3c2b0e" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(60,43,14,0.5)" strokeWidth="0.7" />
      {ticks.map((deg, i) => (
        <line
          key={deg}
          x1="50"
          y1="12"
          x2="50"
          y2={i % 3 === 0 ? 20 : 17}
          stroke="#3c2b0e"
          strokeWidth={i % 3 === 0 ? 2.2 : 1.2}
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <text x="50" y="30" textAnchor="middle" fontSize="11" fill="#3c2b0e" fontFamily="Cinzel, Georgia, serif">XII</text>
      <text x="74" y="54.5" textAnchor="middle" fontSize="11" fill="#3c2b0e" fontFamily="Cinzel, Georgia, serif">III</text>
      <text x="50" y="80" textAnchor="middle" fontSize="11" fill="#3c2b0e" fontFamily="Cinzel, Georgia, serif">VI</text>
      <text x="26" y="54.5" textAnchor="middle" fontSize="11" fill="#3c2b0e" fontFamily="Cinzel, Georgia, serif">IX</text>
      {/* hour hand (~10 o'clock) */}
      <g transform="rotate(-57 50 50)">
        <path d="M50 52 L47.6 46 L50 27 L52.4 46 Z" fill="#3c2b0e" />
      </g>
      {/* minute hand (~9 min) */}
      <g transform="rotate(54 50 50)">
        <path d="M50 53 L48.4 46 L50 17 L51.6 46 Z" fill="#3c2b0e" />
      </g>
      {/* second hand */}
      <g transform="rotate(160 50 50)">
        <line x1="50" y1="58" x2="50" y2="16" stroke="#8f2c1c" strokeWidth="1.2" />
        <circle cx="50" cy="58" r="2" fill="#8f2c1c" />
      </g>
      <circle cx="50" cy="50" r="3.4" fill="url(#ckBez)" stroke="#241a06" strokeWidth="0.8" />
    </svg>
  );
}

export function Gauge({
  size = 58,
  value = 0.62,
  label,
}: {
  size?: number;
  value?: number;
  label?: string;
}) {
  // needle sweeps -120deg..+120deg
  const angle = -120 + value * 240;
  const ticks = Array.from({ length: 11 }, (_, i) => -120 + i * 24);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="gaugeFace" cx="50%" cy="42%" r="60%">
          <stop offset="0%" stopColor="#efe0b6" />
          <stop offset="78%" stopColor="#d3b878" />
          <stop offset="100%" stopColor="#a98a4c" />
        </radialGradient>
        <linearGradient id="gaugeBezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0d489" />
          <stop offset="100%" stopColor="#5e4315" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#gaugeBezel)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#241a06" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="39" fill="url(#gaugeFace)" stroke="#3c2b0e" strokeWidth="1.5" />
      {ticks.map((t, i) => (
        <g key={i} transform={`rotate(${t} 50 50)`}>
          <line
            x1="50"
            y1="15"
            x2="50"
            y2={i % 5 === 0 ? 22 : 19}
            stroke="#3c2b0e"
            strokeWidth={i % 5 === 0 ? 2 : 1}
          />
        </g>
      ))}
      <g transform={`rotate(${angle} 50 50)`}>
        <line x1="50" y1="52" x2="50" y2="21" stroke="#7a1f10" strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="4.2" fill="#302108" />
      <circle cx="48.6" cy="48.6" r="1.2" fill="#f0d489" />
      {label && (
        <text
          x="50"
          y="73"
          textAnchor="middle"
          fontSize="9"
          fill="#4c3712"
          fontFamily="Cinzel, serif"
          letterSpacing="0.5"
        >
          {label}
        </text>
      )}
    </svg>
  );
}

/** Sidebar footer instrument cluster: valve wheel, clock, gauge. */
export function ClockCluster() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        justifyContent: 'center',
      }}
    >
      <ValveWheel size={36} />
      <ClockFace size={92} />
      <Gauge size={56} value={0.72} label="PSI" />
    </div>
  );
}
