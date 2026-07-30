import type { Feature, Stat } from '../../types';
import { StatCardRow } from './StatCardRow';
import { SectionRule } from './SectionRule';
import { FeatureGrid } from './FeatureGrid';
import styles from './MainContent.module.css';

interface MainContentProps {
  stats: Stat[];
  features: Feature[];
}

export function MainContent({ stats, features }: MainContentProps) {
  return (
    <main className={styles.main}>
      <StatCardRow stats={stats} />
      <SectionRule label="Active Features" />
      <FeatureGrid features={features} />
    </main>
  );
}
