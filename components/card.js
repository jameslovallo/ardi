import ardi, { css, html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-card',

  props: {
    title: [String],
    subtitle: [String],
  },

  template() {
    return html`
      <slot name="media" ref="media"></slot>
      <slot name="on-media"></slot>
      <if-else if=${this.title}>
        <p part="title">${this.title}</p>
      </if-else>
      <if-else if=${this.subtitle}>
        <p part="subtitle">${this.subtitle}</p>
      </if-else>
      <slot></slot>
      <slot name="actions"></slot>
    `
  },

  styles: css`
    :host {
      border: 1px solid rgba(125, 125, 125, 0.5);
      border-radius: 0.5rem;
      display: block;
      overflow: hidden;
    }
    [name='media']::slotted(img),
    [name='media']::slotted(video) {
      display: block;
      width: 100%;
    }
    [name='on-media'] {
      align-items: center;
      display: flex;
      height: 0;
      justify-content: flex-end;
      padding: 0 1.5rem;
      position: relative;
      z-index: 1;
    }
    [part='title'] {
      font-size: 1.17rem;
      font-weight: bold;
    }
    [part='subtitle'] {
      font-size: 14px;
      opacity: 0.8;
    }
    [part='title'],
    [part='subtitle'],
    slot:not([name])::slotted(*) {
      line-height: 1;
      margin: 1.5rem;
    }
    [name='actions'] {
      align-items: center;
      display: flex;
      margin-top: 0.75rem;
      padding: 0.75rem;
      padding-top: 0;
    }
  `,
})
