import ardi, { html, svg } from '/@/assets/ardi-min.js'

const icons = {
  email:
    'M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z',
  phone:
    'M20,15.5C18.8,15.5 17.5,15.3 16.4,14.9C16.3,14.9 16.2,14.9 16.1,14.9C15.8,14.9 15.6,15 15.4,15.2L13.2,17.4C10.4,15.9 8,13.6 6.6,10.8L8.8,8.6C9.1,8.3 9.2,7.9 9,7.6C8.7,6.5 8.5,5.2 8.5,4C8.5,3.5 8,3 7.5,3H4C3.5,3 3,3.5 3,4C3,13.4 10.6,21 20,21C20.5,21 21,20.5 21,20V16.5C21,16 20.5,15.5 20,15.5M5,5H6.5C6.6,5.9 6.8,6.8 7,7.6L5.8,8.8C5.4,7.6 5.1,6.3 5,5M19,19C17.7,18.9 16.4,18.6 15.2,18.2L16.4,17C17.2,17.2 18.1,17.4 19,17.4V19Z',
}

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
                ${icon(icons.phone)}
              </a>
            `
          : ''}
        ${this.email
          ? html`<a href=${`mailto:${this.email}`}>${icon(icons.email)}</a>`
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
