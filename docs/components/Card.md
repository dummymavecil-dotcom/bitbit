---
category: Containers
---

# Card

A card groups one object on a screen. Pick the variant by what the card means, not by how you want it to look.

| Variant | Use | Tokens |
| --- | --- | --- |
| `surface` | Summary links, timeline events, section cards | `surface`, 1px `border-subtle`, `radius-xl`, `card-padding` |
| `brand` | The health card (once, on Home) | `surface-brand`, `text-on-brand`, `radius-2xl`, `card-padding-hero`; stat chips on `overlay-on-brand` |
| `allergy` | The pinned allergy block, first on Home and on the printout | `error-bg`, 1.5px `error-border`, `radius-xl`; rows inside on `surface` with `radius-md` |
| `active` | A live grant of access; any "selected" card | `surface`, 1.5px `border-selected` |

## States

| State | Treatment | Status |
| --- | --- | --- |
| Default | as above | shown |
| Selected / active | `active` variant | shown (Access log, Share confirmation) |
| Pressed | surface → `bg` + `border-default`; brand → `blue-700`; allergy → `error` border | proposed |
| Focused | `focus-ring` | proposed |
| Disabled | `surface-sunken`, `text-disabled` | proposed |

## Rules

- Separate cards with borders and `section-gap`, never with shadows (`elevation-0`).
- A card that navigates is one link (`href`). Don't nest buttons inside it; a "Print" pill inside the summary card is a label, not a second target.
- Only one `brand` card and one `allergy` card per screen.
