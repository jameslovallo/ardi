import ardi, { css, html } from '../assets/ardi-min.js'

ardi({
  tag: 'ramidus-header',
  template() {
    return html`
      <div class="box">
        <div class="face three-d">
          <div class="face-slider">
            ${Array(5)
              .fill(null)
              .map(
                (img, i) => html`
                  <img
                    class="mobile"
                    src=${`/@/assets/ramidus/${i + 1}.webp`}
                  />
                  <img
                    class="desktop"
                    src=${`/@/assets/ramidus/${i + 1}-desktop.webp`}
                  />
                `
              )}
          </div>
          <div class="nav three-d">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    `
  },
  styles: css`
    :host {
      --depth: 25px;
      --height: 262px;
      --transform: rotateX(20deg) rotateY(8deg) rotateZ(350deg);
      --width: 150px;
      display: grid;
      height: 300px;
      margin: 2rem 0 2rem 50%;
      overflow: hidden;
      place-items: center;
      transform: translateX(-50%);
      width: 100vw;
    }
    img {
      display: block;
      height: calc(var(--height) - 2rem);
      object-fit: cover;
      object-position: top center;
      width: var(--width);
    }
    img.desktop {
      display: none;
    }
    @media (min-width: 600px) {
      :host {
        --height: 300px;
        --transform: rotateX(20deg) rotateY(8deg) rotateZ(350deg);
        --width: 400px;
        height: 450px;
      }
      img.mobile {
        display: none;
      }
      img.desktop {
        display: block;
      }
    }
    .box {
      display: inline-block;
      font-size: 0;
      position: relative;
    }
    * {
      box-sizing: border-box;
    }
    .three-d {
      background-color: #ddd;
      transform-style: preserve-3d;
    }
    .three-d:before {
      background-color: #bbb;
      bottom: calc(-0.5 * var(--depth));
      content: '';
      display: block;
      height: var(--depth);
      left: 0;
      position: absolute;
      transform: rotateX(90deg) translateY(calc(-0.5 * var(--depth)));
      width: 100%;
    }
    .three-d:after {
      background-color: #ccc;
      content: '';
      height: 100%;
      left: calc(-0.5 * var(--depth));
      position: absolute;
      top: 0;
      transform: rotateY(90deg) translateX(calc(var(--depth) / 2));
      width: var(--depth);
    }
    .face {
      display: inline-block;
      height: var(--height);
      margin: 0 auto;
      margin: 0 auto;
      position: relative;
      transform: var(--transform);
      transition: all 0.6s ease-in-out;
      width: var(--width);
    }
    .face .nav {
      align-items: center;
      display: flex;
      gap: 0.25rem;
      height: 2rem;
      left: 0;
      padding: 0 0.5rem;
      position: absolute;
      top: 0;
      transform: translateZ(calc(var(--depth) / 2));
      width: 100%;
    }
    .face .nav span {
      background: #333;
      border-radius: 1rem;
      display: block;
      height: 0.5rem;
      opacity: 0.8;
      width: 1.5rem;
    }
    .face .nav span:first-child {
      background: dodgerblue;
      margin-right: auto;
    }
    .face-slider {
      --gap: 3rem;
      animation: slidePages 15s infinite;
      display: flex;
      gap: var(--gap);
      height: calc(var(--height) - 2rem);
      left: 0;
      position: absolute;
      top: 2rem;
      width: -moz-max-content;
      width: -webkit-max-content;
      width: max-content;
    }
    @keyframes slidePages {
      0% {
        left: 0;
      }
      10% {
        left: 0;
      }
      20% {
        left: calc(-100% - calc(1 * var(--gap)));
      }
      30% {
        left: calc(-100% - calc(1 * var(--gap)));
      }
      40% {
        left: calc(-200% - calc(2 * var(--gap)));
      }
      50% {
        left: calc(-200% - calc(2 * var(--gap)));
      }
      60% {
        left: calc(-300% - calc(3 * var(--gap)));
      }
      70% {
        left: calc(-300% - calc(3 * var(--gap)));
      }
      80% {
        left: calc(-400% - calc(4 * var(--gap)));
      }
      90% {
        left: calc(-400% - calc(4 * var(--gap)));
      }
      100% {
        left: 0;
      }
    }
  `,
})
