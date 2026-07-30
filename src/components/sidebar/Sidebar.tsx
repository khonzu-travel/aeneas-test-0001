import type { NavEntry } from '../../types';
import { LogoPlate } from './LogoPlate';
import { NavMenu } from './NavMenu';
import { StatusLamp } from './StatusLamp';
import { GaugeCluster } from './GaugeCluster';
import styles from './Sidebar.module.css';

interface SidebarProps {
  entries: NavEntry[];
  activeId: string;
  /** Lets the phone drawer close itself once a destination is chosen. */
  onNavigate: () => void;
}

export function Sidebar({ entries, activeId, onNavigate }: SidebarProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.panel}>
        <LogoPlate />
        <NavMenu entries={entries} activeId={activeId} onNavigate={onNavigate} />
        <div className={styles.foot}>
          <StatusLamp label="Platform Online" />
          <GaugeCluster />
        </div>
      </div>
    </div>
  );
}
