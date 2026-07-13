import clsx from 'clsx';
import styles from './Sidebar.module.css';
import { WheelEmblem, ClockCluster } from './Emblems';
import {
  HomeIcon,
  InboxIcon,
  GridIcon,
  PersonIcon,
  ClipboardIcon,
} from './Icons';
import type { JSX } from 'react';

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
      <div className={clsx(styles.inner, 'dark-panel')}>
        <div className={clsx(styles.logoPlate, 'plaque')}>
          <div className={styles.logoWheel}>
            <WheelEmblem size={46} />
          </div>
          <span className={clsx(styles.brand, 'gold-metal')}>AENEAS</span>
          <span className={clsx(styles.brandSub, 'engrave-gold')}>
            Delivery Platform
          </span>
        </div>

        <nav className={styles.nav}>
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              className={clsx(
                styles.navItem,
                item.active && styles.navActive,
                item.active && 'plaque',
                'engrave-gold'
              )}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge !== undefined && (
                <span className={styles.navBadge}>{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        <div className={styles.footer}>
          <div className={clsx(styles.statusLamp, 'plaque')}>
            <span className={clsx(styles.lamp, 'led-pulse')} />
            <span className={clsx(styles.statusText, 'engrave-gold')}>
              Platform Online
            </span>
          </div>
          <div className={styles.gauges}>
            <ClockCluster />
          </div>
        </div>
      </div>
    </aside>
  );
}
