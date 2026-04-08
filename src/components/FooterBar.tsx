export function FooterBar({ variant, font, theme }) {
  const dot = (
    <span className="text-chrome-text-tertiary opacity-50">{" · "}</span>
  )
  return (
    <div className="flex items-center px-5 py-[5px] bg-chrome-bg-secondary border-t border-chrome-border font-ui text-xs text-chrome-text-tertiary shrink-0 gap-1">
      <span className="inline-flex gap-[3px] items-center mr-1">
        <span className="inline-block w-[7px] h-[7px] rounded-full bg-chrome-text-green" />
        Theme Ready
      </span>
      {dot}
      <span>{variant} variant</span>
      {dot}
      <span>16 palette colors</span>
      {dot}
      <span>font: {font || "system default"}</span>
      {dot}
      <span>
        {theme.background} / {theme.foreground}
      </span>
    </div>
  )
}
