/* Hand-authored inline SVG icon set. Stroked glyphs share a base
   config; the gear is filled so it reads as a solid cog. */

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

export function HomeIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v9h5v-5h4v5h5v-9" />
    </svg>
  );
}

export function InboxIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 6l9 7 9-7" />
    </svg>
  );
}

export function GridIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
    </svg>
  );
}

export function PersonIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  );
}

export function ClipboardIcon({ size = 22, className }: IconProps) {
  return (
    <svg {...stroked(size)} className={className} aria-hidden>
      <rect x="5" y="4" width="14" height="17" rx="1.6" />
      <path d="M9 4.5V3.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
      <path d="M8.5 9.5h7M8.5 13h7M8.5 16.5h4" />
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
