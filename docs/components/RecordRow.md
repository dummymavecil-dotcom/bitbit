---
category: Data display
---

# RecordRow

A record row shows one record in a list: a date badge, then the name, the value, where the record came from, and its provenance tag.

- The consumer provides `month`, `year`, `name`, `detail`, `source` and `verified`. Always pass `source`: it names who verified the record, or says "Added by you".
- Tokens: `surface`, `border-subtle`, `radius-lg`, `card-padding-compact`; date badge `radius-md` on `color-primary-subtle`; `list-gap` between rows.
- Report values as the facility reported them, with the reference range when there is one. Never add judgments like "High", "Normal" or advice.
- The row is read-only. When it opens a detail view, wrap it in a link and use the Card pressed and focus states.
- The screens tint the date badge by category, including pink and yellow. Use `color-primary-subtle` for every category.
