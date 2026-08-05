import type { Feature, ItemState } from '../../types';
import { ClockIcon } from '../../icons';
import { StageBadge } from './StageBadge';
import { PhaseProgress } from './PhaseProgress';
import { itemStateLabels, itemStateTone } from './labels';
import styles from './FeatureCard.module.css';

export function FeatureCard({ feature }: { feature: Feature }) {
  const { title, stage, phase, progress, phaseNote, story, spec, lastEventAgo, blocked } = feature;

  return (
    <article className={blocked ? styles.frameBlocked : styles.frame} data-blocked={blocked ? 'true' : undefined}>
      <header className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <StageBadge stage={stage} />
      </header>

      <PhaseProgress current={phase.current} total={phase.total} />

      <p className={styles.summary}>
        Phase {phase.current} of {phase.total} <span className={styles.dot}>·</span> {phaseNote}
      </p>

      <div className={styles.statusRow}>
        <StatusItem kind="Story" state={story} />
        <StatusItem kind="Spec" state={spec} />
        <TaskCount progress={progress} />
      </div>

      <p className={styles.lastEvent}>
        <span className={styles.clock} aria-hidden>
          <ClockIcon />
        </span>
        <span className={styles.ago}>{lastEventAgo}</span>
        <span className={styles.agoLabel}>Last event</span>
      </p>

      {blocked && <BlockedBanner reason={blocked.reason} />}
    </article>
  );
}

function StatusItem({ kind, state }: { kind: 'Story' | 'Spec'; state: ItemState }) {
  return (
    <p className={styles.statusItem}>
      <span className={styles.lamp} data-tone={itemStateTone[state]} aria-hidden />
      <span className={styles.statusLabel}>
        {kind}: {itemStateLabels[state]}
      </span>
    </p>
  );
}

function TaskCount({ progress }: { progress: Feature['progress'] }) {
  return (
    <p className={styles.taskCount}>
      <span className={progress ? styles.taskValue : styles.taskValueEmpty}>
        {progress ? `${progress.done} / ${progress.total}` : '—'}
        {!progress && <span className={styles.srOnly}>No tasks yet</span>}
      </span>
      <span className={styles.taskLabel}>Tasks</span>
    </p>
  );
}

function BlockedBanner({ reason }: { reason: string }) {
  return (
    <p className={styles.blockedBanner}>
      <span className={styles.blockedDot} aria-hidden />
      <span className={styles.blockedWord}>Blocked</span>
      <span className={styles.dot} aria-hidden>
        ·
      </span>
      <span className={styles.blockedReason}>{reason}</span>
    </p>
  );
}
