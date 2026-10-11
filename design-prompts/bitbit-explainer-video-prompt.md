# Remotion prompt: Bitbit explainer video

Build a new composition `BitbitExplainer` in `video/` (`npm run new -- BitbitExplainer`), then
replace the template. 1920×1080, 30 fps. Parts 1–2 run about 70 s; Parts 3 (Prepare) and 4 (Share)
come later, so structure the file as one `TransitionSeries` per part.

Read `video/CLAUDE.md` first. Timings in seconds via `sec()`, sizes × `useScale()`.
**Do not reuse `Background` (gradient blobs) or the `blur` in `enterStyle`/`AnimatedText`** for this
video: the brand book bans gradients and effects. Pass `blur={0}` or add a no-blur variant.

## Assets (already in `video/public/images/`)

- `logo/bitbit-wordmark-blue.png`, `logo/bitbit-mark-blue.png`: official logo, blue-500, transparent.
- `screens/01-login.png` … `16-shared-scheduled.png`: real app screens, 780×1688 (2× of 390×844).

Logo rules: never redraw, recolour, stretch or add effects. On blue grounds use the **white
variant**: same file rendered white (it is single-ink, so the shape is identical). Never blue on blue.

## Look and feel

- **Title and end cards:** flat blue-600 `#0070d9` field, white logo, white type. A thin
  blue-300 `#b8dbff` frame inset ~48px with 45° cut corners and small notches mid-edge
  (build as `CutFrame` in `src/components/`).
- **Body, "multi-screen app promo" style:** a slightly tilted (≈ −8°) grid of panels that the camera
  glides across. Two panel types alternate:
  - flat blue-600 squares with large white Inter 800 text (one short phrase);
  - neutral-50 `#f4f7fb` panels holding a phone (`PhoneFrame` component: 390×844 screen, radius 48,
    1px `#e3e9f2` bezel, one soft shadow; no fake status bar).
  The camera centres the panel for the current line; neighbours stay visible at reduced opacity.
- **Backgrounds are flat colour only.** No gradients, textures, patterns, photos or blur.
- **Motion:** smooth and calm; nothing bounces or overshoots. Animate only opacity, transform and colour.
  Enter with `EASE.enter` (0.16, 1, 0.3, 1); exits are faster than entrances (`EASE.exit`).
  Camera moves use `EASE.inOut` over 0.8–1.2 s. The tap-to-share pulse is the only loop.
  The Allergies card never animates on its own; it arrives with its screen.
- **Type:** Inter only (bundled). On-screen text is a short phrase per beat, never the full narration.
  English first; Filipino as a smaller grey second line where the app has one. No emoji.
- **Tags: exactly three, always word + icon + border, always these names** (never "Verified",
  "Self-input", "Reviewed" or "Reported", even though some screenshots use the short forms):
  | Tag | Meaning | Style |
  |---|---|---|
  | **Patient-reported** | Marco entered it from memory | yellow-100 `#fff6cc` fill, yellow-700 `#6b5400` text, pencil icon, 1px **dashed** `#a07f00` border |
  | **Document-sourced** | Copied from a scanned paper; original attached | cyan-100 `#dcfbfa` fill, cyan-700 `#00706e` text, file icon, 1px solid `#00706e` border |
  | **Provider-reviewed** | Entered or reviewed by a provider | blue-100 `#e5f2ff` fill, blue-700 `#005bb5` text, check-circle icon, 1px solid `#0084ff` border |
  They form one "How sure is this?" scale, in this order: Patient-reported → Document-sourced →
  Provider-reviewed. Build one `ProvenanceTag kind="patient" | "document" | "provider"` component
  and use it everywhere, including on top of screenshots where a short form needs covering.
- **Colour jobs:** blue = actions/trust, cyan = scanning/success/document-sourced,
  yellow = patient-reported only, pink = allergies only. White text only on `#0070d9` or darker.
- **Audio:** calm music bed now; leave an `<Audio>` slot for narration. Put each line's start time
  in `timing.ts` as `CUES` so text can be re-timed to the voice-over in one place.

## Screens: static vs rebuilt

Use the PNGs inside `PhoneFrame` for static shots. Rebuild in React (matching the screenshot
exactly) only where something on the screen has to move: typing, a tag changing, fields filling,
lines drawing. Rebuilt screens: **Add to my history** (line 7–8), **Scan** (10), **Check what Bitbit
copied** (11, no screenshot exists, design it to match), **Amlodipine detail** (12), **Records
timeline with visit links** (14).

Avoid placeholder text on screen: `05-profile` shows `[PHONE]`, `07-scan-prescription` shows
`Lic. [LIC. NO.]`, `15-shared-waiting` shows `[CLINIC HOURS]`. Crop those out or rebuild the area.

## Part 1: Collect (≈ 39 s)

