import ardi, { html } from '//unpkg.com/ardi'

ardi({
  component: 'ardi-counter',
  state: () => ({ count: 0 }),
  template() {
    return html` <button onClick=${() => this.count++}>
      Count: ${this.count}
    </button>`
  },
})
