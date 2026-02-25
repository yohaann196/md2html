export default function Editor({ value, onChange }) {
  return (
    <div className="pane editor-pane">
      <div className="pane-header">Markdown</div>
      <textarea
        className="editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  )
}
