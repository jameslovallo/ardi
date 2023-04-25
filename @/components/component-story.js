import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'component-story',
  props: { breakpoint: [Number, 600], tag: [String] },
  state: () => ({ args: {} }),
  template() {
    return html`
      <div part="wrapper">
        <slot></slot>
      </div>
      <aside>${this.controls()}</aside>
    `
  },
  controls() {
    const controls = Object.keys(this.args).map((arg) => {
      const { type } = this.args[arg]
      const wrapper = (control) => html`
        <div class="control">
          <label>${arg}</label>
          ${control}
        </div>
      `
      let control
      switch (type) {
        case 'text':
          control = html`
            <div
              class="grow-wrap"
              data-replicated-value=${this.el.getAttribute(arg)}
            >
              <textarea
                name="text"
                rows="1"
                @input=${(e) => {
                  e.target.parentNode.dataset.replicatedValue = e.target.value
                  this.el.setAttribute(arg, e.target.value)
                }}
              >
								${this.el.getAttribute(arg)}
							</textarea
              >
            </div>
          `
          return wrapper(control)
        case 'color':
          control = html`
            <input
              type="color"
              value=${this.el.getAttribute(arg)}
              @input=${(e) => {
                this.el.setAttribute(arg, e.target.value)
              }}
            />
          `
          return wrapper(control)
        case 'number':
          control = html`
            <input
              type="number"
              value=${this.el.getAttribute(arg)}
              @input=${(e) => {
                this.el.setAttribute(arg, e.target.value)
              }}
            />
          `
          return wrapper(control)
        case 'boolean':
          control = html`
            <input
              type="checkbox"
              checked=${this.el.getAttribute(arg) === 'true' ? true : null}
              @input=${(e) => {
                this.el.setAttribute(arg, e.target.checked)
              }}
            />
          `
          return wrapper(control)
        case 'list':
          const options = this.args[arg].options
          const selected = this.el.getAttribute(arg)
          control = html`
            <select
              @change=${(e) => {
                this.el.setAttribute(arg, e.target.value)
              }}
            >
              ${options.map(
                (option) =>
                  html`
                    <option selected=${option === selected ? true : null}>
                      ${option}
                    </option>
                  `
              )}
            </select>
          `
          return wrapper(control)
      }
    })
    return controls
  },
  created() {
    this.el = this.querySelector(this.tag)
    this.args = JSON.parse(this.querySelector('script').innerText)
    const setSize = () => {
      if (this.offsetWidth < this.breakpoint) {
        this.setAttribute('class', 'small')
      } else this.removeAttribute('class')
    }
    setSize()
    new ResizeObserver(() => requestAnimationFrame(setSize)).observe(this)
  },
  css: /* css */ `
		:host {
			border: 1px solid var(--border);
			border-radius: 8px;
			display: grid;
			overflow: hidden;
			grid-template-columns: 1fr 200px;
		}
		[part=wrapper] {
			border-right: 1px solid var(--border);
			box-sizing: border-box;
			display: grid;
			min-height: 3rem;
			padding: 1rem;
			place-items: center;
			position: relative;
		}
		:host(.small) {
			grid-template-columns: unset;
		}
		:host(.small) [part=wrapper] {
			border-bottom: 1px solid var(--border);
			border-right: 0;
		}
		aside {
			font-family: sans-serif;
		}
		aside .control {
			border-bottom: 1px solid var(--border);
			display: grid;
			font-size: .75rem;
			gap: .25rem;
			padding: .5rem;
		}
		aside .control:last-of-type {
			border-bottom: 0;
		}
		aside .control label {
			opacity: 0.66;
		}
		aside .control input:not([type=checkbox]),
		aside .control .grow-wrap,
		aside .control textarea,
		aside .control select {
			appearance: none;
			background: transparent;
			border: 0;
			font-size: 14px;
			margin: 0;
			padding: 0;
			resize: none;
			width: 100%;
		}
		aside .control input:focus-visible,
		aside .control textarea:focus-visible,
		aside .control select:focus-visible {
			outline: none;
		}
		aside .control input[type=color] {
			width: 2rem;
		}
		aside .control input[type=color]::-webkit-color-swatch {
			border: 1px solid var(--border);
			border-radius: 1rem;
			margin: 0;
			padding: 0;
		}
		/* textarea junk */
		.grow-wrap {
		  display: grid;
		}
		.grow-wrap::after {
			content: attr(data-replicated-value) " ";
			visibility: hidden;
			white-space: pre-wrap;
		}
		.grow-wrap > textarea {
			overflow: hidden;
			resize: none;
		}
		.grow-wrap > textarea,
		.grow-wrap::after {
			border: 1px solid black;
			font: inherit;
			grid-area: 1 / 1 / 2 / 2;
			word-break: break-word;
		}
		/* checkbox junk */
		input[type=checkbox] {
			align-items: center;
			appearance: none;
			background-color: var(--border);
			border: 1px solid var(--border);
			border-radius: 2rem;
			box-sizing: content-box;
			cursor: pointer;
			height: 1rem;
			margin: 1px;
			overflow: hidden;
			position: relative;
			width: 2rem;
		}
		input[type=checkbox]:after {
			aspect-ratio: 1/1;
			background: white;
			border-radius: 2rem;
			box-sizing: border-box;
			content: '';
			display: block;
			height: 100%;
			left: 0;
			position: relative;
			transition: .5s;
		}
		input[type=checkbox]:checked:after {
			left: 50%;
		}
	`,
})
