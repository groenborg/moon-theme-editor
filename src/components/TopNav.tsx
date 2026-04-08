export function NavItem({ onClick, label, text }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "var(--font-ui)",
        fontSize: 14,
        color: "var(--chrome-text-secondary)",
        transition: "color 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.color = "var(--chrome-text-primary)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "var(--chrome-text-secondary)")
      }
    >
      <span style={{ fontWeight: 700 }}>[{label}]</span> {text}
    </button>
  )
}

export function TopNav({ onToggleSidebar }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        padding: "10px 20px",
        background: "var(--chrome-bg-secondary)",
        borderBottom: "1px solid var(--chrome-border)",
        fontFamily: "var(--font-ui)",
        fontSize: 14,
        flexShrink: 0,
        flexWrap: "wrap",
      }}
    >
      <span
        style={{
          fontWeight: 700,
          color: "var(--chrome-text-primary)",
        }}
      >
        Moon Editor
      </span>
      <span style={{ color: "var(--chrome-text-tertiary)" }}>
        Type{" "}
        <span style={{ color: "var(--chrome-text-primary)", fontWeight: 600 }}>
          help
        </span>{" "}
        for options
      </span>
      <NavItem onClick={onToggleSidebar} label="E" text="show editor" />
      <NavItem label="D" text="Docs" />
      <NavItem label="?" text="Help" />
    </div>
  )
}
