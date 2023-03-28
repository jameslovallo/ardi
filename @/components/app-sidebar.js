import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-sidebar',
  props: { selector: [String, 'body'] },
  state: () => ({ headings: [] }),
  template() {
    return html`
      <ul part="list">
        ${this.headings.map(
          (h) =>
            html`
              <li class=${h.level}>
                <a href=${'#' + h.id} part="link">${h.text}</a>
              </li>
            `
        )}
      </ul>
    `
  },
  getHeadings(target) {
    const headings = target.querySelectorAll('h1, h2, h3')
    this.headings = [...headings].map((h) => ({
      text: h.innerText,
      id: h.id,
      level: h.tagName,
    }))
  },
  ready() {
    const target = document.querySelector(this.selector)
    this.getHeadings(target)
    new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') this.getHeadings(target)
      }
    }).observe(target, { attributes: true, childList: true, subtree: true })
  },
  css: /* css */ `
		:host {
			background: var(--surface);
			box-sizing: border-box;
			display: none;
			height: 100vh;
			left: 0;
      overflow: auto;
			padding: 7rem 1rem 3rem;
			position: fixed;
			top: 0;
			width: var(--sidebar-width);
		}
    @media (min-width: 1200px) {
      :host {
        display: block;
      }
    }
		[part=list] {
			list-style: none;
			padding: 0;
		}
    .H1 {
      display: none;
    }
    .H3 {
      padding-left: .75rem;
    }
		[part=link] {
			color: inherit;
			text-decoration: none;
		}
		[part=link]:hover {
      color: var(--theme-color);
			text-decoration: underline;
		}
	`,
})
