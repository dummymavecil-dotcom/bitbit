---
category: Actions
---

# IconButton

IconButton is a round 44px button with an icon and no visible label: bell, search, back, close and flash. Always pass `label`; it becomes the button's `aria-label`.

- `surface` variant: `surface` fill, `border-subtle` edge, `text-primary` icon. Use it on light screens.
- `inverse` variant: `overlay-on-inverse` fill, `text-inverse` icon. Use it on the camera screen.
- `dot`: an unread marker in `error-strong` (`pink-600`, 4.60:1). The screens use `pink-300` (2.14:1), which fails the 3:1 minimum for non-text UI.

| State | Treatment | Status |
| --- | --- | --- |
| Default | as above | shown |
| Pressed | `surface-sunken` (surface variant) · 28% white (inverse variant) | proposed |
| Focused | `focus-ring` | proposed |
| Disabled | `text-disabled` icon | proposed |
