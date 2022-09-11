![](https://raw.githubusercontent.com/jameslovallo/ardi/master/docs/assets/ardi.svg)

# Ardi

Ardi is a quick and capable companion for crafting custom elements. Ardi's philosophy is to go back to the basics and #usetheplatform without any Virtual DOM, JSX, or any other 'magic' to provide the most performant un-framework available, all without sacrificing DX. Ardi is tiny but fierce, weighing in at just 1kb uncompressed.

[Demo & Docs](https://jameslovallo.github.io/ardi/)

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

Import Ardi, then pass it an object with any or all of the following keys. You can also add any other functions or values to your object and access them by their key name using `this`.

| Key              | Type     |
| ---------------- | -------- |
| component        | String   |
| shadow           | Boolean  |
| props            | Function |
| template         | Function |
| styles           | Function |
| ready            | Function |
| intersect(ratio) | Function |

Ardi has three other reserved keys, `DOM`, `refs`, and `render()`, which will be explained in greater detail below.

## Credits

Logo by [catalyststuff](https://www.freepik.com/free-vector/cute-monkey-astronaut-floating-cartoon-vector-icon-illustration-animal-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_17121208.htm#query=monkey&position=45&from_view=author) on Freepik
