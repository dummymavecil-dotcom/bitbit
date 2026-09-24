# Do's and don'ts

Eight pairs drawn from patterns in the Bitbit screens.

| # | Do | Don't |
| --- | --- | --- |
| 1 | **Mark provenance with the full Tag:** word, icon and border style. `Tag kind="self"` reads "✎ Self-input" with a dashed `warning-border`, so it survives grayscale and the printer. | Signal Verified vs Self-input with colour alone: a blue or yellow dot, a tinted row or a coloured name. |
| 2 | **Put white text on `blue-600` (4.86:1)** for buttons, selected chips and the health card. | Put small white text on brand `blue-500` (3.66:1). Keep it for the logo, the FAB and icons. |
| 3 | **Keep Allergies first and pink:** the `allergy` Card is the first data block on Home, the first box on the printout, and on by default when sharing. | Use pink tints for anything else (the vitals tile, a date badge) or move allergies below the fold. Pink has to mean "this can kill in minutes". |
| 4 | **Reserve yellow for Self-input:** `warning-bg` appears only where data is unconfirmed. | Use yellow tints as decoration on category tiles (Lab results, Immunization), where they look like "unconfirmed". |
| 5 | **Pair one primary with a secondary:** "Start sharing" (primary, `size="lg"`) over "Print one-page summary" (secondary), `list-gap` between them. | Stack two filled `blue-600` buttons, or make Print a primary. The screen has one job. |
| 6 | **Record facts:** "HbA1c · 6.8% · ref. below 5.7%", with the source line under it. | Interpret or advise: "High!", "Normal", "Cut down on sugar". Bitbit stores and shows; it makes no clinical claim. |
| 7 | **Show consent and the exit together:** section toggles and "Access lasts" before sharing; a Revoke button whenever access is active; every read in the Access log. | Share with one tap using hidden defaults, or bury Revoke in settings. |
| 8 | **Put English first and Filipino second:** "Scan reseta" over "Add a medicine"; "Access log" over "Sino ang tumingin", in `body-sm` / `text-tertiary`. | Mix languages inside one label ("I-scan ang reseta now") or give the Filipino line equal weight. |

## Also

- Do outline controls with `border-strong`. Don't outline inputs with `border-subtle`: it is 1.22:1 and disappears in sunlight.
- Do separate cards with `border-subtle` and `section-gap`. Don't add drop shadows to list cards; shadows are for things that float (`elevation-2`, `elevation-brand`).
