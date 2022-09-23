import ardi, { html } from '/js/ardi.js'

ardi({
	component: 'counter-demo',
	props: { count: [Number, 0], step: [Number, 1] },
	template() {
		return html`
			<button @click=${() => (this.count += this.step)}>
				Count: ${this.count}
			</button>
		`
	},
})
