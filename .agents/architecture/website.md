# Website structure — mcpaimon.github.io

This repository's own site structure and how-to guides.

## Website repository structure

Every site in the MCEngine ecosystem shares this repository layout. `{org}` is
this repository's organization/name and `{section}` is a page folder (for
example `home`, `api`, `logs`).

```
{org}.github.io/
├── AGENTS.md                         # agent rules for this repository (this file)
├── INDEX.md                          # repository structure index
├── README.md                         # human-facing project overview
└── docs/                             # served by GitHub Pages (Settings → Pages → branch master, folder /docs)
    ├── index.html                    # homepage
    ├── {section}/index.html          # one folder per page/section
    ├── css/                          # OPTIONAL — only this repo's OWN custom styles
    │   └── {section}/{section}.css   #   per-section stylesheet (custom only)
    ├── js/                           # OPTIONAL — page scripts (e.g. site.js include loader)
    └── partials/                     # OPTIONAL — shared header/footer fragments
        ├── header.html
        └── footer.html
```

### Shared theme — vendored locally

The visual language (design tokens, layout, and components) is the shared
MCEngine "Silver Glass" design system, documented in this repository's own
`DESIGN.md` (a copy kept in sync with the canonical `DESIGN.md` in
`MCEngine/mcengine.github.io`). Each site vendors its own copy of the theme
locally so it has no runtime dependency on another repository:

* The theme files live under `docs/` in this repository — either the modular
  theme (`docs/css/main.css`, `docs/css/shared/layout.css`,
  `docs/css/shared/components.css`) or the single-file theme
  (`docs/styles/main/style.css` plus `docs/scripts/main/script.js`).
* Every page links these local files with **relative** paths. Never import a
  stylesheet or script over the network (`https://mcengine.github.io/...` or raw
  content URLs).
* Add a local `docs/css/{section}/{section}.css` (or extend the single-file
  theme) only for this repository's own custom, per-page styling.

---

## Which theme variant this repository uses

This site vendors the **single-file** variant: `docs/styles/main/style.css` and
`docs/scripts/main/script.js`. It has no `partials/` and no `js/site.js`
include loader, so **the header and footer are written into every page**. A new
section therefore has to be added to each existing page's nav by hand — there is
no single file to edit.

Per-section styles go in `docs/styles/{section}/{section}.css`, linked after
the main stylesheet.

---

## How to add or update content

### Add a new page

1. Create `docs/{section}/index.html`.
2. Copy the `<head>`, `<header class="site-header">`, and
   `<footer class="site-footer">` of an existing page at the same depth, and fix
   every relative path for the new depth (`../` one level deep, `../../../../`
   four levels deep).
3. Link `styles/main/style.css` first, then
   `styles/{section}/{section}.css` if the page needs its own layout, both with
   that same relative prefix. Link `scripts/main/script.js` before `</body>`.
4. Mark the page's own nav entry with `aria-current="page"`.
5. If it is a top-level section, add a nav link **and a footer link to every
   existing page** — they are not shared.
6. Update [`../../INDEX.md`](../../INDEX.md) and bump [`../../VERSION`](../../VERSION).

---

## How to create a change log

Logs use a **versioned directory structure** so every published build gets a
permanent URL: `docs/logs/{major}/{minor}/{patch}/index.html` (for example
`docs/logs/1/0/0/`, `docs/logs/3/0/0/`, `docs/logs/3/1/0/`).

`docs/logs/index.html` always mirrors the **latest** release; each versioned
page is the permalink for that specific version. To publish a new log for
version `X.Y.Z`:

1. **Create the versioned page** `docs/logs/X/Y/Z/index.html`.
   * Copy the most recent versioned page as a starting point.
   * A page four levels deep prefixes every path with `../../../../` back to
     `docs/`, and `../../../` back to `docs/logs/`. Link
     `styles/main/style.css` and `styles/logs/logs.css`.
   * Fill in the version, date, and change sections. Use
     `log-tag--new` / `log-tag--improve` / `log-tag--note` for
     Added / Changed / Note, and a `.notice` block for anything breaking.
   * Date the entry from the release's merge commit, not the day you write it.
2. **Update the version list** (`.logs-nav`) on **every** log page so it lists
   each version, newest first. The newest entry keeps the `Latest` pill and
   points at `docs/logs/index.html`, because the index mirrors it; give the
   entry matching the page it sits on `class="is-current"`.
3. **Refresh `docs/logs/index.html`** so it shows the new version's content,
   badged `Latest`.
4. **Content rule:** describe *what changed for users and integrators* —
   features, fixes, configuration, and public-API changes only. Never paste
   internal implementation details, and never embed source listings (see
   [`../rules/repository.md`](../rules/repository.md)).
5. Update [`../../INDEX.md`](../../INDEX.md) with the new log path and bump
   [`../../VERSION`](../../VERSION).

> Semantic Versioning: `Major.Minor.Patch`. Keep the directory numbers in sync
> with the released version of the plugin the log describes.

---

## Verifying changes

Serve the site locally and click through the affected pages — links must
resolve and there must be no console errors:

```bash
python3 -m http.server 8000 --directory docs
# then open http://localhost:8000/
```

Check each page you touched at a wide and a narrow viewport: the body must never
scroll horizontally, and a per-section stylesheet must actually apply (a
mistyped relative path fails silently and leaves the page unstyled).
