export default class extends HTMLElement {
	constructor() {
		super()
		this.setup()
		// shadow & DOM
		this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this

		if (this.props) {
			Object.keys(this.props).forEach((prop) => {
				Object.defineProperty(this, prop, {
					get: () => {
						const handler = this.props[prop]
						const value = this.getAttribute(prop)
						if (typeof handler === 'function' && value) {
							return handler(value)
						} else return value ? value : undefined
					},
					set: (v) => this.setAttribute(prop, v),
				})
			})
		}
	}

	render() {
		// template() & styles()
		const css = this.styles ? `<style>${this.styles()}</style>` : ''
		let html = this.template ? this.template() : ''
		if (html?.nodeType === 1) html = html.outerHTML
		this.DOM.innerHTML = css + html

		// @ events in template()
		html.match(/@[a-z]+/gi)?.forEach((eAttr) => {
			const eString = eAttr.replace('@', '')
			this.DOM.querySelectorAll(`[\\${eAttr}]`).forEach((el) => {
				let func = this[el.getAttribute(eAttr)]
				if (typeof this[el.getAttribute(eAttr)] === 'function') {
					el.removeAttribute(eAttr)
					el.addEventListener(eString, (e) => {
						func.apply(this, [e])
					})
				}
			})
		})

		// refs
		this.refs = {}
		this.DOM.querySelectorAll('[ref]').forEach((ref) => {
			ref.on = (type, func) => {
				ref.addEventListener(type, (e) => {
					func.apply(this, [e])
				})
			}
			this.refs[ref.getAttribute('ref')] = ref
		})

		// ready()
		this.ready && this.ready()

		// intersect()
		if (typeof this.intersect === 'function') {
			new IntersectionObserver(
				(entries) =>
					entries.forEach((entry) => {
						entry.isIntersecting && this.intersect(entry.intersectionRatio.toFixed(2))
					}),
				{
					root: null,
					rootMargin: '0px',
					threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
				}
			).observe(this)
		}
	}

	// first render
	connectedCallback() {
		this.render()
	}

	attributeChangedCallback(prop, ov, nv) {
		this?.react(prop, ov, nv)
	}
}
