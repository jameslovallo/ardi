import ardi, { html } from '../assets/ardi-min.js'

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
    const headings = target.querySelectorAll('h2:not(#features), h3')
    this.headings = [...headings].map((h) => ({
      text: h.innerText,
      id: h.id,
      level: h.tagName,
    }))
  },
  created() {
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
      background: var(--surface-heavy);
      box-sizing: border-box;
      display: none;
      height: 100vh;
      left: 0;
      overflow: auto;
      padding: 5rem 1rem 3rem;
      position: fixed;
      top: 0;
      width: var(--sidebar-width);
    }
    @media (min-width: 1200px) {
      :host {
        display: flex;
      }
    }
    @media (min-width: 1600px) {
      :host {
        justify-content: flex-end;
        padding-top: 7rem;
      }
    }
    [part=list] {
      line-height: 2;
      list-style: none;
      padding: 0;
    }
    .H3 {
      opacity: 0.8;
      padding-left: 1rem;
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
