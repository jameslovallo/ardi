import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-accordion',
  props: {
    indicator: [String],
    open: [Boolean, false],
    summary: [String],
  },
  template() {
    return html`
      <details part="details" ref="details">
        <summary
          part="summary"
          ref="summary"
          @click=${(e) => {
            e.preventDefault()
            !this.refs.details.open ? this.expand() : this.collapse()
          }}
        >
          <slot name="summary">${this.summary}</slot>
          <slot
            class=${this.open ? 'active' : null}
            name="indicator"
            part="indicator"
          >
            ${this.indicator || html` <i part="marker"></i> `}
          </slot>
        </summary>
        <slot
          part="content"
          ref="content"
          @transitionEnd=${() => {
            if (!this.open) this.refs.details.open = null
          }}
        ></slot>
      </details>
    `
  },
  expand() {
    this.open = true
    this.refs.details.open = true
    this.refs.content.style.maxHeight =
      this.refs.content.assignedElements()[0].offsetHeight + 'px'
    if (this.parentElement.tagName === 'ARDI-ACCORDION-GROUP') {
      this.parentElement.closeOpen(this.index)
    }
  },
  collapse() {
    this.open = false
    this.refs.content.style.maxHeight = 0
  },
  ready() {
    if (this.open) {
      this.refs.details.open = true
      const getContentHeight = () => {
        const height = this.refs.content.assignedElements()[0].offsetHeight
        if (height > 0) {
          this.refs.content.style.maxHeight = height + 'px'
        } else setTimeout(getContentHeight, 500)
      }
      getContentHeight()
    }
  },
  css() {
    return /* css */ `
      :host {
        --padding: .5rem;
      }
      :host(.border-collapse:not(:first-child)) details {
        border-top: 0;
      }
      details {
        border: 1px solid var(--border);
        box-sizing: border-box;
      }
      summary {
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        list-style-type: none;
        overflow: hidden;
        padding: var(--padding);
        text-overflow: ellipsis;
        user-select: none;
        white-space: nowrap;
      }
      summary::-webkit-details-marker {
        display: none;
      }
      [part=indicator] {
        display: inline-block;
        transition: .5s;
      }
      [part=indicator].active {
        transform: rotate(180deg);
      }
      [part=marker] {
        background: currentcolor;
        clip-path: polygon(0 0, 50% 100%, 100% 0);
        display: block;
        height: .25rem;
        width: .5rem;
      }
      [part=content] {
        box-sizing: border-box;
        display: block;
        max-height: 0;
        overflow: hidden;
        padding: 0 var(--padding);
        transition: 0.5s;
      }
      [part=content]::slotted(*) {
        overflow: auto;
      }
      [part=content]::slotted(img),
      [part=content]::slotted(video) {
        display: block;
        margin: 0 calc(-1 * var(--padding));
        width: calc(100% + var(--padding) * 2);
      }
    `
  },
})
