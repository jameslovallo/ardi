export default {
	component: 'hello-world',
	shadow: true,
	props() {
		return {
			color: 'dodgerblue',
			name: 'there',
		}
	},
	template() {
		return `
			<p>Hello, <b part="name">${this.name}</b>!</p>
		`
	},
	styles() {
		return `
			[part=name] {
				color: ${this.color};
			}
		`
	},
	// ready() {},
	// intersect(r) {},
}
