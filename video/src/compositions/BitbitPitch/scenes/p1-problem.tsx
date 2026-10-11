import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText, DischargePaper, Icon, LabPaper, MiniPaper, PrescriptionPaper } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { Center, Enter, Shapes, Stage } from '../../BitbitExplainer/shots/common';
import { IconTile } from '../../BitbitExplainer/screens/ui';
import { DeskZeroSign, INK, PeopleRow, QueueTicket, Stat, Timer, useCount } from '../kit';

/*
 * Part 1: the problem at Desk Zero. The "before" world: ink background, paper documents,
 * white and blue-300 type, no brand-blue fills. Times are seconds from each scene's start.
 */


const useLocal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps, p: (d: number, dur = 0.6, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e) };
};

/** Quiet navy shapes for the before world (decoration stays low-contrast here). */
const inkShapes = (v: 0 | 1) =>
  v === 0
    ? [
        { kind: 'ring' as const, x: 1700, y: 180, size: 200, color: INK.line, delay: 0.3 },
        { kind: 'square' as const, x: 1780, y: 900, size: 120, color: INK.panel, delay: 0.45, rotate: 12 },
      ]
    : [
        { kind: 'circle' as const, x: 170, y: 920, size: 160, color: INK.panel, delay: 0.3 },
        { kind: 'ring' as const, x: 1760, y: 860, size: 160, color: INK.line, delay: 0.45 },
      ];

/** White headline, line by line, for the ink scenes. */
const Headline: React.FC<{ text: string; delay?: number; size?: number; style?: React.CSSProperties; color?: string }> = ({ text, delay = 0.2, size = 96, style, color = COLORS.white }) => (
  <div style={{ position: 'absolute', ...style }}>
    <AnimatedText text={text} by="line" delay={delay} stagger={0.16} duration={0.6} rise={30} blur={0} style={{ fontSize: size, fontWeight: 800, lineHeight: 1.04, letterSpacing: '-0.04em', color }} />
  </div>
);

/** The small running timer in the top-right corner (lines 4–5). */
const CornerTimer: React.FC<{ from: number; to: number; dur: number }> = ({ from, to, dur }) => (
  <Enter delay={0} rise={0} style={{ position: 'absolute', right: 90, top: 70 }}>
    <Timer segments={[{ at: 0, dur, from, to }]} size={84} easing={EASE.linear} color={COLORS.white} />
  </Enter>
);

/* ---------- 1. Meet Marco ---------- */

