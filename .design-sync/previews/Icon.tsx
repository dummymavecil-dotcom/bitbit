import { Icon } from '@bitbit/ui';

const names = ['home', 'folder', 'eye', 'user', 'bell', 'alert', 'verified', 'pencil', 'contactless', 'scan', 'vitals', 'pill', 'syringe', 'flask', 'stethoscope', 'clipboard', 'printer', 'fileDown', 'shield', 'clock'] as const;

export const Set = () => (
  <div style={{ width: 360, display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 12, color: 'var(--text-primary)' }}>
    {names.map((n) => (
      <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <Icon name={n} size={22} />
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{n}</span>
      </div>
    ))}
  </div>
);

export const InDiscs = () => (
  <div style={{ display: 'flex', gap: 12 }}>
    {([['vitals', 'var(--error)'], ['pill', 'var(--success)'], ['stethoscope', 'var(--color-primary-action)'], ['flask', 'var(--warning)']] as const).map(([n, c]) => (
      <span key={n} style={{ width: 36, height: 36, borderRadius: 9999, background: 'var(--surface-sunken)', color: c, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={n} size={18} />
      </span>
    ))}
  </div>
);
