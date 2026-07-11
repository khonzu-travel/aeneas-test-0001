import clsx from 'clsx';
import styles from './HeaderBar.module.css';
import { GearIcon, BellIcon, DividerFlourish } from './Icons';

interface HeaderBarProps {
  onMenu: () => void;
}

export default function HeaderBar({ onMenu }: HeaderBarProps) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={clsx(styles.menuBtn, 'brass-frame')}
        onClick={onMenu}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={clsx(styles.titleBar, 'brass-frame', 'rivets')}>
        <div className={clsx(styles.titleInner, 'parchment')}>
          <h1 className={clsx(styles.title, 'engrave-deep')}>Dashboard</h1>
          <DividerFlourish className={styles.flourish} />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Settings">
          <GearIcon size={24} />
        </button>
        <button type="button" className={styles.iconBtn} aria-label="Notifications">
          <BellIcon size={24} />
          <span className={styles.iconBadge}>8</span>
        </button>
      </div>
    </header>
  );
}