const Chip: React.FC<{ label: string; at: number }> = ({ label, at }) => (
  <Enter delay={at} rise={16}>
    <div style={{ padding: '14px 26px', borderRadius: 999, border: `2px solid ${COLORS.white}`, fontSize: 32, fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</div>
  </Enter>
);

export const MeetScene: React.FC = () => (
  <Stage tone="ink">
    <Shapes shapes={inkShapes(0)} />
    <Enter delay={0.15} rise={30} scaleFrom={0.9} style={{ position: 'absolute', left: 200, top: 410 }}>
      <div style={{ width: 260, height: 260, borderRadius: 130, background: COLORS.cyan400, color: COLORS.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 104, fontWeight: 800, letterSpacing: '-0.03em' }}>
        MD
      </div>
    </Enter>
    <Headline text="Meet Marco." delay={0.25} size={128} style={{ left: 540, top: 398 }} />
    <Enter delay={0.7} rise={14} style={{ position: 'absolute', left: 546, top: 550 }}>
      <div style={{ fontSize: 36, fontWeight: 600, color: INK.soft }}>32 · BPO agent, night shift · Antipolo City</div>
    </Enter>
    <div style={{ position: 'absolute', left: 540, top: 640, display: 'flex', gap: 18 }}>
      <Chip label="Sick" at={1.1} />
      <Chip label="Missing work" at={2.1} />
      <Chip label="Wants to get checked" at={3.2} />
    </div>
  </Stage>
);

/* ---------- 2. The lines are long ---------- */

export const QueueScene: React.FC = () => {
  const { p } = useLocal();
  const x = p(3.3, 0.7);
  return (
    <Stage tone="ink">
      <Enter delay={0.1} rise={-40} style={{ position: 'absolute', left: 120, top: 90 }}>
        <DeskZeroSign />
      </Enter>
      <Enter delay={0.5} rise={30} style={{ position: 'absolute', left: 1500, top: 70 }}>
        <QueueTicket />
      </Enter>
      <PeopleRow count={14} size={78} gap={34} appearAt={0.7} stagger={0.09} style={{ position: 'absolute', left: 120, top: 470 }} />
      <div style={{ position: 'absolute', left: 120, top: 640, opacity: x, transform: `translateY(${mix(x, 30, 0)}px)` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 36 }}>
          <div style={{ fontSize: 220, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: INK.accent }}>2–3×</div>
          <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2 }}>
            hospitals running
            <br />
            over their capacity
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 3. It arrives like this ---------- */

const SPILL = [
  { el: 'rx', x: 690, y: 170, r: -6, d: 0.85 },
  { el: 'lab', x: 980, y: 120, r: 4, d: 1.0 },
  { el: 'dc', x: 1270, y: 180, r: 6, d: 1.15 },
  { el: 'mini1', x: 560, y: 380, r: -3, d: 1.3 },
  { el: 'mini2', x: 1400, y: 400, r: 3, d: 1.45 },
] as const;

export const EnvelopeScene: React.FC = () => {
  const { p } = useLocal();
  const tip = p(0.35, 0.5, EASE.inOut);
  const env = { x: 960, y: 820 };
  return (
    <Stage tone="ink">
      <Headline text={'It arrives\nlike this.'} delay={2.6} size={96} style={{ left: 120, top: 110 }} />
      {SPILL.map((s) => {
        const k = p(s.d, 0.7);
        const scale = 0.4;
        const w = 560 * scale;
        const h = 760 * scale;
        return (
          <div
            key={s.el}
            style={{
              position: 'absolute',
              left: mix(k, env.x - w / 2, s.x),
              top: mix(k, env.y - h / 2, s.y),
              opacity: k > 0 ? 1 : 0,
              transform: `rotate(${mix(k, 0, s.r)}deg) scale(${mix(k, 0.7, 1)})`,
              zIndex: 1,
            }}
          >
            {s.el === 'rx' ? (
              <PrescriptionPaper scale={scale} />
            ) : s.el === 'lab' ? (
              <LabPaper scale={scale} />
            ) : s.el === 'dc' ? (
              <DischargePaper scale={scale} />
            ) : (
              <MiniPaper title={s.el === 'mini1' ? 'RESETA' : 'REFERRAL'} scale={scale} />
            )}
          </div>
        );
      })}
      {/* Envelope: back flap, body. Drawn flat in kraft paper colour. */}
      <Enter delay={0.05} rise={60} style={{ position: 'absolute', left: env.x - 300, top: env.y - 150, zIndex: 2 }}>
        <div style={{ transform: `rotate(${mix(tip, 0, -7)}deg)`, transformOrigin: '50% 100%' }}>
          <svg width={600} height={330} viewBox="0 0 600 330">
            <rect x={0} y={40} width={600} height={290} rx={18} fill="#d8c7a3" />
            <path d="M0 58 L300 230 L600 58" fill="none" stroke="#b9a479" strokeWidth={6} />
            <rect x={210} y={250} width={180} height={34} rx={6} fill="#c9b68e" />
          </svg>
        </div>
      </Enter>
    </Stage>
  );
};

/* ---------- 4. Manual reconstruction ---------- */

const QUESTIONS = [
  { q: 'Allergies?', x: 120, y: 330, at: 0.7 },
  { q: 'Past illnesses?', x: 520, y: 390, at: 1.4 },
  { q: 'Maintenance meds?', x: 160, y: 540, at: 2.1 },
  { q: 'Family history?', x: 620, y: 610, at: 2.8 },
];

export const QuestionsScene: React.FC = () => (
  <Stage tone="ink">
    <CornerTimer from={0} to={300} dur={5} />
    <Headline text="Desk Zero asks." delay={0.15} size={84} style={{ left: 120, top: 110 }} />
    {QUESTIONS.map((q) => (
      <Enter key={q.q} delay={q.at} rise={30} style={{ position: 'absolute', left: q.x, top: q.y }}>
        <div style={{ padding: '26px 36px', borderRadius: 18, background: COLORS.paper, color: COLORS.ink, fontSize: 44, fontWeight: 700, boxShadow: '0 16px 30px rgba(0,0,0,0.25)' }}>{q.q}</div>
      </Enter>
    ))}
    <Headline text={'Memory is\nthe database.'} delay={3.4} size={84} color={INK.accent} style={{ left: 1180, top: 560 }} />
  </Stage>
);

/* ---------- 5. Missing · elsewhere · scattered ---------- */

const Column: React.FC<{ title: string; at: number; left: number; children: React.ReactNode }> = ({ title, at, left, children }) => (
  <div style={{ position: 'absolute', left, top: 250, width: 520 }}>
    <Enter delay={at} rise={16}>
      <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 30 }}>{title}</div>
    </Enter>
    <Enter delay={at + 0.15} rise={30}>
      <div style={{ position: 'relative', height: 480 }}>{children}</div>
    </Enter>
  </div>
);

