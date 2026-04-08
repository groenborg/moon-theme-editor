import { cva } from "class-variance-authority"
import { ColorSwatch } from "./ColorSwatch"
import { FONTS, NAMES } from "./constants"

const tabButton = cva(
  "px-[18px] py-[7px] text-[13px] font-ui font-medium border-none rounded-[7px] cursor-pointer transition-all duration-200",
  {
    variants: {
      active: {
        true: "bg-chrome-bg-tertiary text-chrome-text-primary shadow-[0_1px_3px_rgba(0,0,0,0.15)]",
        false: "bg-transparent text-chrome-text-tertiary shadow-none",
      },
    },
    defaultVariants: {
      active: false,
    },
  },
)

const sectionLabel =
  "text-[11px] font-medium text-chrome-text-tertiary uppercase tracking-[0.05em] block mb-2"

const toggleGroup =
  "inline-flex gap-[3px] p-[3px] bg-chrome-bg-primary rounded-[9px]"

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
  return (
    <>
      <div
        className={`sidebar-overlay${open ? " open" : ""}`}
        onClick={onClose}
      />
      <div className={`sidebar${open ? " open" : ""}`}>
        <div className="flex justify-between items-center mb-6">
          <span className="text-[15px] font-semibold text-chrome-text-primary font-ui">
            Theme Editor
          </span>
          <button className="kbd-badge" onClick={onClose}>
            ESC
          </button>
        </div>

        {/* Variant toggle */}
        <div className="mb-5">
          <span className={sectionLabel}>Variant</span>
          <div className={toggleGroup}>
            <button
              className={tabButton({ active: variant === "dark" })}
              onClick={() => setVariant("dark")}
            >
              Dark
            </button>
            <button
              className={tabButton({ active: variant === "light" })}
              onClick={() => setVariant("light")}
            >
              Light
            </button>
          </div>
        </div>

        {/* View toggle */}
        <div className="mb-5">
          <span className={sectionLabel}>View</span>
          <div className={toggleGroup}>
            <button
              className={tabButton({ active: view === "preview" })}
              onClick={() => setView("preview")}
            >
              Preview
            </button>
            <button
              className={tabButton({ active: view === "export" })}
              onClick={() => setView("export")}
            >
              Export
            </button>
          </div>
        </div>

        {/* Font selector */}
        <div className="mb-5">
          <span className={sectionLabel}>Font</span>
          <select
            value={font}
            onChange={(e) => setFont(e.target.value)}
            className="w-full px-2.5 py-2 text-[13px] bg-chrome-bg-primary text-chrome-text-primary border border-chrome-border rounded-[7px] cursor-pointer appearance-auto mb-1.5"
            style={{
              fontFamily: font
                ? `"${font}", var(--font-mono)`
                : "var(--font-mono)",
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
            className="w-full px-2.5 py-2 text-xs font-mono bg-chrome-bg-primary text-chrome-text-primary border border-chrome-border rounded-[7px]"
          />
        </div>

        {/* Base colors */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-medium text-chrome-text-tertiary uppercase tracking-[0.05em]">
              Base Colors
            </span>
            <button
              onClick={resetTheme}
              className="bg-none border-none text-chrome-text-tertiary text-[11px] cursor-pointer font-ui px-1.5 py-0.5 rounded hover:text-chrome-text-primary transition-colors duration-150"
            >
              Reset defaults
            </button>
          </div>
          <div className="grid grid-cols-2 gap-0.5">
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
          <span className={sectionLabel}>Palette</span>
          <div className="grid grid-cols-2 gap-0.5">
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
