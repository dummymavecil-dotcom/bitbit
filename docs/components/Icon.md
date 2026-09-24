---
category: Foundations
---

# Icon

Icon is a line icon on a 24px grid with a 2px stroke and round caps, drawn in `currentColor`. It takes its colour from the parent, so set `color` on the wrapper using a token (`var(--success)`, `var(--info)`).

- Sizes: 12–14px inside tags and pills, 18px inside a 36px disc, 20px in buttons, 22px in the tab bar.
- Names: home, folder, eye, user, bell, alert, verified, pencil, contactless, scan, vitals, pill, syringe, flask, stethoscope, clipboard, printer, fileDown, shield, clock, check, chevronRight, chevronLeft, close, search, lock.
- Icons are decorative (`aria-hidden`). Put the meaning in visible text or in the parent control's `aria-label`.
- Record categories map to icons as follows: vitals → Clinical vitals, pill → Medication, stethoscope → Conditions, flask → Lab results, syringe → Immunization, clipboard → Procedures, alert → Allergies.
