import clsx from 'clsx';
import { Fragment, type JSX } from 'react';
import styles from './Sidebar.module.css';
import { WheelEmblem, ClockFace, Cog, ScrollFlourish, Fleuron } from './Instruments';
import { PipeStub, PipeFeed } from './Pipes';
import { HomeIcon, InboxIcon, GridIcon, PersonIcon, ClipboardIcon } from './Icons';

interface NavEntry {
  id: string;
  label: string;
  icon: JSX.Element;
  badge?: number;
  active?: boolean;
}

const nav: NavEntry[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon />, active: true },
  { id: 'inbox', label: 'Inbox', icon: <InboxIcon />, badge: 8 },
  { id: 'features', label: 'Features', icon: <GridIcon /> },
  { id: 'agents', label: 'Agent Floor', icon: <PersonIcon /> },
  { id: 'petitions', label: 'Petitions', icon: <ClipboardIcon /> },
];

/**
 * The sidebar is a column of three separate pieces, as in the
 * reference: the framed parchment panel (banner + nav) stops above the
 * status lamp, which is its own small plate, and the instruments sit
 * below that directly on the dark ground.
 */
export default function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={clsx(styles.sidebar, open && styles.open)}>
      <div className={clsx(styles.panel, 'brass-frame', 'rivets')}>
        <div className={clsx(styles.panelInner, 'parchment')}>
          <div className={styles.bannerFrame}>
            <div className={clsx(styles.banner, 'plaque')}>
              {/* engraved keyline with mitred corner brackets */}
              <span className={styles.bannerKeyline} aria-hidden />

              {/* crest: the wheel breaks the top rail, scrollwork runs
                  out to either side of it */}
              <div className={styles.crest}>
                <ScrollFlourish size={42} flip className={styles.crestScroll} />
                <WheelEmblem size={42} />
                <ScrollFlourish size={42} className={styles.crestScroll} />
              </div>

              <span className={clsx(styles.brand, 'gold-metal')}>AENEAS</span>
              <span className={styles.brandRule} aria-hidden />
              <span className={clsx(styles.brandSub, 'engrave-gold')}>Delivery Platform</span>
              <Fleuron width={104} className={styles.bannerFleuron} />
            </div>
          </div>

          <nav className={styles.nav}>
            {nav.map((item) => (
              <Fragment key={item.id}>
                <button
                  type="button"
                  className={clsx(styles.navItem, item.active && styles.navActive, 'engrave')}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span className={styles.navLabel}>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={styles.navBadge}>{item.badge}</span>
                  )}
                </button>
                {/* hairline rule closing every entry, as on the reference */}
                <span className={styles.navRule} aria-hidden />
              </Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className={clsx(styles.lampFrame, 'brass-frame')}>
        <div className={clsx(styles.lampInner, 'plaque')}>
          <span className={clsx(styles.lamp, 'led-pulse')} />
          <span className={clsx(styles.lampText, 'engrave-gold')}>Platform Online</span>
        </div>
      </div>

      {/* instruments hang off a feed line tapped from the left-hand main:
          wheel, movement and cog, stepped down the way the reference
          stacks them */}
      <div className={styles.instruments}>
        <div className={styles.dials}>
          <div className={styles.mount}>
            <WheelEmblem size={58} />
            <PipeStub length={30} />
          </div>
          <div className={styles.mount}>
            <ClockFace size={104} />
            <PipeStub />
          </div>
          <div className={styles.mount}>
            <Cog size={62} />
            <PipeStub length={14} />
          </div>
        </div>
        <PipeFeed />
      </div>
    </aside>
  );
}
