# Why Ardi?

1. Create components that work with any framework, or without one!
2. Minimal boilerplate code. Ardi uses a simple, object-oriented API.
3. No Virtual DOM, TypeScript, build steps, or tooling required. Ardi provides a modern DX without fighting the platform.

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
