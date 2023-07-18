import ardi, { css, html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-dialog',

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

  styles: css`
    :host {
      --transition: 0.33s;
    }
    dialog {
      transition: var(--transition);
    }
    dialog::backdrop {
      background: transparent;
      cursor: pointer;
      transition: var(--transition);
    }
    dialog.open::backdrop {
      background: rgba(0, 0, 0, 0.25);
    }
    slot[name='opener']::slotted(*),
    slot[name='closer']::slotted(*) {
      cursor: pointer;
    }
    /* drawer */
    :host([drawer]) dialog {
      border: 0;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
      height: 100%;
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
  `,
})
