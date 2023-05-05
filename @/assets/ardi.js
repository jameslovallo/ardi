import { html, svg, render as uhtml } from 'uhtml'
export { html, svg }
export const css = (v) => v

export default function ardi(options) {
  const element = options?.extends ? options.extends[0] : HTMLElement
  const elementString = options?.extends ? options.extends[1] : undefined
  const props = Object.keys(options.props || {})
  const update = new Event('update')

  class c extends element {
    constructor() {
      super()
      Object.assign(this, options)

      if (this.shadow === false) {
        this.root = this
      } else {
        this.attachShadow({ mode: 'open' })
        this.root = this.shadowRoot
      }

      if (typeof this.props === 'object') this.defineProps()
      if (typeof this.state === 'function') this.defineState()
      if (typeof this.intersected === 'function') this.handleintersected()

      this.refs = {}
    }

    connectedCallback() {
      this.addEventListener('update', this.debounce(this.render))
      this.dispatchEvent(update)
      if (typeof this.created === 'function') this.created()
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
          set: (v) => {
            this.setAttribute(prop, v)
            if (typeof this.changed === 'function') {
              this.changed({ name: prop, old: this[prop], new: v })
            }
          },
        })
      })
    }
    static get observedAttributes() {
      return props
    }
    attributeChangedCallback(prop, oldVal, newVal) {
      if (typeof this.changed === 'function') {
        this.changed({ name: prop, old: oldVal, new: newVal })
      }
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
        if (timeout) cancelAnimationFrame(timeout)
        timeout = requestAnimationFrame(() => fn.apply(this, arguments))
      }
    }

    render() {
      if (typeof this.template === 'function') {
        // handle css
        let css
        if (this.styles)
          css = typeof this.styles === 'function' ? this.styles() : this.styles
        // handle template
        const t = this.template()
        if (typeof t === 'object') {
          // prettier-ignore
          uhtml(this.root, html`${t}${html`<style>${css}</style>`}`)
        } else if (typeof t === 'string') {
          this.root.innerHTML = `${t}<style>${css}</style>`
        }
        this.root.querySelectorAll('[ref]').forEach((ref) => {
          this.refs[ref.getAttribute('ref')] = ref
        })
      }
      if (this.ready && !this.isReady) {
        this.ready()
        this.isReady = true
      }
      if (this.rendered) this.rendered()
    }

    handleintersected() {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.isIntersecting &&
              this.intersected(entry.intersectionRatio.toFixed(2))
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

ardi({
  tag: 'if-else',
  props: {
    if: [
      (v) => (v && !['false', 'null', 'undefined'].includes(v) ? true : false),
    ],
  },
  template() {
    return html`
      <slot name=${this.if || this['else-if'] ? null : 'else'}></slot>
    `
  },
})
