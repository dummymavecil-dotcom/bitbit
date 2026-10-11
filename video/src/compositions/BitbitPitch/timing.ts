/**
 * Bitbit TGIC pitch: the script, line by line (56 lines, 8 parts).
 * `seconds` are estimates at 2.5 words per second. When narration is recorded, set each line's
 * `seconds` to its real length: every scene, transition and part start re-times from here.
 * Brief: design-prompts/bitbit-tgic-video-prompt.md
 */
export const SCRIPT = [
  { n: 1, id: 'meet', part: 1, who: 'Mavi', seconds: 5.5, narration: "Meet Marco. He's sick. He's missing work. He just wants to get checked." },
  { n: 2, id: 'queue', part: 1, who: 'Mavi', seconds: 7.0, narration: "But the lines are long. Hospitals here often run at two to three times their capacity." },
  { n: 3, id: 'envelope', part: 1, who: 'Mavi', seconds: 5.5, narration: "It doesn't help that a Filipino's medical history usually looks like this." },
  { n: 4, id: 'questions', part: 1, who: 'Melo', seconds: 5.0, narration: "This begins a needlessly long, manual reconstruction of his medical history." },
  { n: 5, id: 'scattered', part: 1, who: 'Mavi', seconds: 7.5, narration: "Some results are missing. Some are recorded, just at another clinic. Another format, another piece of his story." },
  { n: 6, id: 'thirty', part: 1, who: 'Gab', seconds: 4.5, narration: "Thirty minutes. That's how long rebuilding a history can take." },
  { n: 7, id: 'next', part: 1, who: 'Mavi', seconds: 5.0, narration: "Thirty minutes for Marco. Then the next patient. And the next." },
  { n: 8, id: 'math', part: 1, who: 'Mavi', seconds: 7.5, narration: "Across 400 patients, that's up to 200 hours lost every day: time to serve 250+ more patients." },
  { n: 9, id: 'switch', part: 1, who: 'Melo', seconds: 8.0, narration: "All because of an outdated, manual process. So much could be saved if his history were ready to read." },
  { n: 10, id: 'intro', part: 2, who: 'Melo', seconds: 3.5, narration: "Introducing Bitbit. Your health history, in your hands." },
  { n: 11, id: 'timer', part: 2, who: 'Melo', seconds: 4.0, narration: "An app that turns 30 minutes into 30 seconds," },
  { n: 12, id: 'glance', part: 2, who: 'Melo', seconds: 4.5, narration: "where we turn medical history into something ready to read." },
  { n: 13, id: 'pillars', part: 2, who: 'Mavi', seconds: 5.5, narration: "Bitbit does three things: collect, prepare, share. Here's how they work for Marco." },
  { n: 14, id: 'collect', part: 3, who: 'Mavi', seconds: 7.0, narration: "We start with the history he already has, and bring it into one patient-held record." },
  { n: 15, id: 'adds', part: 3, who: 'Mavi', seconds: 4.5, narration: "What Marco knows, he adds himself: allergies, medicines, family history." },
  { n: 16, id: 'reported', part: 3, who: 'Gab', seconds: 5.0, narration: "What he adds stays Patient-reported until a provider reviews it." },
  { n: 17, id: 'papers', part: 3, who: 'Mavi', seconds: 3.5, narration: "Then come the papers he's been carrying." },
  { n: 18, id: 'scan', part: 3, who: 'Mavi', seconds: 3.5, narration: "He scans them, instead of typing everything again." },
  { n: 19, id: 'check', part: 3, who: 'Gab', seconds: 6.0, narration: "AI copies what's written and sorts it into fields. Marco checks it before saving." },
  { n: 20, id: 'source', part: 3, who: 'Gab', seconds: 4.5, narration: "The original document stays attached. Every fact keeps its source." },
  { n: 21, id: 'batch', part: 3, who: 'Mavi', seconds: 5.0, narration: "Prescriptions, lab results, discharge summaries: the same scan brings them together." },
  { n: 22, id: 'visits', part: 3, who: 'Mavi', seconds: 4.0, narration: "Each record connects to the visit it came from." },
  { n: 23, id: 'wwww', part: 3, who: 'Melo', seconds: 2.5, narration: "Who. What. Where. When." },
  { n: 24, id: 'history', part: 3, who: 'Gab', seconds: 5.5, narration: "Over time, records become a history, and providers can review them during care." },
  { n: 25, id: 'sources', part: 3, who: 'Gab', seconds: 5.5, narration: "Every fact comes from one of three sources, so it can be verified." },
  { n: 26, id: 'feels', part: 4, who: 'Mavi', seconds: 6.0, narration: "So when Marco feels sick, he opens the app and types what he's feeling." },
  { n: 27, id: 'questions2', part: 4, who: 'Gab', seconds: 5.5, narration: "Bitbit asks follow-up questions to organize his words, not to diagnose him," },
  { n: 28, id: 'complaint', part: 4, who: 'Gab', seconds: 5.5, narration: "and turns them into a ready-to-read chief complaint, built for triage." },
  { n: 29, id: 'forward', part: 4, who: 'Melo', seconds: 5.5, narration: "Bitbit also brings forward existing records that may help in this visit." },
  { n: 30, id: 'decides', part: 4, who: 'Melo', seconds: 5.0, narration: "But to protect his privacy, Marco decides which records to share." },
  { n: 31, id: 'checks', part: 4, who: 'Mavi', seconds: 4.5, narration: "He checks what he wants, and unchecks what he doesn't." },
  { n: 32, id: 'travel', part: 4, who: 'Mavi', seconds: 5.0, narration: "Then he sees exactly what will travel, and what stays private." },
  { n: 33, id: 'present', part: 5, who: 'Mavi', seconds: 3.5, narration: "Once ready, he presents it at the hospital," },
  { n: 34, id: 'partner', part: 5, who: 'Melo', seconds: 4.5, narration: "or one day, shares it directly with partner Bitbit hospitals." },
  { n: 35, id: 'receives', part: 5, who: 'Gab', seconds: 5.0, narration: "The clinic receives the packet he chose, not his entire history." },
  { n: 36, id: 'arrives', part: 5, who: 'Gab', seconds: 4.5, narration: "Each item arrives with its source, date and review status." },
  { n: 37, id: 'zero', part: 5, who: 'Mavi', seconds: 3.5, narration: "No new patient has to start from zero." },
  { n: 38, id: 'saving', part: 5, who: 'Melo', seconds: 7.5, narration: "Hospitals turn 30 minutes into 30 seconds, saving 197 hours every day: enough for 250+ more patients." },
  { n: 39, id: 'beauty', part: 6, who: 'Gab', seconds: 6.0, narration: "The beauty of Bitbit is that it makes the whole healthcare system work better." },
  { n: 40, id: 'fund', part: 6, who: 'Gab', seconds: 5.0, narration: "The players who benefit fund it, so the patient pays zero." },
  { n: 41, id: 'players', part: 6, who: 'Gab', seconds: 7.5, narration: "Providers gain capacity, insurers reach patients through controlled offers, and employers and LGUs can plug in too." },
  { n: 42, id: 'free', part: 6, who: 'Mavi', seconds: 5.0, narration: "Marco gets the app free, with full control over his data." },
  { n: 43, id: 'ai', part: 6, who: 'Melo', seconds: 3.5, narration: "All powered by an AI-integrated system." },
  { n: 44, id: 'steps', part: 6, who: 'Gab', seconds: 3.5, narration: "AI organizes. Providers review. Patients decide what travels." },
  { n: 45, id: 'integration', part: 6, who: 'Gab', seconds: 5.5, narration: "It gives hospitals instant value, and opens a huge opportunity for integration." },
  { n: 46, id: 'millions', part: 7, who: 'Melo', seconds: 5.0, narration: "Marco is just one of millions of Filipinos we can help." },
  { n: 47, id: 'nationalId', part: 7, who: 'Gab', seconds: 5.0, narration: "Built on the national ID system, with over 97 million enrolled," },
  { n: 48, id: 'oneInTen', part: 7, who: 'Melo', seconds: 5.0, narration: "reaching just 1 in 10 Filipinos means 9.7 million people helped." },
  { n: 49, id: 'scale', part: 7, who: 'Gab', seconds: 6.0, narration: "We'll scale from 1 hospital to 50 in year one, generating over ₱180 million." },
  { n: 50, id: 'year3', part: 7, who: 'Gab', seconds: 5.0, narration: "By year three: over 60 million people, and over ₱1.8 billion." },
  { n: 51, id: 'countries', part: 7, who: 'Mavi', seconds: 3.5, narration: "Then on to countries like Thailand and Vietnam." },
  { n: 52, id: 'giveBack', part: 7, who: 'Mavi', seconds: 5.5, narration: "But more than the 9.7 million, it's the time we can give back:" },
  { n: 53, id: 'hours', part: 7, who: 'Melo', seconds: 5.5, narration: "over 4.7 million hours in year one that could go back to care." },
  { n: 54, id: 'sick', part: 8, who: 'Melo', seconds: 7.0, narration: "Getting sick already takes time from us. Getting care shouldn't take more than it needs to." },
  { n: 55, id: 'tagline', part: 8, who: 'Melo', seconds: 6.5, narration: "Bitbit. Your health history, in your hands. So the next desk can start from here," },
  { n: 56, id: 'final', part: 8, who: 'Melo', seconds: 3.5, narration: "and turn 30 minutes into 30 seconds." },
] as const;

