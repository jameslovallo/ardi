import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-footer',
  template() {
    return html`
      <footer>
        <p>This SPA was made with Ardi components.</p>
      </footer>
    `
  },
  css: /* css */ `
    :host {
      background: var(--surface);
      display: block;
      left: 0;
      padding: 1rem 1rem;
      position: sticky;
      text-align: center;
      top: 100vh;
      z-index: 999;
    }
    @media (min-width: 1200px) and (max-width: 1600px) {
      :host {
        margin-left: var(--sidebar-width);
      }
    }
  `,
})
