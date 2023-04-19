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
        <spa-link href="/" @click=${(e) => this.logoClick(e)}>
          <img
            src="/@/assets/ardi.svg"
            alt="Ardi Logo, a cute monkey in a spacesuit."
          />
        </spa-link>
        ${nav.map(
          (page) => html`<spa-link href=${page.href}>${page.label}</spa-link>`
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
    spa-link:first-of-type {
      margin-right: auto;
      padding: 0;
    }
    spa-link:first-of-type img {
      margin: 1rem 0;
      width: 3rem;
    }
    spa-link::part(link) {
      color: inherit;
      text-decoration: none;
    }
    spa-link::part(link):hover {
      color: var(--theme-color);
    }
  `,
})
