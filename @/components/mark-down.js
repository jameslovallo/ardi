import { parse } from 'https://cdn.jsdelivr.net/npm/marked/+esm'
import ardi from '../assets/ardi-min.js'
import hljs from '/@/lib/hljs/core.min.js'
import css from '/@/lib/hljs/css.min.js'
import js from '/@/lib/hljs/javascript.min.js'
import xml from '/@/lib/hljs/xml.min.js'
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', js)
hljs.registerLanguage('xml', xml)

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
  async getMarkdown() {
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
          this.querySelectorAll('pre code').forEach((el) => {
            hljs.highlightElement(el)
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
  ready() {
    this.getMarkdown()
  },
  changed(prop) {
    if (prop.name === 'src' && prop.old && prop.old !== prop.new) {
      this.getMarkdown()
    }
  },
})
