import ardi, { css, html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-form',

  props: {
    recipient: [String],
    subject: [String],
    next: [String],
    'recaptcha-key': [String],
  },

  required() {
    this.root.querySelectorAll('[required]').forEach((el) => {
      const required = document.createElement('span')
      required.part = 'required'
      el.parentElement.insertBefore(required, el)
    })
  },

  textareas() {
    const textAreas = this.root.querySelectorAll('textarea')
    import(
      'https://unpkg.com/textarea-autosize/dist/textarea-autosize.js'
    ).then((m) => {
      textAreas.forEach((ta) => {
        new m.TextareaAutoSize(ta)
      })
    })
  },

  mask() {
    const maskedInputs = this.root.querySelectorAll('[data-mask]')
    maskedInputs.forEach((el) => {
      const { mask, regex = '\\d+', replace = '#' } = el.dataset
      el.pattern = `.{${mask.length},}`
      const exp = new RegExp(regex, 'g')
      el.addEventListener('input', (e) => {
        if (!e.inputType?.includes('deleteContent')) {
          let output = mask
          const match = e.target.value.match(exp)?.join('')
          if (match) {
            const valArr = match.split('')
            valArr.forEach((char) => {
              output = output.replace(replace, char)
            })
            e.target.value = output.split(replace)[0]
          }
        }
      })
    })
  },

  created() {
    if (this['recaptcha-key']) {
      const rc = document.createElement('script')
      rc.src =
        'https://www.google.com/recaptcha/api.js?render=' +
        this['recaptcha-key']
      this.root.appendChild(rc)
    }
  },

  ready() {
    this.refs.fields.innerHTML += this.innerHTML
    this.required()
    this.textareas()
    this.mask()
  },

  submitForm(e) {
    e.preventDefault()
    grecaptcha.ready(() => {
      grecaptcha.execute(this['recaptcha-key']).then((token) => {
        token && this.refs.submit.click()
      })
    })
  },

  template() {
    return html`
      <form
        part="form"
        action=${`https://formsubmit.co/${this.recipient}`}
        method="post"
      >
        <div ref="fields" part="fields">
          <if-else if=${this.subject}>
            <input type="hidden" name="_subject" value=${this.subject} />
          </if-else>
          <if-else if=${this.next}>
            <input type="hidden" name="_next" value=${this.next} />
          </if-else>
          <if-else if=${this['recaptcha-key']}>
            <input type="hidden" name="_captcha" value="false" />
          </if-else>
        </div>
        <input ref="submit" type="submit" />
        <button part="submit" @click=${(e) => this.submitForm(e)}>
          <slot name="submit">Submit</slot>
        </button>
      </form>
    `
  },

  styles: css`
    :host {
      --accent: dodgerblue;
      --invalid: #d32f2f;
      --invalid-icon: '✱';
      --valid: #388e3c;
      --valid-icon: '✔';
      display: block;
    }
    form {
      display: grid;
      gap: 1.5rem;
      margin: 0;
    }
    [ref='fields'] {
      display: grid;
      font-family: sans-serif;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--gap, 1rem);
    }
    label {
      --symbol: var(--invalid-icon);
      --validation: var(--invalid);
      color: var(--label-color, var(--accent));
      font-size: var(--label-size, 14px);
      gap: var(--label-gap, 0.5rem);
    }
    [part='required'] {
      display: inline-block;
      font-size: 0.66rem;
      position: relative;
      top: -0.2rem;
    }
    [part='required']:before {
      color: var(--validation);
      content: var(--symbol);
    }
    input,
    select,
    textarea {
      border: 1px solid var(--input-border, rgba(125, 125, 125, 0.75));
      box-sizing: border-box;
      display: block;
      font-size: 1rem;
      margin-top: 0.5rem;
      padding: 0.5rem;
      resize: none;
      width: 100%;
    }
    textarea {
      box-sizing: border-box;
      font: inherit;
      min-height: 4rem;
    }
    input:focus,
    select:focus,
    textarea:focus {
      border-color: var(--input-outline, var(--accent));
      box-shadow: inset 0 0 0 1px var(--input-outline, var(--accent));
      outline: none;
    }
    label:has([required]:valid) {
      --validation: var(--valid);
      --symbol: var(--valid-icon);
    }
    .wide {
      grid-column: 1 / span 2;
    }
    [type='submit'] {
      display: none;
    }
    [part='submit'] {
      background: var(--button-background, var(--accent));
      border: none;
      color: var(--button-color, white);
      cursor: pointer;
      padding: 0.5rem 1rem;
      width: min-content;
    }
  `,
})
