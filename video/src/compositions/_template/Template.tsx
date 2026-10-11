// Starting point copied by `npm run new -- <Name>`. "NameTemplate" is replaced with the new name.
import { z } from 'zod';
import { AnimatedText, Background, Reveal, Scene } from '../../components';
import { COLORS, TYPE } from '../../theme';
import { useScale } from '../../utils';

export const NameTemplateSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
});

export type NameTemplateProps = z.infer<typeof NameTemplateSchema>;

/** Length in seconds. Root.tsx converts it to frames with the project fps. */
export const NameTemplate_SECONDS = 5;

export const NameTemplate: React.FC<NameTemplateProps> = ({ title, subtitle }) => {
  const s = useScale();
  return (
    <Scene background={<Background seed="NameTemplate" />}>
      <AnimatedText text={title} by="word" delay={0.2} style={{ ...TYPE.display, fontSize: TYPE.display.fontSize * s }} />
      <Reveal delay={0.8}>
        <div style={{ ...TYPE.body, fontSize: TYPE.body.fontSize * s, color: COLORS.textSecondary, marginTop: 24 * s }}>{subtitle}</div>
      </Reveal>
    </Scene>
  );
};
