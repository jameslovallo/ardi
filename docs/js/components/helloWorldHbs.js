import handlebars from 'https://cdn.skypack.dev/handlebars@4.7.7'
import ardi from '/js/ardi-min.js'

export default class helloWorld extends ardi {
	setup() {
		this.shadow = true

		this.props = {
			bg: '#def',
			color: '#000',
			image: '/img/kenobi.svg',
			name: 'there',
		}

		this.template = () => {
			const data = {
				image: this.image,
				name: this.name,
			}

			const hbs = handlebars.compile(`

			{{#if image}}
				<img src="{{image}}" />
			{{/if}}
			{{#if name}}
				<h2>Hello {{name}}!</h2>
			{{/if}}

			`)
			return hbs(data)
		}

		this.styles = () => /* css */ `
		:host {
			align-items: flex-end;
			display: flex;
			gap: 1rem;
		}
		img {
			height: 128px;
			width: 128px;
		}
		h2 {
			background: ${this.bg};
			border-radius: 1rem;
			color: ${this.color};
			margin: .15em 0;
			padding: 1rem;
			position: relative;
		}
		h2:before {
			background: ${this.bg};
			bottom: 1.33rem;
			content: '';
			display: block;
			height: 1rem;
			left: -.5rem;
			position: absolute;
			transform: rotate(45deg);
			width: 1rem;
		}`
	}

	// reactive
	static get observedAttributes() {
		return ['image', 'name', 'color', 'bg']
	}
}
