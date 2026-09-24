import * as React from 'react';

type Shape = { d: string } | { circle: [number, number, number] } | { rect: [number, number, number, number, number] };

// 24px grid, 2px stroke, round caps and joins (Lucide geometry).
const SHAPES = {
  home: [{ d: 'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z' }],
  folder: [{ d: 'M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z' }],
  eye: [{ d: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z' }, { circle: [12, 12, 3] }],
  user: [{ circle: [12, 8, 4] }, { d: 'M4 21a8 8 0 0 1 16 0' }],
  bell: [{ d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' }, { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' }],
  alert: [{ d: 'M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z' }, { d: 'M12 9v4' }, { d: 'M12 17h.01' }],
  verified: [{ circle: [12, 12, 9] }, { d: 'm8.5 12 2.5 2.5 4.5-5' }],
  pencil: [{ d: 'M12 20h9' }, { d: 'M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' }],
  contactless: [{ d: 'M8.5 8.5a5 5 0 0 1 0 7' }, { d: 'M12 6a8.5 8.5 0 0 1 0 12' }, { d: 'M15.5 3.5a12 12 0 0 1 0 17' }, { d: 'M5 11v2' }],
  scan: [{ d: 'M3 7V5a2 2 0 0 1 2-2h2' }, { d: 'M17 3h2a2 2 0 0 1 2 2v2' }, { d: 'M21 17v2a2 2 0 0 1-2 2h-2' }, { d: 'M7 21H5a2 2 0 0 1-2-2v-2' }, { d: 'M7 12h10' }],
  vitals: [{ d: 'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' }, { d: 'M3.2 12H9l1-2 2 4 1.5-3H21' }],
  pill: [{ d: 'm10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z' }, { d: 'm8.5 8.5 7 7' }],
  syringe: [{ d: 'm18 2 4 4' }, { d: 'm17 7 3-3' }, { d: 'M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5' }, { d: 'm9 11 4 4' }, { d: 'm5 19-3 3' }, { d: 'm14 4 6 6' }],
  flask: [{ d: 'M9 3h6' }, { d: 'M10 3v6L4.5 18.5A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.5L14 9V3' }, { d: 'M7 15h10' }],
  stethoscope: [{ d: 'M5 3v6a5 5 0 0 0 10 0V3' }, { d: 'M10 14v2a5 5 0 0 0 10 0v-2' }, { circle: [20, 12, 2] }],
  clipboard: [{ rect: [8, 2, 8, 4, 1] }, { d: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2' }, { d: 'M9 12h6' }, { d: 'M9 16h6' }],
  printer: [{ d: 'M6 9V2h12v7' }, { d: 'M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2' }, { rect: [6, 14, 12, 8, 0] }],
  fileDown: [{ d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' }, { d: 'M14 2v6h6' }, { d: 'M12 12v6' }, { d: 'm9 15 3 3 3-3' }],
  shield: [{ d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z' }, { d: 'm9 12 2 2 4-4' }],
  clock: [{ circle: [12, 12, 9] }, { d: 'M12 7v5l3 2' }],
  check: [{ d: 'M20 6 9 17l-5-5' }],
  chevronRight: [{ d: 'm9 18 6-6-6-6' }],
  chevronLeft: [{ d: 'm15 18-6-6 6-6' }],
  close: [{ d: 'M18 6 6 18' }, { d: 'm6 6 12 12' }],
  search: [{ circle: [11, 11, 7] }, { d: 'm21 21-4.3-4.3' }],
  lock: [{ rect: [4, 11, 16, 10, 2] }, { d: 'M8 11V7a4 4 0 0 1 8 0v4' }],
} satisfies Record<string, Shape[]>;

export type IconName = keyof typeof SHAPES;

export interface IconProps {
  /** Icon from the Bitbit set. */
  name: IconName;
  /** Rendered width and height in px. Default 20. */
  size?: number;
  /** Stroke width. Default 2. */
  strokeWidth?: number;
}

/**
 * Line icon on a 24px grid, drawn in `currentColor` so it takes the text colour of its parent.
 * @example <Icon name="verified" size={14} />
 */
export function Icon({ name, size = 20, strokeWidth = 2 }: IconProps) {
  const shapes: Shape[] = SHAPES[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {shapes.map((s, i) =>
        'd' in s ? <path key={i} d={s.d} /> :
        'circle' in s ? <circle key={i} cx={s.circle[0]} cy={s.circle[1]} r={s.circle[2]} /> :
        <rect key={i} x={s.rect[0]} y={s.rect[1]} width={s.rect[2]} height={s.rect[3]} rx={s.rect[4]} />
      )}
    </svg>
  );
}
