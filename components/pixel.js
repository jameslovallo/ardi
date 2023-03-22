import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'ardi-pixel',
  state: () => ({
    hour: 0,
    minute: 0,
    minuteRotation: 0,
    secondRotation: 0,
  }),
  ready() {
    let date = new Date()
    this.hour = date.getHours() % 12 || 12
    this.minute = date.getMinutes()
    this.minuteRotation = this.minute * 6
    const second = date.getSeconds()
    this.secondRotation = second * 6 + 6
    setInterval(() => {
      date = new Date()
      this.hour = date.getHours() % 12 || 12
      this.minute = date.getMinutes()
      this.minuteRotation += 0.1
      this.secondRotation += 6
    }, 1000)
  },
  formatNumber: (n) => (n < 10 ? `0${n}` : n),
  ticks() {
    return Array(30)
      .fill(null)
      .map((t, i) => {
        const rotation = (360 / 60) * i
        return html`
          <div part="tick" style=${`transform: rotate(${rotation}deg)`} />
        `
      })
  },
  numbers(number) {
    const numbers = []
    for (let i = 0; i <= 55; i += 5) {
      numbers.push(i)
    }
    return numbers.reverse().map((n, i) => {
      const rotation = (360 / 12) * i + 120
      return html`
        <div part="number" style=${`--rotate: ${rotation}deg`}>
          <span style=${`--rotate: ${rotation * -1 - number}deg`}>
            ${this.formatNumber(n)}
          </span>
        </div>
      `
    })
  },
  template() {
    return html`
      <div part="hour">${this.formatNumber(this.hour)}</div>
      <div
        part="minutes"
        style=${`transform: rotate(${this.minuteRotation}deg)`}
      >
        ${this.ticks()}${this.numbers(this.minuteRotation)}
      </div>
      <div
        part="seconds"
        style=${`transform: rotate(${this.secondRotation}deg)`}
      >
        ${this.ticks()}${this.numbers(this.secondRotation)}
      </div>
      <div part="minute-container">
        <span>${this.formatNumber(this.minute)}</span>
      </div>
    `
  },
  css() {
    return /* css */ `
      :host {
        --accent: #64B5F6;
        --size: 300px;
        aspect-ratio: 1;
        background: black;
        border: 1px solid rgba(125,125,125,0.5);
        border-radius: 50%;
        box-sizing: border-box;
        color: white;
        display: grid;
        font-family: system-ui;
        overflow: hidden;
        padding: .5%;
        place-items: center;
        position: relative;
        width: var(--size);
      }
      :host > * {
        box-sizing: border-box;
        grid-area: 1/-1;
      }
      [part=hour] {
        font-size: calc(var(--size)/4);
        font-weight: bold;
      }
      [part=seconds] {
        color: var(--accent);
        height: 100%;
        position: relative;
        transition: 1s linear;
        width: 100%;
      }
      [part=minutes] {
        height: 77%;
        opacity: 0.5;
        position: relative;
        transition: 1s linear;
        width: 77%;
      }
      [part=tick] {
        --length: 2%;
        background: linear-gradient(
          to bottom,
          white var(--length),
          transparent var(--length),
          transparent calc(100% - var(--length)),
          white calc(100% - var(--length))
        );
        height: 100%;
        left: calc(50% - 1px);
        position: absolute;
        top: 0;
        width: 2px;
      }
      [part=tick]:nth-child(5n + 1) {
        --length: 3%;
        left: calc(50% - 1.5px);
        width: 3px;
      }
      [part=seconds] [part=tick] {
        opacity: 0.75;
      }
      [part=number] {
        box-sizing: border-box;
        font-size: calc(var(--size)/20);
        height: 50%;
        left: 45%;
        padding-top: calc(var(--size)/40);;
        position: absolute;
        text-align: center;
        transform: rotate(var(--rotate));
        transform-origin: bottom center;
        width: 10%;
      }
      [part=number] span {
        display: block;
        transform: rotate(var(--rotate));
        transition: 1s linear;
      }
      [part=minute-container] {
        --height: calc(var(--size)/6);
        align-items: center;
        border: 2px solid var(--accent);
        border-right: none;
        border-bottom-left-radius: var(--height);
        border-top-left-radius: var(--height);
        display: flex;
        font-size: calc(var(--size)/10);
        font-weight: bold;
        height: var(--height);
        overflow: hidden;
        padding-left: 2%;
        position: absolute;
        right: 0;
        top: calc(50% - var(--height) / 2);
        width: 33%;
      }
      [part=minute-container]:before {
        background: black;
        border-bottom-right-radius: 50%;
        border-top-right-radius: 50%;
        content: '';
        display: block;
        height: 300%;
        left: 0;
        position: absolute;
        width: 48%;
      }
      [part=minute-container] span {
        z-index: 1;
      }
    `
  },
})
