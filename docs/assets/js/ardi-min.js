export default t=>{const e=Object.keys(t.props);class s extends HTMLElement{constructor(){super()&&Object.assign(this,t),this.DOM=t.shadow?this.attachShadow({mode:"open"}):this}render(){e.forEach((t=>{const e=this.props()[t],s=this.getAttribute(t);this[t]="function"==typeof e?e(s):s||e}));const t=this.styles?`<style>${this.styles()}</style>`:"";let s=this.template?this.template():"";1===s?.nodeType&&(s=s.outerHTML),this.DOM.innerHTML=t+s,s.match(/@[a-z]+/gi)?.forEach((t=>{const e=t.replace("@","");this.DOM.querySelectorAll(`[\\${t}]`).forEach((s=>{let r=this[s.getAttribute(t)];"function"==typeof this[s.getAttribute(t)]&&(s.removeAttribute(t),s.addEventListener(e,(t=>{r.apply(this,[t])})))}))})),this.refs={},this.DOM.querySelectorAll("[ref]").forEach((t=>{t.on=(e,s)=>{t.addEventListener(e,(t=>{s.apply(this,[t])}))},this.refs[t.getAttribute("ref")]=t})),this.ready&&this.ready(),"function"==typeof this.intersect&&new IntersectionObserver((t=>t.forEach((t=>{t.isIntersecting&&this.intersect(t.intersectionRatio.toFixed(2))}))),{root:null,rootMargin:"0px",threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(this)}connectedCallback(){this.render()}static get observedAttributes(){if(t.reactive)return Object.keys(t.props())}attributeChangedCallback(){this.render()}}!customElements.get(t.component)&&customElements.define(t.component,s)};