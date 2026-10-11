import { useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText, Background, DrawPath, PulseRings, Reveal, Scene } from '../../../components';
import { COLORS, TYPE } from '../../../theme';
import { CALM_SPRING, sec, springIn, useScale } from '../../../utils';
import type { BitbitIntroProps } from '../schema';

// The "contactless" icon from the Bitbit icon set, as one path so it draws on in sequence.
const CONTACTLESS = 'M8.5 8.5a5 5 0 0 1 0 7 M12 6a8.5 8.5 0 0 1 0 12 M15.5 3.5a12 12 0 0 1 0 17 M5 11v2';

export const ShareScene: React.FC<{ props: BitbitIntroProps }> = ({ props }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useScale();
  const disc = springIn({ frame, fps, delay: sec(0.15, fps), config: CALM_SPRING });
  const size = 260 * s;
  return (
    <Scene background={<Background seed="share" glows={[COLORS.blue100, COLORS.blue200]} />}>
      <div style={{ position: 'relative', width: size, height: size, marginBottom: 90 * s }}>
        <PulseRings size={size * 1.25} color={COLORS.blue200} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: props.accent,
            boxShadow: `0 ${24 * s}px ${60 * s}px rgba(0, 112, 217, 0.35)`,
            transform: `scale(${disc})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DrawPath d={CONTACTLESS} size={130 * s} stroke={COLORS.white} strokeWidth={2.2} delay={0.5} duration={0.9} />
        </div>
      </div>
      <AnimatedText text={props.shareTitle} by="char" delay={0.6} stagger={0.03} rise={30 * s} style={{ ...TYPE.display, fontSize: TYPE.display.fontSize * s }} />
      <Reveal delay={1.1} rise={12 * s}>
        <div style={{ ...TYPE.body, fontSize: TYPE.body.fontSize * s, color: COLORS.textTertiary, marginTop: 14 * s }}>{props.shareSubtitle}</div>
      </Reveal>
    </Scene>
  );
};