const PlaceCard: React.FC<{ name: string; sub: string }> = ({ name, sub }) => (
  <div style={{ width: 380, padding: '22px 28px', borderRadius: 18, background: COLORS.paper, color: COLORS.ink }}>
    <div style={{ fontSize: 32, fontWeight: 800 }}>{name}</div>
    <div style={{ fontSize: 22, color: COLORS.textSecondary, marginTop: 4 }}>{sub}</div>
  </div>
);

export const ScatteredScene: React.FC = () => {
  const { p } = useLocal();
  const blanks = p(0.9, 0.5, EASE.standard);
  const breakIt = p(3.0, 0.4, EASE.standard);
  return (
    <Stage tone="ink">
      <CornerTimer from={300} to={750} dur={7.5} />
      <Column title="Missing" at={0.2} left={120}>
        <div style={{ position: 'relative' }}>
          <LabPaper scale={0.62} />
          {[322, 368, 414].map((y) => (
            <div
              key={y}
              style={{
                position: 'absolute',
                left: 160 * 0.62,
                top: (y - 4) * 0.62,
                width: 320 * 0.62,
                height: 34 * 0.62,
                borderRadius: 5,
                background: COLORS.paper,
                border: `2px dashed ${COLORS.neutral450}`,
                opacity: blanks,
              }}
            />
          ))}
        </div>
      </Column>
      <Column title="Elsewhere" at={1.7} left={720}>
        <PlaceCard name="Riverside Clinic" sub="Has his prescription" />
        <div style={{ position: 'absolute', left: 186, top: 116, height: 150, borderLeft: `4px dashed ${INK.soft}`, clipPath: `inset(0 0 ${breakIt * 0}% 0)` }} />
        <div style={{ position: 'absolute', left: 156, top: 166, width: 64, height: 64, borderRadius: 32, background: COLORS.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.white, opacity: breakIt, transform: `scale(${mix(breakIt, 0.6, 1)})` }}>
          <Icon name="close" size={48} strokeWidth={3} />
        </div>
        <div style={{ position: 'absolute', top: 270 }}>
          <PlaceCard name="This desk" sub="Rizal District Hospital" />
        </div>
      </Column>
      <Column title="Scattered" at={4.1} left={1320}>
        <div style={{ position: 'absolute', left: 0, top: 30, transform: 'rotate(-5deg)' }}>
          <DischargePaper scale={0.42} />
        </div>
        <div style={{ position: 'absolute', left: 150, top: 0, transform: 'rotate(4deg)' }}>
          <MiniPaper title="REFERRAL" scale={0.42} />
        </div>
        <div style={{ position: 'absolute', left: 70, top: 110, transform: 'rotate(-1deg)' }}>
          <PrescriptionPaper scale={0.42} />
        </div>
      </Column>
      <Enter delay={5.6} rise={14} style={{ position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center' }}>
        <div style={{ fontSize: 48, fontWeight: 700 }}>
          The information exists. <span style={{ color: INK.accent }}>It&apos;s scattered.</span>
        </div>
      </Enter>
    </Stage>
  );
};

/* ---------- 6. Thirty minutes ---------- */

export const ThirtyScene: React.FC = () => (
  <Stage tone="ink">
    <Shapes shapes={inkShapes(1)} />
    <Center style={{ flexDirection: 'column' }}>
      <Timer segments={[{ at: 0.15, dur: 1.6, from: 750, to: 1800 }]} size={250} />
      <Enter delay={1.6} rise={14}>
        <div style={{ fontSize: 52, fontWeight: 700, color: INK.soft, marginTop: 40 }}>to rebuild one history</div>
      </Enter>
    </Center>
  </Stage>
);

/* ---------- 7. Then the next patient. And the next. ---------- */

export const NextScene: React.FC = () => {
  const steps = [1.9, 3.3];
  return (
    <Stage tone="ink">
      <Enter delay={0} rise={0} style={{ position: 'absolute', left: 120, top: 120 }}>
        <QueueTicket steps={steps} />
      </Enter>
      <div style={{ position: 'absolute', left: 560, top: 150 }}>
        <Timer
          segments={[
            { at: 0, dur: 0.01, from: 1800, to: 1800 },
            { at: steps[0], dur: 1.1, from: 0, to: 1800 },
            { at: steps[1], dur: 0.9, from: 0, to: 1800 },
          ]}
          size={170}
          label="for every patient"
          labelColor={INK.soft}
          style={{ alignItems: 'flex-start' }}
        />
      </div>
      <PeopleRow count={12} size={84} gap={40} appearAt={0} stagger={0} shifts={steps} style={{ position: 'absolute', left: 140, top: 640 }} highlight={[{ index: 0, at: 0, color: COLORS.cyan400 }]} />
      <Enter delay={0.3} rise={10} style={{ position: 'absolute', left: 140, top: 760 }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: INK.soft }}>Marco · then the next · and the next</div>
      </Enter>
    </Stage>
  );
};

/* ---------- 8. 400 × 30 = 200 hours → 250+ patients ---------- */

const Term: React.FC<{ value: string; label: string; at: number; color?: string }> = ({ value, label, at, color }) => (
  <Enter delay={at} rise={24}>
    <Stat value={value} label={label} size={190} color={color} />
  </Enter>
);

const Op: React.FC<{ s: string; at: number }> = ({ s, at }) => (
  <Enter delay={at} rise={0} scaleFrom={0.6}>
    <div style={{ fontSize: 130, fontWeight: 700, color: INK.soft, margin: '0 36px', lineHeight: 1, transform: 'translateY(30px)' }}>{s}</div>
  </Enter>
);

export const MathScene: React.FC = () => {
  const { p } = useLocal();
  const patients = useCount(0, 400, 0.15, 0.9);
  const minutes = useCount(0, 30, 0.95, 0.6);
  const hours = useCount(0, 200, 1.75, 1.0);
  const more = useCount(0, 250, 4.1, 1.0);
  const up = p(3.7, 0.6, EASE.inOut);
  const second = p(3.95, 0.6);
  return (
    <Stage tone="ink">
      <div style={{ position: 'absolute', left: 0, right: 0, top: mix(up, 300, 150), display: 'flex', justifyContent: 'center', alignItems: 'flex-start', transform: `scale(${mix(up, 1, 0.82)})` }}>
        <Term value={String(Math.round(patients))} label={'patients a day\nat Desk Zero'} at={0.1} />
        <Op s="×" at={0.8} />
        <Term value={String(Math.round(minutes))} label="minutes each" at={0.9} />
        <Op s="=" at={1.6} />
        <Term value={String(Math.round(hours))} label="hours lost every day" at={1.7} color={INK.accent} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 40, opacity: second, transform: `translateY(${mix(second, 40, 0)}px)` }}>
        <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: COLORS.white, fontVariantNumeric: 'tabular-nums' }}>{Math.round(more)}+</div>
        <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.2 }}>
          more patients they
          <br />
          could serve every day
        </div>
      </div>
    </Stage>
  );
};

