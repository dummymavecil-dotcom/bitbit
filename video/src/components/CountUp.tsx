import type { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { EASE, mix, progress } from '../utils/animation';
import { sec } from '../utils/time';

export type CountUpProps = {
  from?: number;
  to: number;
  delay?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  style?: CSSProperties;
};

/** Animated number that counts from `from` to `to`. Uses tabular figures so the width doesn't jitter. */
export const CountUp: React.FC<CountUpProps> = ({ from = 0, to, delay = 0, duration = 1.2, decimals = 0, prefix = '', suffix = '', style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = progress(frame, sec(delay, fps), sec(duration, fps), EASE.standard);
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums', ...style }}>
      {prefix}
      {mix(t, from, to).toFixed(decimals)}
      {suffix}
    </span>
  );
};
