import styles from './GaugeCluster.module.css';

const gauges = '/art/gauges.png';

/** Decorative brass plumbing and instrumentation closing out the sidebar. */
export function GaugeCluster() {
  return <img className={styles.cluster} src={gauges} alt="" aria-hidden />;
}
