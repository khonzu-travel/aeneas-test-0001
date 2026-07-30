import type { Feature } from '../../types';
import { FeatureCard } from './FeatureCard';
import styles from './FeatureGrid.module.css';

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section className={styles.grid} aria-label="Active features">
      {features.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </section>
  );
}
