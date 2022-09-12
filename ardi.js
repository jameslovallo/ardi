export default (c) => {
	const props = Object.keys(c.props())
	class ardi extends HTMLElement {
		constructor() {
			super() && Object.assign(this, c)
			// shadow & DOM
			this.DOM = c.shadow ? this.attachShadow({ mode: 'open' }) : this
		}

		render() {
			// props()
			props.forEach((prop) => {
				const handler = this.props()[prop]
				const value = this.getAttribute(prop)
				if (typeof handler === 'function') {
					this[prop] = handler(value)
				} else this[prop] = value ? value : handler
			})

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

		// reactive
		static get observedAttributes() {
			if (c.reactive) return props
		}

		attributeChangedCallback() {
			this.render()
		}
	}

	// component
	!customElements.get(c.component) && customElements.define(c.component, ardi)
}
