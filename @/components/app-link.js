import ardi from '../assets/ardi-min.js'

ardi({
  tag: 'app-link',
  extends: [HTMLAnchorElement, 'a'],
  shadow: false,
  props: { href: [String, '/'] },
  state: () => ({ pageData: '' }),
  created() {
    this.addEventListener('mouseover', (e) => this.hover(e))
    this.addEventListener('click', (e) => {
      e.preventDefault()
      this.click()
    })
  },
  pagePath() {
    return (this.href !== '/' ? this.href : '') + '/index.html'
  },
  getPage(setPage) {
    if (!this.pageData) {
      fetch(this.pagePath())
        .then((res) => res.text())
        .then((html) => {
          this.pageData = html
            .split('<app-layout>')[1]
            .split(`</app-layout>`)[0]
          setPage && this.setPage()
        })
    }
  },
  setPage() {
    if (this.pageData) {
      appRoot.setPage(this.pageData, this.href)
      appRoot.pushHistory(this.href, this.pageData)
    } else this.getPage(true)
  },
  hover(e) {
    e.preventDefault()
    this.getPage()
  },
  click() {
    if (this.href !== location.pathname) {
      sessionStorage.removeItem('spa-reload')
      this.setPage()
    }
    if (this.href.startsWith('/demos/')) {
      window.scrollY = 0
    }
  },
})
