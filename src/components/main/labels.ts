import type { ItemState, Stage } from '../../types';

export const stageLabels: Record<Stage, string> = {
  intent: 'Intent',
  analysis: 'Analysis & Design',
  scheduling: 'Scheduling',
  build: 'Build',
  release: 'Release',
};

export const itemStateLabels: Record<ItemState, string> = {
  approved: 'Approved',
  drafting: 'Drafting',
  review: 'Under Review',
  'in-build': 'In Build',
  blocked: 'Blocked',
  done: 'Done',
  'not-started': 'Not started',
};

/** Which lamp colour a work-item state lights up. */
export const itemStateTone: Record<ItemState, 'green' | 'amber' | 'red' | 'idle'> = {
  approved: 'green',
  'in-build': 'green',
  done: 'green',
  drafting: 'amber',
  review: 'amber',
  blocked: 'red',
  'not-started': 'idle',
};
