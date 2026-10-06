// Remotion CLI / Studio configuration. Applies to `remotion studio`, `remotion render` and `remotion still`.
// It does NOT apply to programmatic renders via @remotion/renderer.
// Docs: https://www.remotion.dev/docs/config
import { Config } from '@remotion/cli/config';

Config.setEntryPoint('src/index.ts');

// Output defaults: H.264 MP4 with AAC audio, JPEG frames (fastest for opaque video).
Config.setCodec('h264');
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
// Lower CRF = higher quality. 18 is visually lossless for motion graphics.
Config.setCrf(18);
Config.setPixelFormat('yuv420p');
Config.setOverwriteOutput(true);

// Use an existing Chrome / Chromium instead of Remotion's downloaded Headless Shell.
// Leave unset on a normal machine; Remotion downloads the right browser on first render.
if (process.env.REMOTION_BROWSER_EXECUTABLE) {
  Config.setBrowserExecutable(process.env.REMOTION_BROWSER_EXECUTABLE);
}
