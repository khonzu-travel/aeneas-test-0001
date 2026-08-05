import styles from './LogoPlate.module.css';

const logoPlate = '/art/logo-plate.png';
const wheel = '/art/wheel.png';

/**
 * The engraved nameplate. The wordmark is part of the casting in the reference
 * art, so the plate ships as a single sprite that scales to the sidebar width;
 * the accessible name is carried by the alt text rather than live type.
 */
export function LogoPlate() {
  return (
    <div className={styles.mount}>
      <h1 className={styles.heading}>
        <img className={styles.plate} src={logoPlate} alt="AENEAS Delivery Platform" />
      </h1>
      <img className={styles.wheel} src={wheel} alt="" aria-hidden />
    </div>
  );
}
