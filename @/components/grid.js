import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'home-grid',
  template() {
    return html`<slot></slot>`
  },
  css: `
		:host {
			display: grid;
			gap: 1rem;
			margin: 1rem 0;
			text-align: center;
		}
		@media (min-width: 600px) {
			:host {
				grid-template-columns: repeat(3, 1fr);
				margin: 1rem -1rem;
			}
		}
	`,
})
