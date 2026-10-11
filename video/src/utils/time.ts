import { useVideoConfig } from 'remotion';

/** Seconds → whole frames at a given fps. */
export const sec = (seconds: number, fps: number): number => Math.round(seconds * fps);

/** Frames → seconds. */
export const toSeconds = (frames: number, fps: number): number => frames / fps;

/**
 * Hook form of `sec` that reads fps from the current composition.
 * @example const s = useSec(); <Sequence from={s(1.5)} durationInFrames={s(2)} />
 */
export const useSec = () => {
  const { fps } = useVideoConfig();
  return (seconds: number) => sec(seconds, fps);
};

/**
 * Frame on which a musical beat lands. Use it to hit animations on the music.
 * @example beatToFrame(8, 100, fps) // the 9th beat (0-based) of a 100 BPM track
 */
export const beatToFrame = (beat: number, bpm: number, fps: number, offsetSeconds = 0): number =>
  Math.round((offsetSeconds + (beat * 60) / bpm) * fps);
