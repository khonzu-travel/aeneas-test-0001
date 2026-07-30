import { WheelIcon } from '../../icons';
import styles from './LogoPlate.module.css';

/** Engraved brass nameplate: wheel emblem, AENEAS, and the sub-banner. */
export function LogoPlate() {
  return (
    <div className={styles.mount}>
      <span className={styles.emblem} aria-hidden>
        <WheelIcon />
      </span>
      <div className={styles.frame}>
        <div className={styles.plate}>
          <h1 className={styles.wordmark}>AENEAS</h1>
          <span className={styles.rule} aria-hidden />
          <p className={styles.tagline}>Delivery Platform</p>
        </div>
        <span className={styles.finial} aria-hidden />
      </div>
    </div>
  );
}
