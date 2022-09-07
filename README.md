![](https://raw.githubusercontent.com/jameslovallo/ardi/master/logo.png)

# Ardi

The un-framework.

Ardi is a quick and capable companion for crafting custom elements. Ardi's philosophy is to go back to the basics and #usetheplatform without any Virtual DOM, JSX, or any other 'magic' to provide the most performant option available, all without sacrificing DX. Ardi is tiny but fierce, weighing in at just 1.2kb uncompressed.

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

Import Ardi, then pass it an object with any or all of the following keys. You can also add any other functions or values to your object and access them by their key name using `this`. Just note that Ardi has a few reserved keys, including `DOM`, `parts`, and a `render()` function, which will be explained in greater detail below.

| Key       | Type     | Parameters |
| --------- | -------- | ---------- |
| component | String   |            |
| shadow    | Boolean  |            |
| props     | Function |            |
| template  | Function |            |
| styles    | Function |            |
| ready     | Function |            |
| intersect | Function | ratio      |

## Example

Below is an example using each key to create a "Staff Card" component. You can see this and several other demo components in action [here](https://codepen.io/jameslovallo/pen/xxWzjeb).

### component

Give your new component a name. It must follow the custom element [naming convention](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#high-level_view).

```js
ardi({
  component: 'staff-card',
})
```

### shadow

Enable or disable the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), which scopes your css allows you to use [\<slot\> tags](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) in your template.

```js
ardi({
  component: 'staff-card',
  shadow: true, // defaults to false
})
```

### props()

Use this function to get prop data from component attributes and assign it to `this` using a prop loader. Prop loaders can be built-in functions like `String`, `Number`, or `JSON.parse`, arrow functions, or another function in your object, i.e. `this.phoneLink` in the example below.

```js
ardi({
  component: 'staff-card',
  // ...
  props() {
    return {
      name: String,
      role: String,
      photo: String,
      phone: this.phoneLink,
      email: this.emailLink,
    }
  },
})
```

### template()

Use this function to return the markup for you component in a template literal. You can handle any logic or data transformations before the `return`, in prop handlers, or using another function from your component's object.

#### slots

If you enabled [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM), you can use [\<slot\> tags](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement) inside your template. You can use the default slot or multiple named slots.

#### parts

If you're new to custom elements, [part attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/part) allow you to expose an element for custom styling by CSS rules outside of the component's Shadow DOM. Ardi also uses part attributes like refs, and any element with a `part` attribute will be added to `this.parts`, i.e. `this.parts.photo`.

#### handling events

You can add Vue-style @ attributes to your templates to handle events using the format `@event_name="event_handler"`, where `event_name` is [any valid event name](https://developer.mozilla.org/en-US/docs/Web/API/Element#events) and `event_handler` is the key of any top-level function in the object. Note that the `e` event object is always forwarded to the function, i.e to `preventDefault()`.

```js
ardi({
  component: 'staff-card',
  // ...
  template() {
    return `
      <img part="photo" src="${this.photo}">

      <div part="details">
        <b>${this.name}</b>
        ${this.role}
      </div>

      <div part="contact">
        <span part="phone" @click="phoneClick">${this.phone}</span>
        <span part="email">${this.email}</span>
      </div>
    `
  },
})
```

### styles()

Return a template literal containing your component's styles. Like the `template()` function, you can handle any logic or data transformations before the `return`, in prop loaders, or using another function in your component. This gives you a lot of flexibility to use computed data in your component's css, i.e. by using a JS variable or function in `${}` to return a property value, a css property/value pair, or even a whole rule or set of rules.

```js
ardi({
  component: 'staff-card',
  // ...
  styles() {
    return `
      :host {
        color: ${this.color || 'currentcolor'};
        display: grid;
        align-items: center;
        grid-template-columns: 64px 1fr auto;
        max-width: 400px;
        box-shadow: inset 0 0 0 1px rgba(123, 123, 123, 0.5);
        border-radius: .75rem;
        overflow: hidden;
      }

      [part=photo] {
        display: block;
        height: 64px;
        width: 64px;
        aspect-ratio: 1/1;
        object-fit: contain;
        object-position: center bottom;
      }
      ...
    `
  },
})
```

### ready()

Use this function to handle events, effects, etc after the template is created. You can easily assign events to any `part` in the template using that part's `on` method, as seen in the example below. This is very useful for handling complex events. Note that the `e` event object is always forwarded to the function, i.e to `preventDefault()`.

```js
ardi({
  component: 'staff-card',
  // ...
  ready() {
    this.parts.phone.on('click', this.phoneClick)
  },
})
```

## Reserved Keys

### DOM

`this.DOM` will always reference the component's render target, whether that is the Shadow Root or the component's `innerHTML`.

### parts

`this.parts` is used to conveniently reference elements in the component's markup and assign event listeners or handle effects. As mentioned previously, `this.parts` is an object containing every element that has a part attribute. Each element is referenced by that attribute's value, i.e. `this.parts.image`, and has a special `on()` function that can be used to assign event listeners to that element. See the `template()` section above for examples.

### render()

If you prefer declarative rendering, you can manually call `this.render()` to re-render the component's template with any updated prop values. However, in most cases effects can be handled by imperatively manipulating elements through `this.parts`, which is the most efficient way to reflect state changes in your component's markup.

---

## Credits

Logo by [catalyststuff](https://www.freepik.com/free-vector/cute-monkey-astronaut-floating-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_17121208.htm#query=monkey&position=45&from_view=author) on Freepik
