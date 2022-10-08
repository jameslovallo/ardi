import { render as uhtml } from 'uhtml'
export { html, svg } from 'uhtml'

export default function ardi(x) {
	const props = Object.keys(x.props)
	const update = new Event('update')

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
						this.dispatchEvent(update)
						return true
					},
					deleteProperty: (target, prop) => {
						delete target[prop]
						this.dispatchEvent(update)
						return true
					},
				})
			}
			this.state = reactive(typeof x.state === 'function' ? x.state() : x.state)

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

		// rendering
		debounce(fn) {
			var timeout
			return function () {
				var context = this
				var args = arguments
				if (timeout) {
					window.cancelAnimationFrame(timeout)
				}
				timeout = window.requestAnimationFrame(function () {
					fn.apply(context, args)
				})
			}
		}
		render() {
			uhtml(this.shadowRoot, this.template())
		}
		connectedCallback() {
			this.render()
			this.addEventListener('update', this.debounce(this.render))
			this.shadowRoot.querySelectorAll('[ref]').forEach((ref) => {
				this.refs[ref.getAttribute('ref')] = ref
			})
			this?.ready && this.ready()
		}

		// reactive props
		static get observedAttributes() {
			return props
		}
		attributeChangedCallback() {
			this.dispatchEvent(update)
		}
	}

	// define element
	!customElements.get(x.component) && customElements.define(x.component, c)
}
