/* Hand-authored inline SVG icon set.

   Two families, matching the reference: the header controls are stroked
   line glyphs, while the sidebar's navigation marks are solid — cut
   silhouettes with their internal detail knocked out as a light score,
   so the same glyph reads on aged paper and on a dark bronze plaque
   alike. The gear is filled so it reads as a solid cog. */

interface IconProps {
  size?: number;
  className?: string;
}

const stroked = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const solid = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'currentColor',
});

/** The score cut through a solid glyph, lit from above. */
const SCORE = 'rgba(255, 248, 222, 0.5)';
/** …and the same cut where the glyph itself is the light element. */
const SCORE_DARK = 'rgba(26, 15, 3, 0.55)';

/** Sits on the active plaque, so its detail is cut dark into the gold. */
export function HomeIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...solid(size)} className={className} aria-hidden>
      <path d="M12 2.4 1.2 12.1a.9.9 0 0 0 .6 1.6h2.1V21a.9.9 0 0 0 .9.9h4.6v-5.4h5.2v5.4h4.6a.9.9 0 0 0 .9-.9v-7.3h2.1a.9.9 0 0 0 .6-1.6Z" />
      <path
        d="M4.6 13.1 12 6.5l7.4 6.6"
        fill="none"
        stroke={SCORE_DARK}
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InboxIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...solid(size)} className={className} aria-hidden>
      <rect x="2" y="4.6" width="20" height="14.8" rx="2" />
      <path
        d="M3.4 6.2 12 13l8.6-6.8M3.4 17.8 9.6 12M20.6 17.8 14.4 12"
        fill="none"
        stroke={SCORE}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Nine cells — the reference's grid is 3 × 3, not 2 × 2. */
export function GridIcon({ size = 24, className }: IconProps) {
  const track = [2.6, 9.4, 16.2];
  return (
    <svg {...solid(size)} className={className} aria-hidden>
      {track.map((y) =>
        track.map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="5.2" height="5.2" rx="0.7" />),
      )}
    </svg>
  );
}

export function PersonIcon({ size = 24, className }: IconProps) {
  return (
    <svg {...solid(size)} className={className} aria-hidden>
      <circle cx="12" cy="6.9" r="4.2" />
      <path d="M12 12.4c-4.3 0-7.7 3.3-7.7 7.4a1.1 1.1 0 0 0 1.1 1.1h13.2a1.1 1.1 0 0 0 1.1-1.1c0-4.1-3.4-7.4-7.7-7.4Z" />
      {/* collar: the lapel score that opens the shoulders */}
      <path
        d="M9.8 13.1 12 16.2l2.2-3.1"
        fill="none"
        stroke={SCORE}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The one navigation mark the reference draws as an outline rather than
 * a silhouette: a board with a dog-eared corner, ruled lines and a wax
 * seal struck at its foot.
 */
export function ClipboardIcon({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
    >
      <path d="M6 2.4h8.6l4.6 4.6v14.6a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6V4a1.6 1.6 0 0 1 1.6-1.6Z" />
      <path d="M14.4 2.6V7h4.6" />
      <g strokeWidth="1.5" strokeLinecap="round">
        <path d="M7.6 10.6h6.6M7.6 13.6h8.6M12.4 16.6h4.2" />
      </g>
      <rect x="7.2" y="15.4" width="3.4" height="3.4" rx="0.6" fill="currentColor" strokeWidth="1" />
    </svg>
  );
}

/** Solid cog: eight teeth around a hub with a bored centre. */
export function GearIcon({ size = 22, className }: IconProps) {
  const teeth = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={0.6}
      strokeLinejoin="round"
    >
      {teeth.map((deg) => (
        <rect
          key={deg}
          x="10.6"
          y="1.7"
          width="2.8"
          height="4.4"
          rx="0.6"
          transform={`rotate(${deg} 12 12)`}
        />
      ))}
      <circle cx="12" cy="12" r="7" />
      <circle
        cx="12"
        cy="12"
        r="3.1"
        fill="rgba(28,17,4,0.36)"
        stroke="rgba(28,17,4,0.45)"
        strokeWidth="0.5"
      />
    </svg>
  );
}

export function BellIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <path d="M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function ClockIcon({ size = 16, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

/** Small ornament that follows the page title. */
export function TitleFlourish({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="52"
      height="18"
      viewBox="0 0 52 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden
    >
      <path d="M2 9h13M50 9H37" strokeLinecap="round" />
      <path d="M15 9l4.5-3.4M15 9l4.5 3.4M37 9l-4.5-3.4M37 9l-4.5 3.4" strokeLinecap="round" />
      <circle cx="26" cy="5.2" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="26" cy="9" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="26" cy="12.8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
