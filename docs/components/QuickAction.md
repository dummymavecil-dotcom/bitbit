---
category: Actions
---

# QuickAction

QuickAction is the pair of big two-line buttons on Home that start the app's two main flows: Tap to share and Scan reseta.

- Put them in a two-column grid with `grid-gap` (12px), always as a pair: `primary` tone for sharing, `secondary` (cyan) for scanning.
- Put English on the title line and Filipino or a helper phrase on the subtitle line.
- Tokens: `color-primary-action` or `color-secondary` fill, `text-on-brand` or `text-on-secondary`, `radius-lg`, 64px minimum height, 36px icon disc.

| State | primary | secondary | Status |
| --- | --- | --- | --- |
| Default | `blue-600` | `cyan-400`, ink text (10.33:1) | shown |
| Pressed | `blue-700` | `cyan-600`, ink text (4.92:1) | proposed |
| Focused | `focus-ring` | `focus-ring` | proposed |
| Disabled | `surface-sunken`, `text-disabled` | same | proposed |

Don't add a third quick action. A third one belongs in the tile grid.
