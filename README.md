# B Interiors website

Bilingual (English / Arabic) website for B Interiors, built with [Astro](https://astro.build)
and edited with [TinaCMS](https://tina.io). All text and photos live in `content/` and
`public/uploads/`; the design lives in `src/` and is not editable from the CMS.

## For Bayan: editing the site
Go to **`https://<the-site>/admin/`**, sign in, and edit. Everything has an English and an
Arabic box next to each other. Saving publishes the change in about a minute.

* **Headlines:** put `*asterisks*` around a word to show it in gold. A new line is a new line.
* **Replace a photo:** open the page or project, click the photo field, upload the new photo.
  Large phone photos are fine, the site makes web-sized copies automatically.
* **Add a project:** *Projects* → *Add File*, fill in the form. Add *Before & after photos*
  as pairs (each pair becomes a comparison slider).
* **Reorder projects:** change *Position in the portfolio* (1 = first).
* **Contact details / footer / website name:** *Contact details & footer*.

## For developers
Needs **Node 22 or newer** (see `.nvmrc`; with nvm: `nvm install 22 && nvm use`).

```bash
npm install
npm run dev          # site + editing screen at http://localhost:4321 (admin at /admin/)
npm run build:site   # site only (no Tina keys needed) -> dist/
```
* `content/*.json`  page text (each text is `{ "en": "...", "ar": "..." }`)
* `content/projects/*.json`  one file per project
* `src/pages/[lang]/`  page templates, `src/styles/`  design (`rtl.css` = Arabic / right-to-left)
* `tina/config.ts`  what is editable in the CMS
* `scripts/seed-content.py`  one-off generator of the starting content (not needed any more)

### Publishing
`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.
Repository **Variables** (Settings → Secrets and variables → Actions → Variables):

| Variable | Now | On launch |
|---|---|---|
| `SITE_URL` | `https://binteriorsae.github.io` | `https://binteriors.ae` |
| `BASE_PATH` | `/website` | `/` |
| `PUBLIC_NOINDEX` | `true` | `false` |

**Secrets:** `TINA_PUBLIC_CLIENT_ID` and `TINA_TOKEN` from the Tina Cloud project.
