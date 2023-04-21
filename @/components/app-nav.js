import ardi, { html } from '../assets/ardi-min.js'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
]

ardi({
  tag: 'app-nav',
  logoClick(e) {
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0 })
    }
  },
  template() {
    return html`
      <nav>
        <a is="app-link" href="/" @click=${(e) => this.logoClick(e)}>
          <img
            src="/@/assets/ardi.svg"
            alt="Ardi Logo, a cute monkey in a spacesuit."
          />
        </a>
        ${nav.map(
          (page) => html`<a is="app-link" href=${page.href}>${page.label}</a>`
        )}
      </nav>
    `
  },
  css: /* css */ `
    nav {
      align-items: center;
      display: flex;
      gap: 1rem;
      padding: 0 1rem;
      position: relative;
      z-index: 999;
    }
    @media (min-width: 1200px) {
      nav {
        position: sticky;
        top: 0;
      }
    }
    a {
      color: inherit;
      display: inline-block;
      text-decoration: none;
    }
    a:hover {
      color: var(--theme-color);
    }
    a:first-of-type {
      margin-right: auto;
    }
    a:first-of-type img {
      height: auto;
      margin: 1rem 0;
      width: 3rem;
    }
  `,
})
