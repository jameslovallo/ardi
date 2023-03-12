# Plyr

This component demonstrates conditional rendering and disabling the Shadow DOM.

<script src="/components/plyr.js" type="module"></script>

<style>
	ardi-plyr {
		display: block;
		width: 100%;
	}
</style>

## Playground

<element-story>
  <script type="application/json">
    {
      "src": {
        "type": "text"
      },
      "type": {
        "type": "list",
        "options": ["youtube", "vimeo", "video", "audio"]
      }
    }
  </script>
  <ardi-plyr type="youtube" src="bTqVqk7FSmY"></ardi-plyr>
</element-story>

## Javascript

[](../components/plyr.js ':include')
