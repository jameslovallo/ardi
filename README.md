![](https://raw.githubusercontent.com/jameslovallo/chimp/master/logo.png)
# Chimp
Chimp is a cute, concise and clever chassis for crafting custom elements. It's all about casting off clutter and going back to basics, without sacrificing DX.

[Demo](https://codepen.io/jameslovallo/pen/xxWzjeb)

## Installation
Option 1: As a package.
```sh
npm i @snappywc/chimp
```
```js
import chimp from '@snappywc/chimp'
```

Option 2: In your markup.
```html
<script type="module">
  import chimp from '//unpkg.com/@snappywc/chimp'
</script>
```
## Usage
Import Chimp, then provide with an object with any or all of the following keys. You can also add any other functions or values to your object and access it by it's name using `this`. Chimp also provides several special keys, including `DOM`, `parts`, and a `render` function, which will be explained in greater detail below.

| Key       | Type     |
| --------- | -------- |
| component | String   |
| shadow    | Boolean  |
| props     | Function |
| template  | Function |
| styles    | Function |
| ready     | Function |

## Example
Below is an example using each of the keys in a `chimp` object to create a "Staff Card" component. There are multiple demo components [here](https://codepen.io/jameslovallo/pen/xxWzjeb).

### component
Give your new component a name. It must follow custom element naming convention.
```js
chimp({
  component: 'staff-card',
})
```

### shadow
Enable or disable the Shadow DOM, which allows you to use slots in your template.
```js
chimp({
  component: 'staff-card',
  shadow: true, // defaults to false
})
```

### props()
Use this function to get prop data from component attributes and assign it to `this` using a handler function. Handler functions can be built in functions like `String`, `Number`, or `JSON.parse`, an arrow function, or another function in your object, i.e. `this.phoneLink` in the example below.
```js
chimp({
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
Use this function to return the markup for you component as a template literal. You can handle any logic or data transformations before the return, in prop handlers, or using another method from your component's object.
#### slots
If you enabled Shadow DOM, you can use slots inside your template. You can use default slots or multiple named slots.
#### parts
If you're new to custom elements, part attributes allow you to expose an element for custom styling by CSS rules outside of the component's Shadow DOM. Chimp also uses part attributes like refs, and any element with a `part` attribute will be added to `this.parts`, i.e. `this.parts.photo`.
#### handling events
You can add event handlers to an element using the  `on` attribute in your template, using the format `on="event_name:event_handler"`, where `event_name` is any valid event type and `event_handler` is the key of any function added to your component's object. When you assign events this way, the `e` event object is forwarded for your function to use, i.e to `preventDefault()`. See the document for the `ready()` function below for more

```js
chimp({
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
        <span part="phone" on="click:phoneClick">${this.phone}</span>
        <span part="email">${this.email}</span>
      </div>
    `
  },
})
```

### styles()
Return a template literal containing your component's styles. Like the `template()` function, you can handle any logic or data transformations before the return, in prop handlers, or using another method from your component's object. This gives you a lot of flexibility to use data in your component's css, i.e. by using a JS variable or function in `${}` to return a property value, a property/value pair, or even a whole rule or set of rules.
```js
chimp({
  component: 'staff-card',
  // ...
  styles() {
    return `
      :host {
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
Use this function to handle events, effects, etc after the template is created. You can easily assign events to any `part` in the template using that part's `on` method, as seen in the example below. The `e` event object is forwarded for your function to use, i.e to `preventDefault()`.

```js
chimp({
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