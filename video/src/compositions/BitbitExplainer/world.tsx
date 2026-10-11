import { createContext, useContext, type CSSProperties, type ReactNode } from 'react';
import { AbsoluteFill, interpolate, Sequence, useVideoConfig } from 'remotion';
import { COLORS, FONT_STACK } from '../../theme';
import { EASE, mix, useScale } from '../../utils';

/**
 * The explainer lives on one big "table" of panels (world coordinates, 1 unit = 1px at 1920 wide).
 * A camera (centre x/y, zoom, rotation) glides between panels. Panels far from the camera dim.
 */
export type Cam = { x: number; y: number; zoom: number; rot: number };
/** Camera keyframe: at `at` seconds, start moving to `cam` over `dur` seconds. */
export type CamKey = { at: number; cam: Cam; dur?: number };

const lerpCam = (a: Cam, b: Cam, t: number): Cam => ({
  x: mix(t, a.x, b.x),
  y: mix(t, a.y, b.y),
  zoom: a.zoom * Math.pow(b.zoom / a.zoom, t), // geometric, so zooms feel even
  rot: mix(t, a.rot, b.rot),
});

/** Camera at time `t` (seconds). A move interrupted by the next key continues from where it was. */
export const camAt = (keys: CamKey[], t: number): Cam => {
  let from = keys[0].cam;
  let current = keys[0].cam;
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    if (t < k.at) break;
    // Where the camera was when this key started.
    const prev = keys[i - 1];
    const prevP = EASE.inOut(Math.min(1, Math.max(0, (k.at - prev.at) / (prev.dur ?? 1.1))));
    from = i === 1 ? keys[0].cam : lerpCam(from, prev.cam, prevP);
    const p = EASE.inOut(Math.min(1, Math.max(0, (t - k.at) / (k.dur ?? 1.1))));
    current = lerpCam(from, k.cam, p);
  }
  return current;
};

const CamContext = createContext<Cam>({ x: 0, y: 0, zoom: 1, rot: 0 });

export const World: React.FC<{ cam: Cam; children: ReactNode; floor?: string }> = ({ cam, children, floor = COLORS.neutral150 }) => {
  const s = useScale();
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: floor, overflow: 'hidden', fontFamily: FONT_STACK, color: COLORS.ink }}>
      <div
        style={{
          position: 'absolute',
          left: width / 2,
          top: height / 2,
          transformOrigin: '0 0',
          transform: `scale(${s * cam.zoom}) rotate(${cam.rot}deg) translate(${-cam.x}px, ${-cam.y}px)`,
        }}
      >
        <CamContext.Provider value={cam}>{children}</CamContext.Provider>
      </div>
    </AbsoluteFill>
  );
};

export type Rect = { x: number; y: number; w: number; h: number };

export type PanelProps = Rect & {
  color?: string;
  /** Seconds (composition time) when the content starts animating. Content is hidden before. */
  start?: number;
  radius?: number;
  /** Extra opacity multiplier (e.g. to dim a panel on purpose). */
  dim?: number;
  children?: ReactNode;
  style?: CSSProperties;
};

/** A rounded, flat-colour tile on the table. Children are laid out in panel-local pixels. */
export const Panel: React.FC<PanelProps> = ({ x, y, w, h, color = COLORS.bg, start, radius = 36, dim = 1, children, style }) => {
  const cam = useContext(CamContext);
  const { fps } = useVideoConfig();
  const d = Math.hypot(x - cam.x, y - cam.y) * cam.zoom;
  const distanceOpacity = interpolate(d, [1050, 1900], [1, 0.42], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const content =
    start === undefined ? (
      children
    ) : (
      <Sequence from={Math.round(start * fps)} layout="none">
        {children}
      </Sequence>
    );
  return (
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        borderRadius: radius,
        background: color,
        overflow: 'hidden',
        opacity: distanceOpacity * dim,
        ...style,
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>{content}</div>
    </div>
  );
};
