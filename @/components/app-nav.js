import ardi, { html } from '../assets/ardi-min.js'

const nav = [
  { href: '/demos', label: 'Demos' },
  { href: '/ramidus', label: 'Ramidus' },
]

ardi({
  tag: 'app-nav',
  template() {
    return html`
      <nav>
        <app-link>
          <a href="/">
            <img
              src="/@/assets/ardi.svg"
              alt="Ardi Logo, a cute monkey in a spacesuit."
            />
          </a>
        </app-link>
        ${nav.map(
          (page) =>
            html`
              <app-link>
                <a href=${page.href}>${page.label}</a>
              </app-link>
            `
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
    app-link:first-of-type {
      margin-right: auto;
    }
    a:first-of-type img {
      height: auto;
      margin: 1rem 0;
      width: 3rem;
    }
  `,
})
