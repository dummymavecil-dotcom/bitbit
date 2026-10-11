import { evolvePath } from '@remotion/paths';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';
import { EASE, progress } from '../utils/animation';
import { sec } from '../utils/time';

/** Outline with 45° cut corners and a small notch in the middle of each edge (from the deck's title card). */
const framePath = (w: number, h: number, inset: number, cut: number, notch: number, notchDepth: number) => {
  const l = inset;
  const t = inset;
  const r = w - inset;
  const b = h - inset;
  const cx = w / 2;
  const cy = h / 2;
  const n = notch / 2;
  const d = notchDepth;
  return [
    `M ${l + cut} ${t}`,
    `L ${cx - n} ${t} L ${cx - n + d} ${t + d} L ${cx + n - d} ${t + d} L ${cx + n} ${t}`,
    `L ${r - cut} ${t} L ${r} ${t + cut}`,
    `L ${r} ${cy - n} L ${r - d} ${cy - n + d} L ${r - d} ${cy + n - d} L ${r} ${cy + n}`,
    `L ${r} ${b - cut} L ${r - cut} ${b}`,
    `L ${cx + n} ${b} L ${cx + n - d} ${b - d} L ${cx - n + d} ${b - d} L ${cx - n} ${b}`,
    `L ${l + cut} ${b} L ${l} ${b - cut}`,
    `L ${l} ${cy + n} L ${l + d} ${cy + n - d} L ${l + d} ${cy - n + d} L ${l} ${cy - n}`,
    `L ${l} ${t + cut} Z`,
  ].join(' ');
};

/** The thin cut-corner frame that sits inside the title and end cards. Traces itself in. */
export const CutFrame: React.FC<{ width: number; height: number; delay?: number; duration?: number; color?: string }> = ({
  width,
  height,
  delay = 0.1,
  duration = 1.4,
  color = COLORS.blue300,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = progress(frame, sec(delay, fps), sec(duration, fps), EASE.inOut);
  const d = framePath(width, height, 48, 44, 360, 14);
  const { strokeDasharray, strokeDashoffset } = evolvePath(t, d);
  return (
    <svg width={width} height={height} style={{ position: 'absolute', inset: 0 }}>
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="miter" strokeDasharray={strokeDasharray} strokeDashoffset={strokeDashoffset} opacity={t > 0 ? 0.9 : 0} />
    </svg>
  );
};
