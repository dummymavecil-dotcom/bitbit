import { useCurrentFrame, useVideoConfig } from 'remotion';
import { AnimatedText, Background, Pill, Scene } from '../../../components';
import { COLORS, RADIUS, TYPE } from '../../../theme';
import { EASE, enterStyle, mix, progress, sec, stagger, useScale } from '../../../utils';
import type { BitbitIntroProps } from '../schema';

type Row = { label: string; value: string; detail: string; tone: 'allergy' | 'verified' };

// Facts, never advice: values with reference ranges, allergy first.
const ROWS: Row[] = [
  { label: 'Allergy', value: 'Penicillin', detail: 'Hives, itching', tone: 'allergy' },
  { label: 'Medication', value: 'Losartan 50 mg', detail: '1 tablet, once a day', tone: 'verified' },
  { label: 'Lab result', value: 'HbA1c 6.8%', detail: 'ref. below 5.7% · Mar 2026', tone: 'verified' },
];

const RecordCard: React.FC<{ row: Row; delay: number }> = ({ row, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = useScale();
  const t = progress(frame, sec(delay, fps), sec(0.8, fps), EASE.enter);
  const allergy = row.tone === 'allergy';
  return (
    <div
      style={{
        ...enterStyle(t, { rise: 0, blur: 6 }),
        transform: `translateX(${mix(t, 120 * s, 0)}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24 * s,
        width: 720 * s,
        padding: `${28 * s}px ${34 * s}px`,
        borderRadius: RADIUS.xl * s * 1.2,
        background: allergy ? COLORS.pink100 : COLORS.surface,
        border: `${2 * s}px solid ${allergy ? '#fd8fb9' : COLORS.borderSubtle}`,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 * s }}>
        <span style={{ fontSize: 22 * s, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: allergy ? COLORS.pink700 : COLORS.textTertiary }}>
          {row.label}
        </span>
        <span style={{ fontSize: 40 * s, fontWeight: 750, letterSpacing: '-0.015em' }}>{row.value}</span>
        <span style={{ fontSize: 26 * s, color: COLORS.textSecondary, fontVariantNumeric: 'tabular-nums' }}>{row.detail}</span>
      </div>
      <Pill
        tone="blue"
        icon={
          <svg width={24 * s} height={24 * s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
            <circle cx={12} cy={12} r={9} />
            <path d="m8.5 12 2.5 2.5 4.5-5" />
          </svg>
        }
      >
        Verified
      </Pill>
    </div>
  );
};

export const FactsScene: React.FC<{ props: BitbitIntroProps }> = ({ props }) => {
  const s = useScale();
  return (
    <Scene background={<Background seed="facts" glows={[COLORS.blue100, COLORS.cyan100]} />} align="left">
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <AnimatedText
          text={props.factsTitle}
          by="line"
          delay={0.25}
          stagger={0.22}
          rise={36 * s}
          style={{ ...TYPE.display, fontSize: 74 * s, maxWidth: 900 * s }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 * s }}>
          {ROWS.map((row, i) => (
            <RecordCard key={row.value} row={row} delay={stagger(i, 0.18, 0.55)} />
          ))}
        </div>
      </div>
    </Scene>
  );
};
