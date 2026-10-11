import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import {
  CutFrame,
  DischargePaper,
  Icon,
  LabPaper,
  Logo,
  PhoneFrame,
  PrescriptionPaper,
  ProvenanceTag,
  RX_FIELDS,
  type IconName,
  type Provenance,
} from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { L } from '../layout';
import { ScanScreen, VIEWFINDER } from '../screens/ScanScreen';
import { SourceScreen } from '../screens/SourceScreen';
import { IconTile } from '../screens/ui';
import { CUES } from '../timing';
import { Panel } from '../world';
import { Center, Enter, Statement } from './common';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const useLocal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps, p: (d: number, dur = 0.5, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e) };
};

/** Paper sized to sit in the scan viewfinder. */
const RX_IN_FINDER = 0.44;
const finderLeft = VIEWFINDER.x + (VIEWFINDER.w - 560 * RX_IN_FINDER) / 2;
const finderTop = VIEWFINDER.y + (VIEWFINDER.h - 760 * RX_IN_FINDER) / 2;

/* ---------- Line 10: scan instead of retyping ---------- */

const ScanContent: React.FC = () => {
  const { p, t } = useLocal();
  const paper = p(0.35, 0.8);
  const corners = p(1.4, 0.4, EASE.standard);
  const shutter = interpolate(t, [2.2, 2.32, 2.5], [0, 1, 0], clamp);
  const sweep = p(2.45, 0.9, EASE.inOut);
  return (
    <ScanScreen chip={0} corners={corners} shutter={shutter}>
      <div style={{ position: 'absolute', left: finderLeft, top: finderTop, opacity: paper, transform: `translateY(${mix(paper, 320, 0)}px) rotate(${mix(paper, -8, -1.5)}deg)` }}>
        <PrescriptionPaper scale={RX_IN_FINDER} />
      </div>
      {sweep > 0 && sweep < 1 ? (
        <div style={{ position: 'absolute', left: VIEWFINDER.x + 6, width: VIEWFINDER.w - 12, top: VIEWFINDER.y + sweep * VIEWFINDER.h, height: 3, borderRadius: 2, background: COLORS.cyan400 }} />
      ) : null}
    </ScanScreen>
  );
};

export const ScanShot: React.FC = () => (
  <>
    <Panel {...L.scanText} color={COLORS.blue600} start={CUES.scan}>
      <Statement text={'Scan it.\nNo retyping.'} overline="PAPERS" />
    </Panel>
    <Panel {...L.scanPhone} start={CUES.scan}>
      <Enter delay={0.1} rise={50} style={{ position: 'absolute', left: 450 - 214, top: 69 }}>
        <PhoneFrame screenBg={COLORS.ink}>
          <ScanContent />
        </PhoneFrame>
      </Enter>
    </Panel>
  </>
);

/* ---------- Line 11: AI copies what's written; Marco checks each field ---------- */

const FIELDS: { label: string; value: string; box: keyof typeof RX_FIELDS }[] = [
  { label: 'Medicine', value: 'Amlodipine 5 mg tablet', box: 'medicine' },
  { label: 'How to take', value: '1 tablet, once daily', box: 'howToTake' },
  { label: 'Reason written', value: 'For hypertension', box: 'reason' },
  { label: 'Prescriber', value: 'Dr. J. Santos, MD', box: 'prescriber' },
  { label: 'Clinic', value: 'Riverside Clinic', box: 'clinic' },
  { label: 'Date', value: 'Aug 12, 2026', box: 'date' },
];
const fillAt = (i: number) => 0.55 + i * 0.4;
const checkAt = (i: number) => 3.0 + i * 0.22;
const PAPER_SCALE = 1.12;

const CheckPaperContent: React.FC = () => {
  const { p } = useLocal();
  return (
    <Center>
      <Enter delay={0.05} rise={30}>
        <PrescriptionPaper scale={PAPER_SCALE} rotate={0}>
          {FIELDS.map((f, i) => {
            const b = RX_FIELDS[f.box];
            const on = p(fillAt(i) - 0.15, 0.25, EASE.standard);
            const done = p(checkAt(i), 0.25, EASE.standard);
            return (
              <div
                key={f.box}
                style={{
                  position: 'absolute',
                  left: b.x - 8,
                  top: b.y - 4,
                  width: b.w + 16,
                  height: b.h + 8,
                  borderRadius: 8,
                  border: `2.5px solid ${COLORS.cyan600}`,
                  background: 'rgba(1, 223, 220, 0.16)',
                  opacity: on * mix(done, 1, 0.45),
                }}
              />
            );
          })}
        </PrescriptionPaper>
      </Enter>
    </Center>
  );
};

