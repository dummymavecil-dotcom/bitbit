import type { CSSProperties, ReactNode } from 'react';
import { Icon, type IconName } from '../../../components';
import { COLORS } from '../../../theme';

/** Small app-UI pieces in app pixels (390-wide screen), matching the Bitbit screenshots. */

export const RoundButton: React.FC<{ icon: IconName; dark?: boolean; style?: CSSProperties }> = ({ icon, dark, style }) => (
  <div
    style={{
      width: 44,
      height: 44,
      borderRadius: 22,
      background: dark ? '#26354f' : COLORS.white,
      border: dark ? 'none' : `1px solid ${COLORS.neutral150}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: dark ? COLORS.white : COLORS.ink,
      ...style,
    }}
  >
    <Icon name={icon} size={20} />
  </div>
);

export const ScreenHeader: React.FC<{ title: string; subtitle?: string; icon?: IconName }> = ({ title, subtitle, icon = 'chevronLeft' }) => (
  <div style={{ position: 'absolute', top: 56, left: 20, right: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
    <RoundButton icon={icon} />
    <div>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.15 }}>{title}</div>
      {subtitle ? <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 2 }}>{subtitle}</div> : null}
    </div>
  </div>
);

export const Chip: React.FC<{ label: string; selected?: number; style?: CSSProperties }> = ({ label, selected = 0, style }) => {
  // `selected` 0..1 so selection can animate as a colour change (allowed by the brand motion rules).
  const bg = `rgba(0, 112, 217, ${selected})`;
  return (
    <div
      style={{
        height: 40,
        padding: '0 16px',
        borderRadius: 14,
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 15,
        fontWeight: 600,
        background: selected > 0 ? bg : COLORS.white,
        color: selected > 0.5 ? COLORS.white : COLORS.ink,
        border: `1.5px solid ${selected > 0.5 ? 'transparent' : COLORS.neutral450}`,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {label}
    </div>
  );
};

export const Card: React.FC<{ children: ReactNode; style?: CSSProperties }> = ({ children, style }) => (
  <div style={{ background: COLORS.white, borderRadius: 20, border: `1px solid ${COLORS.neutral150}`, padding: 14, boxSizing: 'border-box', ...style }}>{children}</div>
);

export const Overline: React.FC<{ children: ReactNode; color?: string; style?: CSSProperties }> = ({ children, color = COLORS.textTertiary, style }) => (
  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color, textTransform: 'uppercase', ...style }}>{children}</div>
);

export const IconTile: React.FC<{ icon: IconName; tone?: 'blue' | 'pink' | 'neutral' | 'cyan'; size?: number }> = ({ icon, tone = 'blue', size = 40 }) => {
  const tones = {
    blue: [COLORS.blue100, COLORS.blue600],
    pink: [COLORS.pink100, COLORS.pink700],
    neutral: [COLORS.neutral100, COLORS.ink],
    cyan: [COLORS.cyan100, COLORS.cyan700],
  } as const;
  const [bg, fg] = tones[tone];
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.3, background: bg, color: fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name={icon} size={size * 0.5} />
    </div>
  );
};

export const PrimaryButton: React.FC<{ label: string; pressed?: number; style?: CSSProperties; icon?: IconName }> = ({ label, pressed = 0, style, icon }) => (
  <div
    style={{
      height: 56,
      borderRadius: 20,
      background: pressed > 0 ? COLORS.blue700 : COLORS.blue600,
      color: COLORS.white,
      fontSize: 17,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      transform: `scale(${1 - 0.02 * pressed})`,
      ...style,
    }}
  >
    {label}
    {icon ? <Icon name={icon} size={20} /> : null}
  </div>
);
