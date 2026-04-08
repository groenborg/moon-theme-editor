# Moon Theme Editor

A visual color editor for the [Ghostty](https://ghostty.org) terminal Moon theme. Tweak colors, pick fonts, preview live, and export config.

## Getting started

```bash
npm install
npm run dev
```

## Export

1. Adjust colors and font in the editor
2. Switch to the **Export** tab
3. Copy the config
4. Save to `~/.config/ghostty/themes/moon-dark` or `moon-light`
5. Set `theme = moon-dark` in `~/.config/ghostty/config`

Font selection goes in your main Ghostty config, not the theme file.

## Build

```bash
npm run build
```

Output lands in `dist/`.
