# Remotion prompt: Bitbit TGIC pitch video (full, under 5 minutes)

Build the full TGIC video pitch for **Bitbit**, Team 4, from the script in
*Bitbit TGIC Entry, Team 04* (one narration line per slide, slides 3–78). The script below is
trimmed to **56 lines, about 4 min 50 s**. It extends the explainer already in
`video/src/compositions/BitbitExplainer` (Collect) into the whole pitch: the problem, the reveal,
Collect, Prepare, Share, the business model, scale and impact, and the close.

Read `video/CLAUDE.md` and `design-prompts/bitbit-explainer-video-prompt.md` first. Reuse every
scene, screen and component that already exists; this prompt only adds what's missing. Where this
prompt and the explainer prompt disagree on a fact, **this prompt wins** (see section 3).

- **Composition:** `BitbitPitch`, 1920 × 1080, 30 fps. **Hard limit: under 5:00 including the end
  card.**
  - Also register each part as its own composition (`BitbitPitch-P1` … `-P8`) for fast preview.
  - All of them read from one `timing.ts`, so the parts and the full video never drift apart.
- **Narration:** three voices (Mavi, Melo, Gab), one track per part
  (`public/audio/pitch-p1.mp3` … `p8.mp3`) or one full track.
  - Until it's recorded, the `seconds` below are estimates at a careful 2.5 words per second.
  - Replace each with the recorded length and everything re-times.
  - A natural pitch pace is usually faster, so the recorded cut will likely land near 4:30.
- **If the recording runs over 4:55,** cut in this order:
  1. Line 51 (Thailand and Vietnam), shown as on-screen text only.
  2. Line 45 (instant value).
  3. Line 34 (partner hospitals).
  4. Line 12 (ready to read).
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
- **Text:** headlines reveal line by line (`LeftStatement`, `AnimatedText by="line"`), taglines word
  by word. Kicker in blue-600 capitals above the headline. Inter only. No blur on text.
- **Shapes:** circles, rounded squares and rings spring in with `PopShape` and drift slowly
  (`Shapes`, `phoneShapes()`). Blues and cyan only. 3–4 per scene, never over content.
- **Patient app:** `RightPhone` (scale 1.1, right half) with the headline on the left half.
  - Real screenshots from `public/images/screens/` where nothing on the screen moves.
  - Rebuilt React screens where something does.
- **Provider app:** a `ProviderTablet` (new) — the dark rounded tablet frame from the provider
  wireframes, filling about 1500 × 880 of the frame. No headline beside it; the kicker sits above it.
  - Its screens are **rebuilt in React** to match `design-prompts/reference/provider/*.png`.
    The wireframes are only 909 × 540, too small to show directly.
- **Brand cards:** `BrandCard` (blue-600, white official wordmark, `CutFrame`) for the reveal, the
  "AI-integrated system" beat and the close.

### Brand rules (brand book, Sept 2026)

- **Flat colour only.** No gradients, glass, glow, textures, patterns, photography or blur. The
  deck's photo collages and purple glass are *not* carried into the video.
- **Logo:** only the official files in `public/images/logo/`. White variant on blue-600, blue on
  light grounds. Never blue on blue.
  - The deck's later slides (51–71) use a different, rounded lowercase "bitbit" lockup. Do not copy it.
  - The provider app's sidebar mark and "Bitbit · Provider" pill are fine; they're part of the
    wireframes.
