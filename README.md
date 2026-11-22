# Remotion Animation Workspace

A vertical 2D animation workspace built with Remotion and React.

## Video format

- 1080 × 1920 (9:16 vertical)
- 30 FPS
- Starter composition: `Main` (6 seconds)

## Local or cloud development

Install dependencies and open Remotion Studio:

```bash
npm install
npm run dev
```

## Render MP4 locally

```bash
npm run render
```

The rendered video is written to `out/main.mp4`.

## Render MP4 in GitHub Actions

1. Open the repository's **Actions** tab.
2. Select **Render MP4**.
3. Click **Run workflow**.
4. When the job finishes, open the run and download the `main-video` artifact.

The workflow is manually triggered, so it does not render or consume runner time on every commit.

## Project structure

- `src/index.ts` — Remotion entry point
- `src/Root.tsx` — video composition registration
- `src/scenes/Main.tsx` — first animated scene

This starter is the foundation for story scenes, vector characters, expressive motion, camera moves, and reusable animation components.
