# Ardi

**Welcome to the Weightless Web**

Ardi makes it almost too easy to create reactive custom elements that work with any site or framework.

<a href="https://ardi.netlify.app/demos/" class="demo-link">Check out the demos!</a>

<!-- split -->

## Features

1. Object-oriented API
2. Single-file components
3. Reactive props and state
4. Easy-to-use Context API
5. Templates in [µhtml](https://www.npmjs.com/package/uhtml), [JSX](https://www.npmjs.com/package/jsx-dom), or [Handlebars](https://www.npmjs.com/package/handlebars)
6. Helpful lifecycle callbacks
7. No building, compiling, or tooling

<home-grid>

<home-card
  src="/@/assets/fast.svg"
  alt="rocket lifting off"
  heading="It's fast"
  text="Ardi is only 4kb and renders changes with scalpel-like precision."
/>

<home-card
  src="/@/assets/familiar.svg"
  alt="guy chillin in a convertible in orbit"
  heading="It's familiar"
  text="Ardi's modern DX works with templates in µhtml, JSX or Handlebars."
/>

<home-card
  src="/@/assets/portable.svg"
  alt="guy getting abducted by a UFO"
  heading="It's universal"
  text="Ardi works the same with JS apps, static sites, or legacy platforms."
/>

</home-grid>

## Installation

You can use Ardi from NPM or a CDN.

### NPM

```sh
npm i ardi
```

```js
import ardi, { html } from 'ardi'

ardi({ tag: 'my-component' })
```

### CDN

```html
<script type="module">
  import ardi, { html } from '//unpkg.com/ardi'

  ardi({ tag: 'my-component' })
</script>
```

## API

Ardi uses an object-oriented API. To demonstrate the API, we'll be looking at code from the <a is="app-link" href="/demos/tmdb">TMDB demo component</a>.

<tmdb-trending></tmdb-trending>

### Tag

Define the component's tag. The tag must follow the [custom element naming convention](https://html.spec.whatwg.org/#valid-custom-element-name). We'll call this component 'tmdb-trending'.

```js
ardi({
  tag: 'tmdb-trending',
})
```

### Extends

If you are building a component that extends a default element, you can define the prototype and tag here.

```js
ardi({
  extends: [HTMLPreElement, 'pre'],
})
```

### Shadow

Ardi renders to the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) by default. You can disable this behavior if you need to.

```js
ardi({
  shadow: false,
})
```

### Props

Props allow you to configure your component using the element's corresponding attributes. To create a property, add a key under `props` whose value is an array containing a handler function and (optionally) a default value. The handler takes the string value from the prop's attribute and transforms it, i.e. from a string `'4'` to a number `4`. The handler can be a built-in function (like String, Number, or JSON.parse) or an arrow function. Every prop is reactive, which means that whether a prop's value is set internally or via its attribute, the change will trigger a render. Prop values are accessible directly from `this`, i.e. `this.type`.

For the TMDB component, we'll add two props:

1. type: to configure whether it displays trending TV or movies.
2. time: to configure the time period for trending results.

```js
ardi({
  props: {
    type: [String, 'tv'], // tv, movie, all
    time: [String, 'day'], // day, week
  },
})
```

### State

State is a reactive container for data, which means any change will trigger a render. Values declared in state are accessible from `this`, i.e. `this.results`.

The TMDB component will use an array called 'results' to store movies or tv shows.

```js
ardi({
  state: () => ({ results: [] }),
})
```

### Template

