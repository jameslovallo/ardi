import ardi, { html } from '//unpkg.com/ardi'

ardi({
  component: 'ardi-fullpage',

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
      <style>
        ${this.css()}
      </style>
    `
  },

  touch: () => navigator.maxTouchPoints > 0,

  wheel() {
    if (!this.touch()) {
      this.addEventListener(
        'wheel',
        this.debounce((e) => {
          e.preventDefault()
          if (e.deltaY > 0) {
            this.scrollTop += this.offsetHeight
          } else {
            this.scrollTop -= this.offsetHeight
          }
        })
      )
    }
  },

  handleIntersect() {
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
        bottom: 0;
        left: 0;
        overflow-y: ${this.touch() ? 'auto' : 'hidden'};
        padding: 0;
        position: fixed;
        right: 0;
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
        top: 0;
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

  ready() {
    this.wheel()
    this.handleIntersect()
  },
})
