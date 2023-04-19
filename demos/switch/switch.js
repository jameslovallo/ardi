import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-switch',
  props: {
    checked: [Boolean, false],
  },
  template() {
    return html`
      <input
        type="checkbox"
        checked=${this.checked ? true : null}
        @input=${(e) => {
          this.checked = e.target.checked
        }}
      />
    `
  },
  css() {
    return /* css */ `
      input {
        --switch-height: 2rem;
        --switch-width: 4rem;
        appearance: none;
        background: var(--switch-bg, transparent);
        border: var(--switch-border-width, 1px) solid var(--switch-border-color, rgba(125,125,125,0.5));
        border-radius: var(--switch-height);
        box-sizing: border-box;
        cursor: pointer;
        height: var(--switch-height);
        overflow: hidden;
        position: relative;
        width: var(--switch-width);
      }
      input:before {
        aspect-ratio: 2/1;
        background: var(--switch-bg-checked, green);
        content: '';
        display: block;
        height: 100%;
        left: -75%;
        position: absolute;
        top: 0;
        transition: left .5s;
        width: 100%;
      }
      input:checked:before {
        left: -25%;
      }
      input:after {
        aspect-ratio: 1;
        background: var(--switch-color, currentcolor);
        border-radius: 1rem;
        content: '';
        display: block;
        position: relative;
        transition: transform .5s;
        width: calc(var(--switch-height) - calc(2 * var(--switch-border-width, 1px)));
      }
      input:checked:after {
        background: var(--switch-color-checked, currentcolor);
        transform: translateX(calc(100% + calc(2 * var(--switch-border-width, 1px))));
      }
    `
  },
})
