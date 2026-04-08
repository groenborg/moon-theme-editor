import MoonEditor from "./MoonEditor"

export default function App() {
  return (
    <div>
      <h1 style={{
        fontSize: 22,
        fontWeight: 500,
        color: "var(--color-text-primary)",
        marginBottom: 4,
      }}>
        Moon theme editor
      </h1>
      <p style={{
        fontSize: 14,
        color: "var(--color-text-tertiary)",
        marginBottom: 28,
      }}>
        Customize your Ghostty terminal color scheme
      </p>
      <MoonEditor />
    </div>
  )
}
