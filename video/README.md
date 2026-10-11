# Bitbit video

Motion graphics for Bitbit, written in React with [Remotion](https://www.remotion.dev) 4.0.533.

## Quick start

```bash
cd video
npm install
npm run studio          # preview at http://localhost:3000
npm run render:sample   # → out/bitbit-intro.mp4 (1920×1080, 30 fps, ~15 s)
```

## Common tasks

| Task | Command |
| --- | --- |
| Render the full TGIC pitch (≈ 4:50) | `npx remotion render BitbitPitch out/bitbit-pitch.mp4` |
| Render one part of the pitch | `npx remotion render BitbitPitch-P3 out/pitch-part3.mp4` |
| Render the Bitbit explainer (Parts 1–2) | `npx remotion render BitbitExplainer out/bitbit-explainer.mp4` |
| Preview all compositions | `npm run studio` |
| Create a composition | `npm run new -- MyVideo --seconds 10` |
| Render a composition to MP4 | `npx remotion render MyVideo out/my-video.mp4` |
| Render one frame | `npx remotion still MyVideo out/frame.png --frame=60` |
| Render at 4K from a 1080p composition | `npx remotion render MyVideo out/my-video-4k.mp4 --scale=2` |
| Change resolution / fps everywhere | edit `src/config/video.ts` |
| Change the sample's pacing | edit `src/compositions/BitbitIntro/timing.ts` |
| Typecheck + lint | `npm run typecheck && npm run lint` |
| Upgrade Remotion | `npm run upgrade` |

You can also render from Studio: open a composition, click **Render**, pick MP4.

## Working with AI agents

Open this `video/` folder in your agent (Claude Code, Cursor, Codex…). It reads
[CLAUDE.md](./CLAUDE.md) / [AGENTS.md](./AGENTS.md) for the project conventions, and Remotion's
official skills are installed in `.claude/skills/` (update them with
`npx skills update -p`). Example prompts:

- "Create a new 20-second composition called PitchTeaser with three scenes about Bitbit's sharing flow."
- "Sync the headline reveals in BitbitIntro to the beats of public/audio/music.mp3 at 120 BPM."
- "Add a lower-third component and use it in scene 2."

## Assets

Put files in `public/` (`audio/`, `fonts/`, `images/`) and reference them with
`staticFile('audio/track.mp3')`. The sample music bed is synthesized and free to reuse; Inter is
bundled under the SIL Open Font License (`public/fonts/Inter-LICENSE.txt`).

## License note

Remotion is free for individuals, non-profits and companies of up to 3 people; larger companies
need a company license. See https://www.remotion.dev/license.

## Bitbit explainer

`src/compositions/BitbitExplainer/` is the pitch explainer (Parts 1–2, Collect, about 72 s).
It is built like the BitbitIntro sample: straight full-screen scenes joined by slide and fade
transitions, with text revealed line by line and shapes that spring in. Script and line lengths are
in `timing.ts` (`SCRIPT`), and so are the scene start times (`SCENES`) and the transition length;
change a line's `seconds` and every scene and transition after it moves with it. Each scene is a
component in `shots/Part1.tsx` or `shots/Part2.tsx`; which transition brings it in is set in
`ENTRANCE` in `BitbitExplainer.tsx`. To add the voice-over, put the
file in `public/audio/` and set the `narration` prop in Studio (e.g. `audio/narration.mp3`); the
music then drops under it automatically. The brief it was built from is
`../design-prompts/bitbit-explainer-video-prompt.md`.

## Bitbit TGIC pitch

`src/compositions/BitbitPitch/` is the full pitch video (56 narrated lines, 8 parts, about 4:50),
built from `../design-prompts/bitbit-tgic-video-prompt.md`.

- `timing.ts`: the script. Each line has its speaker, narration and `seconds`. When the voice-over is
  recorded, set each line's `seconds` to its real length; every scene, transition and part re-times.
- `scenes/index.tsx`: the scene list (which scene plays at which cue, and how it enters).
- `scenes/p1-problem.tsx` … `p6-p8.tsx`: the scenes. Collect reuses the explainer's scenes.
- `kit.tsx`: recurring pieces (timer, Desk Zero sign, queue ticket, people row).
- `provider.tsx`, `screens-provider.tsx`, `screens-prepare.tsx`: rebuilt app screens.
- Narration: put `pitch-p1.mp3` … `pitch-p8.mp3` in `public/audio/` and turn on the `narration`
  prop in Studio; the music ducks under it.
- `BitbitPitch-P1` … `-P8` are previews of each part, cut from the same timeline.
