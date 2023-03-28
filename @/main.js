// load all components
const components = [
  'app-footer',
  'app-layout',
  'app-nav',
  'card',
  'componentcard',
  'grid',
  'md',
  'spa-link',
  'spa-root',
  'story',
  'tmdb',
  'toc',
]
components.forEach((c) => import(`/@/components/${c}.js`))

// fade in gracefully when components are loaded
const isDefined = components.map((c) => customElements.whenDefined(c))
await Promise.allSettled(isDefined)
document.body.style.opacity = 1
