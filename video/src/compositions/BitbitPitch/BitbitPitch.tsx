import { Audio } from '@remotion/media';
import { z } from 'zod';
import { interpolate, Sequence, staticFile, useVideoConfig } from 'remotion';
import { ScenePlayer } from './player';
import { SCENES } from './scenes';
import { ChapterBar } from './scenes/p2-p3';
import { CUE, LEN, partRange, TOTAL_SECONDS } from './timing';

export const BitbitPitchSchema = z.object({
  /** Play the music bed. */
  music: z.boolean(),
  /** Narration, one file per part in public/audio (pitch-p1.mp3 …). Leave off until recorded. */
  narration: z.boolean(),
});
export type BitbitPitchProps = z.infer<typeof BitbitPitchSchema>;

export const BitbitPitch_SECONDS = TOTAL_SECONDS;

/** Scenes visible inside [from, to): the one already playing at `from`, then every scene starting before `to`. */
const scenesIn = (from: number, to: number) => {
  const first = Math.max(0, SCENES.filter((s) => s.start <= from + 0.001).length - 1);
  return SCENES.slice(first).filter((s) => s.start < to - 0.001);
};

const Music: React.FC<{ duck: boolean }> = ({ duck }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const level = duck ? 0.3 : 0.65;
  return (
    <Audio
      src={staticFile('audio/explainer-bed.mp3')}
      loop
      volume={(f) => interpolate(f, [0, fps, durationInFrames - fps * 2.5, durationInFrames], [0, level, level, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}
    />
  );
};

/** The whole pitch, or one part of it when `part` is set (preview compositions). */
export const BitbitPitchView: React.FC<BitbitPitchProps & { part?: number }> = ({ music, narration, part }) => {
  const { fps } = useVideoConfig();
  const range = part ? partRange(part) : { start: 0, end: TOTAL_SECONDS };
  const parts = part ? [part] : [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <>
      <ScenePlayer scenes={scenesIn(range.start, range.end)} from={range.start} to={range.end} />
      <ChapterBar
        show={[CUE.collect - range.start, CUE.saving + LEN.saving - range.start]}
        changes={[CUE.feels - range.start, CUE.present - range.start]}
      />
      {music ? <Music duck={narration} /> : null}
      {narration
        ? parts.map((p) => (
            <Sequence key={p} from={Math.round((partRange(p).start - range.start) * fps)} layout="none">
              <Audio src={staticFile(`audio/pitch-p${p}.mp3`)} />
            </Sequence>
          ))
        : null}
    </>
  );
};

export const BitbitPitch: React.FC<BitbitPitchProps> = (props) => <BitbitPitchView {...props} />;
