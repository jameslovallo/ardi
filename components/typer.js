import ardi, { html } from '../@/assets/ardi-min.js'

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
      ${this.base} ${this.word}${this.cursor ? html`<span></span>` : ''}
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

  styles() {
    return /* css */ `
      :host {
        word-break: break-word;
      }
      span:before {
        animation: blink 1s infinite;
        color: var(--cursor-color, dodgerblue);
        content: '│';
        display: inline-flex;
        font-family: arial;
        position: relative;
        top: -.1em;
        width: 1px;
      }
      @keyframes blink {
        0% {
          opacity: 0;
        } 50% {
          opacity: 1;
        } 100% {
          opacity: 0;
        }
      }
    `
  },
})
