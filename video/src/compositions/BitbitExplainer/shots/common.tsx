import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, enterStyle, mix, progress, sec } from '../../../utils';

/** Big white statement on a blue panel, revealed line by line (no blur: brand bans effects). */
export const Statement: React.FC<{ text: string; overline?: string; delay?: number; size?: number; color?: string; style?: CSSProperties }> = ({
  text,
  overline,
  delay = 0.35,
  size = 84,
  color = COLORS.white,
  style,
}) => (
  <div style={{ position: 'absolute', left: 64, right: 56, top: 72, color, ...style }}>
    {overline ? (
      <Enter delay={delay - 0.15} rise={12}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.85, marginBottom: 26 }}>{overline}</div>
      </Enter>
    ) : null}
    <AnimatedText
      text={text}
      by="line"
      delay={delay}
      stagger={0.16}
      duration={0.6}
      rise={30}
      blur={0}
      style={{ fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.035em' }}
    />
  </div>
);

/** Fade + rise into place (calm, no blur, no overshoot). Times in seconds, panel-local. */
export const Enter: React.FC<{ children: ReactNode; delay?: number; duration?: number; rise?: number; x?: number; scaleFrom?: number; style?: CSSProperties }> = ({
  children,
  delay = 0,
  duration = 0.6,
  rise = 24,
  x = 0,
  scaleFrom = 1,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = progress(frame, sec(delay, fps), sec(duration, fps), EASE.enter);
  const base = enterStyle(t, { rise, blur: 0, scaleFrom });
  return (
    <div
      style={{
        ...style,
        opacity: t * (typeof style?.opacity === 'number' ? style.opacity : 1),
        transform: `translate(${mix(t, x, 0)}px, ${mix(t, rise, 0)}px) scale(${mix(t, scaleFrom, 1)})`,
        filter: base.filter,
      }}
    >
      {children}
    </div>
  );
};

/** Hook: eased 0→1 progress at panel-local seconds. */
export const useT = (delay: number, duration = 0.6, easing: (t: number) => number = EASE.enter) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return progress(frame, sec(delay, fps), sec(duration, fps), easing);
};

/** Centre children inside a panel. */
export const Center: React.FC<{ children: ReactNode; style?: CSSProperties }> = ({ children, style }) => (
  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>{children}</div>
);
