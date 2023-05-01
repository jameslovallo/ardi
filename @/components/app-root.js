import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'app-root',
  template() {
    return html`<slot></slot>`
  },
  createTag(target, type, attrs) {
    const tag = document.createElement(type)
    Object.keys(attrs).forEach((key) => {
      tag[key] = attrs[key]
    })
    target.appendChild(tag)
  },
  handleHead() {
    import(location.origin + '/@/head.js').then((m) => {
      const headJSON = m.default
      Object.keys(headJSON).forEach((tagType) => {
        headJSON[tagType].forEach((el) => {
          this.createTag(document.head, tagType, el)
        })
      })
    })
  },
  handleNativeReload(doc, path) {
    if (doc.includes('<!-- spa-reload -->')) {
      if (!sessionStorage.getItem('spa-reload')) {
        sessionStorage.setItem('spa-reload', true)
        location = path
        return
      }
    } else sessionStorage.removeItem('spa-reload')
  },
  handleClassList(path) {
    const pathArray = path.split('/')
    const pageClass = pathArray[1] || 'home'
    const pageLevel = 'level-' + pathArray.filter((i) => i.length).length
    appLayout.classList = `${pageClass} ${pageLevel}`
  },
  handleScripts() {
    appLayout.querySelectorAll('script').forEach((tag) => {
      const newTag = document.createElement('script')
      newTag.src = tag.src
      newTag.type = tag.type
      newTag.innerHTML = tag.innerHTML
      tag.replaceWith(newTag)
    })
  },
  async setPage(options) {
    const { path, doc, init = false, scrollTop = true } = options
    // check for native reload
    this.handleNativeReload(doc, path)
    // check if page is prebuilt
    const prebuilt = document.querySelector('meta[name=prebuilt][content=true]')
    if (init) {
      // handle sessionStorage for first page loaded
      let path
      if (location.pathname === '/') {
        path = '/'
      } else if (location.pathname.endsWith('/')) {
        path = location.pathname.slice(0, -1)
      } else path = location.pathname
      sessionStorage.setItem(path, doc)
      // update head in dev
      if (!prebuilt) this.handleHead()
    } else {
      appLayout.innerHTML = doc
      scrollTop && window.scrollTo({ top: 0, behavior: 'instant' })
    }
    document.title = document.querySelector('h1').innerText
    this.handleClassList(path)
    this.handleScripts()
  },
  pushHistory(path) {
    history.pushState(
      { path: path.replace('index.html', '') },
      undefined,
      path.replace('index.html', '')
    )
  },
  created() {
    if (!window.ramidusInitialized) {
      window.appRoot = this
      window.appLayout = document.querySelector('app-layout')
      this.setPage({
        path: location.pathname,
        doc: appLayout.innerHTML,
        init: true,
      })
      // history stuff
      this.pushHistory(location.pathname)
      addEventListener('popstate', (e) => {
        if (e.state.path) {
          this.setPage([
            {
              path: e.state.path,
              doc: sessionStorage.getItem(e.state.path),
              scrollTop: false,
            },
          ])
        }
      })
      window.ramidusInitialized = true
    }
  },
})