[μhtml](https://www.npmjs.com/package/uhtml) is the default template library, and it's just like JSX except you create your templates using a tagged template literal. μhtml is extremely efficient. When the component's state changes, instead of re-rendering an entire element, μhtml makes tiny, surgical DOM updates as-needed.

#### Event Handlers

Event handlers can be applied to an element using React's `on` syntax (`onClick`) or Vue's `@` syntax (`@click`).

The TMDB component's toolbar includes 3 examples. The code below is simplified, you can view the complete code on the <a is="app-link" href="/demos/tmdb">TMDB demo page</a>.

```js
ardi({
  template() {
    return html`
      <!-- ... -->
      <select
        @change=${(e) => {
          this.type = e.target.value
          this.fetchTrending()
        }}
      >
        <!-- options -->
      </select>
      <button @click=${() => this.prev()}>❮</button>
      <button @click=${() => this.next()}>❯</button>
      <!-- ... -->
    `
  },
})
```

#### Conditionals and Lists

Lists are handled using the `Array.map()` method. In the TMDB component, we will use a map to list the TV series or movies that are returned by the API.

The most convenient way to handle conditional rendering is to use a ternary operator. In the TMDB component, we'll use conditionals to determine whether or not to show the poster or backdrop images.

<!-- prettier-ignore -->
```js
ardi({
  template() {
    return html`
      <!-- ... -->
      <!-- map results -->
      ${this.results.map((result) => {
        // ...
        return html`
          <li>
            <a part="result" href=${url}>
              <!-- conditionally render images -->
              ${result.backdrop_path
                ? html`<img part="backdrop" src=${backdrop} />`
                : ''}
              ${result.poster_path
                ? html`<img part="poster" src=${poster} />`
                : ''}
              <div part="details">
                <h3 part="title">${result.name}</h3>
                <p part="description">${result.overview}</p>
              </div>
            </a>
          </li>
        `
      })}
      <!-- ... -->
    `
  },
})
```

#### Slots

Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), which means you can use [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) tags inside your templates. You can use a single default slot or multiple named slots.

The TMDB component will have two named slots to allow the previous and next button's icons to be customized.

```js
ardi({
  template() {
    return html`
      <!-- ... -->
      <button part="prev" @click=${() => this.prev()}>
        <slot name="prev">❮</slot>
      </button>
      <button part="next" @click=${() => this.next()}>
        <slot name="next">❯</slot>
      </button>
      <!-- ... -->
    `
  },
})
```

#### Refs

Ardi allows you to add ref attributes to elements in your template, which are accessible from `this.refs`.

In the TMDB component, the `list` ref is used by the `prev` and `next` methods to navigate through the results.

```js
ardi({
  template() {
    return html`
      <!-- ... -->
      <ul ref="list">
        <!-- results -->
      </ul>
      <!-- ... -->
    `
  },
  prev() {
    this.refs.list.scrollLeft -= this.offsetWidth
  },
  next() {
    this.refs.list.scrollLeft += this.offsetWidth
  },
})
```

### Context

