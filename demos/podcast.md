# Podcast Embed

This component demonstrates props, state, loops, conditional rendering, event handlers, and how to use the `ready` callback to fetch data when the component is initialized.

<script src="/components/podcast.js" type="module"></script>

## Playground

<element-story tag="ardi-podcast">
<script type="application/json">
  {
		"feed": {"type": "text"},
		"pagesize": {"type": "number"},
		"playlabel": {"type": "text"},
		"pauselabel": {"type": "text"},
		"pagelabel": {"type": "text"},
		"prevpagelabel": {"type": "text"},
		"nextpagelabel": {"type": "text"}
  }
</script>
<ardi-podcast feed="https://feeds.megaphone.fm/howto" pagesize="5" playlabel="play" pauselabel="pause" pagelabel="Page" prevpagelabel="Previous Page" nextpagelabel="Next Page"></ardi-podcast>
</element-story>

## Javascript

[](../components/podcast.js ':include')
