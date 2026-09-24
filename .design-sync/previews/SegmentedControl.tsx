import { useState } from 'react';
import { SegmentedControl } from '@bitbit/ui';

export const Source = () => {
  const [v, setV] = useState('All');
  return <div style={{ width: 320 }}><SegmentedControl label="Source" options={['All', 'Verified', 'Self-input']} value={v} onChange={setV} /></div>;
};

export const ShareMethod = () => (
  <div style={{ width: 320 }}>
    <SegmentedControl label="Share method" options={['Tap (NFC)', 'QR code']} value="Tap (NFC)" focusedValue="QR code" />
  </div>
);

export const Disabled = () => (
  <div style={{ width: 320 }}>
    <SegmentedControl label="Source" options={['All', 'Verified', 'Self-input']} value="All" disabled />
  </div>
);
