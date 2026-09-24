import { Card, Tag, Button } from '@bitbit/ui';

export const HealthCard = () => (
  <Card variant="brand" style={{ width: 350 }}>
    <span className="bb-card-eyebrow">Bitbit health card</span>
    <span style={{ fontSize: 28, lineHeight: '34px', fontWeight: 700, letterSpacing: '-0.02em' }}>Maria Dela Cruz</span>
    <span className="bb-card-sub">42 yrs · Female · Blood type O+</span>
  </Card>
);

export const Allergy = () => (
  <Card variant="allergy" href="#allergies" style={{ width: 350 }}>
    <span className="bb-card-title">Allergies</span>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', borderRadius: 16, padding: '10px 12px' }}>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }}>Penicillin</span>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Hives, itching</span>
      </span>
      <Tag kind="verified" />
    </div>
  </Card>
);

export const ActiveAccess = () => (
  <Card variant="active" style={{ width: 350 }}>
    <span className="bb-card-eyebrow" style={{ color: 'var(--info)' }}>Active now · ends 6:00 PM</span>
    <span className="bb-card-title">Rizal District Hospital</span>
    <span className="bb-card-sub">Triage desk · Nurse J. Mendoza</span>
    <Button variant="danger" block>Revoke access</Button>
  </Card>
);

export const Surface = () => (
  <Card href="#summary" style={{ width: 350 }}>
    <span className="bb-card-title">Your one-page summary</span>
    <span className="bb-card-sub">Works with no signal or battery</span>
  </Card>
);
