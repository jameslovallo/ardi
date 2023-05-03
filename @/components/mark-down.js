import { parse } from 'https://cdn.jsdelivr.net/npm/marked/+esm'
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
          ${parse(md)}
        `
        if (hasCodeBlocks) {
          import('https://unpkg.com/prismjs@1.29.0/prism.js').then((m) => {
            m.default.highlightAllUnder(this)
          })
        }
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
