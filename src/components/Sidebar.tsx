import clsx from 'clsx';
import type { JSX } from 'react';
import styles from './Sidebar.module.css';
import { ClockFace, Gauge } from './Instruments';
import { PipeStub, PipeFeed } from './Pipes';
import {
  FrameCorner,
  BannerCrest,
  BannerPendant,
  NavCapLeft,
  NavCapRight,
  PlateCap,
} from './Ornaments';
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
 * reference: the framed panel (banner + nav) stops above the status
 * plate, which is its own cartouche, and the instruments sit below that
 * directly on the dark ground.
 *
 * The banner is a bronze plaque filling the head of the panel — brass
 * bar all the way round, a ship's-wheel crest straddling the top rail
 * and a winged pendant hanging off the bottom one. The paper only
 * begins beneath it, where the navigation starts.
 */
export default function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={clsx(styles.sidebar, open && styles.open)}>
      <div className={clsx(styles.panel, 'brass-frame')}>
        <div className={clsx(styles.panelInner, 'parchment')}>
          <div className={styles.banner}>
            <FrameCorner corner="tl" className={clsx(styles.bannerCorner, styles.cornerTL)} />
            <FrameCorner corner="tr" className={clsx(styles.bannerCorner, styles.cornerTR)} />
            <FrameCorner corner="bl" className={clsx(styles.bannerCorner, styles.cornerBL)} />
            <FrameCorner corner="br" className={clsx(styles.bannerCorner, styles.cornerBR)} />

            <BannerCrest className={styles.bannerCrest} />

            <span className={clsx(styles.brand, 'gold-metal')}>AENEAS</span>
            <span className={styles.brandRule}>
              <i className={styles.ruleArm} />
              <i className={styles.ruleGem} />
              <i className={styles.ruleArm} />
            </span>
            <span className={clsx(styles.brandSub, 'engrave-gold')}>Delivery Platform</span>

            <BannerPendant className={styles.bannerPendant} />
          </div>

          <nav className={styles.nav}>
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={clsx(styles.navItem, item.active ? styles.navActive : 'engrave')}
              >
                {item.active && (
                  <>
                    <span className={styles.plaqueBar} />
                    <NavCapLeft className={clsx(styles.plaqueCap, styles.plaqueCapL)} />
                    <NavCapRight className={clsx(styles.plaqueCap, styles.plaqueCapR)} />
                  </>
                )}
                <span className={styles.navIcon}>{item.icon}</span>
                <span className={styles.navLabel}>{item.label}</span>
                {item.badge !== undefined && (
                  <span className={styles.navBadge}>
                    <span className={styles.navBadgeFace}>{item.badge}</span>
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className={styles.statusPlate}>
        <span className={styles.plateBar} />
        <PlateCap side="l" className={clsx(styles.plateCap, styles.plateCapL)} />
        <PlateCap side="r" className={clsx(styles.plateCap, styles.plateCapR)} />
        <span className={styles.statusInner}>
          <span className={clsx(styles.lamp, 'led-pulse')} />
          <span className={styles.lampText}>Platform Online</span>
        </span>
      </div>

      {/* instruments hang off a feed line tapped from the left-hand main */}
      <div className={styles.instruments}>
        <div className={styles.dials}>
          <div className={styles.mount}>
            <Gauge size={62} value={0.72} label="PSI" />
            <PipeStub />
          </div>
          <div className={styles.mount}>
            <ClockFace size={104} />
            <PipeStub />
          </div>
        </div>
        <PipeFeed />
      </div>
    </aside>
  );
}
