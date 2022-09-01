export default (c) => {
	class enos extends HTMLElement {
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
				this.parts = {}
				this.DOM.querySelectorAll('[part]').forEach((part) => {
					part.on = (type, func) => {
						func = func.bind(this)
						part.addEventListener(type, (e) => func(e))
					}
					this.parts[part.getAttribute('part')] = part
				})
				this.DOM.querySelectorAll('[on]').forEach((el) => {
					const [type, func] = el.getAttribute('on').split(':')
					el.addEventListener(type, (e) => this[func](e))
				})
				if (this?.ready) this.ready()
			}
			this.render()
		}
	}

	!customElements.get(c.component) && customElements.define(c.component, enos)
}
