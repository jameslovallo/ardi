import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'component-label',
  props: { tag: [String] },
  template() {
    return html`
      <div part="label">
        <span part="label-text">${this.tag}</span>
      </div>
      <slot></slot>
    `
  },
  css: /* css */ `
		:host {
			display: grid;
			margin-top: 1rem
		}
		[part=label] {
			display: flex;
			height: 1rem;
		}
		[part=label]:before {
			content: '';
			border-left: 1px solid var(--border);
			border-top: 1px solid var(--border);
			border-top-left-radius: var(--border-radius, 8px);
			display: block;
			height: 1rem;
			width: .5rem;
		}
		[part=label]:after {
			content: '';
			border-right: 1px solid var(--border);
			border-top: 1px solid var(--border);
			border-top-right-radius: var(--border-radius, 8px);
			flex-grow: 1;
		}
		[part=label-text] {
			font-size: .8rem;
			line-height: 1;
			padding: 0 .25rem;
			position: relative;
			top: -.4rem;
		}
		[part=label-text]:before {
			content: '<'
		}
		[part=label-text]:after {
			content: '>'
		}
		slot {
			border: 1px solid var(--border);
			border-bottom-left-radius: var(--border-radius, 8px);
			border-bottom-right-radius: var(--border-radius, 8px);
			border-top: none;
			display: block;
			overflow: auto;
			padding: 0 .75rem .75rem;
		}
	`,
})
