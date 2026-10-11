import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  AnimatedText,
  CutFrame,
  DischargePaper,
  Icon,
  LabPaper,
  Logo,
  MiniPaper,
  PhoneFrame,
  PrescriptionPaper,
  ProvenanceTag,
  ScreenCrop,
  ScreenImage,
  type IconName,
} from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { AddHistoryScreen } from '../screens/AddHistoryScreen';
import { CUES } from '../timing';
import { Center, Enter, LeftStatement, phoneShapes, Shapes, Stage, useT } from './common';

/*
 * Part 1 scenes. Every scene is full-screen and straight (no tilt), laid out at 1920 × 1080.
 * Times inside a scene are seconds from that scene's start (see SCENES in timing.ts).
 */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Phone on the right half, rising into place. */
export const RightPhone: React.FC<{ children: React.ReactNode; dark?: boolean; delay?: number }> = ({ children, dark, delay = 0.15 }) => (
  <Enter delay={delay} rise={60} style={{ position: 'absolute', left: 1340 - 224, top: 66 }}>
    <PhoneFrame scale={1.1} screenBg={dark ? COLORS.ink : COLORS.bg}>
      {children}
    </PhoneFrame>
  </Enter>
);

/* ---------- Line 1: title card ---------- */

const TITLE_SHAPES = [
  { kind: 'circle' as const, x: 300, y: 250, size: 130, color: COLORS.cyan400, delay: 0.35 },
  { kind: 'square' as const, x: 1640, y: 230, size: 150, color: COLORS.blue500, delay: 0.5, rotate: 14 },
  { kind: 'ring' as const, x: 1660, y: 850, size: 210, color: COLORS.blue300, delay: 0.65 },
  { kind: 'square' as const, x: 260, y: 840, size: 110, color: COLORS.blue700, delay: 0.8, rotate: -12 },
];

export const BrandCard: React.FC<{ footer?: string }> = ({ footer }) => (
  <Stage tone="blue">
    <CutFrame width={1920} height={1080} delay={0.15} duration={1.6} />
    <Shapes shapes={TITLE_SHAPES} />
    <Center style={{ flexDirection: 'column' }}>
      <Enter delay={0.3} duration={0.8} rise={24}>
        <Logo white width={700} />
      </Enter>
      <AnimatedText
        text="Your health history, in your hands."
        by="word"
        delay={1.0}
        stagger={0.09}
        duration={0.55}
        rise={18}
        blur={0}
        style={{ fontSize: 58, fontWeight: 700, color: COLORS.white, marginTop: 52, letterSpacing: '-0.02em' }}
      />
      {footer ? (
        <Enter delay={1.6} rise={12}>
          <div style={{ fontSize: 28, fontWeight: 700, opacity: 0.85, marginTop: 28, letterSpacing: '0.14em' }}>{footer}</div>
        </Enter>
      ) : null}
    </Center>
  </Stage>
);

export const TitleScene: React.FC = () => <BrandCard />;

/* ---------- Line 2: 30 minutes → 30 seconds ---------- */

export const TimerScene: React.FC = () => {
  const p = useT(0.8, 1.9, EASE.inOut);
  const secs = Math.round(mix(p, 30 * 60, 30));
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <Stage tone="blue">
      <Shapes
        shapes={[
          { kind: 'ring', x: 330, y: 300, size: 180, color: COLORS.blue300, delay: 0.3 },
          { kind: 'circle', x: 1600, y: 820, size: 120, color: COLORS.cyan400, delay: 0.45 },
          { kind: 'square', x: 1620, y: 260, size: 120, color: COLORS.blue500, delay: 0.6, rotate: 12 },
        ]}
      />
      <Center style={{ flexDirection: 'column' }}>
        <Enter delay={0.2} rise={14}>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.85 }}>INTAKE AT THE TRIAGE DESK</div>
        </Enter>
        <Enter delay={0.4} rise={20} style={{ marginTop: 40 }}>
          <svg width={150} height={150} viewBox="0 0 150 150">
            <circle cx={75} cy={75} r={64} fill="none" stroke={COLORS.white} strokeWidth={8} />
            <line x1={75} y1={75} x2={75} y2={30} stroke={COLORS.white} strokeWidth={8} strokeLinecap="round" transform={`rotate(${mix(p, 0, -720)} 75 75)`} />
            <circle cx={75} cy={75} r={8} fill={COLORS.white} />
          </svg>
        </Enter>
        <Enter delay={0.55} rise={20}>
          <div style={{ fontSize: 260, fontWeight: 800, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05, marginTop: 10 }}>
            {mm}:{ss}
          </div>
        </Enter>
        <Enter delay={2.75} rise={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 22, fontSize: 52, fontWeight: 700 }}>
            30 minutes <Icon name="arrowRight" size={48} strokeWidth={2.6} /> 30 seconds
          </div>
        </Enter>
      </Center>
    </Stage>
  );
};

