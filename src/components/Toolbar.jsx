export default function Toolbar({ theme, setTheme, onExport }) {
  return (
    <header className="toolbar">
      <span className="toolbar-title">MD Converter</span>
      <div className="toolbar-actions">
        <button
          className="btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <button className="btn btn-primary" onClick={onExport}>
          Export HTML
        </button>
      </div>
    </header>
  )
}
