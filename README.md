# Remotion Animation Workspace

A vertical 2D animation workspace built with Remotion and React.

## Video format

- 1080 × 1920 (9:16 vertical)
- 30 FPS
- Starter composition: `Main` (6 seconds)

## Cloud development with GitHub Codespaces

1. Open this repository on GitHub.
2. Click **Code** → **Codespaces** → **Create codespace on main**.
3. When the Codespace opens, run:

   ```bash
   npm run dev
   ```

4. Open the forwarded **Remotion Studio** port (3000) from the **Ports** tab.

The Codespaces configuration forwards port 3000 automatically. The Studio can be opened in a browser on your computer or phone while the Codespace is running.

## Render MP4 in GitHub Actions

1. Open the repository's **Actions** tab.
2. Select **Render MP4**.
3. Click **Run workflow**.
4. When the job finishes, open the run and download the `main-video` artifact.

The workflow is manually triggered, so it does not render or consume runner time on every commit. GitHub Actions usage may count toward your account's included minutes or incur charges depending on your plan.

## Render MP4 locally

```bash
npm install
npm run render
```

The rendered video is written to `out/main.mp4`.

## Project structure

- `src/index.ts` — Remotion entry point
- `src/Root.tsx` — video composition registration
- `src/scenes/Main.tsx` — first animated scene
- `.devcontainer/devcontainer.json` — Codespaces configuration
- `.github/workflows/render-video.yml` — cloud rendering workflow

This starter is the foundation for story scenes, vector characters, expressive motion, camera moves, and reusable animation components.
