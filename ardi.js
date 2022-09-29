import { render as uhtml } from 'uhtml'
export { html, svg } from 'uhtml'

export default function ardi(x) {
	const props = Object.keys(x.props)
	class c extends HTMLElement {
		constructor() {
			super().attachShadow({ mode: 'open' })
			Object.assign(this, x)
			this.refs = {}

			// register props
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

			// reactive state
			const reactive = (object) => {
				if (object === null || typeof object !== 'object') {
					return object
				}
				for (const property in object) {
					object[property] = reactive(object[property])
				}
				return new Proxy(object, {
					get: (target, property) => {
						return target[property]
					},
					set: (target, property, value) => {
						target[property] = reactive(value)
						this.update()
						return true
					},
					deleteProperty: (target, prop) => {
						delete target[prop]
						this.update()
						return true
					},
				})
			}
			this.state = reactive(x.state)

			// intersect helper
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
			uhtml(this.shadowRoot, this.template())
		}

		update() {
			this.render()
			this.shadowRoot.querySelectorAll('[ref]').forEach((ref) => {
				this.refs[ref.getAttribute('ref')] = ref
			})
		}

		connectedCallback() {
			this?.ready && this.ready()
			this.update()
		}

		// reactive props
		static get observedAttributes() {
			return props
		}
		attributeChangedCallback() {
			this.update()
		}
	}

	// define element
	!customElements.get(x.component) && customElements.define(x.component, c)
}
