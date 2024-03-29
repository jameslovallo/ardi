import ardi, { css, html } from '../assets/ardi-min.js'

ardi({
  tag: 'component-card',
  props: {
    href: [String],
    icon: [String],
    label: [String],
  },
  template() {
    return html`
      <app-link>
        <a href=${this.href}>
          <span part="icon">
            <svg viewBox="0 0 24 24">
              <path d=${this.icon} />
            </svg>
          </span>
          <span part="label">${this.label}</span>
        </a>
      </app-link>
    `
  },
  styles: css`
    a {
      border-radius: 1rem;
      border: 1px solid var(--border);
      color: white;
      cursor: pointer;
      display: block;
      display: block;
      justify-content: center;
      padding: 1rem;
      text-align: center;
      text-decoration: none;
      transition: background 0.5s;
    }
    a:hover,
    a:focus {
      background: var(--theme-weak);
    }
    [part='icon'] {
      border: 2px solid var(--theme-color);
      border-radius: 50%;
      color: white;
      display: grid;
      height: 64px;
      margin: 0 auto 1rem;
      place-items: center;
      width: 64px;
    }
    svg {
      display: block;
      fill: currentcolor;
      grid-area: 1/-1;
      width: 32px;
    }
  `,
})
