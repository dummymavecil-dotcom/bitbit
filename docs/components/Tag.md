---
category: Status
---

# Tag

Every record carries exactly one of two tags that say who vouches for it: **Verified** (a provider confirmed it) or **Self-input** (the patient entered it).

| Kind | Fill | Text / icon | Border | Contrast |
| --- | --- | --- | --- | --- |
| `verified` | `info-bg` | `info`, check-circle icon | 1px solid `info-border` | 5.84:1 text |
| `self` | `warning-bg` | `warning`, pencil icon | 1px **dashed** `warning-border` | 6.67:1 text |

- The two tags differ in five ways (word, icon, border style, hue and lightness), so they still read in grayscale and on the printed page.
- Place the tag top-right of a record row, or after the name on the allergy strip.
- Tags aren't interactive, so they have no pressed, focused or disabled state. To explain a tag, link from the source line under it ("Verified by Dr. Liza Ramos").
- The screens draw the Verified border in `blue-300` (1.26:1) and the Self-input dashes in `yellow-500` (2.14:1). Use `info-border` and `warning-border` so the dashed cue reaches 3:1.
