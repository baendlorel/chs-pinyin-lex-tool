(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=Array.isArray;Array.from;var t=Object.is,n=Object.assign,r=Object.keys,i=Object.defineProperties,a=Object.entries,o=e=>e==null||e===!1,s=e=>e?typeof e==`string`?e:typeof e==`object`?e.isKT?s(e.value):a(e).map(e=>`${e[0].replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}:${e[1]}`).join(`;`):``:``;(()=>{let e=Object.getOwnPropertyDescriptor(Node.prototype,`isConnected`);if(e&&e.get){let t=e.get;return e=>t.call(e)}return e=>document.contains(e)})();var c=()=>!0,l=e=>e,u=(n,i)=>{let a=r(i);for(let r of a){let a=i[r],o=n[r];if(e(a)){if(!e(o)||a.length!==o.length)return!1;for(let e=0;e<a.length;e++)if(typeof a[e]==`object`&&a[e]!==null){if(typeof o[e]!=`object`||o[e]===null||!u(o[e],a[e]))return!1}else if(!t(a[e],o[e]))return!1}else if(typeof a==`object`&&a){if(typeof o!=`object`||!o||!u(o,a))return!1}else if(!t(a,o))return!1}return!0};Reflect.set(window,`__ktjs__`,`__VERSION__`),Node.prototype._appendTo=function(e){return e.appendChild(this)};function d(e){}var f=d,p=function(e){return e[e.Ref=2]=`Ref`,e[e.SubRef=4]=`SubRef`,e[e.Computed=8]=`Computed`,e[e.Reactive=e.Ref|e.Computed]=`Reactive`,e[e.Custom=1<<30]=`Custom`,e}({}),m=1,h=()=>m++,g=class{constructor(e){this.kid=h(),this._listeners=new Set,this._value=e}get value(){return this._value}set value(e){$warn(`Setting value to a non-ref instance takes no effect.`)}_emit(e,t){return this._listeners.forEach(n=>n(e,t)),this}listen(e){return this._listeners.has(e)&&$throw(`Overriding existing change handler with ${e.toString()}.`),this._listeners.add(e),this}unlisten(e){return this._listeners.delete(e),this}unlistenAll(){return this._listeners.clear(),this}notify(){return this._emit(this._value,this._value)}map(e,t){return e||t||null}is(e){return e}match(e){return e}get(...e){return null}},_=e=>typeof e?.ktype==`number`?e.ktype===p.Ref||e.ktype===p.SubRef:!1,v=e=>typeof e?.ktype==`number`?(e.ktype&p.Reactive)!==0:!1,y=e=>typeof e?.ktype==`number`,b=e=>{switch(e.length){case 1:return t=>t[e[0]];case 2:return t=>t[e[0]][e[1]];case 3:return t=>t[e[0]][e[1]][e[2]];default:return t=>{let n=t[e[0]][e[1]][e[2]];for(let t=3;t<e.length;t++)n=n[e[t]];return n}}},x=e=>{switch(e.length){case 1:return(t,n)=>t[e[0]]=n;case 2:return(t,n)=>t[e[0]][e[1]]=n;case 3:return(t,n)=>t[e[0]][e[1]][e[2]]=n;default:return(t,n)=>{let r=t[e[0]][e[1]][e[2]];for(let t=3;t<e.length-1;t++)r=r[e[t]];r[e[e.length-1]]=n}}},S=(e,t,n)=>{t in e?e[t]=!!n:e.setAttribute(t,n)},C=(e,t,n)=>{t in e?e[t]=n:e.setAttribute(t,n)},w={checked:S,selected:S,value:C,valueAsDate:C,valueAsNumber:C,defaultValue:C,defaultChecked:S,defaultSelected:S,disabled:S,readOnly:S,multiple:S,required:S,autofocus:S,open:S,controls:S,autoplay:S,loop:S,muted:S,defer:S,async:S,hidden:(e,t,n)=>e.hidden=!!n},T=(e,t,n)=>e.setAttribute(t,n),E=(e,t)=>{y(e)?(t(e.value,e.value),e.listen(t)):t(e,e)},D=(e,t)=>{e!==void 0&&E(e,t)};function ee(t,r){f(t),D(r.class??r.className,n=>t.classList=e(n)?n.join(` `):n),D(r.style,e=>{typeof e==`string`?t.style.cssText=e:typeof e==`object`&&n(t.style,e)}),D(r[`k-html`],e=>t.innerHTML=e);for(let e in r){if(e===`k-model`||e===`k-for`||e===`k-key`||e===`ref`||e===`class`||e===`className`||e===`style`||e===`children`||e===`k-html`||r[e]===void 0)continue;if(e.startsWith(`on:`)){let n=e.slice(3);E(r[e],(e,r)=>{t.removeEventListener(n,r),t.addEventListener(n,e)});continue}let n=w[e]??T;E(r[e],r=>n(t,e,r))}}var O=function(e){return e.Null=`kt-null`,e.Content=`kt-content`,e.Fragment=`kt-fragment`,e.For=`kt-for`,e.If=`kt-if`,e.Async=`kt-async`,e}({}),k=Comment.prototype.remove,A=class extends Comment{constructor(e){super(),this.atype=e}remove(){this._remove.call(this),k.call(this)}};new class extends A{constructor(){super(O.Null)}_appendTo(e){return this}_remove(){}};var j=e=>typeof e?._appendTo==`function`,te=e=>typeof e?.nodeType==`number`?e:document.createTextNode(e),ne=class extends A{_load(t){if(o(t))this._current=this,this._insertTo=this._insertOneTo,this._remove=this._removeOne;else if(e(t)){this._current=[];for(let e=0;e<t.length;e++)o(t[e])||this._current.push(re(t[e]));this._insertTo=this._insertArrayTo,this._remove=this._removeArray}else this._current=te(t),this._insertTo=this._insertOneTo,this._remove=this._removeOne}constructor(e){super(O.Content),this._load(e.value),e.listen(e=>{this._remove.call(this),this._load(e),this.parentNode&&this._insertTo.call(this,this.parentNode)})}_insertOneTo(e){this._current!==this&&e.insertBefore(this._current,this)}_insertArrayTo(e){if(this._current!==this){f(this._current);for(let t=0;t<this._current.length;t++)e.insertBefore(this._current[t],this)}}_removeOne(){this._current!==this&&this._current.remove()}_removeArray(){f(this._current);for(let e=0;e<this._current.length;e++)this._current[e].remove()}_appendTo(e){return e.appendChild(this),this._insertTo.call(this,e),this}},re=e=>y(e)?new ne(e):j(e)?e:te(e);function ie(t,n){if(!o(n))if(e(n))for(let e=0;e<n.length;e++)ie(t,n[e]);else re(n)._appendTo(t)}function ae(e,t){if(!(`k-model`in t))return;let n=t[`k-model`];if(_(n)||$throw(`k-model value must be a KTRef.`),e.tagName===`INPUT`){f(e),e.type===`radio`||e.type===`checkbox`?(e.checked=!!n.value,e.addEventListener(`change`,()=>n.value=e.checked),n.listen(t=>e.checked=!!t)):(e.value=n.value??``,e.addEventListener(`input`,()=>n.value=e.value),n.listen(t=>e.value=t));return}if(e.tagName===`SELECT`||e.tagName===`TEXTAREA`){f(e),e.value=n.value??``,e.addEventListener(`change`,()=>n.value=e.value),n.listen(t=>e.value=t);return}$warn(`not supported element for k-model, nodeType: ${e.nodeType}`)}var oe=(e,t,n)=>(typeof t==`object`&&t&&(ae(e,t),ee(e,t)),ie(e,n),e),se=(e,t,n)=>oe(document.createElement(e),t,n),ce=(e,t,n)=>oe(document.createElementNS(`http://www.w3.org/2000/svg`,e),t,n),le=new Map,ue=!1,de=e=>{if(!le.has(e)){if(le.set(e,e._value),ue)return;ue=!0,Promise.resolve().then(()=>{ue=!1,le.forEach((e,t)=>{try{t._listeners.forEach(n=>n(t.value,e))}catch(e){$error(`KTScheduler:`,e)}}),le.clear()})}},fe=class extends g{constructor(e){super(e),this.ktype=p.Ref}get value(){return this._value}set value(e){if(t(e,this._value))return;let n=this._value;this._value=e,this._emit(e,n)}get draft(){return de(this),this._value}notify(){return this._emit(this._value,this._value)}subref(...e){return e.length===0&&$throw(`At least one key is required to get a sub-ref.`),(this._value===null||typeof this._value!=`object`&&typeof this._value!=`function`)&&$throw(`Sub-ref only supports object-like ref values.`),new me(this,b(e),x(e))}dispose(){this._listeners.clear()}},M=e=>new fe(e),pe=(e,t)=>{if(!(`ref`in e))return t;if(_(e.ref))return e.ref.value=t;$throw(`props.ref must be a KTRef`)},me=class extends fe{constructor(e,t,n){super(t(e.value)),this.kid=h(),this.ktype=p.SubRef,this.source=e,this._getter=t,this._setter=n,this._listener=()=>this._value=t(e.value),e.listen(this._listener)}get value(){return this._value}set value(e){(this.source.value===null||typeof this.source.value!=`object`&&typeof this.source.value!=`function`)&&$throw(`Sub-ref only supports object-like ref values.`),this._value=e,this._setter(this.source._value,e),this.source.notify()}listen(e){return this.source.listen((t,n)=>e(this._getter(t),this._getter(n))),this}unlisten(e){return this.source.unlisten(e),this}dispose(){this.source.unlisten(this._listener)}get(...e){e.length,$throw(`Sub-ref does not support get() method.`)}get draft(){return de(this.source),this._value}},he=(e,t)=>typeof e==`function`?e(t):se(e,t,t.children),N=(e,t)=>pe(t,he(e,t)),P=(e,t)=>pe(t,ce(e,t,t.children)),F=N,I=class extends g{_recalculate(e=!1){let n=this._calculator(),r=this._value;return(!t(r,n)||e)&&(this._value=n,this._emit(n,r)),this}constructor(e,t){super(e()),this.ktype=p.Computed,this._disposed=!1,this._calculator=e,this._dependencies=t,this._listener=()=>this._recalculate();for(let e=0;e<t.length;e++)t[e].listen(this._listener)}notify(){return this._recalculate(!0)}dispose(){if(!this._disposed){this._disposed=!0;for(let e=0;e<this._dependencies.length;e++)this._dependencies[e].unlisten(this._listener);this._dependencies.length=0,this._listeners.clear()}}};g.prototype.map=function(e,t){return new I(()=>e(this._value),t?[this,...t]:[this])},g.prototype.is=function(e){return v(e)?new I(()=>t(this._value,e.value),[this,e]):new I(()=>t(this._value,e),[this])},g.prototype.match=function(e){return v(e)?new I(()=>u(this._value,e.value),[this,e]):new I(()=>u(this._value,e),[this])},g.prototype.get=function(...e){e.length===0&&$throw(`At least one key is required to get a sub-computed.`);let t=b(e);return new I(()=>t(this._value),[this])};var L=(e,t)=>new I(e,t);function ge(e,t,n){let{lazy:r=!1,onCleanup:i=c,debugName:a=``}=Object(n),o=!0,s=()=>{if(o){i();try{e()}catch(e){$debug(`effect error:`,a,e)}}};for(let e=0;e<t.length;e++)t[e].listen(s);return r||s(),()=>{if(o){o=!1;for(let e=0;e<t.length;e++)t[e].unlisten(s);i()}}}var _e=e=>y(e)?e:new fe(e),ve=class extends A{_load(e,t,n){let r=[];for(let t=0;t<e.length;t++)o(e[t])||r.push(re(n(e[t],t,e)));this._current=r}constructor(e,t,n){super(O.For),y(e)?(this._load(e.value,t,n),e.listen(e=>{this._remove(),this._load(e,t,n),this.parentNode&&this._insertTo(this.parentNode)})):this._load(e,t,n)}_insertTo(e){for(let t=0;t<this._current.length;t++)this._current[t]._appendTo(e)}_appendTo(e){return this._insertTo(e),e.appendChild(this)}_remove(){for(let e=0;e<this._current.length;e++)this._current[e].remove()}};function ye(e){return new ve(e.list,e.key??l,e.map??l)}var be=class extends A{_createRenderer(e,t){return typeof e==`function`?()=>e(t()):()=>{let n=t();return se(e,n,n.children)}}constructor(e,t,n,r,i){super(O.If),this._condition=e,this._current=this,this._if=this._createRenderer(t,n),this._else=r===void 0?()=>this:this._createRenderer(r,i),e.listen(e=>{let t=this._current;this._current=e?this._if():this._else(),t.replaceWith(this._current)})}_appendTo(e){return this._current=this._condition.value?this._if():this._else(),this._current!==this&&this._current._appendTo(e),e.appendChild(this)}_remove(){this.remove()}};function R(e,t,n,r,i){return y(e)?new be(e,t,n,r,i):e?he(t,n()):r===void 0?null:he(r,i())}var z=(e,...t)=>(n=Math.random().toString(36).substring(2,9))=>{if(console.log(`Injecting CSS for ${n}...`),document.querySelector(`style[kt-mui-name="${n}"]`))return;let r=document.createElement(`style`);r.textContent=String.raw(e,...t),r.setAttribute(`kt-mui-name`,n),document.head.appendChild(r)};z`
  /* Global UI Color Variables - MUI-like color palette */

  :root {
    /* Primary colors */
    --kt-color-primary: rgb(25, 118, 210);
    --kt-color-primary-light: rgb(66, 165, 245);
    --kt-color-primary-dark: rgb(21, 101, 192);

    /* Secondary colors */
    --kt-color-secondary: rgb(156, 39, 176);
    --kt-color-secondary-light: rgb(186, 104, 200);
    --kt-color-secondary-dark: rgb(123, 31, 162);

    /* Error colors */
    --kt-color-error: rgb(211, 47, 47);
    --kt-color-error-light: rgb(239, 83, 80);
    --kt-color-error-dark: rgb(198, 40, 40);

    /* Warning colors */
    --kt-color-warning: rgb(237, 108, 2);
    --kt-color-warning-light: rgb(255, 152, 0);
    --kt-color-warning-dark: rgb(230, 81, 0);

    /* Info colors */
    --kt-color-info: rgb(2, 136, 209);
    --kt-color-info-light: rgb(41, 182, 246);
    --kt-color-info-dark: rgb(1, 87, 155);

    /* Success colors */
    --kt-color-success: rgb(46, 125, 50);
    --kt-color-success-light: rgb(102, 187, 106);
    --kt-color-success-dark: rgb(27, 94, 32);

    /* Text colors */
    --kt-color-text-primary: rgba(0, 0, 0, 0.87);
    --kt-color-text-secondary: rgba(0, 0, 0, 0.6);
    --kt-color-text-disabled: rgba(0, 0, 0, 0.38);

    /* Background colors */
    --kt-color-background-paper: rgb(255, 255, 255);
    --kt-color-background-default: rgb(250, 250, 250);

    /* Divider */
    --kt-color-divider: rgba(0, 0, 0, 0.12);
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    :root {
      /* Primary colors */
      --kt-color-primary: rgb(144, 202, 249);
      --kt-color-primary-light: rgb(179, 229, 252);
      --kt-color-primary-dark: rgb(66, 165, 245);

      /* Secondary colors */
      --kt-color-secondary: rgb(206, 147, 216);
      --kt-color-secondary-light: rgb(225, 190, 231);
      --kt-color-secondary-dark: rgb(186, 104, 200);

      /* Error colors */
      --kt-color-error: rgb(244, 67, 54);
      --kt-color-error-light: rgb(229, 115, 115);
      --kt-color-error-dark: rgb(211, 47, 47);

      /* Warning colors */
      --kt-color-warning: rgb(255, 152, 0);
      --kt-color-warning-light: rgb(255, 183, 77);
      --kt-color-warning-dark: rgb(245, 124, 0);

      /* Info colors */
      --kt-color-info: rgb(41, 182, 246);
      --kt-color-info-light: rgb(79, 195, 247);
      --kt-color-info-dark: rgb(2, 136, 209);

      /* Success colors */
      --kt-color-success: rgb(102, 187, 106);
      --kt-color-success-light: rgb(129, 199, 132);
      --kt-color-success-dark: rgb(76, 175, 80);

      /* Text colors */
      --kt-color-text-primary: rgba(255, 255, 255, 0.87);
      --kt-color-text-secondary: rgba(255, 255, 255, 0.6);
      --kt-color-text-disabled: rgba(255, 255, 255, 0.38);

      /* Background colors */
      --kt-color-background-paper: rgb(18, 18, 18);
      --kt-color-background-default: rgb(12, 12, 12);

      /* Divider */
      --kt-color-divider: rgba(255, 255, 255, 0.12);
    }
  }
`();var xe=z`
  /* Alert Component Styles - Mimics MUI Alert */

  .mui-alert {
    display: flex;
    padding: 6px 16px;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.43;
    border-radius: 4px;
    letter-spacing: 0.01071em;
    align-items: center;
    gap: 12px;
    position: relative;
  }

  .mui-alert-icon-wrapper {
    display: flex;
    opacity: 0.9;
    padding: 7px 0;
    font-size: 22px;
    margin-right: -4px;
  }

  .mui-alert-icon {
    flex-shrink: 0;
  }

  .mui-alert-message {
    padding: 8px 0;
    min-width: 0;
    overflow: auto;
    flex: 1;
  }

  .mui-alert-close {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    margin-left: auto;
    margin-right: -8px;
    border-radius: 4px;
    opacity: 0.6;
    transition:
      opacity 0.3s,
      background-color 0.3s;
  }

  .mui-alert-close:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.04);
  }

  /* Standard Variant */
  .mui-alert-standard.mui-alert-success {
    color: rgb(30, 70, 32);
    background-color: rgb(237, 247, 237);
  }

  .mui-alert-standard.mui-alert-info {
    color: rgb(1, 67, 97);
    background-color: rgb(229, 246, 253);
  }

  .mui-alert-standard.mui-alert-warning {
    color: rgb(102, 60, 0);
    background-color: rgb(255, 244, 229);
  }

  .mui-alert-standard.mui-alert-error {
    color: rgb(95, 33, 32);
    background-color: rgb(253, 237, 237);
  }

  /* Filled Variant */
  .mui-alert-filled.mui-alert-success {
    color: rgb(255, 255, 255);
    background-color: rgb(46, 125, 50);
  }

  .mui-alert-filled.mui-alert-info {
    color: rgb(255, 255, 255);
    background-color: rgb(2, 136, 209);
  }

  .mui-alert-filled.mui-alert-warning {
    color: rgb(255, 255, 255);
    background-color: rgb(237, 108, 2);
  }

  .mui-alert-filled.mui-alert-error {
    color: rgb(255, 255, 255);
    background-color: rgb(211, 47, 47);
  }

  /* Outlined Variant */
  .mui-alert-outlined.mui-alert-success {
    color: rgb(30, 70, 32);
    border: 1px solid rgb(46, 125, 50);
    background-color: transparent;
  }

  .mui-alert-outlined.mui-alert-info {
    color: rgb(1, 67, 97);
    border: 1px solid rgb(2, 136, 209);
    background-color: transparent;
  }

  .mui-alert-outlined.mui-alert-warning {
    color: rgb(102, 60, 0);
    border: 1px solid rgb(237, 108, 2);
    background-color: transparent;
  }

  .mui-alert-outlined.mui-alert-error {
    color: rgb(95, 33, 32);
    border: 1px solid rgb(211, 47, 47);
    background-color: transparent;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .mui-alert-standard.mui-alert-success {
      color: rgb(183, 223, 185);
      background-color: rgb(12, 19, 13);
    }

    .mui-alert-standard.mui-alert-info {
      color: rgb(166, 213, 250);
      background-color: rgb(7, 19, 24);
    }

    .mui-alert-standard.mui-alert-warning {
      color: rgb(255, 213, 153);
      background-color: rgb(25, 18, 7);
    }

    .mui-alert-standard.mui-alert-error {
      color: rgb(244, 199, 199);
      background-color: rgb(22, 11, 11);
    }

    .mui-alert-close:hover {
      background-color: rgba(255, 255, 255, 0.08);
    }
  }
`,B=(e,t,n)=>{if(n)for(let r in t)r.startsWith(`on:`)&&!n.includes(r)&&e.addEventListener(r.slice(3),t[r]);else for(let n in t)n.startsWith(`on:`)&&e.addEventListener(n.slice(3),t[n])},Se=class e{constructor(e){this.kid=-1,this.ktype=p.Custom,this.value=e}_emit(e,t){throw Error(`Method not implemented.`)}unlistenAll(){throw Error(`Method not implemented.`)}notify(){throw Error(`Method not implemented.`)}get(...e){throw Error(`Method not implemented.`)}dispose(){throw Error(`Method not implemented.`)}listen(e,t){return this}unlisten(e){return this}map(t,n){return new e(t(this.value))}is(t){return y(t)?new e(t.value===this.value):new e(t===this.value)}match(t){return y(t)?new e(u(this.value,t.value)):new e(u(this.value,t))}},V=e=>y(e)?e:new Se(e),Ce=(e,t)=>{if(`k-model`in e){let t=e[`k-model`];if(_(t))return t;$throw(`k-model data must be a KTRef object, please use 'ref(...)' to wrap it.`)}return M(t)},we={success:(e,t)=>P(`svg`,{class:e,viewBox:`0 0 24 24`,width:t,height:t,children:P(`path`,{fill:`currentColor`,d:`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z`})}),error:(e,t)=>P(`svg`,{class:e,viewBox:`0 0 24 24`,width:t,height:t,children:P(`path`,{fill:`currentColor`,d:`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z`})}),warning:(e,t)=>P(`svg`,{class:e,viewBox:`0 0 24 24`,width:t,height:t,children:P(`path`,{fill:`currentColor`,d:`M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z`})}),info:(e,t)=>P(`svg`,{class:e,viewBox:`0 0 24 24`,width:t,height:t,children:P(`path`,{fill:`currentColor`,d:`M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z`})})};function Te(e){let t=V(e.class??``),n=V(s(e.style)),r=_e(e.children),i=V(e.severity??`info`),a=V(e.variant??`standard`),o=_e(e.icon??!0),c=V(e.iconSize??`22px`),l=e[`on:close`],u=L(()=>`mui-alert mui-alert-${i.value} mui-alert-${a.value} ${t.value?t.value:``}`,[i,a,t]),d=L(()=>o.value===!1?null:o.value===!0?(we[i.value]||we.info)(`mui-alert-icon`,c.value):o,[o,c,i]),f=F(`div`,{class:u,style:n,role:`alert`,children:[d&&N(`div`,{class:`mui-alert-icon-wrapper`,children:d}),N(`div`,{class:`mui-alert-message`,children:r}),R(l,`button`,()=>({class:`mui-alert-close`,"on:click":l,"aria-label":`Close`,children:P(`svg`,{viewBox:`0 0 24 24`,width:`18px`,height:`18px`,children:P(`path`,{fill:`currentColor`,d:`M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z`})})}))]});return B(f,e),f}var Ee=(...e)=>(xe(`Alert`),(Ee=Te)(...e)),De=z`
/* Button Component Styles - MUI-like */

.mui-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  min-width: 64px;
  transition:
    background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  border-radius: 4px;
}

.mui-button:hover {
  text-decoration: none;
}

.mui-button-fullwidth {
  width: 100%;
}

.mui-button-disabled {
  pointer-events: none;
  cursor: default;
}

/* Button label */
.mui-button-label {
  width: 100%;
  display: inherit;
  align-items: inherit;
  justify-content: inherit;
}

/* Icons */
.mui-button-start-icon {
  display: inherit;
  margin-right: 8px;
  margin-left: -4px;
  min-width: 20px;
}

.mui-button-end-icon {
  display: inherit;
  margin-left: 8px;
  margin-right: -4px;
  min-width: 20px;
}

.mui-button-size-small .mui-button-start-icon {
  margin-left: -2px;
}

.mui-button-size-small .mui-button-end-icon {
  margin-right: -2px;
}

/* Size variants */
.mui-button-size-small {
  padding: 4px 10px;
  font-size: 0.8125rem;
}

.mui-button-size-medium {
  padding: 6px 16px;
  font-size: 0.875rem;
}

.mui-button-size-large {
  padding: 8px 22px;
  font-size: 0.9375rem;
}

/* Icon-only variant */
.mui-button-icon-only {
  min-width: auto;
  padding: 8px;
}

.mui-button-icon-only.mui-button-size-small {
  padding: 5px;
}

.mui-button-icon-only.mui-button-size-medium {
  padding: 8px;
}

.mui-button-icon-only.mui-button-size-large {
  padding: 12px;
}

.mui-button-icon-only .mui-button-start-icon,
.mui-button-icon-only .mui-button-end-icon {
  margin: 0;
}

/* Text variant */
.mui-button-text {
  padding: 6px 8px;
}

.mui-button-text.mui-button-size-small {
  padding: 4px 5px;
}

.mui-button-text.mui-button-size-large {
  padding: 8px 11px;
}

/* Text variant - Primary */
.mui-button-text-primary {
  color: #1976d2;
}

.mui-button-text-primary:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

/* Text variant - Secondary */
.mui-button-text-secondary {
  color: #9c27b0;
}

.mui-button-text-secondary:hover {
  background-color: rgba(156, 39, 176, 0.04);
}

/* Text variant - Error */
.mui-button-text-error {
  color: #d32f2f;
}

.mui-button-text-error:hover {
  background-color: rgba(211, 47, 47, 0.04);
}

/* Text variant - Warning */
.mui-button-text-warning {
  color: #ed6c02;
}

.mui-button-text-warning:hover {
  background-color: rgba(237, 108, 2, 0.04);
}

/* Text variant - Info */
.mui-button-text-info {
  color: #0288d1;
}

.mui-button-text-info:hover {
  background-color: rgba(2, 136, 209, 0.04);
}

/* Text variant - Success */
.mui-button-text-success {
  color: #2e7d32;
}

.mui-button-text-success:hover {
  background-color: rgba(46, 125, 50, 0.04);
}

/* Outlined variant */
.mui-button-outlined {
  border: 1px solid rgba(25, 118, 210, 0.5);
  padding: 5px 15px;
}

.mui-button-outlined.mui-button-size-small {
  padding: 3px 9px;
}

.mui-button-outlined.mui-button-size-large {
  padding: 7px 21px;
}

/* Outlined variant - Primary */
.mui-button-outlined-primary {
  color: #1976d2;
  border-color: rgba(25, 118, 210, 0.5);
}

.mui-button-outlined-primary:hover {
  border-color: #1976d2;
  background-color: rgba(25, 118, 210, 0.04);
}

/* Outlined variant - Secondary */
.mui-button-outlined-secondary {
  color: #9c27b0;
  border-color: rgba(156, 39, 176, 0.5);
}

.mui-button-outlined-secondary:hover {
  border-color: #9c27b0;
  background-color: rgba(156, 39, 176, 0.04);
}

/* Outlined variant - Error */
.mui-button-outlined-error {
  color: #d32f2f;
  border-color: rgba(211, 47, 47, 0.5);
}

.mui-button-outlined-error:hover {
  border-color: #d32f2f;
  background-color: rgba(211, 47, 47, 0.04);
}

/* Outlined variant - Warning */
.mui-button-outlined-warning {
  color: #ed6c02;
  border-color: rgba(237, 108, 2, 0.5);
}

.mui-button-outlined-warning:hover {
  border-color: #ed6c02;
  background-color: rgba(237, 108, 2, 0.04);
}

/* Outlined variant - Info */
.mui-button-outlined-info {
  color: #0288d1;
  border-color: rgba(2, 136, 209, 0.5);
}

.mui-button-outlined-info:hover {
  border-color: #0288d1;
  background-color: rgba(2, 136, 209, 0.04);
}

/* Outlined variant - Success */
.mui-button-outlined-success {
  color: #2e7d32;
  border-color: rgba(46, 125, 50, 0.5);
}

.mui-button-outlined-success:hover {
  border-color: #2e7d32;
  background-color: rgba(46, 125, 50, 0.04);
}

/* Contained variant - Primary */
.mui-button-contained-primary {
  color: #fff;
  background-color: #1976d2;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-primary:hover {
  background-color: #1565c0;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-primary:active {
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

/* Contained variant - Secondary */
.mui-button-contained-secondary {
  color: #fff;
  background-color: #9c27b0;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-secondary:hover {
  background-color: #7b1fa2;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

/* Contained variant - Error */
.mui-button-contained-error {
  color: #fff;
  background-color: #d32f2f;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-error:hover {
  background-color: #c62828;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

/* Contained variant - Warning */
.mui-button-contained-warning {
  color: #fff;
  background-color: #ed6c02;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-warning:hover {
  background-color: #e65100;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

/* Contained variant - Info */
.mui-button-contained-info {
  color: #fff;
  background-color: #0288d1;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-info:hover {
  background-color: #01579b;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

/* Contained variant - Success */
.mui-button-contained-success {
  color: #fff;
  background-color: #2e7d32;
  box-shadow:
    0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}

.mui-button-contained-success:hover {
  background-color: #1b5e20;
  box-shadow:
    0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14),
    0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

/* Disabled states */
.mui-button-text.mui-button-disabled {
  color: rgba(0, 0, 0, 0.26);
}

.mui-button-outlined.mui-button-disabled {
  color: rgba(0, 0, 0, 0.26);
  border-color: rgba(0, 0, 0, 0.12);
}

.mui-button-contained.mui-button-disabled {
  color: rgba(0, 0, 0, 0.26);
  background-color: rgba(0, 0, 0, 0.12);
  box-shadow: none;
}

/* Ripple effect */
.mui-button-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  pointer-events: none;
  overflow: hidden;
}

.mui-button-ripple-effect {
  position: absolute;
  background-color: currentColor;
  opacity: 0.3;
  border-radius: 50%;
  transform: scale(0);
  animation: mui-ripple-animation 600ms ease-out;
  pointer-events: none;
}

@keyframes mui-ripple-animation {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-button-text-primary {
    color: #90caf9;
  }

  .mui-button-text-primary:hover {
    background-color: rgba(144, 202, 249, 0.08);
  }

  .mui-button-text-secondary {
    color: #ce93d8;
  }

  .mui-button-text-secondary:hover {
    background-color: rgba(206, 147, 216, 0.08);
  }

  .mui-button-outlined-primary {
    color: #90caf9;
    border-color: rgba(144, 202, 249, 0.5);
  }

  .mui-button-outlined-primary:hover {
    border-color: #90caf9;
    background-color: rgba(144, 202, 249, 0.08);
  }

  .mui-button-outlined-secondary {
    color: #ce93d8;
    border-color: rgba(206, 147, 216, 0.5);
  }

  .mui-button-outlined-secondary:hover {
    border-color: #ce93d8;
    background-color: rgba(206, 147, 216, 0.08);
  }

  .mui-button-contained-primary {
    background-color: #90caf9;
    color: rgba(0, 0, 0, 0.87);
  }

  .mui-button-contained-primary:hover {
    background-color: #42a5f5;
  }

  .mui-button-contained-secondary {
    background-color: #ce93d8;
    color: rgba(0, 0, 0, 0.87);
  }

  .mui-button-contained-secondary:hover {
    background-color: #ab47bc;
  }

  .mui-button-text.mui-button-disabled {
    color: rgba(255, 255, 255, 0.3);
  }

  .mui-button-outlined.mui-button-disabled {
    color: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.12);
  }

  .mui-button-contained.mui-button-disabled {
    color: rgba(255, 255, 255, 0.3);
    background-color: rgba(255, 255, 255, 0.12);
  }
}

`;function Oe(e){let t=e[`on:click`]??c,n=M(),r=M(),i=_e(e.startIcon),a=_e(e.endIcon),o=V(e.class??``),l=V(s(e.style)),u=V(e.variant??`text`),d=V(e.color??`primary`),f=V(e.size??`medium`),p=V(e.fullWidth??!1),m=V(e.iconOnly??!1),h=V(e.disabled??!1),g=L(()=>[`mui-button`,`mui-button-${u.value}`,`mui-button-${u.value}-${d.value}`,`mui-button-size-${f.value}`,p.value?`mui-button-fullwidth`:``,m.value?`mui-button-icon-only`:``,h.value?`mui-button-disabled`:``,o.value].join(` `),[u,d,f,p,m,h,o]),_=(e,t)=>{let i=n.value,a=r.value;if(!i||!a)return;let o=i.getBoundingClientRect(),s=Math.max(o.width,o.height),c=N(`span`,{class:`mui-button-ripple-effect`,style:`width:${s}px; height:${s}px; left:${e-o.left-s/2}px; top:${t-o.top-s/2}px;`});a.appendChild(c),setTimeout(()=>c.remove(),600)},v=F(`button`,{ref:n,class:g,style:l,type:_e(e.type??`button`),disabled:h,"on:click":e=>{if(h.value){e.preventDefault();return}_(e.clientX,e.clientY),t(e)},children:[R(i,`span`,()=>({class:`mui-button-start-icon`,children:i})),N(`span`,{class:`mui-button-label`,children:e.children}),R(a,`span`,()=>({class:`mui-button-end-icon`,children:a})),N(`span`,{ref:r,class:`mui-button-ripple`})]}),y=e[`on:dblclick`];return y&&v.addEventListener(`dblclick`,e=>{if(h.value){e.preventDefault();return}_(e.clientX,e.clientY),y(e)}),B(v,e,[`on:dblclick`,`on:click`]),v}var H=(...e)=>(De(`Button`),(H=Oe)(...e));z`
.mui-bottom-navigation-root {
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.16);
}

.mui-bottom-navigation-action {
  flex: 1 1 0;
  min-width: 80px;
  max-width: 168px;
  border: 0;
  margin: 0;
  padding: 6px 12px 8px;
  background: transparent;
  color: rgba(0, 0, 0, 0.62);
  
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  transition:
    color 180ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-bottom-navigation-action:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.mui-bottom-navigation-action:focus-visible {
  outline: none;
  background-color: rgba(0, 0, 0, 0.08);
}

.mui-bottom-navigation-action-selected {
  color: rgb(25, 118, 210);
}

.mui-bottom-navigation-action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  min-width: 20px;
  font-size: 1.5rem;
  line-height: 1;
}

.mui-bottom-navigation-action-label {
  display: inline-block;
  font-size: 0.75rem;
  line-height: 1;
  letter-spacing: 0.03333em;
  opacity: 0.72;
  transform: scale(0.88) translateY(2px);
  transition: all 0.16s cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-bottom-navigation-show-labels .mui-bottom-navigation-action-label,
.mui-bottom-navigation-action-show-label .mui-bottom-navigation-action-label,
.mui-bottom-navigation-action-selected .mui-bottom-navigation-action-label {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.mui-bottom-navigation-action-disabled,
.mui-bottom-navigation-action:disabled {
  color: rgba(0, 0, 0, 0.32);
  cursor: default;
}

.mui-bottom-navigation-action-disabled:hover,
.mui-bottom-navigation-action:disabled:hover {
  background-color: transparent;
}

@media (prefers-color-scheme: dark) {
  .mui-bottom-navigation-root {
    background-color: #1f1f1f;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  }

  .mui-bottom-navigation-action {
    color: rgba(255, 255, 255, 0.72);
  }

  .mui-bottom-navigation-action:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .mui-bottom-navigation-action:focus-visible {
    background-color: rgba(255, 255, 255, 0.14);
  }

  .mui-bottom-navigation-action-selected {
    color: rgb(144, 202, 249);
  }

  .mui-bottom-navigation-action-disabled,
  .mui-bottom-navigation-action:disabled {
    color: rgba(255, 255, 255, 0.38);
  }
}

`,z`
  /* Checkbox Component Styles - MUI-like */

  .mui-checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    vertical-align: middle;
    position: relative;
    margin: -9px;
    padding: 9px;
    border-radius: 4px;
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    -webkit-tap-highlight-color: transparent;
  }

  .mui-checkbox-disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.38;
  }

  /* Checkbox Input (hidden) */
  .mui-checkbox-input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    z-index: 1;
    cursor: inherit;
  }

  /* Checkbox Icon Container */
  .mui-checkbox-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    background-color: transparent;
    outline: 0;
    border: 0;
    margin: 0;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    padding: 9px;
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.6);
    transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    -webkit-tap-highlight-color: transparent;
  }

  /* Icon SVG */
  .mui-checkbox-icon svg {
    user-select: none;
    width: 1em;
    height: 1em;
    display: inline-block;
    fill: currentColor;
    flex-shrink: 0;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-size: 1.5rem;
  }

  /* Size variants */
  .mui-checkbox-size-small .mui-checkbox-icon {
    padding: 5px;
  }

  .mui-checkbox-size-small .mui-checkbox-icon svg {
    font-size: 1.25rem;
  }

  .mui-checkbox-size-medium .mui-checkbox-icon {
    padding: 9px;
  }

  .mui-checkbox-size-medium .mui-checkbox-icon svg {
    font-size: 1.5rem;
  }

  /* Icon states - controlled by display style in JSX */
  .mui-checkbox-icon-unchecked {
    display: flex;
  }

  .mui-checkbox-icon-checked {
    display: flex;
  }

  .mui-checkbox-icon-indeterminate {
    display: flex;
  }

  /* Color variants - Primary */
  .mui-checkbox-color-primary .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: #1976d2;
  }

  /* Color variants - Secondary */
  .mui-checkbox-color-secondary .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: #dc004e;
  }

  /* Color variants - Success */
  .mui-checkbox-color-success .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: #2e7d32;
  }

  /* Color variants - Error */
  .mui-checkbox-color-error .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: #d32f2f;
  }

  /* Color variants - Warning */
  .mui-checkbox-color-warning .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: #ed6c02;
  }

  /* Color variants - Default */
  .mui-checkbox-color-default .mui-checkbox-input:checked ~ .mui-checkbox-icon {
    color: rgba(0, 0, 0, 0.87);
  }

  /* Checkbox Label */
  .mui-checkbox-label {
    margin-left: 0px;

    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgba(0, 0, 0, 0.87);
    user-select: none;
  }

  /* Checkbox Group */
  .mui-checkbox-group {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .mui-checkbox-group-row {
    flex-direction: row;
    column-gap: 16px;
    row-gap: 8px;
  }

  /* Ripple effect on click */
  .mui-checkbox-icon::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    opacity: 0;
    background-color: currentColor;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: none;
  }

  .mui-checkbox-wrapper:active .mui-checkbox-icon::after {
    opacity: 0;
  }

  /* Focus visible */
  .mui-checkbox-input:focus-visible ~ .mui-checkbox-icon {
    box-shadow: none;
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .mui-checkbox-icon {
      color: rgba(255, 255, 255, 0.7);
    }

    .mui-checkbox-color-primary .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: #90caf9;
    }

    .mui-checkbox-color-secondary .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: #f48fb1;
    }

    .mui-checkbox-color-success .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: #66bb6a;
    }

    .mui-checkbox-color-error .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: #f44336;
    }

    .mui-checkbox-color-warning .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: #ffa726;
    }

    .mui-checkbox-color-default .mui-checkbox-input:checked ~ .mui-checkbox-icon {
      color: rgba(255, 255, 255, 0.87);
    }

    .mui-checkbox-label {
      color: rgba(255, 255, 255, 0.87);
    }

    .mui-checkbox-input:focus-visible ~ .mui-checkbox-icon {
      box-shadow: none;
    }
  }
`,(()=>{let e=N(`span`,{class:`mui-checkbox-icon-unchecked`});return e.innerHTML=`<svg viewBox="0 0 24 24">
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
    </svg>`,e})(),(()=>{let e=N(`span`,{class:`mui-checkbox-icon-checked`});return e.innerHTML=`<svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>`,e})(),(()=>{let e=N(`span`,{class:`mui-checkbox-icon-indeterminate`});return e.innerHTML=`<svg viewBox="0 0 24 24">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"></path>
    </svg>`,e})();var ke=z`
/* Dialog Component Styles - MUI-like appearance */

.kt-dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1300;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  outline: 0;
}

.kt-dialog-backdrop-open {
  opacity: 1;
  pointer-events: auto;
}

.kt-dialog-paper {
  margin: auto;
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  box-shadow:
    0px 11px 15px -7px rgba(0, 0, 0, 0.2),
    0px 24px 38px 3px rgba(0, 0, 0, 0.14),
    0px 9px 46px 8px rgba(0, 0, 0, 0.12);
  display: flex;
  border: 0;
  flex-direction: column;
  max-height: calc(100% - 64px);
  overflow-y: auto;
  transform: scale(0.8);
  opacity: 0;
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1), opacity 225ms cubic-bezier(0.4, 0, 0.2, 1);
  outline: 0;
}

.kt-dialog-close {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    background-color 150ms ease,
    color 150ms ease;
}

.kt-dialog-close:hover {
  background-color: rgba(25, 118, 210, 0.12);
  color: #1976d2;
}

.kt-dialog-backdrop-open .kt-dialog-paper {
  transform: scale(1);
  opacity: 1;
}

/* Max width variants */
.kt-dialog-maxWidth-xs {
  max-width: 444px;
  width: 100%;
}

.kt-dialog-maxWidth-sm {
  max-width: 600px;
  width: 100%;
}

.kt-dialog-maxWidth-md {
  max-width: 960px;
  width: 100%;
}

.kt-dialog-maxWidth-lg {
  max-width: 1280px;
  width: 100%;
}

.kt-dialog-maxWidth-xl {
  max-width: 1920px;
  width: 100%;
}

.kt-dialog-fullWidth {
  width: calc(100% - 64px);
}

.kt-dialog-title {
  flex: 0 0 auto;
  margin: 0;
  padding: 24px 24px 20px;
}

.kt-dialog-title h2 {
  margin: 0;
  
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  color: rgba(0, 0, 0, 0.87);
}

.kt-dialog-content {
  flex: 1 1 auto;
  padding: 20px 24px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  color: rgba(0, 0, 0, 0.6);
  
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
}

.kt-dialog-content:first-child {
  padding-top: 20px;
}

.kt-dialog-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  padding: 8px 24px 24px;
  gap: 8px;
}

.kt-dialog-actions > * {
  margin: 0;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .kt-dialog-paper {
    background-color: #1e1e1e;
    color: rgba(255, 255, 255, 0.87);
  }

  .kt-dialog-title h2 {
    color: rgba(255, 255, 255, 0.87);
  }

  .kt-dialog-close {
    color: rgba(255, 255, 255, 0.7);
  }

  .kt-dialog-close:hover {
    background-color: rgba(144, 202, 249, 0.16);
    color: #90caf9;
  }

  .kt-dialog-content {
    color: rgba(255, 255, 255, 0.7);
  }
}

`,Ae=12,je=225,Me=typeof window<`u`&&typeof HTMLDialogElement<`u`&&typeof HTMLDialogElement.prototype.showModal==`function`&&typeof HTMLDialogElement.prototype.close==`function`;function Ne(e){let{"on:close":t=c,children:n}=e,r=V(e.class??``),i=V(s(e.style)),a=V(e.actions),o=V(e.title??``),l=M(!1),u=M(!1),d,f,p=V(e.mode??`dialog`),m=V(e.showClose??!0),h=V(e.backdropClosable??!0),g=()=>{d&&=(clearTimeout(d),void 0),f&&=(clearTimeout(f),void 0)},_=()=>{f&&=(clearTimeout(f),void 0),l.value=!0,d&&clearTimeout(d),d=setTimeout(()=>{y.value&&(u.value=!0,x.value instanceof HTMLDialogElement&&x.value.showModal(),document.body.style.overflow=`hidden`,setTimeout(()=>x.value.focus(),0))},Ae)},v=()=>{d&&=(clearTimeout(d),void 0),u.value=!1,f&&clearTimeout(f),f=setTimeout(()=>{y.value||(l.value=!1,x.value instanceof HTMLDialogElement&&x.value.close(),document.body.style.overflow=``)},je)},y=Ce(e,!1).listen(e=>e?_():v()),b=V(e.width??`600px`),x=M();y.value&&_();let S=L(()=>`kt-dialog-paper ${r.value}`,[r]),C=u.map(e=>`kt-dialog-backdrop ${e?`kt-dialog-backdrop-open`:``}`),w=l.map(e=>e?`display:flex`:`display:none`),T=()=>{y.value=!1,t()},E=e=>{e.key===`Escape`&&T()},D=e=>{!h.value||e.target!==e.currentTarget||T()},ee=e=>{if(e.stopPropagation(),!h.value||!(e.currentTarget instanceof HTMLDialogElement))return;let t=e.currentTarget.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&T()},O=()=>R(m,`button`,()=>({class:`kt-dialog-close`,type:`button`,"aria-label":`Close dialog`,children:`×`,"on:click":e=>{e.stopPropagation(),T()}})),k=()=>p.value===`dialog`&&Me?N(`div`,{class:C,style:w,"on:click":D,children:F(`dialog`,{ref:x,class:S,style:i,tabIndex:-1,"on:click":ee,children:[O(),R(o,`div`,()=>({class:`kt-dialog-title`,children:N(`h2`,{children:o})})),R(n,`div`,()=>({class:`kt-dialog-content`,children:n})),R(a,`div`,()=>({class:`kt-dialog-actions`,children:a}))]})}):N(`div`,{class:C,style:w,"on:click":D,children:F(`div`,{ref:x,class:S,style:i,tabIndex:-1,"on:click":e=>e.stopPropagation(),children:[O(),R(o,`div`,()=>({class:`kt-dialog-title`,children:N(`h2`,{children:o})})),R(n,`div`,()=>({class:`kt-dialog-content`,children:n})),R(a,`div`,()=>({class:`kt-dialog-actions`,children:a}))]})}),A=k();ge(()=>A=k(),[p]),document.addEventListener(`keydown`,E);let j=A.remove;return A.remove=()=>(g(),document.removeEventListener(`keydown`,E),document.body.style.overflow=``,j.call(A)),x.value.style.width=b.value,b.listen(e=>{x.value&&(x.value.style.width=e)}),B(A,e,[`on:close`]),A}var Pe=(...e)=>(ke(`Dialog`),(Pe=Ne)(...e));z`
/* FormLabel Component Styles - MUI-like */

.mui-form-label {
  color: rgba(0, 0, 0, 0.6);
  
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  padding: 0;
  display: block;
  transform-origin: top left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  transition:
    color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

/* Focused state */
.mui-form-label-focused {
  color: #1976d2;
}

/* Error state */
.mui-form-label-error {
  color: #d32f2f;
}

.mui-form-label-error.mui-form-label-focused {
  color: #d32f2f;
}

/* Disabled state */
.mui-form-label-disabled {
  color: rgba(0, 0, 0, 0.38);
}

/* Filled state */
.mui-form-label-filled {
  color: rgba(0, 0, 0, 0.6);
}

.mui-form-label-filled.mui-form-label-focused {
  color: #1976d2;
}

/* Required asterisk */
.mui-form-label-asterisk {
  color: #d32f2f;
}

/* Legend variant (for fieldset) */
legend.mui-form-label {
  float: unset;
  width: auto;
  overflow: hidden;
  display: block;
  padding: 0;
  max-width: 100%;
  white-space: normal;
  margin-bottom: 8px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-form-label {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-form-label-focused {
    color: #90caf9;
  }

  .mui-form-label-error {
    color: #f44336;
  }

  .mui-form-label-error.mui-form-label-focused {
    color: #f44336;
  }

  .mui-form-label-disabled {
    color: rgba(255, 255, 255, 0.38);
  }

  .mui-form-label-filled {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-form-label-filled.mui-form-label-focused {
    color: #90caf9;
  }
}

`;var Fe=z`
/* LinearProgress Component Styles - Mimics MUI LinearProgress */

.mui-linear-progress {
  position: relative;
  display: block;
  width: 100%;
  height: 4px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
}

.mui-linear-progress-bar {
  height: 100%;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
}

/* Determinate variant */
.mui-linear-progress-determinate .mui-linear-progress-bar {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Indeterminate variant animation */
.mui-linear-progress-indeterminate .mui-linear-progress-bar {
  width: 100%;
  animation: mui-linear-progress-indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}

@keyframes mui-linear-progress-indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

/* Color variants */
.mui-linear-progress-primary .mui-linear-progress-bar {
  background-color: rgb(25, 118, 210);
}

.mui-linear-progress-secondary .mui-linear-progress-bar {
  background-color: rgb(156, 39, 176);
}

.mui-linear-progress-error .mui-linear-progress-bar {
  background-color: rgb(211, 47, 47);
}

.mui-linear-progress-warning .mui-linear-progress-bar {
  background-color: rgb(237, 108, 2);
}

.mui-linear-progress-info .mui-linear-progress-bar {
  background-color: rgb(2, 136, 209);
}

.mui-linear-progress-success .mui-linear-progress-bar {
  background-color: rgb(46, 125, 50);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-linear-progress {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .mui-linear-progress-primary .mui-linear-progress-bar {
    background-color: rgb(144, 202, 249);
  }

  .mui-linear-progress-secondary .mui-linear-progress-bar {
    background-color: rgb(206, 147, 216);
  }

  .mui-linear-progress-error .mui-linear-progress-bar {
    background-color: rgb(244, 67, 54);
  }

  .mui-linear-progress-warning .mui-linear-progress-bar {
    background-color: rgb(255, 152, 0);
  }

  .mui-linear-progress-info .mui-linear-progress-bar {
    background-color: rgb(41, 182, 246);
  }

  .mui-linear-progress-success .mui-linear-progress-bar {
    background-color: rgb(102, 187, 106);
  }
}

`;function Ie(e){let t=V(e.class??``),n=V(s(e.style)),r=V(e.value??0),a=V(e.color??`primary`),o=V(e.variant??`indeterminate`),c=N(`div`,{class:L(()=>`mui-linear-progress mui-linear-progress-${o.value} mui-linear-progress-${a.value} ${t.value}`,[t,a,o]),style:n,role:`progressbar`,"aria-valuenow":r,children:N(`div`,{class:`mui-linear-progress-bar`,style:L(()=>o.value===`determinate`?`width: ${r.value}%`:``,[o,r])})});return i(c,{value:{get(){return r.value},set:_(r)?e=>{r.value=e}:void 0}}),B(c,e),c}var Le=(...e)=>(Fe(`LinearProgress`),(Le=Ie)(...e));z`
.mui-menu-paper {
  min-width: 180px;
  padding: 8px 0;
}

.mui-menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  outline: 0;
}

.mui-menu-static {
  list-style: none;
}

.mui-menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 36px;
  box-sizing: border-box;
  margin: 0;
  padding: 6px 16px;
  border: 0;
  color: rgba(0, 0, 0, 0.87);
  
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  cursor: pointer;
  user-select: none;
  transition: background-color 140ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-menu-item:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.mui-menu-item:focus-visible {
  outline: none;
  background-color: rgba(0, 0, 0, 0.08);
}

.mui-menu-item-selected {
  background-color: rgba(25, 118, 210, 0.1);
}

.mui-menu-item-selected:hover {
  background-color: rgba(25, 118, 210, 0.16);
}

.mui-menu-item-disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
  pointer-events: none;
}

@media (prefers-color-scheme: dark) {
  .mui-menu-item {
    color: rgba(255, 255, 255, 0.88);
  }

  .mui-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .mui-menu-item:focus-visible {
    background-color: rgba(255, 255, 255, 0.12);
  }

  .mui-menu-item-selected {
    background-color: rgba(144, 202, 249, 0.2);
  }

  .mui-menu-item-selected:hover {
    background-color: rgba(144, 202, 249, 0.28);
  }

  .mui-menu-item-disabled {
    color: rgba(255, 255, 255, 0.4);
  }
}

`,z`
.mui-popover-anchor-root {
  display: inline-block;
}

.mui-popover-root {
  position: fixed;
  inset: 0;
  z-index: 1300;
  pointer-events: none;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
    visibility 0ms linear 180ms;
}

.mui-popover-rendered {
  visibility: visible;
}

.mui-popover-open {
  opacity: 1;
  visibility: visible;
  transition-delay: 0ms;
}

.mui-popover-paper {
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  min-width: 16px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);
  overflow: auto;
  background: #fff;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  pointer-events: auto;
  outline: 0;
  transform-origin: top left;
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity 180ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.2, 0, 0, 1);
  padding: 8px 0;
}

.mui-popover-open .mui-popover-paper {
  opacity: 1;
  transform: translateY(0) scale(1);
}

@media (prefers-color-scheme: dark) {
  .mui-popover-paper {
    background: #1f1f1f;
    color: rgba(255, 255, 255, 0.9);
  }
}

`,z`
.mui-modal-dialog {
  max-width: 420px;
}

.mui-modal-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mui-modal-message {
  margin: 0;
  color: rgba(0, 0, 0, 0.78);
  line-height: 1.6;
}

.mui-modal-actions {
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  width: 100%;
}

.mui-modal-prompt-input {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.28);
  border-radius: 6px;
  outline: none;
  padding: 0 12px;
  
  font-size: 0.95rem;
  transition:
    border-color 160ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 160ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-modal-prompt-input:focus {
  border-color: rgb(25, 118, 210);
  box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.16);
}

.mui-modal-prompt-error {
  margin: 0;
  font-size: 0.75rem;
  color: rgb(211, 47, 47);
}

@media (prefers-color-scheme: dark) {
  .mui-modal-message {
    color: rgba(255, 255, 255, 0.86);
  }

  .mui-modal-prompt-input {
    border-color: rgba(255, 255, 255, 0.28);
    background: rgba(255, 255, 255, 0.04);
    color: rgba(255, 255, 255, 0.92);
  }

  .mui-modal-prompt-input:focus {
    border-color: rgb(144, 202, 249);
    box-shadow: 0 0 0 2px rgba(144, 202, 249, 0.2);
  }

  .mui-modal-prompt-error {
    color: rgb(244, 67, 54);
  }
}

`;var Re=z`
  /* TextField Component Styles - MUI-like */

  .mui-textfield-root {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
    vertical-align: top;
  }

  .mui-textfield-fullwidth {
    width: 100%;
  }

  /* Wrapper */
  .mui-textfield-wrapper {
    font-size: 1rem;
    line-height: 1.4375em;
    color: rgba(0, 0, 0, 0.87);
    box-sizing: border-box;
    cursor: text;
    display: inline-flex;
    align-items: center;
    position: relative;
    border-radius: 4px;
  }

  /* Label */
  .mui-textfield-label {
    display: block;
    transform-origin: top left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: calc(133% - 32px);
    position: absolute;
    left: 0;
    top: -2px;
    transform: translate(14px, 16px) scale(1);
    transition:
      color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
      max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    z-index: 1;
    pointer-events: none;
    color: rgba(0, 0, 0, 0.6);
    font-size: 1rem;
    line-height: 1.5; /* this is related to top -2px */
  }

  .mui-textfield-focused .mui-textfield-label,
  .mui-textfield-has-value .mui-textfield-label {
    transform: translate(14px, -9px) scale(0.75);
    max-width: calc(133% - 32px);
  }

  .mui-textfield-focused .mui-textfield-label {
    color: #1976d2;
  }

  .mui-textfield-error .mui-textfield-label {
    color: #d32f2f;
  }

  .mui-textfield-disabled .mui-textfield-label {
    color: rgba(0, 0, 0, 0.38);
  }

  .mui-textfield-required {
    color: #d32f2f;
  }

  /* Size variants */
  .mui-textfield-size-small .mui-textfield-wrapper {
    font-size: 0.875rem;
    line-height: 1.4375em;
  }

  .mui-textfield-size-small .mui-textfield-label {
    font-size: 0.875rem;
    transform: translate(14px, 9px) scale(1);
  }

  .mui-textfield-size-small.mui-textfield-focused .mui-textfield-label,
  .mui-textfield-size-small.mui-textfield-has-value .mui-textfield-label {
    transform: translate(14px, -9px) scale(0.75);
  }

  .mui-textfield-size-small .mui-textfield-input-wrapper {
    padding: 8.5px 14px;
  }

  .mui-textfield-size-small .mui-textfield-input {
    font-size: 0.875rem;
  }

  /* Input wrapper */
  .mui-textfield-input-wrapper {
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    padding: 16.5px 14px;
    border: 0;
    box-sizing: content-box;
    background: none;
    height: auto;
    margin: 0;
    display: block;
    min-width: 0;
    width: 100%;
    position: relative;
  }

  /* Input element */
  .mui-textfield-input {
    font: inherit;
    letter-spacing: inherit;
    color: currentColor;
    border: 0;
    box-sizing: content-box;
    background: none;
    height: 1.4375em;
    margin: 0;
    display: block;
    min-width: 0;
    width: 100%;
    padding: 0;
    outline: none;
  }

  /* Textarea specific styles - override height */
  textarea.mui-textfield-input {
    height: auto !important;
    resize: none;
    overflow: auto;
    min-height: 1.4375em;
  }

  .mui-textfield-input::placeholder {
    color: rgba(0, 0, 0, 0.42);
    opacity: 1;
    transition: opacity 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  .mui-textfield-focused .mui-textfield-input::placeholder {
    opacity: 0.42;
  }

  .mui-textfield-disabled .mui-textfield-input {
    color: rgba(0, 0, 0, 0.38);
    cursor: default;
  }

  /* Fieldset (border) */
  .mui-textfield-fieldset {
    text-align: left;
    position: absolute;
    bottom: 0;
    right: 0;
    top: -5px;
    left: 0;
    margin: 0;
    padding: 0 8px;
    pointer-events: none;
    border-radius: inherit;
    border-style: solid;
    border-width: 1px;
    overflow: hidden;
    min-width: 0%;
    border-color: rgba(0, 0, 0, 0.23);
    transition: border-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  .mui-textfield-wrapper:hover .mui-textfield-fieldset {
    border-color: #1976d2;
  }

  .mui-textfield-focused .mui-textfield-fieldset {
    border-color: #1976d2;
    border-width: 2px;
  }

  .mui-textfield-error .mui-textfield-fieldset {
    border-color: #d32f2f;
  }

  .mui-textfield-error.mui-textfield-focused .mui-textfield-fieldset {
    border-color: #d32f2f;
  }

  .mui-textfield-disabled .mui-textfield-fieldset {
    border-color: rgba(0, 0, 0, 0.26);
  }

  /* No label variant - adjust fieldset position */
  .mui-textfield-no-label .mui-textfield-fieldset {
    top: 0;
  }

  /* Legend (for label space) */
  .mui-textfield-legend {
    float: unset;
    width: auto;
    overflow: hidden;
    display: block;
    padding: 0;
    height: 11px;
    font-size: 0.75em;
    visibility: hidden;
    max-width: 0.01px;
    transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    white-space: nowrap;
  }

  .mui-textfield-legend > span {
    padding-left: 5px;
    padding-right: 5px;
    display: inline-block;
    opacity: 0;
    visibility: visible;
  }

  .mui-textfield-focused .mui-textfield-legend,
  .mui-textfield-has-value .mui-textfield-legend {
    max-width: 100%;
    transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
  }

  /* Helper text */
  .mui-textfield-helper-text {
    position: absolute;
    top: calc(100% + 3px);
    left: 14px;
    right: 14px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 0.75rem;
    line-height: 1.66;
    letter-spacing: 0.03333em;
    text-align: left;
    margin: 0;
  }

  .mui-textfield-error .mui-textfield-helper-text {
    color: #d32f2f;
  }

  .mui-textfield-disabled .mui-textfield-helper-text {
    color: rgba(0, 0, 0, 0.38);
  }

  /* Dark mode support */
  @media (prefers-color-scheme: dark) {
    .mui-textfield-wrapper {
      color: rgba(255, 255, 255, 0.87);
    }

    .mui-textfield-label {
      color: rgba(255, 255, 255, 0.7);
    }

    .mui-textfield-focused .mui-textfield-label {
      color: #90caf9;
    }

    .mui-textfield-input::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    .mui-textfield-disabled .mui-textfield-input {
      color: rgba(255, 255, 255, 0.38);
    }

    .mui-textfield-fieldset {
      border-color: rgba(255, 255, 255, 0.23);
    }

    .mui-textfield-wrapper:hover .mui-textfield-fieldset {
      border-color: #90caf9;
    }

    .mui-textfield-focused .mui-textfield-fieldset {
      border-color: #90caf9;
    }

    .mui-textfield-disabled .mui-textfield-fieldset {
      border-color: rgba(255, 255, 255, 0.26);
    }

    .mui-textfield-helper-text {
      color: rgba(255, 255, 255, 0.7);
    }

    .mui-textfield-disabled .mui-textfield-helper-text {
      color: rgba(255, 255, 255, 0.38);
    }
  }
`;function ze(e){let t=e[`on:input`]??c,n=e[`on:change`]??c,r=e[`on:blur`]??c,i=e[`on:focus`]??c,a=M(!1),o=e=>e!==``&&e!=null,l=()=>{if(D.value){let e=k.value.trim();k.value=e,g.value=e}t(g.value)},u=()=>{if(D.value){let e=k.value.trim();k.value=e,g.value=e}n(g.value)},d=()=>{a.value=!0,i(k.value)},f=()=>{a.value=!1,r(k.value)},p=e=>{if(v.value)return;let t=e.target;!t||t===k||setTimeout(()=>k.focus(),0)},m=(y(e.type)?e.type.value:e.type)??`text`,h=e.multiline,g=Ce(e,e.value??``),_=V(e.label??``),v=V(e.disabled??!1),b=V(e.readOnly??!1),x=V(e.required??!1),S=V(e.error??!1),C=V(e.helperText??``),w=V(e.fullWidth??!1),T=V(e.rows??3),E=V(e.size??`medium`),D=V(e.trim??!1),ee=V(e.placeholder??``),O=L(()=>_.value&&!a.value&&!o(g.value)?``:ee.value,[_,a,g,ee]),k=h?N(`textarea`,{"k-model":g,class:`mui-textfield-input`,placeholder:O,disabled:v,readOnly:b,required:x,rows:T,"on:input":l,"on:change":u,"on:focus":d,"on:blur":f}):N(`input`,{"k-model":g,type:m,class:`mui-textfield-input`,placeholder:O,disabled:v,readOnly:b,required:x,"on:input":l,"on:change":u,"on:focus":d,"on:blur":f});g.listen(e=>k.value=e);let A=V(s(e.style)),j=V(e.class??``),te=L(()=>[`mui-textfield-root`,`mui-textfield-size-${E.value}`,a.value?`mui-textfield-focused`:``,S.value?`mui-textfield-error`:``,v.value?`mui-textfield-disabled`:``,w.value?`mui-textfield-fullwidth`:``,_.value&&o(g.value)?`mui-textfield-has-value`:``,_.value?``:`mui-textfield-no-label`,j.value?j.value:``].join(` `),[E,S,v,w,_,a,g,j]),ne=L(()=>_.value?F(`label`,{class:`mui-textfield-label`,children:[_,R(x,`span`,()=>({class:`mui-textfield-required`,children:`*`}))]}):``,[_,x]),re=L(()=>_.value?N(`legend`,{class:`mui-textfield-legend`,children:F(`span`,{children:[_,R(x,`span`,()=>({children:`*`}))]})}):``,[_,x]),ie=F(`div`,{class:te,style:A,children:[F(`div`,{class:`mui-textfield-wrapper`,"on:mousedown":p,children:[ne,N(`div`,{class:`mui-textfield-input-wrapper`,children:k}),N(`fieldset`,{class:`mui-textfield-fieldset`,children:re})]}),R(C,`p`,()=>({class:`mui-textfield-helper-text`,children:C}))]});return B(ie,e,[`on:input`,`on:change`,`on:focus`,`on:blur`]),ie}var Be=(...e)=>(Re(`TextField`),(Be=ze)(...e));z`
/* FilePicker & DirectoryPicker Component Styles */

.mui-filepicker-root {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  vertical-align: top;
  
}

.mui-filepicker-fullwidth {
  width: 100%;
}

/* Wrapper */
.mui-filepicker-wrapper {
  font-size: 1rem;
  line-height: 1.4375em;
  color: rgba(0, 0, 0, 0.87);
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  border-radius: 4px;
}

.mui-filepicker-input-container {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
  min-width: 0;
}

/* Label */
.mui-filepicker-label {
  display: block;
  transform-origin: top left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(133% - 32px);
  position: absolute;
  left: 0;
  top: 2px;
  transform: translate(14px, 16px) scale(1);
  transition:
    color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  z-index: 1;
  pointer-events: none;
  color: rgba(0, 0, 0, 0.6);
  font-size: 1rem;
  line-height: 1;
}

.mui-filepicker-focused .mui-filepicker-label,
.mui-filepicker-has-value .mui-filepicker-label {
  transform: translate(14px, -9px) scale(0.75);
  max-width: calc(133% - 32px);
}

.mui-filepicker-focused .mui-filepicker-label {
  color: #1976d2;
}

.mui-filepicker-error .mui-filepicker-label {
  color: #d32f2f;
}

.mui-filepicker-disabled .mui-filepicker-label {
  color: rgba(0, 0, 0, 0.38);
}

.mui-filepicker-required {
  color: #d32f2f;
}

/* Size variants */
.mui-filepicker-size-small .mui-filepicker-wrapper {
  font-size: 0.875rem;
  line-height: 1.4375em;
}

.mui-filepicker-size-small .mui-filepicker-label {
  font-size: 0.875rem;
  transform: translate(14px, 9px) scale(1);
}

.mui-filepicker-size-small.mui-filepicker-focused .mui-filepicker-label,
.mui-filepicker-size-small.mui-filepicker-has-value .mui-filepicker-label {
  transform: translate(14px, -9px) scale(0.75);
}

.mui-filepicker-size-small .mui-filepicker-input-wrapper {
  padding: 8.5px 14px;
}

.mui-filepicker-size-small .mui-filepicker-display {
  font-size: 0.875rem;
}

/* Input wrapper */
.mui-filepicker-input-wrapper {
  font: inherit;
  letter-spacing: inherit;
  color: currentColor;
  padding: 16.5px 14px;
  border: 0;
  box-sizing: content-box;
  background: none;
  height: auto;
  margin: 0;
  display: block;
  min-width: 0;
  width: 100%;
  position: relative;
  cursor: pointer;
}

/* Display text */
.mui-filepicker-display {
  font: inherit;
  letter-spacing: inherit;
  color: currentColor;
  border: 0;
  box-sizing: content-box;
  background: none;
  height: 1.4375em;
  margin: 0;
  display: block;
  min-width: 0;
  width: 100%;
  padding: 0;
  outline: none;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mui-filepicker-display.mui-filepicker-placeholder {
  color: rgba(0, 0, 0, 0.42);
}

.mui-filepicker-disabled .mui-filepicker-display {
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
}

/* Hidden native file input */
.mui-filepicker-native-input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}

.mui-filepicker-disabled .mui-filepicker-native-input {
  cursor: default;
  pointer-events: none;
}

/* Fieldset (border) */
.mui-filepicker-fieldset {
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0 8px;
  pointer-events: none;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  min-width: 0%;
  border-color: rgba(0, 0, 0, 0.23);
  transition: border-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.mui-filepicker-wrapper:hover .mui-filepicker-fieldset {
  border-color: rgba(0, 0, 0, 0.87);
}

.mui-filepicker-focused .mui-filepicker-fieldset {
  border-color: #1976d2;
  border-width: 2px;
}

.mui-filepicker-error .mui-filepicker-fieldset {
  border-color: #d32f2f;
}

.mui-filepicker-error.mui-filepicker-focused .mui-filepicker-fieldset {
  border-color: #d32f2f;
}

.mui-filepicker-disabled .mui-filepicker-fieldset {
  border-color: rgba(0, 0, 0, 0.26);
}

/* No label variant - adjust fieldset position */
.mui-filepicker-no-label .mui-filepicker-fieldset {
  top: 0;
}

/* Legend (for label space) */
.mui-filepicker-legend {
  float: unset;
  width: auto;
  overflow: hidden;
  display: block;
  padding: 0;
  height: 11px;
  font-size: 0.75em;
  visibility: hidden;
  max-width: 0.01px;
  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  white-space: nowrap;
}

.mui-filepicker-legend > span {
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  opacity: 0;
  visibility: visible;
}

.mui-filepicker-focused .mui-filepicker-legend,
.mui-filepicker-has-value .mui-filepicker-legend {
  max-width: 100%;
  transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
}

/* Helper text */
.mui-filepicker-helper-text {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin: 3px 14px 0;
}

.mui-filepicker-error .mui-filepicker-helper-text {
  color: #d32f2f;
}

.mui-filepicker-disabled .mui-filepicker-helper-text {
  color: rgba(0, 0, 0, 0.38);
}

/* Browse button for FilePicker */
.mui-filepicker-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  padding: 4px 12px;
  font-size: 0.8125rem;
  
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1976d2;
  color: #fff;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  z-index: 2;
}

.mui-filepicker-button:hover {
  background-color: #1565c0;
}

.mui-filepicker-button:active {
  background-color: #115293;
}

.mui-filepicker-disabled .mui-filepicker-button {
  background-color: rgba(0, 0, 0, 0.12);
  color: rgba(0, 0, 0, 0.26);
  cursor: default;
  pointer-events: none;
}

.mui-filepicker-size-small .mui-filepicker-button {
  padding: 2px 8px;
  font-size: 0.75rem;
}

/* File count badge */
.mui-filepicker-file-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  background-color: #1976d2;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 8px;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-filepicker-wrapper {
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-filepicker-label {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-filepicker-focused .mui-filepicker-label {
    color: #90caf9;
  }

  .mui-filepicker-display.mui-filepicker-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .mui-filepicker-disabled .mui-filepicker-display {
    color: rgba(255, 255, 255, 0.38);
  }

  .mui-filepicker-fieldset {
    border-color: rgba(255, 255, 255, 0.23);
  }

  .mui-filepicker-wrapper:hover .mui-filepicker-fieldset {
    border-color: rgba(255, 255, 255, 0.87);
  }

  .mui-filepicker-focused .mui-filepicker-fieldset {
    border-color: #90caf9;
  }

  .mui-filepicker-disabled .mui-filepicker-fieldset {
    border-color: rgba(255, 255, 255, 0.26);
  }

  .mui-filepicker-helper-text {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-filepicker-disabled .mui-filepicker-helper-text {
    color: rgba(255, 255, 255, 0.38);
  }

  .mui-filepicker-button {
    background-color: #90caf9;
    color: rgba(0, 0, 0, 0.87);
  }

  .mui-filepicker-button:hover {
    background-color: #a9cce3;
  }

  .mui-filepicker-button:active {
    background-color: #7bb3d9;
  }

  .mui-filepicker-disabled .mui-filepicker-button {
    background-color: rgba(255, 255, 255, 0.12);
    color: rgba(255, 255, 255, 0.3);
  }
}
`,z`
/* Radio Component Styles - MUI-like */

.mui-radio-wrapper {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  vertical-align: middle;
  position: relative;
  margin: -9px;
  padding: 9px;
  border-radius: 4px;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.mui-radio-wrapper:hover {
  /* background-color: rgba(0, 0, 0, 0.04); */
}

.mui-radio-disabled {
  cursor: default;
  pointer-events: none;
  opacity: 0.38;
}

/* Radio Input (hidden) */
.mui-radio-input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 1;
  cursor: inherit;
}

/* Radio Icon Container */
.mui-radio-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  appearance: none;
  text-decoration: none;
  padding: 9px;
  border-radius: 50%;
  color: rgba(0, 0, 0, 0.6);
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

/* Icon SVG */
.mui-radio-icon svg {
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  font-size: 1.5rem;
}

/* Size variants */
.mui-radio-size-small .mui-radio-icon {
  padding: 5px;
}

.mui-radio-size-small .mui-radio-icon svg {
  font-size: 1.25rem;
}

.mui-radio-size-medium .mui-radio-icon {
  padding: 9px;
}

.mui-radio-size-medium .mui-radio-icon svg {
  font-size: 1.5rem;
}

/* Unchecked state - controlled by conditional icon rendering in JSX */
.mui-radio-icon-unchecked {
  display: flex;
}

.mui-radio-icon-checked {
  display: flex;
}

/* Color variants - Primary */
.mui-radio-color-primary .mui-radio-input:checked ~ .mui-radio-icon {
  color: #1976d2;
}

.mui-radio-color-primary:hover {
  /* background-color: rgba(25, 118, 210, 0.04); */
}

/* Color variants - Secondary */
.mui-radio-color-secondary .mui-radio-input:checked ~ .mui-radio-icon {
  color: #dc004e;
}

.mui-radio-color-secondary:hover {
  /* background-color: rgba(220, 0, 78, 0.04); */
}

/* Color variants - Default */
.mui-radio-color-default .mui-radio-input:checked ~ .mui-radio-icon {
  color: rgba(0, 0, 0, 0.87);
}

/* Radio Label */
.mui-radio-label {
  margin-left: 4px;
  
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
  user-select: none;
}

/* Radio Group */
.mui-radio-group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.mui-radio-group-row {
  flex-direction: row;
  column-gap: 16px;
  row-gap: 8px;
}

/* Ripple effect on click */
.mui-radio-icon::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  opacity: 0;
  background-color: currentColor;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.mui-radio-wrapper:active .mui-radio-icon::after {
  opacity: 0.12;
}

/* Focus visible */
.mui-radio-input:focus-visible ~ .mui-radio-icon {
  box-shadow: 0 0 0 8px rgba(25, 118, 210, 0.12);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-radio-wrapper:hover {
    /* background-color: rgba(255, 255, 255, 0.08); */
  }

  .mui-radio-icon {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-radio-color-primary .mui-radio-input:checked ~ .mui-radio-icon {
    color: #90caf9;
  }

  .mui-radio-color-primary:hover {
    background-color: rgba(144, 202, 249, 0.08);
  }

  .mui-radio-color-secondary .mui-radio-input:checked ~ .mui-radio-icon {
    color: #f48fb1;
  }

  .mui-radio-color-secondary:hover {
    background-color: rgba(244, 143, 177, 0.08);
  }

  .mui-radio-color-default .mui-radio-input:checked ~ .mui-radio-icon {
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-radio-label {
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-radio-input:focus-visible ~ .mui-radio-icon {
    box-shadow: 0 0 0 8px rgba(144, 202, 249, 0.16);
  }
}

`,(()=>{let e=N(`span`,{class:`mui-radio-icon-unchecked`});return e.innerHTML=`<svg viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>`,e})(),(()=>{let e=N(`span`,{class:`mui-radio-icon-checked`});return e.innerHTML=`<svg viewBox="0 0 24 24">
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
      </svg>`,e})();var Ve=z`
/* Select Component Styles - MUI-like */

.mui-select-wrapper {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  min-width: 120px;
  margin: 8px 0;
  vertical-align: top;
}

.mui-select-fullWidth {
  width: 100%;
}

.mui-select-disabled {
  opacity: 0.6;
  pointer-events: none;
}

/* Select Label */
.mui-select-label {
  display: block;
  transform-origin: top left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: calc(100% - 24px);
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(14px, 16px) scale(1);
  transition:
    color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms,
    max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  z-index: 1;
  pointer-events: none;
  
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.6);
}

.mui-select-label.focused {
  transform: translate(14px, -9px) scale(0.75);
  max-width: calc(133.33333% - 24px);
  color: #1976d2;
}

/* Select Control */
.mui-select-control {
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  
  font-size: 1rem;
  line-height: 1.4375em;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
}

.mui-select-control:focus {
  outline: none;
}

/* Size variants */
.mui-select-size-small .mui-select-control {
  font-size: 0.875rem;
  line-height: 1.4375em;
}

.mui-select-size-small .mui-select-label {
  font-size: 0.875rem;
  transform: translate(14px, 9px) scale(1);
}

.mui-select-size-small .mui-select-label.focused {
  transform: translate(14px, -9px) scale(0.75);
}

.mui-select-size-small .mui-select-outlined {
  padding: 8.5px 14px;
  padding-right: 32px;
}

.mui-select-size-small .mui-select-display {
  font-size: 0.875rem;
}

/* Outlined variant */
.mui-select-outlined {
  border-radius: 4px;
  padding: 16.5px 14px;
  padding-right: 32px;
}

.mui-select-outlined .mui-select-fieldset {
  text-align: left;
  position: absolute;
  bottom: 0;
  right: 0;
  top: -5px;
  left: 0;
  margin: 0;
  padding: 0 8px;
  pointer-events: none;
  border-radius: inherit;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  min-width: 0%;
  border-color: rgba(0, 0, 0, 0.23);
  transition: border-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
}

.mui-select-outlined:hover .mui-select-fieldset {
  border-color: rgba(0, 0, 0, 0.87);
}

.mui-select-wrapper.focused .mui-select-outlined .mui-select-fieldset,
.mui-select-open .mui-select-fieldset {
  border-color: #1976d2 !important;
  border-width: 2px;
}

.mui-select-fieldset legend {
  float: unset;
  width: auto;
  overflow: hidden;
  display: block;
  padding: 0;
  height: 11px;
  font-size: 0.75em;
  visibility: hidden;
  max-width: 0.01px;
  transition: max-width 50ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  white-space: nowrap;
}

.mui-select-label.focused ~ .mui-select-outlined .mui-select-fieldset legend {
  max-width: 100%;
  transition: max-width 100ms cubic-bezier(0, 0, 0.2, 1) 50ms;
}

/* Select Display */
.mui-select-display {
  flex: 1;
  min-width: 0;
  min-height: 1.4375em;
  line-height: 1.4375em;
}

.mui-select-placeholder {
  color: rgba(0, 0, 0, 0.4);
}

/* Select Icon */
.mui-select-icon {
  position: absolute;
  right: 7px;
  top: calc(50% - 0.7em);
  pointer-events: none;
  color: rgba(0, 0, 0, 0.54);
  user-select: none;
  width: 24px;
  height: 24px;
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.mui-select-open .mui-select-icon {
  transform: rotate(180deg);
}

/* Select Menu */
.mui-select-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1300;
  margin-top: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  max-height: 300px;
  overflow-y: auto;
  padding: 3px 0;
  display: none;
  opacity: 0;
  transform: scale(0.75) translateY(-8px);
  transform-origin: top center;
  transition:
    opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.mui-select-menu-open {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Select Option */
.mui-select-option {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  text-decoration: none;
  min-height: 42px;
  padding: 6px 16px;
  box-sizing: border-box;
  white-space: nowrap;
  
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  user-select: none;
  transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}

.mui-select-option:hover {
  background-color: rgba(0, 0, 0, 0.04);
}

.mui-select-option.selected {
  background-color: rgba(25, 118, 210, 0.08);
  font-weight: 500;
}

.mui-select-option.selected:hover {
  background-color: rgba(25, 118, 210, 0.12);
}

.mui-select-legend > span {
  padding-left: 5px;
  padding-right: 5px;
  display: inline-block;
  opacity: 0;
  visibility: visible;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-select-label {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-select-label.focused {
    color: #90caf9;
  }

  .mui-select-control {
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-select-outlined .mui-select-fieldset {
    border-color: rgba(255, 255, 255, 0.23);
  }

  .mui-select-outlined:hover .mui-select-fieldset {
    border-color: rgba(255, 255, 255, 0.87);
  }

  .mui-select-wrapper.focused .mui-select-outlined .mui-select-fieldset,
  .mui-select-open .mui-select-fieldset {
    border-color: #90caf9 !important;
  }

  .mui-select-placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  .mui-select-icon {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-select-menu {
    background-color: #1e1e1e;
  }

  .mui-select-option {
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-select-option:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }

  .mui-select-option.selected {
    background-color: rgba(144, 202, 249, 0.16);
  }

  .mui-select-option.selected:hover {
    background-color: rgba(144, 202, 249, 0.24);
  }
}

`,He=(()=>{let e=N(`div`,{});return e.innerHTML=`<svg class="mui-select-icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
          <path d="M7 10l5 5 5-5Z" fill="currentColor"></path>
        </svg>`,e.firstElementChild})();function Ue(e){let n=e[`on:change`]??c,r=new Map,i=M(!1),a=M(!1).listen(e=>{if(e){E.value.style.display=`block`,E.value.offsetHeight;let e=E.value.querySelector(`.mui-select-option.selected`);e&&(E.value.scrollTop=e.offsetTop-E.value.clientHeight/2+e.clientHeight/2)}else setTimeout(()=>{e||(E.value.style.display=`none`)},200);E.value.classList.toggle(`mui-select-menu-open`,e),D.classList.toggle(`mui-select-open`,e)}),o=V(e.placeholder??``),l=V(e.label??``),u=Ce(e,e.value??``),d=V(e.options).listen(e=>{e.find(e=>typeof e==`object`&&!!e&&`value`in e&&t(e.value,u.value))||(u.value=``,n(u.value))}),f=V(e.disabled??!1).listen(e=>D.classList.toggle(`mui-select-disabled`,e)),p=V(s(e.style)),m=V(e.class??``),h=V(e.size??`medium`),g=V(e.fullWidth??!1),_=L(()=>`mui-select-wrapper mui-select-size-${h.value} ${g.value?`mui-select-fullWidth`:``} ${m.value} ${f.value?`mui-select-disabled`:``}`,[h,g,m,f]),v=L(()=>l.value?N(`label`,{class:`mui-select-label ${u.value||i.value||o.value?`focused`:``}`,children:l}):``,[l,u,i,o]),y=()=>{f.value||(a.value=!a.value)},b=e=>{let t=r.get(e.currentTarget);u.value=t,n(t),a.value=!1},x=e=>{D.contains(e.target)||(a.value=!1)},S=()=>i.value=!0,C=()=>i.value=!1,w=N(`span`,{class:`mui-select-placeholder`,children:o.value||`\xA0`}),T=L(()=>N(`div`,{class:`mui-select-display`,children:d.value.find(e=>typeof e==`object`&&!!e&&`value`in e&&t(e.value,u.value))?.label??w}),[u,d]),E=L(()=>(r.clear(),N(`div`,{class:`mui-select-menu`,style:`display: none;`,children:d.value.map(e=>{if(typeof e==`object`&&e&&`value`in e&&`label`in e){let n=N(`div`,{class:`mui-select-option ${t(e.value,u.value)?`selected`:``}`,"on:click":b,children:e.label});return r.set(n,e.value),n}return e})})),[d,u]),D=F(`div`,{class:_,style:p,children:[v,F(`div`,{class:`mui-select-control mui-select-outlined`,"on:click":y,"on:focus":S,"on:blur":C,tabIndex:f.value?-1:0,children:[T,N(`input`,{type:`hidden`,"k-model":u}),N(`fieldset`,{class:`mui-select-fieldset`,children:N(`legend`,{class:`mui-select-legend`,children:N(`span`,{children:l})})}),He.cloneNode(!0)]}),E]});return E.notify(),setTimeout(()=>{document.removeEventListener(`click`,x),document.addEventListener(`click`,x)},0),B(D,e),D}var We=(...e)=>(Ve(`Select`),(We=Ue)(...e)),Ge=z`
/* Card Component Styles - MUI-like */

.mui-card {
  position: relative;
  border-radius: 4px;
  background-color: #ffffff;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  
  overflow: hidden;
  display: block;
}

/* Variant: outlined */
.mui-card-outlined {
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: none;
}

/* Variant: contained */
.mui-card-contained {
  background-color: #f5f5f5;
  box-shadow: none;
  border: none;
}

/* Elevation shadows */
.mui-card-elevation-0 {
  box-shadow: none;
}
.mui-card-elevation-1 {
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 1px 3px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-2 {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
              0px 2px 2px 0px rgba(0, 0, 0, 0.14),
              0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-3 {
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2),
              0px 3px 4px 0px rgba(0, 0, 0, 0.14),
              0px 1px 8px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-4 {
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
              0px 4px 5px 0px rgba(0, 0, 0, 0.14),
              0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-5 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
              0px 5px 8px 0px rgba(0, 0, 0, 0.14),
              0px 1px 14px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-6 {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
              0px 6px 10px 0px rgba(0, 0, 0, 0.14),
              0px 1px 18px 0px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-7 {
  box-shadow: 0px 4px 5px -2px rgba(0, 0, 0, 0.2),
              0px 7px 10px 1px rgba(0, 0, 0, 0.14),
              0px 2px 16px 1px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-8 {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
              0px 8px 10px 1px rgba(0, 0, 0, 0.14),
              0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-9 {
  box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.2),
              0px 9px 12px 1px rgba(0, 0, 0, 0.14),
              0px 3px 16px 2px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-10 {
  box-shadow: 0px 6px 6px -3px rgba(0, 0, 0, 0.2),
              0px 10px 14px 1px rgba(0, 0, 0, 0.14),
              0px 4px 18px 3px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-11 {
  box-shadow: 0px 6px 7px -4px rgba(0, 0, 0, 0.2),
              0px 11px 15px 1px rgba(0, 0, 0, 0.14),
              0px 4px 20px 3px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-12 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
              0px 12px 17px 2px rgba(0, 0, 0, 0.14),
              0px 5px 22px 4px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-13 {
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
              0px 13px 19px 2px rgba(0, 0, 0, 0.14),
              0px 5px 24px 4px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-14 {
  box-shadow: 0px 7px 9px -4px rgba(0, 0, 0, 0.2),
              0px 14px 21px 2px rgba(0, 0, 0, 0.14),
              0px 5px 26px 4px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-15 {
  box-shadow: 0px 8px 9px -5px rgba(0, 0, 0, 0.2),
              0px 15px 22px 2px rgba(0, 0, 0, 0.14),
              0px 6px 28px 5px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-16 {
  box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
              0px 16px 24px 2px rgba(0, 0, 0, 0.14),
              0px 6px 30px 5px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-17 {
  box-shadow: 0px 8px 11px -5px rgba(0, 0, 0, 0.2),
              0px 17px 26px 2px rgba(0, 0, 0, 0.14),
              0px 6px 32px 5px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-18 {
  box-shadow: 0px 9px 11px -5px rgba(0, 0, 0, 0.2),
              0px 18px 28px 2px rgba(0, 0, 0, 0.14),
              0px 7px 34px 6px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-19 {
  box-shadow: 0px 9px 12px -6px rgba(0, 0, 0, 0.2),
              0px 19px 29px 2px rgba(0, 0, 0, 0.14),
              0px 7px 36px 6px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-20 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
              0px 20px 31px 3px rgba(0, 0, 0, 0.14),
              0px 8px 38px 7px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-21 {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.2),
              0px 21px 33px 3px rgba(0, 0, 0, 0.14),
              0px 8px 40px 7px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-22 {
  box-shadow: 0px 10px 14px -6px rgba(0, 0, 0, 0.2),
              0px 22px 35px 3px rgba(0, 0, 0, 0.14),
              0px 8px 42px 7px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-23 {
  box-shadow: 0px 11px 14px -7px rgba(0, 0, 0, 0.2),
              0px 23px 36px 3px rgba(0, 0, 0, 0.14),
              0px 9px 44px 8px rgba(0, 0, 0, 0.12);
}
.mui-card-elevation-24 {
  box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
              0px 24px 38px 3px rgba(0, 0, 0, 0.14),
              0px 9px 46px 8px rgba(0, 0, 0, 0.12);
}

/* Square card (no border radius) */
.mui-card-square {
  border-radius: 0;
}

/* Raised card (hover effect) */
.mui-card-raised {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.mui-card-raised:hover {
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
              0px 8px 10px 1px rgba(0, 0, 0, 0.14),
              0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .mui-card {
    background-color: #1e1e1e;
    color: rgba(255, 255, 255, 0.87);
  }

  .mui-card-outlined {
    border-color: rgba(255, 255, 255, 0.12);
  }

  .mui-card-contained {
    background-color: #2d2d2d;
  }
}
`;function Ke(e){let t=V(e.class??``),n=V(s(e.style)),r=V(e.variant??`elevation`),i=V(e.elevation??1),a=V(e.square??!1),o=V(e.raised??!1),c=N(`div`,{class:L(()=>[`mui-card`,`mui-card-${r.value}`,r.value===`elevation`?`mui-card-elevation-${Math.min(24,Math.max(0,i.value))}`:``,a.value?`mui-card-square`:``,o.value?`mui-card-raised`:``,t.value].join(` `),[r,i,a,o,t]),style:n,"on:click":e[`on:click`],children:e.children});return B(c,e),c}var U=(...e)=>(Ge(`Card`),(U=Ke)(...e));z`
/* Switch Component Styles - MUI-like */

.mui-switch-wrapper {
  --mui-switch-track-off: rgba(0, 0, 0, 0.38);
  --mui-switch-track-on: rgb(25, 118, 210);
  --mui-switch-track-disabled: rgba(0, 0, 0, 0.12);
  --mui-switch-thumb-disabled: #f5f5f5;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  position: relative;
  cursor: pointer;
  
  user-select: none;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
}

.mui-switch-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  padding: 0;
}

.mui-switch-base {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}

.mui-switch-track {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background-color: var(--mui-switch-track-off);
  transition:
    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  border-radius: 50%;
  background-color: #ffffff;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 1px 1px rgba(0, 0, 0, 0.24);
  transition:
    transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 200ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;
}

.mui-switch-size-small .mui-switch-base {
  width: 34px;
  height: 20px;
}

.mui-switch-size-small .mui-switch-thumb {
  width: 16px;
  height: 16px;
}

.mui-switch-size-small .mui-switch-thumb-checked {
  transform: translateX(14px);
}

.mui-switch-size-medium .mui-switch-base {
  width: 42px;
  height: 26px;
}

.mui-switch-size-medium .mui-switch-thumb {
  width: 22px;
  height: 22px;
}

.mui-switch-size-medium .mui-switch-thumb-checked {
  transform: translateX(16px);
}

.mui-switch-size-large .mui-switch-base {
  width: 50px;
  height: 30px;
}

.mui-switch-size-large .mui-switch-thumb {
  width: 26px;
  height: 26px;
}

.mui-switch-size-large .mui-switch-thumb-checked {
  transform: translateX(20px);
}

.mui-switch-track-checked {
  background-color: var(--mui-switch-track-on);
}

.mui-switch-color-primary {
  --mui-switch-track-on: rgb(25, 118, 210);
}

.mui-switch-color-secondary {
  --mui-switch-track-on: rgb(220, 0, 78);
}

.mui-switch-color-error {
  --mui-switch-track-on: rgb(211, 47, 47);
}

.mui-switch-color-warning {
  --mui-switch-track-on: rgb(237, 108, 2);
}

.mui-switch-color-info {
  --mui-switch-track-on: rgb(2, 136, 209);
}

.mui-switch-color-success {
  --mui-switch-track-on: rgb(46, 125, 50);
}

.mui-switch-wrapper:not(.mui-switch-disabled):hover .mui-switch-track {
  opacity: 0.75;
}

.mui-switch-wrapper:not(.mui-switch-disabled):hover .mui-switch-track-checked {
  opacity: 0.9;
}

.mui-switch-input:focus-visible + .mui-switch-base .mui-switch-thumb {
  box-shadow:
    0 0 0 8px rgba(25, 118, 210, 0.2),
    0 1px 3px rgba(0, 0, 0, 0.4),
    0 1px 1px rgba(0, 0, 0, 0.24);
}

.mui-switch-disabled {
  cursor: not-allowed;
}

.mui-switch-disabled .mui-switch-track,
.mui-switch-disabled .mui-switch-track-checked {
  background-color: var(--mui-switch-track-disabled);
  opacity: 1;
}

.mui-switch-disabled .mui-switch-thumb {
  background-color: var(--mui-switch-thumb-disabled);
  box-shadow: none;
}

.mui-switch-label {
  margin-left: 2px;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: rgba(0, 0, 0, 0.87);
}

@media (prefers-color-scheme: dark) {
  .mui-switch-wrapper {
    --mui-switch-track-off: rgba(255, 255, 255, 0.3);
    --mui-switch-track-disabled: rgba(255, 255, 255, 0.2);
    --mui-switch-thumb-disabled: #bdbdbd;
  }

  .mui-switch-color-primary {
    --mui-switch-track-on: rgb(144, 202, 249);
  }

  .mui-switch-color-secondary {
    --mui-switch-track-on: rgb(244, 143, 177);
  }

  .mui-switch-color-error {
    --mui-switch-track-on: rgb(244, 67, 54);
  }

  .mui-switch-color-warning {
    --mui-switch-track-on: rgb(255, 152, 0);
  }

  .mui-switch-color-info {
    --mui-switch-track-on: rgb(41, 182, 246);
  }

  .mui-switch-color-success {
    --mui-switch-track-on: rgb(102, 187, 106);
  }

  .mui-switch-input:focus-visible + .mui-switch-base .mui-switch-thumb {
    box-shadow:
      0 0 0 8px rgba(144, 202, 249, 0.25),
      0 1px 3px rgba(0, 0, 0, 0.5),
      0 1px 1px rgba(0, 0, 0, 0.35);
  }

  .mui-switch-label {
    color: rgba(255, 255, 255, 0.87);
  }
}
`,z`
.mui-pill {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  max-width: 100%;
  gap: 6px;
  border: 1px solid transparent;
  border-radius: 999px;
  
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.2;
  user-select: none;
  white-space: nowrap;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    opacity 0.2s ease;
}

.mui-pill-size-small {
  height: 24px;
  padding: 0 8px;
  font-size: 0.75rem;
}

.mui-pill-size-medium {
  height: 32px;
  padding: 0 12px;
}

.mui-pill-label {
  overflow: hidden;
  text-overflow: ellipsis;
}

.mui-pill-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mui-pill-delete {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 -4px 0 0;
  padding: 0;
  border: none;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: transparent;
  color: inherit;
  opacity: 0.88;
  cursor: pointer;
  transition:
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.mui-pill-delete-mark {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  transform: translateY(-0.5px);
}

.mui-pill-delete:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

.mui-pill-clickable {
  cursor: pointer;
}

.mui-pill-clickable:hover {
  filter: brightness(0.96);
}

.mui-pill-clickable:focus-visible {
  outline: 2px solid rgba(25, 118, 210, 0.4);
  outline-offset: 2px;
}

.mui-pill-disabled {
  pointer-events: none;
  opacity: 0.45;
}

.mui-pill-variant-filled.mui-pill-color-default {
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.87);
}

.mui-pill-variant-filled.mui-pill-color-primary {
  background: var(--kt-color-primary);
  color: #fff;
}

.mui-pill-variant-filled.mui-pill-color-secondary {
  background: var(--kt-color-secondary);
  color: #fff;
}

.mui-pill-variant-filled.mui-pill-color-error {
  background: var(--kt-color-error);
  color: #fff;
}

.mui-pill-variant-filled.mui-pill-color-warning {
  background: var(--kt-color-warning);
  color: #fff;
}

.mui-pill-variant-filled.mui-pill-color-info {
  background: var(--kt-color-info);
  color: #fff;
}

.mui-pill-variant-filled.mui-pill-color-success {
  background: var(--kt-color-success);
  color: #fff;
}

.mui-pill-variant-outlined {
  background: transparent;
}

.mui-pill-variant-outlined.mui-pill-color-default {
  border-color: rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.7);
}

.mui-pill-variant-outlined.mui-pill-color-primary {
  border-color: var(--kt-color-primary);
  color: var(--kt-color-primary);
}

.mui-pill-variant-outlined.mui-pill-color-secondary {
  border-color: var(--kt-color-secondary);
  color: var(--kt-color-secondary);
}

.mui-pill-variant-outlined.mui-pill-color-error {
  border-color: var(--kt-color-error);
  color: var(--kt-color-error);
}

.mui-pill-variant-outlined.mui-pill-color-warning {
  border-color: var(--kt-color-warning);
  color: var(--kt-color-warning);
}

.mui-pill-variant-outlined.mui-pill-color-info {
  border-color: var(--kt-color-info);
  color: var(--kt-color-info);
}

.mui-pill-variant-outlined.mui-pill-color-success {
  border-color: var(--kt-color-success);
  color: var(--kt-color-success);
}

@media (prefers-color-scheme: dark) {
  .mui-pill-variant-filled.mui-pill-color-default {
    background: rgba(255, 255, 255, 0.14);
    color: rgba(255, 255, 255, 0.9);
  }

  .mui-pill-variant-outlined.mui-pill-color-default {
    border-color: rgba(255, 255, 255, 0.35);
    color: rgba(255, 255, 255, 0.85);
  }

  .mui-pill-delete:hover {
    background: rgba(255, 255, 255, 0.14);
  }
}

`,z`
.mui-badge-root {
  position: relative;
  display: inline-flex;
  flex-shrink: 0;
  vertical-align: middle;
}

.mui-badge-content {
  display: inline-flex;
  align-items: center;
}

.mui-badge-badge {
  --mui-badge-translate-x: 50%;
  --mui-badge-translate-y: -50%;
  position: absolute;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 0 6px;
  
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  z-index: 1;
  pointer-events: none;
  transform: translate(var(--mui-badge-translate-x), var(--mui-badge-translate-y)) scale(1);
  transform-origin: center;
  transition:
    transform 300ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-badge-standard {
  min-width: 20px;
  height: 20px;
}

.mui-badge-dot {
  min-width: 8px;
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 4px;
}

.mui-badge-overlap-circular.mui-badge-anchor-top-right {
  top: 14%;
  right: 14%;
}

.mui-badge-overlap-circular.mui-badge-anchor-top-left {
  top: 14%;
  left: 14%;
}

.mui-badge-overlap-circular.mui-badge-anchor-bottom-right {
  bottom: 14%;
  right: 14%;
}

.mui-badge-overlap-circular.mui-badge-anchor-bottom-left {
  bottom: 14%;
  left: 14%;
}

.mui-badge-overlap-rectangular.mui-badge-anchor-top-right {
  top: 0;
  right: 0;
}

.mui-badge-overlap-rectangular.mui-badge-anchor-top-left {
  top: 0;
  left: 0;
}

.mui-badge-overlap-rectangular.mui-badge-anchor-bottom-right {
  bottom: 0;
  right: 0;
}

.mui-badge-overlap-rectangular.mui-badge-anchor-bottom-left {
  bottom: 0;
  left: 0;
}

.mui-badge-anchor-top-right {
  --mui-badge-translate-x: 50%;
  --mui-badge-translate-y: -50%;
}

.mui-badge-anchor-top-left {
  --mui-badge-translate-x: -50%;
  --mui-badge-translate-y: -50%;
}

.mui-badge-anchor-bottom-right {
  --mui-badge-translate-x: 50%;
  --mui-badge-translate-y: 50%;
}

.mui-badge-anchor-bottom-left {
  --mui-badge-translate-x: -50%;
  --mui-badge-translate-y: 50%;
}

.mui-badge-invisible {
  opacity: 0;
  transform: translate(var(--mui-badge-translate-x), var(--mui-badge-translate-y)) scale(0);
}

.mui-badge-color-default {
  background: #616161;
  color: #fff;
}

.mui-badge-color-primary {
  background: var(--kt-color-primary);
  color: #fff;
}

.mui-badge-color-secondary {
  background: var(--kt-color-secondary);
  color: #fff;
}

.mui-badge-color-error {
  background: var(--kt-color-error);
  color: #fff;
}

.mui-badge-color-warning {
  background: var(--kt-color-warning);
  color: #fff;
}

.mui-badge-color-info {
  background: var(--kt-color-info);
  color: #fff;
}

.mui-badge-color-success {
  background: var(--kt-color-success);
  color: #fff;
}

`,z`
.mui-tabs-root {
  display: flex;
  width: 100%;
  min-height: 48px;
}

.mui-tabs-root.mui-tabs-orientation-vertical {
  min-height: 120px;
}

.mui-tabs-scroller {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
}

.mui-tabs-list {
  position: relative;
  display: inline-flex;
  flex: 1;
  min-height: 48px;
}

.mui-tabs-centered .mui-tabs-list {
  justify-content: center;
}

.mui-tabs-orientation-vertical .mui-tabs-list {
  flex-direction: column;
  align-items: stretch;
}

.mui-tabs-variant-scrollable .mui-tabs-scroller {
  overflow-x: auto;
}

.mui-tabs-variant-scrollable.mui-tabs-orientation-vertical .mui-tabs-scroller {
  overflow-x: hidden;
  overflow-y: auto;
}

.mui-tabs-variant-fullWidth .mui-tab-root {
  flex: 1;
  max-width: none;
}

.mui-tab-root {
  position: relative;
  min-height: 48px;
  min-width: 90px;
  max-width: 360px;
  padding: 12px 16px;
  margin: 0;
  border: 0;
  background: transparent;
  color: rgba(0, 0, 0, 0.6);
  
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    color 180ms cubic-bezier(0.4, 0, 0.2, 1),
    background-color 180ms cubic-bezier(0.4, 0, 0.2, 1);
}

.mui-tabs-orientation-vertical .mui-tab-root {
  justify-content: flex-start;
  text-transform: none;
  max-width: none;
}

.mui-tab-root:hover {
  background-color: rgba(25, 118, 210, 0.04);
}

.mui-tab-root:focus-visible {
  outline: none;
  background-color: rgba(25, 118, 210, 0.12);
}

.mui-tab-root.mui-tab-disabled,
.mui-tab-root:disabled {
  color: rgba(0, 0, 0, 0.38);
  cursor: default;
}

.mui-tab-root.mui-tab-disabled:hover,
.mui-tab-root:disabled:hover {
  background-color: transparent;
}

.mui-tab-root.mui-tab-selected {
  color: rgb(25, 118, 210);
}

.mui-tab-root.mui-tab-text-color-secondary.mui-tab-selected {
  color: rgb(156, 39, 176);
}

.mui-tab-root.mui-tab-text-color-inherit.mui-tab-selected {
  color: inherit;
}

.mui-tab-label {
  display: inline-flex;
  align-items: center;
}

.mui-tab-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  font-size: 1.25rem;
}

.mui-tab-has-icon {
  text-transform: none;
}

.mui-tabs-indicator {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 2px;
  width: 0;
  transform: translateX(0);
  transition:
    transform 220ms cubic-bezier(0.4, 0, 0.2, 1),
    width 220ms cubic-bezier(0.4, 0, 0.2, 1),
    height 220ms cubic-bezier(0.4, 0, 0.2, 1),
    opacity 120ms ease;
  opacity: 0;
  pointer-events: none;
}

.mui-tabs-indicator.mui-tabs-indicator-orientation-vertical {
  top: 0;
  right: 0;
  left: auto;
  bottom: auto;
  width: 2px;
  height: 0;
  transform: translateY(0);
}

.mui-tabs-indicator-color-primary {
  background-color: rgb(25, 118, 210);
}

.mui-tabs-indicator-color-secondary {
  background-color: rgb(156, 39, 176);
}

@media (prefers-color-scheme: dark) {
  .mui-tab-root {
    color: rgba(255, 255, 255, 0.7);
  }

  .mui-tab-root:hover {
    background-color: rgba(144, 202, 249, 0.12);
  }

  .mui-tab-root:focus-visible {
    background-color: rgba(144, 202, 249, 0.2);
  }

  .mui-tab-root.mui-tab-selected {
    color: rgb(144, 202, 249);
  }

  .mui-tab-root.mui-tab-text-color-secondary.mui-tab-selected {
    color: rgb(206, 147, 216);
  }

  .mui-tab-root.mui-tab-disabled,
  .mui-tab-root:disabled {
    color: rgba(255, 255, 255, 0.38);
  }

  .mui-tabs-indicator-color-primary {
    background-color: rgb(144, 202, 249);
  }

  .mui-tabs-indicator-color-secondary {
    background-color: rgb(206, 147, 216);
  }
}

`;var W=M(``),qe=M(``),G=M(``),Je=M(``),K=M([]),q=M([]),J=M([]),Y=M(!1),X=M(!1),Ye=M(!1),Xe=M(``),Ze=M(null),Qe=M(null),$e=M(null),et=M(),Z=L(()=>Y.value||X.value,[Y,X]),tt=L(()=>J.value.map(e=>({value:e,label:e})),[J]),Q=L(()=>Je.value!==``,[Je]),nt=L(()=>`progress-wrap ${Z.value?``:`is-hidden`}`,[Z]),rt=L(()=>K.value.length,[K]),it=L(()=>`${rt.value} ${rt.value===1?`entry`:`entries`}`,[rt]);function at(e){return e instanceof Error?e.message:`Unknown error`}function $(e,t){Ze.value={severity:e,text:t}}function ot(e){return e?new Date(e*1e3).toLocaleString(`zh-CN`):`未加载`}function st(e){return e?new Date(e).toLocaleString(`zh-CN`):`暂不可用`}async function ct(e,t){let n=await fetch(e,{method:t===void 0?`GET`:`POST`,headers:t===void 0?void 0:{"content-type":`application/json`},body:t===void 0?void 0:JSON.stringify(t)}),r=await n.text(),i=r?JSON.parse(r):void 0;if(!n.ok){let e=i&&typeof i==`object`&&`error`in i&&typeof i.error==`string`?i.error:`Request failed with status ${n.status}`;throw Error(e)}return i??{}}function lt(e){qe.value=e.directoryPath,Je.value=e.filePath,G.value=e.fileName,Qe.value=e.exportTime,$e.value=e.recordStart,K.value=e.entries,q.value=e.backups,J.value.includes(e.fileName)||(J.value=[...J.value,e.fileName].sort((e,t)=>e.localeCompare(t,`zh-Hans-CN`)))}async function ut(e=G.value,t=!0){if(!e){$(`warning`,`请先选择一个 .lex 文件。`);return}t&&(Y.value=!0);try{let t=await ct(`/api/lex/load`,{directoryPath:W.value,fileName:e});lt(t),$(`success`,`已加载 ${t.fileName}。`)}catch(e){$(`error`,at(e))}finally{t&&(Y.value=!1)}}async function dt(){Y.value=!0;try{let e=await ct(`/api/lex/scan`,{directoryPath:W.value});if(qe.value=e.directoryPath,J.value=e.files,G.value=e.selectedFileName??``,!e.selectedFileName){Je.value=``,K.value=[],q.value=[],Qe.value=null,$e.value=null,$(`warning`,`该目录下没有发现 .lex 文件。`);return}await ut(e.selectedFileName,!1)}catch(e){$(`error`,at(e))}finally{Y.value=!1}}async function ft(){if(!G.value){$(`warning`,`请先加载一个 .lex 文件。`);return}X.value=!0;try{let e=await ct(`/api/lex/save`,{directoryPath:W.value,fileName:G.value,entries:K.value});lt(e),$(`success`,`已保存 ${e.entries.length} 条词条，并写入新的 bak0 备份。`)}catch(e){$(`error`,at(e))}finally{X.value=!1}}async function pt(e){if(G.value&&window.confirm(`确定要恢复 bak${e} 吗？当前文件会先轮换到新的 bak0。`)){X.value=!0;try{lt(await ct(`/api/lex/restore`,{directoryPath:W.value,fileName:G.value,backupIndex:e})),$(`success`,`已恢复 bak${e}。`)}catch(e){$(`error`,at(e))}finally{X.value=!1}}}async function mt(){if(!G.value){$(`warning`,`请先加载一个 .lex 文件。`);return}X.value=!0;try{lt(await ct(`/api/lex/import`,{directoryPath:W.value,fileName:G.value,content:Xe.value})),Ye.value=!1,$(`success`,`导入完成，新增内容已经合并到当前词库。`)}catch(e){$(`error`,at(e))}finally{X.value=!1}}function ht(){K.draft.push({id:crypto.randomUUID(),text:``,pinyin:``,index:1,rawHeaderBase64:K.value[0]?.rawHeaderBase64??``})}function gt(e){K.draft.splice(e,1)}function _t(e,t){e<0||e>=K.value.length||(K.draft[e].text=t)}function vt(e,t){e<0||e>=K.value.length||(K.draft[e].pinyin=t)}function yt(e,t){if(e<0||e>=K.value.length)return;let n=Number(t);K.draft[e].index=Number.isFinite(n)?Math.max(1,Math.min(9,Math.trunc(n))):1}async function bt(e){let t=e.currentTarget,n=t?.files?.[0];n&&(Xe.value=await n.text(),Ye.value=!0,t&&(t.value=``))}var xt=L(()=>{let e=Ze.value;return e?N(Ee,{severity:e.severity,variant:`filled`,"on:close":()=>Ze.value=null,children:e.text}):``},[Ze]);function St(){return F(`main`,{class:`app-shell`,children:[F(`section`,{class:`hero`,children:[N(`p`,{class:`hero-kicker`,children:`Win11 Microsoft Pinyin`}),N(`h1`,{class:`hero-title`,children:`词库可视化管理台`}),N(`p`,{class:`hero-subtitle`,children:`输入 Windows 目录后，后端会自动转换路径并扫描其中的 .lex 文件。你可以在一个页面里完成加载、编辑、导入文本、保存和恢复最近三次备份。`}),F(`div`,{class:`hero-meta`,children:[F(`span`,{class:`hero-chip`,children:[`当前文件：`,G.map(e=>e||`未选择`)]}),F(`span`,{class:`hero-chip`,children:[`词条总数：`,it]}),F(`span`,{class:`hero-chip`,children:[`最近导出：`,Qe.map(e=>ot(e))]})]}),N(`div`,{class:`status-banner`,children:xt}),N(`div`,{class:nt,children:N(Le,{variant:`indeterminate`,color:`warning`})})]}),F(`section`,{class:`workspace`,children:[F(`div`,{class:`stack`,children:[N(U,{class:`panel`,elevation:0,children:F(`div`,{class:`panel-body toolbar-grid`,children:[F(`div`,{children:[N(`h2`,{class:`panel-title`,children:`目录与文件`}),N(`p`,{class:`panel-description`,children:`目录输入支持典型的 Windows 路径，例如 C:\\\\Users\\\\...\\\\Microsoft\\\\InputMethod。`})]}),N(Be,{"k-model":W,label:`Windows 目录或 .lex 文件路径`,placeholder:`C:\\\\Users\\\\Alice\\\\AppData\\\\Local\\\\Microsoft\\\\InputMethod`,fullWidth:!0}),F(`div`,{class:`button-row`,children:[N(H,{variant:`contained`,color:`primary`,disabled:Z,"on:click":dt,children:`扫描并加载`}),N(H,{variant:`outlined`,color:`warning`,disabled:Z.map(e=>e||!Q.value),"on:click":()=>ut(),children:`重新加载`})]}),N(We,{"k-model":G,options:tt,label:`检测到的 .lex 文件`,placeholder:`先扫描目录`,fullWidth:!0,disabled:J.map(e=>e.length===0||Z.value),"on:change":e=>void ut(String(e))}),F(`div`,{children:[N(`p`,{class:`fine-print`,children:`解析后的目录`}),N(`div`,{class:`path-box`,children:qe.map(e=>e||`扫描后显示转换后的实际目录`)})]})]})}),N(U,{class:`panel`,elevation:0,children:F(`div`,{class:`panel-body`,children:[N(`h2`,{class:`panel-title`,children:`文件概览`}),N(`p`,{class:`panel-description`,children:`当前词库的基础信息与最近三个备份状态会在这里同步刷新。`}),F(`div`,{class:`stats-grid`,children:[F(`div`,{class:`stat-card`,children:[N(`p`,{class:`stat-label`,children:`词条数量`}),N(`p`,{class:`stat-value`,children:rt})]}),F(`div`,{class:`stat-card`,children:[N(`p`,{class:`stat-label`,children:`Record Start`}),N(`p`,{class:`stat-value`,children:$e.map(e=>e===null?`0x--`:`0x${e.toString(16)}`)})]})]}),N(`div`,{class:`backup-list`,children:N(ye,{list:q,map:e=>N(`article`,{class:`backup-item`,children:F(`div`,{children:[N(`p`,{class:`backup-title`,children:`bak${e.index}`}),N(`p`,{class:`backup-time`,children:st(e.updatedAt)}),N(`p`,{class:`fine-print`,children:e.exists?e.path:`当前槽位暂无备份文件`})]})})},e=>e.index)})]})}),N(U,{class:`panel`,elevation:0,children:F(`div`,{class:`panel-body toolbar-grid`,children:[F(`div`,{children:[N(`h2`,{class:`panel-title`,children:`导入与备份`}),N(`p`,{class:`panel-description`,children:`导入格式为 词语/拼音。若遇到已存在的完全相同词条，后端会自动去重。`})]}),N(`input`,{ref:et,type:`file`,accept:`.txt,text/plain`,style:`display:none`,"on:change":bt}),F(`div`,{class:`button-row`,children:[N(H,{variant:`contained`,color:`secondary`,disabled:Z.map(e=>e||!Q.value),"on:click":()=>et.value?.click(),children:`选择导入文本`}),N(H,{variant:`outlined`,color:`success`,disabled:Z.map(e=>e||!Q.value),"on:click":ft,children:`保存当前修改`})]}),N(`p`,{class:`fine-print`,children:`恢复备份会先把当前文件再轮换一次，防止二次覆盖。`}),N(`div`,{class:`backup-list`,children:N(ye,{list:q,map:(e,t)=>F(`article`,{class:`backup-item`,children:[F(`div`,{children:[N(`p`,{class:`backup-title`,children:`bak${e.index}`}),N(`p`,{class:`backup-time`,children:st(e.updatedAt)})]}),N(H,{variant:`outlined`,color:`warning`,disabled:Z.map(t=>t||!e.exists,[Z,q]),"on:click":()=>void pt(t),children:`恢复此版本`})]})},e=>e.index)})]})})]}),N(U,{class:`panel editor-panel`,elevation:0,children:F(`div`,{class:`panel-body editor-shell`,children:[F(`div`,{class:`editor-toolbar`,children:[F(`div`,{children:[N(`h2`,{class:`editor-heading`,children:`词条编辑表`}),N(`p`,{class:`editor-note`,children:`表格中的修改不会立即写回文件，点击“保存当前修改”后才会更新 .lex 并生成新的 bak0。`})]}),F(`div`,{class:`button-row`,children:[N(H,{variant:`contained`,color:`info`,disabled:Z.map(e=>e||!Q.value),"on:click":ht,children:`新增词条`}),N(H,{variant:`contained`,color:`success`,disabled:Z.map(e=>e||!Q.value),"on:click":ft,children:`保存全部`})]})]}),R(Q,`div`,()=>({class:`table-shell`,children:F(`table`,{class:`entry-table`,children:[N(`thead`,{children:F(`tr`,{children:[N(`th`,{children:`词条`}),N(`th`,{children:`拼音 / 代码`}),N(`th`,{children:`排位`}),N(`th`,{children:`操作`})]})}),N(`tbody`,{children:N(ye,{list:K,map:(e,t)=>F(`tr`,{children:[N(`td`,{children:N(`input`,{class:`entry-input`,value:e.text,placeholder:`词条文本`,"on:input":e=>_t(t,e.currentTarget.value)})}),N(`td`,{children:N(`input`,{class:`entry-input`,value:e.pinyin,placeholder:`任意字符串`,"on:input":e=>vt(t,e.currentTarget.value)})}),N(`td`,{children:N(`input`,{class:`entry-input entry-index`,type:`number`,min:`1`,max:`9`,value:String(e.index),"on:input":e=>yt(t,e.currentTarget.value)})}),N(`td`,{children:N(`div`,{class:`entry-actions`,children:N(H,{variant:`text`,color:`error`,"on:click":()=>gt(t),children:`删除`})})})]})},e=>e.id)})]})}),`div`,()=>({class:`empty-state`,children:F(`div`,{children:[N(`div`,{class:`empty-illustration`}),N(`h3`,{children:`先加载一个词库`}),N(`p`,{class:`panel-description`,children:`输入 Windows 目录后点击“扫描并加载”。如果路径直接指向某个 .lex 文件，也可以直接解析。`})]})}))]})})]}),N(Pe,{"k-model":Ye,title:`导入词条文本`,width:`720px`,actions:F(`div`,{class:`dialog-actions`,children:[N(H,{variant:`text`,color:`secondary`,"on:click":()=>Ye.value=!1,children:`取消`}),N(H,{variant:`contained`,color:`primary`,disabled:X,"on:click":mt,children:`导入并合并`})]}),children:F(`div`,{children:[N(`p`,{class:`import-helper`,children:`每行一条，格式固定为 词语/拼音。词语与拼音都允许包含空格，解析时以最后一个 / 为分隔符。`}),N(Be,{"k-model":Xe,multiline:!0,rows:10,fullWidth:!0,label:`导入文本内容`})]})})]})}document.getElementById(`app`).appendChild(N(St,{}));