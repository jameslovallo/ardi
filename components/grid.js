import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'home-grid',
  template() {
    return html`<slot></slot>`
  },
  css: `
		:host {
			display: grid;
			gap: 1rem;
			margin-block: 1rem;
			text-align: center;
		}
		@media (min-width: 768px) {
			:host {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	`,
})
