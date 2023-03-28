import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-layout',
  extends: [HTMLBodyElement, 'body'],
  template() {
    return html`
      <style>
        main {
          margin: 0 auto;
          max-width: 85ch;
          padding: 0 1rem 4rem;
        }
      </style>
      <app-nav></app-nav>
      <main>
        <spa-root>
          <slot></slot>
        </spa-root>
      </main>
      <app-footer></app-footer>
    `
  },
})
