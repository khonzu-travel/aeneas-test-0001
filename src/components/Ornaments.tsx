/* Cast-brass ornament set for the sidebar.

   Everything here is bolted onto a plaque, so the pieces are authored at
   a fixed pixel size and positioned by CSS rather than stretched: a
   stretched bracket reads as a rendering artefact, not as metal.

   Several pieces are mirrored copies of one casting. The light is fixed
   at the top-left of the page, so a mirrored group would carry its
   highlight round with it — every gradient and every rivet dome
   therefore takes the mirror flags and pre-compensates, leaving the
   finished ornament lit from the same quarter on both sides. */

interface OrnProps {
  className?: string;
}

interface Flip {
  flipX?: boolean;
  flipY?: boolean;
}

/* ---- shared brass defs ------------------------------------------- */

/** Rolled-bar shading. Stops run dark · lit · body · shade across the bar. */
function BarGradient({ id, flipX, flipY }: { id: string } & Flip) {
  return (
    <linearGradient
      id={id}
      x1={flipX ? '1' : '0'}
      y1={flipY ? '1' : '0'}
      x2={flipX ? '0' : '1'}
      y2={flipY ? '0' : '1'}
    >
      <stop offset="0" stopColor="#150c02" />
      <stop offset="0.16" stopColor="#a3802f" />
      <stop offset="0.36" stopColor="#fbeec0" />
      <stop offset="0.58" stopColor="#c39a3d" />
      <stop offset="0.82" stopColor="#5a4116" />
      <stop offset="1" stopColor="#130b02" />
    </linearGradient>
  );
}

/** Domed rivet head. */
function DomeGradient({ id, flipX, flipY }: { id: string } & Flip) {
  return (
    <radialGradient id={id} cx={flipX ? '66%' : '34%'} cy={flipY ? '72%' : '28%'} r="74%">
      <stop offset="0" stopColor="#fffbe6" />
      <stop offset="0.2" stopColor="#f4dc9e" />
      <stop offset="0.5" stopColor="#c09a42" />
      <stop offset="0.78" stopColor="#7c5c1e" />
      <stop offset="1" stopColor="#241804" />
    </radialGradient>
  );
}

function Rivet({
  x,
  y,
  r = 2,
  fill,
  flipX,
  flipY,
}: { x: number; y: number; r?: number; fill: string } & Flip) {
  const hx = x + (flipX ? 1 : -1) * r * 0.33;
  const hy = y + (flipY ? 1 : -1) * r * 0.36;
  return (
    <g>
      <circle cx={x} cy={y + (flipY ? -0.5 : 0.5)} r={r + 0.5} fill="#120b02" opacity="0.5" />
      <circle cx={x} cy={y} r={r} fill={fill} stroke="#160d02" strokeWidth="0.7" />
      <circle cx={hx} cy={hy} r={r * 0.28} fill="#fffdf0" opacity="0.75" />
    </g>
  );
}

/* ---- banner frame corners ---------------------------------------- */

export type Corner = 'tl' | 'tr' | 'bl' | 'br';

/**
 * Corner bracket of the banner frame: the rail sweeps through 90° on a
 * generous radius, doubled by an engraved inner line, with a rivet where
 * the curve meets each straight run. The rail centreline sits 4px in
 * from both edges, so the plain CSS rails butt onto it exactly.
 */
export function FrameCorner({ corner, className }: { corner: Corner; className?: string }) {
  const flipX = corner === 'tr' || corner === 'br';
  const flipY = corner === 'bl' || corner === 'br';
  const uid = `fc-${corner}`;

  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" aria-hidden>
      <defs>
        <BarGradient id={`${uid}-b`} flipX={flipX} flipY={flipY} />
        <DomeGradient id={`${uid}-d`} flipX={flipX} flipY={flipY} />
      </defs>
      <g
        transform={`translate(${flipX ? 32 : 0} ${flipY ? 32 : 0}) scale(${flipX ? -1 : 1} ${
          flipY ? -1 : 1
        })`}
      >
        {/* the rail sits in a dark seat cut into the plaque */}
        <path d="M32 4H19A15 15 0 0 0 4 19v13" fill="none" stroke="#150c02" strokeWidth="6.6" />
        <path
          d="M32 4H19A15 15 0 0 0 4 19v13"
          fill="none"
          stroke={`url(#${uid}-b)`}
          strokeWidth="4.4"
        />
        {/* engraved inner line, following the same sweep further inboard */}
        <path
          d="M32 10.5H21A10.5 10.5 0 0 0 10.5 21v11"
          fill="none"
          stroke="rgba(246,224,162,0.34)"
          strokeWidth="1.1"
        />
        <Rivet x={22.5} y={4} fill={`url(#${uid}-d)`} flipX={flipX} flipY={flipY} />
        <Rivet x={4} y={22.5} fill={`url(#${uid}-d)`} flipX={flipX} flipY={flipY} />
      </g>
    </svg>
  );
}

