# Ramidus

Ramidus is a Single Page Application (SPA) template built for custom elements, bringing many of the benefits of frameworks like Next or Nuxt to vanilla sites. Unlike those frameworks, you're not locked into one way of doing things: all of the code is included in your project, and you are free to modify it however you wish.

<ramidus-header></ramidus-header>

## Features

1. Instant SPA page loading using the `<app-root>` and `<app-link>` elements.
1. Preload high-traffic pages after the first page loads.
1. Share templates between pages using the `<app-layout>` element.
1. Easily embed markdown and syntax-highlighted files using the `<mark-down>` element.
1. Familiar conventions, similar to Next or Nuxt.
1. No hidden code: customize anything exactly the way you like it.

## Getting Started

Setup is easy and no tooling is required. You can scaffold your project using npx or simply download [this zip file](https://codeload.github.com/jameslovallo/ramidus/zip/refs/heads/main).

```sh
npx ramidus@latest && npm run dev
```

## Starters

You can quickly set up a new starter project from the command line.

<starter-card icon="tina">
  <h3 slot="label">Tina CMS Blog Starter</h3>
  <a slot="links" href="https://ramidus.netlify.app">Live Demo</a>
  <a slot="links" href="https://github.com/jameslovallo/ramidus-starter--blog">Repo & ReadMe</a>
</starter-card>

## Project Structure

Global content like components, assets, layouts and your site's head are contained in the "@" folder. This naming convention keeps the folder first alphabetically so it's always easy to find.

<div class="tree">

- <tree-icon icon="home">@</tree-icon>
  - <tree-icon icon="assets">assets</tree-icon>
  - <tree-icon icon="components">components</tree-icon>
  - <tree-icon icon="css">css</tree-icon>
  - <tree-icon icon="js">build.js</tree-icon>
  - <tree-icon icon="js">main.js</tree-icon>
  - <tree-icon icon="json">head.json</tree-icon>
- <tree-icon icon="folder">docs</tree-icon>
  - <tree-icon icon="html">index.html</tree-icon>
- <tree-icon icon="html">index.html</tree-icon>

</div>

## Pages

Each page must have its own folder containing an index.html file, i.e. `/about/index.html`. Shared page elements are contained in the `<app-layout>` custom element.

Every page must include the following markup.

```html
<body>
  <app-layout>
    <!-- Page Content -->
  </app-layout>
  <script src="/@/main.js" type="module"></script>
</body>
```

You can include markdown on any page using the `<mark-down>` custom element.

```html
<mark-down src="/README.md"></mark-down>
```

### Linking to Pages

To enable SPA-style routing, just wrap links in an `<app-link>` element. You can set `preload="true"` if you want the linked page to be pre-fetched as soon as the current page loads.

```html
<app-link><a href="/about">About Us</a></app-link>
```

## Layout

A layout is a custom element containing the site's shared markup. Layouts should include the `<app-root>` element with a nested `<slot>` to load the page's content. Here is the default layout included with Ramidus.

```html
<!-- /@/app-layout.js -->
<app-nav></app-nav>

<main>
  <app-root>
    <slot></slot>
  </app-root>
</main>

<app-footer></app-footer>
```

The layout can be updated dynamically based on the page you are on. When each page loads, the path and current page nesting level are added as classes to the `<app-layout>` element, i.e. `class="about level-2"`. You can use these classes to style elements inside the layout element. In the template above, if you wanted to hide the footer on pages under the "about" path, you could use the following css in your layout.

```css
:host(.about) app-footer {
  display: none;
}
```

## Components

Global components go in the `/@/components` folder and are registered in `/@/main.js`. Ramidus's core components are built with [Ardi](ardi.netlify.app), but you can use any custom element framework you like (or none).

## Deployment

No build step is required to deploy this site: you can copy this project to a simple server and it will run just fine. You will probably still want to run `npm run build` before you deploy though.

### Benefits of Building

1. The site's `head` is included with each page instead of being generated when the first page loads.
2. Building will make it so the first page visited fades in after the globally-registered components have loaded, preventing [CLS](https://web.dev/cls/).

### Deployment Settings

| Build Command | Publish Directory |
| ------------- | ----------------- |
| npm run build | dist              |
