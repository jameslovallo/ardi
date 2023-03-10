# Accordion

This component provides a simple example of how to use props and state in Ardi.

<script src="/components/accordion.js" type="module"></script>

<style>
	ardi-accordion-group {
		max-width: var(--demo-max-width);
		width: 100%;
	}
	.markdown-section ardi-accordion-group img {
		max-width: unset;
	}
</style>

## Playground

<element-story>
<script type="application/json">
  {
    "multiple": {
      "type": "boolean"
    }
  }
</script>
<ardi-accordion-group multiple="false">
<ardi-accordion summary="Text content" open="true">
	<div>
		<p>Meow hate dogs or just going to dip my paw in your coffee and do a taste test - oh never mind i forgot i don't like coffee - you can have that back now twitch tail in permanent irritation. One of these days i'm going to get that red dot, just you wait and see plop down in the middle where everybody walks.</p>
	</div>
</ardi-accordion>
<ardi-accordion summary="Image content">
	<img src="//picsum.photos/300/168" alt="">
</ardi-accordion>
<ardi-accordion summary="Video content">
	<video src="https://joy1.videvo.net/videvo_files/video/free/2013-08/large_watermarked/hd0992_preview.mp4" autoplay loop muted></video>
</ardi-accordion>
</ardi-accordion-group>
</element-story>

## Javascript

[](../components/accordion.js ':include')
