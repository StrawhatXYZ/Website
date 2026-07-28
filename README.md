# Strawhat XYZ

Marketing site for Strawhat XYZ — built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com).

The site is intentionally minimal: a home page and an about page, no blog/notes/tags.

## Commands

All commands are run from the root of the project, using [pnpm](https://pnpm.io).

| Command         | Action                                           |
| :--------------- | :------------------------------------------------ |
| `pnpm install`   | Installs dependencies                            |
| `pnpm dev`       | Starts the local dev server at `localhost:4321`  |
| `pnpm build`     | Builds the production site to `./dist/`          |
| `pnpm postbuild` | Builds the Pagefind static search index          |
| `pnpm preview`   | Previews the production build locally            |
| `pnpm check`     | Type-checks and lints (astro check + biome)      |
| `pnpm lint`      | Lints and auto-fixes with biome                  |
| `pnpm format`    | Formats the codebase with prettier               |

## Project structure

```
src/
  pages/           # index.astro (home), about.astro, 404.astro
  components/      # header, footer, search, social links, etc.
  layouts/          # Base.astro page shell
  site.config.ts   # site title, description, author, nav links
  assets/          # logo and other build-time assets
public/            # static files served as-is (icon.png, social-card.png, etc.)
```

## Configure

- Site metadata (title, description, author, nav links) lives in `src/site.config.ts`.
- Social links are in `src/components/SocialList.astro`.
- The favicon/app icons are generated at build time from `public/icon.png` via [astro-webmanifest](https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md) — see `astro.config.ts`.
- The header logo is `src/assets/strawhat-logo.svg`, rendered through Astro's `<Image>` component (rasterized to WebP at build time since the source is a large traced illustration).

## Search

[Pagefind](https://pagefind.app/) provides static search over the built site. It indexes after `pnpm build` via the `postbuild` script, so local search only works after running both `pnpm build && pnpm postbuild` (or `pnpm preview` after a build).

## Deploy

This site prerenders to static HTML (`output: "static"` in `astro.config.ts`), so it deploys to any static host. See the [Astro deployment docs](https://docs.astro.build/en/guides/deploy/) for platform-specific guides.

### Google App Engine (standard environment)

`app.yaml`, `main.py`, `requirements.txt`, and `.gcloudignore` at the repo root configure a deploy to App Engine standard. Every real route is served directly by the static handlers in `app.yaml`; `main.py` only exists as a fallback so a URL that matches no static handler still gets the site's real `dist/404.html` with a proper HTTP 404 status (App Engine standard's Python 3.x runtimes require an `entrypoint` even for an otherwise fully static site).

```bash
pnpm build && pnpm postbuild   # produces ./dist/, including the pagefind index
gcloud app deploy
```

`.gcloudignore` deliberately does not exclude `dist/` (unlike `.gitignore`), so make sure it's freshly built before deploying — `gcloud` uploads whatever is on disk at deploy time, it doesn't run the build itself.

## Acknowledgment

Built on top of the [Astro Cactus](https://github.com/chrismwilliams/astro-theme-cactus) starter theme.
