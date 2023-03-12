import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'ardi-plyr',
  shadow: false,
  props: { type: [String], src: [String] },
  template() {
    if (['youtube', 'vimeo'].includes(this.type)) {
      return html`
        <div
          data-plyr-provider=${this.type}
          data-plyr-embed-id=${this.src}
        ></div>
      `
    } else if (this.type === 'video') {
      return html`<video src=${this.src}></video>`
    } else if (this.type === 'audio') {
      return html`<audio src=${this.src}></audio>`
    }
  },
  updated() {
    import('https://unpkg.com/plyr@3/dist/plyr.min.mjs').then((m) => {
      m.default.setup(this.root.querySelectorAll('div, video, audio'))
    })
  },
  css: `@import "https://unpkg.com/plyr@3/dist/plyr.css"`,
})
