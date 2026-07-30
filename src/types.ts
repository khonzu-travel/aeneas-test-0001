/** Delivery pipeline stages, in pipeline order. */
export type Stage = 'intent' | 'analysis' | 'scheduling' | 'build' | 'release';

/**
 * State of an individual work item (story or spec) attached to a feature.
 * `in-build` is not in the original data sketch but the reference screen shows
 * it ("Spec: In Build"), so it is modelled rather than special-cased.
 */
export type ItemState =
  | 'approved'
  | 'drafting'
  | 'review'
  | 'in-build'
  | 'blocked'
  | 'done'
  | 'not-started';

/** How a status dot / stat card is tinted. */
export type Tone = 'default' | 'danger' | 'success' | 'gold';

export interface Feature {
  id: string;
  title: string;
  stage: Stage;
  /** Position in the six-phase delivery pipeline, e.g. 4 of 6. */
  phase: { current: number; total: number };
  /** Task rollup, or `null` when no tasks have been cut yet (renders as "—"). */
  progress: { done: number; total: number } | null;
  /** Free-text right-hand half of the phase summary line. */
  phaseNote: string;
  story: ItemState;
  spec: ItemState;
  lastEventAgo: string;
  blocked?: { reason: string };
}

export interface Stat {
  id: string;
  value: number;
  label: string;
  tone: Tone;
}

export type NavIcon = 'home' | 'inbox' | 'grid' | 'agent' | 'petition';

export interface NavEntry {
  id: string;
  label: string;
  icon: NavIcon;
  badge?: number;
}
