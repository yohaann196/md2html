export default function Preview({ html }) {
  return (
    <div className="pane preview-pane">
      <div className="pane-header">Preview</div>
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
