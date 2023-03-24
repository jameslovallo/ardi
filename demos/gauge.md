# Gauge

This component demonstrates how to use state management and Ardi's `intersect` callback to apply animations when an element is scrolled into view.

<script src="/components/gauge.js" type="module"></script>

## Playground

<element-story tag="ardi-gauge">
<script type="application/json">
	{
		"label": {"type": "text"},
		"max": {"type": "number"},
		"min": {"type": "number"},
		"step": {"type": "number"},
		"value": {"type": "number"}
	}
</script>
<ardi-gauge label="MPH" max="120" min="0" step="10" value="90"></ardi-gauge>
</element-story>

## Javascript

[](../components/gauge.js ':include')
