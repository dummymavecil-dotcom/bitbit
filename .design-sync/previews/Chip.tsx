import { Chip } from '@bitbit/ui';

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 8, maxWidth: 380 };

export const CategoryFilters = () => (
  <div style={row}>
    <Chip>Allergies</Chip>
    <Chip>Clinical vitals</Chip>
    <Chip selected>Lab results</Chip>
    <Chip>Medication</Chip>
  </div>
);

export const AccessDuration = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
    <Chip variant="choice" selected>This visit</Chip>
    <Chip variant="choice">24 hours</Chip>
    <Chip variant="choice">7 days</Chip>
  </div>
);

export const ShareSections = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
    <Chip variant="toggle" selected>Allergies</Chip>
    <Chip variant="toggle" selected>Medication</Chip>
    <Chip variant="toggle" selected>Conditions</Chip>
    <Chip variant="toggle">Lab results</Chip>
    <Chip variant="toggle">Procedures</Chip>
    <Chip variant="toggle" disabled>Immunization</Chip>
  </div>
);
