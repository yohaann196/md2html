import { marked } from 'marked'
import hljs from 'highlight.js'

marked.setOptions({
  gfm: true,
  breaks: true,
})

const renderer = new marked.Renderer()

renderer.code = (code, lang) => {
  const language = hljs.getLanguage(lang) ? lang : 'plaintext'
  const highlighted = hljs.highlight(code, { language }).value
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
}

marked.use({ renderer })

export function parseMarkdown(md) {
  return marked.parse(md)
}
