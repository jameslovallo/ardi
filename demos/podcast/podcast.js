import { extract } from 'https://unpkg.com/@extractus/feed-extractor@latest/dist/feed-extractor.esm.js'
import ardi, { css, html, svg } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'podcast-embed',

  props: {
    feed: [String, 'https://feeds.megaphone.fm/RECU9765916949'],
    nextpagelabel: [String, 'Next Page'],
    pagelabel: [String, 'Page'],
    pagesize: [Number, 10],
    pauselabel: [String, 'pause'],
    playlabel: [String, 'play'],
    prevpagelabel: [String, 'Prevous Page'],
  },

  state: () => ({
    feedJSON: {},
    nowPlaying: null,
    page: 0,
    paused: true,
  }),

  fetchFeed() {
    extract(this.feed, {
      getExtraFeedFields: (feed) => {
        return { image: feed?.image?.url, author: feed['itunes:author'] }
      },
      getExtraEntryFields: (entry) => {
        return {
          duration: entry['itunes:duration'],
          date: entry.pubDate,
          track: entry.enclosure['@_url'],
        }
      },
    }).then((json) => {
      this.feedJSON = json
    })
  },

  formatDuration(duration) {
    let hours, minutes
    if (typeof duration === 'string' && duration.includes(':')) {
      duration = duration.split(':')
      hours = Number(duration[0])
      minutes = Number(duration[1])
    } else {
      hours = Math.floor(duration / 60 / 60)
      minutes = Math.floor(duration / 60)
    }
    hours = hours > 0 ? `${hours}h ` : ''
    return `${hours}${minutes}m`
  },

  setColor() {
    const RGBToHSL = (r, g, b) => {
      r /= 255
      g /= 255
      b /= 255
      const l = Math.max(r, g, b)
      const s = l - Math.min(r, g, b)
      const h = s
        ? l === r
          ? (g - b) / s
          : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
        : 0
      return [
        60 * h < 0 ? 60 * h + 360 : 60 * h,
        100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
        (100 * (2 * l - s)) / 2,
      ]
    }
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.onload = () => {
      import('https://cdn.skypack.dev/fast-average-color@9.3.0').then((m) => {
        const fac = new m.FastAverageColor()
        fac.getColorAsync(image).then((color) => {
          const {
            value: [r, b, g],
          } = color
          const [h, s, l] = RGBToHSL(r, b, g)
          this.style.background = `hsl(${h} ${s}% 20%)`
          this.style.setProperty('--dark', `hsl(${h} ${s}% 20%)`)
          this.style.setProperty('--light', `hsl(${h} ${s}% 90%)`)
        })
      })
    }
    image.src = this.feedJSON.image.split('?')[0]
  },

  created() {
    this.fetchFeed()
  },

  changed(prop) {
    prop.old && prop.old && prop.name === 'feed' && this.fetchFeed()
  },

  togglePlayback(track) {
    const { player } = this.refs
    if (this.nowPlaying !== track) {
      this.nowPlaying = track
      const play = () => {
        player.play()
        this.paused = false
        player.removeEventListener('canplay', play)
      }
      player.addEventListener('canplay', play)
    } else {
      this.paused = !this.paused
      player[player.paused ? 'play' : 'pause']()
    }
  },

  icon(name) {
    const icons = {
      leftArrow: 'M20,9V15H12V19.84L4.16,12L12,4.16V9H20Z',
      play: 'M8,5.14V19.14L19,12.14L8,5.14Z',
      pause: 'M14,19H18V5H14M6,19H10V5H6V19Z',
      rightArrow: 'M4,15V9H12V4.16L19.84,12L12,19.84V15H4Z',
    }
    return svg`
      <svg viewBox="0 0 24 24">
        <path d=${icons[name]} />
      </svg>
    `
  },

  template() {
    const { title, author, link, description, entries, image } = this.feedJSON
    const linkLabel = new URL(link).hostname
    const lastPage = Math.floor(entries?.length / this.pagesize) + 1
    return html`
      <audio ref="player" src=${this.nowPlaying} />
      <div part="header">
        ${image
          ? html`
              <img
                part="image"
                src=${image}
                ref="image"
                @load=${() => this.setColor()}
              />
            `
          : ''}
        <div part="header-wrapper">
          ${title ? html`<p part="title">${title}</p>` : ''}
          ${author ? html`<p part="author">${author}</p>` : ''}
          ${link ? html`<a part="link" href=${link}>${linkLabel}</a>` : ''}
        </div>
      </div>
      ${description ? html`<p part="description">${description}</p>` : ''}
      <div part="episodes">
        ${entries
          .filter(
            (episode, i) =>
              i >= this.page * this.pagesize &&
              i < this.page * this.pagesize + this.pagesize
          )
          .map((episode, i) => {
            const { title, track, duration, date } = episode
            return html`
              <div part="episode">
                <button
                  part="play-button"
                  @click=${() => this.togglePlayback(track)}
                  aria-label=${this.nowPlaying === track && !this.paused
                    ? this.pauselabel
                    : this.playlabel}
                >
                  ${this.icon(
                    this.nowPlaying === track && !this.paused ? 'pause' : 'play'
                  )}
                </button>
                <div part="episode-wrapper">
                  <div part="episode-title">${title}</div>
                  <div part="episode-meta">
                    <div part="episode-date">
                      ${new Date(date).toLocaleDateString()}
                    </div>
                    <div part="episode-duration">
                      ${this.formatDuration(duration)}
                    </div>
                  </div>
                </div>
              </div>
            `
          })}
      </div>
      <div part="pagination">
        <button
          part="pagination-prev"
          @click=${() => this.page--}
          disabled=${this.page > 0 ? null : true}
          aria-label=${this.prevpagelabel}
        >
          <slot name="prev-icon"> ${this.icon('leftArrow')} </slot>
        </button>
        ${this.pagelabel} ${this.page + 1} / ${lastPage}
        <button
          part="pagination-next"
          @click=${() => this.page++}
          disabled=${this.page + 1 < lastPage ? null : true}
          aria-label=${this.nextpagelabel}
        >
          <slot name="next-icon"> ${this.icon('rightArrow')} </slot>
        </button>
      </div>
    `
  },

  styles: css`
    :host {
      border: 1px solid var(--border);
      border-radius: 1rem;
      color: white;
      color-scheme: light;
      display: grid;
      gap: 1.5rem;
      overflow: hidden;
      padding: 1rem;
    }
    button {
      border: 1px solid var(--border);
      border-radius: 4px;
    }
    button:not([disabled]) {
      cursor: pointer;
    }
    svg {
      display: block;
      fill: currentcolor;
      height: 1rem;
      width: 1rem;
    }
    [part='header'] {
      align-items: flex-end;
      display: grid;
      gap: 1rem;
      grid-template-columns: 8rem 1fr;
    }
    [part='image'] {
      display: block;
      width: 100%;
    }
    [part='title'],
    [part='author'],
    [part='link'],
    [part='description'],
    [part='episode-title'],
    [part='episode-meta'] {
      font-size: 0.8rem;
      line-height: 1.5;
      margin: 0;
    }
    [part='header-wrapper'],
    [part='episode-wrapper'] {
      min-width: 0;
      max-width: 100%;
    }
    [part='header-wrapper'] {
      display: grid;
      gap: 0.75rem;
    }
    [part='header-wrapper'] > * {
      line-height: 1;
    }
    [part='title'] {
      font-size: 1rem;
      font-weight: bold;
    }
    [part='link'] {
      color: var(--light);
      display: block;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    [part='description'] {
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      display: -webkit-box;
      overflow: hidden;
    }
    [part='episodes'] {
      display: grid;
      gap: 0.75rem;
    }
    [part='episode'] {
      align-items: center;
      display: flex;
      gap: 1rem;
      min-width: 0;
    }
    [part='play-button'] {
      background: var(--light);
      border-radius: 50%;
      color: var(--dark);
      display: grid;
      flex-shrink: 0;
      height: 2rem;
      padding: 0;
      place-items: center;
      width: 2rem;
    }
    [part='episode-title'] {
      font-weight: bold;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    [part='episode-meta'] {
      color: var(--light);
      display: flex;
      gap: 1em;
      opacity: 0.8;
    }
    [part='pagination'] {
      align-items: center;
      display: flex;
      font-size: 0.8rem;
      justify-content: space-between;
    }
    [part='pagination'] button {
      background: var(--light);
      color: var(--dark);
    }
    [part='pagination'] button[disabled] {
      opacity: 0.8;
    }
  `,
})
