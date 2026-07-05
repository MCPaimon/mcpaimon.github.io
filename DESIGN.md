# DESIGN.md — MCPaimon Website Design System

This document is the **single source of truth** for the visual design of the MCPaimon
website (`docs/`). Any future change to the site must follow these rules. If a change
requires a different look, update this document **first**, then the stylesheet.

## 1. Identity

- **Theme:** White / Silver / Modern.
- **Feel:** clean, calm, precise — generous whitespace, thin silver borders, subtle
  metallic gradients, soft shadows. No loud colors, no dark theme.
- **Content rule:** the website only *explains* how the ecosystem works. It never
  embeds source code listings. Inline monospace is allowed solely for **names**
  (commands, tools, routes such as `/api/mcagents`).

## 2. Tokens

All tokens are defined once under `:root` in the shared stylesheet
`https://mcengine.github.io/styles/main/style.css` (source:
`docs/styles/main/style.css` in `MCEngine/mcengine.github.io`). Never hardcode
raw values in components; always use the tokens.

### Colors

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background (white base). |
| `--color-surface` | `#f6f7f9` | Cards' quiet variant, chips, header hover, footer. |
| `--color-border` | `#e3e6eb` | All hairline borders (silver). |
| `--color-silver` | `#aeb4bf` | Silver accents (notice bars, decorations). |
| `--color-silver-deep` | `#868d99` | Eyebrow/uppercase label text. |
| `--color-text` | `#1c1f26` | Primary text (near-black, never pure black). |
| `--color-muted` | `#5b6472` | Secondary text. |
| `--color-accent` | `#3f4956` | Primary buttons, links, emphasis (steel gray). |
| `--gradient-silver` | `#eef0f3 → #d7dbe1 → #c3c8d0` (135deg) | Step number chips, subtle metallic fills. |
| `--gradient-steel` | `#565f6d → #7d8694 → #a6adb8` (135deg) | Brand mark, metallic headline text. |

Semantic badge colors (the only non-neutral colors allowed):

| Badge | Text / Background / Border | Meaning |
|---|---|---|
| `.badge.op` | `#5b4708` / `#faf3dd` / `#eadfb8` | Requires OP permission. |
| `.badge.everyone` | `#234a32` / `#e7f3ec` / `#cbe4d4` | Available to everyone. |
| `.badge.platform` | accent / surface / border | Platform-specific behavior. |

### Typography

- Font: system sans stack (`--font-sans`); monospace only via `--font-mono` for names.
- Base size `1.0625rem`, line-height `1.65`.
- `h1` uses `clamp(2.2rem, 5.5vw, 3.4rem)`, tight letter-spacing (`-0.02em`).
- Metallic headline words use `.metallic` (steel gradient clipped to text). At most
  one metallic phrase per page.
- Eyebrow labels: uppercase, `0.8rem`, letter-spacing `0.14em`.

### Spacing, radius, shadow

- Spacing scale: `--space-1` (0.25rem) … `--space-6` (4rem). Sections separate with
  `--space-6`; cards pad with `--space-4`.
- Radii: cards `14px` (`--radius-card`), buttons/chips fully rounded (`--radius-pill`).
- Shadows: `--shadow-card` at rest, `--shadow-card-hover` on hover. Never harder.
- Content max width: `--page-max` (68rem).

## 3. Components

Reuse these components; do not invent parallel variants.

- **Header** (`.site-header`): sticky, white with blur, hairline bottom border. Brand
  = gradient square mark + "MCPaimon". Nav pills; the current page gets
  `aria-current="page"`.
- **Hero** (`.hero`): centered; eyebrow chip → h1 (with one metallic phrase) → lead
  paragraph → action buttons → platform chips.
- **Buttons** (`.button.primary`, `.button.ghost`): pill-shaped; primary is steel
  accent with white text, ghost is white with silver border.
- **Cards** (`.card`, `a.card`, in `.grid`): white, silver border, soft shadow, lift
  2px on hover. Tool cards show `.tool-name` (monospace) plus permission badges.
- **Steps** (`.steps`): numbered list on surface background with gradient number
  chips; used for every "How it works" narrative.
- **Badges** (`.badge`): permission/platform markers listed above.
- **Notice** (`.notice`): surface block with a 4px silver left border for closing
  remarks and disclaimers.
- **Footer** (`.site-footer`): surface background, hairline top border, copyright
  left, related links right.

## 4. Motion (page transitions)

Implemented in the shared assets: `https://mcengine.github.io/styles/main/style.css`
(keyframes) + `https://mcengine.github.io/scripts/main/script.js`.

- **Enter:** every page fades in and rises 10px, `0.45s ease-out` (`page-in`),
  pure CSS so it works without JavaScript.
- **Exit:** clicks on same-origin, non-anchor, non-download links fade the page out
  and raise it 8px, `0.22s ease-in` (`page-out`), then navigate (220 ms delay).
- Modified clicks (Ctrl/Cmd/Shift/Alt, middle button) and external links are never
  intercepted.
- Back/forward cache restores remove the exit class (`pageshow` handler).
- **Accessibility:** all animation is wrapped in
  `@media (prefers-reduced-motion: no-preference)`; with reduced motion, pages render
  instantly and links navigate natively.
- Micro-interactions: hover transitions of 0.18s on nav pills, buttons, cards.
  Nothing else moves.

## 5. Layout & pages

- Served by GitHub Pages from the `docs/` directory. Never create `.nojekyll` files.
- Routes: `/` (MCAgents main plugin), `/playertools/`, `/servertools/` — each a
  directory with an `index.html`. New pages follow the same pattern and must be added
  to the header navigation of **all** pages.
- Shared assets are hosted by `MCEngine/mcengine.github.io` and imported absolutely:
  `https://mcengine.github.io/styles/main/style.css` and
  `https://mcengine.github.io/scripts/main/script.js` (never raw content URLs,
  never local copies).
- Page skeleton (keep this order): header → hero → "How it works" steps → content
  sections (cards) → notice → footer.
- Every page sets a unique `<title>` ("Name — Description | MCPaimon") and
  `<meta name="description">`.

## 6. Rules for future changes

1. Read this document before touching anything under `docs/`.
2. New UI must be composed from the tokens and components above.
3. Do not add external dependencies (fonts, CSS frameworks, JS libraries, trackers).
   The site stays self-contained and static.
4. Do not introduce a dark theme, colored branding, or code listings unless this
   document is deliberately revised first.
5. Keep pages explanatory: describe behavior in prose; link to GitHub for code.
6. After structural changes (new pages, moved assets), update `INDEX.md` and the
   navigation on every page.