/* ---------- Line 3: scattered papers → one phone ---------- */

const SCATTER = [
  { title: 'RESETA', x: 160, y: 130, r: -8 },
  { title: 'LAB RESULT', x: 560, y: 90, r: 6 },
  { title: 'DISCHARGE', x: 190, y: 580, r: 5 },
  { title: 'REFERRAL', x: 610, y: 540, r: -5 },
];

export const GlanceScene: React.FC = () => {
  const gather = useT(1.0, 1.0, EASE.inOut);
  const target = { x: 1340, y: 540 };
  const pw = 560 * 0.42;
  const ph = 760 * 0.42;
  return (
    <Stage>
      <Shapes shapes={phoneShapes(0)} />
      {SCATTER.map((p, i) => {
        const g = Math.min(1, Math.max(0, gather * 1.15 - i * 0.05));
        return (
          <Enter
            key={p.title}
            delay={0.1 + i * 0.12}
            rise={30}
            style={{ position: 'absolute', left: mix(g, p.x, target.x - pw / 2), top: mix(g, p.y, target.y - ph / 2), opacity: 1 - interpolate(g, [0.55, 1], [0, 1], clamp) }}
          >
            <div style={{ transform: `scale(${mix(g, 1, 0.5)}) rotate(${mix(g, p.r, 0)}deg)` }}>
              <MiniPaper title={p.title} scale={0.42} />
            </div>
          </Enter>
        );
      })}
      <RightPhone delay={1.35}>
        <ScreenImage name="02-home" />
      </RightPhone>
      <LeftStatement text={'Ready to read\nat a glance.'} delay={2.3} top={400} />
    </Stage>
  );
};

/* ---------- Lines 4–5: collect · prepare · share, and Marco ---------- */

const PILLARS: { n: string; title: string; sub: string; icon: IconName; at: number }[] = [
  { n: '01', title: 'Collect', sub: 'Bring his history into one record.', icon: 'scan', at: 1.25 },
  { n: '02', title: 'Prepare', sub: 'Get ready for a visit.', icon: 'clipboard', at: 1.75 },
  { n: '03', title: 'Share', sub: 'Choose who sees what, and for how long.', icon: 'contactless', at: 2.25 },
];

export const PillarsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const collectAt = CUES.collect - CUES.pillars;
  const dimOthers = interpolate(t, [collectAt, collectAt + 0.6], [1, 0.3], clamp);
  const lift = progress(frame, sec(collectAt, fps), sec(0.6, fps), EASE.enter);
  return (
    <Stage>
      {PILLARS.map((p, i) => (
        <Enter key={p.title} delay={p.at - 0.15} rise={40} style={{ position: 'absolute', left: 110 + i * 580, top: 90, opacity: i === 0 ? 1 : dimOthers }}>
          <div
            style={{
              width: 540,
              height: 520,
              borderRadius: 36,
              background: COLORS.blue600,
              color: COLORS.white,
              padding: 52,
              boxSizing: 'border-box',
              transform: i === 0 ? `translateY(${mix(lift, 0, -14)}px) scale(${mix(lift, 1, 1.03)})` : undefined,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.85 }}>{p.n}</div>
              <Icon name={p.icon} size={84} strokeWidth={2} />
            </div>
            <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 100, lineHeight: 1 }}>{p.title}</div>
            <div style={{ fontSize: 32, fontWeight: 600, marginTop: 18, lineHeight: 1.25, opacity: 0.92 }}>{p.sub}</div>
          </div>
        </Enter>
      ))}
      <div style={{ position: 'absolute', left: 110, top: 670, width: 1700, height: 330, borderRadius: 36, background: COLORS.white, border: `1.5px solid ${COLORS.neutral150}`, opacity: dimOthers < 1 ? mix(1 - dimOthers, 1, 0.45) : 1 }}>
        <Enter delay={2.7} x={-60} rise={0} style={{ position: 'absolute', left: 40, top: 30 }}>
          <ScreenCrop name="02-home" x={20} y={116} w={350} h={208} width={455} />
        </Enter>
        <div style={{ position: 'absolute', left: 560, top: 92 }}>
          <Enter delay={3.0} rise={16}>
            <div style={{ fontSize: 62, fontWeight: 800, letterSpacing: '-0.035em' }}>Here&apos;s how it works for Marco.</div>
          </Enter>
          <Enter delay={3.25} rise={12}>
            <div style={{ fontSize: 32, color: COLORS.textSecondary, marginTop: 14 }}>32 · BPO agent on night shift · Antipolo City, Rizal</div>
          </Enter>
        </div>
      </div>
    </Stage>
  );
};

