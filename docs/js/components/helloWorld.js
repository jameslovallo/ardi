import ardi from '/js/ardi-min.js'

class helloWorld extends ardi {
	setup() {
		this.shadow = true

		this.template = () => /* html */ `
		<img part="image" src="/img/kenobi.svg">
		<h2 part="message">Hello ${this.name}</h2>`

		this.styles = () => /* css */ `
		:host {
			align-items: flex-end;
			display: flex;
			gap: 1rem;
		}
		[part=image] {
			height: 128px;
			width: 128px;
		}
		[part=message] {
			background: ${this.bg};
			border-radius: 1rem;
			color: ${this.color};
			margin: .15em 0;
			padding: 1rem;
			position: relative;
		}
		[part=message]:before {
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

	// image
	get image() {
		return this.getAttribute('image') || '/img/kenobi.svg'
	}
	set image(v) {
		this.setAttribute('image', v)
	}

	// name
	get name() {
		return this.getAttribute('name') || 'there'
	}
	set name(v) {
		this.setAttribute('name', v)
	}

	// bg
	get bg() {
		return this.getAttribute('bg') || '#def'
	}
	set bg(v) {
		this.setAttribute('bg', v)
	}

	// color
	get color() {
		return this.getAttribute('color') || '#000'
	}
	set color(v) {
		this.setAttribute('color', v)
	}

	// reactive
	static get observedAttributes() {
		return ['image', 'name', 'color', 'bg']
	}
}

customElements.define('hello-world', helloWorld)
