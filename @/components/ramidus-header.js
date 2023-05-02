import ardi, { html } from '../assets/ardi-min.js'

ardi({
  tag: 'ramidus-header',
  template() {
    return html`
      <div class="box">
        <div class="shadow"></div>
        <div class="face three-d">
          <div class="face-slider">
            <img src="/@/assets/ramidus/1.png" />
            <img src="/@/assets/ramidus/2.png" />
            <img src="/@/assets/ramidus/3.png" />
            <img src="/@/assets/ramidus/4.png" />
            <img src="/@/assets/ramidus/5.png" />
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
  css: /* css */ `
  :host {
		--height: 262px;
		--width: 150px;
    background: var(--surface-heavy);
		display: grid;
		height: 300px;
		margin: 0 -1rem;
		overflow: hidden;
		place-items: center;
  }
	@media (min-width: 600px) {
		:host {
			--height: 350px;
			--width: 200px;
			height: 450px;
		}
	}
	@media (min-width: 900px) {
		:host {
			margin: 0;
		}
	}
	img {
		display: block;
		height: calc(var(--height) - 2rem);
		object-fit: cover;
		object-position: 50% 20%;
		width: var(--width);
	}
  .box {
    display: inline-block;
    font-size: 0;
    position: relative;
  }
  .face,
  .shadow {
    transition: all 0.6s ease-in-out;
  }
  * {
    box-sizing: border-box;
  }
  .shadow {
    background: transparent;
    box-shadow: -60px 60px 15px black;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    transform-style: preserve-3d;
    transform: rotateX(30deg) rotateZ(-33deg);
    width: 100%;
    z-index: -1;
  }
  .three-d {
    background-color: #ddd;
    transform-style: preserve-3d;
  }
  .three-d:before {
    background-color: #bbb;
    bottom: -7.5px;
    content: "";
    display: block;
    height: 15px;
    left: 0;
    position: absolute;
    transform: rotateX(90deg) translateY(-7.5px);
    width: 100%;
  }
  .three-d:after {
    background-color: #ccc;
    content: "";
    height: 100%;
    left: -7.5px;
    position: absolute;
    top: 0;
    transform: rotateY(90deg) translateX(7.5px);
    width: 15px;
  }
  .face {
    display: inline-block;
		height: var(--height);
    margin: 0 auto;
    margin: 0 auto;
    position: relative;
    transform: rotateX(30deg) rotateZ(-33deg);
		width: var(--width);
  }
  .face .nav {
    align-items: center;
    display: flex;
    gap: .5rem;
    height: 2rem;
    left: 0;
    padding: 0 0.5rem;
    position: absolute;
    top: 0;
    transform: translateZ(10px);
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
