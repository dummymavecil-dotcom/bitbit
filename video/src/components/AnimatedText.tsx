import type { CSSProperties } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { enterStyle, progress, EASE } from '../utils/animation';
import { sec } from '../utils/time';

export type AnimatedTextProps = {
  text: string;
  /** Split and stagger by word (default), by character, or by line (split on "\n"). */
  by?: 'word' | 'char' | 'line';
  /** Seconds before the first unit starts. */
  delay?: number;
  /** Seconds between units. */
  stagger?: number;
  /** Seconds each unit takes to settle. */
  duration?: number;
  /** Rise distance in px (already scaled by the caller if needed). */
  rise?: number;
  blur?: number;
  style?: CSSProperties;
  /** Style applied to the words listed in `highlight`. */
  highlightStyle?: CSSProperties;
  /** Words (case-insensitive, punctuation ignored) to render with `highlightStyle`. */
  highlight?: string[];
};

const clean = (w: string) => w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

/**
 * Kinetic typography: reveals text unit by unit with a fade, rise and de-blur.
 * Units keep their natural spacing, so line wrapping still follows the container width.
 * @example <AnimatedText text="Own your record." by="word" delay={0.2} highlight={["record"]} highlightStyle={{ color: COLORS.blue600 }} />
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  by = 'word',
  delay = 0,
  stagger = by === 'char' ? 0.025 : 0.08,
  duration = 0.7,
  rise = 28,
  blur = 10,
  style,
  highlight = [],
  highlightStyle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hl = new Set(highlight.map(clean));

  const units =
    by === 'line' ? text.split('\n') : by === 'char' ? Array.from(text) : text.split(/(\s+)/).filter((u) => u.length > 0);

  let visibleIndex = 0;
  return (
    <div style={{ ...style, whiteSpace: by === 'line' ? 'normal' : 'pre-wrap' }}>
      {units.map((unit, i) => {
        // Whitespace in word mode renders as-is so wrapping stays natural.
        if (by === 'word' && /^\s+$/.test(unit)) return <span key={i}>{unit}</span>;
        const start = sec(delay + visibleIndex * stagger, fps);
        visibleIndex++;
        const t = progress(frame, start, sec(duration, fps), EASE.enter);
        const isHl = by !== 'char' && hl.has(clean(unit));
        return (
          <span
            key={i}
            style={{
              display: by === 'line' ? 'block' : 'inline-block',
              ...enterStyle(t, { rise, blur }),
              ...(isHl ? highlightStyle : null),
            }}
          >
            {unit === ' ' ? ' ' : unit}
          </span>
        );
      })}
    </div>
  );
};
