import type { CSSProperties } from 'react';
import { Img, staticFile } from 'remotion';

const FILES = {
  wordmark: { src: 'images/logo/bitbit-wordmark-blue.png', ratio: 3568 / 1112 },
  mark: { src: 'images/logo/bitbit-mark-blue.png', ratio: 1045 / 1099 },
};

/**
 * Official Bitbit logo from public/images/logo. Never redraw, stretch or add effects.
 * `white` renders the single-ink white variant (for blue-500/blue-600 grounds; never blue on blue).
 */
export const Logo: React.FC<{ kind?: 'wordmark' | 'mark'; width: number; white?: boolean; style?: CSSProperties }> = ({
  kind = 'wordmark',
  width,
  white = false,
  style,
}) => {
  const f = FILES[kind];
  return (
    <Img
      src={staticFile(f.src)}
      style={{ width, height: width / f.ratio, display: 'block', filter: white ? 'brightness(0) invert(1)' : undefined, ...style }}
    />
  );
};
