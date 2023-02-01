<h1>Ardi</h1>

**Welcome to the Weightless Web**

Ardi makes it easy to create reactive custom elements that work with any website or Javascript framework.

## Features

1. Object-oriented API
2. Reactive props and state management
3. Declarative templating with [µhtml](https://www.npmjs.com/package/uhtml), [JSX](https://www.npmjs.com/package/jsx-dom), or [Handlebars](https://www.npmjs.com/package/handlebars)
4. No tooling required

<home-grid>

<home-card
  src="/assets/fast.svg"
  alt="rocket lifting off"
  heading="It's fast"
  text="Ardi is only 3kb, and the bundled templating library renders changes with scalpel-like precision."
/>

<home-card
  src="/assets/familiar.svg"
  alt="guy chillin in a convertible in orbit"
  heading="It's familiar"
  text="Ardi gives custom elements a modern DX, and you can write components in µhtml, JSX or Handlebars."
/>

<home-card
  src="/assets/portable.svg"
  alt="guy getting abducted by a UFO"
  heading="It's universal"
  text="Ardi components work seamlessly with any framework: React, Vue, Svelte, Angular, you name it."
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

ardi({ component: 'my-component' })
```

### CDN

```html
<script type="module">
  import ardi, { html } from '//unpkg.com/ardi'

  ardi({ component: 'my-component' })
</script>
```

## API

Ardi uses an object-oriented API. To demonstrate the API, we'll be looking at code from this responsive TMDB search widget. You can see the full code [here](/demos/tmdb).

<tmdb-search></tmdb-search>

### Component

Define the component's name. The name must follow the [custom element naming convention](https://html.spec.whatwg.org/#valid-custom-element-name). We'll call this component 'tmdb-search'.

```js
ardi({
  component: 'tmdb-search',
})
```

### Props

Properties allow you to configure your component. To create a property, add a key under `props` whose value is an array containing a function and (optionally) a default value. The function takes the string value from the prop's corresponding attribute and transforms it, i.e. from a string `'4'` to a number `4`. The function can be a built-in function (like String, Number, or JSON.parse), an arrow function, or a method inside your component. Every prop is reactive, which means that whether a prop's value is changed internally or via its corresponding attribute, that change will trigger a render. Prop values are accessible directly from `this`.

For the TMDB component, we'll add two props:

1. type: to configure whether it searches for TV or movies.
2. time: to configure the time period for trending results, which are displayed by default when the component is scrolled into view.

```js
ardi({
  component: 'tmdb-search',
  props: {
    type: [String, 'tv'], // tv, movie, all
    time: [String, 'day'], // day, week
  },
})
```

### State

State is also reactive, meaning that any changes will trigger a render. Stateful data is accessible from `this`.

The TMDB component will use an array called 'results' to store movies or tv shows.

```js
ardi({
  component: 'tmdb-search',
  state: () => ({ results: [] }),
})
```

### Template (μhtml)

The bundled templating library is called [μhtml](https://www.npmjs.com/package/uhtml). μhtml is comfortably JSX-like and is very similar to how Lit works. With μhtml, you create your templates using a tagged template literal. When the component's state changes, instead of re-rendering the entire component, μhtml makes tiny, surgical DOM updates as-needed. This makes rendering extremely efficient and removes the need for manual memoization of component data.

#### Event Handlers

Event handlers can be applied to an element using React's `on` syntax (i.e. `onClick`) or Vue's `@` syntax (i.e. `@click`).

The TMDB component's toolbar includes 3 examples. The code below is simplified, you can view the complete code [here](/demos/tmdb).

```js
template() {
  return html`
    <input @keydown=${(e) => e.key === 'Enter' && this.search(e)}/>
    <button @click=${() => this.prev()}>❮</button>
    <button @click=${() => this.next()}>❯</button>
  `
}
```

#### Conditionals

The most convenient way to handle conditional rendering is to use a ternary operator.

In the TMDB component, we'll use conditionals to determine whether or not to show the poster or backdrop images.

```js
${result.backdrop_path
  ? html`<img part="backdrop" src=${backdrop} />`
  : ''}
${result.poster_path
  ? html`<img part="poster" src=${poster} />`
  : ''}
```

#### Lists

Lists are handled using the `Array.map()` method. In the TMDB component, we will use a map to list the TV series or movies that are returned by the API.

```js
${this.results.map((result) => {
  const url = 'https://www.themoviedb.org/tv/' + result.id
  const backdrop = bgRoot + result.backdrop_path
  const poster = posterRoot + result.poster_path
  return html`
    <li>
      <a part="result" href=${url}>
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
```

#### Slots

Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), which means you can use [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) tags inside your templates. You can use a single default slot or multiple named slots.

The TMDB component will have two named slots to allow the previous and next button's icons to be customized.

```js
<button part="prev" @click=${() => this.prev()}>
  <slot name="prev">❮</slot>
</button>
<button part="next" @click=${() => this.next()}>
  <slot name="next">❯</slot>
</button>
```

#### Refs

Ardi allows you to add ref attributes to elements in your template, which are accessible from `this.refs`. Note that this is currently only implemented for components that use μhtml and JSX. We are working to better support Handlebars in a future update.

In the TMDB component, the `list` ref is used by the `prev` and `next` methods to navigate through the search results.

```js
ardi({
  component: 'tmdb-search',
  template() {
    return html`
      ...
      <ul ref="list">
        ...
      </ul>
      ...
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

#### Context

Ardi has a powerful and easy to use context api, allowing one component to share and synchronize its props or state with multiple child components. Here is a [CodePen example](https://codepen.io/jameslovallo/pen/poZaXqq?editors=0010).

To share context from a parent component, add the `context` attribute with a descriptive name.

```html
<ardi-component context="theme"></ardi-component>
```

Then you can use `this.context` to use (and update!) the context inside your child components. When you update the context from a child component, it will be synchronized to the context provider and every other child component that reference it.

```js
template() {
  const theme = this.context;
  return html`
    <p style=${`font-color: ${theme.fontColor}`}>...</p>
    <input @input=${(e) => theme.fontColor = e.target.value}
  `
}
```

#### JSX & Handlebars

μhtml is tiny, fast and efficient, and we strongly recommend it. However, JSX is king right now, and Handlebars is still holding on strong. That's why Ardi allows you to use whatever templating library you prefer. Sample code for each supported option is provided below, for comparison. There is also an interactive [CodePen demo](https://codepen.io/jameslovallo/pen/WNKpqMj?editors=0010) showing all three examples.

<!-- tabs:start -->

##### **μhtml**

```js
import ardi, { html } from '//unpkg.com/ardi'

ardi({
  component: 'uhtml-counter',
  state: () => ({ count: 0 }),
  template() {
    return html`
    <button @click=${() => this.count++}>
      Count: ${this.count}
    </button>`
  },
})
```

##### **JSX-Dom**

```js
import ardi, { html } from '//unpkg.com/ardi'
import React from '//cdn.skypack.dev/jsx-dom'

ardi({
  component: 'jsx-counter',
  state: () => ({ count: 0 }),
  template() {
    return <button onClick={() => this.count++}>Count: {this.count}</button>
  },
})
```

##### **Handlebars**

```js
import ardi, { html } from '//unpkg.com/ardi'
import handlebars from 'https://cdn.skypack.dev/handlebars@4.7.7'

ardi({
  component: 'hbs-counter',
  state: () => ({ count: 0 }),
  template() {
    const template = "<button ref='counter'>Count: {{count}}</button>"
    const hbs = handlebars.compile(template)
    return hbs(this)
  },
  updated() {
    this.refs.counter.addEventListener('click', () => this.count++)
  },
})
```

<!-- tabs:end -->

Notice that with Handlebars (or any template that returns a string: i.e. a raw template literal), event listeners can be added to the `updated` method. If present, the `updated` method will run after each render.


### Methods

You've probably noticed by now that the code samples from the TMDB component refer to a number of other methods, namely `trending`, `search`, `prev`
and `next`.

You can add any number of methods in your component and access them via `this.methodName`. Custom methods can be used in props, in your template, inside of other methods, or even in your CSS (we'll get to that in a minute). For examples, you can view the complete code for the TMDB component [here](/demos/tmdb).

### Ready

The ready method runs as soon as the component is initialized. This is a good place to load data, setup observers, etc.

A great example of this is in the demo [weather component](/demos/weather), where a resize observer is set up to act like a container query and apply appropriate styling based on the component's rendered width, regardless of the viewport width. (Container queries can't come soon enough.)

```js
ardi({
  component: 'ardi-weather',
  ready() {
    new ResizeObserver(
      () => (this.small = this.clientWidth <= this.breakpoint)
    ).observe(this)
  },
})
```

### Intersect

The intersect method is called when the component is scrolled into view. You can use the ratio parameter to determine how much of the component should be visible before you apply an effect. Ardi will only create the intersection observer if you include this method, so omit it if you do not intend to use it.

In the TMDB component, the intersect method is used to lazy-load the default results once the component is in the viewport.

```js
ardi({
  component: 'tmdb-search',
  intersect(r) {
    if (r > 0.2 && !this.intersected) this.trending()
  },
})
```

### Styling

Ardi is mostly un-opinionated when it comes to styling, but you should know that Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). Despite common misconceptions, elements in the Shadow DOM can be styled by an external stylesheet. It just means that your styles are scoped by default (this is feature, not a bug!) unless you expose them using a [part attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part). Besides part attributes, elements in the Shadow DOM can also inherit styling from [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

This all means that you can build a component and place it on any site without worrying that the site's stylesheets will interfere with your component's core functionality, and you get complete control over what elements inside your template are allowed to be influenced by external CSS.

#### JS in CSS

You can include CSS styling directly in your component's template, like this.

```js
template() {
  return html`
    <nav>...</nav>
    <style>
      nav {
        background: ${this.theme().navBG};
        color: ${this.theme().navColor};
      }
    </style>
  `
}
```

#### Inline JS in CSS

You can also use JS in a style attribute, or any html attribute, like this.

```js
template() {
  return html`
    <nav style=${`color: ${this.theme().navColor}`}>...</nav>
  `
}
```

#### CSS Method

If you have a lot of CSS, it may be cleaner to move it into it's own method. You can still use Javascript in your CSS styling as long as your method is not an arrow function.

```js
template() {
  return html`
    <style>${this.css()}</style>
    <nav>...</nav>
  `
},
css() {
  return `
    nav {
      background: ${this.theme().navBG};
      color: ${this.theme().navColor};
    }
  `
}
```
