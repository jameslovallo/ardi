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
    document.body.innerHTML = doc
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
  },
  handleTitle(doc) {
    let htmlH1 = doc.match(/<h1.+<\/h1>/)
    if (htmlH1) htmlH1 = htmlH1[0].replace(/<h1.*?>/, '').replace('</h1>', '')
    let htmlTitle = doc.match(/<title>.+<\/title>/)
    if (htmlTitle)
      htmlTitle = [0].replace('<title>', '').replace('</title>', '')
    document.title = htmlTitle || htmlH1
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
      this.pushHistory(location.pathname, document.body.innerHTML)
      addEventListener('popstate', (e) => {
        if (e.state.path) {
          this.setPage(sessionStorage.getItem(e.state.path), e.state.path)
        }
      })
      window.ramidusInitialized = true
    }
  },
})
