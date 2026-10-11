import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon, PrescriptionPaper, PROVENANCE_ORDER, ProvenanceTag } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { Card, Overline, ScreenHeader } from './ui';

const SCALE_ROWS = {
  patient: 'Added by you from memory',
  document: 'Copied from a paper · original attached',
  provider: 'Checked by a provider',
};

/** Amlodipine detail: Document-sourced, original attached, and the "How sure is this?" scale. Seconds are screen-local. */
export const SourceScreen: React.FC<{ originalAt?: number; scaleAt?: number }> = ({ originalAt = 0.7, scaleAt = 1.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = (d: number, dur = 0.5) => progress(frame, sec(d, fps), sec(dur, fps), EASE.enter);
  const original = p(originalAt);
  const thumb = p(originalAt + 0.25, 0.6);
  const scale = p(scaleAt);
  // Marker slides from Patient-reported to Document-sourced and rests there.
  const marker = progress(frame, sec(scaleAt + 0.5, fps), sec(0.8, fps), EASE.inOut);
  const rowH = 58;
  return (
    <>
      <ScreenHeader title="Amlodipine 5 mg" subtitle="Gamot · current" />
      <div style={{ position: 'absolute', top: 120, left: 20, right: 20 }}>
        <Card style={{ padding: 16 }}>
          <Overline>Current medication</Overline>
          <div style={{ fontSize: 19, fontWeight: 800, marginTop: 6, letterSpacing: '-0.01em' }}>Amlodipine 5 mg · once daily</div>
          <div style={{ fontSize: 14, color: COLORS.textSecondary, marginTop: 3 }}>1 tablet, once daily · for hypertension</div>
          <div style={{ marginTop: 10 }}>
            <ProvenanceTag kind="document" />
          </div>
          <div style={{ fontSize: 12.5, color: COLORS.textTertiary, marginTop: 8, lineHeight: 1.4 }}>Copied by Bitbit from your prescription · checked by you on Sep 26, 2026</div>
        </Card>
      </div>
      <div style={{ position: 'absolute', top: 318, left: 20, right: 20, opacity: original, transform: `translateY(${mix(original, 12, 0)}px)` }}>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
          <div style={{ width: 62, height: 84, borderRadius: 6, overflow: 'hidden', opacity: thumb, transform: `translateY(${mix(thumb, -18, 0)}px)`, border: `1px solid ${COLORS.neutral200}` }}>
            <PrescriptionPaper scale={62 / 560} shadow={false} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.blue600 }}>View original prescription</div>
            <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 3 }}>Riverside Clinic · Aug 12, 2026</div>
          </div>
          <Icon name="paperclip" size={20} color={COLORS.textTertiary} />
        </Card>
      </div>
      <div style={{ position: 'absolute', top: 432, left: 20, right: 20, opacity: scale, transform: `translateY(${mix(scale, 12, 0)}px)` }}>
        <Card style={{ padding: 16 }}>
          <div style={{ fontSize: 16, fontWeight: 800 }}>How sure is this?</div>
          <div style={{ position: 'relative', marginTop: 12 }}>
            <div
              style={{
                position: 'absolute',
                left: -6,
                right: -6,
                top: mix(marker, 0, rowH),
                height: rowH - 4,
                borderRadius: 14,
                background: COLORS.blue100,
                border: `1.5px solid ${COLORS.blue500}`,
              }}
            />
            {PROVENANCE_ORDER.map((k) => (
              <div key={k} style={{ position: 'relative', height: rowH, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 6 }}>
                <ProvenanceTag kind={k} />
                <div style={{ fontSize: 12.5, color: COLORS.textSecondary, marginTop: 4 }}>{SCALE_ROWS[k]}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 8 }}>Show it at your next visit to have it reviewed.</div>
        </Card>
      </div>
    </>
  );
};
