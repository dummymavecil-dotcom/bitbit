---
category: Selection
---

# SegmentedControl

A segmented control switches between two or three views of the same content: All / Verified / Self-input on Records, and Tap (NFC) / QR code on Share.

- Track: `surface-sunken`, `radius-md`, `space-4` padding. Segments: `radius-sm`, `segment-height` (40px).
- The selected segment gets `surface`, `text-primary` and `elevation-1`. Unselected segments show `text-secondary` on the track (5.95:1).
- Pressed: 60% white wash (proposed). Focused: `focus-ring` (proposed). Disabled: `text-disabled` (proposed).
- Records draws its segments at 36px and Share at 40px. Use `segment-height` for both.
- Use a segmented control only for 2–3 options. For more, use filter chips.
