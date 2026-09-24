---
category: Actions
---

# Button

Use a button for an action on this screen. Use **primary** once per screen for the main action, **secondary** for alternatives and **danger** for revoking access or deleting.

| Variant | Where it appears | Tokens |
| --- | --- | --- |
| `primary` (`size="lg"`, 56px) | Start sharing, Add to my medicines | `color-primary-action` fill, `text-on-brand`, `radius-lg` |
| `secondary` (52px) | Print one-page summary, Retake, See who viewed it | `surface` fill, `border-strong` 1.5px, `text-primary` |
| `danger` (52px) | Revoke access now, Revoke access | `error-bg` fill, `error` 1.5px border and text |

## States

| State | primary | secondary | danger | Status |
| --- | --- | --- | --- | --- |
| Default | `blue-600` / white | white / `border-strong` | `pink-100` / `pink-700` | shown |
| Pressed | `blue-700` | `surface-sunken` | `error` fill, `text-inverse` | proposed |
| Focused | `focus-ring` | `focus-ring` | `focus-ring` | proposed |
| Disabled | `surface-sunken`, `text-disabled` | same | same | proposed |

## The consumer provides

A verb-first label in sentence case ("Start sharing", "Add to my medicines"), `onClick`, and `block` when the button spans the screen width. Put an icon (`icon="printer"`) only when it names the output, as in Print.

## Do and don't

- Do stack a primary and a secondary button with `list-gap` (10px) between them.
- Don't place two primary buttons on one screen, and don't put white text on `blue-500`: its contrast is only 3.66:1.
- Buttons in the screens use radius 18px. The token is `radius-lg` (20px).
