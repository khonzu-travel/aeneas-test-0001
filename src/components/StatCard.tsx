import clsx from 'clsx';
import styles from './StatCard.module.css';
import type { Stat } from '../data/features';

export function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className={clsx(styles.card, 'brass-frame', 'rivets')}>
      <div className={clsx(styles.inner, 'parchment')}>
        <div className={clsx(styles.value, styles[stat.tone], 'engrave-deep')}>
          {stat.value}
        </div>
        <div className={clsx(styles.label, 'engrave')}>{stat.label}</div>
      </div>
    </div>
  );
}

export function StatCardRow({ stats }: { stats: Stat[] }) {
  return (
    <div className={styles.row}>
      {stats.map((s) => (
        <StatCard key={s.label} stat={s} />
      ))}
    </div>
  );
}
