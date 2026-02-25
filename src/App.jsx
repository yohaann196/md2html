import { useState, useCallback } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'
import Toolbar from './components/Toolbar'
import { parseMarkdown } from './utils/parser'
import './App.css'

const DEFAULT_MARKDOWN = `# Welcome to MD Converter

Write **Markdown** on the left, see the rendered output on the right.

## Features

- Live preview
- Syntax highlighting
- Export to HTML
- Drag & drop \`.md\` files

## Code Example

\`\`\`javascript
function hello(name) {
  return \`Hello, \${name}!\`
}
\`\`\`

## Table

| Name | Type | Default |
|------|------|---------|
| text | string | '' |
| size | number | 16 |

> Drag and drop a \`.md\` file anywhere to open it.
`

export default function App() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN)
  const [theme, setTheme] = useState('light')

  const html = parseMarkdown(markdown)

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (!file || !file.name.endsWith('.md')) return
    const reader = new FileReader()
    reader.onload = (ev) => setMarkdown(ev.target.result)
    reader.readAsText(file)
  }, [])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
  }, [])

  const exportHTML = () => {
    const full = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Exported</title>
<style>
  body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #1a1a1a; }
  pre { background: #f4f4f4; padding: 16px; border-radius: 6px; overflow-x: auto; }
  code { font-family: monospace; }
  img { max-width: 100%; }
  table { border-collapse: collapse; width: 100%; }
  th, td { border: 1px solid #ddd; padding: 8px 12px; }
  blockquote { border-left: 4px solid #ddd; margin: 0; padding-left: 16px; color: #666; }
</style>
</head>
<body>${html}</body>
</html>`
    const blob = new Blob([full], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div
      className={`app ${theme}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Toolbar theme={theme} setTheme={setTheme} onExport={exportHTML} />
      <div className="panes">
        <Editor value={markdown} onChange={setMarkdown} />
        <Preview html={html} />
      </div>
    </div>
  )
}
