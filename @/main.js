// load all components
const components = [
  'app-footer',
  'app-layout',
  'app-link',
  'app-nav',
  'app-root',
  'app-sidebar',
  'component-label',
  'component-card',
  'component-story',
  'component-pills',
  'element-story',
  'home-card',
  'home-grid',
  'mark-down',
]
components.forEach((c) => import(`/@/components/${c}.js`))

// fade in gracefully when components are loaded
const isDefined = components.map((c) => customElements.whenDefined(c))
await Promise.allSettled(isDefined)
document.body.style.opacity = 1