- **Colour jobs:**
  - Blue: actions and trust.
  - Cyan: scanning, success and Document-sourced.
  - Yellow: Patient-reported only.
  - Pink: allergies and destructive actions only.
  - Pink and yellow never decorate. The deck's yellow tape highlights become white or blue-300 here.
  - White text only on blue-600 (#0070d9) or darker.
- **Three provenance tags:** **Patient-reported**, **Document-sourced** and **Provider-reviewed**,
  always word + icon + border (`ProvenanceTag`).
  - Never "Verified", "Self-input", "Reviewed" or "Reported" as a tag. Cover short forms in screenshots.
  - The provider app's "Reviewed / Correct / Leave" *buttons* are fine; they're actions, not tags.
- **Facts, never advice:** values with units and references, no "High" or "Normal".
- **Typography:** English first; Filipino as a smaller grey second line where the app has one. No emoji.
- **Motion:** smooth and calm, nothing bounces or overshoots.
  - Animate only opacity, transform and colour.
  - Exits are faster than entrances.
  - The tap-to-share pulse is the only loop.
  - The Allergies card never animates on its own.
- **No placeholders on screen.** The wireframes contain `[LICENSE NO.]`, `[TO BE MEASURED]`,
  `[PHONE]` and `[CLINIC HOURS]`; rebuild those areas without them.
  - Don't show the facility overview's "Median tap to triage 2 min 40 s". It measures something
    different from the 30-second claim and would read as a contradiction.

### Two worlds, one switch

Part 1 (the problem) is the **"before" world**:
- **Colours:** ink `#0b1b33` backgrounds, paper `#fbf9f4` documents, white and blue-300 type.
- **Motion:** slightly heavier, things pile up.
- **Brand:** no brand blue fills.

Line 9 is the **switch**. The papers line up into one neat card and the background colour
animates from ink to neutral-50 over 1.2 s, ending light. Line 10 then fades into the blue
`BrandCard`. From there on, everything is the light and blue "after" world.

### What ties the parts together (do all of these)

1. **The timer.** One `Timer` component (mm:ss, tabular figures, clock icon) appears at every
   "30 minutes" beat:
   - Counts up 00:00 → 30:00 in Part 1 (lines 4, 6).
   - Counts down 30:00 → 00:30 at the reveal (11), at Share (38), in impact (52) and at the end (56).
   - Same position, size and type every time.
2. **Desk Zero.** One `DeskZeroSign` (dark sign, white letters, a row of arrows: Registration,
   Triage, Consultation, Pharmacy) and one `QueueTicket` ("NOW SERVING 087") recur:
   - Part 1: the queue (lines 2, 7).
   - Part 5: the same sign above the provider tablet (33).
   - Part 8: the close (54).
   - Line 37: the sign's subtitle flips from "Start from zero" to "Start from here".
   - The provider triage-desk queue (lines 33–35) is the *after* version of the Part 1 queue: same
     patients waiting, but Marco's row arrives ready.
3. **Marco.** Always represented by his app avatar: the cyan "MD" initials circle and the Home
   health card crop. Never a photo or a drawn character.
   - The same health-card crop opens Collect (13), returns in Prepare (26) and closes the video (54).
   - The provider app shows the same avatar.
4. **The papers.** The envelope of papers from Part 1 (line 3) is the same set of papers that is
   scanned in Collect: Rx from Riverside Clinic, CBC + lipid panel from Lakeview Diagnostic Center
   and the Rizal District Hospital discharge summary. Use `PrescriptionPaper`, `LabPaper` and
   `DischargePaper` everywhere.
5. **Chapter bar.** During Parts 3–5, a small persistent bar top-left reads
   `Collect · Prepare · Share`, with the current one in blue-600 and the others in neutral-450.
   - Render it *outside* the `TransitionSeries` so it stays still while scenes slide underneath.
   - It fades in at line 14 and out at the end of line 38. The active word changes colour (0.3 s)
     at each part change.
6. **Phone continuity.** When consecutive lines both show the phone, don't transition the scene.
   Keep one scene with the phone fixed and cross-fade only the screen inside it (0.4 s), while the
   left headline changes.
   - Lines 26–28 are one scene; lines 30–32 are one scene.
   - The provider tablet works the same way: lines 33–36 are one scene with four screens.

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
- **Lines that span two scenes** (lines 14, 24): cut on a comma or at "and", never mid-phrase.

---

## 2. The script, by part

**Narration:** the team's lines, edited for grammar, consistency and the 5-minute limit (changes
listed in section 4).
**On screen:** what the viewer sees. On-screen text is a short phrase, never the full narration.
**s:** estimated seconds.
Slide numbers point to the deck slide each beat comes from; `P#` points to a provider wireframe in
`design-prompts/reference/provider/`.

