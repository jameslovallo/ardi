# Ardi

**Welcome to the Weightless Web**

Ardi makes it almost too easy to create reactive custom elements that work with any site or framework.

<app-link class="demo-link-container">

<a href="https://ardi.netlify.app/demos" class="demo-link">Check out the demos!</a>

</app-link>

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
  src="/@/assets/home/fast.svg"
  alt="rocket lifting off"
  heading="It's fast"
  text="Ardi is only 4kb and renders changes with scalpel-like precision."
/>

<home-card
  src="/@/assets/home/familiar.svg"
  alt="guy chillin in a convertible in orbit"
  heading="It's familiar"
  text="Ardi's modern DX works with templates in µhtml, JSX or Handlebars."
/>

<home-card
  src="/@/assets/home/portable.svg"
  alt="guy getting abducted by a UFO"
  heading="It's universal"
  text="Ardi works the same with JS apps, static sites, or all-in-one platforms."
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

Ardi uses a straightforward object-oriented API. To demonstrate the API, we'll be looking at simplified code from the <app-link>[podcast demo](https://ardi.netlify.app/demos/podcast)</app-link>.

<podcast-embed feed="https://feeds.simplecast.com/54nAGcIl" pagesize="5" style="max-width: 450px"></podcast-embed>

### Tag

Define the component's tag. The tag must follow the [custom element naming convention](https://html.spec.whatwg.org/#valid-custom-element-name). We'll call this component 'podcast-embed'.

```js
ardi({
  tag: 'podcast-embed',
})
```

### Extends

If you are building a component that extends a default element, you can define the prototype and tag here. Note that Safari still does not support extending built-in elements 😭.

```js
ardi({
  extends: [HTMLAnchorElement, 'a'],
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

Props allow you to configure a component using the element's attributes. To create a property, add a key under `props` whose value is an array containing a handler function and (optionally) a default value. The handler takes the string value from the prop's attribute and transforms it, i.e. from a string `'4'` to a number `4`. The handler can be a built-in function (like String, Number, or JSON.parse) or an arrow function. Every prop is reactive, which means that whether a prop's value is set internally or via its attribute, the change will trigger a render. Prop values are accessible directly from `this`, i.e. `this.pagesize`.

Here are the props configured in the podcast demo.

```js
ardi({
  props: {
    feed: [String, 'https://feeds.simplecast.com/54nAGcIl'],
    pagesize: [Number, 10],
    pagelabel: [String, 'Page'],
    prevpagelabel: [String, 'Prevous Page'],
    nextpagelabel: [String, 'Next Page'],
    pauselabel: [String, 'pause'],
    playlabel: [String, 'play'],
  },
})
```

### State

State is a reactive container for data, which means any change will trigger a render. Values declared in state are accessible from `this`, i.e. `this.episodes`.

Here is how state is defined in the podcast demo.

```js
ardi({
  state: () => ({
    image: '',
    title: '',
    author: '',
    description: '',
    link: '',
    episodes: [],
    nowPlaying: null,
    paused: true,
    page: 0,
  }),
})
```

### Template

[μhtml](https://www.npmjs.com/package/uhtml) is the default template library, and it's just like JSX except you create your templates using tagged template literals. μhtml is extremely efficient. When the component's state changes, instead of re-rendering an entire element, μhtml makes tiny, surgical DOM updates as-needed.

#### Event Handlers

Event handlers can be applied to an element using React's `on` syntax (`onClick`) or Vue's `@` syntax (`@click`). Here is a snippet showing the play/pause button for an episode in the podcast demo.

<div class="highlight-lines">

```js
ardi({
  template() {
    return html`
      ...
      <button
        part="play-button"
        @click=${() => this.playPause(track)}
        aria-label=${this.nowPlaying === track && !this.paused
          ? this.pauselabel
          : this.playlabel}
      >
        ${this.icon(
          this.nowPlaying === track && !this.paused ? 'pause' : 'play'
        )}
      </button>
      ...
    `
  },
})
```

<div class="highlight" style="--line: 7"></div>
</div>

#### Lists

Lists are handled using the `Array.map()` method. In the podcast demo, we will use a map to list the episodes that are returned by the xml feed. Lists generally do not require a key, but in cases where the order of elements changes you can add a key using `html.for(key)`.

<div class="highlight-lines">

```js
ardi({
  template() {
    return html`
      ...
      <div part="episodes">
        ${this.episodes.map((episode) => {
          return html`<div part="episode">...</div>`
        })}
      </div>
      ...
    `
  },
})
```

<div class="highlight" style="--line: 6; --lines: 3;"></div>

</div>

#### Conditional Rendering

Ternary operators are the recommended way to handle conditional rendering. The snippet below shows how elements can be conditionally rendered based on the available data.

<div class="highlight-lines">

<!-- prettier-ignore -->
```js
ardi({
  template() {
    return html`
      ...
      <audio ref="player" src=${this.nowPlaying} />
      <div part="header">
        ${this.image ? html`<img part="image" src=${this.image} />` : ''}
        <div part="header-wrapper">
          ${this.title ? html`<p part="title">${this.title}</p>` : ''}
          ${this.author ? html`<p part="author">${this.author}</p>` : ''}
          ${this.link
            ? html`<a part="link" href=${this.link}>${this.link}</a>`
            : ''}
        </div>
      </div>
      ${this.description
        ? html`<p part="description">${this.description}</p>`
        : ''}
      ...
    `
  },
})
```

<div class="highlight" style="--line: 7"></div>
<div class="highlight" style="--line: 9; --lines: 5;"></div>
<div class="highlight" style="--line: 16; --lines: 3;"></div>

</div>

If you prefer a more HTML-like syntax, Ardi provides a `<if-else>` element that you can use instead. To use it, just assign the `if` prop with a condition and nest your element inside. If you want to provide a fallback element, you can assign it to the `else` slot and it will be displayed if the condition is falsey. You can see this in action in the <app-link>[Employee Card](/demos/employee)</app-link> component.

```js
ardi({
  template() {
    return html`
      <if-else if=${this.photo}>
        <img part="photo" src=${this.photo} />
        <svg slot="else" viewBox="0 0 24 24">
          <path d="..." />
        </svg>
      </if-else>
    `
  },
})
```

#### Slots

Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) by default, which means you can use [&lt;slot&gt;](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) tags to project nested elements into your templates. You can use a single default slot or multiple named slots.

The podcast demo has two named slots allowing the pagination button icons to be customized.

<div class="highlight-lines">

```js
ardi({
  template() {
    return html`
      ...
      <button
        part="pagination-prev"
        @click=${() => this.page--}
        disabled=${this.page > 0 ? null : true}
        aria-label=${this.prevpagelabel}
      >
        <slot name="prev-icon"> ${this.icon('leftArrow')} </slot>
      </button>
      ...
    `
  },
})
```

<div class="highlight" style="--line: 11"></div>

</div>

#### Refs

Ardi allows you to add ref attributes to elements in your template, which are accessible from `this.refs`.

In the podcast component, the `player` ref is used by the `togglePlayback` method to control playback.

<div class="highlight-lines">

```js
ardi({
  template() {
    return html`<audio ref="player" src=${this.nowPlaying} />...`
  },
  togglePlayback() {
    // ...
    this.refs.player.play()
    // ...
  },
})
```

<div class="highlight" style="--line: 3"></div>
<div class="highlight" style="--line: 7"></div>

</div>

### Methods

You can add any number of methods in your component and access them via `this`. Custom methods can be used in your template, in lifecycle callbacks, or inside of other methods. For examples, you can view the complete code for the <app-link>[podcast demo](https://ardi.netlify.app/demos/demo)</app-link>. There are many more examples in components listed on the <app-link>[demos page](https://ardi.netlify.app/demos)</app-link>.

### Context

Ardi has a powerful and easy to use context api, allowing one component to share and synchronize its props or state with multiple child components. You can see this API in action in the <app-link>[i18n demo](https://ardi.netlify.app/demos/i18n)</app-link>, this [CodePen example](https://codepen.io/jameslovallo/pen/poZaXqq?editors=0010), and in the CSS section below.

To share context from a parent component, add the `context` attribute with a descriptive name, i.e. `context="theme"` You can then use `this.context("theme")` to reference the element and access its props or state. When a child component uses the context to make changes to the parent element's props or state, the parent element will notify every other child component that accesses the same values, keeping the context synchronized throughout the application.

```html
<ardi-component context="theme"></ardi-component>
```

### Styles

Ardi components use the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) by default. Elements in the Shadow DOM can be styled by an external stylesheet using [part attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part). Elements in the Shadow DOM can also inherit styling from [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

#### Inline CSS

You can use Javascript in an inline style attribute.

<div class="highlight-lines">

```js
ardi({
  template() {
    const { bg, color } = this.context('theme')
    return html`<nav style=${`background: ${bg}; color: ${color};`}>...</nav>`
  },
})
```

<div class="highlight" style="--line: 4"></div>

</div>

#### Styles Key

If you have a lot of CSS, it's cleaner to create a `styles` key. Ardi provides a `css` helper function to facilitate working with VSCode and other IDEs that support tagged template literals.

<div class="highlight-lines">

```js
import ardi, { css, html } from '//unpkg.com/ardi'

