# Why Ardi?

<h3>Has this ever happened to you?</h3>

You get a ticket to write a new component that draws store locations on an interactive Google map. The client already has this component on their React site, but you need to make it again because the new site is written in Svelte. You down a Monster and get started, but you really wish there was a way to just copy over the old one.

<h3>Custom elements to the rescue!</h3>

With custom elements, you can bring your components with you! This solves some problems:

1. No more re-writing code. Custom elements work with any framework, or without one!
2. No more framework lock-in. You can bring your old components with you!

<h3>Custom elements sound great in theory, but...</h3>

Then you try writing one, and you realize...

1. There's no declarative rendering system.
2. Nothing is reactive. You're back to old-fashioned manual DOM manipulation to get anything done.

<h3>Ardi to the rescue!</h3>

Ardi gives custom elements a modern DX. State management, reactivity, templating, context... it's all there. The API is object-oriented and comfortably Vue-like, the templates work just like JSX, and you don't need Babel, Typescript, compilers or even a Node environment to get started.

## Framework Demos

Ardi plays nicely with other frameworks, including React, Vue, Svelte, and many others. This is Ardi's superpower: you can write a component once, then use it again across many different projects, without worrying about compatibility. While you're looking at the demos for React and Vue, take a look at the &lt;hello-world&gt; component in the DOM while you play with the controls. If you look closely, you can see that the rendering is incredibly efficient. Ardi throttles rendering using `requestAnimationFrame`, and μhtml only updates the individual attributes or text nodes that have changed, not the whole element. The result is buttery smooth reactivity that works great with other UI frameworks.

<!-- tabs:start -->

#### **React**

<iframe height="500" style="width: 100%;" scrolling="no" title="Ardi ❤️ React" src="https://codepen.io/jameslovallo/embed/XWqNNNo?default-tab=result&editable=true&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jameslovallo/pen/XWqNNNo">
  Ardi ❤️ React</a> by James Lovallo (<a href="https://codepen.io/jameslovallo">@jameslovallo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

#### **Vue**

<iframe height="500" style="width: 100%;" scrolling="no" title="Ardi ❤️ Vue" src="https://codepen.io/jameslovallo/embed/KKRgrrd?default-tab=result&editable=true&theme-id=dark" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/jameslovallo/pen/KKRgrrd">
  Ardi ❤️ Vue</a> by James Lovallo (<a href="https://codepen.io/jameslovallo">@jameslovallo</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

<!-- tabs:end -->
