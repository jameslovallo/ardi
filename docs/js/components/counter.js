import ardi from '/js/ardi-min.js'

export default class counter extends ardi {
	setup() {
		this.shadow = true

		this.template = () => /* html */ `
		<button @click="sub">-</button>
		<span part="count" ref="count">${this.count}</span>
		<button @click="add">+</button>`

		this.styles = () => /* css */ `
		:host {
			align-items: center;
			display: inline-flex;
			border: 1px solid rgba(125,125,125,0.5);
		}
		[part=count] {
			min-width: 2rem;
			text-align: center;
		}
		button {
			align-items: center;
			background: none;
			border: none;
			color: inherit;
			cursor: pointer;
			display: inline-flex;
			font-family: arial;
			height: 1.5rem;
			justify-content: center;
			padding: 0;
			user-select: none;
			width: 1.5rem;
		}`
	}

	sub() {
		this.count -= this.step
		this.refs.count.innerHTML = this.count
	}

	add() {
		this.count += this.step
		this.refs.count.innerHTML = this.count
	}

	// count
	get count() {
		return Number(this.getAttribute('count') || 0)
	}
	set count(v) {
		this.setAttribute('count', v)
	}

	// step
	get step() {
		return Number(this.getAttribute('step') || 1)
	}
	set step(v) {
		this.setAttribute('step', v)
	}
}
