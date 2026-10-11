# Remotion prompt: Bitbit TGIC pitch video (full)

Build the full TGIC video pitch for **Bitbit**, Team 4, from the script in
*Bitbit TGIC Entry, Team 04* (one narration line per slide, slides 3–78). It extends the explainer
already in `video/src/compositions/BitbitExplainer` (Collect) into the whole pitch: the problem,
the reveal, Collect, Prepare, Share, the business model, scale and impact, and the close.

Read `video/CLAUDE.md` and `design-prompts/bitbit-explainer-video-prompt.md` first. Reuse every
scene, screen and component that already exists; this prompt only adds what's missing.

- **Composition:** `BitbitPitch`, 1920 × 1080, 30 fps, about 5 min 35 s at the timings below.
  Also register each part as its own composition (`BitbitPitch-P1` … `-P8`) for fast preview;
  all of them read from one `timing.ts`, so the parts and the full video never drift apart.
- **Narration:** three voices (Mavi, Melo, Gab) recorded as one track per part
  (`public/audio/pitch-p1.mp3` … `p8.mp3`), or one full track. Until then, the `seconds` below are
  estimates at 2.5 words per second; replace each with the recorded length and everything re-times.
- **Captions:** an optional burned-in caption track (prop `captions: boolean`), off by default.

---

## 1. One look for the whole video

The style is the one already built for the explainer (`shots/common.tsx`), which follows the
BitbitIntro sample:

- **Straight, full-screen scenes.** No tilt, no camera moves across a canvas.
- **Transitions:**
  - Inside a part: `slide({direction: 'from-right'})` with the calm spring, or `fade()`, both 0.7 s.
  - Between parts: `slide({direction: 'from-bottom'})`, 0.9 s.
  - Nothing else: no wipes, flips, zooms or blur transitions.
- **Text:** headlines reveal line by line (`LeftStatement`, `AnimatedText by="line"`), taglines
  word by word. Kicker in blue-600 capitals above the headline. Inter only. No blur on text.
- **Shapes:** circles, rounded squares and rings spring in with `PopShape` and drift slowly
  (`Shapes`, `phoneShapes()`). Blues and cyan only. 3–4 per scene, never over content.
- **Phone:** `RightPhone` (scale 1.1, right half), headline on the left half. Real screenshots
  from `public/images/screens/` where nothing on the screen moves; rebuilt React screens where it does.
- **Brand cards:** `BrandCard` (blue-600, white official wordmark, `CutFrame`) for the reveal, the
  "AI-integrated system" beat and the close.

### Brand rules (brand book, Sept 2026)

- **Flat colour only.** No gradients, glass, glow, textures, patterns, photography or blur. The
  deck's photo collages and purple glass are *not* carried into the video.
- **Logo:** only the official files in `public/images/logo/`. White variant on blue-600, blue on
  light grounds. Never blue on blue.
  - The deck's later slides (51–71) use a different, rounded lowercase "bitbit" lockup. Do not copy it.
