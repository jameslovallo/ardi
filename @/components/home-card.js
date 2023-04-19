import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'home-card',
  props: {
    alt: [String],
    heading: [String],
    src: [String],
    text: [String],
  },
  template() {
    return html`
      <img src=${this.src} alt=${this.alt} />
      <div class="text">
        <h3>${this.heading}</h3>
        <p>${this.text}</p>
      </div>
    `
  },
  css: /* css */ `
		:host {
			display: flex;
			background: var(--surface-heavy);
			border-radius: 1rem;
			flex-direction: column;
			height: 100%;
		}
		img {
			aspect-ratio: 4/3;
			display: block;
			margin: 1rem auto;
			max-width: 300px;
			object-position: center center;
			width: 100%;
		}
		h3 {
			margin: 0;
		}
		p {
			margin-inline: 0.75rem;
		}
	`,
})
