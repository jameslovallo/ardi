import ardi from '../ardi-min'

// define JSX renderer in Babel 👉🏻 @jsx dom

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
}

customElements.define('hello-world', helloWorld)