### Part 1: The problem at Desk Zero (≈ 55.5 s, ink "before" world)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 1 | Mavi | Meet Marco. He's sick. He's missing work. He just wants to get checked. | Ink stage. "Meet Marco." 120px white. His cyan MD avatar and "32 · BPO agent, night shift · Antipolo City". Three outline chips land on the words: *Sick* · *Missing work* · *Wants to get checked*. (s3) | 5.5 |
| 2 | Mavi | But the lines are long. Hospitals here often run at two to three times their capacity. | `DeskZeroSign` slides in from the top. A row of 14 user icons fills left to right. `QueueTicket` "NOW SERVING 087". Big "2–3×" count-up with "hospitals running over capacity". (s4) | 7.0 |
| 3 | Mavi | It doesn't help that a Filipino's medical history usually looks like this. | A flat envelope tips. Prescription, lab result, discharge summary and two `MiniPaper`s spill out and settle at slight angles (≤ 6°). "It arrives like this." (s5) | 5.5 |
| 4 | Melo | This begins a needlessly long, manual reconstruction of his medical history. | `Timer` top-right starts 00:00 and counts up. White question cards stack in one by one: *Allergies?* *Past illnesses?* *Maintenance meds?* *Family history?* "Memory is the database." (s6) | 5.0 |
| 5 | Mavi | Some results are missing. Some are recorded, just at another clinic. Another format, another piece of his story. | Three columns build left to right, one per sentence (s7–9):<br>**Missing**: `LabPaper` with three rows faded to dashed empty boxes.<br>**Elsewhere**: a *Riverside Clinic* card and a *This desk* card, joined by a dashed line that breaks with a white × in the middle.<br>**Scattered**: three different papers.<br>Footer: "It isn't missing. It's scattered." | 7.5 |
| 6 | Gab | Thirty minutes. That's how long rebuilding a history can take. | `Timer` centre-screen, large: runs 00:00 → 30:00 in 2 s and holds. "Rebuilding one history." (s10) | 4.5 |
| 7 | Mavi | Thirty minutes for Marco. Then the next patient. And the next. | Queue: the ticket steps 087 → 088 → 089 on "next" and "next". The user-icon row shifts one place each time, and the timer resets to 30:00 each time. (s11) | 5.0 |
| 8 | Mavi | Across 400 patients, that's up to 200 hours lost every day: time to serve 250+ more patients. | Equation builds term by term with count-ups: **400** *patients a day at Desk Zero* × **30** *minutes* = **200** *hours lost every day*. Then the result slides up and "**250+** *more patients they could serve every day*" lands under it. (s13–14) | 7.5 |
| 9 | Melo | All because of an outdated, manual process. So much could be saved if his history were ready to read. | **The switch.** The papers pile up untidily on "outdated", then straighten into one clean stack and into a single white card titled "Ready to read". The background animates ink → neutral-50. (s15–17) | 8.0 |

### Part 2: Introducing Bitbit (≈ 17.5 s)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 10 | Melo | Introducing Bitbit. Your health history, in your hands. | Fade to `BrandCard` (existing `TitleScene`). (s18) | 3.5 |
| 11 | Melo | An app that turns 30 minutes into 30 seconds, | Existing `TimerScene` with the labels from s50: **30:00** *from retelling* → **00:30** *to ready-to-read*. | 4.0 |
| 12 | Melo | where we turn medical history into something ready to read. | Existing `GlanceScene`: papers gather into the phone (02-home). (s20) | 4.5 |
| 13 | Mavi | Bitbit does three things: collect, prepare, share. Here's how they work for Marco. | Existing `PillarsScene`: three blue cards, then Marco's health card. (s21) | 5.5 |

### Part 3: Collect (≈ 56.5 s, chapter bar: **Collect**)

