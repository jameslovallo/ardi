import ardi, { html } from '//unpkg.com/ardi'

ardi({
  component: 'ardi-counter',
  state: () => ({ count: 0 }),
  template() {
    return html`
    <button onClick=${() => (this.state.count++)}>
      Count: ${this.state.count}
    </button>`
  },
})
