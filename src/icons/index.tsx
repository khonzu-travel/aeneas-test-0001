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
