import type { ReactNode } from 'react';
import { Icon } from '../../../components';
import { COLORS } from '../../../theme';
import { mix } from '../../../utils';
import { RoundButton } from './ui';

const CHIPS = ['Prescription', 'Lab result', 'Discharge summary'];

/** Viewfinder area in app pixels; put the paper inside it. */
export const VIEWFINDER = { x: 52, y: 168, w: 286, h: 316 };

/**
 * "Scan a record" (dark), rebuilt from the screenshot without the licence-number placeholder.
 * chip: 0..2 (fractional values cross-fade the selection). corners: 0 = open, 1 = locked on.
 * shutter: 0..1 press amount.
 */
export const ScanScreen: React.FC<{ chip?: number; corners?: number; shutter?: number; children?: ReactNode }> = ({ chip = 0, corners = 0, shutter = 0, children }) => {
  const v = VIEWFINDER;
  const spread = mix(corners, 14, 0);
  const arm = 34;
  const cornerStyle = (pos: 'tl' | 'tr' | 'bl' | 'br'): React.CSSProperties => ({
    position: 'absolute',
    width: arm,
    height: arm,
    borderColor: COLORS.cyan400,
    borderStyle: 'solid',
    borderWidth: 0,
    ...(pos[0] === 't' ? { top: v.y - spread, borderTopWidth: 5 } : { top: v.y + v.h - arm + spread, borderBottomWidth: 5 }),
    ...(pos[1] === 'l' ? { left: v.x - spread, borderLeftWidth: 5 } : { left: v.x + v.w - arm + spread, borderRightWidth: 5 }),
    borderTopLeftRadius: pos === 'tl' ? 14 : 0,
    borderTopRightRadius: pos === 'tr' ? 14 : 0,
    borderBottomLeftRadius: pos === 'bl' ? 14 : 0,
    borderBottomRightRadius: pos === 'br' ? 14 : 0,
  });
  return (
    <div style={{ position: 'absolute', inset: 0, background: COLORS.ink, color: COLORS.white }}>
      <RoundButton icon="close" dark style={{ position: 'absolute', top: 56, left: 20 }} />
      <RoundButton icon="flash" dark style={{ position: 'absolute', top: 56, right: 20 }} />
      <div style={{ position: 'absolute', top: 58, left: 0, right: 0, textAlign: 'center' }}>
        <div style={{ fontSize: 18, fontWeight: 800 }}>Scan a record</div>
        <div style={{ fontSize: 13, color: COLORS.neutral300, marginTop: 2 }}>I-scan ang papel</div>
      </div>
      <div style={{ position: 'absolute', top: 116, left: 20, display: 'flex', gap: 8 }}>
        {CHIPS.map((c, i) => {
          const on = Math.max(0, 1 - Math.abs(chip - i));
          return (
            <div
              key={c}
              style={{
                height: 40,
                padding: '0 16px',
                borderRadius: 20,
                display: 'flex',
                alignItems: 'center',
                fontSize: 15,
                fontWeight: 700,
                whiteSpace: 'nowrap',
                background: on > 0.5 ? COLORS.cyan400 : '#26354f',
                color: on > 0.5 ? COLORS.ink : COLORS.white,
              }}
            >
              {c}
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>{children}</div>
      {(['tl', 'tr', 'bl', 'br'] as const).map((p) => (
        <div key={p} style={cornerStyle(p)} />
      ))}
      <div style={{ position: 'absolute', top: 506, left: 20, right: 20, background: '#26354f', borderRadius: 16, padding: '13px 16px', display: 'flex', gap: 10, fontSize: 13.5, lineHeight: 1.45 }}>
        <Icon name="sparkle" size={18} color={COLORS.cyan400} style={{ marginTop: 1 }} />
        <span>Bitbit&apos;s AI copies only what is written. It doesn&apos;t diagnose or fill gaps. You check everything before it&apos;s saved.</span>
      </div>
      <div style={{ position: 'absolute', top: 612, left: 38, width: 80, textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: '#26354f', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="upload" size={20} />
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 700, marginTop: 6, lineHeight: 1.2 }}>Upload photo or PDF</div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 604,
          left: 195 - 38,
          width: 76,
          height: 76,
          borderRadius: 38,
          border: `4px solid ${COLORS.white}`,
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: 58, height: 58, borderRadius: 29, background: COLORS.white, transform: `scale(${1 - 0.08 * shutter})` }} />
      </div>
      <div style={{ position: 'absolute', top: 712, left: 0, right: 0, textAlign: 'center', fontSize: 13, color: COLORS.neutral300 }}>Align the paper inside the corners</div>
    </div>
  );
};
