import {
  mdiEmailOutline,
  mdiPhoneOutline,
} from 'https://cdn.skypack.dev/@mdi/js'
import ardi, { html, svg } from '/ardi-min.js'

ardi({
  tag: 'ardi-employee',

  props: {
    email: [String],
    name: [String],
    phone: [String],
    photo: [String],
    position: [String],
  },

  phoneClick(e) {
    e.preventDefault()
    const message = `Are you sure you want to call ${
      this.name.split(' ')[0]
    }? Did you already try Slack or email?`
    let confirmed = confirm(message)
    if (confirmed) location = e.target.href
  },

  template() {
    const icon = (path) => svg`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d=${path} />
      </svg>
    `
    return html`
      ${this.photo ? html`<img part="photo" src=${this.photo} />` : ''}
      <div part="details">
        ${this.name ? html`<b>${this.name}</b>` : ''}
        ${this.position ? html`<small>${this.position}</small>` : ''}
      </div>
      <div part="contact">
        ${this.phone
          ? html`
              <a
                @click=${(e) => this.phoneClick(e)}
                href=${`tel:${this.phone?.match(/[0-9]+/g).join('')}`}
              >
                ${icon(mdiPhoneOutline)}
              </a>
            `
          : ''}
        ${this.email
          ? html`<a href=${`mailto:${this.email}`}>${icon(mdiEmailOutline)}</a>`
          : ''}
      </div>
    `
  },

  css: /* css */ `
    :host {
      display: flex;
      align-items: center;
      border: 1px solid rgba(125, 125, 125, 0.5);
      border-radius: 0.75rem;
      gap: .75rem;
      overflow: hidden;
    }
    [part='photo'] {
      aspect-ratio: 1/1;
      display: block;
      height: 64px;
      margin-left: .5rem;
      object-fit: contain;
      object-position: center bottom;
      width: 64px;
    }
    [part='details'] {
      display: grid;
      flex-grow: 1;
    }
    [part='contact'] {
      align-items: center;
      display: flex;
      gap: 0.75rem;
      padding-right: 0.75rem;
    }
    [part='contact'] a {
      display: block;
      height: 20px;
      text-decoration: none;
    }
    [part='contact'] svg {
      fill: #00acc1;
      display: block;
      width: 20px;
    }  
  `,
})
