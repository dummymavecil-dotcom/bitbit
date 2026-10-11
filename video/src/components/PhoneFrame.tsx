import type { CSSProperties, ReactNode } from 'react';
import { Img, staticFile } from 'remotion';
import { COLORS, FONT_STACK } from '../theme';

/** App screens are designed at 390 × 844 (screenshots are 2× = 780 × 1688). */
export const SCREEN_W = 390;
export const SCREEN_H = 844;

/**
 * A plain phone: thin white bezel, hairline edge, one soft shadow, no status bar or notch.
 * Children render in app pixels (390 × 844); `scale` sizes the whole phone.
 */
export const PhoneFrame: React.FC<{ children: ReactNode; scale?: number; style?: CSSProperties; screenBg?: string }> = ({
  children,
  scale = 1,
  style,
  screenBg = COLORS.bg,
}) => {
  const bezel = 9;
  return (
    <div
      style={{
        width: (SCREEN_W + bezel * 2) * scale,
        height: (SCREEN_H + bezel * 2) * scale,
        flexShrink: 0,
        ...style,
      }}
    >
      <div
        style={{
          width: SCREEN_W + bezel * 2,
          height: SCREEN_H + bezel * 2,
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          borderRadius: 54,
          background: COLORS.white,
          border: `1.5px solid ${COLORS.neutral200}`,
          boxShadow: '0 40px 80px rgba(11, 27, 51, 0.16), 0 6px 18px rgba(11, 27, 51, 0.08)',
          padding: bezel - 1.5,
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: 46,
            overflow: 'hidden',
            background: screenBg,
            fontFamily: FONT_STACK,
            color: COLORS.ink,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

/** A real app screenshot from public/images/screens, filling the phone screen. */
export const ScreenImage: React.FC<{ name: string }> = ({ name }) => (
  <Img src={staticFile(`images/screens/${name}.png`)} style={{ position: 'absolute', inset: 0, width: SCREEN_W, height: SCREEN_H }} />
);

/**
 * A rectangular crop of a screenshot, in app pixels, shown at `width`.
 * @example <ScreenCrop name="02-home" x={20} y={340} w={350} h={205} width={900} />
 */
export const ScreenCrop: React.FC<{ name: string; x: number; y: number; w: number; h: number; width: number; style?: CSSProperties }> = ({
  name,
  x,
  y,
  w,
  h,
  width,
  style,
}) => {
  const k = width / w;
  return (
    <div style={{ position: 'relative', width, height: h * k, overflow: 'hidden', flexShrink: 0, ...style }}>
      <Img
        src={staticFile(`images/screens/${name}.png`)}
        style={{ position: 'absolute', left: -x * k, top: -y * k, width: SCREEN_W * k, height: SCREEN_H * k }}
      />
    </div>
  );
};
