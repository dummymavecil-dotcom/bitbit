import { QuickAction } from '@bitbit/ui';

export const Pair = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <QuickAction icon="contactless" title="Tap to share" subtitle="Ibahagi" />
    <QuickAction tone="secondary" icon="scan" title="Scan reseta" subtitle="Add a medicine" />
  </div>
);

export const States = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <QuickAction icon="contactless" title="Tap to share" subtitle="Pressed" state="pressed" />
    <QuickAction tone="secondary" icon="scan" title="Scan reseta" subtitle="Focused" state="focused" />
  </div>
);
