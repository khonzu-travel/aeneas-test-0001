import clsx from 'clsx';
import type { JSX } from 'react';
import styles from './Sidebar.module.css';
import { WheelEmblem, ClockFace, Gauge, ValveWheel } from './Instruments';
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

export default function Sidebar({ open }: { open: boolean }) {
  return (
    <aside className={clsx(styles.sidebar, 'brass-frame', 'rivets', open && styles.open)}>
      <div className={clsx(styles.inner, 'parchment')}>
        {/* engraved banner: dark plaque, gold wordmark */}
        <div className={clsx(styles.banner, 'plaque')}>
          <WheelEmblem size={42} />
          <span className={clsx(styles.brand, 'gold-metal')}>AENEAS</span>
          <span className={clsx(styles.brandSub, 'engrave-gold')}>Delivery Platform</span>
        </div>

        <nav className={styles.nav}>
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(styles.navItem, item.active && styles.navActive, 'engrave')}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge !== undefined && <span className={styles.navBadge}>{item.badge}</span>}
            </button>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={clsx(styles.lampPlate, 'plaque')}>
            <span className={clsx(styles.lamp, 'led-pulse')} />
            <span className={clsx(styles.lampText, 'engrave-gold')}>Platform Online</span>
          </div>
          <div className={styles.instruments}>
            <ValveWheel size={34} />
            <ClockFace size={88} />
            <Gauge size={54} value={0.72} label="PSI" />
          </div>
        </div>
      </div>
    </aside>
  );
}
