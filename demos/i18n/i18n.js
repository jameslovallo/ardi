import ardi, { css, html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'i18n-provider',
  state() {
    return { t: this.langs.en }
  },
  template: () => html`<slot></slot>`,
  setLang(lang) {
    this.t = this.langs[lang]
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
    const { t } = this.context('i18n')
    return html`
      <nav>
        <a>${t.home}</a>
        <a>${t.about}</a>
        <span></span>
        <a>${t.contact}</a>
      </nav>
    `
  },
  styles: css`
    nav {
      background: var(--surface-heavy);
      display: flex;
      gap: 1rem;
      padding: 0.5rem 1rem;
    }
    span {
      flex-grow: 1;
    }
  `,
})

ardi({
  tag: 'i18n-changer',
  template() {
    const i18n = this.context('i18n')
    const { t, langs } = i18n
    return html`
      <p style="margin-top: 0;">${t.changeLanguage}:</p>
      <select @change=${(e) => i18n.setLang(e.target.value)}>
        ${Object.keys(langs).map(
          (lang) => html`<option value=${lang}>${langs[lang].label}</option>`
        )}
      </select>
    `
  },
})
