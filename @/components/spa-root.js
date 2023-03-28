import ardi, { html } from '/@/assets/ardi-min.js'

ardi({
  tag: 'spa-root',
  template() {
    return html`<slot></slot>`
  },
  setHead() {
    fetch('/@/head.json')
      .then((res) => res.json())
      .then((data) => {
        Object.keys(data).forEach((tagType) => {
          data[tagType].forEach((el) => {
            this.createTag(document.head, tagType, el)
          })
        })
      })
  },
  async setPage(doc, path, init) {
    // check if page is prebuilt
    const prebuilt = document.querySelector('meta[name=prebuilt][content=true]')
    // handle head
    if (init && !prebuilt) {
      this.setHead()
    }
    // allow page to request native loading
    if (doc.includes('<!-- spa-reload -->')) {
      if (!sessionStorage.getItem('spa-reload')) {
        sessionStorage.setItem('spa-reload', true)
        location = path
        return
      }
    } else sessionStorage.removeItem('spa-reload')
    // handle markdown
    if (
      (init && document.body.lang === 'md') ||
      doc.trim().startsWith('<!-- md -->')
    ) {
      this.handleMD(doc)
    } else document.body.innerHTML = doc
    !init && document.body.removeAttribute('lang')
    // handle page title
    this.handleTitle(doc)
    // handle scripts
    document.querySelectorAll('script').forEach((tag) => {
      if (tag.src !== '/@/main.js') {
        const newTag = document.createElement('script')
        newTag.src = tag.src
        newTag.type = tag.type
        newTag.textContent = tag.textContent
        tag.replaceWith(newTag)
      }
    })
    // highlight code blocks
    if (doc.includes('```') || doc.includes('language-')) this.highlight()
  },
  handleTitle(doc) {
    let mdH1 = doc.match(/# .+/)
    if (mdH1) mdH1 = mdH1[0].replace('# ', '')
    let htmlH1 = doc.match(/<h1.+<\/h1>/)
    if (htmlH1) htmlH1 = htmlH1[0].replace(/<h1.*?>/, '').replace('</h1>', '')
    let htmlTitle = doc.match(/<title>.+<\/title>/)
    if (htmlTitle)
      htmlTitle = [0].replace('<title>', '').replace('</title>', '')
    document.title = htmlTitle || htmlH1 || mdH1
  },
  async handleMD(doc) {
    const marked = await import('//unpkg.com/marked@4.2.12/lib/marked.esm.js')
    let unescape = await import('https://cdn.skypack.dev/unescape@1.0.1')
    unescape = unescape.default
    document.body.innerHTML = marked.parse(unescape(doc), {
      gfm: true,
    })
    this.highlight()
  },
  highlight() {
    import('//cdn.skypack.dev/prismjs').then((prism) => {
      prism.highlightAllUnder(document.body)
    })
    if (!this.prismCssLoaded) {
      this.createTag(document.head, 'link', {
        rel: 'stylesheet',
        href: '/@/css/prism.css',
      })
      this.prismCssLoaded = true
    }
  },
  createTag(target, type, attrs) {
    const tag = document.createElement(type)
    Object.keys(attrs).forEach((key) => {
      tag[key] = attrs[key]
    })
    target.appendChild(tag)
  },
  pushHistory(href, data) {
    history.pushState(
      { path: href.replace('index.html', '') },
      undefined,
      href.replace('index.html', '')
    )
    if (!sessionStorage[href]) sessionStorage[href] = data
  },
  ready() {
    if (!window.ramidusInitialized) {
      window.appSlot = this
      this.setPage(document.body.innerHTML, location.pathname, true)
      // history stuff
      const firstPageIsMD = document.body.lang === 'md'
      this.pushHistory(
        location.pathname,
        (firstPageIsMD ? '<!-- md -->' : '') + document.body.innerHTML
      )
      firstPageIsMD && document.body.removeAttribute('lang')
      addEventListener('popstate', (e) => {
        if (e.state.path) {
          this.setPage(sessionStorage.getItem(e.state.path), e.state.path)
        }
      })
      window.ramidusInitialized = true
    }
  },
})
