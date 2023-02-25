import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'ardi-youtube',
  props: { vid: [String] },
  state: { loaded: false },

  template() {
    return !this.loaded
      ? html`
          <button
            aria-label="Play Video"
            @click=${() => (this.loaded = true)}
            part="button"
            style=${`background-image: url(https://img.youtube.com/vi/${this.vid}/hqdefault.jpg)`}
          >
            <svg part="icon" version="1.1" viewBox="0 0 68 48">
              <path
                part="icon-bg"
                d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              ></path>
              <path part="icon-fg" d="M 45,24 27,14 27,34"></path>
            </svg>
          </button>
        `
      : html`
          <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            frameborder="0"
            src=${`https://www.youtube.com/embed/${this.vid}?autoplay=1`}
            title="YouTube video player"
          ></iframe>
        `
  },

  css: /* css */ `
    :host,
    button,
    iframe {
      aspect-ratio: 16/9;
      background-color: black;
      display: block;
    }
    button {
      background-position: center center;
      background-size: cover;
    }
    button,
    iframe {
      height: 100%;
      width: 100%;
    }
    [part='button'] {
      align-items: center;
      border: none;
      cursor: pointer;
      display: flex;
      justify-content: center;
      padding: 0;
    }
    [part='icon'] {
      display: block;
      width: 68px;
    }
    [part='icon-bg'] {
      fill: var(--button-bg, rgba(33, 33, 33, 0.8));
    }
    [part='icon-fg'] {
      fill: var(--button-fg, #fff);
    }
    [part='button']:hover [part='icon-bg'] {
      fill: var(--button-bg-hover, red);
    }
  `,
})
