import ardi, { html } from '/@/assets/ardi-min.js'

const nav = [
  { href: '/', label: 'Home' },
  { href: '/demos', label: 'Demos' },
]

ardi({
  tag: 'app-nav',
  template() {
    return html`
      <nav>
        <spa-link href="/">
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
      box-shadow: 0 0 3px rgba(0,0,0,0.25);
      display: flex;
      gap: 1rem;
      padding: 0 1rem;
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
      align-items: center;
      color: inherit;
      display: flex;
      height: 100%;
      text-decoration: none;
    }
  `,
})
