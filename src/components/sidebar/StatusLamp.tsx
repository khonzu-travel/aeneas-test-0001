import styles from './StatusLamp.module.css';

interface StatusLampProps {
  label: string;
  /** Drives the lamp colour; only the online state is used by the dashboard. */
  online?: boolean;
}

export function StatusLamp({ label, online = true }: StatusLampProps) {
  return (
    <div className={styles.frame} role="status">
      <div className={styles.plate}>
        <span className={online ? styles.lampOn : styles.lampOff} aria-hidden />
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
