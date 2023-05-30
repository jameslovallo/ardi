import ardi, { css, html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-wizard',

  state: () => ({
    current: '',
    next: '',
    prev: '',
    prompt: '',
  }),

  created() {
    const children = [...this.children].filter((el) => !el.hasAttribute('slot'))
    children.forEach((el, i) => {
      if (i !== 0) el.style.display = 'none'
      el.style.transition = '0.5s'
    })
    const first = children[0]
    this.current = first.id
    Object.assign(this, first.dataset)
  },

  nextUp(id, direction) {
    const current = this.querySelector('#' + this.current)
    const nextUp = this.querySelector('#' + id)
    nextUp.style.transform = `translateX(calc(100% * ${direction}))`
    nextUp.style.removeProperty('display')
    requestAnimationFrame(() => {
      current.style.transform = `translateX(calc(100% * ${direction * -1}))`
      nextUp.style.transform = 'translateX(0)'
      setTimeout(() => {
        current.style.display = 'none'
      }, 500)
    })
    this.current = id
    const { prompt, prev, next } = nextUp.dataset
    this.prompt = prompt
    this.prev = prev
    this.next = next
  },

  icon(icon) {
    const icons = {
      prompt:
        'M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z',
      prev: 'M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z',
      next: 'M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z',
    }
    return html`
			<svg viewbox="0 0 24 24"><path d=${icons[icon]}></svg>
		`
  },

  template() {
    return html`
      <slot part="content"></slot>
      <nav part="nav">
        <if-else if=${this.prompt}>
          <slot name="prompt-icon">${this.icon('prompt')}</slot>
          <div part="prompt">${this.prompt}</div>
        </if-else>
        <button
          part="prev"
          disabled=${this.prev ? null : ''}
          @click=${() => this.nextUp(this.prev, -1)}
        >
          <slot name="prev-icon">${this.icon('prev')}</slot>
        </button>
        <button
          part="next"
          disabled=${this.next ? null : ''}
          @click=${() => this.nextUp(this.next, 1)}
        >
          <slot name="next-icon">${this.icon('next')}</slot>
        </button>
      </nav>
    `
  },

  styles: css`
    :host {
      border: 1px solid var(--border-color, currentcolor);
      display: flex;
      flex-direction: column;
    }
    [part='content'] {
      display: block;
      flex-grow: 1;
      overflow: hidden;
      position: relative;
    }
    [part='content']::slotted(*) {
      box-sizing: border-box;
      height: 100%;
      position: absolute;
      width: 100%;
    }
    [part='nav'] {
      align-items: center;
      border-top: 1px solid var(--border-color, currentcolor);
      display: flex;
      gap: 0.5rem;
      justify-content: flex-end;
      padding: 0.5rem;
    }
    [part='nav'] button {
      background: transparent;
      border: none;
      padding: 0;
    }
    [part='nav'] button:not(:disabled) {
      cursor: pointer;
    }
    [part='nav'] svg {
      display: block;
      fill: currentcolor;
      width: 1.5rem;
    }
    [part='prompt'] {
      flex-grow: 1;
    }
  `,
})

ardi({
  tag: 'ardi-wizard-link',

  props: {
    to: [String],
    direction: [Number, 1],
  },

  template: () => '<slot></slot>',

  created() {
    const wizard = this.context('wizard')
    this.addEventListener('click', (e) => {
      e.preventDefault()
      wizard.nextUp(this.to, this.direction)
    })
  },
})
