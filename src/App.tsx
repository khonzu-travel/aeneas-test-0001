import { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import { StatCardRow } from './components/StatCard';
import { SectionRule } from './components/SectionRule';
import { FeatureGrid } from './components/FeatureCard';
import { PipeFrame, PipeColumn, PipeRail } from './components/Pipes';
import { stats, features } from './data/features';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <PipeFrame />

        <Sidebar open={navOpen} />
        <PipeColumn className={styles.pipeColumn} />
        {navOpen && (
          <button
            type="button"
            className={styles.scrim}
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
          />
        )}

        <HeaderBar onMenu={() => setNavOpen((v) => !v)} />
        <PipeRail className={styles.pipeRail} />

        <div className={styles.stats}>
          <StatCardRow stats={stats} />
        </div>
        <PipeRail className={styles.pipeRail2} />

        <main className={styles.main}>
          <SectionRule label="Active Features" />
          <FeatureGrid features={features} />
        </main>
      </div>
    </div>
  );
}
