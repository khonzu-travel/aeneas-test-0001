import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HeaderBar.module.css';
import { GearIcon, BellIcon, TitleFlourish } from './Icons';

/** Knurled-edge brass medallion button. */
function Medallion({
  label,
  badge,
  children,
}: {
  label: string;
  badge?: number;
  children: ReactNode;
}) {
  return (
    <button type="button" className={styles.medallion} aria-label={label}>
      <span className={styles.knurl} aria-hidden />
      <span className={styles.face} aria-hidden />
      <span className={styles.glyph}>{children}</span>
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </button>
  );
}

export default function HeaderBar({ onMenu }: { onMenu: () => void }) {
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
          <TitleFlourish className={styles.flourish} />
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
