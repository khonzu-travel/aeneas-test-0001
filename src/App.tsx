import { useState } from 'react';
import clsx from 'clsx';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import { StatCardRow } from './components/StatCard';
import { SectionRule } from './components/SectionRule';
import { FeatureGrid } from './components/FeatureCard';
import { stats, features } from './data/features';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={clsx(styles.frame, 'brass-frame', 'rivets')}>
      <div className={styles.shell}>
        <Sidebar open={navOpen} />
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
