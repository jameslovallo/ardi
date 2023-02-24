import { html, render as uhtml, svg } from 'https://cdn.skypack.dev/uhtml'
export { html, svg }

export default function ardi(options) {
  const element = options?.extends ? options.extends[0] : HTMLElement
  const elementString = options?.extends ? options.extends[1] : undefined
  const props = Object.keys(options.props || {})
  const update = new Event('update')

  class c extends element {
    constructor() {
      super()
      Object.assign(this, options)

      if (!this.shadow || this.shadow !== false) {
        this.attachShadow({ mode: 'open' })
        this.root = this.shadowRoot
      } else this.root = this

      if (typeof this.props === 'object') this.defineProps()
      if (this.state) this.defineState()
      if (typeof this.intersect === 'function') this.handleIntersect()

      this.refs = {}
    }

    connectedCallback() {
      this.addEventListener('update', this.debounce(this.render))
      this.dispatchEvent(update)
      if (typeof this.ready === 'function') this.ready()
    }

    defineProps() {
      props.forEach((prop) => {
        const [handleValue, defaultValue] = this.props[prop]
        Object.defineProperty(this, prop, {
          get: () => {
            const value = this.getAttribute(prop) || defaultValue
            switch (handleValue) {
              case String:
                return value
              case Boolean:
                return [true, 'true'].includes(value)
              default:
                return handleValue(value)
            }
          },
          set: (v) => this.setAttribute(prop, v),
        })
      })
    }
    static get observedAttributes() {
      return props
    }
    attributeChangedCallback() {
      this.dispatchEvent(update)
    }

    defineState() {
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
      this._state = reactive(
        typeof this.state === 'function' ? this.state() : this.state
      )
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
      const css = this.css
        ? html`
            <style>
              ${typeof this.css === 'function' ? this.css() : this.css}
            </style>
          `
        : ''
      const t = html`${css}${this.template()}`
      if (typeof t === 'object') {
        uhtml(this.root, t)
      } else if (typeof t === 'string') {
        this.root.innerHTML = t
      }
      this.root.querySelectorAll('[ref]').forEach((ref) => {
        this.refs[ref.getAttribute('ref')] = ref
      })
      if (this.updated) this.updated()
    }

    handleIntersect() {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.isIntersecting &&
              this.intersect(entry.intersectionRatio.toFixed(2))
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        }
      ).observe(this)
    }
  }

  !customElements.get(options.tag) &&
    customElements.define(options.tag, c, { extends: elementString })
}
