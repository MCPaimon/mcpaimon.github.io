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

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — how the MCAgents main plugin works. |
| docs/playertools/index.html | `/playertools/` — how the PlayerTools extension works. |
| docs/servertools/index.html | `/servertools/` — how the ServerTools extension works. |
| docs/styles/main/style.css | Vendored shared theme — tokens, components, page transitions. |
| docs/scripts/main/script.js | Vendored page transition controller. |

## Vendored Theme

The pages carry their own local copy of the shared MCEngine theme (white/silver/modern) — there is no runtime dependency on another repository. The design system is documented in this repository's `DESIGN.md`.

- `docs/styles/main/style.css` — tokens, components, page transitions.
- `docs/scripts/main/script.js` — page transition controller.

Pages link these with relative paths (for example `styles/main/style.css` from the site root, `../styles/main/style.css` one level deep).
