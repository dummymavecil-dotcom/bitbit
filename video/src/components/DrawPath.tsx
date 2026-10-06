import { evolvePath } from '@remotion/paths';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { EASE, progress } from '../utils/animation';
import { sec } from '../utils/time';

export type DrawPathProps = {
  /** SVG path data, in the coordinate system of `viewBox`. */
  d: string;
  viewBox?: string;
  size: number;
  stroke: string;
  strokeWidth?: number;
  delay?: number;
  duration?: number;
};

/**
 * Draws an SVG stroke on, start to end (check marks, underlines, connectors, signatures).
 * @example <DrawPath d="M20 6 9 17l-5-5" viewBox="0 0 24 24" size={120} stroke="#fff" />
 */
export const DrawPath: React.FC<DrawPathProps> = ({ d, viewBox = '0 0 24 24', size, stroke, strokeWidth = 2.5, delay = 0, duration = 0.6 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = progress(frame, sec(delay, fps), sec(duration, fps), EASE.standard);
  const { strokeDasharray, strokeDashoffset } = evolvePath(t, d);
  return (
    <svg width={size} height={size} viewBox={viewBox} fill="none" style={{ overflow: 'visible' }}>
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        opacity={t > 0 ? 1 : 0}
      />
    </svg>
  );
};
