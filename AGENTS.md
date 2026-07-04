# Agent Instructions & Workflow

This repository is the MCPaimon organization website, served by GitHub Pages. All site content lives under `docs/`. These instructions apply to every AI agent (Claude Code, Windsurf, Codex, and others) working in this repository.

**Strict Rules & Execution**
* **Read First (Structure):** Always read `INDEX.md` to understand the repository structure. If `INDEX.md` does not exist, create it first. Actively update it when structural changes occur.
* **Read Second (Context):** Always read `README.md` to understand the core project goals and context.
* **Design:** If `DESIGN.md` exists, it is the single source of truth for the website's visual style (colors, typography, layout, transitions). Never change the visual style outside of what `DESIGN.md` allows; update `DESIGN.md` first if a style change is requested.
* **Content:** The website explains how the MCPaimon ecosystem works. Pages must stay explanatory; do not embed source code listings inside the website pages.
* **Static Only:** GitHub Pages serves static files from `docs/`. Use plain HTML, CSS, and JavaScript with no build step and no external runtime dependencies.
* **Execution:** Create a solid plan. Write content section-by-section. Verify pages render correctly and links resolve before completing the task.
* **No Master/Main:** Never work directly on `master` or `main`. Create a new branch if the task scope changes; otherwise, continue on the active branch.

**Git & Branching Workflow (STRICT)**
* **Branch Naming:** Must follow `{type}/{primary-noun}` (e.g., `docs/homepage`). Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
* **Branch Coverage:** Branch names must reflect the entire set of changes on the branch, not only a subset of the work.
* **Commit Frequency & Verification:** Commit each change or group related changes. Do not wait for the entire session to finish. Always check the diff before creating a commit.
* **Commits:** Must use Conventional Commits (`type[optional scope]: description`). Commit messages must be plain text with no links or Jira IDs.
* **Pull Requests (PR):** Open sequentially. Always ask for user approval first. Provide a detailed report of added/modified/deleted features in the PR body. PR titles use human-readable language, not git conventions.
