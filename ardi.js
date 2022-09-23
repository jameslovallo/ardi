import { render } from 'uhtml'
export { html, svg } from 'uhtml'

export default function ardi(x) {
	const props = Object.keys(x.props)
	class c extends HTMLElement {
		constructor() {
			super().attachShadow({ mode: 'open' })
			Object.assign(this, x)
			// props
			props.forEach((prop) => {
				const [propSetter, propDefault] = this.props[prop]
				Object.defineProperty(this, prop, {
					get: () => {
						const value = this.getAttribute(prop) || propDefault
						return propSetter !== String ? propSetter(value) : value
					},
					set: (v) => this.setAttribute(prop, v),
				})
			})
			// intersect
			if (typeof this.intersect === 'function') {
				new IntersectionObserver(
					(entries) =>
						entries.forEach((entry) => {
							entry.isIntersecting &&
								this.intersect(entry.intersectionRatio.toFixed(2))
						}),
					{
						root: null,
						rootMargin: '0px',
						threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
					}
				).observe(this)
			}
		}

		render() {
			render(this.shadowRoot, this.template())
			this.refs = {}
			this.shadowRoot.querySelectorAll('[ref]').forEach((ref) => {
				this.refs[ref.getAttribute('ref')] = ref
			})
		}

		connectedCallback() {
			this?.ready && this.ready()
			this.render()
		}

		// reactive
		static get observedAttributes() {
			return props
		}
		attributeChangedCallback() {
			this.render()
		}
	}

	// define element
	!customElements.get(x.component) && customElements.define(x.component, c)
}
