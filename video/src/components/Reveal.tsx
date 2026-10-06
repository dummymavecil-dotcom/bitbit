import type { CSSProperties, ReactNode } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { EASE, enterStyle, progress } from '../utils/animation';
import { sec } from '../utils/time';

export type RevealProps = {
  children: ReactNode;
  /** Seconds before the reveal starts. */
  delay?: number;
  /** Seconds the reveal takes. */
  duration?: number;
  rise?: number;
  blur?: number;
  scaleFrom?: number;
  style?: CSSProperties;
};

/** Fades, lifts and de-blurs any element into place. The generic "enter" for anything that isn't text. */
export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, duration = 0.8, rise = 24, blur = 6, scaleFrom = 1, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = progress(frame, sec(delay, fps), sec(duration, fps), EASE.enter);
  return <div style={{ ...style, ...enterStyle(t, { rise, blur, scaleFrom }) }}>{children}</div>;
};
