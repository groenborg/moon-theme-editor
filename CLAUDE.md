# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config, React hooks + React Refresh plugins)
- `npm run preview` — preview production build

## Architecture

Single-page React 19 app (Vite 8, JSX only — no TypeScript) for editing Ghostty terminal color themes. No router, no state library, no CSS framework.

**`src/MoonEditor.jsx`** is the core of the app. It contains all editor logic in one file:
- `DEFAULTS` — built-in dark/light palette definitions (background, foreground, cursor, selection, 16-color ANSI palette)
- `MoonEditor` — top-level stateful component managing variant (dark/light), color values, font selection, and view mode (preview/export)
- `ColorSwatch` — clickable color picker bound to a hidden `<input type="color">`
- `Preview` — fake terminal rendering Python code with syntax-highlighted spans colored from the palette
- `ExportPanel` — generates and copies Ghostty-format theme config text

**`src/App.jsx`** is a thin wrapper that renders heading text and `<MoonEditor />`.

## Styling

All component styles are inline `style={{}}` objects. Global CSS variables for the editor UI (not the theme being edited) live in `src/index.css` and auto-switch via `prefers-color-scheme`. The theme preview area uses colors from the user-editable palette directly, not CSS variables.

## Export Format

The export generates Ghostty theme file syntax: `key = value` pairs for background, foreground, cursor, selection, and `palette = N=#hex` for the 16 ANSI colors. Font is noted as a comment since it belongs in Ghostty's main config, not theme files.
