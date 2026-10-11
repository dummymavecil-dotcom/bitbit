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
import { L } from '../layout';
import { AddHistoryScreen } from '../screens/AddHistoryScreen';
import { CUES } from '../timing';
import { Panel } from '../world';
import { Center, Enter, Statement, useT } from './common';

const useSeconds = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/* ---------- Line 1: title card ---------- */

export const TitleShot: React.FC = () => {
  const t = useSeconds();
  const radius = interpolate(t, [CUES.timer - 0.15, CUES.timer + 0.5], [0, 36], clamp);
  return (
    <Panel {...L.title} color={COLORS.blue600} radius={radius} start={0}>
      <CutFrame width={1920} height={1080} delay={0.15} duration={1.6} />
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
      </Center>
    </Panel>
  );
};

/* ---------- Line 2: 30 minutes → 30 seconds ---------- */

const TimerContent: React.FC = () => {
  const p = useT(0.8, 1.9, EASE.inOut);
  const secs = Math.round(mix(p, 30 * 60, 30));
  const mm = String(Math.floor(secs / 60)).padStart(2, '0');
  const ss = String(secs % 60).padStart(2, '0');
  return (
    <>
      <Statement text="Intake" overline="AT THE TRIAGE DESK" size={64} delay={0.3} />
      <Center style={{ flexDirection: 'column', top: 90 }}>
        <Enter delay={0.45} rise={20}>
          <svg width={150} height={150} viewBox="0 0 150 150">
            <circle cx={75} cy={75} r={64} fill="none" stroke={COLORS.white} strokeWidth={8} />
            <line x1={75} y1={75} x2={75} y2={30} stroke={COLORS.white} strokeWidth={8} strokeLinecap="round" transform={`rotate(${mix(p, 0, -720)} 75 75)`} />
            <circle cx={75} cy={75} r={8} fill={COLORS.white} />
          </svg>
        </Enter>
        <Enter delay={0.55} rise={20}>
          <div style={{ fontSize: 230, fontWeight: 800, color: COLORS.white, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', lineHeight: 1.05, marginTop: 20 }}>
            {mm}:{ss}
          </div>
        </Enter>
        <Enter delay={2.75} rise={16}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 46, fontWeight: 700, color: COLORS.white, marginTop: 10 }}>
            30 minutes <Icon name="arrowRight" size={44} strokeWidth={2.6} /> 30 seconds
          </div>
        </Enter>
      </Center>
    </>
  );
};

export const TimerShot: React.FC = () => (
  <Panel {...L.timer} color={COLORS.blue600} start={CUES.timer - 0.2}>
    <TimerContent />
  </Panel>
);

/* ---------- Line 3: scattered papers → one phone ---------- */

const SCATTER = [
  { title: 'RESETA', x: 120, y: 110, r: -8 },
  { title: 'LAB RESULT', x: 420, y: 70, r: 6 },
  { title: 'DISCHARGE', x: 150, y: 520, r: 5 },
  { title: 'REFERRAL', x: 470, y: 480, r: -5 },
];

const GlanceContent: React.FC = () => {
  const gather = useT(1.0, 1.0, EASE.inOut);
  const phone = useT(1.35, 0.8);
  const target = { x: 1060, y: 500 };
  const pw = 560 * 0.42;
  const ph = 760 * 0.42;
  return (
    <>
      {SCATTER.map((p, i) => {
        const g = Math.min(1, Math.max(0, gather * 1.15 - i * 0.05));
        const x = mix(g, p.x, target.x - pw / 2);
        const y = mix(g, p.y, target.y - ph / 2);
        return (
          <Enter key={p.title} delay={0.1 + i * 0.12} rise={30} style={{ position: 'absolute', left: x, top: y, opacity: 1 - interpolate(g, [0.55, 1], [0, 1], clamp) }}>
            <div style={{ transform: `scale(${mix(g, 1, 0.5)}) rotate(${mix(g, p.r, 0)}deg)` }}>
              <MiniPaper title={p.title} scale={0.42} />
            </div>
          </Enter>
        );
      })}
      <div style={{ position: 'absolute', left: target.x - 214, top: 69, opacity: phone, transform: `translateY(${mix(phone, 60, 0)}px)` }}>
        <PhoneFrame scale={1.0}>
          <ScreenImage name="02-home" />
        </PhoneFrame>
      </div>
      <Statement text={'Ready to read\nat a glance.'} color={COLORS.ink} size={76} delay={2.3} style={{ top: 360, left: 90, right: 'auto' }} />
    </>
  );
};

