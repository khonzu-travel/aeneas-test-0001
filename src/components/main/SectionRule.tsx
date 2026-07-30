import { RuleFinialIcon } from '../../icons';
import styles from './SectionRule.module.css';

/** Brass pipe running the width of the content area, tagged with a plate. */
export function SectionRule({ label }: { label: string }) {
  return (
    <div className={styles.rule}>
      <span className={styles.plateFrame}>
        <span className={styles.plate}>{label}</span>
      </span>
      <span className={styles.pipe} aria-hidden>
        <span className={styles.collar} />
      </span>
      <span className={styles.finial} aria-hidden>
        <RuleFinialIcon />
      </span>
    </div>
  );
}
