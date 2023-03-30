import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'i18n-provider',
  state() {
    return { i18n: this.langs.en }
  },
  template: () => html`<slot></slot>`,
  setLang(lang) {
    this.i18n = this.langs[lang]
  },
  langs: {
    en: {
      label: 'English',
      home: 'Home',
      about: 'About',
      contact: 'Contact Us',
      changeLanguage: 'Change the Language',
    },
    es: {
      label: 'Español',
      home: 'Inicio',
      about: 'Acerca',
      contact: 'Contáctanos',
      changeLanguage: 'Cambia el Idioma',
    },
  },
})

ardi({
  tag: 'i18n-consumer',
  template() {
    const { i18n } = this.context('i18n')
    return html`
      <nav>
        <a>${i18n.home}</a>
        <a>${i18n.about}</a>
        <span></span>
        <a>${i18n.contact}</a>
      </nav>
    `
  },
  css: /* css */ `
    nav {
      background: var(--surface-heavy);
      display: flex;
      gap: 1rem;
      padding: .5rem 1rem;
    }
    span {
      flex-grow: 1;
    }
  `,
})

ardi({
  tag: 'i18n-changer',
  template() {
    const t = this.context('i18n')
    const { i18n, langs } = t
    return html`
      <p style="margin-top: 0;">${i18n.changeLanguage}:</p>
      <select @change=${(e) => t.setLang(e.target.value)}>
        ${Object.keys(langs).map(
          (lang) => html`<option value=${lang}>${langs[lang].label}</option>`
        )}
      </select>
    `
  },
})
