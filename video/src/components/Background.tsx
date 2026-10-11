import { AbsoluteFill, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

export type BackgroundProps = {
  base?: string;
  /** Colours of the soft drifting light blobs. */
  glows?: string[];
  /** Seed so different scenes get different (but deterministic) blob layouts. */
  seed?: string;
  /** Blob opacity 0–1. */
  intensity?: number;
};

/**
 * Calm animated backdrop: a flat base with large blurred colour blobs that drift slowly.
 * Uses Remotion's seeded `random()` so every render is identical.
 */
export const Background: React.FC<BackgroundProps> = ({
  base = COLORS.bg,
  glows = [COLORS.blue200, COLORS.cyan100, COLORS.blue100],
  seed = 'bg',
  intensity = 0.9,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <AbsoluteFill style={{ backgroundColor: base, overflow: 'hidden' }}>
      {glows.map((color, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = (0.45 + r('s') * 0.35) * width;
        const cx = r('x') * width + Math.sin(t * (0.15 + r('vx') * 0.2) + i) * width * 0.06;
        const cy = r('y') * height + Math.cos(t * (0.12 + r('vy') * 0.2) + i) * height * 0.08;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx - size / 2,
              top: cy - size / 2,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle at center, ${color} 0%, transparent 68%)`,
              opacity: intensity,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
