import styles from './Corners.module.css';

/**
 * The four riveted brass gussets that pin a parchment panel into its frame.
 * Purely decorative, so it is inert to pointers and hidden from the a11y tree.
 */
export function Corners() {
  return (
    <span className={styles.corners} aria-hidden>
      <span className={styles.tl} />
      <span className={styles.tr} />
      <span className={styles.bl} />
      <span className={styles.br} />
    </span>
  );
}