const CheckFormContent: React.FC = () => {
  const { p, t } = useLocal();
  const pressed = interpolate(t, [4.75, 4.85, 5.05], [0, 1, 0], clamp);
  const saved = p(5.1, 0.4);
  return (
    <div style={{ position: 'absolute', inset: 0, padding: '56px 64px' }}>
      <Enter delay={0.1} rise={14}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.textTertiary }}>COPIED FROM YOUR PRESCRIPTION</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
          <div style={{ fontSize: 54, fontWeight: 800, letterSpacing: '-0.035em' }}>Check what Bitbit copied.</div>
        </div>
      </Enter>
      <div style={{ marginTop: 26 }}>
        {FIELDS.map((f, i) => {
          const typed = p(fillAt(i), 0.4, EASE.linear);
          const row = p(fillAt(i) - 0.1, 0.35);
          const check = p(checkAt(i), 0.25, EASE.standard);
          return (
            <div key={f.label} style={{ display: 'flex', alignItems: 'center', height: 90, borderBottom: `1.5px solid ${COLORS.neutral150}`, opacity: mix(row, 0.35, 1) }}>
              <div style={{ width: 250, fontSize: 25, color: COLORS.textTertiary }}>{f.label}</div>
              <div style={{ flex: 1, fontSize: 34, fontWeight: 700, letterSpacing: '-0.01em' }}>{f.value.slice(0, Math.round(f.value.length * typed))}</div>
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  boxSizing: 'border-box',
                  border: check > 0.5 ? 'none' : `2px solid ${COLORS.neutral450}`,
                  background: check > 0.5 ? COLORS.blue600 : COLORS.white,
                  color: COLORS.white,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {check > 0.5 ? <Icon name="check" size={30} strokeWidth={3} /> : null}
              </div>
            </div>
          );
        })}
      </div>
      <Enter delay={2.7} rise={10} style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 26, fontSize: 26, color: COLORS.textSecondary }}>
        <Icon name="sparkle" size={30} color={COLORS.cyan600} />
        It copies only what is written. It doesn’t diagnose or fill gaps.
      </Enter>
      <div style={{ position: 'absolute', left: 64, right: 64, bottom: 52, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            flex: 1,
            height: 84,
            borderRadius: 24,
            background: pressed > 0 ? COLORS.blue700 : COLORS.blue600,
            color: COLORS.white,
            fontSize: 30,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: `scale(${1 - 0.02 * pressed})`,
            opacity: p(4.3, 0.4),
          }}
        >
          Save to my record
        </div>
        <div style={{ opacity: saved, transform: `translateY(${mix(saved, 10, 0)}px)` }}>
          <ProvenanceTag kind="document" size={2} />
        </div>
      </div>
    </div>
  );
};

export const CheckShot: React.FC = () => (
  <>
    <Panel {...L.checkPaper} start={CUES.check}>
      <CheckPaperContent />
    </Panel>
    <Panel {...L.checkForm} color={COLORS.white} start={CUES.check}>
      <CheckFormContent />
    </Panel>
  </>
);

/* ---------- Line 12: the original stays attached ---------- */

export const SourceShot: React.FC = () => (
  <>
    <Panel {...L.sourceText} color={COLORS.blue600} start={CUES.source}>
      <Statement text={'Every fact\nkeeps its\nsource.'} overline="ORIGINAL ATTACHED" />
    </Panel>
    <Panel {...L.sourcePhone} start={CUES.source}>
      <Enter delay={0.1} rise={50} style={{ position: 'absolute', left: 450 - 214, top: 69 }}>
        <PhoneFrame>
          <SourceScreen originalAt={0.8} scaleAt={1.9} />
        </PhoneFrame>
      </Enter>
    </Panel>
  </>
);

/* ---------- Line 13: prescriptions, lab results, discharge summaries ---------- */

type Pass = { enter: number; exit: number; paper: 'rx' | 'lab' | 'dc'; row: { icon: IconName; title: string; detail: string } };
const PASSES: Pass[] = [
  { enter: 0.2, exit: 1.35, paper: 'rx', row: { icon: 'pill', title: 'Amlodipine 5 mg · once daily', detail: 'Riverside Clinic · Aug 12, 2026' } },
  { enter: 1.55, exit: 2.5, paper: 'lab', row: { icon: 'flask', title: 'CBC + lipid panel', detail: 'Riverside Clinic laboratory · May 04, 2026' } },
  { enter: 2.7, exit: 3.45, paper: 'dc', row: { icon: 'clipboard', title: 'Discharge summary · hypertension', detail: 'Rizal District Hospital · Mar 05, 2024' } },
];

