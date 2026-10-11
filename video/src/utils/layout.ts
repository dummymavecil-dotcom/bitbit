import { useVideoConfig } from 'remotion';
import { DESIGN_WIDTH } from '../config/video';

/**
 * Scale factor from the 1920-wide design reference to the current output width.
 * Write sizes as if the video were 1920×1080 and multiply by this.
 * @example const s = useScale(); <div style={{ fontSize: 96 * s }} />
 */
export const useScale = (): number => {
  const { width } = useVideoConfig();
  return width / DESIGN_WIDTH;
};
