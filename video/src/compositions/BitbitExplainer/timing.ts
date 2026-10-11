/**
 * The script. One entry per narration line; `seconds` is how long the line stays on screen.
 * Change a length here and every start time, camera move and the total duration follow.
 * When the voice-over is recorded, set each `seconds` to the measured line length.
 */
export const SCRIPT = [
  // Part 1: Collect
  { id: 'title', seconds: 4, narration: 'Bitbit. Your health history, in your hands.' },
  { id: 'timer', seconds: 4, narration: 'Intake that takes 30 minutes, done in 30 seconds.' },
  { id: 'glance', seconds: 5, narration: 'Bitbit turns a scattered medical history into one a nurse can read at a glance.' },
  { id: 'pillars', seconds: 5, narration: "It does three things: collect, prepare, share. Here's how they work for Marco." },
  { id: 'collect', seconds: 3, narration: 'It starts with the history he already has…' },
  { id: 'record', seconds: 4, narration: '…brought together into one record he holds.' },
  { id: 'adds', seconds: 6, narration: 'What Marco knows, he adds himself: allergies, medicines, family history.' },
  { id: 'reported', seconds: 5, narration: 'These stay marked Patient-reported until a provider reviews it.' },
  { id: 'papers', seconds: 3, narration: "Then come the papers he's been carrying." },
  // Part 2: Collect, scanned papers
  { id: 'scan', seconds: 4, narration: 'He scans them instead of typing it all again.' },
  { id: 'check', seconds: 6, narration: "Bitbit's AI copies only what's written and sorts it into fields. Marco checks each one before it's saved." },
  { id: 'source', seconds: 5, narration: 'The original stays attached, so every fact keeps its source.' },
  { id: 'batch', seconds: 6, narration: 'Prescriptions, lab results, discharge summaries: the same scan brings them all in.' },
  { id: 'visits', seconds: 5, narration: 'Each record connects to the visit it came from.' },
  { id: 'wwww', seconds: 4, narration: 'Who. What. Where. When.' },
  // Closing card (no narration)
  { id: 'end', seconds: 3.5, narration: '' },
] as const;

export type ShotId = (typeof SCRIPT)[number]['id'];

/** Start time (seconds) of each line. */
export const CUES = SCRIPT.reduce(
  (acc, line, i) => {
    acc[line.id] = i === 0 ? 0 : acc[SCRIPT[i - 1].id] + SCRIPT[i - 1].seconds;
    return acc;
  },
  {} as Record<ShotId, number>,
);

export const TOTAL_SECONDS = SCRIPT.reduce((sum, l) => sum + l.seconds, 0);
