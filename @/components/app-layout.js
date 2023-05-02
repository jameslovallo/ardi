import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'app-layout',
  template() {
    return html`
      <app-nav></app-nav>
      <div part="wrapper">
        <main part="main">
          <app-root>
            <slot></slot>
          </app-root>
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
      :host(.home) [part=wrapper],
      :host(.ramidus) [part=wrapper] {
        padding-left: var(--sidebar-width);
      }
    }
    @media (min-width: 1600px) {
      :host(.home) [part=wrapper],
      :host(.ramidus) [part=wrapper] {
        padding-left: unset;
      }
    }
    @media (min-width: 1200px) and (max-width: 1600px) {
      :host(.home) app-footer,
      :host(.ramidus) app-footer {
        margin-left: var(--sidebar-width);
      }
    }
  `,
})
