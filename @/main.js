// load all components
const components = [
  'app-footer',
  'app-layout',
  'app-link',
  'app-nav',
  'app-root',
  'app-sidebar',
  'component-card',
  'component-label',
  'component-pills',
  'element-story',
  'home-card',
  'home-grid',
]
components.forEach((c) => import(`/@/components/${c}.js`))
import '/components/markdown.js'

// fade in gracefully when components are loaded
const isDefined = components.map((c) => customElements.whenDefined(c))
await Promise.allSettled(isDefined)
document.body.style.opacity = 1
