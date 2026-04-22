import { useEffect, useState } from 'react';
import DesignerPanel from './components/Panel';
import Terminal from './components/Terminal';
import { PRESETS } from './data/themes';
import type { PresetKey, Theme } from './types';

interface Tab {
  id: string;
  name: string;
  active: boolean;
}

export default function App() {
  const [presetKey, setPresetKey] = useState<PresetKey>('dracula');
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('tdesign.theme');
      if (saved) return JSON.parse(saved) as Theme;
    } catch {
      // ignore
    }
    return PRESETS.dracula;
  });
  const [fontFamily, setFontFamily] = useState('JetBrains Mono');
  const [fontSize, setFontSize] = useState(14);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [cursorBlink, setCursorBlink] = useState(true);

  useEffect(() => {
    localStorage.setItem('tdesign.theme', JSON.stringify(theme));
  }, [theme]);

  useEffect(() => {
    const id = setInterval(() => setCursorBlink((b) => !b), 530);
    return () => clearInterval(id);
  }, []);

  const tabs: Tab[] = [
    { id: 'vim', name: 'parser.ts — nvim', active: true },
    { id: 'sh', name: 'zsh', active: false },
  ];

  return (
    <div className="app">
      <div className="backdrop" />

      <div className="term-window" style={{ background: theme.background }}>
        <div className="term-titlebar" style={{ borderBottomColor: `${theme.foreground}12` }}>
          <div className="traffic">
            <span className="tl tl-close" />
            <span className="tl tl-min" />
            <span className="tl tl-max" />
          </div>
          <div className="term-tabs">
            {tabs.map((t) => (
              <div
                key={t.id}
                className={`term-tab ${t.active ? 'active' : ''}`}
                style={{
                  color: t.active ? theme.foreground : `${theme.foreground}88`,
                  background: t.active ? `${theme.foreground}0a` : 'transparent',
                }}
              >
                <span
                  className="tab-dot"
                  style={{ background: t.active ? theme.ansi[2] : `${theme.foreground}33` }}
                />
                {t.name}
                {t.active && (
                  <span className="tab-x" style={{ color: `${theme.foreground}66` }}>
                    ×
                  </span>
                )}
              </div>
            ))}
            <button type="button" className="tab-add" style={{ color: `${theme.foreground}55` }}>
              +
            </button>
          </div>
          <div className="title-right" style={{ color: `${theme.foreground}55` }}>
            <span>⌘T new tab</span>
          </div>
        </div>

        <Terminal
          theme={theme}
          fontFamily={`'${fontFamily}', ui-monospace, monospace`}
          fontSize={fontSize}
          lineHeight={1.55}
          letterSpacing={0}
          showCursor={cursorBlink}
        />
      </div>

      <DesignerPanel
        theme={theme}
        setTheme={setTheme}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        fontSize={fontSize}
        setFontSize={setFontSize}
        presetKey={presetKey}
        setPresetKey={setPresetKey}
        collapsed={panelCollapsed}
        setCollapsed={setPanelCollapsed}
      />
    </div>
  );
}
