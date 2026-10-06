import type { CSSProperties, ReactNode } from 'react';
import { COLORS, RADIUS } from '../theme';
import { useScale } from '../utils/layout';

export type PillProps = {
  children: ReactNode;
  tone?: 'blue' | 'cyan' | 'solid' | 'neutral';
  icon?: ReactNode;
  style?: CSSProperties;
};

const TONES: Record<NonNullable<PillProps['tone']>, CSSProperties> = {
  blue: { background: COLORS.blue100, color: COLORS.blue700, border: `2px solid ${COLORS.blue500}` },
  cyan: { background: COLORS.cyan100, color: COLORS.cyan700, border: `2px solid ${COLORS.cyan700}` },
  solid: { background: COLORS.blue600, color: COLORS.white, border: '2px solid transparent' },
  neutral: { background: COLORS.surface, color: COLORS.ink, border: `2px solid ${COLORS.borderSubtle}` },
};

/** Rounded label (e.g. a Verified tag, a kicker above a headline). Static: wrap in <Reveal> to animate. */
export const Pill: React.FC<PillProps> = ({ children, tone = 'blue', icon, style }) => {
  const s = useScale();
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12 * s,
        padding: `${10 * s}px ${24 * s}px`,
        borderRadius: RADIUS.full,
        fontSize: 26 * s,
        fontWeight: 700,
        lineHeight: 1.2,
        whiteSpace: 'nowrap',
        ...TONES[tone],
        ...style,
      }}
    >
      {icon}
      {children}
    </span>
  );
};
