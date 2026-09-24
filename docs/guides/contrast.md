# Contrast (WCAG AA)

Every foreground/background pairing in the five screens and the printout, measured with the WCAG 2 formula. Thresholds: **4.5:1** for body text, **3:1** for large text (24px+, or 18.66px+ bold) and for non-text UI (control borders, icons, focus rings, status marks). Translucent fills are measured on their composite colour.

## Text

| # | Foreground | Background | Ratio | Needs | Result | Where |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `text-primary` #0b1b33 | `bg` #f4f7fb | 16.04 | 4.5 | Pass | Screen titles, section headings |
| 2 | `text-primary` #0b1b33 | `surface` #ffffff | 17.23 | 4.5 | Pass | Card and row text |
| 3 | `text-primary` #0b1b33 | `error-bg` #ffe8f1 | 14.82 | 4.5 | Pass | "Allergies" title, vitals tile |
| 4 | `text-primary` #0b1b33 | `blue-100` #e5f2ff | 15.16 | 4.5 | Pass | Conditions / Procedures tiles |
| 5 | `text-primary` #0b1b33 | `cyan-100` #dcfbfa | 15.77 | 4.5 | Pass | Medication tile |
| 6 | `text-primary` #0b1b33 | `yellow-100` #fff6cc | 15.84 | 4.5 | Pass | Lab / Immunization tiles |
| 7 | `text-primary` #0b1b33 | `surface-sunken` #e8edf5 | 14.66 | 4.5 | Pass | Selected segment label (on white: 17.23) |
| 8 | `text-on-secondary` #0b1b33 | `cyan-400` #01dfdc | 10.33 | 4.5 | Pass | Scan reseta action, "1 medicine found", avatar initials |
| 9 | `text-on-accent` #0b1b33 | `pink-300` #fd8fb9 | 8.05 | 3 (icon) | Pass | Allergy alert icon disc |
| 10 | `text-on-accent` #0b1b33 | `yellow-400` #fdd101 | 11.73 | 4.5 | Pass | Reserved for yellow fills |
| 11 | `text-primary` #0b1b33 | `cyan-50` #f4fdfd | 16.67 | 4.5 | Pass | Scanned field value |
| 12 | `text-secondary` #4a5a73 | `surface` #ffffff | 7.00 | 4.5 | Pass | Details, field labels, allergy reactions |
| 13 | `text-secondary` #4a5a73 | `bg` #f4f7fb | 6.51 | 4.5 | Pass | "Every read is logged" note |
| 14 | `text-secondary` #4a5a73 | `surface-sunken` #e8edf5 | 5.95 | 4.5 | Pass | Unselected segment labels |
| 15 | `text-secondary` #4a5a73 | `error-bg` #ffe8f1 | 6.02 | 4.5 | Pass | Vitals tile detail |
| 16 | `text-secondary` #4a5a73 | `cyan-100` #dcfbfa | 6.40 | 4.5 | Pass | Medication tile detail |
| 17 | `text-secondary` #4a5a73 | `blue-100` #e5f2ff | 6.16 | 4.5 | Pass | Tile detail, date-badge year |
| 18 | `text-secondary` #4a5a73 | `yellow-100` #fff6cc | 6.43 | 4.5 | Pass | Lab tile detail |
| 19 | `text-tertiary` #5e6b80 | `surface` #ffffff | 5.40 | 4.5 | Pass | Record source, timestamps, inactive tab labels |
| 20 | `text-tertiary` #5e6b80 | `bg` #f4f7fb | 5.02 | 4.5 | Pass | Subtitles, overlines, greeting |
| 21 | `text-on-brand` #ffffff | `blue-600` #0070d9 | 4.86 | 4.5 | Pass | Primary buttons, selected chips, health card, 2026 annual card |
| 22 | `text-on-brand` #ffffff | `overlay-on-brand` → #005aae | 6.83 | 4.5 | Pass | Health-card stat chips, PhilSys pill |
| 23 | `text-on-brand` #ffffff | `blue-500` #0084ff | 3.66 | 3 (icon) | Pass as icon · **Fail as text** | FAB mark and pulse icon only. Never text. |
| 24 | `blue-600` #0070d9 | `surface` #ffffff | 4.86 | 4.5 | Pass | Active tab label |
| 25 | `blue-600` #0070d9 | `blue-100` #e5f2ff | 4.28 | 3 (icon) | Pass as icon · Fail as small text | Active tab icon in its pill |
| 26 | `text-link` #005bb5 | `bg` #f4f7fb | 6.18 | 4.5 | Pass | "See all" |
| 27 | `info` #005bb5 | `surface` #ffffff | 6.64 | 4.5 | Pass | "Active now", links |
| 28 | `info` #005bb5 | `info-bg` #e5f2ff | 5.84 | 4.5 | Pass | Verified tag, shared-section chips, Print pill |
| 29 | `text-link` #005bb5 | `cyan-100` #dcfbfa | 6.08 | 4.5 | Pass | "View" in the success banner |
| 30 | `warning` #6b5400 | `warning-bg` #fff6cc | 6.67 | 4.5 | Pass | Self-input tag |
| 31 | `yellow-800` #4d3c00 | `warning-bg` #fff6cc | 9.84 | 4.5 | Pass | Scanner note |
| 32 | `warning` #6b5400 | `surface` #ffffff | 7.26 | 3 (icon) | Pass | Lab / Immunization tile icons |
| 33 | `error` #a3164f | `error-bg` #ffe8f1 | 6.49 | 4.5 | Pass | "Mga allergy" subtitle, Revoke button |
| 34 | `error` #a3164f | `surface` #ffffff | 7.54 | 3 (icon) | Pass | Vitals tile icon |
| 35 | `success` #00706e | `surface` #ffffff | 5.93 | 4.5 | Pass | Medication icon, shield icon |
| 36 | `cyan-800` #00504f | `success-bg` #dcfbfa | 8.50 | 4.5 | Pass | Success banner detail |
| 37 | `text-inverse` #ffffff | `surface-inverse` #0b1b33 | 17.23 | 4.5 | Pass | Scanner title |
| 38 | `text-inverse-secondary` #c9d3e1 | `surface-inverse` #0b1b33 | 11.40 | 4.5 | Pass | "Align the prescription in the frame" |
| 39 | `text-inverse` #ffffff | `overlay-on-inverse` → #2d3b50 | 11.50 | 3 (icon) | Pass | Close and flash buttons |
| 40 | `neutral-700` #33435c | `surface` #ffffff | 10.01 | 4.5 | Pass | Printout details |
| 41 | `text-disabled` #9aa7ba | `surface-sunken` #e8edf5 | 2.07 | — | Exempt | Proposed disabled state (WCAG exempts inactive controls) |

