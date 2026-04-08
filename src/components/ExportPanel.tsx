import { useState } from "react"

export function ExportPanel({ theme, variant, font }) {
  const [copied, setCopied] = useState(false)
  const generate = () => {
    const lines = [
      `# Moon ${variant.charAt(0).toUpperCase() + variant.slice(1)}`,
      "",
    ]
    if (font) {
      lines.push(`# Add to your main config (~/.config/ghostty/config)`)
      lines.push(`font-family = ${font}`)
      lines.push("")
    }
    lines.push(
      `background = ${theme.background}`,
      `foreground = ${theme.foreground}`,
      `cursor-color = ${theme.cursorColor}`,
      `cursor-text = ${theme.cursorText}`,
      `selection-background = ${theme.selectionBg}`,
      `selection-foreground = ${theme.selectionFg}`,
      "",
    )
    const labels = [
      "Black",
      "Red",
      "Green",
      "Yellow",
      "Blue",
      "Magenta",
      "Cyan",
      "White",
    ]
    for (let i = 0; i < 8; i++) {
      lines.push(`# ${labels[i]} (normal / bright)`)
      lines.push(`palette = ${i}=${theme.palette[i]}`)
      lines.push(`palette = ${i + 8}=${theme.palette[i + 8]}`)
      if (i < 7) lines.push("")
    }
    return lines.join("\n") + "\n"
  }
  const text = generate()
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={copy}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          background: copied
            ? "var(--color-background-success)"
            : "var(--color-background-secondary)",
          color: copied
            ? "var(--color-text-success)"
            : "var(--color-text-secondary)",
          border: "0.5px solid var(--color-border-tertiary)",
          borderRadius: 6,
          padding: "5px 14px",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          transition: "all 0.2s",
        }}
      >
        {copied ? "Copied" : "Copy"}
      </button>
      <pre
        style={{
          background: "var(--color-background-secondary)",
          borderRadius: 10,
          padding: "20px 24px",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
          overflow: "auto",
          border: "0.5px solid var(--color-border-tertiary)",
          margin: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {text}
      </pre>
    </div>
  )
}
