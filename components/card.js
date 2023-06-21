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
      border: var(--border, 1px solid rgba(125, 125, 125, 0.5));
      display: block;
      overflow: hidden;
    }
    [name='media']::slotted(img),
    [name='media']::slotted(video) {
      display: block;
      width: 100%;
    }
    [part='title'] {
      font-weight: bold;
    }
    [part='subtitle'] {
      font-size: 14px;
    }
    [part='title'],
    [part='subtitle'],
    slot:not([name])::slotted(*) {
      line-height: 1;
      margin: 1rem;
    }
    [name='actions'] {
      align-items: center;
      display: flex;
      margin-top: 0.5rem;
      padding: 0.5rem;
      padding-top: 0;
    }
  `,
})
