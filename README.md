![](https://raw.githubusercontent.com/jameslovallo/ardi/master/docs/assets/svg/ardi.svg)

# Ardi

**Welcome to the Weightless Web.** Ardi is a tiny (but fierce) web component framework, weighing just 1kb uncompressed.

## Our Mission

1. Make it easy to create powerful web components that work everywhere, including React, Vue, Svelte, Astro, Angular, etc.
2. Provide great DX and performance without virtual dom, JSX, compilers, or any other magic. #usetheplatform

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

After you've imported Ardi, pass it an object with any or all of the following keys. You can assign custom functions or data to any other key in your object and access it using this.key_name. Ardi has three reserved keys, this.DOM, this.refs, and this.render(), which will be explained in greater detail in the this section below.

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
