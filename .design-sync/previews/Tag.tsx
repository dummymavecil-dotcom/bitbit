import { Tag } from '@bitbit/ui';

export const Provenance = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
    <Tag kind="provider" />
    <Tag kind="document" />
    <Tag kind="patient" />
  </div>
);

export const OnAllergyRows = () => (
  <div style={{ width: 320, display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 20, background: 'var(--error-bg)' }}>
    {([['Penicillin', 'Hives, itching', 'provider'], ['Shrimp', 'Lip swelling', 'patient']] as const).map(([n, r, k]) => (
      <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--surface)', borderRadius: 16, padding: '10px 12px' }}>
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>{n}</span>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{r}</span>
        </div>
        <Tag kind={k} />
      </div>
    ))}
  </div>
);