- **Colour jobs:**
  - Blue: actions and trust.
  - Cyan: scanning, success and Document-sourced.
  - Yellow: Patient-reported only.
  - Pink: allergies and destructive actions only.
  - Pink and yellow never decorate. The deck's yellow tape highlights become white or blue-300 here.
  - White text only on blue-600 (#0070d9) or darker.
- **Three provenance tags:** **Patient-reported**, **Document-sourced** and **Provider-reviewed**,
  always word + icon + border (`ProvenanceTag`).
  - Never "Verified", "Self-input", "Reviewed" or "Reported". Cover short forms in screenshots.
- **Facts, never advice:** values with units and references, no "High" or "Normal".
- **Typography:** English first; Filipino as a smaller grey second line where the app has one. No emoji.
- **Motion:** smooth and calm, nothing bounces or overshoots.
  - Animate only opacity, transform and colour.
  - Exits are faster than entrances.
  - The tap-to-share pulse is the only loop.
  - The Allergies card never animates on its own.

### Two worlds, one switch

Part 1 (the problem) is the **"before" world**:
- **Colours:** ink `#0b1b33` backgrounds, paper `#fbf9f4` documents, white and blue-300 type.
- **Motion:** slightly heavier, things pile up.
- **Brand:** no brand blue fills.

Line 14 is the **switch**. The papers line up into one neat card and the background colour
animates from ink to neutral-50 over 1.2 s, ending light. Line 15 then fades into the blue
`BrandCard`. From there on, everything is the light and blue "after" world.

### What ties the parts together (do all of these)

1. **The timer.** One `Timer` component (mm:ss, tabular figures, clock icon) appears at every
   "30 minutes" beat:
   - Counts up 00:00 → 30:00 in Part 1 (lines 4, 8).
   - Counts down 30:00 → 00:30 at the reveal (16), at Share (47), in impact (69) and at the very end (74).
   - Same position, size and type every time.
2. **Desk Zero.** One `DeskZeroSign` (dark sign, white letters, a row of arrows: Registration,
   Triage, Consultation, Pharmacy) and one `QueueTicket` ("NOW SERVING 087") recur:
   - Part 1: the queue (lines 2, 9).
   - Part 5: the same sign, now with the share reader (42).
   - Part 8: the close (72–73).
   - Line 46: the sign's subtitle flips from "Start from zero" to "Start from here".
3. **Marco.** Always represented by his app avatar: the cyan "MD" initials circle and the Home
   health card crop. Never a photo or a drawn character.
   - The same health-card crop opens Collect (18), returns in Prepare (33) and closes the video (72).
4. **The papers.** The envelope of papers from Part 1 (line 3) is the same set of papers that is
   scanned in Collect (Rx from Riverside Clinic, CBC + lipid panel, discharge summary).
   Use `PrescriptionPaper`, `LabPaper` and `DischargePaper` everywhere.
5. **Chapter bar.** During Parts 3–5, a small persistent bar top-left reads
   `Collect · Prepare · Share`, with the current one in blue-600 and the others in neutral-450.
   - Render it *outside* the `TransitionSeries` so it stays still while scenes slide underneath.
   - It fades in at line 19 and out at line 48. The active word changes colour (0.3 s) at each part change.
6. **Phone continuity.** When two consecutive lines both show the phone, don't transition the
   scene. Keep one scene with the phone fixed and cross-fade only the screen inside it (0.4 s),
   while the left headline changes.
   - Lines 38–41 are one scene with four screens.
   - Lines 34–36 are one scene.
   - Line 30 continues the visits scene.

### Smoothness rules

- **Entrances:** 0.4–0.8 s with `EASE.enter`. **Exits:** 0.2–0.35 s with `EASE.exit`.
- **Stagger:** 0.08–0.16 s between items in a group. Never more than three things entering at once.
- **Holds:** every line holds at least 1 s fully settled before the next transition starts.
- **Count-ups:** `CountUp` with tabular figures, 0.8–1.4 s, `EASE.standard`. Numbers land
  before the narrator says them, not after.
- **Lists:**
  - Screens with lists reveal top-to-bottom, either with a clip mask on the screenshot
    (`ScreenReveal`, new) or row by row on rebuilt screens.
  - Nothing pops in mid-list out of order.
- **Lines between items:** connector lines draw with `evolvePath`, 0.4–0.6 s each; the dot appears
  at the start of the line.
- **Shapes:** at most one shape layer per scene. When the next scene has the same shapes, keep
  them still: skip the pop and start them already settled.

---

## 2. The script, by part

**Narration:** the team's lines, lightly edited for grammar and timing (changes listed in
section 4).
**On screen:** what the viewer sees. On-screen text is a short phrase, never the full narration.
**s:** estimated seconds.
Slide numbers point to the deck slide each beat comes from.

