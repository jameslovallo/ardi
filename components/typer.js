import ardi, { html } from '/ardi-min.js'

ardi({
  tag: 'ardi-typer',

  props: {
    base: [String, 'Word'],
    pause: [Number, 5000],
    speed: [Number, 100],
    words: [(v) => (v ? v.split(',') : ['one', 'two', 'three'])],
  },

  state: () => ({
    index: 0,
    word: '',
  }),

  template() {
    return html`
      <div>
        ${this.base}
        <span>${this.word}</span>
      </div>
      <style>
        ${this.css}
      </style>
    `
  },

  setWord(i = 0) {
    const letters = this.words[i].split('')
    const max = this.words.length - 1
    const pause = letters.length * this.speed + this.pause
    // write letters
    letters.forEach((l, i) =>
      setTimeout(() => (this.word += l), this.speed + this.speed * i)
    )
    // pause
    setTimeout(() => {
      // remove letters
      letters.forEach((l, i) =>
        setTimeout(() => {
          this.word = this.word.slice(0, -1)
          // go to next word
          if (this.word === '') {
            this.index = this.index === max ? 0 : this.index + 1
            this.setWord(this.index)
          }
        }, this.speed + this.speed * i)
      )
    }, pause)
  },

  ready() {
    this.setWord()
  },

  css: /* css */ `
    span {
      --color: currentcolor;
      animation: blink 1s linear infinite;
      border-right: 1px solid var(--color);
      display: inline-block;
    }
    @keyframes blink {
      0% {
        --color: transparent;
      } 50% {
        --color: currentcolor;
      } 100% {
        --color: transparent;
      }
    }
  `,
})
