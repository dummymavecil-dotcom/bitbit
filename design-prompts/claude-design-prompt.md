# Claude Design prompt: Bitbit

Paste everything below the line into Claude Design. If the Bitbit design system is connected to your Claude Design project, keep the first paragraph; if not, the token list further down is enough to rebuild the look.

---

Design a mobile app called **Bitbit**: a personal health record that the patient owns and carries, so a triage desk starts from facts instead of questions. Use the Bitbit design system and its real components (Button, QuickAction, IconButton, Chip, SegmentedControl, Tag, Card, CategoryTile, RecordRow, Icon) wherever they fit. Build every screen at 390 × 844 (phones scroll; make boards taller when content needs it). No fake status bar.

## Who it's for

**Marco Dela Cruz**, 32, male, BPO agent in Antipolo City, Rizal. He works night shifts; every hour he spends at a hospital is an hour of lost pay. Today he rebuilds his medical history from memory at every new facility. Bitbit turns the papers he already carries (prescriptions, lab results, discharge summaries) into a record he controls, so intake takes 30 seconds instead of 30 minutes.

Use this data everywhere, consistently:
- Blood type O+, PhilSys-linked, Bitbit ID BB-0421.
- Allergies: **Penicillin** (hives, itching) — Provider-reviewed; **Shrimp** (lip swelling) — Patient-reported.
- Medication: **Amlodipine 5 mg**, 1 tablet once daily, current, prescribed Aug 12, 2026 at Riverside Clinic by Dr. J. Santos — Document-sourced. **Losartan 50 mg**, stopped Feb 21, 2026 at Rizal District Hospital — Provider-reviewed.
- Conditions: Hypertension since 2024 — Provider-reviewed. Admitted for acute gastroenteritis Jan 14–16, 2026, Rizal District Hospital — Document-sourced (from discharge summary).
- Vitals: BP 136/86 and HR 76 on Sep 18, 2026 (Rizal District Hospital triage) — Provider-reviewed. Weight 72 kg — Patient-reported.
- Labs (May 4, 2026, Lakeview Diagnostic Center) — Document-sourced: total cholesterol 5.6 mmol/L (ref. below 5.2), LDL 3.6 (below 2.6), HDL 1.1 (above 1.0), triglycerides 1.9 (below 1.7), hemoglobin 14.6 g/dL (13.5–17.5). Creatinine 1.0 mg/dL on Sep 18, 2026 — Provider-reviewed.
- Family history: father hypertension (diagnosed at 45), mother type 2 diabetes (at 50) — Patient-reported.
- Emergency contact: Ana Dela Cruz (wife), phone `[PHONE]`.
- Use placeholders like `[LIC. NO.]` and `[PHONE]` for anything not listed. Don't invent statistics.

## The three source tags (the core idea)

Every record shows exactly one tag: the highest level it has reached. The original source stays attached either way.

| Tag | Meaning | Look |
| --- | --- | --- |
| **Provider-reviewed** | Entered or confirmed by a provider | blue: `#e5f2ff` fill, `#005bb5` text, check-circle icon, 1px solid `#0084ff` border |
| **Document-sourced** | Copied from a scanned paper; original attached | cyan: `#dcfbfa` fill, `#00504f` text, document icon, 1px solid `#009996` border |
| **Patient-reported** | Entered by the patient from memory | yellow: `#fff6cc` fill, `#6b5400` text, pencil icon, 1px **dashed** `#a07f00` border |

- AI extraction and the patient's own check are **not** extra badges. Write them in a source line: "Copied by Bitbit from your prescription · checked by you, Sep 26".
- If Marco edits a copied value after saving, it becomes Patient-reported, with the original still attached.

## Look and feel

