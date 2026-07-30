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

const ROMAN = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

/** Point on a circle, measured clockwise from 12 o'clock. */
function dialPoint(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

/**
 * Pocket-watch movement: toothed brass case, bolted bezel, chapter ring
 * with a full 60-minute track and twelve roman numerals, a running
 * seconds sub-dial, Breguet hands and a domed centre jewel under glass.
 */
export function ClockFace({ size = 112 }: { size?: number }) {
  const C = 60; // centre of the 120 viewBox
  const teeth = Array.from({ length: 44 }, (_, i) => (i * 360) / 44);
  const minutes = Array.from({ length: 60 }, (_, i) => i * 6);
  const bezelScrews = [45, 135, 225, 315];

  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden>
      <defs>
        <linearGradient id="ckCase" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fbeec0" />
          <stop offset="0.3" stopColor="#dcb45f" />
          <stop offset="0.62" stopColor="#9d7727" />
          <stop offset="1" stopColor="#3e2c0d" />
        </linearGradient>
        <radialGradient id="ckDial" cx="42%" cy="34%" r="76%">
          <stop offset="0" stopColor="#f7ecca" />
          <stop offset="55%" stopColor="#e2cd9b" />
          <stop offset="86%" stopColor="#c7ab72" />
          <stop offset="100%" stopColor="#9d8149" />
        </radialGradient>
        <radialGradient id="ckJewel" cx="35%" cy="30%" r="70%">
          <stop offset="0" stopColor="#ffd9c8" />
          <stop offset="45%" stopColor="#b4432c" />
          <stop offset="100%" stopColor="#4a1208" />
        </radialGradient>
        <clipPath id="ckGlass">
          <circle cx={C} cy={C} r="46" />
        </clipPath>
      </defs>

      {/* toothed outer case */}
      {teeth.map((deg) => {
        const [x, y] = dialPoint(C, C, 57.5, deg);
        return (
          <rect
            key={deg}
            x={x - 1.7}
            y={y - 2.6}
            width="3.4"
            height="5.2"
            rx="1"
            fill="url(#ckCase)"
            stroke="#221603"
            strokeWidth="0.4"
            transform={`rotate(${deg} ${x} ${y})`}
          />
        );
      })}

      {/* case body and bolted bezel */}
      <circle cx={C} cy={C} r="56" fill="url(#ckCase)" stroke="#221603" strokeWidth="1.3" />
      <circle cx={C} cy={C} r="50" fill="none" stroke="rgba(255,248,220,0.4)" strokeWidth="1.2" />
      <circle cx={C} cy={C} r="47.5" fill="url(#ckCase)" stroke="#221603" strokeWidth="1" />
      {bezelScrews.map((deg) => {
        const [x, y] = dialPoint(C, C, 52, deg);
        return (
          <g key={deg}>
            <circle cx={x} cy={y} r="3" fill="url(#ckCase)" stroke="#221603" strokeWidth="0.7" />
            <line
              x1={x - 1.8}
              y1={y}
              x2={x + 1.8}
              y2={y}
              stroke="#221603"
              strokeWidth="0.9"
              transform={`rotate(${deg + 20} ${x} ${y})`}
            />
          </g>
        );
      })}

      {/* dial */}
      <circle cx={C} cy={C} r="46" fill="url(#ckDial)" stroke="#3c2b0e" strokeWidth="1.2" />
      <circle cx={C} cy={C} r="42.5" fill="none" stroke="rgba(60,43,14,0.5)" strokeWidth="0.7" />
      <circle cx={C} cy={C} r="30" fill="none" stroke="rgba(60,43,14,0.28)" strokeWidth="0.6" />

      {/* 60-minute track */}
      {minutes.map((deg) => {
        const major = deg % 30 === 0;
        const [x1, y1] = dialPoint(C, C, 42.5, deg);
        const [x2, y2] = dialPoint(C, C, major ? 37 : 39.6, deg);
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3c2b0e"
            strokeWidth={major ? 1.9 : 0.7}
            opacity={major ? 1 : 0.75}
          />
        );
      })}

      {/* roman chapter ring */}
      <g fill="#33240b" fontFamily="Cinzel, Georgia, serif" fontSize="7.6" textAnchor="middle">
        {ROMAN.map((r, i) => {
          const [x, y] = dialPoint(C, C, 33, i * 30);
          return (
            <text key={r} x={x} y={y + 2.7}>
              {r}
            </text>
          );
        })}
      </g>

      {/* maker's mark */}
      <text
        x={C}
        y={C - 14}
        textAnchor="middle"
        fontFamily="Cinzel, Georgia, serif"
        fontSize="4.2"
        letterSpacing="0.8"
        fill="rgba(51,36,11,0.72)"
      >
        AENEAS
      </text>

      {/* running-seconds sub-dial */}
      <g>
        <circle cx={C} cy={C + 19} r="11" fill="rgba(140,112,60,0.16)" stroke="#3c2b0e" strokeWidth="0.8" />
        {Array.from({ length: 12 }, (_, i) => i * 30).map((deg) => {
          const [x1, y1] = dialPoint(C, C + 19, 10, deg);
          const [x2, y2] = dialPoint(C, C + 19, deg % 90 === 0 ? 6.8 : 8.2, deg);
          return (
            <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3c2b0e" strokeWidth={deg % 90 === 0 ? 1 : 0.5} />
          );
        })}
        <line
          x1={C}
          y1={C + 19}
          x2={dialPoint(C, C + 19, 8, 230)[0]}
          y2={dialPoint(C, C + 19, 8, 230)[1]}
          stroke="#3c2b0e"
          strokeWidth="1"
        />
        <circle cx={C} cy={C + 19} r="1.4" fill="#3c2b0e" />
      </g>

      {/* Breguet hands, frozen at 10:09. The pierced rings sit inside
          the chapter ring so they do not foul the numerals. */}
      <g transform={`rotate(-55 ${C} ${C})`}>
        <g fill="#2c1f08" transform="translate(0.7 0.9)" opacity="0.28">
          <path d="M60 65 L57.6 56 L59 41 L61 41 L62.4 56 Z" />
        </g>
        <path d="M60 65 L57.6 56 L59 41 L61 41 L62.4 56 Z" fill="#2c1f08" />
        <circle cx="60" cy="36.5" r="4.4" fill="none" stroke="#2c1f08" strokeWidth="2" />
        <path d="M59.1 32 L60.9 32 L60 27.6 Z" fill="#2c1f08" />
      </g>
      <g transform={`rotate(54 ${C} ${C})`}>
        <g fill="#2c1f08" transform="translate(0.7 0.9)" opacity="0.28">
          <path d="M60 67 L58.2 56 L59.3 30 L60.7 30 L61.8 56 Z" />
        </g>
        <path d="M60 67 L58.2 56 L59.3 30 L60.7 30 L61.8 56 Z" fill="#2c1f08" />
        <circle cx="60" cy="26" r="3.7" fill="none" stroke="#2c1f08" strokeWidth="1.7" />
        <path d="M59.3 22 L60.7 22 L60 16.8 Z" fill="#2c1f08" />
      </g>
      <g transform={`rotate(196 ${C} ${C})`}>
        <line x1={C} y1={C + 12} x2={C} y2="21" stroke="#8f2c1c" strokeWidth="1.1" />
        <circle cx={C} cy={C + 12} r="2.6" fill="none" stroke="#8f2c1c" strokeWidth="1.1" />
      </g>

      {/* centre cap and jewel */}
      <circle cx={C} cy={C} r="4.4" fill="url(#ckCase)" stroke="#221603" strokeWidth="0.8" />
      <circle cx={C} cy={C} r="2.1" fill="url(#ckJewel)" />

      {/* glass */}
      <g clipPath="url(#ckGlass)">
        <ellipse cx="40" cy="30" rx="34" ry="24" fill="#fffdf2" opacity="0.13" transform="rotate(-28 40 30)" />
        <path d="M14 78 A46 46 0 0 1 46 14 L30 14 A46 46 0 0 0 14 50 Z" fill="#fffdf2" opacity="0.07" />
      </g>
    </svg>
  );
}

