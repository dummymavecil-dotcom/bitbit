import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { CALM_SPRING, mix, springIn } from '../utils/animation';
import { sec } from '../utils/time';

export type PopShapeProps = {
  children: ReactNode;
  /** Centre position in px, relative to the parent. */
  x: number;
  y: number;
  /** Seconds before it appears. */
  delay?: number;
  /** Degrees of rotation while entering (settles at `rotate`). */
  spin?: number;
  rotate?: number;
  /** Slow continuous float amplitude in px (0 to disable). */
  float?: number;
  style?: CSSProperties;
};

/**
 * Places any shape (from @remotion/shapes or plain SVG) and springs it in: scale 0 → 1 with a
 * gentle spin, then a slow deterministic float so the frame never looks frozen.
 * @example <PopShape x={300} y={200} delay={0.4}><Circle radius={60} fill={COLORS.cyan400} /></PopShape>
 */
export const PopShape: React.FC<PopShapeProps> = ({ children, x, y, delay = 0, spin = -40, rotate = 0, float = 10, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = springIn({ frame, fps, delay: sec(delay, fps), config: CALM_SPRING });
  const bob = float ? Math.sin((frame / fps) * 1.2 + x * 0.01) * float : 0;
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bob}px) scale(${t}) rotate(${mix(t, spin, 0) + rotate}deg)`,
        opacity: Math.min(1, t * 1.5),
        ...style,
      }}
    >
      {children}
    </div>
  );
};
