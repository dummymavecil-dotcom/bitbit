import type { CSSProperties, ReactNode } from 'react';
import { Icon, Logo, type IconName } from '../../components';
import { COLORS, FONT_STACK } from '../../theme';

/**
 * Provider app, rebuilt from the wireframes in design-prompts/reference/provider (p1–p7).
 * Screens are laid out at 1280 × 740 app pixels; ProviderTablet scales them into a dark frame.
 */
export const APP_W = 1280;
export const APP_H = 740;

export const ProviderTablet: React.FC<{ children: ReactNode; width?: number; style?: CSSProperties }> = ({ children, width = 1500, style }) => {
  const bezel = 18;
  const k = (width - bezel * 2) / APP_W;
  const height = APP_H * k + bezel * 2;
  return (
    <div style={{ width, height, borderRadius: 46, background: COLORS.ink, padding: bezel, boxSizing: 'border-box', boxShadow: '0 40px 80px rgba(11,27,51,0.22)', ...style }}>
      <div style={{ width: APP_W * k, height: APP_H * k, borderRadius: 30, overflow: 'hidden', background: COLORS.bg, position: 'relative' }}>
        <div style={{ width: APP_W, height: APP_H, transform: `scale(${k})`, transformOrigin: '0 0', fontFamily: FONT_STACK, color: COLORS.ink, position: 'relative' }}>{children}</div>
      </div>
    </div>
  );
};

const NAV: { icon: IconName; label: string }[] = [
  { icon: 'home', label: 'Desk' },
  { icon: 'user', label: 'Patient' },
  { icon: 'file', label: 'Record' },
  { icon: 'pencil', label: 'Notes' },
  { icon: 'vitals', label: 'Admin' },
];

/** Left navigation of the provider app. */
export const ProviderSidebar: React.FC<{ active: string; initials: string }> = ({ active, initials }) => (
  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 92, background: COLORS.white, borderRight: `1px solid ${COLORS.neutral150}`, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 22 }}>
    <Logo kind="mark" width={34} style={{ marginBottom: 22 }} />
    {NAV.map((n) => (
      <div
        key={n.label}
        style={{
          width: 72,
          height: 64,
          borderRadius: 14,
          marginBottom: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          background: n.label === active ? COLORS.blue100 : 'transparent',
          color: n.label === active ? COLORS.blue600 : COLORS.textTertiary,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        <Icon name={n.icon} size={22} />
        {n.label}
      </div>
    ))}
    <div style={{ flex: 1 }} />
    <div style={{ color: COLORS.textTertiary, fontSize: 12, fontWeight: 700, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 14 }}>
      <Icon name="shield" size={20} />
      Lock
    </div>
    <div style={{ width: 40, height: 40, borderRadius: 20, background: COLORS.cyan400, fontSize: 14, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{initials}</div>
  </div>
);

export const PCard: React.FC<{ children: ReactNode; style?: CSSProperties }> = ({ children, style }) => (
  <div style={{ background: COLORS.white, borderRadius: 20, border: `1px solid ${COLORS.neutral150}`, padding: 20, boxSizing: 'border-box', ...style }}>{children}</div>
);

export const Avatar: React.FC<{ initials: string; size?: number }> = ({ initials, size = 48 }) => (
  <div style={{ width: size, height: size, borderRadius: size / 2, background: COLORS.cyan400, color: COLORS.ink, fontSize: size * 0.36, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{initials}</div>
);

/** Marco's header bar used across the provider screens. */
export const PatientHeader: React.FC<{ right: ReactNode }> = ({ right }) => (
  <PCard style={{ position: 'absolute', left: 116, right: 24, top: 20, height: 84, padding: '0 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
    <Avatar initials="MD" size={52} />
    <div>
      <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em' }}>Marco Dela Cruz</div>
      <div style={{ fontSize: 14, color: COLORS.textTertiary, marginTop: 2 }}>32 yrs · Male · O+ · Bitbit ID BB-0421</div>
    </div>
    <div style={{ marginLeft: 12, display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: COLORS.pink100, color: COLORS.pink700, border: `1px solid ${COLORS.pink300}`, fontSize: 14, fontWeight: 700 }}>
      <Icon name="alert" size={16} />
      Allergies: Penicillin, Shrimp
    </div>
    <div style={{ flex: 1 }} />
    {right}
  </PCard>
);
