# mcpaimon.github.io

The MCPaimon organization website, served by GitHub Pages from the [`docs/`](docs/) directory.

## Pages

| Route | Explains |
|---|---|
| `/` | The MCAgents main plugin: commands, sessions, tools, and the central API server. |
| `/npc/` | The MCAgentsNPC plugin: AI driven NPCs, what they do, and what they remember. |
| `/playertools/` | The PlayerTools extension: player information and administration tools. |
| `/servertools/` | The ServerTools extension: server status and performance tools. |
| `/logs/` | The latest MCAgents release log. |
| `/logs/{major}/{minor}/{patch}/` | Permalink for one released MCAgents version. |
| `/logs/npc/` | The latest MCAgentsNPC release log. |
| `/logs/npc/{major}/{minor}/{patch}/` | Permalink for one released MCAgentsNPC version. |

The site is plain static HTML/CSS/JS with no build step. Pages explain how the ecosystem works and link to the repositories for code and setup; they never embed source code.

The header, the footer, and the release-log picker are rendered from a single
file each rather than copied into every page, so adding a section or publishing
a release is one edit instead of one per page. See
[`INDEX.md`](INDEX.md) for where those files live.

## Design

The visual style (white / silver / modern theme, components, and page transitions) is the shared MCEngine "Silver Glass" design system, documented in this repository's own [`DESIGN.md`](DESIGN.md). The theme CSS/JS is vendored locally under [`docs/styles/`](docs/styles/) and [`docs/scripts/`](docs/scripts/) — the site has no runtime dependency on another repository. Keep `DESIGN.md` aligned with the canonical copy in `MCEngine/mcengine.github.io`, and read it before changing anything visual under `docs/`.

## Versioning

The site carries its own semantic version in [`VERSION`](VERSION), bumped with
every pull request. It tracks this repository's own content, not the version of
any plugin the site describes — plugin versions are listed on `/logs/`.

## Contributing

Agent and workflow rules live in [`AGENTS.md`](AGENTS.md); the repository structure is indexed in [`INDEX.md`](INDEX.md).
