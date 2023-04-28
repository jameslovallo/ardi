# Ramidus

Ramidus is a Single Page Application (SPA) template built for custom elements.

## Features

1. Instant page loading using `<app-root>` and `<app-link>` elements.
2. Templates can be shared between pages using a customizable `<app-layout>` component.
3. Easily embed markdown and syntax-highlighted files using the `<mark-down>` element.
4. Familiar conventions, similar to Next or Nuxt.

## Getting Started

Setup is easy and no tooling is required. You can scaffold your project using npx or simply download [this zip file](https://codeload.github.com/jameslovallo/ramidus/zip/refs/heads/main).

```sh
npx ramidus@latest && npm run dev
```

## Project Structure

The "@" folder contains global content like components, assets, layouts and your site's head. This convention keeps the folder first alphabetically so you don't lose it in your content.

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

To enable SPA-style routing, just wrap links in an `<app-link>` element.

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

## Components

Global components live in `/@/components` and are registered in `/@/main.js`. Ramidus's core components are built with [Ardi](ardi.netlify.app), but you can use any custom element framework you like (or none).

## Deployment

No build step is required to deploy this site: you can copy this project to a simple server and it will run just fine. You will probably still want to run `npm run build` before you deploy though.

### Benefits of Building

1. The site's `head` is included with each page instead of being generated when the first page loads.
2. Building will make it so the first page visited fades in after the globally-registered components have loaded, preventing [CLS](https://web.dev/cls/).

### Deployment Settings

| Build Command | Publish Directory |
| ------------- | ----------------- |
| npm run build | dist              |
