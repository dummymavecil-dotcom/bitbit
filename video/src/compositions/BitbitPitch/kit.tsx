import type { CSSProperties } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon } from '../../components';
import { COLORS } from '../../theme';
import { EASE, mix, progress, sec } from '../../utils';

/** Recurring pieces of the pitch: the timer, Desk Zero, the queue ticket and the people row. */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Blend two `#rrggbb` colours (t = 0 → a, 1 → b), for smooth colour changes instead of snaps. */
export const mixHex = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(mix(t, v, pb[i]))).join(',')})`;
};

/** Colours of the "before" world (Part 1). */
export const INK = {
  bg: COLORS.ink,
  panel: '#14264a',
  line: '#24406d',
  soft: COLORS.neutral300,
  accent: COLORS.blue300,
};

export const fmtClock = (secs: number) => {
  const s = Math.max(0, Math.round(secs));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

/**
 * The 30-minute timer that recurs through the pitch. Times are in clock seconds (1800 = 30:00).
 * `segments` lets it run several sweeps in one scene (e.g. reset for each next patient).
 */
export const Timer: React.FC<{
  segments: { at: number; dur: number; from: number; to: number }[];
  size?: number;
  color?: string;
  label?: string;
  labelColor?: string;
  style?: CSSProperties;
  easing?: (t: number) => number;
}> = ({ segments, size = 200, color = COLORS.white, label, labelColor, style, easing = EASE.inOut }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  let value = segments[0].from;
  for (const sg of segments) {
    if (t < sg.at) break;
    value = mix(easing(Math.min(1, (t - sg.at) / sg.dur)), sg.from, sg.to);
  }
  const hand = (value / 3600) * 360 * 12; // one turn per 5 clock minutes
  const icon = size * 0.62;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color, ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: size * 0.18 }}>
        <svg width={icon} height={icon} viewBox="0 0 150 150">
          <circle cx={75} cy={75} r={64} fill="none" stroke={color} strokeWidth={9} />
          <line x1={75} y1={75} x2={75} y2={30} stroke={color} strokeWidth={9} strokeLinecap="round" transform={`rotate(${hand} 75 75)`} />
          <circle cx={75} cy={75} r={8} fill={color} />
        </svg>
        <div style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>{fmtClock(value)}</div>
      </div>
      {label ? <div style={{ fontSize: size * 0.2, fontWeight: 600, color: labelColor ?? color, opacity: labelColor ? 1 : 0.75, marginTop: size * 0.12 }}>{label}</div> : null}
    </div>
  );
};

/** The Desk Zero sign: dark panel, big letters, the department arrows. `subtitle` can cross-fade to `subtitleTo`. */
export const DeskZeroSign: React.FC<{ scale?: number; subtitle?: string; subtitleTo?: string; swapAt?: number; style?: CSSProperties; light?: boolean }> = ({
  scale = 1,
  subtitle = 'Patient registration',
  subtitleTo,
  swapAt = 0,
  style,
  light,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const swap = subtitleTo ? progress(frame, sec(swapAt, fps), sec(0.5, fps), EASE.inOut) : 0;
  return (
    <div style={{ width: 900 * scale, height: 200 * scale, ...style }}>
      <div
        style={{
          width: 900,
          height: 200,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          borderRadius: 18,
          background: light ? COLORS.ink : '#1a2d52',
          border: `2px solid ${light ? COLORS.ink : INK.line}`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 40px',
          boxSizing: 'border-box',
          color: COLORS.white,
          gap: 40,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: '0.04em', lineHeight: 1, whiteSpace: 'nowrap' }}>DESK ZERO</div>
          <div style={{ position: 'relative', height: 36, marginTop: 14 }}>
            <div style={{ position: 'absolute', fontSize: 30, fontWeight: 600, color: COLORS.neutral300, opacity: 1 - swap, transform: `translateY(${-10 * swap}px)` }}>{subtitle}</div>
            {subtitleTo ? (
              <div style={{ position: 'absolute', fontSize: 30, fontWeight: 700, color: COLORS.cyan400, opacity: swap, transform: `translateY(${10 * (1 - swap)}px)` }}>{subtitleTo}</div>
            ) : null}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 21, fontWeight: 700, letterSpacing: '0.06em', color: COLORS.neutral300 }}>
          {['REGISTRATION', 'TRIAGE', 'CONSULTATION', 'PHARMACY'].map((d) => (
            <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {d} <Icon name="arrowRight" size={20} strokeWidth={2.6} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/** "NOW SERVING 087" ticket. `steps` are times (seconds) when the number goes up by one. */
export const QueueTicket: React.FC<{ startNumber?: number; steps?: number[]; style?: CSSProperties }> = ({ startNumber = 87, steps = [], style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const done = steps.filter((s) => t >= s).length;
  const last = steps[done - 1];
  const roll = last === undefined ? 1 : progress(frame, sec(last, fps), sec(0.35, fps), EASE.enter);
  return (
    <div
      style={{
        width: 300,
        padding: '26px 30px 22px',
        borderRadius: 14,
        background: COLORS.paper,
        color: COLORS.ink,
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        ...style,
      }}
    >
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.textSecondary }}>NOW SERVING</div>
      <div style={{ height: 112, overflow: 'hidden', position: 'relative' }}>
        <div style={{ fontSize: 108, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: '112px', fontVariantNumeric: 'tabular-nums', transform: `translateY(${mix(roll, 40, 0)}px)`, opacity: roll }}>
          {String(startNumber + done).padStart(3, '0')}
        </div>
      </div>
      <div style={{ borderTop: `2px dashed ${COLORS.neutral300}`, paddingTop: 12, fontSize: 20, fontWeight: 600, color: COLORS.textSecondary }}>More patients ahead</div>
    </div>
  );
};

/**
 * A row of people (user icons). `appearAt` + `stagger` fill it left to right; `shifts` slide the
 * whole row one slot left at each time (the queue moving); `highlight` paints chosen indexes.
 */
export const PeopleRow: React.FC<{
  count: number;
  size?: number;
  gap?: number;
  appearAt?: number;
  stagger?: number;
  shifts?: number[];
  color?: string;
  highlight?: { index: number; at: number; color: string }[];
  style?: CSSProperties;
}> = ({ count, size = 64, gap = 18, appearAt = 0, stagger = 0.06, shifts = [], color = COLORS.white, highlight = [], style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const slot = size + gap;
  const shift = shifts.reduce((acc, s) => acc + progress(frame, sec(s, fps), sec(0.5, fps), EASE.inOut), 0);
  return (
    <div style={{ position: 'relative', height: size, width: count * slot - gap, ...style }}>
      {Array.from({ length: count + shifts.length }).map((_, i) => {
        const a = progress(frame, sec(appearAt + Math.min(i, count) * stagger, fps), sec(0.4, fps), EASE.enter);
        const x = (i - shift) * slot;
        const edgeOut = interpolate(x, [-slot, 0], [0, 1], clamp);
        const edgeIn = interpolate(x, [(count - 1) * slot, count * slot], [1, 0], clamp);
        const h = highlight.find((hh) => hh.index === i);
        const on = h ? progress(frame, sec(h.at, fps), sec(0.4, fps), EASE.standard) : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: 0, opacity: a * Math.min(edgeOut, edgeIn), color: on > 0.5 ? h!.color : color, transform: `scale(${1 + on * 0.12})` }}>
            <Icon name="user" size={size} strokeWidth={1.8} />
          </div>
        );
      })}
    </div>
  );
};

/** Big number + caption (count-up handled by the caller via `value`). */
export const Stat: React.FC<{ value: string; label: string; size?: number; color?: string; labelColor?: string; align?: 'left' | 'center'; style?: CSSProperties }> = ({
  value,
  label,
  size = 180,
  color = COLORS.white,
  labelColor = COLORS.neutral300,
  align = 'center',
  style,
}) => (
  <div style={{ textAlign: align, ...style }}>
    <div style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1, color, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
    <div style={{ fontSize: size * 0.17, fontWeight: 600, color: labelColor, marginTop: size * 0.1, lineHeight: 1.25, whiteSpace: 'pre-line' }}>{label}</div>
  </div>
);

/** Count-up value between `from` and `to`, formatted by `fmt`. Times in seconds (scene-local). */
export const useCount = (from: number, to: number, at: number, dur = 1.0) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return mix(progress(frame, sec(at, fps), sec(dur, fps), EASE.standard), from, to);
};
