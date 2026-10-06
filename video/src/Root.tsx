import { Composition, Folder } from 'remotion';
import { BitbitIntro } from './compositions/BitbitIntro/BitbitIntro';
import { bitbitIntroSchema } from './compositions/BitbitIntro/schema';
import { getIntroDuration } from './compositions/BitbitIntro/timing';
import { VIDEO } from './config/video';
// @new-composition-imports (scripts/new-composition.mjs inserts imports above this line)

/**
 * Every video is a <Composition> registered here. The `id` is what you pass to
 * `remotion render <id>`. Width/height/fps come from src/config/video.ts.
 *
 * Keep `defaultProps` as an inline object literal: that lets Studio save prop edits back here.
 */
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Samples">
        <Composition
          id="BitbitIntro"
          component={BitbitIntro}
          schema={bitbitIntroSchema}
          defaultProps={{
            kicker: 'Patient-owned health record',
            headline: 'Your health record,\nin your hands.',
            headlineHighlight: 'hands.',
            factsTitle: 'Triage starts from facts,\nnot questions.',
            shareTitle: 'Tap to share.',
            shareSubtitle: 'Ibahagi',
            tagline: 'Own it. Carry it. Share it.',
            accent: '#0070d9',
            music: true,
          }}
          durationInFrames={getIntroDuration(VIDEO.fps)}
          fps={VIDEO.fps}
          width={VIDEO.width}
          height={VIDEO.height}
        />
      </Folder>
      <Folder name="Projects">
        {/* @new-composition (scripts/new-composition.mjs inserts compositions above this line) */}
      </Folder>
    </>
  );
};
