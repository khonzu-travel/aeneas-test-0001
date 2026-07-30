import { useCallback, useState } from 'react';
import { Sidebar } from './components/sidebar/Sidebar';
import { HeaderBar } from './components/header/HeaderBar';
import { MainContent } from './components/main/MainContent';
import { features, navEntries, stats } from './data/dashboard';
import styles from './App.module.css';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  return (
    <div className={styles.chassis}>
      <div className={styles.app} data-drawer={drawerOpen ? 'open' : 'closed'}>
        <Sidebar entries={navEntries} activeId="dashboard" onNavigate={closeDrawer} />
        <HeaderBar
          title="Dashboard"
          notifications={8}
          drawerOpen={drawerOpen}
          onToggleDrawer={() => setDrawerOpen((open) => !open)}
        />
        <MainContent stats={stats} features={features} />
        <button
          type="button"
          className={styles.scrim}
          aria-label="Close navigation"
          tabIndex={drawerOpen ? 0 : -1}
          onClick={closeDrawer}
        />
      </div>
    </div>
  );
}
