import ardi, { html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-scroll-indicator',

  state: () => ({ scrollPercent: 0 }),

  template() {
    return html`
      <div part="background">
        <div part="foreground" style=${`width: ${this.scrollPercent}`}></div>
      </div>
    `
  },

  styles() {
    return /* css */ `
      :host {
        display: block;
        left: 0;
        top: 0;
        width: 100%;
        z-index: 99999;
      }
      [part=background] {
        background: var(--background, transparent);
        height: var(--height, .25rem);
      }
      [part=foreground] {
        background: var(--foreground, dodgerblue);
        height: 100%;
      }
    `
  },

  setScrollPercent() {
    const numerator = this.parentElement.scrollTop
    const denominator =
      this.parentElement.scrollHeight - this.parentElement.offsetHeight
    this.scrollPercent = (numerator / denominator) * 100 + '%'
  },

  created() {
    this.parentElement.addEventListener('resize', () => this.setScrollPercent())
    this.parentElement.addEventListener('scroll', () => this.setScrollPercent())
  },
})
