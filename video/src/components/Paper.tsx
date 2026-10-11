import type { CSSProperties, ReactNode } from 'react';
import { COLORS, FONT_STACK, HAND_FAMILY } from '../theme';

/**
 * Depicted paper documents (fictional, consistent with the app's data). All are drawn at a fixed
 * base size (PAPER_W × PAPER_H) and scaled with `scale`, so highlight boxes can use base coordinates.
 */
export const PAPER_W = 560;
export const PAPER_H = 760;

const Sheet: React.FC<{ children: ReactNode; scale?: number; rotate?: number; style?: CSSProperties; shadow?: boolean }> = ({
  children,
  scale = 1,
  rotate = 0,
  style,
  shadow = true,
}) => (
  <div style={{ width: PAPER_W * scale, height: PAPER_H * scale, flexShrink: 0, ...style }}>
    <div
      style={{
        position: 'relative',
        width: PAPER_W,
        height: PAPER_H,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        transformOrigin: '0 0',
        background: COLORS.paper,
        borderRadius: 10,
        boxShadow: shadow ? '0 24px 48px rgba(11, 27, 51, 0.18), 0 2px 6px rgba(11, 27, 51, 0.1)' : undefined,
        fontFamily: FONT_STACK,
        color: COLORS.ink,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  </div>
);

const hand: CSSProperties = { fontFamily: `${HAND_FAMILY}, cursive`, fontWeight: 500, color: '#1f2b45', position: 'absolute' };

/** Field boxes on the prescription, in base coordinates (x, y, w, h). Used for scan highlights. */
export const RX_FIELDS = {
  clinic: { x: 100, y: 40, w: 360, h: 40 },
  prescriber: { x: 110, y: 88, w: 340, h: 28 },
  patient: { x: 40, y: 140, w: 280, h: 32 },
  date: { x: 330, y: 140, w: 200, h: 32 },
  medicine: { x: 52, y: 262, w: 420, h: 70 },
  howToTake: { x: 52, y: 412, w: 360, h: 64 },
  reason: { x: 52, y: 484, w: 380, h: 64 },
} as const;

/** Riverside Clinic prescription for Amlodipine (matches the app's scan screen). */
export const PrescriptionPaper: React.FC<{ scale?: number; rotate?: number; style?: CSSProperties; shadow?: boolean; children?: ReactNode }> = ({
  scale,
  rotate,
  style,
  shadow,
  children,
}) => (
  <Sheet scale={scale} rotate={rotate} style={style} shadow={shadow}>
    <div style={{ position: 'absolute', top: 44, width: '100%', textAlign: 'center', fontSize: 30, fontWeight: 800, letterSpacing: '0.12em' }}>RIVERSIDE CLINIC</div>
    <div style={{ position: 'absolute', top: 88, width: '100%', textAlign: 'center', fontSize: 20, color: COLORS.textSecondary }}>Dr. J. Santos, MD · Internal Medicine</div>
    <div style={{ position: 'absolute', top: 128, left: 40, right: 40, height: 2, background: COLORS.neutral300 }} />
    <div style={{ position: 'absolute', top: 146, left: 40, fontSize: 19 }}>
      Patient: <b>Marco Dela Cruz</b>
    </div>
    <div style={{ position: 'absolute', top: 146, right: 40, fontSize: 19 }}>Date: 08/12/2026</div>
    <div style={{ position: 'absolute', top: 190, left: 40, fontSize: 64, fontWeight: 800, fontFamily: 'Georgia, serif' }}>℞</div>
    <div style={{ ...hand, top: 262, left: 60, fontSize: 52 }}>Amlodipine 5mg tab</div>
    <div style={{ ...hand, top: 338, left: 60, fontSize: 46 }}>#30</div>
    <div style={{ ...hand, top: 414, left: 60, fontSize: 46 }}>Sig: 1 tab once daily</div>
    <div style={{ ...hand, top: 486, left: 60, fontSize: 46 }}>for hypertension</div>
    <svg width={220} height={70} viewBox="0 0 220 70" style={{ position: 'absolute', top: 590, right: 70 }}>
      <path d="M8 52c14-36 22-36 26-6 8-30 18-34 26-4 10-26 22-30 32-8 12-18 34-24 60-14 18 6 34 2 52-8" fill="none" stroke="#1f2b45" strokeWidth={3.5} strokeLinecap="round" />
    </svg>
    <div style={{ position: 'absolute', top: 668, right: 50, width: 260, height: 2, background: COLORS.ink }} />
    <div style={{ position: 'absolute', top: 678, right: 50, width: 260, textAlign: 'center', fontSize: 15, color: COLORS.textSecondary }}>Signature over printed name</div>
    {children}
  </Sheet>
);

const Row: React.FC<{ top: number; label: string; value: string; strong?: boolean }> = ({ top, label, value, strong }) => (
  <div style={{ position: 'absolute', top, left: 44, right: 44, display: 'flex', fontSize: 19, borderBottom: `1px solid ${COLORS.neutral200}`, paddingBottom: 10 }}>
    <span style={{ width: 210, color: COLORS.textSecondary }}>{label}</span>
    <span style={{ fontWeight: strong ? 700 : 500 }}>{value}</span>
  </div>
);

/** Lakeview Diagnostic Center: CBC + lipid panel, May 4, 2026 (matches the provider screens). */
export const LabPaper: React.FC<{ scale?: number; rotate?: number; style?: CSSProperties; shadow?: boolean }> = (p) => (
  <Sheet {...p}>
    <div style={{ position: 'absolute', top: 40, left: 44, fontSize: 26, fontWeight: 800, letterSpacing: '0.08em' }}>LAKEVIEW DIAGNOSTIC CENTER</div>
    <div style={{ position: 'absolute', top: 80, left: 44, fontSize: 18, color: COLORS.textSecondary }}>Requested by Dr. J. Santos · Collected 05/04/2026</div>
    <div style={{ position: 'absolute', top: 116, left: 44, fontSize: 18 }}>
      Patient: <b>Marco Dela Cruz</b> · 32 · M
    </div>
    <div style={{ position: 'absolute', top: 160, left: 44, fontSize: 22, fontWeight: 800 }}>CBC + LIPID PANEL</div>
    <div style={{ position: 'absolute', top: 196, left: 44, right: 44, display: 'flex', fontSize: 15, fontWeight: 700, color: COLORS.textTertiary, letterSpacing: '0.06em' }}>
      <span style={{ width: 210 }}>TEST</span>
      <span>RESULT · REFERENCE</span>
    </div>
    <Row top={230} label="Hemoglobin" value="14.6 g/dL · 13.5–17.5" />
    <Row top={276} label="WBC" value="7.2 × 10⁹/L · 4.5–11.0" />
    <Row top={322} label="Platelets" value="265 × 10⁹/L · 150–400" />
    <Row top={368} label="Total cholesterol" value="5.6 mmol/L · below 5.2" />
    <Row top={414} label="LDL cholesterol" value="3.6 mmol/L · below 2.6" />
    <Row top={460} label="HDL cholesterol" value="1.1 mmol/L · above 1.0" />
    <Row top={506} label="Triglycerides" value="1.9 mmol/L · below 1.7" />
    <div style={{ position: 'absolute', top: 640, left: 44, fontSize: 16, color: COLORS.textSecondary }}>Medical technologist · Pathologist</div>
  </Sheet>
);

/** Rizal District Hospital discharge summary, Jan 12–14, 2026 (matches the provider screens). */
export const DischargePaper: React.FC<{ scale?: number; rotate?: number; style?: CSSProperties; shadow?: boolean }> = (p) => (
  <Sheet {...p}>
    <div style={{ position: 'absolute', top: 40, left: 44, fontSize: 24, fontWeight: 800, letterSpacing: '0.08em' }}>RIZAL DISTRICT HOSPITAL</div>
    <div style={{ position: 'absolute', top: 78, left: 44, fontSize: 30, fontWeight: 800 }}>Discharge summary</div>
    <Row top={140} label="Patient" value="Marco Dela Cruz · 32 · M" strong />
    <Row top={186} label="Admitted" value="01/12/2026" />
    <Row top={232} label="Discharged" value="01/14/2026" />
    <Row top={278} label="Attending" value="Dr. A. Ramos" />
    <Row top={324} label="Reason for admission" value="Hypertensive urgency" />
    <Row top={370} label="On arrival" value="BP 180/110" />
    <Row top={416} label="Discharge diagnosis" value="Hypertension" strong />
    <Row top={462} label="Home medication" value="Losartan 50 mg, 1 tab once daily" />
    <Row top={508} label="At discharge" value="BP 118/76" />
    <div style={{ position: 'absolute', top: 640, left: 44, fontSize: 16, color: COLORS.textSecondary }}>Prepared by Dr. A. Ramos · Internal Medicine</div>
  </Sheet>
);

/** Small generic paper for crowd shots: a title and grey text lines. */
export const MiniPaper: React.FC<{ title: string; lines?: number; scale?: number; rotate?: number; style?: CSSProperties }> = ({ title, lines = 7, scale, rotate, style }) => (
  <Sheet scale={scale} rotate={rotate} style={style}>
    <div style={{ position: 'absolute', top: 54, left: 52, fontSize: 34, fontWeight: 800, letterSpacing: '0.08em' }}>{title}</div>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} style={{ position: 'absolute', top: 140 + i * 62, left: 52, height: 16, width: `${[78, 64, 82, 55, 72, 60, 80, 48][i % 8]}%`, borderRadius: 8, background: COLORS.neutral200 }} />
    ))}
  </Sheet>
);
