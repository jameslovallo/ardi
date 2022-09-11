export default {
	component: 'hello-world',
	shadow: true,
	props() {
		return {
			bg: '#def',
			color: 'black',
			name: 'there',
		}
	},
	template() {
		return `
			<img part="image" src="/ardi/assets/svg/kenobi.svg">
			<h2 part="message">Hello ${this.name}!</h2>
		`
	},
	styles() {
		return `
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
			}
		`
	},
	// ready() {},
	// intersect(r) {},
}
