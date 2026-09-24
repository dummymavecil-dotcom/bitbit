import { RecordRow } from '@bitbit/ui';

export const LabResults = () => (
  <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <RecordRow month="Mar" year="2026" name="HbA1c" detail="6.8% · ref. below 5.7%" source="Verified · San Roque Health Center lab" verified />
    <RecordRow month="Aug" year="2025" name="Creatinine" detail="0.9 mg/dL · ref. 0.6–1.1" source="Verified · Rizal District Hospital" verified />
  </div>
);

export const SelfInput = () => (
  <div style={{ width: 350 }}>
    <RecordRow month="Sep" year="2026" name="Metformin 500 mg" detail="1 tablet, 2× a day with meals" source="From reseta scan · Dr. Paolo Santos" verified={false} />
  </div>
);
