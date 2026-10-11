import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon, ProvenanceTag, type IconName, type Provenance } from '../../../components';
import { COLORS, FONT_STACK } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { Center, Enter, LeftStatement, phoneShapes, Shapes, Stage } from '../../BitbitExplainer/shots/common';
import { RightPhone } from '../../BitbitExplainer/shots/Part1';
import { IconTile, Overline } from '../../BitbitExplainer/screens/ui';
import { Timer } from '../kit';
import { PatientHeader, PCard, ProviderSidebar, ProviderTablet } from '../provider';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const useLocal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps, p: (d: number, dur = 0.6, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e) };
};

/* ---------- Line 11: 30 minutes into 30 seconds (Part 2) ---------- */

export const RevealTimerScene: React.FC = () => {
  const { p } = useLocal();
  const out = p(2.2, 0.25, EASE.exit);
  const swap = p(2.45, 0.35, EASE.enter);
  return (
    <Stage tone="blue">
      <Shapes
        shapes={[
          { kind: 'ring', x: 330, y: 300, size: 180, color: COLORS.blue300, delay: 0.2 },
          { kind: 'circle', x: 1600, y: 820, size: 120, color: COLORS.cyan400, delay: 0.35 },
          { kind: 'square', x: 1620, y: 260, size: 120, color: COLORS.blue500, delay: 0.5, rotate: 12 },
        ]}
      />
      <Center style={{ flexDirection: 'column' }}>
        <div style={{ position: 'relative', height: 40, width: 800, textAlign: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, fontSize: 30, fontWeight: 700, letterSpacing: '0.14em', opacity: (1 - out) * 0.85 }}>FROM RETELLING</div>
          <div style={{ position: 'absolute', inset: 0, fontSize: 30, fontWeight: 700, letterSpacing: '0.14em', opacity: swap, color: COLORS.cyan400 }}>TO READY-TO-READ</div>
        </div>
        <Enter delay={0.1} rise={20} style={{ marginTop: 40 }}>
          <Timer segments={[{ at: 0.6, dur: 1.7, from: 1800, to: 30 }]} size={250} />
        </Enter>
      </Center>
    </Stage>
  );
};

/* ---------- Line 24a: over time, a history ---------- */

type Row = { date: string; title: string; detail: string; tag: Provenance; icon: IconName };
const TIMELINE: { year: string; rows: Row[] }[] = [
  {
    year: '2026',
    rows: [
      { date: 'SEP 25', title: 'Family history added', detail: 'Father: hypertension · Mother: type 2 diabetes', tag: 'patient', icon: 'user' },
      { date: 'SEP 18', title: 'Triage visit', detail: 'Rizal District Hospital · BP 136/86 · HR 76', tag: 'provider', icon: 'vitals' },
      { date: 'AUG 12', title: 'Amlodipine 5 mg', detail: 'Riverside Clinic · Dr. J. Santos', tag: 'document', icon: 'pill' },
      { date: 'MAY 4', title: 'CBC + lipid panel', detail: 'Lakeview Diagnostic Center', tag: 'document', icon: 'flask' },
      { date: 'FEB 21', title: 'Follow-up visit', detail: 'Rizal District Hospital · BP 142/92', tag: 'provider', icon: 'stethoscope' },
      { date: 'JAN 14', title: 'Discharge summary', detail: 'Rizal District Hospital · hypertension', tag: 'document', icon: 'clipboard' },
    ],
  },
  { year: '2022', rows: [{ date: 'MAR 2', title: 'Allergy: shrimp', detail: 'Lip swelling · added by you', tag: 'patient', icon: 'alert' }] },
  { year: '2019', rows: [{ date: 'JUN 9', title: 'Allergy: penicillin', detail: 'Hives, itching · Dr. A. Ramos', tag: 'provider', icon: 'alert' }] },
];

