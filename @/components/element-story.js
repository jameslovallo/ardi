import ardi, { css, html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'element-story',
  props: {
    element: [String],
  },
  ready() {
    this.el = document.createElement(this.element)
    ;[...this.children].forEach((input) => {
      const { name, value } = input
      const isStyle = name.startsWith('style:')
      const prop = isStyle ? name.replace('style:', '') : name
      const label = document.createElement('label')
      label.innerHTML = name.replace(':', ': ')
      label.for = name
      this.insertBefore(label, input)
      if (isStyle) {
        this.el.style.setProperty(prop, value)
        input.addEventListener('input', (e) => {
          this.el.style.setProperty(prop, e.target.value)
        })
      } else {
        this.el.setAttribute(name, value)
        input.addEventListener('input', (e) => {
          this.el.setAttribute(name, e.target.value)
        })
      }
    })
    this.refs.playground.appendChild(this.el)
  },
  template() {
    return html`
      <div ref="playground" part="playground"></div>
      <slot ref="controls" part="controls"></slot>
    `
  },
  styles: css`
    :host {
      border: 1px solid var(--border);
      border-radius: 0.5rem;
      display: grid;
      min-height: 5rem;
    }
    [part='playground'] {
      display: grid;
      padding: 1rem;
      place-items: center;
    }
    [part='controls'] {
      border-top: 1px solid var(--border);
      display: grid;
    }
    [part='controls']::slotted(label) {
      padding: 0.5rem 1rem 0;
    }
    [part='controls']::slotted(label:not(:first-of-type)) {
      border-top: 1px solid var(--border);
    }
    [part='controls']::slotted(input:not([type='color'])) {
      background: 0;
      border: none;
      font-size: 1rem;
      padding: 1rem;
    }
    [part='controls']::slotted(input[type='color']) {
      margin: 1rem;
    }
    @media (min-width: 768px) {
      :host {
        grid-template-columns: 1fr 300px;
      }
      [part='controls'] {
        border-left: 1px solid var(--border);
        border-top: none;
      }
    }
  `,
})
