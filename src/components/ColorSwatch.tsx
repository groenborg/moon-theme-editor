import { useRef } from "react"

export function ColorSwatch({ color, onChange, label, small }) {
  const ref = useRef(null)
  return (
    <div
      onClick={() => ref.current?.click()}
      style={{
        display: "flex",
        alignItems: "center",
        gap: small ? 8 : 10,
        cursor: "pointer",
        padding: "6px 8px",
        borderRadius: 8,
        transition: "background 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "rgba(128,128,140,0.1)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <div
        style={{
          width: small ? 24 : 28,
          height: small ? 24 : 28,
          borderRadius: 6,
          background: color,
          border: "1px solid rgba(128,128,140,0.25)",
          flexShrink: 0,
          position: "relative",
        }}
      >
        <input
          ref={ref}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{
            opacity: 0,
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            color: "var(--color-text-secondary)",
            textTransform: "capitalize",
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: 11,
            fontFamily: "var(--font-mono)",
            color: "var(--color-text-tertiary)",
            lineHeight: 1.4,
          }}
        >
          {color}
        </div>
      </div>
    </div>
  )
}
