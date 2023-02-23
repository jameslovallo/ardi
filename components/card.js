import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'home-card',
  props: {
    src: [String],
    alt: [String],
    heading: [String],
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
			border: 1px solid var(--heading-h2-border-color);
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
