import ardi from '../assets/ardi-min.js'

ardi({
  tag: 'app-link',
  extends: [HTMLAnchorElement, 'a'],
  shadow: false,
  props: { href: [(v) => (v.startsWith('/') ? v : new URL(v).pathname), '/'] },
  state: () => ({ doc: '' }),
  created() {
    this.addEventListener('mouseover', (e) => this.hover(e))
    this.addEventListener('click', (e) => this.click(e))
  },
  hover(e) {
    e.preventDefault()
    const href = this.href.split('#')[0]
    if (Object.keys(sessionStorage).includes(href)) {
      this.doc = sessionStorage[this.href]
    } else {
      fetch((href !== '/' ? href : '') + '/index.html')
        .then((res) => res.text())
        .then((page) => {
          this.doc = page.split('<app-layout>')[1].split('</app-layout>')[0]
          sessionStorage.setItem(this.href, this.doc)
        })
    }
  },
  click(e) {
    e.preventDefault()
    if (this.href !== location.pathname) {
      appRoot.setPage(this.href, this.doc)
      appRoot.pushHistory(this.href)
    }
  },
})
