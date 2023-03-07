import{html as d,render as p,svg as y}from"https://cdn.skypack.dev/uhtml";function g(n){let u=n?.extends?n.extends[0]:HTMLElement,f=n?.extends?n.extends[1]:void 0,a=Object.keys(n.props||{}),r=new Event("update");class l extends u{constructor(){super(),Object.assign(this,n),!this.shadow||this.shadow!==!1?(this.attachShadow({mode:"open"}),this.root=this.shadowRoot):this.root=this,typeof this.props=="object"&&this.defineProps(),this.state&&this.defineState(),typeof this.intersect=="function"&&this.handleIntersect(),this.refs={}}connectedCallback(){this.addEventListener("update",this.debounce(this.render)),this.dispatchEvent(r),typeof this.ready=="function"&&this.ready()}defineProps(){a.forEach(e=>{let[t,s]=this.props[e];Object.defineProperty(this,e,{get:()=>{let i=this.getAttribute(e)||s;switch(t){case String:return i;case Boolean:return[!0,"true"].includes(i);default:return t(i)}},set:i=>{this.setAttribute(e,i),typeof this.propChange=="function"&&this.propChange({name:e,old:this[e],new:i})}})})}static get observedAttributes(){return a}attributeChangedCallback(e,t,s){typeof this.propChange=="function"&&this.propChange({name:e,old:t,new:s}),this.dispatchEvent(r)}defineState(){let e=t=>{if(t===null||typeof t!="object")return t;for(let s in t)t[s]=e(t[s]);return new Proxy(t,{get:(s,i)=>s[i],set:(s,i,o)=>(s[i]=e(o),this.dispatchEvent(r),!0),deleteProperty:(s,i)=>(delete s[i],this.dispatchEvent(r),!0)})};this._state=e(typeof this.state=="function"?this.state():this.state),delete this.state,Object.keys(this._state).forEach(t=>{Object.defineProperty(this,t,{get:()=>this._state[t],set:s=>this._state[t]=s})})}context(e){if(this._ctx||(this._ctx={}),this._ctx[e])return this._ctx[e];{let t=(s,i=this)=>{function o(h){if(!h||h===document||h===window)return null;let c=h.closest(s);return c||o(h.getRootNode().host)}return o(i)};return this._ctx[e]=t(`[context=${e}]`),this._ctx[e].addEventListener("update",()=>this.dispatchEvent(r)),this._ctx[e]}}debounce(e){var t;return function(){var s=this,i=arguments;t&&window.cancelAnimationFrame(t),t=window.requestAnimationFrame(function(){e.apply(s,i)})}}render(){let e=this.css?d`
            <style>
              ${typeof this.css=="function"?this.css():this.css}
            </style>
          `:"",t=d`${e}${this.template()}`;typeof t=="object"?p(this.root,t):typeof t=="string"&&(this.root.innerHTML=t),this.root.querySelectorAll("[ref]").forEach(s=>{this.refs[s.getAttribute("ref")]=s}),this.updated&&this.updated()}handleIntersect(){new IntersectionObserver(e=>{e.forEach(t=>{t.isIntersecting&&this.intersect(t.intersectionRatio.toFixed(2))})},{root:null,rootMargin:"0px",threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(this)}}!customElements.get(n.tag)&&customElements.define(n.tag,l,{extends:f})}export{g as default,d as html,y as svg};
