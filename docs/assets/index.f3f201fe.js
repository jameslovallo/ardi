(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const l=t=>{class i extends HTMLElement{connectedCallback(){Object.assign(this,t),this.DOM=this.shadow?this.attachShadow({mode:"open"}):this,this.props&&Object.keys(this.props()).forEach(a=>{const e=this.props()[a],r=this.getAttribute(a);typeof e=="function"?this[a]=e(r):this[a]=r||e}),this.render=()=>{var r;const a=this.styles?`<style>${this.styles()}</style>`:"",e=this.template?this.template():"";this.DOM.innerHTML=a+e,(r=e.match(/@[a-z]+/gi))==null||r.forEach(o=>{const c=o.replace("@","");this.DOM.querySelectorAll(`[\\${o}]`).forEach(s=>{let d=this[s.getAttribute(o)];typeof this[s.getAttribute(o)]=="function"&&(s.removeAttribute(o),s.addEventListener(c,p=>{d.apply(this,[p])}))})}),this.refs={},this.DOM.querySelectorAll("[ref]").forEach(o=>{o.on=(c,s=s)=>{o.addEventListener(c,d=>{s.apply(this,[d])})},this.refs[o.getAttribute("ref")]=o}),this.ready&&this.ready()},this.render(),typeof this.intersect=="function"&&new IntersectionObserver(a=>a.forEach(e=>{e.isIntersecting&&this.intersect(e.intersectionRatio.toFixed(2))}),{root:null,rootMargin:"0px",threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(this)}}!customElements.get(t.component)&&customElements.define(t.component,i)},h={component:"counter-demo",shadow:!0,props(){return{count:Number,step:t=>t?Number(t):1}},sub(){this.count-=this.step,this.refs.count.innerHTML=this.count},add(){this.count+=this.step,this.refs.count.innerHTML=this.count},template(){return`
			<button @click="sub">-</button>
			<span part="count" ref="count">${this.count}</span>
			<button @click="add">+</button>
		`},styles(){return`
			:host {
				align-items: center;
				display: flex;
			}
			[part=count] {
				min-width: 2rem;
				text-align: center;
			}
			button {
				align-items: center;
				cursor: pointer;
				display: inline-flex;
				font-family: arial;
				height: 1.5rem;
				justify-content: center;
				padding: 0;
				user-select: none;
				width: 1.5rem;
			}
		`}},u={component:"gauge-demo",shadow:!0,props(){return{label:String,max:Number,min:Number,step:Number,value:Number}},deg(t){return Math.round(240*t)-120},numbers(){let t="";for(let i=this.min;i<=this.max;i+=this.step){const n=i/this.max,a=this.deg(n);t+=`
				<div part="number" style="transform: rotate(${a}deg)">
					<i style="transform: rotate(${-a}deg)">${i}</i>
				</div>
			`}return t},intersect(t){if(t>.3){const i=this.deg(this.value/this.max);this.refs.dial.style.transform=`rotate(${i}deg)`}},template(){return`
			${this.numbers()}
			<div part="dial" ref="dial"></div>
			<slot name="label" part="label">${this.label}</slot>
		`},styles(){return`
			:host {
				align-items: center;
				background: var(--background, #000);
				border: 2px solid rgba(125,125,125,.5);
				border-radius: 50%;
				color: var(--color, #fff);
				display: flex;
				height: 300px;
				justify-content: center;
				overflow: hidden;
				position: relative;
				width: 300px;
			}
			[part=dial] {
				background: var(--dial, #333);
				border-radius: 50%;
				height: 10%;
				position: relative;
				transform: rotate(-120deg);
				transition: transform var(--dial-speed, 1s);
				width: 10%;
			}
			[part=dial]:before {
				background: var(--needle, #f00);
				bottom: 99%;
				content: '';
				display: block;
				height: 310%;
				left: calc(50% - 1px);
				position: absolute;
				width: 2px;
			}
			[part=number] {
				height: 100%;
				left: calc(50% - 1.5em);
				pointer-events: none;
				position: absolute;
				top: 0;
				width: 3em;
			}
			[part=number] i {
				align-items: center;
				display: flex;
				font-style: normal;
				height: 3em;
				justify-content: center;
				width: 3em;
			}
			[part=label] {
				align-items: center;
				background: var(--title-background, #333);
				border-radius: 50%;
				bottom: 0;
				color: var(--title-color, #fff);
				display: flex;
				height: 20%;
				justify-content: center;
				margin: 0;
				position: absolute;
				width: 100%;
			}
		`}},m='<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>',f='<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',g={component:"staff-card",shadow:!0,props(){return{name:String,position:String,photo:String,phone:this.phoneLink,email:this.emailLink}},phoneLink(t){return t?`
					<a href="${"tel:"+t.match(/[0-9]+/g).join("")}" title="${t}" @click="phoneClick">
						${m}
					</a>
				`:""},emailLink(t){return t?`
					<a href="mailto:${t}" title="${t}">
						${f}
					</a>
				`:""},phoneClick(t){t.preventDefault();const i=`Are you sure you want to call ${this.name.split(" ")[0]}? Did you already try text, chat or email?`;confirm(i)&&(location=t.target.href)},template(){return`
				<img part="photo" src="${this.photo}">
				<div part="details">
					<b>${this.name}</b>
					<small>${this.position}</small>
				</div>
				<div part="contact">
					<span part="phone">${this.phone}</span>
					<span part="email">${this.email}</span>
				</div>
			`},styles(){return`
				:host {
					display: grid;
					align-items: center;
					grid-template-columns: 64px 1fr auto;
					max-width:400px;
					border: 1px solid rgba(125,125,125,.5);
					border-radius: .75rem;
					overflow: hidden;
				}
				[part=photo] {
					display: block;
					height: 64px;
					width: 64px;
					aspect-ratio: 1/1;
					object-fit: contain;
					object-position: center bottom;
				}
				[part=details] {
					display: flex;
					flex-direction: column;
					padding: .75rem;
				}
				[part=contact] {
					display: flex;
					gap: .75rem;
					padding-right: .75rem;
				}
				[part="contact"] a {
					color: dodgerblue;
					display: block;
					text-decoration: none;
				}
				[part=contact] svg {
					display: block;
					width: 20px;
					pointer-events: none;
				}
			`}},b={component:"weather-widget",shadow:!0,props(){return{breakpoint:t=>t?Number(t):500,label:"Forecast",lat:"51.5002",locale:navigator.language,lon:"-0.1262",place:"London",unit:t=>["fahrenheit","f"].includes(t)?"fahrenheit":"celsius"}},icon(t){return`
			<img src="https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/svg/${{0:"clear-day",1:"partly-cloudy-day",2:"cloudy",3:"overcast",45:"fog",48:"fog",51:"drizzle",53:"drizzle",55:"drizzle",56:"sleet",57:"sleet",61:"rain",63:"rain",65:"rain",66:"rain",67:"rain",71:"snow",73:"snow",75:"snow",77:"snow",80:"rain",81:"rain",82:"rain",85:"snow",86:"snow",95:"thunderstorms-rain",96:"hail",99:"hail"}[t]}.svg">`},day(t){return`
			<div part="day">
				<div part="day_name">${t.name||""}</div>
				<div part="day_icon">${t.icon||""}</div>
				<div part="day_temp">
					<span part="day_min">${t.min?t.min+"\xB0":""}</span>
					<span part="day_max">${t.max?t.max+"\xB0":""}</span>
				</div>
			</div>
		`},forecastPlaceholder(){return Array(7).fill("").map(t=>this.day(t)).join("")},getWeather(){fetch(`https://api.open-meteo.com/v1/forecast?latitude=${this.lat}&longitude=${this.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&temperature_unit=${this.unit}&timezone=auto`).then(t=>t.json()).then(t=>{const{current_weather:i,daily:n}=t;this.refs.current_icon.innerHTML=this.icon(i.weathercode);const a=Math.round(Number(i.temperature)),e=this.unit.charAt(0).toUpperCase();this.refs.current_temp.innerHTML=a+"\xB0"+e,this.refs.forecast.innerHTML=n.time.map((r,o)=>this.day({name:new Date(r+"T00:00").toLocaleDateString(this.locale,{weekday:"long"}),icon:this.icon(n.weathercode[o]),min:Math.round(n.temperature_2m_min[o]),max:Math.round(n.temperature_2m_max[o])})).join("")})},ready(){new ResizeObserver(()=>this.clientWidth<=this.breakpoint?this.refs.forecast.classList.add("small"):this.refs.forecast.classList.remove("small")).observe(this)},intersect(t){!this.gotWeather&&t>.2&&(this.getWeather(),this.gotWeather=!0)},template(){return`
			<div part="current">
				<div part="label">
					<b>${this.place}</b><br/>
					<small>${this.label}</small>
				</div>
				<div part="current_icon" ref="current_icon"></div>
				<div part="current_temp" ref="current_temp"></div>
			</div>
			<div part="forecast" ref="forecast">
				${this.forecastPlaceholder()}
			</div>
		`},styles(){const t=`
			align-items: center;
			display: flex;
			flex-flow: row wrap;
			flex-grow: 1;
			gap: 1rem;
		`;return`
			:host {
				--divider-color: rgba(125,125,125,.5);
				--icon-shadow: 0 0 0 rgba(0,0,0,0.5);
				--placeholder-color: rgba(125,125,125,.5);
				${t}
			}
			img { display: block }
			[part=current] {
				${t}
				justify-content: center;
			}
			[part=label] { text-align: center }
			[part=current_icon] {
				filter: drop-shadow(var(--icon-shadow));
				height: 5rem;
				width: 5rem;
			}
			[part=current_temp] { font-size: 2rem }
			[part=forecast] { ${t} }
			[part=day] {
				align-items: center;
				display: flex;
				flex-direction: column;
				flex-grow: 1;
				font-size: .75rem;
				font-weight: bold;
				gap: .5rem;
			}
			[part=day_icon] {
				filter: drop-shadow(var(--icon-shadow));
				height: 3em;
				width: 3em;
			}
			[part=day_temp] {
				display: flex;
				gap: .5rem;
			}
			[part=day_temp] * {
				text-align: center;
				width: 2em;
			}
			[part=day_min] { color: var(--min, dodgerblue) }
			[part=day_max] { color: var(--max, red) }
			/* small */
			[part=forecast].small {
				display: block;
				flex-basis: 100%;
			}
			[part=forecast].small [part=day] {
				border-top: 1px solid var(--divider-color);
				display: grid;
				font-size: 1rem;
				font-weight: normal;
				grid-template-columns: 1fr auto auto;
				justify-content: space-between;
				padding: .25rem 0;
			}
			[part=forecast].small [part=day]:last-of-type {
				border-bottom: 1px solid var(--divider-color);
			}
			/* empty */
			[part=current_icon]:empty {
				background: var(--placeholder-color);
				border-radius: 50%;
			}
			[part=current_temp]:empty {
				background: var(--placeholder-color);
				border-radius: 1em;
				height: 1em;
				width: 2em;
			}
			[part^=day_]:empty {
				background: var(--placeholder-color);
				border-radius: 2em;
				height: 1em;
			}
			[part=day_icon]:empty { height: 2em; width: 2em; }
			[part=day_name]:empty { width: 4em }
			[part=day_temp] *:empty { display: inline-block; width: 2em; }
		`}},y={component:"youtube-demo",shadow:!0,props(){return{vid:String}},loadPlayer(){this.refs.button.remove(),this.DOM.innerHTML+=`
			<iframe ref="player"
				src="https://www.youtube.com/embed/${this.vid}?autoplay=1"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
			></iframe>
		`},template(){return`
			<button @click="loadPlayer" part="button" ref="button" aria-label="Play Video">
				<svg part="icon" version="1.1" viewBox="0 0 68 48">
					<path part="icon-bg" d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"></path>
					<path part="icon-fg" d="M 45,24 27,14 27,34"></path>
				</svg>
			</button>
		`},styles(){return`
			:host {
				aspect-ratio: 16/9;
				background-image: url(https://img.youtube.com/vi/${this.vid}/hqdefault.jpg);
				background-position: center center;
				background-size: cover;
				display: grid;
				place-items: center;
			}
			[part=button] {
				background: transparent;
				border: none;
				cursor: pointer;
				padding: 0;
				width: 68px;
			}
			[part=icon] { display: block }
			[part=icon-bg] { fill: rgba(33,33,33,0.8) }
			[part=icon-fg] { fill: #fff }
			[part=button]:hover [part=icon-bg] { fill: red }
			[ref=player] { grid-area: 1/-1; height: 100%; width: 100%; }
		`}};l(h);l(u);l(g);l(b);l(y);
