import styles from './SectionRule.module.css';

const finial = '/art/rule-finial.png';

/** Brass pipe running the width of the content area, tagged with a plate. */
export function SectionRule({ label }: { label: string }) {
  return (
    <div className={styles.rule}>
      <span className={styles.plate}>{label}</span>
      <span className={styles.pipe} aria-hidden />
      <img className={styles.finial} src={finial} alt="" aria-hidden />
    </div>
  );
}
