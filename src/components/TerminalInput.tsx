export function TerminalInput() {
  return (
    <div
      style={{
        padding: "12px 20px 16px",
        background: "var(--chrome-bg-primary)",
        borderTop: "1px solid var(--chrome-border)",
        fontFamily: "var(--font-ui)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          display: "inline-block",
          color: "var(--chrome-text-secondary)",
          padding: "3px 10px",
          borderRadius: 4,
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 10,
          border: "1px solid var(--chrome-border)",
        }}
      >
        ~/moon-editor
      </span>
      <div>
        <input
          type="text"
          placeholder="Type '/' or 'help' to see options"
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "var(--chrome-text-tertiary)",
            fontFamily: "var(--font-ui)",
            fontSize: 14,
            caretColor: "var(--chrome-text-primary)",
          }}
        />
      </div>
    </div>
  )
}
