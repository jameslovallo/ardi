import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-compare',
  props: { percent: [Number, 50] },
  template() {
    return html`
      <slot></slot>
      <input
        type="range"
        value=${this.percent}
        name="vol"
        min="0"
        max="100"
        @input=${(e) => {
          this.percent = e.target.value
        }}
      />
      <button aria-hidden="true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8,14V18L2,12L8,6V10H16V6L22,12L16,18V14H8Z" />
        </svg>
      </button>
    `
  },
  css() {
    return /* css */ `
      :host {
        display: block;
        position: relative;
      }
      ::slotted(img) {
				border-radius: var(--border-radius, .5rem);
        display: block;
      }
      ::slotted(*:last-of-type) {
        clip-path: polygon(
          ${this.percent}% 0,
          100% 0,
          100% 100%,
          ${this.percent}% 100%
        );
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%
      }
      input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
				border-radius: var(--border-radius, .5rem);
        cursor: pointer;
        height: 100%;
        left: 0;
        margin: 0;
				overflow: hidden;
        position: absolute;
        top: 0;
        width: 100%;
      }
      input[type="range"]:focus {
        outline: none;
      }
      input[type="range"]::-webkit-slider-runnable-track {
        background-color: transparent;
        height: 100%;  
      }
      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        background-color: white;
        cursor: ew-resize;
        height: 100%;
        width: .5rem;
      }
      input[type="range"]::-moz-range-track {
        background-color: transparent;
        height: 100%;
      }
      input[type="range"]::-moz-range-thumb {
        background-color: white;
        border: none;
        border-radius: 0;
        cursor: ew-resize;
        height: 100%;
        width: .5rem;
      }
      button {
        background: white;
        border: 0;
        border-radius: 2rem;
        box-shadow: 0 0 5px black;
        height: 2rem;
        left: calc(((100% - 8px) * ${this.percent}) / 100 - 12px);
        pointer-events: none;
        position: absolute;
        top: calc(50% - 1rem);
        width: 2rem;
      }
    `
  },
})
