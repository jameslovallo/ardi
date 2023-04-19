import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-fullpage',

  props: {
    activeindicator: [String],
    activeindicatorstyle: [String, 'transform: scale(1.75)'],
    alignment: [String, 'center'], // left center right
    indicator: [String, '●'],
    indicatorcolor: [String, 'currentcolor'],
  },

  state: () => ({ active: 0 }),

  template() {
    return html`
      <slot></slot>
      <div part="indicators">
        ${[...this.children].map(
          (el, i) => html`
            <button
              part="indicator"
              class=${i === this.active ? 'active' : null}
              aria-label=${`Scroll to section ${i + 1}`}
              @click=${() => el.scrollIntoView()}
            >
              <span>
                ${i === this.active
                  ? this.activeindicator || this.indicator
                  : this.indicator}
              </span>
            </button>
          `
        )}
      </div>
    `
  },

  touch: () => navigator.maxTouchPoints > 0,

  throttle(cb, delay) {
    let wait = false
    return (...args) => {
      if (wait) return
      cb(...args)
      wait = true
      setTimeout(() => {
        wait = false
      }, delay)
    }
  },

  wheel() {
    this.addEventListener('scroll', (e) => e.preventDefault())
    this.addEventListener('wheel', (e) => {
      e.preventDefault()
      const direction = e.deltaY > 0 ? 1 : -1
      if (!this.scrolling) {
        this.scrolling = true
        setTimeout(() => (this.scrolling = false), 1500)
        this.children[this.active + direction].scrollIntoView()
      }
    })
  },

  handleintersected() {
    ;[...this.children].map((el, i) => {
      new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.active = i
            }
          }),
        {
          root: this,
          rootMargin: '0px',
          threshold: 0.5,
        }
      ).observe(el)
    })
  },

  flexAlign() {
    switch (this.alignment) {
      case 'left':
        return 'flex-start'
      case 'right':
        return 'flex-end'
      default:
        return 'center'
    }
  },

  css() {
    return /* css */ `
      :host {
        height: 100%;
        left: 0;
        overflow: ${this.touch() ? 'scroll' : 'hidden'};
        overscroll-behavior: contain;
        padding: 0;
        position: fixed;
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
        scrollbar-width: none;
        top: 0;
        width: 100%;
      }
      :host::-webkit-scrollbar {
        display: none;
      }
      slot::slotted(*) {
        align-items: ${this.flexAlign()};
        display: flex;
        flex-direction: column;
        height: 100%;
        margin: 0;
        scroll-snap-align: start;
        scroll-snap-stop: always;
        justify-content: center;
        text-align: ${this.alignment};
      }
      [part=indicators] {
        bottom: 0;
        display: flex;
        flex-direction: column;
        gap: .25rem;
        justify-content: center;
        position: fixed;
        right: .25rem;
        top: 0;
        z-index: 1;
      }
      [part=indicator] {
        background: transparent;
        border: 0;
        color: ${this.indicatorcolor};
      }
      [part=indicator] span {
        transition: .5s;
      }
      [part=indicator].active span {
        display: block;
        ${this.activeindicatorstyle}
      }
    `
  },

  created() {
    !this.touch() && this.wheel()
    this.handleintersected()
  },
})
