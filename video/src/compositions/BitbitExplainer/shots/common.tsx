import type { CSSProperties, ReactNode } from 'react';
import { Circle, Rect } from '@remotion/shapes';
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText, PopShape } from '../../../components';
import { COLORS, FONT_STACK } from '../../../theme';
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

/* ---------- Full-screen scene pieces (straight, flat colour, like the BitbitIntro sample) ---------- */

/**
 * Root of every explainer scene: a flat brand colour (no gradients) and Inter. Children are laid out
 * in 1920 × 1080 design pixels and scaled to the output resolution.
 */
export const Stage: React.FC<{ children: ReactNode; tone?: 'light' | 'blue' | 'ink'; bg?: string; color?: string }> = ({ children, tone = 'light', bg, color }) => {
  const { width, height } = useVideoConfig();
  const s = width / 1920;
  const toneBg = tone === 'blue' ? COLORS.blue600 : tone === 'ink' ? COLORS.ink : COLORS.bg;
  const toneInk = tone === 'light' ? COLORS.ink : COLORS.white;
  return (
    <AbsoluteFill style={{ backgroundColor: bg ?? toneBg, overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          left: (width - 1920 * s) / 2,
          top: (height - 1080 * s) / 2,
          width: 1920,
          height: 1080,
          transform: `scale(${s})`,
          transformOrigin: '0 0',
          fontFamily: FONT_STACK,
          color: color ?? toneInk,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

type ShapeSpec = { kind: 'circle' | 'square' | 'ring'; x: number; y: number; size: number; color: string; delay: number; rotate?: number };

/**
 * Shapes that spring in (calm, no overshoot) with a slow float, as in the sample's title scene.
 * Brand-safe colours only: blues and cyan (pink and yellow never decorate).
 */
export const Shapes: React.FC<{ shapes: ShapeSpec[] }> = ({ shapes }) => (
  <>
    {shapes.map((sh, i) => (
      <PopShape key={i} x={sh.x} y={sh.y} delay={sh.delay} rotate={sh.rotate ?? 0} spin={sh.kind === 'circle' ? 0 : -40}>
        {sh.kind === 'circle' ? (
          <Circle radius={sh.size / 2} fill={sh.color} />
        ) : sh.kind === 'ring' ? (
          <Circle radius={sh.size / 2} fill="none" stroke={sh.color} strokeWidth={sh.size * 0.12} />
        ) : (
          <Rect width={sh.size} height={sh.size} cornerRadius={sh.size * 0.24} fill={sh.color} />
        )}
      </PopShape>
    ))}
  </>
);

/** Two layouts of shapes framing a phone on the right half of the screen. */
export const phoneShapes = (variant: 0 | 1 = 0): ShapeSpec[] =>
  variant === 0
    ? [
        { kind: 'circle', x: 1340, y: 560, size: 760, color: COLORS.blue100, delay: 0 },
        { kind: 'circle', x: 1700, y: 220, size: 90, color: COLORS.cyan400, delay: 0.35 },
        { kind: 'square', x: 1000, y: 880, size: 110, color: COLORS.blue500, delay: 0.5, rotate: 14 },
        { kind: 'ring', x: 1730, y: 870, size: 150, color: COLORS.blue300, delay: 0.65 },
      ]
    : [
        { kind: 'circle', x: 1340, y: 540, size: 760, color: COLORS.blue100, delay: 0 },
        { kind: 'square', x: 1720, y: 250, size: 120, color: COLORS.blue200, delay: 0.35, rotate: -12 },
        { kind: 'circle', x: 990, y: 230, size: 70, color: COLORS.cyan400, delay: 0.5 },
        { kind: 'ring', x: 1690, y: 900, size: 130, color: COLORS.blue500, delay: 0.65 },
      ];

/** Big headline on the left half of a light scene, with a blue kicker above it. */
export const LeftStatement: React.FC<{ text: string; kicker?: string; delay?: number; size?: number; top?: number }> = ({ text, kicker, delay = 0.3, size = 96, top = 300 }) => (
  <div style={{ position: 'absolute', left: 160, top, width: 760 }}>
    {kicker ? (
      <Enter delay={delay - 0.15} rise={12}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600, marginBottom: 28 }}>{kicker}</div>
      </Enter>
    ) : null}
    <AnimatedText
      text={text}
      by="line"
      delay={delay}
      stagger={0.16}
      duration={0.65}
      rise={34}
      blur={0}
      style={{ fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em' }}
    />
  </div>
);
