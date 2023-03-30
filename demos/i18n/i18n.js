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
      changeLanguage: 'Change the Language',
      demoText: 'This is a demo of the Context API',
      label: 'English',
    },
    es: {
      changeLanguage: 'Cambia el Idioma',
      demoText: 'Esta es una demostración de la API de Contexto',
      label: 'Español',
    },
  },
})

ardi({
  tag: 'i18n-consumer',
  template() {
    const { i18n } = this.context('i18n')
    return html`<p style="margin: 0;">${i18n.demoText}.</p>`
  },
})

ardi({
  tag: 'i18n-changer',
  template() {
    const provider = this.context('i18n')
    const { i18n, langs } = provider
    return html`
      <p style="margin-top: 0;">${i18n.changeLanguage}:</p>
      <select @change=${(e) => provider.setLang(e.target.value)}>
        ${Object.keys(langs).map(
          (lang) => html`<option value=${lang}>${langs[lang].label}</option>`
        )}
      </select>
    `
  },
})
