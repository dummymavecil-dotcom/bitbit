# Bitbit brand and foundations

Bitbit is a medical record that the patient owns and carries, so that a triage desk starts from facts instead of questions. The UI must be readable by a stranger in ten seconds, work with one thumb, and print on one page. Build every screen from the tokens below; role tokens (`text-secondary`, `surface-brand`) are the public API, palette steps (`blue-600`) are what they point to.

## Content

- Write English first. Add Filipino as a second, smaller line (`body-sm` / `text-tertiary`), never mixed into the same label: "Records" over "Mga record ni Maria"; "Tap to share" over "Ibahagi".
- Say what happened, in the owner's words: "Shared with Rizal District Hospital", "Added to Medication", "Access ends: today, 6:00 PM".
- Record facts, never advice. Show a value with its reference range ("6.8% · ref. below 5.7%") and who recorded it. No "High", "Normal", tips or encouragement.
- Name the source of every record: "Verified by Dr. Liza Ramos · San Roque Health Center" or "Added by you".
- No emoji. Icons carry meaning together with words.

## Color

The brand is one blue with three bright secondaries. Blue carries actions and trust (Verified). Each secondary colour has one job: cyan for scanning and success, yellow for unconfirmed (Self-input) data, pink for allergies and destructive actions. Keep those jobs exclusive.

### Primary, secondary, accent

| Token | Hex | Role |
| --- | --- | --- |
| `color-primary` → `blue-500` | #0084ff | Brand blue: logo, share FAB, selected borders, icons. |
| `color-primary-action` → `blue-600` | #0070d9 | Fill of primary buttons, selected chips, health card (white text 4.86:1). |
| `color-primary-pressed` → `blue-700` | #005bb5 | Pressed primary; blue text and links. |
| `color-primary-subtle` → `blue-100` | #e5f2ff | Blue tint behind blue text and selected toggles. |
| `color-secondary` → `cyan-400` | #01dfdc | Scan action, success disc. Ink text only. |
| `color-secondary-strong` → `cyan-600` | #009996 | *Proposed.* Cyan UI marks that need 3:1. |
| `color-secondary-subtle` → `cyan-100` | #dcfbfa | Cyan tint. |
| `color-accent-yellow` → `yellow-400` | #fdd101 | Accent reserved for Self-input. |
| `color-accent-pink` → `pink-300` | #fd8fb9 | Accent reserved for allergies. |

### Neutral scale

Neutrals are tinted toward the brand blue.

| Token | Hex | Use |
| --- | --- | --- |
| `neutral-0` | #ffffff | Surfaces |
| `neutral-50` | #f4f7fb | App background |
| `neutral-100` | #e8edf5 | Sunken track, pressed and disabled fills |
| `neutral-150` | #e3e9f2 | Card hairlines (decorative) |
| `neutral-200` | #d3dbe7 | Sheet handle |
| `neutral-300` | #c8d3e3 | Decorative outlines |
| `neutral-400` | #9aa7ba | Disabled text, print rules |
| `neutral-450` | #7c8aa0 | *Proposed.* Control borders (3.50:1) |
| `neutral-500` | #5e6b80 | Tertiary text |
| `neutral-600` | #4a5a73 | Secondary text |
| `neutral-700` | #33435c | Secondary text on paper |
| `neutral-900` | #0b1b33 | Ink; camera surface |
| `inverse-300` | #c9d3e1 | Secondary text on the camera surface |

### Semantic

| Meaning | Text / icon | Background | Fill / border | Seen as |
| --- | --- | --- | --- | --- |
| `success` | `cyan-700` #00706e | `success-bg` #dcfbfa | `success-fill` #01dfdc | "Added to Medication", share confirmation check |
| `warning` | `yellow-700` #6b5400 | `warning-bg` #fff6cc | `warning-border` #a07f00 *(proposed)* | Self-input tag and note |
| `error` | `pink-700` #a3164f | `error-bg` #ffe8f1 | `error-border` #fd8fb9 · `error-strong` #d6336f *(proposed)* | Allergies, Revoke, unread dot |
| `info` | `blue-700` #005bb5 | `info-bg` #e5f2ff | `info-border` #0084ff | Verified tag, "Active now" |

Success is cyan, not green, and error is pink. Every semantic colour also carries a word or icon, so meaning never depends on hue alone.

## Surfaces and text

