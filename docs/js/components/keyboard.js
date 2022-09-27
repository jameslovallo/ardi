import ardi, { html, svg } from '/js/ardi.js'

ardi({
	component: 'keyboard-demo',

	props: {
		instrument: [String, 'piano'],
		octaves: [Number, 4],
		start: [Number, 2],
		sustain: [Number, 3],
	},

	ready() {
		this.recording = false
		this.tracks = []
	},

	intersect(r) {
		if (!this.synthLoaded && r > 0.2) {
			const synthTag = document.createElement('script')
			synthTag.src =
				'https://cdn.jsdelivr.net/gh/keithwhor/audiosynth/audiosynth.js'
			document.body.appendChild(synthTag)
			this.synthLoaded = true
		}
	},

	record() {
		this.recording = true
		this.render()
		this.currentTrack = { startTime: new Date().getTime(), track: [] }
	},

	stop() {
		this.recording = false
		this.tracks.push(this.currentTrack.track)
		setTimeout(this.render())
	},

	playNote(instrument, note, octave, sustain) {
		Synth.play(instrument, note, octave, sustain)
		this.recording &&
			this.currentTrack.track.push({
				timestamp: new Date().getTime() - this.currentTrack.startTime,
				note: {
					instrument: instrument,
					note: note,
					octave: octave,
					sustain: sustain,
				},
			})
	},

	playTrack(track) {
		track.forEach((entry) => {
			const { instrument, note, octave, sustain } = entry.note
			setTimeout(
				() => this.playNote(instrument, note, octave, sustain),
				entry.timestamp
			)
		})
	},

	template() {
		return html`
			<div part="controls">
				<select @change=${(e) => (this.instrument = e.target.value)}>
					<option value="piano">Piano</option>
					<option value="organ">Organ</option>
					<option value="acoustic">Guitar</option>
				</select>
				<div>
					<label>
						Octaves:
						<input
							max=${8 - this.start}
							min=${0}
							type="number"
							value=${this.octaves}
							@change=${(e) => (this.octaves = e.target.value)}
						/>
					</label>
					<label>
						Start At:
						<input
							max=${8 - this.octaves}
							min=${0}
							type="number"
							value=${this.start}
							@change=${(e) => (this.start = e.target.value)}
						/>
					</label>
					<label>
						Sustain:
						<input
							max=${10}
							min=${1}
							type="number"
							value=${this.sustain}
							@change=${(e) => (this.sustain = e.target.value)}
						/>
					</label>
					<button
						onclick=${() => (this.recording ? this.stop() : this.record())}
					>
						${this.recording ? 'Stop' : 'Record'}
					</button>
				</div>
			</div>

			<div part="keys">
				${Array.from({ length: this.octaves }).map(
					(octaves, octave) => html`
						<div part="octave" style=${`z-index: ${this.octaves - octave}`}>
							${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(
								(note) => html`
									<div part="note">
										<button
											part="white-key"
											onclick=${() =>
												this.playNote(
													this.instrument,
													note,
													octave + this.start,
													this.sustain
												)}
										>
											${note + (octave + this.start)}
										</button>
										${['C', 'D', 'F', 'G', 'A'].includes(note)
											? html`
													<button
														part="black-key"
														onclick=${() =>
															this.playNote(
																this.instrument,
																note + '#',
																octave + this.start,
																this.sustain
															)}
													></button>
											  `
											: ''}
									</div>
								`
							)}
						</div>
					</div>`
				)}
			</div>

			${this.tracks.length > 0
				? html`
						<div part="tracks">
							${this.tracks.map(
								(track, i) => html`
									<div part="track">
										${this.icons.wave} Track ${i + 1}
										<button
											onclick=${() => this.playTrack(this.tracks[i])}
											title=${`Play Track ${i + 1}`}
										>
											${this.icons.play}
										</button>
										<button
											onclick=${() => this.tracks.splice(i, 1) && this.render()}
											title=${`Delete Track ${i + 1}`}
										>
											${this.icons.trash}
										</button>
									</div>
								`
							)}
						</div>
				  `
				: ''}

			<style>
				:host {
					background: var(--bg, #000);
					border-radius: 8px;
					display: grid;
					font-family: sans-serif;
					gap: 8px;
					padding: 8px;
				}
				:host * {
					box-sizing: border-box;
				}
				[part='controls'] {
					display: flex;
					gap: 1rem;
					justify-content: space-between;
					padding: 4px 0;
				}
				[part='controls'] label,
				[part='controls'] input,
				[part='controls'] select {
					background: transparent;
					border: none;
					color: #ddd;
					font-size: 12px;
				}
				[part='controls'] option {
					color: initial;
				}
				[part='controls'] input[type='number'] {
					width: 2.5em;
				}
				[part='keys'] {
					border-radius: 4px;
					column-gap: 4px;
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
					overflow: hidden;
				}
				[part='octave'] {
					display: grid;
					flex-grow: 1;
					grid-template-columns: repeat(7, 1fr);
					gap: 4px;
					position: relative;
				}
				[part='octave']:before {
					content: '';
					background: linear-gradient(
						to bottom,
						rgba(0, 0, 0, 0.75),
						transparent
					);
					height: 5%;
					position: absolute;
					top: 100%;
					width: 100%;
				}
				[part='note'] {
					padding-top: 400%;
					position: relative;
				}
				[part='white-key'],
				[part='black-key'] {
					border: 0;
					border-bottom-left-radius: 4px;
					border-bottom-right-radius: 4px;
					position: absolute;
				}
				[part='white-key'] {
					align-items: flex-end;
					background: var(--white-key, #fff);
					display: flex;
					font-size: 12px;
					height: 100%;
					justify-content: center;
					left: 0;
					padding-bottom: 6px;
					text-transform: uppercase;
					top: 0;
					user-select: none;
					width: 100%;
				}
				[part='white-key']:active {
					background: var(--white-key-active, #eee);
				}
				[part='black-key'] {
					background: var(--black-key, #000);
					height: 66.66%;
					left: calc(75% + 2px);
					position: absolute;
					top: 0;
					width: 50%;
					z-index: 1;
				}
				[part='black-key']:active {
					background: var(--black-key-active, #444);
				}
				[part='tracks'] {
					color: white;
					display: flex;
					flex-flow: row-wrap;
					font-size: 14px;
					gap: 2rem;
				}
				[part='track'] {
					align-items: center;
					display: flex;
					gap: 8px;
				}
				[part='track'] button {
					background: none;
					border: none;
					color: white;
					padding: 0;
				}
				[part='track'] svg {
					display: block;
					fill: currentcolor;
					width: 16px;
				}
			</style>
		`
	},

	icons: {
		play: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>`,
		trash: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`,
		wave: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 24px"><path d="M22 12L20 13L19 14L18 13L17 16L16 13L15 21L14 13L13 15L12 13L11 17L10 13L9 22L8 13L7 19L6 13L5 14L4 13L2 12L4 11L5 10L6 11L7 5L8 11L9 2L10 11L11 7L12 11L13 9L14 11L15 3L16 11L17 8L18 11L19 10L20 11L22 12Z" /></svg>`,
	},
})
