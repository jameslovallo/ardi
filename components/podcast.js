import {
  mdiArrowLeftBold,
  mdiArrowRightBold,
  mdiPause,
  mdiPlay,
} from 'https://cdn.skypack.dev/@mdi/js'
import ardi, { html, svg } from '/ardi-min.js'

ardi({
  tag: 'ardi-podcast',
  props: {
    feed: [String, 'https://feeds.simplecast.com/dxZsm5kX'],
    perpage: [Number, 10],
  },
  state: () => ({
    title: '',
    author: '',
    link: '',
    description: '',
    image: '',
    episodes: [],
    page: 0,
    nowPlaying: null,
    paused: true,
  }),
  template() {
    const { player } = this.refs
    const icon = (path) => svg`
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d=${path} />
			</svg>
		`
    const lastPage = Math.floor(this.episodes.length / this.perpage) + 1
    return html`
				<audio ref="player" src=${this.nowPlaying}/>
				<div part="header">
					<img part="image" src=${this.image} />
					<div part="header-wrapper">
						<p part="title">${this.title}</p>
						<p part="author">${this.author}</p>
						<a part="link" href=${this.link}>${this.link}</a>
					</div>
				</div>
					<p part="description">${this.description}</p>
				<div part="episodes">
					${this.episodes
            .filter(
              (episode, i) =>
                i >= this.page * this.perpage &&
                i < this.page * this.perpage + this.perpage
            )
            .map((episode, i) => {
              const { title, track, duration } = episode
              return html`
                <div part="episode">
                  <button
                    part="play-button"
                    @click=${() => {
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
                    }}
                  >
                    ${icon(
                      this.nowPlaying === track && !this.paused
                        ? mdiPause
                        : mdiPlay
                    )}
                  </button>
                  <div part="episode-wrapper">
                    <div part="episode-title">${title}</div>
                    <div part="episode-duration">${duration}</div>
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
					>
						${icon(mdiArrowLeftBold)}
					</button>
					Page ${this.page + 1} / ${lastPage}
					<button
						part="pagination-next"
						@click=${() => this.page++}
						disabled=${this.page + 1 < lastPage ? null : true}
					>
						${icon(mdiArrowRightBold)}
					</button>
				</div>
			</audio>
		`
  },
  css: `
		:host {
			border: 1px solid rgba(125,125,125,0.5);
			display: grid;
			gap: 1rem;
			overflow: hidden;
			padding: .5rem;
		}
		button {
			border: 1px solid rgba(125,125,125,0.5);
			border-radius: 4px;
		}
		svg {
			display: block;
			fill: currentcolor;
			height: 1rem;
			width: 1rem;
		}
		[part=header] {
			align-items: center;
			display: grid;
			gap: .5rem;
			grid-template-columns: 8rem 1fr;
		}
		[part=image] {
			display: block;
			width: 100%;
		}
		[part=title],
		[part=author],
		[part=link],
		[part=description],
		[part=episode-title],
		[part=episode-duration] {
			font-size: .8rem;
			line-height: 1.5;
			margin: 0;
		}
		[part=header-wrapper],
		[part=episode-wrapper] {
			min-width: 0;
			max-width: 100%;
		}
		[part=title] {
		  font-size: 1rem;
			font-weight:bold;
		}
		[part=link] {
			display: inline-block;
			max-width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
    	white-space: nowrap;
		}
		[part=description] {
			margin: 0;
		}
		[part=episodes] {
			display: grid;
			gap: .75rem;
		}
		[part=episode] {
			align-items: center;
			display: flex;
			gap: 1rem;
			min-width: 0;
		}
		[part=play-button] {
			border-radius: 50%;
			display: grid;
			flex-shrink: 0;
			height: 2rem;
			padding: 0;
			place-items: center;
			width: 2rem;
		}
		[part=episode-title] {
			overflow: hidden;
			text-overflow: ellipsis;
    	white-space: nowrap;
		}
		[part=episode-duration] {
			opacity: 0.8;
		}
		[part=pagination] {
			align-items: center;
			display: flex;
			font-size: .8rem;
			justify-content: space-between;
			margin-top: .5rem;
		}
	`,
  formatEpisode(item) {
    const tags = ['title', 'enclosure', 'itunes:duration']
    const episode = {}
    ;[...item.childNodes]
      .filter((el) => tags.includes(el.tagName))
      .map((el) => {
        switch (el.tagName) {
          case 'title':
            episode.title = el.textContent
            break
          case 'enclosure':
            episode.track = el.getAttribute('url')
            break
          case 'itunes:duration':
            let duration = el.textContent
            let hours, minutes
            if (duration.includes(':')) {
              duration = duration.split(':')
              hours = Number(duration[0])
              minutes = Number(duration[1])
            } else {
              hours = Math.floor(duration / 60 / 60)
              minutes = Math.floor(duration / 60)
            }
            hours = hours > 0 ? `${hours}h ` : ''
            episode.duration = `${hours}${minutes}m`
            break
        }
      })
    return episode
  },
  ready() {
    fetch(this.feed)
      .then((res) => res.text())
      .then((text) => {
        if (window.DOMParser) {
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(text, 'text/xml')
          const channel = xmlDoc.querySelector('channel')
          this.title = channel.querySelector('title').textContent
          this.author = channel.querySelector('author').textContent
          this.description = channel.querySelector('description').textContent
          const imageContainer = channel.querySelector('image')
          this.image = imageContainer.querySelector('url').textContent
          this.link = imageContainer.querySelector('link').textContent
          const items = xmlDoc.querySelectorAll('item')
          this.episodes = [...items].map((item) => this.formatEpisode(item))
        }
      })
  },
})