/* ---- banner crest and pendant ------------------------------------- */

/**
 * Acanthus wing: a scroll running outboard along the rail, two leaves
 * hanging under it and a terminal curl. It keeps close to the rail
 * line — this is a casting bolted onto the bar, not a bracket.
 */
function Wing({ fill }: { fill: string }) {
  return (
    <g fill={fill} stroke="#211502" strokeWidth="0.8" strokeLinejoin="round">
      <path d="M72 27c-9-6-21-10-34-10-11 0-19 3-25 8 7-3 14-4.6 22-4.6 12 0 24 3 33 8.6Z" />
      <path d="M60 24c-2 6-7 10-13 10 3 4 10 3 13-3 1-3 1-5 0-7Z" />
      <path d="M45 20c-2 6-8 10-14 9 3 4 10 4 13-2 1-2 2-5 1-7Z" />
      <path d="M13 26c-4-2-8 0-8 4s4 6 7 4c-2 0-4-2-4-4s2-4 5-4Z" />
      <circle cx="30" cy="23" r="2.1" />
    </g>
  );
}

/**
 * The crest straddling the banner's top rail: a ship's wheel on the
 * centreline with a wing spreading each way. The wheel is drawn here
 * rather than reused from the instrument set so its rim can carry the
 * collar the reference shows where it crosses the rail.
 */
export function BannerCrest({ className }: OrnProps) {
  const spokes = Array.from({ length: 8 }, (_, i) => (i * 360) / 8);
  return (
    <svg className={className} width="164" height="52" viewBox="0 0 164 52" aria-hidden>
      <defs>
        <BarGradient id="crest-b" />
        <BarGradient id="crest-bm" flipX />
        <DomeGradient id="crest-d" />
        <radialGradient id="crest-hub" cx="40%" cy="32%" r="72%">
          <stop offset="0" stopColor="#fdf3c4" />
          <stop offset="0.5" stopColor="#c39a3d" />
          <stop offset="1" stopColor="#4a340f" />
        </radialGradient>
      </defs>

      <Wing fill="url(#crest-b)" />
      <g transform="translate(164 0) scale(-1 1)">
        <Wing fill="url(#crest-bm)" />
      </g>

      {/* ship's wheel, centred on the rail */}
      <g transform="translate(82 24)">
        <circle cx="0" cy="0" r="23" fill="#150c02" opacity="0.6" />
        {spokes.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d="M-2.6-22.5h5.2l-1-5.6h-3.2Z"
              fill="url(#crest-b)"
              stroke="#211502"
              strokeWidth="0.7"
            />
            <rect
              x="-1.5"
              y="-21"
              width="3"
              height="16"
              fill="url(#crest-b)"
              stroke="#211502"
              strokeWidth="0.6"
            />
          </g>
        ))}
        <circle cx="0" cy="0" r="20.5" fill="none" stroke="url(#crest-b)" strokeWidth="3.4" />
        <circle cx="0" cy="0" r="22.4" fill="none" stroke="#211502" strokeWidth="0.9" />
        <circle cx="0" cy="0" r="18.6" fill="none" stroke="#211502" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="13" fill="none" stroke="url(#crest-b)" strokeWidth="2.6" />
        <circle cx="0" cy="0" r="6" fill="url(#crest-hub)" stroke="#211502" strokeWidth="1" />
        <circle cx="-1.7" cy="-1.9" r="1.6" fill="#fff8dc" opacity="0.7" />
      </g>

      {/* collar bolts where the wings pass under the wheel */}
      <Rivet x={54} y={24} r={1.8} fill="url(#crest-d)" />
      <Rivet x={110} y={24} r={1.8} fill="url(#crest-d)" />
    </svg>
  );
}

/**
 * Half of the pendant's wing. The bottom rail does not simply run past
 * the pendant: it steps down towards the centreline in a shallow vee,
 * and a pair of scroll curls hangs beneath the step.
 */
