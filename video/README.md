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
