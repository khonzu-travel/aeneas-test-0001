export type Stage = 'intent' | 'analysis' | 'scheduling' | 'build' | 'release';

export type ItemState =
  | 'approved'
  | 'in-build'
  | 'drafting'
  | 'review'
  | 'blocked'
  | 'done'
  | 'not-started';

export interface Feature {
  id: string;
  title: string;
  stage: Stage;
  /** e.g. 4 of 6 */
  phase: { current: number; total: number };
  /** sentence under the progress pills */
  summary: string;
  /** completed / total tasks, or null → rendered as "—" */
  progress: { done: number; total: number } | null;
  story: { state: ItemState; label: string };
  spec: { state: ItemState; label: string };
  lastEventAgo: string;
  blocked?: { reason: string };
}

export const STAGE_LABEL: Record<Stage, string> = {
  intent: 'Intent',
  analysis: 'Analysis & Design',
  scheduling: 'Scheduling',
  build: 'Build',
  release: 'Release',
};

export interface Stat {
  value: number;
  label: string;
  tone: 'default' | 'danger' | 'success' | 'gold';
}

export const stats: Stat[] = [
  { value: 6, label: 'Active Features', tone: 'default' },
  { value: 8, label: 'Pending Actions', tone: 'danger' },
  { value: 9, label: 'Agents Working', tone: 'success' },
  { value: 1, label: 'Features Blocked', tone: 'gold' },
];

export const features: Feature[] = [
  {
    id: 'auth-sso',
    title: 'User Authentication & SSO',
    stage: 'build',
    phase: { current: 4, total: 6 },
    summary: 'Phase 4 of 6 · 12 of 18 tasks complete',
    progress: { done: 12, total: 18 },
    story: { state: 'approved', label: 'Story: Approved' },
    spec: { state: 'in-build', label: 'Spec: In Build' },
    lastEventAgo: '4m ago',
  },
  {
    id: 'payments',
    title: 'Payment Processing',
    stage: 'analysis',
    phase: { current: 2, total: 6 },
    summary: 'Phase 2 of 6 · Spec drafting in progress',
    progress: null,
    story: { state: 'approved', label: 'Story: Approved' },
    spec: { state: 'drafting', label: 'Spec: Drafting' },
    lastEventAgo: '1h ago',
  },
  {
    id: 'reporting',
    title: 'Reporting Dashboard',
    stage: 'intent',
    phase: { current: 1, total: 6 },
    summary: 'Phase 1 of 6 · Story under review',
    progress: null,
    story: { state: 'review', label: 'Story: Under Review' },
    spec: { state: 'not-started', label: 'Spec: Not started' },
    lastEventAgo: '3h ago',
  },
  {
    id: 'rate-limiting',
    title: 'API Rate Limiting',
    stage: 'scheduling',
    phase: { current: 3, total: 6 },
    summary: 'Phase 3 of 6 · Awaiting scheduling decision',
    progress: null,
    story: { state: 'approved', label: 'Story: Approved' },
    spec: { state: 'approved', label: 'Spec: Approved' },
    lastEventAgo: '45m ago',
  },
  {
    id: 'push-notifications',
    title: 'Mobile Push Notifications',
    stage: 'build',
    phase: { current: 4, total: 6 },
    summary: 'Phase 4 of 6 · 5 of 14 tasks complete',
    progress: { done: 5, total: 14 },
    story: { state: 'approved', label: 'Story: Approved' },
    spec: { state: 'blocked', label: 'Spec: Blocked' },
    lastEventAgo: '2d ago',
    blocked: { reason: 'Awaiting third-party API credentials' },
  },
  {
    id: 'data-export',
    title: 'Data Export Module',
    stage: 'release',
    phase: { current: 5, total: 6 },
    summary: 'Phase 5 of 6 · Deployment in progress',
    progress: { done: 22, total: 22 },
    story: { state: 'approved', label: 'Story: Approved' },
    spec: { state: 'done', label: 'Spec: Done' },
    lastEventAgo: '8m ago',
  },
];