/* ---------- 9. The switch: outdated → ready to read ---------- */

const PILE = [
  { el: 'rx', x: 230, y: 380, r: -9 },
  { el: 'lab', x: 560, y: 300, r: 7 },
  { el: 'dc', x: 1100, y: 340, r: -5 },
  { el: 'mini1', x: 1400, y: 420, r: 8 },
  { el: 'mini2', x: 820, y: 470, r: -3 },
] as const;

export const SwitchScene: React.FC = () => {
  const { p, frame, fps } = useLocal();
  const align = p(2.6, 1.0, EASE.inOut);
  const merge = p(3.7, 0.7, EASE.inOut);
  const light = progress(frame, sec(3.8, fps), sec(1.2, fps), EASE.inOut);
  const card = p(4.2, 0.7);
  const bg = interpolate(light, [0, 1], [0, 1]);
  const mixColor = (a: string, b: string, t: number) => {
    const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
    const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
    return `rgb(${pa.map((v, i) => Math.round(mix(t, v, pb[i]))).join(',')})`;
  };
  const scale = 0.44;
  const w = 560 * scale;
  const h = 760 * scale;
  const center = { x: 960 - w / 2, y: 470 - h / 2 };
  return (
    <Stage tone="ink" bg={mixColor(COLORS.ink, COLORS.bg, bg)}>
      <div style={{ opacity: 1 - p(2.5, 0.35, EASE.exit) }}>
        <Headline text={'An outdated,\nmanual process.'} delay={0.2} size={96} style={{ left: 120, top: 90 }} />
      </div>
      {PILE.map((s, i) => {
        const k = p(0.15 + i * 0.12, 0.6);
        const x = mix(align, s.x, center.x + i * 6);
        const y = mix(align, s.y, center.y - i * 6);
        return (
          <div key={s.el} style={{ position: 'absolute', left: x, top: y, opacity: k * (1 - merge), transform: `translateY(${mix(k, 80, 0)}px) rotate(${mix(align, s.r, 0)}deg) scale(${mix(merge, 1, 1.4)})` }}>
            {s.el === 'rx' ? (
              <PrescriptionPaper scale={scale} />
            ) : s.el === 'lab' ? (
              <LabPaper scale={scale} />
            ) : s.el === 'dc' ? (
              <DischargePaper scale={scale} />
            ) : (
              <MiniPaper title={s.el === 'mini1' ? 'RESETA' : 'REFERRAL'} scale={scale} />
            )}
          </div>
        );
      })}
      <div style={{ position: 'absolute', left: 960 - 450, top: 230, width: 900, opacity: card, transform: `scale(${mix(card, 0.92, 1)})` }}>
        <div style={{ background: COLORS.white, borderRadius: 36, border: `1.5px solid ${COLORS.neutral150}`, padding: '46px 52px', color: COLORS.ink, boxShadow: '0 30px 60px rgba(11,27,51,0.10)' }}>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.textTertiary }}>MARCO DELA CRUZ · 32 · O+</div>
          <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 8 }}>Ready to read.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
            {[
              { icon: 'alert' as const, tone: 'pink' as const, label: 'Allergies', value: 'Penicillin · Shrimp' },
              { icon: 'pill' as const, tone: 'blue' as const, label: 'Medication', value: 'Amlodipine 5 mg · once daily' },
              { icon: 'stethoscope' as const, tone: 'blue' as const, label: 'Condition', value: 'Hypertension · since 2024' },
            ].map((r, i) => (
              <div key={r.label} style={{ display: 'flex', alignItems: 'center', gap: 20, opacity: p(4.6 + i * 0.15, 0.4) }}>
                <IconTile icon={r.icon} tone={r.tone} size={58} />
                <div style={{ width: 190, fontSize: 26, color: COLORS.textTertiary }}>{r.label}</div>
                <div style={{ fontSize: 32, fontWeight: 700, whiteSpace: 'nowrap' }}>{r.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Stage>
  );
};
