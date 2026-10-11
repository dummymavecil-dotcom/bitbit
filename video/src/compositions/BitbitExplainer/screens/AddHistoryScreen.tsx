import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { ProvenanceTag } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, progress, sec } from '../../../utils';
import { Card, Chip, IconTile, Overline, ScreenHeader } from './ui';

type Entry = { icon: 'alert' | 'user'; tone: 'pink' | 'neutral'; title: string; detail: string; at: number };

/**
 * "Add to my history", rebuilt so it can move. Times are seconds from the start of this screen.
 * chipTimes: when Allergy, Medication and Family history get selected (in time with the narration).
 * tagsAt: when the Patient-reported tags land on the entries.
 */
export const AddHistoryScreen: React.FC<{ chipTimes: [number, number, number]; entries?: Entry[]; tagsAt: number }> = ({
  chipTimes,
  tagsAt,
  entries = [
    { icon: 'alert', tone: 'pink', title: 'Allergy: Shrimp', detail: 'Lip swelling', at: chipTimes[0] + 0.1 },
    { icon: 'user', tone: 'neutral', title: 'Father: hypertension', detail: 'Diagnosed at 45', at: chipTimes[2] + 0.1 },
    { icon: 'user', tone: 'neutral', title: 'Mother: type 2 diabetes', detail: 'Diagnosed at 50', at: chipTimes[2] + 0.75 },
  ],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  // Which chip is selected: 0 Allergy, 1 Medication, 2 Family history.
  const sel = (i: number) => {
    const on = progress(frame, sec(chipTimes[i], fps), sec(0.14, fps), EASE.standard);
    const off = i < 2 ? progress(frame, sec(chipTimes[i + 1], fps), sec(0.14, fps), EASE.standard) : 0;
    return Math.max(0, on - off);
  };
  const shown = entries.filter((e) => t >= e.at - 0.05).length;
  return (
    <>
      <ScreenHeader title="Add to my history" subtitle="Idagdag sa kasaysayan mo" icon="close" />
      <div style={{ position: 'absolute', top: 124, left: 20, right: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        <Chip label="Family history" selected={sel(2)} />
        <Chip label="Allergy" selected={sel(0)} />
        <Chip label="Condition" />
        <Chip label="Medication" selected={sel(1)} />
        <Chip label="Surgery or admission" />
      </div>
      <Overline style={{ position: 'absolute', top: 236, left: 20 }}>Added by you · {shown}</Overline>
      <div style={{ position: 'absolute', top: 262, left: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {entries.map((e, i) => {
          const appear = progress(frame, sec(e.at, fps), sec(0.45, fps), EASE.enter);
          const typed = progress(frame, sec(e.at, fps), sec(0.55, fps), EASE.linear);
          const tag = progress(frame, sec(tagsAt + i * 0.3, fps), sec(0.35, fps), EASE.enter);
          return (
            <div key={e.title} style={{ opacity: appear, transform: `translateY(${(1 - appear) * 14}px)` }}>
              <Card style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 72, border: e.tone === 'pink' ? `1px solid ${COLORS.pink300}` : undefined }}>
                <IconTile icon={e.icon} tone={e.tone} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.25 }}>{e.title.slice(0, Math.round(e.title.length * typed))}</div>
                  <div style={{ fontSize: 13, color: COLORS.textTertiary, marginTop: 2, opacity: typed }}>{e.detail}</div>
                </div>
                <div style={{ opacity: tag, transform: `scale(${0.92 + 0.08 * tag})`, transformOrigin: 'right center' }}>
                  <ProvenanceTag kind="patient" />
                </div>
              </Card>
            </div>
          );
        })}
      </div>
      <div
        style={{
          position: 'absolute',
          top: 540,
          left: 20,
          right: 20,
          opacity: interpolate(t, [tagsAt + 1.1, tagsAt + 1.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
        }}
      >
        <Card style={{ background: COLORS.neutral100, border: 'none', fontSize: 13.5, lineHeight: 1.45, color: COLORS.textSecondary }}>
          You reported this today. A provider can mark it <b style={{ color: COLORS.ink }}>Provider-reviewed</b> at your next visit.
        </Card>
      </div>
    </>
  );
};