- Clean, rounded, calm. Off-white ground `#f4f7fb`, white cards with a 1px `#e3e9f2` hairline (no drop shadows on cards), generous radius (20–28px), Inter for everything.
- Colour jobs are exclusive: blue `#0084ff` brand / `#0070d9` actions (white text only on `#0070d9` or darker), cyan `#01dfdc` scanning and success, yellow `#fdd101` patient-reported only, pink `#fd8fb9` allergies and destructive actions only.
- Text `#0b1b33`, secondary `#4a5a73`, tertiary `#5e6b80`. Control borders `#7c8aa0`. Focus ring: 2px white gap then 2px `#0070d9`.
- English first; Filipino as a smaller second line ("Records" / "Mga record ni Marco", "Scan a record" / "I-scan ang papel").
- Facts, never advice: show values with reference ranges, no "High", "Normal" or tips. Every target at least 44px. Allergies are always first and pink.
- Motion: smooth and calm, no bounce. Press scales to 0.98 over 80ms; content enters with a fade and 8px rise over 320ms (`cubic-bezier(0.16, 1, 0.3, 1)`); respect reduced motion.

## Screens to design

Bottom tab bar on main screens: Home · Records · (raised Share button with the Bitbit mark) · Access · Profile.

1. **Home** — Greeting "Magandang umaga, Marco" and a bell with an unread dot. Blue health card: name, "32 yrs · Male · Antipolo City", PhilSys-linked pill, three stat chips (Blood type O+, Reviewed 3 of 8, Updated Sep 18). Pink Allergies card with both allergies and their tags. Two quick actions: **Tap to share** (Ibahagi) and **Scan a record** (I-scan ang papel). "My records" grid of category tiles in blue and cyan only: Clinical vitals, Medication, Conditions, Lab results, Immunization, Procedures.
2. **Records** — "Timeline | By category" switch. **Timeline view (My health timeline):** filter chips All / Visits / Medications / Results / Allergies; known allergies pinned on top; a vertical timeline, newest first, each entry with date, what happened, where, its tag and a "View prescription / results / summary" link (Sep 25 family history added; Sep 18 hypertension follow-up; Aug 12 Amlodipine prescribed; May 04 CBC + lipid panel; Feb 21 Losartan stopped; Jan 14 gastroenteritis admission); a "+" button and a "Have older papers? Scan them" card. **By category view:** category chips (8 incl. Family history), a source filter All / Reviewed / Document / Reported, a year select, and record rows with date badge, value, source line and tag.
3. **Add to my history** — Type chips: Family history / Allergy / Condition / Medication / Surgery or admission. Family history list (father, mother) tagged Patient-reported. Form: relative chips (Father, Mother, Sibling, Grandparent, Child, Other), condition, optional age at diagnosis, "Save to my history". Note: "You reported this today. A provider can mark it Provider-reviewed at your next visit." Link: "Have it on paper? Scan it instead."
4. **Scan a record** — Dark camera screen. Document type chips: Prescription / Lab result / Discharge summary / Other visit record. Viewfinder with cyan corner brackets over a handwritten Riverside Clinic prescription (Amlodipine 5 mg, 1 tablet once daily for hypertension, Dr. J. Santos). Shutter, upload-photo-or-PDF button, and an AI note: "Bitbit's AI copies only what is written. It doesn't diagnose or fill gaps. You check everything before it's saved." After capture: a reading state ("Found 1 medicine · found clinic, doctor and date · 1 field is hard to read") and "Review what we found".
5. **Review extracted information** — Source card (prescription thumbnail, Riverside Clinic · Aug 12, 2026, "Original" button). Banner: "Please review before saving." Fields with edit pencils: Medication, Strength, Instructions, Reason written ("for hypertension", copied as written, not a diagnosis), Prescribed, Doctor (flagged yellow: "Signature hard to read. Is this right?" with "Looks right"), Facility. Document-sourced tag preview. Buttons: Edit / **Save to my history**.
6. **Medication detail** — Amlodipine 5 mg, 1 tablet once daily, Current, Document-sourced, source line "Copied by Bitbit from your prescription · checked by you on Sep 26, 2026". Big "View original prescription". A "How sure is this?" scale showing Patient-reported → **Document-sourced** (current) → Provider-reviewed, with "Show it at your next visit." Where it came from (source, facility, prescriber, dates, reason written), history, and Mark as stopped / Edit, with the note that editing a copied value makes it Patient-reported.
7. **Tap to share** — Tap (NFC) / QR code switch with a pulsing tap target; toggle chips for the 8 sections (Allergies, Medication, Conditions, Clinical vitals on by default); access duration This visit / 24 hours / 7 days; "Every read is logged. You can revoke any time."; "Start sharing" then a confirmation ("Shared with Rizal District Hospital · Triage desk · Nurse J. Mendoza", access end time, Revoke).
8. **Access log** — Active access card with Revoke; timeline of reads, shares, provider additions ("Added blood pressure 136/86 · Provider-reviewed") and prints; a one-page-summary card with Print.
9. **Emergency access** — "When you can't answer" (Kapag hindi ka makasagot). Master switch with a live summary ("Hospital ERs can see 6 of 9 sections for 6 hours"). How it works in 3 steps. What responders can see: strongly recommended (Allergies, Current medication, Blood type, Conditions; turning one off asks for confirmation) and optional (Past admissions and surgeries, Latest vitals, Immunization, Lab results, Family history); hide specific entries. Who can open it, how long, emergency contact Ana with notify / can-end switches, lock-screen QR and wallet-card print, a responder note ("I take amlodipine 5 mg daily for high blood pressure. I work night shifts."), preview and history.
10. **Printed one-page summary (A4, black-and-white safe)** and **wallet card (3.375 × 2.125 in, front and back)** — Allergies first in a heavy-bordered box; medicines, conditions, vitals, labs, immunization, procedures; marks ✓ Reviewed (solid border), ▤ Document (double border), ✎ Reported (dashed border); QR to the live record; nothing smaller than 12px.

