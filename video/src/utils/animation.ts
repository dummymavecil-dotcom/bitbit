/**
 * Animation helpers. Everything is a pure function of the current frame, which is the
 * only way to animate in Remotion (no CSS transitions, no setTimeout, no Math.random).
 *
 * House style: smooth and calm, no bounce (matches the Bitbit motion tokens).
 */
import type { CSSProperties } from 'react';
import { Easing, interpolate, spring, type SpringConfig } from 'remotion';

/** Easing curves mirroring the Bitbit motion tokens (design-tokens/bitbit.tokens.css). */
export const EASE = {
  standard: Easing.bezier(0.2, 0, 0, 1),
  enter: Easing.bezier(0.16, 1, 0.3, 1),
  exit: Easing.bezier(0.4, 0, 1, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  linear: Easing.linear,
} as const;

/** Critically damped spring: settles softly, never overshoots. */
export const CALM_SPRING: Partial<SpringConfig> = { damping: 200, mass: 1, stiffness: 100 };
/** A touch livelier, still without visible overshoot. */
export const SNAPPY_SPRING: Partial<SpringConfig> = { damping: 26, stiffness: 180, overshootClamping: true };

/**
 * 0 → 1 progress between `start` and `start + duration` (in frames), eased and clamped.
 * The workhorse of this project: feed its output into `mix()` or straight into styles.
 */
export const progress = (
  frame: number,
  start: number,
  duration: number,
  easing: (t: number) => number = EASE.enter,
): number =>
  interpolate(frame, [start, start + Math.max(1, duration)], [0, 1], {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/** Linear blend between two numbers by a 0–1 progress value. */
export const mix = (t: number, from: number, to: number): number => from + (to - from) * t;

/**
 * Opacity that fades in at the start and out at the end of a span.
 * @param total length of the span in frames (e.g. the Sequence duration)
 */
export const fadeInOut = (frame: number, total: number, inFrames: number, outFrames: number): number =>
  Math.min(progress(frame, 0, inFrames, EASE.standard), 1 - progress(frame, total - outFrames, outFrames, EASE.exit));

/** Spring progress (0 → 1) starting at `delay` frames, using the calm, no-bounce config by default. */
export const springIn = ({
  frame,
  fps,
  delay = 0,
  config = CALM_SPRING,
  durationInFrames,
}: {
  frame: number;
  fps: number;
  delay?: number;
  config?: Partial<SpringConfig>;
  durationInFrames?: number;
}): number => spring({ frame: frame - delay, fps, config, durationInFrames });

/** Delay for the i-th item of a staggered group. */
export const stagger = (index: number, stepFrames: number, startFrame = 0): number => startFrame + index * stepFrames;

/** Standard "enter" transform: fade + rise + slight blur, driven by a 0–1 progress. */
export const enterStyle = (t: number, { rise = 24, blur = 8, scaleFrom = 1 } = {}): CSSProperties => ({
  opacity: t,
  transform: `translateY(${mix(t, rise, 0)}px) scale(${mix(t, scaleFrom, 1)})`,
  filter: blur > 0 ? `blur(${mix(t, blur, 0)}px)` : undefined,
});
