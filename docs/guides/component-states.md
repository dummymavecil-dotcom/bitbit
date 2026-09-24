# Component states

Every interactive component has the same four states. The screens only showed default and selected; the rest are **proposed** and built from existing tokens. See each component's page for a live preview.

**Focused is the same everywhere:** `focus-ring` (2px white gap, then 2px `blue-600`). It follows the element's radius because it is a box-shadow. Show it on `:focus-visible` only.

**Disabled is the same everywhere:** `surface-sunken` fill, no border, `text-disabled` label and icon, `cursor: not-allowed`. Prefer hiding an action to disabling it. When you do disable one, say why nearby ("Add one record first").

## Buttons

| Component | Default (shown) | Pressed (proposed) | Focused (proposed) | Disabled (proposed) |
| --- | --- | --- | --- | --- |
| Button · primary | `blue-600` fill, white `label-lg`, 56px, `radius-lg` | `blue-700` fill | `focus-ring` | `surface-sunken`, `text-disabled` |
| Button · secondary | `surface`, 1.5px `border-strong`, `text-primary` 15/600, 52px | `surface-sunken` fill | `focus-ring` | `surface-sunken`, `text-disabled`, no border |
| Button · danger | `error-bg`, 1.5px `error` border and text | `error` fill, `text-inverse` (7.54:1) | `focus-ring` | `surface-sunken`, `text-disabled` |
| QuickAction · primary | `blue-600`, white, 36px icon disc on 18% white | `blue-700` | `focus-ring` | `surface-sunken`, `text-disabled` |
| QuickAction · secondary | `cyan-400`, ink | `cyan-600`, ink (4.92:1) | `focus-ring` | `surface-sunken`, `text-disabled` |
| IconButton · surface | `surface`, `border-subtle`, ink icon | `surface-sunken` | `focus-ring` | `text-disabled` icon |
| IconButton · inverse | `overlay-on-inverse`, white icon | 28% white | `focus-ring` | `text-disabled` icon |

## Chips and selection

| Component | Default (shown) | Selected (shown) | Pressed (proposed) | Focused (proposed) | Disabled (proposed) |
| --- | --- | --- | --- | --- | --- |
| Chip · filter | `surface`, 1.5px `border-strong`, pill | `blue-600`, white | unselected → `surface-sunken`; selected → `blue-700` | `focus-ring` | `surface-sunken`, `text-disabled` |
| Chip · choice | `surface`, `border-strong`, `radius-md` | `blue-600`, white | same as filter | `focus-ring` | same |
| Chip · toggle | `surface`, `border-strong`, empty checkbox | `blue-100`, `border-selected`, filled `blue-600` checkbox | on → `blue-200`; off → `surface-sunken` | `focus-ring` | same; checkbox outlined in `text-disabled` |
| SegmentedControl | `text-secondary` on `surface-sunken` | `surface`, `text-primary`, `elevation-1` | 60% white wash | `focus-ring` on the segment | `text-disabled` |
| Tag | Verified / Self-input | — | — | — | — (not interactive) |

## Cards

| Component | Default (shown) | Selected / active (shown) | Pressed (proposed) | Focused (proposed) | Disabled (proposed) |
| --- | --- | --- | --- | --- | --- |
| Card · surface | `surface`, `border-subtle`, `radius-xl` | → `active` variant | `bg` fill, `border-default` | `focus-ring` | `surface-sunken`, `text-disabled` |
| Card · brand | `blue-600`, white | — | `blue-700` | `focus-ring` | — |
| Card · allergy | `error-bg`, `error-border` | — | border → `error` | `focus-ring` | — (never disabled: allergies are always visible) |
| Card · active | `surface`, 1.5px `border-selected` | is the selected state | as surface | `focus-ring` | — |
| CategoryTile | tone fill, `radius-lg` | — | 1.5px `border-strong` | `focus-ring` | `surface-sunken`, "Nothing added yet" |
| RecordRow | `surface`, `border-subtle` | — | as Card · surface when it's a link | `focus-ring` | — |

## Motion

Pressed states apply immediately, with no transition. The only animation in the product is the tap-to-share pulse: two `blue-200` rings scaling 0.7 → 1.35 over 2.4s, offset by 1.2s. Under `prefers-reduced-motion: reduce`, stop it and show the rings at 35% opacity.
