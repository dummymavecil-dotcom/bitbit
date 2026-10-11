import { linearTiming, springTiming, TransitionSeries, type TransitionPresentation } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { Fragment } from 'react';
import { Sequence, useVideoConfig } from 'remotion';
import { EASE } from '../../utils';

/** How a scene enters. `part` = slide up from the bottom (between parts), `reveal` = slow fade. */
export type Enter = 'right' | 'fade' | 'part' | 'reveal';

export type PitchScene = {
  key: string;
  /** Start time in seconds on the whole-video timeline (usually a script cue). */
  start: number;
  enter: Enter;
  Component: React.FC;
};

const LEN: Record<Enter, number> = { right: 0.7, fade: 0.7, part: 0.9, reveal: 0.9 };

/**
 * Plays scenes back to back with transitions. Each scene still *starts* exactly at its `start`:
 * the outgoing scene is extended by the length of the incoming transition.
 * `from`/`to` (seconds) cut out a window, used for the per-part preview compositions.
 */
export const ScenePlayer: React.FC<{ scenes: PitchScene[]; from: number; to: number }> = ({ scenes, from, to }) => {
  const { fps } = useVideoConfig();
  const f = (s: number) => Math.round((s - from) * fps);
  const calm = (frames: number) => springTiming({ config: { damping: 200 }, durationInFrames: frames, durationRestThreshold: 0.001 });
  return (
    <TransitionSeries>
      {scenes.map((sc, i) => {
        const next = scenes[i + 1];
        const end = next ? next.start + LEN[next.enter] : to;
        const t = Math.round(LEN[sc.enter] * fps);
        const presentation = (
          sc.enter === 'right' ? slide({ direction: 'from-right' }) : sc.enter === 'part' ? slide({ direction: 'from-bottom' }) : fade()
        ) as TransitionPresentation<Record<string, unknown>>;
        const timing = sc.enter === 'fade' || sc.enter === 'reveal' ? linearTiming({ durationInFrames: t, easing: EASE.inOut }) : calm(t);
        return (
          <Fragment key={sc.key}>
            {i > 0 ? <TransitionSeries.Transition presentation={presentation} timing={timing} /> : null}
            <TransitionSeries.Sequence durationInFrames={f(end) - f(Math.max(sc.start, from))}>
              {sc.start < from ? (
                // Scene began before this window (part preview): keep its internal timing.
                <Sequence from={f(sc.start)} layout="none">
                  <sc.Component />
                </Sequence>
              ) : (
                <sc.Component />
              )}
            </TransitionSeries.Sequence>
          </Fragment>
        );
      })}
    </TransitionSeries>
  );
};
