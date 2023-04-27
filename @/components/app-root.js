import ardi, { html } from '//unpkg.com/ardi'
import headJSON from '/@/head.js'

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
    Object.keys(headJSON).forEach((tagType) => {
      headJSON[tagType].forEach((el) => {
        this.createTag(document.head, tagType, el)
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
  async setPage(path, doc, init) {
    // check for native reload
    this.handleNativeReload(doc, path)
    // check if page is prebuilt
    const prebuilt = document.querySelector('meta[name=prebuilt][content=true]')
    if (init && !prebuilt) this.handleHead()
    // set page
    if (!init) appLayout.innerHTML = doc
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
  ready() {
    if (!window.ramidusInitialized) {
      window.appRoot = this
      window.appLayout = document.querySelector('app-layout')
      this.setPage(location.pathname, appLayout.innerHTML, true)
      // history stuff
      this.pushHistory(location.pathname)
      addEventListener('popstate', (e) => {
        if (e.state.path) {
          this.setPage(e.state.path, sessionStorage.getItem(e.state.path))
        }
      })
      window.ramidusInitialized = true
    }
  },
})
