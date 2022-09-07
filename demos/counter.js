export default {
	component: 'counter-demo',
	shadow: true,
	props() {
		return {
			count: Number,
			step: (v) => (v ? Number(v) : 1),
		}
	},
	sub() {
		this.count -= this.step
		this.refs.count.innerHTML = this.count
	},
	add() {
		this.count += this.step
		this.refs.count.innerHTML = this.count
	},
	template() {
		return /* html */ `
			<button @click="sub">-</button>
			<span ref="count">${this.count}</span>
			<button @click="add">+</button>
		`
	},
	styles() {
		return `button { cursor: pointer; user-select: none }`
	},
}