const BatchPhone: React.FC = () => {
  const { t, p } = useLocal();
  const chip = interpolate(t, [1.45, 1.6, 2.6, 2.75], [0, 1, 1, 2], clamp);
  let corners = 0;
  let shutter = 0;
  PASSES.forEach((ps) => {
    corners = Math.max(corners, interpolate(t, [ps.enter + 0.35, ps.enter + 0.5, ps.exit - 0.05, ps.exit + 0.05], [0, 1, 1, 0], clamp));
    shutter = Math.max(shutter, interpolate(t, [ps.exit - 0.25, ps.exit - 0.15, ps.exit], [0, 1, 0], clamp));
  });
  return (
    <ScanScreen chip={chip} corners={corners} shutter={shutter}>
      {PASSES.map((ps) => {
        const inn = p(ps.enter, 0.4);
        const out = p(ps.exit, 0.35, EASE.exit);
        const Paper = ps.paper === 'rx' ? PrescriptionPaper : ps.paper === 'lab' ? LabPaper : DischargePaper;
        return (
          <div
            key={ps.paper}
            style={{
              position: 'absolute',
              left: finderLeft,
              top: finderTop,
              opacity: inn * (1 - out),
              transform: `translate(${mix(out, 0, 160)}px, ${mix(inn, 320, 0) - out * 300}px) rotate(-1.5deg)`,
            }}
          >
            <Paper scale={RX_IN_FINDER} />
          </div>
        );
      })}
    </ScanScreen>
  );
};

