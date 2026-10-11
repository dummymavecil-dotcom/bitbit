import type { ReactNode } from 'react';
import { interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';
import { PhoneFrame, ScreenImage } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { Center, Enter, LeftStatement, phoneShapes, Shapes, Stage } from '../../BitbitExplainer/shots/common';
import { RightPhone } from '../../BitbitExplainer/shots/Part1';
import { DeskZeroSign, Timer, useCount } from '../kit';
import { ProviderTablet } from '../provider';
import { FeelingScreen, QuestionsScreen, ReviewShareScreen, ScreenReveal, ShareChecklistScreen } from '../screens-prepare';
import { PatientSummaryScreen, TriageDeskScreen } from '../screens-provider';

/*
 * Parts 4–5: Prepare and Share. Scenes that span several lines keep the phone (or tablet) still and
 * cross-fade only what's on its screen, while the headline on the left changes.
 */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Layers that appear at given times (seconds), each with its own local clock, cross-fading in. */
const Swap: React.FC<{ layers: { at: number; node: ReactNode }[]; fade?: number; bg?: string; fill?: boolean }> = ({ layers, fade = 0.4, bg, fill = true }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      {layers.map((l, i) => {
        const next = layers[i + 1];
        const o = progress(frame, sec(l.at, fps), sec(i === 0 ? 0.01 : fade, fps), EASE.inOut);
        // Hide a layer once the one above has fully covered it.
        const gone = next ? frame >= sec(next.at + fade, fps) : false;
        if (gone || o <= 0) return null;
        return (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: o, background: bg }}>
            <Sequence from={sec(l.at, fps)} layout={fill ? 'absolute-fill' : 'none'}>
              {l.node}
            </Sequence>
          </div>
        );
      })}
    </>
  );
};

/** Headlines that replace each other at given times (the old one fades out first). */
const Headlines: React.FC<{ items: { at: number; text: string; kicker?: string }[]; size?: number }> = ({ items, size = 84 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <>
      {items.map((h, i) => {
        const next = items[i + 1];
        if (t < h.at || (next && t >= next.at)) return null;
        const out = next ? interpolate(t, [next.at - 0.3, next.at], [1, 0], clamp) : 1;
        return (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: out }}>
            <Sequence from={sec(h.at, fps)} layout="none">
              <LeftStatement text={h.text} kicker={h.kicker} delay={0.2} size={size} />
            </Sequence>
          </div>
        );
      })}
    </>
  );
};

/** Kicker line above the tablet that swaps text. */
const Kickers: React.FC<{ items: { at: number; text: string }[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <>
      {items.map((k, i) => {
        const next = items[i + 1];
        const on = interpolate(t, [k.at + 0.1, k.at + 0.4], [0, 1], clamp);
        const off = next ? interpolate(t, [next.at - 0.25, next.at], [0, 1], clamp) : 0;
        return (
          <div key={i} style={{ position: 'absolute', left: 210, top: 44, fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600, opacity: on * (1 - off) }}>
            {k.text}
          </div>
        );
      })}
    </>
  );
};

/* ---------- Part 4: Prepare ---------- */

/** Home with the "Not feeling well? Prepare for a visit" card getting a ring and a press. */
const HomeTap: React.FC<{ ringAt: number; pressAt: number }> = ({ ringAt, pressAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const ring = progress(frame, sec(ringAt, fps), sec(0.3, fps), EASE.enter);
  const press = interpolate(t, [pressAt, pressAt + 0.08, pressAt + 0.2], [0, 1, 0], clamp);
  return (
    <>
      <ScreenImage name="02-home" />
      <div style={{ position: 'absolute', left: 20, top: 561, width: 350, height: 77, borderRadius: 22, border: `2.5px solid ${COLORS.blue500}`, opacity: ring, transform: `scale(${1 - 0.02 * press})` }} />
    </>
  );
};

export const PrepareAScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(0)} />
    <Headlines
      items={[
        { at: 0, text: 'No medical\nlanguage required.', kicker: 'PREPARE' },
        { at: 6.0, text: 'A few questions.\nNot a diagnosis.', kicker: 'PREPARE' },
        { at: 11.5, text: 'His words,\nready to read.', kicker: 'PREPARE' },
      ]}
    />
    <RightPhone>
      <Swap
        bg={COLORS.bg}
        layers={[
          { at: 0, node: <HomeTap ringAt={0.3} pressAt={1.0} /> },
          { at: 1.3, node: <FeelingScreen typeAt={0.4} typeDur={2.6} /> },
          { at: 6.0, node: <QuestionsScreen at={0.5} /> },
          { at: 11.5, node: <ScreenReveal name="11-visit-3-why-seeking-care" at={0.2} dur={1.3} /> },
        ]}
      />
    </RightPhone>
  </Stage>
);

export const ForwardScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(1)} />
    <LeftStatement text={"Today's complaint\ndoesn't arrive\nalone."} kicker="PREPARE" size={84} />
    <RightPhone>
      <ScreenReveal name="12-visit-4-suggested" at={0.3} dur={1.8} />
    </RightPhone>
  </Stage>
);

