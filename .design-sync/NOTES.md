# design-sync notes

- Package `@bitbit/ui` lives at the repo root. Build it with `npm ci && npm run build` (esbuild bundle + `tsc` declarations). Then run the converter with `--node-modules ./node_modules --entry ./dist/index.js`.
- `dist/styles.css` is generated: a Google Fonts `@import` for Inter, then `design-tokens/bitbit.tokens.css`, then `src/components.css`. Edit those sources, not dist.
- Components use `font: inherit`. `src/components.css` therefore ends with a family-lock rule, and has an `html, body` base rule. Removing either makes previews render in a serif fallback.
- Component docs (`docs/components/*.md`) set the card group through `category` front matter. Guidelines come from `docs/guides/*.md`, copied from the Bitbit Design System artifact.
- Every authored preview except IconButton and SegmentedControl uses `cardMode: "column"`: the compositions are phone-width (350px) and overflowed the grid cells.
- The Playwright version must match the cached chromium: this container has chromium-1194 in /opt/pw-browsers, which is `playwright@1.56.1`, installed into `.ds-sync/`.

## Known render warns
- None open. The capture browser couldn't load Inter from fonts.googleapis.com (sandboxed network), so sheets show a fallback sans. `[FONT_REMOTE]` is expected.

## Re-sync risks
- The Inter font is loaded remotely, not shipped. If Claude Design blocks Google Fonts, designs fall back to system sans. The fix is to ship Inter woff2 files through `cfg.extraFonts`.
- The QuickAction title wraps to two lines in the fallback font at 169px columns. Recheck it in Claude Design once Inter loads.
- `docs/guides/*.md` and `docs/components/*.md` are copies of the Bitbit Design System artifact. Re-copy them when that artifact changes.
- The first sync never uploaded: DesignSync had no claude.ai/design authorization in this cloud session. There is no projectId pinned yet.
