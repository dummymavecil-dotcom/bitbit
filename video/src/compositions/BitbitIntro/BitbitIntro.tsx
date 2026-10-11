import { Audio } from '@remotion/media';
import { linearTiming, springTiming, TransitionSeries } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { AbsoluteFill, interpolate, staticFile, useVideoConfig } from 'remotion';
import { COLORS } from '../../theme';
import { EASE, sec } from '../../utils';
import type { BitbitIntroProps } from './schema';
import { FactsScene } from './scenes/FactsScene';
import { OutroScene } from './scenes/OutroScene';
import { ShareScene } from './scenes/ShareScene';
import { TitleScene } from './scenes/TitleScene';
import { SCENES, TRANSITION_SECONDS } from './timing';

/**
 * Sample composition: four scenes joined by transitions, with a music bed.
 * Structure to copy: schema.ts (props) → timing.ts (seconds) → scenes/* → this file (assembly).
 */
export const BitbitIntro: React.FC<BitbitIntroProps> = (props) => {
  const { fps, durationInFrames } = useVideoConfig();
  const t = sec(TRANSITION_SECONDS, fps);
  // A critically damped spring that completes in exactly `t` frames: calm, no overshoot.
  const calmSpring = springTiming({ config: { damping: 200 }, durationInFrames: t, durationRestThreshold: 0.001 });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={sec(SCENES.title, fps)}>
          <TitleScene props={props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: 'from-right' })} timing={calmSpring} />
        <TransitionSeries.Sequence durationInFrames={sec(SCENES.facts, fps)}>
          <FactsScene props={props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: t, easing: EASE.inOut })} />
        <TransitionSeries.Sequence durationInFrames={sec(SCENES.share, fps)}>
          <ShareScene props={props} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: 'from-bottom' })} timing={calmSpring} />
        <TransitionSeries.Sequence durationInFrames={sec(SCENES.outro, fps)}>
          <OutroScene props={props} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {props.music ? (
        <Audio
          src={staticFile('audio/sample-pad.mp3')}
          // Volume as a function of the frame: fade in over 1 s, out over the last 1.5 s.
          volume={(f) =>
            interpolate(f, [0, sec(1, fps), durationInFrames - sec(1.5, fps), durationInFrames], [0, 0.8, 0.8, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}
    </AbsoluteFill>
  );
};