11. **Prepare for a visit** (6 steps, progress bar; starts from a Home card "Prepare for a visit" / Maghanda sa pagbisita; the raised Share button and Home's Tap to share start at step 5):
    1. *Tell Bitbit what you're feeling*: free text in his own words ("Masakit dibdib ko since this morning at medyo nahihilo ako."), Speak instead, "This will be saved as Patient-reported".
    2. *A few quick questions*: his quote on top; When (This morning), Where (Chest), How would you describe it (chips: Pressure / heaviness, Sharp, Burning, Dull ache, Other), Anything else ("Medyo nahihilo rin ako."). Note: "These answers describe what you're experiencing. They are not a diagnosis."
    3. *Why I'm seeking care*: chief complaint Chest discomfort; started, location, feels like, also reported dizziness; original words attached; Patient-reported, "not yet reviewed by a provider"; Edit my answers.
    4. *Suggested to bring*: complaint, both allergies, Amlodipine, hypertension, CBC + lipid panel, last visit (Rizal District Hospital, Sep 18), each with its tag; "Nothing has been shared yet."
    5. *Before you share*: lock card "Your record is yours. Nothing is shared automatically."; What / Who (confirmed when you tap the desk reader) / How long; Choose what to share / Not now.
    6. *What do you want to share?*: per-item checklist (7 ticked; family history, Losartan and other results unticked), "7 items selected · Select all", Continue to share. Unticking an allergy asks first: "Share without this allergy?" Keep sharing it / Don't share.
    - Steps 1-3 always show one fixed safety line (not decided by AI), in pink (`#ffe8f1` fill, `#a3164f` border and heading): "Severe pain or trouble breathing? Go to the nearest ER or call 911 now."
    - Keep these screens short: one heading per step, a slim header with "n of 6" and the progress bar, no Filipino second lines.
    - Tap to share no longer has its own section picker: it shows a "What they can see · 7 items · Change" card that goes back to step 6.

Optional provider side (landscape tablet 1280 × 800 at a triage desk): triage queue with a tap-to-receive target; patient summary with allergies first and unshared sections shown as locked, not hidden; full record with a "tests already done" lab table; visit notes where a nurse marks Marco's Document-sourced and Patient-reported entries as **Reviewed**; a facility overview with a staff access log.
