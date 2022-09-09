export default {
	component: 'hello-world',
	shadow: true,
	props() {
		return {
			color: 'red',
			name: String,
		}
	},
	// ready() {},
	// intersect(r) {},
	template() {
		return `<p>Hello, <span part="name">${this.name}</span>!</p>`
	},
	styles() {
		return `:host { display: block; }`
	},
}
