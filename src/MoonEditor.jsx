import { useState, useCallback, useRef } from "react";

const DEFAULTS = {
  dark: {
    background: "#09090b",
    foreground: "#c8c8d0",
    cursorColor: "#d4d4dc",
    cursorText: "#09090b",
    selectionBg: "#2a2a35",
    selectionFg: "#e0e0e8",
    palette: [
      "#16161e","#e0a0a0","#a0d4a0","#ddc890","#90b8e0","#c8a8e0","#88c8d8","#c8c8d0",
      "#2a2a35","#f0baba","#b8e4b8","#e8d8a8","#aacce8","#d8bfe8","#a4d8e4","#e8e8f0"
    ]
  },
  light: {
    background: "#e8e8ed",
    foreground: "#2a2a32",
    cursorColor: "#3a3a44",
    cursorText: "#e8e8ed",
    selectionBg: "#c4c4ce",
    selectionFg: "#1e1e26",
    palette: [
      "#2a2a32","#a03848","#2e7d46","#8a6518","#2868b0","#7844a8","#1a7888","#d0d0d8",
      "#3e3e48","#882830","#1e6e36","#745510","#1858a0","#683898","#0e6878","#e8e8ed"
    ]
  }
};

const NAMES = [
  "black","red","green","yellow","blue","magenta","cyan","white",
  "bright black","bright red","bright green","bright yellow","bright blue","bright magenta","bright cyan","bright white"
];

const FONTS = [
  { label: "Default (system)", value: "" },
  { label: "JetBrains Mono", value: "JetBrains Mono" },
  { label: "Fira Code", value: "Fira Code" },
  { label: "Cascadia Code", value: "Cascadia Code" },
  { label: "Source Code Pro", value: "Source Code Pro" },
  { label: "IBM Plex Mono", value: "IBM Plex Mono" },
  { label: "Iosevka", value: "Iosevka" },
  { label: "Hack", value: "Hack" },
  { label: "Inconsolata", value: "Inconsolata" },
  { label: "Victor Mono", value: "Victor Mono" },
  { label: "Monaspace Neon", value: "Monaspace Neon" },
  { label: "Monaspace Argon", value: "Monaspace Argon" },
  { label: "Berkeley Mono", value: "Berkeley Mono" },
  { label: "Commit Mono", value: "Commit Mono" },
  { label: "Geist Mono", value: "Geist Mono" },
  { label: "SF Mono", value: "SF Mono" },
  { label: "Monaco", value: "Monaco" },
  { label: "Menlo", value: "Menlo" },
  { label: "Consolas", value: "Consolas" },
];

