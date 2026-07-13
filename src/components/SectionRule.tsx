import clsx from 'clsx';
import styles from './SectionRule.module.css';

export function SectionRule({ label }: { label: string }) {
  return (
    <div className={styles.rule} role="separator" aria-label={label}>
      <span className={styles.finial} />
      <span className={clsx(styles.rod, styles.rodShort)} />
      <span className={clsx(styles.plate, 'brass-frame')}>
        <span className={clsx(styles.plateText, 'engrave-gold')}>{label}</span>
      </span>
      <span className={styles.rod} />
      <span className={styles.finial} />
    </div>
  );
}
