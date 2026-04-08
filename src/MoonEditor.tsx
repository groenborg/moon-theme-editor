import { useCallback, useEffect, useState } from "react"
import {
  DEFAULTS,
  EditorSidebar,
  ExportPanel,
  FooterBar,
  Preview,
  SecondaryBar,
  TerminalInput,
  TopNav,
} from "./components"

export default function MoonEditor() {
  const [variant, setVariant] = useState("dark")
  const [themes, setThemes] = useState(JSON.parse(JSON.stringify(DEFAULTS)))
  const [view, setView] = useState("preview")
  const [font, setFont] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const theme = themes[variant]

  const setProp = useCallback(
    (prop, val) => {
      setThemes((prev) => {
        const next = JSON.parse(JSON.stringify(prev))
        next[variant][prop] = val
        return next
      })
    },
    [variant],
  )

  const setPalette = useCallback(
    (idx, val) => {
      setThemes((prev) => {
        const next = JSON.parse(JSON.stringify(prev))
        next[variant].palette[idx] = val
        return next
      })
    },
    [variant],
  )

  const resetTheme = () => {
    setThemes((prev) => {
      const next = JSON.parse(JSON.stringify(prev))
      next[variant] = JSON.parse(JSON.stringify(DEFAULTS[variant]))
      return next
    })
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = e.target.tagName
      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return
      if (e.key === "e" || e.key === "E") {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setSidebarOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <TopNav onToggleSidebar={() => setSidebarOpen((v) => !v)} />
      <SecondaryBar variant={variant} />

      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        {view === "preview" ? (
          <Preview theme={theme} font={font} />
        ) : (
          <div
            style={{
              flex: 1,
              overflow: "auto",
              padding: "24px 32px",
              background: theme.background,
            }}
          >
            <ExportPanel theme={theme} variant={variant} font={font} />
          </div>
        )}
      </div>

      <TerminalInput />
      <FooterBar variant={variant} font={font} theme={theme} />

      <EditorSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        variant={variant}
        setVariant={setVariant}
        view={view}
        setView={setView}
        font={font}
        setFont={setFont}
        theme={theme}
        setProp={setProp}
        setPalette={setPalette}
        resetTheme={resetTheme}
      />
    </>
  )
}
