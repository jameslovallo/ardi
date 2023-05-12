import ardi, { css } from '../../@/assets/ardi-min.js'

ardi({
  tag: 'mdi-icon',
  props: {
    icon: [String, 'material-design'],
    size: [String, '2rem'],
    color: [String],
  },
  state: () => ({ svg: '' }),
  created() {
    fetch(`https://unpkg.com/@mdi/svg@7.2.96/svg/${this.icon}.svg`)
      .then((res) => res.text())
      .then((icon) => (this.svg = icon))
  },
  template() {
    if (this.color) this.style.color = this.color
    if (this.size) this.style.width = this.size
    return this.svg
  },
  styles: css`
    :host,
    svg {
      display: block;
      fill: currentcolor;
    }
  `,
})