Lines 14–23 reuse the explainer scenes; re-time them to the seconds below. Lines 24–25 are new.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 14 | Mavi | We start with the history he already has, and bring it into one patient-held record. | Pillars scene "Collect" emphasis (others dim) for the first clause; slide to the existing `RecordScene` on "and bring it". (s22–23) | 7.0 |
| 15 | Mavi | What Marco knows, he adds himself: allergies, medicines, family history. | Existing `AddsScene`. (s24) | 4.5 |
| 16 | Gab | What he adds stays Patient-reported until a provider reviews it. | Existing `ReportedScene`. (s25) | 5.0 |
| 17 | Mavi | Then come the papers he's been carrying. | Existing `PapersScene`. These are the same papers as line 3. (s26) | 3.5 |
| 18 | Mavi | He scans them, instead of typing everything again. | Existing `ScanScene`. (s27) | 3.5 |
| 19 | Gab | AI copies what's written and sorts it into fields. Marco checks it before saving. | Existing `CheckScene`. (s28) | 6.0 |
| 20 | Gab | The original document stays attached. Every fact keeps its source. | Existing `SourceScene`. (s29) | 4.5 |
| 21 | Mavi | Prescriptions, lab results, discharge summaries: the same scan brings them together. | Existing `BatchScene`, with the lab and discharge facts updated per section 3. (s30) | 5.0 |
| 22 | Mavi | Each record connects to the visit it came from. | Existing `VisitsScene`, with dates updated per section 3. (s31) | 4.0 |
| 23 | Melo | Who. What. Where. When. | Existing `WwwwScene`. (s32) | 2.5 |
| 24 | Gab | Over time, records become a history, and providers can review them during care. | **New**, two beats.<br>(1) "Over time…": phone right with a rebuilt "My health timeline" that scrolls slowly upward (translateY only) from Jan 2026 to Sep 2026, using the visits in section 3. Left: "Not just a profile. A history."<br>(2) "and providers…": fade to `ProviderTablet` with a rebuilt **Visit notes** screen for the **Sep 18, 2026 triage visit** (layout from P6). In the "Review what Marco added" panel, the row **Condition: hypertension · copied from discharge summary · Document-sourced** gets **Reviewed** pressed (scale 0.98) and its tag cross-fades to **Provider-reviewed**. Footer: *Signing as Dr. A. Ramos · Rizal District Hospital*. (s33–34) | 5.5 |
| 25 | Gab | Every fact comes from one of three sources, so it can be verified. | Three cards rise in order (s35):<br>**01 Patient-reported**: Family history · From Marco · Sep 25, 2026.<br>**02 Document-sourced**: Amlodipine 5 mg · From his prescription · Riverside Clinic · Aug 12, 2026.<br>**03 Provider-reviewed**: Hypertension · Dr. A. Ramos · Rizal District Hospital · Sep 18, 2026.<br>Caption: "You don't just see the information. You see why you can trust it." | 5.5 |

### Part 4: Prepare (≈ 37 s, chapter bar: **Prepare**)

Screens: `09`–`14` in `public/images/screens/`. Rebuild 09, 10 and 14 so they can move; use 11,
12 and 13 as screenshots with `ScreenReveal`.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 26 | Mavi | So when Marco feels sick, he opens the app and types what he's feeling. | Phone right with 02-home. The "Not feeling well? Prepare for a visit" card gets a blue-500 1.5px ring and a press (scale 0.98, 80 ms), then the screen cross-fades to rebuilt 09. The text box types *"Masakit dibdib ko since this morning at medyo nahihilo ako."*; the counter climbs to 59/500; **Patient-reported** lands. The pink 911 card is there from the start and doesn't animate. Left: "No medical language required." (s36–37) | 6.0 |
| 27 | Gab | Bitbit asks follow-up questions to organize his words, not to diagnose him, | **Same scene**, rebuilt 10: answers fill one by one: *This morning*, *Chest*, **Pressure / heaviness** (chip selects), *Medyo nahihilo rin ako.* The yellow "Your answers, not a diagnosis." note is visible throughout. Left: "A few questions. Not a diagnosis." (s38) | 5.5 |
| 28 | Gab | and turns them into a ready-to-read chief complaint, built for triage. | **Same scene**, 11 with `ScreenReveal`: the Chief complaint card resolves top to bottom. Left: "His words, ready to read." (s39) | 5.5 |
| 29 | Melo | Bitbit also brings forward existing records that may help in this visit. | Fade to a new phone scene: 12 with `ScreenReveal` row by row (0.14 s stagger). Left: "Today's complaint doesn't arrive alone." (s40) | 5.5 |
| 30 | Melo | But to protect his privacy, Marco decides which records to share. | Phone scene **A**: 13 "Your record is yours." The lock disc springs in, then cross-fade to rebuilt 14 with all suggested items checked. Left: "Nothing leaves until Marco says so." (s41–42) | 5.0 |
| 31 | Mavi | He checks what he wants, and unchecks what he doesn't. | **Scene A**, 14: scroll down 0.6 s. On "checks", he ticks **Recent result: CBC + lipid panel** (count 6 → 7). On "unchecks", he unticks **Family history** (stays at 7 with CBC in). **Previous medication: Losartan** and **Other results** stay unticked. Never untick an allergy. Footer count animates on each change. Left: "Check it. Uncheck it." (s43) | 4.5 |
| 32 | Mavi | Then he sees exactly what will travel, and what stays private. | **Scene A**, new rebuilt screen "Review before sharing": **Will be shared · 7** (compact rows with their tags) and **Stays private · 3** (Family history, Previous medication: Losartan, Other results; each with a lock icon). This matches the provider's "Not shared by Marco" strip in line 35. Footer: *This visit only · Access ends today, 6:00 PM*. Left: "No blanket access. One clear packet." (s44) | 5.0 |