export const PrepareBScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(0)} />
    <Headlines
      items={[
        { at: 0, text: 'Nothing leaves\nuntil Marco\nsays so.', kicker: 'HIS RECORD. HIS DECISION.' },
        { at: 5.0, text: 'Check it.\nUncheck it.', kicker: 'HIS RECORD. HIS DECISION.' },
        { at: 9.5, text: 'No blanket access.\nOne clear\npacket.', kicker: 'HIS RECORD. HIS DECISION.' },
      ]}
    />
    <RightPhone>
      <Swap
        bg={COLORS.bg}
        layers={[
          { at: 0, node: <ScreenReveal name="13-visit-5-record-is-yours" at={0.1} dur={0.8} /> },
          {
            at: 2.4,
            node: (
              <ShareChecklistScreen
                scrollAt={5.0 - 2.4}
                toggles={[
                  { index: 6, at: 5.5 - 2.4 },
                  { index: 7, at: 7.3 - 2.4 },
                ]}
              />
            ),
          },
          { at: 9.5, node: <ReviewShareScreen at={0.3} /> },
        ]}
      />
    </RightPhone>
  </Stage>
);

/* ---------- Part 5: Share ---------- */

export const PresentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const reach = interpolate(t, [1.0, 1.5, 2.1, 2.6], [0, 1, 1, 0], { ...clamp, easing: EASE.inOut });
  return (
    <Stage>
      <Enter delay={0} rise={-30} style={{ position: 'absolute', left: 110, top: 36 }}>
        <DeskZeroSign light scale={0.62} subtitle="Rizal District Hospital" />
      </Enter>
      <Enter delay={0.05} rise={40} style={{ position: 'absolute', left: 110, top: 200 }}>
        <ProviderTablet width={1300}>
          <TriageDeskScreen tapAt={1.7} />
        </ProviderTablet>
      </Enter>
      <Enter delay={0.2} x={160} rise={0} style={{ position: 'absolute', left: 1480, top: 230 }}>
        <div style={{ transform: `translateX(${mix(reach, 0, -90)}px) rotate(${mix(reach, 0, -8)}deg)` }}>
          <PhoneFrame scale={0.76}>
            <ScreenImage name="02-home" />
          </PhoneFrame>
        </div>
      </Enter>
    </Stage>
  );
};

export const PartnerScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(1)} />
    <LeftStatement text={'Or straight to a\npartner hospital.'} kicker="SHARE" />
    <RightPhone>
      <ScreenReveal name="16-shared-scheduled" at={0.25} dur={1.4} />
    </RightPhone>
  </Stage>
);

export const ReceiveScene: React.FC = () => (
  <Stage>
    <Kickers
      items={[
        { at: 0, text: 'THE PACKET HE CHOSE. NOT HIS WHOLE HISTORY.' },
        { at: 5.0, text: 'EVERY FACT ARRIVES WITH ITS SOURCE.' },
      ]}
    />
    <Enter delay={0} rise={40} style={{ position: 'absolute', left: 210, top: 100 }}>
      <ProviderTablet width={1500}>
        <Swap
          bg={COLORS.bg}
          layers={[
            { at: 0, node: <TriageDeskScreen tapAt={-1} arriveAt={0.35} /> },
            { at: 2.8, node: <PatientSummaryScreen bandAt={5.2 - 2.8} /> },
          ]}
        />
      </ProviderTablet>
    </Enter>
  </Stage>
);

export const ZeroScene: React.FC = () => (
  <Stage>
    <Center>
      <Enter delay={0.05} rise={30}>
        <DeskZeroSign light scale={1.6} subtitle="Start from zero" subtitleTo="Start from here" swapAt={1.3} />
      </Enter>
    </Center>
  </Stage>
);

export const SavingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const up = progress(frame, sec(3.0, fps), sec(0.7, fps), EASE.inOut);
  const stats = progress(frame, sec(3.3, fps), sec(0.6, fps), EASE.enter);
  const hours = useCount(0, 197, 3.4, 1.1);
  const patients = useCount(0, 250, 4.6, 1.0);
  return (
    <Stage>
      <div style={{ position: 'absolute', left: 0, right: 0, top: mix(up, 380, 150), display: 'flex', justifyContent: 'center', transform: `scale(${mix(up, 1, 0.62)})` }}>
        <Timer segments={[{ at: 0.3, dur: 1.6, from: 1800, to: 30 }]} size={230} color={COLORS.ink} label="per patient, at the triage desk" labelColor={COLORS.textSecondary} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', gap: 160, opacity: stats, transform: `translateY(${mix(stats, 40, 0)}px)` }}>
        {[
          { v: `${Math.round(hours)}`, l: 'hours saved every day' },
          { v: `${Math.round(patients)}+`, l: 'more patients every day' },
        ].map((s) => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 220, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: COLORS.blue600, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
            <div style={{ fontSize: 40, fontWeight: 700, color: COLORS.ink, marginTop: 14 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <Enter delay={5.6} rise={10} style={{ position: 'absolute', left: 0, right: 0, top: 860, textAlign: 'center' }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: COLORS.textSecondary }}>for each hospital</div>
      </Enter>
    </Stage>
  );
};
