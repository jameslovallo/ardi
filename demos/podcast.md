# Podcast Embed

This component demonstrates props, state, loops, conditional rendering, event handlers, and how to use the `ready` callback to fetch data when the component is initialized.

<script src="/components/podcast.js" type="module"></script>

## Playground

<element-story>
<script type="application/json">
  {
		"feed": {"type": "text"},
		"perpage": {"type": "number"}
  }
</script>
<ardi-podcast feed="https://feeds.megaphone.fm/howto" perpage="5"></ardi-podcast>
</element-story>

## Javascript

[](../components/podcast.js ':include')