/**
 * Pressure gauge: knurled case with bezel screws, a graduated scale
 * with numerals and a red danger arc, a counterweighted needle and a
 * domed centre boss under glass. The needle sweeps -125°..+125°.
 */
export function Gauge({
  size = 72,
  value = 0.68,
  label = 'PSI',
}: {
  size?: number;
  value?: number;
  label?: string;
}) {
  const C = 50;
  const SWEEP = 125;
  const toDeg = (t: number) => -SWEEP + t * 2 * SWEEP;
  const angle = toDeg(value);

  const minor = Array.from({ length: 41 }, (_, i) => i / 40);
  const major = Array.from({ length: 6 }, (_, i) => i / 5);
  const knurl = Array.from({ length: 36 }, (_, i) => (i * 360) / 36);

  const arcPath = (r: number, t0: number, t1: number) => {
    const [x0, y0] = dialPoint(C, C, r, toDeg(t0));
    const [x1, y1] = dialPoint(C, C, r, toDeg(t1));
    const large = (t1 - t0) * 2 * SWEEP > 180 ? 1 : 0;
    return `M${x0} ${y0} A${r} ${r} 0 ${large} 1 ${x1} ${y1}`;
  };

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden>
      <defs>
        <linearGradient id="ggCase" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0" stopColor="#fbeec0" />
          <stop offset="0.32" stopColor="#dcb45f" />
          <stop offset="0.64" stopColor="#9d7727" />
          <stop offset="1" stopColor="#3e2c0d" />
        </linearGradient>
        <radialGradient id="ggDial" cx="42%" cy="34%" r="76%">
          <stop offset="0" stopColor="#f7ecca" />
          <stop offset="58%" stopColor="#e2cd9b" />
          <stop offset="88%" stopColor="#c7ab72" />
          <stop offset="100%" stopColor="#9d8149" />
        </radialGradient>
        <clipPath id="ggGlass">
          <circle cx={C} cy={C} r="38" />
        </clipPath>
      </defs>

      {/* knurled case */}
      {knurl.map((deg) => {
        const [x, y] = dialPoint(C, C, 47, deg);
        return (
          <rect
            key={deg}
            x={x - 1.2}
            y={y - 2}
            width="2.4"
            height="4"
            rx="0.8"
            fill="url(#ggCase)"
            stroke="#221603"
            strokeWidth="0.3"
            transform={`rotate(${deg} ${x} ${y})`}
          />
        );
      })}
      <circle cx={C} cy={C} r="46" fill="url(#ggCase)" stroke="#221603" strokeWidth="1.2" />
      <circle cx={C} cy={C} r="41" fill="none" stroke="rgba(255,248,220,0.4)" strokeWidth="1" />
      {[40, 180, 320].map((deg) => {
        const [x, y] = dialPoint(C, C, 43, deg);
        return (
          <g key={deg}>
            <circle cx={x} cy={y} r="2.4" fill="url(#ggCase)" stroke="#221603" strokeWidth="0.6" />
            <line
              x1={x - 1.4}
              y1={y}
              x2={x + 1.4}
              y2={y}
              stroke="#221603"
              strokeWidth="0.8"
              transform={`rotate(${deg + 30} ${x} ${y})`}
            />
          </g>
        );
      })}

      {/* dial */}
      <circle cx={C} cy={C} r="38" fill="url(#ggDial)" stroke="#3c2b0e" strokeWidth="1.1" />

      {/* normal band and red danger arc */}
      <path d={arcPath(31, 0, 0.75)} fill="none" stroke="#4d6b3a" strokeWidth="2.6" opacity="0.55" />
      <path d={arcPath(31, 0.75, 1)} fill="none" stroke="#a3331d" strokeWidth="2.6" />

      {/* graduations */}
      {minor.map((t, i) => {
        const [x1, y1] = dialPoint(C, C, 34, toDeg(t));
        const [x2, y2] = dialPoint(C, C, i % 8 === 0 ? 27 : 30.5, toDeg(t));
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3c2b0e"
            strokeWidth={i % 8 === 0 ? 1.8 : 0.65}
            opacity={i % 8 === 0 ? 1 : 0.75}
          />
        );
      })}
      <g fill="#33240b" fontFamily="Cinzel, Georgia, serif" fontSize="6" textAnchor="middle">
        {major.map((t, i) => {
          const [x, y] = dialPoint(C, C, 21, toDeg(t));
          return (
            <text key={i} x={x} y={y + 2.2}>
              {i * 20}
            </text>
          );
        })}
      </g>

      <text
        x={C}
        y={C + 22}
        textAnchor="middle"
        fontSize="6"
        fill="rgba(51,36,11,0.8)"
        fontFamily="Cinzel, Georgia, serif"
        letterSpacing="0.8"
      >
        {label}
      </text>

      {/* counterweighted needle */}
      <g transform={`rotate(${angle} ${C} ${C})`}>
        <path d={`M${C} 18 L${C + 2.1} ${C} L${C - 2.1} ${C} Z`} fill="#8f2c1c" />
        <circle cx={C} cy={C + 7.5} r="3.4" fill="#8f2c1c" />
      </g>

      {/* centre boss */}
      <circle cx={C} cy={C} r="4.6" fill="url(#ggCase)" stroke="#221603" strokeWidth="0.8" />
      <circle cx={C - 1.3} cy={C - 1.4} r="1.3" fill="#fff6cc" opacity="0.85" />

      {/* glass */}
      <g clipPath="url(#ggGlass)">
        <ellipse cx="34" cy="26" rx="28" ry="19" fill="#fffdf2" opacity="0.14" transform="rotate(-28 34 26)" />
      </g>
    </svg>
  );
}