/* ---------- Line 6: one record ---------- */

export const RecordScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(1)} />
    <LeftStatement text={'One record,\nheld by Marco.'} kicker="COLLECT" />
    <RightPhone>
      <ScreenImage name="03-records-timeline" />
      {/* The screenshot uses short tag names; cover them with the full ones. */}
      <ProvenanceTag kind="provider" size={0.9} style={{ position: 'absolute', right: 49, top: 491 }} />
      <ProvenanceTag kind="patient" size={0.9} style={{ position: 'absolute', right: 49, top: 552 }} />
      <div style={{ position: 'absolute', left: 98, top: 747, width: 140, height: 13, background: COLORS.white }} />
    </RightPhone>
  </Stage>
);

/* ---------- Lines 7–8 (start): what he knows, he adds himself ---------- */

export const AddsScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(0)} />
    <LeftStatement text={'What he knows,\nhe adds himself.'} kicker="FROM MEMORY" size={88} />
    <RightPhone>
      <AddHistoryScreen chipTimes={[2.55, 3.15, 3.8]} tagsAt={CUES.reported - CUES.adds + 0.2} />
    </RightPhone>
  </Stage>
);

/* ---------- Line 8: Patient-reported until a provider reviews it ---------- */

export const ReportedScene: React.FC = () => (
  <Stage>
    <Enter delay={0.15} rise={40} style={{ position: 'absolute', left: 140, top: 190 }}>
      <ScreenCrop name="02-home" x={20} y={340} w={350} h={205} width={900} />
    </Enter>
    <Enter delay={0.55} rise={14} style={{ position: 'absolute', left: 150, top: 760 }}>
      <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.35 }}>
        Penicillin was reviewed by a provider.
        <br />
        <span style={{ color: COLORS.textSecondary, fontWeight: 600 }}>Shrimp is still his own report.</span>
      </div>
    </Enter>
    <div style={{ position: 'absolute', left: 1180, top: 230 }}>
      <AnimatedText
        text={'Until a provider\nreviews it.'}
        by="line"
        delay={0.35}
        stagger={0.16}
        rise={30}
        blur={0}
        style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.04em' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, marginTop: 60 }}>
        <Enter delay={0.9}>
          <ProvenanceTag kind="patient" size={2.5} />
        </Enter>
        <Enter delay={1.2} rise={10} style={{ color: COLORS.blue600, paddingLeft: 40 }}>
          <Icon name="arrowRight" size={56} strokeWidth={2.4} style={{ transform: 'rotate(90deg)' }} />
        </Enter>
        <Enter delay={1.5}>
          <ProvenanceTag kind="provider" size={2.5} />
        </Enter>
      </div>
    </div>
  </Stage>
);

/* ---------- Line 9: the papers he carries ---------- */

export const PapersScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = (d: number) => progress(frame, sec(d, fps), sec(0.7, fps), EASE.enter);
  const a = drop(0.1);
  const b = drop(0.3);
  const c = drop(0.5);
  return (
    <Stage>
      <Shapes shapes={[{ kind: 'circle', x: 1340, y: 560, size: 760, color: COLORS.blue100, delay: 0 }, { kind: 'ring', x: 1720, y: 230, size: 140, color: COLORS.blue300, delay: 0.5 }]} />
      <LeftStatement text={'The papers\nhe carries.'} kicker="NEXT" delay={0.25} />
      <div style={{ position: 'absolute', left: 1180, top: 250, opacity: a, transform: `translateY(${mix(a, 240, 0)}px) rotate(2deg)` }}>
        <DischargePaper scale={0.68} />
      </div>
      <div style={{ position: 'absolute', left: 1110, top: 280, opacity: b, transform: `translateY(${mix(b, 240, 0)}px) rotate(-1.5deg)` }}>
        <LabPaper scale={0.68} />
      </div>
      <div style={{ position: 'absolute', left: 1150, top: 310, opacity: c, transform: `translateY(${mix(c, 240, 0)}px)` }}>
        <PrescriptionPaper scale={0.68} />
      </div>
    </Stage>
  );
};
