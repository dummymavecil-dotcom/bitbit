import { sec } from '../../utils/time';

/**
 * Scene lengths in SECONDS. Edit these to change pacing; the composition's total duration
 * is derived from them, so nothing else needs updating.
 */
export const SCENES = {
  title: 4.2,
  facts: 4.6,
  share: 4.0,
  outro: 4.2,
} as const;

/** Length of each cross-scene transition in seconds (transitions overlap neighbouring scenes). */
export const TRANSITION_SECONDS = 0.7;

/** Total frames = sum of scenes − overlaps of the transitions between them. */
export const getIntroDuration = (fps: number): number => {
  const scenes = Object.values(SCENES).reduce((sum, s) => sum + sec(s, fps), 0);
  const transitions = (Object.keys(SCENES).length - 1) * sec(TRANSITION_SECONDS, fps);
  return scenes - transitions;
};

/** Frame at which each scene starts on the composition timeline (useful for audio-synced elements). */
export const sceneStart = (scene: keyof typeof SCENES, fps: number): number => {
  let frame = 0;
  for (const key of Object.keys(SCENES) as Array<keyof typeof SCENES>) {
    if (key === scene) return frame;
    frame += sec(SCENES[key], fps) - sec(TRANSITION_SECONDS, fps);
  }
  return frame;
};
