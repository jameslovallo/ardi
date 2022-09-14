import ardi from '/js/ardi-min.js'

export default class gauge extends ardi {
	setup() {
		this.shadow = true

		this.props = {
			label: String,
			max: (v) => (v ? Number(v) : 120),
			min: (v) => (v ? Number(v) : 0),
			step: (v) => (v ? Number(v) : 10),
			value: (v) => (v ? Number(v) : 90),
		}
	}

	deg(percentage) {
		return Math.round(240 * percentage) - 120
	}

	numbers() {
		let html = ''
		for (let i = this.min; i <= this.max; i += this.step) {
			const percentage = i / this.max
			const deg = this.deg(percentage)
			html += /* html */ `
			<div part="number" style="transform: rotate(${deg}deg)">
				<i style="transform: rotate(${-deg}deg)">${i}</i>
			</div>`
		}
		return html
	}

	intersect(ratio) {
		if (ratio > 0.3) {
			const val = this.deg(this.value / this.max)
			this.refs.dial.style.transform = `rotate(${val}deg)`
		}
	}

	template() {
		return /* html */ `
		${this.numbers()}
		<div part="dial" ref="dial"></div>
		<slot name="label" part="label">${this.label}</slot>`
	}

	styles() {
		return /* css */ `
		:host {
			align-items: center;
			background: var(--background, #000);
			border: 2px solid rgba(125,125,125,.5);
			border-radius: 50%;
			color: var(--color, #fff);
			display: flex;
			height: 300px;
			justify-content: center;
			overflow: hidden;
			position: relative;
			width: 300px;
		}
		[part=dial] {
			background: var(--dial, #333);
			border-radius: 50%;
			height: 10%;
			position: relative;
			transform: rotate(-120deg);
			transition: transform var(--dial-speed, 1s);
			width: 10%;
		}
		[part=dial]:before {
			background: var(--needle, #FF1744);
			bottom: 99%;
			content: '';
			display: block;
			height: 310%;
			left: calc(50% - 1px);
			position: absolute;
			width: 2px;
		}
		[part=number] {
			height: 100%;
			left: calc(50% - 1.5em);
			pointer-events: none;
			position: absolute;
			top: 0;
			width: 3em;
		}
		[part=number] i {
			align-items: center;
			display: flex;
			font-style: normal;
			height: 3em;
			justify-content: center;
			width: 3em;
		}
		[part=label] {
			align-items: center;
			background: var(--title-background, #333);
			border-radius: 50%;
			bottom: 0;
			color: var(--title-color, #fff);
			display: flex;
			height: 20%;
			justify-content: center;
			margin: 0;
			position: absolute;
			width: 100%;
		}`
	}
}