const HealthTimelineScreen: React.FC = () => {
  const { p } = useLocal();
  const scroll = p(0.6, 2.2, EASE.inOut);
  return (
    <>
      <div style={{ position: 'absolute', top: 56, left: 20, right: 20 }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em' }}>My health timeline</div>
        <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 2 }}>Ang kasaysayan mo · newest first</div>
      </div>
      <div style={{ position: 'absolute', top: 124, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0 20px', transform: `translateY(${mix(scroll, 0, -330)}px)` }}>
          {TIMELINE.map((y) => (
            <div key={y.year}>
              <Overline style={{ margin: '10px 0 8px' }}>{y.year}</Overline>
              {y.rows.map((r) => (
                <div key={r.title} style={{ display: 'flex', gap: 10, alignItems: 'center', background: COLORS.white, border: `1px solid ${COLORS.neutral150}`, borderRadius: 18, padding: 12, marginBottom: 8 }}>
                  <div style={{ width: 44, textAlign: 'center', fontSize: 11, fontWeight: 800, color: COLORS.textTertiary }}>{r.date}</div>
                  <IconTile icon={r.icon} tone={r.icon === 'alert' ? 'pink' : 'blue'} size={36} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.title}</div>
                    <div style={{ fontSize: 11.5, color: COLORS.textTertiary, marginTop: 2 }}>{r.detail}</div>
                    <ProvenanceTag kind={r.tag} size={0.85} style={{ marginTop: 5 }} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export const HistoryScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(1)} />
    <LeftStatement text={'Not just a profile.\nA history.'} kicker="OVER TIME" />
    <RightPhone>
      <HealthTimelineScreen />
    </RightPhone>
  </Stage>
);

/* ---------- Line 24b: providers review during care (visit notes, Sep 18) ---------- */

const ReviewRow: React.FC<{ title: string; detail: string; from: Provenance; reviewAt?: number }> = ({ title, detail, from, reviewAt }) => {
  const { p, t } = useLocal();
  const press = reviewAt === undefined ? 0 : interpolate(t, [reviewAt, reviewAt + 0.08, reviewAt + 0.2], [0, 1, 0], clamp);
  const done = reviewAt === undefined ? 0 : p(reviewAt + 0.15, 0.3, EASE.standard);
  const line = reviewAt === undefined ? 0 : p(reviewAt + 0.45, 0.8, EASE.linear);
  const source = 'Reviewed by Dr. A. Ramos · Rizal District Hospital · Sep 18, 2026';
  return (
    <PCard style={{ padding: 16, marginBottom: 12, border: done > 0.5 ? `1.5px solid ${COLORS.blue500}` : undefined }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 800 }}>{title}</div>
        <div style={{ position: 'relative' }}>
          <div style={{ opacity: 1 - done }}>
            <ProvenanceTag kind={from} />
          </div>
          <div style={{ position: 'absolute', right: 0, top: 0, opacity: done }}>
            <ProvenanceTag kind="provider" />
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13.5, color: COLORS.textTertiary, marginTop: 4 }}>{detail}</div>
      <div style={{ fontSize: 13, color: COLORS.blue700, fontWeight: 600, marginTop: 6, height: 18 }}>{source.slice(0, Math.round(source.length * line))}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <div
          style={{
            flex: 1,
            height: 42,
            borderRadius: 12,
            background: done > 0.5 || press > 0 ? COLORS.blue600 : COLORS.white,
            color: done > 0.5 || press > 0 ? COLORS.white : COLORS.ink,
            border: done > 0.5 || press > 0 ? 'none' : `1.5px solid ${COLORS.neutral450}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            fontSize: 15,
            fontWeight: 700,
            transform: `scale(${1 - 0.02 * press})`,
          }}
        >
          {done > 0.5 ? <Icon name="check" size={16} strokeWidth={3} /> : null}
          Reviewed
        </div>
        {['Correct', 'Leave'].map((b) => (
          <div key={b} style={{ flex: 1, height: 42, borderRadius: 12, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 600 }}>
            {b}
          </div>
        ))}
      </div>
    </PCard>
  );
};

const Field: React.FC<{ label: string; value: string; unit?: string }> = ({ label, value, unit }) => (
  <div style={{ flex: 1 }}>
    <div style={{ fontSize: 13, color: COLORS.textTertiary, marginBottom: 6 }}>{label}</div>
    <div style={{ height: 42, borderRadius: 12, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: 17, fontWeight: 700 }}>
      {value}
      {unit ? <span style={{ fontSize: 12, fontWeight: 500, color: COLORS.textTertiary }}>{unit}</span> : null}
    </div>
  </div>
);

const VisitNotesScreen: React.FC<{ reviewAt: number }> = ({ reviewAt }) => (
  <>
    <ProviderSidebar active="Notes" initials="AR" />
    <PatientHeader
      right={
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 15, fontWeight: 800 }}>Visit notes · Sep 18, 2026</div>
          <div style={{ fontSize: 13, color: COLORS.textTertiary }}>Triage · Rizal District Hospital</div>
        </div>
      }
    />
    <div style={{ position: 'absolute', left: 116, top: 124, width: 676 }}>
      <PCard>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 14 }}>Today&apos;s vitals</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Field label="Blood pressure" value="136/86" unit="mmHg" />
          <Field label="Heart rate" value="76" unit="bpm" />
          <Field label="Temperature" value="36.7" unit="°C" />
          <Field label="Weight" value="72" unit="kg" />
        </div>
      </PCard>
      <PCard style={{ marginTop: 14 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 10 }}>Reason for visit</div>
        <div style={{ height: 46, borderRadius: 12, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 17 }}>Hypertension follow-up</div>
        <div style={{ fontSize: 18, fontWeight: 800, margin: '18px 0 10px' }}>Assessment</div>
        <div style={{ height: 96, borderRadius: 12, border: `1.5px solid ${COLORS.neutral450}`, padding: '12px 14px', fontSize: 16, lineHeight: 1.45, color: COLORS.textSecondary, boxSizing: 'border-box' }}>
          Known hypertension since 2024. On Amlodipine 5 mg once daily. BP 136/86 today.
        </div>
      </PCard>
    </div>
    <div style={{ position: 'absolute', left: 812, right: 24, top: 124 }}>
      <PCard style={{ background: COLORS.bg, border: 'none', padding: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Review what Marco added</div>
        <div style={{ fontSize: 13, color: COLORS.textTertiary, margin: '4px 0 14px', lineHeight: 1.4 }}>Marking an entry reviewed makes it Provider-reviewed, under your name. Originals stay attached.</div>
        <ReviewRow title="Condition: hypertension" detail="Since 2024 · copied from discharge summary, Rizal District Hospital" from="document" reviewAt={reviewAt} />
        <ReviewRow title="Amlodipine 5 mg" detail="1 tablet once daily · copied from Riverside Clinic prescription" from="document" />
      </PCard>
    </div>
    <PCard style={{ position: 'absolute', left: 116, right: 24, bottom: 18, height: 72, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div>
        <div style={{ fontSize: 15, fontWeight: 800 }}>Signing as Dr. A. Ramos</div>
        <div style={{ fontSize: 12.5, color: COLORS.textTertiary }}>Rizal District Hospital · Marco sees every addition in his access log</div>
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ height: 46, padding: '0 22px', borderRadius: 14, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 700 }}>Save draft</div>
        <div style={{ height: 46, padding: '0 22px', borderRadius: 14, background: COLORS.blue600, color: COLORS.white, display: 'flex', alignItems: 'center', fontSize: 15, fontWeight: 700 }}>Add to Marco&apos;s record</div>
      </div>
    </PCard>
  </>
);

export const ProviderReviewScene: React.FC = () => (
  <Stage>
    <Enter delay={0.1} rise={12} style={{ position: 'absolute', left: 210, top: 44 }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600 }}>PROVIDERS REVIEW DURING CARE</div>
    </Enter>
    <Enter delay={0.05} rise={50} style={{ position: 'absolute', left: 210, top: 100 }}>
      <ProviderTablet width={1500}>
        <VisitNotesScreen reviewAt={1.1} />
      </ProviderTablet>
    </Enter>
  </Stage>
);

/* ---------- Line 25: three sources ---------- */

const SOURCES: { n: string; kind: Provenance; from: string; title: string; lines: string[]; icon: IconName; at: number }[] = [
  { n: '01', kind: 'patient', from: 'From Marco', title: 'Family history', lines: ['Father: hypertension', 'Added Sep 25, 2026'], icon: 'user', at: 0.35 },
  { n: '02', kind: 'document', from: 'From his papers', title: 'Amlodipine 5 mg', lines: ['Prescription · Riverside Clinic', 'Aug 12, 2026 · original attached'], icon: 'pill', at: 0.95 },
  { n: '03', kind: 'provider', from: 'From his provider', title: 'Hypertension', lines: ['Dr. A. Ramos · Rizal District Hospital', 'Reviewed Sep 18, 2026'], icon: 'stethoscope', at: 1.55 },
];

export const SourcesScene: React.FC = () => (
  <Stage>
    <Enter delay={0.1} rise={14} style={{ position: 'absolute', left: 140, top: 90 }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600 }}>THREE SOURCES</div>
    </Enter>
    {SOURCES.map((s, i) => (
      <Enter key={s.n} delay={s.at} rise={50} style={{ position: 'absolute', left: 140 + i * 560, top: 160 }}>
        <div style={{ width: 520, height: 560, borderRadius: 36, background: COLORS.white, border: `1.5px solid ${COLORS.neutral150}`, padding: 44, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.12em', color: COLORS.textTertiary }}>{s.n}</div>
            <IconTile icon={s.icon} tone="blue" size={72} />
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.textSecondary, marginTop: 30 }}>{s.from}</div>
          <div style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.035em', marginTop: 6 }}>{s.title}</div>
          <div style={{ marginTop: 22 }}>
            <ProvenanceTag kind={s.kind} size={1.9} />
          </div>
          <div style={{ marginTop: 26, fontSize: 26, lineHeight: 1.45, color: COLORS.textSecondary }}>
            {s.lines.map((l) => (
              <div key={l}>{l}</div>
            ))}
          </div>
        </div>
      </Enter>
    ))}
    <Enter delay={2.4} rise={16} style={{ position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center' }}>
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em' }}>
        You don&apos;t just see the information.
        <br />
        <span style={{ color: COLORS.blue600 }}>You see why you can trust it.</span>
      </div>
    </Enter>
  </Stage>
);

/* ---------- Chapter bar (Parts 3–5), drawn above the scenes ---------- */

export const ChapterBar: React.FC<{ show: [number, number]; changes: [number, number] }> = ({ show, changes }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const t = frame / fps;
  const s = width / 1920;
  const vis = Math.min(interpolate(t, [show[0], show[0] + 0.5], [0, 1], clamp), interpolate(t, [show[1] - 0.5, show[1]], [1, 0], clamp));
  if (vis <= 0) return null;
  const active = (i: number) => {
    const on = i === 0 ? 1 : interpolate(t, [changes[i - 1], changes[i - 1] + 0.3], [0, 1], clamp);
    const off = i < 2 ? interpolate(t, [changes[i], changes[i] + 0.3], [0, 1], clamp) : 0;
    return Math.max(0, on - off);
  };
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22 * s, display: 'flex', justifyContent: 'center', opacity: vis, pointerEvents: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 * s, padding: `${8 * s}px ${22 * s}px`, borderRadius: 999, background: COLORS.white, border: `${1.5 * s}px solid ${COLORS.neutral150}`, fontSize: 22 * s, fontWeight: 700, fontFamily: FONT_STACK }}>
        {['Collect', 'Prepare', 'Share'].map((w, i) => (
          <span key={w} style={{ display: 'flex', alignItems: 'center', gap: 14 * s }}>
            {i > 0 ? <span style={{ color: COLORS.neutral300 }}>·</span> : null}
            <span style={{ color: active(i) > 0.5 ? COLORS.blue600 : COLORS.neutral450 }}>{w}</span>
          </span>
        ))}
      </div>
    </div>
  );
};
