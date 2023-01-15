import ardi, { html } from '//unpkg.com/ardi'

ardi({
  component: 'ardi-counter',
  props: { count: [Number, 0], step: [Number, 1] },
  template() {
    return html`
      <button @click=${() => (this.count += this.step)}>
        Count: ${this.count}
      </button>
    `
  },
})
