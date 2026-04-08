import { cva } from "class-variance-authority"
import { useRef } from "react"

const swatchWrapper = cva(
  "flex items-center cursor-pointer px-2 py-1.5 rounded-lg transition-[background] duration-150 hover:bg-[rgba(128,128,140,0.1)]",
  {
    variants: {
      size: {
        default: "gap-2.5",
        small: "gap-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const swatchColor = cva(
  "rounded-[6px] border border-[rgba(128,128,140,0.25)] shrink-0 relative",
  {
    variants: {
      size: {
        default: "w-7 h-7",
        small: "w-6 h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export function ColorSwatch({ color, onChange, label, small }) {
  const ref = useRef(null)
  const size = small ? "small" : "default"
  return (
    <div
      onClick={() => ref.current?.click()}
      className={swatchWrapper({ size })}
    >
      <div className={swatchColor({ size })} style={{ background: color }}>
        <input
          ref={ref}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
        />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-chrome-text-secondary capitalize leading-[1.2]">
          {label}
        </div>
        <div className="text-[11px] font-mono text-chrome-text-tertiary leading-[1.4]">
          {color}
        </div>
      </div>
    </div>
  )
}
