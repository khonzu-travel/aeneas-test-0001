import { FleuronIcon } from '../../icons';
import { IconButton } from './IconButton';
import styles from './HeaderBar.module.css';

interface HeaderBarProps {
  title: string;
  notifications: number;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

export function HeaderBar({ title, notifications, drawerOpen, onToggleDrawer }: HeaderBarProps) {
  return (
    <header className={styles.frame}>
      <div className={styles.bar}>
        <button
          type="button"
          className={styles.drawerToggle}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? 'Close navigation' : 'Open navigation'}
          onClick={onToggleDrawer}
        >
          <span className={styles.drawerToggleBars} aria-hidden />
        </button>

        <h2 className={styles.title}>{title}</h2>
        <span className={styles.ornament} aria-hidden>
          <FleuronIcon />
        </span>

        <div className={styles.actions}>
          <IconButton icon="gear" label="Settings" />
          <IconButton icon="bell" label="Notifications" badge={notifications} />
        </div>
      </div>
    </header>
  );
}
