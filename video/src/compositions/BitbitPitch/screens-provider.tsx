import type { ReactNode } from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon, ProvenanceTag, PulseRings, type IconName, type Provenance } from '../../components';
import { COLORS } from '../../theme';
import { EASE, mix, progress, sec } from '../../utils';
import { Avatar, PCard, ProviderSidebar } from './provider';

/** Provider triage desk (P2/P3) and patient summary (P4), rebuilt at 1280 × 740 app pixels. */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const useP = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { t: frame / fps, p: (d: number, dur = 0.4, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e) };
};

const StaffPill: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: COLORS.white, border: `1px solid ${COLORS.neutral150}`, borderRadius: 999, padding: '6px 16px 6px 6px' }}>
    <Avatar initials="JM" size={34} />
    <div>
      <div style={{ fontSize: 14, fontWeight: 800 }}>Nurse J. Mendoza</div>
      <div style={{ fontSize: 11.5, color: COLORS.textTertiary }}>Triage · Desk 2 · every read is logged</div>
    </div>
  </div>
);

type QRow = { name: string; sub: string; time: string; allergy: string; status: 'Waiting' | 'Done' | 'Being triaged'; ends: string };
const QUEUE: QRow[] = [
  { name: 'Roberto Santos', sub: '67 · M', time: '8:44 AM', allergy: 'None recorded', status: 'Waiting', ends: 'This visit' },
  { name: 'Ana Villanueva', sub: '29 · F', time: '8:37 AM', allergy: '1 allergy', status: 'Waiting', ends: 'Tomorrow 8:37 AM' },
  { name: 'Jun Reyes', sub: '8 · M', time: '8:30 AM', allergy: 'Not shared', status: 'Waiting', ends: 'This visit' },
  { name: 'Lorna Bautista', sub: '55 · F', time: '8:12 AM', allergy: '3 allergies', status: 'Done', ends: 'Today 12:12 PM' },
  { name: 'Pedro Garcia', sub: '71 · M', time: '7:58 AM', allergy: 'None recorded', status: 'Done', ends: 'Ended' },
];
const MARCO: QRow = { name: 'Marco Dela Cruz', sub: '32 · M · Chest discomfort', time: '8:51 AM', allergy: '2 allergies', status: 'Being triaged', ends: 'Today 6:00 PM' };

const COLS = [250, 110, 160, 150, 160];

const QueueRow: React.FC<{ r: QRow; highlight?: boolean }> = ({ r, highlight }) => (
  <div style={{ display: 'flex', alignItems: 'center', height: 58, padding: '0 18px', background: COLORS.white, borderRadius: 14, border: `1.5px solid ${highlight ? COLORS.blue500 : COLORS.neutral150}`, marginBottom: 8, fontSize: 14 }}>
    <div style={{ width: COLS[0] }}>
      <div style={{ fontWeight: 800 }}>{r.name}</div>
      <div style={{ fontSize: 12, color: COLORS.textTertiary }}>{r.sub}</div>
    </div>
    <div style={{ width: COLS[1] }}>{r.time}</div>
    <div style={{ width: COLS[2] }}>
      {r.allergy.includes('allerg') ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 999, background: COLORS.pink100, color: COLORS.pink700, fontWeight: 700, fontSize: 12.5 }}>
          <Icon name="alert" size={13} /> {r.allergy}
        </span>
      ) : r.allergy === 'Not shared' ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: COLORS.textTertiary, fontSize: 12.5 }}>
          <Icon name="lock" size={13} /> Not shared
        </span>
      ) : (
        <span style={{ color: COLORS.textTertiary, fontSize: 12.5 }}>{r.allergy}</span>
      )}
    </div>
    <div style={{ width: COLS[3] }}>
      <span
        style={{
          padding: '4px 12px',
          borderRadius: 999,
          fontSize: 12.5,
          fontWeight: 700,
          background: r.status === 'Being triaged' ? COLORS.blue600 : r.status === 'Done' ? COLORS.neutral100 : COLORS.white,
          color: r.status === 'Being triaged' ? COLORS.white : r.status === 'Done' ? COLORS.textSecondary : COLORS.ink,
          border: r.status === 'Waiting' ? `1.5px solid ${COLORS.ink}` : 'none',
        }}
      >
        {r.status}
      </span>
    </div>
    <div style={{ width: COLS[4], fontSize: 13, color: COLORS.textSecondary }}>{r.ends}</div>
  </div>
);

