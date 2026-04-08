export function FooterBar({ variant, font, theme }) {
  const dot = (
    <span style={{ color: "var(--chrome-text-tertiary)", opacity: 0.5 }}>
      {" · "}
    </span>
  )
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px 20px",
        background: "var(--chrome-bg-secondary)",
        borderTop: "1px solid var(--chrome-border)",
        fontFamily: "var(--font-ui)",
        fontSize: 12,
        color: "var(--chrome-text-tertiary)",
        flexShrink: 0,
        gap: 4,
      }}
    >
      <span
        style={{
          display: "inline-flex",
          gap: 3,
          alignItems: "center",
          marginRight: 4,
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "var(--chrome-text-green)",
          }}
        />
        Theme Ready
      </span>
      {dot}
      <span>{variant} variant</span>
      {dot}
      <span>16 palette colors</span>
      {dot}
      <span>font: {font || "system default"}</span>
      {dot}
      <span>
        {theme.background} / {theme.foreground}
      </span>
    </div>
  )
}