function PendantWing({ fill }: { fill: string }) {
  return (
    <g fill={fill} stroke="#211502" strokeWidth="0.8" strokeLinejoin="round">
      {/* the step down to the escutcheon */}
      <path d="M24 8l21.6 13.4-2.6 4.4L24 13.6Z" />
      {/* leaves hanging under the step — the same casting as the crest */}
      <path d="M32 17c-.6 5.4-5 9.2-10.6 9.6 3.6 3 8.8 1.2 10.6-3.4.8-2 .8-4.2 0-6.2Z" />
      <path d="M42 23.6c-.6 4.6-4.4 8-9.2 8.4 3.2 2.6 7.8 1 9.2-3 .7-1.8.7-3.6 0-5.4Z" />
      <circle cx="25.4" cy="10.6" r="2.4" />
    </g>
  );
}

/**
 * The pendant hanging from the centre of the banner's bottom rail: an
 * arched escutcheon with a teardrop struck into it, wings stepping down
 * to it from either side, and a drop bead overhanging onto the paper.
 */
export function BannerPendant({ className }: OrnProps) {
  return (
    <svg className={className} width="112" height="44" viewBox="0 0 112 44" aria-hidden>
      <defs>
        <BarGradient id="pend-b" />
        <BarGradient id="pend-bm" flipX />
        <DomeGradient id="pend-d" />
        <radialGradient id="pend-drop" cx="38%" cy="30%" r="72%">
          <stop offset="0" stopColor="#fdf3c4" />
          <stop offset="0.45" stopColor="#c9a049" />
          <stop offset="1" stopColor="#3d2b0b" />
        </radialGradient>
      </defs>

      <PendantWing fill="url(#pend-b)" />
      <g transform="translate(112 0) scale(-1 1)">
        <PendantWing fill="url(#pend-bm)" />
      </g>

      {/* arched escutcheon */}
      <path
        d="M56 7.4c6.9 0 12.4 5.2 12.4 11.6v11.6c0 1.7-1.3 3-3 3H46.6c-1.7 0-3-1.3-3-3V19c0-6.4 5.5-11.6 12.4-11.6Z"
        fill="url(#pend-b)"
        stroke="#211502"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M56 11.4c4.7 0 8.6 3.5 8.6 7.9v9.5c0 1.1-.9 2-2 2h-13.2c-1.1 0-2-.9-2-2v-9.5c0-4.4 3.9-7.9 8.6-7.9Z"
        fill="#1d1204"
        opacity="0.75"
      />
      <path
        d="M56 15.2c2.7 2.7 4.5 5.1 4.5 7.5a4.5 4.5 0 0 1-9 0c0-2.4 1.8-4.8 4.5-7.5Z"
        fill="url(#pend-drop)"
      />
      <Rivet x={56} y={6} r={2.2} fill="url(#pend-d)" />

      {/* base rail, stem and drop */}
      <rect
        x="44.6"
        y="33.4"
        width="22.8"
        height="2.8"
        rx="1.2"
        fill="url(#pend-b)"
        stroke="#211502"
        strokeWidth="0.6"
      />
      <rect
        x="54.9"
        y="36"
        width="2.2"
        height="3.4"
        fill="url(#pend-b)"
        stroke="#211502"
        strokeWidth="0.5"
      />
      <Rivet x={56} y={40.6} r={2.2} fill="url(#pend-d)" />
    </svg>
  );
}

/* ---- cartouche end caps ------------------------------------------- */

/* The active navigation plaque and the status plate are both
   cartouches: a dark bronze field inside a brass bar. Their ends are
   cast pieces and their middles are plain bar, so each is drawn as a
   left cap and a right cap at a fixed height with a CSS bar spanning
   between them — the caps never scale, however wide the sidebar gets.
   The rail centreline sits 2.2px (nav) / 2.6px (plate) from the top and
   bottom edges so the CSS bar lines up with the cast ends. */

export const NAV_PLAQUE_H = 54;
export const STATUS_PLATE_H = 42;

/** Chamfered left end of the active navigation plaque. */
export function NavCapLeft({ className }: OrnProps) {
  return (
    <svg
      className={className}
      width="28"
      height={NAV_PLAQUE_H}
      viewBox={`0 0 28 ${NAV_PLAQUE_H}`}
      aria-hidden
    >
      <defs>
        <BarGradient id="ncl-b" />
        <DomeGradient id="ncl-d" />
        <linearGradient id="ncl-f" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#4a3719" />
          <stop offset="0.45" stopColor="#2c1d09" />
          <stop offset="1" stopColor="#1a1004" />
        </linearGradient>
      </defs>
      <path
        d="M28 2.2H14.6L2.2 14.6v24.8L14.6 51.8H28"
        fill="url(#ncl-f)"
        stroke="url(#ncl-b)"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path
        d="M28 7.4H16.8L7.4 16.8v20.4l9.4 9.4H28"
        fill="none"
        stroke="rgba(246,224,162,0.4)"
        strokeWidth="1"
      />
      <Rivet x={12.5} y={8.4} r={1.7} fill="url(#ncl-d)" />
      <Rivet x={12.5} y={45.6} r={1.7} fill="url(#ncl-d)" />
    </svg>
  );
}

