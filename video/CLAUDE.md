# Bitbit video: instructions for AI agents

Programmatic motion graphics with **Remotion 4.0.533** (React → MP4). Every frame is a pure function of
the frame number. Read this file fully before editing; then load the `remotion-best-practices` skill in
`.claude/skills/` for API details (it routes to the official Remotion skills).

Work from this folder (`video/`). It is a standalone npm package, separate from the `@bitbit/ui`
design-system package at the repo root. Use **npm** (there is a package-lock.json).

## Commands

| Task | Command |
| --- | --- |
| Install | `npm install` |
| Preview (Studio, http://localhost:3000) | `npm run studio` (agents: `npx remotion studio --no-open`) |
| List compositions | `npm run compositions` |
| Render the sample | `npm run render:sample` → `out/bitbit-intro.mp4` |
| Render any composition | `npx remotion render <CompositionId> out/<name>.mp4` |
| Render one frame to check layout | `npx remotion still <CompositionId> out/frame.png --frame=60` |
| Override props when rendering | `npx remotion render BitbitIntro out/x.mp4 --props='{"tagline":"Hello"}'` |
| New composition | `npm run new -- MyVideo --seconds 10` |
| Check before finishing | `npm run typecheck && npm run lint` |

After any visual change, render 2–4 stills at key frames (`remotion still … --frame=N`) and look at them.
Only render a full MP4 when asked or as the final check. Don't overwrite user edits you didn't expect.

## Layout of the project

```
src/
  index.ts              registerRoot (entry point; set in remotion.config.ts)
  Root.tsx              every <Composition> is registered here (id = render name)
  config/video.ts       VIDEO = { width: 1920, height: 1080, fps: 30 }  ← change resolution / fps here
  theme/index.ts        Bitbit colours, type scale, radii; loads Inter from public/fonts
  utils/animation.ts    progress, mix, springIn, stagger, fadeInOut, enterStyle, EASE, CALM_SPRING
  utils/time.ts         sec(), useSec(), beatToFrame()
  utils/layout.ts       useScale() (design at 1920 wide, multiply sizes by it)
  components/           Scene, Background, AnimatedText, Reveal, PopShape, PulseRings, DrawPath, CountUp, Pill, SoundBars
  compositions/
    BitbitIntro/        the sample: schema.ts → timing.ts → scenes/*.tsx → BitbitIntro.tsx
    _template/          copied by `npm run new`
public/                 static assets, referenced with staticFile('…')
  audio/ fonts/ images/
scripts/new-composition.mjs
out/                    renders (git-ignored)
```

## Hard rules (Remotion)

- **Animate only from `useCurrentFrame()`.** No CSS transitions/animations, no `setTimeout`, no
  `requestAnimationFrame`, no `Date.now()`. They break rendering (each frame renders in isolation).
- **No `Math.random()`.** Use `random('seed')` from `remotion` (deterministic).
- **Time in seconds, converted with `sec(seconds, fps)`** (or `useSec()`). Never hard-code frame counts,
  so changing `VIDEO.fps` keeps the pacing.
- **Sizes in 1920-wide design pixels × `useScale()`**, so changing `VIDEO.width/height` keeps the layout.
- Assets go in `public/` and are loaded with `staticFile('audio/x.mp3')`. Use Remotion's `<Img>`,
  `<Video>`/`<Audio>` from `@remotion/media`, never plain `<img>`/`<audio>`/`<video>`.
- Fonts: add woff2 files to `public/fonts/` and load with `@remotion/fonts` `loadFont()` (see theme).
  Don't load fonts from the network; renders must work offline.
- Keep `defaultProps` in `Root.tsx` as an **inline object literal** so Studio can save prop edits.
  Declare props with a zod schema (`schema=`) so they're editable in Studio.
- Async work before a frame can render (fetching data, measuring) must use `delayRender()` /
  `continueRender()`, or `calculateMetadata` on the `<Composition>`.
- Run `npm run typecheck && npm run lint` (Remotion's ESLint rules catch most of the above).

## How to build a scene

1. Wrap it in `<Scene background={<Background seed="unique" />}>` (font, ink colour, title-safe margin).
2. Stage elements with delays **in seconds**: kicker at 0.1, headline at 0.3, supporting items 0.5+.
   Use `stagger(i, 0.12, 0.5)` for lists.
3. Hold: leave ≥1 s with everything settled before the scene ends, so viewers can read.
4. Let the transition between scenes handle the exit; don't also fade content out.

## Animating typography

- `<AnimatedText text="…" by="word" | "char" | "line" delay stagger rise blur highlight highlightStyle />`
  - `word` for headlines, `char` for short punchy titles (≤ 20 chars), `line` for multi-line statements
    (use `\n` in the text).
  - `highlight={["hands."]}` + `highlightStyle={{ color }}` colours specific words.
- Sizes from `TYPE` in theme (`hero`, `display`, `title`, `body`, `overline`), × `useScale()`.
- Numbers: `<CountUp to={6.8} decimals={1} suffix="%" />` (tabular figures, no jitter).
- Reading time: allow about 0.3 s per word on screen after it lands.

## Animating graphics

- Primitive shapes: `@remotion/shapes` (`Circle`, `Rect`, `Triangle`, `Star`, `Pie`…) inside
  `<PopShape x y delay spin rotate float>` for a calm spring entrance and gentle float.
- Strokes that draw on: `<DrawPath d="…" viewBox="0 0 24 24" size={120} stroke="#fff" />`
  (uses `evolvePath` from `@remotion/paths`). Bitbit icon paths are in `../src/components/Icon.tsx`.
- Looping pulse: `<PulseRings size={300} />`.
- Anything else: compute `const t = progress(frame, sec(0.4, fps), sec(0.8, fps))` (0→1, eased,
  clamped) and drive styles with `mix(t, from, to)` or `enterStyle(t)`.
- Springs: `springIn({ frame, fps, delay })` uses `CALM_SPRING` (no overshoot). Use `interpolate()`
  with `extrapolateLeft/Right: 'clamp'` for anything you write by hand.

## Transitions between scenes

Use `@remotion/transitions`:

```tsx
<TransitionSeries>
  <TransitionSeries.Sequence durationInFrames={sec(4, fps)}><SceneA /></TransitionSeries.Sequence>
  <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: sec(0.7, fps), easing: EASE.inOut })} />
  <TransitionSeries.Sequence durationInFrames={sec(4, fps)}><SceneB /></TransitionSeries.Sequence>
</TransitionSeries>
```

Presentations (import from `@remotion/transitions/<path>`): `fade`, `slide({ direction })`, `wipe`,
`flip`, `clock-wipe`, `iris`, `dissolve`, `blur-slide`, `zoom-in-out`, `push-cut` and more (see
`node_modules/@remotion/transitions/package.json` exports). For Bitbit, prefer `fade` and `slide`. Transitions **overlap** neighbouring scenes, so total duration =
sum of scenes − sum of transitions. Compute it (see `compositions/BitbitIntro/timing.ts`) instead of
hard-coding `durationInFrames`. For a single element appearing mid-scene, use `<Sequence from>`.

## Audio and sync

- Music / voice-over: `<Audio src={staticFile('audio/track.mp3')} volume={(f) => …} />` from
  `@remotion/media`. Put it at the composition level, outside the `TransitionSeries`.
  Props: `volume` (number or per-frame function), `trimBefore`/`trimAfter` (frames), `playbackRate`, `loop`.
- Delay audio by wrapping it in `<Sequence from={sec(2, fps)}>`.
- Hit animations on the music: `beatToFrame(beat, bpm, fps, offsetSeconds)` gives the frame of a beat.
  The sample track (`public/audio/sample-pad.mp3`, synthesized, 16 s) pulses at 100 BPM.
- Hit animations on a voice-over: list cue times in seconds next to the script and convert with `sec()`.
- Audio-reactive visuals: `<SoundBars src={…} mode="level" | "spectrum" audioFrameOffset={…} />`
  (copy its pattern: `useWindowedAudioData` + `visualizeAudio`/`visualizeAudioWaveform`).
- Fit the composition to an audio file's length: `calculateMetadata` + `getAudioDurationInSeconds`
  from `@remotion/media-utils`.
- Captions/subtitles: load the `remotion-captions` skill.

## Changing resolution, frame rate, duration

- Whole project: edit `src/config/video.ts` (`width`, `height`, `fps`).
- One composition: set `width`/`height`/`fps` on its `<Composition>` in `Root.tsx`.
- Sample duration: edit the seconds in `compositions/BitbitIntro/timing.ts` (`SCENES`, `TRANSITION_SECONDS`).
- New compositions: `<Name>_SECONDS` at the top of the composition file.
- One-off render overrides: `--scale=2` (4K from 1080p), `--frames=0-89`, `--fps` isn't a render flag:
  change config instead.

## Bitbit brand rules (from ../docs/guides/brand.md)

- Calm, smooth, **no bounce**. Use `EASE.enter` / `CALM_SPRING`; no elastic or overshooting motion.
- White text only on `blue600` (#0070d9) or darker, never on `blue500` (#0084ff).
- Colour jobs are exclusive: blue = actions/trust, cyan = scan/success, **yellow = Self-input only**,
  **pink = allergies/destructive only**.
- Health data is shown as facts with reference ranges ("6.8% · ref. below 5.7%"); never "High",
  "Normal" or advice. Allergies come first.
- English first; Filipino as a smaller second line in `textTertiary`. No emoji.
- Don't redraw the Bitbit logo mark; use the wordmark text or the official asset.

## Rendering notes

- Defaults (remotion.config.ts): H.264, CRF 18, yuv420p, JPEG frames, overwrite on.
- Transparent video: `--codec=prores --prores-profile=4444 --image-format=png --pixel-format=yuva444p10le`.
- First render downloads Chrome Headless Shell. If that's blocked, point at an installed Chrome:
  `REMOTION_BROWSER_EXECUTABLE=/path/to/chrome npx remotion render …`.
- Upgrade all Remotion packages together: `npm run upgrade` (they must share one exact version).