function ColorSwatch({ color, onChange, label, small }) {
  const ref = useRef(null);
  return (
    <div
      onClick={() => ref.current?.click()}
      style={{
        display: "flex", alignItems: "center", gap: small ? 8 : 10,
        cursor: "pointer", padding: "6px 8px", borderRadius: 8,
        transition: "background 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "rgba(128,128,140,0.1)"}
      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
    >
      <div style={{
        width: small ? 24 : 28, height: small ? 24 : 28, borderRadius: 6,
        background: color, border: "1px solid rgba(128,128,140,0.25)",
        flexShrink: 0, position: "relative",
      }}>
        <input
          ref={ref}
          type="color"
          value={color}
          onChange={e => onChange(e.target.value)}
          style={{ opacity: 0, position: "absolute", inset: 0, width: "100%", height: "100%", cursor: "pointer" }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 12, color: "var(--color-text-secondary)",
          textTransform: "capitalize", lineHeight: 1.2,
        }}>{label}</div>
        <div style={{
          fontSize: 11, fontFamily: "var(--font-mono)",
          color: "var(--color-text-tertiary)", lineHeight: 1.4,
        }}>{color}</div>
      </div>
    </div>
  );
}

function Preview({ theme, font }) {
  const { background: bg, foreground: fg, palette: p } = theme;
  const s = (i) => ({ color: p[i] });
  const ff = font || "var(--font-mono)";
  return (
    <div style={{
      background: bg, borderRadius: 10, padding: "20px 24px",
      fontFamily: `"${font}", var(--font-mono)`, fontSize: 13, lineHeight: 1.9,
      border: "1px solid rgba(128,128,140,0.15)", overflow: "auto",
      whiteSpace: "pre-wrap",
    }}>
      <span style={s(8)}>{"# Moon theme preview"}</span>{"\n"}
      <span style={s(5)}>from</span> <span style={s(4)}>pathlib</span> <span style={s(5)}>import</span> <span style={s(6)}>Path</span>{"\n"}
      <span style={s(5)}>import</span> <span style={s(4)}>json</span>
      {"\n\n"}
      <span style={s(5)}>class</span> <span style={s(6)}>MoonTheme</span><span style={{ color: fg }}>:</span>{"\n"}
      <span style={{ color: fg }}>{"  "}</span><span style={s(2)}>"""A color theme for ghostty."""</span>
      {"\n\n"}
      <span style={{ color: fg }}>{"  "}</span><span style={s(5)}>def</span> <span style={s(4)}>__init__</span><span style={{ color: fg }}>(</span><span style={s(1)}>self</span><span style={{ color: fg }}>, name:</span> <span style={s(6)}>str</span><span style={{ color: fg }}>):</span>{"\n"}
      <span style={{ color: fg }}>{"    "}</span><span style={s(1)}>self</span><span style={{ color: fg }}>.name = </span><span style={s(2)}>f"moon-</span><span style={s(10)}>{"{"}</span><span style={s(2)}>name</span><span style={s(10)}>{"}"}</span><span style={s(2)}>"</span>{"\n"}
      <span style={{ color: fg }}>{"    "}</span><span style={s(1)}>self</span><span style={{ color: fg }}>.palette = [</span><span style={s(3)}>16</span><span style={{ color: fg }}>]</span>{"\n"}
      <span style={{ color: fg }}>{"    "}</span><span style={s(1)}>self</span><span style={{ color: fg }}>.active = </span><span style={s(3)}>True</span>
      {"\n\n"}
      <span style={{ color: fg }}>{"  "}</span><span style={s(5)}>def</span> <span style={s(4)}>apply</span><span style={{ color: fg }}>(</span><span style={s(1)}>self</span><span style={{ color: fg }}>):</span>{"\n"}
      <span style={{ color: fg }}>{"    "}</span><span style={s(5)}>if</span> <span style={s(1)}>self</span><span style={{ color: fg }}>.active:</span>{"\n"}
      <span style={{ color: fg }}>{"      "}</span><span style={s(4)}>print</span><span style={{ color: fg }}>(</span><span style={s(2)}>"Theme applied"</span><span style={{ color: fg }}>)</span>{"\n"}
      <span style={{ color: fg }}>{"      "}</span><span style={s(5)}>return</span> <span style={s(3)}>True</span>{"\n"}
      <span style={{ color: fg }}>{"    "}</span><span style={s(5)}>return</span> <span style={s(3)}>False</span>
      {"\n\n"}
      <span style={s(8)}>{"# usage"}</span>{"\n"}
      <span style={{ color: fg }}>theme = </span><span style={s(6)}>MoonTheme</span><span style={{ color: fg }}>(</span><span style={s(2)}>"dark"</span><span style={{ color: fg }}>)</span>{"\n"}
      <span style={{ color: fg }}>theme.</span><span style={s(4)}>apply</span><span style={{ color: fg }}>()</span>
      {"\n"}
      <span style={{
        display: "inline-block", width: 7, height: 16,
        background: theme.cursorColor, borderRadius: 1,
        animation: "blink 1s step-end infinite", verticalAlign: "text-bottom",
      }} />
    </div>
  );
}

function ExportPanel({ theme, variant, font }) {
  const [copied, setCopied] = useState(false);
  const generate = () => {
    const lines = [
      `# Moon ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
      "",
    ];
    if (font) {
      lines.push(`# Add to your main config (~/.config/ghostty/config)`);
      lines.push(`font-family = ${font}`);
      lines.push("");
    }
    lines.push(
      `background = ${theme.background}`,
      `foreground = ${theme.foreground}`,
      `cursor-color = ${theme.cursorColor}`,
      `cursor-text = ${theme.cursorText}`,
      `selection-background = ${theme.selectionBg}`,
      `selection-foreground = ${theme.selectionFg}`,
      "",
    );
    const labels = ["Black","Red","Green","Yellow","Blue","Magenta","Cyan","White"];
    for (let i = 0; i < 8; i++) {
      lines.push(`# ${labels[i]} (normal / bright)`);
      lines.push(`palette = ${i}=${theme.palette[i]}`);
      lines.push(`palette = ${i + 8}=${theme.palette[i + 8]}`);
      if (i < 7) lines.push("");
    }
    return lines.join("\n") + "\n";
  };
  const text = generate();
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={copy} style={{
        position: "absolute", top: 12, right: 12, zIndex: 2,
        background: copied ? "var(--color-background-success)" : "var(--color-background-secondary)",
        color: copied ? "var(--color-text-success)" : "var(--color-text-secondary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: 6, padding: "5px 14px", fontSize: 12, cursor: "pointer",
        fontFamily: "var(--font-sans)", fontWeight: 500,
        transition: "all 0.2s",
      }}>{copied ? "Copied" : "Copy"}</button>
      <pre style={{
        background: "var(--color-background-secondary)",
        borderRadius: 10, padding: "20px 24px",
        fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.7,
        color: "var(--color-text-secondary)", overflow: "auto",
        border: "0.5px solid var(--color-border-tertiary)",
        margin: 0, whiteSpace: "pre-wrap",
      }}>{text}</pre>
    </div>
  );
}

