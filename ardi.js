export default (c) => {
	class ardi extends HTMLElement {
		connectedCallback() {
			Object.assign(this, c)
			this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this

			if (this.props) {
				Object.keys(this.props()).forEach((prop) => {
					const handler = this.props()[prop]
					const value = this.getAttribute(prop)
					if (typeof handler === 'function') {
						this[prop] = handler(value)
					} else this[prop] = value ? value : handler
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
				this.refs = {}
				this.DOM.querySelectorAll('[ref]').forEach((ref) => {
					ref.on = (type, func = func) => {
						ref.addEventListener(type, (e) => {
							func.apply(this, [e])
						})
					}
					this.refs[ref.getAttribute('ref')] = ref
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
