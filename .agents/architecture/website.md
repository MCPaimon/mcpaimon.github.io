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

This repository composes its chrome with a script rather than with `partials/`
fragments; see [Runtime-composed chrome](#runtime-composed-chrome) below.

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
`docs/scripts/main/script.js`.

Per-section styles go in `docs/styles/{section}/{section}.css`, linked after
the main stylesheet.

---

## Runtime-composed chrome

The header and footer are **not** written into each page. They are rendered by
`docs/scripts/main/chrome.js`, which owns the navigation and the footer links,
in line with the "runtime-composed chrome" principle in `DESIGN.md`. A page
carries two empty placeholders and says where it sits:

```html
<body data-page="npc" data-root="../">
  <header class="site-header" data-site-header></header>
  ...
  <footer class="site-footer" data-site-footer></footer>

  <script src="../scripts/main/chrome.js"></script>
  <script src="../scripts/main/script.js"></script>
</body>
```

* `data-page` is the id of the nav entry to mark with `aria-current="page"`.
* `data-root` is the relative path back to the site root (`./`, `../`,
  `../../../../`). Relative rather than absolute, so the site still works when
  served from somewhere other than a domain root.
* `chrome.js` must be loaded **before** `script.js`. It renders synchronously,
  so the links exist by the time the page-transition script binds to them.

Adding a top-level section is therefore one entry in the `NAV` array in
`chrome.js` — not an edit to every page.

The log picker works the same way; see below.

---

## How to add or update content

### Add a new page

1. Create `docs/{section}/index.html`.
2. Copy the `<head>` and the two chrome placeholders from an existing page at
   the same depth, and fix every relative path for the new depth (`../` one
   level deep, `../../../../` four levels deep).
3. Link `styles/main/style.css` first, then
   `styles/{section}/{section}.css` if the page needs its own layout, both with
   that same relative prefix. Link `scripts/main/chrome.js` and then
   `scripts/main/script.js` before `</body>`.
4. Set `data-page` and `data-root` on `<body>`.
5. If it is a top-level section, add it to the `NAV` array in
   `docs/scripts/main/chrome.js` — once, not per page. Add it to `FOOTER` too if
   it belongs there.
6. Update [`../../INDEX.md`](../../INDEX.md) and bump [`../../VERSION`](../../VERSION).

---

## How to create a change log

Logs use a **versioned directory structure** so every published build gets a
permanent URL. Each plugin has its own namespace under `docs/logs/`, and its own
index page that mirrors its latest release:

| Plugin | Index | Permalinks |
|---|---|---|
| MCAgents | `docs/logs/index.html` | `docs/logs/{major}/{minor}/{patch}/index.html` |
| MCAgentsNPC | `docs/logs/npc/index.html` | `docs/logs/npc/{major}/{minor}/{patch}/index.html` |

MCAgents sits at the root of `docs/logs/` for historical reasons — its
permalinks predate the namespaces and must not be moved. A new plugin gets a
folder of its own.

### The picker is rendered, not copied

The version list is **not** written into each page. `docs/scripts/logs/logs-nav.js`
owns every release, and a log page carries an empty placeholder:

```html
<aside class="logs-nav" aria-label="Log versions"
       data-logs-nav data-current="MCAgents:5.1.0" data-back="logs/"></aside>
```

* `data-current` is `"<product>:<version>"` — the entry to mark as current.
* `data-back` is optional and relative to `data-root`; give it to a permalink
  page, omit it on an index page (which *is* the latest).
* Load `scripts/logs/logs-nav.js` after `chrome.js` and before `script.js`.

Only **five entries per product** are visible; a product with more than five
releases gets a scrollable list (`max-height` + `overflow-y: auto`, applied by
the `is-scrollable` class the script adds) rather than a taller sidebar.

### Publishing a release for version `X.Y.Z`

1. **Create the permalink page** in the plugin's namespace.
   * Copy the most recent one for that plugin as a starting point.
   * Fix `data-root` and every relative path for the page's depth. A page four
     levels below `docs/` uses `../../../../`; one five levels below uses
     `../../../../../`. Link `styles/main/style.css` and `styles/logs/logs.css`.
   * Fill in the version, date, and change sections. Use
     `log-tag--new` / `log-tag--improve` / `log-tag--note` for
     Added / Changed / Note, and a `.notice` block for anything breaking.
   * Date the entry from the release's merge commit, not the day you write it.
2. **Add one entry** to the top of that product's `versions` array in
   `docs/scripts/logs/logs-nav.js`. That is the whole of updating the picker —
   every page picks it up.
3. **Refresh the plugin's index page** so it shows the new version's content,
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
