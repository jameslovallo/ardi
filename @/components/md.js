import { highlightAllUnder } from 'https://cdn.skypack.dev/prismjs@1.29.0'
import { parse } from 'https://unpkg.com/marked@4.3.0/lib/marked.esm.js'
import ardi from '/@/assets/ardi-min.js'

const codeToMd = (lang, code) => `
\`\`\`${lang}
${code}
\`\`\`
`

ardi({
  tag: 'ardi-md',
  shadow: false,
  props: {
    src: [String, '/README.md'],
    theme: [
      String,
      'https://unpkg.com/prism-themes@1.9.0/themes/prism-dracula.min.css',
    ],
  },
  ready() {
    fetch(this.src)
      .then((res) => res.text())
      .then((text) => {
        const nameArray = this.src.split('.')
        const lang = nameArray[nameArray.length - 1]
        const md = lang === 'md' ? text : codeToMd(lang, text)
        this.root.innerHTML = `
					<style>@import "${this.theme}";</style>
					${parse(md)}
				`
        highlightAllUnder(this.root)
      })
  },
  propChange() {
    this.ready()
  },
})
