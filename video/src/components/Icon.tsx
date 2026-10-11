/**
 * Bitbit line icons for video. Same geometry as the app's Icon (../../src/components/Icon.tsx):
 * 24px grid, 2px stroke, round caps and joins, drawn in currentColor. Extra glyphs use Lucide geometry.
 */
type Shape = { d: string } | { circle: [number, number, number] } | { rect: [number, number, number, number, number] };

const SHAPES = {
  home: [{ d: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z' }],
  user: [{ circle: [12, 8, 4] }, { d: 'M4 21a8 8 0 0 1 16 0' }],
  alert: [{ d: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z' }, { d: 'M12 9v4' }, { d: 'M12 17h.01' }],
  verified: [{ circle: [12, 12, 9] }, { d: 'm8.5 12 2.5 2.5 4.5-5' }],
  pencil: [{ d: 'M12 20h9' }, { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' }],
  contactless: [{ d: 'M8.5 8.5a5 5 0 0 1 0 7' }, { d: 'M12 6a8.5 8.5 0 0 1 0 12' }, { d: 'M15.5 3.5a12 12 0 0 1 0 17' }, { d: 'M5 11v2' }],
  scan: [{ d: 'M3 7V5a2 2 0 0 1 2-2h2' }, { d: 'M17 3h2a2 2 0 0 1 2 2v2' }, { d: 'M21 17v2a2 2 0 0 1-2 2h-2' }, { d: 'M7 21H5a2 2 0 0 1-2-2v-2' }, { d: 'M7 12h10' }],
  vitals: [{ d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' }, { d: 'M3.2 12H9l1-2 2 4 1.5-3H21' }],
  pill: [{ d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z' }, { d: 'm8.5 8.5 7 7' }],
  flask: [{ d: 'M9 3h6' }, { d: 'M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3' }, { d: 'M7 15h10' }],
  stethoscope: [{ d: 'M5 3v6a5 5 0 0 0 10 0V3' }, { d: 'M10 14v2a5 5 0 0 0 10 0v-2' }, { circle: [20, 12, 2] }],
  clipboard: [{ rect: [8, 2, 8, 4, 1] }, { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }, { d: 'M9 12h6' }, { d: 'M9 16h6' }],
  shield: [{ d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' }, { d: 'm9 12 2 2 4-4' }],
  clock: [{ circle: [12, 12, 9] }, { d: 'M12 7v5l3 2' }],
  check: [{ d: 'M20 6 9 17l-5-5' }],
  chevronRight: [{ d: 'm9 18 6-6-6-6' }],
  chevronLeft: [{ d: 'm15 18-6-6 6-6' }],
  close: [{ d: 'M18 6 6 18' }, { d: 'm6 6 12 12' }],
  file: [{ d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' }, { d: 'M14 2v6h6' }, { d: 'M8 13h8' }, { d: 'M8 17h5' }],
  flash: [{ d: 'M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z' }],
  sparkle: [{ d: 'M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.14 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z' }],
  upload: [{ d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }, { d: 'm17 8-5-5-5 5' }, { d: 'M12 3v12' }],
  paperclip: [{ d: 'm21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48' }],
  mapPin: [{ d: 'M20 10c0 5-5.54 10.19-7.4 11.8a1 1 0 0 1-1.2 0C9.54 20.19 4 15 4 10a8 8 0 0 1 16 0' }, { circle: [12, 10, 3] }],
  calendar: [{ rect: [3, 4, 18, 18, 2] }, { d: 'M16 2v4' }, { d: 'M8 2v4' }, { d: 'M3 10h18' }],
  arrowRight: [{ d: 'M5 12h14' }, { d: 'm12 5 7 7-7 7' }],
  plus: [{ d: 'M12 5v14' }, { d: 'M5 12h14' }],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof SHAPES;

export const Icon: React.FC<{ name: IconName; size?: number; strokeWidth?: number; color?: string; style?: React.CSSProperties }> = ({
  name,
  size = 20,
  strokeWidth = 2,
  color = 'currentColor',
  style,
}) => {
  const shapes: Shape[] = SHAPES[name];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, ...style }}>
      {shapes.map((s, i) =>
        'd' in s ? (
          <path key={i} d={s.d} />
        ) : 'circle' in s ? (
          <circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} />
        ) : (
          <rect key={i} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={s.rect[4]} />
        ),
      )}
    </svg>
  );
};
