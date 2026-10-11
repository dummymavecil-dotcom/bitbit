import { PhoneFrame, ScreenImage } from '../../../components';
import { COLORS } from '../../../theme';
import { ROW_A, ROW_B } from '../layout';
import { Panel } from '../world';

/**
 * Static panels around the edges so the table always looks full, like the multi-screen promo
 * reference. Neutral ones show other real Bitbit screens (no placeholder text on them).
 */
const SCREENS = [
  '04-access-log',
  '12-visit-4-suggested',
  '08-emergency-access',
  '14-visit-6-what-to-share',
  '16-shared-scheduled',
  '09-visit-1-whats-bothering',
  '11-visit-3-why-seeking-care',
  '01-login',
  '13-visit-5-record-is-yours',
  '10-visit-2-questions',
];
const WIDTHS = [720, 560, 820, 600, 760, 640];
const BLUE = [false, true, false, false, true, false];

type F = { x: number; y: number; w: number; h: number; blue: boolean; screen?: string; phoneTop: number };

const strip = (y: number, h: number, from: number, to: number, seed: number, phoneTop: number): F[] => {
  const out: F[] = [];
  let x = from;
  let i = seed;
  while (x < to) {
    const w = WIDTHS[i % WIDTHS.length];
    const blue = BLUE[i % BLUE.length];
    out.push({ x: x + w / 2, y, w, h, blue, screen: blue ? undefined : SCREENS[i % SCREENS.length], phoneTop });
    x += w + 60;
    i++;
  }
  return out;
};

const FILLERS: F[] = [
  // Above row A and below row B.
  ...strip(ROW_A - 860, 600, -2600, 13200, 0, 70),
  ...strip(ROW_B + 1200, 600, -2600, 13200, 3, 70),
  // Left of the title / end card.
  { x: -1330, y: ROW_A, w: 620, h: 1000, blue: false, screen: '04-access-log', phoneTop: 70 },
  { x: -1990, y: ROW_A, w: 580, h: 1000, blue: true, phoneTop: 0 },
  { x: -850, y: ROW_B, w: 620, h: 1000, blue: true, phoneTop: 0 },
  { x: -1510, y: ROW_B, w: 580, h: 1000, blue: false, screen: '12-visit-4-suggested', phoneTop: 70 },
  // Right of the row ends.
  { x: 12140, y: ROW_A, w: 700, h: 1000, blue: true, phoneTop: 0 },
  { x: 12140, y: ROW_B, w: 700, h: 1000, blue: false, screen: '14-visit-6-what-to-share', phoneTop: 70 },
  { x: 12880, y: ROW_A, w: 660, h: 1000, blue: false, screen: '08-emergency-access', phoneTop: 70 },
  { x: 12880, y: ROW_B, w: 660, h: 1000, blue: true, phoneTop: 0 },
];

export const Fillers: React.FC = () => (
  <>
    {FILLERS.map((f, i) => (
      <Panel key={i} x={f.x} y={f.y} w={f.w} h={f.h} color={f.blue ? COLORS.blue600 : COLORS.bg}>
        {f.screen ? (
          <div style={{ position: 'absolute', left: f.w / 2 - 204 * 0.95, top: f.phoneTop }}>
            <PhoneFrame scale={0.95}>
              <ScreenImage name={f.screen} />
            </PhoneFrame>
          </div>
        ) : null}
      </Panel>
    ))}
  </>
);
