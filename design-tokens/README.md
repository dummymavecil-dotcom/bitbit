# Bitbit design tokens

Generated from the Bitbit Design System (light theme).

- `bitbit.tokens.css`: CSS custom properties on `:root`, plus `.text-<style>` classes for the type scale.
- `bitbit.tokens.json`: the same tokens as nested JSON. `color.role.*` keeps each role's palette `ref` next to its resolved `value`.

Components should read role tokens (`--text-secondary`, `--surface-brand`, `--border-strong`), not palette steps (`--blue-600`). Tokens marked "proposed" in the design system fix WCAG AA failures found in the first screen designs.

Load Inter from Google Fonts:
`https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..700&display=swap`
