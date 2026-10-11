import { bundle } from '@remotion/bundler';
import { renderStill, selectComposition } from '@remotion/renderer';
import path from 'node:path';
const [,, root, outDir, ...times] = process.argv;
const serveUrl = await bundle({ entryPoint: path.join(root, 'src/index.ts'), publicDir: path.join(root, 'public') });
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
const composition = await selectComposition({ serveUrl, id: process.env.COMP ?? 'BitbitExplainer', inputProps: {}, browserExecutable });
for (const t of times) {
  const frame = Math.min(composition.durationInFrames - 1, Math.round(Number(t) * 30));
  await renderStill({ serveUrl, composition, frame, output: path.join(outDir, `t${t}.jpeg`), imageFormat: 'jpeg', jpegQuality: 85, scale: Number(process.env.SCALE ?? 0.5), browserExecutable });
}
console.log('done', composition.durationInFrames);
