import ardi, { html } from '//unpkg.com/ardi'

ardi({
  tag: 'ardi-dialog',
  props: {
    backdrop: [String, 'rgba(0,0,0,0.25)'],
    transition: [Number, 0.33],
  },
  state: () => ({ open: false }),
  template() {
    return html`
      <slot
        name="opener"
        @click=${() => {
          this.refs.dialog.showModal()
          this.open = true
        }}
      ></slot>
      <dialog
        part="dialog"
        ref="dialog"
        class=${this.open ? 'open' : 'closed'}
        @click=${(e) => {
          const rect = e.target.getBoundingClientRect()
          var clickInside =
            rect.top <= e.clientY &&
            e.clientY <= rect.top + rect.height &&
            rect.left <= e.clientX &&
            e.clientX <= rect.left + rect.width
          if (!clickInside) this.open = false
        }}
        @transitionEnd=${(e) => {
          !this.open && e.target.close()
        }}
      >
        <slot></slot>
        <slot
          name="closer"
          @click=${() => {
            this.open = false
          }}
        ></slot>
      </dialog>
    `
  },
  css() {
    return /* css */ `
      dialog {
        transition: ${this.transition}s;
      }
      dialog::backdrop {
        background: transparent;
        cursor: pointer;
        transition: ${this.transition}s;
      }
      dialog.open::backdrop {
        background: ${this.backdrop};
      }
      slot[name=opener]::slotted(*),
      slot[name=closer]::slotted(*) {
        cursor: pointer;
      }
      /* drawer */
      :host([drawer]) dialog {
        border: 0;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        min-height: 100vh;
        left: 0;
        margin: 0;
        position: fixed;
        top: 0;
        width: 200px;
      }
      :host([drawer]) .closed {
        transform: translate3d(-100%, 0, 0);
      }
      /* modal */
      :host([modal]) dialog {
        border: 0;
        border-radius: 0.5rem;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        min-width: 300px;
        max-width: 90vw;
      }
      :host([modal]) .closed {
        opacity: 0;
        transform: translate3d(0, 25%, 0);
      }
    `
  },
})
