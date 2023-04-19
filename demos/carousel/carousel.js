import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-carousel',
  props: {
    activeindicator: [String],
    buttons: [Boolean, true],
    indicators: [Boolean, true],
    indicator: [String],
  },
  scroll(d) {
    // prettier-ignore
    const { refs: {track}, children } = this
    if (d === -1 && track.scrollLeft === 0) {
      track.scrollLeft = track.scrollWidth
    } else if (
      d === 1 &&
      track.scrollLeft + track.offsetWidth + 5 > track.scrollWidth
    ) {
      track.scrollLeft = 0
    } else {
      track.scrollLeft += d * children[0].offsetWidth
    }
  },
  handleintersected() {
    ;[...this.children]
      .filter((child) => !child.hasAttribute('slot'))
      .map((slide, i) => {
        new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                slide.removeAttribute('inert')
                this.refs.indicators?.children[i].classList.add('active')
              } else {
                slide.setAttribute('inert', '')
                this.refs.indicators?.children[i].classList.remove('active')
              }
            }),
          {
            root: this.refs.track,
            rootMargin: '0px',
            threshold: 0.5,
          }
        ).observe(slide)
      })
  },
  created() {
    this.handleintersected()
  },
  template() {
    const buttons = html`
      <button part="prev" @click=${() => this.scroll(-1)}>
        <slot name="prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
            />
          </svg>
        </slot>
      </button>
      <button part="next" @click=${() => this.scroll(1)}>
        <slot name="next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
            />
          </svg>
        </slot>
      </button>
    `
    const indicators = html`
      <div part="indicators" ref="indicators">
        ${[...this.children]
          .filter((child) => !child.hasAttribute('slot'))
          .map((slide, i) => {
            return html`
              <button
                part="indicator"
                @click=${() => {
                  this.refs.track.scrollTo({
                    left: slide.offsetLeft,
                  })
                }}
              >
                ${this.indicator
                  ? html`
                      <span ref="indicator">${this.indicator}</span>
                      <span ref="activeIndicator">
                        ${this.activeindicator}
                      </span>
                    `
                  : i + 1}
              </button>
            `
          })}
      </div>
    `
    return html`
      <slot part="track" ref="track"></slot>
      <div part="controls">
        ${this.buttons ? buttons : ''} ${this.indicators ? indicators : ''}
      </div>
    `
  },
  css: /* css */ `
    :host {
      display: block;
      position: relative;
    }
    slot:not([name])::slotted(*) {
      display: block;
      min-width: var(--slide-width, 100%);
      scroll-snap-align: start;
      scroll-snap-stop: always;
      width: var(--slide-width, 100%);
    }
    [ref=track] {
      display: flex;
      overflow-x: scroll;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
    }
    [ref=track]::-webkit-scrollbar {
      display: none;
    }
    [part=controls] {
      align-items: center;
      display: flex;
    }
    [part=prev],
    [part=next] {
      align-items: center;
      background: var(--button-background, rgba(0,0,0,0.66));
      border-color: var(--button-border-color, transparent);
      border-radius: var(--button-border-radius, 50%);
      border-width: var(--button-border-width, 0);
      color: var(--button-color, white);
      cursor: pointer;
      display: flex;
      font-size: var(--button-font-size, 1em);
      height: var(--button-size, 2em);
      justify-content: center;
      padding: 0;
      position: var(--button-position, absolute);
      text-shadow: var(--button-text-shadow, none);
      width: var(--button-size, 2em);
      top: calc(50% - 1rem);
    }
    slot[name=prev] svg,
    slot[name=next] svg,
    slot[name=prev]::slotted(svg),
    slot[name=next]::slotted(svg) {
      display: block;
      fill: var(--button-color, white);
      height: var(--button-font-size, 24px);
      width: var(--button-font-size, 24px);
    }
    [part=prev] {
      left: 1rem;
      order: 0;
    }
    [part=next] {
      order: 2;
      right: 1rem;
    }
    [part=indicators] {
      bottom: .5rem;
      display: flex;
      gap: var(--indicator-gap, 0);
      justify-content: center;
      left: 0;
      order: 1;
      position: var(--indicator-position, absolute);
      width: 100%;
    }
    [part=indicator] {
      background: var(--indicator-background, transparent);
      border-color: var(--indicator-border-color, transparent);
      border-radius: var(--indicator-border-radius, 0);
      border-width: var(--indicator-border-width, 0);
      cursor: pointer;
      font-size: var(--indicator-font-size, 1em);
      height: var(--indicator-size, 1.5em);
      padding: 0;
      text-align: center;
      text-shadow: var(--indicator-text-shadow, 1px 1px 1px black);
      width: var(--indicator-size, 1.5em);
    }
    [part=indicator] {
      color: var(--indicator-color, white);
    }
    [part=indicator].active {
      color: var(--active-indicator-color, white);
    }
    [part=indicator]:not(.active) [ref=activeIndicator] {
      display: none;
    }
    [part=indicator].active [ref=indicator] {
      display: none;
    }
  `,
})
