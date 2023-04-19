import { highlightAllUnder } from 'https://cdn.skypack.dev/prismjs@1.29.0'
import { parse } from 'https://unpkg.com/marked@4.3.0/lib/marked.esm.js'
import ardi from '../assets/ardi-min.js'

const codeToMd = (lang, code) => `
\`\`\`${lang}
${code}
\`\`\`
`

ardi({
  tag: 'mark-down',
  shadow: false,
  props: {
    src: [String, '/README.md'],
    theme: [
      String,
      'https://unpkg.com/prism-themes@1.9.0/themes/prism-dracula.min.css',
    ],
  },
  getMarkdown() {
    fetch(this.src)
      .then((res) => res.text())
      .then((text) => {
        const nameArray = this.src.split('.')
        const lang = nameArray[nameArray.length - 1]
        let md = lang === 'md' ? text : codeToMd(lang, text)
        const split = `<!-- ${'split'} -->`
        if (md.includes(split)) md = md.split(split)[1]
        const hasCodeBlocks = md.includes('```')
        this.root.innerHTML = `
          ${hasCodeBlocks ? `<style>@import "${this.theme}";</style>` : ''}
          ${parse(md)}
        `
        hasCodeBlocks && highlightAllUnder(this.root)
        setTimeout(() => {
          if (location.hash) {
            const hashEl = document.querySelector(location.hash)
            if (hashEl) hashEl.scrollIntoView()
          }
        }, 500)
      })
  },
  created() {
    this.getMarkdown()
  },
  changed(prop) {
    if (prop.name === 'src' && prop.old && prop.old !== prop.new) {
      this.getMarkdown()
    }
  },
})
