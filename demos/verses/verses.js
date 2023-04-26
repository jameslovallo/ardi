import ardi from '../../@/assets/ardi-min.js'

ardi({
  tag: 'ardi-verses',
  props: { query: [String, 'John 1 1-34'] },
  state: () => ({ html: '' }),
  fetchVerses() {
    fetch(`https://api.esv.org/v3/passage/html/?q=${this.query}`, {
      headers: {
        Authorization: 'Token 9440aa524a886936a723a0496edaf2d406df48a9',
      },
    })
      .then((res) => res.json())
      .then((json) => (this.html = json.passages[0]))
  },
  created() {
    this.fetchVerses()
  },
  changed() {
    this.fetchVerses()
  },
  template() {
    return this.html
  },
})
