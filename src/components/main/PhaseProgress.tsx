import styles from './PhaseProgress.module.css';

interface PhaseProgressProps {
  current: number;
  total: number;
}

/** One pill per pipeline phase: completed, in-flight, or not yet reached. */
export function PhaseProgress({ current, total }: PhaseProgressProps) {
  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      aria-valuetext={`Phase ${current} of ${total}`}
    >
      {Array.from({ length: total }, (_, i) => {
        const index = i + 1;
        const state = index < current ? 'filled' : index === current ? 'current' : 'empty';
        return <span key={index} className={styles.segment} data-state={state} />;
      })}
    </div>
  );
}
