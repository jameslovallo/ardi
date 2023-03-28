import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'ardi-gauge',

  props: {
    label: [String],
    max: [Number, 120],
    min: [Number, 0],
    step: [Number, 10],
    value: [Number, 90],
  },

  state() {
    return { rotation: this.deg(this.min) }
  },

  deg(percentage) {
    return Math.round(240 * percentage) - 120
  },

  numbers() {
    let numbers = []
    for (let i = this.min; i <= this.max; i += this.step) {
      numbers.push({ deg: this.deg(i / this.max), label: i })
    }
    return numbers
  },

  intersect(ratio) {
    if (ratio > 0.3) {
      this.rotation = this.deg(this.value / this.max)
    }
  },

  template() {
    return html`
      ${this.numbers().map(
        (num) =>
          html`
            <div part="number" style=${`--rotation: ${num.deg}deg`}>
              <i>${num.label}</i>
            </div>
          `
      )}
      <div part="dial" style=${`transform: rotate(${this.rotation}deg)`}></div>
      <slot name="label" part="label">${this.label}</slot>
    `
  },

  css: /* css */ `
    :host {
      align-items: center;
      background: var(--background, #000);
      border: 2px solid rgba(125, 125, 125, 0.5);
      border-radius: 50%;
      color: var(--color, #fff);
      display: flex;
      height: 300px;
      justify-content: center;
      overflow: hidden;
      position: relative;
      width: 300px;
    }
    [part='dial'] {
      background: var(--dial, #222);
      border-radius: 50%;
      height: 10%;
      position: relative;
      transform: rotate(-120deg);
      transition: transform var(--dial-speed, 1s);
      width: 10%;
    }
    [part='dial']:before {
      background: var(--needle, #e53935);
      bottom: 99%;
      content: '';
      display: block;
      height: 310%;
      left: calc(50% - 1px);
      position: absolute;
      width: 2px;
    }
    [part='number'] {
      height: 100%;
      left: calc(50% - 1.5em);
      pointer-events: none;
      position: absolute;
      top: 0;
      transform: rotate(var(--rotation));
      width: 3em;
    }
    [part='number'] i {
      align-items: center;
      display: flex;
      font-style: normal;
      height: 3em;
      justify-content: center;
      transform: rotate(calc(-1 * var(--rotation)));
      width: 3em;
    }
    [part='label'] {
      align-items: center;
      background: var(--title-background, #222);
      border-radius: 50%;
      bottom: 0;
      color: var(--title-color, #fff);
      display: flex;
      height: 20%;
      justify-content: center;
      margin: 0;
      position: absolute;
      width: 100%;
    }
  `,
})
