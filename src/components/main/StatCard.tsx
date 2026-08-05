import type { Stat } from '../../types';
import styles from './StatCard.module.css';

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <article className={styles.frame} data-tone={stat.tone}>
      <p className={styles.value}>{stat.value}</p>
      <p className={styles.label}>{stat.label}</p>
    </article>
  );
}
