import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'component-card',
  props: {
    href: [String],
    icon: [String],
    label: [String],
  },
  template() {
    return html`
      <spa-link href=${this.href}>
        <span part="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d=${this.icon} />
          </svg>
        </span>
        <span part="label">${this.label}</span>
      </spa-link>
    `
  },
  css: `
		spa-link {
			border: 1px solid var(--border);
			border-radius: 1rem;
			cursor: pointer;
			display: block;
			justify-content: center;
			text-align: center;
			transition: .5s;
		}
		spa-link:hover,
		spa-link:focus {
			background: var(--theme-weak);
		}
		spa-link::part(link) {
			color: white;
			display: block;
			padding: 1rem;
			text-decoration: none;
		}
		[part=icon] {
			border: 1px solid var(--theme-color);
			border-radius: 50%;
			color: white;
			display: grid;
			height: 64px;
			margin: 0 auto 1rem;
			place-items: center;
			transition: .5s;
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
