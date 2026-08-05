import styles from './IconButton.module.css';

const gear = '/art/btn-gear.png';
const bell = '/art/btn-bell.png';

const sprites = { gear, bell } as const;

interface IconButtonProps {
  icon: keyof typeof sprites;
  label: string;
  badge?: number;
}

/** Circular brass escutcheon button; the badge is the one absolute overlay. */
export function IconButton({ icon, label, badge }: IconButtonProps) {
  return (
    <button type="button" className={styles.button} aria-label={badge ? `${label} (${badge} new)` : label}>
      <img className={styles.face} src={sprites[icon]} alt="" aria-hidden />
      {badge !== undefined && (
        <span className={styles.badge} aria-hidden>
          {badge}
        </span>
      )}
    </button>
  );
}
