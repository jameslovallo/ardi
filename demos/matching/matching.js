import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-matching',
  state: () => ({
    tiles: ['🐕', '🐒', '🐈', '🦝', '🐄', '🐖', '🐓', '🦖'],
    randomizedTiles: [],
    flipped: [],
    match: [],
    matched: [],
    locked: false,
    moves: 0,
    best: 0,
    wins: 0,
  }),
  created() {
    this.randomizedTiles = [...this.tiles, ...this.tiles].sort(
      () => Math.random() - 0.5
    )
  },
  handleClick(tile, i) {
    this.flipped.push(i)
    this.match.push(tile)
    if (this.flipped.length === 2) {
      this.locked = true
      this.moves++
      if (this.match[0] === this.match[1]) {
        this.matched.push(tile)
      }
      setTimeout(() => {
        this.flipped = []
        this.match = []
        this.locked = false
      }, 1000)
      if (this.matched.length === 8) {
        this.handleWin()
      }
    }
  },
  handleWin() {
    if (this.best === 0 || this.moves < this.best) this.best = this.moves
    this.moves = 0
    this.wins++
    alert('You won! Congratulations!')
    setTimeout(() => {
      this.flipped = []
      this.matched = []
    }, 1000)
    setTimeout(() => this.created(), 2000)
  },
  isFlipped(tile, i) {
    return this.flipped.includes(i) || this.matched.includes(tile)
      ? 'flipped'
      : ''
  },
  template() {
    return html`
      <div class="stats">
        <span>Moves: ${this.moves}</span>
        <span>Best: ${this.best}</span>
        <span>Wins: ${this.wins}</span>
      </div>
      <div class="cards">
        ${this.randomizedTiles.map(
          (tile, i) =>
            html`
              <button
                class=${`flip-card ${this.isFlipped(tile, i)}`}
                disabled=${this.locked ? true : null}
                @click=${() => this.handleClick(tile, i)}
              >
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <img src="//picsum.photos/400/400" />
                  </div>
                  <div class="flip-card-back">${tile}</div>
                </div>
              </button>
            `
        )}
      </div>
    `
  },
  css: /* css */ `
    :host {
      border: 1px solid var(--border);
      border-radius: .5rem;
      display: block;
      padding: 1rem;
    }
    .stats {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    .cards {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(4, 1fr);
    }
    img {
      display: block;
      height: auto;
      width: 100%;
    }
    .flip-card {
      aspect-ratio: 1;
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 0;
      perspective: 1000px;
    }
    .flip-card * {
      pointer-events: none;
    }
    .flip-card-inner {
      border: 1px solid var(--border);
      box-sizing: border-box;
      height: 100%;
      position: relative;
      text-align: center;
      transform-style: preserve-3d;
      transition: transform .5s;
      width: 100%;
    }
    .flip-card.flipped .flip-card-inner {
      transform: rotateY(180deg);
    }
    .flip-card-front, .flip-card-back {
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      display: grid;
      font-size: 4rem;
      height: 100%;
      place-items: center;
      position: absolute;
      width: 100%;
    }
    .flip-card-front {
      background-color: #bbb;
      color: black;
    }
    .flip-card-back {
      background-color: var(--surface-heavy);
      color: white;
      transform: rotateY(180deg);
    }
  `,
})
