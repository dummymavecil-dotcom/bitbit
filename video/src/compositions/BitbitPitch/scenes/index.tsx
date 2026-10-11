import type { PitchScene } from '../player';
import { CUE, LEN } from '../timing';
import { AddsScene, GlanceScene, PapersScene, PillarsScene, RecordScene, ReportedScene, TitleScene } from '../../BitbitExplainer/shots/Part1';
import { BatchScene, CheckScene, ScanScene, SourceScene, VisitsScene, WwwwScene } from '../../BitbitExplainer/shots/Part2';
import { HistoryScene, ProviderReviewScene, RevealTimerScene, SourcesScene } from './p2-p3';
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

  // Part 2: introducing Bitbit
  { key: 'intro', start: CUE.intro, enter: 'reveal', Component: TitleScene },
  { key: 'timer', start: CUE.timer, enter: 'right', Component: RevealTimerScene },
  { key: 'glance', start: CUE.glance, enter: 'fade', Component: GlanceScene },
  // Lines 13–14a share one scene: "collect" lights up as line 14 begins.
  { key: 'pillars', start: CUE.pillars, enter: 'right', Component: () => <PillarsScene collectAt={LEN.pillars} /> },

  // Part 3: Collect
  { key: 'record', start: CUE.collect + 3.0, enter: 'part', Component: RecordScene },
  { key: 'adds', start: CUE.adds, enter: 'right', Component: () => <AddsScene chipTimes={[2.4, 2.85, 3.25]} tagsAt={LEN.adds + 0.2} /> },
  { key: 'reported', start: CUE.reported + 1.5, enter: 'fade', Component: ReportedScene },
  { key: 'papers', start: CUE.papers, enter: 'right', Component: PapersScene },
  { key: 'scan', start: CUE.scan, enter: 'right', Component: ScanScene },
  { key: 'check', start: CUE.check, enter: 'right', Component: CheckScene },
  { key: 'source', start: CUE.source, enter: 'fade', Component: SourceScene },
  { key: 'batch', start: CUE.batch, enter: 'right', Component: BatchScene },
  { key: 'visits', start: CUE.visits, enter: 'right', Component: VisitsScene },
  { key: 'wwww', start: CUE.wwww, enter: 'fade', Component: () => <WwwwScene pace={0.62} /> },
  { key: 'history', start: CUE.history, enter: 'right', Component: HistoryScene },
  { key: 'review', start: CUE.history + 2.5, enter: 'fade', Component: ProviderReviewScene },
  { key: 'sources', start: CUE.sources, enter: 'right', Component: SourcesScene },
];
