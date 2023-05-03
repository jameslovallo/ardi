import { parse } from 'https://cdn.skypack.dev/marked@4.1'
import ardi, { css, html } from '../../@/assets/ardi-min.js'

const placeholder = `#   Heading 1
##  Heading 2
### Heading 3

List

- List item
- Another list item

Ordered List

1. List item
1. Another list item

Link

[Link Text](url)

Image

![Alt Text](//picsum.photos/100/100)
`

ardi({
  tag: 'markdown-editor',
  ready() {
    this.refs.preview.innerHTML = parse(placeholder)
  },
  template() {
    return html`
      <textarea
        @input=${(e) => {
          this.refs.preview.innerHTML = parse(e.target.value)
        }}
      >
        ${placeholder.trim()}
      </textarea
      >
      <div ref="preview"></div>
    `
  },
  css: css`
    :host {
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      display: block;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 400px;
      overflow: hidden;
    }
    textarea {
      background: transparent;
      border: 0;
      border-right: 1px solid var(--border);
      font-family: sans-serif;
      resize: none;
    }
    textarea:focus-visible {
      outline: none;
    }
    textarea,
    [ref='preview'] {
      overflow: auto;
      padding: 0.5rem;
    }
    [ref='preview'] {
      padding: 0 1rem;
    }
  `,
})
