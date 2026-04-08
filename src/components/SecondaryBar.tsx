export function SecondaryBar({ variant }) {
  return (
    <div
      style={{
        padding: "8px 20px",
        background: "var(--chrome-bg-deep)",
        fontFamily: "var(--font-ui)",
        fontSize: 13,
        color: "var(--chrome-text-tertiary)",
        flexShrink: 0,
      }}
    >
      ~/moon-editor/{variant} 0.092s
    </div>
  )
}
