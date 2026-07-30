import type { Stat } from '../../types';
import { StatCard } from './StatCard';
import styles from './StatCardRow.module.css';

export function StatCardRow({ stats }: { stats: Stat[] }) {
  return (
    <section className={styles.row} aria-label="Delivery summary">
      {stats.map((stat) => (
        <StatCard key={stat.id} stat={stat} />
      ))}
    </section>
  );
}