/**
 * Triage desk. `tapAt`: the patient taps (disc turns into a check). `arriveAt`: Marco's row and the
 * "Received" toast appear. Leave either undefined to keep that state off.
 */
export const TriageDeskScreen: React.FC<{ tapAt?: number; arriveAt?: number; startReceived?: boolean }> = ({ tapAt, arriveAt, startReceived }) => {
  const { p } = useP();
  const done = startReceived ? 1 : tapAt === undefined ? 0 : p(tapAt, 0.35, EASE.standard);
  const arrive = startReceived ? 1 : arriveAt === undefined ? 0 : p(arriveAt, 0.5);
  const toast = startReceived ? 1 : arriveAt === undefined ? 0 : p(arriveAt + 0.35, 0.45);
  return (
    <>
      <ProviderSidebar active="Desk" initials="JM" />
      <div style={{ position: 'absolute', left: 120, top: 26 }}>
        <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.025em' }}>Triage desk</div>
        <div style={{ fontSize: 14, color: COLORS.textTertiary, marginTop: 2 }}>Rizal District Hospital · Emergency room · Tue, Sep 29</div>
      </div>
      <div style={{ position: 'absolute', right: 24, top: 22 }}>
        <StaffPill />
      </div>
      {/* Receive a record */}
      <PCard style={{ position: 'absolute', left: 116, top: 96, width: 380, height: 540, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: COLORS.textTertiary }}>RECEIVE A RECORD</div>
        <div style={{ position: 'relative', width: 240, height: 240, marginTop: 24 }}>
          <div style={{ opacity: 1 - done }}>
            <PulseRings size={200} color={COLORS.blue200} period={2.4} />
          </div>
          <div
            style={{
              position: 'absolute',
              left: 120 - 50,
              top: 120 - 50,
              width: 100,
              height: 100,
              borderRadius: 50,
              background: done > 0.5 ? COLORS.cyan400 : COLORS.blue500,
              color: done > 0.5 ? COLORS.ink : COLORS.white,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${1 + 0.06 * Math.sin(Math.PI * done)})`,
            }}
          >
            <Icon name={done > 0.5 ? 'check' : 'contactless'} size={44} strokeWidth={2.6} />
          </div>
        </div>
        <div style={{ fontSize: 19, fontWeight: 800, marginTop: 14, textAlign: 'center' }}>{done > 0.5 ? 'Ready for the next patient' : 'Ask the patient to tap their phone here'}</div>
        <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 4 }}>Ilapit ang phone sa reader</div>
        <div style={{ display: 'flex', gap: 10, marginTop: 20, width: '100%' }}>
          {(['Scan QR code', 'Bitbit ID'] as const).map((b, i) => (
            <div key={b} style={{ flex: 1, height: 44, borderRadius: 14, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 14, fontWeight: 700 }}>
              <Icon name={(i === 0 ? 'scan' : 'search') as IconName} size={16} /> {b}
            </div>
          ))}
        </div>
      </PCard>
      <div
        style={{
          position: 'absolute',
          left: 116,
          top: 650,
          width: 380,
          height: 64,
          borderRadius: 16,
          background: COLORS.cyan100,
          border: `1.5px solid ${COLORS.cyan400}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 14px',
          boxSizing: 'border-box',
          opacity: toast,
          transform: `translateY(${mix(toast, 20, 0)}px)`,
        }}
      >
        <div style={{ width: 34, height: 34, borderRadius: 17, background: COLORS.cyan400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={18} strokeWidth={3} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800 }}>Received: Marco Dela Cruz</div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary }}>7 items · chest discomfort · 8:51 AM</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue600 }}>Open</div>
      </div>
      {/* Queue */}
      <div style={{ position: 'absolute', left: 516, right: 24, top: 96 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <div style={{ fontSize: 19, fontWeight: 800 }}>Today&apos;s queue</div>
            <div style={{ fontSize: 13, color: COLORS.textTertiary }}>{arrive > 0.5 ? '6 received · 4 waiting' : '5 received · 3 waiting'}</div>
          </div>
          <div style={{ display: 'flex', background: COLORS.neutral100, borderRadius: 12, padding: 4, fontSize: 13, fontWeight: 700 }}>
            {['All', 'Waiting', 'Done'].map((s, i) => (
              <div key={s} style={{ padding: '6px 18px', borderRadius: 9, background: i === 0 ? COLORS.white : 'transparent', color: i === 0 ? COLORS.ink : COLORS.textSecondary }}>
                {s}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', padding: '16px 18px 8px', fontSize: 11.5, fontWeight: 700, letterSpacing: '0.08em', color: COLORS.textTertiary }}>
          {['PATIENT', 'RECEIVED', 'ALLERGIES', 'STATUS', 'ACCESS ENDS'].map((h, i) => (
            <div key={h} style={{ width: COLS[i] }}>
              {h}
            </div>
          ))}
        </div>
        <div style={{ height: mix(arrive, 0, 66), overflow: 'hidden', opacity: arrive }}>
          <QueueRow r={MARCO} highlight />
        </div>
        {QUEUE.map((r) => (
          <QueueRow key={r.name} r={r} />
        ))}
      </div>
    </>
  );
};

/* ---------- Patient summary (P4) ---------- */

const SummaryCard: React.FC<{ title: string; icon: IconName; children: ReactNode; band: number; style?: React.CSSProperties }> = ({ title, icon, children, band, style }) => (
  <PCard style={{ position: 'relative', overflow: 'hidden', ...style }}>
    <div style={{ position: 'absolute', inset: 0, background: COLORS.blue100, opacity: band * 0.75 }} />
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 11, background: COLORS.blue100, color: COLORS.blue600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={18} />
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, flex: 1 }}>{title}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.blue600 }}>All ›</div>
      </div>
      {children}
    </div>
  </PCard>
);

