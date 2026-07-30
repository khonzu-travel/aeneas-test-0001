import type { Stage } from '../../types';
import { stageLabels } from './labels';
import styles from './StageBadge.module.css';

/** Enamelled plate naming the pipeline stage a feature currently sits in. */
export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span className={styles.badge} data-stage={stage}>
      {stageLabels[stage]}
    </span>
  );
}
