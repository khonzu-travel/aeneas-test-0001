/* Brass instrument art: ship's-wheel emblem, valve wheel,
   pocket-watch clock and pressure gauge. */

export function WheelEmblem({ size = 44 }: { size?: number }) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <defs>
        <radialGradient id="weHub" cx="42%" cy="34%" r="72%">
          <stop offset="0" stopColor="#fdf3c4" />
          <stop offset="0.55" stopColor="#c39a3d" />
          <stop offset="1" stopColor="#5e4315" />
        </radialGradient>
      </defs>
      <g stroke="#dcb763" strokeWidth="1.6">
        <circle cx="24" cy="24" r="21" />
        <circle cx="24" cy="24" r="14.5" strokeWidth="2.4" />
      </g>
      {spokes.map((deg) => (
        <g key={deg} transform={`rotate(${deg} 24 24)`} stroke="#dcb763">
          <line x1="24" y1="9.5" x2="24" y2="2.6" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="24" y1="14.5" x2="24" y2="6" strokeWidth="1.5" />
          <circle cx="24" cy="3" r="1.7" fill="#dcb763" stroke="none" />
        </g>
      ))}
      <circle cx="24" cy="24" r="6" fill="url(#weHub)" stroke="#3c2b0e" strokeWidth="1" />
      <circle cx="22.4" cy="22.4" r="1.5" fill="#fff8dc" opacity="0.7" />
    </svg>
  );
}

export function ValveWheel({ size = 40 }: { size?: number }) {
  const spokes = Array.from({ length: 5 }, (_, i) => (i * 360) / 5);
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id="vwRim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f6e0a2" />
          <stop offset="0.55" stopColor="#b78f36" />
          <stop offset="1" stopColor="#4a340f" />
        </linearGradient>
        <radialGradient id="vwHub" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#fdf3c4" />
          <stop offset="0.5" stopColor="#c39a3d" />
          <stop offset="1" stopColor="#4a340f" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="19" fill="none" stroke="url(#vwRim)" strokeWidth="5" />
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="#241804" strokeWidth="1" />
      <circle cx="24" cy="24" r="16.5" fill="none" stroke="#241804" strokeWidth="0.8" />
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
      <circle cx="24" cy="24" r="6" fill="url(#vwHub)" stroke="#241804" strokeWidth="1" />
      <rect x="21.4" y="21.4" width="5.2" height="5.2" rx="1" fill="#4a340f" opacity="0.55" />
    </svg>
  );
}

/** Pocket-watch: knurled bezel, parchment dial, roman numerals. */
export function ClockFace({ size = 92 }: { size?: number }) {
  const knurl = Array.from({ length: 48 }, (_, i) => (i * 360) / 48);
  const ticks = Array.from({ length: 12 }, (_, i) => (i * 360) / 12);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="ckBez" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e0a2" />
          <stop offset="0.55" stopColor="#a67e28" />
          <stop offset="1" stopColor="#4a340f" />
        </linearGradient>
        <radialGradient id="ckDial" cx="50%" cy="40%" r="66%">
          <stop offset="0" stopColor="#f2e4ba" />
          <stop offset="76%" stopColor="#d5ba7c" />
          <stop offset="100%" stopColor="#a5854a" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#ckBez)" stroke="#241804" strokeWidth="1.4" />
      {knurl.map((deg) => (
        <line
          key={deg}
          x1="50"
          y1="2.5"
          x2="50"
          y2="7"
          stroke="rgba(36,24,4,0.5)"
          strokeWidth="1.3"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      <circle cx="50" cy="50" r="41" fill="url(#ckDial)" stroke="#3c2b0e" strokeWidth="1.6" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(60,43,14,0.45)" strokeWidth="0.7" />
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
      <g fill="#3c2b0e" fontFamily="Cinzel, Georgia, serif" fontSize="11" textAnchor="middle">
        <text x="50" y="30">XII</text>
        <text x="74" y="54.5">III</text>
        <text x="50" y="80">VI</text>
        <text x="26" y="54.5">IX</text>
      </g>
      <g transform="rotate(-57 50 50)">
        <path d="M50 52 L47.6 46 L50 27 L52.4 46 Z" fill="#3c2b0e" />
      </g>
      <g transform="rotate(54 50 50)">
        <path d="M50 53 L48.4 46 L50 17 L51.6 46 Z" fill="#3c2b0e" />
      </g>
      <g transform="rotate(160 50 50)">
        <line x1="50" y1="58" x2="50" y2="16" stroke="#93301d" strokeWidth="1.2" />
        <circle cx="50" cy="58" r="2" fill="#93301d" />
      </g>
      <circle cx="50" cy="50" r="3.4" fill="url(#ckBez)" stroke="#241804" strokeWidth="0.8" />
    </svg>
  );
}

export function Gauge({
  size = 56,
  value = 0.68,
  label,
}: {
  size?: number;
  value?: number;
  label?: string;
}) {
  const angle = -120 + value * 240;
  const ticks = Array.from({ length: 11 }, (_, i) => -120 + i * 24);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <radialGradient id="ggDial" cx="50%" cy="42%" r="62%">
          <stop offset="0" stopColor="#f2e4ba" />
          <stop offset="78%" stopColor="#d5ba7c" />
          <stop offset="100%" stopColor="#a98a4c" />
        </radialGradient>
        <linearGradient id="ggBez" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6e0a2" />
          <stop offset="1" stopColor="#4a340f" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill="url(#ggBez)" stroke="#241804" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="39" fill="url(#ggDial)" stroke="#3c2b0e" strokeWidth="1.5" />
      {ticks.map((t, i) => (
        <line
          key={i}
          x1="50"
          y1="15"
          x2="50"
          y2={i % 5 === 0 ? 22 : 19}
          stroke="#3c2b0e"
          strokeWidth={i % 5 === 0 ? 2 : 1}
          transform={`rotate(${t} 50 50)`}
        />
      ))}
      <line
        x1="50"
        y1="52"
        x2="50"
        y2="21"
        stroke="#93301d"
        strokeWidth="2.6"
        strokeLinecap="round"
        transform={`rotate(${angle} 50 50)`}
      />
      <circle cx="50" cy="50" r="4.2" fill="#241804" />
      <circle cx="48.6" cy="48.6" r="1.2" fill="#f6e0a2" />
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
