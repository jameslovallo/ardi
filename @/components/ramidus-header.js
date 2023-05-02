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
          </div>
        </div>
      </div>
    `
  },
  css: /* css */ `
  :host {
		--height: 262px;
		--width: 150px;
    background: #111;
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
		object-position: 50% 33%;
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
    transform-style: preserve-3d;
  }
  .three-d:before {
    background-color: #222;
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
    background-color: #333;
    content: "";
    height: 100%;
    left: -7.5px;
    position: absolute;
    top: 0;
    transform: rotateY(90deg) translateX(7.5px);
    width: 15px;
  }
  .face {
    background-color: #444;
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
    background: #555;
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
    background: white;
    border-radius: 1rem;
    display: block;
    height: 0.5rem;
    opacity: 0.8;
    width: 1.5rem;
  }
  .face .nav span:first-child {
    background: var(--theme-color);
    margin-right: auto;
  }
  .face-slider {
    animation: slidePages 15s infinite;
    display: flex;
    gap: 2rem;
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
      left: calc(-100% - 2rem);
    }
    30% {
      left: calc(-100% - 2rem);
    }
    40% {
      left: calc(-200% - 4rem);
    }
    50% {
      left: calc(-200% - 4rem);
    }
    60% {
      left: calc(-300% - 6rem);
    }
    70% {
      left: calc(-300% - 6rem);
    }
    80% {
      left: calc(-400% - 8rem);
    }
    90% {
      left: calc(-400% - 8rem);
    }
		100% {
			left: 0;
		}
  }
  `,
})
