import type { Theme } from '../types';

export function toGhostty(t: Theme): string {
  const lines = [
    `# ${t.name}`,
    `background = ${t.background.replace('#', '')}`,
    `foreground = ${t.foreground.replace('#', '')}`,
    `cursor-color = ${t.cursor.replace('#', '')}`,
    `selection-background = ${t.selection.replace('#', '')}`,
    '',
  ];
  t.ansi.forEach((c, i) => {
    lines.push(`palette = ${i}=${c}`);
  });
  return lines.join('\n');
}

export function toIterm(t: Theme): string {
  const colorEntry = (name: string, hex: string) => {
    const r = Number.parseInt(hex.slice(1, 3), 16) / 255;
    const g = Number.parseInt(hex.slice(3, 5), 16) / 255;
    const b = Number.parseInt(hex.slice(5, 7), 16) / 255;
    return `  <key>${name}</key>
  <dict>
    <key>Color Space</key><string>sRGB</string>
    <key>Red Component</key><real>${r.toFixed(4)}</real>
    <key>Green Component</key><real>${g.toFixed(4)}</real>
    <key>Blue Component</key><real>${b.toFixed(4)}</real>
  </dict>`;
  };
  const entries: string[] = [];
  t.ansi.forEach((c, i) => entries.push(colorEntry(`Ansi ${i} Color`, c)));
  entries.push(colorEntry('Background Color', t.background));
  entries.push(colorEntry('Foreground Color', t.foreground));
  entries.push(colorEntry('Cursor Color', t.cursor));
  entries.push(colorEntry('Selection Color', t.selection));

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries.join('\n')}
</dict>
</plist>`;
}
