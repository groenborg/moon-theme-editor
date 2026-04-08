# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `bun dev` — start Vite dev server
- `bun run build` — production build to `dist/`
- `bun run lint` — Biome linter + import organizer
- `bun run preview` — preview production build

## Architecture

Single-page React 19 app (Vite 8, TypeScript) for editing Ghostty terminal color themes. No router, no state library. Uses Tailwind CSS v4 for utility styling and class-variance-authority (CVA) for component variants.

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

Tailwind utility classes for static UI styles. CVA (`cva()`) for components with variants (ColorSwatch, ExportPanel, EditorSidebar tabs). Dynamic theme colors from the user-editable palette remain as inline `style={{}}`. Global CSS variables and component classes (sidebar, kbd-badge) live in `src/index.css` with Tailwind's `@theme` block for token registration.

## Export Format

The export generates Ghostty theme file syntax: `key = value` pairs for background, foreground, cursor, selection, and `palette = N=#hex` for the 16 ANSI colors. Font is noted as a comment since it belongs in Ghostty's main config, not theme files.
