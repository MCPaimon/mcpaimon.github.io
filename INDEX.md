# Repository Index

This file is the entry point for any agent working in this repository. Read it first, then [`AGENTS.md`](AGENTS.md) and [`README.md`](README.md).

`mcpaimon.github.io` is the MCPaimon organization website, served by GitHub Pages. Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| AGENTS.md | Universal pointer to the portable `.agents/` instruction set. |
| .agents/ | Portable agent instruction set (rules, git workflow, architecture). See [`.agents/INDEX.md`](.agents/INDEX.md). |
| DESIGN.md | Design system: theme tokens, components, motion, and rules for changing the site (a copy of the shared MCEngine "Silver Glass" system). |
| README.md | Project overview. |
| INDEX.md | This file. |
| VERSION | The site's own semantic version, bumped with every pull request. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — how the MCAgents main plugin works. |
| docs/npc/index.html | `/npc/` — how the MCAgentsNPC plugin works. |
| docs/logs/index.html | `/logs/` — the latest MCAgents release log; mirrors the newest versioned page. |
| docs/logs/{major}/{minor}/{patch}/index.html | Permalink for one released MCAgents version (`1/0/0`, `2/0/0`, `3/0/0`, `3/1/0`, `4/0/0`, `5/0/0`, `5/1/0`). |
| docs/logs/npc/index.html | `/logs/npc/` — the latest MCAgentsNPC release log. |
| docs/logs/npc/{major}/{minor}/{patch}/index.html | Permalink for one released MCAgentsNPC version (`0/0/0`). |
| docs/styles/logs/logs.css | Per-section styles for the log entry and the version picker. |
| docs/styles/main/style.css | Vendored shared theme — tokens, components, page transitions. |
| docs/scripts/main/chrome.js | Renders the shared site header and footer into every page. |
| docs/scripts/logs/logs-nav.js | Owns every published release and renders the log picker. |
| docs/scripts/main/script.js | Vendored page transition controller. |

## Change Logs

Logs use a versioned directory structure so every released build has a permanent
URL. Each plugin has its own namespace and its own index page mirroring its
latest release: MCAgents at `docs/logs/{major}/{minor}/{patch}/` (at the root of
`docs/logs/` for historical reasons — those permalinks predate the namespaces
and must not be moved), and MCAgentsNPC at
`docs/logs/npc/{major}/{minor}/{patch}/`.

The version picker itself is not copied into each page: every release lives in
`docs/scripts/logs/logs-nav.js`, which renders the list and shows five entries
per plugin before the list starts scrolling. Publishing a release is one entry
there plus the two pages the release needs. The full procedure is in
[`.agents/architecture/website.md`](.agents/architecture/website.md).

## Shared Chrome

The site header and footer are rendered by `docs/scripts/main/chrome.js` rather
than written into each page, in line with the "runtime-composed chrome"
principle in `DESIGN.md`. A page carries `<header data-site-header>` and
`<footer data-site-footer>` placeholders and declares `data-page` and
`data-root` on `<body>`; adding a top-level section is one entry in that
script's `NAV` array.

## Vendored Theme

The pages carry their own local copy of the shared MCEngine theme (white/silver/modern) — there is no runtime dependency on another repository. The design system is documented in this repository's `DESIGN.md`.

- `docs/styles/main/style.css` — tokens, components, page transitions.
- `docs/scripts/main/script.js` — page transition controller.

Pages link these with relative paths (for example `styles/main/style.css` from the site root, `../styles/main/style.css` one level deep).
