import ardi, { html, svg } from '/@/assets/ardi-min.js'

ardi({
  tag: 'ardi-keyboard',

  props: {
    instrument: [(v) => (v === 'sitar' ? 'acoustic' : v), 'piano'],
    octaves: [Number, 2],
    start: [Number, 3],
    sustain: [Number, 2],
  },

  state: () => ({
    recording: false,
    tracks: [],
  }),

  ready() {
    document.body.addEventListener('mousedown', () => (this.mousedown = true))
    document.body.addEventListener('mouseup', () => (this.mousedown = false))
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
    this.currentTrack = { startTime: new Date().getTime(), track: [] }
  },

  stop() {
    this.recording = false
    this.tracks.push(this.currentTrack.track)
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
          <option
            selected=${this.instrument === 'piano' ? true : null}
            value="piano"
          >
            Piano
          </option>
          <option
            selected=${this.instrument === 'organ' ? true : null}
            value="organ"
          >
            Organ
          </option>
          <option
            selected=${this.instrument === 'acoustic' ? true : null}
            value="acoustic"
          >
            Sitar
          </option>
        </select>
        <div>
          <select @change=${(e) => (this.octaves = e.target.value)}>
            <optgroup label="Octaves">
              ${Array.from({ length: 8 - this.start }).map(
                (a, i) => html`
                  <option
                    selected=${i === this.octaves - 1 ? true : null}
                    value=${i + 1}
                  >
                    ${i + 1}
                  </option>
                `
              )}
            </optgroup>
          </select>
          <select @change=${(e) => (this.start = e.target.value)}>
            <optgroup label="Starting Octave">
              ${Array.from({ length: 8 - this.octaves }).map(
                (a, i) => html`
                  <option
                    selected=${i === this.start - 1 ? true : null}
                    value=${i + 1}
                  >
                    ${i + 1}
                  </option>
                `
              )}
            </optgroup>
          </select>
          <select @change=${(e) => (this.sustain = e.target.value)}>
            <optgroup label="Sustain">
              ${Array.from({ length: 8 }).map(
                (a, i) => html`
                  <option
                    selected=${i === this.sustain - 1 ? true : null}
                    value=${i + 1}
                  >
                    ${i + 1}
                  </option>
                `
              )}
            </optgroup>
          </select>
          <button
            @click=${() => (this.recording ? this.stop() : this.record())}
          >
            ${this.recording ? 'Stop' : 'Record'}
          </button>
        </div>
      </div>
      <div part="keys">
        ${Array.from({ length: this.octaves }).map(
          (a, i) => html`
            <div part="octave" style=${`z-index: ${this.octaves - i}`}>
              ${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => {
                const press = (sharp) => {
                  this.playNote(
                    this.instrument,
                    note + (sharp ? '#' : ''),
                    i + this.start,
                    this.sustain
                  )
                }
                return html`
                  <div part="note">
                    <button
                      part="white-key"
                      @mousedown=${() => press()}
                      @mouseover=${() => this.mousedown && press()}
                    >
                      ${note + (i + this.start)}
                    </button>
                    ${['C', 'D', 'F', 'G', 'A'].includes(note)
                      ? html`
                          <button
                            part="black-key"
                            @mousedown=${() => press(true)}
                            @mouseover=${() => this.mousedown && press(true)}
                          ></button>
                        `
                      : ''}
                  </div>
                `
              })}
            </div>
          `
        )}
      </div>
      ${Object.keys(this.tracks).length > 0
        ? html`
            <div part="tracks">
              ${Object.keys(this.tracks).map(
                (track, i) => html`
                  <div part="track">
                    ${this.icons.wave} Track ${i + 1}
                    <button
                      @click=${() => this.playTrack(this.tracks[track])}
                      title=${`Play Track ${i + 1}`}
                    >
                      ${this.icons.play}
                    </button>
                    <button
                      @click=${() => delete this.tracks[track]}
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
    `
  },

  css: /* css */ `
    :host {
      background: var(--bg, #000);
      border: 1px solid var(--border);
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
    [part='controls'] > select {
      margin-left: -4px;
    }
    [part='controls'] > div {
      display: flex;
      gap: 1rem;
    }
    [part='controls'] label,
    [part='controls'] input,
    [part='controls'] select {
      background: transparent;
      border: none;
      color: #ddd;
      font-size: 14px;
    }
    [part='controls'] > div select {
      width: 2em;
    }
    [part='controls'] optgroup {
      color: initial;
      display: block;
      padding: 1em;
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
      color: #aaa;
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
      color: #fff;
      column-gap: 2rem;
      display: flex;
      flex-flow: row wrap;
      font-size: 14px;
      row-gap: 8px;
    }
    [part='track'] {
      align-items: center;
      display: flex;
      flex-basis: 150px;
      gap: 8px;
    }
    [part='track'] button {
      background: none;
      border: none;
      color: #fff;
      padding: 0;
    }
    [part='track'] svg {
      display: block;
      fill: currentcolor;
      width: 16px;
    }  
  `,

  icons: {
    play: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,5.14V19.14L19,12.14L8,5.14Z" /></svg>`,
    trash: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z" /></svg>`,
    wave: svg`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 24px"><path d="M22 12L20 13L19 14L18 13L17 16L16 13L15 21L14 13L13 15L12 13L11 17L10 13L9 22L8 13L7 19L6 13L5 14L4 13L2 12L4 11L5 10L6 11L7 5L8 11L9 2L10 11L11 7L12 11L13 9L14 11L15 3L16 11L17 8L18 11L19 10L20 11L22 12Z" /></svg>`,
  },
})
