import ardi from '/js/ardi-min.js'

export default class weather extends ardi {
	setup() {
		this.shadow = true
		this.forecastData = Array(7).fill('')

		this.props = {
			breakpoint: (v) => (v ? Number(v) : 500),
			label: 'forecast',
			lat: '51.5002',
			locale: navigator.language,
			lon: '-0.1262',
			place: 'London',
			unit: (v) => (['fahrenheit', 'f'].includes(v) ? 'fahrenheit' : 'celsius'),
		}
	}

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
		return `<img src="https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/${icon}.svg">`
	}

	day(day) {
		return /* html */ `
		<div part="day">
			<div part="day_name">${day.name || ''}</div>
			<div part="day_icon">${day.icon || ''}</div>
			<div part="day_temp">
				<span part="day_min">${day.min ? day.min + '°' : ''}</span>
				<span part="day_max">${day.max ? day.max + '°' : ''}</span>
			</div>
		</div>`
	}

	forecast(data) {
		return data.map((d) => this.day(d)).join('')
	}

	fetchForecast() {
		console.log(this.unit)
		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${this.unit}&timezone=auto`
		)
			.then((res) => res.json())
			.then((data) => {
				// current
				const { current_weather, daily } = data
				this.refs.current_icon.innerHTML = this.icon(current_weather.weathercode)
				const temp = Math.round(Number(current_weather.temperature))
				const unit = this.unit.charAt(0).toUpperCase()
				this.refs.current_temp.innerHTML = temp + '°' + unit
				// render forecast
				this.refs.forecast.innerHTML = this.forecast(
					daily.time.map((date, i) => ({
						name: new Date(date + 'T00:00').toLocaleDateString(this.locale, { weekday: 'long' }),
						icon: this.icon(daily.weathercode[i]),
						min: Math.round(daily.temperature_2m_min[i]),
						max: Math.round(daily.temperature_2m_max[i]),
					}))
				)
			})
	}

	ready() {
		new ResizeObserver(() =>
			this.clientWidth <= this.breakpoint
				? this.refs.forecast.classList.add('small')
				: this.refs.forecast.classList.remove('small')
		).observe(this)
	}

	intersect(r) {
		if (!this.gotWeather && r > 0.2) {
			this.fetchForecast()
			this.gotWeather = true
		}
	}

	template() {
		return /* html */ `
		<div part="current">
			<div part="label">
				<b>${this.place}</b><br/>
				<small>${this.label}</small>
			</div>
			<div part="current_icon" ref="current_icon"></div>
			<div part="current_temp" ref="current_temp"></div>
		</div>
		<div part="forecast" ref="forecast">
			${this.forecast(this.forecastData)}
		</div>`
	}

	styles() {
		const flexRow = `
			align-items: center;
			display: flex;
			flex-flow: row wrap;
			flex-grow: 1;
			gap: 1rem;
		`
		return /* css */ `
		:host {
			--divider-color: rgba(125,125,125,.5);
			--icon-shadow: 0 0 0 rgba(0,0,0,0.5);
			--placeholder-color: rgba(125,125,125,.5);
			${flexRow}
		}
		img { display: block }
		[part=current] {
			${flexRow}
			justify-content: center;
		}
		[part=label] { text-align: center }
		[part=current_icon] {
			filter: drop-shadow(var(--icon-shadow));
			height: 5rem;
			width: 5rem;
		}
		[part=current_temp] { font-size: 2rem }
		[part=forecast] { ${flexRow} }
		[part=day] {
			align-items: center;
			display: flex;
			flex-direction: column;
			flex-grow: 1;
			font-size: .75rem;
			font-weight: bold;
			gap: .5rem;
		}
		[part=day_icon] {
			filter: drop-shadow(var(--icon-shadow));
			height: 3em;
			width: 3em;
		}
		[part=day_temp] {
			display: flex;
			gap: .5rem;
		}
		[part=day_temp] * {
			text-align: center;
			width: 2em;
		}
		[part=day_min] { color: var(--min, dodgerblue) }
		[part=day_max] { color: var(--max, red) }
		/* small */
		[part=forecast].small {
			display: block;
			flex-basis: 100%;
		}
		[part=forecast].small [part=day] {
			border-top: 1px solid var(--divider-color);
			display: grid;
			font-size: 1rem;
			font-weight: normal;
			grid-template-columns: 1fr auto auto;
			justify-content: space-between;
			padding: .25rem 0;
		}
		[part=forecast].small [part=day]:last-of-type {
			border-bottom: 1px solid var(--divider-color);
		}
		/* empty */
		[part=current_icon]:empty {
			background: var(--placeholder-color);
			border-radius: 50%;
		}
		[part=current_temp]:empty {
			background: var(--placeholder-color);
			border-radius: 1em;
			height: 1em;
			width: 2em;
		}
		[part^=day_]:empty {
			background: var(--placeholder-color);
			border-radius: 2em;
			height: 1em;
		}
		[part=day_icon]:empty { height: 2em; width: 2em; }
		[part=day_name]:empty { width: 4em }
		[part=day_temp] *:empty { display: inline-block; width: 2em; }`
	}
}
