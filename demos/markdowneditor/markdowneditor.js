import { parse } from 'https://cdn.skypack.dev/marked@4.1'
import ardi, { html } from '//unpkg.com/ardi'

const placeholder = `
Type some markdown...

#   Heading 1
##  Heading 2
### Heading 3

List

- List item
- Another list item

Ordered List

1. List item
1. Another list item

[Link Text](url)
![Alt Text](url)
`

ardi({
  tag: 'markdown-editor',
  template() {
    return html`
      <textarea
        placeholder=${placeholder.trim()}
        @input=${(e) => {
          this.refs.preview.innerHTML = parse(e.target.value)
        }}
      ></textarea>
      <div ref="preview"></div>
    `
  },
  css: /* css */ `
    :host {
      border: 1px solid var(--border);
			border-radius: .5rem;
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
      resize: none;
    }
    textarea:focus-visible {
      outline: none;
    }
    textarea, [ref=preview] {
      overflow: auto;
      padding: .5rem;
    }
    [ref=preview] {
      padding: 0 1rem;
    }
  `,
})
