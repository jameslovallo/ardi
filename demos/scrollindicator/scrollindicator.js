import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'ardi-scroll-indicator',
  props: {
    background: [String, '#888'],
    foreground: [String, 'black'],
    height: [(v) => (v && isNaN(v) ? v : (v || 5) + 'px')],
    position: [String, 'fixed'],
  },
  state: () => ({ scrollPercent: 0 }),
  template() {
    return html`
      <div part="background">
        <div part="foreground" style=${`width: ${this.scrollPercent}`}></div>
      </div>
    `
  },
  css() {
    return /* css */ `
      :host {
        display: block;
        left: 0;
        position: ${this.position};
        top: 0;
        width: 100%;
        z-index: 99999;
      }
      [part=background] {
        background: ${this.background};
        height: ${this.height};
      }
      [part=foreground] {
        background: ${this.foreground};
        height: ${this.height};
      }
    `
  },
  setScrollPercent() {
    const numerator =
      this.parentElement.scrollTop + this.parentElement.offsetHeight
    const denominator = this.parentElement.scrollHeight
    console.log(numerator, denominator)
    this.scrollPercent = (numerator / denominator) * 100 + '%'
  },
  ready() {
    this.setScrollPercent()
    this.parentElement.addEventListener('resize', () => this.setScrollPercent())
    this.parentElement.addEventListener('scroll', () => this.setScrollPercent())
  },
})