export const GlanceShot: React.FC = () => (
  <Panel {...L.glance} start={CUES.glance}>
    <GlanceContent />
  </Panel>
);

/* ---------- Lines 4–5: collect · prepare · share, and Marco ---------- */

const PILLARS: { n: string; title: string; sub: string; icon: IconName; at: number }[] = [
  { n: '01', title: 'Collect', sub: 'Bring his history into one record.', icon: 'scan', at: 1.25 },
  { n: '02', title: 'Prepare', sub: 'Get ready for a visit.', icon: 'clipboard', at: 1.75 },
  { n: '03', title: 'Share', sub: 'Choose who sees what, and for how long.', icon: 'contactless', at: 2.25 },
];

const PillarContent: React.FC<{ p: (typeof PILLARS)[number] }> = ({ p }) => (
  <div style={{ position: 'absolute', inset: 0, padding: 56, color: COLORS.white }}>
    <Enter delay={p.at} rise={22}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.85 }}>{p.n}</div>
        <Icon name={p.icon} size={84} strokeWidth={2} />
      </div>
      <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 110, lineHeight: 1 }}>{p.title}</div>
      <div style={{ fontSize: 32, fontWeight: 600, marginTop: 18, lineHeight: 1.25, opacity: 0.92 }}>{p.sub}</div>
    </Enter>
  </div>
);

export const PillarsShot: React.FC = () => {
  const t = useSeconds();
  const dimOthers = interpolate(t, [CUES.collect, CUES.collect + 0.6], [1, 0.35], clamp);
  return (
    <>
      {PILLARS.map((p, i) => (
        <Panel key={p.title} {...L.pillars[i]} color={COLORS.blue600} start={CUES.pillars} dim={i === 0 ? 1 : dimOthers}>
          <PillarContent p={p} />
        </Panel>
      ))}
      <Panel {...L.marcoCard} start={CUES.pillars}>
        <Enter delay={2.7} x={-60} rise={0} style={{ position: 'absolute', left: 60, top: 36 }}>
          <ScreenCrop name="02-home" x={20} y={116} w={350} h={208} width={520} />
        </Enter>
        <div style={{ position: 'absolute', left: 660, top: 92 }}>
          <Enter delay={3.0} rise={16}>
            <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.035em' }}>Here&apos;s how it works for Marco.</div>
          </Enter>
          <Enter delay={3.25} rise={12}>
            <div style={{ fontSize: 32, color: COLORS.textSecondary, marginTop: 14 }}>32 · BPO agent on night shift · Antipolo City, Rizal</div>
          </Enter>
        </div>
      </Panel>
    </>
  );
};

/* ---------- Line 6: one record ---------- */

export const RecordShot: React.FC = () => (
  <>
    <Panel {...L.recordText} color={COLORS.blue600} start={CUES.record}>
      <Statement text={'One record,\nheld by\nMarco.'} overline="COLLECT" />
    </Panel>
    <Panel {...L.recordPhone} start={CUES.record}>
      <Enter delay={0.15} rise={50} style={{ position: 'absolute', left: 450 - 214, top: 69 }}>
        <PhoneFrame>
          <ScreenImage name="03-records-timeline" />
          {/* The screenshot uses short tag names; cover them with the full ones. */}
          <ProvenanceTag kind="provider" style={{ position: 'absolute', right: 49, top: 490 }} />
          <ProvenanceTag kind="patient" style={{ position: 'absolute', right: 49, top: 551 }} />
          <div style={{ position: 'absolute', left: 98, top: 747, width: 140, height: 13, background: COLORS.white }} />
        </PhoneFrame>
      </Enter>
    </Panel>
  </>
);

