export default (c) => {
	class ardi extends HTMLElement {
		connectedCallback() {
			Object.assign(this, c)
			this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this

			if (this.props) {
				Object.keys(this.props()).forEach((prop) => {
					const handler = this.props()[prop]
					if (typeof handler === 'function') {
						this[prop] = handler(this.getAttribute(prop))
					} else {
						const warning = `Handler for prop ${prop} in component ${this.component} is not a function.`
						console.warn(warning)
					}
				})
			}

			this.render = () => {
				const css = this.styles ? `<style>${this.styles()}</style>` : ''
				const html = this.template ? this.template() : ''
				this.DOM.innerHTML = css + html
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
				this.parts = {}
				this.DOM.querySelectorAll('[part]').forEach((part) => {
					part.on = (type, func = func) => {
						part.addEventListener(type, (e) => {
							func.apply(this, [e])
						})
					}
					this.parts[part.getAttribute('part')] = part
				})
				this.ready && this.ready()
			}
			this.render()

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
	}

	!customElements.get(c.component) && customElements.define(c.component, ardi)
}
