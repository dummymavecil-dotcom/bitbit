import { useCurrentFrame, useVideoConfig } from 'remotion';
import { EASE, mix } from '../utils/animation';
import { COLORS } from '../theme';

export type PulseRingsProps = {
  /** Diameter of the rings at rest, in px. */
  size: number;
  color?: string;
  /** Seconds per loop. */
  period?: number;
  rings?: number;
};

/** The tap-to-share pulse: rings that expand and fade, offset evenly, looping forever. */
export const PulseRings: React.FC<PulseRingsProps> = ({ size, color = COLORS.blue200, period = 2.4, rings = 2 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loop = period * fps;
  return (
    <div style={{ position: 'absolute', width: size, height: size, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
      {Array.from({ length: rings }).map((_, i) => {
        const phase = (((frame + (i * loop) / rings) % loop) + loop) % loop;
        const t = EASE.inOut(phase / loop);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: color,
              transform: `scale(${mix(t, 0.7, 1.35)})`,
              opacity: mix(t, 0.9, 0),
            }}
          />
        );
      })}
    </div>
  );
};
