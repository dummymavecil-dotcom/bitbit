import { Composition, Folder } from 'remotion';
import { VIDEO } from '../../config/video';
import { BitbitPitchSchema, BitbitPitchView, type BitbitPitchProps } from './BitbitPitch';
import { partRange } from './timing';

/** One preview composition per part, cut from the same timeline as the full pitch. */
export const PitchPartCompositions: React.FC<{ parts: number[] }> = ({ parts }) => (
  <Folder name="Pitch-parts">
    {parts.map((p) => {
      const r = partRange(p);
      const Part: React.FC<BitbitPitchProps> = (props) => <BitbitPitchView {...props} part={p} />;
      return (
        <Composition
          key={p}
          id={`BitbitPitch-P${p}`}
          component={Part}
          schema={BitbitPitchSchema}
          defaultProps={{ music: true, narration: false }}
          durationInFrames={Math.round((r.end - r.start) * VIDEO.fps)}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
        />
      );
    })}
  </Folder>
);