| # | Narration | On screen | s |
|---|---|---|---|
| 1 | "Bitbit. Your health history, in your hands." | Title card. White wordmark fades up 24px; tagline follows word by word. `CutFrame` traces in. | 4 |
| 2 | "Intake that takes 30 minutes, done in 30 seconds." | Blue panel: "30 min" counts down to "30 sec" (tabular figures); clock icon beside it. | 4 |
| 3 | "Bitbit turns a scattered medical history into one a nurse can read at a glance." | Loose paper cards (reseta, lab slip, receipt) slide together and settle into a phone showing `02-home`. | 5 |
| 4 | "It does three things: collect, prepare, share. Here's how they work for Marco." | Three blue panels in a row: **Collect · Prepare · Share** (icons: scan, clipboard, contactless). Then Marco's health card from `02-home` slides forward: *Marco Dela Cruz · 32 yrs · Male · Antipolo City*. | 5 |
| 5 | "It starts with the history he already has…" | Collect panel stays lit; the other two dim. | 3 |
| 6 | "…brought together into one record he holds." | Phone pans to `03-records-timeline`: "Records / Mga record ni Marco". | 4 |
| 7 | "What Marco knows, he adds himself: allergies, medicines, family history." | Rebuilt `06-add-to-history`. The chips **Allergy**, **Medication**, **Family history** highlight in time with the words. Entries type in: *Shrimp · lip swelling*, *Father: hypertension · diagnosed at 45*, *Mother: type 2 diabetes · diagnosed at 50*. | 6 |
| 8 | "These stay marked Patient-reported until a provider reviews it." | Each entry gets **Patient-reported**. Cut to the Allergies card: *Penicillin · hives, itching* shows **Provider-reviewed** beside *Shrimp* still **Patient-reported**, to show both states side by side. | 5 |
| 9 | "Then come the papers he's been carrying." | Camera drifts to a small stack of papers beside the phone: prescription on top. | 3 |

## Part 2: Collect, scanned papers (≈ 30 s)

| # | Narration | On screen | s |
|---|---|---|---|
| 10 | "He scans them instead of typing it all again." | Rebuilt `07-scan-prescription` (dark navy). The Riverside Clinic prescription slides into frame; cyan corners close in; shutter press scales to 0.98 and back. | 4 |
| 11 | "Bitbit's AI copies only what's written and sorts it into fields. Marco checks each one before it's saved." | Split view: the paper on the left, a "Check what Bitbit copied" form on the right. Each handwritten value highlights, then its field fills: **Medicine** Amlodipine 5 mg · **How to take** 1 tab once daily · **Reason written** for hypertension · **Prescriber** Dr. J. Santos · **Clinic** Riverside Clinic · **Date** Aug 12, 2026. A check appears beside each field in turn; then **Save**. Show the line "It doesn't diagnose or fill gaps." | 6 |
| 12 | "The original stays attached, so every fact keeps its source." | Amlodipine detail: **Document-sourced** tag; source line *Copied by Bitbit from your prescription · checked by you on Sep 26, 2026*; a thumbnail of the paper pinned to the card with "View original prescription". Below it, the "How sure is this?" scale with all three tags, the marker resting on Document-sourced. | 5 |
| 13 | "Prescriptions, lab results, discharge summaries: the same scan brings them all in." | Scan chips cycle **Prescription → Lab result → Discharge summary**; three papers pass the scanner, each faster than the last, and land as Document-sourced rows: *Amlodipine 5 mg · Aug 12, 2026*, *CBC + lipid panel · May 04, 2026*, *Discharge summary · Rizal District Hospital · Mar 05, 2024*. | 6 |
| 14 | "Each record connects to the visit it came from." | Records timeline: lines draw from each record to its visit node, newest first: *Sep 18, 2026 · Rizal District Hospital triage (BP 136/86 · HR 76)*, *Aug 12, 2026 · Riverside Clinic consult*, *May 04, 2026 · Riverside Clinic lab*, *Mar 03–05, 2024 · Rizal District Hospital admission*. | 5 |
| 15 | "Who. What. Where. When." | Four blue panels land one per word, each paired with the Amlodipine record's field: **Who** Dr. J. Santos · **What** Amlodipine 5 mg, 1 tab once daily · **Where** Riverside Clinic · **When** Aug 12, 2026. Hold 1 s, then lead into Part 3 (Prepare). | 4 |

## Facts to keep consistent

Marco Dela Cruz, 32, male, BPO agent (night shift), Antipolo City, Rizal. Blood type O+.
PhilSys-linked. Allergies: Penicillin (hives, itching), Provider-reviewed; Shrimp (lip swelling),
Patient-reported. Medication: Amlodipine 5 mg once daily, from Riverside Clinic prescription
by Dr. J. Santos, Aug 12, 2026, Document-sourced. Condition: hypertension since 2024,
Provider-reviewed. Family history: father hypertension (45), mother type 2 diabetes (50),
Patient-reported. Hospital: Rizal District Hospital, triage nurse J. Mendoza, Dr. A. Ramos.

Created for this video (fictional, consistent with the app):

- **Discharge summary** · Rizal District Hospital · admitted Mar 03, 2024, discharged Mar 05, 2024 ·
  attending Dr. A. Ramos · reason for admission written as *Hypertensive urgency, BP 180/110 on
  arrival* · discharge diagnosis *Hypertension* · discharged on *Losartan 50 mg, 1 tab once daily* ·
  follow-up at OPD in 2 weeks. Document-sourced. This is where "hypertension since 2024" and the
  Losartan (later stopped Feb 21, 2026, then Amlodipine from Aug 12, 2026) come from.
- **Lab result** · Riverside Clinic laboratory · collected May 04, 2026 · requested by Dr. J. Santos ·
  *CBC + lipid panel*. Document-sourced. If values appear, show them as facts with reference
  ranges only, e.g. *LDL cholesterol · 3.9 mmol/L · ref. below 3.4*; never "High" or "Normal".

## Done when

- `npm run typecheck && npm run lint` pass.
- Stills at the midpoint of every line look right (check text fits, tags readable, no placeholders).
- `npx remotion render BitbitExplainer out/bitbit-explainer.mp4` succeeds.
