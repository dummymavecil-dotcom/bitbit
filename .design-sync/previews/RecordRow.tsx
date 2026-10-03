import { RecordRow } from '@bitbit/ui';

export const Medication = () => (
  <div style={{ width: 350, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <RecordRow month="Aug" year="2026" name="Amlodipine 5 mg" detail="1 tablet once daily" source="Copied from prescription · Riverside Clinic, Dr. J. Santos" provenance="document" />
    <RecordRow month="Feb" year="2026" name="Losartan 50 mg · stopped" detail="Stopped Feb 21, 2026 at review" source="Reviewed · Rizal District Hospital" provenance="provider" />
  </div>
);

export const PatientReported = () => (
  <div style={{ width: 350 }}>
    <RecordRow month="Sep" year="2026" name="Father: hypertension" detail="Diagnosed at 45" source="Added by you · Sep 25, 2026" provenance="patient" />
  </div>
);
