import ardi, { html } from '/@/assets/ardi-min.js'

const sharedStyles = /* css */ `
  fieldset {
    border: 1px solid var(--border);
    border-radius: 8px;
    display: grid;
    gap: 1rem;
    padding: 1rem;
  }
  fieldset * {
    margin: 0;
    width: max-content
  }
`

ardi({
  tag: 'i18n-provider',
  state() {
    return { i18n: this.langs.en }
  },
  template: () =>
    html`
      <fieldset>
        <legend>&lt;i18n-provider&gt;</legend>
        <slot></slot>
      </fieldset>
    `,
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
  css: sharedStyles,
})

ardi({
  tag: 'i18n-text',
  template() {
    const { i18n } = this.context('i18n')
    return html`
      <fieldset>
        <legend>&lt;i18n-text&gt;</legend>
        <p>${i18n.demoText}.</p>
      </fieldset>
    `
  },
  css: sharedStyles,
})

ardi({
  tag: 'i18n-change',
  template() {
    const provider = this.context('i18n')
    const { i18n, langs } = provider
    return html`
      <fieldset>
        <legend>&lt;i18n-change&gt;</legend>
        <p>${i18n.changeLanguage}:</p>
        <select @change=${(e) => provider.setLang(e.target.value)}>
          ${Object.keys(langs).map(
            (lang) => html`<option value=${lang}>${langs[lang].label}</option>`
          )}
        </select>
      </fieldset>
    `
  },
  css: sharedStyles,
})
