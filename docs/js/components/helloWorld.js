import ardi, { html } from '/js/ardi.js'

ardi({
	component: 'hello-world',
	props: {
		bg: [String, '#def'],
		color: [String, '#000'],
		image: [String, '/img/kenobi.svg'],
		name: [String, 'there'],
	},
	template() {
		return html`
			<img part="image" src=${this.image} />
			<h2 part="message" style=${`--bg: ${this.bg}; --color: ${this.color};`}>
				Hello ${this.name}
			</h2>

			<style>
				:host {
					align-items: flex-end;
					display: flex;
					gap: 1rem;
				}
				[part='image'] {
					height: 128px;
					width: 128px;
				}
				[part='message'] {
					background: var(--bg);
					border-radius: 1rem;
					color: var(--color);
					margin: 0.15em 0;
					padding: 1rem;
					position: relative;
				}
				[part='message']:before {
					background: var(--bg);
					bottom: 1.33rem;
					content: '';
					display: block;
					height: 1rem;
					left: -0.5rem;
					position: absolute;
					transform: rotate(45deg);
					width: 1rem;
				}
			</style>
		`
	},
})
