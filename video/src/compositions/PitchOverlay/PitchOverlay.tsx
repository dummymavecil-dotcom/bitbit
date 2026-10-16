import { measureText } from '@remotion/layout-utils';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { COLORS, FONT_FAMILY, FONT_STACK } from '../../theme';
import { EASE, mix, progress, sec } from '../../utils';
import { CUES, QR_APP, QR_PROVIDER, type Cue } from './data';

/**
 * Captions and QR codes for the final voiced pitch. Rendered with a transparent background and
 * composited over the edited video. `still` puts a frame of the video behind it, for previews only.
 */
export const PitchOverlaySchema = z.object({ still: z.string(), captions: z.boolean(), qr: z.boolean() });
export const PitchOverlay_SECONDS = 300;

const CAP = { size: 34, weight: '600', padX: 30, padY: 14, bottom: 72 };
const QR_AT = 290.6; // the end card is settled by now

const textWidth = (text: string) =>
  measureText({ text, fontFamily: FONT_FAMILY, fontSize: CAP.size, fontWeight: CAP.weight, letterSpacing: '-0.01em' }).width;

/** Index of the cue on screen at time t, or -1. */
const cueAt = (t: number) => CUES.findIndex((c) => t >= c.start && t < c.end);
/** Cues closer than this share one pill that stays up and resizes, instead of blinking. */
const JOIN = 0.6;

const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // Find the current cue, or the last one if we're in a short gap after it.
  let i = cueAt(t);
  if (i < 0) {
    const prev = CUES.filter((c) => c.end <= t).length - 1;
    if (prev >= 0 && CUES[prev + 1] && CUES[prev + 1].start - CUES[prev].end < JOIN) i = prev;
  }
  if (i < 0) {
    // Fading out after a group ends.
    const prev = CUES.filter((c) => c.end <= t).length - 1;
    if (prev < 0 || t - CUES[prev].end > 0.2) return null;
    i = prev;
  }
  const c: Cue = CUES[i];
  const prevJoined = i > 0 && c.start - CUES[i - 1].end < JOIN;
  const nextJoined = i < CUES.length - 1 && CUES[i + 1].start - c.end < JOIN;
  const pillIn = prevJoined ? 1 : progress(frame, sec(c.start - 0.05, fps), sec(0.2, fps), EASE.enter);
  const pillOut = nextJoined ? 0 : progress(frame, sec(c.end, fps), sec(0.18, fps), EASE.inOut);
  const textIn = progress(frame, sec(c.start, fps), sec(0.16, fps), EASE.enter);
  const w = textWidth(c.text);
  const fromW = prevJoined ? textWidth(CUES[i - 1].text) : w;
  const width = mix(progress(frame, sec(c.start, fps), sec(0.2, fps), EASE.inOut), fromW, w) + CAP.padX * 2;
  const a = pillIn * (1 - pillOut);
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: CAP.bottom, display: 'flex', justifyContent: 'center', opacity: a, transform: `translateY(${mix(pillIn, 10, 0)}px)` }}>
      <div
        style={{
          width,
          boxSizing: 'border-box',
          padding: `${CAP.padY}px ${CAP.padX}px`,
          borderRadius: 18,
          background: COLORS.ink,
          color: COLORS.white,
          fontSize: CAP.size,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
          whiteSpace: 'nowrap',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <span style={{ display: 'inline-block', opacity: textIn, transform: `translateY(${mix(textIn, 6, 0)}px)` }}>{c.text}</span>
      </div>
    </div>
  );
};

const QrCode: React.FC<{ rows: string[]; size: number }> = ({ rows, size }) => {
  const n = rows.length;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges">
      {rows.map((r, y) => r.split('').map((v, x) => (v === '1' ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={COLORS.ink} /> : null)))}
    </svg>
  );
};

const QrCard: React.FC<{ rows: string[]; title: string; url: string; at: number; style: React.CSSProperties }> = ({ rows, title, url, at, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = progress(frame, sec(at, fps), sec(0.7, fps), EASE.enter);
  return (
    <div style={{ position: 'absolute', ...style, opacity: k, transform: `translateY(${mix(k, 24, 0)}px)` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: COLORS.white, borderRadius: 26, padding: 18, paddingRight: 28 }}>
        <div style={{ background: COLORS.white, padding: 6 }}>
          <QrCode rows={rows} size={150} />
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600 }}>SCAN TO TRY</div>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.025em', color: COLORS.ink, marginTop: 4 }}>{title}</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: COLORS.textSecondary, marginTop: 6 }}>{url}</div>
        </div>
      </div>
    </div>
  );
};

export const PitchOverlay: React.FC<z.infer<typeof PitchOverlaySchema>> = ({ still, captions, qr }) => (
  <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
    {still ? <Img src={staticFile(still)} style={{ width: '100%', height: '100%' }} /> : null}
    {qr ? (
      <>
        <QrCard rows={QR_APP} title="Patient app" url="bitbit-app.netlify.app" at={QR_AT} style={{ left: 110, top: 790 }} />
        <QrCard rows={QR_PROVIDER} title="Provider view" url="bitbit-provider.netlify.app" at={QR_AT + 0.15} style={{ right: 110, top: 790 }} />
      </>
    ) : null}
    {captions ? <Captions /> : null}
  </AbsoluteFill>
);