export default function MoonEditor() {
  const [variant, setVariant] = useState("dark");
  const [themes, setThemes] = useState(JSON.parse(JSON.stringify(DEFAULTS)));
  const [view, setView] = useState("preview");
  const [font, setFont] = useState("");

  const theme = themes[variant];

  const setProp = useCallback((prop, val) => {
    setThemes(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[variant][prop] = val;
      return next;
    });
  }, [variant]);

  const setPalette = useCallback((idx, val) => {
    setThemes(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[variant].palette[idx] = val;
      return next;
    });
  }, [variant]);

  const resetTheme = () => {
    setThemes(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[variant] = JSON.parse(JSON.stringify(DEFAULTS[variant]));
      return next;
    });
  };

  const tabStyle = (active) => ({
    padding: "7px 18px", fontSize: 13, fontFamily: "var(--font-sans)", fontWeight: 500,
    border: "none", borderRadius: 7, cursor: "pointer",
    background: active ? "var(--color-background-primary)" : "transparent",
    color: active ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
    transition: "all 0.2s",
  });

  return (
    <div style={{ padding: "0.5rem 0" }}>
      <style>{`
        @keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: 20, flexWrap: "wrap", gap: 10,
      }}>
        <div style={{
          display: "inline-flex", gap: 3, padding: 3,
          background: "var(--color-background-secondary)", borderRadius: 9,
        }}>
          <button style={tabStyle(variant === "dark")} onClick={() => setVariant("dark")}>Dark</button>
          <button style={tabStyle(variant === "light")} onClick={() => setVariant("light")}>Light</button>
        </div>
        <div style={{ display: "flex", gap: 3, padding: 3, background: "var(--color-background-secondary)", borderRadius: 9 }}>
          <button style={tabStyle(view === "preview")} onClick={() => setView("preview")}>Preview</button>
          <button style={tabStyle(view === "export")} onClick={() => setView("export")}>Export</button>
        </div>
      </div>

      {view === "preview" ? <Preview theme={theme} font={font} /> : <ExportPanel theme={theme} variant={variant} font={font} />}

      <div style={{ marginTop: 24 }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)" }}>Base</span>
          <button onClick={resetTheme} style={{
            background: "none", border: "none", color: "var(--color-text-tertiary)",
            fontSize: 12, cursor: "pointer", fontFamily: "var(--font-sans)",
            padding: "4px 8px", borderRadius: 6,
          }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--color-text-primary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--color-text-tertiary)"}
          >Reset to defaults</button>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "6px 8px", marginBottom: 8,
        }}>
          <label style={{ fontSize: 12, color: "var(--color-text-secondary)", flexShrink: 0 }}>Font</label>
          <select
            value={font}
            onChange={e => setFont(e.target.value)}
            style={{
              flex: 1, maxWidth: 260, padding: "6px 10px", fontSize: 13,
              fontFamily: font ? `"${font}", var(--font-mono)` : "var(--font-mono)",
              background: "var(--color-background-primary)",
              color: "var(--color-text-primary)",
              border: "0.5px solid var(--color-border-secondary)",
              borderRadius: 7, cursor: "pointer",
              appearance: "auto",
            }}
          >
            {FONTS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="or type a font name"
            value={FONTS.some(f => f.value === font) ? "" : font}
            onChange={e => setFont(e.target.value)}
            style={{
              flex: 1, maxWidth: 200, padding: "6px 10px", fontSize: 12,
              fontFamily: "var(--font-mono)",
              background: "var(--color-background-primary)",
              color: "var(--color-text-primary)",
              border: "0.5px solid var(--color-border-tertiary)",
              borderRadius: 7,
            }}
          />
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 2,
        }}>
          <ColorSwatch label="Background" color={theme.background} onChange={v => setProp("background", v)} small />
          <ColorSwatch label="Foreground" color={theme.foreground} onChange={v => setProp("foreground", v)} small />
          <ColorSwatch label="Cursor" color={theme.cursorColor} onChange={v => setProp("cursorColor", v)} small />
          <ColorSwatch label="Selection bg" color={theme.selectionBg} onChange={v => setProp("selectionBg", v)} small />
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: "var(--color-text-secondary)", display: "block", marginBottom: 12 }}>Palette</span>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
          gap: 2,
        }}>
          {theme.palette.map((c, i) => (
            <ColorSwatch
              key={`${variant}-${i}`}
              label={NAMES[i]}
              color={c}
              onChange={v => setPalette(i, v)}
              small
            />
          ))}
        </div>
      </div>
    </div>
  );
}
