import clsx from 'clsx';
import styles from './HeaderBar.module.css';
import { GearIcon, BellIcon, DividerFlourish } from './Icons';

interface HeaderBarProps {
  onMenu: () => void;
}

function Medallion({
  label,
  badge,
  children,
}: {
  label: string;
  badge?: number;
  children: React.ReactNode;
}) {
  return (
    <button type="button" className={styles.medallion} aria-label={label}>
      <span className={styles.knurl} aria-hidden />
      <span className={styles.medFace} aria-hidden />
      <span className={styles.medIcon}>{children}</span>
      {badge !== undefined && <span className={styles.iconBadge}>{badge}</span>}
    </button>
  );
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
        <Medallion label="Settings">
          <GearIcon size={26} />
        </Medallion>
        <Medallion label="Notifications" badge={8}>
          <BellIcon size={25} />
        </Medallion>
      </div>
    </header>
  );
}
