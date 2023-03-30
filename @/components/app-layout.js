import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-layout',
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
    app-nav, main {
      margin: 0 auto;
      max-width: 85ch;
    }
    main {
      padding: 0 1rem 4rem;
    }
    @media (min-width: 1200px) {
      :host(.home) main {
        left: calc(var(--sidebar-width) / 2);
        position: relative;
      }
    }
    @media (min-width: 1600px) {
      :host(.home) main {
        left: unset;
        position: static;
      }
    }
  `,
})
