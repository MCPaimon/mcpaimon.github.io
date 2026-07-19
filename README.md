# mcpaimon.github.io

The MCPaimon organization website, served by GitHub Pages from the [`docs/`](docs/) directory.

## Pages

| Route | Explains |
|---|---|
| `/` | The MCAgents main plugin: commands, sessions, tools, and the central API server. |
| `/playertools/` | The PlayerTools extension: player information and administration tools. |
| `/servertools/` | The ServerTools extension: server status and performance tools. |

The site is plain static HTML/CSS/JS with no build step. Pages explain how the ecosystem works and link to the repositories for code and setup; they never embed source code.

## Design

The visual style (white / silver / modern theme, components, and page transitions) is the shared MCEngine "Silver Glass" design system, documented in this repository's own [`DESIGN.md`](DESIGN.md). The theme CSS/JS is vendored locally under [`docs/styles/`](docs/styles/) and [`docs/scripts/`](docs/scripts/) — the site has no runtime dependency on another repository. Keep `DESIGN.md` aligned with the canonical copy in `MCEngine/mcengine.github.io`, and read it before changing anything visual under `docs/`.

## Contributing

Agent and workflow rules live in [`AGENTS.md`](AGENTS.md); the repository structure is indexed in [`INDEX.md`](INDEX.md).
