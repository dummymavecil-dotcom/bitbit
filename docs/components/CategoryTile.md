---
category: Navigation
---

# CategoryTile

A category tile opens one record category from the 2×3 grid on Home: Clinical vitals, Medication, Conditions, Lab results, Immunization and Procedures. Allergies is not a tile; it has its own card above the grid.

- Tones: `blue` (`color-primary-subtle`) and `cyan` (`color-secondary-subtle`), alternating in a checkerboard. The screens also use pink and yellow tints, but those colours are reserved for allergies and Self-input (see Screen audit).
- Anatomy: 36px `surface` icon disc, a count top-right in `caption`, a title in `body-strong` and one line of detail in `body-sm` / `text-secondary`.
- Size: `min-height` 108px, `card-padding-compact`, `radius-lg`, `grid-gap` between tiles.
- Counts use one format everywhere: a bare number ("4"). Don't mix in "2 active".

| State | Treatment | Status |
| --- | --- | --- |
| Default | tone fill | shown |
| Pressed | 1.5px `border-strong` | proposed |
| Focused | `focus-ring` | proposed |
| Disabled / empty | `surface-sunken`, `text-disabled`, detail "Nothing added yet" | proposed |
