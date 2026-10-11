import { Audio } from '@remotion/media';
import { linearTiming, springTiming, TransitionSeries, type TransitionPresentation } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Fragment } from 'react';
import { z } from 'zod';
import { interpolate, staticFile, useVideoConfig } from 'remotion';
import { EASE } from '../../utils';
import { AddsScene, GlanceScene, PapersScene, PillarsScene, RecordScene, ReportedScene, TimerScene, TitleScene } from './shots/Part1';
import { BatchScene, CheckScene, EndScene, ScanScene, SourceScene, VisitsScene, WwwwScene } from './shots/Part2';
import { SCENES, sceneFrames, TOTAL_SECONDS, TRANSITION_SECONDS, type SceneId } from './timing';

export const BitbitExplainerSchema = z.object({
  /** Play the music bed. */
  music: z.boolean(),
  /** Narration file in public/, e.g. "audio/narration.mp3". Leave empty until it's recorded. */
  narration: z.string(),
});

export type BitbitExplainerProps = z.infer<typeof BitbitExplainerSchema>;

/** Length in seconds, derived from the script (timing.ts). */
export const BitbitExplainer_SECONDS = TOTAL_SECONDS;

const SCENE_COMPONENTS: Record<SceneId, React.FC> = {
  title: TitleScene,
  timer: TimerScene,
  glance: GlanceScene,
  pillars: PillarsScene,
  record: RecordScene,
  adds: AddsScene,
  reported: ReportedScene,
  papers: PapersScene,
  scan: ScanScene,
  check: CheckScene,
  source: SourceScene,
  batch: BatchScene,
  visits: VisitsScene,
  wwww: WwwwScene,
  end: EndScene,
};

/** How each scene enters: same vocabulary as the BitbitIntro sample (slides and fades, no bounce). */
type Kind = 'right' | 'bottom' | 'fade';
const ENTRANCE: Partial<Record<SceneId, Kind>> = {
  timer: 'right',
  glance: 'fade',
  pillars: 'right',
  record: 'right',
  adds: 'right',
  reported: 'fade',
  papers: 'right',
  scan: 'bottom', // Part 2 starts
  check: 'right',
  source: 'fade',
  batch: 'right',
  visits: 'right',
  wwww: 'fade',
  end: 'bottom',
};

/**
 * Bitbit explainer, Parts 1–2 (Collect). Full-screen straight scenes joined by transitions.
 *   timing.ts  script lines, scene start times, transition length
 *   shots/     one component per scene (Part1.tsx, Part2.tsx) and shared pieces (common.tsx)
 *   screens/   app screens rebuilt in React where something on them moves
 */
export const BitbitExplainer: React.FC<BitbitExplainerProps> = ({ music, narration }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frames = sceneFrames(fps);
  const t = Math.round(TRANSITION_SECONDS * fps);
  // Critically damped spring that finishes in exactly `t` frames: calm, no overshoot.
  const calm = springTiming({ config: { damping: 200 }, durationInFrames: t, durationRestThreshold: 0.001 });
  const presentation = (k: Kind): TransitionPresentation<Record<string, unknown>> =>
    (k === 'fade' ? fade() : slide({ direction: k === 'right' ? 'from-right' : 'from-bottom' })) as TransitionPresentation<Record<string, unknown>>;

  return (
    <>
      <TransitionSeries>
        {SCENES.map((scene, i) => {
          const Scene = SCENE_COMPONENTS[scene.id];
          const kind = ENTRANCE[scene.id];
          return (
            <Fragment key={scene.id}>
              {i > 0 && kind ? (
                <TransitionSeries.Transition
                  presentation={presentation(kind)}
                  timing={kind === 'fade' ? linearTiming({ durationInFrames: t, easing: EASE.inOut }) : calm}
                />
              ) : null}
              <TransitionSeries.Sequence durationInFrames={frames[i]}>
                <Scene />
              </TransitionSeries.Sequence>
            </Fragment>
          );
        })}
      </TransitionSeries>
      {music ? (
        <Audio
          src={staticFile('audio/explainer-bed.mp3')}
          volume={(f) =>
            interpolate(f, [0, fps * 1, durationInFrames - fps * 2.5, durationInFrames], [0, narration ? 0.35 : 0.7, narration ? 0.35 : 0.7, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}
      {narration ? <Audio src={staticFile(narration)} /> : null}
    </>
  );
};
