import ardi, { html } from '//unpkg.com/ardi'

ardi({
  tag: 'ardi-forecast',

  props: {
    breakpoint: [Number, 500],
    label: [String, 'forecast'],
    lat: [String, '51.5002'],
    locale: [String, navigator.language],
    lon: [String, '-0.1262'],
    place: [String, 'London'],
    unit: [(v) => (['fahrenheit', 'f'].includes(v) ? 'fahrenheit' : 'celsius')],
  },

  state: () => ({
    current: {},
    forecast: Array(7).fill(''),
    small: undefined,
  }),

  ready() {
    new ResizeObserver(() =>
      requestAnimationFrame(
        () => (this.small = this.clientWidth <= this.breakpoint)
      )
    ).observe(this)
  },

  intersect(r) {
    if (!this.gotWeather && r > 0.2) {
      this.fetchForecast()
    }
  },

  propChange(prop) {
    if (
      prop.old &&
      prop.new &&
      ['lat', 'lon', 'locale', 'unit'].includes(prop.name)
    ) {
      this.fetchForecast()
    }
  },

  template() {
    const { icon, temp } = this.current

    return html`
      <!-- current conditions -->
      <div part="current">
        <div part="label">
          <b>${this.place}</b>
          <small>${this.label}</small>
        </div>
        <div part="current_icon">${icon ? html`<img src=${icon} />` : ''}</div>
        <div part="current_temp">${temp}</div>
      </div>
      <!-- 7-day forecast -->
      <div part="forecast" class=${this.small ? 'small' : null}>
        ${this.forecast.map(
          (day) => html`
            <div part="day">
              <div part="day_name">${day.name || ''}</div>
              <div part="day_icon">
                ${day.icon ? html`<img src=${day.icon} />` : ''}
              </div>
              <div part="day_temp">
                <span part="day_min">${day.min || ''}</span>
                <span part="day_max">${day.max || ''}</span>
              </div>
            </div>
          `
        )}
      </div>
    `
  },

  fetchForecast() {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${this.unit}&timezone=auto`
    )
      .then((res) => res.json())
      .then((conditions) => {
        // current
        const { current_weather, daily } = conditions
        this.current.icon = this.icon(current_weather.weathercode)
        const temp = Math.round(Number(current_weather.temperature))
        const unit = this.unit.charAt(0).toUpperCase()
        this.current.temp = temp + '°' + unit
        // render forecast
        this.forecast = daily.time.map((date, i) => ({
          name: new Date(date + 'T00:00').toLocaleDateString(this.locale, {
            weekday: 'long',
          }),
          icon: this.icon(daily.weathercode[i]),
          min: Math.round(daily.temperature_2m_min[i]) + '°',
          max: Math.round(daily.temperature_2m_max[i]) + '°',
        }))
        this.gotWeather = true
      })
  },

  css: /* css */ `
    :host,
    [part='current'],
    [part='forecast'] {
      align-items: center;
      display: flex;
      flex-flow: row wrap;
      flex-grow: 1;
      gap: 1rem;
    }
    :host {
      --divider-color: var(--border);
      --icon-shadow: 0 0 0 rgba(0, 0, 0, 0.5);
      --placeholder-color: var(--border);
    }
    img {
      display: block;
    }
    [part='current'] {
      justify-content: center;
    }
    [part='label'] {
      display: grid;
      line-height: 1.1;
      text-align: center;
    }
    [part='current_icon'] {
      filter: drop-shadow(var(--icon-shadow));
      height: 5rem;
      width: 5rem;
    }
    [part='current_temp'] {
      font-size: 2rem;
    }
    [part='day'] {
      align-items: center;
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      font-size: 0.75rem;
      font-weight: bold;
      gap: 0.5rem;
    }
    [part='day_icon'] {
      filter: drop-shadow(var(--icon-shadow));
      height: 3em;
      width: 3em;
    }
    [part='day_temp'] {
      display: flex;
      gap: 0.5rem;
    }
    [part='day_temp'] * {
      text-align: center;
      width: 2em;
    }
    [part='day_min'] {
      color: var(--min, #039be5);
    }
    [part='day_max'] {
      color: var(--max, #e53935);
    }
    /* small */
    [part='forecast'].small {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      display: block;
      flex-basis: 100%;
    }
    [part='forecast'].small [part='day'] {
      display: grid;
      font-size: 1rem;
      font-weight: normal;
      grid-template-columns: 1fr auto auto;
      justify-content: space-between;
      padding: 2px 8px;
    }
    [part='forecast'].small [part='day']:not(:last-of-type) {
      border-bottom: 1px solid var(--divider-color);
    }
    /* empty */
    [part='current_icon']:empty {
      background: var(--placeholder-color);
      border-radius: 50%;
    }
    [part='current_temp']:empty {
      background: var(--placeholder-color);
      border-radius: 1em;
      height: 1em;
      width: 2em;
    }
    [part^='day_']:empty {
      background: var(--placeholder-color);
      border-radius: 2em;
      height: 1em;
    }
    [part='day_icon']:empty {
      height: 2em;
      width: 2em;
    }
    [part='day_name']:empty {
      width: 4em;
    }
    [part='day_temp'] *:empty {
      display: inline-block;
      width: 2em;
    }
  `,

  icon(code) {
    const icons = {
      0: 'clear-day',
      1: 'partly-cloudy-day',
      2: 'cloudy',
      3: 'overcast',
      45: 'fog',
      48: 'fog',
      51: 'drizzle',
      53: 'drizzle',
      55: 'drizzle',
      56: 'sleet',
      57: 'sleet',
      61: 'rain',
      63: 'rain',
      65: 'rain',
      66: 'rain',
      67: 'rain',
      71: 'snow',
      73: 'snow',
      75: 'snow',
      77: 'snow',
      80: 'rain',
      81: 'rain',
      82: 'rain',
      85: 'snow',
      86: 'snow',
      95: 'thunderstorms-rain',
      96: 'hail',
      99: 'hail',
    }
    const icon = icons[code]
    return `https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/${icon}.svg`
  },
})
