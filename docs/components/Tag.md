---
category: Status
---

# Tag

Every record carries exactly one of three tags that say who vouches for it. Show the highest level the record has reached; the original source stays attached either way.

| Kind | Meaning | Fill | Text / icon | Border | Contrast |
| --- | --- | --- | --- | --- | --- |
| `provider` | Entered or reviewed by a provider | `info-bg` | `info`, check-circle icon | 1px solid `info-border` | 5.84:1 text |
| `document` | Copied from a scanned paper record; original attached | `success-bg` | `cyan-800`, document icon | 1px solid `color-secondary-strong` (3.21:1) | 8.50:1 text |
| `patient` | Entered by the patient from memory | `warning-bg` | `warning`, pencil icon | 1px **dashed** `warning-border` | 6.67:1 text |

- The three tags differ in word, icon, border style and hue, so they still read in grayscale and on the printed page (print marks: ✓ Reviewed, ▤ Document with a double border, ✎ Reported with a dashed border).
- A provider reviewing a document-sourced or patient-reported entry makes it `provider`. A patient editing a copied value after saving makes it `patient`, with the original still attached.
- AI extraction and the patient's own check are not tags. Write them in the source line: "Copied by Bitbit from your prescription · checked by you, Sep 26".
- Place the tag top-right of a record row, or after the name on the allergy strip. Tags aren't interactive; explain them through the source line under the record.
- `verified` and `self` still work as aliases of `provider` and `patient`.
