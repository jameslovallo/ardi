export default {
	component: 'hello-world',
	shadow: true,
	props() {
		return {
			color: 'red',
			name: 'there',
		}
	},
	// ready() {},
	// intersect(r) {},
	template() {
		return `<p>Hello, <span part="name">${this.name}</span>!</p>`
	},
	styles() {
		return `[part=name] { color: ${this.color}; }`
	},
}
