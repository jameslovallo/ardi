export default class extends HTMLElement {
	constructor() {
		super(),
			this.setup(),
			(this.DOM = this.shadow ? this.attachShadow({ mode: 'open' }) : this),
			this.props &&
				Object.keys(this.props).forEach((t) => {
					Object.defineProperty(this, t, {
						get: () => {
							const e = this.props[t],
								s = this.getAttribute(t)
							return 'function' == typeof e ? e(s) : s || e
						},
						set: (e) => this.setAttribute(t, e),
					})
				})
	}
	render() {
		const t = this.styles ? `<style>${this.styles()}</style>` : ''
		let e = this.template ? this.template() : ''
		1 === e?.nodeType && (e = e.outerHTML),
			(this.DOM.innerHTML = t + e),
			e.match(/@[a-z]+/gi)?.forEach((t) => {
				const e = t.replace('@', '')
				this.DOM.querySelectorAll(`[\\${t}]`).forEach((s) => {
					let i = this[s.getAttribute(t)]
					'function' == typeof this[s.getAttribute(t)] &&
						(s.removeAttribute(t),
						s.addEventListener(e, (t) => {
							i.apply(this, [t])
						}))
				})
			}),
			(this.refs = {}),
			this.DOM.querySelectorAll('[ref]').forEach((t) => {
				;(t.on = (e, s) => {
					t.addEventListener(e, (t) => {
						s.apply(this, [t])
					})
				}),
					(this.refs[t.getAttribute('ref')] = t)
			}),
			this.ready && this.ready(),
			'function' == typeof this.intersect &&
				new IntersectionObserver(
					(t) =>
						t.forEach((t) => {
							t.isIntersecting && this.intersect(t.intersectionRatio.toFixed(2))
						}),
					{
						root: null,
						rootMargin: '0px',
						threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
					}
				).observe(this)
	}
	connectedCallback() {
		this.render()
	}
	attributeChangedCallback() {
		this.render()
	}
}
