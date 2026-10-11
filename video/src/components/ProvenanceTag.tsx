import type { CSSProperties } from 'react';
import { COLORS } from '../theme';
import { Icon, type IconName } from './Icon';

export type Provenance = 'patient' | 'document' | 'provider';

/** The three provenance tags, in "How sure is this?" order. Names are fixed; never shorten them. */
export const PROVENANCE: Record<Provenance, { label: string; icon: IconName; bg: string; fg: string; border: string }> = {
  patient: { label: 'Patient-reported', icon: 'pencil', bg: COLORS.yellow100, fg: COLORS.yellow700, border: `1px dashed ${COLORS.yellow600}` },
  document: { label: 'Document-sourced', icon: 'file', bg: COLORS.cyan100, fg: COLORS.cyan700, border: `1px solid ${COLORS.cyan700}` },
  provider: { label: 'Provider-reviewed', icon: 'verified', bg: COLORS.blue100, fg: COLORS.blue700, border: `1px solid ${COLORS.blue500}` },
};

export const PROVENANCE_ORDER: Provenance[] = ['patient', 'document', 'provider'];

/**
 * Word + icon + border, exactly as in the app. Sized in app pixels (390-wide screen);
 * `size` multiplies everything (use ~2.4 for tags shown at poster size on a panel).
 */
export const ProvenanceTag: React.FC<{ kind: Provenance; size?: number; style?: CSSProperties }> = ({ kind, size = 1, style }) => {
  const t = PROVENANCE[kind];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4 * size,
        height: 24 * size,
        padding: `0 ${9 * size}px`,
        borderRadius: 999,
        background: t.bg,
        color: t.fg,
        border: t.border.replace('1px', `${Math.max(1, size)}px`),
        fontSize: 13 * size,
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      <Icon name={t.icon} size={13 * size} strokeWidth={2.4} />
      {t.label}
    </span>
  );
};
