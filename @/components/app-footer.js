import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'app-footer',
  template() {
    return html`
      <footer>
        <p>Made with <a href="https://ardi.netlify.app">Ardi</a></p>
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
    }
  `,
})
