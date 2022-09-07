![](https://raw.githubusercontent.com/jameslovallo/ardi/master/logo.png)

# Ardi

Ardi is a quick and capable companion for crafting custom elements. Ardi's philosophy is to go back to the basics and #usetheplatform without any Virtual DOM, JSX, or any other 'magic' to provide the most performant un-framework available, all without sacrificing DX. Ardi is tiny but fierce, weighing in at just 1kb uncompressed.

[Demo](https://codepen.io/jameslovallo/pen/xxWzjeb)

## Installation

Option 1: As a package.

```sh
npm i ardi
```

```js
import ardi from 'ardi'
```

Option 2: In your markup.

```html
<script type="module">
  import ardi from '//unpkg.com/ardi'
</script>
```

## Usage

Import Ardi, then pass it an object with any or all of the following keys. You can also add any other functions or values to your object and access them by their key name using `this`. Just note that Ardi has a few reserved keys, including `DOM`, `refs`, and `render()`, which will be explained in greater detail below.

| Key              | Type     |
| ---------------- | -------- |
| component        | String   |
| shadow           | Boolean  |
| props            | Function |
| template         | Function |
| styles           | Function |
| ready            | Function |
| intersect(ratio) | Function |

## Example

Below is an example demonstrating how each of the above keys is used to create a `<weather-widget>` component. Other functions are used and referenced in the code snippets below. You can see the full code and several other demo components in action [here](https://codepen.io/jameslovallo/pen/xxWzjeb).

### component

Give your new component a name. It must follow the custom element [naming convention](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#high-level_view).

```js
ardi({
  component: 'weather-widget',
})
```

### shadow

Enable or disable the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), which scopes your css allows you to use [\<slot\> tags](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) in your template.

```js
ardi({
  component: 'weather-widget',
  shadow: true, // defaults to false
})
```

### props()

The `props` function gets data from component attributes and assigns it to `this`. Each key's value can either be a setter function or a default string value. Prop setters can be built-in functions like `String`, `Number`, or `JSON.parse`, arrow functions, or another function in your object.

```js
ardi({
  component: 'weather-widget',
  // ...
  props() {
    return {
      breakpoint: (v) => (v ? Number(v) : 600),
      label: 'Forecast',
      lat: '42.375',
      lon: '-83',
      place: 'Detroit',
      unit: 'fahrenheit',
    }
  },
})
```

### template()

Use the `template` function to return the markup for you component in a template literal.

#### slots

If you enabled [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), you can use [\<slot\> tags](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) inside your template. You can use the default slot or multiple named slots.

#### parts

If you're new to custom elements, [part attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part) allow you to expose an element for custom styling by CSS rules outside of the component's Shadow DOM.

### refs

Any element with a `ref` attribute will be added to `this.refs`, i.e. `this.refs.forecast` in the example below.

#### handling events

You can add Vue-style @ attributes to your templates to handle events using the format `@event_name="event_handler"`, where `event_name` is [any valid event name](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) and `event_handler` is the key of any top-level function in the object. The `e` event object is automatically applied to the function so you can modify the default event behavior, i.e. to `preventDefault()`.

```js
ardi({
  component: 'weather-widget',
  // ...
  template() {
    return /* html */ `
      <div part="current">
        <div part="label">
          <b>${this.place}</b><br/>
          <small>${this.label}</small>
        </div>
        <div part="current_icon" ref="current_icon"></div>
        <div part="current_temp" ref="current_temp"></div>
      </div>
      <div part="forecast" ref="forecast">
        ${this.forecastPlaceholder()}
      </div>
    `
  },
})
```

### styles()

Use the `styles` function to return a template literal containing your component's styles. This only works with vanilla CSS, but you are free to use JS variables and functions anywhere inside your CSS.

```js
ardi({
  component: 'weather-widget',
  // ...
  styles() {
    const flexRow = `
      align-items: center;
      display: flex;
      flex-flow: row wrap;
      flex-grow: 1;
      gap: 1rem;
    `

    return /* css */ `
      :host {
        --current-icon-size: 5rem;
        --icon-shadow: 0 0 0 rgba(0,0,0,0.5);
        ${flexRow}
      }

      img { display: block }

      [part=current] {
        ${flexRow}
        height: 100%;
        justify-content: center;
      }

      [part=label] { text-align: center }

      [part=current_icon] {
        filter: drop-shadow(var(--icon-shadow));
        height: var(--current-icon-size);
        width: var(--current-icon-size);
      }

      [part=current_temp] { font-size: 2rem }

      [part=forecast] { ${flexRow} }

      /* ... */
    `
  },
})
```

### ready()

Use the `ready` function to handle events, effects, etc after the template is rendered. You can also assign events to any `ref` in the template using that ref's `on` method, which can be very useful for handling complex events. The `e` event object is automatically applied to the function so you can modify the default event behavior, i.e. to `preventDefault()`.

```js
ardi({
  component: 'weather-widget',
  // ...
  ready() {
    new ResizeObserver(() =>
      this.clientWidth <= this.breakpoint
        ? this.refs.forecast.classList.add('small')
        : this.refs.forecast.classList.remove('small')
    ).observe(this)
  },
})
```

### intersect()

Use the `intersect` function to create effects when the component is scrolled into view. You may use the `ratio` parameter to determine how much of the component should be visible before you run your effects. Ardi is optimized so that the intersection observer is only created if you use this key, so exclude it if you do not intend to use it. Also note that the default intersection observer is rootless, so if you need something custom, i.e. to run an effect when your component becomes visible inside of a horizontally-scrolling container, you can create your own intersection observer in `this.ready` or elsewhere in your component's object.

```js
ardi({
  component: 'weather-widget',
  // ...
  intersect(ratio) {
    if (!this.weatherAlreadyFetched && ratio > 0.3) {
      this.getWeather()
      this.weatherAlreadyFetched = true
    }
  },
})
```

## Reserved Keys

### DOM

`this.DOM` will always reference the component's render target, whether that is the Shadow Root or the component's `innerHTML`.

### refs

`this.refs` is used to conveniently reference elements in the component's markup and assign event listeners or handle effects. As mentioned previously, `this.refs` is an object containing every element that has a refs attribute. Each element is referenced by that attribute's value, i.e. `this.refs.forecast`, and has a special `on()` function that can be used to assign event listeners to that element.

### render()

If you prefer declarative rendering, you can manually call `this.render()` to re-render the component's template with any updated prop values. However, in most cases effects can be handled by imperatively manipulating elements through `this.parts`, which is the most efficient way to reflect state changes in your component's markup.

---

## Credits

Logo by [catalyststuff](https://www.freepik.com/free-vector/cute-monkey-astronaut-floating-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_17121208.htm#query=monkey&position=45&from_view=author) on Freepik
