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
		return `
			:host {
				align-items: center;
				display: flex;
			}
			[part=count] {
				min-width: 2rem;
				text-align: center;
			}
			button {
				align-items: center;
				cursor: pointer;
				display: inline-flex;
				font-family: arial;
				height: 1.5rem;
				justify-content: center;
				padding: 0;
				user-select: none;
				width: 1.5rem;
			}
		`
	},
}