Line 30 opens 14 with **six** items ticked (why I'm seeking care, both allergies, Amlodipine,
hypertension, last visit) plus Family history ticked and CBC unticked, so that line 31 ends on
exactly the 7 items the provider receives.

### Part 5: Share (≈ 28.5 s, chapter bar: **Share**, provider wireframes)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 33 | Mavi | Once ready, he presents it at the hospital, | `DeskZeroSign` slides in top-left. `ProviderTablet` with rebuilt **Triage desk** (P2):<br>• Left: "Receive a record" card with the contactless disc and `PulseRings`, "Ask the patient to tap their phone here / Ilapit ang phone sa reader".<br>• Right: "Today's queue" with the five waiting patients.<br>Marco's phone enters bottom-right, overlapping the tablet edge, and taps: pulse, then the disc becomes the cyan check. (s45) | 3.5 |
| 34 | Melo | or one day, shares it directly with partner Bitbit hospitals. | Phone only, centred: 16-shared-scheduled, top half: "Shared with Rizal District Hospital · 7 items · this visit only". Left: "Or straight to a partner hospital." (s46) | 4.5 |
| 35 | Gab | The clinic receives the packet he chose, not his entire history. | Back to the tablet, Triage desk **received** state (P3). Marco's row slides into the top of the queue (*32 · M · Chest discomfort · 8:51 AM · 2 allergies · Being triaged · Today 6:00 PM*), and the cyan toast "Received: Marco Dela Cruz · 7 items · chest discomfort · 8:51 AM" rises. Then the screen cross-fades to the **Patient summary** (P4), with the bottom strip **Not shared by Marco**: Family history · Previous medication · Other results (3). Kicker above the tablet: "THE PACKET HE CHOSE. NOT HIS WHOLE HISTORY." (s47) | 5.0 |
| 36 | Gab | Each item arrives with its source, date and review status. | **Same tablet scene**, Patient summary (P4): a light blue-100 highlight band moves card by card (Allergies → Why he's here → Current medication → Known condition → Recent result and last visit), and each card's tag and source line brighten in turn. Kicker: "EVERY FACT ARRIVES WITH ITS SOURCE." (s48) | 4.5 |
| 37 | Mavi | No new patient has to start from zero. | `DeskZeroSign` large. Its subtitle cross-fades *Start from zero* → *Start from here*. (s49, s62) | 3.5 |
| 38 | Melo | Hospitals turn 30 minutes into 30 seconds, saving 197 hours every day: enough for 250+ more patients. | `Timer` 30:00 → 00:30 on the first clause, then two count-ups side by side: **197** *hours saved every day* · **250+** *more patients every day*. Chapter bar fades out at the end. (s50–51) | 7.5 |

### Part 6: How Bitbit makes money (≈ 36 s)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 39 | Gab | The beauty of Bitbit is that it makes the whole healthcare system work better. | `Ecosystem`: the Bitbit mark (blue, on light) in a white disc at the centre. Five node cards spring in around it, and a line draws from each to the centre: **Providers** · **Health plans + insurers** · **Employers** · **LGUs + public programs** · **Enterprise partners**. (s52, s56) | 6.0 |
| 40 | Gab | The players who benefit fund it, so the patient pays zero. | Marco's card rises below the centre: **Marco pays ₱0.** Under the diagram: "The patient is the user. The ecosystem is the customer." (s53, s57) | 5.0 |
| 41 | Gab | Providers gain capacity, insurers reach patients through controlled offers, and employers and LGUs can plug in too. | Nodes expand in turn with the narration:<br>**Providers**: ₱500K per integration · provider view, workflow setup, training, support. (s54)<br>**Health plans + insurers**: sponsored access · member discovery, with "Health information is never sold for advertising." (s55)<br>**Employers** and **LGUs**: fill blue-100 → blue-600 (colour animation). (s56) | 7.5 |
| 42 | Mavi | Marco gets the app free, with full control over his data. | Split: left, Marco ₱0 card with "Your data. Your choice."; right, phone with 04-access-log ("every read, newest first"), scrolled to show the active Rizal District Hospital access and **Revoke access**. (s57) | 5.0 |
| 43 | Melo | All powered by an AI-integrated system. | `BrandCard` variant with "All powered by an AI-integrated system." under the wordmark. (s58) | 3.5 |
| 44 | Gab | AI organizes. Providers review. Patients decide what travels. | Four step cards in a row, each lighting as it's named (Sources prove lights with Providers review): **01 AI organizes** · **02 Sources prove** · **03 Providers review** · **04 Patients decide what travels**. Footer: "AI assists. Humans stay in control." (s60) | 3.5 |
| 45 | Gab | It gives hospitals instant value, and opens a huge opportunity for integration. | Two levels side by side: **Level 1 · Pilot now** (patient-held record + provider view and share packet) → **Level 2 · Interoperate later** (standards and APIs where available). Footer: "Start light. Prove the time saved. Integrate deeper when it earns the right." (s62) | 5.5 |

### Part 7: Scale and impact (≈ 40.5 s)

All figures are the deck's illustrative model. Add a small footnote line where the deck has one.

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 46 | Melo | Marco is just one of millions of Filipinos we can help. | Marco's MD avatar centre. It shrinks while hundreds of initials circles (blue-100, blue-200, cyan-100; deterministic `random()`) fill the frame around it. "We started with one Marco." (s63) | 5.0 |
| 47 | Gab | Built on the national ID system, with over 97 million enrolled, | A generic ID card shape (not a copy of the real PhilSys card) with the app's **PhilSys-linked** pill, then **97M** count-up: "Filipinos already enrolled in PhilSys." (s64–65) | 5.0 |
| 48 | Melo | reaching just 1 in 10 Filipinos means 9.7 million people helped. | Ten user icons; one turns blue-600 on "1 in 10". Then **9.7M** count-up: "people helped." (s66–67) | 5.0 |
| 49 | Gab | We'll scale from 1 hospital to 50 in year one, generating over ₱180 million. | Roadmap, four steps lighting in turn, with a hospital counter 1 → 50 (s68):<br>**01 Build + baseline** (months 0–3) · **02 Pilot** (3–6) · **03 Prove** (6–9) · **04 Scale** (9–12).<br>Then the revenue headline **₱180M+** *year one* lands with its four streams as small chips: Sponsored access · Provider platform · Implementation · Enterprise integration. (s69) | 7.0 |
| 50 | Gab | By year three: over 60 million people, and over ₱1.8 billion. | Flat bar chart (blue-600 bars, no gradient) with values above each bar: **₱180M+** Y1 · **₱650M** Y2 · **₱1.8B+** Y3. People row: 9.7M → 25M → 60M+. (s70) | 6.5 |
| 51 | Mavi | Then on to countries like Thailand and Vietnam. | Three country chips joined by drawn arcs: **Philippines · Prove** → **Thailand · Adapt** → **Vietnam · Expand**. No map image. "The patient moves. Their history should too." (s71) | 3.5 |
| 52 | Mavi | But more than the 9.7 million, it's the time we can give back: | 9.7M slides left and shrinks. The `Timer` runs 30:00 → 00:30 beside it: "29.5 minutes returned per visit." (s72–73) | 5.5 |
| 53 | Melo | over 4.7 million hours in year one that could go back to care. | Equation: **9.7M** encounters × **29.5** minutes = **4.7M+ hours** (count-up). "Time that can go back to care." Footnote: *Illustrative maximum scenario: 9.7M Bitbit-assisted encounters, 30-minute baseline, 30-second target; to be validated in the pilot.* (s74–75) | 5.5 |

### Part 8: Close (≈ 17 s + 2 s hold)

| # | Who | Narration | On screen | s |
|---|---|---|---|---|
| 54 | Melo | Getting sick already takes time from us. Getting care shouldn't take more than it needs to. | Light stage, quiet: `DeskZeroSign` and Marco's health card. Two lines reveal slowly (0.25 s stagger). No shapes. (s76) | 7.0 |
| 55 | Melo | Bitbit. Your health history, in your hands. So the next desk can start from here, | `BrandCard` with a footer line "So the next desk can start from here." (s77) | 6.5 |
| 56 | Melo | and turn 30 minutes into 30 seconds. | `Timer` lands under the tagline: 30:00 → 00:30. Hold 2 s on the card, then music fades out. (s78) | 3.5 |

**Total:** about 288.5 s of lines + 2 s hold = **≈ 4:50**.

---

## 3. Facts to keep consistent

The provider wireframes win over the earlier explainer where they differ. **Update the existing
explainer scenes to match** (`LabPaper`, `DischargePaper`, `BatchScene` rows, `VisitsScene` rows).

- **Patient:** Marco Dela Cruz, 32, male, born Mar 14, 1994. BPO agent on night shift, Antipolo City, Rizal. Blood type O+. PhilSys-linked. Bitbit ID BB-0421.
- **Allergies:**
  - Penicillin (hives, itching): Provider-reviewed, Dr. A. Ramos, Rizal District Hospital, 2019.
  - Shrimp (lip swelling): Patient-reported, reported by patient 2022, Patient-reported in every scene.
- **Medication:** Amlodipine 5 mg, 1 tablet once daily, from a Riverside Clinic prescription by Dr. J. Santos, Aug 12, 2026, Document-sourced.
  - Previous: Losartan 50 mg, started at discharge Jan 14, 2026, stopped Feb 21, 2026.
- **Condition:** hypertension, since 2024, ongoing. Provider-reviewed by Dr. A. Ramos at the Sep 18, 2026 triage visit.
- **Family history:** father hypertension (45), mother type 2 diabetes (50), Patient-reported, added Sep 25, 2026.
- **Lab (changed):** CBC + lipid panel, **Lakeview Diagnostic Center**, May 4, 2026, Document-sourced, original attached.
  - Total cholesterol 5.6 mmol/L (ref. below 5.2); LDL 3.6 (below 2.6); HDL 1.1 (above 1.0); triglycerides 1.9 (below 1.7); hemoglobin 14.6 g/dL (13.5–17.5).
- **Discharge summary (changed):** Rizal District Hospital, **admitted Jan 12, discharged Jan 14, 2026**, Dr. A. Ramos.
  - Reason written: hypertensive urgency. Discharged on Losartan 50 mg once daily. BP at discharge 118/76.
- **Blood pressure readings:** Sep 18, 2026 136/86 (triage); Feb 21, 2026 142/92 (Rizal District Hospital); Jan 14, 2026 118/76 (from discharge summary).
- **Visits timeline (line 22):**
  - Sep 18, 2026 · Rizal District Hospital triage (BP 136/86 · HR 76)
  - Aug 12, 2026 · Riverside Clinic consultation (Amlodipine)
  - May 4, 2026 · Lakeview Diagnostic Center (CBC + lipid panel)
  - Jan 12–14, 2026 · Rizal District Hospital admission (discharge summary)
- **This visit:** Tue, Sep 29, 2026, **Rizal District Hospital** emergency room, Desk 2.
  - Triage nurse J. Mendoza. Shared by tap at 8:51 AM, 7 items, access ends today 6:00 PM.
  - Chief complaint: chest discomfort with dizziness, started this morning, pressure / heaviness.
- **Hospital name:** **Rizal District Hospital** everywhere. Never Antipolo City Hospital.
- **Numbers:**
  - Problem: 400 patients a day × 30 min = 200 hours lost every day → 250+ more patients every day.
  - Solution: 400 × 29.5 min ≈ 197 hours saved every day → 250+ more patients every day.
  - Business: ₱500K per provider integration.
  - Scale: 97M in PhilSys; 1 in 10 = 9.7M people; 1 → 50 hospitals in year one.
  - Revenue: **₱180M+** year one; ₱650M year two; ₱1.8B+ year three; people 9.7M → 25M → 60M+.
  - Impact: 9.7M × 29.5 min ≈ 4.7M+ hours.

## 4. Edits made to the script (for the team to approve)

- **One patients number.** The problem slide said 300+ more patients and the solution slide said
  250+. Both now say **250+ every day**. The lost and saved hours are almost equal (200 vs 197), so
  one figure fits both. Slide 14 should be updated to match.
- **"Every day" on every daily figure:** hours lost, hours saved and patients.
- **Revenue:** "over ₱180 million" / **₱180M+** everywhere, including the chart's year-one bar.
- **Hospital:** Rizal District Hospital everywhere.
- **Cut for the 5-minute limit** (about 45 s), keeping every idea:
  - Merged:
    - "He's done the tests…", "Some answers are already recorded…" and "Another facility…" into one line (5).
    - The two "Thirty minutes for Marco…" lines (7, 8).
    - "So much time…" (×2) with "All because of an outdated process…" (9).
    - "We start with…" and "And bring it into…" (14).
    - "Over time…" and "Providers can review…" (24).
    - "So that when Marco feels sick" and "All he has to do…" (26).
    - "Marco is then able to decide" and "which of his records…" (30).
    - Saving 197 hours with 30 seconds (38).
    - The three ecosystem players (41).
    - National ID with 97M (47); 1 in 10 with 9.7M (48).
    - Scale with year-one revenue (49).
    - The closing impact lines (52, 53).
  - Dropped as repeats: "Thirty minutes putting together information that already exists"
    (the four-causes visual keeps the idea) and "Three sources. One patient-held history." (said in
    line 25).
- **Grammar and typos:**
  - "it's current capacity" → "their capacity"; "thier" → "their"; "ecosytem" → "ecosystem".
  - "opporunity" → "opportunity"; "but 1 of the million of filipinos" → "one of millions of Filipinos".
  - "turn 30 minutes to 30 seconds" → "into".
- **Provenance names:** "Self-input stays patient-reported" → "What he adds stays Patient-reported".
- **AI wording:** "AI extracts and structures" → "AI copies what's written and sorts it into
  fields", which matches the app's own promise.
- **Insurers:** "controlled ads and offers" → "controlled offers". The deck itself says health
  information is never sold for advertising, so the narration shouldn't lead with "ads".

## 5. Build plan

```
src/compositions/BitbitPitch/
  timing.ts          SCRIPT (all 56 lines: part, speaker, narration, seconds), SCENES, PARTS
  BitbitPitch.tsx    TransitionSeries over all scenes + ChapterBar overlay + audio per part
  parts.tsx          BitbitPitch-P1..P8 compositions (slices of the same SCENES)
  scenes/
    p1-problem.tsx   lines 1–9 (ink stage)
    p2-reveal.tsx    10–13 (reuse TitleScene, TimerScene, GlanceScene, PillarsScene)
    p3-collect.tsx   14–25 (reuse explainer scenes + 24, 25)
    p4-prepare.tsx   26–32
    p5-share.tsx     33–38
    p6-business.tsx  39–45
    p7-scale.tsx     46–53
    p8-close.tsx     54–56
  screens/
    patient/         PrepareFeeling (09), PrepareQuestions (10), PrepareShare (14),
                     ReviewBeforeShare (new), HealthTimeline (new)
    provider/        TriageDesk (P2 waiting / P3 received), PatientSummary (P4),
                     VisitNotes (P6, Sep 18 version)
```

- **Move the reusable explainer pieces into `src/components/`** so both compositions share one copy.
  Pieces: `Stage`, `LeftStatement`, `Shapes`, `RightPhone`, `BrandCard`, `Enter`, the `screens/`
  folder.
- **New shared components:**
  - `Timer`, `DeskZeroSign`, `QueueTicket` and `PeopleRow` (user icons; `active` count animates).
  - `ScreenReveal` (top-to-bottom clip of a screenshot).
  - `ProviderTablet`: dark rounded frame, about 1500 × 880 inside a 1920 × 1080 stage. Screens are
    laid out at 1280 × 760 app pixels and scaled, with a left sidebar (Desk, Patient, Record, Notes,
    Admin, Lock, avatar) as in P2–P7.
  - `Ecosystem` (centre + nodes + drawn links) and `BarChart` (flat bars, labelled values, no axis
    clutter).
  - `ChapterBar`.
- **`Stage` tone:** add `tone="ink"` (ink background, white type) for Part 1. Also allow animating
  between tones (background colour only) for line 9.
- **Timing:** keep the explainer's rule that each scene still starts on its cue.
  - Scene length = (next scene start − this start) + the transition into the next scene.
  - Part changes use the 0.9 s transition.
  - Lines 14 and 24 hold two scenes: give the second scene a start offset inside the line.
- **Audio:**
  - Music bed: loop `explainer-bed.mp3` with a 2 s crossfade at a bar line, to about 4:55.
  - Duck the music to 0.3 under narration and back up between parts.
  - One `<Audio>` per narration part inside a `<Sequence from={partStart}>`.
- **Reference images:** the provider wireframes are in `design-prompts/reference/provider/`
  (p1–p7). They're for layout reference only; don't place them in the video.

## 6. Done when

- `npm run typecheck && npm run lint` pass.
- `TOTAL_SECONDS` (all lines + end hold) is under 300 s. Log it at the top of `timing.ts`.
- A still at the settled moment of every line (56 stills, half size) has been checked:
  - Text fits and nothing overlaps.
  - The three tag names are correct everywhere, and Shrimp is Patient-reported in every scene.
  - "Rizal District Hospital" everywhere; "7 items" everywhere; no placeholder text visible.
  - No pink or yellow is used as decoration.
- Three frames inside every transition have been checked: nothing jumps, no element appears in two places.
- `npx remotion render BitbitPitch out/bitbit-pitch.mp4` succeeds. Spot-check the final file at
  every part change and confirm its duration with ffprobe.
