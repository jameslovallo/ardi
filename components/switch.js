import ardi, { css, html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-switch',
  props: { checked: [Boolean, false] },
  template() {
    return html`
      <input
        type="checkbox"
        part="switch"
        value=${this.checked ? 'on' : 'off'}
        checked=${this.checked ? '' : null}
        @change=${(e) => {
          this.checked = e.target.checked
          this.dispatchEvent(new Event('change'))
        }}
      />
    `
  },
  styles: css`
    :host {
      --background: rgba(125, 125, 125, 0.5);
      --background-checked: dodgerblue;
      --foreground: white;
      --foreground-checked: white;
      --padding: 6.25%;
      --width: 100%;
      display: inline-block;
      width: 4rem;
    }
    input {
      appearance: none;
      background: var(--background);
      border-radius: 100vw;
      box-sizing: border-box;
      cursor: pointer;
      margin: 0;
      transition: background 0.25s;
      width: 100%;
    }
    input:before {
      aspect-ratio: 1;
      background: var(--foreground);
      border-radius: 50%;
      content: '';
      display: block;
      margin: var(--padding);
      transition: margin-left 0.25s;
      width: 37.5%;
    }
    input:hover {
      background: var(--background-hover, var(--background));
    }
    input:hover:before {
      background: var(--foreground-hover, var(--foreground));
    }
    input:active {
      background: var(--background-active, var(--background));
    }
    input:active:before {
      background: var(--foreground-active, var(--foreground));
    }
    input:checked {
      background: var(--background-checked, var(--background));
    }
    input:checked:before {
      background: var(--foreground-checked, var(--foreground));
      margin-left: calc(var(--width) / 2 + var(--padding));
    }
    input:checked:hover {
      background: var(--background-checked-hover, var(--background-checked));
    }
    input:checked:hover:before {
      background: var(--foreground-checked-hover, var(--foreground-checked));
    }
    input:checked:active {
      background: var(--background-checked-active, var(--background-checked));
    }
    input:checked:active:before {
      background: var(--foreground-checked-active, var(--foreground-checked));
    }
  `,
})
