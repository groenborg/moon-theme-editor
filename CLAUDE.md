# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev` — start Vite dev server
- `bun run build` — production build to `dist/`
- `bun run lint` — Biome linter + import organizer
- `bun run preview` — preview production build

## Architecture

Single-page React 19 app (Vite 8, TypeScript) for editing Ghostty terminal color themes. No router, no state library, no CSS framework.

**`src/MoonEditor.tsx`** — top-level stateful component managing variant (dark/light), color values, font selection, and view mode (preview/export).

**`src/components/`** — extracted UI components and constants:
- `constants.ts` — `DEFAULTS` (dark/light palettes), `NAMES` (color labels), `FONTS` (font options)
- `TopNav.tsx` — header nav bar (includes `NavItem`)
- `SecondaryBar.tsx` — path/timing info bar
- `ColorSwatch.tsx` — clickable color picker bound to a hidden `<input type="color">`
- `Preview.tsx` — fake terminal rendering Python code with syntax-highlighted spans colored from the palette
- `ExportPanel.tsx` — generates and copies Ghostty-format theme config text
- `TerminalInput.tsx` — command input area
- `FooterBar.tsx` — status bar
- `EditorSidebar.tsx` — slide-out theme editor panel (variant, view, font, colors, palette)
- `index.ts` — barrel re-exports

**`src/App.tsx`** is a thin wrapper that renders `<MoonEditor />`.

## Styling

All component styles are inline `style={{}}` objects. Global CSS variables for the editor UI (not the theme being edited) live in `src/index.css` and auto-switch via `prefers-color-scheme`. The theme preview area uses colors from the user-editable palette directly, not CSS variables.

## Export Format

The export generates Ghostty theme file syntax: `key = value` pairs for background, foreground, cursor, selection, and `palette = N=#hex` for the 16 ANSI colors. Font is noted as a comment since it belongs in Ghostty's main config, not theme files.
