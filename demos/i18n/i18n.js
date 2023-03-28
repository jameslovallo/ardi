import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'ardi-i18n-provider',
  state() {
    return { i18n: this.langs.en }
  },
  template: () => html`<slot></slot>`,
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
  tag: 'ardi-i18n-text',
  template() {
    const { i18n } = this.context('i18n')
    return html`<p>${i18n.demoText}.</p>`
  },
})

ardi({
  tag: 'ardi-i18n-change',
  template() {
    const provider = this.context('i18n')
    const { i18n, langs } = provider
    return html`
      <p>${i18n.changeLanguage}:</p>
      <select @change=${(e) => (provider.i18n = langs[e.target.value])}>
        ${Object.keys(langs).map(
          (lang) => html`<option value=${lang}>${langs[lang].label}</option>`
        )}
      </select>
    `
  },
})
