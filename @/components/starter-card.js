import ardi, { css, html } from '../assets/ardi-min.js'

const icons = {
  tina: {
    viewbox: '0 0 49 68',
    path: 'M31.462 30.178c3.301-2.73 4.764-18.868 6.193-24.669 1.43-5.8 7.34-5.507 7.34-5.507s-1.534 2.671-.909 4.664C44.712 6.659 49 8.44 49 8.44l-.925 2.438s-1.93-.247-3.08 2.052c-1.15 2.298.739 25.058.739 25.058s-6.907 13.623-6.907 19.374c0 5.752 2.723 10.572 2.723 10.572h-3.82s-5.605-6.67-6.754-10.002c-1.15-3.333-.69-6.666-.69-6.666s-6.091-.345-11.493 0c-5.401.345-9.004 4.988-9.654 7.585-.65 2.598-.92 9.083-.92 9.083H5.2C3.361 62.26 1.9 60.227 2.693 57.362c2.194-7.935 1.763-12.436 1.255-14.44C3.44 40.917 0 39.168 0 39.168c1.685-3.433 3.405-5.083 10.803-5.255 7.398-.172 17.357-1.004 20.658-3.735z',
  },
}

ardi({
  tag: 'starter-card',
  props: {
    icon: [String, 'tina'],
  },
  template() {
    return html`
      <div part="icon-container">
        <svg viewBox=${icons[this.icon].viewbox} fill="white">
          <path d=${icons[this.icon].path}></path>
        </svg>
      </div>
      <div part="text">
        <slot name="label"></slot>
        <slot name="links"></slot>
      </div>
    `
  },
  styles: css`
    :host {
      align-items: center;
      border-radius: 1rem;
      border: 1px solid var(--border);
      display: grid;
      gap: 1.25rem;
      grid-template-columns: 64px 1fr;
      max-width: var(--demo-max-width);
      padding: 1rem;
    }
    [part='icon-container'] {
      border: 2px solid var(--theme-color);
      border-radius: 50%;
      box-sizing: border-box;
      display: grid;
      height: 64px;
      place-items: center;
      width: 64px;
    }
    svg {
      display: block;
      height: 32px;
      width: 32px;
    }
    [name='label']::slotted(h3) {
      margin: 0 !important;
    }
    [name='links'] {
      display: flex;
      gap: 1rem;
    }
    a {
      color: inherit;
      text-decoration-color: var(--theme-color);
    }
  `,
})
