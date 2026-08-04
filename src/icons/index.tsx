/*
 * Hand-authored glyphs. Every icon is a plain `currentColor` shape so the
 * embossing (highlight above, shadow below) can be applied by the consuming
 * component with a CSS drop-shadow filter rather than baked into the path.
 */
import type { SVGProps } from 'react';
import type { NavIcon } from '../types';

type IconProps = SVGProps<SVGSVGElement>;

const base = (props: IconProps) => ({
  viewBox: '0 0 24 24',
  width: '1em',
  height: '1em',
  focusable: 'false' as const,
  'aria-hidden': true,
  ...props,
});

export function HomeIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M12 3.2 2.6 11.1a1 1 0 0 0 .65 1.76H5v7.3a.9.9 0 0 0 .9.9h3.5v-5.1h5.2v5.1h3.5a.9.9 0 0 0 .9-.9v-7.3h1.75a1 1 0 0 0 .65-1.76Z"
      />
    </svg>
  );
}

export function InboxIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M2.4 5.6h19.2c.44 0 .8.36.8.8v11.2c0 .44-.36.8-.8.8H2.4a.8.8 0 0 1-.8-.8V6.4c0-.44.36-.8.8-.8Zm.9 2.05v.62l8.7 5.35 8.7-5.35v-.62l-8.7 5.35Z"
      />
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <g fill="currentColor">
        {[3.2, 9.7, 16.2].map((y) =>
          [3.2, 9.7, 16.2].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="4.6" height="4.6" rx="0.6" />),
        )}
      </g>
    </svg>
  );
}

export function AgentIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M12 2.9a4.35 4.35 0 1 1 0 8.7 4.35 4.35 0 0 1 0-8.7Zm0 10.1c4.6 0 8.3 2.6 8.3 5.8v2.3H3.7v-2.3c0-3.2 3.7-5.8 8.3-5.8Z"
      />
    </svg>
  );
}

export function PetitionIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M8.2 2.2h7.6c.5 0 .9.4.9.9v.7h2.4c.5 0 .9.4.9.9v16.2c0 .5-.4.9-.9.9H4.9a.9.9 0 0 1-.9-.9V4.7c0-.5.4-.9.9-.9h2.4v-.7c0-.5.4-.9.9-.9Zm-.6 8h8.8v1.7H7.6Zm0 3.6h8.8v1.7H7.6Zm0 3.6h5.9v1.7H7.6Z"
      />
      <rect fill="currentColor" x="8.9" y="1.4" width="6.2" height="2.9" rx="0.9" />
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  const teeth = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg {...base(props)}>
      <g fill="currentColor">
        {teeth.map((deg) => (
          <rect key={deg} x="10.4" y="0.9" width="3.2" height="5.2" rx="0.7" transform={`rotate(${deg} 12 12)`} />
        ))}
        <path d="M12 3.9a8.1 8.1 0 1 1 0 16.2 8.1 8.1 0 0 1 0-16.2Zm0 4.6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
      </g>
    </svg>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path
        fill="currentColor"
        d="M12 1.9c.83 0 1.5.67 1.5 1.5v.72a6.6 6.6 0 0 1 5.1 6.43v3.4l1.72 2.6a.85.85 0 0 1-.71 1.32H4.39a.85.85 0 0 1-.71-1.32l1.72-2.6v-3.4a6.6 6.6 0 0 1 5.1-6.43V3.4c0-.83.67-1.5 1.5-1.5Zm-2.5 17.1h5a2.5 2.5 0 0 1-5 0Z"
      />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...base(props)}>
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
        <circle cx="12" cy="12" r="9.1" />
        <path d="M12 6.6V12l3.7 2.5" />
      </g>
    </svg>
  );
}

