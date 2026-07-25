import clsx from 'clsx';
import styles from './FeatureCard.module.css';
import { ClockIcon } from './Icons';
import { STAGE_LABEL } from '../data/features';
import type { Feature, ItemState, Stage } from '../data/features';

const STAGE_CLASS: Record<Stage, string> = {
  intent: styles.stageIntent,
  analysis: styles.stageBlue,
  scheduling: styles.stageBlue,
  build: styles.stageBuild,
  release: styles.stageRelease,
};

function ledClass(state: ItemState): string {
  switch (state) {
    case 'blocked':
      return styles.ledRed;
    case 'review':
    case 'drafting':
    case 'not-started':
      return styles.ledAmber;
    default:
      return styles.ledGreen;
  }
}

function PhaseProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className={styles.progress} aria-label={`Phase ${current} of ${total}`}>
      {Array.from({ length: total }, (_, i) => {
        const n = i + 1;
        const mod =
          n < current ? styles.pillFilled : n === current ? styles.pillCurrent : styles.pillEmpty;
        return <span key={n} className={clsx(styles.pill, mod)} />;
      })}
    </div>
  );
}

function StatusItem({ state, label }: { state: ItemState; label: string }) {
  const [key, ...rest] = label.split(':');
  return (
    <div className={styles.statusItem}>
      <span className={clsx(styles.led, ledClass(state))} />
      <span className={clsx(styles.statusText, 'engrave')}>
        <span className={styles.statusKey}>{key}:</span>
        {rest.join(':')}
      </span>
    </div>
  );
}

export function FeatureCard({ feature }: { feature: Feature }) {
  const blocked = Boolean(feature.blocked);
  return (
    <article className={clsx(styles.card, 'brass-frame', 'rivets', blocked && styles.cardBlocked)}>
      <div className={clsx(styles.inner, 'parchment', blocked && styles.innerBlocked)}>
        <header className={styles.header}>
          <h3 className={clsx(styles.title, 'engrave')}>{feature.title}</h3>
          <span className={clsx(styles.badge, STAGE_CLASS[feature.stage])}>
            {STAGE_LABEL[feature.stage]}
          </span>
        </header>

        <PhaseProgress current={feature.phase.current} total={feature.phase.total} />

        <p className={clsx(styles.summary, 'engrave')}>{feature.summary}</p>

        <div className={styles.statusRow}>
          <StatusItem state={feature.story.state} label={feature.story.label} />
          <StatusItem state={feature.spec.state} label={feature.spec.label} />
          <div className={styles.taskCount}>
            <span className={clsx(styles.taskValue, 'engrave')}>
              {feature.progress ? `${feature.progress.done} / ${feature.progress.total}` : '—'}
            </span>
            <span className={clsx(styles.taskLabel, 'engrave')}>Tasks</span>
          </div>
        </div>

        <footer className={styles.footer}>
          <span className={styles.clock}>
            <ClockIcon size={17} />
          </span>
          <div className={styles.eventText}>
            <span className={clsx(styles.eventAgo, 'engrave')}>{feature.lastEventAgo}</span>
            <span className={clsx(styles.eventLabel, 'engrave')}>Last event</span>
          </div>
        </footer>

        {feature.blocked && (
          <div className={styles.blockedBanner}>
            <span className={styles.blockedDot} />
            <span className={styles.blockedText}>BLOCKED · {feature.blocked.reason}</span>
          </div>
        )}
      </div>
    </article>
  );
}

export function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <div className={styles.grid}>
      {features.map((f) => (
        <FeatureCard key={f.id} feature={f} />
      ))}
    </div>
  );
}
