/**
 * Global video settings. Change these to re-target every composition that uses them.
 *
 * - width / height: output resolution. Components scale from a 1920-wide design
 *   reference (see `useScale`), so 3840×2160 or 1280×720 keep the same layout.
 *   Changing the aspect ratio (e.g. 1080×1920 vertical) works but may need layout tweaks.
 * - fps: frame rate. All timings in this project are written in SECONDS and converted
 *   with `sec()`, so changing fps keeps the same real-world pacing.
 */
export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

/** The width every layout is designed against. Do not change; change VIDEO.width instead. */
export const DESIGN_WIDTH = 1920;