Ardi has a powerful and easy to use context api, allowing one component to share and synchronize its props or state with multiple child components. You can see this API in action in the [i18n Demo](/demos/i18n/), this [CodePen example](https://codepen.io/jameslovallo/pen/poZaXqq?editors=0010), and in the CSS section below.

To share context from a parent component, add the `context` attribute with a descriptive name, i.e. `context="theme"` You can then use `this.context("theme")` to reference the element and access its props or state. When a child component uses the context to make changes to the parent element's props or state, the parent element will notify every other child component that accesses the same values, keeping the context synchronized throughout the application.

```html
<ardi-component context="theme"></ardi-component>
```

### CSS

Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) by default. Despite common misconceptions, elements in the Shadow DOM can be styled by an external stylesheet: it just means that your styles are scoped unless you expose them using a [part attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part). This is a feature, not a bug! Besides part attributes, elements in the Shadow DOM can also inherit styling from [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

This all means that you can build a component and place it on any site without worrying that the site's stylesheets will interfere with your component's core functionality, and you get complete control over which elements inside your template are allowed to be influenced by external CSS.

#### In the template

You can include CSS styling directly in your component's template, like this.

```js
ardi({
  template() {
    const { bg, color } = this.context('theme')
    return html`
      <nav>...</nav>
      <style>
        nav {
          background: ${bg};
          color: ${color};
        }
      </style>
    `
  },
})
```

#### Inline

You can also use JS in a style attribute, or any html attribute, like this.

```js
ardi({
  template() {
    const { bg, color } = this.context('theme')
    return html`<nav style=${`background: ${bg}; color: ${color};`}>...</nav>`
  },
})
```

#### CSS key

If you have a lot of CSS, it may be cleaner to move it into it's own key. If present, the CSS key will automatically be added to your template. It can be a template literal or a function that returns a template literal. You can use Javascript values and expressions in your CSS as long as your method is not an arrow function.

```js
ardi({
  template() {
    return html`<nav>...</nav>`
  },
  css() {
    const { bg, color } = this.context('theme')
    return `
      nav {
        background: ${bg};
        color: ${color};
      }
    `
  },
})
```

### Methods

You've probably noticed by now that the code samples from the TMDB component refer to a number of other methods, namely `fetchTrending`, `prev` and `next`.

You can add any number of methods in your component and access them via `this`. Custom methods can be used in your template, in lifecycle callbacks, or inside of other methods. For examples, you can view the complete code for the <a is="app-link" href="/demos/tmdb">TMDB demo page</a>.

## Lifecycle

Ardi has several lifecycle callbacks, providing a convenient way to fetch data or apply effects.

### created()

This callback runs as soon as the component is initialized. This is a good place to load data, setup observers, etc.

A great example of this is in the <a is="app-link" href="/demos/forecast">forecast demo</a>, where a resize observer is created to apply styles based on the component's rendered width (regardless of the viewport width).

```js
ardi({
  tag: 'ardi-forecast',
  created() {
    new ResizeObserver(() =>
      requestAnimationFrame(
        () => (this.small = this.clientWidth <= this.breakpoint)
      )
    ).observe(this)
  },
})
```

### ready()

This callback runs as soon as the component's template is rendered, allowing you to call methods that access refs defined in the template.

### rendered()

This method runs each time the component renders an update. This was added to support event listeners when writing templates with Handlebars or untagged template literals, but you can use this method for any purpose.

### changed()

Although props are reactive, meaning the template is automatically updated when a prop's value changes, you may encounter scenarios where you need to handle a property's value manually, i.e. to fetch data or apply an effect. You can use this callback to observe and respond to prop updates.

Here is an example from the <a is="app-link" href="/demos/forecast">forecast demo</a>.

```js
ardi({
  tag: 'ardi-forecast',
  changed(prop) {
    if (
      prop.old &&
      prop.new &&
      ['lat', 'lon', 'locale', 'unit'].includes(prop.name)
    ) {
      this.fetchForecast()
    }
  },
})
```

### intersected()

This method is called when the component is scrolled into view. You can use the ratio parameter to determine how much of the component should be visible before you apply an effect. Ardi will only create the intersection observer if you include this method, so omit it if you do not intend to use it.

In the <a is="app-link" href="/demos/forecast">forecast demo</a>, the intersect method is used to lazy-load data once the component is scrolled into view. This trick can save a lot of money if you use paid APIs!

```js
ardi({
  tag: 'ardi-forecast',
  intersected(r) {
    if (!this.gotWeather && r > 0.2) {
      this.fetchForecast()
    }
  },
})
```

## Template Options

μhtml is tiny, fast and efficient, and we strongly recommend it. However, JSX is king right now, and Handlebars is still holding on strong. That's why Ardi allows you to use whatever template library you prefer. Sample code for each supported option is provided below, for comparison. There is also an interactive [CodePen demo](https://codepen.io/jameslovallo/pen/WNKpqMj?editors=0010) showing all three examples.

### μhtml

<!--prettier-ignore-->
```js
import ardi, { html } from '//unpkg.com/ardi'

ardi({
  tag: 'uhtml-counter',
  state: () => ({ count: 0 }),
  template() {
    return html`
    <button @click=${() => this.count++}>
      Count: ${this.count}
    </button>`
  },
})
```

### JSX-Dom

<!--prettier-ignore-->
```js
import ardi, { html } from '//unpkg.com/ardi'
import React from '//cdn.skypack.dev/jsx-dom'

ardi({
  tag: 'jsx-counter',
  state: () => ({ count: 0 }),
  template() {
    return (
      <button onClick={() => this.count++}>
        Count: {this.count}
      </button>
    )
  },
})
```

### Handlebars

```js
import ardi, { html } from '//unpkg.com/ardi'
import handlebars from 'https://cdn.skypack.dev/handlebars@4.7.7'

ardi({
  tag: 'hbs-counter',
  state: () => ({ count: 0 }),
  template() {
    return handlebars.compile(
      `<button ref='counter'>Count: {{count}}</button>`
    )(this)
  },
  rendered() {
    this.refs.counter.addEventListener('click', () => this.count++)
  },
})
```

Notice that with Handlebars (or any template that returns a string: i.e. a raw template literal), event listeners can be added to the `updated` method. If present, the `updated` method will run after each render.
