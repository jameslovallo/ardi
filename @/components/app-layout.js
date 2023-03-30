import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-layout',
  extends: [HTMLBodyElement, 'body'],
  template() {
    return html`
      <app-nav></app-nav>
      <div part="wrapper">
        <main>
          <spa-root>
            <slot></slot>
          </spa-root>
        </main>
      </div>
      <app-footer></app-footer>
    `
  },
  css: /* css */ `
    main {
      margin: 0 auto;
      max-width: 85ch;
      padding: 0 1rem 4rem;
    }
  `,
})
