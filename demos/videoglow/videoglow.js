import ardi, { css, html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'video-glow',

  props: { src: [String] },

  template() {
    return html`
      <video inert src=${this.src} ref="glow" muted></video>
      <video
        src=${this.src}
        @pause=${() => this.refs.glow.pause()}
        @play=${() => this.refs.glow.play()}
        controls
      ></video>
    `
  },

  styles: css`
    :host {
      display: block;
      position: relative;
    }
    video {
      border-radius: var(--border-radius, 0.5rem);
      cursor: pointer;
      display: block;
      height: auto;
      width: 100%;
    }
    video:first-of-type {
      filter: blur(var(--blur, 2rem)) saturate(var(--saturation, 2));
      position: absolute;
      z-index: -1;
    }
  `,
})
