import { ColorSwatch } from "./ColorSwatch"
import { FONTS, NAMES } from "./constants"

export function EditorSidebar({
  open,
  onClose,
  variant,
  setVariant,
  view,
  setView,
  font,
  setFont,
  theme,
  setProp,
  setPalette,
  resetTheme,
}) {
  const tabStyle = (active) => ({
    padding: "7px 18px",
    fontSize: 13,
    fontFamily: "var(--font-ui)",
    fontWeight: 500,
    border: "none",
    borderRadius: 7,
    cursor: "pointer",
    background: active ? "var(--chrome-bg-tertiary)" : "transparent",
    color: active
      ? "var(--chrome-text-primary)"
      : "var(--chrome-text-tertiary)",
    boxShadow: active ? "0 1px 3px rgba(0,0,0,0.15)" : "none",
    transition: "all 0.2s",
  })

  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={onClose}
      />
      <div className={`sidebar${open ? " open" : ""}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: "var(--chrome-text-primary)",
              fontFamily: "var(--font-ui)",
            }}
          >
            Theme Editor
          </span>
          <button className="kbd-badge" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Variant toggle */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--chrome-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: 8,
            }}
          >
            Variant
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 3,
              padding: 3,
              background: "var(--chrome-bg-primary)",
              borderRadius: 9,
            }}
          >
            <button
              style={tabStyle(variant === "dark")}
              onClick={() => setVariant("dark")}
            >
              Dark
            </button>
            <button
              style={tabStyle(variant === "light")}
              onClick={() => setVariant("light")}
            >
              Light
            </button>
          </div>
        </div>

        {/* View toggle */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--chrome-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: 8,
            }}
          >
            View
          </span>
          <div
            style={{
              display: "inline-flex",
              gap: 3,
              padding: 3,
              background: "var(--chrome-bg-primary)",
              borderRadius: 9,
            }}
          >
            <button
              style={tabStyle(view === "preview")}
              onClick={() => setView("preview")}
            >
              Preview
            </button>
            <button
              style={tabStyle(view === "export")}
              onClick={() => setView("export")}
            >
              Export
            </button>
          </div>
        </div>

        {/* Font selector */}
        <div style={{ marginBottom: 20 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--chrome-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: 8,
            }}
          >
            Font
          </span>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: 13,
              fontFamily: font
                ? `"${font}", var(--font-mono)`
                : "var(--font-mono)",
              background: "var(--chrome-bg-primary)",
              color: "var(--chrome-text-primary)",
              border: "1px solid var(--chrome-border)",
              borderRadius: 7,
              cursor: "pointer",
              appearance: "auto",
              marginBottom: 6,
            }}
          >
            {FONTS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="or type a font name"
            value={FONTS.some((f) => f.value === font) ? "" : font}
            onChange={(e) => setFont(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 10px",
              fontSize: 12,
              fontFamily: "var(--font-mono)",
              background: "var(--chrome-bg-primary)",
              color: "var(--chrome-text-primary)",
              border: "1px solid var(--chrome-border)",
              borderRadius: 7,
            }}
          />
        </div>

        {/* Base colors */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--chrome-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Base Colors
            </span>
            <button
              onClick={resetTheme}
              style={{
                background: "none",
                border: "none",
                color: "var(--chrome-text-tertiary)",
                fontSize: 11,
                cursor: "pointer",
                fontFamily: "var(--font-ui)",
                padding: "2px 6px",
                borderRadius: 4,
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--chrome-text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--chrome-text-tertiary)")
              }
            >
              Reset defaults
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <ColorSwatch
              label="Background"
              color={theme.background}
              onChange={(v) => setProp("background", v)}
              small
            />
            <ColorSwatch
              label="Foreground"
              color={theme.foreground}
              onChange={(v) => setProp("foreground", v)}
              small
            />
            <ColorSwatch
              label="Cursor"
              color={theme.cursorColor}
              onChange={(v) => setProp("cursorColor", v)}
              small
            />
            <ColorSwatch
              label="Selection bg"
              color={theme.selectionBg}
              onChange={(v) => setProp("selectionBg", v)}
              small
            />
          </div>
        </div>

        {/* Palette */}
        <div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: "var(--chrome-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "block",
              marginBottom: 8,
            }}
          >
            Palette
          </span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            {theme.palette.map((c, i) => (
              <ColorSwatch
                key={`${variant}-${i}`}
                label={NAMES[i]}
                color={c}
                onChange={(v) => setPalette(i, v)}
                small
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
