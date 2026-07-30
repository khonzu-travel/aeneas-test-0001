import type { Stat } from '../../types';
import { Corners } from '../common/Corners';
import styles from './StatCard.module.css';

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <article className={styles.frame}>
      <div className={styles.face} data-tone={stat.tone}>
        <Corners />
        <p className={styles.value}>{stat.value}</p>
        <p className={styles.label}>{stat.label}</p>
      </div>
    </article>
  );
}