export type LineId = (typeof SCRIPT)[number]['id'];

/** Seconds the closing card holds after the last line. */
export const END_HOLD = 2;

/** Start time (seconds, whole video) of every line. */
export const CUE = SCRIPT.reduce(
  (acc, line, i) => {
    acc[line.id] = i === 0 ? 0 : acc[SCRIPT[i - 1].id] + SCRIPT[i - 1].seconds;
    return acc;
  },
  {} as Record<LineId, number>,
);

/** Length (seconds) of each line. */
export const LEN = Object.fromEntries(SCRIPT.map((l) => [l.id, l.seconds])) as Record<LineId, number>;

export const TOTAL_SECONDS = SCRIPT.reduce((sum, l) => sum + l.seconds, 0) + END_HOLD;

export const PART_NAMES = ['The problem', 'Introducing Bitbit', 'Collect', 'Prepare', 'Share', 'Business model', 'Scale and impact', 'Close'] as const;

/** First and last line of each part (1-based part numbers). */
export const partRange = (part: number) => {
  const lines = SCRIPT.filter((l) => l.part === part);
  const start = CUE[lines[0].id];
  const last = lines[lines.length - 1];
  const end = CUE[last.id] + last.seconds + (part === 8 ? END_HOLD : 0);
  return { start, end };
};
