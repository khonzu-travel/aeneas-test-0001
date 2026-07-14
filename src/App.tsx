import { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import { StatCardRow } from './components/StatCard';
import { SectionRule } from './components/SectionRule';
import { FeatureGrid } from './components/FeatureCard';
import { PipeLoop, PipeDivider } from './components/Ornaments';
import { stats, features } from './data/features';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={styles.frame}>
      <div className={styles.shell}>
        <PipeLoop />

        <Sidebar open={navOpen} />
        <PipeDivider className={styles.divider} />
        {navOpen && (
          <button
            type="button"
            className={styles.scrim}
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
        )}

        <HeaderBar onMenu={() => setNavOpen((v) => !v)} />

        <main className={styles.main}>
          <StatCardRow stats={stats} />
          <SectionRule label="Active Features" />
          <FeatureGrid features={features} />
        </main>
      </div>
    </div>
  );
}
