import type { CSSProperties, ReactNode } from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONT_STACK } from '../theme';
import { useScale } from '../utils/layout';

export type SceneProps = {
  children: ReactNode;
  /** Optional backdrop rendered behind the content (e.g. <Background />). */
  background?: ReactNode;
  /** Content alignment inside the safe area. */
  align?: 'center' | 'left';
  style?: CSSProperties;
};

/**
 * Root of every scene: full-frame layer, brand font, ink colour and a title-safe margin
 * (120px at 1920 wide, scaled with resolution).
 */
export const Scene: React.FC<SceneProps> = ({ children, background, align = 'center', style }) => {
  const s = useScale();
  return (
    <AbsoluteFill style={{ fontFamily: FONT_STACK, color: COLORS.ink }}>
      {background}
      <AbsoluteFill
        style={{
          padding: 120 * s,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: align === 'center' ? 'center' : 'flex-start',
          textAlign: align,
          ...style,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
