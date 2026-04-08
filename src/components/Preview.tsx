export function Preview({ theme, font }) {
  const { background: bg, foreground: fg, palette: p } = theme
  const s = (i) => ({ color: p[i] })
  return (
    <div
      className="py-6 px-8 text-sm leading-[1.9] whitespace-pre-wrap flex-1 overflow-auto"
      style={{
        background: bg,
        fontFamily: `"${font}", var(--font-mono)`,
      }}
    >
      <span style={s(8)}>{"# Moon theme preview"}</span>
      {"\n"}
      <span style={s(5)}>from</span> <span style={s(4)}>pathlib</span>{" "}
      <span style={s(5)}>import</span> <span style={s(6)}>Path</span>
      {"\n"}
      <span style={s(5)}>import</span> <span style={s(4)}>json</span>
      {"\n\n"}
      <span style={s(5)}>class</span> <span style={s(6)}>MoonTheme</span>
      <span style={{ color: fg }}>:</span>
      {"\n"}
      <span style={{ color: fg }}>{"  "}</span>
      <span style={s(2)}>"""A color theme for ghostty."""</span>
      {"\n\n"}
      <span style={{ color: fg }}>{"  "}</span>
      <span style={s(5)}>def</span> <span style={s(4)}>__init__</span>
      <span style={{ color: fg }}>(</span>
      <span style={s(1)}>self</span>
      <span style={{ color: fg }}>, name:</span> <span style={s(6)}>str</span>
      <span style={{ color: fg }}>):</span>
      {"\n"}
      <span style={{ color: fg }}>{"    "}</span>
      <span style={s(1)}>self</span>
      <span style={{ color: fg }}>.name = </span>
      <span style={s(2)}>f"moon-</span>
      <span style={s(10)}>{"{"}</span>
      <span style={s(2)}>name</span>
      <span style={s(10)}>{"}"}</span>
      <span style={s(2)}>"</span>
      {"\n"}
      <span style={{ color: fg }}>{"    "}</span>
      <span style={s(1)}>self</span>
      <span style={{ color: fg }}>.palette = [</span>
      <span style={s(3)}>16</span>
      <span style={{ color: fg }}>]</span>
      {"\n"}
      <span style={{ color: fg }}>{"    "}</span>
      <span style={s(1)}>self</span>
      <span style={{ color: fg }}>.active = </span>
      <span style={s(3)}>True</span>
      {"\n\n"}
      <span style={{ color: fg }}>{"  "}</span>
      <span style={s(5)}>def</span> <span style={s(4)}>apply</span>
      <span style={{ color: fg }}>(</span>
      <span style={s(1)}>self</span>
      <span style={{ color: fg }}>):</span>
      {"\n"}
      <span style={{ color: fg }}>{"    "}</span>
      <span style={s(5)}>if</span> <span style={s(1)}>self</span>
      <span style={{ color: fg }}>.active:</span>
      {"\n"}
      <span style={{ color: fg }}>{"      "}</span>
      <span style={s(4)}>print</span>
      <span style={{ color: fg }}>(</span>
      <span style={s(2)}>"Theme applied"</span>
      <span style={{ color: fg }}>)</span>
      {"\n"}
      <span style={{ color: fg }}>{"      "}</span>
      <span style={s(5)}>return</span> <span style={s(3)}>True</span>
      {"\n"}
      <span style={{ color: fg }}>{"    "}</span>
      <span style={s(5)}>return</span> <span style={s(3)}>False</span>
      {"\n\n"}
      <span style={s(8)}>{"# usage"}</span>
      {"\n"}
      <span style={{ color: fg }}>theme = </span>
      <span style={s(6)}>MoonTheme</span>
      <span style={{ color: fg }}>(</span>
      <span style={s(2)}>"dark"</span>
      <span style={{ color: fg }}>)</span>
      {"\n"}
      <span style={{ color: fg }}>theme.</span>
      <span style={s(4)}>apply</span>
      <span style={{ color: fg }}>()</span>
      {"\n"}
      <span
        className="inline-block w-[7px] h-4 rounded-[1px] animate-blink align-text-bottom"
        style={{ background: theme.cursorColor }}
      />
    </div>
  )
}
