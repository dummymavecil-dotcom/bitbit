import { Button } from '@bitbit/ui';

const row = { display: 'flex', flexWrap: 'wrap' as const, gap: 12, alignItems: 'center' };

export const Primary = () => (
  <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <Button size="lg" block>Start sharing</Button>
    <Button variant="secondary" icon="printer" block>Print one-page summary</Button>
  </div>
);

export const Variants = () => (
  <div style={row}>
    <Button>Add to my medicines</Button>
    <Button variant="secondary">Retake</Button>
    <Button variant="danger">Revoke access now</Button>
  </div>
);

export const States = () => (
  <div style={row}>
    <Button state="pressed">Pressed</Button>
    <Button state="focused">Focused</Button>
    <Button disabled>Disabled</Button>
    <Button variant="danger" state="pressed">Revoke</Button>
  </div>
);