/** Ship's wheel emblem crowning the sidebar logo plate. */
export function WheelIcon(props: IconProps) {
  const spokes = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg {...base(props)}>
      <g stroke="currentColor" fill="none" strokeWidth="1.4">
        <circle cx="12" cy="12" r="7.4" />
        <circle cx="12" cy="12" r="4.2" />
      </g>
      <g fill="currentColor">
        <circle cx="12" cy="12" r="1.9" />
        {spokes.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 12 12)`}>
            <rect x="11.35" y="4.2" width="1.3" height="7.8" rx="0.5" />
            <path d="M12 1.1 13.5 4.1h-3Z" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Fleuron separating the page title from the empty header field. */
export function FleuronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 16" width="64" height="16" focusable="false" aria-hidden {...props}>
      <g fill="currentColor">
        {/* Tapered rules running out to either side of the centre stone. */}
        <path d="M1 7.2 24 7.6v0.8L1 8.8Zm62 0L40 7.6v0.8L63 8.8Z" />
        {/* Open lozenge with a solid pip. */}
        <path d="M32 1.6 38.4 8 32 14.4 25.6 8Zm0 2.4L28 8l4 4 4-4Z" />
        <circle cx="32" cy="8" r="1.5" />
        {/* Curled tips echoing the brasswork on the frames. */}
        <path d="M23.4 4.5c2 1 3 2.2 3 3.5s-1 2.5-3 3.5c1.2-1.2 1.8-2.4 1.8-3.5s-.6-2.3-1.8-3.5Z" />
        <path d="M40.6 4.5c-2 1-3 2.2-3 3.5s1 2.5 3 3.5c-1.2-1.2-1.8-2.4-1.8-3.5s.6-2.3 1.8-3.5Z" />
      </g>
    </svg>
  );
}

/**
 * Cast scrollwork that sits over a plate corner. Authored for the top-left;
 * the other three are mirrored in CSS.
 */
export function FiligreeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" focusable="false" aria-hidden {...props}>
      <g fill="none" stroke="currentColor" strokeLinecap="round">
        {/* Outer curl sweeping away from the corner. */}
        <path
          d="M4 30c0-14 10-24 24-24 8 0 13 4 13 9 0 4-3 7-7 7-3 0-5-2-5-5"
          strokeWidth="4.6"
          stroke="#1d1103"
          opacity="0.85"
        />
        <path d="M4 30c0-14 10-24 24-24 8 0 13 4 13 9 0 4-3 7-7 7-3 0-5-2-5-5" strokeWidth="2.6" />
        {/* Inner volute. */}
        <path d="M14 34c-1-9 5-16 14-16 4 0 6 2 6 5" strokeWidth="3.2" stroke="#1d1103" opacity="0.8" />
        <path d="M14 34c-1-9 5-16 14-16 4 0 6 2 6 5" strokeWidth="1.7" />
        {/* Leaf tips. */}
        <path d="M9 40c4-2 6-5 6-9M40 11c-2 4-5 6-9 6" strokeWidth="2.2" />
      </g>
      <circle cx="34" cy="14" r="2.6" fill="currentColor" stroke="#1d1103" strokeWidth="1" />
    </svg>
  );
}

/** Cast trefoil terminal that caps the right end of a section rule. */
export function RuleFinialIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 34 30" width="34" height="30" focusable="false" aria-hidden {...props}>
      <defs>
        <linearGradient id="rf-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0cd84" />
          <stop offset="34%" stopColor="#c8933d" />
          <stop offset="66%" stopColor="#82521a" />
          <stop offset="100%" stopColor="#3c2208" />
        </linearGradient>
      </defs>
      <g fill="url(#rf-brass)" stroke="#1d1103" strokeWidth="0.7" strokeLinejoin="round">
        {/* Socket the pipe seats into. */}
        <path d="M0 11h9v8H0Z" />
        {/* Crown: three lobes fanning out from the socket. */}
        <path d="M8 8.5h6l4-5 2.5 5.5 5-2-2 5.5 6 2.5-6 2.5 2 5.5-5-2L18 26.5l-4-5H8Z" />
        {/* Central boss. */}
        <ellipse cx="16.5" cy="15" rx="2.6" ry="3.6" />
      </g>
    </svg>
  );
}

const navIcons: Record<NavIcon, (props: IconProps) => React.ReactElement> = {
  home: HomeIcon,
  inbox: InboxIcon,
  grid: GridIcon,
  agent: AgentIcon,
  petition: PetitionIcon,
};

export function NavGlyph({ icon, ...props }: { icon: NavIcon } & IconProps) {
  const Glyph = navIcons[icon];
  return <Glyph {...props} />;
}