| Token | Value | Use |
| --- | --- | --- |
| `bg` | #f4f7fb | Behind every screen |
| `surface` | #ffffff | Cards, rows, inputs, tab bar |
| `surface-raised` | #ffffff + `elevation-2` | Bottom sheet, anything floating |
| `surface-sunken` | #e8edf5 | Segmented track |
| `surface-brand` | #0070d9 | Health card |
| `surface-inverse` | #0b1b33 | Camera / scanner |
| `overlay-scrim` | rgba(11, 27, 51, 0.56) | *Proposed.* Behind modal sheets |
| `overlay-on-brand` | rgba(0, 0, 0, 0.2) | Chips inside the health card |
| `overlay-on-inverse` | rgba(255, 255, 255, 0.14) | Icon buttons on camera |
| `border-subtle` | #e3e9f2 | Card and row edges (decorative) |
| `border-default` | #c8d3e3 | Decorative outlines |
| `border-strong` | #7c8aa0 | *Proposed.* Every control boundary |
| `border-selected` | #0084ff | Selected chip, active card |
| `border-focus` | #0070d9 | Focus ring |

| Text role | Value | Reads on |
| --- | --- | --- |
| `text-primary` | #0b1b33 | Everything light: `bg`, `surface`, all tints, `cyan-400`, `yellow-400`, `pink-300` |
| `text-secondary` | #4a5a73 | `bg`, `surface`, `surface-sunken`, all -100 tints |
| `text-tertiary` | #5e6b80 | `bg` and `surface` only |
| `text-disabled` | #9aa7ba | Disabled controls (exempt from contrast) |
| `text-inverse` | #ffffff | `surface-inverse` |
| `text-inverse-secondary` | #c9d3e1 | `surface-inverse` |
| `text-link` | #005bb5 | `bg`, `surface`, `blue-100`, `cyan-100` |
| `text-on-brand` | #ffffff | `blue-600` and darker. Never on `blue-500` below 24px. |
| `text-on-secondary` | #0b1b33 | `cyan-400`, `cyan-600` |
| `text-on-accent` | #0b1b33 | `yellow-400`, `pink-300` |

## Typography

Use Inter for everything. Load upright Inter from Google Fonts (`family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..700`); the italic ships with this system as `fonts/Inter-Italic-Variable.ttf`. Use italic only for handwriting in illustrations. Set numbers that line up with `font-variant-numeric: tabular-nums`. The screens used the browser's default line height (about 1.2); the line heights below are the proposed fixed values.

| Style | Size / line | Weight | Tracking | Where it appears |
| --- | --- | --- | --- | --- |
| `display` | 28 / 34 | 700 | -0.02em | Screen titles: Records, Access log; health-card name |
| `title-1` | 22 / 28 | 700 | -0.01em | Pushed-screen title: Share with a provider |
| `title-2` | 20 / 26 | 700 | -0.01em | Greeting name, sheet title, confirmation title, stat values |
| `headline` | 18 / 24 | 700 | 0 | Section headings: My records, Lab results |
| `title-3` | 17 / 22 | 700 | 0 | Allergies strip, provider name, scanner header |
| `label-lg` | 16 / 20 | 700 | 0 | Primary button labels, Share sub-heads |
| `body-strong` | 15 / 20 | 700 | 0 | Record names, tile titles (600 for secondary buttons) |
| `body` | 14 / 20 | 400 | 0 | Details, subtitles; chips at 600 |
| `body-sm` | 13 / 18 | 400 | 0 | Tile descriptions, meta, notes |
| `caption` | 12 / 16 | 600 | 0 | Tags (700), tab labels, stat labels, timestamps |
| `overline` | 12 / 16 | 700 | 0.08em, uppercase | BITBIT HEALTH CARD, TODAY, ANNUAL SUMMARIES |

On paper, use the Print group: `print-title` 30/36 800, `print-allergy` 18/24 800, `print-body` 16/22 700, `print-detail` 13/18, `print-section` 13/16 800 uppercase, `print-meta` 12/16. Nothing on the page is smaller than 12px.

## Spacing

The base unit is 4px. Half-steps (6, 10, 14) are allowed inside components only.

| Token | px | Use |
| --- | --- | --- |
| `space-2` | 2 | Title-to-subtitle inside a text stack |
| `space-4` | 4 | Tag icon gap, segmented padding |
| `space-6` | 6 | Chip wrap gap |
| `space-8` | 8 | Chip rows, icon + label |
| `space-10` | 10 | Between list rows and stacked buttons |
| `space-12` | 12 | Grid gutters, header items |
| `space-14` | 14 | Compact card padding |
| `space-16` | 16 | Card padding, section gap |
| `space-20` | 20 | Screen side margin, hero padding |
| `space-24` | 24 | Above the tab bar |
| `space-56` | 56 | Top inset for the status bar |

