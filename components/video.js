import ardi, { css, html } from '../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-video',

  props: {
    pauselabel: [String, 'Pause'],
    playlabel: [String, 'Play'],
    poster: [String, null],
    src: [String],
  },

  state: () => ({ playing: false, progress: 0 }),

  playPause() {
    this.playing = !this.playing
    this.refs.video[this.playing ? 'play' : 'pause']()
  },

  template() {
    const pause = 'M14,19H18V5H14M6,19H10V5H6V19Z'
    const play = 'M8,5.14V19.14L19,12.14L8,5.14Z'
    const buttonLabel = `${
      this.playing ? this.pauselabel : this.playlabel
    } - ${Math.round(this.progress)}%`
    return html`
      <video
        ref="video"
        src=${this.src}
        poster=${this.poster}
        playsinline
        @click=${() => this.playPause()}
        @timeupdate=${(e) => {
          const { currentTime, duration } = e.target
          if (!isNaN(duration)) this.progress = (currentTime / duration) * 100
        }}
        @ended=${(e) => {
          this.playing = false
          this.progress = 0
          e.target.src = this.src
        }}
      ></video>
      <button
        part="button"
        aria-label=${buttonLabel}
        title=${buttonLabel}
        @click=${() => this.playPause()}
      >
        <svg part="icon" viewBox="0 0 24 24">
          <path d=${this.playing ? pause : play} />
        </svg>
        <svg part="progress" viewbox="0 0 42 42" fill="transparent">
          <circle
            cx="21"
            cy="21"
            r="15.91549430918954"
            stroke="var(--button-foreground)"
            stroke-dashoffset="25"
            stroke-dasharray=${`${this.progress} ${100 - this.progress}`}
            stroke-width="2px"
          />
        </svg>
      </button>
    `
  },

  styles: css`
    :host {
      aspect-ratio: var(--aspect-ratio, 16/9);
      position: relative;
    }
    video {
      aspect-ratio: var(--aspect-ratio, 16/9);
      display: block;
      height: auto;
      object-fit: cover;
      width: 100%;
    }
    [part='button'] {
      align-items: center;
      background: var(--button-background, dodgerblue);
      border: none;
      border-radius: 50%;
      bottom: 1rem;
      box-shadow: 0 0 2px black;
      cursor: pointer;
      display: flex;
      height: 3rem;
      left: 1rem;
      justify-content: center;
      overflow: hidden;
      position: absolute;
      width: 3rem;
    }
    [part='icon'] {
      display: block;
      fill: var(--button-foreground, white);
      height: 1.5rem;
      width: 1.5rem;
    }
    [part='progress'] {
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      transform-origin: center;
      transform: scale(125%);
      width: 100%;
    }
  `,
})
