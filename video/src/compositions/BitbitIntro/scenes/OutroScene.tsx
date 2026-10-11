import { staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText, Background, Reveal, Scene, SoundBars } from '../../../components';
import { COLORS, TYPE } from '../../../theme';
import { EASE, mix, progress, sec, useScale } from '../../../utils';
import type { BitbitIntroProps } from '../schema';
import { sceneStart } from '../timing';

export const OutroScene: React.FC<{ props: BitbitIntroProps }> = ({ props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useScale();
  // Underline sweeps under the wordmark.
  const line = progress(frame, sec(0.7, fps), sec(0.8, fps), EASE.standard);
  return (
    <Scene background={<Background seed="outro" glows={[COLORS.blue200, COLORS.cyan100, COLORS.blue100]} />}>
      <AnimatedText
        text="Bitbit"
        by="char"
        delay={0.15}
        stagger={0.05}
        rise={50 * s}
        blur={14}
        style={{ ...TYPE.hero, fontSize: 200 * s, color: props.accent }}
      />
      <div style={{ width: mix(line, 0, 360 * s), height: 10 * s, borderRadius: 999, background: COLORS.cyan400, marginTop: 6 * s }} />
      <AnimatedText
        text={props.tagline}
        by="word"
        delay={0.9}
        stagger={0.12}
        style={{ ...TYPE.title, fontSize: TYPE.title.fontSize * s, marginTop: 40 * s, color: COLORS.ink }}
      />
      {props.music ? (
        <Reveal delay={1.4} style={{ marginTop: 60 * s }}>
          {/* The <Audio> starts at frame 0 of the composition; offset to this scene's start. */}
          <SoundBars src={staticFile('audio/sample-pad.mp3')} width={420 * s} height={64 * s} bars={28} audioFrameOffset={sceneStart('outro', fps)} />
        </Reveal>
      ) : null}
    </Scene>
  );
};