All text pairings pass.

## Non-text UI (3:1)

| # | Mark | Against | Ratio | Result | Where | Fix |
| --- | --- | --- | --- | --- | --- | --- |
| 42 | `border-subtle` #e3e9f2 | `surface` #ffffff | 1.22 | **Fail** | Year select, scanner inputs, unselected chips | Use `border-strong` #7c8aa0 → **3.50** |
| 43 | `neutral-300` #c8d3e3 | `surface` #ffffff | 1.51 | **Fail** (advisory: label present) | Secondary button outline | `border-strong` → **3.50** |
| 44 | `neutral-400` #9aa7ba | `surface` #ffffff | 2.44 | **Fail** | Unchecked checkbox in Share chips | `border-strong` → **3.50** |
| 45 | `cyan-400` #01dfdc | `cyan-50` #f4fdfd | 1.61 | **Fail** | Border of scanned fields | `color-secondary-strong` #009996 → **3.39** |
| 46 | `cyan-400` #01dfdc | `surface` #ffffff | 1.67 | **Fail** (advisory: "Active now" text present) | Live dot, Access log | `cyan-600` → **3.50** |
| 47 | `pink-300` #fd8fb9 | `surface` #ffffff | 2.14 | **Fail** | Unread dot on the bell | `error-strong` #d6336f → **4.60** |
| 48 | `yellow-500` #c9a700 | `warning-bg` #fff6cc | 2.14 | **Fail** | Self-input dashed border (the non-colour cue) | `warning-border` #a07f00 → **3.49** |
| 49 | `blue-300` #b8dbff | `info-bg` #e5f2ff | 1.26 | **Fail** (advisory) | Verified tag border | `info-border` #0084ff → **3.22** |
| 50 | `border-selected` #0084ff | `blue-100` #e5f2ff | 3.22 | Pass | Selected toggle chip | — |
| 51 | `blue-500` #0084ff | `bg` #f4f7fb | 3.40 | Pass | Share FAB, pulse centre | — |
| 52 | `focus-ring` #0070d9 | `bg` / `surface` / `blue-100` | 4.52 / 4.86 / 4.28 | Pass | Proposed focus ring | — |
| 53 | `error-border` #fd8fb9 | `error-bg` #ffe8f1 | 1.84 | Decorative | Allergy card edge (the fill already sets it apart) | none needed |
| 54 | `border-subtle` #e3e9f2 | `bg` | 1.14 | Decorative | Card edges | none needed: cards aren't controls |

## What changed

- **New token `neutral-450` #7c8aa0, surfaced as `border-strong`.** It replaces `neutral-150`, `neutral-300` and `neutral-400` wherever a border outlines something you can type into, tick or tap. It sits between `neutral-400` and `neutral-500`, so the ramp stays in order.
- **New `cyan-600` #009996 (`color-secondary-strong`).** Cyan-400 stays the brand fill; its darker step handles UI marks.
- **New `pink-600` #d6336f (`error-strong`)** for small pink signals. `pink-300` stays decorative.
- **New `yellow-600` #a07f00 (`warning-border`)** replaces `yellow-500`, so the dashed border that tells Self-input apart without colour passes 3:1.
- **`info-border` now points to `blue-500`**. `blue-300` is deprecated.
- **Rule, not token:** white text sits on `blue-600` or darker. `blue-500` carries only icons and the logo.
