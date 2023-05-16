import ardi, { css, html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'element-story',
  props: {
    element: [String],
  },
  ready() {
    this.el = this.querySelector(this.element)
    if (!this.el) {
      this.el = document.createElement(this.element)
      this.el.slot = 'playground'
      this.appendChild(this.el)
    }
    this.refs.controls.assignedElements().forEach((input) => {
      const { id, value } = input
      const isStyle = id.startsWith('style:')
      const prop = isStyle ? id.replace('style:', '') : id
      const label = document.createElement('label')
      label.innerHTML = id.replace(':', ': ')
      label.setAttribute('for', id)
      this.insertBefore(label, input)
      if (isStyle) {
        this.el.style.setProperty(prop, value)
        input.addEventListener('input', (e) => {
          this.el.style.setProperty(prop, e.target.value)
        })
      } else {
        const { type } = input
        this.el.setAttribute(id, type === 'checkbox' ? input.checked : value)
        input.addEventListener('input', () => {
          this.el.setAttribute(
            id,
            type === 'checkbox' ? input.checked : input.value
          )
        })
      }
    })
  },
  template() {
    return html`
      <slot name="playground" ref="playground" part="playground"></slot>
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
    [part='playground']::slotted(*) {
      width: var(--element-width);
    }
    [part='controls'] {
      border-top: 1px solid var(--border);
      display: block;
    }
    [part='controls']::slotted(*) {
      box-sizing: border-box;
    }
    [part='controls']::slotted(label) {
      display: block;
      font-size: 12px;
      opacity: 0.75;
      padding: 0.5rem 0.5rem 0;
    }
    [part='controls']::slotted(label:not(:first-child)) {
      border-top: 1px solid var(--border);
    }
    [part='controls']::slotted(
        input:not([type='color']):not([type='checkbox'])
      ),
    [part='controls']::slotted(select) {
      appearance: none;
      background: transparent;
      border: none;
      padding: 0.5rem;
      width: 100%;
    }
    [part='controls']::slotted(*:focus) {
      outline: none;
    }
    [part='controls']::slotted(input[type='checkbox']) {
      width: min-content;
    }
    [part='controls']::slotted(input[type='checkbox']),
    [part='controls']::slotted(input[type='color']) {
      margin: 0.5rem;
    }
    [part='controls']::slotted(input[type='color']) {
      padding: 0;
    }
    @media (min-width: 600px) {
      :host {
        grid-template-columns: 1fr 200px;
      }
      [part='controls'] {
        border-left: 1px solid var(--border);
        border-top: none;
      }
    }
  `,
})
