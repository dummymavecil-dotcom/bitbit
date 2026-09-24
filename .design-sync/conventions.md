# Bitbit: how to build with this system

Bitbit is a medical record the patient owns and carries: phone screens 390px wide, one thumb, readable by a stranger in ten seconds. Build screens from `window.Bitbit` components and style your own layout glue only with the CSS variables below.

## Setup
- No provider or wrapper is needed. Everything is plain React and a stylesheet; `styles.css` loads tokens, the component CSS and the Inter font.
- The stylesheet sets `html, body` to `var(--font-sans)`, `var(--text-primary)` on `var(--bg)`. Keep your screen root on `var(--bg)` and don't set other font families.
- Screen frame: `padding: var(--screen-inset-top) var(--screen-margin-x) var(--space-24)`, flex column with `gap: var(--section-gap)`. Don't draw a status bar.

## Components (use these, don't rebuild them)
- Actions: `Button` (variant `primary` | `secondary` | `danger`; `size="lg"` for the main CTA; `block`; `icon`), `QuickAction` (Home's two big tiles: `tone` primary/secondary, `title`, `subtitle`), `IconButton` (always pass `label`; `dot` for unread; `variant="inverse"` on dark).
- Selection: `Chip` (`variant` filter | choice | toggle, `selected`), `SegmentedControl` (`options`, `value`, `onChange`, `label`).
- Content: `Card` (`variant` surface | brand | allergy | active; `href` makes it a link), `CategoryTile` (`tone` blue | cyan, `icon`, `title`, `detail`, `count`), `RecordRow` (`month`, `year`, `name`, `detail`, `source`, `verified`), `Tag` (`kind` verified | self), `Icon` (`name`, `size`).
- Inside `Card`, use the helper classes `bb-card-eyebrow`, `bb-card-title` and `bb-card-sub` for its text.

## Tokens for your own glue (`var(--name)`)
- Surfaces: `--bg`, `--surface`, `--surface-sunken`, `--surface-brand`, `--surface-inverse`. Borders: `--border-subtle` (cards), `--border-strong` (inputs and controls), `--border-selected`.
- Text: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-link`, `--text-on-brand`, `--text-inverse`.
- Meaning: `--info` / `--info-bg` (Verified, blue), `--warning` / `--warning-bg` (Self-input, yellow), `--error` / `--error-bg` (allergies and revoke, pink), `--success` / `--success-bg` (cyan).
- Spacing: `--space-4` … `--space-24`, `--grid-gap`, `--list-gap`, `--card-padding`. Radius: `--radius-md` 14, `--radius-lg` 20, `--radius-xl` 24, `--radius-2xl` 28, `--radius-full`. Shadows: `--elevation-1`, `--elevation-brand`, `--focus-ring`.

## Rules the agent must keep
- Allergies come first on any record screen, in `Card variant="allergy"`. Pink (`--error*`) means allergies or destructive actions only; yellow (`--warning*`) means Self-input only.
- Every record shows a `Tag`. Values are facts with reference ranges, never advice ("High", "Normal", tips).
- One `size="lg"` primary Button per screen. White text only on `--color-primary-action` or darker, never on `--color-primary` (#0084ff).
- English label first, Filipino as a smaller second line (`--text-tertiary`, 13px).

## Example
```jsx
const { Card, Tag, CategoryTile, QuickAction } = window.Bitbit;
<div style={{ background: 'var(--bg)', padding: '56px 20px 24px', display: 'flex', flexDirection: 'column', gap: 'var(--section-gap)' }}>
  <Card variant="allergy" href="#allergies">
    <span className="bb-card-title">Allergies</span>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', borderRadius: 16, padding: '10px 12px' }}>
      <span style={{ fontWeight: 700 }}>Penicillin</span><Tag kind="verified" />
    </div>
  </Card>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--grid-gap)' }}>
    <QuickAction icon="contactless" title="Tap to share" subtitle="Ibahagi" />
    <QuickAction tone="secondary" icon="scan" title="Scan reseta" subtitle="Add a medicine" />
    <CategoryTile icon="pill" title="Medication" detail="Losartan, Metformin" count={2} href="#meds" />
    <CategoryTile tone="cyan" icon="flask" title="Lab results" detail="HbA1c 6.8% · Mar 2026" count={6} href="#labs" />
  </div>
</div>
```