/**
 * Right end of the active plaque. Past the chamfers the bar swells into
 * a lobe on the centreline — the lug the plaque is hung from — so this
 * cap is wider than the left one and the lobe overhangs the field.
 */
export function NavCapRight({ className }: OrnProps) {
  return (
    <svg
      className={className}
      width="36"
      height={NAV_PLAQUE_H}
      viewBox={`0 0 36 ${NAV_PLAQUE_H}`}
      aria-hidden
    >
      <defs>
        <BarGradient id="ncr-b" />
        <DomeGradient id="ncr-d" />
        <linearGradient id="ncr-f" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#4a3719" />
          <stop offset="0.45" stopColor="#2c1d09" />
          <stop offset="1" stopColor="#1a1004" />
        </linearGradient>
      </defs>
      <path
        d="M0 2.2h11.4l12.4 12.4v4.6c5.4 1 8.8 3.4 8.8 7.8s-3.4 6.8-8.8 7.8v4.6L11.4 51.8H0"
        fill="url(#ncr-f)"
        stroke="url(#ncr-b)"
        strokeWidth="3.6"
        strokeLinejoin="round"
      />
      <path
        d="M0 7.4h9.2l9.4 9.4v20.4l-9.4 9.4H0"
        fill="none"
        stroke="rgba(246,224,162,0.4)"
        strokeWidth="1"
      />
      <Rivet x={15.5} y={8.4} r={1.7} fill="url(#ncr-d)" />
      <Rivet x={15.5} y={45.6} r={1.7} fill="url(#ncr-d)" />
      <Rivet x={28.4} y={23.4} r={1.5} fill="url(#ncr-d)" />
      <Rivet x={28.4} y={30.6} r={1.5} fill="url(#ncr-d)" />
    </svg>
  );
}

/**
 * Ends of the status plate. The bar steps in through a pair of ogees at
 * each corner — a scrolled ear rather than a plain chamfer — over the
 * same dark bronze field as the navigation plaque.
 */
export function PlateCap({ side, className }: { side: 'l' | 'r'; className?: string }) {
  const flipX = side === 'r';
  const uid = `pc-${side}`;
  return (
    <svg
      className={className}
      width="30"
      height={STATUS_PLATE_H}
      viewBox={`0 0 30 ${STATUS_PLATE_H}`}
      aria-hidden
    >
      <defs>
        <BarGradient id={`${uid}-b`} flipX={flipX} />
        <DomeGradient id={`${uid}-d`} flipX={flipX} />
        <linearGradient
          id={`${uid}-f`}
          x1={flipX ? '1' : '0'}
          y1="0"
          x2={flipX ? '0.7' : '0.3'}
          y2="1"
        >
          <stop offset="0" stopColor="#40300f" />
          <stop offset="0.45" stopColor="#271a07" />
          <stop offset="1" stopColor="#171003" />
        </linearGradient>
      </defs>
      <g transform={flipX ? 'translate(30 0) scale(-1 1)' : undefined}>
        <path
          d="M30 2.6H16.4c-3 0-4.4 1.6-4.6 3.6-.2 2.2-1.6 3.4-3.6 3.6-2.2.2-5.2 1.4-5.2 4.6v13.2c0 3.2 3 4.4 5.2 4.6 2 .2 3.4 1.4 3.6 3.6.2 2 1.6 3.6 4.6 3.6H30"
          fill={`url(#${uid}-f)`}
          stroke={`url(#${uid}-b)`}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M30 7.4H18.6c-2.2 0-3 1.2-3.2 2.6-.2 1.6-1.4 2.6-3 2.8-1.6.2-3.6 1-3.6 3.2v10c0 2.2 2 3 3.6 3.2 1.6.2 2.8 1.2 3 2.8.2 1.4 1 2.6 3.2 2.6H30"
          fill="none"
          stroke="rgba(246,224,162,0.36)"
          strokeWidth="0.9"
        />
        <Rivet x={17.4} y={7.6} r={1.5} fill={`url(#${uid}-d)`} flipX={flipX} />
        <Rivet x={17.4} y={34.4} r={1.5} fill={`url(#${uid}-d)`} flipX={flipX} />
        <Rivet x={6.6} y={21} r={1.4} fill={`url(#${uid}-d)`} flipX={flipX} />
      </g>
    </svg>
  );
}
