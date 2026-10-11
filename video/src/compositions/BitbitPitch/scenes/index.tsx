import type { PitchScene } from '../player';
import { CUE, LEN } from '../timing';
import { AddsScene, GlanceScene, PapersScene, PillarsScene, RecordScene, ReportedScene, TitleScene } from '../../BitbitExplainer/shots/Part1';
import { BatchScene, CheckScene, ScanScene, SourceScene, VisitsScene, WwwwScene } from '../../BitbitExplainer/shots/Part2';
import { ForwardScene, PartnerScene, PrepareAScene, PrepareBScene, PresentScene, ReceiveScene, SavingScene, ZeroScene } from './p4-p5';
import { AiCardScene, ClosingScene, CountriesScene, EcosystemScene, FreeScene, GiveBackScene, HoursScene, IntegrationScene, MillionsScene, NationalIdScene, OneInTenScene, ScaleScene, SickScene, StepsScene, Year3Scene } from './p6-p8';
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

  // Part 4: Prepare
  { key: 'prepareA', start: CUE.feels, enter: 'part', Component: PrepareAScene },
  { key: 'forward', start: CUE.forward, enter: 'right', Component: ForwardScene },
  { key: 'prepareB', start: CUE.decides, enter: 'right', Component: PrepareBScene },

  // Part 5: Share
  { key: 'present', start: CUE.present, enter: 'part', Component: PresentScene },
  { key: 'partner', start: CUE.partner, enter: 'right', Component: PartnerScene },
  { key: 'receive', start: CUE.receives, enter: 'right', Component: ReceiveScene },
  { key: 'zero', start: CUE.zero, enter: 'fade', Component: ZeroScene },
  { key: 'saving', start: CUE.saving, enter: 'right', Component: SavingScene },

  // Part 6: business model (lines 39–41 share the ecosystem scene)
  { key: 'ecosystem', start: CUE.beauty, enter: 'part', Component: EcosystemScene },
  { key: 'free', start: CUE.free, enter: 'right', Component: FreeScene },
  { key: 'ai', start: CUE.ai, enter: 'fade', Component: AiCardScene },
  { key: 'steps', start: CUE.steps, enter: 'fade', Component: StepsScene },
  { key: 'integration', start: CUE.integration, enter: 'right', Component: IntegrationScene },

  // Part 7: scale and impact
  { key: 'millions', start: CUE.millions, enter: 'part', Component: MillionsScene },
  { key: 'nationalId', start: CUE.nationalId, enter: 'right', Component: NationalIdScene },
  { key: 'oneInTen', start: CUE.oneInTen, enter: 'fade', Component: OneInTenScene },
  { key: 'scale', start: CUE.scale, enter: 'right', Component: ScaleScene },
  { key: 'year3', start: CUE.year3, enter: 'right', Component: Year3Scene },
  { key: 'countries', start: CUE.countries, enter: 'right', Component: CountriesScene },
  { key: 'giveBack', start: CUE.giveBack, enter: 'fade', Component: GiveBackScene },
  { key: 'hours', start: CUE.hours, enter: 'fade', Component: HoursScene },

  // Part 8: close (lines 55–56 + end hold share one brand card)
  { key: 'sick', start: CUE.sick, enter: 'part', Component: SickScene },
  { key: 'closing', start: CUE.tagline, enter: 'reveal', Component: () => <ClosingScene timerAt={LEN.tagline} /> },
];
