import ardi, { html } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-typer',

  props: {
    base: [String, 'Word'],
    cursor: [Boolean, true],
    pause: [Number, 5000],
    speed: [Number, 100],
    words: [
      (v) => (v ? v.split(',').map((w) => w.trim()) : ['one', 'two', 'three']),
    ],
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

  created() {
    this.setWord()
  },

  css() {
    return /* css */ `
      span {
        --color: currentcolor;
        animation: blink 1s linear infinite;
        border-right: ${this.cursor ? '1px' : '0'} solid var(--color);
        display: inline;
        word-break: break-word;
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
    `
  },
})
