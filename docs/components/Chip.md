---
category: Selection
---

# Chip

Chips pick from a small visible set. **filter** chips switch the list below them (the Records categories), **choice** chips pick one option (Access lasts), and **toggle** chips pick any number of options, with a checkbox (What they can see).

| Variant | Shape | Selected | Unselected |
| --- | --- | --- | --- |
| `filter` | `radius-full` pill, 44px | `color-primary-action` fill, `text-on-brand` | `surface`, `border-strong` |
| `choice` | `radius-md`, 44px | same as filter | same as filter |
| `toggle` | `radius-md`, 46px, checkbox (`radius-xs`) | `color-primary-subtle` + `border-selected`, filled checkbox | `surface`, `border-strong`, empty checkbox |

## States

| State | Treatment | Status |
| --- | --- | --- |
| Selected / unselected | above | shown |
| Pressed | unselected → `surface-sunken`; selected filter/choice → `blue-700`; selected toggle → `blue-200` | proposed |
| Focused | `focus-ring` | proposed |
| Disabled | `surface-sunken`, no border, `text-disabled` | proposed |

## The consumer provides

A short label (1–2 words), `selected`, `onClick`. Set `aria-pressed` for choice and toggle chips; filter chips that switch a panel should be `role="tab"` with `aria-selected`.

The screens outline unselected chips with `border-subtle` (1.22:1) and draw checkboxes in `neutral-400` (2.44:1). Both are now `border-strong` (3.50:1).
