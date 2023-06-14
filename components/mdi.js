import ardi, { css } from '../@/assets/ardi-min.js'

ardi({
  tag: 'mdi-icon',
  props: { icon: [String, 'material-design'] },
  state: () => ({ svg: '' }),
  getIcon() {
    fetch(`https://unpkg.com/@mdi/svg@7.2.96/svg/${this.icon}.svg`)
      .then((res) => res.text())
      .then((icon) => (this.svg = icon))
  },
  created() {
    this.getIcon()
  },
  changed() {
    this.getIcon()
  },
  template() {
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
