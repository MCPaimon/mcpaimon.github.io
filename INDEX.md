# Repository Index

This file is the entry point for any agent working in this repository. Read it first, then [`AGENTS.md`](AGENTS.md) and [`README.md`](README.md).

`mcpaimon.github.io` is the MCPaimon organization website, served by GitHub Pages. Keep this index accurate whenever files or directories are added, removed, or restructured.

## Root Files

| Path | Purpose |
|---|---|
| AGENTS.md | Primary agent instruction set (workflow, branching, commits, content rules). |
| DESIGN.md | Design system: theme tokens, components, motion, and rules for changing the site. |
| README.md | Project overview. |
| INDEX.md | This file. |

## Site Content (`docs/`, served by GitHub Pages)

| Path | Purpose |
|---|---|
| docs/index.html | `/` — how the MCAgents main plugin works. |
| docs/playertools/index.html | `/playertools/` — how the PlayerTools extension works. |
| docs/servertools/index.html | `/servertools/` — how the ServerTools extension works. |

## Shared Theme Assets

The pages carry no local stylesheets or scripts. They import the shared MCEngine theme (white/silver/modern, defined by `DESIGN.md` in this repository, hosted by `MCEngine/mcengine.github.io`):

- `https://mcengine.github.io/styles/main/style.css` — tokens, components, page transitions.
- `https://mcengine.github.io/scripts/main/script.js` — page transition controller.
