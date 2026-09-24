import { CategoryTile } from '@bitbit/ui';

export const Grid = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <CategoryTile tone="cyan" icon="vitals" title="Clinical vitals" detail="BP 138/88 · HR 78" count={5} href="#vitals" />
    <CategoryTile icon="pill" title="Medication" detail="Losartan, Metformin" count={2} href="#medication" />
    <CategoryTile icon="stethoscope" title="Conditions" detail="Hypertension, Type 2 diabetes" count={4} href="#conditions" />
    <CategoryTile tone="cyan" icon="flask" title="Lab results" detail="HbA1c 6.8% · Mar 2026" count={6} href="#labs" />
  </div>
);

export const States = () => (
  <div style={{ width: 350, display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
    <CategoryTile icon="syringe" title="Immunization" detail="Flu shot · Apr 2026" count={4} state="pressed" />
    <CategoryTile icon="clipboard" title="Procedures" detail="Nothing added yet" disabled />
  </div>
);
