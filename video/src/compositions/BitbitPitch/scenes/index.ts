import type { PitchScene } from '../player';
import { CUE } from '../timing';
import { EnvelopeScene, MathScene, MeetScene, NextScene, QueueScene, QuestionsScene, ScatteredScene, SwitchScene, ThirtyScene } from './p1-problem';

/**
 * Every scene of the pitch, in order. `start` is a script cue (plus an offset when a line holds
 * two scenes). `enter` is how the scene comes in: right/fade inside a part, part = between parts.
 */
export const SCENES: PitchScene[] = [
  // Part 1: the problem
  { key: 'meet', start: CUE.meet, enter: 'fade', Component: MeetScene },
  { key: 'queue', start: CUE.queue, enter: 'right', Component: QueueScene },
  { key: 'envelope', start: CUE.envelope, enter: 'right', Component: EnvelopeScene },
  { key: 'questions', start: CUE.questions, enter: 'right', Component: QuestionsScene },
  { key: 'scattered', start: CUE.scattered, enter: 'fade', Component: ScatteredScene },
  { key: 'thirty', start: CUE.thirty, enter: 'fade', Component: ThirtyScene },
  { key: 'next', start: CUE.next, enter: 'right', Component: NextScene },
  { key: 'math', start: CUE.math, enter: 'right', Component: MathScene },
  { key: 'switch', start: CUE.switch, enter: 'fade', Component: SwitchScene },
];
