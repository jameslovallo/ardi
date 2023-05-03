import { XMLParser } from 'https://cdn.skypack.dev/fast-xml-parser@4.1.3'
import ardi, { css, html } from '../../@/assets/ardi-min.js'
const parser = new XMLParser()

ardi({
  tag: 'ardi-news',

  props: {
    feed: [String, 'https://rsshub.app/apnews/topics/apf-topnews'],
    storyheading: [String, 'Latest Headlines'],
    linklabel: [String, 'Visit Site'],
  },

  state: () => ({
    title: 'Loading Title',
    description: 'Loading Description',
    link: null,
    stories: [],
  }),

  fetchRSS() {
    fetch(`/.netlify/functions/proxy?url=${this.feed}&format=text`)
      .then((response) => response.text())
      .then((text) => {
        const { rss } = parser.parse(text)
        const {
          channel: { title, description, link, item },
        } = rss
        this.title = title
        this.description = description
        this.link = link
        this.stories = item.map((item) => {
          const { title, link, description } = item
          let src = description.match(
            /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/
          )
          return { title, link, src: src ? src[0] : null }
        })
      })
      .catch(console.error)
  },

  created() {
    this.fetchRSS()
  },

  changed(prop) {
    prop.old && prop.new && this.fetchRSS()
  },

  template() {
    return html`
      <h2>${this.title.split(' - ')[0]}</h2>
      <p>${this.description.split(' - ')[0]}</p>
      ${this.link
        ? html`
            <p>
              <a part="weblink" href=${this.link}>${this.linklabel}</a>
            </p>
          `
        : ''}
      <h2>${this.storyheading}</h2>
      <div part="stories">
        ${this.stories.map(
          (item) =>
            html`
              <a part="story" href=${item.link}>
                ${item.src ? html`<img src=${item.src} />` : ''} ${item.title}
              </a>
            `
        )}
      </div>
    `
  },

  styles: css`
    a {
      color: inherit;
      text-decoration-color: var(--theme-color);
    }
    [part='stories'] {
      display: grid;
      gap: 1rem;
    }
    [part='story'] {
      align-items: center;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 4px;
      display: flex;
      gap: 1rem;
      overflow: hidden;
      padding-right: 1rem;
      text-decoration: none;
    }
    [part='story']:hover {
      background: var(--surface-heavy);
    }
    [part='story'] img {
      aspect-ratio: 1;
      display: block;
      height: 6rem;
      object-fit: cover;
      object-position: top center;
      width: 6rem;
    }
  `,
})
