import { render as uhtml } from 'uhtml'
export { html, svg } from 'uhtml'

export default function ardi(x) {
  const props = Object.keys(x.props || {})
  const update = new Event('update')

  class c extends HTMLElement {
    constructor() {
      super().attachShadow({ mode: 'open' })
      Object.assign(this, x)
      this.refs = {}

      // register props
      props.forEach((prop) => {
        const [propSetter, propDefault] = this.props[prop]
        Object.defineProperty(this, prop, {
          get: () => {
            const value = this.getAttribute(prop) || propDefault
            switch (propSetter) {
              case String:
                return value
              case Boolean:
                return [true, 'true'].includes(value)
              default:
                return propSetter(value)
            }
          },
          set: (v) => this.setAttribute(prop, v),
        })
      })

      // reactive state
      const reactive = (object) => {
        if (object === null || typeof object !== 'object') {
          return object
        }
        for (const property in object) {
          object[property] = reactive(object[property])
        }
        return new Proxy(object, {
          get: (target, property) => {
            return target[property]
          },
          set: (target, property, value) => {
            target[property] = reactive(value)
            this.dispatchEvent(update)
            return true
          },
          deleteProperty: (target, prop) => {
            delete target[prop]
            this.dispatchEvent(update)
            return true
          },
        })
      }
      if (typeof this.state === 'function') {
        this._state = reactive(this.state())
        delete this.state
        Object.keys(this._state).forEach((key) => {
          Object.defineProperty(this, key, {
            get: () => {
              return this._state[key]
            },
            set: (v) => (this._state[key] = v),
          })
        })
      }

      // intersect helper
      if (typeof this.intersect === 'function') {
        new IntersectionObserver(
          (entries) =>
            entries.forEach((entry) => {
              entry.isIntersecting &&
                this.intersect(entry.intersectionRatio.toFixed(2))
            }),
          {
            root: null,
            rootMargin: '0px',
            threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          }
        ).observe(this)
      }
    }

    // context
    context(c) {
      if (!this._ctx) this._ctx = {}
      if (!this._ctx[c]) {
        const closest = (selector, base = this) => {
          function __closestFrom(el) {
            if (!el || el === document || el === window) return null
            let found = el.closest(selector)
            return found ? found : __closestFrom(el.getRootNode().host)
          }
          return __closestFrom(base)
        }
        this._ctx[c] = closest(`[context=${c}]`)
        this._ctx[c].addEventListener('update', () =>
          this.dispatchEvent(update)
        )
        return this._ctx[c]
      } else return this._ctx[c]
    }

    // rendering
    debounce(fn) {
      var timeout
      return function () {
        var context = this
        var args = arguments
        if (timeout) {
          window.cancelAnimationFrame(timeout)
        }
        timeout = window.requestAnimationFrame(function () {
          fn.apply(context, args)
        })
      }
    }
    render() {
      uhtml(this.shadowRoot, this.template())
      this.shadowRoot.querySelectorAll('[ref]').forEach((ref) => {
        this.refs[ref.getAttribute('ref')] = ref
      })
    }
    connectedCallback() {
      this.addEventListener('update', this.debounce(this.render))
      this.dispatchEvent(update)
      this?.ready && this.ready()
    }

    // reactive props
    static get observedAttributes() {
      return props
    }
    attributeChangedCallback() {
      this.dispatchEvent(update)
    }
  }

  // define element
  !customElements.get(x.component) && customElements.define(x.component, c)
}