ardi({
  template() {
    const { bg, color } = this.context('theme')
    return html`<nav style=${`--bg: ${bg}; --color: ${color};`}>...</nav>`
  },
  styles: css`
    nav {
      background: var(--bg);
      color: var(--color);
    }
  `,
})
```

<div class="highlight" style="--line: 8; --lines: 6;"></div>

</div>

#### Styles Key Function

If you prefer, you can also use Javascript variables and functions directly in your CSS by creating the `styles` key as a function.

<div class="highlight-lines">

```js
ardi({
  template() {
    return html`<nav>...</nav>`
  },
  styles() {
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

<div class="highlight" style="--line: 5; --lines: 9;"></div>

</div>

## Lifecycle

Ardi has several lifecycle callbacks, providing a convenient way to fetch data or apply effects.

### created()

This callback runs as soon as the component is initialized. This is a good place to load data, setup observers, etc.

A great example of this is in the <app-link>[forecast demo](https://ardi.netlify.app/demos/forecast)</app-link>, where a resize observer is created to apply styles based on the component's rendered width (regardless of the viewport width).

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

Here is an example from the <app-link>[forecast demo](https://ardi.netlify.app/demos/forecast)</app-link>.

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

In the <app-link>[forecast demo](https://ardi.netlify.app/demos/forecast)</app-link>, the intersect method is used to lazy-load data once the component is scrolled into view. This trick can save a lot of money if you use paid APIs!

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

With Handlebars (or any template that returns a simple string: i.e. an untagged template literal), event listeners can be added to the `rendered` method. If present, the `rendered` method will run after each render.

<div class="highlight-lines">

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

<div class="highlight" style="--line: 12; --lines: 3;"></div>

</div>
