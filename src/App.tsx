import { useState } from 'react';
import clsx from 'clsx';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import HeaderBar from './components/HeaderBar';
import { StatCardRow } from './components/StatCard';
import { SectionRule } from './components/SectionRule';
import { FeatureGrid } from './components/FeatureCard';
import { PipeColumn, CornerPlate } from './components/Ornaments';
import { stats, features } from './data/features';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className={styles.frame}>
      <span className={clsx(styles.rivetStrip, styles.rsTop)} aria-hidden />
      <span className={clsx(styles.rivetStrip, styles.rsBottom)} aria-hidden />
      <span className={clsx(styles.rivetStrip, styles.rsLeft)} aria-hidden />
      <span className={clsx(styles.rivetStrip, styles.rsRight)} aria-hidden />
      <CornerPlate className={clsx(styles.corner, styles.cTL)} />
      <CornerPlate className={clsx(styles.corner, styles.cTR)} />
      <CornerPlate className={clsx(styles.corner, styles.cBL)} />
      <CornerPlate className={clsx(styles.corner, styles.cBR)} />

      <div className={styles.shell}>
        <PipeColumn variant="left" className={styles.pipeLeft} />
        <PipeColumn variant="right" className={styles.pipeRight} />

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
