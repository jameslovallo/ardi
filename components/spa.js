import grayMatter from 'https://cdn.skypack.dev/gray-matter@4.0.3'
import parse from 'https://unpkg.com/snarkdown@2.0.0/dist/snarkdown.modern.js'
import ardi, { css, html } from '../@/assets/ardi-min.js'
import '../components/dialog.js'
import head from '/head.js'

ardi({
	tag: 'spa-app',
	props: { breakpoint: [Number, 768] },
	state: () => ({ mobile: null, touch: navigator.maxTouchPoints > 0 }),
	created() {
		const mq = matchMedia(`(min-width: ${this.breakpoint}px)`)
		this.mobile = !mq.matches
		mq.addEventListener('change', () => (this.mobile = !mq.matches))
		this.contentRoot = document.createElement('div')
		this.contentRoot.slot = 'content'
		this.appendChild(this.contentRoot)
	},
	setHead(data) {
		const { title, description, image } = { ...head, ...data }
		const createMeta = (name, content, attribute = 'property') => {
			const metaTag = document.querySelector(`meta[${attribute}='${name}']`)
			if (metaTag) {
				metaTag.content = content
			} else {
				const newTag = document.createElement('meta')
				newTag.setAttribute(attribute, name)
				newTag.setAttribute('content', content)
				document.head.appendChild(newTag)
			}
		}
		if (title) {
			document.title = title
			createMeta('og:title', title)
		}
		if (description) {
			createMeta('description', description, 'name')
			createMeta('og:description', description)
		}
		if (image) createMeta('og:image', image)
	},
	getMD(path, preload = false) {
		const corePath = path
		path = path === '/' ? '/home' : `${path}`
		const getFile = (path, callback) => {
			fetch(path)
				.then((res) => res.text())
				.then((page) => {
					if (page.startsWith('#') || page.startsWith('---')) {
						const { content, data } = grayMatter(page)
						if (!preload) {
							this.contentRoot.innerHTML = parse(content)
							this.style.opacity = 1
							if (data) this.setHead(data)
							this.handleLinks(this.contentRoot)
							this.handleScripts(this.contentRoot)
							history.pushState(corePath, '', corePath)
						} else this.preloaded = { content: parse(content), data }
					} else if (callback) callback()
				})
		}
		getFile('/pages' + path + '.md', () => {
			getFile('/pages' + path + '/index.md', () => {
				getFile('/pages/404.md')
			})
		})
	},
	setPreloaded(path) {
		this.contentRoot.innerHTML = this.preloaded.content
		this.setHead(this.preloaded.data)
		this.handleLinks(this.contentRoot)
		this.handleScripts(this.contentRoot)
		this.preloaded = undefined
		history.pushState(path, '', path)
	},
	handleLinks(scope, drawer = false) {
		scope.querySelectorAll('a').forEach((link) => {
			if (link.pathname.startsWith('/')) {
				if (!this.touch) {
					link.addEventListener('mouseover', () => {
						this.getMD(link.pathname, true)
					})
				}
				link.addEventListener('click', (e) => {
					e.preventDefault()
					if (!this.touch && this.preloaded) {
						this.setPreloaded(link.pathname)
					} else this.getMD(link.pathname)
					if (drawer) this.refs.drawer.open = false
				})
			}
		})
	},
	handleScripts(scope) {
		scope.querySelectorAll('script').forEach((script) => {
			const newScript = document.createElement('script')
			if (script.src) newScript.src = script.src
			if (script.type) newScript.type = script.type
			if (script.innerHTML) newScript.innerHTML = script.innerHTML
			script.parentNode.replaceChild(newScript, script)
		})
	},
	ready() {
		this.getMD(location.pathname)
		history.pushState(location.pathname, '', location.pathname)
		this.handleLinks(this, true)
		addEventListener('popstate', (e) => this.getMD(e.state || '/'))
	},
	template() {
		return html`
			<nav>
				${this.mobile
					? html`
							<ardi-dialog drawer ref="drawer">
								<button slot="opener" part="menu-button">
									<svg viewBox="0 0 24 24" part="menu-button-icon">
										<path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
									</svg>
								</button>
								<slot name="nav"></slot>
							</ardi-dialog>
							<slot name="mobile-nav"></slot>
					  `
					: html`<slot name="nav"></slot>`}
			</nav>
			<main>
				<slot name="content"></slot>
			</main>
			<footer>
				<slot name=${this.mobile ? 'mobile-footer' : 'footer'}></slot>
			</footer>
		`
	},
	styles: css`
		:host {
			display: block;
			height: 100%;
		}
		* {
			box-sizing: border-box;
		}
		nav {
			align-items: center;
			background: black;
			color: white;
			display: flex;
			gap: 1rem;
			padding: 1rem;
		}
		ardi-dialog {
			margin: -1rem 0 -1rem -0.5rem;
		}
		ardi-dialog::part(dialog) {
			display: flex;
			gap: 1rem;
			flex-direction: column;
			justify-content: center;
		}
		[part='menu-button'] {
			background: transparent;
			border: none;
			color: currentColor;
			display: block;
			padding: 0.5rem;
		}
		[part='menu-button-icon'] {
			display: block;
			fill: currentColor;
			width: 24px;
		}
		nav slot::slotted(*) {
			color: inherit;
			text-decoration: none;
		}
		main {
			margin: 0 auto;
			max-width: 70ch;
			padding: 1rem;
		}
		footer {
			background: #ddd;
			position: sticky;
			top: 100vh;
		}
		footer slot {
			display: block;
			overflow: auto;
			margin: 0 auto;
			max-width: 70ch;
			padding: 0 1rem;
		}
	`,
})
