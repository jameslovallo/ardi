// load all components
const components = [
  'app-footer',
  'app-layout',
  'app-nav',
  'app-sidebar',
  'ardi-label',
  'component-card',
  'element-story',
  'feature-pills',
  'home-card',
  'home-grid',
  'mark-down',
  'spa-link',
  'spa-root',
  'tmdb-trending',
]
components.forEach((c) => import(`/@/components/${c}.js`))

// fade in gracefully when components are loaded
const isDefined = components.map((c) => customElements.whenDefined(c))
await Promise.allSettled(isDefined)
document.body.style.opacity = 1
