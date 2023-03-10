import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'component-card',
  props: {
    href: [String],
    icon: [String],
    label: [String],
  },
  template() {
    return html`
      <a href=${this.href}>
        <span part="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d=${this.icon} />
          </svg>
        </span>
        <span part="label">${this.label}</span>
      </a>
    `
  },
  css: `
		a {
			border: 1px solid rgba(125,125,125,0.5);
			border-radius: 12px;
			color: inherit;
			display: block;
			justify-content: center;
			padding: 1rem;
			text-decoration: none;
			text-align: center;
		}
		[part=icon] {
			border: 1px solid var(--theme-color);
			border-radius: 50%;
			display: grid;
			fill: var(--base-background-color);
			height: 64px;
			margin: 0 auto 1rem;
			place-items: center;
			width: 64px;
		}
		[part=icon]:before {
			background: var(--theme-color);
			border-radius: 50%;
			content: '';
			display: block;
			grid-area: 1/-1;
			height: 64px;
			opacity: 0.1;
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