Semantic aliases: `screen-margin-x` 20 · `screen-inset-top` 56 · `section-gap` 16 · `card-padding` 16 · `card-padding-compact` 14 · `card-padding-hero` 20 · `grid-gap` 12 · `list-gap` 10 · `inline-gap` 8.

## Radius

| Token | px | Components |
| --- | --- | --- |
| `radius-xs` | 6 | Checkbox, thumbnails |
| `radius-sm` | 10 | Segment buttons |
| `radius-md` | 14 | Inputs, selects, choice and toggle chips, date badge, notes, segmented track |
| `radius-lg` | 20 | Buttons, tiles, record rows, quick actions, annual cards |
| `radius-xl` | 24 | Section cards: allergy, access, share visual |
| `radius-2xl` | 28 | Health card, bottom-sheet top corners |
| `radius-full` | 9999 | Filter chips, tags, avatars, icon buttons, FAB |

## Elevation

Default to flat. Separate cards with `border-subtle`; add a shadow only to something that floats.

| Token | Value | Use |
| --- | --- | --- |
| `elevation-0` | none | Cards and rows |
| `elevation-1` | 0 1px 3px rgba(11, 27, 51, 0.12) | Selected segment |
| `elevation-2` | 0 -8px 24px rgba(11, 27, 51, 0.12) | *Proposed.* Bottom sheet over a light screen |
| `elevation-brand` | 0 8px 20px rgba(0, 112, 217, 0.35) | Share FAB, pulse centre |
| `elevation-illustration` | 0 18px 40px rgba(0, 0, 0, 0.45) | Objects in the camera view; not UI |
| `focus-ring` | 0 0 0 2px #ffffff, 0 0 0 4px #0070d9 | *Proposed.* Keyboard focus on every control |

## Motion

Motion should feel smooth and calm, never bouncy: this is a medical record, used by someone who may be unwell. Motion confirms that something happened and shows where things came from; it never decorates.

| Token | Value | Use |
| --- | --- | --- |
| `duration-instant` | 80ms | Touch-down feedback: pressed colour and `scale-pressed` |
| `duration-fast` | 140ms | Colour, border and focus-ring changes on controls |
| `duration-base` | 220ms | Selection changes: chips, segments, toggles |
| `duration-moderate` | 320ms | Content entering or moving: rows, confirmation cards, tab content |
| `duration-slow` | 440ms | Bottom sheets and full-screen transitions entering |
| `duration-exit` | 200ms | Anything leaving. Exits are always faster than entrances. |
| `duration-pulse` | 2400ms | One loop of the tap-to-share pulse |
| `ease-standard` | cubic-bezier(0.2, 0, 0, 1) | State changes on things that stay on screen |
| `ease-enter` | cubic-bezier(0.16, 1, 0.3, 1) | Entrances: a long, soft settle with no overshoot |
| `ease-exit` | cubic-bezier(0.4, 0, 1, 1) | Exits: accelerate away |
| `ease-in-out` | cubic-bezier(0.65, 0, 0.35, 1) | Loops: the share pulse |
| `scale-pressed` | 0.98 | Buttons, tiles and cards while pressed |

- Use the composites in code: `--transition-control` (buttons, chips, segments), `--transition-surface` (cards, tiles), `--transition-enter`, `--transition-sheet` and `--transition-exit`. The component CSS already applies them; `.bb-enter`, `.bb-sheet-enter` and `.bb-pulse` / `.bb-pulse-delayed` are ready-made animations.
- Animate only `opacity`, `transform` and colours. Never animate height, width or layout.
- New content enters with a fade plus an 8px rise (`.bb-enter`). Stagger list rows by 40ms, up to 6 rows.
- Never animate the Allergies card in or out of view: allergies are on screen from the first frame.
- Under `prefers-reduced-motion: reduce`, every duration becomes 0ms, `scale-pressed` becomes 1 and the pulse stops at 35% opacity. States still change; they just don't move.

## Iconography and logos

- Icons are 24px-grid line icons with a 2px stroke and round caps and joins, drawn in `currentColor` (`Bitbit.Icon`). The set follows Lucide's geometry; in the app, use `lucide-react` and keep the names mapped in `index.d.ts`.
- Sizes: 12–14px in tags, 18px in 36px discs, 20px in buttons, 22px in the tab bar.
- The mark and the wordmark are in Logos. Both are single-ink `blue-500` on light grounds. On `blue-500` or `blue-600`, render the mark in white (filter to white, or ask for a white export). Don't redraw the mark.

## Touch and layout

- Make every target at least 44px (`touch-target`). The tab bar is 84px, with the 62px Share FAB raised 30px.
- Phone screens are 390px wide with `screen-margin-x` on both sides. Don't draw a status bar; leave `screen-inset-top`.
