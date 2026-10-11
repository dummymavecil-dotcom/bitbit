import { Audio } from '@remotion/media';
import { z } from 'zod';
import { interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { CAMERA } from './layout';
import { Fillers } from './shots/Fillers';
import { AddShot, GlanceShot, PapersShot, PillarsShot, RecordShot, ReportedShot, TimerShot, TitleShot } from './shots/Part1';
import { BatchShot, CheckShot, EndShot, ScanShot, SourceShot, VisitsShot, WwwwShot } from './shots/Part2';
import { TOTAL_SECONDS } from './timing';
import { camAt, World } from './world';

export const BitbitExplainerSchema = z.object({
  /** Play the music bed. */
  music: z.boolean(),
  /** Narration file in public/, e.g. "audio/narration.mp3". Leave empty until it's recorded. */
  narration: z.string(),
});

export type BitbitExplainerProps = z.infer<typeof BitbitExplainerSchema>;

/** Length in seconds, derived from the script (timing.ts). */
export const BitbitExplainer_SECONDS = TOTAL_SECONDS;

/**
 * Bitbit explainer, Parts 1–2 (Collect). Structure:
 *   timing.ts  script lines and their lengths → cue times
 *   layout.ts  where each panel sits on the table, and the camera path
 *   world.tsx  camera + panel primitives
 *   shots/     one component per line (panels and their animation)
 *   screens/   app screens rebuilt in React where something on them moves
 */
export const BitbitExplainer: React.FC<BitbitExplainerProps> = ({ music, narration }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const cam = camAt(CAMERA, frame / fps);
  return (
    <>
      <World cam={cam}>
        <Fillers />
        <TitleShot />
        <TimerShot />
        <GlanceShot />
        <PillarsShot />
        <RecordShot />
        <AddShot />
        <ReportedShot />
        <PapersShot />
        <ScanShot />
        <CheckShot />
        <SourceShot />
        <BatchShot />
        <VisitsShot />
        <WwwwShot />
        <EndShot />
      </World>
      {music ? (
        <Audio
          src={staticFile('audio/explainer-bed.mp3')}
          volume={(f) =>
            interpolate(f, [0, fps * 1, durationInFrames - fps * 2.5, durationInFrames], [0, narration ? 0.35 : 0.7, narration ? 0.35 : 0.7, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      ) : null}
      {narration ? <Audio src={staticFile(narration)} /> : null}
    </>
  );
};
