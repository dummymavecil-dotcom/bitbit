import { CUES } from './timing';
import type { CamKey, Rect } from './world';

/**
 * Where every panel sits on the table (world px). Row A (Part 1) runs left → right at y = 0;
 * row B (Part 2) runs right → left at y = 1100, so the camera snakes down after "the papers".
 * Gutters are 60px.
 */
const A = 0;
const B = 1100;
const r = (x: number, y: number, w: number, h = 1000): Rect => ({ x, y, w, h });

export const ROW_A = A;
export const ROW_B = B;

export const L = {
  title: r(0, A, 1920, 1080),
  timer: r(1520, A, 1000),
  glance: r(2830, A, 1500),
  pillars: [r(3940, A - 220, 600, 560), r(4600, A - 220, 600, 560), r(5260, A - 220, 600, 560)],
  marcoCard: r(4600, A + 310, 1920, 380),
  recordText: r(5920, A, 600),
  recordPhone: r(6730, A, 900),
  addText: r(7540, A, 600),
  addPhone: r(8350, A, 900),
  allergy: r(9410, A, 1100),
  reportedText: r(10320, A, 600),
  papers: r(11230, A, 1100),

  scanText: r(10520, B, 600),
  scanPhone: r(11330, B, 900),
  checkPaper: r(8700, B, 800),
  checkForm: r(9660, B, 1000),
  sourceText: r(6980, B, 600),
  sourcePhone: r(7790, B, 900),
  batch: r(5870, B, 1500),
  visits: r(4210, B, 1700),
  wwww: [r(1650, B, 420), r(2130, B, 420), r(2610, B, 420), r(3090, B, 420)],
  end: r(420, B, 1920, 1080),
} as const;

const TILT = -5;
const cam = (x: number, y: number, zoom: number, rot = TILT) => ({ x, y, zoom, rot });

/** Camera path. Each key starts at a script cue (plus an offset for moves inside a line). */
export const CAMERA: CamKey[] = [
  { at: 0, cam: cam(0, A, 1, 0) },
  { at: CUES.timer - 0.15, cam: cam(1520, A, 0.95), dur: 1.3 },
  { at: CUES.glance, cam: cam(2830, A, 1.02) },
  { at: CUES.pillars, cam: cam(4600, A + 40, 0.9) },
  { at: CUES.collect, cam: cam(3940, A - 220, 1.3), dur: 1.0 },
  { at: CUES.record, cam: cam(6400, A, 1.05) },
  { at: CUES.adds, cam: cam(8020, A, 1.05) },
  { at: CUES.adds + 1.7, cam: cam(8350, A, 1.2), dur: 1.0 },
  { at: CUES.reported + 1.7, cam: cam(9740, A, 1.0) },
  { at: CUES.papers, cam: cam(11230, A, 1.12), dur: 1.0 },
  { at: CUES.scan - 0.1, cam: cam(11000, B, 1.05), dur: 1.3 },
  { at: CUES.check, cam: cam(9230, B, 0.98) },
  { at: CUES.source, cam: cam(7460, B, 1.05) },
  { at: CUES.source + 1.9, cam: cam(7790, B, 1.2), dur: 1.0 },
  { at: CUES.batch, cam: cam(5870, B, 1.08) },
  { at: CUES.visits, cam: cam(4210, B, 1.02) },
  { at: CUES.wwww, cam: cam(2370, B, 0.97) },
  { at: CUES.end, cam: cam(420, B, 1, 0), dur: 1.4 },
];
