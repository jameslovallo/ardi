import ardi, { css, html } from '../../@/assets/ardi-min.js'

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
      --bg: rgba(125, 125, 125, 0.5);
      --bg-checked: dodgerblue;
      --fg: white;
      --fg-checked: white;
      --padding: 6.25%;
      --width: 100%;
      display: inline-block;
      width: 4rem;
    }
    input {
      appearance: none;
      background: var(--bg);
      border-radius: 100vw;
      box-sizing: border-box;
      cursor: pointer;
      margin: 0;
      transition: background 0.25s;
      width: 100%;
    }
    input:before {
      aspect-ratio: 1;
      background: var(--fg);
      border-radius: 50%;
      content: '';
      display: block;
      margin: var(--padding);
      transition: margin-left 0.25s;
      width: 37.5%;
    }
    input:hover {
      background: var(--bg-hover, var(--bg));
    }
    input:hover:before {
      background: var(--fg-hover, var(--fg));
    }
    input:active {
      background: var(--bg-active, var(--bg));
    }
    input:active:before {
      background: var(--fg-active, var(--fg));
    }
    input:checked {
      background: var(--bg-checked, var(--bg));
    }
    input:checked:before {
      background: var(--fg-checked, var(--fg));
      margin-left: calc(var(--width) / 2 + var(--padding));
    }
    input:checked:hover {
      background: var(--bg-checked-hover, var(--bg-checked));
    }
    input:checked:hover:before {
      background: var(--fg-checked-hover, var(--fg-checked));
    }
    input:checked:active {
      background: var(--bg-checked-active, var(--bg-checked));
    }
    input:checked:active:before {
      background: var(--fg-checked-active, var(--fg-checked));
    }
  `,
})
