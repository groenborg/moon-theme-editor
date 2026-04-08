export function TerminalInput() {
  return (
    <div className="px-5 pt-3 pb-4 bg-chrome-bg-primary border-t border-chrome-border font-ui shrink-0">
      <span className="inline-block text-chrome-text-secondary px-2.5 py-[3px] rounded text-[13px] font-medium mb-2.5 border border-chrome-border">
        ~/moon-editor
      </span>
      <div>
        <input
          type="text"
          placeholder="Type '/' or 'help' to see options"
          className="w-full bg-transparent border-none outline-none text-chrome-text-tertiary font-ui text-sm caret-chrome-text-primary"
        />
      </div>
    </div>
  )
}
