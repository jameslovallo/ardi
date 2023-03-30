// load all components
const components = [
  'app-footer',
  'app-layout',
  'app-nav',
  'app-sidebar',
  'card',
  'componentcard',
  'grid',
  'label',
  'md',
  'spa-link',
  'spa-root',
  'story',
  'tmdb',
]
components.forEach((c) => import(`/@/components/${c}.js`))

// fade in gracefully when components are loaded
const isDefined = components.map((c) => customElements.whenDefined(c))
await Promise.allSettled(isDefined)
document.body.style.opacity = 1
