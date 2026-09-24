import { build } from 'esbuild';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });
await build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  format: 'esm',
  jsx: 'automatic',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  target: 'es2020',
});
// One stylesheet: tokens first, then component styles.
const FONT = "@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..800;1,14..32,400..700&display=swap');\n";
const css = FONT + readFileSync('design-tokens/bitbit.tokens.css', 'utf8') + '\n' + readFileSync('src/components.css', 'utf8');
writeFileSync('dist/styles.css', css);
console.log('built dist/index.js and dist/styles.css');
