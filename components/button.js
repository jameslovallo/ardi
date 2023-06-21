import ardi, { css } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-button',

  props: {
    href: [String],
    label: [String, 'Click here'],
    target: [String],
  },

  template() {
    const tag = this.href ? 'a' : 'button'
    return `
      <${tag}
        part="button"
        ${this.href ? `href=${this.href}` : ''}
        ${this.target ? `target=${this.target}` : ''}
      >
        <slot>${this.label}</slot>
      </${tag}>
    `
  },

  styles: css`
    :host {
      --button-border-radius: 0;
      --button-color: dodgerblue;
      --button-on-color: white;
    }
    [part='button'] {
      align-items: center;
      background: transparent;
      border: none;
      border-radius: var(--button-border-radius);
      box-sizing: border-box;
      color: var(--button-on-color);
      cursor: pointer;
      display: inline-flex;
      font-size: 14px;
      gap: 0.5rem;
      height: max-content;
      letter-spacing: 1px;
      line-height: 1;
      overflow: hidden;
      padding: 0.5rem 1rem;
      position: relative;
      text-decoration: none;
    }
    [part='button']:before {
      background: var(--button-color);
      content: '';
      display: block;
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      width: 100%;
      z-index: -1;
    }
    :host([variant='text']) [part='button'],
    :host([variant='subtle']) [part='button'],
    :host([variant='outlined']) [part='button'] {
      color: var(--button-color);
    }
    :host([variant='subtle']) [part='button'] {
      box-shadow: none;
    }
    :host([shape='circle']) [part='button'],
    :host([variant='text']) [part='button'] {
      padding: 0.5rem;
    }
    :host([variant='outlined']) [part='button']:after {
      border-radius: inherit;
      border: 2px solid var(--button-color);
      bottom: 0;
      content: '';
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
    }
    :host([variant='subtle']) [part='button']:before {
      opacity: 0.1;
    }
    :host([variant='outlined']) [part='button']:before,
    :host([variant='text']) [part='button']:before {
      opacity: 0;
    }
    [part='button']:hover:before,
    [part='button']:focus:before {
      opacity: 0.8;
    }
    [part='button']:active:before {
      opacity: 0.7;
    }
    :host([variant='text']) [part='button']:hover:before,
    :host([variant='text']) [part='button']:focus:before,
    :host([variant='subtle']) [part='button']:hover:before,
    :host([variant='subtle']) [part='button']:focus:before,
    :host([variant='outlined']) [part='button']:hover:before,
    :host([variant='outlined']) [part='button']:focus:before {
      opacity: 0.2;
    }
    :host([variant='text']) [part='button']:active:before,
    :host([variant='subtle']) [part='button']:active:before,
    :host([variant='outlined']) [part='button']:active:before {
      opacity: 0.3;
    }
    :host([shape='rounded']) [part='button'] {
      --button-border-radius: 0.5rem;
    }
    :host([shape='circle']) [part='button'],
    :host([shape='pill']) [part='button'] {
      --button-border-radius: 2rem;
    }
    ::slotted(svg) {
      display: block;
      fill: currentcolor;
      width: 1.5rem;
    }
  `,
})
