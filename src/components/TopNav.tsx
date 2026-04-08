export function NavItem({ onClick, label, text }) {
  return (
    <button
      onClick={onClick}
      className="bg-none border-none p-0 cursor-pointer font-ui text-sm text-chrome-text-secondary hover:text-chrome-text-primary transition-colors duration-150"
    >
      <span className="font-bold">[{label}]</span> {text}
    </button>
  )
}

export function TopNav({ onToggleSidebar }) {
  return (
    <div className="flex items-center gap-6 px-5 py-2.5 bg-chrome-bg-secondary border-b border-chrome-border font-ui text-sm shrink-0 flex-wrap">
      <span className="font-bold text-chrome-text-primary">Moon Editor</span>
      <span className="text-chrome-text-tertiary">
        Type{" "}
        <span className="text-chrome-text-primary font-semibold">help</span> for
        options
      </span>
      <NavItem onClick={onToggleSidebar} label="E" text="show editor" />
      <NavItem label="D" text="Docs" />
      <NavItem label="?" text="Help" />
    </div>
  )
}
