var y=class extends Map{set(e,r){return super.set(e,r),r}},h=class extends WeakMap{set(e,r){return super.set(e,r),r}};var X=/^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i,Y=/<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g,Z=/([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g,V=/[\x01\x02]/g,O=(t,e,r)=>{let s=0;return t.join("").trim().replace(Y,(i,n,o,l)=>{let a=n+o.replace(Z,"=$2$1").trimEnd();return l.length&&(a+=r||X.test(n)?" /":"></"+n),"<"+a+">"}).replace(V,i=>i===""?"<!--"+e+s+++"-->":e+s++)};var tt=({firstChild:t,lastChild:e})=>{let r=document.createRange();return r.setStartAfter(t),r.setEndAfter(e),r.deleteContents(),t},T=(t,e)=>t.nodeType===111?1/e<0?e?tt(t):t.lastChild:e?t.valueOf():t.firstChild:t,w=t=>{let{firstChild:e,lastChild:r}=t;if(e===r)return r||t;let{childNodes:s}=t,i=[...s];return{ELEMENT_NODE:1,nodeType:111,firstChild:e,lastChild:r,valueOf(){return s.length!==i.length&&t.append(...i),t}}};var{isArray:S}=Array,{indexOf:vt,slice:At}=[];var $=!1,C=class{constructor(e,r){$=!0,this._=(...s)=>e(...s,r)}};var L=t=>e=>{for(let r in e){let s=r==="role"?r:`aria-${r}`,i=e[r];i==null?t.removeAttribute(s):t.setAttribute(s,i)}},M=(t,e)=>{let r,s=!0,i=document.createAttributeNS(null,e);return n=>{if(r!==n)if(r=n,r==null)s||(t.removeAttributeNode(i),s=!0);else{let o=$&&n instanceof C?n._(t,e):n;o==null?(s||t.removeAttributeNode(i),s=!0):(i.value=o,s&&(t.setAttributeNodeNS(i),s=!1))}}},k=(t,e,r)=>s=>{r!==!!s&&((r=!!s)?t.setAttribute(e,""):t.removeAttribute(e))},et=({dataset:t})=>e=>{for(let r in e){let s=e[r];s==null?delete t[r]:t[r]=s}},N=(t,e)=>{let r,s,i=e.slice(2);return!(e in t)&&(s=e.toLowerCase())in t&&(i=s.slice(2)),n=>{let o=S(n)?n:[n,!1];r!==o[0]&&(r&&t.removeEventListener(i,r,o[1]),(r=o[0])&&t.addEventListener(i,r,o[1]))}},P=t=>{let e;return r=>{e!==r&&(e=r,typeof r=="function"?r(t):r.current=t)}},R=(t,e)=>e==="dataset"?et(t):r=>{t[e]=r},B=t=>{let e;return r=>{e!=r&&(e=r,t.textContent=r??"")}};var D=(t,e,r,s,i)=>{let n=r.length,o=e.length,l=n,a=0,c=0,f=null;for(;a<o||c<l;)if(o===a){let u=l<n?c?s(r[c-1],-0).nextSibling:s(r[l-c],0):i;for(;c<l;)t.insertBefore(s(r[c++],1),u)}else if(l===c)for(;a<o;)(!f||!f.has(e[a]))&&t.removeChild(s(e[a],-1)),a++;else if(e[a]===r[c])a++,c++;else if(e[o-1]===r[l-1])o--,l--;else if(e[a]===r[l-1]&&r[c]===e[o-1]){let u=s(e[--o],-1).nextSibling;t.insertBefore(s(r[c++],1),s(e[a++],-1).nextSibling),t.insertBefore(s(r[--l],1),u),e[o]=r[l]}else{if(!f){f=new Map;let u=c;for(;u<l;)f.set(r[u],u++)}if(f.has(e[a])){let u=f.get(e[a]);if(c<u&&u<l){let v=a,A=1;for(;++v<o&&v<l&&f.get(e[v])===u+A;)A++;if(A>u-c){let Q=s(e[a],0);for(;c<u;)t.insertBefore(s(r[c++],1),Q)}else t.replaceChild(s(r[c++],1),s(e[a++],-1))}else a++}else t.removeChild(s(e[a++],-1))}return r};var{isArray:E,prototype:rt}=Array,{indexOf:F}=rt;var{createDocumentFragment:st,createElement:nt,createElementNS:ot,createTextNode:j,createTreeWalker:H,importNode:W}=new Proxy(document,{get:(t,e)=>t[e].bind(t)});var it=t=>{let e=nt("template");return e.innerHTML=t,e.content},b,ct=t=>{b||(b=ot("http://www.w3.org/2000/svg","svg")),b.innerHTML=t;let e=st();return e.append(...b.childNodes),e},q=(t,e)=>e?ct(t):it(t);var lt=({childNodes:t},e)=>t[e],x=(t,e,r)=>D(t.parentNode,e,r,T,t),at=t=>{let e,r,s=[],i=n=>{switch(typeof n){case"string":case"number":case"boolean":e!==n&&(e=n,r||(r=j("")),r.data=n,s=x(t,s,[r]));break;case"object":case"undefined":if(n==null){e!=n&&(e=n,s=x(t,s,[]));break}if(E(n)){e=n,n.length===0?s=x(t,s,[]):typeof n[0]=="object"?s=x(t,s,n):i(String(n));break}e!==n&&"ELEMENT_NODE"in n&&(e=n,s=x(t,s,n.nodeType===11?[...n.childNodes]:[n]));break;case"function":i(n(t));break}};return i},ft=(t,e)=>{switch(e[0]){case"?":return k(t,e.slice(1),!1);case".":return R(t,e.slice(1));case"@":return N(t,"on"+e.slice(1));case"o":if(e[1]==="n")return N(t,e)}switch(e){case"ref":return P(t);case"aria":return L(t)}return M(t,e)};function z(t){let{type:e,path:r}=t,s=r.reduceRight(lt,this);return e==="node"?at(s):e==="attr"?ft(s,t.name):B(s)}var _=t=>{let e=[],{parentNode:r}=t;for(;r;)e.push(F.call(r.childNodes,t)),t=r,{parentNode:r}=t;return e},m="is\xB5",I=new h,ut=/^(?:textarea|script|style|title|plaintext|xmp)$/,d=()=>({stack:[],entry:null,wire:null}),ht=(t,e)=>{let{content:r,updates:s}=dt(t,e);return{type:t,template:e,content:r,updates:s,wire:null}},pt=(t,e)=>{let r=t==="svg",s=O(e,m,r),i=q(s,r),n=H(i,129),o=[],l=e.length-1,a=0,c=`${m}${a}`;for(;a<l;){let f=n.nextNode();if(!f)throw`bad template: ${s}`;if(f.nodeType===8)f.data===c&&(o.push({type:"node",path:_(f)}),c=`${m}${++a}`);else{for(;f.hasAttribute(c);)o.push({type:"attr",path:_(f),name:f.getAttribute(c)}),f.removeAttribute(c),c=`${m}${++a}`;ut.test(f.localName)&&f.textContent.trim()===`<!--${c}-->`&&(f.textContent="",o.push({type:"text",path:_(f)}),c=`${m}${++a}`)}}return{content:i,nodes:o}},dt=(t,e)=>{let{content:r,nodes:s}=I.get(e)||I.set(e,pt(t,e)),i=W(r,!0),n=s.map(z,i);return{content:i,updates:n}},g=(t,{type:e,template:r,values:s})=>{let i=G(t,s),{entry:n}=t;(!n||n.template!==r||n.type!==e)&&(t.entry=n=ht(e,r));let{content:o,updates:l,wire:a}=n;for(let c=0;c<i;c++)l[c](s[c]);return a||(n.wire=w(o))},G=({stack:t},e)=>{let{length:r}=e;for(let s=0;s<r;s++){let i=e[s];i instanceof p?e[s]=g(t[s]||(t[s]=d()),i):E(i)?G(t[s]||(t[s]=d()),i):t[s]=null}return r<t.length&&t.splice(r),r},p=class{constructor(e,r,s){this.type=e,this.template=r,this.values=s}};var J=t=>{let e=new h,r=s=>(i,...n)=>g(s,{type:t,template:i,values:n});return Object.assign((s,...i)=>new p(t,s,i),{for(s,i){let n=e.get(s)||e.set(s,new y);return n.get(i)||n.set(i,r(d()))},node:(s,...i)=>g(d(),new p(t,s,i)).valueOf()})},U=new h,K=(t,e)=>{let r=typeof e=="function"?e():e,s=U.get(t)||U.set(t,d()),i=r instanceof p?g(s,r):r;return i!==s.wire&&(s.wire=i,t.replaceChildren(i.valueOf())),t},xt=J("html"),mt=J("svg");function gt(t){let e=Object.keys(t.props||{}),r=new Event("update");class s extends HTMLElement{constructor(){super().attachShadow({mode:"open"}),Object.assign(this,t),this.refs={},e.forEach(o=>{let[l,a]=this.props[o];Object.defineProperty(this,o,{get:()=>{let c=this.getAttribute(o)||a;switch(l){case String:return c;case Boolean:return[!0,"true"].includes(c);default:return l(c)}},set:c=>this.setAttribute(o,c)})});let n=o=>{if(o===null||typeof o!="object")return o;for(let l in o)o[l]=n(o[l]);return new Proxy(o,{get:(l,a)=>l[a],set:(l,a,c)=>(l[a]=n(c),this.dispatchEvent(r),!0),deleteProperty:(l,a)=>(delete l[a],this.dispatchEvent(r),!0)})};typeof this.state=="function"&&(this._state=n(this.state()),delete this.state,Object.keys(this._state).forEach(o=>{Object.defineProperty(this,o,{get:()=>this._state[o],set:l=>this._state[o]=l})})),typeof this.intersect=="function"&&new IntersectionObserver(o=>o.forEach(l=>{l.isIntersecting&&this.intersect(l.intersectionRatio.toFixed(2))}),{root:null,rootMargin:"0px",threshold:[.1,.2,.3,.4,.5,.6,.7,.8,.9,1]}).observe(this)}context(n){if(this._ctx||(this._ctx={}),this._ctx[n])return this._ctx[n];{let o=(l,a=this)=>{function c(f){if(!f||f===document||f===window)return null;let u=f.closest(l);return u||c(f.getRootNode().host)}return c(a)};return this._ctx[n]=o(`[context=${n}]`),this._ctx[n].addEventListener("update",()=>this.dispatchEvent(r)),this._ctx[n]}}debounce(n){var o;return function(){var l=this,a=arguments;o&&window.cancelAnimationFrame(o),o=window.requestAnimationFrame(function(){n.apply(l,a)})}}render(){K(this.shadowRoot,this.template()),this.shadowRoot.querySelectorAll("[ref]").forEach(n=>{this.refs[n.getAttribute("ref")]=n})}connectedCallback(){this.addEventListener("update",this.debounce(this.render)),this.dispatchEvent(r),this?.ready&&this.ready()}static get observedAttributes(){return e}attributeChangedCallback(){this.dispatchEvent(r)}}!customElements.get(t.component)&&customElements.define(t.component,s)}export{gt as default,xt as html,mt as svg};
/*! (c) Andrea Giammarchi - ISC */
