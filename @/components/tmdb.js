import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'tmdb-trending',

  props: {
    time: [String, 'day'], // day, week
    type: [String, 'tv'], // tv, movie, all
  },

  state: () => ({ results: [] }),

  fetchTrending() {
    fetch(
      [
        'https://api.themoviedb.org/3/trending',
        '/' + this.type,
        '/' + this.time,
        '?api_key=f24e1216d78e7a935fcd5ab6bda1167b',
      ].join('')
    )
      .then((res) => res.json())
      .then((data) => (this.results = data.results))
  },

  intersect(ratio) {
    if (ratio >= 0.2 && !this.intersected) {
      this.fetchTrending()
      this.intersected = true
    }
  },

  prev() {
    this.refs.list.scrollLeft -= this.offsetWidth
  },

  next() {
    this.refs.list.scrollLeft += this.offsetWidth
  },

  template() {
    const bgRoot = 'https://image.tmdb.org/t/p/w1920_and_h1080_multi_faces/'
    const posterRoot = 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/'
    return html`
      <div part="controls">
        <select
          @change=${(e) => {
            this.type = e.target.value
            this.fetchTrending()
          }}
        >
          <option value="tv">Trending TV</option>
          <option value="movie">Trending Movies</option>
          <option value="all">Trending TV and Movies</option>
        </select>
        <button part="prev" @click=${() => this.prev()}>
          <slot name="prev">❮</slot>
        </button>
        <button part="next" @click=${() => this.next()}>
          <slot name="next">❯</slot>
        </button>
      </div>
      <ul ref="list">
        ${this.results.map((result) => {
          const url = 'https://www.themoviedb.org/tv/' + result.id
          const backdrop = bgRoot + result.backdrop_path
          const poster = posterRoot + result.poster_path
          return html`
            <li>
              <a part="result" href=${url}>
                ${result.backdrop_path
                  ? html`<img part="backdrop" src=${backdrop} />`
                  : ''}
                ${result.poster_path
                  ? html`<img part="poster" src=${poster} />`
                  : ''}
                <div part="details">
                  <h3 part="title">${result.name}</h3>
                  <p part="description">${result.overview}</p>
                </div>
              </a>
            </li>
          `
        })}
      </ul>
    `
  },

  css: /* css */ `
    :host {
      aspect-ratio: 16/9;
      display: block;
      overflow: hidden;
      position: relative;
    }
    [part=controls] {
      backdrop-filter: blur(5px);
      background: rgba(0,0,0,0.33);
      border-radius: 2rem;
      display: flex;
      padding: 0 .5rem;
      position: absolute;
      right: 1rem;
      top: 1rem;
      z-index: 1;
    }
    [part=controls] * {
      appearance: none;
      background: transparent;
      border: 0;
      padding: .5rem;
    }
    [part=controls] *:focus-visible {
      outline: none;
    }
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      overflow-x: scroll;
      padding: 0;
      scroll-behavior: smooth;
      scroll-snap-type: x mandatory;
    }
    li {
      min-width: max(200px, 100%);
      scroll-snap-align: start;
      scroll-snap-stop: always;
    }
    a {
      align-items: flex-end;
      aspect-ratio: 16/9;
      background: linear-gradient(to bottom, #88a 50%, black);
      box-sizing: border-box;
      color: white;
      display: flex;
      font-family: sans-serif;
      gap: 1rem;
      justify-content: flex-start;
      padding: 1rem;
      position: relative;
      text-decoration: none;
    }
    [part=backdrop] {
      height: 100%;
      left: 0;
      opacity: 0.5;
      position: absolute;
      top: 0;
      width: 100%;
    }
    [part=poster] {
      display: block;
      position: relative;
      width: 25%;
    }
    [part=details] {
      display: grid;
      gap: .5rem;
      max-width: 50ch;
      position: relative;
      text-shadow: 1px 1px 1px black;
    }
    [part=title] {
      margin: 0;
    }
    [part=description] {
      display: -webkit-box;
      font-size: 14px;
      line-clamp: 3;
      line-height: 1.5;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
  `,
})