/* ---------- Lines 7–8: what he knows, he adds himself ---------- */

export const AddShot: React.FC = () => (
  <>
    <Panel {...L.addText} color={COLORS.blue600} start={CUES.adds}>
      <Statement text={'What he\nknows, he\nadds himself.'} overline="FROM MEMORY" size={76} />
    </Panel>
    <Panel {...L.addPhone} start={CUES.adds}>
      <Enter delay={0.15} rise={50} style={{ position: 'absolute', left: 450 - 214, top: 69 }}>
        <PhoneFrame>
          <AddHistoryScreen chipTimes={[2.55, 3.15, 3.8]} tagsAt={CUES.reported - CUES.adds + 0.2} />
        </PhoneFrame>
      </Enter>
    </Panel>
  </>
);

export const ReportedShot: React.FC = () => {
  const a = CUES.reported + 1.5;
  return (
    <>
      <Panel {...L.allergy} start={a}>
        <Enter delay={0.2} rise={30} style={{ position: 'absolute', left: 100, top: 150 }}>
          <ScreenCrop name="02-home" x={20} y={340} w={350} h={205} width={900} />
        </Enter>
        <Enter delay={0.6} rise={14} style={{ position: 'absolute', left: 110, top: 720, right: 100 }}>
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.3 }}>
            Penicillin was reviewed by a provider.
            <br />
            <span style={{ color: COLORS.textSecondary, fontWeight: 600 }}>Shrimp is still his own report.</span>
          </div>
        </Enter>
      </Panel>
      <Panel {...L.reportedText} color={COLORS.blue600} start={a}>
        <Statement text={'Until a\nprovider\nreviews it.'} size={76} delay={0.4} />
        <div style={{ position: 'absolute', left: 64, top: 470, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 26 }}>
          <Enter delay={0.9}>
            <ProvenanceTag kind="patient" size={2.5} />
          </Enter>
          <Enter delay={1.2} rise={10} style={{ color: COLORS.white, paddingLeft: 40 }}>
            <Icon name="arrowRight" size={56} strokeWidth={2.4} style={{ transform: 'rotate(90deg)' }} />
          </Enter>
          <Enter delay={1.5}>
            <ProvenanceTag kind="provider" size={2.5} />
          </Enter>
        </div>
      </Panel>
    </>
  );
};

/* ---------- Line 9: the papers he carries ---------- */

const PapersContent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const drop = (d: number) => progress(frame, sec(d, fps), sec(0.7, fps), EASE.enter);
  const a = drop(0.1);
  const b = drop(0.3);
  const c = drop(0.5);
  return (
    <>
      <Statement text={'The papers\nhe carries.'} color={COLORS.ink} size={72} delay={0.25} />
      <div style={{ position: 'absolute', left: 560, top: 380, opacity: a, transform: `translateY(${mix(a, 200, 0)}px) rotate(7deg)` }}>
        <DischargePaper scale={0.6} />
      </div>
      <div style={{ position: 'absolute', left: 500, top: 410, opacity: b, transform: `translateY(${mix(b, 200, 0)}px) rotate(-5deg)` }}>
        <LabPaper scale={0.6} />
      </div>
      <div style={{ position: 'absolute', left: 530, top: 440, opacity: c, transform: `translateY(${mix(c, 200, 0)}px) rotate(1.5deg)` }}>
        <PrescriptionPaper scale={0.6} />
      </div>
    </>
  );
};

export const PapersShot: React.FC = () => (
  <Panel {...L.papers} start={CUES.papers}>
    <PapersContent />
  </Panel>
);
