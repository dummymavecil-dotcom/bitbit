import { zColor } from '@remotion/zod-types';
import { z } from 'zod';

/**
 * Props for the sample. Because they're declared with zod, Remotion Studio shows an editor
 * for them in the right-hand panel, and renders accept them via --props.
 */
export const bitbitIntroSchema = z.object({
  kicker: z.string(),
  headline: z.string(),
  headlineHighlight: z.string(),
  factsTitle: z.string(),
  shareTitle: z.string(),
  shareSubtitle: z.string(),
  tagline: z.string(),
  accent: zColor(),
  music: z.boolean(),
});

export type BitbitIntroProps = z.infer<typeof bitbitIntroSchema>;
// Default values live inline in src/Root.tsx so Studio can save edits to them.
