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
			border-radius: 1rem;
			color: inherit;
			display: block;
			justify-content: center;
			padding: 1rem;
			text-decoration: none;
			text-align: center;
			transition: .5s;
		}
		a:hover,
		a:focus {
			background: var(--theme-weak);
		}
		[part=icon] {
			background: var(--theme-weak);
			border: 1px solid var(--theme-color);
			border-radius: 50%;
			display: grid;
			height: 64px;
			margin: 0 auto 1rem;
			place-items: center;
			transition: .5s;
			width: 64px;
		}
		a:hover [part=icon],
		a:focus [part=icon] {
			background: var(--base-background-color);
		}
		svg {
			display: block;
			fill: currentcolor;
			grid-area: 1/-1;
			width: 32px;
		}
	`,
})
