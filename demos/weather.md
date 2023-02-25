# Weather Forecast

This component demonstrates how to lazy-load data after the component is scrolled into view (using Ardi's `intersect` callback).

<script src="/components/weather.js" type="module"></script>

<element-story>
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
  <ardi-weather lat="42.375" lon="-83" place="Detroit" unit="fahrenheit" label="forecast" locale="en-us" breakpoint="500" style="width: 100%"></ardi-weather>
</element-story>

## Javascript

[](../components/weather.js ':include')
