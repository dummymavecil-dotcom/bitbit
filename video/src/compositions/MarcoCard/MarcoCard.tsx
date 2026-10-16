import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { COLORS, FONT_STACK } from '../../theme';
import { EASE, mix, progress, sec } from '../../utils';

/**
 * "Meet Marco." intro card, overlaid on the opening footage of the edited pitch.
 * Rendered with a transparent background (ProRes 4444) and composited over the video.
 * `still` shows a footage frame behind it, for previews only.
 */
export const MarcoCardSchema = z.object({ still: z.string() });
export const MarcoCard_SECONDS = 6.6;

const IN = 0.5; // card starts entering
const OUT = 5.95; // card starts leaving (the footage dissolves away at 6.6 s)

const CHIPS: { label: string; strong?: boolean }[] = [{ label: 'Sick' }, { label: 'Missing work' }, { label: 'Wants to get checked', strong: true }];

export const MarcoCard: React.FC<z.infer<typeof MarcoCardSchema>> = ({ still }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = (at: number, dur = 0.6, e = EASE.enter) => progress(frame, sec(at, fps), sec(dur, fps), e);
  const card = p(IN, 0.7);
  const out = p(OUT, 0.55, EASE.inOut);
  const avatar = p(IN + 0.15, 0.6);
  const title = p(IN + 0.3, 0.6);
  const sub = p(IN + 0.5, 0.6);
  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK }}>
      {still ? <Img src={staticFile(still)} style={{ width: '100%', height: '100%' }} /> : null}
      <div
        style={{
          position: 'absolute',
          left: 60,
          top: 96,
          opacity: card * (1 - out),
          transform: `translateX(${mix(card, -48, 0) + mix(out, 0, -32)}px)`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 34, background: COLORS.ink, borderRadius: 32, padding: '30px 42px 30px 30px' }}>
          <div
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              background: COLORS.cyan400,
              color: COLORS.ink,
              fontSize: 54,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              opacity: avatar,
              transform: `scale(${mix(avatar, 0.8, 1)})`,
            }}
          >
            MD
          </div>
          <div style={{ color: COLORS.white }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.16em', color: COLORS.cyan400, opacity: title, transform: `translateY(${mix(title, 12, 0)}px)` }}>THE PATIENT</div>
            <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.02, marginTop: 6, opacity: title, transform: `translateY(${mix(title, 18, 0)}px)` }}>
              Meet Marco.
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: COLORS.neutral200, marginTop: 10, opacity: sub, transform: `translateY(${mix(sub, 12, 0)}px)` }}>
              32 · BPO agent, night shift · Antipolo City
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 22 }}>
              {CHIPS.map((c, i) => {
                const k = p(IN + 0.8 + i * 0.16, 0.5);
                return (
                  <div
                    key={c.label}
                    style={{
                      padding: '9px 20px',
                      borderRadius: 999,
                      fontSize: 22,
                      fontWeight: 700,
                      boxSizing: 'border-box',
                      border: `2px solid ${c.strong ? COLORS.blue600 : 'rgba(255,255,255,0.55)'}`,
                      background: c.strong ? COLORS.blue600 : 'transparent',
                      color: COLORS.white,
                      opacity: k,
                      transform: `translateY(${mix(k, 12, 0)}px)`,
                    }}
                  >
                    {c.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
