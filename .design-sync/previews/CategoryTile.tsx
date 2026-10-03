import { CategoryTile } from '@bitbit/ui';

export const Grid = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <CategoryTile tone="cyan" icon="vitals" title="Clinical vitals" detail="BP 136/86 · HR 76" count={4} href="#vitals" />
    <CategoryTile icon="pill" title="Medication" detail="Amlodipine 5 mg" count={1} href="#medication" />
    <CategoryTile icon="stethoscope" title="Conditions" detail="Hypertension, Jan 2026 admission" count={2} href="#conditions" />
    <CategoryTile tone="cyan" icon="flask" title="Lab results" detail="CBC + lipid panel · May 2026" count={6} href="#labs" />
  </div>
);

export const States = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <CategoryTile icon="syringe" title="Immunization" detail="Flu shot · Apr 2026" count={4} state="pressed" />
    <CategoryTile icon="clipboard" title="Procedures" detail="Nothing added yet" disabled />
  </div>
);
