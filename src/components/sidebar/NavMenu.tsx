import type { NavEntry } from '../../types';
import { NavGlyph } from '../../icons';
import styles from './NavMenu.module.css';

interface NavMenuProps {
  entries: NavEntry[];
  activeId: string;
  onNavigate: () => void;
}

export function NavMenu({ entries, activeId, onNavigate }: NavMenuProps) {
  return (
    <nav aria-label="Primary">
      <ul className={styles.list}>
        {entries.map((entry) => (
          <NavItem key={entry.id} entry={entry} active={entry.id === activeId} onNavigate={onNavigate} />
        ))}
      </ul>
    </nav>
  );
}

interface NavItemProps {
  entry: NavEntry;
  active: boolean;
  onNavigate: () => void;
}

function NavItem({ entry, active, onNavigate }: NavItemProps) {
  return (
    <li className={styles.item}>
      <a
        href={`#${entry.id}`}
        className={active ? styles.linkActive : styles.link}
        aria-current={active ? 'page' : undefined}
        title={entry.label}
        onClick={onNavigate}
      >
        <span className={styles.glyph}>
          <NavGlyph icon={entry.icon} />
        </span>
        <span className={styles.label}>{entry.label}</span>
        {entry.badge !== undefined && (
          <span className={styles.badge}>
            {entry.badge}
            <span className={styles.badgeContext}> unread</span>
          </span>
        )}
      </a>
    </li>
  );
}
