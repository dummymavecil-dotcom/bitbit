#!/usr/bin/env node
// Scaffold a new composition and register it in src/Root.tsx.
// Usage: npm run new -- PitchTeaser            (PascalCase name, becomes the composition id)
//        npm run new -- PitchTeaser --seconds 12
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith('--'));
const secondsIdx = args.indexOf('--seconds');
const seconds = secondsIdx >= 0 ? Number(args[secondsIdx + 1]) : 5;

if (!name || !/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  console.error('Give a PascalCase name, e.g. `npm run new -- PitchTeaser`');
  process.exit(1);
}
if (!Number.isFinite(seconds) || seconds <= 0) {
  console.error('--seconds must be a positive number');
  process.exit(1);
}

const dir = join(root, 'src/compositions', name);
const file = join(dir, `${name}.tsx`);
if (existsSync(dir)) {
  console.error(`src/compositions/${name} already exists`);
  process.exit(1);
}

const template = readFileSync(join(root, 'src/compositions/_template/Template.tsx'), 'utf8')
  .replace(/^\/\/ Starting point.*\n/, '')
  .replaceAll('NameTemplate', name)
  .replace(`export const ${name}_SECONDS = 5;`, `export const ${name}_SECONDS = ${seconds};`);
mkdirSync(dir, { recursive: true });
writeFileSync(file, template);

const rootFile = join(root, 'src/Root.tsx');
let rootSrc = readFileSync(rootFile, 'utf8');
const importMarker = '// @new-composition-imports';
const compMarker = '{/* @new-composition';
if (!rootSrc.includes(importMarker) || !rootSrc.includes(compMarker)) {
  console.error('Markers missing from src/Root.tsx; register the composition by hand.');
  process.exit(1);
}
rootSrc = rootSrc.replace(
  importMarker,
  `import { ${name}, ${name}Schema, ${name}_SECONDS } from './compositions/${name}/${name}';\n${importMarker}`,
);
const indent = rootSrc.slice(rootSrc.lastIndexOf('\n', rootSrc.indexOf(compMarker)) + 1, rootSrc.indexOf(compMarker));
rootSrc = rootSrc.replace(
  compMarker,
  `<Composition
${indent}  id="${name}"
${indent}  component={${name}}
${indent}  schema={${name}Schema}
${indent}  defaultProps={{ title: '${name}', subtitle: 'Edit src/compositions/${name}/${name}.tsx' }}
${indent}  durationInFrames={Math.round(${name}_SECONDS * VIDEO.fps)}
${indent}  fps={VIDEO.fps}
${indent}  width={VIDEO.width}
${indent}  height={VIDEO.height}
${indent}/>
${indent}${compMarker}`,
);
writeFileSync(rootFile, rootSrc);

console.log(`Created src/compositions/${name}/${name}.tsx (${seconds}s) and registered it in src/Root.tsx.`);
console.log(`Preview: npm run studio    Render: npx remotion render ${name} out/${name}.mp4`);
