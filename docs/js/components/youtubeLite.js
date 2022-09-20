import ardi from '/js/ardi-min.js'

export default class youtubeLite extends ardi {
	setup() {
		this.shadow = true
		this.props = { vid: String }
	}

	loadPlayer() {
		this.refs.button.remove()
		this.DOM.innerHTML += /* html */ `
		<iframe ref="player"
			src="https://www.youtube.com/embed/${this.vid}?autoplay=1"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		></iframe>`
	}

	template() {
		const bgPath =
			'M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z'
		return /* html */ `
		<button @click="loadPlayer" part="button" ref="button" aria-label="Play Video">
			<svg part="icon" version="1.1" viewBox="0 0 68 48">
				<path part="icon-bg" d="${bgPath}"></path>
				<path part="icon-fg" d="M 45,24 27,14 27,34"></path>
			</svg>
		</button>`
	}

	styles() {
		return /* css */ `
		:host {
			aspect-ratio: 16/9;
			background-image: url(https://img.youtube.com/vi/${this.vid}/hqdefault.jpg);
			background-position: center center;
			background-size: cover;
			display: grid;
			place-items: center;
		}
		[part=button] {
			background: transparent;
			border: none;
			cursor: pointer;
			padding: 0;
			width: 68px;
		}
		[part=icon] { display: block }
		[part=icon-bg] { fill: rgba(33,33,33,0.8) }
		[part=icon-fg] { fill: #fff }
		[part=button]:hover [part=icon-bg] { fill: red }
		[ref=player] { grid-area: 1/-1; height: 100%; width: 100%; }`
	}
}
