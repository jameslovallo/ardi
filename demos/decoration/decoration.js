import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-decoration',

  props: {
    background: [String, '#5E35B1'],
    color: [String, 'white'],
    href: [String, null],
    label: [String, null],
    target: [String, null],
    type: [String, 'ribbon'],
  },

  template() {
    const el = this.href
      ? html`
          <a part=${this.type} href=${this.href} target=${this.target}>
            <span part="label">${this.label}</span>
          </a>
        `
      : html`
          <div part=${this.type}>
            <span part="label">${this.label}</span>
          </div>
        `
    return html`
      <slot></slot>
      ${el}
    `
  },

  css() {
    return /* css */ `
      :host {
        display: block;
        position: relative;
      }
      [part=badge],
      [part=ribbon] {
        color: ${this.color};
        font-size: 12px;
        letter-spacing: 1px;
        text-decoration: none;
        text-transform: uppercase;
      }
      [part=badge] {
        align-items: center;
        background: ${this.background};
        border-radius: 12px;
        display: flex;
        height: 24px;
        justify-content: center;
        min-width: 24px;
        position: absolute;
        right: -6px;
        top: -6px;
      }
      [part=badge] [part=label] {
        margin: 0 6px;
      }
      [part=ribbon] {
        color: ${this.color};
        position: absolute;
        right: -8px;
        top: 12px;
      }
      [part=ribbon]:before {
        background: ${this.background};
        clip-path: polygon(0 0, 0% 100%, 100% 0);
        content: '';
        filter: brightness(0.66);
        height: 8px;
        position: absolute;
        right: 0;
        top: 100%;
        width: 8px;
      }
      [part=ribbon] [part=label] {
        background: ${this.background};
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 8px 50%);
        display: block;
        height: 100%;
        padding: 7px 8px 7px 16px;
      }
    `
  },
})
