# Claude Design prompt: Bitbit · Prepare for a visit

Paste everything below the line into Claude Design. It stands on its own; if the Bitbit design system is connected, Claude Design will also use its components.

---

Design a 7-screen mobile flow called **Prepare for a visit** for **Bitbit**, a health record the patient owns and carries. Build each screen at 390 × 844 (make a board taller only when content needs it). Use the Bitbit design system components (Button, Chip, Tag, Card, Icon) where they fit. No fake status bar. Make it interactive where noted.

**The idea:** before a hospital visit, Marco says what he's feeling in his own words, Bitbit organizes it, suggests what parts of his record to bring, and **Marco decides** what gets shared. Nothing leaves until he says so. After sharing, the hospital can send him a future appointment he can add to his calendar.

**Patient:** Marco Dela Cruz, 32, BPO agent, Antipolo City. Today is Sep 29, 2026, 8:42 AM. Hospital: Rizal District Hospital, triage nurse J. Mendoza.

**Source tags (one per record, pill-shaped, 12px bold, icon + label):**
- **Provider-reviewed**: fill `#e5f2ff`, text `#005bb5`, 1px solid `#0084ff`, check-circle icon.
- **Document-sourced**: fill `#dcfbfa`, text `#00504f`, 1px solid `#009996`, document icon.
- **Patient-reported**: fill `#fff6cc`, text `#6b5400`, 1px **dashed** `#a07f00`, pencil icon.

**Look:** Inter; background `#f4f7fb`; white cards, 1px `#e3e9f2` border, 20–24px radius, no shadows; text `#0b1b33` / `#4a5a73` / `#5e6b80`; primary buttons `#0070d9` with white text, 56px tall, 20px radius, arrow icon; control borders `#7c8aa0`; targets at least 44px. Pink (`#ffe8f1` fill, `#a3164f` border/text) is only for allergies, safety and destructive actions. Keep every screen short: one heading, no explanatory paragraphs, no second-language subtitles. Motion: fade + 8px rise over 320ms `cubic-bezier(0.16, 1, 0.3, 1)`; respect reduced motion.

**Shared header (steps 1–6):** round back button, "Prepare for a visit" (17px bold), "n of 6" on the right, then a 6-segment progress bar (filled `#0070d9`, empty `#c8d3e3`).

**Safety line (steps 1–3 and the end screen):** a fixed pink card, never decided by AI: phone icon in a `#a3164f` circle, "**Severe pain or trouble breathing?** Go to the nearest ER or call **911** now."

## Screens

1. **What's bothering you today?** Subtitle "Your own words are fine." A large text box filled with "Masakit dibdib ko since this morning at medyo nahihilo ako." and a 60/500 counter. A dashed **Speak instead** button with a mic icon. Safety line. "Saved as [Patient-reported]". Button: **Continue**.

2. **A few quick questions.** His words in a grey quote box labelled "Your words". A card with four numbered questions:
   - **When did it start?** A working dropdown. Tapping it opens a two-column list under the field: Just now, Earlier today, This morning (selected), Last night, Yesterday, 2 to 3 days ago, About a week ago, **Other…**.
   - **Where do you feel it?** Same dropdown: Chest (selected), Head, Stomach, Back, Arm or shoulder, Throat, All over, **Other…**.
   - **How would you describe it?** Chips: Pressure / heaviness (selected, filled blue), Sharp, Burning, Dull ache, Other.
   - **Anything else?** A text field: "Medyo nahihilo rin ako."
   - Picking **Other…** in a dropdown or the Other chip reveals a text field ("Type where you feel it", "Describe it in your own words").
   - Yellow dashed note: "Your answers, **not a diagnosis.**" Safety line. Button: **Review my answers**.

3. **Why I'm seeking care.** One card: "CHIEF COMPLAINT" / **Chest discomfort** (22px), rows Started: This morning · Location: Chest · Feels like: Pressure / heaviness · Also reported: Dizziness, his original words quoted, then [Patient-reported] and "From Marco · Sep 29, 2026 · 8:42 AM". Safety line. Buttons: **Choose what to bring** and a secondary **Edit my answers**.

4. **Suggested to bring.** Subtitle "From your Bitbit record." A list of cards, each with an icon tile, an uppercase label, the value, its tag and a date:
   - Why I'm seeking care: Chest discomfort + dizziness [Patient-reported], Today · 8:42 AM
   - Known allergy: Penicillin · hives [Provider-reviewed] (pink icon tile)
   - Known allergy: Shrimp · lip swelling [Patient-reported] (pink icon tile)
   - Current medication: Amlodipine 5 mg · once daily [Document-sourced], Aug 12, 2026
   - Known condition: Hypertension · since 2024 [Provider-reviewed]
   - Recent result: CBC + lipid panel [Document-sourced], May 04, 2026
   - Last visit: Rizal District Hospital · follow-up [Provider-reviewed], Sep 18, 2026
   - Grey status box: "**Nothing has been shared yet.**" Button: **Review what to share**.

5. **Before you share.** Centered card: blue lock circle, "**Your record is yours.**", "Nothing is shared automatically." Card with three tappable rows: **What** · Pick the items; **Who** · Confirmed at the desk reader; **How long** · This visit only. Buttons: **Choose what to share** and secondary **Not now**.

6. **What do you want to share?** Subtitle "Suggested for this visit." An interactive checklist of the 7 items above (checked) plus three unchecked: Family history (Father: hypertension · Mother: type 2 diabetes) [Patient-reported]; Previous medication: Losartan 50 mg [Provider-reviewed], Stopped Feb 21, 2026; Other results: Creatinine, ECG + 1 more, 3 records. Checked rows get a light blue fill and blue border. **Unchecking an allergy** opens an inline pink confirm: "**Share without this allergy?** The clinic may give you something you react to." with **Keep sharing it** / **Don't share**. A sticky footer: "7 items selected" (live count) · **Select all**, and **Continue to share**.

7. **You're all set** (end screen, no progress bar; header "You're all set" with a close X). Add a dashed wireframe-only toggle **Preview: Waiting / Scheduled**.
   - Cyan check circle, "**Shared with Rizal District Hospital**", "Triage desk · Nurse J. Mendoza · 8:51 AM". A card: "7 items · this visit only / Access ends today, 6:00 PM · View".
   - **Waiting:** clock icon, "**Waiting for your schedule**", "We'll notify you once Rizal District Hospital gives you an appointment." A **Notify me** switch (on). Footer line: "**No update yet?** Ask the triage desk, or walk in at the OPD during clinic hours ([CLINIC HOURS])."
   - **Scheduled:** blue-bordered card, "YOUR APPOINTMENT" + [Provider-reviewed]. Calendar tile OCT / 06, "**Tue · 9:00 AM**", "Internal Medicine OPD · Room 4", "Rizal District Hospital · Dr. A. Ramos". Big **Add to calendar** button that becomes a cyan "✓ Added to your calendar". "Remind me": 1 hour before / 1 day before (1 day selected). Links: Get directions · On your timeline. Small note: "Bring your Bitbit QR and any new papers. Can't make it? You can still walk in at the OPD."
   - Safety line. Bottom row: **Revoke access** (pink outline) and **Back to home**.

**Also show** (optional, one extra board): the Records timeline with an **Upcoming** section on top: a blue-bordered card with the OCT 06 tile, "Internal Medicine appointment", "9:00 AM · Room 4 · Dr. A. Ramos", [Provider-reviewed], "In your calendar".

**Entry points:** a Home card "Prepare for a visit" starts at screen 1. The tab bar's raised Share button and Home's "Tap to share" start at screen 5.