const BatchList: React.FC = () => {
  const { p } = useLocal();
  return (
    <Enter delay={0.1} rise={20} style={{ position: 'absolute', left: 640, top: 130, width: 790 }}>
      <div style={{ background: COLORS.white, borderRadius: 32, border: `1.5px solid ${COLORS.neutral150}`, padding: '40px 40px 24px' }}>
        <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.03em' }}>Added to your record</div>
        <div style={{ fontSize: 24, color: COLORS.textTertiary, marginTop: 4 }}>Mga bagong record</div>
        <div style={{ marginTop: 18 }}>
          {PASSES.map((ps) => {
            const land = p(ps.exit + 0.15, 0.45);
            return (
              <div
                key={ps.paper}
                style={{
                  display: 'flex',
                  gap: 22,
                  alignItems: 'center',
                  padding: '22px 0',
                  borderTop: `1.5px solid ${COLORS.neutral150}`,
                  opacity: land,
                  transform: `translateX(${mix(land, -50, 0)}px)`,
                }}
              >
                <IconTile icon={ps.row.icon} tone="blue" size={70} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 31, fontWeight: 700, letterSpacing: '-0.01em' }}>{ps.row.title}</div>
                  <div style={{ fontSize: 23, color: COLORS.textTertiary, marginTop: 4 }}>{ps.row.detail}</div>
                  <ProvenanceTag kind="document" size={1.5} style={{ marginTop: 12 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Enter>
  );
};

export const BatchShot: React.FC = () => (
  <Panel {...L.batch} start={CUES.batch}>
    <Enter delay={0.05} rise={50} style={{ position: 'absolute', left: 130, top: 78 }}>
      <PhoneFrame scale={0.98} screenBg={COLORS.ink}>
        <BatchPhone />
      </PhoneFrame>
    </Enter>
    <BatchList />
  </Panel>
);

/* ---------- Line 14: each record connects to its visit ---------- */

const VISITS: { date: string; place: string; kind: string; record: { icon: IconName; title: string; tag: Provenance } }[] = [
  { date: 'SEP 18, 2026', place: 'Rizal District Hospital', kind: 'Triage · Nurse J. Mendoza', record: { icon: 'vitals', title: 'BP 136/86 · HR 76', tag: 'provider' } },
  { date: 'AUG 12, 2026', place: 'Riverside Clinic', kind: 'Consultation · Dr. J. Santos', record: { icon: 'pill', title: 'Amlodipine 5 mg', tag: 'document' } },
  { date: 'MAY 04, 2026', place: 'Riverside Clinic laboratory', kind: 'Lab test · requested by Dr. J. Santos', record: { icon: 'flask', title: 'CBC + lipid panel', tag: 'document' } },
  { date: 'MAR 03–05, 2024', place: 'Rizal District Hospital', kind: 'Admission · Dr. A. Ramos', record: { icon: 'clipboard', title: 'Discharge summary', tag: 'document' } },
];

const VisitsContent: React.FC = () => {
  const { p } = useLocal();
  const top = 220;
  const rowH = 186;
  const lineX0 = 690;
  const lineX1 = 1010;
  return (
    <>
      <Statement text="Each record, linked to its visit." color={COLORS.ink} size={58} delay={0.1} style={{ top: 64, left: 80 }} />
      <div style={{ position: 'absolute', left: 119, top: top + 30, width: 3, height: rowH * 3, background: COLORS.neutral300, borderRadius: 2, opacity: p(0.15) }} />
      {VISITS.map((v, i) => {
        const y = top + i * rowH;
        const appear = p(0.25 + i * 0.1);
        const recordIn = p(0.4 + i * 0.1);
        const link = p(1.0 + i * 0.45, 0.45, EASE.inOut);
        const linked = link > 0.98;
        return (
          <div key={v.date}>
            <div style={{ position: 'absolute', left: 104, top: y + 16, width: 33, height: 33, borderRadius: 17, background: COLORS.blue600, border: `5px solid ${COLORS.white}`, boxSizing: 'border-box', opacity: appear }} />
            <div style={{ position: 'absolute', left: 170, top: y, opacity: appear, transform: `translateY(${mix(appear, 14, 0)}px)` }}>
              <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.1em', color: COLORS.textTertiary }}>{v.date}</div>
              <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.02em', marginTop: 4 }}>{v.place}</div>
              <div style={{ fontSize: 24, color: COLORS.textSecondary, marginTop: 4 }}>{v.kind}</div>
            </div>
            <div style={{ position: 'absolute', left: lineX0, top: y + 50, width: mix(link, 0, lineX1 - lineX0), height: 4, borderRadius: 2, background: COLORS.blue500 }} />
            <div style={{ position: 'absolute', left: lineX0 - 8, top: y + 44, width: 16, height: 16, borderRadius: 8, background: COLORS.blue500, opacity: link > 0 ? 1 : 0 }} />
            <div
              style={{
                position: 'absolute',
                left: lineX1,
                top: y - 4,
                width: 600,
                height: 116,
                boxSizing: 'border-box',
                borderRadius: 24,
                background: COLORS.bg,
                border: `2px solid ${linked ? COLORS.blue500 : COLORS.neutral150}`,
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: '0 24px',
                opacity: recordIn,
                transform: `translateX(${mix(recordIn, 30, 0)}px)`,
              }}
            >
              <IconTile icon={v.record.icon} tone="blue" size={60} />
              <div>
                <div style={{ fontSize: 30, fontWeight: 700 }}>{v.record.title}</div>
                <ProvenanceTag kind={v.record.tag} size={1.35} style={{ marginTop: 8 }} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export const VisitsShot: React.FC = () => (
  <Panel {...L.visits} color={COLORS.white} start={CUES.visits}>
    <VisitsContent />
  </Panel>
);

/* ---------- Line 15: who, what, where, when ---------- */

const WWWW = [
  { word: 'Who.', label: 'PRESCRIBER', value: 'Dr. J. Santos', at: 0.2 },
  { word: 'What.', label: 'MEDICINE', value: 'Amlodipine 5 mg, 1 tablet once daily', at: 0.85 },
  { word: 'Where.', label: 'CLINIC', value: 'Riverside Clinic', at: 1.5 },
  { word: 'When.', label: 'DATE', value: 'Aug 12, 2026', at: 2.15 },
];

export const WwwwShot: React.FC = () => (
  <>
    {WWWW.map((w, i) => (
      <Panel key={w.word} {...L.wwww[i]} color={COLORS.blue600} start={CUES.wwww}>
        <div style={{ position: 'absolute', inset: 0, padding: '84px 44px', color: COLORS.white }}>
          <Enter delay={w.at} rise={26}>
            <div style={{ fontSize: 100, fontWeight: 800, letterSpacing: '-0.045em', lineHeight: 1 }}>{w.word}</div>
          </Enter>
          <Enter delay={w.at + 0.2} rise={14} style={{ marginTop: 380 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', opacity: 0.85 }}>{w.label}</div>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 10, lineHeight: 1.2, letterSpacing: '-0.015em' }}>{w.value}</div>
          </Enter>
        </div>
      </Panel>
    ))}
  </>
);

/* ---------- End card ---------- */

export const EndShot: React.FC = () => {
  const { t } = useLocal();
  const radius = interpolate(t, [CUES.end + 0.4, CUES.end + 1.4], [36, 0], clamp);
  return (
    <Panel {...L.end} color={COLORS.blue600} radius={radius} start={CUES.end + 0.6}>
      <CutFrame width={1920} height={1080} delay={0.2} duration={1.2} />
      <Center style={{ flexDirection: 'column' }}>
        <Enter delay={0.4} duration={0.8} rise={24}>
          <Logo white width={640} />
        </Enter>
        <Enter delay={0.8} rise={18}>
          <div style={{ fontSize: 54, fontWeight: 700, color: COLORS.white, marginTop: 48, letterSpacing: '-0.02em' }}>Your health history, in your hands.</div>
        </Enter>
        <Enter delay={1.1} rise={12}>
          <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.white, opacity: 0.85, marginTop: 26, letterSpacing: '0.14em' }}>COLLECT · PREPARE · SHARE</div>
        </Enter>
      </Center>
    </Panel>
  );
};
