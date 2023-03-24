# Forecast

This component demonstrates how to lazy-load data after the component is scrolled into view (using Ardi's `intersect` callback).

<script src="/components/forecast.js" type="module"></script>

## Playground

<element-story tag="ardi-forecast">
  <script type="application/json">
    {
      "place": {"type": "text"},
      "label": {"type": "text"},
      "lat": {"type": "text"},
      "lon": {"type": "text"},
      "unit": {"type": "list", "options": ["fahrenheit", "celsius"]},
      "locale": {"type": "text"},
      "breakpoint": {"type": "number"}
    }
  </script>
  <ardi-forecast lat="42.375" lon="-83" place="Detroit" unit="fahrenheit" label="forecast" locale="en-us" breakpoint="500" style="width: 100%"></ardi-forecast>
</element-story>

## Javascript

[](../components/forecast.js ':include')
