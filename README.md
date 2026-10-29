# sidp24.github.io

Personal site of Siddharth Paul: physics, computer science, and mathematics at Rutgers.

Next.js 16 (static export), TypeScript, Tailwind v4, MDX + KaTeX for notes. Deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Editing content

Almost everything is typed data in `content/`:

| File | Drives |
| --- | --- |
| `site.ts` | name, email, links, nav |
| `research.ts` | lab/advisor line, talks and reports, lab log |
| `education.ts` | degree, coursework, skills |
| `experience.ts` | `/experience/` and the CV |
| `projects.ts` | `/projects/` (set `featured` / `short` to show on the home page) |
| `activities.ts` | robotics, hackathons, speaking, mentoring, honors |
| `notes/*.mdx` | `/notes/` |

The research write-up itself is prose in `app/research/page.tsx`.

### Notes

Each note is an `.mdx` file in `content/notes/` exporting `metadata` (`title`, `date`, `summary`, `draft`). Math uses `$…$` and `$$…$$`; `<Figure>` and `<Tex>` are available without imports.

`draft: true` notes appear in `npm run dev` but are left out of the notes list, nav, home page, and sitemap in production. They're still built (unlisted, `noindex`) because static export needs at least one page per dynamic route. Flip a note to `draft: false` to publish it. The Notes nav link appears once one is published.

### Images and PDFs

`npm run assets` copies and resizes figures, photos, and the CV/résumé PDFs from their working folders (see the manifest in `scripts/import-assets.mjs`) into `public/`, and redraws `app/opengraph-image.png`. Re-run it after a figure or résumé changes, then commit the results.

## Local development

```bash
npm install
npm run dev     # http://localhost:3000, drafts visible
npm run build   # static site in out/
npm start       # serve out/ locally
```
