# Repository-specific rules — mcpaimon.github.io

This repository is the MCPaimon organization website, served by GitHub Pages. All site content lives under `docs/`. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

## Repository-specific rules
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` to understand the core project goals and context.
* **Design:** The visual style (colors, typography, layout, transitions) is defined by this repository's own `DESIGN.md` — a copy of the shared MCEngine ecosystem design system. Keep it aligned with the canonical `DESIGN.md` in `MCEngine/mcengine.github.io`; never change the visual style outside of what `DESIGN.md` allows, and update `DESIGN.md` first if a style change is requested.
* **Content:** The website explains how the MCPaimon ecosystem works. Pages must stay explanatory; do not embed source code listings inside the website pages.
* **Static Only:** GitHub Pages serves static files from `docs/`. Use plain HTML, CSS, and JavaScript with no build step and no external runtime dependencies.
* **Self-contained Theme:** This repository vendors its own copy of the shared MCEngine theme locally under `docs/styles/` and `docs/scripts/`. Pages link to those local files with relative paths — never import stylesheets or scripts over the network (no `https://mcengine.github.io/...` URLs, no raw content URLs). Keep the vendored theme in sync with the design system described in `DESIGN.md`.
* **No `.nojekyll`:** Never create `.nojekyll` files anywhere in this repository. GitHub Pages serves the site's static files without them.
* **Execution:** Create a solid plan. Write content section-by-section. Verify pages render correctly and links resolve before completing the task.
* **No Master/Main:** Never work directly on `master` or `main`. Create a new branch if the task scope changes; otherwise, continue on the active branch.