const Fact: React.FC<{ title: string; line?: string; source: string; tag: Provenance; glow: number }> = ({ title, line, source, tag, glow }) => (
  <div style={{ marginBottom: 10 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
      <div style={{ fontSize: 15, fontWeight: 800 }}>{title}</div>
      <div style={{ transform: `scale(${1 + 0.08 * glow})`, transformOrigin: 'right center' }}>
        <ProvenanceTag kind={tag} size={0.85} />
      </div>
    </div>
    {line ? <div style={{ fontSize: 13, marginTop: 2 }}>{line}</div> : null}
    <div style={{ fontSize: 11.5, color: glow > 0.5 ? COLORS.blue700 : COLORS.textTertiary, marginTop: 3, fontWeight: glow > 0.5 ? 700 : 400 }}>{source}</div>
  </div>
);

/** Patient summary. `bandAt`: start of the highlight that walks card by card (step 0.8 s). */
export const PatientSummaryScreen: React.FC<{ bandAt?: number }> = ({ bandAt }) => {
  const { t } = useP();
  const band = (i: number) => (bandAt === undefined ? 0 : interpolate(t, [bandAt + i * 0.8, bandAt + i * 0.8 + 0.25, bandAt + i * 0.8 + 0.8, bandAt + i * 0.8 + 1.05], [0, 1, 1, 0], clamp));
  return (
    <>
      <ProviderSidebar active="Patient" initials="JM" />
      <PCard style={{ position: 'absolute', left: 116, right: 24, top: 18, height: 86, padding: '0 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <Avatar initials="MD" size={54} />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.02em' }}>Marco Dela Cruz</div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 999, background: COLORS.blue100, color: COLORS.blue700, fontSize: 12, fontWeight: 700 }}>
              <Icon name="shield" size={13} /> PhilSys-linked
            </span>
          </div>
          <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 2 }}>32 yrs · Male · Born Mar 14, 1994 · BPO agent · Antipolo City</div>
        </div>
        <div style={{ width: 60, height: 56, borderRadius: 12, background: COLORS.blue600, color: COLORS.white, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 700 }}>Blood</div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>O+</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ background: COLORS.neutral100, borderRadius: 14, padding: '8px 14px', fontSize: 12.5 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800 }}>
            <Icon name="eye" size={14} /> Shared: 7 items · this visit
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: COLORS.textSecondary, marginTop: 2 }}>
            <Icon name="clock" size={13} /> Access ends 6:00 PM
          </div>
        </div>
        <div style={{ height: 48, padding: '0 18px', borderRadius: 14, background: COLORS.blue600, color: COLORS.white, display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 700 }}>
          <Icon name="pencil" size={16} /> Add visit notes
        </div>
      </PCard>
      {/* Allergies */}
      <div style={{ position: 'absolute', left: 116, right: 24, top: 116, height: 108, borderRadius: 20, background: COLORS.pink100, border: `1.5px solid ${COLORS.pink300}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: COLORS.white, opacity: band(0) * 0.35 }} />
        <div style={{ width: 52, height: 52, borderRadius: 26, background: COLORS.pink300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative' }}>
          <Icon name="alert" size={24} />
        </div>
        <div style={{ width: 170, position: 'relative' }}>
          <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: '0.06em' }}>ALLERGIES</div>
          <div style={{ fontSize: 12, color: COLORS.pink700, fontWeight: 700 }}>2 recorded · check first</div>
        </div>
        {[
          { n: 'Penicillin', d: 'Hives, itching · Dr. A. Ramos, Rizal District Hospital, 2019', tag: 'provider' as const },
          { n: 'Shrimp', d: 'Lip swelling · reported by patient, 2022', tag: 'patient' as const },
        ].map((a) => (
          <div key={a.n} style={{ flex: 1, background: COLORS.white, borderRadius: 14, padding: '10px 14px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>{a.n}</div>
              <ProvenanceTag kind={a.tag} size={0.85} />
            </div>
            <div style={{ fontSize: 12, color: COLORS.textTertiary, marginTop: 4 }}>{a.d}</div>
          </div>
        ))}
      </div>
      {/* Why he's here */}
      <div style={{ position: 'absolute', left: 116, right: 24, top: 236, height: 96, borderRadius: 20, background: COLORS.white, border: `1.5px solid ${COLORS.blue500}`, display: 'flex', alignItems: 'center', gap: 16, padding: '0 20px', boxSizing: 'border-box', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: COLORS.blue100, opacity: band(1) * 0.75 }} />
        <div style={{ width: 150, position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: '0.06em' }}>WHY HE&apos;S HERE</div>
          <div style={{ fontSize: 12, color: COLORS.textTertiary }}>From Marco · 8:42 AM</div>
        </div>
        <div style={{ flex: 1, position: 'relative' }}>
          <div style={{ fontSize: 19, fontWeight: 800 }}>Chest discomfort, with dizziness</div>
          <div style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 2 }}>Started this morning · chest · pressure / heaviness</div>
          <div style={{ fontSize: 12.5, color: COLORS.textTertiary, marginTop: 2, fontStyle: 'italic' }}>&ldquo;Masakit dibdib ko since this morning at medyo nahihilo ako.&rdquo;</div>
        </div>
        <div style={{ position: 'relative' }}>
          <ProvenanceTag kind="patient" size={0.9} />
        </div>
      </div>
      {/* Three columns */}
      <div style={{ position: 'absolute', left: 116, right: 24, top: 346, display: 'flex', gap: 14 }}>
        <SummaryCard title="Current medication" icon="pill" band={band(2)} style={{ flex: 1, height: 250 }}>
          <Fact title="Amlodipine 5 mg" line="1 tablet once daily" source="Copied from prescription · Riverside Clinic, Dr. J. Santos, Aug 12, 2026" tag="document" glow={band(2)} />
        </SummaryCard>
        <SummaryCard title="Known condition" icon="stethoscope" band={band(3)} style={{ flex: 1, height: 250 }}>
          <Fact title="Hypertension" line="Since 2024 · ongoing" source="Reviewed by Dr. A. Ramos · Rizal District Hospital · Sep 18, 2026" tag="provider" glow={band(3)} />
        </SummaryCard>
        <SummaryCard title="Recent result and last visit" icon="vitals" band={band(4)} style={{ flex: 1.2, height: 250 }}>
          <Fact title="CBC + lipid panel" line="Total cholesterol 5.6 mmol/L (ref. below 5.2)" source="May 4, 2026 · Lakeview Diagnostic Center · original attached" tag="document" glow={band(4)} />
          <Fact title="Last visit: hypertension follow-up" line="BP 136/86 mmHg · HR 76 bpm" source="Sep 18, 2026 · Rizal District Hospital · Dr. A. Ramos" tag="provider" glow={band(4)} />
        </SummaryCard>
      </div>
      {/* Not shared */}
      <PCard style={{ position: 'absolute', left: 116, right: 24, top: 612, height: 66, padding: '0 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700, color: COLORS.textSecondary, marginRight: 6 }}>Not shared by Marco</div>
        {['Family history', 'Previous medication', 'Other results (3)'].map((c) => (
          <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 999, background: COLORS.neutral100, color: COLORS.textSecondary, fontSize: 12.5, fontWeight: 600 }}>
            <Icon name="lock" size={12} /> {c}
          </span>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ height: 42, padding: '0 16px', borderRadius: 14, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13.5, fontWeight: 700 }}>
          <Icon name="message" size={15} /> Ask Marco to share Other results
        </div>
      </PCard>
    </>
  );
};
