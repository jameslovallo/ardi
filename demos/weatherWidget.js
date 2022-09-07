export default {
	component: 'weather-widget',
	shadow: true,
	props() {
		return {
			breakpoint: (v) => (v ? Number(v) : 600),
			label: 'Forecast',
			lat: '42.375',
			locale: navigator.language,
			lon: '-83',
			place: 'Detroit',
			unit: 'fahrenheit',
		}
	},
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
		return `
			<img src="https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/${icon}.svg">`
	},
	day(day) {
		return /* html */ `
			<div part="day">
				<div part="day_name">${day.name || ''}</div>
				<div part="day_icon">${day.icon || ''}</div>
				<div part="day_temp">
					<span part="day_min">${day.min ? day.min + '°' : ''}</span>
					<span part="day_max">${day.max ? day.max + '°' : ''}</span>
				</div>
			</div>
		`
	},
	forecastPlaceholder() {
		// prettier-ignore
		return Array(7).fill('').map((d) => this.day(d)).join('')
	},
	getWeather() {
		const dayName = (date) => {
			const dateArr = date.split('-')
			dateArr[2] = Number(dateArr[2])
			date = dateArr.join('-')
			return new Date(date).toLocaleDateString(this.locale, { weekday: 'long' })
		}

		fetch(
			`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${this.unit}&timezone=America%2FNew_York`
		)
			.then((res) => res.json())
			.then((data) => {
				const { current_weather, daily } = data
				this.refs.current_icon.innerHTML = this.icon(current_weather.weathercode)
				this.refs.current_temp.innerHTML =
					Math.round(Number(current_weather.temperature)) + '°' + this.unit.charAt(0).toUpperCase()
				this.refs.forecast.innerHTML = daily.time
					.map((date, i) =>
						this.day({
							name: dayName(date),
							icon: this.icon(daily.weathercode[i]),
							min: Math.round(daily.temperature_2m_min[i]),
							max: Math.round(daily.temperature_2m_max[i]),
						})
					)
					.join('')
			})
	},
	ready() {
		new ResizeObserver(() =>
			this.clientWidth <= this.breakpoint
				? this.refs.forecast.classList.add('small')
				: this.refs.forecast.classList.remove('small')
		).observe(this)
	},
	intersect() {
		this.getWeather()
	},
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
				${this.forecastPlaceholder()}
			</div>
		`
	},
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
				--current-icon-size: 5rem;
				--icon-shadow: 0 0 0 rgba(0,0,0,0.5);
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
				height: var(--current-icon-size);
				width: var(--current-icon-size);
			}
			[part=current_temp] { font-size: 2rem }
			[part=forecast] { ${flexRow} }
			[part=forecast].small {
				display: block;
				flex-basis: 100%;
			}
			[part=forecast].small [part=day] {
				display: grid;
				grid-template-columns: 1fr 1fr auto;
				justify-content: space-between;
				flex-grow: 1;
			}
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
				gap: .75rem;
			}
			[part=day_min] { color: var(--min, #1279c2) }
			[part=day_max] { color: var(--max, #dc2b2b) }
			[part^=day_]:empty {
				background: #aaa;
				border-radius: 1em;
				height: 1em;
			}
			[part=day_icon]:empty { border-radius: 2em; height: 2em; width: 2em; }
			[part=day_name]:empty { width: 4em }
			[part=day_temp] *:empty { display: inline-block; width: 2em; }
		`
	},
}
