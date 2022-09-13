import ardi from '../ardi-min'
import dom from "https://cdn.skypack.dev/jsx-render@1.1.1";

// define JSX renderer in Babel 👉🏻 @jsx dom

class helloWorld extends ardi {
	setup() {
		this.shadow = true

		this.template = () => {
			const { wrapper, image, message } = this.styles()
			return (
				<div style={wrapper}>
					{this.image && <img src={this.image} style={image} />}
					{this.name && (
						<h2 style={message}>
							<i style={message.arrow}></i>
							Hello {this.name}!
						</h2>
					)}
				</div>
			)
		}

		this.styles = () => ({
			wrapper: {
				'align-items': 'flex-end',
				display: 'flex',
				gap: '1rem',
			},
			image: {
				height: '128px',
				width: '128px',
			},
			message: {
				background: this.bg,
				'border-radius': '1rem',
				color: this.color,
				margin: '.15em 0',
				padding: '1rem',
				position: 'relative',
				arrow: {
					background: this.bg,
					bottom: '1.33rem',
					display: 'block',
					height: '1rem',
					left: '-.33rem',
					position: 'absolute',
					transform: 'rotate(45deg)',
					width: '1rem',
				},
			},
		})
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
