import { BellIcon, GearIcon } from '../../icons';
import styles from './IconButton.module.css';

const glyphs = { gear: GearIcon, bell: BellIcon } as const;

interface IconButtonProps {
  icon: keyof typeof glyphs;
  label: string;
  badge?: number;
}

/** Circular brass escutcheon button; the badge is the one absolute overlay. */
export function IconButton({ icon, label, badge }: IconButtonProps) {
  const Glyph = glyphs[icon];
  return (
    <button type="button" className={styles.button} aria-label={badge ? `${label} (${badge} new)` : label}>
      <span className={styles.face}>
        <Glyph className={styles.glyph} />
      </span>
      {badge !== undefined && (
        <span className={styles.badge} aria-hidden>
          {badge}
        </span>
      )}
    </button>
  );
}
