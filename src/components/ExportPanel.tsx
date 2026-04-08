import { cva } from "class-variance-authority"
import { useState } from "react"

const copyButton = cva(
  "absolute top-3 right-3 z-[2] border-[0.5px] border-chrome-border rounded-[6px] px-3.5 py-[5px] text-xs cursor-pointer font-ui font-medium transition-all duration-200",
  {
    variants: {
      copied: {
        true: "bg-bg-success text-text-success",
        false: "bg-chrome-bg-secondary text-chrome-text-secondary",
      },
    },
    defaultVariants: {
      copied: false,
    },
  },
)

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
    <div className="relative">
      <button onClick={copy} className={copyButton({ copied })}>
        {copied ? "Copied" : "Copy"}
      </button>
      <pre className="bg-chrome-bg-secondary rounded-[10px] py-5 px-6 font-mono text-xs leading-[1.7] text-chrome-text-secondary overflow-auto border-[0.5px] border-chrome-border m-0 whitespace-pre-wrap">
        {text}
      </pre>
    </div>
  )
}
