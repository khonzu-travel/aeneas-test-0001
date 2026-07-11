/* Decorative SVG instrument art: ship's-wheel emblem + gauge cluster. */

export function WheelEmblem({ size = 34 }: { size?: number }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
      style={{ color: '#f0dca0' }}
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

function Gauge({
  size = 70,
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
          <stop offset="0%" stopColor="#e7c877" />
          <stop offset="100%" stopColor="#5e4315" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#gaugeBezel)" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="#3a2a0e" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="40" fill="url(#gaugeFace)" stroke="#4c3712" strokeWidth="1.5" />
      {ticks.map((t, i) => (
        <g key={i} transform={`rotate(${t} 50 50)`}>
          <line
            x1="50"
            y1="14"
            x2="50"
            y2={i % 5 === 0 ? 21 : 18}
            stroke="#4c3712"
            strokeWidth={i % 5 === 0 ? 2 : 1}
          />
        </g>
      ))}
      <g transform={`rotate(${angle} 50 50)`}>
        <line x1="50" y1="52" x2="50" y2="20" stroke="#7a1f10" strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <circle cx="50" cy="50" r="4.2" fill="#3a2a0e" />
      <circle cx="48.6" cy="48.6" r="1.2" fill="#e7c877" />
      {label && (
        <text
          x="50"
          y="72"
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

export function GaugeCluster() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
      <Gauge size={78} value={0.58} label="PSI" />
      <Gauge size={54} value={0.8} />
    </div>
  );
}
