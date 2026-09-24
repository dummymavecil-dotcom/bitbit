import { IconButton } from '@bitbit/ui';

export const OnLight = () => (
  <div style={{ display: 'flex', gap: 12, padding: 12, background: 'var(--bg)' }}>
    <IconButton icon="bell" label="Access alerts, 1 new" dot />
    <IconButton icon="search" label="Search records" />
    <IconButton icon="chevronLeft" label="Back to home" />
    <IconButton icon="search" label="Search records" state="focused" />
  </div>
);

export const OnCamera = () => (
  <div style={{ display: 'flex', gap: 12, padding: 16, borderRadius: 20, background: 'var(--surface-inverse)' }}>
    <IconButton variant="inverse" icon="close" label="Close scanner" />
    <IconButton variant="inverse" icon="scan" label="Retake photo" />
  </div>
);