### Part 1: The problem at Desk Zero (≈ 71 s, ink "before" world)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 1 | Mavi | Meet Marco. He's sick. He's missing work. He just wants to get checked. | Ink stage. "Meet Marco." 120px white. His cyan MD avatar and "32 · BPO agent, night shift · Antipolo City". Three outline chips land on the words: *Sick* · *Missing work* · *Wants to get checked*. (s3) | 5.5 |
| 2 | Mavi | But the lines are long. Philippine hospitals typically run at two to three times their capacity. | `DeskZeroSign` slides in from the top. A row of 14 user icons fills left to right. `QueueTicket` "NOW SERVING 087". Big "2–3×" count-up with "hospitals running over capacity". (s4) | 7.0 |
| 3 | Mavi | It doesn't help that a Filipino's medical history usually looks like this. | A flat envelope tips. Prescription, lab result, discharge summary and two `MiniPaper`s spill out and settle at different angles (≤ 6°). "It arrives like this." (s5) | 5.5 |
| 4 | Melo | This begins a needlessly long, manual reconstruction of his medical history. | `Timer` top-right starts 00:00 and counts up. White question cards stack in one by one: *Allergies?* *Past illnesses?* *Maintenance meds?* *Family history?* "Memory is the database." (s6) | 5.0 |
| 5 | Mavi | He's done the tests. But some past results end up missing. | `LabPaper` large. Three of its rows fade to dashed empty boxes. "Past results don't arrive ready to use." Timer keeps running. (s7) | 5.0 |
| 6 | Melo | Some answers are already recorded. Just at another clinic. | Two place cards: *Riverside Clinic* and *This desk*, joined by a dashed line that breaks with a white × in the middle. "The record stayed behind." (s8) | 4.0 |
| 7 | Melo | Another facility. Another format. Another piece of his story. | Three different papers drop in, one per phrase. "It isn't missing. It's scattered." (s9) | 4.0 |
| 8 | Gab | Thirty minutes. That's how long rebuilding a history can take. | `Timer` centre-screen, large: runs 00:00 → 30:00 in 2 s and holds. "Rebuilding one history." (s10) | 4.5 |
| 9 | Mavi | Thirty minutes for Marco. Then the next patient. And the next. | Queue: the ticket steps 087 → 088 → 089 on "next" and "next". The user-icon row shifts one place each time, and the timer resets to 30:00 each time. (s11) | 5.0 |
| 10 | Melo | Thirty minutes putting together information that already exists. | Four labels flip in left to right, each with a one-line caption: **Memory** *(what Marco remembers)* · **Silos** *(the record doesn't move)* · **Past results** *(not ready to use)* · **Fragmentation** *(different formats)*. (s12) | 3.5 |
| 11 | Mavi | Across 400 patients, that's up to 200 hours lost, for patients and hospitals. | Equation builds term by term with count-ups: **400** *patients through Desk Zero* × **30** *minutes* = **200** *hours lost*. (s13) | 5.5 |
| 12 | Mavi | That's equal to 300+ more patients they could have served every day. | "300+" count-up, 200px. "more patients they could serve every day". The icon row from line 2 doubles. (s14) | 5.5 |
| 13 | Melo | All because of an outdated, manual process of history taking. | The papers pile up again, untidy. "An outdated, manual process." (s15) | 4.5 |
| 14 | Melo | So much time and capacity could be saved if his history were ready to read. | **The switch.** The papers straighten and slide into one clean stack, then into one white card titled "Ready to read". The background animates ink → neutral-50. (s16–17) | 6.5 |

### Part 2: Introducing Bitbit (≈ 17.5 s)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 15 | Melo | Introducing Bitbit. Your health history, in your hands. | Fade to `BrandCard` (existing `TitleScene`). (s18) | 3.5 |
| 16 | Melo | An app that turns 30 minutes into 30 seconds, | Existing `TimerScene` with the labels from s50: **30:00** *from retelling* → **00:30** *to ready-to-read*. | 4.0 |
| 17 | Melo | where we turn medical history into something ready to read. | Existing `GlanceScene`: papers gather into the phone (02-home). (s20) | 4.5 |
| 18 | Mavi | Bitbit does three things: collect, prepare, share. Here's how they work for Marco. | Existing `PillarsScene`: three blue cards, then Marco's health card. (s21) | 5.5 |

### Part 3: Collect (≈ 58.5 s, chapter bar: **Collect**)

Lines 19–29 are already built (`shots/Part1.tsx`, `shots/Part2.tsx`). Re-time them to the
seconds below and add 30–32.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 19 | Mavi | We start with the history he already has, | Existing pillars-scene "Collect" emphasis (others dim). (s22) | 3.5 |
| 20 | Mavi | and bring it into one patient-held record. | Existing `RecordScene` (03-records-timeline). (s23) | 3.5 |
| 21 | Mavi | What Marco knows, he adds himself: allergies, medicines, family history. | Existing `AddsScene`. (s24) | 4.5 |
| 22 | Gab | What he adds stays Patient-reported until a provider reviews it. | Existing `ReportedScene`. (s25) | 5.0 |
| 23 | Mavi | Then come the papers he's been carrying. | Existing `PapersScene`. These are the same papers from line 3. (s26) | 3.5 |
| 24 | Mavi | He scans them, instead of typing everything again. | Existing `ScanScene`. (s27) | 3.5 |
| 25 | Gab | AI copies what's written and sorts it into fields. Marco checks it before saving. | Existing `CheckScene`. (s28) | 6.0 |
| 26 | Gab | The original document stays attached. Every fact keeps its source. | Existing `SourceScene`. (s29) | 4.5 |
| 27 | Mavi | Prescriptions, lab results, discharge summaries: the same scan brings them together. | Existing `BatchScene`. (s30) | 5.0 |
| 28 | Mavi | Each record connects to the visit it came from. | Existing `VisitsScene`. (s31) | 4.0 |
| 29 | Melo | Who. What. Where. When. | Existing `WwwwScene`. (s32) | 2.5 |
| 30 | Melo | Over time, those records become a history. | **New.** Light stage, phone right: a rebuilt "My health timeline" screen scrolls slowly upward (translateY only) through 2024 → 2026 rows, using the four visits from line 28 plus Family history (Sep 25, 2026). Left: "Not just a profile. A history." (s33) | 3.5 |
| 31 | Gab | Providers can review information during care, strengthening the record. | **New** `ProviderView` (flat monitor frame, white screen, Bitbit provider header). Row "Known condition · Hypertension · since 2024" changes **Document-sourced → Provider-reviewed** (tag cross-fade 0.3 s), then the source line types in: *Reviewed by Dr. A. Ramos · Rizal District Hospital · Sep 18, 2026*. Shrimp stays Patient-reported in every scene, because the Prepare screens still show it that way. Left: "The record gets better with every visit." (s34) | 4.0 |
| 32 | Gab | Every fact comes from one of three sources, so it can be verified. | Three cards rise in order (s35):<br>**01 Patient-reported**: Family history · From Marco · Sep 25, 2026.<br>**02 Document-sourced**: Amlodipine 5 mg · From his prescription · Riverside Clinic · Aug 12, 2026.<br>**03 Provider-reviewed**: Hypertension · Dr. A. Ramos · Rizal District Hospital · Sep 18, 2026.<br>Caption: "You don't just see the information. You see why you can trust it." | 5.5 |

### Part 4: Prepare (≈ 41.5 s, chapter bar: **Prepare**)

Screens: `09`–`14` in `public/images/screens/`. Rebuild 09, 10 and 14 so they can move; use 11,
12 and 13 as screenshots with `ScreenReveal`.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 33 | Mavi | So when Marco feels sick, | Phone right with 02-home. The "Not feeling well? Prepare for a visit" card gets a blue-500 1.5px ring and a press (scale 0.98, 80 ms). Left: "Then one morning, Marco doesn't feel right." (s36) | 2.5 |
| 34 | Mavi | all he has to do is open the app and type what he's feeling. | **Same scene**, screen cross-fades to rebuilt 09. The text box types *"Masakit dibdib ko since this morning at medyo nahihilo ako."* at reading pace; the counter climbs to 59/500; **Patient-reported** lands under it. The pink 911 card is there from the start and does not animate. Left: "No medical language required." (s37) | 6.0 |
| 35 | Gab | Bitbit asks follow-up questions to organize his words, not to diagnose him, | **Same scene**, rebuilt 10: answers fill one by one: *This morning*, *Chest*, **Pressure / heaviness** (chip selects), *Medyo nahihilo rin ako.* The yellow "Your answers, not a diagnosis." note is visible throughout. Left: "A few questions. Not a diagnosis." (s38) | 5.5 |
| 36 | Gab | and turns them into a ready-to-read chief complaint, built for triage. | **Same scene**, 11 with `ScreenReveal`: the Chief complaint card resolves top to bottom. Left: "His words, ready to read." (s39) | 5.5 |
| 37 | Melo | Bitbit also brings forward existing records that may help in this visit. | Fade to new scene, phone right: 12 with `ScreenReveal` row by row (0.14 s stagger). Left: "Today's complaint doesn't arrive alone." (s40) | 5.5 |
| 38 | Melo | But to protect his privacy, Marco decides | Phone scene **A**: 13 "Your record is yours." The lock disc springs in. Left: "Nothing leaves until Marco says so." (s41) | 3.5 |
| 39 | Melo | which of his records he's willing to share. | **Scene A**, 14 (rebuilt), all suggested items checked. Left: "His record. His decision." (s42) | 3.5 |
| 40 | Mavi | He checks what he wants, and unchecks what he doesn't. | **Scene A**, 14: scroll down 0.6 s; tick **Family history** (8 selected); leave **Previous medication: Losartan** and **Other results** unticked; the footer count animates 7 → 8. Never untick an allergy. Left: "Check it. Uncheck it." (s43) | 4.5 |
| 41 | Mavi | Then he sees exactly what will travel, and what stays private. | **Scene A**, new rebuilt screen "Review before sharing": **Will be shared · 8** (compact rows with their tags) and **Stays private · 2** (Losartan, Other results, each with a lock icon). Footer: *This visit only · Access ends today, 6:00 PM*. Left: "No blanket access. One clear packet." (s44) | 5.0 |

### Part 5: Share (≈ 29.5 s, chapter bar: **Share**)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 42 | Mavi | Once ready, he presents it at the hospital, | Light stage. `DeskZeroSign` top-left and a flat desk reader (rounded rect with the contactless icon). The phone (02-home, "Tap to share") moves toward the reader. `PulseRings` play (the only loop). A cyan check disc lands. Left: "Same Desk Zero. No envelope." (s45) | 3.5 |
| 43 | Melo | or one day, shares it directly with partner Bitbit hospitals. | Phone right: 16-shared-scheduled, top half only. "Shared with Rizal District Hospital · 7 items · this visit only" resolves. Left: "Or straight to a partner hospital." (s46) | 4.5 |
| 44 | Gab | The clinic receives the packet he chose, not his entire history. | `ProviderView` (from line 31), header *Marco Dela Cruz · Shared by tap · 8:51 AM · Access ends 6:00 PM*. 8 rows arrive top to bottom. Left: "The packet he chose. Not his whole history." (s47) | 5.0 |
| 45 | Gab | Each item arrives with its source, date and review status. | Same `ProviderView`, a light highlight band moves row by row over the source, date and tag columns. Left: "Every fact arrives with its source." (s48) | 4.5 |
| 46 | Mavi | No new patient has to start from zero. | `DeskZeroSign` large. Its subtitle cross-fades *Start from zero* → *Start from here*. (s49, s62) | 3.5 |
| 47 | Melo | Hospitals turn 30 minutes into just 30 seconds, | `Timer` 30:00 → 00:30. Caption: "29.5 minutes of history-rebuilding given back to care." (s50) | 3.5 |
| 48 | Melo | saving each hospital 197 hours, enough to serve 250+ more patients. | Two count-ups side by side: **197** *hours saved every day* · **250+** *more patients every day*. Chapter bar fades out. (s51) | 5.0 |

### Part 6: How Bitbit makes money (≈ 46.5 s)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 49 | Gab | The beauty of Bitbit is that it makes the whole healthcare system work better. | `Ecosystem`: the Bitbit mark (blue, on light) in a white disc at the centre. Five node cards spring in around it, and a line draws from each to the centre: **Providers** · **Health plans + insurers** · **Employers** · **LGUs + public programs** · **Enterprise partners**. Marco's card sits below. (s52, s56) | 6.0 |
| 50 | Gab | We earn from the players who benefit, while charging the patient zero. | Marco's card grows centre-stage: **Marco pays ₱0.** Under it: "The patient is the user. The ecosystem is the customer." (s53, s57) | 5.5 |
| 51 | Gab | Providers can expand their capacity by joining the Bitbit ecosystem. | The Providers node opens into a card: **₱500K** *per integration / deployment*. Includes: provider view · workflow setup · training · integration support. "The hospital gets time back." (s54) | 4.5 |
| 52 | Gab | Insurers get a new way to reach patients, through controlled ads and offers. | The Health plans node opens: **Sponsored access** · **Member discovery** (patients choose to explore coverage). Lock row: "Health information is never sold for advertising." (s55) | 5.5 |
| 53 | Gab | Employers, LGUs and other partners can plug in too. | The remaining three nodes light up in turn (blue-100 → blue-600 fill, colour animation). (s56) | 4.0 |
| 54 | Mavi | So Marco gets the app free, with full control over his data. | Marco's card with ₱0 and a lock card: "Your data. Your choice." (s57) | 5.5 |
| 55 | Melo | All powered by an AI-integrated system. | `BrandCard` variant with the line "All powered by an AI-integrated system." under the wordmark. (s58) | 3.5 |
| 56 | Gab | AI organizes. Providers review. Patients decide what travels. | Four step cards in a row, each lighting as it's named (Sources prove lights with Providers review): **01 AI organizes** · **02 Sources prove** · **03 Providers review** · **04 Patients decide what travels**. Footer: "AI assists. Humans stay in control." (s60) | 3.5 |
| 57 | Melo | Three sources. One patient-held history. | Flow: the three source chips (Marco · his papers · his providers) → phone → selected packet → Desk Zero. A small blue dot travels the path (0.8 s per hop). (s61) | 3.0 |
| 58 | Gab | It gives hospitals instant value, and opens a huge opportunity for integration. | Two levels side by side: **Level 1 · Pilot now** (patient-held record + provider view and share packet) → **Level 2 · Interoperate later** (standards and APIs where available). Footer: "From *start from zero* to *start from here*." (s62) | 5.5 |

### Part 7: Scale and impact (≈ 53.5 s)

All figures are the deck's illustrative model. Add a small footnote line where the deck has one.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 59 | Melo | Marco is just one of millions of Filipinos we can help. | Marco's MD avatar centre. It shrinks while hundreds of initials circles (blue-100, blue-200, cyan-100; deterministic `random()`) fill the frame around it. "We started with one Marco." (s63) | 5.0 |
| 60 | Gab | If we build Bitbit on top of the national ID system, | A generic ID card shape (not a copy of the real PhilSys card) with the app's **PhilSys-linked** pill. "The identity rail already exists." (s64) | 5.0 |
| 61 | Gab | with over 97 million enrolled, | **97M** count-up. "Filipinos already enrolled in PhilSys." (s65) | 2.5 |
| 62 | Melo | and reach just 1 in 10 Filipinos, | Ten user icons, one turns blue-600. "Just 1 in 10." (s66) | 3.5 |
| 63 | Mavi | that's 9.7 million people helped. | **9.7M** count-up. "people helped." (s67) | 2.5 |
| 64 | Gab | To get there, we'll scale from 1 hospital to 50 in our first year, | Roadmap, four steps lighting in turn, with a hospital counter 1 → 50:<br>**01 Build + baseline** (months 0–3) · **02 Pilot** (3–6) · **03 Prove** (6–9) · **04 Scale** (9–12).<br>"Don't scale the assumption. Scale the proof." (s68) | 6.0 |
| 65 | Gab | generating over ₱187 million in revenue in year one. | Four revenue cards build, then sum (s69):<br>Sponsored access 7.0M × ₱20 = **₱140M**<br>Provider platform 50 × ₱500K = **₱25M**<br>Implementation 25 × ₱500K = **₱12.5M**<br>Enterprise 5 × ₱2M = **₱10M**<br>→ **₱187.5M** *illustrative year-1 revenue*. | 4.0 |
| 66 | Gab | By year three, we aim to reach over 60 million people and generate over ₱1.8 billion. | Flat bar chart (blue-600 bars, no gradient) with values above each bar: **₱187.5M** Y1 · **₱650M** Y2 · **₱1.8B+** Y3. People row: 9.7M → 25M → 60M+. (s70) | 7.0 |
| 67 | Mavi | Then expand to countries like Thailand and Vietnam. | Three country chips joined by drawn arcs: **Philippines · Prove** → **Thailand · Adapt** → **Vietnam · Expand**. No map image. "The patient moves. Their history should too." (s71) | 3.5 |
| 68 | Mavi | But more than the 9.7 million, | 9.7M shrinks to the left. (s72) | 3.0 |
| 69 | Gab | it's the time and capacity we can give back. | `Timer` 30:00 → 00:30 beside it. "29.5 minutes potentially returned per visit." (s73) | 4.0 |
| 70 | Mavi | In year one alone, | Equation: **9.7M** encounters × **29.5** minutes = (s74) | 2.5 |
| 71 | Melo | that's over 4.7 million hours that could go back to care. | … **4.7M+ hours** count-up. "Time that can go back to care." Footnote: *Illustrative maximum scenario: 9.7M Bitbit-assisted encounters, 30-minute baseline, 30-second target; to be validated in the pilot.* (s75) | 5.0 |

### Part 8: Close (≈ 17 s)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 72 | Melo | Getting sick already takes time from us. Getting care shouldn't take more than it needs to. | Light stage, quiet: `DeskZeroSign` and Marco's health card. Two lines reveal slowly (0.25 s stagger). No shapes. (s76) | 7.0 |
| 73 | Melo | Bitbit. Your health history, in your hands. So the next desk can start from here, | `BrandCard` with a footer line "So the next desk can start from here." (s77) | 6.5 |
| 74 | Melo | and turn 30 minutes into 30 seconds. | `Timer` lands under the tagline: 30:00 → 00:30. Hold 2 s on the card, then music fades out. (s78) | 3.5 |

---

## 3. Facts to keep consistent

- **Patient:** Marco Dela Cruz, 32, male, BPO agent on night shift, Antipolo City, Rizal. Blood type O+. PhilSys-linked.
- **Allergies:** Penicillin (hives, itching), Provider-reviewed; Shrimp (lip swelling), Patient-reported in every scene.
- **Medication:** Amlodipine 5 mg once daily, from a Riverside Clinic prescription by Dr. J. Santos, Aug 12, 2026, Document-sourced.
- **Condition:** hypertension since 2024 (from the discharge summary), Provider-reviewed by Dr. A. Ramos at the Sep 18, 2026 triage visit.
- **Family history:** father hypertension (45), mother type 2 diabetes (50), Patient-reported.
- **Lab:** CBC + lipid panel, Riverside Clinic laboratory, May 04, 2026.
- **Discharge summary:** Rizal District Hospital, Mar 03–05, 2024.
- **Hospital:** Rizal District Hospital; triage nurse J. Mendoza; Dr. A. Ramos.
- **Visit:** Sep 29, 2026, shared 8:51 AM, access ends 6:00 PM.
- **Numbers:**
  - Problem: 400 patients × 30 min = 200 hours; 300+ patients.
  - Solution: 197 hours saved; 250+ more patients; 29.5 minutes per visit.
  - Business: ₱500K per integration.
  - Scale: 97M PhilSys; 9.7M people; 1 → 50 hospitals.
  - Revenue: ₱187.5M (Y1), ₱650M (Y2), ₱1.8B+ (Y3); people 9.7M → 25M → 60M+.
  - Impact: 4.7M+ hours.

## 4. Edits made to the script (for the team to approve)

- **Grammar and typos:**
  - "it's current capacity" → "their capacity"; "thier" → "their"; "ecosytem" → "ecosystem".
  - "opporunity" → "opportunity"; "but 1 of the million of filipinos" → "one of millions of Filipinos".
  - "turn 30 minutes to 30 seconds" → "into".
- **Repeated slide builds:** the duplicate lines (s16–17, s58–59) and the repeated "Thirty minutes
  for Marco…" (s13) are merged. s13 now carries the 200-hours sum instead.
- **Provenance names:** "Self-input stays patient-reported" → "What he adds stays Patient-reported"
  (the three tag names only).
- **AI wording:** "AI extracts and structures" → "AI copies what's written and sorts it into
  fields", which matches the app's own promise.
- **Revenue:** "180M+" → "over ₱187 million", which matches the slide's ₱187.5M.

## 5. Build plan

```
src/compositions/BitbitPitch/
  timing.ts          SCRIPT (all 74 lines: part, speaker, narration, seconds), SCENES, PARTS
  BitbitPitch.tsx    TransitionSeries over all scenes + ChapterBar overlay + audio per part
  parts.tsx          BitbitPitch-P1..P8 compositions (slices of the same SCENES)
  scenes/
    p1-problem.tsx   lines 1–14 (ink stage)
    p2-reveal.tsx    15–18 (reuse TitleScene, TimerScene, GlanceScene, PillarsScene)
    p3-collect.tsx   19–32 (reuse explainer scenes + 3 new)
    p4-prepare.tsx   33–41
    p5-share.tsx     42–48
    p6-business.tsx  49–58
    p7-scale.tsx     59–71
    p8-close.tsx     72–74
  screens/           PrepareFeeling (09), PrepareQuestions (10), PrepareShare (14),
                     ReviewBeforeShare (new), HealthTimeline (new)
```

- **Move the reusable explainer pieces into `src/components/`** so both compositions share one copy.
  Pieces: `Stage`, `LeftStatement`, `Shapes`, `RightPhone`, `BrandCard`, `Enter`, the `screens/`
  folder.
- **New shared components:**
  - `Timer`, `DeskZeroSign`, `QueueTicket` and `PeopleRow` (user icons; `active` count animates).
  - `ScreenReveal` (top-to-bottom clip of a screenshot).
  - `ProviderView` (flat monitor frame + provider screen).
  - `Ecosystem` (centre + nodes + drawn links), `FlowPath` (a dot travelling a drawn path) and
    `BarChart` (flat bars, labelled values, no axis clutter).
  - `ChapterBar`.
- **`Stage` tone:** add `tone="ink"` (ink background, white type) for Part 1. Also allow animating
  between tones (background colour only) for line 14.
- **Timing:** keep the explainer's rule that each scene still starts on its cue.
  - Scene length = (next scene start − this start) + the transition into the next scene.
  - Part changes use the 0.9 s transition.
- **Audio:**
  - Music bed: extend `explainer-bed.mp3` to about 6 min, or loop it with a crossfade at a bar line.
  - Duck the music to 0.3 under narration and back up between parts.
  - One `<Audio>` per narration part inside a `<Sequence from={partStart}>`.

## 6. Done when

- `npm run typecheck && npm run lint` pass.
- A still at the settled moment of every line (74 stills, half size) has been checked:
  - Text fits and nothing overlaps.
  - The three tag names are correct everywhere.
  - No placeholder text from the screenshots is visible.
  - No pink or yellow is used as decoration.
- Three frames inside every transition have been checked: nothing jumps, no element appears in two places.
- `npx remotion render BitbitPitch out/bitbit-pitch.mp4` succeeds. Spot-check the final file at
  every part change.
