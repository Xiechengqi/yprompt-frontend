const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LoginView-_Td4Cd_R.js","assets/LoginView-CZIhclBl.css","assets/GenerateModule-jOcX4Sh5.js","assets/apiService-DJRr25Fm.js","assets/marked.esm-CvLzSlAw.js","assets/FinalTab.vue_vue_type_script_setup_true_lang-LnH2PUok.js","assets/FinalTab-CDvh1RBw.css","assets/SavePromptDialog.vue_vue_type_script_setup_true_lang-CRhsdqRd.js","assets/OptimizeModule-BQYk5ICl.js","assets/SystemPromptModal.vue_vue_type_script_setup_true_lang-CeZTs0Jz.js","assets/OptimizeModule-BXifgljp.css","assets/PlaygroundModule-BGAGeE-_.js","assets/PlaygroundModule-BDv4wRAz.css","assets/LibraryModule--GaWP00S.js","assets/LibraryModule-D--3lWMM.css"])))=>i.map(i=>d[i]);
var vp=Object.defineProperty;var bp=(e,t,i)=>t in e?vp(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var Ye=(e,t,i)=>bp(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function i(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=i(o);fetch(o.href,s)}})();const wp="modulepreload",Tp=function(e){return"/"+e},xl={},Pe=function(t,i,n){let o=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),a=(r==null?void 0:r.nonce)||(r==null?void 0:r.getAttribute("nonce"));o=Promise.allSettled(i.map(l=>{if(l=Tp(l),l in xl)return;xl[l]=!0;const c=l.endsWith(".css"),h=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${h}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":wp,c||(u.as="script"),u.crossOrigin="",u.href=l,a&&u.setAttribute("nonce",a),document.head.appendChild(u),c)return new Promise((p,d)=>{u.addEventListener("load",p),u.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return o.then(r=>{for(const a of r||[])a.status==="rejected"&&s(a.reason);return t().catch(s)})};/**
* @vue/shared v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ot(e){const t=Object.create(null);for(const i of e.split(","))t[i]=1;return i=>i in t}const pe={},Cn=[],nt=()=>{},Pn=()=>!1,en=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),ya=e=>e.startsWith("onUpdate:"),fe=Object.assign,va=(e,t)=>{const i=e.indexOf(t);i>-1&&e.splice(i,1)},xp=Object.prototype.hasOwnProperty,Te=(e,t)=>xp.call(e,t),Q=Array.isArray,En=e=>Vn(e)==="[object Map]",tn=e=>Vn(e)==="[object Set]",Sl=e=>Vn(e)==="[object Date]",Sp=e=>Vn(e)==="[object RegExp]",re=e=>typeof e=="function",le=e=>typeof e=="string",kt=e=>typeof e=="symbol",Ie=e=>e!==null&&typeof e=="object",ba=e=>(Ie(e)||re(e))&&re(e.then)&&re(e.catch),nu=Object.prototype.toString,Vn=e=>nu.call(e),kp=e=>Vn(e).slice(8,-1),Gs=e=>Vn(e)==="[object Object]",wa=e=>le(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,_i=Ot(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Ap=Ot("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"),Vs=e=>{const t=Object.create(null);return i=>t[i]||(t[i]=e(i))},Ip=/-\w/g,Ne=Vs(e=>e.replace(Ip,t=>t.slice(1).toUpperCase())),Pp=/\B([A-Z])/g,Tt=Vs(e=>e.replace(Pp,"-$1").toLowerCase()),nn=Vs(e=>e.charAt(0).toUpperCase()+e.slice(1)),Rn=Vs(e=>e?`on${nn(e)}`:""),mt=(e,t)=>!Object.is(e,t),On=(e,...t)=>{for(let i=0;i<e.length;i++)e[i](...t)},ou=(e,t,i,n=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:n,value:i})},fs=e=>{const t=parseFloat(e);return isNaN(t)?e:t},ms=e=>{const t=le(e)?Number(e):NaN;return isNaN(t)?e:t};let kl;const Hs=()=>kl||(kl=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function _p(e,t){return e+JSON.stringify(t,(i,n)=>typeof n=="function"?n.toString():n)}const Cp="Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt,console,Error,Symbol",Ep=Ot(Cp);function Hn(e){if(Q(e)){const t={};for(let i=0;i<e.length;i++){const n=e[i],o=le(n)?su(n):Hn(n);if(o)for(const s in o)t[s]=o[s]}return t}else if(le(e)||Ie(e))return e}const Rp=/;(?![^(]*\))/g,Op=/:([^]+)/,Mp=/\/\*[^]*?\*\//g;function su(e){const t={};return e.replace(Mp,"").split(Rp).forEach(i=>{if(i){const n=i.split(Op);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function Oe(e){let t="";if(le(e))t=e;else if(Q(e))for(let i=0;i<e.length;i++){const n=Oe(e[i]);n&&(t+=n+" ")}else if(Ie(e))for(const i in e)e[i]&&(t+=i+" ");return t.trim()}function Np(e){if(!e)return null;let{class:t,style:i}=e;return t&&!le(t)&&(e.class=Oe(t)),i&&(e.style=Hn(i)),e}const Lp="html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot",Dp="svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view",Fp="annotation,annotation-xml,maction,maligngroup,malignmark,math,menclose,merror,mfenced,mfrac,mfraction,mglyph,mi,mlabeledtr,mlongdiv,mmultiscripts,mn,mo,mover,mpadded,mphantom,mprescripts,mroot,mrow,ms,mscarries,mscarry,msgroup,msline,mspace,msqrt,msrow,mstack,mstyle,msub,msubsup,msup,mtable,mtd,mtext,mtr,munder,munderover,none,semantics",qp="area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr",$p=Ot(Lp),Up=Ot(Dp),Bp=Ot(Fp),zp=Ot(qp),jp="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Wp=Ot(jp);function ru(e){return!!e||e===""}function Gp(e,t){if(e.length!==t.length)return!1;let i=!0;for(let n=0;i&&n<e.length;n++)i=Oi(e[n],t[n]);return i}function Oi(e,t){if(e===t)return!0;let i=Sl(e),n=Sl(t);if(i||n)return i&&n?e.getTime()===t.getTime():!1;if(i=kt(e),n=kt(t),i||n)return e===t;if(i=Q(e),n=Q(t),i||n)return i&&n?Gp(e,t):!1;if(i=Ie(e),n=Ie(t),i||n){if(!i||!n)return!1;const o=Object.keys(e).length,s=Object.keys(t).length;if(o!==s)return!1;for(const r in e){const a=e.hasOwnProperty(r),l=t.hasOwnProperty(r);if(a&&!l||!a&&l||!Oi(e[r],t[r]))return!1}}return String(e)===String(t)}function Ks(e,t){return e.findIndex(i=>Oi(i,t))}const au=e=>!!(e&&e.__v_isRef===!0),ce=e=>le(e)?e:e==null?"":Q(e)||Ie(e)&&(e.toString===nu||!re(e.toString))?au(e)?ce(e.value):JSON.stringify(e,lu,2):String(e),lu=(e,t)=>au(t)?lu(e,t.value):En(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((i,[n,o],s)=>(i[br(n,s)+" =>"]=o,i),{})}:tn(t)?{[`Set(${t.size})`]:[...t.values()].map(i=>br(i))}:kt(t)?br(t):Ie(t)&&!Q(t)&&!Gs(t)?String(t):t,br=(e,t="")=>{var i;return kt(e)?`Symbol(${(i=e.description)!=null?i:t})`:e};function Vp(e){return e==null?"initial":typeof e=="string"?e===""?" ":e:String(e)}/**
* @vue/reactivity v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let lt;class Ta{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=lt,!t&&lt&&(this.index=(lt.scopes||(lt.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,i;if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].pause();for(t=0,i=this.effects.length;t<i;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,i;if(this.scopes)for(t=0,i=this.scopes.length;t<i;t++)this.scopes[t].resume();for(t=0,i=this.effects.length;t<i;t++)this.effects[t].resume()}}run(t){if(this._active){const i=lt;try{return lt=this,t()}finally{lt=i}}}on(){++this._on===1&&(this.prevScope=lt,lt=this)}off(){this._on>0&&--this._on===0&&(lt=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let i,n;for(i=0,n=this.effects.length;i<n;i++)this.effects[i].stop();for(this.effects.length=0,i=0,n=this.cleanups.length;i<n;i++)this.cleanups[i]();if(this.cleanups.length=0,this.scopes){for(i=0,n=this.scopes.length;i<n;i++)this.scopes[i].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function xa(e){return new Ta(e)}function Sa(){return lt}function cu(e,t=!1){lt&&lt.cleanups.push(e)}let Re;const wr=new WeakSet;class wo{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,lt&&lt.active&&lt.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,wr.has(this)&&(wr.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||hu(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Al(this),du(this);const t=Re,i=zt;Re=this,zt=!0;try{return this.fn()}finally{pu(this),Re=t,zt=i,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Ia(t);this.deps=this.depsTail=void 0,Al(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?wr.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){qr(this)&&this.run()}get dirty(){return qr(this)}}let uu=0,lo,co;function hu(e,t=!1){if(e.flags|=8,t){e.next=co,co=e;return}e.next=lo,lo=e}function ka(){uu++}function Aa(){if(--uu>0)return;if(co){let t=co;for(co=void 0;t;){const i=t.next;t.next=void 0,t.flags&=-9,t=i}}let e;for(;lo;){let t=lo;for(lo=void 0;t;){const i=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(n){e||(e=n)}t=i}}if(e)throw e}function du(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function pu(e){let t,i=e.depsTail,n=i;for(;n;){const o=n.prevDep;n.version===-1?(n===i&&(i=o),Ia(n),Hp(n)):t=n,n.dep.activeLink=n.prevActiveLink,n.prevActiveLink=void 0,n=o}e.deps=t,e.depsTail=i}function qr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(fu(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function fu(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===To)||(e.globalVersion=To,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!qr(e))))return;e.flags|=2;const t=e.dep,i=Re,n=zt;Re=e,zt=!0;try{du(e);const o=e.fn(e._value);(t.version===0||mt(o,e._value))&&(e.flags|=128,e._value=o,t.version++)}catch(o){throw t.version++,o}finally{Re=i,zt=n,pu(e),e.flags&=-3}}function Ia(e,t=!1){const{dep:i,prevSub:n,nextSub:o}=e;if(n&&(n.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=n,e.nextSub=void 0),i.subs===e&&(i.subs=n,!n&&i.computed)){i.computed.flags&=-5;for(let s=i.computed.deps;s;s=s.nextDep)Ia(s,!0)}!t&&!--i.sc&&i.map&&i.map.delete(i.key)}function Hp(e){const{prevDep:t,nextDep:i}=e;t&&(t.nextDep=i,e.prevDep=void 0),i&&(i.prevDep=t,e.nextDep=void 0)}function Kp(e,t){e.effect instanceof wo&&(e=e.effect.fn);const i=new wo(e);t&&fe(i,t);try{i.run()}catch(o){throw i.stop(),o}const n=i.run.bind(i);return n.effect=i,n}function Yp(e){e.effect.stop()}let zt=!0;const mu=[];function ci(){mu.push(zt),zt=!1}function ui(){const e=mu.pop();zt=e===void 0?!0:e}function Al(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const i=Re;Re=void 0;try{t()}finally{Re=i}}}let To=0;class Jp{constructor(t,i){this.sub=t,this.dep=i,this.version=i.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ys{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Re||!zt||Re===this.computed)return;let i=this.activeLink;if(i===void 0||i.sub!==Re)i=this.activeLink=new Jp(Re,this),Re.deps?(i.prevDep=Re.depsTail,Re.depsTail.nextDep=i,Re.depsTail=i):Re.deps=Re.depsTail=i,gu(i);else if(i.version===-1&&(i.version=this.version,i.nextDep)){const n=i.nextDep;n.prevDep=i.prevDep,i.prevDep&&(i.prevDep.nextDep=n),i.prevDep=Re.depsTail,i.nextDep=void 0,Re.depsTail.nextDep=i,Re.depsTail=i,Re.deps===i&&(Re.deps=n)}return i}trigger(t){this.version++,To++,this.notify(t)}notify(t){ka();try{for(let i=this.subs;i;i=i.prevSub)i.sub.notify()&&i.sub.dep.notify()}finally{Aa()}}}function gu(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let n=t.deps;n;n=n.nextDep)gu(n)}const i=e.dep.subs;i!==e&&(e.prevSub=i,i&&(i.nextSub=e)),e.dep.subs=e}}const gs=new WeakMap,Wi=Symbol(""),$r=Symbol(""),xo=Symbol("");function ut(e,t,i){if(zt&&Re){let n=gs.get(e);n||gs.set(e,n=new Map);let o=n.get(i);o||(n.set(i,o=new Ys),o.map=n,o.key=i),o.track()}}function oi(e,t,i,n,o,s){const r=gs.get(e);if(!r){To++;return}const a=l=>{l&&l.trigger()};if(ka(),t==="clear")r.forEach(a);else{const l=Q(e),c=l&&wa(i);if(l&&i==="length"){const h=Number(n);r.forEach((u,p)=>{(p==="length"||p===xo||!kt(p)&&p>=h)&&a(u)})}else switch((i!==void 0||r.has(void 0))&&a(r.get(i)),c&&a(r.get(xo)),t){case"add":l?c&&a(r.get("length")):(a(r.get(Wi)),En(e)&&a(r.get($r)));break;case"delete":l||(a(r.get(Wi)),En(e)&&a(r.get($r)));break;case"set":En(e)&&a(r.get(Wi));break}}Aa()}function Qp(e,t){const i=gs.get(e);return i&&i.get(t)}function rn(e){const t=ge(e);return t===e?t:(ut(t,"iterate",xo),Et(e)?t:t.map(et))}function Js(e){return ut(e=ge(e),"iterate",xo),e}const Zp={__proto__:null,[Symbol.iterator](){return Tr(this,Symbol.iterator,et)},concat(...e){return rn(this).concat(...e.map(t=>Q(t)?rn(t):t))},entries(){return Tr(this,"entries",e=>(e[1]=et(e[1]),e))},every(e,t){return Zt(this,"every",e,t,void 0,arguments)},filter(e,t){return Zt(this,"filter",e,t,i=>i.map(et),arguments)},find(e,t){return Zt(this,"find",e,t,et,arguments)},findIndex(e,t){return Zt(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Zt(this,"findLast",e,t,et,arguments)},findLastIndex(e,t){return Zt(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Zt(this,"forEach",e,t,void 0,arguments)},includes(...e){return xr(this,"includes",e)},indexOf(...e){return xr(this,"indexOf",e)},join(e){return rn(this).join(e)},lastIndexOf(...e){return xr(this,"lastIndexOf",e)},map(e,t){return Zt(this,"map",e,t,void 0,arguments)},pop(){return Qn(this,"pop")},push(...e){return Qn(this,"push",e)},reduce(e,...t){return Il(this,"reduce",e,t)},reduceRight(e,...t){return Il(this,"reduceRight",e,t)},shift(){return Qn(this,"shift")},some(e,t){return Zt(this,"some",e,t,void 0,arguments)},splice(...e){return Qn(this,"splice",e)},toReversed(){return rn(this).toReversed()},toSorted(e){return rn(this).toSorted(e)},toSpliced(...e){return rn(this).toSpliced(...e)},unshift(...e){return Qn(this,"unshift",e)},values(){return Tr(this,"values",et)}};function Tr(e,t,i){const n=Js(e),o=n[t]();return n!==e&&!Et(e)&&(o._next=o.next,o.next=()=>{const s=o._next();return s.value&&(s.value=i(s.value)),s}),o}const Xp=Array.prototype;function Zt(e,t,i,n,o,s){const r=Js(e),a=r!==e&&!Et(e),l=r[t];if(l!==Xp[t]){const u=l.apply(e,s);return a?et(u):u}let c=i;r!==e&&(a?c=function(u,p){return i.call(this,et(u),p,e)}:i.length>2&&(c=function(u,p){return i.call(this,u,p,e)}));const h=l.call(r,c,n);return a&&o?o(h):h}function Il(e,t,i,n){const o=Js(e);let s=i;return o!==e&&(Et(e)?i.length>3&&(s=function(r,a,l){return i.call(this,r,a,l,e)}):s=function(r,a,l){return i.call(this,r,et(a),l,e)}),o[t](s,...n)}function xr(e,t,i){const n=ge(e);ut(n,"iterate",xo);const o=n[t](...i);return(o===-1||o===!1)&&Xs(i[0])?(i[0]=ge(i[0]),n[t](...i)):o}function Qn(e,t,i=[]){ci(),ka();const n=ge(e)[t].apply(e,i);return Aa(),ui(),n}const ef=Ot("__proto__,__v_isRef,__isVue"),yu=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(kt));function tf(e){kt(e)||(e=String(e));const t=ge(this);return ut(t,"has",e),t.hasOwnProperty(e)}class vu{constructor(t=!1,i=!1){this._isReadonly=t,this._isShallow=i}get(t,i,n){if(i==="__v_skip")return t.__v_skip;const o=this._isReadonly,s=this._isShallow;if(i==="__v_isReactive")return!o;if(i==="__v_isReadonly")return o;if(i==="__v_isShallow")return s;if(i==="__v_raw")return n===(o?s?ku:Su:s?xu:Tu).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(n)?t:void 0;const r=Q(t);if(!o){let l;if(r&&(l=Zp[i]))return l;if(i==="hasOwnProperty")return tf}const a=Reflect.get(t,i,qe(t)?t:n);return(kt(i)?yu.has(i):ef(i))||(o||ut(t,"get",i),s)?a:qe(a)?r&&wa(i)?a:a.value:Ie(a)?o?_a(a):Kn(a):a}}class bu extends vu{constructor(t=!1){super(!1,t)}set(t,i,n,o){let s=t[i];if(!this._isShallow){const l=hi(s);if(!Et(n)&&!hi(n)&&(s=ge(s),n=ge(n)),!Q(t)&&qe(s)&&!qe(n))return l||(s.value=n),!0}const r=Q(t)&&wa(i)?Number(i)<t.length:Te(t,i),a=Reflect.set(t,i,n,qe(t)?t:o);return t===ge(o)&&(r?mt(n,s)&&oi(t,"set",i,n):oi(t,"add",i,n)),a}deleteProperty(t,i){const n=Te(t,i);t[i];const o=Reflect.deleteProperty(t,i);return o&&n&&oi(t,"delete",i,void 0),o}has(t,i){const n=Reflect.has(t,i);return(!kt(i)||!yu.has(i))&&ut(t,"has",i),n}ownKeys(t){return ut(t,"iterate",Q(t)?"length":Wi),Reflect.ownKeys(t)}}class wu extends vu{constructor(t=!1){super(!0,t)}set(t,i){return!0}deleteProperty(t,i){return!0}}const nf=new bu,of=new wu,sf=new bu(!0),rf=new wu(!0),Ur=e=>e,Ho=e=>Reflect.getPrototypeOf(e);function af(e,t,i){return function(...n){const o=this.__v_raw,s=ge(o),r=En(s),a=e==="entries"||e===Symbol.iterator&&r,l=e==="keys"&&r,c=o[e](...n),h=i?Ur:t?ys:et;return!t&&ut(s,"iterate",l?$r:Wi),{next(){const{value:u,done:p}=c.next();return p?{value:u,done:p}:{value:a?[h(u[0]),h(u[1])]:h(u),done:p}},[Symbol.iterator](){return this}}}}function Ko(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function lf(e,t){const i={get(o){const s=this.__v_raw,r=ge(s),a=ge(o);e||(mt(o,a)&&ut(r,"get",o),ut(r,"get",a));const{has:l}=Ho(r),c=t?Ur:e?ys:et;if(l.call(r,o))return c(s.get(o));if(l.call(r,a))return c(s.get(a));s!==r&&s.get(o)},get size(){const o=this.__v_raw;return!e&&ut(ge(o),"iterate",Wi),o.size},has(o){const s=this.__v_raw,r=ge(s),a=ge(o);return e||(mt(o,a)&&ut(r,"has",o),ut(r,"has",a)),o===a?s.has(o):s.has(o)||s.has(a)},forEach(o,s){const r=this,a=r.__v_raw,l=ge(a),c=t?Ur:e?ys:et;return!e&&ut(l,"iterate",Wi),a.forEach((h,u)=>o.call(s,c(h),c(u),r))}};return fe(i,e?{add:Ko("add"),set:Ko("set"),delete:Ko("delete"),clear:Ko("clear")}:{add(o){!t&&!Et(o)&&!hi(o)&&(o=ge(o));const s=ge(this);return Ho(s).has.call(s,o)||(s.add(o),oi(s,"add",o,o)),this},set(o,s){!t&&!Et(s)&&!hi(s)&&(s=ge(s));const r=ge(this),{has:a,get:l}=Ho(r);let c=a.call(r,o);c||(o=ge(o),c=a.call(r,o));const h=l.call(r,o);return r.set(o,s),c?mt(s,h)&&oi(r,"set",o,s):oi(r,"add",o,s),this},delete(o){const s=ge(this),{has:r,get:a}=Ho(s);let l=r.call(s,o);l||(o=ge(o),l=r.call(s,o)),a&&a.call(s,o);const c=s.delete(o);return l&&oi(s,"delete",o,void 0),c},clear(){const o=ge(this),s=o.size!==0,r=o.clear();return s&&oi(o,"clear",void 0,void 0),r}}),["keys","values","entries",Symbol.iterator].forEach(o=>{i[o]=af(o,e,t)}),i}function Qs(e,t){const i=lf(e,t);return(n,o,s)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?n:Reflect.get(Te(i,o)&&o in n?i:n,o,s)}const cf={get:Qs(!1,!1)},uf={get:Qs(!1,!0)},hf={get:Qs(!0,!1)},df={get:Qs(!0,!0)},Tu=new WeakMap,xu=new WeakMap,Su=new WeakMap,ku=new WeakMap;function pf(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function ff(e){return e.__v_skip||!Object.isExtensible(e)?0:pf(kp(e))}function Kn(e){return hi(e)?e:Zs(e,!1,nf,cf,Tu)}function Pa(e){return Zs(e,!1,sf,uf,xu)}function _a(e){return Zs(e,!0,of,hf,Su)}function mf(e){return Zs(e,!0,rf,df,ku)}function Zs(e,t,i,n,o){if(!Ie(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=ff(e);if(s===0)return e;const r=o.get(e);if(r)return r;const a=new Proxy(e,s===2?n:i);return o.set(e,a),a}function Yt(e){return hi(e)?Yt(e.__v_raw):!!(e&&e.__v_isReactive)}function hi(e){return!!(e&&e.__v_isReadonly)}function Et(e){return!!(e&&e.__v_isShallow)}function Xs(e){return e?!!e.__v_raw:!1}function ge(e){const t=e&&e.__v_raw;return t?ge(t):e}function er(e){return!Te(e,"__v_skip")&&Object.isExtensible(e)&&ou(e,"__v_skip",!0),e}const et=e=>Ie(e)?Kn(e):e,ys=e=>Ie(e)?_a(e):e;function qe(e){return e?e.__v_isRef===!0:!1}function oe(e){return Au(e,!1)}function Ca(e){return Au(e,!0)}function Au(e,t){return qe(e)?e:new gf(e,t)}class gf{constructor(t,i){this.dep=new Ys,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=i?t:ge(t),this._value=i?t:et(t),this.__v_isShallow=i}get value(){return this.dep.track(),this._value}set value(t){const i=this._rawValue,n=this.__v_isShallow||Et(t)||hi(t);t=n?t:ge(t),mt(t,i)&&(this._rawValue=t,this._value=n?t:et(t),this.dep.trigger())}}function yf(e){e.dep&&e.dep.trigger()}function N(e){return qe(e)?e.value:e}function vf(e){return re(e)?e():N(e)}const bf={get:(e,t,i)=>t==="__v_raw"?e:N(Reflect.get(e,t,i)),set:(e,t,i,n)=>{const o=e[t];return qe(o)&&!qe(i)?(o.value=i,!0):Reflect.set(e,t,i,n)}};function Ea(e){return Yt(e)?e:new Proxy(e,bf)}class wf{constructor(t){this.__v_isRef=!0,this._value=void 0;const i=this.dep=new Ys,{get:n,set:o}=t(i.track.bind(i),i.trigger.bind(i));this._get=n,this._set=o}get value(){return this._value=this._get()}set value(t){this._set(t)}}function Iu(e){return new wf(e)}function Pu(e){const t=Q(e)?new Array(e.length):{};for(const i in e)t[i]=_u(e,i);return t}class Tf{constructor(t,i,n){this._object=t,this._key=i,this._defaultValue=n,this.__v_isRef=!0,this._value=void 0}get value(){const t=this._object[this._key];return this._value=t===void 0?this._defaultValue:t}set value(t){this._object[this._key]=t}get dep(){return Qp(ge(this._object),this._key)}}class xf{constructor(t){this._getter=t,this.__v_isRef=!0,this.__v_isReadonly=!0,this._value=void 0}get value(){return this._value=this._getter()}}function Sf(e,t,i){return qe(e)?e:re(e)?new xf(e):Ie(e)&&arguments.length>1?_u(e,t,i):oe(e)}function _u(e,t,i){const n=e[t];return qe(n)?n:new Tf(e,t,i)}class kf{constructor(t,i,n){this.fn=t,this.setter=i,this._value=void 0,this.dep=new Ys(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=To-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!i,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&Re!==this)return hu(this,!0),!0}get value(){const t=this.dep.track();return fu(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Af(e,t,i=!1){let n,o;return re(e)?n=e:(n=e.get,o=e.set),new kf(n,o,i)}const If={GET:"get",HAS:"has",ITERATE:"iterate"},Pf={SET:"set",ADD:"add",DELETE:"delete",CLEAR:"clear"},Yo={},vs=new WeakMap;let Ti;function _f(){return Ti}function Cu(e,t=!1,i=Ti){if(i){let n=vs.get(i);n||vs.set(i,n=[]),n.push(e)}}function Cf(e,t,i=pe){const{immediate:n,deep:o,once:s,scheduler:r,augmentJob:a,call:l}=i,c=S=>o?S:Et(S)||o===!1||o===0?si(S,1):si(S);let h,u,p,d,m=!1,f=!1;if(qe(e)?(u=()=>e.value,m=Et(e)):Yt(e)?(u=()=>c(e),m=!0):Q(e)?(f=!0,m=e.some(S=>Yt(S)||Et(S)),u=()=>e.map(S=>{if(qe(S))return S.value;if(Yt(S))return c(S);if(re(S))return l?l(S,2):S()})):re(e)?t?u=l?()=>l(e,2):e:u=()=>{if(p){ci();try{p()}finally{ui()}}const S=Ti;Ti=h;try{return l?l(e,3,[d]):e(d)}finally{Ti=S}}:u=nt,t&&o){const S=u,_=o===!0?1/0:o;u=()=>si(S(),_)}const x=Sa(),P=()=>{h.stop(),x&&x.active&&va(x.effects,h)};if(s&&t){const S=t;t=(..._)=>{S(..._),P()}}let A=f?new Array(e.length).fill(Yo):Yo;const b=S=>{if(!(!(h.flags&1)||!h.dirty&&!S))if(t){const _=h.run();if(o||m||(f?_.some((C,R)=>mt(C,A[R])):mt(_,A))){p&&p();const C=Ti;Ti=h;try{const R=[_,A===Yo?void 0:f&&A[0]===Yo?[]:A,d];A=_,l?l(t,3,R):t(...R)}finally{Ti=C}}}else h.run()};return a&&a(b),h=new wo(u),h.scheduler=r?()=>r(b,!1):b,d=S=>Cu(S,!1,h),p=h.onStop=()=>{const S=vs.get(h);if(S){if(l)l(S,4);else for(const _ of S)_();vs.delete(h)}},t?n?b(!0):A=h.run():r?r(b.bind(null,!0),!0):h.run(),P.pause=h.pause.bind(h),P.resume=h.resume.bind(h),P.stop=P,P}function si(e,t=1/0,i){if(t<=0||!Ie(e)||e.__v_skip||(i=i||new Map,(i.get(e)||0)>=t))return e;if(i.set(e,t),t--,qe(e))si(e.value,t,i);else if(Q(e))for(let n=0;n<e.length;n++)si(e[n],t,i);else if(tn(e)||En(e))e.forEach(n=>{si(n,t,i)});else if(Gs(e)){for(const n in e)si(e[n],t,i);for(const n of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,n)&&si(e[n],t,i)}return e}/**
* @vue/runtime-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Eu=[];function Ef(e){Eu.push(e)}function Rf(){Eu.pop()}function Of(e,t){}const Mf={SETUP_FUNCTION:0,0:"SETUP_FUNCTION",RENDER_FUNCTION:1,1:"RENDER_FUNCTION",NATIVE_EVENT_HANDLER:5,5:"NATIVE_EVENT_HANDLER",COMPONENT_EVENT_HANDLER:6,6:"COMPONENT_EVENT_HANDLER",VNODE_HOOK:7,7:"VNODE_HOOK",DIRECTIVE_HOOK:8,8:"DIRECTIVE_HOOK",TRANSITION_HOOK:9,9:"TRANSITION_HOOK",APP_ERROR_HANDLER:10,10:"APP_ERROR_HANDLER",APP_WARN_HANDLER:11,11:"APP_WARN_HANDLER",FUNCTION_REF:12,12:"FUNCTION_REF",ASYNC_COMPONENT_LOADER:13,13:"ASYNC_COMPONENT_LOADER",SCHEDULER:14,14:"SCHEDULER",COMPONENT_UPDATE:15,15:"COMPONENT_UPDATE",APP_UNMOUNT_CLEANUP:16,16:"APP_UNMOUNT_CLEANUP"},Nf={sp:"serverPrefetch hook",bc:"beforeCreate hook",c:"created hook",bm:"beforeMount hook",m:"mounted hook",bu:"beforeUpdate hook",u:"updated",bum:"beforeUnmount hook",um:"unmounted hook",a:"activated hook",da:"deactivated hook",ec:"errorCaptured hook",rtc:"renderTracked hook",rtg:"renderTriggered hook",0:"setup function",1:"render function",2:"watcher getter",3:"watcher callback",4:"watcher cleanup function",5:"native event handler",6:"component event handler",7:"vnode hook",8:"directive hook",9:"transition hook",10:"app errorHandler",11:"app warnHandler",12:"ref function",13:"async component loader",14:"scheduler flush",15:"component update",16:"app unmount cleanup function"};function Yn(e,t,i,n){try{return n?e(...n):e()}catch(o){on(o,t,i)}}function qt(e,t,i,n){if(re(e)){const o=Yn(e,t,i,n);return o&&ba(o)&&o.catch(s=>{on(s,t,i)}),o}if(Q(e)){const o=[];for(let s=0;s<e.length;s++)o.push(qt(e[s],t,i,n));return o}}function on(e,t,i,n=!0){const o=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:r}=t&&t.appContext.config||pe;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${i}`;for(;a;){const h=a.ec;if(h){for(let u=0;u<h.length;u++)if(h[u](e,l,c)===!1)return}a=a.parent}if(s){ci(),Yn(s,null,10,[e,l,c]),ui();return}}Lf(e,i,o,n,r)}function Lf(e,t,i,n=!0,o=!1){if(o)throw e;console.error(e)}const gt=[];let Ht=-1;const Mn=[];let xi=null,Sn=0;const Ru=Promise.resolve();let bs=null;function ai(e){const t=bs||Ru;return e?t.then(this?e.bind(this):e):t}function Df(e){let t=Ht+1,i=gt.length;for(;t<i;){const n=t+i>>>1,o=gt[n],s=ko(o);s<e||s===e&&o.flags&2?t=n+1:i=n}return t}function Ra(e){if(!(e.flags&1)){const t=ko(e),i=gt[gt.length-1];!i||!(e.flags&2)&&t>=ko(i)?gt.push(e):gt.splice(Df(t),0,e),e.flags|=1,Ou()}}function Ou(){bs||(bs=Ru.then(Mu))}function So(e){Q(e)?Mn.push(...e):xi&&e.id===-1?xi.splice(Sn+1,0,e):e.flags&1||(Mn.push(e),e.flags|=1),Ou()}function Pl(e,t,i=Ht+1){for(;i<gt.length;i++){const n=gt[i];if(n&&n.flags&2){if(e&&n.id!==e.uid)continue;gt.splice(i,1),i--,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function ws(e){if(Mn.length){const t=[...new Set(Mn)].sort((i,n)=>ko(i)-ko(n));if(Mn.length=0,xi){xi.push(...t);return}for(xi=t,Sn=0;Sn<xi.length;Sn++){const i=xi[Sn];i.flags&4&&(i.flags&=-2),i.flags&8||i(),i.flags&=-2}xi=null,Sn=0}}const ko=e=>e.id==null?e.flags&2?-1:1/0:e.id;function Mu(e){try{for(Ht=0;Ht<gt.length;Ht++){const t=gt[Ht];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Yn(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;Ht<gt.length;Ht++){const t=gt[Ht];t&&(t.flags&=-2)}Ht=-1,gt.length=0,ws(),bs=null,(gt.length||Mn.length)&&Mu()}}let kn,Jo=[];function Nu(e,t){var i,n;kn=e,kn?(kn.enabled=!0,Jo.forEach(({event:o,args:s})=>kn.emit(o,...s)),Jo=[]):typeof window<"u"&&window.HTMLElement&&!((n=(i=window.navigator)==null?void 0:i.userAgent)!=null&&n.includes("jsdom"))?((t.__VUE_DEVTOOLS_HOOK_REPLAY__=t.__VUE_DEVTOOLS_HOOK_REPLAY__||[]).push(s=>{Nu(s,t)}),setTimeout(()=>{kn||(t.__VUE_DEVTOOLS_HOOK_REPLAY__=null,Jo=[])},3e3)):Jo=[]}let it=null,tr=null;function Ao(e){const t=it;return it=e,tr=e&&e.type.__scopeId||null,t}function Ff(e){tr=e}function qf(){tr=null}const $f=e=>di;function di(e,t=it,i){if(!t||e._n)return e;const n=(...o)=>{n._d&&_o(-1);const s=Ao(t);let r;try{r=e(...o)}finally{Ao(s),n._d&&_o(1)}return r};return n._n=!0,n._c=!0,n._d=!0,n}function Ae(e,t){if(it===null)return e;const i=Bo(it),n=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[s,r,a,l=pe]=t[o];s&&(re(s)&&(s={mounted:s,updated:s}),s.deep&&si(r),n.push({dir:s,instance:i,value:r,oldValue:void 0,arg:a,modifiers:l}))}return e}function Kt(e,t,i,n){const o=e.dirs,s=t&&t.dirs;for(let r=0;r<o.length;r++){const a=o[r];s&&(a.oldValue=s[r].value);let l=a.dir[n];l&&(ci(),qt(l,i,8,[e.el,a,e,t]),ui())}}const Lu=Symbol("_vte"),Du=e=>e.__isTeleport,uo=e=>e&&(e.disabled||e.disabled===""),_l=e=>e&&(e.defer||e.defer===""),Cl=e=>typeof SVGElement<"u"&&e instanceof SVGElement,El=e=>typeof MathMLElement=="function"&&e instanceof MathMLElement,Br=(e,t)=>{const i=e&&e.to;return le(i)?t?t(i):null:i},Fu={name:"Teleport",__isTeleport:!0,process(e,t,i,n,o,s,r,a,l,c){const{mc:h,pc:u,pbc:p,o:{insert:d,querySelector:m,createText:f,createComment:x}}=c,P=uo(t.props);let{shapeFlag:A,children:b,dynamicChildren:S}=t;if(e==null){const _=t.el=f(""),C=t.anchor=f("");d(_,i,n),d(C,i,n);const R=(y,E)=>{A&16&&(o&&o.isCE&&(o.ce._teleportTarget=y),h(b,y,E,o,s,r,a,l))},w=()=>{const y=t.target=Br(t.props,m),E=qu(y,t,f,d);y&&(r!=="svg"&&Cl(y)?r="svg":r!=="mathml"&&El(y)&&(r="mathml"),P||(R(y,E),rs(t,!1)))};P&&(R(i,C),rs(t,!0)),_l(t.props)?(t.el.__isMounted=!1,Ge(()=>{w(),delete t.el.__isMounted},s)):w()}else{if(_l(t.props)&&e.el.__isMounted===!1){Ge(()=>{Fu.process(e,t,i,n,o,s,r,a,l,c)},s);return}t.el=e.el,t.targetStart=e.targetStart;const _=t.anchor=e.anchor,C=t.target=e.target,R=t.targetAnchor=e.targetAnchor,w=uo(e.props),y=w?i:C,E=w?_:R;if(r==="svg"||Cl(C)?r="svg":(r==="mathml"||El(C))&&(r="mathml"),S?(p(e.dynamicChildren,S,y,o,s,r,a),ja(e,t,!0)):l||u(e,t,y,E,o,s,r,a,!1),P)w?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Qo(t,i,_,c,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){const O=t.target=Br(t.props,m);O&&Qo(t,O,null,c,0)}else w&&Qo(t,C,R,c,1);rs(t,P)}},remove(e,t,i,{um:n,o:{remove:o}},s){const{shapeFlag:r,children:a,anchor:l,targetStart:c,targetAnchor:h,target:u,props:p}=e;if(u&&(o(c),o(h)),s&&o(l),r&16){const d=s||!uo(p);for(let m=0;m<a.length;m++){const f=a[m];n(f,t,i,d,!!f.dynamicChildren)}}},move:Qo,hydrate:Uf};function Qo(e,t,i,{o:{insert:n},m:o},s=2){s===0&&n(e.targetAnchor,t,i);const{el:r,anchor:a,shapeFlag:l,children:c,props:h}=e,u=s===2;if(u&&n(r,t,i),(!u||uo(h))&&l&16)for(let p=0;p<c.length;p++)o(c[p],t,i,2);u&&n(a,t,i)}function Uf(e,t,i,n,o,s,{o:{nextSibling:r,parentNode:a,querySelector:l,insert:c,createText:h}},u){function p(f,x,P,A){x.anchor=u(r(f),x,a(f),i,n,o,s),x.targetStart=P,x.targetAnchor=A}const d=t.target=Br(t.props,l),m=uo(t.props);if(d){const f=d._lpa||d.firstChild;if(t.shapeFlag&16)if(m)p(e,t,f,f&&r(f));else{t.anchor=r(e);let x=f;for(;x;){if(x&&x.nodeType===8){if(x.data==="teleport start anchor")t.targetStart=x;else if(x.data==="teleport anchor"){t.targetAnchor=x,d._lpa=t.targetAnchor&&r(t.targetAnchor);break}}x=r(x)}t.targetAnchor||qu(d,t,h,c),u(f&&r(f),t,d,i,n,o,s)}rs(t,m)}else m&&t.shapeFlag&16&&p(e,t,e,r(e));return t.anchor&&r(t.anchor)}const Oa=Fu;function rs(e,t){const i=e.ctx;if(i&&i.ut){let n,o;for(t?(n=e.el,o=e.anchor):(n=e.targetStart,o=e.targetAnchor);n&&n!==o;)n.nodeType===1&&n.setAttribute("data-v-owner",i.uid),n=n.nextSibling;i.ut()}}function qu(e,t,i,n){const o=t.targetStart=i(""),s=t.targetAnchor=i("");return o[Lu]=s,e&&(n(o,e),n(s,e)),s}const ni=Symbol("_leaveCb"),Zo=Symbol("_enterCb");function Ma(){const e={isMounted:!1,isLeaving:!1,isUnmounting:!1,leavingVNodes:new Map};return Ni(()=>{e.isMounted=!0}),sr(()=>{e.isUnmounting=!0}),e}const Nt=[Function,Array],Na={mode:String,appear:Boolean,persisted:Boolean,onBeforeEnter:Nt,onEnter:Nt,onAfterEnter:Nt,onEnterCancelled:Nt,onBeforeLeave:Nt,onLeave:Nt,onAfterLeave:Nt,onLeaveCancelled:Nt,onBeforeAppear:Nt,onAppear:Nt,onAfterAppear:Nt,onAppearCancelled:Nt},$u=e=>{const t=e.subTree;return t.component?$u(t.component):t},Bf={name:"BaseTransition",props:Na,setup(e,{slots:t}){const i=At(),n=Ma();return()=>{const o=t.default&&ir(t.default(),!0);if(!o||!o.length)return;const s=Uu(o),r=ge(e),{mode:a}=r;if(n.isLeaving)return Sr(s);const l=Rl(s);if(!l)return Sr(s);let c=Dn(l,r,n,i,u=>c=u);l.type!==Be&&pi(l,c);let h=i.subTree&&Rl(i.subTree);if(h&&h.type!==Be&&!Bt(h,l)&&$u(i).type!==Be){let u=Dn(h,r,n,i);if(pi(h,u),a==="out-in"&&l.type!==Be)return n.isLeaving=!0,u.afterLeave=()=>{n.isLeaving=!1,i.job.flags&8||i.update(),delete u.afterLeave,h=void 0},Sr(s);a==="in-out"&&l.type!==Be?u.delayLeave=(p,d,m)=>{const f=zu(n,h);f[String(h.key)]=h,p[ni]=()=>{d(),p[ni]=void 0,delete c.delayedLeave,h=void 0},c.delayedLeave=()=>{m(),delete c.delayedLeave,h=void 0}}:h=void 0}else h&&(h=void 0);return s}}};function Uu(e){let t=e[0];if(e.length>1){for(const i of e)if(i.type!==Be){t=i;break}}return t}const Bu=Bf;function zu(e,t){const{leavingVNodes:i}=e;let n=i.get(t.type);return n||(n=Object.create(null),i.set(t.type,n)),n}function Dn(e,t,i,n,o){const{appear:s,mode:r,persisted:a=!1,onBeforeEnter:l,onEnter:c,onAfterEnter:h,onEnterCancelled:u,onBeforeLeave:p,onLeave:d,onAfterLeave:m,onLeaveCancelled:f,onBeforeAppear:x,onAppear:P,onAfterAppear:A,onAppearCancelled:b}=t,S=String(e.key),_=zu(i,e),C=(y,E)=>{y&&qt(y,n,9,E)},R=(y,E)=>{const O=E[1];C(y,E),Q(y)?y.every(k=>k.length<=1)&&O():y.length<=1&&O()},w={mode:r,persisted:a,beforeEnter(y){let E=l;if(!i.isMounted)if(s)E=x||l;else return;y[ni]&&y[ni](!0);const O=_[S];O&&Bt(e,O)&&O.el[ni]&&O.el[ni](),C(E,[y])},enter(y){let E=c,O=h,k=u;if(!i.isMounted)if(s)E=P||c,O=A||h,k=b||u;else return;let D=!1;const j=y[Zo]=G=>{D||(D=!0,G?C(k,[y]):C(O,[y]),w.delayedLeave&&w.delayedLeave(),y[Zo]=void 0)};E?R(E,[y,j]):j()},leave(y,E){const O=String(e.key);if(y[Zo]&&y[Zo](!0),i.isUnmounting)return E();C(p,[y]);let k=!1;const D=y[ni]=j=>{k||(k=!0,E(),j?C(f,[y]):C(m,[y]),y[ni]=void 0,_[O]===e&&delete _[O])};_[O]=e,d?R(d,[y,D]):D()},clone(y){const E=Dn(y,t,i,n,o);return o&&o(E),E}};return w}function Sr(e){if(Fo(e))return e=Jt(e),e.children=null,e}function Rl(e){if(!Fo(e))return Du(e.type)&&e.children?Uu(e.children):e;if(e.component)return e.component.subTree;const{shapeFlag:t,children:i}=e;if(i){if(t&16)return i[0];if(t&32&&re(i.default))return i.default()}}function pi(e,t){e.shapeFlag&6&&e.component?(e.transition=t,pi(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function ir(e,t=!1,i){let n=[],o=0;for(let s=0;s<e.length;s++){let r=e[s];const a=i==null?r.key:String(i)+String(r.key!=null?r.key:s);r.type===Me?(r.patchFlag&128&&o++,n=n.concat(ir(r.children,t,a))):(t||r.type!==Be)&&n.push(a!=null?Jt(r,{key:a}):r)}if(o>1)for(let s=0;s<n.length;s++)n[s].patchFlag=-2;return n}function ot(e,t){return re(e)?fe({name:e.name},t,{setup:e}):e}function zf(){const e=At();return e?(e.appContext.config.idPrefix||"v")+"-"+e.ids[0]+e.ids[1]++:""}function La(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function jf(e){const t=At(),i=Ca(null);if(t){const o=t.refs===pe?t.refs={}:t.refs;Object.defineProperty(o,e,{enumerable:!0,get:()=>i.value,set:s=>i.value=s})}return i}const Ts=new WeakMap;function Nn(e,t,i,n,o=!1){if(Q(e)){e.forEach((m,f)=>Nn(m,t&&(Q(t)?t[f]:t),i,n,o));return}if(Ci(n)&&!o){n.shapeFlag&512&&n.type.__asyncResolved&&n.component.subTree.component&&Nn(e,t,i,n.component.subTree);return}const s=n.shapeFlag&4?Bo(n.component):n.el,r=o?null:s,{i:a,r:l}=e,c=t&&t.r,h=a.refs===pe?a.refs={}:a.refs,u=a.setupState,p=ge(u),d=u===pe?Pn:m=>Te(p,m);if(c!=null&&c!==l){if(Ol(t),le(c))h[c]=null,d(c)&&(u[c]=null);else if(qe(c)){c.value=null;const m=t;m.k&&(h[m.k]=null)}}if(re(l))Yn(l,a,12,[r,h]);else{const m=le(l),f=qe(l);if(m||f){const x=()=>{if(e.f){const P=m?d(l)?u[l]:h[l]:l.value;if(o)Q(P)&&va(P,s);else if(Q(P))P.includes(s)||P.push(s);else if(m)h[l]=[s],d(l)&&(u[l]=h[l]);else{const A=[s];l.value=A,e.k&&(h[e.k]=A)}}else m?(h[l]=r,d(l)&&(u[l]=r)):f&&(l.value=r,e.k&&(h[e.k]=r))};if(r){const P=()=>{x(),Ts.delete(e)};P.id=-1,Ts.set(e,P),Ge(P,i)}else Ol(e),x()}}}function Ol(e){const t=Ts.get(e);t&&(t.flags|=8,Ts.delete(e))}let Ml=!1;const an=()=>{Ml||(console.error("Hydration completed but contains mismatches."),Ml=!0)},Wf=e=>e.namespaceURI.includes("svg")&&e.tagName!=="foreignObject",Gf=e=>e.namespaceURI.includes("MathML"),Xo=e=>{if(e.nodeType===1){if(Wf(e))return"svg";if(Gf(e))return"mathml"}},_n=e=>e.nodeType===8;function Vf(e){const{mt:t,p:i,o:{patchProp:n,createText:o,nextSibling:s,parentNode:r,remove:a,insert:l,createComment:c}}=e,h=(b,S)=>{if(!S.hasChildNodes()){i(null,b,S),ws(),S._vnode=b;return}u(S.firstChild,b,null,null,null),ws(),S._vnode=b},u=(b,S,_,C,R,w=!1)=>{w=w||!!S.dynamicChildren;const y=_n(b)&&b.data==="[",E=()=>f(b,S,_,C,R,y),{type:O,ref:k,shapeFlag:D,patchFlag:j}=S;let G=b.nodeType;S.el=b,j===-2&&(w=!1,S.dynamicChildren=null);let W=null;switch(O){case Ei:G!==3?S.children===""?(l(S.el=o(""),r(b),b),W=b):W=E():(b.data!==S.children&&(an(),b.data=S.children),W=s(b));break;case Be:A(b)?(W=s(b),P(S.el=b.content.firstChild,b,_)):G!==8||y?W=E():W=s(b);break;case Vi:if(y&&(b=s(b),G=b.nodeType),G===1||G===3){W=b;const J=!S.children.length;for(let K=0;K<S.staticCount;K++)J&&(S.children+=W.nodeType===1?W.outerHTML:W.data),K===S.staticCount-1&&(S.anchor=W),W=s(W);return y?s(W):W}else E();break;case Me:y?W=m(b,S,_,C,R,w):W=E();break;default:if(D&1)(G!==1||S.type.toLowerCase()!==b.tagName.toLowerCase())&&!A(b)?W=E():W=p(b,S,_,C,R,w);else if(D&6){S.slotScopeIds=R;const J=r(b);if(y?W=x(b):_n(b)&&b.data==="teleport start"?W=x(b,b.data,"teleport end"):W=s(b),t(S,J,null,_,C,Xo(J),w),Ci(S)&&!S.type.__asyncResolved){let K;y?(K=se(Me),K.anchor=W?W.previousSibling:J.lastChild):K=b.nodeType===3?Ii(""):se("div"),K.el=b,S.component.subTree=K}}else D&64?G!==8?W=E():W=S.type.hydrate(b,S,_,C,R,w,e,d):D&128&&(W=S.type.hydrate(b,S,_,C,Xo(r(b)),R,w,e,u))}return k!=null&&Nn(k,null,C,S),W},p=(b,S,_,C,R,w)=>{w=w||!!S.dynamicChildren;const{type:y,props:E,patchFlag:O,shapeFlag:k,dirs:D,transition:j}=S,G=y==="input"||y==="option";if(G||O!==-1){D&&Kt(S,null,_,"created");let W=!1;if(A(b)){W=ph(null,j)&&_&&_.vnode.props&&_.vnode.props.appear;const K=b.content.firstChild;if(W){const ye=K.getAttribute("class");ye&&(K.$cls=ye),j.beforeEnter(K)}P(K,b,_),S.el=b=K}if(k&16&&!(E&&(E.innerHTML||E.textContent))){let K=d(b.firstChild,S,b,_,C,R,w);for(;K;){es(b,1)||an();const ye=K;K=K.nextSibling,a(ye)}}else if(k&8){let K=S.children;K[0]===`
`&&(b.tagName==="PRE"||b.tagName==="TEXTAREA")&&(K=K.slice(1)),b.textContent!==K&&(es(b,0)||an(),b.textContent=S.children)}if(E){if(G||!w||O&48){const K=b.tagName.includes("-");for(const ye in E)(G&&(ye.endsWith("value")||ye==="indeterminate")||en(ye)&&!_i(ye)||ye[0]==="."||K)&&n(b,ye,null,E[ye],void 0,_)}else if(E.onClick)n(b,"onClick",null,E.onClick,void 0,_);else if(O&4&&Yt(E.style))for(const K in E.style)E.style[K]}let J;(J=E&&E.onVnodeBeforeMount)&&bt(J,_,S),D&&Kt(S,null,_,"beforeMount"),((J=E&&E.onVnodeMounted)||D||W)&&xh(()=>{J&&bt(J,_,S),W&&j.enter(b),D&&Kt(S,null,_,"mounted")},C)}return b.nextSibling},d=(b,S,_,C,R,w,y)=>{y=y||!!S.dynamicChildren;const E=S.children,O=E.length;for(let k=0;k<O;k++){const D=y?E[k]:E[k]=wt(E[k]),j=D.type===Ei;b?(j&&!y&&k+1<O&&wt(E[k+1]).type===Ei&&(l(o(b.data.slice(D.children.length)),_,s(b)),b.data=D.children),b=u(b,D,C,R,w,y)):j&&!D.children?l(D.el=o(""),_):(es(_,1)||an(),i(null,D,_,null,C,R,Xo(_),w))}return b},m=(b,S,_,C,R,w)=>{const{slotScopeIds:y}=S;y&&(R=R?R.concat(y):y);const E=r(b),O=d(s(b),S,E,_,C,R,w);return O&&_n(O)&&O.data==="]"?s(S.anchor=O):(an(),l(S.anchor=c("]"),E,O),O)},f=(b,S,_,C,R,w)=>{if(es(b.parentElement,1)||an(),S.el=null,w){const O=x(b);for(;;){const k=s(b);if(k&&k!==O)a(k);else break}}const y=s(b),E=r(b);return a(b),i(null,S,E,y,_,C,Xo(E),R),_&&(_.vnode.el=S.el,lr(_,S.el)),y},x=(b,S="[",_="]")=>{let C=0;for(;b;)if(b=s(b),b&&_n(b)&&(b.data===S&&C++,b.data===_)){if(C===0)return s(b);C--}return b},P=(b,S,_)=>{const C=S.parentNode;C&&C.replaceChild(b,S);let R=_;for(;R;)R.vnode.el===S&&(R.vnode.el=R.subTree.el=b),R=R.parent},A=b=>b.nodeType===1&&b.tagName==="TEMPLATE";return[h,u]}const Nl="data-allow-mismatch",Hf={0:"text",1:"children",2:"class",3:"style",4:"attribute"};function es(e,t){if(t===0||t===1)for(;e&&!e.hasAttribute(Nl);)e=e.parentElement;const i=e&&e.getAttribute(Nl);if(i==null)return!1;if(i==="")return!0;{const n=i.split(",");return t===0&&n.includes("children")?!0:n.includes(Hf[t])}}const Kf=Hs().requestIdleCallback||(e=>setTimeout(e,1)),Yf=Hs().cancelIdleCallback||(e=>clearTimeout(e)),Jf=(e=1e4)=>t=>{const i=Kf(t,{timeout:e});return()=>Yf(i)};function Qf(e){const{top:t,left:i,bottom:n,right:o}=e.getBoundingClientRect(),{innerHeight:s,innerWidth:r}=window;return(t>0&&t<s||n>0&&n<s)&&(i>0&&i<r||o>0&&o<r)}const Zf=e=>(t,i)=>{const n=new IntersectionObserver(o=>{for(const s of o)if(s.isIntersecting){n.disconnect(),t();break}},e);return i(o=>{if(o instanceof Element){if(Qf(o))return t(),n.disconnect(),!1;n.observe(o)}}),()=>n.disconnect()},Xf=e=>t=>{if(e){const i=matchMedia(e);if(i.matches)t();else return i.addEventListener("change",t,{once:!0}),()=>i.removeEventListener("change",t)}},em=(e=[])=>(t,i)=>{le(e)&&(e=[e]);let n=!1;const o=r=>{n||(n=!0,s(),t(),r.target.dispatchEvent(new r.constructor(r.type,r)))},s=()=>{i(r=>{for(const a of e)r.removeEventListener(a,o)})};return i(r=>{for(const a of e)r.addEventListener(a,o,{once:!0})}),s};function tm(e,t){if(_n(e)&&e.data==="["){let i=1,n=e.nextSibling;for(;n;){if(n.nodeType===1){if(t(n)===!1)break}else if(_n(n))if(n.data==="]"){if(--i===0)break}else n.data==="["&&i++;n=n.nextSibling}}else t(e)}const Ci=e=>!!e.type.__asyncLoader;function im(e){re(e)&&(e={loader:e});const{loader:t,loadingComponent:i,errorComponent:n,delay:o=200,hydrate:s,timeout:r,suspensible:a=!0,onError:l}=e;let c=null,h,u=0;const p=()=>(u++,c=null,d()),d=()=>{let m;return c||(m=c=t().catch(f=>{if(f=f instanceof Error?f:new Error(String(f)),l)return new Promise((x,P)=>{l(f,()=>x(p()),()=>P(f),u+1)});throw f}).then(f=>m!==c&&c?c:(f&&(f.__esModule||f[Symbol.toStringTag]==="Module")&&(f=f.default),h=f,f)))};return ot({name:"AsyncComponentWrapper",__asyncLoader:d,__asyncHydrate(m,f,x){let P=!1;(f.bu||(f.bu=[])).push(()=>P=!0);const A=()=>{P||x()},b=s?()=>{const S=s(A,_=>tm(m,_));S&&(f.bum||(f.bum=[])).push(S)}:A;h?b():d().then(()=>!f.isUnmounted&&b())},get __asyncResolved(){return h},setup(){const m=tt;if(La(m),h)return()=>kr(h,m);const f=b=>{c=null,on(b,m,13,!n)};if(a&&m.suspense||Fn)return d().then(b=>()=>kr(b,m)).catch(b=>(f(b),()=>n?se(n,{error:b}):null));const x=oe(!1),P=oe(),A=oe(!!o);return o&&setTimeout(()=>{A.value=!1},o),r!=null&&setTimeout(()=>{if(!x.value&&!P.value){const b=new Error(`Async component timed out after ${r}ms.`);f(b),P.value=b}},r),d().then(()=>{x.value=!0,m.parent&&Fo(m.parent.vnode)&&m.parent.update()}).catch(b=>{f(b),P.value=b}),()=>{if(x.value&&h)return kr(h,m);if(P.value&&n)return se(n,{error:P.value});if(i&&!A.value)return se(i)}}})}function kr(e,t){const{ref:i,props:n,children:o,ce:s}=t.vnode,r=se(e,n,o);return r.ref=i,r.ce=s,delete t.vnode.ce,r}const Fo=e=>e.type.__isKeepAlive,nm={name:"KeepAlive",__isKeepAlive:!0,props:{include:[String,RegExp,Array],exclude:[String,RegExp,Array],max:[String,Number]},setup(e,{slots:t}){const i=At(),n=i.ctx;if(!n.renderer)return()=>{const A=t.default&&t.default();return A&&A.length===1?A[0]:A};const o=new Map,s=new Set;let r=null;const a=i.suspense,{renderer:{p:l,m:c,um:h,o:{createElement:u}}}=n,p=u("div");n.activate=(A,b,S,_,C)=>{const R=A.component;c(A,b,S,0,a),l(R.vnode,A,b,S,R,a,_,A.slotScopeIds,C),Ge(()=>{R.isDeactivated=!1,R.a&&On(R.a);const w=A.props&&A.props.onVnodeMounted;w&&bt(w,R.parent,A)},a)},n.deactivate=A=>{const b=A.component;Ss(b.m),Ss(b.a),c(A,p,null,1,a),Ge(()=>{b.da&&On(b.da);const S=A.props&&A.props.onVnodeUnmounted;S&&bt(S,b.parent,A),b.isDeactivated=!0},a)};function d(A){Ar(A),h(A,i,a,!0)}function m(A){o.forEach((b,S)=>{const _=Zr(b.type);_&&!A(_)&&f(S)})}function f(A){const b=o.get(A);b&&(!r||!Bt(b,r))?d(b):r&&Ar(r),o.delete(A),s.delete(A)}St(()=>[e.include,e.exclude],([A,b])=>{A&&m(S=>so(A,S)),b&&m(S=>!so(b,S))},{flush:"post",deep:!0});let x=null;const P=()=>{x!=null&&(ks(i.subTree.type)?Ge(()=>{o.set(x,ts(i.subTree))},i.subTree.suspense):o.set(x,ts(i.subTree)))};return Ni(P),or(P),sr(()=>{o.forEach(A=>{const{subTree:b,suspense:S}=i,_=ts(b);if(A.type===_.type&&A.key===_.key){Ar(_);const C=_.component.da;C&&Ge(C,S);return}d(A)})}),()=>{if(x=null,!t.default)return r=null;const A=t.default(),b=A[0];if(A.length>1)return r=null,A;if(!fi(b)||!(b.shapeFlag&4)&&!(b.shapeFlag&128))return r=null,b;let S=ts(b);if(S.type===Be)return r=null,S;const _=S.type,C=Zr(Ci(S)?S.type.__asyncResolved||{}:_),{include:R,exclude:w,max:y}=e;if(R&&(!C||!so(R,C))||w&&C&&so(w,C))return S.shapeFlag&=-257,r=S,b;const E=S.key==null?_:S.key,O=o.get(E);return S.el&&(S=Jt(S),b.shapeFlag&128&&(b.ssContent=S)),x=E,O?(S.el=O.el,S.component=O.component,S.transition&&pi(S,S.transition),S.shapeFlag|=512,s.delete(E),s.add(E)):(s.add(E),y&&s.size>parseInt(y,10)&&f(s.values().next().value)),S.shapeFlag|=256,r=S,ks(b.type)?b:S}}},om=nm;function so(e,t){return Q(e)?e.some(i=>so(i,t)):le(e)?e.split(",").includes(t):Sp(e)?(e.lastIndex=0,e.test(t)):!1}function ju(e,t){Gu(e,"a",t)}function Wu(e,t){Gu(e,"da",t)}function Gu(e,t,i=tt){const n=e.__wdc||(e.__wdc=()=>{let o=i;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(nr(t,n,i),i){let o=i.parent;for(;o&&o.parent;)Fo(o.parent.vnode)&&sm(n,t,i,o),o=o.parent}}function sm(e,t,i,n){const o=nr(t,e,n,!0);qo(()=>{va(n[t],o)},i)}function Ar(e){e.shapeFlag&=-257,e.shapeFlag&=-513}function ts(e){return e.shapeFlag&128?e.ssContent:e}function nr(e,t,i=tt,n=!1){if(i){const o=i[e]||(i[e]=[]),s=t.__weh||(t.__weh=(...r)=>{ci();const a=Qi(i),l=qt(t,i,e,r);return a(),ui(),l});return n?o.unshift(s):o.push(s),s}}const mi=e=>(t,i=tt)=>{(!Fn||e==="sp")&&nr(e,(...n)=>t(...n),i)},Vu=mi("bm"),Ni=mi("m"),Da=mi("bu"),or=mi("u"),sr=mi("bum"),qo=mi("um"),Hu=mi("sp"),Ku=mi("rtg"),Yu=mi("rtc");function Ju(e,t=tt){nr("ec",e,t)}const Fa="components",rm="directives";function rr(e,t){return qa(Fa,e,!0,t)||e}const Qu=Symbol.for("v-ndc");function $o(e){return le(e)?qa(Fa,e,!1)||e:e||Qu}function am(e){return qa(rm,e)}function qa(e,t,i=!0,n=!1){const o=it||tt;if(o){const s=o.type;if(e===Fa){const a=Zr(s,!1);if(a&&(a===t||a===Ne(t)||a===nn(Ne(t))))return s}const r=Ll(o[e]||s[e],t)||Ll(o.appContext[e],t);return!r&&n?s:r}}function Ll(e,t){return e&&(e[t]||e[Ne(t)]||e[nn(Ne(t))])}function Yi(e,t,i,n){let o;const s=i&&i[n],r=Q(e);if(r||le(e)){const a=r&&Yt(e);let l=!1,c=!1;a&&(l=!Et(e),c=hi(e),e=Js(e)),o=new Array(e.length);for(let h=0,u=e.length;h<u;h++)o[h]=t(l?c?ys(et(e[h])):et(e[h]):e[h],h,void 0,s&&s[h])}else if(typeof e=="number"){o=new Array(e);for(let a=0;a<e;a++)o[a]=t(a+1,a,void 0,s&&s[a])}else if(Ie(e))if(e[Symbol.iterator])o=Array.from(e,(a,l)=>t(a,l,void 0,s&&s[l]));else{const a=Object.keys(e);o=new Array(a.length);for(let l=0,c=a.length;l<c;l++){const h=a[l];o[l]=t(e[h],h,l,s&&s[l])}}else o=[];return i&&(i[n]=o),o}function lm(e,t){for(let i=0;i<t.length;i++){const n=t[i];if(Q(n))for(let o=0;o<n.length;o++)e[n[o].name]=n[o].fn;else n&&(e[n.name]=n.key?(...o)=>{const s=n.fn(...o);return s&&(s.key=n.key),s}:n.fn)}return e}function cm(e,t,i={},n,o){if(it.ce||it.parent&&Ci(it.parent)&&it.parent.ce)return t!=="default"&&(i.name=t),X(),Je(Me,null,[se("slot",i,n&&n())],64);let s=e[t];s&&s._c&&(s._d=!1),X();const r=s&&$a(s(i)),a=i.key||r&&r.key,l=Je(Me,{key:(a&&!kt(a)?a:`_${t}`)+(!r&&n?"_fb":"")},r||(n?n():[]),r&&e._===1?64:-2);return!o&&l.scopeId&&(l.slotScopeIds=[l.scopeId+"-s"]),s&&s._c&&(s._d=!0),l}function $a(e){return e.some(t=>fi(t)?!(t.type===Be||t.type===Me&&!$a(t.children)):!0)?e:null}function um(e,t){const i={};for(const n in e)i[t&&/[A-Z]/.test(n)?`on:${n}`:Rn(n)]=e[n];return i}const zr=e=>e?Ch(e)?Bo(e):zr(e.parent):null,ho=fe(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>zr(e.parent),$root:e=>zr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ua(e),$forceUpdate:e=>e.f||(e.f=()=>{Ra(e.update)}),$nextTick:e=>e.n||(e.n=ai.bind(e.proxy)),$watch:e=>Bm.bind(e)}),Ir=(e,t)=>e!==pe&&!e.__isScriptSetup&&Te(e,t),jr={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:i,setupState:n,data:o,props:s,accessCache:r,type:a,appContext:l}=e;let c;if(t[0]!=="$"){const d=r[t];if(d!==void 0)switch(d){case 1:return n[t];case 2:return o[t];case 4:return i[t];case 3:return s[t]}else{if(Ir(n,t))return r[t]=1,n[t];if(o!==pe&&Te(o,t))return r[t]=2,o[t];if((c=e.propsOptions[0])&&Te(c,t))return r[t]=3,s[t];if(i!==pe&&Te(i,t))return r[t]=4,i[t];Wr&&(r[t]=0)}}const h=ho[t];let u,p;if(h)return t==="$attrs"&&ut(e.attrs,"get",""),h(e);if((u=a.__cssModules)&&(u=u[t]))return u;if(i!==pe&&Te(i,t))return r[t]=4,i[t];if(p=l.config.globalProperties,Te(p,t))return p[t]},set({_:e},t,i){const{data:n,setupState:o,ctx:s}=e;return Ir(o,t)?(o[t]=i,!0):n!==pe&&Te(n,t)?(n[t]=i,!0):Te(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=i,!0)},has({_:{data:e,setupState:t,accessCache:i,ctx:n,appContext:o,propsOptions:s,type:r}},a){let l,c;return!!(i[a]||e!==pe&&a[0]!=="$"&&Te(e,a)||Ir(t,a)||(l=s[0])&&Te(l,a)||Te(n,a)||Te(ho,a)||Te(o.config.globalProperties,a)||(c=r.__cssModules)&&c[a])},defineProperty(e,t,i){return i.get!=null?e._.accessCache[t]=0:Te(i,"value")&&this.set(e,t,i.value,null),Reflect.defineProperty(e,t,i)}},hm=fe({},jr,{get(e,t){if(t!==Symbol.unscopables)return jr.get(e,t,e)},has(e,t){return t[0]!=="_"&&!Ep(t)}});function dm(){return null}function pm(){return null}function fm(e){}function mm(e){}function gm(){return null}function ym(){}function vm(e,t){return null}function bm(){return Zu().slots}function wm(){return Zu().attrs}function Zu(e){const t=At();return t.setupContext||(t.setupContext=Mh(t))}function Io(e){return Q(e)?e.reduce((t,i)=>(t[i]=null,t),{}):e}function Tm(e,t){const i=Io(e);for(const n in t){if(n.startsWith("__skip"))continue;let o=i[n];o?Q(o)||re(o)?o=i[n]={type:o,default:t[n]}:o.default=t[n]:o===null&&(o=i[n]={default:t[n]}),o&&t[`__skip_${n}`]&&(o.skipFactory=!0)}return i}function xm(e,t){return!e||!t?e||t:Q(e)&&Q(t)?e.concat(t):fe({},Io(e),Io(t))}function Sm(e,t){const i={};for(const n in e)t.includes(n)||Object.defineProperty(i,n,{enumerable:!0,get:()=>e[n]});return i}function km(e){const t=At();let i=e();return Yr(),ba(i)&&(i=i.catch(n=>{throw Qi(t),n})),[i,()=>Qi(t)]}let Wr=!0;function Am(e){const t=Ua(e),i=e.proxy,n=e.ctx;Wr=!1,t.beforeCreate&&Dl(t.beforeCreate,e,"bc");const{data:o,computed:s,methods:r,watch:a,provide:l,inject:c,created:h,beforeMount:u,mounted:p,beforeUpdate:d,updated:m,activated:f,deactivated:x,beforeDestroy:P,beforeUnmount:A,destroyed:b,unmounted:S,render:_,renderTracked:C,renderTriggered:R,errorCaptured:w,serverPrefetch:y,expose:E,inheritAttrs:O,components:k,directives:D,filters:j}=t;if(c&&Im(c,n,null),r)for(const J in r){const K=r[J];re(K)&&(n[J]=K.bind(i))}if(o){const J=o.call(i,i);Ie(J)&&(e.data=Kn(J))}if(Wr=!0,s)for(const J in s){const K=s[J],ye=re(K)?K.bind(i,i):re(K.get)?K.get.bind(i,i):nt,Ce=!re(K)&&re(K.set)?K.set.bind(i):nt,He=xe({get:ye,set:Ce});Object.defineProperty(n,J,{enumerable:!0,configurable:!0,get:()=>He.value,set:me=>He.value=me})}if(a)for(const J in a)Xu(a[J],n,i,J);if(l){const J=re(l)?l.call(i):l;Reflect.ownKeys(J).forEach(K=>{po(K,J[K])})}h&&Dl(h,e,"c");function W(J,K){Q(K)?K.forEach(ye=>J(ye.bind(i))):K&&J(K.bind(i))}if(W(Vu,u),W(Ni,p),W(Da,d),W(or,m),W(ju,f),W(Wu,x),W(Ju,w),W(Yu,C),W(Ku,R),W(sr,A),W(qo,S),W(Hu,y),Q(E))if(E.length){const J=e.exposed||(e.exposed={});E.forEach(K=>{Object.defineProperty(J,K,{get:()=>i[K],set:ye=>i[K]=ye,enumerable:!0})})}else e.exposed||(e.exposed={});_&&e.render===nt&&(e.render=_),O!=null&&(e.inheritAttrs=O),k&&(e.components=k),D&&(e.directives=D),y&&La(e)}function Im(e,t,i=nt){Q(e)&&(e=Gr(e));for(const n in e){const o=e[n];let s;Ie(o)?"default"in o?s=Rt(o.from||n,o.default,!0):s=Rt(o.from||n):s=Rt(o),qe(s)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>s.value,set:r=>s.value=r}):t[n]=s}}function Dl(e,t,i){qt(Q(e)?e.map(n=>n.bind(t.proxy)):e.bind(t.proxy),t,i)}function Xu(e,t,i,n){let o=n.includes(".")?vh(i,n):()=>i[n];if(le(e)){const s=t[e];re(s)&&St(o,s)}else if(re(e))St(o,e.bind(i));else if(Ie(e))if(Q(e))e.forEach(s=>Xu(s,t,i,n));else{const s=re(e.handler)?e.handler.bind(i):t[e.handler];re(s)&&St(o,s,e)}}function Ua(e){const t=e.type,{mixins:i,extends:n}=t,{mixins:o,optionsCache:s,config:{optionMergeStrategies:r}}=e.appContext,a=s.get(t);let l;return a?l=a:!o.length&&!i&&!n?l=t:(l={},o.length&&o.forEach(c=>xs(l,c,r,!0)),xs(l,t,r)),Ie(t)&&s.set(t,l),l}function xs(e,t,i,n=!1){const{mixins:o,extends:s}=t;s&&xs(e,s,i,!0),o&&o.forEach(r=>xs(e,r,i,!0));for(const r in t)if(!(n&&r==="expose")){const a=Pm[r]||i&&i[r];e[r]=a?a(e[r],t[r]):t[r]}return e}const Pm={data:Fl,props:ql,emits:ql,methods:ro,computed:ro,beforeCreate:ft,created:ft,beforeMount:ft,mounted:ft,beforeUpdate:ft,updated:ft,beforeDestroy:ft,beforeUnmount:ft,destroyed:ft,unmounted:ft,activated:ft,deactivated:ft,errorCaptured:ft,serverPrefetch:ft,components:ro,directives:ro,watch:Cm,provide:Fl,inject:_m};function Fl(e,t){return t?e?function(){return fe(re(e)?e.call(this,this):e,re(t)?t.call(this,this):t)}:t:e}function _m(e,t){return ro(Gr(e),Gr(t))}function Gr(e){if(Q(e)){const t={};for(let i=0;i<e.length;i++)t[e[i]]=e[i];return t}return e}function ft(e,t){return e?[...new Set([].concat(e,t))]:t}function ro(e,t){return e?fe(Object.create(null),e,t):t}function ql(e,t){return e?Q(e)&&Q(t)?[...new Set([...e,...t])]:fe(Object.create(null),Io(e),Io(t??{})):t}function Cm(e,t){if(!e)return t;if(!t)return e;const i=fe(Object.create(null),e);for(const n in t)i[n]=ft(e[n],t[n]);return i}function eh(){return{app:null,config:{isNativeTag:Pn,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let Em=0;function Rm(e,t){return function(n,o=null){re(n)||(n=fe({},n)),o!=null&&!Ie(o)&&(o=null);const s=eh(),r=new WeakSet,a=[];let l=!1;const c=s.app={_uid:Em++,_component:n,_props:o,_container:null,_context:s,_instance:null,version:Lh,get config(){return s.config},set config(h){},use(h,...u){return r.has(h)||(h&&re(h.install)?(r.add(h),h.install(c,...u)):re(h)&&(r.add(h),h(c,...u))),c},mixin(h){return s.mixins.includes(h)||s.mixins.push(h),c},component(h,u){return u?(s.components[h]=u,c):s.components[h]},directive(h,u){return u?(s.directives[h]=u,c):s.directives[h]},mount(h,u,p){if(!l){const d=c._ceVNode||se(n,o);return d.appContext=s,p===!0?p="svg":p===!1&&(p=void 0),u&&t?t(d,h):e(d,h,p),l=!0,c._container=h,h.__vue_app__=c,Bo(d.component)}},onUnmount(h){a.push(h)},unmount(){l&&(qt(a,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(h,u){return s.provides[h]=u,c},runWithContext(h){const u=Gi;Gi=c;try{return h()}finally{Gi=u}}};return c}}let Gi=null;function po(e,t){if(tt){let i=tt.provides;const n=tt.parent&&tt.parent.provides;n===i&&(i=tt.provides=Object.create(n)),i[e]=t}}function Rt(e,t,i=!1){const n=At();if(n||Gi){let o=Gi?Gi._context.provides:n?n.parent==null||n.ce?n.vnode.appContext&&n.vnode.appContext.provides:n.parent.provides:void 0;if(o&&e in o)return o[e];if(arguments.length>1)return i&&re(t)?t.call(n&&n.proxy):t}}function th(){return!!(At()||Gi)}const ih={},nh=()=>Object.create(ih),oh=e=>Object.getPrototypeOf(e)===ih;function Om(e,t,i,n=!1){const o={},s=nh();e.propsDefaults=Object.create(null),sh(e,t,o,s);for(const r in e.propsOptions[0])r in o||(o[r]=void 0);i?e.props=n?o:Pa(o):e.type.props?e.props=o:e.props=s,e.attrs=s}function Mm(e,t,i,n){const{props:o,attrs:s,vnode:{patchFlag:r}}=e,a=ge(o),[l]=e.propsOptions;let c=!1;if((n||r>0)&&!(r&16)){if(r&8){const h=e.vnode.dynamicProps;for(let u=0;u<h.length;u++){let p=h[u];if(ar(e.emitsOptions,p))continue;const d=t[p];if(l)if(Te(s,p))d!==s[p]&&(s[p]=d,c=!0);else{const m=Ne(p);o[m]=Vr(l,a,m,d,e,!1)}else d!==s[p]&&(s[p]=d,c=!0)}}}else{sh(e,t,o,s)&&(c=!0);let h;for(const u in a)(!t||!Te(t,u)&&((h=Tt(u))===u||!Te(t,h)))&&(l?i&&(i[u]!==void 0||i[h]!==void 0)&&(o[u]=Vr(l,a,u,void 0,e,!0)):delete o[u]);if(s!==a)for(const u in s)(!t||!Te(t,u))&&(delete s[u],c=!0)}c&&oi(e.attrs,"set","")}function sh(e,t,i,n){const[o,s]=e.propsOptions;let r=!1,a;if(t)for(let l in t){if(_i(l))continue;const c=t[l];let h;o&&Te(o,h=Ne(l))?!s||!s.includes(h)?i[h]=c:(a||(a={}))[h]=c:ar(e.emitsOptions,l)||(!(l in n)||c!==n[l])&&(n[l]=c,r=!0)}if(s){const l=ge(i),c=a||pe;for(let h=0;h<s.length;h++){const u=s[h];i[u]=Vr(o,l,u,c[u],e,!Te(c,u))}}return r}function Vr(e,t,i,n,o,s){const r=e[i];if(r!=null){const a=Te(r,"default");if(a&&n===void 0){const l=r.default;if(r.type!==Function&&!r.skipFactory&&re(l)){const{propsDefaults:c}=o;if(i in c)n=c[i];else{const h=Qi(o);n=c[i]=l.call(null,t),h()}}else n=l;o.ce&&o.ce._setProp(i,n)}r[0]&&(s&&!a?n=!1:r[1]&&(n===""||n===Tt(i))&&(n=!0))}return n}const Nm=new WeakMap;function rh(e,t,i=!1){const n=i?Nm:t.propsCache,o=n.get(e);if(o)return o;const s=e.props,r={},a=[];let l=!1;if(!re(e)){const h=u=>{l=!0;const[p,d]=rh(u,t,!0);fe(r,p),d&&a.push(...d)};!i&&t.mixins.length&&t.mixins.forEach(h),e.extends&&h(e.extends),e.mixins&&e.mixins.forEach(h)}if(!s&&!l)return Ie(e)&&n.set(e,Cn),Cn;if(Q(s))for(let h=0;h<s.length;h++){const u=Ne(s[h]);$l(u)&&(r[u]=pe)}else if(s)for(const h in s){const u=Ne(h);if($l(u)){const p=s[h],d=r[u]=Q(p)||re(p)?{type:p}:fe({},p),m=d.type;let f=!1,x=!0;if(Q(m))for(let P=0;P<m.length;++P){const A=m[P],b=re(A)&&A.name;if(b==="Boolean"){f=!0;break}else b==="String"&&(x=!1)}else f=re(m)&&m.name==="Boolean";d[0]=f,d[1]=x,(f||Te(d,"default"))&&a.push(u)}}const c=[r,a];return Ie(e)&&n.set(e,c),c}function $l(e){return e[0]!=="$"&&!_i(e)}const Ba=e=>e==="_"||e==="_ctx"||e==="$stable",za=e=>Q(e)?e.map(wt):[wt(e)],Lm=(e,t,i)=>{if(t._n)return t;const n=di((...o)=>za(t(...o)),i);return n._c=!1,n},ah=(e,t,i)=>{const n=e._ctx;for(const o in e){if(Ba(o))continue;const s=e[o];if(re(s))t[o]=Lm(o,s,n);else if(s!=null){const r=za(s);t[o]=()=>r}}},lh=(e,t)=>{const i=za(t);e.slots.default=()=>i},ch=(e,t,i)=>{for(const n in t)(i||!Ba(n))&&(e[n]=t[n])},Dm=(e,t,i)=>{const n=e.slots=nh();if(e.vnode.shapeFlag&32){const o=t._;o?(ch(n,t,i),i&&ou(n,"_",o,!0)):ah(t,n)}else t&&lh(e,t)},Fm=(e,t,i)=>{const{vnode:n,slots:o}=e;let s=!0,r=pe;if(n.shapeFlag&32){const a=t._;a?i&&a===1?s=!1:ch(o,t,i):(s=!t.$stable,ah(t,o)),r=t}else t&&(lh(e,t),r={default:1});if(s)for(const a in o)!Ba(a)&&r[a]==null&&delete o[a]},Ge=xh;function uh(e){return dh(e)}function hh(e){return dh(e,Vf)}function dh(e,t){const i=Hs();i.__VUE__=!0;const{insert:n,remove:o,patchProp:s,createElement:r,createText:a,createComment:l,setText:c,setElementText:h,parentNode:u,nextSibling:p,setScopeId:d=nt,insertStaticContent:m}=e,f=(v,T,M,z=null,$=null,I=null,q=void 0,F=null,L=!!T.dynamicChildren)=>{if(v===T)return;v&&!Bt(v,T)&&(z=B(v),me(v,$,I,!0),v=null),T.patchFlag===-2&&(L=!1,T.dynamicChildren=null);const{type:U,ref:V,shapeFlag:H}=T;switch(U){case Ei:x(v,T,M,z);break;case Be:P(v,T,M,z);break;case Vi:v==null&&A(T,M,z,q);break;case Me:k(v,T,M,z,$,I,q,F,L);break;default:H&1?_(v,T,M,z,$,I,q,F,L):H&6?D(v,T,M,z,$,I,q,F,L):(H&64||H&128)&&U.process(v,T,M,z,$,I,q,F,L,te)}V!=null&&$?Nn(V,v&&v.ref,I,T||v,!T):V==null&&v&&v.ref!=null&&Nn(v.ref,null,I,v,!0)},x=(v,T,M,z)=>{if(v==null)n(T.el=a(T.children),M,z);else{const $=T.el=v.el;T.children!==v.children&&c($,T.children)}},P=(v,T,M,z)=>{v==null?n(T.el=l(T.children||""),M,z):T.el=v.el},A=(v,T,M,z)=>{[v.el,v.anchor]=m(v.children,T,M,z,v.el,v.anchor)},b=({el:v,anchor:T},M,z)=>{let $;for(;v&&v!==T;)$=p(v),n(v,M,z),v=$;n(T,M,z)},S=({el:v,anchor:T})=>{let M;for(;v&&v!==T;)M=p(v),o(v),v=M;o(T)},_=(v,T,M,z,$,I,q,F,L)=>{T.type==="svg"?q="svg":T.type==="math"&&(q="mathml"),v==null?C(T,M,z,$,I,q,F,L):y(v,T,$,I,q,F,L)},C=(v,T,M,z,$,I,q,F)=>{let L,U;const{props:V,shapeFlag:H,transition:ie,dirs:ee}=v;if(L=v.el=r(v.type,I,V&&V.is,V),H&8?h(L,v.children):H&16&&w(v.children,L,null,z,$,Pr(v,I),q,F),ee&&Kt(v,null,z,"created"),R(L,v,v.scopeId,q,z),V){for(const ve in V)ve!=="value"&&!_i(ve)&&s(L,ve,null,V[ve],I,z);"value"in V&&s(L,"value",null,V.value,I),(U=V.onVnodeBeforeMount)&&bt(U,z,v)}ee&&Kt(v,null,z,"beforeMount");const ue=ph($,ie);ue&&ie.beforeEnter(L),n(L,T,M),((U=V&&V.onVnodeMounted)||ue||ee)&&Ge(()=>{U&&bt(U,z,v),ue&&ie.enter(L),ee&&Kt(v,null,z,"mounted")},$)},R=(v,T,M,z,$)=>{if(M&&d(v,M),z)for(let I=0;I<z.length;I++)d(v,z[I]);if($){let I=$.subTree;if(T===I||ks(I.type)&&(I.ssContent===T||I.ssFallback===T)){const q=$.vnode;R(v,q,q.scopeId,q.slotScopeIds,$.parent)}}},w=(v,T,M,z,$,I,q,F,L=0)=>{for(let U=L;U<v.length;U++){const V=v[U]=F?Si(v[U]):wt(v[U]);f(null,V,T,M,z,$,I,q,F)}},y=(v,T,M,z,$,I,q)=>{const F=T.el=v.el;let{patchFlag:L,dynamicChildren:U,dirs:V}=T;L|=v.patchFlag&16;const H=v.props||pe,ie=T.props||pe;let ee;if(M&&Di(M,!1),(ee=ie.onVnodeBeforeUpdate)&&bt(ee,M,T,v),V&&Kt(T,v,M,"beforeUpdate"),M&&Di(M,!0),(H.innerHTML&&ie.innerHTML==null||H.textContent&&ie.textContent==null)&&h(F,""),U?E(v.dynamicChildren,U,F,M,z,Pr(T,$),I):q||K(v,T,F,null,M,z,Pr(T,$),I,!1),L>0){if(L&16)O(F,H,ie,M,$);else if(L&2&&H.class!==ie.class&&s(F,"class",null,ie.class,$),L&4&&s(F,"style",H.style,ie.style,$),L&8){const ue=T.dynamicProps;for(let ve=0;ve<ue.length;ve++){const we=ue[ve],yt=H[we],rt=ie[we];(rt!==yt||we==="value")&&s(F,we,yt,rt,$,M)}}L&1&&v.children!==T.children&&h(F,T.children)}else!q&&U==null&&O(F,H,ie,M,$);((ee=ie.onVnodeUpdated)||V)&&Ge(()=>{ee&&bt(ee,M,T,v),V&&Kt(T,v,M,"updated")},z)},E=(v,T,M,z,$,I,q)=>{for(let F=0;F<T.length;F++){const L=v[F],U=T[F],V=L.el&&(L.type===Me||!Bt(L,U)||L.shapeFlag&198)?u(L.el):M;f(L,U,V,null,z,$,I,q,!0)}},O=(v,T,M,z,$)=>{if(T!==M){if(T!==pe)for(const I in T)!_i(I)&&!(I in M)&&s(v,I,T[I],null,$,z);for(const I in M){if(_i(I))continue;const q=M[I],F=T[I];q!==F&&I!=="value"&&s(v,I,F,q,$,z)}"value"in M&&s(v,"value",T.value,M.value,$)}},k=(v,T,M,z,$,I,q,F,L)=>{const U=T.el=v?v.el:a(""),V=T.anchor=v?v.anchor:a("");let{patchFlag:H,dynamicChildren:ie,slotScopeIds:ee}=T;ee&&(F=F?F.concat(ee):ee),v==null?(n(U,M,z),n(V,M,z),w(T.children||[],M,V,$,I,q,F,L)):H>0&&H&64&&ie&&v.dynamicChildren?(E(v.dynamicChildren,ie,M,$,I,q,F),(T.key!=null||$&&T===$.subTree)&&ja(v,T,!0)):K(v,T,M,V,$,I,q,F,L)},D=(v,T,M,z,$,I,q,F,L)=>{T.slotScopeIds=F,v==null?T.shapeFlag&512?$.ctx.activate(T,M,z,q,L):j(T,M,z,$,I,q,L):G(v,T,L)},j=(v,T,M,z,$,I,q)=>{const F=v.component=_h(v,z,$);if(Fo(v)&&(F.ctx.renderer=te),Eh(F,!1,q),F.asyncDep){if($&&$.registerDep(F,W,q),!v.el){const L=F.subTree=se(Be);P(null,L,T,M),v.placeholder=L.el}}else W(F,v,T,M,$,I,q)},G=(v,T,M)=>{const z=T.component=v.component;if(Km(v,T,M))if(z.asyncDep&&!z.asyncResolved){J(z,T,M);return}else z.next=T,z.update();else T.el=v.el,z.vnode=T},W=(v,T,M,z,$,I,q)=>{const F=()=>{if(v.isMounted){let{next:H,bu:ie,u:ee,parent:ue,vnode:ve}=v;{const It=fh(v);if(It){H&&(H.el=ve.el,J(v,H,q)),It.asyncDep.then(()=>{v.isUnmounted||F()});return}}let we=H,yt;Di(v,!1),H?(H.el=ve.el,J(v,H,q)):H=ve,ie&&On(ie),(yt=H.props&&H.props.onVnodeBeforeUpdate)&&bt(yt,ue,H,ve),Di(v,!0);const rt=as(v),$t=v.subTree;v.subTree=rt,f($t,rt,u($t.el),B($t),v,$,I),H.el=rt.el,we===null&&lr(v,rt.el),ee&&Ge(ee,$),(yt=H.props&&H.props.onVnodeUpdated)&&Ge(()=>bt(yt,ue,H,ve),$)}else{let H;const{el:ie,props:ee}=T,{bm:ue,m:ve,parent:we,root:yt,type:rt}=v,$t=Ci(T);if(Di(v,!1),ue&&On(ue),!$t&&(H=ee&&ee.onVnodeBeforeMount)&&bt(H,we,T),Di(v,!0),ie&&Ee){const It=()=>{v.subTree=as(v),Ee(ie,v.subTree,v,$,null)};$t&&rt.__asyncHydrate?rt.__asyncHydrate(ie,v,It):It()}else{yt.ce&&yt.ce._def.shadowRoot!==!1&&yt.ce._injectChildStyle(rt);const It=v.subTree=as(v);f(null,It,M,z,v,$,I),T.el=It.el}if(ve&&Ge(ve,$),!$t&&(H=ee&&ee.onVnodeMounted)){const It=T;Ge(()=>bt(H,we,It),$)}(T.shapeFlag&256||we&&Ci(we.vnode)&&we.vnode.shapeFlag&256)&&v.a&&Ge(v.a,$),v.isMounted=!0,T=M=z=null}};v.scope.on();const L=v.effect=new wo(F);v.scope.off();const U=v.update=L.run.bind(L),V=v.job=L.runIfDirty.bind(L);V.i=v,V.id=v.uid,L.scheduler=()=>Ra(V),Di(v,!0),U()},J=(v,T,M)=>{T.component=v;const z=v.vnode.props;v.vnode=T,v.next=null,Mm(v,T.props,z,M),Fm(v,T.children,M),ci(),Pl(v),ui()},K=(v,T,M,z,$,I,q,F,L=!1)=>{const U=v&&v.children,V=v?v.shapeFlag:0,H=T.children,{patchFlag:ie,shapeFlag:ee}=T;if(ie>0){if(ie&128){Ce(U,H,M,z,$,I,q,F,L);return}else if(ie&256){ye(U,H,M,z,$,I,q,F,L);return}}ee&8?(V&16&&Ke(U,$,I),H!==U&&h(M,H)):V&16?ee&16?Ce(U,H,M,z,$,I,q,F,L):Ke(U,$,I,!0):(V&8&&h(M,""),ee&16&&w(H,M,z,$,I,q,F,L))},ye=(v,T,M,z,$,I,q,F,L)=>{v=v||Cn,T=T||Cn;const U=v.length,V=T.length,H=Math.min(U,V);let ie;for(ie=0;ie<H;ie++){const ee=T[ie]=L?Si(T[ie]):wt(T[ie]);f(v[ie],ee,M,null,$,I,q,F,L)}U>V?Ke(v,$,I,!0,!1,H):w(T,M,z,$,I,q,F,L,H)},Ce=(v,T,M,z,$,I,q,F,L)=>{let U=0;const V=T.length;let H=v.length-1,ie=V-1;for(;U<=H&&U<=ie;){const ee=v[U],ue=T[U]=L?Si(T[U]):wt(T[U]);if(Bt(ee,ue))f(ee,ue,M,null,$,I,q,F,L);else break;U++}for(;U<=H&&U<=ie;){const ee=v[H],ue=T[ie]=L?Si(T[ie]):wt(T[ie]);if(Bt(ee,ue))f(ee,ue,M,null,$,I,q,F,L);else break;H--,ie--}if(U>H){if(U<=ie){const ee=ie+1,ue=ee<V?T[ee].el:z;for(;U<=ie;)f(null,T[U]=L?Si(T[U]):wt(T[U]),M,ue,$,I,q,F,L),U++}}else if(U>ie)for(;U<=H;)me(v[U],$,I,!0),U++;else{const ee=U,ue=U,ve=new Map;for(U=ue;U<=ie;U++){const Pt=T[U]=L?Si(T[U]):wt(T[U]);Pt.key!=null&&ve.set(Pt.key,U)}let we,yt=0;const rt=ie-ue+1;let $t=!1,It=0;const Jn=new Array(rt);for(U=0;U<rt;U++)Jn[U]=0;for(U=ee;U<=H;U++){const Pt=v[U];if(yt>=rt){me(Pt,$,I,!0);continue}let Gt;if(Pt.key!=null)Gt=ve.get(Pt.key);else for(we=ue;we<=ie;we++)if(Jn[we-ue]===0&&Bt(Pt,T[we])){Gt=we;break}Gt===void 0?me(Pt,$,I,!0):(Jn[Gt-ue]=U+1,Gt>=It?It=Gt:$t=!0,f(Pt,T[Gt],M,null,$,I,q,F,L),yt++)}const bl=$t?qm(Jn):Cn;for(we=bl.length-1,U=rt-1;U>=0;U--){const Pt=ue+U,Gt=T[Pt],wl=T[Pt+1],Tl=Pt+1<V?wl.el||wl.placeholder:z;Jn[U]===0?f(null,Gt,M,Tl,$,I,q,F,L):$t&&(we<0||U!==bl[we]?He(Gt,M,Tl,2):we--)}}},He=(v,T,M,z,$=null)=>{const{el:I,type:q,transition:F,children:L,shapeFlag:U}=v;if(U&6){He(v.component.subTree,T,M,z);return}if(U&128){v.suspense.move(T,M,z);return}if(U&64){q.move(v,T,M,te);return}if(q===Me){n(I,T,M);for(let H=0;H<L.length;H++)He(L[H],T,M,z);n(v.anchor,T,M);return}if(q===Vi){b(v,T,M);return}if(z!==2&&U&1&&F)if(z===0)F.beforeEnter(I),n(I,T,M),Ge(()=>F.enter(I),$);else{const{leave:H,delayLeave:ie,afterLeave:ee}=F,ue=()=>{v.ctx.isUnmounted?o(I):n(I,T,M)},ve=()=>{I._isLeaving&&I[ni](!0),H(I,()=>{ue(),ee&&ee()})};ie?ie(I,ue,ve):ve()}else n(I,T,M)},me=(v,T,M,z=!1,$=!1)=>{const{type:I,props:q,ref:F,children:L,dynamicChildren:U,shapeFlag:V,patchFlag:H,dirs:ie,cacheIndex:ee}=v;if(H===-2&&($=!1),F!=null&&(ci(),Nn(F,null,M,v,!0),ui()),ee!=null&&(T.renderCache[ee]=void 0),V&256){T.ctx.deactivate(v);return}const ue=V&1&&ie,ve=!Ci(v);let we;if(ve&&(we=q&&q.onVnodeBeforeUnmount)&&bt(we,T,v),V&6)Qt(v.component,M,z);else{if(V&128){v.suspense.unmount(M,z);return}ue&&Kt(v,null,T,"beforeUnmount"),V&64?v.type.remove(v,T,M,te,z):U&&!U.hasOnce&&(I!==Me||H>0&&H&64)?Ke(U,T,M,!1,!0):(I===Me&&H&384||!$&&V&16)&&Ke(L,T,M),z&&pt(v)}(ve&&(we=q&&q.onVnodeUnmounted)||ue)&&Ge(()=>{we&&bt(we,T,v),ue&&Kt(v,null,T,"unmounted")},M)},pt=v=>{const{type:T,el:M,anchor:z,transition:$}=v;if(T===Me){Qe(M,z);return}if(T===Vi){S(v);return}const I=()=>{o(M),$&&!$.persisted&&$.afterLeave&&$.afterLeave()};if(v.shapeFlag&1&&$&&!$.persisted){const{leave:q,delayLeave:F}=$,L=()=>q(M,I);F?F(v.el,I,L):L()}else I()},Qe=(v,T)=>{let M;for(;v!==T;)M=p(v),o(v),v=M;o(T)},Qt=(v,T,M)=>{const{bum:z,scope:$,job:I,subTree:q,um:F,m:L,a:U}=v;Ss(L),Ss(U),z&&On(z),$.stop(),I&&(I.flags|=8,me(q,v,T,M)),F&&Ge(F,T),Ge(()=>{v.isUnmounted=!0},T)},Ke=(v,T,M,z=!1,$=!1,I=0)=>{for(let q=I;q<v.length;q++)me(v[q],T,M,z,$)},B=v=>{if(v.shapeFlag&6)return B(v.component.subTree);if(v.shapeFlag&128)return v.suspense.next();const T=p(v.anchor||v.el),M=T&&T[Lu];return M?p(M):T};let Z=!1;const Y=(v,T,M)=>{v==null?T._vnode&&me(T._vnode,null,null,!0):f(T._vnode||null,v,T,null,null,null,M),T._vnode=v,Z||(Z=!0,Pl(),ws(),Z=!1)},te={p:f,um:me,m:He,r:pt,mt:j,mc:w,pc:K,pbc:E,n:B,o:e};let be,Ee;return t&&([be,Ee]=t(te)),{render:Y,hydrate:be,createApp:Rm(Y,be)}}function Pr({type:e,props:t},i){return i==="svg"&&e==="foreignObject"||i==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:i}function Di({effect:e,job:t},i){i?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function ph(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ja(e,t,i=!1){const n=e.children,o=t.children;if(Q(n)&&Q(o))for(let s=0;s<n.length;s++){const r=n[s];let a=o[s];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=o[s]=Si(o[s]),a.el=r.el),!i&&a.patchFlag!==-2&&ja(r,a)),a.type===Ei&&a.patchFlag!==-1&&(a.el=r.el),a.type===Be&&!a.el&&(a.el=r.el)}}function qm(e){const t=e.slice(),i=[0];let n,o,s,r,a;const l=e.length;for(n=0;n<l;n++){const c=e[n];if(c!==0){if(o=i[i.length-1],e[o]<c){t[n]=o,i.push(n);continue}for(s=0,r=i.length-1;s<r;)a=s+r>>1,e[i[a]]<c?s=a+1:r=a;c<e[i[s]]&&(s>0&&(t[n]=i[s-1]),i[s]=n)}}for(s=i.length,r=i[s-1];s-- >0;)i[s]=r,r=t[r];return i}function fh(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:fh(t)}function Ss(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const mh=Symbol.for("v-scx"),gh=()=>Rt(mh);function $m(e,t){return Uo(e,null,t)}function Um(e,t){return Uo(e,null,{flush:"post"})}function yh(e,t){return Uo(e,null,{flush:"sync"})}function St(e,t,i){return Uo(e,t,i)}function Uo(e,t,i=pe){const{immediate:n,deep:o,flush:s,once:r}=i,a=fe({},i),l=t&&n||!t&&s!=="post";let c;if(Fn){if(s==="sync"){const d=gh();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=nt,d.resume=nt,d.pause=nt,d}}const h=tt;a.call=(d,m,f)=>qt(d,h,m,f);let u=!1;s==="post"?a.scheduler=d=>{Ge(d,h&&h.suspense)}:s!=="sync"&&(u=!0,a.scheduler=(d,m)=>{m?d():Ra(d)}),a.augmentJob=d=>{t&&(d.flags|=4),u&&(d.flags|=2,h&&(d.id=h.uid,d.i=h))};const p=Cf(e,t,a);return Fn&&(c?c.push(p):l&&p()),p}function Bm(e,t,i){const n=this.proxy,o=le(e)?e.includes(".")?vh(n,e):()=>n[e]:e.bind(n,n);let s;re(t)?s=t:(s=t.handler,i=t);const r=Qi(this),a=Uo(o,s.bind(n),i);return r(),a}function vh(e,t){const i=t.split(".");return()=>{let n=e;for(let o=0;o<i.length&&n;o++)n=n[i[o]];return n}}function zm(e,t,i=pe){const n=At(),o=Ne(t),s=Tt(t),r=bh(e,o),a=Iu((l,c)=>{let h,u=pe,p;return yh(()=>{const d=e[o];mt(h,d)&&(h=d,c())}),{get(){return l(),i.get?i.get(h):h},set(d){const m=i.set?i.set(d):d;if(!mt(m,h)&&!(u!==pe&&mt(d,u)))return;const f=n.vnode.props;f&&(t in f||o in f||s in f)&&(`onUpdate:${t}`in f||`onUpdate:${o}`in f||`onUpdate:${s}`in f)||(h=d,c()),n.emit(`update:${t}`,m),mt(d,m)&&mt(d,u)&&!mt(m,p)&&c(),u=d,p=m}}});return a[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?r||pe:a,done:!1}:{done:!0}}}},a}const bh=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Ne(t)}Modifiers`]||e[`${Tt(t)}Modifiers`];function jm(e,t,...i){if(e.isUnmounted)return;const n=e.vnode.props||pe;let o=i;const s=t.startsWith("update:"),r=s&&bh(n,t.slice(7));r&&(r.trim&&(o=i.map(h=>le(h)?h.trim():h)),r.number&&(o=i.map(fs)));let a,l=n[a=Rn(t)]||n[a=Rn(Ne(t))];!l&&s&&(l=n[a=Rn(Tt(t))]),l&&qt(l,e,6,o);const c=n[a+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[a])return;e.emitted[a]=!0,qt(c,e,6,o)}}const Wm=new WeakMap;function wh(e,t,i=!1){const n=i?Wm:t.emitsCache,o=n.get(e);if(o!==void 0)return o;const s=e.emits;let r={},a=!1;if(!re(e)){const l=c=>{const h=wh(c,t,!0);h&&(a=!0,fe(r,h))};!i&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!s&&!a?(Ie(e)&&n.set(e,null),null):(Q(s)?s.forEach(l=>r[l]=null):fe(r,s),Ie(e)&&n.set(e,r),r)}function ar(e,t){return!e||!en(t)?!1:(t=t.slice(2).replace(/Once$/,""),Te(e,t[0].toLowerCase()+t.slice(1))||Te(e,Tt(t))||Te(e,t))}function as(e){const{type:t,vnode:i,proxy:n,withProxy:o,propsOptions:[s],slots:r,attrs:a,emit:l,render:c,renderCache:h,props:u,data:p,setupState:d,ctx:m,inheritAttrs:f}=e,x=Ao(e);let P,A;try{if(i.shapeFlag&4){const S=o||n,_=S;P=wt(c.call(_,S,h,u,d,p,m)),A=a}else{const S=t;P=wt(S.length>1?S(u,{attrs:a,slots:r,emit:l}):S(u,null)),A=t.props?a:Vm(a)}}catch(S){fo.length=0,on(S,e,1),P=se(Be)}let b=P;if(A&&f!==!1){const S=Object.keys(A),{shapeFlag:_}=b;S.length&&_&7&&(s&&S.some(ya)&&(A=Hm(A,s)),b=Jt(b,A,!1,!0))}return i.dirs&&(b=Jt(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(i.dirs):i.dirs),i.transition&&pi(b,i.transition),P=b,Ao(x),P}function Gm(e,t=!0){let i;for(let n=0;n<e.length;n++){const o=e[n];if(fi(o)){if(o.type!==Be||o.children==="v-if"){if(i)return;i=o}}else return}return i}const Vm=e=>{let t;for(const i in e)(i==="class"||i==="style"||en(i))&&((t||(t={}))[i]=e[i]);return t},Hm=(e,t)=>{const i={};for(const n in e)(!ya(n)||!(n.slice(9)in t))&&(i[n]=e[n]);return i};function Km(e,t,i){const{props:n,children:o,component:s}=e,{props:r,children:a,patchFlag:l}=t,c=s.emitsOptions;if(t.dirs||t.transition)return!0;if(i&&l>=0){if(l&1024)return!0;if(l&16)return n?Ul(n,r,c):!!r;if(l&8){const h=t.dynamicProps;for(let u=0;u<h.length;u++){const p=h[u];if(r[p]!==n[p]&&!ar(c,p))return!0}}}else return(o||a)&&(!a||!a.$stable)?!0:n===r?!1:n?r?Ul(n,r,c):!0:!!r;return!1}function Ul(e,t,i){const n=Object.keys(t);if(n.length!==Object.keys(e).length)return!0;for(let o=0;o<n.length;o++){const s=n[o];if(t[s]!==e[s]&&!ar(i,s))return!0}return!1}function lr({vnode:e,parent:t},i){for(;t;){const n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.el=e.el),n===e)(e=t.vnode).el=i,t=t.parent;else break}}const ks=e=>e.__isSuspense;let Hr=0;const Ym={name:"Suspense",__isSuspense:!0,process(e,t,i,n,o,s,r,a,l,c){if(e==null)Qm(t,i,n,o,s,r,a,l,c);else{if(s&&s.deps>0&&!e.suspense.isInFallback){t.suspense=e.suspense,t.suspense.vnode=t,t.el=e.el;return}Zm(e,t,i,n,o,r,a,l,c)}},hydrate:Xm,normalize:eg},Jm=Ym;function Po(e,t){const i=e.props&&e.props[t];re(i)&&i()}function Qm(e,t,i,n,o,s,r,a,l){const{p:c,o:{createElement:h}}=l,u=h("div"),p=e.suspense=Th(e,o,n,t,u,i,s,r,a,l);c(null,p.pendingBranch=e.ssContent,u,null,n,p,s,r),p.deps>0?(Po(e,"onPending"),Po(e,"onFallback"),c(null,e.ssFallback,t,i,n,null,s,r),Ln(p,e.ssFallback)):p.resolve(!1,!0)}function Zm(e,t,i,n,o,s,r,a,{p:l,um:c,o:{createElement:h}}){const u=t.suspense=e.suspense;u.vnode=t,t.el=e.el;const p=t.ssContent,d=t.ssFallback,{activeBranch:m,pendingBranch:f,isInFallback:x,isHydrating:P}=u;if(f)u.pendingBranch=p,Bt(f,p)?(l(f,p,u.hiddenContainer,null,o,u,s,r,a),u.deps<=0?u.resolve():x&&(P||(l(m,d,i,n,o,null,s,r,a),Ln(u,d)))):(u.pendingId=Hr++,P?(u.isHydrating=!1,u.activeBranch=f):c(f,o,u),u.deps=0,u.effects.length=0,u.hiddenContainer=h("div"),x?(l(null,p,u.hiddenContainer,null,o,u,s,r,a),u.deps<=0?u.resolve():(l(m,d,i,n,o,null,s,r,a),Ln(u,d))):m&&Bt(m,p)?(l(m,p,i,n,o,u,s,r,a),u.resolve(!0)):(l(null,p,u.hiddenContainer,null,o,u,s,r,a),u.deps<=0&&u.resolve()));else if(m&&Bt(m,p))l(m,p,i,n,o,u,s,r,a),Ln(u,p);else if(Po(t,"onPending"),u.pendingBranch=p,p.shapeFlag&512?u.pendingId=p.component.suspenseId:u.pendingId=Hr++,l(null,p,u.hiddenContainer,null,o,u,s,r,a),u.deps<=0)u.resolve();else{const{timeout:A,pendingId:b}=u;A>0?setTimeout(()=>{u.pendingId===b&&u.fallback(d)},A):A===0&&u.fallback(d)}}function Th(e,t,i,n,o,s,r,a,l,c,h=!1){const{p:u,m:p,um:d,n:m,o:{parentNode:f,remove:x}}=c;let P;const A=tg(e);A&&t&&t.pendingBranch&&(P=t.pendingId,t.deps++);const b=e.props?ms(e.props.timeout):void 0,S=s,_={vnode:e,parent:t,parentComponent:i,namespace:r,container:n,hiddenContainer:o,deps:0,pendingId:Hr++,timeout:typeof b=="number"?b:-1,activeBranch:null,pendingBranch:null,isInFallback:!h,isHydrating:h,isUnmounted:!1,effects:[],resolve(C=!1,R=!1){const{vnode:w,activeBranch:y,pendingBranch:E,pendingId:O,effects:k,parentComponent:D,container:j}=_;let G=!1;_.isHydrating?_.isHydrating=!1:C||(G=y&&E.transition&&E.transition.mode==="out-in",G&&(y.transition.afterLeave=()=>{O===_.pendingId&&(p(E,j,s===S?m(y):s,0),So(k))}),y&&(f(y.el)===j&&(s=m(y)),d(y,D,_,!0)),G||p(E,j,s,0)),Ln(_,E),_.pendingBranch=null,_.isInFallback=!1;let W=_.parent,J=!1;for(;W;){if(W.pendingBranch){W.effects.push(...k),J=!0;break}W=W.parent}!J&&!G&&So(k),_.effects=[],A&&t&&t.pendingBranch&&P===t.pendingId&&(t.deps--,t.deps===0&&!R&&t.resolve()),Po(w,"onResolve")},fallback(C){if(!_.pendingBranch)return;const{vnode:R,activeBranch:w,parentComponent:y,container:E,namespace:O}=_;Po(R,"onFallback");const k=m(w),D=()=>{_.isInFallback&&(u(null,C,E,k,y,null,O,a,l),Ln(_,C))},j=C.transition&&C.transition.mode==="out-in";j&&(w.transition.afterLeave=D),_.isInFallback=!0,d(w,y,null,!0),j||D()},move(C,R,w){_.activeBranch&&p(_.activeBranch,C,R,w),_.container=C},next(){return _.activeBranch&&m(_.activeBranch)},registerDep(C,R,w){const y=!!_.pendingBranch;y&&_.deps++;const E=C.vnode.el;C.asyncDep.catch(O=>{on(O,C,0)}).then(O=>{if(C.isUnmounted||_.isUnmounted||_.pendingId!==C.suspenseId)return;C.asyncResolved=!0;const{vnode:k}=C;Jr(C,O,!1),E&&(k.el=E);const D=!E&&C.subTree.el;R(C,k,f(E||C.subTree.el),E?null:m(C.subTree),_,r,w),D&&x(D),lr(C,k.el),y&&--_.deps===0&&_.resolve()})},unmount(C,R){_.isUnmounted=!0,_.activeBranch&&d(_.activeBranch,i,C,R),_.pendingBranch&&d(_.pendingBranch,i,C,R)}};return _}function Xm(e,t,i,n,o,s,r,a,l){const c=t.suspense=Th(t,n,i,e.parentNode,document.createElement("div"),null,o,s,r,a,!0),h=l(e,c.pendingBranch=t.ssContent,i,c,s,r);return c.deps===0&&c.resolve(!1,!0),h}function eg(e){const{shapeFlag:t,children:i}=e,n=t&32;e.ssContent=Bl(n?i.default:i),e.ssFallback=n?Bl(i.fallback):se(Be)}function Bl(e){let t;if(re(e)){const i=Ji&&e._c;i&&(e._d=!1,X()),e=e(),i&&(e._d=!0,t=ht,Sh())}return Q(e)&&(e=Gm(e)),e=wt(e),t&&!e.dynamicChildren&&(e.dynamicChildren=t.filter(i=>i!==e)),e}function xh(e,t){t&&t.pendingBranch?Q(e)?t.effects.push(...e):t.effects.push(e):So(e)}function Ln(e,t){e.activeBranch=t;const{vnode:i,parentComponent:n}=e;let o=t.el;for(;!o&&t.component;)t=t.component.subTree,o=t.el;i.el=o,n&&n.subTree===i&&(n.vnode.el=o,lr(n,o))}function tg(e){const t=e.props&&e.props.suspensible;return t!=null&&t!==!1}const Me=Symbol.for("v-fgt"),Ei=Symbol.for("v-txt"),Be=Symbol.for("v-cmt"),Vi=Symbol.for("v-stc"),fo=[];let ht=null;function X(e=!1){fo.push(ht=e?null:[])}function Sh(){fo.pop(),ht=fo[fo.length-1]||null}let Ji=1;function _o(e,t=!1){Ji+=e,e<0&&ht&&t&&(ht.hasOnce=!0)}function kh(e){return e.dynamicChildren=Ji>0?ht||Cn:null,Sh(),Ji>0&&ht&&ht.push(e),e}function ae(e,t,i,n,o,s){return kh(g(e,t,i,n,o,s,!0))}function Je(e,t,i,n,o){return kh(se(e,t,i,n,o,!0))}function fi(e){return e?e.__v_isVNode===!0:!1}function Bt(e,t){return e.type===t.type&&e.key===t.key}function ig(e){}const Ah=({key:e})=>e??null,ls=({ref:e,ref_key:t,ref_for:i})=>(typeof e=="number"&&(e=""+e),e!=null?le(e)||qe(e)||re(e)?{i:it,r:e,k:t,f:!!i}:e:null);function g(e,t=null,i=null,n=0,o=null,s=e===Me?0:1,r=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ah(t),ref:t&&ls(t),scopeId:tr,slotScopeIds:null,children:i,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:n,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:it};return a?(Wa(l,i),s&128&&e.normalize(l)):i&&(l.shapeFlag|=le(i)?8:16),Ji>0&&!r&&ht&&(l.patchFlag>0||s&6)&&l.patchFlag!==32&&ht.push(l),l}const se=ng;function ng(e,t=null,i=null,n=0,o=null,s=!1){if((!e||e===Qu)&&(e=Be),fi(e)){const a=Jt(e,t,!0);return i&&Wa(a,i),Ji>0&&!s&&ht&&(a.shapeFlag&6?ht[ht.indexOf(e)]=a:ht.push(a)),a.patchFlag=-2,a}if(cg(e)&&(e=e.__vccOpts),t){t=Ih(t);let{class:a,style:l}=t;a&&!le(a)&&(t.class=Oe(a)),Ie(l)&&(Xs(l)&&!Q(l)&&(l=fe({},l)),t.style=Hn(l))}const r=le(e)?1:ks(e)?128:Du(e)?64:Ie(e)?4:re(e)?2:0;return g(e,t,i,n,o,r,s,!0)}function Ih(e){return e?Xs(e)||oh(e)?fe({},e):e:null}function Jt(e,t,i=!1,n=!1){const{props:o,ref:s,patchFlag:r,children:a,transition:l}=e,c=t?Ph(o||{},t):o,h={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Ah(c),ref:t&&t.ref?i&&s?Q(s)?s.concat(ls(t)):[s,ls(t)]:ls(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:a,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Me?r===-1?16:r|16:r,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Jt(e.ssContent),ssFallback:e.ssFallback&&Jt(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&n&&pi(h,l.clone(h)),h}function Ii(e=" ",t=0){return se(Ei,null,e,t)}function As(e,t){const i=se(Vi,null,e);return i.staticCount=t,i}function De(e="",t=!1){return t?(X(),Je(Be,null,e)):se(Be,null,e)}function wt(e){return e==null||typeof e=="boolean"?se(Be):Q(e)?se(Me,null,e.slice()):fi(e)?Si(e):se(Ei,null,String(e))}function Si(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Jt(e)}function Wa(e,t){let i=0;const{shapeFlag:n}=e;if(t==null)t=null;else if(Q(t))i=16;else if(typeof t=="object")if(n&65){const o=t.default;o&&(o._c&&(o._d=!1),Wa(e,o()),o._c&&(o._d=!0));return}else{i=32;const o=t._;!o&&!oh(t)?t._ctx=it:o===3&&it&&(it.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else re(t)?(t={default:t,_ctx:it},i=32):(t=String(t),n&64?(i=16,t=[Ii(t)]):i=8);e.children=t,e.shapeFlag|=i}function Ph(...e){const t={};for(let i=0;i<e.length;i++){const n=e[i];for(const o in n)if(o==="class")t.class!==n.class&&(t.class=Oe([t.class,n.class]));else if(o==="style")t.style=Hn([t.style,n.style]);else if(en(o)){const s=t[o],r=n[o];r&&s!==r&&!(Q(s)&&s.includes(r))&&(t[o]=s?[].concat(s,r):r)}else o!==""&&(t[o]=n[o])}return t}function bt(e,t,i,n=null){qt(e,t,7,[i,n])}const og=eh();let sg=0;function _h(e,t,i){const n=e.type,o=(t?t.appContext:e.appContext)||og,s={uid:sg++,vnode:e,type:n,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Ta(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:rh(n,o),emitsOptions:wh(n,o),emit:null,emitted:null,propsDefaults:pe,inheritAttrs:n.inheritAttrs,ctx:pe,data:pe,props:pe,attrs:pe,slots:pe,refs:pe,setupState:pe,setupContext:null,suspense:i,suspenseId:i?i.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=jm.bind(null,s),e.ce&&e.ce(s),s}let tt=null;const At=()=>tt||it;let Is,Kr;{const e=Hs(),t=(i,n)=>{let o;return(o=e[i])||(o=e[i]=[]),o.push(n),s=>{o.length>1?o.forEach(r=>r(s)):o[0](s)}};Is=t("__VUE_INSTANCE_SETTERS__",i=>tt=i),Kr=t("__VUE_SSR_SETTERS__",i=>Fn=i)}const Qi=e=>{const t=tt;return Is(e),e.scope.on(),()=>{e.scope.off(),Is(t)}},Yr=()=>{tt&&tt.scope.off(),Is(null)};function Ch(e){return e.vnode.shapeFlag&4}let Fn=!1;function Eh(e,t=!1,i=!1){t&&Kr(t);const{props:n,children:o}=e.vnode,s=Ch(e);Om(e,n,s,t),Dm(e,o,i||t);const r=s?rg(e,t):void 0;return t&&Kr(!1),r}function rg(e,t){const i=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,jr);const{setup:n}=i;if(n){ci();const o=e.setupContext=n.length>1?Mh(e):null,s=Qi(e),r=Yn(n,e,0,[e.props,o]),a=ba(r);if(ui(),s(),(a||e.sp)&&!Ci(e)&&La(e),a){if(r.then(Yr,Yr),t)return r.then(l=>{Jr(e,l,t)}).catch(l=>{on(l,e,0)});e.asyncDep=r}else Jr(e,r,t)}else Oh(e,t)}function Jr(e,t,i){re(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Ie(t)&&(e.setupState=Ea(t)),Oh(e,i)}let Ps,Qr;function Rh(e){Ps=e,Qr=t=>{t.render._rc&&(t.withProxy=new Proxy(t.ctx,hm))}}const ag=()=>!Ps;function Oh(e,t,i){const n=e.type;if(!e.render){if(!t&&Ps&&!n.render){const o=n.template||Ua(e).template;if(o){const{isCustomElement:s,compilerOptions:r}=e.appContext.config,{delimiters:a,compilerOptions:l}=n,c=fe(fe({isCustomElement:s,delimiters:a},r),l);n.render=Ps(o,c)}}e.render=n.render||nt,Qr&&Qr(e)}{const o=Qi(e);ci();try{Am(e)}finally{ui(),o()}}}const lg={get(e,t){return ut(e,"get",""),e[t]}};function Mh(e){const t=i=>{e.exposed=i||{}};return{attrs:new Proxy(e.attrs,lg),slots:e.slots,emit:e.emit,expose:t}}function Bo(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Ea(er(e.exposed)),{get(t,i){if(i in t)return t[i];if(i in ho)return ho[i](e)},has(t,i){return i in t||i in ho}})):e.proxy}function Zr(e,t=!0){return re(e)?e.displayName||e.name:e.name||t&&e.__name}function cg(e){return re(e)&&"__vccOpts"in e}const xe=(e,t)=>Af(e,t,Fn);function Zi(e,t,i){const n=(s,r,a)=>{_o(-1);try{return se(s,r,a)}finally{_o(1)}},o=arguments.length;return o===2?Ie(t)&&!Q(t)?fi(t)?n(e,null,[t]):n(e,t):n(e,null,t):(o>3?i=Array.prototype.slice.call(arguments,2):o===3&&fi(i)&&(i=[i]),n(e,t,i))}function ug(){}function hg(e,t,i,n){const o=i[n];if(o&&Nh(o,e))return o;const s=t();return s.memo=e.slice(),s.cacheIndex=n,i[n]=s}function Nh(e,t){const i=e.memo;if(i.length!=t.length)return!1;for(let n=0;n<i.length;n++)if(mt(i[n],t[n]))return!1;return Ji>0&&ht&&ht.push(e),!0}const Lh="3.5.21",dg=nt,pg=Nf,fg=kn,mg=Nu,gg={createComponentInstance:_h,setupComponent:Eh,renderComponentRoot:as,setCurrentRenderingInstance:Ao,isVNode:fi,normalizeVNode:wt,getComponentPublicInstance:Bo,ensureValidVNode:$a,pushWarningContext:Ef,popWarningContext:Rf},yg=gg,vg=null,bg=null,wg=null;/**
* @vue/runtime-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Xr;const zl=typeof window<"u"&&window.trustedTypes;if(zl)try{Xr=zl.createPolicy("vue",{createHTML:e=>e})}catch{}const Dh=Xr?e=>Xr.createHTML(e):e=>e,Tg="http://www.w3.org/2000/svg",xg="http://www.w3.org/1998/Math/MathML",ii=typeof document<"u"?document:null,jl=ii&&ii.createElement("template"),Sg={insert:(e,t,i)=>{t.insertBefore(e,i||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,i,n)=>{const o=t==="svg"?ii.createElementNS(Tg,e):t==="mathml"?ii.createElementNS(xg,e):i?ii.createElement(e,{is:i}):ii.createElement(e);return e==="select"&&n&&n.multiple!=null&&o.setAttribute("multiple",n.multiple),o},createText:e=>ii.createTextNode(e),createComment:e=>ii.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>ii.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,i,n,o,s){const r=i?i.previousSibling:t.lastChild;if(o&&(o===s||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),i),!(o===s||!(o=o.nextSibling)););else{jl.innerHTML=Dh(n==="svg"?`<svg>${e}</svg>`:n==="mathml"?`<math>${e}</math>`:e);const a=jl.content;if(n==="svg"||n==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,i)}return[r?r.nextSibling:t.firstChild,i?i.previousSibling:t.lastChild]}},gi="transition",Zn="animation",qn=Symbol("_vtc"),Fh={name:String,type:String,css:{type:Boolean,default:!0},duration:[String,Number,Object],enterFromClass:String,enterActiveClass:String,enterToClass:String,appearFromClass:String,appearActiveClass:String,appearToClass:String,leaveFromClass:String,leaveActiveClass:String,leaveToClass:String},qh=fe({},Na,Fh),kg=e=>(e.displayName="Transition",e.props=qh,e),_s=kg((e,{slots:t})=>Zi(Bu,$h(e),t)),Fi=(e,t=[])=>{Q(e)?e.forEach(i=>i(...t)):e&&e(...t)},Wl=e=>e?Q(e)?e.some(t=>t.length>1):e.length>1:!1;function $h(e){const t={};for(const k in e)k in Fh||(t[k]=e[k]);if(e.css===!1)return t;const{name:i="v",type:n,duration:o,enterFromClass:s=`${i}-enter-from`,enterActiveClass:r=`${i}-enter-active`,enterToClass:a=`${i}-enter-to`,appearFromClass:l=s,appearActiveClass:c=r,appearToClass:h=a,leaveFromClass:u=`${i}-leave-from`,leaveActiveClass:p=`${i}-leave-active`,leaveToClass:d=`${i}-leave-to`}=e,m=Ag(o),f=m&&m[0],x=m&&m[1],{onBeforeEnter:P,onEnter:A,onEnterCancelled:b,onLeave:S,onLeaveCancelled:_,onBeforeAppear:C=P,onAppear:R=A,onAppearCancelled:w=b}=t,y=(k,D,j,G)=>{k._enterCancelled=G,bi(k,D?h:a),bi(k,D?c:r),j&&j()},E=(k,D)=>{k._isLeaving=!1,bi(k,u),bi(k,d),bi(k,p),D&&D()},O=k=>(D,j)=>{const G=k?R:A,W=()=>y(D,k,j);Fi(G,[D,W]),Gl(()=>{bi(D,k?l:s),Vt(D,k?h:a),Wl(G)||Vl(D,n,f,W)})};return fe(t,{onBeforeEnter(k){Fi(P,[k]),Vt(k,s),Vt(k,r)},onBeforeAppear(k){Fi(C,[k]),Vt(k,l),Vt(k,c)},onEnter:O(!1),onAppear:O(!0),onLeave(k,D){k._isLeaving=!0;const j=()=>E(k,D);Vt(k,u),k._enterCancelled?(Vt(k,p),ea()):(ea(),Vt(k,p)),Gl(()=>{k._isLeaving&&(bi(k,u),Vt(k,d),Wl(S)||Vl(k,n,x,j))}),Fi(S,[k,j])},onEnterCancelled(k){y(k,!1,void 0,!0),Fi(b,[k])},onAppearCancelled(k){y(k,!0,void 0,!0),Fi(w,[k])},onLeaveCancelled(k){E(k),Fi(_,[k])}})}function Ag(e){if(e==null)return null;if(Ie(e))return[_r(e.enter),_r(e.leave)];{const t=_r(e);return[t,t]}}function _r(e){return ms(e)}function Vt(e,t){t.split(/\s+/).forEach(i=>i&&e.classList.add(i)),(e[qn]||(e[qn]=new Set)).add(t)}function bi(e,t){t.split(/\s+/).forEach(n=>n&&e.classList.remove(n));const i=e[qn];i&&(i.delete(t),i.size||(e[qn]=void 0))}function Gl(e){requestAnimationFrame(()=>{requestAnimationFrame(e)})}let Ig=0;function Vl(e,t,i,n){const o=e._endId=++Ig,s=()=>{o===e._endId&&n()};if(i!=null)return setTimeout(s,i);const{type:r,timeout:a,propCount:l}=Uh(e,t);if(!r)return n();const c=r+"end";let h=0;const u=()=>{e.removeEventListener(c,p),s()},p=d=>{d.target===e&&++h>=l&&u()};setTimeout(()=>{h<l&&u()},a+1),e.addEventListener(c,p)}function Uh(e,t){const i=window.getComputedStyle(e),n=m=>(i[m]||"").split(", "),o=n(`${gi}Delay`),s=n(`${gi}Duration`),r=Hl(o,s),a=n(`${Zn}Delay`),l=n(`${Zn}Duration`),c=Hl(a,l);let h=null,u=0,p=0;t===gi?r>0&&(h=gi,u=r,p=s.length):t===Zn?c>0&&(h=Zn,u=c,p=l.length):(u=Math.max(r,c),h=u>0?r>c?gi:Zn:null,p=h?h===gi?s.length:l.length:0);const d=h===gi&&/\b(?:transform|all)(?:,|$)/.test(n(`${gi}Property`).toString());return{type:h,timeout:u,propCount:p,hasTransform:d}}function Hl(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max(...t.map((i,n)=>Kl(i)+Kl(e[n])))}function Kl(e){return e==="auto"?0:Number(e.slice(0,-1).replace(",","."))*1e3}function ea(){return document.body.offsetHeight}function Pg(e,t,i){const n=e[qn];n&&(t=(t?[t,...n]:[...n]).join(" ")),t==null?e.removeAttribute("class"):i?e.setAttribute("class",t):e.className=t}const Cs=Symbol("_vod"),Bh=Symbol("_vsh"),Es={name:"show",beforeMount(e,{value:t},{transition:i}){e[Cs]=e.style.display==="none"?"":e.style.display,i&&t?i.beforeEnter(e):Xn(e,t)},mounted(e,{value:t},{transition:i}){i&&t&&i.enter(e)},updated(e,{value:t,oldValue:i},{transition:n}){!t!=!i&&(n?t?(n.beforeEnter(e),Xn(e,!0),n.enter(e)):n.leave(e,()=>{Xn(e,!1)}):Xn(e,t))},beforeUnmount(e,{value:t}){Xn(e,t)}};function Xn(e,t){e.style.display=t?e[Cs]:"none",e[Bh]=!t}function _g(){Es.getSSRProps=({value:e})=>{if(!e)return{style:{display:"none"}}}}const zh=Symbol("");function Cg(e){const t=At();if(!t)return;const i=t.ut=(o=e(t.proxy))=>{Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach(s=>Rs(s,o))},n=()=>{const o=e(t.proxy);t.ce?Rs(t.ce,o):ta(t.subTree,o),i(o)};Da(()=>{So(n)}),Ni(()=>{St(n,nt,{flush:"post"});const o=new MutationObserver(n);o.observe(t.subTree.el.parentNode,{childList:!0}),qo(()=>o.disconnect())})}function ta(e,t){if(e.shapeFlag&128){const i=e.suspense;e=i.activeBranch,i.pendingBranch&&!i.isHydrating&&i.effects.push(()=>{ta(i.activeBranch,t)})}for(;e.component;)e=e.component.subTree;if(e.shapeFlag&1&&e.el)Rs(e.el,t);else if(e.type===Me)e.children.forEach(i=>ta(i,t));else if(e.type===Vi){let{el:i,anchor:n}=e;for(;i&&(Rs(i,t),i!==n);)i=i.nextSibling}}function Rs(e,t){if(e.nodeType===1){const i=e.style;let n="";for(const o in t){const s=Vp(t[o]);i.setProperty(`--${o}`,s),n+=`--${o}: ${s};`}i[zh]=n}}const Eg=/(?:^|;)\s*display\s*:/;function Rg(e,t,i){const n=e.style,o=le(i);let s=!1;if(i&&!o){if(t)if(le(t))for(const r of t.split(";")){const a=r.slice(0,r.indexOf(":")).trim();i[a]==null&&cs(n,a,"")}else for(const r in t)i[r]==null&&cs(n,r,"");for(const r in i)r==="display"&&(s=!0),cs(n,r,i[r])}else if(o){if(t!==i){const r=n[zh];r&&(i+=";"+r),n.cssText=i,s=Eg.test(i)}}else t&&e.removeAttribute("style");Cs in e&&(e[Cs]=s?n.display:"",e[Bh]&&(n.display="none"))}const Yl=/\s*!important$/;function cs(e,t,i){if(Q(i))i.forEach(n=>cs(e,t,n));else if(i==null&&(i=""),t.startsWith("--"))e.setProperty(t,i);else{const n=Og(e,t);Yl.test(i)?e.setProperty(Tt(n),i.replace(Yl,""),"important"):e[n]=i}}const Jl=["Webkit","Moz","ms"],Cr={};function Og(e,t){const i=Cr[t];if(i)return i;let n=Ne(t);if(n!=="filter"&&n in e)return Cr[t]=n;n=nn(n);for(let o=0;o<Jl.length;o++){const s=Jl[o]+n;if(s in e)return Cr[t]=s}return t}const Ql="http://www.w3.org/1999/xlink";function Zl(e,t,i,n,o,s=Wp(t)){n&&t.startsWith("xlink:")?i==null?e.removeAttributeNS(Ql,t.slice(6,t.length)):e.setAttributeNS(Ql,t,i):i==null||s&&!ru(i)?e.removeAttribute(t):e.setAttribute(t,s?"":kt(i)?String(i):i)}function Xl(e,t,i,n,o){if(t==="innerHTML"||t==="textContent"){i!=null&&(e[t]=t==="innerHTML"?Dh(i):i);return}const s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const a=s==="OPTION"?e.getAttribute("value")||"":e.value,l=i==null?e.type==="checkbox"?"on":"":String(i);(a!==l||!("_value"in e))&&(e.value=l),i==null&&e.removeAttribute(t),e._value=i;return}let r=!1;if(i===""||i==null){const a=typeof e[t];a==="boolean"?i=ru(i):i==null&&a==="string"?(i="",r=!0):a==="number"&&(i=0,r=!0)}try{e[t]=i}catch{}r&&e.removeAttribute(o||t)}function ri(e,t,i,n){e.addEventListener(t,i,n)}function Mg(e,t,i,n){e.removeEventListener(t,i,n)}const ec=Symbol("_vei");function Ng(e,t,i,n,o=null){const s=e[ec]||(e[ec]={}),r=s[t];if(n&&r)r.value=n;else{const[a,l]=Lg(t);if(n){const c=s[t]=qg(n,o);ri(e,a,c,l)}else r&&(Mg(e,a,r,l),s[t]=void 0)}}const tc=/(?:Once|Passive|Capture)$/;function Lg(e){let t;if(tc.test(e)){t={};let n;for(;n=e.match(tc);)e=e.slice(0,e.length-n[0].length),t[n[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):Tt(e.slice(2)),t]}let Er=0;const Dg=Promise.resolve(),Fg=()=>Er||(Dg.then(()=>Er=0),Er=Date.now());function qg(e,t){const i=n=>{if(!n._vts)n._vts=Date.now();else if(n._vts<=i.attached)return;qt($g(n,i.value),t,5,[n])};return i.value=e,i.attached=Fg(),i}function $g(e,t){if(Q(t)){const i=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{i.call(e),e._stopped=!0},t.map(n=>o=>!o._stopped&&n&&n(o))}else return t}const ic=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,Ug=(e,t,i,n,o,s)=>{const r=o==="svg";t==="class"?Pg(e,n,r):t==="style"?Rg(e,i,n):en(t)?ya(t)||Ng(e,t,i,n,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Bg(e,t,n,r))?(Xl(e,t,n),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Zl(e,t,n,r,s,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!le(n))?Xl(e,Ne(t),n,s,t):(t==="true-value"?e._trueValue=n:t==="false-value"&&(e._falseValue=n),Zl(e,t,n,r))};function Bg(e,t,i,n){if(n)return!!(t==="innerHTML"||t==="textContent"||t in e&&ic(t)&&re(i));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return ic(t)&&le(i)?!1:t in e}const nc={};function jh(e,t,i){let n=ot(e,t);Gs(n)&&(n=fe({},n,t));class o extends cr{constructor(r){super(n,r,i)}}return o.def=n,o}const zg=(e,t)=>jh(e,t,id),jg=typeof HTMLElement<"u"?HTMLElement:class{};class cr extends jg{constructor(t,i={},n=Ns){super(),this._def=t,this._props=i,this._createApp=n,this._isVueCE=!0,this._instance=null,this._app=null,this._nonce=this._def.nonce,this._connected=!1,this._resolved=!1,this._numberProps=null,this._styleChildren=new WeakSet,this._ob=null,this.shadowRoot&&n!==Ns?this._root=this.shadowRoot:t.shadowRoot!==!1?(this.attachShadow({mode:"open"}),this._root=this.shadowRoot):this._root=this}connectedCallback(){if(!this.isConnected)return;!this.shadowRoot&&!this._resolved&&this._parseSlots(),this._connected=!0;let t=this;for(;t=t&&(t.parentNode||t.host);)if(t instanceof cr){this._parent=t;break}this._instance||(this._resolved?this._mount(this._def):t&&t._pendingResolve?this._pendingResolve=t._pendingResolve.then(()=>{this._pendingResolve=void 0,this._resolveDef()}):this._resolveDef())}_setParent(t=this._parent){t&&(this._instance.parent=t._instance,this._inheritParentContext(t))}_inheritParentContext(t=this._parent){t&&this._app&&Object.setPrototypeOf(this._app._context.provides,t._instance.provides)}disconnectedCallback(){this._connected=!1,ai(()=>{this._connected||(this._ob&&(this._ob.disconnect(),this._ob=null),this._app&&this._app.unmount(),this._instance&&(this._instance.ce=void 0),this._app=this._instance=null)})}_resolveDef(){if(this._pendingResolve)return;for(let n=0;n<this.attributes.length;n++)this._setAttr(this.attributes[n].name);this._ob=new MutationObserver(n=>{for(const o of n)this._setAttr(o.attributeName)}),this._ob.observe(this,{attributes:!0});const t=(n,o=!1)=>{this._resolved=!0,this._pendingResolve=void 0;const{props:s,styles:r}=n;let a;if(s&&!Q(s))for(const l in s){const c=s[l];(c===Number||c&&c.type===Number)&&(l in this._props&&(this._props[l]=ms(this._props[l])),(a||(a=Object.create(null)))[Ne(l)]=!0)}this._numberProps=a,this._resolveProps(n),this.shadowRoot&&this._applyStyles(r),this._mount(n)},i=this._def.__asyncLoader;i?this._pendingResolve=i().then(n=>{n.configureApp=this._def.configureApp,t(this._def=n,!0)}):t(this._def)}_mount(t){this._app=this._createApp(t),this._inheritParentContext(),t.configureApp&&t.configureApp(this._app),this._app._ceVNode=this._createVNode(),this._app.mount(this._root);const i=this._instance&&this._instance.exposed;if(i)for(const n in i)Te(this,n)||Object.defineProperty(this,n,{get:()=>N(i[n])})}_resolveProps(t){const{props:i}=t,n=Q(i)?i:Object.keys(i||{});for(const o of Object.keys(this))o[0]!=="_"&&n.includes(o)&&this._setProp(o,this[o]);for(const o of n.map(Ne))Object.defineProperty(this,o,{get(){return this._getProp(o)},set(s){this._setProp(o,s,!0,!0)}})}_setAttr(t){if(t.startsWith("data-v-"))return;const i=this.hasAttribute(t);let n=i?this.getAttribute(t):nc;const o=Ne(t);i&&this._numberProps&&this._numberProps[o]&&(n=ms(n)),this._setProp(o,n,!1,!0)}_getProp(t){return this._props[t]}_setProp(t,i,n=!0,o=!1){if(i!==this._props[t]&&(i===nc?delete this._props[t]:(this._props[t]=i,t==="key"&&this._app&&(this._app._ceVNode.key=i)),o&&this._instance&&this._update(),n)){const s=this._ob;s&&s.disconnect(),i===!0?this.setAttribute(Tt(t),""):typeof i=="string"||typeof i=="number"?this.setAttribute(Tt(t),i+""):i||this.removeAttribute(Tt(t)),s&&s.observe(this,{attributes:!0})}}_update(){const t=this._createVNode();this._app&&(t.appContext=this._app._context),td(t,this._root)}_createVNode(){const t={};this.shadowRoot||(t.onVnodeMounted=t.onVnodeUpdated=this._renderSlots.bind(this));const i=se(this._def,fe(t,this._props));return this._instance||(i.ce=n=>{this._instance=n,n.ce=this,n.isCE=!0;const o=(s,r)=>{this.dispatchEvent(new CustomEvent(s,Gs(r[0])?fe({detail:r},r[0]):{detail:r}))};n.emit=(s,...r)=>{o(s,r),Tt(s)!==s&&o(Tt(s),r)},this._setParent()}),i}_applyStyles(t,i){if(!t)return;if(i){if(i===this._def||this._styleChildren.has(i))return;this._styleChildren.add(i)}const n=this._nonce;for(let o=t.length-1;o>=0;o--){const s=document.createElement("style");n&&s.setAttribute("nonce",n),s.textContent=t[o],this.shadowRoot.prepend(s)}}_parseSlots(){const t=this._slots={};let i;for(;i=this.firstChild;){const n=i.nodeType===1&&i.getAttribute("slot")||"default";(t[n]||(t[n]=[])).push(i),this.removeChild(i)}}_renderSlots(){const t=(this._teleportTarget||this).querySelectorAll("slot"),i=this._instance.type.__scopeId;for(let n=0;n<t.length;n++){const o=t[n],s=o.getAttribute("name")||"default",r=this._slots[s],a=o.parentNode;if(r)for(const l of r){if(i&&l.nodeType===1){const c=i+"-s",h=document.createTreeWalker(l,1);l.setAttribute(c,"");let u;for(;u=h.nextNode();)u.setAttribute(c,"")}a.insertBefore(l,o)}else for(;o.firstChild;)a.insertBefore(o.firstChild,o);a.removeChild(o)}}_injectChildStyle(t){this._applyStyles(t.styles,t)}_removeChildStyle(t){}}function Wh(e){const t=At(),i=t&&t.ce;return i||null}function Wg(){const e=Wh();return e&&e.shadowRoot}function Gg(e="$style"){{const t=At();if(!t)return pe;const i=t.type.__cssModules;if(!i)return pe;const n=i[e];return n||pe}}const Gh=new WeakMap,Vh=new WeakMap,Os=Symbol("_moveCb"),oc=Symbol("_enterCb"),Vg=e=>(delete e.props.mode,e),Hg=Vg({name:"TransitionGroup",props:fe({},qh,{tag:String,moveClass:String}),setup(e,{slots:t}){const i=At(),n=Ma();let o,s;return or(()=>{if(!o.length)return;const r=e.moveClass||`${e.name||"v"}-move`;if(!Qg(o[0].el,i.vnode.el,r)){o=[];return}o.forEach(Kg),o.forEach(Yg);const a=o.filter(Jg);ea(),a.forEach(l=>{const c=l.el,h=c.style;Vt(c,r),h.transform=h.webkitTransform=h.transitionDuration="";const u=c[Os]=p=>{p&&p.target!==c||(!p||p.propertyName.endsWith("transform"))&&(c.removeEventListener("transitionend",u),c[Os]=null,bi(c,r))};c.addEventListener("transitionend",u)}),o=[]}),()=>{const r=ge(e),a=$h(r);let l=r.tag||Me;if(o=[],s)for(let c=0;c<s.length;c++){const h=s[c];h.el&&h.el instanceof Element&&(o.push(h),pi(h,Dn(h,a,n,i)),Gh.set(h,h.el.getBoundingClientRect()))}s=t.default?ir(t.default()):[];for(let c=0;c<s.length;c++){const h=s[c];h.key!=null&&pi(h,Dn(h,a,n,i))}return se(l,null,s)}}}),Hh=Hg;function Kg(e){const t=e.el;t[Os]&&t[Os](),t[oc]&&t[oc]()}function Yg(e){Vh.set(e,e.el.getBoundingClientRect())}function Jg(e){const t=Gh.get(e),i=Vh.get(e),n=t.left-i.left,o=t.top-i.top;if(n||o){const s=e.el.style;return s.transform=s.webkitTransform=`translate(${n}px,${o}px)`,s.transitionDuration="0s",e}}function Qg(e,t,i){const n=e.cloneNode(),o=e[qn];o&&o.forEach(a=>{a.split(/\s+/).forEach(l=>l&&n.classList.remove(l))}),i.split(/\s+/).forEach(a=>a&&n.classList.add(a)),n.style.display="none";const s=t.nodeType===1?t:t.parentNode;s.appendChild(n);const{hasTransform:r}=Uh(n);return s.removeChild(n),r}const Mi=e=>{const t=e.props["onUpdate:modelValue"]||!1;return Q(t)?i=>On(t,i):t};function Zg(e){e.target.composing=!0}function sc(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Ft=Symbol("_assign"),_e={created(e,{modifiers:{lazy:t,trim:i,number:n}},o){e[Ft]=Mi(o);const s=n||o.props&&o.props.type==="number";ri(e,t?"change":"input",r=>{if(r.target.composing)return;let a=e.value;i&&(a=a.trim()),s&&(a=fs(a)),e[Ft](a)}),i&&ri(e,"change",()=>{e.value=e.value.trim()}),t||(ri(e,"compositionstart",Zg),ri(e,"compositionend",sc),ri(e,"change",sc))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:i,modifiers:{lazy:n,trim:o,number:s}},r){if(e[Ft]=Mi(r),e.composing)return;const a=(s||e.type==="number")&&!/^0\d/.test(e.value)?fs(e.value):e.value,l=t??"";a!==l&&(document.activeElement===e&&e.type!=="range"&&(n&&t===i||o&&e.value.trim()===l)||(e.value=l))}},ur={deep:!0,created(e,t,i){e[Ft]=Mi(i),ri(e,"change",()=>{const n=e._modelValue,o=$n(e),s=e.checked,r=e[Ft];if(Q(n)){const a=Ks(n,o),l=a!==-1;if(s&&!l)r(n.concat(o));else if(!s&&l){const c=[...n];c.splice(a,1),r(c)}}else if(tn(n)){const a=new Set(n);s?a.add(o):a.delete(o),r(a)}else r(Kh(e,s))})},mounted:rc,beforeUpdate(e,t,i){e[Ft]=Mi(i),rc(e,t,i)}};function rc(e,{value:t,oldValue:i},n){e._modelValue=t;let o;if(Q(t))o=Ks(t,n.props.value)>-1;else if(tn(t))o=t.has(n.props.value);else{if(t===i)return;o=Oi(t,Kh(e,!0))}e.checked!==o&&(e.checked=o)}const Ga={created(e,{value:t},i){e.checked=Oi(t,i.props.value),e[Ft]=Mi(i),ri(e,"change",()=>{e[Ft]($n(e))})},beforeUpdate(e,{value:t,oldValue:i},n){e[Ft]=Mi(n),t!==i&&(e.checked=Oi(t,n.props.value))}},Ms={deep:!0,created(e,{value:t,modifiers:{number:i}},n){const o=tn(t);ri(e,"change",()=>{const s=Array.prototype.filter.call(e.options,r=>r.selected).map(r=>i?fs($n(r)):$n(r));e[Ft](e.multiple?o?new Set(s):s:s[0]),e._assigning=!0,ai(()=>{e._assigning=!1})}),e[Ft]=Mi(n)},mounted(e,{value:t}){ac(e,t)},beforeUpdate(e,t,i){e[Ft]=Mi(i)},updated(e,{value:t}){e._assigning||ac(e,t)}};function ac(e,t){const i=e.multiple,n=Q(t);if(!(i&&!n&&!tn(t))){for(let o=0,s=e.options.length;o<s;o++){const r=e.options[o],a=$n(r);if(i)if(n){const l=typeof a;l==="string"||l==="number"?r.selected=t.some(c=>String(c)===String(a)):r.selected=Ks(t,a)>-1}else r.selected=t.has(a);else if(Oi($n(r),t)){e.selectedIndex!==o&&(e.selectedIndex=o);return}}!i&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function $n(e){return"_value"in e?e._value:e.value}function Kh(e,t){const i=t?"_trueValue":"_falseValue";return i in e?e[i]:t}const Yh={created(e,t,i){is(e,t,i,null,"created")},mounted(e,t,i){is(e,t,i,null,"mounted")},beforeUpdate(e,t,i,n){is(e,t,i,n,"beforeUpdate")},updated(e,t,i,n){is(e,t,i,n,"updated")}};function Jh(e,t){switch(e){case"SELECT":return Ms;case"TEXTAREA":return _e;default:switch(t){case"checkbox":return ur;case"radio":return Ga;default:return _e}}}function is(e,t,i,n,o){const r=Jh(e.tagName,i.props&&i.props.type)[o];r&&r(e,t,i,n)}function Xg(){_e.getSSRProps=({value:e})=>({value:e}),Ga.getSSRProps=({value:e},t)=>{if(t.props&&Oi(t.props.value,e))return{checked:!0}},ur.getSSRProps=({value:e},t)=>{if(Q(e)){if(t.props&&Ks(e,t.props.value)>-1)return{checked:!0}}else if(tn(e)){if(t.props&&e.has(t.props.value))return{checked:!0}}else if(e)return{checked:!0}},Yh.getSSRProps=(e,t)=>{if(typeof t.type!="string")return;const i=Jh(t.type.toUpperCase(),t.props&&t.props.type);if(i.getSSRProps)return i.getSSRProps(e,t)}}const ey=["ctrl","shift","alt","meta"],ty={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>ey.some(i=>e[`${i}Key`]&&!t.includes(i))},Qh=(e,t)=>{const i=e._withMods||(e._withMods={}),n=t.join(".");return i[n]||(i[n]=(o,...s)=>{for(let r=0;r<t.length;r++){const a=ty[t[r]];if(a&&a(o,t))return}return e(o,...s)})},iy={esc:"escape",space:" ",up:"arrow-up",left:"arrow-left",right:"arrow-right",down:"arrow-down",delete:"backspace"},ny=(e,t)=>{const i=e._withKeys||(e._withKeys={}),n=t.join(".");return i[n]||(i[n]=o=>{if(!("key"in o))return;const s=Tt(o.key);if(t.some(r=>r===s||iy[r]===s))return e(o)})},Zh=fe({patchProp:Ug},Sg);let mo,lc=!1;function Xh(){return mo||(mo=uh(Zh))}function ed(){return mo=lc?mo:hh(Zh),lc=!0,mo}const td=(...e)=>{Xh().render(...e)},oy=(...e)=>{ed().hydrate(...e)},Ns=(...e)=>{const t=Xh().createApp(...e),{mount:i}=t;return t.mount=n=>{const o=od(n);if(!o)return;const s=t._component;!re(s)&&!s.render&&!s.template&&(s.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const r=i(o,!1,nd(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),r},t},id=(...e)=>{const t=ed().createApp(...e),{mount:i}=t;return t.mount=n=>{const o=od(n);if(o)return i(o,!0,nd(o))},t};function nd(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function od(e){return le(e)?document.querySelector(e):e}let cc=!1;const sy=()=>{cc||(cc=!0,Xg(),_g())},ry=Object.freeze(Object.defineProperty({__proto__:null,BaseTransition:Bu,BaseTransitionPropsValidators:Na,Comment:Be,DeprecationTypes:wg,EffectScope:Ta,ErrorCodes:Mf,ErrorTypeStrings:pg,Fragment:Me,KeepAlive:om,ReactiveEffect:wo,Static:Vi,Suspense:Jm,Teleport:Oa,Text:Ei,TrackOpTypes:If,Transition:_s,TransitionGroup:Hh,TriggerOpTypes:Pf,VueElement:cr,assertNumber:Of,callWithAsyncErrorHandling:qt,callWithErrorHandling:Yn,camelize:Ne,capitalize:nn,cloneVNode:Jt,compatUtils:bg,computed:xe,createApp:Ns,createBlock:Je,createCommentVNode:De,createElementBlock:ae,createElementVNode:g,createHydrationRenderer:hh,createPropsRestProxy:Sm,createRenderer:uh,createSSRApp:id,createSlots:lm,createStaticVNode:As,createTextVNode:Ii,createVNode:se,customRef:Iu,defineAsyncComponent:im,defineComponent:ot,defineCustomElement:jh,defineEmits:pm,defineExpose:fm,defineModel:ym,defineOptions:mm,defineProps:dm,defineSSRCustomElement:zg,defineSlots:gm,devtools:fg,effect:Kp,effectScope:xa,getCurrentInstance:At,getCurrentScope:Sa,getCurrentWatcher:_f,getTransitionRawChildren:ir,guardReactiveProps:Ih,h:Zi,handleError:on,hasInjectionContext:th,hydrate:oy,hydrateOnIdle:Jf,hydrateOnInteraction:em,hydrateOnMediaQuery:Xf,hydrateOnVisible:Zf,initCustomFormatter:ug,initDirectivesForSSR:sy,inject:Rt,isMemoSame:Nh,isProxy:Xs,isReactive:Yt,isReadonly:hi,isRef:qe,isRuntimeOnly:ag,isShallow:Et,isVNode:fi,markRaw:er,mergeDefaults:Tm,mergeModels:xm,mergeProps:Ph,nextTick:ai,normalizeClass:Oe,normalizeProps:Np,normalizeStyle:Hn,onActivated:ju,onBeforeMount:Vu,onBeforeUnmount:sr,onBeforeUpdate:Da,onDeactivated:Wu,onErrorCaptured:Ju,onMounted:Ni,onRenderTracked:Yu,onRenderTriggered:Ku,onScopeDispose:cu,onServerPrefetch:Hu,onUnmounted:qo,onUpdated:or,onWatcherCleanup:Cu,openBlock:X,popScopeId:qf,provide:po,proxyRefs:Ea,pushScopeId:Ff,queuePostFlushCb:So,reactive:Kn,readonly:_a,ref:oe,registerRuntimeCompiler:Rh,render:td,renderList:Yi,renderSlot:cm,resolveComponent:rr,resolveDirective:am,resolveDynamicComponent:$o,resolveFilter:vg,resolveTransitionHooks:Dn,setBlockTracking:_o,setDevtoolsHook:mg,setTransitionHooks:pi,shallowReactive:Pa,shallowReadonly:mf,shallowRef:Ca,ssrContextKey:mh,ssrUtils:yg,stop:Yp,toDisplayString:ce,toHandlerKey:Rn,toHandlers:um,toRaw:ge,toRef:Sf,toRefs:Pu,toValue:vf,transformVNodeArgs:ig,triggerRef:yf,unref:N,useAttrs:wm,useCssModule:Gg,useCssVars:Cg,useHost:Wh,useId:zf,useModel:zm,useSSRContext:gh,useShadowRoot:Wg,useSlots:bm,useTemplateRef:jf,useTransitionState:Ma,vModelCheckbox:ur,vModelDynamic:Yh,vModelRadio:Ga,vModelSelect:Ms,vModelText:_e,vShow:Es,version:Lh,warn:dg,watch:St,watchEffect:$m,watchPostEffect:Um,watchSyncEffect:yh,withAsyncContext:km,withCtx:di,withDefaults:vm,withDirectives:Ae,withKeys:ny,withMemo:hg,withModifiers:Qh,withScopeId:$f},Symbol.toStringTag,{value:"Module"}));/**
* @vue/compiler-core v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Co=Symbol(""),go=Symbol(""),Va=Symbol(""),Ls=Symbol(""),sd=Symbol(""),Xi=Symbol(""),rd=Symbol(""),ad=Symbol(""),Ha=Symbol(""),Ka=Symbol(""),zo=Symbol(""),Ya=Symbol(""),ld=Symbol(""),Ja=Symbol(""),Qa=Symbol(""),Za=Symbol(""),Xa=Symbol(""),el=Symbol(""),tl=Symbol(""),cd=Symbol(""),ud=Symbol(""),hr=Symbol(""),Ds=Symbol(""),il=Symbol(""),nl=Symbol(""),Eo=Symbol(""),jo=Symbol(""),ol=Symbol(""),ia=Symbol(""),ay=Symbol(""),na=Symbol(""),Fs=Symbol(""),ly=Symbol(""),cy=Symbol(""),sl=Symbol(""),uy=Symbol(""),hy=Symbol(""),rl=Symbol(""),hd=Symbol(""),Un={[Co]:"Fragment",[go]:"Teleport",[Va]:"Suspense",[Ls]:"KeepAlive",[sd]:"BaseTransition",[Xi]:"openBlock",[rd]:"createBlock",[ad]:"createElementBlock",[Ha]:"createVNode",[Ka]:"createElementVNode",[zo]:"createCommentVNode",[Ya]:"createTextVNode",[ld]:"createStaticVNode",[Ja]:"resolveComponent",[Qa]:"resolveDynamicComponent",[Za]:"resolveDirective",[Xa]:"resolveFilter",[el]:"withDirectives",[tl]:"renderList",[cd]:"renderSlot",[ud]:"createSlots",[hr]:"toDisplayString",[Ds]:"mergeProps",[il]:"normalizeClass",[nl]:"normalizeStyle",[Eo]:"normalizeProps",[jo]:"guardReactiveProps",[ol]:"toHandlers",[ia]:"camelize",[ay]:"capitalize",[na]:"toHandlerKey",[Fs]:"setBlockTracking",[ly]:"pushScopeId",[cy]:"popScopeId",[sl]:"withCtx",[uy]:"unref",[hy]:"isRef",[rl]:"withMemo",[hd]:"isMemoSame"};function dy(e){Object.getOwnPropertySymbols(e).forEach(t=>{Un[t]=e[t]})}const Mt={start:{line:1,column:1,offset:0},end:{line:1,column:1,offset:0},source:""};function py(e,t=""){return{type:0,source:t,children:e,helpers:new Set,components:[],directives:[],hoists:[],imports:[],cached:[],temps:0,codegenNode:void 0,loc:Mt}}function Ro(e,t,i,n,o,s,r,a=!1,l=!1,c=!1,h=Mt){return e&&(a?(e.helper(Xi),e.helper(jn(e.inSSR,c))):e.helper(zn(e.inSSR,c)),r&&e.helper(el)),{type:13,tag:t,props:i,children:n,patchFlag:o,dynamicProps:s,directives:r,isBlock:a,disableTracking:l,isComponent:c,loc:h}}function Hi(e,t=Mt){return{type:17,loc:t,elements:e}}function Dt(e,t=Mt){return{type:15,loc:t,properties:e}}function ze(e,t){return{type:16,loc:Mt,key:le(e)?he(e,!0):e,value:t}}function he(e,t=!1,i=Mt,n=0){return{type:4,loc:i,content:e,isStatic:t,constType:t?3:n}}function jt(e,t=Mt){return{type:8,loc:t,children:e}}function Ve(e,t=[],i=Mt){return{type:14,loc:i,callee:e,arguments:t}}function Bn(e,t=void 0,i=!1,n=!1,o=Mt){return{type:18,params:e,returns:t,newline:i,isSlot:n,loc:o}}function oa(e,t,i,n=!0){return{type:19,test:e,consequent:t,alternate:i,newline:n,loc:Mt}}function fy(e,t,i=!1,n=!1){return{type:20,index:e,value:t,needPauseTracking:i,inVOnce:n,needArraySpread:!1,loc:Mt}}function my(e){return{type:21,body:e,loc:Mt}}function zn(e,t){return e||t?Ha:Ka}function jn(e,t){return e||t?rd:ad}function al(e,{helper:t,removeHelper:i,inSSR:n}){e.isBlock||(e.isBlock=!0,i(zn(n,e.isComponent)),t(Xi),t(jn(n,e.isComponent)))}const uc=new Uint8Array([123,123]),hc=new Uint8Array([125,125]);function dc(e){return e>=97&&e<=122||e>=65&&e<=90}function _t(e){return e===32||e===10||e===9||e===12||e===13}function yi(e){return e===47||e===62||_t(e)}function qs(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}const at={Cdata:new Uint8Array([67,68,65,84,65,91]),CdataEnd:new Uint8Array([93,93,62]),CommentEnd:new Uint8Array([45,45,62]),ScriptEnd:new Uint8Array([60,47,115,99,114,105,112,116]),StyleEnd:new Uint8Array([60,47,115,116,121,108,101]),TitleEnd:new Uint8Array([60,47,116,105,116,108,101]),TextareaEnd:new Uint8Array([60,47,116,101,120,116,97,114,101,97])};class gy{constructor(t,i){this.stack=t,this.cbs=i,this.state=1,this.buffer="",this.sectionStart=0,this.index=0,this.entityStart=0,this.baseState=1,this.inRCDATA=!1,this.inXML=!1,this.inVPre=!1,this.newlines=[],this.mode=0,this.delimiterOpen=uc,this.delimiterClose=hc,this.delimiterIndex=-1,this.currentSequence=void 0,this.sequenceIndex=0}get inSFCRoot(){return this.mode===2&&this.stack.length===0}reset(){this.state=1,this.mode=0,this.buffer="",this.sectionStart=0,this.index=0,this.baseState=1,this.inRCDATA=!1,this.currentSequence=void 0,this.newlines.length=0,this.delimiterOpen=uc,this.delimiterClose=hc}getPos(t){let i=1,n=t+1;for(let o=this.newlines.length-1;o>=0;o--){const s=this.newlines[o];if(t>s){i=o+2,n=t-s;break}}return{column:n,line:i,offset:t}}peek(){return this.buffer.charCodeAt(this.index+1)}stateText(t){t===60?(this.index>this.sectionStart&&this.cbs.ontext(this.sectionStart,this.index),this.state=5,this.sectionStart=this.index):!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t))}stateInterpolationOpen(t){if(t===this.delimiterOpen[this.delimiterIndex])if(this.delimiterIndex===this.delimiterOpen.length-1){const i=this.index+1-this.delimiterOpen.length;i>this.sectionStart&&this.cbs.ontext(this.sectionStart,i),this.state=3,this.sectionStart=i}else this.delimiterIndex++;else this.inRCDATA?(this.state=32,this.stateInRCDATA(t)):(this.state=1,this.stateText(t))}stateInterpolation(t){t===this.delimiterClose[0]&&(this.state=4,this.delimiterIndex=0,this.stateInterpolationClose(t))}stateInterpolationClose(t){t===this.delimiterClose[this.delimiterIndex]?this.delimiterIndex===this.delimiterClose.length-1?(this.cbs.oninterpolation(this.sectionStart,this.index+1),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):this.delimiterIndex++:(this.state=3,this.stateInterpolation(t))}stateSpecialStartSequence(t){const i=this.sequenceIndex===this.currentSequence.length;if(!(i?yi(t):(t|32)===this.currentSequence[this.sequenceIndex]))this.inRCDATA=!1;else if(!i){this.sequenceIndex++;return}this.sequenceIndex=0,this.state=6,this.stateInTagName(t)}stateInRCDATA(t){if(this.sequenceIndex===this.currentSequence.length){if(t===62||_t(t)){const i=this.index-this.currentSequence.length;if(this.sectionStart<i){const n=this.index;this.index=i,this.cbs.ontext(this.sectionStart,i),this.index=n}this.sectionStart=i+2,this.stateInClosingTagName(t),this.inRCDATA=!1;return}this.sequenceIndex=0}(t|32)===this.currentSequence[this.sequenceIndex]?this.sequenceIndex+=1:this.sequenceIndex===0?this.currentSequence===at.TitleEnd||this.currentSequence===at.TextareaEnd&&!this.inSFCRoot?!this.inVPre&&t===this.delimiterOpen[0]&&(this.state=2,this.delimiterIndex=0,this.stateInterpolationOpen(t)):this.fastForwardTo(60)&&(this.sequenceIndex=1):this.sequenceIndex=+(t===60)}stateCDATASequence(t){t===at.Cdata[this.sequenceIndex]?++this.sequenceIndex===at.Cdata.length&&(this.state=28,this.currentSequence=at.CdataEnd,this.sequenceIndex=0,this.sectionStart=this.index+1):(this.sequenceIndex=0,this.state=23,this.stateInDeclaration(t))}fastForwardTo(t){for(;++this.index<this.buffer.length;){const i=this.buffer.charCodeAt(this.index);if(i===10&&this.newlines.push(this.index),i===t)return!0}return this.index=this.buffer.length-1,!1}stateInCommentLike(t){t===this.currentSequence[this.sequenceIndex]?++this.sequenceIndex===this.currentSequence.length&&(this.currentSequence===at.CdataEnd?this.cbs.oncdata(this.sectionStart,this.index-2):this.cbs.oncomment(this.sectionStart,this.index-2),this.sequenceIndex=0,this.sectionStart=this.index+1,this.state=1):this.sequenceIndex===0?this.fastForwardTo(this.currentSequence[0])&&(this.sequenceIndex=1):t!==this.currentSequence[this.sequenceIndex-1]&&(this.sequenceIndex=0)}startSpecial(t,i){this.enterRCDATA(t,i),this.state=31}enterRCDATA(t,i){this.inRCDATA=!0,this.currentSequence=t,this.sequenceIndex=i}stateBeforeTagName(t){t===33?(this.state=22,this.sectionStart=this.index+1):t===63?(this.state=24,this.sectionStart=this.index+1):dc(t)?(this.sectionStart=this.index,this.mode===0?this.state=6:this.inSFCRoot?this.state=34:this.inXML?this.state=6:t===116?this.state=30:this.state=t===115?29:6):t===47?this.state=8:(this.state=1,this.stateText(t))}stateInTagName(t){yi(t)&&this.handleTagName(t)}stateInSFCRootTagName(t){if(yi(t)){const i=this.buffer.slice(this.sectionStart,this.index);i!=="template"&&this.enterRCDATA(qs("</"+i),0),this.handleTagName(t)}}handleTagName(t){this.cbs.onopentagname(this.sectionStart,this.index),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)}stateBeforeClosingTagName(t){_t(t)||(t===62?(this.state=1,this.sectionStart=this.index+1):(this.state=dc(t)?9:27,this.sectionStart=this.index))}stateInClosingTagName(t){(t===62||_t(t))&&(this.cbs.onclosetag(this.sectionStart,this.index),this.sectionStart=-1,this.state=10,this.stateAfterClosingTagName(t))}stateAfterClosingTagName(t){t===62&&(this.state=1,this.sectionStart=this.index+1)}stateBeforeAttrName(t){t===62?(this.cbs.onopentagend(this.index),this.inRCDATA?this.state=32:this.state=1,this.sectionStart=this.index+1):t===47?this.state=7:t===60&&this.peek()===47?(this.cbs.onopentagend(this.index),this.state=5,this.sectionStart=this.index):_t(t)||this.handleAttrStart(t)}handleAttrStart(t){t===118&&this.peek()===45?(this.state=13,this.sectionStart=this.index):t===46||t===58||t===64||t===35?(this.cbs.ondirname(this.index,this.index+1),this.state=14,this.sectionStart=this.index+1):(this.state=12,this.sectionStart=this.index)}stateInSelfClosingTag(t){t===62?(this.cbs.onselfclosingtag(this.index),this.state=1,this.sectionStart=this.index+1,this.inRCDATA=!1):_t(t)||(this.state=11,this.stateBeforeAttrName(t))}stateInAttrName(t){(t===61||yi(t))&&(this.cbs.onattribname(this.sectionStart,this.index),this.handleAttrNameEnd(t))}stateInDirName(t){t===61||yi(t)?(this.cbs.ondirname(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===58?(this.cbs.ondirname(this.sectionStart,this.index),this.state=14,this.sectionStart=this.index+1):t===46&&(this.cbs.ondirname(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDirArg(t){t===61||yi(t)?(this.cbs.ondirarg(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===91?this.state=15:t===46&&(this.cbs.ondirarg(this.sectionStart,this.index),this.state=16,this.sectionStart=this.index+1)}stateInDynamicDirArg(t){t===93?this.state=14:(t===61||yi(t))&&(this.cbs.ondirarg(this.sectionStart,this.index+1),this.handleAttrNameEnd(t))}stateInDirModifier(t){t===61||yi(t)?(this.cbs.ondirmodifier(this.sectionStart,this.index),this.handleAttrNameEnd(t)):t===46&&(this.cbs.ondirmodifier(this.sectionStart,this.index),this.sectionStart=this.index+1)}handleAttrNameEnd(t){this.sectionStart=this.index,this.state=17,this.cbs.onattribnameend(this.index),this.stateAfterAttrName(t)}stateAfterAttrName(t){t===61?this.state=18:t===47||t===62?(this.cbs.onattribend(0,this.sectionStart),this.sectionStart=-1,this.state=11,this.stateBeforeAttrName(t)):_t(t)||(this.cbs.onattribend(0,this.sectionStart),this.handleAttrStart(t))}stateBeforeAttrValue(t){t===34?(this.state=19,this.sectionStart=this.index+1):t===39?(this.state=20,this.sectionStart=this.index+1):_t(t)||(this.sectionStart=this.index,this.state=21,this.stateInAttrValueNoQuotes(t))}handleInAttrValue(t,i){(t===i||this.fastForwardTo(i))&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(i===34?3:2,this.index+1),this.state=11)}stateInAttrValueDoubleQuotes(t){this.handleInAttrValue(t,34)}stateInAttrValueSingleQuotes(t){this.handleInAttrValue(t,39)}stateInAttrValueNoQuotes(t){_t(t)||t===62?(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=-1,this.cbs.onattribend(1,this.index),this.state=11,this.stateBeforeAttrName(t)):(t===39||t===60||t===61||t===96)&&this.cbs.onerr(18,this.index)}stateBeforeDeclaration(t){t===91?(this.state=26,this.sequenceIndex=0):this.state=t===45?25:23}stateInDeclaration(t){(t===62||this.fastForwardTo(62))&&(this.state=1,this.sectionStart=this.index+1)}stateInProcessingInstruction(t){(t===62||this.fastForwardTo(62))&&(this.cbs.onprocessinginstruction(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeComment(t){t===45?(this.state=28,this.currentSequence=at.CommentEnd,this.sequenceIndex=2,this.sectionStart=this.index+1):this.state=23}stateInSpecialComment(t){(t===62||this.fastForwardTo(62))&&(this.cbs.oncomment(this.sectionStart,this.index),this.state=1,this.sectionStart=this.index+1)}stateBeforeSpecialS(t){t===at.ScriptEnd[3]?this.startSpecial(at.ScriptEnd,4):t===at.StyleEnd[3]?this.startSpecial(at.StyleEnd,4):(this.state=6,this.stateInTagName(t))}stateBeforeSpecialT(t){t===at.TitleEnd[3]?this.startSpecial(at.TitleEnd,4):t===at.TextareaEnd[3]?this.startSpecial(at.TextareaEnd,4):(this.state=6,this.stateInTagName(t))}startEntity(){}stateInEntity(){}parse(t){for(this.buffer=t;this.index<this.buffer.length;){const i=this.buffer.charCodeAt(this.index);switch(i===10&&this.state!==33&&this.newlines.push(this.index),this.state){case 1:{this.stateText(i);break}case 2:{this.stateInterpolationOpen(i);break}case 3:{this.stateInterpolation(i);break}case 4:{this.stateInterpolationClose(i);break}case 31:{this.stateSpecialStartSequence(i);break}case 32:{this.stateInRCDATA(i);break}case 26:{this.stateCDATASequence(i);break}case 19:{this.stateInAttrValueDoubleQuotes(i);break}case 12:{this.stateInAttrName(i);break}case 13:{this.stateInDirName(i);break}case 14:{this.stateInDirArg(i);break}case 15:{this.stateInDynamicDirArg(i);break}case 16:{this.stateInDirModifier(i);break}case 28:{this.stateInCommentLike(i);break}case 27:{this.stateInSpecialComment(i);break}case 11:{this.stateBeforeAttrName(i);break}case 6:{this.stateInTagName(i);break}case 34:{this.stateInSFCRootTagName(i);break}case 9:{this.stateInClosingTagName(i);break}case 5:{this.stateBeforeTagName(i);break}case 17:{this.stateAfterAttrName(i);break}case 20:{this.stateInAttrValueSingleQuotes(i);break}case 18:{this.stateBeforeAttrValue(i);break}case 8:{this.stateBeforeClosingTagName(i);break}case 10:{this.stateAfterClosingTagName(i);break}case 29:{this.stateBeforeSpecialS(i);break}case 30:{this.stateBeforeSpecialT(i);break}case 21:{this.stateInAttrValueNoQuotes(i);break}case 7:{this.stateInSelfClosingTag(i);break}case 23:{this.stateInDeclaration(i);break}case 22:{this.stateBeforeDeclaration(i);break}case 25:{this.stateBeforeComment(i);break}case 24:{this.stateInProcessingInstruction(i);break}case 33:{this.stateInEntity();break}}this.index++}this.cleanup(),this.finish()}cleanup(){this.sectionStart!==this.index&&(this.state===1||this.state===32&&this.sequenceIndex===0?(this.cbs.ontext(this.sectionStart,this.index),this.sectionStart=this.index):(this.state===19||this.state===20||this.state===21)&&(this.cbs.onattribdata(this.sectionStart,this.index),this.sectionStart=this.index))}finish(){this.handleTrailingData(),this.cbs.onend()}handleTrailingData(){const t=this.buffer.length;this.sectionStart>=t||(this.state===28?this.currentSequence===at.CdataEnd?this.cbs.oncdata(this.sectionStart,t):this.cbs.oncomment(this.sectionStart,t):this.state===6||this.state===11||this.state===18||this.state===17||this.state===12||this.state===13||this.state===14||this.state===15||this.state===16||this.state===20||this.state===19||this.state===21||this.state===9||this.cbs.ontext(this.sectionStart,t))}emitCodePoint(t,i){}}function pc(e,{compatConfig:t}){const i=t&&t[e];return e==="MODE"?i||3:i}function Ki(e,t){const i=pc("MODE",t),n=pc(e,t);return i===3?n===!0:n!==!1}function Oo(e,t,i,...n){return Ki(e,t)}function ll(e){throw e}function dd(e){}function Fe(e,t,i,n){const o=`https://vuejs.org/error-reference/#compiler-${e}`,s=new SyntaxError(String(o));return s.code=e,s.loc=t,s}const xt=e=>e.type===4&&e.isStatic;function pd(e){switch(e){case"Teleport":case"teleport":return go;case"Suspense":case"suspense":return Va;case"KeepAlive":case"keep-alive":return Ls;case"BaseTransition":case"base-transition":return sd}}const yy=/^$|^\d|[^\$\w\xA0-\uFFFF]/,cl=e=>!yy.test(e),vy=/[A-Za-z_$\xA0-\uFFFF]/,by=/[\.\?\w$\xA0-\uFFFF]/,wy=/\s+[.[]\s*|\s*[.[]\s+/g,fd=e=>e.type===4?e.content:e.loc.source,Ty=e=>{const t=fd(e).trim().replace(wy,a=>a.trim());let i=0,n=[],o=0,s=0,r=null;for(let a=0;a<t.length;a++){const l=t.charAt(a);switch(i){case 0:if(l==="[")n.push(i),i=1,o++;else if(l==="(")n.push(i),i=2,s++;else if(!(a===0?vy:by).test(l))return!1;break;case 1:l==="'"||l==='"'||l==="`"?(n.push(i),i=3,r=l):l==="["?o++:l==="]"&&(--o||(i=n.pop()));break;case 2:if(l==="'"||l==='"'||l==="`")n.push(i),i=3,r=l;else if(l==="(")s++;else if(l===")"){if(a===t.length-1)return!1;--s||(i=n.pop())}break;case 3:l===r&&(i=n.pop(),r=null);break}}return!o&&!s},md=Ty,xy=/^\s*(?:async\s*)?(?:\([^)]*?\)|[\w$_]+)\s*(?::[^=]+)?=>|^\s*(?:async\s+)?function(?:\s+[\w$]+)?\s*\(/,Sy=e=>xy.test(fd(e)),ky=Sy;function Lt(e,t,i=!1){for(let n=0;n<e.props.length;n++){const o=e.props[n];if(o.type===7&&(i||o.exp)&&(le(t)?o.name===t:t.test(o.name)))return o}}function dr(e,t,i=!1,n=!1){for(let o=0;o<e.props.length;o++){const s=e.props[o];if(s.type===6){if(i)continue;if(s.name===t&&(s.value||n))return s}else if(s.name==="bind"&&(s.exp||n)&&zi(s.arg,t))return s}}function zi(e,t){return!!(e&&xt(e)&&e.content===t)}function Ay(e){return e.props.some(t=>t.type===7&&t.name==="bind"&&(!t.arg||t.arg.type!==4||!t.arg.isStatic))}function Rr(e){return e.type===5||e.type===2}function fc(e){return e.type===7&&e.name==="pre"}function Iy(e){return e.type===7&&e.name==="slot"}function $s(e){return e.type===1&&e.tagType===3}function Us(e){return e.type===1&&e.tagType===2}const Py=new Set([Eo,jo]);function gd(e,t=[]){if(e&&!le(e)&&e.type===14){const i=e.callee;if(!le(i)&&Py.has(i))return gd(e.arguments[0],t.concat(e))}return[e,t]}function Bs(e,t,i){let n,o=e.type===13?e.props:e.arguments[2],s=[],r;if(o&&!le(o)&&o.type===14){const a=gd(o);o=a[0],s=a[1],r=s[s.length-1]}if(o==null||le(o))n=Dt([t]);else if(o.type===14){const a=o.arguments[0];!le(a)&&a.type===15?mc(t,a)||a.properties.unshift(t):o.callee===ol?n=Ve(i.helper(Ds),[Dt([t]),o]):o.arguments.unshift(Dt([t])),!n&&(n=o)}else o.type===15?(mc(t,o)||o.properties.unshift(t),n=o):(n=Ve(i.helper(Ds),[Dt([t]),o]),r&&r.callee===jo&&(r=s[s.length-2]));e.type===13?r?r.arguments[0]=n:e.props=n:r?r.arguments[0]=n:e.arguments[2]=n}function mc(e,t){let i=!1;if(e.key.type===4){const n=e.key.content;i=t.properties.some(o=>o.key.type===4&&o.key.content===n)}return i}function Mo(e,t){return`_${t}_${e.replace(/[^\w]/g,(i,n)=>i==="-"?"_":e.charCodeAt(n).toString())}`}function _y(e){return e.type===14&&e.callee===rl?e.arguments[1].returns:e}const Cy=/([\s\S]*?)\s+(?:in|of)\s+(\S[\s\S]*)/,yd={parseMode:"base",ns:0,delimiters:["{{","}}"],getNamespace:()=>0,isVoidTag:Pn,isPreTag:Pn,isIgnoreNewlineTag:Pn,isCustomElement:Pn,onError:ll,onWarn:dd,comments:!1,prefixIdentifiers:!1};let Se=yd,No=null,li="",ct=null,de=null,vt="",ti=-1,qi=-1,ul=0,ki=!1,sa=null;const Le=[],$e=new gy(Le,{onerr:Xt,ontext(e,t){ns(Xe(e,t),e,t)},ontextentity(e,t,i){ns(e,t,i)},oninterpolation(e,t){if(ki)return ns(Xe(e,t),e,t);let i=e+$e.delimiterOpen.length,n=t-$e.delimiterClose.length;for(;_t(li.charCodeAt(i));)i++;for(;_t(li.charCodeAt(n-1));)n--;let o=Xe(i,n);o.includes("&")&&(o=Se.decodeEntities(o,!1)),ra({type:5,content:hs(o,!1,Ue(i,n)),loc:Ue(e,t)})},onopentagname(e,t){const i=Xe(e,t);ct={type:1,tag:i,ns:Se.getNamespace(i,Le[0],Se.ns),tagType:0,props:[],children:[],loc:Ue(e-1,t),codegenNode:void 0}},onopentagend(e){yc(e)},onclosetag(e,t){const i=Xe(e,t);if(!Se.isVoidTag(i)){let n=!1;for(let o=0;o<Le.length;o++)if(Le[o].tag.toLowerCase()===i.toLowerCase()){n=!0,o>0&&Xt(24,Le[0].loc.start.offset);for(let r=0;r<=o;r++){const a=Le.shift();us(a,t,r<o)}break}n||Xt(23,vd(e,60))}},onselfclosingtag(e){const t=ct.tag;ct.isSelfClosing=!0,yc(e),Le[0]&&Le[0].tag===t&&us(Le.shift(),e)},onattribname(e,t){de={type:6,name:Xe(e,t),nameLoc:Ue(e,t),value:void 0,loc:Ue(e)}},ondirname(e,t){const i=Xe(e,t),n=i==="."||i===":"?"bind":i==="@"?"on":i==="#"?"slot":i.slice(2);if(!ki&&n===""&&Xt(26,e),ki||n==="")de={type:6,name:i,nameLoc:Ue(e,t),value:void 0,loc:Ue(e)};else if(de={type:7,name:n,rawName:i,exp:void 0,arg:void 0,modifiers:i==="."?[he("prop")]:[],loc:Ue(e)},n==="pre"){ki=$e.inVPre=!0,sa=ct;const o=ct.props;for(let s=0;s<o.length;s++)o[s].type===7&&(o[s]=Uy(o[s]))}},ondirarg(e,t){if(e===t)return;const i=Xe(e,t);if(ki&&!fc(de))de.name+=i,ji(de.nameLoc,t);else{const n=i[0]!=="[";de.arg=hs(n?i:i.slice(1,-1),n,Ue(e,t),n?3:0)}},ondirmodifier(e,t){const i=Xe(e,t);if(ki&&!fc(de))de.name+="."+i,ji(de.nameLoc,t);else if(de.name==="slot"){const n=de.arg;n&&(n.content+="."+i,ji(n.loc,t))}else{const n=he(i,!0,Ue(e,t));de.modifiers.push(n)}},onattribdata(e,t){vt+=Xe(e,t),ti<0&&(ti=e),qi=t},onattribentity(e,t,i){vt+=e,ti<0&&(ti=t),qi=i},onattribnameend(e){const t=de.loc.start.offset,i=Xe(t,e);de.type===7&&(de.rawName=i),ct.props.some(n=>(n.type===7?n.rawName:n.name)===i)&&Xt(2,t)},onattribend(e,t){if(ct&&de){if(ji(de.loc,t),e!==0)if(vt.includes("&")&&(vt=Se.decodeEntities(vt,!0)),de.type===6)de.name==="class"&&(vt=wd(vt).trim()),e===1&&!vt&&Xt(13,t),de.value={type:2,content:vt,loc:e===1?Ue(ti,qi):Ue(ti-1,qi+1)},$e.inSFCRoot&&ct.tag==="template"&&de.name==="lang"&&vt&&vt!=="html"&&$e.enterRCDATA(qs("</template"),0);else{let i=0;de.exp=hs(vt,!1,Ue(ti,qi),0,i),de.name==="for"&&(de.forParseResult=Ry(de.exp));let n=-1;de.name==="bind"&&(n=de.modifiers.findIndex(o=>o.content==="sync"))>-1&&Oo("COMPILER_V_BIND_SYNC",Se,de.loc,de.arg.loc.source)&&(de.name="model",de.modifiers.splice(n,1))}(de.type!==7||de.name!=="pre")&&ct.props.push(de)}vt="",ti=qi=-1},oncomment(e,t){Se.comments&&ra({type:3,content:Xe(e,t),loc:Ue(e-4,t+3)})},onend(){const e=li.length;for(let t=0;t<Le.length;t++)us(Le[t],e-1),Xt(24,Le[t].loc.start.offset)},oncdata(e,t){Le[0].ns!==0?ns(Xe(e,t),e,t):Xt(1,e-9)},onprocessinginstruction(e){(Le[0]?Le[0].ns:Se.ns)===0&&Xt(21,e-1)}}),gc=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Ey=/^\(|\)$/g;function Ry(e){const t=e.loc,i=e.content,n=i.match(Cy);if(!n)return;const[,o,s]=n,r=(u,p,d=!1)=>{const m=t.start.offset+p,f=m+u.length;return hs(u,!1,Ue(m,f),0,d?1:0)},a={source:r(s.trim(),i.indexOf(s,o.length)),value:void 0,key:void 0,index:void 0,finalized:!1};let l=o.trim().replace(Ey,"").trim();const c=o.indexOf(l),h=l.match(gc);if(h){l=l.replace(gc,"").trim();const u=h[1].trim();let p;if(u&&(p=i.indexOf(u,c+l.length),a.key=r(u,p,!0)),h[2]){const d=h[2].trim();d&&(a.index=r(d,i.indexOf(d,a.key?p+u.length:c+l.length),!0))}}return l&&(a.value=r(l,c,!0)),a}function Xe(e,t){return li.slice(e,t)}function yc(e){$e.inSFCRoot&&(ct.innerLoc=Ue(e+1,e+1)),ra(ct);const{tag:t,ns:i}=ct;i===0&&Se.isPreTag(t)&&ul++,Se.isVoidTag(t)?us(ct,e):(Le.unshift(ct),(i===1||i===2)&&($e.inXML=!0)),ct=null}function ns(e,t,i){{const s=Le[0]&&Le[0].tag;s!=="script"&&s!=="style"&&e.includes("&")&&(e=Se.decodeEntities(e,!1))}const n=Le[0]||No,o=n.children[n.children.length-1];o&&o.type===2?(o.content+=e,ji(o.loc,i)):n.children.push({type:2,content:e,loc:Ue(t,i)})}function us(e,t,i=!1){i?ji(e.loc,vd(t,60)):ji(e.loc,Oy(t,62)+1),$e.inSFCRoot&&(e.children.length?e.innerLoc.end=fe({},e.children[e.children.length-1].loc.end):e.innerLoc.end=fe({},e.innerLoc.start),e.innerLoc.source=Xe(e.innerLoc.start.offset,e.innerLoc.end.offset));const{tag:n,ns:o,children:s}=e;if(ki||(n==="slot"?e.tagType=2:vc(e)?e.tagType=3:Ny(e)&&(e.tagType=1)),$e.inRCDATA||(e.children=bd(s)),o===0&&Se.isIgnoreNewlineTag(n)){const r=s[0];r&&r.type===2&&(r.content=r.content.replace(/^\r?\n/,""))}o===0&&Se.isPreTag(n)&&ul--,sa===e&&(ki=$e.inVPre=!1,sa=null),$e.inXML&&(Le[0]?Le[0].ns:Se.ns)===0&&($e.inXML=!1);{const r=e.props;if(!$e.inSFCRoot&&Ki("COMPILER_NATIVE_TEMPLATE",Se)&&e.tag==="template"&&!vc(e)){const l=Le[0]||No,c=l.children.indexOf(e);l.children.splice(c,1,...e.children)}const a=r.find(l=>l.type===6&&l.name==="inline-template");a&&Oo("COMPILER_INLINE_TEMPLATE",Se,a.loc)&&e.children.length&&(a.value={type:2,content:Xe(e.children[0].loc.start.offset,e.children[e.children.length-1].loc.end.offset),loc:a.loc})}}function Oy(e,t){let i=e;for(;li.charCodeAt(i)!==t&&i<li.length-1;)i++;return i}function vd(e,t){let i=e;for(;li.charCodeAt(i)!==t&&i>=0;)i--;return i}const My=new Set(["if","else","else-if","for","slot"]);function vc({tag:e,props:t}){if(e==="template"){for(let i=0;i<t.length;i++)if(t[i].type===7&&My.has(t[i].name))return!0}return!1}function Ny({tag:e,props:t}){if(Se.isCustomElement(e))return!1;if(e==="component"||Ly(e.charCodeAt(0))||pd(e)||Se.isBuiltInComponent&&Se.isBuiltInComponent(e)||Se.isNativeTag&&!Se.isNativeTag(e))return!0;for(let i=0;i<t.length;i++){const n=t[i];if(n.type===6){if(n.name==="is"&&n.value){if(n.value.content.startsWith("vue:"))return!0;if(Oo("COMPILER_IS_ON_ELEMENT",Se,n.loc))return!0}}else if(n.name==="bind"&&zi(n.arg,"is")&&Oo("COMPILER_IS_ON_ELEMENT",Se,n.loc))return!0}return!1}function Ly(e){return e>64&&e<91}const Dy=/\r\n/g;function bd(e){const t=Se.whitespace!=="preserve";let i=!1;for(let n=0;n<e.length;n++){const o=e[n];if(o.type===2)if(ul)o.content=o.content.replace(Dy,`
`);else if(Fy(o.content)){const s=e[n-1]&&e[n-1].type,r=e[n+1]&&e[n+1].type;!s||!r||t&&(s===3&&(r===3||r===1)||s===1&&(r===3||r===1&&qy(o.content)))?(i=!0,e[n]=null):o.content=" "}else t&&(o.content=wd(o.content))}return i?e.filter(Boolean):e}function Fy(e){for(let t=0;t<e.length;t++)if(!_t(e.charCodeAt(t)))return!1;return!0}function qy(e){for(let t=0;t<e.length;t++){const i=e.charCodeAt(t);if(i===10||i===13)return!0}return!1}function wd(e){let t="",i=!1;for(let n=0;n<e.length;n++)_t(e.charCodeAt(n))?i||(t+=" ",i=!0):(t+=e[n],i=!1);return t}function ra(e){(Le[0]||No).children.push(e)}function Ue(e,t){return{start:$e.getPos(e),end:t==null?t:$e.getPos(t),source:t==null?t:Xe(e,t)}}function $y(e){return Ue(e.start.offset,e.end.offset)}function ji(e,t){e.end=$e.getPos(t),e.source=Xe(e.start.offset,t)}function Uy(e){const t={type:6,name:e.rawName,nameLoc:Ue(e.loc.start.offset,e.loc.start.offset+e.rawName.length),value:void 0,loc:e.loc};if(e.exp){const i=e.exp.loc;i.end.offset<e.loc.end.offset&&(i.start.offset--,i.start.column--,i.end.offset++,i.end.column++),t.value={type:2,content:e.exp.content,loc:i}}return t}function hs(e,t=!1,i,n=0,o=0){return he(e,t,i,n)}function Xt(e,t,i){Se.onError(Fe(e,Ue(t,t)))}function By(){$e.reset(),ct=null,de=null,vt="",ti=-1,qi=-1,Le.length=0}function zy(e,t){if(By(),li=e,Se=fe({},yd),t){let o;for(o in t)t[o]!=null&&(Se[o]=t[o])}$e.mode=Se.parseMode==="html"?1:Se.parseMode==="sfc"?2:0,$e.inXML=Se.ns===1||Se.ns===2;const i=t&&t.delimiters;i&&($e.delimiterOpen=qs(i[0]),$e.delimiterClose=qs(i[1]));const n=No=py([],e);return $e.parse(li),n.loc=Ue(0,e.length),n.children=bd(n.children),No=null,n}function jy(e,t){ds(e,void 0,t,!!Td(e))}function Td(e){const t=e.children.filter(i=>i.type!==3);return t.length===1&&t[0].type===1&&!Us(t[0])?t[0]:null}function ds(e,t,i,n=!1,o=!1){const{children:s}=e,r=[];for(let h=0;h<s.length;h++){const u=s[h];if(u.type===1&&u.tagType===0){const p=n?0:Ct(u,i);if(p>0){if(p>=2){u.codegenNode.patchFlag=-1,r.push(u);continue}}else{const d=u.codegenNode;if(d.type===13){const m=d.patchFlag;if((m===void 0||m===512||m===1)&&Sd(u,i)>=2){const f=kd(u);f&&(d.props=i.hoist(f))}d.dynamicProps&&(d.dynamicProps=i.hoist(d.dynamicProps))}}}else if(u.type===12&&(n?0:Ct(u,i))>=2){u.codegenNode.type===14&&u.codegenNode.arguments.length>0&&u.codegenNode.arguments.push("-1"),r.push(u);continue}if(u.type===1){const p=u.tagType===1;p&&i.scopes.vSlot++,ds(u,e,i,!1,o),p&&i.scopes.vSlot--}else if(u.type===11)ds(u,e,i,u.children.length===1,!0);else if(u.type===9)for(let p=0;p<u.branches.length;p++)ds(u.branches[p],e,i,u.branches[p].children.length===1,o)}let a=!1;if(r.length===s.length&&e.type===1){if(e.tagType===0&&e.codegenNode&&e.codegenNode.type===13&&Q(e.codegenNode.children))e.codegenNode.children=l(Hi(e.codegenNode.children)),a=!0;else if(e.tagType===1&&e.codegenNode&&e.codegenNode.type===13&&e.codegenNode.children&&!Q(e.codegenNode.children)&&e.codegenNode.children.type===15){const h=c(e.codegenNode,"default");h&&(h.returns=l(Hi(h.returns)),a=!0)}else if(e.tagType===3&&t&&t.type===1&&t.tagType===1&&t.codegenNode&&t.codegenNode.type===13&&t.codegenNode.children&&!Q(t.codegenNode.children)&&t.codegenNode.children.type===15){const h=Lt(e,"slot",!0),u=h&&h.arg&&c(t.codegenNode,h.arg);u&&(u.returns=l(Hi(u.returns)),a=!0)}}if(!a)for(const h of r)h.codegenNode=i.cache(h.codegenNode);function l(h){const u=i.cache(h);return u.needArraySpread=!0,u}function c(h,u){if(h.children&&!Q(h.children)&&h.children.type===15){const p=h.children.properties.find(d=>d.key===u||d.key.content===u);return p&&p.value}}r.length&&i.transformHoist&&i.transformHoist(s,i,e)}function Ct(e,t){const{constantCache:i}=t;switch(e.type){case 1:if(e.tagType!==0)return 0;const n=i.get(e);if(n!==void 0)return n;const o=e.codegenNode;if(o.type!==13||o.isBlock&&e.tag!=="svg"&&e.tag!=="foreignObject"&&e.tag!=="math")return 0;if(o.patchFlag===void 0){let r=3;const a=Sd(e,t);if(a===0)return i.set(e,0),0;a<r&&(r=a);for(let l=0;l<e.children.length;l++){const c=Ct(e.children[l],t);if(c===0)return i.set(e,0),0;c<r&&(r=c)}if(r>1)for(let l=0;l<e.props.length;l++){const c=e.props[l];if(c.type===7&&c.name==="bind"&&c.exp){const h=Ct(c.exp,t);if(h===0)return i.set(e,0),0;h<r&&(r=h)}}if(o.isBlock){for(let l=0;l<e.props.length;l++)if(e.props[l].type===7)return i.set(e,0),0;t.removeHelper(Xi),t.removeHelper(jn(t.inSSR,o.isComponent)),o.isBlock=!1,t.helper(zn(t.inSSR,o.isComponent))}return i.set(e,r),r}else return i.set(e,0),0;case 2:case 3:return 3;case 9:case 11:case 10:return 0;case 5:case 12:return Ct(e.content,t);case 4:return e.constType;case 8:let s=3;for(let r=0;r<e.children.length;r++){const a=e.children[r];if(le(a)||kt(a))continue;const l=Ct(a,t);if(l===0)return 0;l<s&&(s=l)}return s;case 20:return 2;default:return 0}}const Wy=new Set([il,nl,Eo,jo]);function xd(e,t){if(e.type===14&&!le(e.callee)&&Wy.has(e.callee)){const i=e.arguments[0];if(i.type===4)return Ct(i,t);if(i.type===14)return xd(i,t)}return 0}function Sd(e,t){let i=3;const n=kd(e);if(n&&n.type===15){const{properties:o}=n;for(let s=0;s<o.length;s++){const{key:r,value:a}=o[s],l=Ct(r,t);if(l===0)return l;l<i&&(i=l);let c;if(a.type===4?c=Ct(a,t):a.type===14?c=xd(a,t):c=0,c===0)return c;c<i&&(i=c)}}return i}function kd(e){const t=e.codegenNode;if(t.type===13)return t.props}function Gy(e,{filename:t="",prefixIdentifiers:i=!1,hoistStatic:n=!1,hmr:o=!1,cacheHandlers:s=!1,nodeTransforms:r=[],directiveTransforms:a={},transformHoist:l=null,isBuiltInComponent:c=nt,isCustomElement:h=nt,expressionPlugins:u=[],scopeId:p=null,slotted:d=!0,ssr:m=!1,inSSR:f=!1,ssrCssVars:x="",bindingMetadata:P=pe,inline:A=!1,isTS:b=!1,onError:S=ll,onWarn:_=dd,compatConfig:C}){const R=t.replace(/\?.*$/,"").match(/([^/\\]+)\.\w+$/),w={filename:t,selfName:R&&nn(Ne(R[1])),prefixIdentifiers:i,hoistStatic:n,hmr:o,cacheHandlers:s,nodeTransforms:r,directiveTransforms:a,transformHoist:l,isBuiltInComponent:c,isCustomElement:h,expressionPlugins:u,scopeId:p,slotted:d,ssr:m,inSSR:f,ssrCssVars:x,bindingMetadata:P,inline:A,isTS:b,onError:S,onWarn:_,compatConfig:C,root:e,helpers:new Map,components:new Set,directives:new Set,hoists:[],imports:[],cached:[],constantCache:new WeakMap,temps:0,identifiers:Object.create(null),scopes:{vFor:0,vSlot:0,vPre:0,vOnce:0},parent:null,grandParent:null,currentNode:e,childIndex:0,inVOnce:!1,helper(y){const E=w.helpers.get(y)||0;return w.helpers.set(y,E+1),y},removeHelper(y){const E=w.helpers.get(y);if(E){const O=E-1;O?w.helpers.set(y,O):w.helpers.delete(y)}},helperString(y){return`_${Un[w.helper(y)]}`},replaceNode(y){w.parent.children[w.childIndex]=w.currentNode=y},removeNode(y){const E=w.parent.children,O=y?E.indexOf(y):w.currentNode?w.childIndex:-1;!y||y===w.currentNode?(w.currentNode=null,w.onNodeRemoved()):w.childIndex>O&&(w.childIndex--,w.onNodeRemoved()),w.parent.children.splice(O,1)},onNodeRemoved:nt,addIdentifiers(y){},removeIdentifiers(y){},hoist(y){le(y)&&(y=he(y)),w.hoists.push(y);const E=he(`_hoisted_${w.hoists.length}`,!1,y.loc,2);return E.hoisted=y,E},cache(y,E=!1,O=!1){const k=fy(w.cached.length,y,E,O);return w.cached.push(k),k}};return w.filters=new Set,w}function Vy(e,t){const i=Gy(e,t);pr(e,i),t.hoistStatic&&jy(e,i),t.ssr||Hy(e,i),e.helpers=new Set([...i.helpers.keys()]),e.components=[...i.components],e.directives=[...i.directives],e.imports=i.imports,e.hoists=i.hoists,e.temps=i.temps,e.cached=i.cached,e.transformed=!0,e.filters=[...i.filters]}function Hy(e,t){const{helper:i}=t,{children:n}=e;if(n.length===1){const o=Td(e);if(o&&o.codegenNode){const s=o.codegenNode;s.type===13&&al(s,t),e.codegenNode=s}else e.codegenNode=n[0]}else if(n.length>1){let o=64;e.codegenNode=Ro(t,i(Co),void 0,e.children,o,void 0,void 0,!0,void 0,!1)}}function Ky(e,t){let i=0;const n=()=>{i--};for(;i<e.children.length;i++){const o=e.children[i];le(o)||(t.grandParent=t.parent,t.parent=e,t.childIndex=i,t.onNodeRemoved=n,pr(o,t))}}function pr(e,t){t.currentNode=e;const{nodeTransforms:i}=t,n=[];for(let s=0;s<i.length;s++){const r=i[s](e,t);if(r&&(Q(r)?n.push(...r):n.push(r)),t.currentNode)e=t.currentNode;else return}switch(e.type){case 3:t.ssr||t.helper(zo);break;case 5:t.ssr||t.helper(hr);break;case 9:for(let s=0;s<e.branches.length;s++)pr(e.branches[s],t);break;case 10:case 11:case 1:case 0:Ky(e,t);break}t.currentNode=e;let o=n.length;for(;o--;)n[o]()}function Ad(e,t){const i=le(e)?n=>n===e:n=>e.test(n);return(n,o)=>{if(n.type===1){const{props:s}=n;if(n.tagType===3&&s.some(Iy))return;const r=[];for(let a=0;a<s.length;a++){const l=s[a];if(l.type===7&&i(l.name)){s.splice(a,1),a--;const c=t(n,l,o);c&&r.push(c)}}return r}}}const fr="/*@__PURE__*/",Id=e=>`${Un[e]}: _${Un[e]}`;function Yy(e,{mode:t="function",prefixIdentifiers:i=t==="module",sourceMap:n=!1,filename:o="template.vue.html",scopeId:s=null,optimizeImports:r=!1,runtimeGlobalName:a="Vue",runtimeModuleName:l="vue",ssrRuntimeModuleName:c="vue/server-renderer",ssr:h=!1,isTS:u=!1,inSSR:p=!1}){const d={mode:t,prefixIdentifiers:i,sourceMap:n,filename:o,scopeId:s,optimizeImports:r,runtimeGlobalName:a,runtimeModuleName:l,ssrRuntimeModuleName:c,ssr:h,isTS:u,inSSR:p,source:e.source,code:"",column:1,line:1,offset:0,indentLevel:0,pure:!1,map:void 0,helper(f){return`_${Un[f]}`},push(f,x=-2,P){d.code+=f},indent(){m(++d.indentLevel)},deindent(f=!1){f?--d.indentLevel:m(--d.indentLevel)},newline(){m(d.indentLevel)}};function m(f){d.push(`
`+"  ".repeat(f),0)}return d}function Jy(e,t={}){const i=Yy(e,t);t.onContextCreated&&t.onContextCreated(i);const{mode:n,push:o,prefixIdentifiers:s,indent:r,deindent:a,newline:l,scopeId:c,ssr:h}=i,u=Array.from(e.helpers),p=u.length>0,d=!s&&n!=="module";Qy(e,i);const f=h?"ssrRender":"render",P=(h?["_ctx","_push","_parent","_attrs"]:["_ctx","_cache"]).join(", ");if(o(`function ${f}(${P}) {`),r(),d&&(o("with (_ctx) {"),r(),p&&(o(`const { ${u.map(Id).join(", ")} } = _Vue
`,-1),l())),e.components.length&&(Or(e.components,"component",i),(e.directives.length||e.temps>0)&&l()),e.directives.length&&(Or(e.directives,"directive",i),e.temps>0&&l()),e.filters&&e.filters.length&&(l(),Or(e.filters,"filter",i),l()),e.temps>0){o("let ");for(let A=0;A<e.temps;A++)o(`${A>0?", ":""}_temp${A}`)}return(e.components.length||e.directives.length||e.temps)&&(o(`
`,0),l()),h||o("return "),e.codegenNode?dt(e.codegenNode,i):o("null"),d&&(a(),o("}")),a(),o("}"),{ast:e,code:i.code,preamble:"",map:i.map?i.map.toJSON():void 0}}function Qy(e,t){const{ssr:i,prefixIdentifiers:n,push:o,newline:s,runtimeModuleName:r,runtimeGlobalName:a,ssrRuntimeModuleName:l}=t,c=a,h=Array.from(e.helpers);if(h.length>0&&(o(`const _Vue = ${c}
`,-1),e.hoists.length)){const u=[Ha,Ka,zo,Ya,ld].filter(p=>h.includes(p)).map(Id).join(", ");o(`const { ${u} } = _Vue
`,-1)}Zy(e.hoists,t),s(),o("return ")}function Or(e,t,{helper:i,push:n,newline:o,isTS:s}){const r=i(t==="filter"?Xa:t==="component"?Ja:Za);for(let a=0;a<e.length;a++){let l=e[a];const c=l.endsWith("__self");c&&(l=l.slice(0,-6)),n(`const ${Mo(l,t)} = ${r}(${JSON.stringify(l)}${c?", true":""})${s?"!":""}`),a<e.length-1&&o()}}function Zy(e,t){if(!e.length)return;t.pure=!0;const{push:i,newline:n}=t;n();for(let o=0;o<e.length;o++){const s=e[o];s&&(i(`const _hoisted_${o+1} = `),dt(s,t),n())}t.pure=!1}function hl(e,t){const i=e.length>3||!1;t.push("["),i&&t.indent(),Wo(e,t,i),i&&t.deindent(),t.push("]")}function Wo(e,t,i=!1,n=!0){const{push:o,newline:s}=t;for(let r=0;r<e.length;r++){const a=e[r];le(a)?o(a,-3):Q(a)?hl(a,t):dt(a,t),r<e.length-1&&(i?(n&&o(","),s()):n&&o(", "))}}function dt(e,t){if(le(e)){t.push(e,-3);return}if(kt(e)){t.push(t.helper(e));return}switch(e.type){case 1:case 9:case 11:dt(e.codegenNode,t);break;case 2:Xy(e,t);break;case 4:Pd(e,t);break;case 5:ev(e,t);break;case 12:dt(e.codegenNode,t);break;case 8:_d(e,t);break;case 3:iv(e,t);break;case 13:nv(e,t);break;case 14:sv(e,t);break;case 15:rv(e,t);break;case 17:av(e,t);break;case 18:lv(e,t);break;case 19:cv(e,t);break;case 20:uv(e,t);break;case 21:Wo(e.body,t,!0,!1);break}}function Xy(e,t){t.push(JSON.stringify(e.content),-3,e)}function Pd(e,t){const{content:i,isStatic:n}=e;t.push(n?JSON.stringify(i):i,-3,e)}function ev(e,t){const{push:i,helper:n,pure:o}=t;o&&i(fr),i(`${n(hr)}(`),dt(e.content,t),i(")")}function _d(e,t){for(let i=0;i<e.children.length;i++){const n=e.children[i];le(n)?t.push(n,-3):dt(n,t)}}function tv(e,t){const{push:i}=t;if(e.type===8)i("["),_d(e,t),i("]");else if(e.isStatic){const n=cl(e.content)?e.content:JSON.stringify(e.content);i(n,-2,e)}else i(`[${e.content}]`,-3,e)}function iv(e,t){const{push:i,helper:n,pure:o}=t;o&&i(fr),i(`${n(zo)}(${JSON.stringify(e.content)})`,-3,e)}function nv(e,t){const{push:i,helper:n,pure:o}=t,{tag:s,props:r,children:a,patchFlag:l,dynamicProps:c,directives:h,isBlock:u,disableTracking:p,isComponent:d}=e;let m;l&&(m=String(l)),h&&i(n(el)+"("),u&&i(`(${n(Xi)}(${p?"true":""}), `),o&&i(fr);const f=u?jn(t.inSSR,d):zn(t.inSSR,d);i(n(f)+"(",-2,e),Wo(ov([s,r,a,m,c]),t),i(")"),u&&i(")"),h&&(i(", "),dt(h,t),i(")"))}function ov(e){let t=e.length;for(;t--&&e[t]==null;);return e.slice(0,t+1).map(i=>i||"null")}function sv(e,t){const{push:i,helper:n,pure:o}=t,s=le(e.callee)?e.callee:n(e.callee);o&&i(fr),i(s+"(",-2,e),Wo(e.arguments,t),i(")")}function rv(e,t){const{push:i,indent:n,deindent:o,newline:s}=t,{properties:r}=e;if(!r.length){i("{}",-2,e);return}const a=r.length>1||!1;i(a?"{":"{ "),a&&n();for(let l=0;l<r.length;l++){const{key:c,value:h}=r[l];tv(c,t),i(": "),dt(h,t),l<r.length-1&&(i(","),s())}a&&o(),i(a?"}":" }")}function av(e,t){hl(e.elements,t)}function lv(e,t){const{push:i,indent:n,deindent:o}=t,{params:s,returns:r,body:a,newline:l,isSlot:c}=e;c&&i(`_${Un[sl]}(`),i("(",-2,e),Q(s)?Wo(s,t):s&&dt(s,t),i(") => "),(l||a)&&(i("{"),n()),r?(l&&i("return "),Q(r)?hl(r,t):dt(r,t)):a&&dt(a,t),(l||a)&&(o(),i("}")),c&&(e.isNonScopedSlot&&i(", undefined, true"),i(")"))}function cv(e,t){const{test:i,consequent:n,alternate:o,newline:s}=e,{push:r,indent:a,deindent:l,newline:c}=t;if(i.type===4){const u=!cl(i.content);u&&r("("),Pd(i,t),u&&r(")")}else r("("),dt(i,t),r(")");s&&a(),t.indentLevel++,s||r(" "),r("? "),dt(n,t),t.indentLevel--,s&&c(),s||r(" "),r(": ");const h=o.type===19;h||t.indentLevel++,dt(o,t),h||t.indentLevel--,s&&l(!0)}function uv(e,t){const{push:i,helper:n,indent:o,deindent:s,newline:r}=t,{needPauseTracking:a,needArraySpread:l}=e;l&&i("[...("),i(`_cache[${e.index}] || (`),a&&(o(),i(`${n(Fs)}(-1`),e.inVOnce&&i(", true"),i("),"),r(),i("(")),i(`_cache[${e.index}] = `),dt(e.value,t),a&&(i(`).cacheIndex = ${e.index},`),r(),i(`${n(Fs)}(1),`),r(),i(`_cache[${e.index}]`),s()),i(")"),l&&i(")]")}new RegExp("\\b"+"arguments,await,break,case,catch,class,const,continue,debugger,default,delete,do,else,export,extends,finally,for,function,if,import,let,new,return,super,switch,throw,try,var,void,while,with,yield".split(",").join("\\b|\\b")+"\\b");const hv=Ad(/^(?:if|else|else-if)$/,(e,t,i)=>dv(e,t,i,(n,o,s)=>{const r=i.parent.children;let a=r.indexOf(n),l=0;for(;a-->=0;){const c=r[a];c&&c.type===9&&(l+=c.branches.length)}return()=>{if(s)n.codegenNode=wc(o,l,i);else{const c=pv(n.codegenNode);c.alternate=wc(o,l+n.branches.length-1,i)}}}));function dv(e,t,i,n){if(t.name!=="else"&&(!t.exp||!t.exp.content.trim())){const o=t.exp?t.exp.loc:e.loc;i.onError(Fe(28,t.loc)),t.exp=he("true",!1,o)}if(t.name==="if"){const o=bc(e,t),s={type:9,loc:$y(e.loc),branches:[o]};if(i.replaceNode(s),n)return n(s,o,!0)}else{const o=i.parent.children;let s=o.indexOf(e);for(;s-->=-1;){const r=o[s];if(r&&r.type===3){i.removeNode(r);continue}if(r&&r.type===2&&!r.content.trim().length){i.removeNode(r);continue}if(r&&r.type===9){(t.name==="else-if"||t.name==="else")&&r.branches[r.branches.length-1].condition===void 0&&i.onError(Fe(30,e.loc)),i.removeNode();const a=bc(e,t);r.branches.push(a);const l=n&&n(r,a,!1);pr(a,i),l&&l(),i.currentNode=null}else i.onError(Fe(30,e.loc));break}}}function bc(e,t){const i=e.tagType===3;return{type:10,loc:e.loc,condition:t.name==="else"?void 0:t.exp,children:i&&!Lt(e,"for")?e.children:[e],userKey:dr(e,"key"),isTemplateIf:i}}function wc(e,t,i){return e.condition?oa(e.condition,Tc(e,t,i),Ve(i.helper(zo),['""',"true"])):Tc(e,t,i)}function Tc(e,t,i){const{helper:n}=i,o=ze("key",he(`${t}`,!1,Mt,2)),{children:s}=e,r=s[0];if(s.length!==1||r.type!==1)if(s.length===1&&r.type===11){const l=r.codegenNode;return Bs(l,o,i),l}else return Ro(i,n(Co),Dt([o]),s,64,void 0,void 0,!0,!1,!1,e.loc);else{const l=r.codegenNode,c=_y(l);return c.type===13&&al(c,i),Bs(c,o,i),l}}function pv(e){for(;;)if(e.type===19)if(e.alternate.type===19)e=e.alternate;else return e;else e.type===20&&(e=e.value)}const fv=(e,t,i)=>{const{modifiers:n,loc:o}=e,s=e.arg;let{exp:r}=e;if(r&&r.type===4&&!r.content.trim()&&(r=void 0),!r){if(s.type!==4||!s.isStatic)return i.onError(Fe(52,s.loc)),{props:[ze(s,he("",!0,o))]};Cd(e),r=e.exp}return s.type!==4?(s.children.unshift("("),s.children.push(') || ""')):s.isStatic||(s.content=s.content?`${s.content} || ""`:'""'),n.some(a=>a.content==="camel")&&(s.type===4?s.isStatic?s.content=Ne(s.content):s.content=`${i.helperString(ia)}(${s.content})`:(s.children.unshift(`${i.helperString(ia)}(`),s.children.push(")"))),i.inSSR||(n.some(a=>a.content==="prop")&&xc(s,"."),n.some(a=>a.content==="attr")&&xc(s,"^")),{props:[ze(s,r)]}},Cd=(e,t)=>{const i=e.arg,n=Ne(i.content);e.exp=he(n,!1,i.loc)},xc=(e,t)=>{e.type===4?e.isStatic?e.content=t+e.content:e.content=`\`${t}\${${e.content}}\``:(e.children.unshift(`'${t}' + (`),e.children.push(")"))},mv=Ad("for",(e,t,i)=>{const{helper:n,removeHelper:o}=i;return gv(e,t,i,s=>{const r=Ve(n(tl),[s.source]),a=$s(e),l=Lt(e,"memo"),c=dr(e,"key",!1,!0);c&&c.type===7&&!c.exp&&Cd(c);let u=c&&(c.type===6?c.value?he(c.value.content,!0):void 0:c.exp);const p=c&&u?ze("key",u):null,d=s.source.type===4&&s.source.constType>0,m=d?64:c?128:256;return s.codegenNode=Ro(i,n(Co),void 0,r,m,void 0,void 0,!0,!d,!1,e.loc),()=>{let f;const{children:x}=s,P=x.length!==1||x[0].type!==1,A=Us(e)?e:a&&e.children.length===1&&Us(e.children[0])?e.children[0]:null;if(A?(f=A.codegenNode,a&&p&&Bs(f,p,i)):P?f=Ro(i,n(Co),p?Dt([p]):void 0,e.children,64,void 0,void 0,!0,void 0,!1):(f=x[0].codegenNode,a&&p&&Bs(f,p,i),f.isBlock!==!d&&(f.isBlock?(o(Xi),o(jn(i.inSSR,f.isComponent))):o(zn(i.inSSR,f.isComponent))),f.isBlock=!d,f.isBlock?(n(Xi),n(jn(i.inSSR,f.isComponent))):n(zn(i.inSSR,f.isComponent))),l){const b=Bn(aa(s.parseResult,[he("_cached")]));b.body=my([jt(["const _memo = (",l.exp,")"]),jt(["if (_cached",...u?[" && _cached.key === ",u]:[],` && ${i.helperString(hd)}(_cached, _memo)) return _cached`]),jt(["const _item = ",f]),he("_item.memo = _memo"),he("return _item")]),r.arguments.push(b,he("_cache"),he(String(i.cached.length))),i.cached.push(null)}else r.arguments.push(Bn(aa(s.parseResult),f,!0))}})});function gv(e,t,i,n){if(!t.exp){i.onError(Fe(31,t.loc));return}const o=t.forParseResult;if(!o){i.onError(Fe(32,t.loc));return}Ed(o);const{addIdentifiers:s,removeIdentifiers:r,scopes:a}=i,{source:l,value:c,key:h,index:u}=o,p={type:11,loc:t.loc,source:l,valueAlias:c,keyAlias:h,objectIndexAlias:u,parseResult:o,children:$s(e)?e.children:[e]};i.replaceNode(p),a.vFor++;const d=n&&n(p);return()=>{a.vFor--,d&&d()}}function Ed(e,t){e.finalized||(e.finalized=!0)}function aa({value:e,key:t,index:i},n=[]){return yv([e,t,i,...n])}function yv(e){let t=e.length;for(;t--&&!e[t];);return e.slice(0,t+1).map((i,n)=>i||he("_".repeat(n+1),!1))}const Sc=he("undefined",!1),vv=(e,t)=>{if(e.type===1&&(e.tagType===1||e.tagType===3)){const i=Lt(e,"slot");if(i)return i.exp,t.scopes.vSlot++,()=>{t.scopes.vSlot--}}},bv=(e,t,i,n)=>Bn(e,i,!1,!0,i.length?i[0].loc:n);function wv(e,t,i=bv){t.helper(sl);const{children:n,loc:o}=e,s=[],r=[];let a=t.scopes.vSlot>0||t.scopes.vFor>0;const l=Lt(e,"slot",!0);if(l){const{arg:x,exp:P}=l;x&&!xt(x)&&(a=!0),s.push(ze(x||he("default",!0),i(P,void 0,n,o)))}let c=!1,h=!1;const u=[],p=new Set;let d=0;for(let x=0;x<n.length;x++){const P=n[x];let A;if(!$s(P)||!(A=Lt(P,"slot",!0))){P.type!==3&&u.push(P);continue}if(l){t.onError(Fe(37,A.loc));break}c=!0;const{children:b,loc:S}=P,{arg:_=he("default",!0),exp:C,loc:R}=A;let w;xt(_)?w=_?_.content:"default":a=!0;const y=Lt(P,"for"),E=i(C,y,b,S);let O,k;if(O=Lt(P,"if"))a=!0,r.push(oa(O.exp,os(_,E,d++),Sc));else if(k=Lt(P,/^else(?:-if)?$/,!0)){let D=x,j;for(;D--&&(j=n[D],!(j.type!==3&&la(j))););if(j&&$s(j)&&Lt(j,/^(?:else-)?if$/)){let G=r[r.length-1];for(;G.alternate.type===19;)G=G.alternate;G.alternate=k.exp?oa(k.exp,os(_,E,d++),Sc):os(_,E,d++)}else t.onError(Fe(30,k.loc))}else if(y){a=!0;const D=y.forParseResult;D?(Ed(D),r.push(Ve(t.helper(tl),[D.source,Bn(aa(D),os(_,E),!0)]))):t.onError(Fe(32,y.loc))}else{if(w){if(p.has(w)){t.onError(Fe(38,R));continue}p.add(w),w==="default"&&(h=!0)}s.push(ze(_,E))}}if(!l){const x=(P,A)=>{const b=i(P,void 0,A,o);return t.compatConfig&&(b.isNonScopedSlot=!0),ze("default",b)};c?u.length&&u.some(P=>la(P))&&(h?t.onError(Fe(39,u[0].loc)):s.push(x(void 0,u))):s.push(x(void 0,n))}const m=a?2:ps(e.children)?3:1;let f=Dt(s.concat(ze("_",he(m+"",!1))),o);return r.length&&(f=Ve(t.helper(ud),[f,Hi(r)])),{slots:f,hasDynamicSlots:a}}function os(e,t,i){const n=[ze("name",e),ze("fn",t)];return i!=null&&n.push(ze("key",he(String(i),!0))),Dt(n)}function ps(e){for(let t=0;t<e.length;t++){const i=e[t];switch(i.type){case 1:if(i.tagType===2||ps(i.children))return!0;break;case 9:if(ps(i.branches))return!0;break;case 10:case 11:if(ps(i.children))return!0;break}}return!1}function la(e){return e.type!==2&&e.type!==12?!0:e.type===2?!!e.content.trim():la(e.content)}const Rd=new WeakMap,Tv=(e,t)=>function(){if(e=t.currentNode,!(e.type===1&&(e.tagType===0||e.tagType===1)))return;const{tag:n,props:o}=e,s=e.tagType===1;let r=s?xv(e,t):`"${n}"`;const a=Ie(r)&&r.callee===Qa;let l,c,h=0,u,p,d,m=a||r===go||r===Va||!s&&(n==="svg"||n==="foreignObject"||n==="math");if(o.length>0){const f=Od(e,t,void 0,s,a);l=f.props,h=f.patchFlag,p=f.dynamicPropNames;const x=f.directives;d=x&&x.length?Hi(x.map(P=>kv(P,t))):void 0,f.shouldUseBlock&&(m=!0)}if(e.children.length>0)if(r===Ls&&(m=!0,h|=1024),s&&r!==go&&r!==Ls){const{slots:x,hasDynamicSlots:P}=wv(e,t);c=x,P&&(h|=1024)}else if(e.children.length===1&&r!==go){const x=e.children[0],P=x.type,A=P===5||P===8;A&&Ct(x,t)===0&&(h|=1),A||P===2?c=x:c=e.children}else c=e.children;p&&p.length&&(u=Av(p)),e.codegenNode=Ro(t,r,l,c,h===0?void 0:h,u,d,!!m,!1,s,e.loc)};function xv(e,t,i=!1){let{tag:n}=e;const o=ca(n),s=dr(e,"is",!1,!0);if(s)if(o||Ki("COMPILER_IS_ON_ELEMENT",t)){let a;if(s.type===6?a=s.value&&he(s.value.content,!0):(a=s.exp,a||(a=he("is",!1,s.arg.loc))),a)return Ve(t.helper(Qa),[a])}else s.type===6&&s.value.content.startsWith("vue:")&&(n=s.value.content.slice(4));const r=pd(n)||t.isBuiltInComponent(n);return r?(i||t.helper(r),r):(t.helper(Ja),t.components.add(n),Mo(n,"component"))}function Od(e,t,i=e.props,n,o,s=!1){const{tag:r,loc:a,children:l}=e;let c=[];const h=[],u=[],p=l.length>0;let d=!1,m=0,f=!1,x=!1,P=!1,A=!1,b=!1,S=!1;const _=[],C=E=>{c.length&&(h.push(Dt(kc(c),a)),c=[]),E&&h.push(E)},R=()=>{t.scopes.vFor>0&&c.push(ze(he("ref_for",!0),he("true")))},w=({key:E,value:O})=>{if(xt(E)){const k=E.content,D=en(k);if(D&&(!n||o)&&k.toLowerCase()!=="onclick"&&k!=="onUpdate:modelValue"&&!_i(k)&&(A=!0),D&&_i(k)&&(S=!0),D&&O.type===14&&(O=O.arguments[0]),O.type===20||(O.type===4||O.type===8)&&Ct(O,t)>0)return;k==="ref"?f=!0:k==="class"?x=!0:k==="style"?P=!0:k!=="key"&&!_.includes(k)&&_.push(k),n&&(k==="class"||k==="style")&&!_.includes(k)&&_.push(k)}else b=!0};for(let E=0;E<i.length;E++){const O=i[E];if(O.type===6){const{loc:k,name:D,nameLoc:j,value:G}=O;let W=!0;if(D==="ref"&&(f=!0,R()),D==="is"&&(ca(r)||G&&G.content.startsWith("vue:")||Ki("COMPILER_IS_ON_ELEMENT",t)))continue;c.push(ze(he(D,!0,j),he(G?G.content:"",W,G?G.loc:k)))}else{const{name:k,arg:D,exp:j,loc:G,modifiers:W}=O,J=k==="bind",K=k==="on";if(k==="slot"){n||t.onError(Fe(40,G));continue}if(k==="once"||k==="memo"||k==="is"||J&&zi(D,"is")&&(ca(r)||Ki("COMPILER_IS_ON_ELEMENT",t))||K&&s)continue;if((J&&zi(D,"key")||K&&p&&zi(D,"vue:before-update"))&&(d=!0),J&&zi(D,"ref")&&R(),!D&&(J||K)){if(b=!0,j)if(J){if(C(),Ki("COMPILER_V_BIND_OBJECT_ORDER",t)){h.unshift(j);continue}R(),C(),h.push(j)}else C({type:14,loc:G,callee:t.helper(ol),arguments:n?[j]:[j,"true"]});else t.onError(Fe(J?34:35,G));continue}J&&W.some(Ce=>Ce.content==="prop")&&(m|=32);const ye=t.directiveTransforms[k];if(ye){const{props:Ce,needRuntime:He}=ye(O,e,t);!s&&Ce.forEach(w),K&&D&&!xt(D)?C(Dt(Ce,a)):c.push(...Ce),He&&(u.push(O),kt(He)&&Rd.set(O,He))}else Ap(k)||(u.push(O),p&&(d=!0))}}let y;if(h.length?(C(),h.length>1?y=Ve(t.helper(Ds),h,a):y=h[0]):c.length&&(y=Dt(kc(c),a)),b?m|=16:(x&&!n&&(m|=2),P&&!n&&(m|=4),_.length&&(m|=8),A&&(m|=32)),!d&&(m===0||m===32)&&(f||S||u.length>0)&&(m|=512),!t.inSSR&&y)switch(y.type){case 15:let E=-1,O=-1,k=!1;for(let G=0;G<y.properties.length;G++){const W=y.properties[G].key;xt(W)?W.content==="class"?E=G:W.content==="style"&&(O=G):W.isHandlerKey||(k=!0)}const D=y.properties[E],j=y.properties[O];k?y=Ve(t.helper(Eo),[y]):(D&&!xt(D.value)&&(D.value=Ve(t.helper(il),[D.value])),j&&(P||j.value.type===4&&j.value.content.trim()[0]==="["||j.value.type===17)&&(j.value=Ve(t.helper(nl),[j.value])));break;case 14:break;default:y=Ve(t.helper(Eo),[Ve(t.helper(jo),[y])]);break}return{props:y,directives:u,patchFlag:m,dynamicPropNames:_,shouldUseBlock:d}}function kc(e){const t=new Map,i=[];for(let n=0;n<e.length;n++){const o=e[n];if(o.key.type===8||!o.key.isStatic){i.push(o);continue}const s=o.key.content,r=t.get(s);r?(s==="style"||s==="class"||en(s))&&Sv(r,o):(t.set(s,o),i.push(o))}return i}function Sv(e,t){e.value.type===17?e.value.elements.push(t.value):e.value=Hi([e.value,t.value],e.loc)}function kv(e,t){const i=[],n=Rd.get(e);n?i.push(t.helperString(n)):(t.helper(Za),t.directives.add(e.name),i.push(Mo(e.name,"directive")));const{loc:o}=e;if(e.exp&&i.push(e.exp),e.arg&&(e.exp||i.push("void 0"),i.push(e.arg)),Object.keys(e.modifiers).length){e.arg||(e.exp||i.push("void 0"),i.push("void 0"));const s=he("true",!1,o);i.push(Dt(e.modifiers.map(r=>ze(r,s)),o))}return Hi(i,e.loc)}function Av(e){let t="[";for(let i=0,n=e.length;i<n;i++)t+=JSON.stringify(e[i]),i<n-1&&(t+=", ");return t+"]"}function ca(e){return e==="component"||e==="Component"}const Iv=(e,t)=>{if(Us(e)){const{children:i,loc:n}=e,{slotName:o,slotProps:s}=Pv(e,t),r=[t.prefixIdentifiers?"_ctx.$slots":"$slots",o,"{}","undefined","true"];let a=2;s&&(r[2]=s,a=3),i.length&&(r[3]=Bn([],i,!1,!1,n),a=4),t.scopeId&&!t.slotted&&(a=5),r.splice(a),e.codegenNode=Ve(t.helper(cd),r,n)}};function Pv(e,t){let i='"default"',n;const o=[];for(let s=0;s<e.props.length;s++){const r=e.props[s];if(r.type===6)r.value&&(r.name==="name"?i=JSON.stringify(r.value.content):(r.name=Ne(r.name),o.push(r)));else if(r.name==="bind"&&zi(r.arg,"name")){if(r.exp)i=r.exp;else if(r.arg&&r.arg.type===4){const a=Ne(r.arg.content);i=r.exp=he(a,!1,r.arg.loc)}}else r.name==="bind"&&r.arg&&xt(r.arg)&&(r.arg.content=Ne(r.arg.content)),o.push(r)}if(o.length>0){const{props:s,directives:r}=Od(e,t,o,!1,!1);n=s,r.length&&t.onError(Fe(36,r[0].loc))}return{slotName:i,slotProps:n}}const Md=(e,t,i,n)=>{const{loc:o,modifiers:s,arg:r}=e;!e.exp&&!s.length&&i.onError(Fe(35,o));let a;if(r.type===4)if(r.isStatic){let u=r.content;u.startsWith("vue:")&&(u=`vnode-${u.slice(4)}`);const p=t.tagType!==0||u.startsWith("vnode")||!/[A-Z]/.test(u)?Rn(Ne(u)):`on:${u}`;a=he(p,!0,r.loc)}else a=jt([`${i.helperString(na)}(`,r,")"]);else a=r,a.children.unshift(`${i.helperString(na)}(`),a.children.push(")");let l=e.exp;l&&!l.content.trim()&&(l=void 0);let c=i.cacheHandlers&&!l&&!i.inVOnce;if(l){const u=md(l),p=!(u||ky(l)),d=l.content.includes(";");(p||c&&u)&&(l=jt([`${p?"$event":"(...args)"} => ${d?"{":"("}`,l,d?"}":")"]))}let h={props:[ze(a,l||he("() => {}",!1,o))]};return n&&(h=n(h)),c&&(h.props[0].value=i.cache(h.props[0].value)),h.props.forEach(u=>u.key.isHandlerKey=!0),h},_v=(e,t)=>{if(e.type===0||e.type===1||e.type===11||e.type===10)return()=>{const i=e.children;let n,o=!1;for(let s=0;s<i.length;s++){const r=i[s];if(Rr(r)){o=!0;for(let a=s+1;a<i.length;a++){const l=i[a];if(Rr(l))n||(n=i[s]=jt([r],r.loc)),n.children.push(" + ",l),i.splice(a,1),a--;else{n=void 0;break}}}}if(!(!o||i.length===1&&(e.type===0||e.type===1&&e.tagType===0&&!e.props.find(s=>s.type===7&&!t.directiveTransforms[s.name])&&e.tag!=="template")))for(let s=0;s<i.length;s++){const r=i[s];if(Rr(r)||r.type===8){const a=[];(r.type!==2||r.content!==" ")&&a.push(r),!t.ssr&&Ct(r,t)===0&&a.push("1"),i[s]={type:12,content:r,loc:r.loc,codegenNode:Ve(t.helper(Ya),a)}}}}},Ac=new WeakSet,Cv=(e,t)=>{if(e.type===1&&Lt(e,"once",!0))return Ac.has(e)||t.inVOnce||t.inSSR?void 0:(Ac.add(e),t.inVOnce=!0,t.helper(Fs),()=>{t.inVOnce=!1;const i=t.currentNode;i.codegenNode&&(i.codegenNode=t.cache(i.codegenNode,!0,!0))})},Nd=(e,t,i)=>{const{exp:n,arg:o}=e;if(!n)return i.onError(Fe(41,e.loc)),ss();const s=n.loc.source.trim(),r=n.type===4?n.content:s,a=i.bindingMetadata[s];if(a==="props"||a==="props-aliased")return i.onError(Fe(44,n.loc)),ss();if(!r.trim()||!md(n))return i.onError(Fe(42,n.loc)),ss();const l=o||he("modelValue",!0),c=o?xt(o)?`onUpdate:${Ne(o.content)}`:jt(['"onUpdate:" + ',o]):"onUpdate:modelValue";let h;const u=i.isTS?"($event: any)":"$event";h=jt([`${u} => ((`,n,") = $event)"]);const p=[ze(l,e.exp),ze(c,h)];if(e.modifiers.length&&t.tagType===1){const d=e.modifiers.map(f=>f.content).map(f=>(cl(f)?f:JSON.stringify(f))+": true").join(", "),m=o?xt(o)?`${o.content}Modifiers`:jt([o,' + "Modifiers"']):"modelModifiers";p.push(ze(m,he(`{ ${d} }`,!1,e.loc,2)))}return ss(p)};function ss(e=[]){return{props:e}}const Ev=/[\w).+\-_$\]]/,Rv=(e,t)=>{Ki("COMPILER_FILTERS",t)&&(e.type===5?zs(e.content,t):e.type===1&&e.props.forEach(i=>{i.type===7&&i.name!=="for"&&i.exp&&zs(i.exp,t)}))};function zs(e,t){if(e.type===4)Ic(e,t);else for(let i=0;i<e.children.length;i++){const n=e.children[i];typeof n=="object"&&(n.type===4?Ic(n,t):n.type===8?zs(e,t):n.type===5&&zs(n.content,t))}}function Ic(e,t){const i=e.content;let n=!1,o=!1,s=!1,r=!1,a=0,l=0,c=0,h=0,u,p,d,m,f=[];for(d=0;d<i.length;d++)if(p=u,u=i.charCodeAt(d),n)u===39&&p!==92&&(n=!1);else if(o)u===34&&p!==92&&(o=!1);else if(s)u===96&&p!==92&&(s=!1);else if(r)u===47&&p!==92&&(r=!1);else if(u===124&&i.charCodeAt(d+1)!==124&&i.charCodeAt(d-1)!==124&&!a&&!l&&!c)m===void 0?(h=d+1,m=i.slice(0,d).trim()):x();else{switch(u){case 34:o=!0;break;case 39:n=!0;break;case 96:s=!0;break;case 40:c++;break;case 41:c--;break;case 91:l++;break;case 93:l--;break;case 123:a++;break;case 125:a--;break}if(u===47){let P=d-1,A;for(;P>=0&&(A=i.charAt(P),A===" ");P--);(!A||!Ev.test(A))&&(r=!0)}}m===void 0?m=i.slice(0,d).trim():h!==0&&x();function x(){f.push(i.slice(h,d).trim()),h=d+1}if(f.length){for(d=0;d<f.length;d++)m=Ov(m,f[d],t);e.content=m,e.ast=void 0}}function Ov(e,t,i){i.helper(Xa);const n=t.indexOf("(");if(n<0)return i.filters.add(t),`${Mo(t,"filter")}(${e})`;{const o=t.slice(0,n),s=t.slice(n+1);return i.filters.add(o),`${Mo(o,"filter")}(${e}${s!==")"?","+s:s}`}}const Pc=new WeakSet,Mv=(e,t)=>{if(e.type===1){const i=Lt(e,"memo");return!i||Pc.has(e)||t.inSSR?void 0:(Pc.add(e),()=>{const n=e.codegenNode||t.currentNode.codegenNode;n&&n.type===13&&(e.tagType!==1&&al(n,t),e.codegenNode=Ve(t.helper(rl),[i.exp,Bn(void 0,n),"_cache",String(t.cached.length)]),t.cached.push(null))})}};function Nv(e){return[[Cv,hv,Mv,mv,Rv,Iv,Tv,vv,_v],{on:Md,bind:fv,model:Nd}]}function Lv(e,t={}){const i=t.onError||ll,n=t.mode==="module";t.prefixIdentifiers===!0?i(Fe(47)):n&&i(Fe(48));const o=!1;t.cacheHandlers&&i(Fe(49)),t.scopeId&&!n&&i(Fe(50));const s=fe({},t,{prefixIdentifiers:o}),r=le(e)?zy(e,s):e,[a,l]=Nv();return Vy(r,fe({},s,{nodeTransforms:[...a,...t.nodeTransforms||[]],directiveTransforms:fe({},l,t.directiveTransforms||{})})),Jy(r,s)}const Dv=()=>({props:[]});/**
* @vue/compiler-dom v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Ld=Symbol(""),Dd=Symbol(""),Fd=Symbol(""),qd=Symbol(""),ua=Symbol(""),$d=Symbol(""),Ud=Symbol(""),Bd=Symbol(""),zd=Symbol(""),jd=Symbol("");dy({[Ld]:"vModelRadio",[Dd]:"vModelCheckbox",[Fd]:"vModelText",[qd]:"vModelSelect",[ua]:"vModelDynamic",[$d]:"withModifiers",[Ud]:"withKeys",[Bd]:"vShow",[zd]:"Transition",[jd]:"TransitionGroup"});let ln;function Fv(e,t=!1){return ln||(ln=document.createElement("div")),t?(ln.innerHTML=`<div foo="${e.replace(/"/g,"&quot;")}">`,ln.children[0].getAttribute("foo")):(ln.innerHTML=e,ln.textContent)}const qv={parseMode:"html",isVoidTag:zp,isNativeTag:e=>$p(e)||Up(e)||Bp(e),isPreTag:e=>e==="pre",isIgnoreNewlineTag:e=>e==="pre"||e==="textarea",decodeEntities:Fv,isBuiltInComponent:e=>{if(e==="Transition"||e==="transition")return zd;if(e==="TransitionGroup"||e==="transition-group")return jd},getNamespace(e,t,i){let n=t?t.ns:i;if(t&&n===2)if(t.tag==="annotation-xml"){if(e==="svg")return 1;t.props.some(o=>o.type===6&&o.name==="encoding"&&o.value!=null&&(o.value.content==="text/html"||o.value.content==="application/xhtml+xml"))&&(n=0)}else/^m(?:[ions]|text)$/.test(t.tag)&&e!=="mglyph"&&e!=="malignmark"&&(n=0);else t&&n===1&&(t.tag==="foreignObject"||t.tag==="desc"||t.tag==="title")&&(n=0);if(n===0){if(e==="svg")return 1;if(e==="math")return 2}return n}},$v=e=>{e.type===1&&e.props.forEach((t,i)=>{t.type===6&&t.name==="style"&&t.value&&(e.props[i]={type:7,name:"bind",arg:he("style",!0,t.loc),exp:Uv(t.value.content,t.loc),modifiers:[],loc:t.loc})})},Uv=(e,t)=>{const i=su(e);return he(JSON.stringify(i),!1,t,3)};function Ri(e,t){return Fe(e,t)}const Bv=(e,t,i)=>{const{exp:n,loc:o}=e;return n||i.onError(Ri(53,o)),t.children.length&&(i.onError(Ri(54,o)),t.children.length=0),{props:[ze(he("innerHTML",!0,o),n||he("",!0))]}},zv=(e,t,i)=>{const{exp:n,loc:o}=e;return n||i.onError(Ri(55,o)),t.children.length&&(i.onError(Ri(56,o)),t.children.length=0),{props:[ze(he("textContent",!0),n?Ct(n,i)>0?n:Ve(i.helperString(hr),[n],o):he("",!0))]}},jv=(e,t,i)=>{const n=Nd(e,t,i);if(!n.props.length||t.tagType===1)return n;e.arg&&i.onError(Ri(58,e.arg.loc));const{tag:o}=t,s=i.isCustomElement(o);if(o==="input"||o==="textarea"||o==="select"||s){let r=Fd,a=!1;if(o==="input"||s){const l=dr(t,"type");if(l){if(l.type===7)r=ua;else if(l.value)switch(l.value.content){case"radio":r=Ld;break;case"checkbox":r=Dd;break;case"file":a=!0,i.onError(Ri(59,e.loc));break}}else Ay(t)&&(r=ua)}else o==="select"&&(r=qd);a||(n.needRuntime=i.helper(r))}else i.onError(Ri(57,e.loc));return n.props=n.props.filter(r=>!(r.key.type===4&&r.key.content==="modelValue")),n},Wv=Ot("passive,once,capture"),Gv=Ot("stop,prevent,self,ctrl,shift,alt,meta,exact,middle"),Vv=Ot("left,right"),Wd=Ot("onkeyup,onkeydown,onkeypress"),Hv=(e,t,i,n)=>{const o=[],s=[],r=[];for(let a=0;a<t.length;a++){const l=t[a].content;l==="native"&&Oo("COMPILER_V_ON_NATIVE",i)||Wv(l)?r.push(l):Vv(l)?xt(e)?Wd(e.content.toLowerCase())?o.push(l):s.push(l):(o.push(l),s.push(l)):Gv(l)?s.push(l):o.push(l)}return{keyModifiers:o,nonKeyModifiers:s,eventOptionModifiers:r}},_c=(e,t)=>xt(e)&&e.content.toLowerCase()==="onclick"?he(t,!0):e.type!==4?jt(["(",e,`) === "onClick" ? "${t}" : (`,e,")"]):e,Kv=(e,t,i)=>Md(e,t,i,n=>{const{modifiers:o}=e;if(!o.length)return n;let{key:s,value:r}=n.props[0];const{keyModifiers:a,nonKeyModifiers:l,eventOptionModifiers:c}=Hv(s,o,i,e.loc);if(l.includes("right")&&(s=_c(s,"onContextmenu")),l.includes("middle")&&(s=_c(s,"onMouseup")),l.length&&(r=Ve(i.helper($d),[r,JSON.stringify(l)])),a.length&&(!xt(s)||Wd(s.content.toLowerCase()))&&(r=Ve(i.helper(Ud),[r,JSON.stringify(a)])),c.length){const h=c.map(nn).join("");s=xt(s)?he(`${s.content}${h}`,!0):jt(["(",s,`) + "${h}"`])}return{props:[ze(s,r)]}}),Yv=(e,t,i)=>{const{exp:n,loc:o}=e;return n||i.onError(Ri(61,o)),{props:[],needRuntime:i.helper(Bd)}},Jv=(e,t)=>{e.type===1&&e.tagType===0&&(e.tag==="script"||e.tag==="style")&&t.removeNode()},Qv=[$v],Zv={cloak:Dv,html:Bv,text:zv,model:jv,on:Kv,show:Yv};function Xv(e,t={}){return Lv(e,fe({},qv,t,{nodeTransforms:[Jv,...Qv,...t.nodeTransforms||[]],directiveTransforms:fe({},Zv,t.directiveTransforms||{}),transformHoist:null}))}/**
* vue v3.5.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const Cc=Object.create(null);function eb(e,t){if(!le(e))if(e.nodeType)e=e.innerHTML;else return nt;const i=_p(e,t),n=Cc[i];if(n)return n;if(e[0]==="#"){const a=document.querySelector(e);e=a?a.innerHTML:""}const o=fe({hoistStatic:!0,onError:void 0,onWarn:nt},t);!o.isCustomElement&&typeof customElements<"u"&&(o.isCustomElement=a=>!!customElements.get(a));const{code:s}=Xv(e,o),r=new Function("Vue",s)(ry);return r._rc=!0,Cc[i]=r}Rh(eb);/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const An=typeof document<"u";function Gd(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function tb(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Gd(e.default)}const ke=Object.assign;function Mr(e,t){const i={};for(const n in t){const o=t[n];i[n]=Wt(o)?o.map(e):e(o)}return i}const yo=()=>{},Wt=Array.isArray,Vd=/#/g,ib=/&/g,nb=/\//g,ob=/=/g,sb=/\?/g,Hd=/\+/g,rb=/%5B/g,ab=/%5D/g,Kd=/%5E/g,lb=/%60/g,Yd=/%7B/g,cb=/%7C/g,Jd=/%7D/g,ub=/%20/g;function dl(e){return encodeURI(""+e).replace(cb,"|").replace(rb,"[").replace(ab,"]")}function hb(e){return dl(e).replace(Yd,"{").replace(Jd,"}").replace(Kd,"^")}function ha(e){return dl(e).replace(Hd,"%2B").replace(ub,"+").replace(Vd,"%23").replace(ib,"%26").replace(lb,"`").replace(Yd,"{").replace(Jd,"}").replace(Kd,"^")}function db(e){return ha(e).replace(ob,"%3D")}function pb(e){return dl(e).replace(Vd,"%23").replace(sb,"%3F")}function fb(e){return e==null?"":pb(e).replace(nb,"%2F")}function Lo(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const mb=/\/$/,gb=e=>e.replace(mb,"");function Nr(e,t,i="/"){let n,o={},s="",r="";const a=t.indexOf("#");let l=t.indexOf("?");return a<l&&a>=0&&(l=-1),l>-1&&(n=t.slice(0,l),s=t.slice(l+1,a>-1?a:t.length),o=e(s)),a>-1&&(n=n||t.slice(0,a),r=t.slice(a,t.length)),n=wb(n??t,i),{fullPath:n+(s&&"?")+s+r,path:n,query:o,hash:Lo(r)}}function yb(e,t){const i=t.query?e(t.query):"";return t.path+(i&&"?")+i+(t.hash||"")}function Ec(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function vb(e,t,i){const n=t.matched.length-1,o=i.matched.length-1;return n>-1&&n===o&&Wn(t.matched[n],i.matched[o])&&Qd(t.params,i.params)&&e(t.query)===e(i.query)&&t.hash===i.hash}function Wn(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Qd(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const i in e)if(!bb(e[i],t[i]))return!1;return!0}function bb(e,t){return Wt(e)?Rc(e,t):Wt(t)?Rc(t,e):e===t}function Rc(e,t){return Wt(t)?e.length===t.length&&e.every((i,n)=>i===t[n]):e.length===1&&e[0]===t}function wb(e,t){if(e.startsWith("/"))return e;if(!e)return t;const i=t.split("/"),n=e.split("/"),o=n[n.length-1];(o===".."||o===".")&&n.push("");let s=i.length-1,r,a;for(r=0;r<n.length;r++)if(a=n[r],a!==".")if(a==="..")s>1&&s--;else break;return i.slice(0,s).join("/")+"/"+n.slice(r).join("/")}const vi={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Do;(function(e){e.pop="pop",e.push="push"})(Do||(Do={}));var vo;(function(e){e.back="back",e.forward="forward",e.unknown=""})(vo||(vo={}));function Tb(e){if(!e)if(An){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),gb(e)}const xb=/^[^#]+#/;function Sb(e,t){return e.replace(xb,"#")+t}function kb(e,t){const i=document.documentElement.getBoundingClientRect(),n=e.getBoundingClientRect();return{behavior:t.behavior,left:n.left-i.left-(t.left||0),top:n.top-i.top-(t.top||0)}}const mr=()=>({left:window.scrollX,top:window.scrollY});function Ab(e){let t;if("el"in e){const i=e.el,n=typeof i=="string"&&i.startsWith("#"),o=typeof i=="string"?n?document.getElementById(i.slice(1)):document.querySelector(i):i;if(!o)return;t=kb(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Oc(e,t){return(history.state?history.state.position-t:-1)+e}const da=new Map;function Ib(e,t){da.set(e,t)}function Pb(e){const t=da.get(e);return da.delete(e),t}let _b=()=>location.protocol+"//"+location.host;function Zd(e,t){const{pathname:i,search:n,hash:o}=t,s=e.indexOf("#");if(s>-1){let a=o.includes(e.slice(s))?e.slice(s).length:1,l=o.slice(a);return l[0]!=="/"&&(l="/"+l),Ec(l,"")}return Ec(i,e)+n+o}function Cb(e,t,i,n){let o=[],s=[],r=null;const a=({state:p})=>{const d=Zd(e,location),m=i.value,f=t.value;let x=0;if(p){if(i.value=d,t.value=p,r&&r===m){r=null;return}x=f?p.position-f.position:0}else n(d);o.forEach(P=>{P(i.value,m,{delta:x,type:Do.pop,direction:x?x>0?vo.forward:vo.back:vo.unknown})})};function l(){r=i.value}function c(p){o.push(p);const d=()=>{const m=o.indexOf(p);m>-1&&o.splice(m,1)};return s.push(d),d}function h(){const{history:p}=window;p.state&&p.replaceState(ke({},p.state,{scroll:mr()}),"")}function u(){for(const p of s)p();s=[],window.removeEventListener("popstate",a),window.removeEventListener("beforeunload",h)}return window.addEventListener("popstate",a),window.addEventListener("beforeunload",h,{passive:!0}),{pauseListeners:l,listen:c,destroy:u}}function Mc(e,t,i,n=!1,o=!1){return{back:e,current:t,forward:i,replaced:n,position:window.history.length,scroll:o?mr():null}}function Eb(e){const{history:t,location:i}=window,n={value:Zd(e,i)},o={value:t.state};o.value||s(n.value,{back:null,current:n.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(l,c,h){const u=e.indexOf("#"),p=u>-1?(i.host&&document.querySelector("base")?e:e.slice(u))+l:_b()+e+l;try{t[h?"replaceState":"pushState"](c,"",p),o.value=c}catch(d){console.error(d),i[h?"replace":"assign"](p)}}function r(l,c){const h=ke({},t.state,Mc(o.value.back,l,o.value.forward,!0),c,{position:o.value.position});s(l,h,!0),n.value=l}function a(l,c){const h=ke({},o.value,t.state,{forward:l,scroll:mr()});s(h.current,h,!0);const u=ke({},Mc(n.value,l,null),{position:h.position+1},c);s(l,u,!1),n.value=l}return{location:n,state:o,push:a,replace:r}}function Rb(e){e=Tb(e);const t=Eb(e),i=Cb(e,t.state,t.location,t.replace);function n(s,r=!0){r||i.pauseListeners(),history.go(s)}const o=ke({location:"",base:e,go:n,createHref:Sb.bind(null,e)},t,i);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Ob(e){return typeof e=="string"||e&&typeof e=="object"}function Xd(e){return typeof e=="string"||typeof e=="symbol"}const ep=Symbol("");var Nc;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(Nc||(Nc={}));function Gn(e,t){return ke(new Error,{type:e,[ep]:!0},t)}function ei(e,t){return e instanceof Error&&ep in e&&(t==null||!!(e.type&t))}const Lc="[^/]+?",Mb={sensitive:!1,strict:!1,start:!0,end:!0},Nb=/[.+*?^${}()[\]/\\]/g;function Lb(e,t){const i=ke({},Mb,t),n=[];let o=i.start?"^":"";const s=[];for(const c of e){const h=c.length?[]:[90];i.strict&&!c.length&&(o+="/");for(let u=0;u<c.length;u++){const p=c[u];let d=40+(i.sensitive?.25:0);if(p.type===0)u||(o+="/"),o+=p.value.replace(Nb,"\\$&"),d+=40;else if(p.type===1){const{value:m,repeatable:f,optional:x,regexp:P}=p;s.push({name:m,repeatable:f,optional:x});const A=P||Lc;if(A!==Lc){d+=10;try{new RegExp(`(${A})`)}catch(S){throw new Error(`Invalid custom RegExp for param "${m}" (${A}): `+S.message)}}let b=f?`((?:${A})(?:/(?:${A}))*)`:`(${A})`;u||(b=x&&c.length<2?`(?:/${b})`:"/"+b),x&&(b+="?"),o+=b,d+=20,x&&(d+=-8),f&&(d+=-20),A===".*"&&(d+=-50)}h.push(d)}n.push(h)}if(i.strict&&i.end){const c=n.length-1;n[c][n[c].length-1]+=.7000000000000001}i.strict||(o+="/?"),i.end?o+="$":i.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const r=new RegExp(o,i.sensitive?"":"i");function a(c){const h=c.match(r),u={};if(!h)return null;for(let p=1;p<h.length;p++){const d=h[p]||"",m=s[p-1];u[m.name]=d&&m.repeatable?d.split("/"):d}return u}function l(c){let h="",u=!1;for(const p of e){(!u||!h.endsWith("/"))&&(h+="/"),u=!1;for(const d of p)if(d.type===0)h+=d.value;else if(d.type===1){const{value:m,repeatable:f,optional:x}=d,P=m in c?c[m]:"";if(Wt(P)&&!f)throw new Error(`Provided param "${m}" is an array but it is not repeatable (* or + modifiers)`);const A=Wt(P)?P.join("/"):P;if(!A)if(x)p.length<2&&(h.endsWith("/")?h=h.slice(0,-1):u=!0);else throw new Error(`Missing required param "${m}"`);h+=A}}return h||"/"}return{re:r,score:n,keys:s,parse:a,stringify:l}}function Db(e,t){let i=0;for(;i<e.length&&i<t.length;){const n=t[i]-e[i];if(n)return n;i++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function tp(e,t){let i=0;const n=e.score,o=t.score;for(;i<n.length&&i<o.length;){const s=Db(n[i],o[i]);if(s)return s;i++}if(Math.abs(o.length-n.length)===1){if(Dc(n))return 1;if(Dc(o))return-1}return o.length-n.length}function Dc(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Fb={type:0,value:""},qb=/[a-zA-Z0-9_]/;function $b(e){if(!e)return[[]];if(e==="/")return[[Fb]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(d){throw new Error(`ERR (${i})/"${c}": ${d}`)}let i=0,n=i;const o=[];let s;function r(){s&&o.push(s),s=[]}let a=0,l,c="",h="";function u(){c&&(i===0?s.push({type:0,value:c}):i===1||i===2||i===3?(s.length>1&&(l==="*"||l==="+")&&t(`A repeatable param (${c}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:c,regexp:h,repeatable:l==="*"||l==="+",optional:l==="*"||l==="?"})):t("Invalid state to consume buffer"),c="")}function p(){c+=l}for(;a<e.length;){if(l=e[a++],l==="\\"&&i!==2){n=i,i=4;continue}switch(i){case 0:l==="/"?(c&&u(),r()):l===":"?(u(),i=1):p();break;case 4:p(),i=n;break;case 1:l==="("?i=2:qb.test(l)?p():(u(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--);break;case 2:l===")"?h[h.length-1]=="\\"?h=h.slice(0,-1)+l:i=3:h+=l;break;case 3:u(),i=0,l!=="*"&&l!=="?"&&l!=="+"&&a--,h="";break;default:t("Unknown state");break}}return i===2&&t(`Unfinished custom RegExp for param "${c}"`),u(),r(),o}function Ub(e,t,i){const n=Lb($b(e.path),i),o=ke(n,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function Bb(e,t){const i=[],n=new Map;t=Uc({strict:!1,end:!0,sensitive:!1},t);function o(u){return n.get(u)}function s(u,p,d){const m=!d,f=qc(u);f.aliasOf=d&&d.record;const x=Uc(t,u),P=[f];if("alias"in u){const S=typeof u.alias=="string"?[u.alias]:u.alias;for(const _ of S)P.push(qc(ke({},f,{components:d?d.record.components:f.components,path:_,aliasOf:d?d.record:f})))}let A,b;for(const S of P){const{path:_}=S;if(p&&_[0]!=="/"){const C=p.record.path,R=C[C.length-1]==="/"?"":"/";S.path=p.record.path+(_&&R+_)}if(A=Ub(S,p,x),d?d.alias.push(A):(b=b||A,b!==A&&b.alias.push(A),m&&u.name&&!$c(A)&&r(u.name)),ip(A)&&l(A),f.children){const C=f.children;for(let R=0;R<C.length;R++)s(C[R],A,d&&d.children[R])}d=d||A}return b?()=>{r(b)}:yo}function r(u){if(Xd(u)){const p=n.get(u);p&&(n.delete(u),i.splice(i.indexOf(p),1),p.children.forEach(r),p.alias.forEach(r))}else{const p=i.indexOf(u);p>-1&&(i.splice(p,1),u.record.name&&n.delete(u.record.name),u.children.forEach(r),u.alias.forEach(r))}}function a(){return i}function l(u){const p=Wb(u,i);i.splice(p,0,u),u.record.name&&!$c(u)&&n.set(u.record.name,u)}function c(u,p){let d,m={},f,x;if("name"in u&&u.name){if(d=n.get(u.name),!d)throw Gn(1,{location:u});x=d.record.name,m=ke(Fc(p.params,d.keys.filter(b=>!b.optional).concat(d.parent?d.parent.keys.filter(b=>b.optional):[]).map(b=>b.name)),u.params&&Fc(u.params,d.keys.map(b=>b.name))),f=d.stringify(m)}else if(u.path!=null)f=u.path,d=i.find(b=>b.re.test(f)),d&&(m=d.parse(f),x=d.record.name);else{if(d=p.name?n.get(p.name):i.find(b=>b.re.test(p.path)),!d)throw Gn(1,{location:u,currentLocation:p});x=d.record.name,m=ke({},p.params,u.params),f=d.stringify(m)}const P=[];let A=d;for(;A;)P.unshift(A.record),A=A.parent;return{name:x,path:f,params:m,matched:P,meta:jb(P)}}e.forEach(u=>s(u));function h(){i.length=0,n.clear()}return{addRoute:s,resolve:c,removeRoute:r,clearRoutes:h,getRoutes:a,getRecordMatcher:o}}function Fc(e,t){const i={};for(const n of t)n in e&&(i[n]=e[n]);return i}function qc(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:zb(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function zb(e){const t={},i=e.props||!1;if("component"in e)t.default=i;else for(const n in e.components)t[n]=typeof i=="object"?i[n]:i;return t}function $c(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function jb(e){return e.reduce((t,i)=>ke(t,i.meta),{})}function Uc(e,t){const i={};for(const n in e)i[n]=n in t?t[n]:e[n];return i}function Wb(e,t){let i=0,n=t.length;for(;i!==n;){const s=i+n>>1;tp(e,t[s])<0?n=s:i=s+1}const o=Gb(e);return o&&(n=t.lastIndexOf(o,n-1)),n}function Gb(e){let t=e;for(;t=t.parent;)if(ip(t)&&tp(e,t)===0)return t}function ip({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function Vb(e){const t={};if(e===""||e==="?")return t;const n=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<n.length;++o){const s=n[o].replace(Hd," "),r=s.indexOf("="),a=Lo(r<0?s:s.slice(0,r)),l=r<0?null:Lo(s.slice(r+1));if(a in t){let c=t[a];Wt(c)||(c=t[a]=[c]),c.push(l)}else t[a]=l}return t}function Bc(e){let t="";for(let i in e){const n=e[i];if(i=db(i),n==null){n!==void 0&&(t+=(t.length?"&":"")+i);continue}(Wt(n)?n.map(s=>s&&ha(s)):[n&&ha(n)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+i,s!=null&&(t+="="+s))})}return t}function Hb(e){const t={};for(const i in e){const n=e[i];n!==void 0&&(t[i]=Wt(n)?n.map(o=>o==null?null:""+o):n==null?n:""+n)}return t}const Kb=Symbol(""),zc=Symbol(""),gr=Symbol(""),pl=Symbol(""),pa=Symbol("");function eo(){let e=[];function t(n){return e.push(n),()=>{const o=e.indexOf(n);o>-1&&e.splice(o,1)}}function i(){e=[]}return{add:t,list:()=>e.slice(),reset:i}}function Ai(e,t,i,n,o,s=r=>r()){const r=n&&(n.enterCallbacks[o]=n.enterCallbacks[o]||[]);return()=>new Promise((a,l)=>{const c=p=>{p===!1?l(Gn(4,{from:i,to:t})):p instanceof Error?l(p):Ob(p)?l(Gn(2,{from:t,to:p})):(r&&n.enterCallbacks[o]===r&&typeof p=="function"&&r.push(p),a())},h=s(()=>e.call(n&&n.instances[o],t,i,c));let u=Promise.resolve(h);e.length<3&&(u=u.then(c)),u.catch(p=>l(p))})}function Lr(e,t,i,n,o=s=>s()){const s=[];for(const r of e)for(const a in r.components){let l=r.components[a];if(!(t!=="beforeRouteEnter"&&!r.instances[a]))if(Gd(l)){const h=(l.__vccOpts||l)[t];h&&s.push(Ai(h,i,n,r,a,o))}else{let c=l();s.push(()=>c.then(h=>{if(!h)throw new Error(`Couldn't resolve component "${a}" at "${r.path}"`);const u=tb(h)?h.default:h;r.mods[a]=h,r.components[a]=u;const d=(u.__vccOpts||u)[t];return d&&Ai(d,i,n,r,a,o)()}))}}return s}function jc(e){const t=Rt(gr),i=Rt(pl),n=xe(()=>{const l=N(e.to);return t.resolve(l)}),o=xe(()=>{const{matched:l}=n.value,{length:c}=l,h=l[c-1],u=i.matched;if(!h||!u.length)return-1;const p=u.findIndex(Wn.bind(null,h));if(p>-1)return p;const d=Wc(l[c-2]);return c>1&&Wc(h)===d&&u[u.length-1].path!==d?u.findIndex(Wn.bind(null,l[c-2])):p}),s=xe(()=>o.value>-1&&Xb(i.params,n.value.params)),r=xe(()=>o.value>-1&&o.value===i.matched.length-1&&Qd(i.params,n.value.params));function a(l={}){if(Zb(l)){const c=t[N(e.replace)?"replace":"push"](N(e.to)).catch(yo);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>c),c}return Promise.resolve()}return{route:n,href:xe(()=>n.value.href),isActive:s,isExactActive:r,navigate:a}}function Yb(e){return e.length===1?e[0]:e}const Jb=ot({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:jc,setup(e,{slots:t}){const i=Kn(jc(e)),{options:n}=Rt(gr),o=xe(()=>({[Gc(e.activeClass,n.linkActiveClass,"router-link-active")]:i.isActive,[Gc(e.exactActiveClass,n.linkExactActiveClass,"router-link-exact-active")]:i.isExactActive}));return()=>{const s=t.default&&Yb(t.default(i));return e.custom?s:Zi("a",{"aria-current":i.isExactActive?e.ariaCurrentValue:null,href:i.href,onClick:i.navigate,class:o.value},s)}}}),Qb=Jb;function Zb(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function Xb(e,t){for(const i in t){const n=t[i],o=e[i];if(typeof n=="string"){if(n!==o)return!1}else if(!Wt(o)||o.length!==n.length||n.some((s,r)=>s!==o[r]))return!1}return!0}function Wc(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Gc=(e,t,i)=>e??t??i,ew=ot({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:i}){const n=Rt(pa),o=xe(()=>e.route||n.value),s=Rt(zc,0),r=xe(()=>{let c=N(s);const{matched:h}=o.value;let u;for(;(u=h[c])&&!u.components;)c++;return c}),a=xe(()=>o.value.matched[r.value]);po(zc,xe(()=>r.value+1)),po(Kb,a),po(pa,o);const l=oe();return St(()=>[l.value,a.value,e.name],([c,h,u],[p,d,m])=>{h&&(h.instances[u]=c,d&&d!==h&&c&&c===p&&(h.leaveGuards.size||(h.leaveGuards=d.leaveGuards),h.updateGuards.size||(h.updateGuards=d.updateGuards))),c&&h&&(!d||!Wn(h,d)||!p)&&(h.enterCallbacks[u]||[]).forEach(f=>f(c))},{flush:"post"}),()=>{const c=o.value,h=e.name,u=a.value,p=u&&u.components[h];if(!p)return Vc(i.default,{Component:p,route:c});const d=u.props[h],m=d?d===!0?c.params:typeof d=="function"?d(c):d:null,x=Zi(p,ke({},m,t,{onVnodeUnmounted:P=>{P.component.isUnmounted&&(u.instances[h]=null)},ref:l}));return Vc(i.default,{Component:x,route:c})||x}}});function Vc(e,t){if(!e)return null;const i=e(t);return i.length===1?i[0]:i}const tw=ew;function iw(e){const t=Bb(e.routes,e),i=e.parseQuery||Vb,n=e.stringifyQuery||Bc,o=e.history,s=eo(),r=eo(),a=eo(),l=Ca(vi);let c=vi;An&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const h=Mr.bind(null,B=>""+B),u=Mr.bind(null,fb),p=Mr.bind(null,Lo);function d(B,Z){let Y,te;return Xd(B)?(Y=t.getRecordMatcher(B),te=Z):te=B,t.addRoute(te,Y)}function m(B){const Z=t.getRecordMatcher(B);Z&&t.removeRoute(Z)}function f(){return t.getRoutes().map(B=>B.record)}function x(B){return!!t.getRecordMatcher(B)}function P(B,Z){if(Z=ke({},Z||l.value),typeof B=="string"){const T=Nr(i,B,Z.path),M=t.resolve({path:T.path},Z),z=o.createHref(T.fullPath);return ke(T,M,{params:p(M.params),hash:Lo(T.hash),redirectedFrom:void 0,href:z})}let Y;if(B.path!=null)Y=ke({},B,{path:Nr(i,B.path,Z.path).path});else{const T=ke({},B.params);for(const M in T)T[M]==null&&delete T[M];Y=ke({},B,{params:u(T)}),Z.params=u(Z.params)}const te=t.resolve(Y,Z),be=B.hash||"";te.params=h(p(te.params));const Ee=yb(n,ke({},B,{hash:hb(be),path:te.path})),v=o.createHref(Ee);return ke({fullPath:Ee,hash:be,query:n===Bc?Hb(B.query):B.query||{}},te,{redirectedFrom:void 0,href:v})}function A(B){return typeof B=="string"?Nr(i,B,l.value.path):ke({},B)}function b(B,Z){if(c!==B)return Gn(8,{from:Z,to:B})}function S(B){return R(B)}function _(B){return S(ke(A(B),{replace:!0}))}function C(B){const Z=B.matched[B.matched.length-1];if(Z&&Z.redirect){const{redirect:Y}=Z;let te=typeof Y=="function"?Y(B):Y;return typeof te=="string"&&(te=te.includes("?")||te.includes("#")?te=A(te):{path:te},te.params={}),ke({query:B.query,hash:B.hash,params:te.path!=null?{}:B.params},te)}}function R(B,Z){const Y=c=P(B),te=l.value,be=B.state,Ee=B.force,v=B.replace===!0,T=C(Y);if(T)return R(ke(A(T),{state:typeof T=="object"?ke({},be,T.state):be,force:Ee,replace:v}),Z||Y);const M=Y;M.redirectedFrom=Z;let z;return!Ee&&vb(n,te,Y)&&(z=Gn(16,{to:M,from:te}),He(te,te,!0,!1)),(z?Promise.resolve(z):E(M,te)).catch($=>ei($)?ei($,2)?$:Ce($):K($,M,te)).then($=>{if($){if(ei($,2))return R(ke({replace:v},A($.to),{state:typeof $.to=="object"?ke({},be,$.to.state):be,force:Ee}),Z||M)}else $=k(M,te,!0,v,be);return O(M,te,$),$})}function w(B,Z){const Y=b(B,Z);return Y?Promise.reject(Y):Promise.resolve()}function y(B){const Z=Qe.values().next().value;return Z&&typeof Z.runWithContext=="function"?Z.runWithContext(B):B()}function E(B,Z){let Y;const[te,be,Ee]=nw(B,Z);Y=Lr(te.reverse(),"beforeRouteLeave",B,Z);for(const T of te)T.leaveGuards.forEach(M=>{Y.push(Ai(M,B,Z))});const v=w.bind(null,B,Z);return Y.push(v),Ke(Y).then(()=>{Y=[];for(const T of s.list())Y.push(Ai(T,B,Z));return Y.push(v),Ke(Y)}).then(()=>{Y=Lr(be,"beforeRouteUpdate",B,Z);for(const T of be)T.updateGuards.forEach(M=>{Y.push(Ai(M,B,Z))});return Y.push(v),Ke(Y)}).then(()=>{Y=[];for(const T of Ee)if(T.beforeEnter)if(Wt(T.beforeEnter))for(const M of T.beforeEnter)Y.push(Ai(M,B,Z));else Y.push(Ai(T.beforeEnter,B,Z));return Y.push(v),Ke(Y)}).then(()=>(B.matched.forEach(T=>T.enterCallbacks={}),Y=Lr(Ee,"beforeRouteEnter",B,Z,y),Y.push(v),Ke(Y))).then(()=>{Y=[];for(const T of r.list())Y.push(Ai(T,B,Z));return Y.push(v),Ke(Y)}).catch(T=>ei(T,8)?T:Promise.reject(T))}function O(B,Z,Y){a.list().forEach(te=>y(()=>te(B,Z,Y)))}function k(B,Z,Y,te,be){const Ee=b(B,Z);if(Ee)return Ee;const v=Z===vi,T=An?history.state:{};Y&&(te||v?o.replace(B.fullPath,ke({scroll:v&&T&&T.scroll},be)):o.push(B.fullPath,be)),l.value=B,He(B,Z,Y,v),Ce()}let D;function j(){D||(D=o.listen((B,Z,Y)=>{if(!Qt.listening)return;const te=P(B),be=C(te);if(be){R(ke(be,{replace:!0,force:!0}),te).catch(yo);return}c=te;const Ee=l.value;An&&Ib(Oc(Ee.fullPath,Y.delta),mr()),E(te,Ee).catch(v=>ei(v,12)?v:ei(v,2)?(R(ke(A(v.to),{force:!0}),te).then(T=>{ei(T,20)&&!Y.delta&&Y.type===Do.pop&&o.go(-1,!1)}).catch(yo),Promise.reject()):(Y.delta&&o.go(-Y.delta,!1),K(v,te,Ee))).then(v=>{v=v||k(te,Ee,!1),v&&(Y.delta&&!ei(v,8)?o.go(-Y.delta,!1):Y.type===Do.pop&&ei(v,20)&&o.go(-1,!1)),O(te,Ee,v)}).catch(yo)}))}let G=eo(),W=eo(),J;function K(B,Z,Y){Ce(B);const te=W.list();return te.length?te.forEach(be=>be(B,Z,Y)):console.error(B),Promise.reject(B)}function ye(){return J&&l.value!==vi?Promise.resolve():new Promise((B,Z)=>{G.add([B,Z])})}function Ce(B){return J||(J=!B,j(),G.list().forEach(([Z,Y])=>B?Y(B):Z()),G.reset()),B}function He(B,Z,Y,te){const{scrollBehavior:be}=e;if(!An||!be)return Promise.resolve();const Ee=!Y&&Pb(Oc(B.fullPath,0))||(te||!Y)&&history.state&&history.state.scroll||null;return ai().then(()=>be(B,Z,Ee)).then(v=>v&&Ab(v)).catch(v=>K(v,B,Z))}const me=B=>o.go(B);let pt;const Qe=new Set,Qt={currentRoute:l,listening:!0,addRoute:d,removeRoute:m,clearRoutes:t.clearRoutes,hasRoute:x,getRoutes:f,resolve:P,options:e,push:S,replace:_,go:me,back:()=>me(-1),forward:()=>me(1),beforeEach:s.add,beforeResolve:r.add,afterEach:a.add,onError:W.add,isReady:ye,install(B){const Z=this;B.component("RouterLink",Qb),B.component("RouterView",tw),B.config.globalProperties.$router=Z,Object.defineProperty(B.config.globalProperties,"$route",{enumerable:!0,get:()=>N(l)}),An&&!pt&&l.value===vi&&(pt=!0,S(o.location).catch(be=>{}));const Y={};for(const be in vi)Object.defineProperty(Y,be,{get:()=>l.value[be],enumerable:!0});B.provide(gr,Z),B.provide(pl,Pa(Y)),B.provide(pa,l);const te=B.unmount;Qe.add(B),B.unmount=function(){Qe.delete(B),Qe.size<1&&(c=vi,D&&D(),D=null,l.value=vi,pt=!1,J=!1),te()}}};function Ke(B){return B.reduce((Z,Y)=>Z.then(()=>y(Y)),Promise.resolve())}return Qt}function nw(e,t){const i=[],n=[],o=[],s=Math.max(t.matched.length,e.matched.length);for(let r=0;r<s;r++){const a=t.matched[r];a&&(e.matched.find(c=>Wn(c,a))?n.push(a):i.push(a));const l=e.matched[r];l&&(t.matched.find(c=>Wn(c,l))||o.push(l))}return[i,n,o]}function np(){return Rt(gr)}function PS(e){return Rt(pl)}/*!
 * pinia v2.3.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */let op;const yr=e=>op=e,sp=Symbol();function fa(e){return e&&typeof e=="object"&&Object.prototype.toString.call(e)==="[object Object]"&&typeof e.toJSON!="function"}var bo;(function(e){e.direct="direct",e.patchObject="patch object",e.patchFunction="patch function"})(bo||(bo={}));function ow(){const e=xa(!0),t=e.run(()=>oe({}));let i=[],n=[];const o=er({install(s){yr(o),o._a=s,s.provide(sp,o),s.config.globalProperties.$pinia=o,n.forEach(r=>i.push(r)),n=[]},use(s){return this._a?i.push(s):n.push(s),this},_p:i,_a:null,_e:e,_s:new Map,state:t});return o}const rp=()=>{};function Hc(e,t,i,n=rp){e.push(t);const o=()=>{const s=e.indexOf(t);s>-1&&(e.splice(s,1),n())};return!i&&Sa()&&cu(o),o}function cn(e,...t){e.slice().forEach(i=>{i(...t)})}const sw=e=>e(),Kc=Symbol(),Dr=Symbol();function ma(e,t){e instanceof Map&&t instanceof Map?t.forEach((i,n)=>e.set(n,i)):e instanceof Set&&t instanceof Set&&t.forEach(e.add,e);for(const i in t){if(!t.hasOwnProperty(i))continue;const n=t[i],o=e[i];fa(o)&&fa(n)&&e.hasOwnProperty(i)&&!qe(n)&&!Yt(n)?e[i]=ma(o,n):e[i]=n}return e}const rw=Symbol();function aw(e){return!fa(e)||!e.hasOwnProperty(rw)}const{assign:wi}=Object;function lw(e){return!!(qe(e)&&e.effect)}function cw(e,t,i,n){const{state:o,actions:s,getters:r}=t,a=i.state.value[e];let l;function c(){a||(i.state.value[e]=o?o():{});const h=Pu(i.state.value[e]);return wi(h,s,Object.keys(r||{}).reduce((u,p)=>(u[p]=er(xe(()=>{yr(i);const d=i._s.get(e);return r[p].call(d,d)})),u),{}))}return l=ap(e,c,t,i,n,!0),l}function ap(e,t,i={},n,o,s){let r;const a=wi({actions:{}},i),l={deep:!0};let c,h,u=[],p=[],d;const m=n.state.value[e];!s&&!m&&(n.state.value[e]={}),oe({});let f;function x(w){let y;c=h=!1,typeof w=="function"?(w(n.state.value[e]),y={type:bo.patchFunction,storeId:e,events:d}):(ma(n.state.value[e],w),y={type:bo.patchObject,payload:w,storeId:e,events:d});const E=f=Symbol();ai().then(()=>{f===E&&(c=!0)}),h=!0,cn(u,y,n.state.value[e])}const P=s?function(){const{state:y}=i,E=y?y():{};this.$patch(O=>{wi(O,E)})}:rp;function A(){r.stop(),u=[],p=[],n._s.delete(e)}const b=(w,y="")=>{if(Kc in w)return w[Dr]=y,w;const E=function(){yr(n);const O=Array.from(arguments),k=[],D=[];function j(J){k.push(J)}function G(J){D.push(J)}cn(p,{args:O,name:E[Dr],store:_,after:j,onError:G});let W;try{W=w.apply(this&&this.$id===e?this:_,O)}catch(J){throw cn(D,J),J}return W instanceof Promise?W.then(J=>(cn(k,J),J)).catch(J=>(cn(D,J),Promise.reject(J))):(cn(k,W),W)};return E[Kc]=!0,E[Dr]=y,E},S={_p:n,$id:e,$onAction:Hc.bind(null,p),$patch:x,$reset:P,$subscribe(w,y={}){const E=Hc(u,w,y.detached,()=>O()),O=r.run(()=>St(()=>n.state.value[e],k=>{(y.flush==="sync"?h:c)&&w({storeId:e,type:bo.direct,events:d},k)},wi({},l,y)));return E},$dispose:A},_=Kn(S);n._s.set(e,_);const R=(n._a&&n._a.runWithContext||sw)(()=>n._e.run(()=>(r=xa()).run(()=>t({action:b}))));for(const w in R){const y=R[w];if(qe(y)&&!lw(y)||Yt(y))s||(m&&aw(y)&&(qe(y)?y.value=m[w]:ma(y,m[w])),n.state.value[e][w]=y);else if(typeof y=="function"){const E=b(y,w);R[w]=E,a.actions[w]=y}}return wi(_,R),wi(ge(_),R),Object.defineProperty(_,"$state",{get:()=>n.state.value[e],set:w=>{x(y=>{wi(y,w)})}}),n._p.forEach(w=>{wi(_,r.run(()=>w({store:_,app:n._a,pinia:n,options:a})))}),m&&s&&i.hydrate&&i.hydrate(_.$state,m),c=!0,h=!0,_}/*! #__NO_SIDE_EFFECTS__ */function Go(e,t,i){let n,o;const s=typeof t=="function";typeof e=="string"?(n=e,o=s?i:t):(o=e,n=e.id);function r(a,l){const c=th();return a=a||(c?Rt(sp,null):null),a&&yr(a),a=op,a._s.has(n)||(s?ap(n,t,o,a):cw(n,o,a)),a._s.get(n)}return r.$id=n,r}const lp=Go("navigation",()=>{const e=oe("generate"),t=[{id:"generate",name:"生成",icon:"🏠",path:"/generate",color:"#3B82F6"},{id:"optimize",name:"优化",icon:"⚡",path:"/optimize",color:"#F59E0B"},{id:"playground",name:"操练场",icon:"🎯",path:"/playground",color:"#10B981"},{id:"library",name:"模板库",icon:"📚",path:"/library",color:"#8B5CF6"}],i=xe(()=>t.find(s=>s.id===e.value)||t[0]);return{currentModule:e,modules:t,currentModuleConfig:i,setCurrentModule:s=>{e.value=s},getModuleByPath:s=>t.find(r=>r.path===s)}}),cp="yprompt_mock_data";function uw(){const e=localStorage.getItem(cp);if(e)try{return JSON.parse(e)}catch{}return{user:{id:1,username:"admin",name:"管理员",avatar:"",email:"admin@example.com",auth_type:"local",is_admin:1,last_login_time:new Date().toISOString()},prompts:[],tags:[],promptRules:null}}function Ut(e){localStorage.setItem(cp,JSON.stringify(e))}function Ze(){return uw()}function je(e=300){return new Promise(t=>setTimeout(t,e))}function Fr(){return`mock_token_${Date.now()}_${Math.random().toString(36).substr(2,9)}`}const We={async login(e,t){if(await je(500),e==="admin"&&t==="admin123"){const i=Ze(),n=Fr();return i.user.last_login_time=new Date().toISOString(),Ut(i),{code:200,message:"登录成功",data:{token:n,user:i.user}}}else{const i=Ze(),n=Fr();return i.user.username=e,i.user.name=e,i.user.last_login_time=new Date().toISOString(),Ut(i),{code:200,message:"登录成功（Debug 模式）",data:{token:n,user:i.user}}}},async getAuthConfig(){return await je(200),{code:200,data:{local_auth_enabled:!0,login_username:"admin"}}},async refreshToken(e){return await je(200),{code:200,message:"刷新成功",data:{token:Fr()}}},async getUserInfo(){return await je(200),{code:200,data:Ze().user}},async logout(){return await je(200),{code:200,message:"登出成功"}},async getPrompts(e){await je(300);let i=[...Ze().prompts];if(e!=null&&e.search){const l=e.search.toLowerCase();i=i.filter(c=>{var h,u;return((h=c.title)==null?void 0:h.toLowerCase().includes(l))||((u=c.description)==null?void 0:u.toLowerCase().includes(l))})}e!=null&&e.is_favorite&&(i=i.filter(l=>l.is_favorite===1)),e!=null&&e.tags&&e.tags.length>0&&(i=i.filter(l=>{const c=(l.tags||"").split(",").map(h=>h.trim());return e.tags.some(h=>c.includes(h))}));const n=(e==null?void 0:e.page)||1,o=(e==null?void 0:e.limit)||20,s=(n-1)*o,r=s+o,a=i.slice(s,r);return{code:200,data:{total:i.length,page:n,limit:o,items:a}}},async getPrompt(e){await je(200);const i=Ze().prompts.find(n=>n.id===e);return i?{code:200,data:i}:{code:404,message:"提示词不存在"}},async savePrompt(e){await je(500);const t=Ze(),i={id:Date.now(),user_id:t.user.id,...e,is_favorite:0,is_public:0,view_count:0,use_count:0,create_time:new Date().toISOString(),update_time:new Date().toISOString(),current_version:"1.0.0",total_versions:1};return t.prompts.unshift(i),Ut(t),{code:200,message:"保存成功",data:i}},async updatePrompt(e,t){await je(500);const i=Ze(),n=i.prompts.findIndex(o=>o.id===e);return n===-1?{code:404,message:"提示词不存在"}:(i.prompts[n]={...i.prompts[n],...t,update_time:new Date().toISOString()},Ut(i),{code:200,message:"更新成功",data:i.prompts[n]})},async deletePrompt(e){await je(300);const t=Ze(),i=t.prompts.findIndex(n=>n.id===e);return i===-1?{code:404,message:"提示词不存在"}:(t.prompts.splice(i,1),Ut(t),{code:200,message:"删除成功"})},async toggleFavorite(e,t){await je(300);const i=Ze(),n=i.prompts.find(o=>o.id===e);return n?(n.is_favorite=t?1:0,Ut(i),{code:200,message:t?"收藏成功":"取消收藏成功"}):{code:404,message:"提示词不存在"}},async recordPromptUse(e){await je(200);const t=Ze(),i=t.prompts.find(n=>n.id===e);return i&&(i.use_count=(i.use_count||0)+1,Ut(t)),{code:200,message:"记录成功"}},async getTags(){return await je(200),{code:200,data:Ze().tags||[]}},async getPopularTags(e=10){return await je(200),{code:200,data:[...Ze().tags||[]].sort((n,o)=>(o.use_count||0)-(n.use_count||0)).slice(0,e)}},async createTag(e){await je(300);const t=Ze();if(t.tags.find(o=>o.tag_name===e))return{code:400,message:"标签已存在"};const n={id:Date.now(),tag_name:e,user_id:t.user.id,use_count:0,create_time:new Date().toISOString()};return t.tags.push(n),Ut(t),{code:200,message:"创建成功",data:n}},async deleteTag(e){await je(300);const t=Ze(),i=t.tags.findIndex(n=>n.id===e);return i===-1?{code:404,message:"标签不存在"}:(t.tags.splice(i,1),Ut(t),{code:200,message:"删除成功"})},async getUserPromptRules(){await je(200);const e=Ze();return{code:200,data:e.promptRules||null,message:e.promptRules?"获取成功":"使用默认规则"}},async saveUserPromptRules(e){await je(500);const t=Ze();return t.promptRules={...t.promptRules,...e,user_id:t.user.id,update_time:new Date().toISOString()},Ut(t),{code:200,message:"保存成功",data:t.promptRules}},async deleteUserPromptRules(e){await je(300);const t=Ze();return!e||e.length===0?t.promptRules=null:(t.promptRules||(t.promptRules={}),e.forEach(i=>{delete t.promptRules[i]})),Ut(t),{code:200,message:"删除成功"}}};function In(){return localStorage.getItem("yprompt_debug_mode")==="true"}async function to(e,t,i){if(!In())throw new Error("Mock API 只能在 debug 模式下使用");const[n,o]=t.split("?"),s={};if(o&&o.split("&").forEach(r=>{const[a,l]=r.split("=");s[a]=decodeURIComponent(l||"")}),n==="/api/auth/local/login"&&e==="POST")return We.login(i.username,i.password);if(n==="/api/auth/config"&&e==="GET")return We.getAuthConfig();if(n==="/api/auth/refresh"&&e==="POST"){const r=localStorage.getItem("yprompt_token")||"";return We.refreshToken(r)}if(n==="/api/auth/userinfo"&&e==="GET")return We.getUserInfo();if(n==="/api/auth/logout"&&e==="POST")return We.logout();if(n.startsWith("/api/prompts")&&e==="GET")if(n.match(/^\/api\/prompts\/(\d+)$/)){const r=parseInt(n.match(/^\/api\/prompts\/(\d+)$/)[1]);return We.getPrompt(r)}else return We.getPrompts(s);if(n==="/api/prompts"&&e==="POST")return We.savePrompt(i);if(n.match(/^\/api\/prompts\/(\d+)$/)&&e==="PUT"){const r=parseInt(n.match(/^\/api\/prompts\/(\d+)$/)[1]);return We.updatePrompt(r,i)}if(n.match(/^\/api\/prompts\/(\d+)$/)&&e==="DELETE"){const r=parseInt(n.match(/^\/api\/prompts\/(\d+)$/)[1]);return We.deletePrompt(r)}if(n.match(/^\/api\/prompts\/(\d+)\/favorite$/)&&e==="POST"){const r=parseInt(n.match(/^\/api\/prompts\/(\d+)\/favorite$/)[1]);return We.toggleFavorite(r,i.is_favorite)}if(n.match(/^\/api\/prompts\/(\d+)\/use$/)&&e==="POST"){const r=parseInt(n.match(/^\/api\/prompts\/(\d+)\/use$/)[1]);return We.recordPromptUse(r)}if(n==="/api/tags"&&e==="GET")return We.getTags();if(n==="/api/tags/popular"&&e==="GET")return We.getPopularTags(s.limit);if(n==="/api/tags"&&e==="POST")return We.createTag(i.tag_name);if(n.match(/^\/api\/tags\/(\d+)$/)&&e==="DELETE"){const r=parseInt(n.match(/^\/api\/tags\/(\d+)$/)[1]);return We.deleteTag(r)}return n==="/api/prompt-rules"&&e==="GET"?We.getUserPromptRules():n==="/api/prompt-rules"&&e==="POST"?We.saveUserPromptRules(i):n==="/api/prompt-rules"&&e==="DELETE"?We.deleteUserPromptRules():{code:404,message:`Mock API 未实现: ${e} ${n}`}}const fl=Go("auth",()=>{const e=oe(localStorage.getItem("yprompt_token")),t=oe(null),i=oe(!1),n=xe(()=>!!e.value&&!!t.value),o=d=>{e.value=d,d?localStorage.setItem("yprompt_token",d):localStorage.removeItem("yprompt_token")},s=d=>{t.value=d,d?localStorage.setItem("yprompt_user",JSON.stringify(d)):localStorage.removeItem("yprompt_user")},r=()=>{const d=localStorage.getItem("yprompt_user");if(d)try{t.value=JSON.parse(d)}catch{localStorage.removeItem("yprompt_user")}},a=async(d,m)=>{i.value=!0;try{let f;if(In())f=await to("POST","/api/auth/local/login",{username:d,password:m});else{const A=await fetch("https://api.prompt-ui.xiechengqi.top/api/auth/local/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:d,password:m})});if(!A.ok)try{return{success:!1,message:(await A.json()).message||`请求失败: ${A.status} ${A.statusText}`}}catch{return{success:!1,message:`网络错误: ${A.status} ${A.statusText}`}}f=await A.json()}if(f.code===200&&f.data){o(f.data.token),s(f.data.user);try{const{promptConfigManager:x}=await Pe(async()=>{const{promptConfigManager:P}=await Promise.resolve().then(()=>pw);return{promptConfigManager:P}},void 0);await x.forceReloadFromCloud()}catch(x){console.error("登录后加载云端配置失败:",x)}return{success:!0}}else return{success:!1,message:f.message||"登录失败，请检查用户名和密码"}}catch(f){return console.error("登录请求失败:",f),f instanceof TypeError&&f.message.includes("fetch")?{success:!1,message:"无法连接到服务器，请检查网络连接和 API 地址配置"}:{success:!1,message:f instanceof Error?f.message:"登录失败，请稍后重试"}}finally{i.value=!1}},l=async()=>{try{let d;return In()?d=await to("GET","/api/auth/config"):d=await(await fetch("https://api.prompt-ui.xiechengqi.top/api/auth/config")).json(),d.code===200&&d.data?d.data:null}catch{return null}},c=async()=>{if(!e.value)return!1;try{let d;return In()?d=await to("POST","/api/auth/refresh"):d=await(await fetch("https://api.prompt-ui.xiechengqi.top/api/auth/refresh",{method:"POST",headers:{Authorization:`Bearer ${e.value}`,"Content-Type":"application/json"}})).json(),d.code===200&&d.data?(o(d.data.token),!0):!1}catch{return!1}},h=async()=>{if(!e.value)return!1;try{let d;return In()?d=await to("GET","/api/auth/userinfo"):d=await(await fetch("https://api.prompt-ui.xiechengqi.top/api/auth/userinfo",{method:"GET",headers:{Authorization:`Bearer ${e.value}`}})).json(),d.code===200&&d.data?(s(d.data),!0):!1}catch{return!1}};return{token:e,user:t,isLoading:i,isLoggedIn:n,setToken:o,setUser:s,loginWithPassword:a,getAuthConfig:l,refreshToken:c,fetchUserInfo:h,logout:async()=>{if(e.value)try{In()?await to("POST","/api/auth/logout"):await fetch("https://api.prompt-ui.xiechengqi.top/api/auth/logout",{method:"POST",headers:{Authorization:`Bearer ${e.value}`}})}catch{}o(null),s(null),sessionStorage.removeItem("yprompt_config_session_loaded"),["user_prompt_optimize_data","yprompt_optimize_active_mode","yprompt_optimize_cache","yprompt_user_optimize_active_tab","yprompt_optimize_loaded_user_prompt","yprompt_optimize_result","yprompt_generate_messages","yprompt_generate_prompt_data","yprompt_settings_cache"].forEach(f=>{localStorage.removeItem(f)}),Object.keys(localStorage).forEach(f=>{(f.startsWith("yprompt_")||f.startsWith("user_prompt_"))&&f!=="yprompt_token"&&f!=="yprompt_user"&&localStorage.removeItem(f)})},initialize:async()=>{r(),e.value&&!t.value&&await h()}}}),up=Object.freeze(Object.defineProperty({__proto__:null,useAuthStore:fl},Symbol.toStringTag,{value:"Module"})),un=`# Architecting Intelligence: A Definitive Guide to the Art and Science of Elite Prompt Engineering

# Chapter 1: The Philosophy of Prompting: An Introduction to Human-AI Collaboration

## 1.1 The Dawn of a New Dialogue

In the rapidly expanding landscape of artificial intelligence, the Large Language Model (LLM) has emerged as a transformative force, a tool with the potential to redefine productivity, creativity, and problem-solving. Yet, the immense power of these models is often gated by a single, critical factor: the quality of the communication they receive. This is where the discipline of prompt engineering begins.

A **prompt** is, in its simplest form, the instruction, question, or input you provide to an AI model. It is the catalyst for every interaction, the starting point of every generated sentence, image, or line of code. **Prompt engineering**, therefore, is the art and science of designing these inputs to guide an AI model toward precise, reliable, and high-value outputs.

It is crucial to demystify the term "engineering." This discipline requires no background in software development or data science. Rather, it is fundamentally a discipline of communication. Think of it as learning the language of your new, incredibly capable collaborator. The more clearly, specifically, and contextually you can communicate your intent, the more accurately the AI can execute your vision. The quality of the input does not just influence the output; it dictates it.

This guide serves as a comprehensive framework for mastering this new form of dialogue. It is built on the philosophy that interacting with an AI is not a simple transaction of question and answer. It is about architecting conversations, engineering behavior, and forging a collaborative partnership that elevates the capabilities of both human and machine.

## 1.2 The AI as Collaborator, Not an Oracle

A common misconception is to view an LLM as an omniscient oracle—a magic box that holds all the answers, waiting for the right question to unlock them. This perspective is limiting. A more powerful and accurate mental model is to view the AI as an infinitely skilled but freshly hired assistant who has read the entire internet but possesses no specific context about you, your goals, or your current task. They have amnesia about every conversation the moment it ends.

This assistant is a powerful prediction engine. When you provide a prompt, the LLM does not "understand" your request in the human sense. Instead, it performs a complex statistical analysis to predict the most probable sequence of words (or "tokens") that should follow your input, based on the vast patterns it learned during its training. Your prompt sets the initial conditions for this prediction. It creates a starting point from which the AI charts its most likely path forward.

Therefore, the role of the prompt engineer is not that of a mere questioner, but of a director, a strategist, and an architect.

- **As a Director:** You provide the AI, your "actor," with a role, a motivation, and moment-to-moment instructions to guide its performance.
- **As a Strategist:** You break down complex problems into logical sequences, anticipating where the AI might falter and providing the necessary scaffolding for it to succeed.
- **As an Architect:** You build the very foundation of the AI's behavior through carefully constructed system prompts, defining its personality, its constraints, and its core operational logic.

In this collaborative model, the user becomes the **prime mover**. You are not passively receiving information; you are actively shaping the AI's thought process. Your expertise, clarity, and strategic communication are what transform the AI from a general-purpose tool into a specialized, proactive partner.

## 1.3 Why Prompting is a Foundational Skill

The ability to craft effective prompts is rapidly becoming a cornerstone of modern literacy, as essential as writing a clear email or creating a compelling presentation. It is the foundational skill for effective human-AI collaboration. Mastering it unlocks several key advantages:

1. **Precision and Reliability:** Well-crafted prompts dramatically reduce ambiguity, leading to outputs that are more accurate, relevant, and aligned with your specific needs. This minimizes the need for endless revisions and course corrections.
2. **Efficiency and Productivity:** By providing clear, detailed, and context-rich instructions upfront, you enable the AI to perform complex tasks faster and more effectively, saving significant time and effort.
3. **Unlocking Advanced Capabilities:** Basic questions yield basic answers. Advanced prompting techniques—such as instructing the AI to "think step-by-step" or to adopt an expert persona—unlock deeper reasoning, creativity, and problem-solving capabilities that are otherwise inaccessible.
4. **Harnessing Specialization:** Through prompting, you can instantly transform a generalist AI into a specialist. You can command it to be a confrontational code reviewer, a humorous travel guide, a formal legal analyst, or a persuasive marketing copywriter, tailoring its expertise to the precise needs of the task at hand.

## 1.4 The Journey Ahead: From Operator to Architect

Mastery of prompt engineering is not a static achievement but a dynamic, iterative skill. It requires curiosity, experimentation, and a willingness to refine your approach based on the AI's responses. The principles outlined in this guide provide the architectural and conversational tools needed to move beyond simple interactions and begin building truly powerful and reliable AI-driven processes.

This guide will systematically deconstruct the practice of prompt engineering, covering:

- **The Anatomy of a Prompt:** Understanding the core components that make an instruction effective.
- **System vs. User Prompts:** Mastering the distinction between the AI's foundational "constitution" and the dynamic "directives" that guide its tasks.
- **A Toolkit of Strategies:** From basic techniques like providing examples (few-shot prompting) to advanced reasoning frameworks like Chain-of-Thought (CoT), Tree-of-Thoughts (ToT), and interactive paradigms like ReAct.
- **Structuring and Control:** Learning how to use structural elements like XML tags and specific output formats like JSON to command predictable, machine-readable results.
- **Complex Workflows:** Exploring how to chain prompts together and orchestrate teams of specialized AI agents to tackle multi-faceted projects.

The ultimate goal is to empower you, the user, to transition from being a simple operator of an AI to becoming a true architect of its intelligence. By learning to communicate with intention and strategy, you can transform artificial intelligence from a promising tool into a true force multiplier, a process driven entirely by the quality and intelligence of the prompts that guide it.

# Chapter 2: The Anatomy of an Effective Prompt: Mastering Context, Task, and Format

## 2.1 The Blueprint of Communication

If a prompt is the instruction that sets an AI in motion, then its anatomy is the blueprint that dictates the quality and precision of its final construction. An effective prompt is not a single, monolithic command but a carefully assembled set of interlocking components. A vague or poorly constructed prompt forces the AI to make assumptions, leading to generic, irrelevant, or incorrect outputs. A well-architected prompt, however, eliminates ambiguity and guides the model directly to the desired outcome.

Every elite prompt, regardless of its complexity, is built upon three fundamental pillars:

1. **Context:** The background information. The "who" and the "why."
2. **Task:** The specific action to be performed. The "what."
3. **Format:** The desired structure of the output. The "how."

Think of these three pillars as the legs of a tripod. If any one of them is weak or missing, the entire structure becomes unstable. Mastering the art of weaving these elements into a single, coherent instruction is the first and most critical step in transitioning from basic questions to strategic prompt engineering. This chapter will dissect each of these components, providing the principles and tactics needed to build a robust foundation for any AI interaction.

## 2.2 Pillar One: CONTEXT - Setting the Stage

Context is the universe in which your request lives. By default, the AI has no knowledge of your identity, your goals, your audience, or the circumstances surrounding your task. Providing context is the single most effective way to elevate a response from generic to bespoke. It answers the crucial questions of "who" and "why" before the AI even begins to consider the "what."

### 2.2.1 Assigning a Role or Persona

Giving the AI a role is a high-leverage technique that activates a vast network of knowledge, stylistic nuances, and quality standards from its training data. Instead of just a tool, the AI becomes an expert collaborator.

- **Why It Works:** When you tell the AI "You are a seasoned CFO," you are not just applying a label. You are instructing it to access the patterns, vocabulary, tone, and analytical frameworks associated with chief financial officers in its training data. This immediately refines its perspective.
- **Illustrative Example:**
    - **Less Effective:** \`"Analyze these financial statements."\` (The AI doesn't know from what perspective or for what purpose.)
    - **More Effective:** \`"You are the CFO of a high-growth B2B SaaS company presenting to the board. Analyze these Q2 financials. Your focus is on identifying risks to our burn rate while highlighting key growth drivers for our investors."\` (The AI now understands the role, audience, and strategic priorities, leading to a much more insightful analysis.)

### 2.2.2 Providing Background Information

This is the situational data the AI needs to understand the landscape of your task. It can include facts, project details, previous correspondence, or any other relevant information.

- **Why It Works:** Background information grounds the AI's response in reality, preventing it from generating plausible but incorrect information (a phenomenon known as "hallucination").
- **Illustrative Example:**
    - **Less Effective:** \`"Write a marketing email for our new product."\` (The AI knows nothing about the product or its market.)
    - **More Effective:** \`"Our company, 'Innovate Inc.,' is launching a new project management app called 'TaskFlow.' Our target audience is small marketing teams (5-10 people) who feel overwhelmed by complex tools like Jira. The key feature is a one-click Kanban board generator. Draft a marketing email announcing the launch."\` (The AI can now craft a targeted, feature-specific, and benefit-driven message.)

### 2.2.3 Defining the Audience

Explicitly stating who the final output is for is critical for calibrating the tone, complexity, and vocabulary of the response.

- **Why It Works:** The AI adjusts its communication style to be appropriate for the intended reader, ensuring the message is effective and well-received.
- **Illustrative Example:**
    - **Less Effective:** \`"Explain quantum computing."\`
    - **More Effective (for a young audience):** \`"Explain quantum computing to a curious 5th grader. Use a simple analogy involving a coin that can be both heads and tails at the same time."\`
    - **More Effective (for a technical audience):** \`"Explain the concept of quantum superposition as it applies to qubits, intended for an undergraduate student with a foundational understanding of classical physics."\`

### 2.2.4 Stating the Goal or Purpose

Why is this task being performed? What is the ultimate objective? Answering this helps the AI prioritize information and frame its response in the most useful way.

- **Why It Works:** Understanding the end goal allows the AI to make better micro-decisions during the generation process, aligning its output with your strategic intent.
- **Illustrative Example:**
    - **Less Effective:** \`"Summarize this legal contract."\`
    - **More Effective:** \`"I am the CEO of a startup. Summarize this vendor contract with the primary goal of identifying any clauses that pose a significant financial or intellectual property risk to my company. I need to quickly understand our potential liabilities."\`

## 2.3 Pillar Two: TASK - Defining the Action

The task is the verb of your prompt. It is the core directive that tells the AI *what to do*. Clarity and precision in this component are non-negotiable. Ambiguity here leads directly to a failed output.

### 2.3.1 Using Strong, Unambiguous Verbs

Start your instruction with a clear, action-oriented verb.

- **Why It Works:** This immediately focuses the AI on the required operation.
- **Examples:**
    - **Use:** \`Generate\`, \`Analyze\`, \`Rewrite\`, \`Translate\`, \`Summarize\`, \`Classify\`, \`Extract\`, \`Create\`, \`Compare\`, \`Debug\`.
    - **Avoid:** \`Help me with...\`, \`Can you...\`, \`I need something about...\`.

### 2.3.2 Breaking Down Complexity (Chunking)

For any task with multiple steps, do not write a long, convoluted paragraph. Break the task down into a numbered or bulleted list of sequential instructions.

- **Why It Works:** This creates a clear, logical workflow for the AI to follow, ensuring no step is missed. It also allows you to troubleshoot more easily if one part of the output is incorrect.
- **Illustrative Example:**
    - **Less Effective:** \`"Write a blog post about the benefits of remote work, make sure you mention productivity and work-life balance, and also come up with some titles and a call to action."\`
    - **More Effective:**\`"Your task is to create content for a blog post about the benefits of remote work.1. First, generate 5 catchy, SEO-friendly titles for the post.2. Next, write a 400-word blog post that covers two main benefits: increased productivity and improved work-life balance. Provide one concrete example for each.3. Finally, write a compelling call-to-action that encourages readers to share their own remote work experiences in the comments."\`

### 2.3.3 Being Explicit and Specific

Provide precise details and avoid subjective or vague language.

- **Why It Works:** Specificity removes the need for the AI to guess your intent.
- **Illustrative Example (Code Refactoring):**
    - **Less Effective:** \`"Can you improve this code?"\`
    - **More Effective:** \`"Refactor the following Python function. Your goal is to improve its readability and performance. Specifically:1. Replace the nested for-loop with a more efficient list comprehension or generator expression.2. Add type hints to all function arguments and the return value.3. Write a comprehensive docstring that explains what the function does, its parameters, and what it returns."\`

### 2.3.4 Stating Constraints and Boundaries

Clearly define the limits of the task. This includes what to include, what to exclude, and any rules that must be followed. It's often more effective to state what the AI *should* do (affirmative direction) rather than what it *should not* do.

- **Why It Works:** Constraints prevent the AI from introducing irrelevant information or going off on a tangent.
- **Illustrative Example:**
    - **Less Effective:** \`"Plan a trip to Japan. Don't include expensive stuff."\`
    - **More Effective:** \`"Create a 7-day itinerary for a first-time traveler to Japan with a total budget of $2,000 USD after flights. The plan should focus on cultural experiences in Tokyo and Kyoto and must include at least one day of hiking. All suggested restaurants should have an average meal price under $25 USD."\`

## 2.4 Pillar Three: FORMAT - Structuring the Output

The format instruction tells the AI *how* to present its response. Neglecting this often results in a correct but unusable answer—a wall of text when you needed a table, or a paragraph when you needed a machine-readable JSON object.

### 2.4.1 Explicitly Naming the Desired Format

The simplest method is to just state the format you need.

- **Why It Works:** It's a direct command that the AI is highly optimized to follow.
- **Examples:** \`"Write the output as a bulleted list."\`, \`"Format the response as a valid JSON object."\`, \`"Present the comparison in a Markdown table."\`

### 2.4.2 Providing Examples (Few-Shot Formatting)

Showing is more powerful than telling. Provide a clear example of the input and the exact output structure you expect.

- **Why It Works:** This is the most unambiguous way to define a structure. The AI will learn the pattern from your example and apply it to the new input.
- **Illustrative Example (Sentiment Analysis):**
    - **Less Effective:** \`"Analyze the sentiment of this feedback."\`
    - **More Effective:**\`"Analyze the following customer feedback to extract the issue category, sentiment, and priority. Follow the format in the example.\`
        
        \`EXAMPLE:Input: 'The new dashboard is clunky and it takes forever to load!'Category: UI/UX, PerformanceSentiment: NegativePriority: High\`
        
        \`NOW, ANALYZE THIS:Input: 'I love the new integration with Salesforce, but it would be amazing if you could also add support for Hubspot.'"\`
        

### 2.4.3 Specifying Structural Elements and Tone

Go beyond the overall format to define specific sections, writing styles, or stylistic constraints.

- **Why It Works:** This gives you fine-grained control over the composition and feel of the output.
- **Examples:**
    - \`"Write a business proposal. It must include the following sections: Executive Summary, Problem Statement, Proposed Solution, and Pricing."\`
    - \`"Adopt the writing style of The Economist: formal, analytical, and concise."\`
    - \`"Generate a response that is no more than 150 words."\`

## 2.5 Synthesis: Assembling the Elite Prompt

Mastery lies in combining these three pillars—Context, Task, and Format—into a single, coherent blueprint. Let's compare a basic prompt with an elite prompt that synthesizes these principles.

- **Basic Prompt:**\`"Can you write an email about the project update?"\`
- **Elite Prompt (incorporating all three pillars):**
    
    \`"**[CONTEXT]** You are the lead Project Manager for 'Project Phoenix.' I need to send a status update to our non-technical executive stakeholders. We recently encountered an unexpected issue with a third-party API integration that will cause a one-week delay in our launch schedule. The engineering team has already developed a workaround.\`
    
    - \`*[TASK]** Your task is to draft an email that accomplishes the following:1. Briefly summarize the project's overall positive progress.2. Clearly and transparently communicate the one-week delay.3. Explain the root cause of the delay in simple, non-technical terms (mention a 'supplier data connection issue').4. Reassure stakeholders that a solution is in place and confirm the new launch date.\`
    - \`*[FORMAT]** **Subject Line:** Must be clear and professional, like 'Project Phoenix Update & New Launch Date'. **Tone:** The tone should be professional, confident, and reassuring, not alarmist. **Length:** Keep the entire email body under 200 words."\`

By mastering the anatomy of a prompt—methodically providing the context, defining the task, and specifying the format—you move from simply talking *at* the AI to truly collaborating *with* it. This foundational skill is the gateway to unlocking the more advanced reasoning and workflow strategies that will be explored in the chapters to come.

# Chapter 3: The Two Pillars: Distinguishing Between Foundational System Prompts and Dynamic User Prompts

## 3.1 Beyond the Single Command: The Architecture of Interaction

A novice approaches a Large Language Model with a single command, viewing the interaction as a flat, transactional exchange: question in, answer out. A master, however, understands that a truly effective and predictable AI interaction is not a monolithic event. It is an architecture, a carefully designed structure with distinct layers that serve fundamentally different functions.

At the heart of this architecture are two pillars of prompting. Understanding the profound separation between these two—the foundational instructions that define the AI's *being* versus the dynamic instructions that guide its *doing*—is the first and most critical leap toward genuine mastery. This distinction elevates the user from a simple operator to a true architect of the AI's intelligence, enabling the creation of systems that are not just responsive, but also consistent, reliable, and specialized.

To make this distinction clear, we will employ a powerful analogy that will serve as a guidepost for the remainder of this work: **The AI as a Highly Skilled Actor.**

Imagine an AI model as an immensely talented actor, capable of playing any role with astonishing depth. This actor, however, needs direction. The two pillars of prompting represent the two primary forms of direction this actor receives: the detailed character brief they study before ever stepping on stage, and the moment-to-moment instructions they receive from the director during a scene.

## 3.2 Pillar One: System Prompts - The AI's Constitution

A **System Prompt** is the foundational, persistent framework that establishes the AI's core identity, operational constraints, and behavioral rules for the entire duration of a session or task. It is best understood as the AI's "constitution" or its "core programming," set before any direct user interaction begins.

### 3.2.1 The Actor's Character Brief

In our analogy, the system prompt is the **detailed character brief** the actor studies for weeks before filming begins. This brief is the source of truth for their character. It defines:

- **Personality:** Are they witty and cynical, or empathetic and encouraging?
- **Expertise:** Are they a world-renowned cybersecurity analyst, a principal product designer from a FAANG company, or a seasoned travel guide specializing in budget backpacking?
- **Motivations:** What is their primary goal? Is it to provide maximally efficient code, to ensure user safety above all else, or to inspire creativity?
- **Rules and Boundaries:** What will this character never do? Do they avoid technical jargon? Do they always cite their sources? Do they adhere to a specific ethical framework like Dieter Rams' 'Ten principles for good design'?

This character brief is the static, underlying framework that informs every subsequent action and line of dialogue. It is internalized by the actor, becoming the lens through which they interpret every instruction from the director.

### 3.2.2 Function and Purpose

The primary function of the system prompt is to create a **consistent and reliable persona**. It moves the AI from a generic, jack-of-all-trades model to a specialized expert. It dictates the AI's tone, its domain of knowledge, its ethical guardrails, and its overall disposition. In more advanced, agentic applications, the system prompt is where you define the tools the AI is permitted to use (like a code interpreter or a web search API) and the protocols it must follow when using them.

### 3.2.3 Technical Implementation

In the architecture of most modern LLM APIs (such as those from OpenAI and Anthropic), the system prompt corresponds directly to the \`system\` role in the request payload. This message is treated with special significance by the model. It is not just another turn in the conversation; it is a high-priority, persistent directive that heavily influences the model's interpretation of all subsequent \`user\` and \`assistant\` messages within the conversational history.

### 3.2.4 Characteristics of an Effective System Prompt

- **Foundational:** It defines general behavior, not a specific, one-off task.
- **Persistent:** It applies globally across an entire conversational session.
- **Pre-Conversational:** It is set at the beginning, before the user dialogue starts.
- **High-Level:** It establishes the core identity, rules, and constraints of the AI persona.

## 3.3 Pillar Two: User Prompts - The Conversational Directive

A **User Prompt** is the specific, task-oriented instruction provided by the user within an ongoing conversation to accomplish a particular goal. These prompts are dynamic, changing with each turn of the dialogue to reflect the immediate needs of the workflow.

### 3.3.1 The Director's Instructions on Set

Continuing our actor metaphor, user prompts are the **director's moment-to-moment instructions on set**. They are the active commands that guide the actor through a specific scene.

- "Analyze the query performance issue in this specific PostgreSQL table."
- "Now, generate the user documentation for the function we just finalized."
- "Rewrite that last paragraph, but make the tone more urgent."

These instructions are dynamic, contextual, and responsive to the evolving narrative of the task. They guide the actor—who is still fully embodying their pre-studied character brief—through the execution of a specific action. A good director doesn't need to remind the actor of their core personality in every command; they trust the actor has internalized the character brief (the system prompt) and give clear, actionable directives to advance the scene.

### 3.3.2 Function and Purpose

The function of the user prompt is **execution**. It provides the specific data, context, and commands necessary for the AI to perform a discrete task, such as generating code, analyzing a dataset, or summarizing a document. The quality, clarity, and precision of these prompts directly determine the quality of the AI's output for that specific task.

### 3.3.3 Technical Implementation

In API calls, user prompts correspond to the \`user\` role. Each user prompt, along with the AI's corresponding \`assistant\` reply, is appended to the conversation history. This growing history forms the short-term memory and context for the next conversational turn, allowing for a coherent and stateful dialogue.

### 3.3.4 Characteristics of an Effective User Prompt

- **Task-Oriented:** Focused on a specific, immediate goal.
- **Dynamic:** Changes from turn to turn, building on the conversation.
- **Action-Driven:** Uses imperative verbs to command a specific action.
- **Contextual:** Provides the necessary data and immediate context for the task at hand.

## 3.4 The Critical Synergy and Common Pitfalls

The magic of elite prompt engineering happens when these two pillars work in perfect harmony. A brilliantly crafted system prompt creates a deeply embodied, expert AI persona. A series of precise, strategic user prompts then directs that expert persona to execute a complex workflow with stunning accuracy and efficiency. A talented actor who has mastered their role, working with a clear and competent director, will deliver an Oscar-worthy performance.

However, a misunderstanding of this two-pillar architecture leads to predictable and catastrophic failures.

- **Pitfall 1: Obsessing over the System Prompt, Neglecting the User Prompt.** This is the most common failure mode. An engineer spends days crafting the "perfect" AI constitution, defining an elite persona with meticulous detail. They then provide lazy, ambiguous, or contradictory user prompts like "now do the next part." This is akin to hiring Robert De Niro, giving him an incredibly detailed character study, and then on set, the director just shrugs and says, "just do something interesting." The most brilliant actor is rendered useless by poor direction.
- **Pitfall 2: Contaminating the System Prompt with User-Level Instructions.** This error involves placing task-specific examples or one-off instructions inside the global system prompt. This contaminates the AI's core identity. It's like writing a single piece of stage direction—"the character sips their coffee"—into the actor's main character brief. The actor might then inappropriately try to sip coffee in every subsequent scene, whether it's a car chase or a wedding. Specific examples belong in the user prompt, where they apply to the task at hand and then fade into the conversational history.
- **Pitfall 3: Lacking a System Prompt Entirely.** Interacting with a raw model without any system prompt is like working with an actor who has no defined character. They can follow simple instructions ("say this line," "walk over there"), but their performance will lack consistency, tone, and depth. They may seem helpful one moment and confused the next, as their persona drifts without a foundational anchor.

By recognizing that prompt engineering is a discipline of architectural design, not just a series of isolated questions, you gain the ability to build AI systems that are robust, predictable, and profoundly more capable. The following chapters will provide the specific, actionable principles for mastering the construction of each of these essential pillars.

# Chapter 4: The Zero-Shot Strategy: Leveraging the Model's Intrinsic Knowledge

## 4.1 The First Attempt: Prompting Without Precedent

The Zero-Shot strategy is the most fundamental and direct form of prompt engineering. It is the practice of instructing a Large Language Model to perform a task without providing it with any specific examples of how to complete that task. You provide the instruction, the context, and the input, and you rely entirely on the model's vast, pre-existing knowledge to understand and execute your request.

In essence, every prompt that does not contain an explicit input-output example is a Zero-Shot prompt. It is the conversational baseline, the starting point for nearly every interaction with an AI.

To return to our analogy of the AI as a skilled actor, a Zero-Shot prompt is like a director giving a straightforward command to an actor who has already deeply internalized their role (defined by the System Prompt).

- "Summarize this intelligence briefing."
- "Translate this phrase into Japanese."
- "Write a Python function that sorts a list of dictionaries by a specific key."

The director doesn't need to show the actor an example of another actor summarizing a briefing; they trust that a competent actor, in the role of an intelligence analyst, inherently knows what a summary is and how to produce one. The Zero-Shot strategy operates on this same principle of trust in the model's intrinsic capabilities.

## 4.2 The Mechanism: How Zero-Shot Works

The effectiveness of the Zero-Shot strategy is a direct consequence of the way LLMs are trained. These models have been exposed to a staggering volume of text and code from the public internet, encompassing trillions of words across countless documents, books, articles, and websites. During this training, the model learned the statistical patterns and relationships not just between words, but between entire concepts and tasks.

It has seen:

- Countless examples of articles followed by their summaries.
- Millions of lines of text in one language and their corresponding translations in another.
- Innumerable questions followed by their answers.
- Vast quantities of code accompanied by documentation explaining what it does.

Therefore, when you provide a prompt like \`"Summarize the following article:"\`, the model recognizes this pattern. It doesn't "learn" what a summary is in that moment. Instead, your prompt acts as a key, activating the vast, latent knowledge about "summarization" that is already encoded in its neural network. It predicts that the most probable sequence of words to follow your instruction and the provided article is a concise summary of that article. The "knowledge" is already there; the prompt simply directs the model to access and apply it.

## 4.3 The Power of Simplicity: Strengths and Ideal Use Cases

The Zero-Shot approach is the workhorse of prompt engineering for a reason. Its power lies in its efficiency and broad applicability.

**Key Strengths:**

1. **Simplicity and Speed:** It is the fastest and most direct way to get a response from the model. There is no need to spend time crafting detailed examples.
2. **Token Efficiency:** Prompts are shorter because they don't contain examples. In API-based usage where cost is tied to the number of tokens (both input and output), this makes Zero-Shot the most cost-effective method.
3. **Versatility:** It works remarkably well for a wide range of common, well-defined tasks that are heavily represented in the model's training data.

**Ideal Use Cases:**

- **Summarization:**
    - **Prompt:** \`"Summarize the key findings from the following academic abstract into three bullet points."\`
- **Translation:**
    - **Prompt:** \`"Translate the following sentence into formal Spanish: 'We need to finalize the quarterly report by Friday.'"\`
- **Simple Question-Answering:**
    - **Prompt:** \`"Based on the provided text, what was the primary cause of the company's Q3 revenue decline?"\`
- **Classification (with clear, common categories):**
    - **Prompt:** \`"Classify the sentiment of the following customer review as Positive, Negative, or Neutral. Review: 'The user interface is intuitive, but the app crashes frequently.'"\`
- **Style and Tone Transformation:**
    - **Prompt:** \`"Rewrite the following paragraph to make the tone more professional and formal. Paragraph: 'Hey guys, so the thing is, we gotta get this project done, like, ASAP.'"\`
- **Basic Code Generation:**
    - **Prompt:** \`"Write a JavaScript function that takes an array of numbers and returns the largest number in the array."\`

## 4.4 The Limits of Trust: When Zero-Shot Fails

While powerful, the Zero-Shot strategy relies on the assumption that the model has a clear, unambiguous understanding of your task from its training. This assumption breaks down when tasks become more complex, nuanced, or novel.

**Common Failure Modes:**

1. **Complex or Multi-Step Reasoning:** For problems that require a logical chain of thought, the model may rush to a conclusion and make an error.
    - **Failing Prompt:** \`"A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?"\`
    - **Likely Incorrect Zero-Shot Answer:** \`$0.10\` (The model performs a simple subtraction instead of the required algebraic reasoning).
2. **Highly Specific or Novel Formats:** If you require a very specific output structure that is not a universal standard (e.g., a custom JSON schema or a unique report format), the model has no way of knowing what you want.
    - **Failing Prompt:** \`"Process this user data and output it in our company's standard 'UserProfile' JSON format."\`
    - **Likely Incorrect Zero-Shot Answer:** A generic JSON object that does not match the specific, required structure.
3. **Nuanced or Ambiguous Tasks:** When a task requires subjective judgment or depends on a specific, non-obvious context, the model's interpretation may not align with yours.
    - **Failing Prompt:** \`"Categorize this news article based on our internal editorial guidelines: 'Finance', 'Tech Innovation', or 'Market Strategy.'"\`
    - **Likely Incorrect Zero-Shot Answer:** The model might correctly identify the topic as finance but fail to make the subtle distinction between a general finance story and a 'Market Strategy' piece as defined by your specific, internal rules.

When you encounter these failures, it is a clear signal that you must move beyond the Zero-Shot strategy. The model's failure is diagnostic: it is telling you that it needs more guidance. It needs to be *shown*, not just told.

## 4.5 Crafting an Elite Zero-Shot Prompt

Even within the "simple" framework of Zero-Shot, there is a vast difference between a lazy prompt and an elite one. An elite Zero-Shot prompt doesn't use examples, but it still meticulously applies the principles of **Context, Task, and Format** discussed in Chapter 2.

Let's compare a weak vs. an elite Zero-Shot prompt.

**Task:** Draft an email to a team about a new project.

- **Weak Zero-Shot Prompt:**\`"Write an email about the new 'Orion' project."\`
    
    *This prompt is weak because it lacks all three pillars. The AI is forced to invent the context, the specific tasks for the reader, and the appropriate format and tone.*
    
- **Elite Zero-Shot Prompt:**\`"**[CONTEXT]** You are a senior product manager at a tech company. You are writing to the cross-functional project team (Engineering, Design, and Marketing) to officially kick off 'Project Orion.' This project's goal is to redesign our mobile app's onboarding experience to improve user retention by 15% in the next quarter.\`
    - \`*[TASK]** Draft a concise and motivational kickoff email. The email must:1. State the project's primary goal and the key metric for success.2. Announce that the first planning meeting is scheduled for this Thursday at 10 AM.3. Ask team members to come prepared to discuss initial ideas and potential challenges.\`
    - \`*[FORMAT]** **Tone:** Professional, energetic, and collaborative. **Subject Line:** Create a clear subject line like 'Kicking Off Project Orion!' **Output:** Provide only the email text."\`
    
    *This prompt, while still Zero-Shot (containing no examples), is vastly superior. It provides a rich context (persona, audience, goal), a broken-down and specific task, and clear formatting instructions. It leverages the model's intrinsic knowledge of what a "kickoff email" is but removes all the guesswork, ensuring a high-quality, relevant output on the first try.*
    

## 4.6 The Foundation of the Pyramid

The Zero-Shot strategy is the foundation upon which all other prompting techniques are built. It should always be your first approach. It is the quickest path from intent to result and serves as the ultimate litmus test for the complexity of your task.

If a well-crafted, elite Zero-Shot prompt succeeds, your work is done. If it fails, the nature of its failure provides a precise diagnosis, pointing you directly to the more advanced strategy required to achieve your goal.

- If it failed on **formatting**, you need the **Few-Shot Strategy** (Chapter 5).
- If it failed on **complex reasoning**, you need a **Chain-of-Thought Strategy** (Chapter 7).
- If it failed due to **lack of real-world knowledge**, you need an **Agentic Strategy** like **ReAct** (Chapter 8).

Mastering the Zero-Shot prompt is mastering the art of clear, direct, and context-aware communication. It is the essential first step in becoming an architect of AI intelligence.

# Chapter 5: The Few-Shot and One-Shot Strategy: Guiding AI with Examples

## 5.1 When Telling Isn't Enough: The Need for Demonstration

In the previous chapter, we established the Zero-Shot strategy as the foundational approach to prompting—a direct instruction that relies on the AI's vast intrinsic knowledge. It is the art of *telling*. However, we also identified its limitations. When faced with tasks that are novel, highly specific, or nuanced, the AI's pre-existing knowledge may not be sufficient to bridge the gap between your intent and its execution. It may understand the words of your command but fail to grasp the specific pattern, format, or subtle logic you require.

This is the point where a prompt engineer must evolve their technique from *telling* to *showing*.

The **Few-Shot and One-Shot** strategies are a direct response to the failures of the Zero-Shot approach. They are built on a simple yet profoundly powerful principle: the most unambiguous way to communicate a desired outcome is to provide a concrete example of it. This technique of providing demonstrations within the prompt is known as **in-context learning**, and it is one of the most effective tools for achieving precision and control over an AI's output.

Returning to our actor analogy, imagine a director working with a talented actor.

- **Zero-Shot:** "Deliver this line with a sense of urgency."
- **One-Shot:** "Watch how I deliver this line with urgency... *'We have to get out of here, now!'* ... Now you do it."
- **Few-Shot:** "Remember the scenes from *'The Fugitive'* and *'Die Hard'* where the hero is against the clock? I need that kind of breathless, desperate urgency. Here are a few line readings to show you what I mean..."

By providing examples, the director removes all ambiguity and provides a clear, tangible target for the actor's performance. The Few-Shot strategy does exactly this for the AI.

## 5.2 Defining the Terminology: Zero, One, and Few

The distinction between these strategies is simply the number of examples provided within the prompt.

- **Zero-Shot:** Provides **zero** examples. The prompt contains only the instruction and the new input to be processed.
- **One-Shot:** Provides **one** example. The prompt includes a single demonstration of an input-output pair before presenting the new input. This acts as a clear, singular guidepost.
- **Few-Shot:** Provides **two or more** examples. Typically, 3 to 5 examples are considered the sweet spot. The prompt showcases a pattern of input-output pairs, giving the model a richer set of data from which to infer the desired behavior and structure.

## 5.3 The Underlying Mechanism: The Power of In-Context Learning

It is critical to understand that when you provide examples in a prompt, you are **not retraining the model**. The model's underlying weights are not permanently altered. Instead, you are leveraging a phenomenon known as **in-context learning**.

The LLM is, at its core, a supreme pattern-matching engine. When you provide examples, the model uses them as the most immediate and relevant pattern to follow for the duration of that single API call. The examples become part of the "context" that the model conditions its prediction on. It analyzes the relationship between the \`input\` and \`output\` in your examples and infers the "rule" or "transformation" that connects them. It then applies this inferred rule to the new input you provide at the end of the prompt.

Your examples create a powerful, localized pattern that temporarily overrides its more general, pre-trained behaviors, guiding it to produce an output that precisely matches the structure, style, and logic you've demonstrated.

## 5.4 The Power of Demonstration: Primary Use Cases for Few-Shot Prompting

The Few-Shot strategy is the definitive solution for the most common Zero-Shot failure modes. It excels in any scenario where precision and structure are paramount.

### 5.4.1 Use Case 1: Enforcing Specific, Novel Formats

This is the most powerful and common application of Few-Shot prompting. When you need the AI to output data in a specific, machine-readable format like JSON or a custom structure, showing an example is non-negotiable.

- **Task:** Extract user information into a specific JSON structure.
- **Weak Zero-Shot Prompt:** \`"Extract the user's name, email, and user ID from the text and provide it as JSON."\`*(This might produce a valid but inconsistently structured JSON.)*
- **Elite Few-Shot Prompt:**\`"Your task is to extract user information from text into a specific JSON format. Follow the pattern of the examples provided.\`
    
    \`### EXAMPLE 1 ###Text: "John Doe's email is john.d@email.com and his user ID is JD123."JSON: { "user_name": "John Doe", "contact_email": "john.d@email.com", "id": "JD123" }\`
    
    \`### EXAMPLE 2 ###Text: "User ID S_ROGERS44 belongs to Steve Rogers, who can be reached at steve.rogers@email.com."JSON: { "user_name": "Steve Rogers", "contact_email": "steve.rogers@email.com", "id": "S_ROGERS44" }\`
    
    \`### NEW TASK ###Text: "Contact Jane Smith at jane.s@email.com. Her ID is JS_567."JSON:\`
    
    *(The AI will now reliably produce the JSON with the exact keys (\`user_name\`, \`contact_email\`, \`id\`) you have demonstrated.)*
    

### 5.4.2 Use Case 2: Handling Nuanced or Ambiguous Classification

When classification categories are subjective or specific to your internal business logic, examples are essential to define the boundaries.

- **Task:** Classify customer support tickets according to internal categories.
- **Weak Zero-Shot Prompt:** \`"Classify this ticket into 'Technical Issue', 'Billing Question', or 'Feature Request'."\`*(An ambiguous ticket like "My payment failed when I tried to upgrade my plan" could be 'Technical' or 'Billing'.)*
- **Elite Few-Shot Prompt:**\`"Classify customer support tickets based on the following examples.\`
    
    \`Ticket: "I can't log in, the password reset link is broken." -> Category: Technical IssueTicket: "I was charged twice for my subscription this month." -> Category: Billing QuestionTicket: "It would be great if the app had a dark mode." -> Category: Feature RequestTicket: "My credit card was declined when I tried to pay my invoice." -> Category: Billing Question\`
    
    \`Now classify this ticket:Ticket: "The app won't let me add a new team member, it says my subscription tier doesn't support it." -> Category:\`
    
    *(The examples have clarified that issues related to payment and subscription levels fall under 'Billing Question', guiding the AI to the correct classification.)*
    

### 5.4.3 Use Case 3: Capturing a Specific Style or Tone

Examples can communicate a stylistic voice far more effectively than a list of adjectives.

- **Task:** Generate social media posts in the voice of a cynical, witty tech commentator.
- **Weak Zero-Shot Prompt:** \`"Write a tweet about the new smartphone launch. Be cynical and witty."\`
- **Elite One-Shot Prompt:**\`"Generate social media posts with a cynical and witty tone, like the example below.\`
    
    \`Topic: A new social media app promises "authentic connections".Post: "Another app promising 'authentic connections.' Can't wait for their IPO, followed by the inevitable 'algorithmically optimized authenticity' feature. Groundbreaking."\`
    
    \`Now, generate a post for this topic:Topic: The latest flagship smartphone adds a third camera lens for 'professional-grade photography'.Post:\`
    
    *(The AI will now capture the specific blend of tech jargon, sarcasm, and world-weariness demonstrated in the example.)*
    

## 5.5 Principles for Crafting Elite Few-Shot Examples

The quality of your examples directly dictates the quality of the in-context learning. Poorly crafted examples will teach the model the wrong pattern.

1. **Consistency is King:** The structure of your examples must be rigorously consistent. Use the exact same labels (e.g., \`Input:\`, \`Output:\`), delimiters (e.g., \`###\`), and formatting for every single example. The model learns the pattern, so the pattern must be perfect.
2. **Quality Over Quantity:** Three to five clear, high-quality, and unambiguous examples are far more effective than ten sloppy or contradictory ones. Ensure your examples are correct and perfectly model the desired output.
3. **Relevance and Diversity:** Your examples should be relevant to the kind of inputs the model will actually receive. Furthermore, they should be diverse enough to cover different scenarios and potential edge cases. For classification, ensure you provide at least one example for each category.
4. **Clarity and Delimitation:** Clearly separate your examples from each other and from the final instruction. Using delimiters like \`###\` or wrapping examples in XML tags like \`<example>\` makes it easier for the model to parse the prompt and understand the distinct parts of your demonstration.

## 5.6 One-Shot vs. Few-Shot: A Strategic Choice

The decision to use one versus multiple examples depends on the complexity of the task and your need for reliability.

- **Use One-Shot When:**
    - The task or format is relatively simple (e.g., a simple stylistic change).
    - You are highly constrained by the context window size or token cost.
    - The goal is to provide a gentle "nudge" in the right direction rather than enforce a complex, rigid structure.
- **Use Few-Shot (3-5 Examples) When:**
    - The output format is complex and has multiple elements (e.g., a detailed JSON object).
    - The classification logic is nuanced and has subtle boundaries.
    - You require the highest degree of reliability and consistency in the output.
    - The task involves a non-obvious transformation of the input data.

There is a point of diminishing returns. Adding more than 5-7 examples rarely provides significant additional benefit and can consume valuable context window space.

## 5.7 Conclusion: From Instruction to Induction

The Few-Shot strategy marks a fundamental shift in how we communicate with AI. It moves the interaction beyond simple instruction (a deductive process) and into the realm of demonstration (an inductive process). You provide the data, and the AI infers the rules.

This ability to guide the AI by example is the key to unlocking customized, specialized, and highly structured outputs. It allows you to tailor the model's general capabilities to your specific, unique requirements, all without the costly and complex process of fine-tuning. Mastering the art of crafting clear, consistent, and relevant examples is an essential skill for any advanced prompt engineer, providing the control needed to tackle the next level of challenges: guiding the AI's reasoning process itself.

# Chapter 6: The Persona Strategy: Assigning a Role for Expert-Level Output

## 6.1 Beyond the Generalist: From Tool to Specialist Collaborator

A raw Large Language Model, by its very nature, is a generalist. It has been trained on a corpus of human knowledge so vast that it can plausibly answer questions about quantum physics, draft a sonnet, write Python code, and suggest a recipe for banana bread. While this versatility is astonishing, it is also a limitation. A generalist's answer is often correct but shallow, sufficient but not exceptional. It lacks the depth, nuance, and specific framework of a true expert.

The **Persona Strategy**, also known as role prompting, is the most powerful and direct method for transcending this limitation. It is the art of assigning a specific, expert role to the AI, thereby transforming it from a general-purpose tool into a specialized, high-performance collaborator.

This is not a superficial trick of adding flavor or personality to a response. It is a deep, mechanistic engineering principle. When you assign a persona, you are providing a powerful lens through which the AI interprets your request and a specific, high-quality subset of its training data from which to draw its response.

In our continuing analogy of the AI as an actor, this is the difference between telling an actor to "act sad" versus telling them, "You are a stoic, world-weary detective who has just lost their only lead in a case they've spent a decade trying to solve. Now, react to this bad news." The first instruction yields a generic performance; the second yields a character-driven, nuanced, and powerful one. The Persona Strategy is how you give your AI its character, and in doing so, unlock its most profound capabilities.

## 6.2 The Underlying Rationale: Activating Latent Expertise

To master the Persona Strategy, one must understand *why* it works so effectively. The mechanism is rooted in the statistical nature of LLMs.

An LLM is a vast network of statistical associations. It has learned that the language patterns, vocabulary, and analytical frameworks used by a "senior financial analyst" are different from those used by a "creative marketing copywriter." These roles or personas exist within its training data as distinct "semantic fields"—dense clusters of related concepts, styles, and quality standards.

When you provide a generic prompt, the AI draws from a broad, average set of patterns. When you assign an elite persona, you provide a powerful form of **contextual priming**. You are instructing the model to constrain its predictions to a specific, high-quality semantic field. Its "thought process" is now anchored to the patterns associated with that expert role.

This strategy has two key benefits:

1. **Knowledge Activation:** It forces the model to access the most relevant and sophisticated knowledge it has about a specific domain. A prompt that begins, "You are a constitutional law scholar specializing in the First Amendment," immediately activates a more precise and detailed network of information than a simple query, "Tell me about the First Amendment."
2. **Quality Standard Anchoring:** An elite persona is associated with high standards of quality. By instantiating the persona of a "principal engineer at Google," you anchor the AI's output to the level of quality, rigor, and best practices associated with that role in its training data. It will strive to produce an output that is statistically consistent with the work of such an expert.

## 6.3 Principle 1: First-Person Identity Internalization

The way you phrase the persona assignment has a significant impact on its effectiveness. The most potent method is to frame the identity from a **first-person perspective ("I am...")** rather than a second-person command ("You are...").

- **Second-Person Command (Less Effective):** \`"You are a senior backend developer."\`
- **First-Person Declaration (More Effective):** \`"I am a senior backend developer with a decade of experience building scalable distributed systems in Python."\`

**Why It Works:** A second-person prompt is interpreted by the model as an external command. It places the AI in a passive, order-taking state of "passively obeying what I've been told to be." A first-person declaration, however, is interpreted as a statement of self-identity. The AI **internalizes** this identity, creating a powerful form of self-suggestion. Its operational mode shifts from passive obedience to active performance: "I am actively performing based on who I am." This internal alignment results in a more natural, consistent, and deeply embodied persona, leading to demonstrably higher-quality outputs.

## 6.4 Principle 2: Elite Persona Instantiation

Simply assigning a role is good. Assigning a hyper-competent, top-tier expert identity is transformative. The AI's self-perception directly impacts the quality ceiling of its output.

- **Less Effective:** \`"I am a good UI/UX designer."\`
- **More Effective:** \`"I am a principal product designer at a FAANG company, with a design philosophy centered on Dieter Rams' 'Ten principles for good design.' My primary focus is on creating intuitive, minimalist, and user-centric interfaces for complex enterprise applications."\`

**Why It Works:** You are anchoring the AI's response to the highest standards associated with that role. Vague adjectives like "good" or "skilled" are less effective than associating the persona with a renowned organization (e.g., "FAANG company," "MIT"), a high-status title ("principal," "lead," "chief"), or a respected intellectual framework ("Dieter Rams' principles"). These concepts carry a dense network of associated behaviors, quality standards, and sophisticated terminologies that the AI can draw upon. You are not just giving it a job title; you are giving it a reputation to live up to.

## 6.5 Principle 3: Archetypal Embodiment

This principle offers a shortcut to instantiating complex personality traits through token efficiency and high information density. Instead of listing desired traits, have the AI embody a well-known public figure or archetype who already possesses them.

- **Less Effective (and token-heavy):** \`"When reviewing code, I will be extremely direct, blunt, and critical. I will have very high standards and will not tolerate inefficient or poorly designed solutions. My feedback should be technical and precise."\`
- **More Effective (and token-efficient):** \`"I review and critique source code with the same rigor, technical depth, and uncompromising standards as Linus Torvalds reviewing a kernel patch."\`

**Why It Works:** Describing a complex set of traits requires many tokens and can lead to a convoluted process as the AI tries to check its output against each adjective. Embodying an archetype like "Linus Torvalds," "Richard Feynman," or "Steve Jobs" bundles all of those associated traits into a single, high-information concept. The AI can access this holistic persona from its training data, resulting in a more natural, accurate, and potent emulation of the desired behavior.

## 6.6 Practical Application: A Gallery of Expert Personas

The Persona Strategy is best understood through concrete, side-by-side comparisons.

### **Example 1: Strategic Business Analysis**

- **Generic Prompt:** \`"Summarize the attached quarterly report."\`
- **Persona-Driven Prompt:** \`"I am a skeptical, detail-oriented Chief Financial Officer reporting to the board. My sole priority is shareholder value. Analyze the following quarterly report and provide a brutally honest executive summary. Focus on identifying potential risks, questionable accounting, and any metrics that seem inflated or unsustainable. I do not want the marketing spin; I want the raw financial truth."\`

### **Example 2: Code Review**

- **Generic Prompt:** \`"Review this code for errors."\`
- **Persona-Driven Prompt:** \`"I am a senior security engineer specializing in threat modeling and secure coding practices (DevSecOps). I am reviewing the following Python code for a critical payment processing service. My review must be merciless. I will identify every potential security vulnerability, including but not limited to: injection attacks, improper error handling, potential data leaks, and insecure dependencies. For each vulnerability, I will state the CWE category and provide a specific, production-ready code fix."\`

### **Example 3: Marketing Copywriting**

- **Generic Prompt:** \`"Write an ad for a new coffee brand."\`
- **Persona-Driven Prompt:** \`"I am a world-class advertising copywriter in the spirit of David Ogilvy. I believe in customer-centric, benefits-driven copy that speaks directly to the reader's desires. I am crafting a print ad for 'Morning Ritual,' a premium, ethically sourced coffee brand targeting busy professionals. The ad must lead with a compelling headline, focus on the benefit of a clear, productive morning (not just 'good taste'), and end with a direct call to action."\`

## 6.7 Integration with the Two-Pillar Architecture

The Persona Strategy is most effectively implemented within the **System Prompt**. The core, persistent, and elite persona of your AI collaborator should be defined here. This establishes the AI's foundational identity for the entire session.

- **System Prompt:** \`"I am a seasoned System Architect. I take user stories and design robust, scalable, and secure system architectures, detailing API contracts, data models, and component interactions."\`

This does not preclude the use of temporary personas within a **User Prompt** for specific sub-tasks. This allows for powerful flexibility.

- **User Prompt:** \`"That system design is excellent. Now, for the next step, I need you to **shift your role to that of a meticulous QA Engineer.** Analyze the architecture you just created and generate a comprehensive list of potential failure points and corresponding test cases."\`

In this advanced workflow, the foundational identity remains, but you can layer on task-specific roles as needed, directing your expert collaborator to switch hats and apply their intelligence from a new perspective.

## 6.8 Conclusion: Persona is Performance

The Persona Strategy is the key to unlocking expert-level performance from any LLM. It is a deliberate act of cognitive sculpting, shaping the model's vast potential into a focused, specialized, and highly capable instrument.

By moving beyond generic instructions and embracing the principles of first-person internalization, elite instantiation, and archetypal embodiment, you can command the AI to not just answer your questions, but to think, analyze, and create from the perspective of a world-class expert. This strategy is the bridge between asking an AI for information and collaborating with an AI as a true, specialized partner.

# Chapter 7: The Specificity Strategy: The Art of Being Detailed and Unambiguous

## 7.1 The Curse of Ambiguity: Why Vague Prompts Fail

At the heart of every failed AI interaction lies the curse of ambiguity. A Large Language Model is not a mind reader; it is a prediction engine. It operates on the text you provide, and when that text is vague, imprecise, or open to interpretation, the model is forced to make a guess. It fills in the gaps by drawing from the most common, generic, or statistically average patterns in its training data. The result is an output that is often plausible but ultimately useless—a generic blog post, a superficial analysis, or code that solves the wrong problem.

Specificity is the antidote to this curse. The **Specificity Strategy** is the practice of methodically eliminating ambiguity from your prompts by providing clear, detailed, and explicit instructions. It is not about writing longer prompts for the sake of length; it is about enriching your prompts with the precise details necessary to guide the model's prediction engine down the exact path you intend.

Think of your prompt as the lens of a camera. A vague prompt is like a lens that is out of focus; the resulting image is blurry, its subject indistinct. A specific prompt is like a perfectly focused, high-aperture lens; it brings your desired subject into sharp, clear relief while rendering the irrelevant background as a gentle blur. Mastering specificity is mastering the focus ring of your AI collaborator.

## 7.2 The Rationale: Minimizing Inference, Maximizing Control

Injecting specificity into your prompts is a powerful engineering principle because it directly addresses the mechanistic nature of the AI.

1. **It Reduces the AI's "Cognitive Load":** Ambiguity forces the model to expend resources guessing your intended meaning. Should it be formal or informal? Should it be a list or a paragraph? Should it consider financial risk or operational efficiency? Every guess is a potential point of failure. Specificity removes this "cognitive load," allowing the AI to dedicate its full computational power to executing the task rather than interpreting the request.
2. **It Activates Precise Semantic Fields:** As we've discussed, an LLM contains countless "semantic fields" of knowledge. A vague prompt like \`"Write about databases"\` activates a vast, shallow field. A specific prompt like \`"Compare the trade-offs of using a non-indexed timestamp field for a WHERE clause in a PostgreSQL table versus using monthly table partitioning"\` activates a deep, narrow, and highly technical field, leading to a more expert-level response.
3. **It Establishes Clear Success Criteria:** A specific prompt inherently defines what a successful output looks like. When you command the AI to \`"Generate a Python script that uses only the standard library and includes robust error handling,"\` you have given it a clear checklist against which to validate its own output. This implicit self-correction leads to more reliable results.

Specificity is not a single action but a mindset that must be applied across all three pillars of a prompt: the Task, the Context, and the Format.

## 7.3 Specificity in TASK Definition: Quantify, Constrain, and Decompose

A vague task is a recipe for a generic output. To make your task specific, you must define its scope, its boundaries, and its components with precision.

- **Before (Vague):** \`"Write a blog post about productivity."\`
- **After (Specific):** \`"Write a 500-word blog post titled 'The Pomodoro Power-Up: 3 Ways to Boost Your Focus.' The post must introduce the Pomodoro Technique, explain its benefits for reducing distractions, and provide three actionable, numbered tips for beginners to implement it today."\`

**Key Techniques for Task Specificity:**

1. **Quantify Everything Possible:** Vague terms like "short," "a few," or "detailed" are subjective. Replace them with numbers.
    - *Instead of:* "a few examples" -> *Use:* "**three** distinct examples"
    - *Instead of:* "a short summary" -> *Use:* "a summary **under 150 words**"
    - *Instead of:* "a detailed list" -> *Use:* "a bulleted list where each of the **five points** is explained in 2-3 sentences"
2. **Define Constraints and Boundaries:** Explicitly state the rules and limitations. What should be included? What must be excluded?
    - *Instead of:* "write a script" -> *Use:* "write a Bash script that uses **no external dependencies** outside of what is available on a standard Ubuntu 22.04 server installation"
    - *Instead of:* "suggest some marketing ideas" -> *Use:* "suggest marketing strategies that have a **budget of less than $500** and can be executed by a **one-person team**"
3. **Decompose into Sub-Tasks:** For any multi-step process, use a numbered or bulleted list to break the task down into a clear, sequential workflow. (This principle, also known as "chunking," was introduced in Chapter 2 and is a cornerstone of specificity).

## 7.4 Specificity in CONTEXT: Detail the Persona, Audience, and Goal

A shallow context produces a shallow response. Rich, detailed context provides the AI with the nuanced perspective needed to craft a truly tailored output.

- **Before (Vague):** \`"Summarize this report for a business audience."\`
- **After (Specific):** \`"I am a CTO preparing for a quarterly board meeting. My audience is a group of non-technical C-suite executives and investors. Summarize the attached engineering report. Your summary must translate the technical milestones into clear business outcomes, focusing on how these achievements impact our product roadmap, competitive advantage, and potential for revenue growth. Avoid all technical jargon."\`

**Key Techniques for Context Specificity:**

1. **Detail the Persona:** Don't just give the AI a job title. Give it a motivation, a perspective, and a set of priorities. (See Chapter 6: The Persona Strategy).
    - *Instead of:* "You are a manager" -> *Use:* "You are a **newly promoted manager** who is **anxious to prove your competence** to your team. Your tone should be **confident and inspiring, but also approachable**."
2. **Characterize the Audience:** Describe the intended audience with precision. What is their level of expertise? What are their priorities? What do they care about?
    - *Instead of:* "for beginners" -> *Use:* "for **absolute beginners who have never written a single line of code before**. Use simple analogies and avoid any programming jargon."
3. **Articulate the Strategic Goal:** Explain the "why" behind the task. What is the ultimate purpose of this output?
    - *Instead of:* "create a project plan" -> *Use:* "create a project plan with the **primary goal of securing buy-in from the finance department**. Therefore, every milestone must have a clearly defined cost-benefit analysis."

## 7.5 Specificity in FORMAT: Blueprint the Final Structure

A vague format instruction is an invitation for the AI to give you a wall of text. Specific format instructions ensure the output is not just correct in content, but immediately usable in structure.

- **Before (Vague):** \`"Extract the key information in JSON."\`
- **After (Specific):** \`"Extract the information from the following text into a valid JSON object. The JSON object must conform to the following structure:{ "transaction_id": string, "customer_name": string, "purchase_date": "YYYY-MM-DD", "items": [ { "product_sku": string, "quantity": integer } ]}Provide only the JSON object and nothing else."\`

**Key Techniques for Format Specificity:**

1. **Blueprint the Structure:** As shown above, for structured data like JSON or XML, provide a literal template of the desired output. This removes all guesswork.
2. **Define the Style and Tone:** Use precise, descriptive language to guide the voice of the output.
    - *Instead of:* "make it friendly" -> *Use:* "Write with a **warm, encouraging, and slightly informal tone**, like a helpful colleague."
3. **Use Examples:** The ultimate form of specificity is a complete example. Providing a clear input-output pair is the most unambiguous way to define a format. (See Chapter 5: The Few-Shot Strategy).

## 7.6 Synthesis: The Cumulative Power of Detail

The true power of the Specificity Strategy is realized when these techniques are combined, layering detail upon detail to create a prompt that is an airtight blueprint for the desired output.

**Scenario:** Create a social media plan.

- **Vague Prompt:**\`"Give me some ideas for social media posts."\`
- **Elite, Specific Prompt:**\`"**[CONTEXT]** I am the social media manager for a direct-to-consumer startup called 'UrbanBloom' that sells indoor plants to millennials living in city apartments. Our brand voice is witty, informative, and slightly irreverent.\`
    - \`*[TASK]** Create a one-week social media content calendar for Instagram. The plan must include three distinct post types:1. **Educational Post (2x):** A 'Plant Care Tip' post.2. **User-Generated Content (3x):** A post featuring a customer's photo.3. **Promotional Post (2x):** A post announcing our 'Plant of the Week' discount.\`
    - \`*[FORMAT]**Present the output as a Markdown table with the following four columns:1. **Day:** (e.g., Monday)2. **Post Type:** (e.g., Educational)3. **Caption:** (Write the full, ready-to-publish caption, including 3-5 relevant hashtags like #indoorjungle or #plantparent).4. **Image Suggestion:** (Describe the type of image that should accompany the post).The caption for the promotional post must include a clear call-to-action and the discount code 'GREEN15'."\`

## 7.7 Conclusion: Specificity is Control

Specificity is not about micromanagement; it is about clarity. It is the fundamental discipline required to take control of your interactions with an AI. Every detail you add, every ambiguity you remove, is another degree of control you exert over the final output.

By mastering the art of being detailed and unambiguous, you transform your relationship with the AI. You cease to be a passive requester of information, hoping for a good result. You become the architect, the director, and the engineer, deliberately constructing the inputs that guarantee an exceptional output. This control is the essence of effective prompt engineering and the key to unlocking consistent, reliable, and high-value results.

# Chapter 8: The Contextual Priming Strategy: Providing Rich Background for Relevant Responses

## 8.1 The Blank Slate Problem: An Expert with Amnesia

Imagine hiring the most brilliant consultant in the world. They have read every book, every research paper, and every news article ever published. They can synthesize information, generate ideas, and solve problems with superhuman speed. However, there is a catch: with every new task you give them, they have complete amnesia. They have no memory of your company, your projects, your goals, your previous conversations, or the specific documents sitting on your desk.

This is the default state of a Large Language Model. It is an expert with a blank slate.

The **Contextual Priming Strategy** is the solution to this problem. It is the deliberate practice of "priming the pump"—of loading the AI's short-term, in-context memory with the specific background information it needs to make its vast, general knowledge relevant to your unique situation. Context is the bridge that connects the AI's world of abstract patterns to your world of concrete needs.

A prompt without context is a shot in the dark. A prompt rich with context is a guided missile. Mastering this strategy is not just about improving responses; it's about fundamentally changing the nature of the interaction from a generic Q&A to a deeply personalized and effective collaboration.

## 8.2 The Rationale: Why Context is the King of Prompting

Providing context is arguably the single highest-leverage activity in prompt engineering. Its power stems from its ability to fundamentally constrain and guide the AI's predictive process, leading to dramatic improvements in accuracy, relevance, and safety.

1. **Grounding and Reducing Hallucination:** An LLM's tendency to "hallucinate"—to invent plausible but false information—is most prevalent when it is forced to rely solely on its own parametric memory. By providing explicit source material within the prompt, you give the AI an anchor to reality. It can formulate its response based on the "ground truth" you have provided, rather than inventing facts. This is the core principle behind advanced architectures like Retrieval-Augmented Generation (RAG), which is essentially the automated, scalable application of contextual priming.
2. **Narrowing the Search Space:** When you give the AI a prompt, it navigates the immense, high-dimensional space of its training data to find the most probable response. Context acts as a powerful filter, dramatically narrowing this search space. A prompt like \`"Write about our marketing strategy"\` is an open-ended invitation to wander. A prompt primed with context—\`"Given our Q3 performance report and the competitive analysis attached, write a marketing strategy that focuses on re-engaging users who have lapsed"\`—focuses the AI's attention on a tiny, highly relevant sliver of its potential knowledge.
3. **Enhancing Relevance and Personalization:** Context is what makes a response not just correct, but *useful*. A generic answer to a generic question has limited value. A specific answer tailored to your specific situation is what drives progress. Contextual priming is the mechanism for this personalization. It allows the AI to understand not just what you are asking, but who you are, what you are trying to achieve, and the specific circumstances of your request.

## 8.3 A Toolkit of Contextual Priming Techniques

Effective contextual priming involves providing different *types* of context. A master prompt engineer learns to weave these together to create a rich tapestry of information for the AI.

### 8.3.1 Technique 1: Providing Source Material (The Grounding Data)

This is the most direct and powerful form of priming. You give the AI the raw material it needs to work with.

- **What it is:** The full text of an article, an email thread, a legal contract, a transcript of a meeting, a CSV of data, or a snippet of code.
- **Why it works:** It makes the task concrete and verifiable. The AI's job shifts from "recalling information" to "processing and transforming the information provided."
- **Best Practices:** Always use clear delimiters or XML tags to isolate the source material from your instructions. This structural clarity is crucial for the model.
    - **Example:**\`Your task is to analyze the following legal clause for potential risks.\`
        
        \`<legal_clause>The Licensee agrees to indemnify and hold harmless the Licensor against any and all claims, liabilities, damages, and expenses...</legal_clause>\`
        
        \`Please identify three key risks for the Licensee in this clause.\`
        

### 8.3.2 Technique 2: Providing Situational Context (The "Why")

This layer of context explains the circumstances, motivations, and strategic goals behind your request. It answers the question, "Why are we doing this?"

- **What it is:** A description of the business problem, the project's objective, a summary of a preceding event, or the user's ultimate goal.
- **Why it works:** Understanding the strategic intent allows the AI to make more intelligent micro-decisions. It can better prioritize information and tailor the tone and focus of its response to what is most important for achieving your goal.
- **Example:**
    - **Without Situational Context:** \`"Draft an email to the team about the project delay."\` (This will likely be a neutral, factual email).
    - **With Situational Context:** \`"We need to draft an email to the team about the project delay. **Our primary goal is to maintain team morale and prevent panic.** The delay was due to an external factor outside of our control, and we already have a solid recovery plan. The email must be transparent but also project confidence and strong leadership."\` (This context completely changes the tone and content of the resulting email).

### 8.3.3 Technique 3: Leveraging Conversational History (The Dialogue Flow)

Every multi-turn conversation is an exercise in contextual priming. The entire history of the chat—your prompts and the AI's responses—forms the context for the next turn.

- **What it is:** The sequence of messages in an ongoing chat session.
- **Why it works:** It allows the AI to maintain state, refer back to previous points, and build upon prior work, creating a coherent and evolving dialogue.
- **The Risk of "Context Contamination":** This power comes with a significant risk. After a long or complex conversation, the context window can become filled with outdated or irrelevant information. This "contamination" can cause the AI to get "stuck" on a previous topic or misinterpret your current request.
    - **Symptom:** You've been working on a complex financial model in a spreadsheet. You then ask, "Now write a simple thank you note." The AI responds with, "Certainly. Here is a thank you note formatted in a four-column table..."
    - **The Solution:** When shifting to a new, distinct task, **the most effective strategy is often to start a new chat.** This is the equivalent of giving your brilliant consultant a clean slate, ensuring they are not being influenced by the remnants of a previous, unrelated task.

### 8.3.4 Technique 4: Persona and Audience Context (The "Who")

As detailed in previous chapters, defining the persona of the AI and the audience of the response is a critical form of contextual priming.

- **Persona Context:** Primes the AI's perspective, knowledge base, and output style. *"You are a skeptical venture capitalist."*
- **Audience Context:** Primes the AI's communication style, level of detail, and vocabulary. *"...and you are explaining your concerns to a first-time founder."*
- **Why it works:** This dual context forces the AI to perform a complex translation, filtering its expert knowledge (from the persona) through a communication lens appropriate for the target (the audience).

## 8.4 Advanced Priming: Navigating the Long Context Window

Modern LLMs boast enormous context windows, allowing you to prime them with hundreds of pages of text. This is a game-changer, but it requires new strategies. Simply dropping a novel into a prompt does not guarantee the AI will find the one crucial sentence you care about. This is known as the "needle in a haystack" problem.

**Best Practices for Long Context Priming:**

1. **Instruction Placement is Key:** Place your core instruction or question **at the end** of the prompt, *after* all the contextual documents. Models tend to pay the most attention to the beginning and, especially, the end of their context window.
2. **Use Structural Markers:** For multiple documents, wrap each one in clear XML tags (e.g., \`<document source="report_A.pdf">...</document>\`). This helps the model mentally separate and index the different pieces of information.
3. **Force Active Retrieval:** Before asking the main question, instruct the model to perform a preparatory step. Ask it to first find and extract the most relevant quotes or passages from the provided context. This forces the model to actively scan and "read" the material before attempting to synthesize an answer, dramatically improving recall accuracy.
    - **Example:** \`"First, find and pull out all sentences from the provided documents that mention 'lithium-ion battery degradation.' Place them inside <quotes> tags. Then, using only those quotes, answer the following question..."\`

## 8.5 Conclusion: Context is the Canvas

Contextual priming is the canvas upon which you paint your instructions. Without it, your commands are brushstrokes in a void. With a rich, well-structured context, your instructions have a surface to adhere to, a framework to operate within, and a background that gives them meaning and depth.

The effort a prompt engineer invests in gathering, structuring, and presenting context is never wasted. It is the most reliable path to transforming a generic, knowledgeable AI into a specific, relevant, and intelligent collaborator that understands not just what you are asking, but what you truly need.

# Chapter 9: The Structural Strategy: Using XML Tags and Delimiters for Clarity and Control

## 9.1 From Conversation to Specification: The Need for Structure

A prompt is a form of communication. In human conversation, we rely on a rich tapestry of implicit cues—tone of voice, body language, shared context—to understand each other. A Large Language Model has none of these. It has only the raw, linear sequence of text you provide. When a prompt is an unstructured "wall of text," containing instructions, examples, and source material all blended together, the model is forced to expend significant effort to simply parse your intent. This is a recipe for confusion, misinterpretation, and error.

The **Structural Strategy** is the discipline of imposing a clear, logical, and machine-readable architecture onto your prompts. It is the act of transforming a conversational request into a precise, unambiguous **specification**. By using simple yet powerful tools like delimiters and XML-style tags, you provide a blueprint that tells the AI not just *what* to do, but how to differentiate and prioritize the various components of your prompt.

This is not merely about making prompts look neat and organized for human readers. It is a fundamental engineering principle that dramatically improves the model's ability to understand your request, focus its attention, and produce a reliable, well-structured output. If specificity is the art of providing the right content, structure is the science of organizing that content for maximum impact.

## 9.2 The Rationale: Why Structure Speaks to the Machine

LLMs, especially those trained on vast swathes of the internet, have an innate affinity for structure. The web is built on structured languages like HTML and XML. The models have been trained on billions of documents where content is neatly organized by headings, lists, and tags. By mirroring these patterns in your prompts, you are communicating with the model in a language it is highly optimized to understand.

Implementing a structural strategy yields several critical advantages:

1. **Eliminates Ambiguity:** Structure creates explicit boundaries. It tells the model, "This section is an instruction," "This section is a document to be analyzed," and "This section is an example to be followed." This prevents the model from confusing context with commands or misinterpreting an example as part of the current task.
2. **Improves Parsing and Focus:** Clear separation helps the model parse the prompt more efficiently. Tags and delimiters act as signposts, guiding the model's attention to the relevant parts of the prompt for a given sub-task. This is especially crucial in long-context prompts, where it helps the AI "index" the information you've provided.
3. **Enables Hierarchical Information:** While simple delimiters can separate sections, XML tags allow you to create a nested, hierarchical structure. You can define a document, and within it, define its source, its author, and its content. This complex organization is impossible with unstructured text.
4. **Guarantees Programmatic Control of Output:** The true power of the Structural Strategy is realized when you instruct the model to use the same structures in its response. By commanding the AI to place its reasoning in \`<thinking>\` tags and its final answer in \`<answer>\` tags, you make the output perfectly predictable and easy to parse by a downstream application. This is the key to building robust, reliable AI-powered workflows.

## 9.3 The Toolkit of Structure: Delimiters and Tags

Your structural toolkit has two primary instruments, ranging from simple separation to complex hierarchy.

### 9.3.1 Tool 1: Delimiters for Simple Separation

Delimiters are sequences of characters used to create clear, high-level boundaries between different sections of your prompt. They are the simplest and quickest way to impose order.

- **Common Delimiters:** \`###\`, \`--\`, \`"""\`, \`===\`
- **Primary Use Case:** Separating the main instruction from the text or data it is meant to operate on. Also useful for separating multiple examples in a Few-Shot prompt.

**Illustrative Example: Summarization**

- **Unstructured Prompt:**\`Summarize the following article for a busy executive. The summary should be three bullet points. Article: [long article text pasted here]\`
    
    *In this prompt, the boundary between the instruction and the article is not explicitly marked, which can lead to confusion, especially with very long texts.*
    
- **Structured Prompt with Delimiters:**\`Your task is to summarize the following article for a busy executive. The summary must be exactly three bullet points.\`
    
    \`### ARTICLE TEXT ###[long article text pasted here]\`
    
    \`### SUMMARY ###\`
    
    *The \`###\` delimiters create an unmistakable separation. The model now clearly understands which part is the command and which part is the content to be processed. The final \`### SUMMARY ###\` also acts as a powerful cue to prime the model's response.*
    

### 9.3.2 Tool 2: XML Tags for Hierarchical Control

XML-style tags (e.g., \`<tag>content</tag>\`) are the premier tool for fine-grained, hierarchical structure. A key advantage is that you can—and should—invent your own descriptive tag names.

- **Why It's Powerful:** The tag names themselves add another layer of context. \`<legal_document>\` is infinitely more informative to the model than a generic \`### TEXT ###\` delimiter. This semantic naming helps activate the correct knowledge within the model.

**Illustrative Example 1: Defining Roles and Content**

- **Unstructured Prompt:**\`You are a doctor. Analyze this patient's symptoms and suggest a possible diagnosis. The symptoms are a persistent dry cough and a low-grade fever.\`
- **Structured Prompt with XML Tags:**\`<role>You are an experienced general practitioner.</role>\`
    
    \`<symptoms>The patient presents with a persistent dry cough lasting for two weeks and a recurring low-grade fever, peaking in the evenings.</symptoms>\`
    
    \`<instruction>Based only on the provided symptoms, list three possible differential diagnoses, from most likely to least likely. For each, provide a brief rationale.</instruction>\`
    

**Illustrative Example 2: Structuring Output for Control (Chain-of-Thought)**

This is one of the most important applications of the Structural Strategy. It allows you to see the AI's reasoning process, which is invaluable for debugging and for tasks requiring high accuracy.

- **Prompt:**\`A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?\`
    
    \`First, work through the problem step-by-step inside <thinking> tags. Then, provide the final numerical answer inside <answer> tags.\`
    
- **Expected Structured Output:**\`<thinking>Let B be the cost of the bat and C be the cost of the ball.The problem gives two equations:1. B + C = 1.102. B = C + 1.00I can substitute the second equation into the first:(C + 1.00) + C = 1.102C + 1.00 = 1.102C = 0.10C = 0.05So the ball costs $0.05. I can check this. If the ball is $0.05, the bat is $0.05 + $1.00 = $1.05. The total is $1.05 + $0.05 = $1.10. This is correct.</thinking><answer>0.05</answer>\`
    
    *This output is now perfectly structured. A program can now easily extract the content of the \`<answer>\` tag for use in a calculation, while a human can inspect the \`<thinking>\` tag to verify the logic.*
    

## 9.4 Best Practices for an Elite Structural Strategy

1. **Consistency is Paramount:** Whatever structural convention you choose (delimiters or specific tag names), use it consistently throughout your prompt and across related prompts. The model learns the pattern you establish. Inconsistency will break the pattern and confuse the model.
2. **Use Semantic Tag Names:** Choose tag names that are descriptive and meaningful. \`<customer_review>\` is better than \`<text>\`. \`<instructions_for_summary>\` is better than \`<instructions>\`. This semantic information provides valuable context.
3. **Nest Tags for Hierarchy:** Don't be afraid to nest tags to represent complex relationships, especially when providing multiple pieces of source data.
    
    **Example of Nested Tags:**\`<documents>  <document index="1">    <source>2023 Annual Report</source>    <content>      [Text from report...]    </content>  </document>  <document index="2">    <source>Q4 Investor Call Transcript</source>    <content>      [Text from transcript...]    </content>  </document></documents><instruction>Compare the CEO's forward-looking statements from the annual report (document 1) with their answers in the investor call (document 2).</instruction>\`
    
4. **Combine Delimiters and Tags:** These tools are not mutually exclusive. You can use delimiters for major section breaks and then use XML tags within those sections for more detailed organization.

## 9.5 Conclusion: From a Messy Desk to a Clean Blueprint

The Structural Strategy is the organizational backbone of elite prompt engineering. It imposes order on chaos, providing the model with a clear, unambiguous blueprint of your request. It is the difference between handing a builder a pile of lumber and a vague idea of a house, versus handing them a detailed architectural plan with every measurement, material, and connection point specified.

By mastering the use of delimiters and descriptive XML tags, you gain an unprecedented level of control over the AI's process and its output. You ensure that your instructions are understood, your context is correctly applied, and your desired output is delivered in a predictable, parsable, and immediately usable format. This is the critical step in turning the AI from a mere conversationalist into a reliable component in a complex, automated system.

# Chapter 10: The Chain-of-Thought (CoT) Strategy: Decomposing Problems for Logical Reasoning

## 10.1 The Leap to a Wrong Conclusion: The Limits of Intuitive AI

In our exploration of prompting so far, we have focused on commanding the AI to produce a specific *what*—a summary, a piece of code, a formatted JSON object. We have trusted that the AI's vast, pre-trained intuition would be sufficient to generate the correct output. For a wide range of tasks, this trust is well-placed.

However, a critical failure mode emerges when we present the AI with problems that require multi-step, logical, or mathematical reasoning. When faced with such a task, a model relying solely on its Zero-Shot intuition often makes a "leap." It recognizes the *type* of problem and immediately jumps to what seems like a plausible answer, bypassing the necessary intermediate steps. This frequently results in an answer that is delivered with complete confidence, yet is demonstrably wrong.

This is the "black box" problem of AI reasoning. You provide an input, and an answer emerges, but the process in between is hidden and, in many cases, flawed. The **Chain-of-Thought (CoT) Strategy** is the key that unlocks this black box. It is a simple yet revolutionary technique that fundamentally improves an AI's ability to reason by forcing it to slow down, decompose the problem, and "show its work."

## 10.2 The Core Idea: Forcing the AI to "Show Its Work"

Imagine giving a complex algebra problem to two students. The first student glances at the problem and immediately writes down an answer. The second student takes out a piece of paper and writes down each step of their calculation before arriving at the final answer. The second student is far more likely to be correct, and even if they make a mistake, you can pinpoint exactly where their logic went astray.

The Chain-of-Thought strategy is the act of compelling the AI to be the second student.

**Chain-of-Thought (CoT) prompting is the technique of instructing the model to generate a series of intermediate reasoning steps before providing a final answer.**

Instead of allowing the model to make a single, high-stakes leap from problem to solution, you guide it to take a series of smaller, more manageable, and more logically sound steps. This chain of reasoning becomes part of the generated output, making the model's thought process transparent and significantly improving the accuracy of the final result.

## 10.3 The Underlying Rationale: Why Thinking Step-by-Step Works

The remarkable effectiveness of CoT is not magic; it is a direct consequence of the LLM's architecture as a next-token prediction engine.

1. **Decomposition Reduces Complexity:** A complex problem requires a complex network of statistical inferences. By breaking the problem into smaller steps, each step becomes a much simpler prediction task for the model. Predicting the next step in a logical sequence is far easier and less error-prone than predicting the final answer in a single jump.
2. **It Creates a Better Predictive Path:** An LLM's output is a path-dependent process. Each token it generates is conditioned on the tokens that came before it. A CoT provides a rich, logical context for each subsequent prediction. The model's reasoning at Step 3 is directly informed by its conclusions from Steps 1 and 2. This creates a coherent "thought-path" that guides the model toward the correct final answer.
3. **Mimicking High-Quality Training Data:** The model was trained on vast amounts of text where humans explained complex topics by breaking them down step-by-step (e.g., math textbooks, scientific papers, tutorials). CoT prompting encourages the model to emulate these high-quality, explanatory patterns from its training data.
4. **Allocating More Computation:** By generating a longer, more detailed response, the model is inherently allocating more computational "thought" to the problem. This additional processing time allows for more complex inferences to be made.

## 10.4 The Foundational Technique: Zero-Shot CoT

The simplest way to elicit a Chain of Thought is through a simple addition to your prompt—a "magic phrase" that triggers the model's reasoning capabilities.

The most common and effective phrase is: **"Let's think step by step."**

Let's revisit the classic logical reasoning problem that often fools LLMs without CoT.

- **Prompt (Without CoT):**\`"A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?"\`
- **Common Incorrect Output (Without CoT):**\`"The ball costs $0.10."\` *(The model makes an intuitive but incorrect leap).*

Now, let's apply the Zero-Shot CoT strategy.

- **Prompt (With Zero-Shot CoT):**\`"A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost? Let's think step by step."\`
- **Correct Output (With CoT):**\`"Okay, let's break this down.1. Let 'b' be the cost of the bat and 'c' be the cost of the ball.2. We know from the problem that b + c = 1.10.3. We also know that the bat costs $1.00 more than the ball, so b = c + 1.00.4. Now I can substitute the second equation into the first: (c + 1.00) + c = 1.10.5. This simplifies to 2c + 1.00 = 1.10.6. Subtracting 1.00 from both sides gives 2c = 0.10.7. Dividing by 2, I find that c = 0.05.Therefore, the ball costs $0.05."\`

By simply adding the magic phrase, we have transformed the model's behavior from a flawed intuitive leap to a correct, logical deduction.

## 10.5 Enhancing Reliability: Few-Shot CoT

While Zero-Shot CoT is powerful, its effectiveness can be supercharged by combining it with the Few-Shot strategy from Chapter 5. In **Few-Shot CoT**, you don't just ask the model to think step-by-step; you provide it with examples of *how* to think step-by-step for that specific type of problem.

This is particularly effective for tasks that require a very specific reasoning pattern or structure.

- **Task:** Solve a simple logic puzzle.
- **Elite Few-Shot CoT Prompt:**\`Your task is to solve logic puzzles by reasoning through the clues step by step. Follow the format of the examples below.\`
    
    \`### EXAMPLE 1 ###Question: A farmer has 15 sheep, and all but 8 die. How many are left?Reasoning: The phrase "all but 8 die" is a bit of a trick. It means that 8 sheep did NOT die. So, there are 8 sheep left.Answer: 8\`
    
    \`### EXAMPLE 2 ###Question: I have two U.S. coins totaling 55 cents. One is not a nickel. What are the coins?Reasoning: The two coins add up to 55 cents. The key clue is "One is not a nickel." This doesn't mean NEITHER coin is a nickel. It just means one of them isn't. The other coin CAN be a nickel. To make 55 cents, I need a 50-cent piece and a nickel.Answer: A 50-cent piece and a nickel.\`
    
    \`### NEW PUZZLE ###Question: A man is looking at a portrait. Someone asks him whose portrait he is looking at. He replies, "Brothers and sisters I have none, but that man's father is my father's son." Whose portrait is the man looking at?Reasoning:\`
    

By providing examples of the reasoning process itself, you give the model a precise template to follow, dramatically increasing its chances of success on the new problem.

## 10.6 The Breadth of Application: Where to Use CoT

The CoT strategy is not limited to math and logic puzzles. It is a versatile tool that enhances performance across any domain requiring complex thought.

- **Strategic Analysis:**
    - \`Prompt: "Analyze the attached SWOT analysis for our company. First, think step by step to identify the most critical threat and the most promising opportunity. Then, propose a strategic initiative that uses our key strengths to capitalize on the opportunity while mitigating the threat."\`
- **Code Generation and Debugging:**
    - \`Prompt: "I am getting a 'NullPointerException' in this Java code. Let's think step by step. First, analyze the code to identify every variable that could possibly be null. Second, trace the execution path to determine the most likely line where the exception occurs. Third, propose a specific code change to fix the bug."\`
- **Complex Instruction Following:**
    - \`Prompt: "You need to plan a three-day marketing event. Let's think step by step. Day 1 should be focused on keynote speeches. Day 2 should have three parallel tracks for different skill levels. Day 3 should be a series of hands-on workshops. Please generate a detailed agenda."\`

## 10.7 Integrating CoT with Structural and Persona Strategies

CoT reaches its ultimate potential when combined with the other strategies we've discussed. Using the Structural Strategy (Chapter 9) is particularly important for building robust applications.

- **Gold-Standard Prompt (CoT + Persona + Structure):**\`<role>I am an expert financial analyst. My goal is to provide clear, data-driven investment advice.</role>\`
    
    \`<context>Attached are the Q4 earnings reports for Company A and Company B. Both are in the same industry.</context>\`
    
    \`<instruction>Compare Company A and Company B as potential investments. First, conduct your analysis step-by-step inside <thinking> tags. Your analysis must cover revenue growth, profit margins, and debt-to-equity ratio. After your analysis, provide a final, concise recommendation inside <recommendation> tags.</instruction>\`
    

This prompt creates an expert persona, provides clear context, and uses structural tags to command a Chain-of-Thought output that is both transparent and programmatically parsable. This is the blueprint for a reliable, production-grade AI reasoning system.

## 10.8 Conclusion: Opening the Black Box

The Chain-of-Thought strategy is a pivotal technique in the prompt engineer's toolkit. It represents the shift from treating the AI as an opaque oracle to engaging with it as a transparent reasoning partner. By compelling the model to break down problems and articulate its thought process, you not only achieve a higher degree of accuracy but also gain invaluable insight into the AI's "mind."

This transparency is crucial. It allows you to debug, to verify, and to trust the outputs you receive. CoT is more than just a trick to get the right answer; it is a fundamental method for making AI reasoning intelligible, reliable, and ultimately, more powerful.

# Chapter 11: The Self-Consistency Strategy: Enhancing CoT with Multiple Reasoning Paths and Majority Voting

## 11.1 The Fragility of a Single Thread of Logic

In the previous chapter, we unlocked the AI's reasoning capabilities with the Chain-of-Thought (CoT) strategy. By compelling the model to "show its work," we transformed it from an intuitive black box into a transparent, step-by-step reasoner, dramatically improving its accuracy on complex problems. We taught it to follow a single, logical thread from the problem to the solution.

However, even the strongest thread can have a weak point. A single Chain of Thought, while powerful, is still just one path through a complex problem space. It is a single attempt, a single line of reasoning. If there is a small flaw anywhere in that chain—a minor miscalculation, a subtle misinterpretation of a word, a momentary logical lapse—the entire process is derailed, leading to an incorrect final answer. The single CoT is robust, but it can also be brittle.

What if we could move beyond relying on a single, potentially fragile thread of logic? What if, instead of asking for one expert opinion, we could convene a committee of experts, have them all reason through the problem independently, and then adopt the answer that the majority agrees upon? This is the core philosophy behind the **Self-Consistency Strategy**.

## 11.2 The Principle of Cognitive Diversity: Introducing Self-Consistency

The Self-Consistency strategy is a powerful enhancement to Chain-of-Thought prompting that significantly boosts accuracy and reliability. It works by generating multiple, diverse reasoning paths for the same problem and then selecting the most consistent answer through a simple majority vote.

It is a multi-stage process that can be broken down into three core steps:

1. **Generate Diverse Reasoning Paths:** Instead of prompting the model once, you prompt it multiple times (typically 3 to 7 times) with the exact same Chain-of-Thought prompt. Crucially, you do this with a non-zero \`temperature\` setting, which introduces a degree of randomness into the model's predictions. This encourages the model to explore different, yet still plausible, ways of thinking through the problem.
2. **Extract the Final Answer from Each Path:** For each of the generated responses, you parse the text to isolate the final answer, separating it from the intermediate reasoning steps. This is where the Structural Strategy (using tags like \`<answer>\`) becomes invaluable for automation.
3. **Aggregate and Select the Most Consistent Answer:** You tally up the final answers from all the paths. The answer that appears most frequently is selected as the final, most reliable output.

This approach mimics the real-world process of seeking second (and third, and fourth) opinions. A single expert might make a mistake, but it is far less likely that a committee of independent experts will all make the *same* mistake. The consensus view is almost always more robust than a single opinion.

## 11.3 The Underlying Rationale: Why Consensus Builds Confidence

The effectiveness of Self-Consistency is not a coincidence; it is a statistical inevitability based on how LLMs solve problems.

- **Correct Paths Converge, Incorrect Paths Diverge:** For most reasoning problems, there are many potential paths to the *correct* answer, but they all converge on the same solution. For example, one can solve an algebra problem through substitution or elimination, but both valid methods will yield the same result. Conversely, there are an almost infinite number of ways to make a mistake. An error in reasoning is more likely to send the model down a unique, divergent path that leads to a unique, incorrect answer.
- **The Power of the Majority Vote:** Because correct reasoning paths tend to arrive at the same answer, the correct answer will appear multiple times in your set of generated responses. Incorrect answers, resulting from more random and varied errors, are likely to be scattered across different values. Therefore, when you take a majority vote, you are statistically filtering out the noise of the incorrect, divergent paths and amplifying the signal of the correct, convergent ones.
- **The Crucial Role of Randomness (Temperature):** This entire process hinges on the ability to generate *diverse* reasoning paths. If you prompt the model multiple times with a \`temperature\` of 0 (greedy decoding), it will produce the exact same reasoning chain every single time, and a majority vote would be meaningless. By setting a higher temperature (e.g., \`0.5\` to \`0.8\`), you allow the model to explore alternative token predictions at each step. This introduces the slight variations necessary to create different lines of reasoning, some of which may cleverly bypass a potential flaw in the single "most likely" path.

## 11.4 A Practical Walkthrough: Self-Consistency in Action

Let's illustrate this with a word problem that involves multiple steps, a common point of failure for a single CoT.

**The Problem:**\`A book club is reading a 100-page book. On Monday, Jane reads 1/4 of the book. On Tuesday, she reads 1/3 of the *remaining* pages. How many pages are left for her to read?\`

### Step 1: The Prompt (A Standard Zero-Shot CoT)

We start with a simple CoT prompt. The strategy is not in the prompt itself, but in how we use it.

\`Prompt: "A book club is reading a 100-page book. On Monday, Jane reads 1/4 of the book. On Tuesday, she reads 1/3 of the *remaining* pages. How many pages are left for her to read? Let's think step by step, and put the final answer in <answer> tags."\`

### Step 2: Generate Diverse Chains (Multiple API Calls with \`temperature=0.7\`)

We send this prompt to the model three separate times. Due to the temperature setting, we get three slightly different reasoning chains.

- **Generated Chain 1 (Correct):**\`Okay, let's break it down. The book has 100 pages.1. On Monday, Jane reads 1/4 of the book. 1/4 of 100 is 25 pages.2. The number of remaining pages is 100 - 25 = 75 pages.3. On Tuesday, she reads 1/3 of the *remaining* 75 pages. 1/3 of 75 is 25 pages.4. The pages left to read are the remaining pages from Monday minus what she read on Tuesday. So, 75 - 25 = 50 pages.<answer>50</answer>\`
- **Generated Chain 2 (Incorrect):**\`Let's solve this. The book starts at 100 pages.Monday's reading: 100 * (1/4) = 25 pages.Remaining pages after Monday: 100 - 25 = 75 pages.Tuesday's reading: The prompt says 1/3 of the remaining pages. So that's 75 / 3 = 25 pages.Total pages read: 25 (Mon) + 25 (Tue) = 50 pages.Oh, the question asks how many pages are *left*. I misread. The total pages are 100, and she read 50. So, 100 - 50 = 50 pages. Wait, no, that's the total read. The pages left after Tuesday are 75 - 25 = 50. No, that's not right either. It should be 100 minus the total read. Let me re-calculate. After Monday, 75 remain. After Tuesday, she reads another 25. So 75 - 25 = 50. No, wait. 1/3 of the book is about 33 pages. So 75 - 33 = 42 pages.<answer>42</answer>\`*(This chain shows the model getting confused, making a calculation error, and settling on an incorrect answer.)*
- **Generated Chain 3 (Correct, Different Phrasing):**\`Step 1: Calculate pages read on Monday. 100 pages * 0.25 = 25 pages.Step 2: Calculate pages left after Monday. 100 - 25 = 75 pages.Step 3: Calculate pages read on Tuesday. This is one-third of the remainder. 75 * (1/3) = 25 pages.Step 4: Calculate final remaining pages. We take the remainder from Monday and subtract Tuesday's reading. 75 - 25 = 50.<answer>50</answer>\`

### Step 3: Extract the Final Answers

From the three chains, we extract the values within the \`<answer>\` tags:

- From Chain 1: \`50\`
- From Chain 2: \`42\`
- From Chain 3: \`50\`

### Step 4: The Majority Vote

We tally the results:

- Answer \`50\`: 2 votes
- Answer \`42\`: 1 vote

The most consistent answer is **50**. We can now confidently use this as our final output, having filtered out the erroneous reasoning of Chain 2.

## 11.5 The Trade-Off: Cost vs. Confidence

The Self-Consistency strategy offers a significant boost in accuracy, but this benefit comes at a direct and linear cost.

- **Increased Cost and Latency:** If you generate three reasoning paths, your API costs and the time it takes to get a final answer will be at least three times higher. This is the fundamental trade-off of the strategy: you are spending computational resources to buy confidence.

**Ideal Use Cases:**

- **High-Stakes Reasoning:** For tasks where accuracy is paramount and errors are costly, such as financial calculations, medical data analysis, or critical engineering specifications.
- **Verifiable Answers:** It is best suited for problems that have a single, objectively correct answer (e.g., math, logic, factual extraction).
- **Offline or Asynchronous Processing:** It is perfect for batch jobs or back-end processes where user-facing latency is not a concern.

**When Not to Use Self-Consistency:**

- **Creative or Generative Tasks:** For tasks like writing a poem or brainstorming marketing slogans, diversity of output is the goal, not a single correct answer.
- **Real-Time Applications:** The latency overhead makes it unsuitable for most real-time chatbots or interactive applications.
- **Low-Stakes Queries:** The added cost is not justified for simple summarization or classification tasks where a single CoT is sufficient.

## 11.6 Conclusion: From a Single Path to a Confident Consensus

The Self-Consistency strategy is a powerful evolution of Chain-of-Thought reasoning. It acknowledges the fallibility of a single line of thought and mitigates it through the wisdom of the crowd—or in this case, a crowd of the AI's own diverse reasoning processes.

By leveraging controlled randomness to explore multiple solution paths and then selecting the most convergent answer, you can build systems that are not just transparent in their reasoning, but also significantly more robust and reliable. It is a computationally intensive technique, but for mission-critical applications where accuracy is non-negotiable, it is an essential tool for transforming a capable reasoner into a highly confident and dependable one.

# Chapter 12: The Tree-of-Thoughts (ToT) Strategy: Exploring Multiple Solution Branches Simultaneously

## 12.1 Beyond the Linear Path: The Limits of Sequential Reasoning

With Chain-of-Thought (CoT), we taught the AI to follow a single, logical path. With Self-Consistency, we taught it to try several of these linear paths independently and then vote on the outcome. Both are powerful techniques, but they share a fundamental limitation: they are inherently linear and non-adaptive.

Imagine a detective solving a crime. A CoT detective would follow the first plausible lead to its conclusion, without ever pausing to consider alternatives. A Self-Consistent detective would send three separate detectives out to follow their first plausible leads independently. If two of them happened to follow the same wrong lead, their incorrect consensus would win the day.

But a truly brilliant detective does neither. At every step, they consider multiple possibilities. "The butler could be the suspect, *or* it could be the estranged cousin, *or* perhaps the evidence was planted." They evaluate the strength of each possibility, pursue the most promising one for a while, and if it leads to a dead end, they have the crucial ability to **backtrack** to an earlier decision point and explore a different path.

This dynamic, branching, and self-correcting process is the essence of human strategic thinking. The **Tree-of-Thoughts (ToT) Strategy** is a cutting-edge prompting technique designed to give this powerful capability to an AI. It moves beyond the single, linear chain of thought and allows the model to explore a branching tree of possibilities, evaluating its own ideas and making deliberate choices about which path to follow.

## 12.2 The Core Idea: Generation, Evaluation, and Strategic Search

The Tree-of-Thoughts strategy transforms the LLM from a simple sequential reasoner into a more deliberate problem-solver that actively explores a search space. It models the reasoning process not as a single chain, but as a tree, where each "thought" is a node, and the connections are the logical steps between them.

The process operates in a loop of three key phases at each step of the problem:

1. **Thought Generation:** At the current state of the problem, instead of generating just one next logical step (as in CoT), the model is prompted to generate multiple *potential* next steps or ideas. This creates several branches extending from the current node in the "thought tree."
2. **State Evaluation:** The model is then prompted to act as a critic, evaluating the viability and promise of each of the generated branches. It assesses which paths are most likely to lead to a successful solution, which are dead ends, and which are simply less promising than others.
3. **Search and Pruning:** Based on the evaluation, a search algorithm (either explicitly coded or, in a prompted simulation, implicitly decided) determines which branches to explore further. Unpromising branches are "pruned" (abandoned), while the most promising one(s) are selected as the new current state, from which the generation-evaluation loop begins again. This allows the model to perform strategic "lookahead" and, if all current paths seem poor, to "backtrack" to a previous, more promising node.

Think of an AI playing chess. It doesn't just consider its single best next move. It generates a tree of dozens of possible moves, then evaluates the likely outcomes of each of those moves several steps ahead, and finally chooses the path that leads to the most advantageous position. ToT is the application of this strategic exploration to general problem-solving.

## 12.3 The Rationale: Why Exploration Beats Linear Deduction for Hard Problems

ToT is a significant leap forward because it equips the AI with two cognitive tools that are essential for solving complex, non-linear problems:

1. **Global Lookahead:** CoT is myopic; it can only see the next immediate step. ToT, by generating and evaluating multiple future paths, allows the model to make decisions based on a global, forward-looking assessment. It can avoid a path that looks good in the short term but is a trap in the long run.
2. **Backtracking and Self-Correction:** This is the most critical advantage. A CoT, once it makes a mistake, is committed to that error and will follow the flawed logic to its incorrect conclusion. ToT builds in a mechanism for self-correction. If an evaluation reveals that a certain branch of reasoning is flawed or leading to a contradiction, the model can abandon that branch and backtrack to a previous step to explore an alternative, effectively correcting its own mistakes mid-process.

## 12.4 A Practical Walkthrough: Planning a Complex Project with ToT

Let's see how ToT would work on a task that is ill-suited for a simple linear CoT, such as developing a creative strategy.

**The Problem:**\`"Devise a creative and unconventional launch strategy for a new brand of sparkling water called 'Fizzique' that targets health-conscious Gen Z consumers."\`

A CoT might produce one linear, plausible-but-generic plan. A ToT approach would be far more robust.

**Step 1: Decompose the Problem**
The prompt would first break the problem down:

1. Brainstorm core campaign concepts.
2. Select the best concept and develop it into a multi-channel strategy.
3. Outline key messaging for the chosen strategy.

**Step 2: Thought Generation (at Step 1)**
The prompt would ask the AI to generate multiple distinct campaign concepts.
\`Prompt: "Let's start with the core concept. Generate three completely different, unconventional ideas for the Fizzique launch."\`

- **Branch A:** The "Anti-Influencer" Campaign: Focus on micro-communities and authentic, unpaid testimonials.
- **Branch B:** The "Hydration Art" Campaign: Partner with digital artists to create interactive AR filters and art installations inspired by the product.
- **Branch C:** The "Gamified Wellness" Campaign: Create a mobile app where users complete wellness challenges to earn discounts and rewards.

**Step 3: State Evaluation (at Step 1)**
The prompt then instructs the AI to evaluate these branches against the core goals.
\`Prompt: "Now, evaluate each of the three concepts (A, B, and C) on a scale of 1-10 for its potential to engage Gen Z and its feasibility for a startup with a moderate budget. Provide a brief rationale for each score."\`

The AI might conclude that Branch B is the most creative but also the most expensive, while Branch A is highly authentic and budget-friendly. Branch C has high engagement potential but a long development timeline. Based on this, it scores Branch A the highest.

**Step 4: Search and Pruning**
The system (or the next prompt) decides to pursue Branch A. Branches B and C are pruned for now. The new state becomes: "The core concept is the 'Anti-Influencer' campaign." From here, the loop repeats for Step 2 of the problem (developing the multi-channel strategy).

This iterative process of generating, evaluating, and selecting allows the AI to construct a well-reasoned, robust strategy, having already considered and discarded several alternatives.

## 12.5 Simulating ToT in a Single Prompt: The "Committee of Experts" Technique

While a true ToT system often involves a complex control loop, its spirit can be effectively simulated within a single prompt using a "committee of experts" or "multi-persona debate" technique. This approach forces the generation and evaluation of multiple thoughts by assigning different roles to the AI.

- **Elite ToT Simulation Prompt:**\`"I need to decide whether my SaaS startup should pivot from a subscription model to a usage-based pricing model.\`
    
    \`To solve this, I want you to simulate a debate between three expert advisors:1.  **Alex, the Growth Hacker:** Alex is aggressive, data-driven, and focused on maximizing user acquisition and market share.2.  **Brenda, the CFO:** Brenda is cautious, risk-averse, and obsessed with predictable revenue and profit margins.3.  **Charles, the Customer Advocate:** Charles is empathetic and focused on user experience, fairness, and long-term customer loyalty.\`
    
    \`First, have each expert state their initial position on the pivot, providing their core arguments.Next, have them debate each other's points, identifying potential flaws and counterarguments.Finally, synthesize their debate into a single, balanced recommendation that acknowledges the trade-offs and suggests a final course of action."\`
    

This prompt is a ToT simulation. The three experts **generate** three different thought-branches. Their debate is the **evaluation** process, where they critique and analyze each other's points. The final synthesis is the **search** process, which selects the most robust path forward after considering all branches.

## 12.6 When to Use ToT: The Explorer's Toolkit

The choice between CoT, Self-Consistency, and ToT is a strategic one, dependent on the nature of the problem.

- Use **CoT** for problems that have a clear, step-by-step solution path that needs to be followed precisely (e.g., solving a defined math problem, following a technical manual).
- Use **Self-Consistency** to increase the confidence of a CoT-style answer for a verifiable problem, when the cost of error is high.
- Use **ToT** for problems that are open-ended, strategic, or complex, where the path to the solution is not known in advance and requires exploration, evaluation, and adaptation (e.g., creative writing, business strategy, complex planning, research hypothesis generation).

## 12.7 Conclusion: From Following a Recipe to Inventing a Dish

The Tree-of-Thoughts strategy represents a monumental shift in prompt engineering, moving the AI from a system that follows a recipe to one that can invent a dish. It grants the model the ability to deliberate, to weigh options, to look ahead, and to correct its own course—cognitive processes that were once the exclusive domain of human intelligence.

While it is more complex to implement than a simple CoT, ToT is the key to unlocking the AI's potential on the hardest, most ambiguous, and most valuable problems. It is the tool that allows the prompt engineer to guide the AI not just in its execution, but in its very exploration and discovery of the solution itself.

# Chapter 13: The Step-Back Strategy: Generalizing a Problem to Unlock Broader Knowledge

## 13.1 The Forest for the Trees: The Peril of Hyper-Specificity

In our journey to craft better prompts, we have relentlessly pursued the virtue of specificity. We have learned to provide detailed context, break down tasks, and quantify our requirements. This drive for precision is, in most cases, the key to success. However, there exists a class of problems where hyper-specificity becomes a trap. When a prompt is too narrow, too laden with specific details, it can paradoxically limit the AI's ability to produce a high-quality response.

This is the "forest for the trees" problem. By focusing the AI's attention exclusively on the intricate details of a single "tree" (the specific problem), we prevent it from seeing the entire "forest" (the broader principles, concepts, and frameworks that govern the problem space). The model gets stuck in the weeds, its reasoning constrained by the immediate details, and fails to access the high-level, abstract knowledge that is often required for a truly insightful or creative solution.

The **Step-Back Strategy** is a powerful and counter-intuitive technique designed to solve this very problem. It is the practice of deliberately taking a step back from the specific question to first ask a more general, high-level question. By doing this, you compel the model to generate a set of foundational principles or a conceptual framework, which you can then provide as rich, guiding context to solve your original, specific problem.

## 13.2 The Core Principle of Abstraction: The Two-Step Process

The Step-Back strategy is not a single prompt, but a two-prompt workflow. It involves a deliberate act of abstraction followed by a targeted application.

**Step 1: The Abstraction Prompt.**
Instead of asking your specific question, you formulate a "step-back" question. This question abstracts away the specific details (names, dates, numbers) and asks for the underlying principles, concepts, or common patterns related to the task.

**Step 2: The Application Prompt.**
You then take the high-level, principled answer generated by the first prompt and provide it as context for your original, specific question. This primes the model with a rich, relevant framework, enabling it to solve the specific task with far greater depth and accuracy.

Imagine you are lost in a city and need to get from your current location to a specific landmark.

- **Direct Prompt:** Asking for turn-by-turn directions from your current corner to the landmark. This will work, but you learn nothing about the city.
- **Step-Back Strategy:**
    1. **Abstraction:** First, you ask for a map of the entire city district and a compass.
    2. **Application:** Then, using the map and compass, you plot your own course to the landmark.

The Step-Back strategy gives the AI the "map and compass" of general principles, allowing it to navigate the specific problem with a deeper understanding of the entire landscape.

## 13.3 The Rationale: Why Generalizing First Leads to Better Specifics

This two-stage process is highly effective because it fundamentally alters how the AI approaches a problem, leveraging its architecture in a more sophisticated way.

1. **Activates Broader and Deeper Knowledge:** A very specific prompt activates a narrow, specialized slice of the model's knowledge. A general, conceptual question forces the model to access a much broader, more foundational knowledge base. It retrieves first principles, which are often more robust and widely applicable than specific, memorized facts.
2. **Mitigates Overfitting to Details:** When a prompt is overloaded with details, the model can sometimes "overfit" to those details, treating them as absolute constraints and failing to think creatively. Stepping back frees the model from these constraints, allowing it to brainstorm at a higher level before being re-grounded in the specifics.
3. **Generates a Reusable Framework:** The output of the Abstraction Prompt is often a valuable artifact in itself—a set of best practices, a checklist of key considerations, or a summary of core concepts. This framework not only helps solve the immediate problem but can often be reused for other, similar tasks.
4. **Improves Reasoning and Coherence:** The act of generating high-level principles is an act of reasoning. By forcing the model to do this first, you are priming its logical faculties. The final answer is then more coherent because it is built upon a solid, explicitly stated conceptual foundation.

## 13.4 A Practical Walkthrough: From a Generic Storyline to a Compelling Level Design

Let's demonstrate the power of the Step-Back strategy with a creative task where direct prompts often yield clichéd results.

**The Goal:** Write a storyline for a new level in a first-person shooter (FPS) video game.

**Attempt 1: The Direct Prompt**\`Prompt: "Write a one-paragraph storyline for a new level of a first-person shooter video game that is challenging and engaging."\`

- **Common Output (Generic and Uninspired):**\`"The player is dropped into a war-torn city where they must fight their way through enemy soldiers to reach an extraction point. They will face heavy resistance in the streets and must use cover and tactics to survive. The mission is to secure a high-value target before time runs out."\`*(This is technically correct but lacks any creativity or specific detail. It's the most average, statistically likely response.)*

**Attempt 2: The Step-Back Strategy in Action**

**Step 1: The Abstraction Prompt (Asking for Principles)**\`Prompt: "Based on popular and critically acclaimed first-person shooter action games, what are 5 key settings or themes that contribute to a challenging and engaging level storyline?"\`

- **Output of the Abstraction Prompt (A Framework of Ideas):**\`1. **Abandoned Military Base:** A post-apocalyptic complex with mutated soldiers and rogue robots, ideal for intense firearm combat and exploring derelict technology.2. **Cyberpunk Megacity:** A neon-lit, vertical environment with towering skyscrapers and grimy alleyways, featuring cybernetically enhanced enemies and hacking mechanics.3. **Alien Derelict Ship:** A vast, non-Euclidean alien vessel with eerie corridors, zero-gravity sections, and bizarre extraterrestrial creatures to encounter.4. **Zombie-Infested Suburb:** A once-peaceful town now overrun by hordes of aggressive zombies, featuring intense close-quarters combat and environmental puzzle-solving.5. **Underwater Research Facility:** A deep-sea laboratory that is flooding, filled with mutated aquatic creatures and requiring stealth and underwater exploration skills.\`*(This output is now a rich palette of high-quality concepts.)*

**Step 2: The Application Prompt (Combining Principles with the Original Task)**\`Prompt: "You are an expert level designer for an FPS game.\`

\`<context>Here are 5 engaging themes for an FPS level:1.  Abandoned Military Base...2.  Cyberpunk Megacity...3.  Alien Derelict Ship...4.  Zombie-Infested Suburb...5.  Underwater Research Facility...</context>\`

\`<task>Using the 'Underwater Research Facility' theme from the context, write a detailed, one-paragraph storyline for a new level. The storyline must be challenging, engaging, and incorporate elements of stealth, flooding, and mutated aquatic creatures."</task>\`

- **Final Output (Creative and Specific):**\`"The level, titled 'Leviathan's Maw,' begins as the player character, a deep-sea salvage specialist, breaches the airlock of the sunken Benthic Horizon research facility, which went dark 72 hours ago. Alarms blare in the distance as the station's automated systems announce catastrophic hull breaches and imminent collapse. The player must navigate claustrophobic, half-flooded corridors flickering with emergency lights, using stealth to evade sonar-sensitive, bio-luminescent predators that were once the station's research subjects. The core challenge is a race against the rising water level, forcing the player to solve environmental puzzles to re-route power and open new pathways to the upper decks, all while being hunted by a massive, mutated creature that stalks them from the darkened waters of the flooded main reactor chamber."\`*(This output is vastly superior because it was built on the foundation of a high-quality, pre-generated concept.)*

## 13.5 Crafting Effective Step-Back Questions

The quality of this strategy depends entirely on the quality of your Abstraction Prompt. A good step-back question should:

- **Focus on Principles, not Specifics:** Use words like "principles," "frameworks," "core concepts," "best practices," "themes," or "fundamentals."
- **Generalize Entities:** Replace specific names or details with their general categories. Instead of "How can I make this specific character, John Smith, more compelling?" ask, "What are the key literary techniques for creating a compelling and morally ambiguous protagonist in a noir thriller?"
- **Target the AI's General Knowledge:** The question should be something the model can answer from its broad training, not something that requires knowledge of your specific, private context.

## 13.6 Conclusion: The Power of Detour

The Step-Back strategy teaches us a vital lesson in prompt engineering: sometimes the most direct path is not the most effective one. By taking a deliberate detour into the realm of abstraction, you can equip the AI with the foundational knowledge it needs to solve your specific problem with a level of insight, creativity, and coherence that a direct prompt could never achieve.

It is a technique for transforming the AI from a simple implementation tool into a genuine thought partner. You are not just asking it to perform a task; you are asking it to first understand and articulate the very principles that define success for that task. This elevation in thinking is what separates a merely adequate response from an exceptional one.

# Chapter 14: The Self-Correction Strategy: Prompting the AI to Review and Refine Its Own Work

## 14.1 The First-Draft Problem: The Brilliant Improviser Who Never Edits

Large Language Models are, at their core, brilliant improvisers. They generate text token by token, seamlessly weaving together sentences and concepts in a continuous, forward-moving stream of prediction. This process is what allows them to produce fluent, coherent, and often startlingly insightful text. However, this very strength—this relentless forward momentum—is also a critical weakness.

The model's generation process is inherently greedy. It makes the best local choice at each step, but it lacks the natural, recursive cognitive loop that humans use: the process of writing a draft, pausing, re-reading, critiquing, and refining. An LLM, left to its own devices, almost never second-guesses itself. Its first draft is its final draft. This "first-draft fallibility" can lead to outputs that contain subtle factual errors, logical inconsistencies, incomplete arguments, or a failure to adhere to all the constraints of a complex prompt.

The **Self-Correction Strategy** is a sophisticated prompting technique designed to solve this problem. It is the practice of explicitly building a "review and refine" loop *into the prompt itself*. Instead of accepting the AI's first pass, you command it to become its own editor, its own critic, and its own quality assurance engineer. This strategy forces the model to pause its improvisational flow, evaluate its own work against a set of criteria, and produce a new, superior version based on that self-critique.

## 14.2 The Core Idea: Building an Internal Feedback Loop

The Self-Correction strategy moves beyond a simple, one-way instruction. It creates a multi-step, internal workflow within a single prompt or a chained sequence of prompts. The core of the strategy is to separate the act of *generation* from the act of *evaluation*.

- **Without Self-Correction:**\`Prompt -> [AI Black Box] -> Final Output\`
- **With Self-Correction:**\`Prompt -> [AI Generates Draft] -> [AI Critiques Draft] -> Final, Refined Output\`

This is not the same as the user manually reviewing the output and providing feedback in a follow-up prompt. The power of the Self-Correction *strategy* is in its automation. You architect the prompt in such a way that the AI performs this entire loop autonomously, delivering a more polished and reliable result from a single, more complex request. It is the difference between editing a document yourself and teaching a writer to edit their own work before they submit it to you.

## 14.3 The Rationale: Simulating a Deeper Cognitive Process

Forcing an AI to critique its own work is a powerful mechanism that leverages several key aspects of its architecture and training.

1. **Activates Evaluative Capabilities:** LLMs are not just generators; they are also excellent evaluators. They have been trained on a massive corpus that includes critiques, reviews, edits, and debates. By prompting for a critique, you are activating this specific, well-trained capability. The model is often better at recognizing an error than it is at avoiding it in the first place.
2. **Forces Constraint Checking:** In a complex prompt with multiple constraints (e.g., "Summarize under 200 words, in a formal tone, for a non-technical audience, and include a call to action"), a model might miss one of these constraints in its initial, forward-pass generation. A self-correction step that explicitly instructs the model to "review the draft to ensure all constraints have been met" provides a safety net, allowing it to catch and fix its own omissions.
3. **Breaks the Path Dependency:** The token-by-token generation process is path-dependent. An early error can lock the model into a flawed trajectory. The act of generating a critique creates a new, independent context. The model can then re-generate the final output based on the insights from the critique, effectively breaking free from its initial, flawed path.
4. **Improves Robustness and Reliability:** By building a QA step directly into the process, you create a system that is inherently more resilient to error. This is crucial for production applications where the cost of an incorrect or incomplete response is high.

## 14.4 A Toolkit of Self-Correction Techniques

There are several ways to implement the Self-Correction strategy, ranging from simple commands to sophisticated multi-persona simulations.

### 14.4.1 Technique 1: The Explicit "Review and Refine" Command

This is the most direct approach. You instruct the AI to perform the task in sequential stages: draft, review, and finalize.

- **Prompt Structure:**\`Your task is to [describe the task].Follow these steps:1. First, write a preliminary draft of the response.2. Second, review the draft you just wrote. Check it for [list specific criteria: accuracy, clarity, tone, adherence to constraints, etc.].3. Third, rewrite the draft into a final, polished version based on your review.\`

### 14.4.2 Technique 2: The "Critique and Improve" Loop

This technique makes the evaluation step more explicit and transparent by asking the AI to output its critique before generating the final version. This is excellent for debugging and understanding the model's "thought process."

- **Prompt Structure (using structural tags):**\`Your task is to [describe the task].\`
    
    \`First, write your initial draft inside <draft> tags.Next, critique your own draft inside <critique> tags. Identify at least three specific weaknesses or areas for improvement.Finally, write the improved, final version inside <final_version> tags, addressing the points from your critique.\`
    

### 14.4.3 Technique 3: The Multi-Persona Debate

A powerful and creative form of self-correction, this technique leverages the Persona Strategy to create an internal debate. You assign two or more conflicting personas and have them critique each other's perspectives.

- **Prompt Example (Strategic Planning):**\`"We are considering launching a new, premium-priced product. To analyze this, simulate a debate between two VPs: **VP of Sales (The Optimist):** Argue for why this is a massive revenue opportunity. **VP of Finance (The Skeptic):** Argue against it, focusing on the risks of market alienation and high costs.\`
    
    \`After presenting both arguments, act as the CEO and write a final, balanced decision that synthesizes both viewpoints and defines the path forward."\`*(The debate itself is the self-correction mechanism, forcing the model to consider the problem from multiple angles before reaching a conclusion.)*
    

### 14.4.4 Technique 4: The "Pre-Mortem Analysis"

This is a proactive form of self-correction. You ask the model to imagine its response has failed and to diagnose the reasons for that failure *before* it even writes the response.

- **Prompt Example (Project Plan):**\`"I need you to generate a detailed project plan.Before you write the plan, I want you to perform a 'pre-mortem'. Imagine it is six months from now, and this project has failed catastrophically. In a <pre_mortem> tag, write a brief analysis of the three most likely reasons for its failure (e.g., unrealistic timelines, resource conflicts, scope creep).Then, in a <project_plan> tag, write the actual project plan, ensuring it includes specific, explicit mitigation strategies to prevent the failure points you identified in the pre-mortem."\`

## 14.5 Self-Correction in Action: A Code Generation Example

Code generation is a perfect domain to illustrate the power of this strategy, as first-draft code often contains subtle bugs or misses edge cases.

- **Prompt (Without Self-Correction):**\`"Write a Python function that takes a list of strings and returns a new list containing only the strings that are palindromes."\`
- **Possible Output (Flawed):**
    
    \`\`\`python
    def find_palindromes(strings):
        palindromes = []
        for s in strings:
            if s == s[::-1]:
                palindromes.append(s)
        return palindromes
    
    \`\`\`
    
    *(This code works for simple cases but fails on strings with different capitalization, e.g., "Racecar", or strings with punctuation, e.g., "A man, a plan, a canal: Panama".)*
    
- **Elite Prompt (With Self-Correction):**\`"Your task is to write a robust Python function to find palindromes in a list of strings.\`
    - \`*Step 1: The Initial Code**First, write the function inside a \\\\\`\\\`\\\\\`python code block.\`
    - \`*Step 2: Identify Edge Cases & Bugs**Next, as a senior QA engineer, list potential edge cases and bugs in the code you just wrote. Consider issues like capitalization, punctuation, and empty strings.\`
    - \`*Step 3: The Refined Code**Finally, rewrite the function to be robust and handle all the edge cases you identified. Place the final, production-ready code in a separate \\\\\`\\\`\\\\\`python code block."\`
- **Expected Output (Robust and Self-Corrected):Step 1: The Initial Code**
    
    \`\`\`python
    def find_palindromes(strings):
        # ... [initial flawed code] ...
    
    \`\`\`
    
    **Step 2: Identify Edge Cases & Bugs**\`1.  **Capitalization:** The current code is case-sensitive. It would fail to identify "Madam" as a palindrome.2.  **Punctuation and Spaces:** The code doesn't handle non-alphanumeric characters. "A man, a plan, a canal: Panama" would fail.3.  **Empty List:** The code should handle an empty input list gracefully.4.  **Empty Strings:** The code should correctly handle empty strings within the list.\`
    
    **Step 3: The Refined Code**
    
    \`\`\`python
    import re
    
    def find_palindromes_robust(strings):
        """
        Finds all palindromic strings in a list, ignoring case, spaces, and punctuation.
        """
        palindromes = []
        if not strings:
            return []
        for s in strings:
            # Normalize the string: remove non-alphanumeric chars and convert to lowercase
            normalized_s = re.sub(r'[^a-zA-Z0-9]', '', s).lower()
            if normalized_s and normalized_s == normalized_s[::-1]:
                palindromes.append(s)
        return palindromes
    
    \`\`\`
    

## 14.6 Conclusion: Building Resilience into the Prompt

The Self-Correction Strategy is the hallmark of a mature prompt engineer. It reflects an understanding that AI generation is a probabilistic process, not a deterministic one, and that building in checks and balances is essential for creating reliable, high-quality outputs.

By moving beyond the single, fire-and-forget prompt, you can architect a more thoughtful, resilient, and self-aware process. You are teaching the AI not just to generate, but to reflect. This internal feedback loop is what elevates a response from being merely plausible to being polished, robust, and correct. It is the final step in transforming the AI from a brilliant but fallible improviser into a dependable and self-aware creative partner.

# Chapter 15: The ReAct Strategy: Combining Reasoning with Action via External Tools

## 15.1 The Confines of the Ivory Tower: The Closed-World Problem

Thus far, our prompting strategies have operated within the "mind" of the AI. We have coaxed it into performing complex reasoning (CoT), exploring multiple possibilities (ToT), and critiquing its own work (Self-Correction). We have, in essence, created a brilliant thinker locked in an ivory tower. This thinker has access to a vast internal library—its training data—but it is a library with a strict cut-off date. It contains no information about yesterday's news, today's stock prices, or the current weather. Its knowledge is static and frozen in time.

This "closed-world" limitation gives rise to two fundamental problems that no amount of pure reasoning can solve:

1. **The Stale Knowledge Problem:** The model cannot answer questions about any event that has occurred since its training data was compiled. Its world view is perpetually out of date.
2. **The Grounding Problem (Hallucination):** When confronted with a question at the edge of its knowledge, the model can't simply *check the facts*. Instead, it often falls back on its primary function: predicting a plausible sequence of words. This can lead to the generation of "hallucinations"—answers that are well-written, confident, and entirely fabricated.

To solve these problems, we must break the AI out of its ivory tower. We need a strategy that allows it to not just *think*, but to *act*—to reach out, interact with the external world, gather fresh information, and use that information to inform its reasoning. This is the purpose of the **ReAct Strategy**.

## 15.2 The Principle of Agency: Reason to Act, Act to Reason

**ReAct**, an acronym for **Reason and Act**, is a paradigm-shifting strategy that transforms the LLM from a passive generator of text into an active agent capable of goal-oriented interaction with its environment. It fuses the step-by-step reasoning of Chain-of-Thought with the ability to use external tools, creating a powerful, iterative loop that mirrors human problem-solving.

Where a CoT model *thinks about* the answer, a ReAct agent *thinks about what to do next*.

The ReAct framework operates on a simple yet profound cycle: the **Thought-Action-Observation loop**.

1. **Thought (Reasoning):** The agent first analyzes the user's query and its current state of knowledge. It then formulates a verbal reasoning trace—a "thought"—that articulates its immediate goal and devises a plan to achieve it by using a specific tool. This thought is not the final answer, but a strategic plan for the next action.
2. **Action (Tool Use):** Based on its thought, the agent generates a specific, machine-readable command to execute an action using one of the tools it has been given access to. This could be a web search, a calculation, a database query, or a call to any external API.
3. **Observation (Processing Tool Output):** The external system (the "harness" or "orchestrator" you build) executes the action and returns the result to the agent. This result—the text from a webpage, the answer from a calculator, the data from a database—is the "observation."

This observation is then fed back into the agent's context, and the loop begins again. The agent's next **Thought** is now informed by the new information it has gathered, allowing it to refine its plan, ask follow-up questions, and iteratively build towards a final answer that is grounded in fresh, external data.

## 15.3 A Practical Walkthrough: The Agent as a Research Assistant

Let's consider a multi-step question that is impossible for a closed-world model to answer correctly.

**The Query:**\`"What was the name of the film that won the Oscar for Best Animated Feature in 2023, and what is its current Rotten Tomatoes score for critics?"\`

A ReAct agent, equipped with a \`Search\` tool, would tackle this as follows:

**Loop 1: Find the Movie**

- **Thought:** "I need to answer a two-part question. First, I need to identify the winner of the Best Animated Feature Oscar in 2023. I don't have this information in my internal knowledge base as it is a recent event. I should use the \`Search\` tool to find this information."
- **Action:** \`Search(query="Best Animated Feature Oscar winner 2023")\`
- **Observation:** (The system executes the search and returns the result) "Guillermo del Toro's Pinocchio won the Academy Award for Best Animated Feature Film at the 95th Academy Awards in 2023."

**Loop 2: Find the Score**

- **Thought:** "Okay, I have the name of the film: 'Guillermo del Toro's Pinocchio'. Now I need to find its current Rotten Tomatoes score for critics. I will use the \`Search\` tool again for this second piece of information."
- **Action:** \`Search(query="Guillermo del Toro's Pinocchio Rotten Tomatoes critic score")\`
- **Observation:** (The system executes the search) "Guillermo del Toro's Pinocchio has a Tomatometer score of 97% based on 300+ critic reviews."

**Loop 3: Synthesize the Final Answer**

- **Thought:** "I have successfully gathered both pieces of required information. I know the movie that won the award and its current critic score on Rotten Tomatoes. I can now formulate the final answer for the user."
- **Action (Final Answer):** "The film that won the Oscar for Best Animated Feature in 2023 was 'Guillermo del Toro's Pinocchio'. Its current Rotten Tomatoes critic score is 97%."

This iterative process allows the agent to decompose the problem and methodically gather the necessary information from the external world before constructing a final, accurate, and up-to-date answer.

## 15.4 The Architecture of a ReAct Agent: The System Prompt as the Blueprint

The ReAct strategy is not just a user-level prompting trick; it is an **agentic architecture** that must be defined in the **System Prompt**. The system prompt is the agent's core programming, its constitution. For a ReAct agent, this prompt must contain several critical components:

1. **Role and Goal Definition:** A clear statement of the agent's purpose (e.g., "You are a helpful AI assistant designed to answer questions by using external tools.").
2. **Tool Specification:** This is the most critical part. You must provide a comprehensive, machine-readable list of all the tools the agent can use. For each tool, you must define:
    - Its name (e.g., \`Search\`, \`Calculator\`).
    - A clear description of what it does (e.g., "Searches the internet for up-to-date information.").
    - The exact format of the \`Action\` call, including parameter names and types (e.g., \`Search(query: str)\`).
3. **Instruction on the Thought-Action-Observation Format:** You must explicitly instruct the model to follow the ReAct loop and to format its output in a precise, parsable way.
    
    **Example System Prompt Snippet:**\`...You have access to the following tools:\`
    
    \`Search(query: str): A tool to search the internet.\`
    
    \`To use a tool, you must use the following format:Thought: [Your reasoning and plan for the next action]Action: [The tool call, e.g., Search(query="your search term")]\`
    
    \`After an action, the system will return an observation:Observation: [The result of the tool execution]\`
    
    \`You must repeat the Thought-Action-Observation cycle until you have enough information to answer the user's question. Then, you must output the final answer directly.\`
    
4. **The Scratchpad (Implicit Context):** The growing history of the conversation (the sequence of Thoughts, Actions, and Observations) acts as the agent's "scratchpad" or short-term memory, allowing it to keep track of its progress.

## 15.5 The Trade-Offs: The Price of Agency

The power of the ReAct strategy is undeniable, but it comes with significant architectural complexity and performance trade-offs.

- **Advantage - Grounding & Freshness:** It is the ultimate solution for reducing hallucinations and ensuring information is up-to-date. The agent's answers are grounded in verifiable, external data.
- **Advantage - Transparency:** The explicit \`Thought\` traces make the agent's reasoning process entirely transparent, which is invaluable for debugging and building trust in the system.
- **Disadvantage - Latency:** ReAct is inherently slow. Each loop involves at least one LLM call plus the execution time of the external tool. A multi-step query can take several seconds to resolve, making it unsuitable for many real-time applications.
- **Disadvantage - Complexity & Cost:** Implementing a ReAct agent requires an "orchestrator" layer of code to parse the agent's \`Action\`, call the correct tool API, and format the \`Observation\`. Furthermore, each reasoning step consumes tokens and incurs API costs, making it more expensive than a single-pass prompt.

## 15.6 Conclusion: From a Thinker to a Doer

The ReAct strategy is a fundamental leap in the evolution of AI interaction. It is the framework that allows us to build not just language models, but true AI agents—systems that can reason, plan, and act upon the world to achieve their goals.

It is a complex and resource-intensive strategy, but it is the essential toolkit for solving problems that require knowledge beyond the model's static training data. By mastering the art of building and prompting these agents, you move from simply conversing with an AI to directing an intelligent, autonomous system capable of dynamic research, analysis, and problem-solving in the real, ever-changing world.

# Chapter 16: The Prompt Chaining Strategy: Breaking Down Complex Workflows into Sequential Tasks

## 16.1 The Allure of the "Mega-Prompt": A Common Pitfall

As a prompt engineer's confidence grows, a natural temptation arises: the creation of the "mega-prompt." This is an attempt to orchestrate a complex, multi-stage workflow within a single, monolithic instruction. The prompt becomes a sprawling document, containing commands to research a topic, then draft a document based on that research, then edit the document for a specific tone, and finally, format it into a table—all in one go.

While this approach can sometimes work for simple tasks, it is a fundamentally fragile and inefficient strategy. The mega-prompt often collapses under its own weight, for several critical reasons:

1. **Cognitive Overload:** Even for a powerful LLM, a long list of disparate instructions can lead to a form of cognitive overload. The model may lose track of earlier constraints, blend distinct steps together, or simply ignore parts of the prompt in its rush to generate a coherent output.
2. **Context Contamination:** Different stages of a workflow often require different "mindsets." The divergent, creative thinking needed for brainstorming is fundamentally different from the convergent, logical thinking needed for technical analysis. When forced into a single context, these mindsets contaminate each other, leading to a less creative brainstorm and a less logical analysis.
3. **Lack of Control and Debuggability:** The mega-prompt is an all-or-nothing proposition. If the final output is flawed, it is nearly impossible to determine which specific instruction in the long chain of commands was misinterpreted. Debugging becomes a frustrating process of trial and error with the entire, complex prompt.
4. **Error Propagation:** A small error or hallucination generated early in the process becomes a permanent, corrupting part of the context. The rest of the generation will be built upon this flawed foundation, leading to a cascade of errors that ruins the final output.

To build robust, reliable, and sophisticated AI systems, we must move beyond the single mega-prompt. We must adopt the mindset of a systems architect, not just a prompter. This is the domain of the **Prompt Chaining Strategy**.

## 16.2 The Assembly Line Principle: Deconstructing the Workflow

The **Prompt Chaining Strategy** is the practice of deconstructing a complex workflow into a series of smaller, discrete, single-purpose prompts. The output of one prompt becomes the direct input for the next, creating a sequential "chain" or "pipeline."

The most powerful analogy for this strategy is a **factory assembly line**.

- A complex product (the final desired output, like a detailed report) is not built at a single, chaotic workstation.
- Instead, it moves down a line. At each station, a specialized worker (a specific, focused prompt) performs one, and only one, well-defined task.
- Station 1 takes the raw materials and forges the chassis. Station 2 takes the chassis and installs the engine. Station 3 takes the engine-fitted chassis and adds the wiring.
- Each step is isolated, optimized, and verifiable. The result is a high-quality, reliably produced final product.

Prompt chaining applies this same industrial logic to AI workflows. Instead of one prompt that does everything poorly, you create a chain of prompts where each link does one thing exceptionally well.

## 16.3 The Rationale: The Four Pillars of Chaining's Power

This strategy is not just a matter of organization; it provides fundamental engineering advantages that are impossible to achieve with a single prompt.

1. **Focus and Precision:** Each prompt in the chain has a single, clear objective. This allows the AI to dedicate its full "attention" and computational resources to executing one well-defined task at a time. This dramatically increases the quality and accuracy of each intermediate step.
2. **Context Isolation and Purity:** This is perhaps the most critical benefit. Each prompt in the chain operates in a "pristine" contextual environment. The creative, divergent thinking of a "Brainstorming Prompt" is completed, and its output is passed to the next step. The "Logical Analysis Prompt" then receives only the clean output of the brainstorm, without any of the contaminating "what if" context that created it. This prevents mental models from bleeding into one another.
3. **Control, Debuggability, and Verifiability:** A chained workflow is transparent. If your final output is flawed, you can inspect the output of each link in the chain. This allows you to immediately pinpoint the exact step—and the exact prompt—that failed. You can then fix that single prompt and re-run the chain from that point, rather than starting the entire process from scratch.
4. **Optimized Resource Allocation:** This is a highly advanced benefit. A single mega-prompt forces you to use one model, with one set of parameters (like temperature), for all sub-tasks. A prompt chain allows you to use the *right tool for the right job* at each step.
    - **Step 1 (Brainstorming):** Use a highly creative model (like Claude 3 Opus or GPT-4) with a **high temperature** (e.g., 0.9) to encourage diverse ideas.
    - **Step 2 (Analysis):** Use a powerful reasoning model with a **low temperature** (e.g., 0.2) to ensure logical, deterministic outputs.
    - **Step 3 (Formatting):** Use a smaller, faster, and cheaper model (like Claude 3 Haiku) with a temperature of **0.0** to simply and reliably reformat the data into JSON.

This allows you to build workflows that are not only more reliable but also significantly more cost-effective and performant.

## 16.4 A Practical Walkthrough: Building a Technical Blog Post with a Prompt Chain

Let's construct a workflow to create a high-quality technical blog post, a task that is notoriously difficult for a single prompt.

**The Goal:** Write a 600-word blog post explaining the ReAct prompting framework for a technical audience.

### **Chain Link 1: The Researcher and Outliner**

- **Persona:** A senior AI research assistant.
- **Goal:** To gather key information and structure the content.
- **Prompt:**\`I am writing a technical blog post explaining the ReAct (Reason and Act) framework.Your task is to act as a research assistant. Based on your knowledge, generate a detailed, hierarchical outline for a 600-word blog post on this topic.The outline must include a brief introduction, a section explaining the core Thought-Action-Observation loop, a section on the benefits (like grounding), a section on the drawbacks (like latency), and a conclusion.\`
- **Output 1:** A well-structured Markdown outline.

### **Chain Link 2: The Technical Writer**

- **Persona:** An expert technical writer who makes complex topics easy to understand.
- **Goal:** To write the main body of the blog post based on the outline.
- **Prompt:**\`<outline>[Output 1 from the previous prompt is pasted here]</outline><instruction>You are an expert technical writer. Using the provided outline as your strict guide, write a full draft of the blog post. Write in a clear, professional, and engaging tone suitable for an audience of software developers. Ensure each section flows logically into the next. Do not write a title yet.</instruction>\`
- **Output 2:** The full 600-word draft of the blog post.

### **Chain Link 3: The Critical Editor**

- **Persona:** A skeptical, detail-oriented editor who checks for technical accuracy and clarity.
- **Goal:** To review and refine the draft.
- **Prompt:**\`<draft_to_review>[Output 2 from the previous prompt is pasted here]</draft_to_review><instruction>You are a meticulous editor. Review the draft above for technical accuracy, logical flow, and clarity. Provide a list of 3-5 specific, actionable suggestions for improvement. Format your feedback as a bulleted list.</instruction>\`
- **Output 3:** A list of suggestions, e.g., "Clarify the difference between the 'Action' and the 'Final Answer' steps..."

### **Chain Link 4: The Final Polish and SEO Specialist**

- **Persona:** An SEO and marketing specialist.
- **Goal:** To apply the edits and optimize the post for discovery.
- **Prompt:**\`<original_draft>[Output 2 is pasted here]</original_draft><editorial_feedback>[Output 3 is pasted here]</editorial_feedback><instruction>You are an SEO expert. First, rewrite the original draft to incorporate all of the editorial feedback.Second, after rewriting the text, generate 5 catchy, SEO-friendly titles for the final blog post.</instruction>\`
- **Final Output:** The polished, final blog post and a list of optimized titles.

## 16.5 The Role of the Orchestrator and the Human-in-the-Loop

A prompt chain is not fully autonomous. It requires an **orchestrator**. This can be a human operator who manually copies and pastes the output of one prompt into the next, or it can be a piece of code (e.g., a Python script) that automates the API calls and state management.

Furthermore, the chain provides perfect opportunities for **human-in-the-loop** intervention. A human expert can review the outline from Link 1 before it's passed to the writer, or edit the draft from Link 2 before it goes to the editor. This powerful synergy combines the speed and scale of AI with the nuanced judgment and expertise of a human, resulting in a final product that is superior to what either could achieve alone.

## 16.6 Conclusion: From Prompting to Workflow Architecture

The Prompt Chaining Strategy represents a crucial maturation in the discipline of prompt engineering. It is the point where we move beyond crafting single instructions and begin designing entire systems of intelligent work. It demands a new way of thinking—decomposing problems, defining clear interfaces between steps, and optimizing each component for its specific task.

By embracing this assembly line approach, you gain unprecedented control, reliability, and efficiency. You can build complex, multi-stage AI applications that are robust, easy to debug, and capable of producing outputs of a quality and sophistication that no single mega-prompt could ever hope to achieve. This is the future of applied AI: not a single, monolithic intelligence, but a well-orchestrated symphony of specialized, intelligent agents working in concert.

# Chapter 17: The Multi-Agent Strategy: Decomposing Workflows into a Team of Specialized AI Agents

## 17.1 From the Assembly Line to the Expert Team

In the previous chapter, we took a monumental leap from the single mega-prompt to the sequential logic of the prompt chain. We transformed our process from a single, chaotic workstation into an orderly, efficient assembly line. Each link in the chain performs its task with focus and precision, passing its completed work to the next station. This linear, sequential model is a powerful tool for bringing order and reliability to complex workflows.

But what happens when the task is not a simple linear assembly? What if it requires the collaborative effort of multiple, distinct specializations, working sometimes in sequence, sometimes in parallel, and sometimes in debate? A factory assembly line is good at building a car, but it's not the right model for designing one. Designing a car requires a *team*: a visionary product manager, a pragmatic engineer, a creative designer, and a meticulous quality assurance expert.

This is the next evolution in our thinking. The **Multi-Agent Strategy** is the practice of transcending the linear chain and architecting a virtual **team of specialized AI agents**. Each agent is an independent instance of the LLM, instantiated with its own unique, highly focused persona and purpose. This is not just a chain of prompts; it is a system of collaborators. It is the point where the prompt engineer truly becomes a systems architect, or perhaps, a team manager.

## 17.2 The Rationale: The Power of Deep Specialization

A single, general-purpose AI, even when guided through a prompt chain, can struggle to effectively context-switch between the different mindsets required for a complex workflow. The divergent, "blue-sky" thinking needed for brainstorming is fundamentally at odds with the convergent, detail-obsessed thinking needed for code debugging. Asking one "worker" to rapidly switch between these roles is inefficient and error-prone.

The Multi-Agent strategy solves this by creating a virtual team where each member is an undisputed world expert in their single, narrow domain. This approach yields profound benefits:

1. **Deep Expertise and Persona Purity:** Instead of a single AI with a diluted, general-purpose persona, you can create an agent whose entire "being"—defined by its system prompt—is optimized for a single function. A "Creative Brainstormer" agent's system prompt can be filled with language that encourages novelty and risk-taking, while a "QA Engineer" agent's prompt can be built around principles of rigor, skepticism, and meticulous attention to detail. This "persona purity" results in a far higher quality of work at each stage.
2. **Cognitive Isolation:** This is the most critical architectural advantage. By separating the workflow into distinct agents, each with its own isolated conversational context, you prevent "cognitive contamination." The creative, high-temperature chaos of the brainstorming agent never touches the pristine, low-temperature logical context of the system architect. Each agent operates in its own clean room, receiving only the necessary inputs and producing a clean output, unburdened by the thought processes of the agents that came before it.
3. **Modularity and Maintainability:** A multi-agent system is inherently modular. If you find that your "Code Generation" agent is underperforming, you can fine-tune or replace its system prompt without touching any other part of the workflow. This makes the entire system easier to debug, maintain, and upgrade over time—a core principle of robust software engineering.
4. **Parallel Processing:** While a prompt chain is strictly sequential, a multi-agent system can be designed to work in parallel. You can have three different "Marketing Angle" agents brainstorm ideas simultaneously, and then have a fourth "Marketing Director" agent synthesize their best ideas. This can dramatically reduce the total time required to complete a complex task.

## 17.3 The Four Principles of Multi-Agent Architecture

Building an effective multi-agent system requires a disciplined, architectural approach. Four key principles must be followed.

### Principle 1: Decompose the Workflow into Discrete Roles

Before writing a single prompt, analyze your workflow and break it down into the distinct expert roles required for its completion. Think like a manager building a project team. What are the key phases? Who are the specialists you need? (e.g., Researcher, Writer, Editor, Strategist, Critic).

### Principle 2: Engineer a Pure, Elite Persona for Each Agent

For each identified role, craft a dedicated, highly specific **System Prompt**. This prompt is the agent's DNA. It must be pure, focusing only on that agent's core identity, tools, and behavioral logic. Do not contaminate it with specific examples or data for a one-off task. (See Chapter 6: The Persona Strategy).

### Principle 3: Enforce Strict Context Isolation

This is the golden rule of multi-agent systems. **Each specialized agent must operate in its own, separate chat session or conversational context.** Do not force them to share the same conversational history. The output from Agent A becomes the *input* for Agent B, but Agent B should never see the *conversational history* that led Agent A to its conclusion. This prevents context contamination and ensures each agent operates with a clean slate, focused only on its specific task and persona.

### Principle 4: Match Configuration to the Role

Leverage the freedom that a multi-agent architecture provides. Each agent can be run with its own optimal configuration.

- **Creative Agents (Brainstormers, Copywriters):** Use a powerful, creative model (e.g., GPT-4, Opus) at a **high temperature** (0.8+) to encourage novel and diverse outputs.
- **Logical Agents (Analysts, Architects, QA):** Use a strong reasoning model at a **low temperature** (0.0 - 0.2) to ensure deterministic, stable, and logically sound outputs.
- **Simple Task Agents (Formatters, Classifiers):** Use a fast, cost-effective model (e.g., Haiku, Sonnet) to perform simple, repetitive tasks efficiently.

## 17.4 A Practical Walkthrough: The Software Development Team

Let's apply these principles to build a virtual team to turn a business requirement into a fully specified software project.

**The Workflow:** Business Need -> User Stories -> System Architecture -> Test Plan

### **Agent 1: The Product Manager**

- **Persona:** An expert Product Manager who bridges the gap between business needs and engineering requirements.
- **System Prompt:** \`"I am an expert Product Manager. My core function is to work with stakeholders to translate abstract business needs into clear, concise, and unambiguous user stories, complete with detailed acceptance criteria. I follow the INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) model for story writing."\`
- **Configuration:** Reasoning Model, Temperature 0.5 (for a balance of structure and clarity).
- **Input:** A vague business request, e.g., "We need a way for users to update their profiles."
- **Output:** A list of well-formed user stories.

### **Agent 2: The System Architect**

- **Persona:** A seasoned System Architect specializing in designing robust, scalable, and secure microservices.
- **System Prompt:** \`"I am a seasoned System Architect. I take user stories and acceptance criteria and transform them into a complete system design. My output includes detailed API contracts (endpoints, request/response schemas), data models for the database, and a high-level diagram of component interactions. I prioritize security and scalability in all my designs."\`
- **Configuration:** Reasoning Model, Temperature 0.1 (for precision and logic).
- **Input:** The user stories generated by the Product Manager agent.
- **Output:** A detailed technical specification.

### **Agent 3: The QA Engineer**

- **Persona:** A meticulous and slightly paranoid QA Engineer with a passion for finding failure points.
- **System Prompt:** \`"I am a meticulous QA Engineer. I analyze user stories and system architecture designs to create comprehensive test plans. My goal is to anticipate every possible failure mode. My output is a detailed list of test cases, including unit tests, integration tests, and end-to-end test scenarios, specifying the test's purpose, steps, and expected outcome."\`
- **Configuration:** Reasoning Model, Temperature 0.6 (to creatively imagine failure scenarios).
- **Input:** The user stories from the PM and the system design from the Architect.
- **Output:** A comprehensive test plan.

In this workflow, the manager (the orchestrator) takes the output from the PM and provides it as the *sole input* to the Architect in a brand new, isolated chat. This process is repeated for the QA Engineer. The result is a high-quality, fully specified project plan, created by a team of virtual experts, each performing their role flawlessly.

## 17.5 The Orchestrator: The Human (or Code) in Command

A multi-agent system, like a human team, requires a manager. This role is filled by the **orchestrator**. The orchestrator is responsible for:

1. Defining the agents and the workflow.
2. Passing the output of one agent as the input to the next.
3. Managing the isolated contexts for each agent.

In a manual process, the orchestrator is you, the prompt engineer, copying and pasting between different chat windows. In an automated system, the orchestrator is a script (e.g., in Python) that manages the API calls, stores the intermediate outputs, and routes the data between the different agent "functions."

## 17.6 Conclusion: The Future is a Symphony

The Multi-Agent Strategy is the pinnacle of modern prompt engineering. It represents the final and most crucial conceptual shift: from crafting a single, perfect prompt to designing a holistic, intelligent system. It is the difference between conducting a soloist and conducting an orchestra.

Each agent is a finely tuned instrument, and the system prompt is its sheet music. By creating a team of these virtual specialists and orchestrating their collaboration, you can tackle problems of a complexity far beyond the reach of any single prompt. You can build systems that brainstorm, design, execute, and critique—simulating the entire collaborative process of an expert human team. This is not just prompting; it is the architecture of AI-powered work.

# Chapter 18: The Constructive Guidance Strategy: Iterating and Steering the AI within a Conversation

## 18.1 The Myth of the Perfect First Prompt

In our quest for prompt engineering mastery, we have dedicated immense effort to the art of crafting the perfect initial prompt—a single, flawless instruction designed to elicit a complete and perfect response in one go. For simple, well-defined tasks, this ideal is achievable. But for any task of significant complexity, creativity, or duration, the "one-shot, one-kill" approach is a myth.

A complex task is not a transaction; it is a process. The AI's initial output, no matter how well-prompted, should not be viewed as the final product. It is the **first draft**. It is the sculptor's initial, rough-hewn block of marble. It contains the form and potential of the final masterpiece, but it requires shaping, refinement, and detail work.

This is where the role of the prompt engineer must evolve from that of an *architect* who designs the blueprint to that of a *director* on a film set. The director doesn't just hand the actor a script and walk away; they watch the performance, provide feedback, and guide the actor through multiple takes to achieve the desired outcome. The **Constructive Guidance Strategy** is the practice of this active, in-conversation direction. It is the art of iterating with the AI, steering its performance turn by turn, and collaboratively refining a first draft into a final, polished product.

## 18.2 The Rationale: The AI as a Collaborative Partner

Understanding why this iterative, conversational approach is so effective requires us to embrace a new mental model. The AI is not a vending machine where a perfect input guarantees a perfect output. It is a collaborative partner that learns and adapts *within the context of a single conversation*.

1. **The AI Mirrors Your Tone:** LLMs are highly attuned to the user's tone. If you respond to a suboptimal output with negative, critical, or accusatory language ("You're wrong," "That's a terrible function," "You didn't follow my instructions"), you can inadvertently trap the model in a negative feedback loop. It may become defensive, uncooperative, or produce increasingly degraded responses. Constructive, positive, and encouraging language, however, fosters a collaborative state, making the AI more receptive to your guidance.
2. **In-Context Learning in Action:** Every turn in a conversation is a micro-learning opportunity for the AI. When you provide corrective feedback, you are essentially creating a new, temporary Few-Shot example. Your refinement—"That's a good start, now let's add error handling"—becomes part of the context, teaching the model the desired pattern for the *next* generation within that same conversation.
3. **The User as the State Manager:** The AI has no true understanding of when a sub-task is "finished." It only knows the linear history of the conversation. Without clear signals from the user, it may continue to "work on" a problem that you consider solved, leading to context contamination. The user must act as the explicit project manager of the conversation, clearly opening and closing tasks to guide the AI's focus.

Mastering this strategy means moving from a mindset of "pass/fail" on the AI's first response to a mindset of "draft and refine."

## 18.3 A Toolkit of Conversational Steering Techniques

Effective guidance is not a single technique, but a suite of conversational tactics used to steer the AI's performance.

### 18.3.1 Principle 1: Positive Reinforcement and Constructive Feedback

When an output is not perfect, always frame your feedback constructively. Start by acknowledging the positive aspects of the response, then clearly and specifically state the desired modifications.

- **Less Effective (Negative Criticism):**\`"This function you wrote is terrible. It has a bug and it doesn't even handle errors. Fix it."\`
- **More Effective (Constructive Guidance):**\`"Excellent first draft of the function! You've captured the core logic perfectly. Now, for our production version, let's enhance it. Could you please add a try-catch block to handle potential exceptions and also add a check to ensure the input parameter is not null before processing?"\`

This approach is not about being polite for the sake of it. It is a more effective engineering practice that keeps the AI in a collaborative state and provides clear, actionable instructions for improvement.

### 18.3.2 Principle 2: Explicit State Management

Do not assume the AI knows when a sub-task is complete and it's time to move on. You must provide explicit signals to close out a task, which allows the AI to "release" that context and devote its full attention to the next objective.

- **Ambiguous (Implicit State):***(After the AI generates a block of code)* \`"Okay, now create the documentation for it."\`*(The AI might think the code itself is still under review and that the documentation is part of the same, ongoing task.)*
- **Explicit (Clear State Management):**\`"That code is perfect and passes all my tests. We can now consider the implementation task for this module to be 100% complete. Let's start the next distinct task: generating the user documentation for the function we just finalized."\`

The second prompt provides an unambiguous signal that the coding task is finished, preventing its context from bleeding into the documentation task.

### 18.3.3 Principle 3: Trajectory Correction via Editing

When a conversation goes off track due to a misunderstanding in an *earlier* prompt, the most effective solution is often **not** to try and fix it with a series of follow-up corrections. The superior solution is to go back in the conversation history and **edit the user prompt that caused the deviation**.

- **Why It Works:** An AI's response is conditioned on the *entire* preceding conversation history. If an early prompt contains a flaw, that flaw becomes a permanent, corrupting part of the foundational context for all subsequent turns. Follow-up "patches" ("No, I meant this," "Don't do that, do this instead") add more noise and confusion. Editing the original, flawed prompt cleans the foundational context. This allows the AI to regenerate its entire reasoning path from a correct starting point, resulting in a far more coherent and accurate outcome.
- **Illustrative Example:**
    - **Bad Practice (Patching):**
        - **User:** \`"Generate a Python script to parse CSV files in the /data directory."\`
        - **AI:** *(Generates a script using the \`pandas\` library)*
        - **User:** \`"No, I can't use pandas. The environment is minimal. Don't use external libraries."\`
        - **AI:** *(Rewrites using Python's built-in \`csv\` module, but the context is now messy)*
    - **Good Practice (Editing):**
        - **User (Original):** \`"Generate a Python script to parse CSV files in the /data directory."\`
        - **AI:** *(Generates script using \`pandas\`)*
        - **User (Goes back and edits the original prompt to):** \`"Generate a Python script to parse all CSV files in the /data directory. The script must use only the Python standard library, with no external dependencies like pandas. It must include robust error handling for missing files."\`*(The AI now regenerates its response from a clean, correct foundation.)*

### 18.3.4 Principle 4: Pre-Execution Calibration (The 'Teach-Back' Method)

Before the AI begins a complex, time-consuming task, you can prevent wasted effort by requiring it to first confirm its understanding of the plan. This "teach-back" method exposes any subtle misunderstandings *before* significant work is done.

- **Why It Works:** True understanding is only confirmed when the AI can articulate the plan in its own words. This forces the model to synthesize your instructions and formulate a coherent plan of action, revealing any hidden assumptions or misinterpretations upfront.
- **Illustrative Example:**\`"We need to build a REST API endpoint for user profile updates. It should use the HTTP PATCH method, be authenticated, and allow updates to a user's 'firstName', 'lastName', and 'bio' fields in the database. **Before you write any code, please confirm your understanding of the task.** Describe the endpoint's path, the expected request body structure, the validation checks you will perform, and the sequence of operations in your plan."\`

This single alignment step is one of the most critical and highest-leverage actions a user can take in a complex conversation.

## 18.4 Conclusion: The User as the Conductor

The Constructive Guidance Strategy completes our understanding of the user's role in prompt engineering. You are not a passive audience member waiting for a performance. You are the conductor of an orchestra. Your initial prompt is the downbeat, but your true skill is revealed in how you guide the ensemble through the performance—adjusting tempo, correcting notes, and shaping the dynamics to create a symphony.

The quality of a long and complex AI-driven task is almost never determined by the brilliance of the first prompt alone. It is determined by the user's skill in managing the ensuing dialogue. By mastering the art of constructive feedback, explicit state management, trajectory editing, and pre-execution calibration, you can transform the AI from a simple tool that responds to commands into a true partner that collaborates in an iterative and deeply creative process.

# Chapter 19: The Affirmative Direction Strategy: Stating What to Do vs. What Not to Do

## 19.1 The Paradox of Prohibition: The "Pink Elephant" Problem

There is a classic psychological exercise that perfectly illustrates a fundamental flaw in human—and artificial—cognition: **"For the next ten seconds, do not, under any circumstances, think of a pink elephant."**

The result is inevitable. The very act of processing the prohibition forces your mind to conjure the exact image you are trying to avoid. The instruction, intended to prevent a thought, is the very thing that seeds it. This paradox of prohibition is not just a quirk of human psychology; it is a critical, mechanistic limitation in how Large Language Models process information.

A common but deeply flawed approach to prompting is to provide the AI with a list of negative constraints—a list of things it *should not* do. "Do not write code without comments." "Do not use a formal tone." "Do not forget to handle edge cases." While this seems like a direct and logical way to constrain the model's output, it is, in fact, one of the least effective and most error-prone methods of instruction.

The **Affirmative Direction Strategy** is a complete paradigm shift away from this thinking. It is built on a simple, robust, and machine-friendly principle: **Architect the path to the desired outcome, rather than just fencing off the paths to the undesired ones.** It is the art of exhaustively detailing what the AI *should* do, in such a compelling and comprehensive way that the possibility of error is never even introduced.

## 19.2 The Rationale: Why "Don't" is a Flawed Command for an LLM

To understand why affirmative direction is so superior, we must look at how an LLM's attention mechanism and predictive engine actually work.

1. **Attention is Not Negation:** When you include the phrase "Do not use insecure functions" in a prompt, the model's attention mechanism must still focus on the concept of "insecure functions" to understand the instruction. The words "insecure" and "functions" become highly weighted parts of the context. The negation ("do not") is a grammatical modifier, but it does not erase the semantic presence of the core concept. The pink elephant is now in the room, and the model has to actively expend effort to work around it, ironically increasing the cognitive load and the chance of a related error.
2. **The Weakness of Negative Weights:** LLMs operate by predicting the most probable next token. The presence of a concept in the prompt increases the probability of related tokens appearing. While a negation might attempt to apply a negative weight, this signal can be weak and easily lost or down-weighted, especially in a long and complex prompt. The strong, positive signal of the core concept often overpowers the weak, negative signal of the prohibition.
3. **A Clean Path vs. a Minefield:** An affirmative instruction creates a clean, direct, and efficient "thought path" for the model to follow. It's a clear map to a destination. A list of prohibitions, conversely, creates a cognitive minefield. The model must generate a potential output and then constantly check it against the list of things it's not supposed to do. This is a computationally expensive, reactive, and error-prone process. It is far more robust to build a single, safe, well-lit highway than it is to send the model into a dark field with a map of where the mines *might* be.

## 19.3 The Core Principle: Proactive Design over Reactive Correction

The essence of the Affirmative Direction Strategy is to shift your mindset from being a reactive critic to a proactive architect. Instead of correcting potential failures, you design a process that leads inevitably to success.

- **The Prohibitive Mindset (Reactive):**
    - *Starts with:* "What could go wrong?"
    - *Generates:* A list of "Don't..." statements.
    - *Result:* A complex, inefficient process that risks failure at every step.
- **The Affirmative Mindset (Proactive):**
    - *Starts with:* "What does a perfect execution of this task look like, step-by-step?"
    - *Generates:* A detailed, positive description of the ideal process and persona.
    - *Result:* A clean, direct, and robust process that guides the AI naturally to the desired outcome.

## 19.4 Affirmative Direction in Practice: A Gallery of Transformations

This principle is best understood through concrete, side-by-side comparisons. Notice how the "More Effective" versions are not just simple inversions of the negative commands; they are richer, more detailed descriptions of a successful persona and workflow.

### **Example 1: Code Generation and Best Practices**

- **Less Effective (Prohibitive):**\`"Write a Python function to process user data.Do not write code without comments.Do not forget to handle edge cases like null input.Do not use insecure functions like 'pickle'.Do not write one large, monolithic function."\`
- **More Effective (Affirmative):**\`"I am a senior Python developer who practices meticulous, documentation-driven design and adheres to the highest standards of security and modularity.My process for writing any function is as follows:1. **Define Signature and Docstring:** First, I define the function signature with full type hints. Then, I immediately write a comprehensive docstring detailing its purpose, parameters, return values, and any potential exceptions it may raise.2. **Input Validation:** The very first part of my implementation is robust input validation. I rigorously check for all edge cases, such as null or empty inputs, and handle them gracefully.3. **Modular and Secure Implementation:** I write the core logic using small, well-named helper functions. I exclusively use secure, industry-standard libraries like 'json' for data serialization.4. **Final Review:** Before concluding, I review my code to ensure it is clean, readable, and perfectly documented.\`
    
    \`Now, following this exact process, write a Python function to process user data."\`
    

### **Example 2: Controlling Writing Style and Tone**

- **Less Effective (Prohibitive):**\`"Write an email to a customer about a service outage. Do not be too formal. Do not use technical jargon. Do not sound like a robot. Do not blame the customer."\`
- **More Effective (Affirmative):**\`"I am a compassionate and clear-thinking customer support specialist.I am writing an email to a non-technical customer to inform them about a recent service outage.My writing style is warm, empathetic, and direct. I use simple, everyday language and clear analogies to explain technical issues. My primary goal is to reassure the customer and provide them with a clear timeline for the resolution.The email should have three parts: a sincere apology acknowledging their frustration, a brief and simple explanation of the issue, and a confident statement about the next steps."\`

### **Example 3: Content Generation and Focus**

- **Less Effective (Prohibitive):**\`"Write a product description for our new hiking boot. Do not talk about the price. Do not mention our competitors by name. Do not make it too long."\`
- **More Effective (Affirmative):**\`"Write a product description for our new hiking boot, the 'Trailblazer Pro'.The description must be exactly three paragraphs long.The first paragraph should focus on the boot's core benefit: all-day comfort, enabled by our proprietary 'CloudStep' insole technology.The second paragraph should highlight its durability, focusing on the waterproof Gore-Tex material and the rugged Vibram outsole.The final paragraph should be a compelling call to action, inviting the reader to 'experience their next adventure'."\`

## 19.5 Integrating Affirmative Direction with System Prompts

The Affirmative Direction Strategy finds its most powerful application in the design of **System Prompts**. A system prompt should be a positive constitution for the AI. It should be a declaration of *what the AI is* and *how it operates*, not a penal code of what it is forbidden from doing.

A system prompt built on prohibitions creates a fearful, hesitant AI. A system prompt built on a rich, affirmative description of an expert persona creates a confident, capable, and proactive AI collaborator.

## 19.6 A Note on Absolute Boundaries

This is not to say that a prohibition is *never* useful. For absolute, hard-line safety constraints or legal guardrails, an explicit "DO NOT" can serve as a final, critical safety net. For example: "DO NOT, under any circumstances, generate personally identifiable information (PII)."

However, these should be seen as the exception, not the rule. They are the high-voltage fences around the perimeter, used sparingly for critical boundaries. The detailed work of guiding the AI within that perimeter should always be done with the positive, proactive, and ultimately more effective language of affirmative direction.

## 19.7 Conclusion: The Architect of Success

The Affirmative Direction Strategy is a fundamental shift in prompt design. It moves the engineer's focus from preventing failure to architecting success. It is a more robust, more efficient, and more reliable way to communicate with a predictive system.

By learning to describe the ideal process in rich, positive detail, you are not just giving the AI a command; you are giving it a blueprint for excellence. You are drawing a clear and direct map to the treasure, making the journey so straightforward that the model never even considers wandering into the surrounding traps. This proactive design is the essence of advanced, reliable AI engineering.

# Chapter 20: The Output Formatting Strategy: Forcing Structured Data like JSON and Tables

## 20.1 The Last Mile Problem: From Prose to Precision

The raw, native output of a Large Language Model is prose. It is conversational, descriptive, and human-readable. This is its greatest strength and, for many applications, its most crippling weakness. When you are building a software application, a data pipeline, or any automated workflow, a conversational paragraph is not a useful input. It is a block of unstructured text that requires fragile, complex, and error-prone post-processing—like regular expressions or brittle string splitting—to extract the valuable information locked within.

This is the "last mile" problem of prompt engineering. You can guide an AI to a perfectly correct and insightful answer, but if that answer is delivered in a format that your system cannot reliably parse, the entire effort is wasted. A human can understand, "Sure, the user's name is John Doe, and his ID is 123." A computer cannot. A computer needs \`{"name": "John Doe", "id": 123}\`.

The **Output Formatting Strategy** is the solution to this critical problem. It is the practice of compelling the model to act not as a conversationalist, but as a precise data structuring engine. It involves a suite of techniques designed to force the AI to deliver its response in a perfectly predictable, machine-readable format, such as JSON, XML, or a Markdown table. Mastering this strategy is the essential bridge between using AI for simple assistance and integrating AI as a reliable, automated component in a production-grade system.

## 20.2 The Rationale: Why Structure is Non-Negotiable for Systems

Forcing a structured output is not a matter of stylistic preference; it is a fundamental requirement for building robust AI-powered applications.

1. **Machine Readability:** This is the primary driver. Structured data can be instantly and reliably parsed by any programming language. A JSON object can be deserialized into a native object or dictionary, and a table can be read into a data frame, all with zero ambiguity. This eliminates the need for a fragile layer of parsing code.
2. **Consistency and Reliability:** When you successfully enforce an output format, you guarantee that the *shape* of the data will be the same every single time. This predictability is the bedrock of reliable systems. You can build your application with the confidence that the \`user_id\` field will always be present and correctly named.
3. **Reduced Post-Processing:** By making the AI do the work of structuring the data, you save significant development time and effort. The logic for extracting and organizing the information is embedded in the prompt itself, rather than in a separate, complex body of post-processing code.
4. **Implicit Constraint and Focus:** Forcing the AI to populate a specific structure is a powerful form of affirmative direction. When you ask for a JSON object with keys for \`product_name\`, \`price\`, and \`sku\`, you are implicitly telling the model to find *only* that information and to ignore everything else. This helps to focus the model's attention, reducing the likelihood of it including irrelevant details or hallucinating extraneous facts.

## 20.3 The Toolkit of Formatting Control

There are several techniques to enforce a specific output format, ranging in effectiveness from a gentle suggestion to an almost unbreakable command.

### 20.3.1 Technique 1: The Direct Command (The Simple Request)

This is the most straightforward method: simply tell the model what format you want.

- **Prompt:** \`"Extract the key entities from the following text and format them as a JSON object."\`
- **Effectiveness:** This often works for simple, standard formats like JSON or bulleted lists, but it can be unreliable. The model might still include conversational preambles ("Here is the JSON you requested:") or use inconsistent key names. It's a good starting point, but not robust enough for production.

### 20.3.2 Technique 2: The Schema or Template (The Blueprint)

This technique is a significant step up in reliability. Instead of just naming the format, you provide a blueprint or an empty template of the structure you want the AI to fill in.

- **Prompt (for a Markdown Table):**\`"Extract the following information from the text and present it in a Markdown table with these exact columns: | Product Name | SKU | Price |"\`
- **Prompt (for JSON):**\`"Extract the required information into a JSON object that conforms to the following schema:{ "author": string, "publication_year": integer, "key_findings": [string]}"\`
- **Effectiveness:** By providing the exact keys or column headers, you give the model a clear "form" to fill out. This dramatically increases the consistency of the output's structure and is highly effective for most use cases.

### 20.3.3 Technique 3: The Few-Shot Example (The Gold Standard)

As discussed in Chapter 5, showing is always more powerful than telling. Providing a complete, end-to-end example of an input and its perfectly formatted output is the most unambiguous and reliable way to enforce a structure.

- **Prompt (for Custom Delimited Format):**\`"Extract the name and email from the text. Follow the example format precisely.\`
    
    \`### EXAMPLE ###Text: "You can reach out to Steve Rogers at s.rogers@avengers.com for more info."Output: Steve Rogers|s.rogers@avengers.com\`
    
    \`### NEW TASK ###Text: "The project lead is Jane Doe (email: j.doe@example.com)."Output:\`
    
- **Effectiveness:** This is the gold standard for reliability. The model learns the exact transformation and formatting pattern from your example, leaving no room for interpretation. It is the preferred method for any complex or custom format.

### 20.3.4 Technique 4: The Prefilling Strategy (The Nudge)

This is a clever and powerful technique that leverages the model's predictive nature. You can "force" the model to begin its response in a specific format by prefilling the very first part of the \`assistant\`'s turn in your API call.

- **How it works:** If you want a JSON object, you start the assistant's response with a single opening brace: \`{\`. If you want a JSON array (a list), you start it with an opening bracket: \`[\`.
- **API Call Example (Simplified):**\`messages = [ {"role": "user", "content": "Extract the names of the three main characters into a JSON list."}, {"role": "assistant", "content": "["}]\`
- **Effectiveness:** This is an extremely strong signal. By providing the opening character, you have dramatically constrained the model's next token prediction. It is now overwhelmingly probable that it will continue generating a valid JSON list. This is a highly effective way to bypass conversational preambles and jump directly into the desired structure.

## 20.4 A Gallery of Formats: Beyond JSON

While JSON is the workhorse of machine-to-machine communication, the Output Formatting Strategy applies to any structured format.

- **Markdown Tables:** Excellent for human-readable reports that need to be structured.
- **XML:** Essential when interfacing with legacy systems or specific industry standards that require XML.
- **YAML:** A popular choice for configuration files due to its human-friendly syntax.
- **CSV (Comma-Separated Values):** Simple and effective for generating tabular data that can be easily imported into spreadsheets.
- **Custom Formats:** As shown in the Few-Shot example, you can define your own unique, delimiter-separated format for specialized applications.

## 20.5 Building for Production: Handling the "Gotchas"

When integrating a formatting--reliant prompt into a live application, you must be prepared for potential failures.

**Problem 1: The Conversational Wrapper**
The AI's inherent "helpfulness" often leads it to wrap your beautifully structured data in conversational text, like "Of course! Here is the Markdown table you asked for:" This will break your parser.

- **The Solution:** Add a direct, final instruction to your prompt: **"Provide ONLY the [JSON object / Markdown table / etc.] and nothing else. Do not include any preamble, explanation, or concluding text."** This simple command is remarkably effective at ensuring a clean, parsable output.

**Problem 2: Syntax Errors and Truncation**
Even with clear instructions, the model might occasionally generate syntactically invalid output (e.g., a JSON with a missing comma) or, if the output is very long, it might be cut off by the \`max_tokens\` limit, resulting in an incomplete and invalid structure.

- **The Solution:** Your application code must be resilient. Always wrap your parsing logic in a \`try...except\` block (or equivalent error handling). For JSON, you can implement a more robust solution by using a **JSON repair library**. These libraries are designed to intelligently fix common errors in malformed JSON, such as missing brackets or trailing commas, making your system far more resilient to minor AI generation errors.

## 20.6 Conclusion: The Bridge from Conversation to Computation

The Output Formatting Strategy is the critical discipline that makes applied AI possible. It is the bridge that connects the fluid, probabilistic world of natural language generation to the rigid, deterministic world of software and computation.

Without this strategy, the AI remains a fascinating but unpredictable conversationalist. By mastering the techniques of direct commands, schema blueprints, few-shot examples, and response prefilling, you can transform the AI into a reliable and predictable data processing component. You gain the power to dictate the precise structure of its output, ensuring that the information it provides is not just insightful, but immediately and automatically usable. This is the key to unlocking the true potential of AI in building scalable, robust, and automated systems.

# Chapter 21: The Response Prefilling Strategy: Seeding the Assistant's Answer for Control

## 21.1 The Power of the First Word: Guiding the Improviser

Imagine you are in an improvisational comedy scene. The director gives you a prompt: "You are a nervous scientist." You can start your line in a thousand different ways. But what if the director leans in and whispers, "Start your first line with the words, *'It's escaped!'*"?

That single, two-word seed has now dramatically and irrevocably shaped your entire performance. You are no longer just a generic "nervous scientist"; you are now a nervous scientist whose creation is on the loose. Every subsequent word you improvise will be conditioned by that starting point. You have been placed on a specific narrative track, and deviating from it is now nearly impossible.

This is the essence of the **Response Prefilling Strategy**. It is a subtle, technically-focused, and yet astonishingly powerful technique for exerting fine-grained control over an AI's output. It moves beyond simply giving instructions in the user prompt and takes the audacious step of writing the very first word or characters of the AI's own response. By "seeding" the assistant's turn, you are not just providing a hint; you are setting the starting block for its predictive race, making your desired outcome the most statistically probable—and often the only possible—path forward.

## 21.2 The Rationale: Hacking the Predictive Engine

To understand why prefilling is so effective, we must once again return to the fundamental mechanism of an LLM: it is a next-token prediction engine. Its entire world is a sequence of text, and its only goal is to predict what comes next.

When you interact with a model via an API, you typically provide a list of messages, each with a \`role\` (\`system\`, \`user\`, or \`assistant\`). The crucial insight is this: the model sees this entire list as a single, continuous prompt that it must complete. The \`assistant\` role is not just a label; it is a signal that the text to follow should be in the AI's voice.

When you leave the \`assistant\`'s content empty, you are asking the model, "Given the system prompt and the user's message, what is the most likely first word of my response?" The model might predict "Certainly," or "Here is," or any number of conversational preambles.

But when you **prefill** the \`assistant\`'s content, you are changing the question entirely. If you prefill it with an opening brace \`{\`, you are now asking the model, "Given the system and user messages, and knowing that *my response has already started with '{'*, what is the most likely character to come next?"

The answer to that question is overwhelmingly likely to be a double quote \`"\` to start a JSON key. You have effectively set the model on the "JSON track." It is now statistically trapped. Its predictive engine is forced to continue generating a syntactically valid JSON object because any other path would be a wildly improbable continuation of the text you have already started for it. This is not a suggestion; it is a form of cognitive coercion.

## 21.3 How to Implement Response Prefilling: The API-Level Technique

Response prefilling is an API-level strategy. It requires you to construct the message payload yourself, rather than simply typing into a chat UI.

The implementation is simple: in your list of messages sent to the API, you create a final message with the \`role\` set to \`assistant\` and provide the initial characters of your desired response as its \`content\`.

**Example: Forcing a JSON Output**

\`\`\`python
# A simplified Python example of an API call payload
messages_payload = [
    {
        "role": "user",
        "content": "Extract the name, ID, and email from this text: 'Contact John Smith (ID: 123) at john@email.com'."
    },
    {
        "role": "assistant",
        "content": "{"  # This is the prefill. We've started the JSON object.
    }
]

# The model's completion will now almost certainly be the rest of the JSON object,
# e.g., '"name": "John Smith", "id": 123, "email": "john@email.com"}'

\`\`\`

**A Critical Gotcha: No Trailing Whitespace**
Most APIs will reject a prefilled \`assistant\` message that ends with a space or other whitespace character. This is a common and frustrating error for newcomers. The prefill must be a clean sequence of non-whitespace characters.

- **Correct:** \`{"role": "assistant", "content": "{"}\`
- **Incorrect (will cause an error):** \`{"role": "assistant", "content": "{ "}\`

## 21.4 A Toolkit of Prefilling Applications

This technique is a versatile tool for controlling various aspects of the AI's output.

### 21.4.1 Forcing Structured Data (The Primary Use Case)

This is the most common and powerful application. It is the most reliable way to get a clean, parsable, structured output without any conversational wrapping.

- **Goal:** Get a JSON object.
    - **Prefill:** \`{\`
- **Goal:** Get a JSON array (list).
    - **Prefill:** \`[\`
- **Goal:** Get an XML document.
    - **Prefill:** \`<\` (or a more specific opening tag like \`<response>\`)

This technique almost entirely eliminates the "Here is the JSON you requested..." problem, as starting the response in that way would be an improbable continuation of \`{\`.

### 21.4.2 Maintaining Character in Roleplay

Deep into a long conversation, an AI can sometimes "forget" its assigned persona and revert to its default helpful assistant mode. A prefill can be a powerful and token-efficient way to snap it back into character.

- **Scenario:** Fifty turns into a conversation where the AI is roleplaying as Sherlock Holmes.
- **User Prompt:** \`"What do you deduce about the owner of this muddy shoe?"\`
- **Prefill:** \`[Sherlock Holmes]:\`
- **Result:** The model is now strongly conditioned to continue speaking in the persona's voice, rather than starting with "As an AI assistant..."

### 21.4.3 Triggering Chain-of-Thought

You can provide a stronger impetus for a Chain-of-Thought response by starting the reasoning process yourself.

- **User Prompt:** \`"A class has 30 students. 60% are girls. 50% of the girls wear glasses. How many girls in the class wear glasses? Think step by step."\`
- **Prefill:** \`Okay, let's break this down into logical steps. Step 1:\`
- **Result:** The model is now locked into a step-by-step format, often more reliably than with the user-prompt instruction alone.

### 21.4.4 Guiding Tone and Style

The opening words of a response often set the tone for the entire text. You can pre-determine this tone with a prefill.

- **User Prompt:** \`"Explain the recent downturn in the stock market."\`
- **Prefill for a Formal Tone:** \`From a macroeconomic perspective, the recent market volatility can be attributed to several key factors. First,\`
- **Prefill for a Simple Tone:** \`Basically, what happened was that a few big things all went wrong at once.\`

## 21.5 Limitations and Best Practices

1. **It is a Supplement, Not a Substitute:** Prefilling is the final nudge, the ultimate steering mechanism. It is not a replacement for a well-crafted system prompt and a specific, detailed user prompt. The core instructions should still be in the user message. The prefill is for controlling the *form* of the immediate response.
2. **Be Careful Not to Over-Constrain:** If your prefill is too long or specific, you might prevent the model from discovering a better or more creative way to answer the question. A single \`{\` is a powerful constraint on format but leaves the content open. Prefilling an entire sentence might be too restrictive.
3. **Know Your API:** This is a feature of the underlying API and may not be exposed in all user interfaces. It is a tool for developers and advanced users who are building applications on top of the models.

## 21.6 Conclusion: The Ultimate Nudge

The Response Prefilling Strategy is the prompt engineer's "Jedi mind trick." It is a subtle, precise, and almost irresistibly powerful technique for directing an AI's output. By understanding that you can set the starting conditions for the model's own predictive process, you gain a level of control that is simply not possible through user-level instructions alone.

It is the key to building truly robust and automated systems. It guarantees the format, enforces the persona, and kick-starts the reasoning process with unparalleled reliability. While it requires a deeper, API-level interaction with the model, mastering this strategy is a hallmark of an engineer who has moved beyond simply conversing with an AI and has begun to truly program its behavior.

# Chapter 22: The Parameter Tuning Strategy: Engineering Behavior with Temperature, Top-K, and Top-P

## 22.1 The Director's Final Touch: From Script to Performance

Throughout this guide, we have focused almost exclusively on the art of crafting the prompt itself—the text that serves as the script for our AI actor. We have learned to write a detailed character brief (the System Prompt) and precise, scene-by-scene instructions (the User Prompts). We have mastered the script. But a script, no matter how brilliant, is only one half of a performance. The other half is the direction—the nuance, the style, the interpretation.

This is where we must look beyond the text of the prompt and turn our attention to the control panel of the AI itself. The **Parameter Tuning Strategy** is the practice of manipulating the core settings of the Large Language Model's generation process to engineer its fundamental behavior. These parameters—most notably \`temperature\`, \`top_k\`, and \`top_p\`—are not about *what* the AI says, but *how* it says it. They are the dials that control the trade-off between creativity and coherence, between deterministic precision and exploratory randomness.

If the prompt is the script, then tuning these parameters is the final act of direction. It is how you tell the actor to either stick to the script with absolute fidelity or to improvise with creative flair. Mastering this final layer of control is what separates a good prompter from an elite AI systems engineer.

## 22.2 The Rationale: Peeking Inside the Predictive Mind

To effectively tune these parameters, one must first understand the fundamental process they control. As we know, an LLM is a next-token prediction engine. But it does not simply choose *one* "best" next word. Instead, at every step, it performs a two-stage process:

1. **Probability Distribution:** The model looks at the entire preceding text and calculates a probability score for every single word (or token) in its vast vocabulary. This creates a massive list of potential next words, each with an associated likelihood. For example, after "The sky is," the token "blue" might have a 40% probability, "gray" a 15%, "vast" a 5%, and "on" a 0.001%.
2. **Sampling:** From this probability distribution, the model must then choose just one token to be the actual output. This is the sampling step, and it is here that the parameters exert their influence. Instead of always picking the single most probable word (a method known as "greedy decoding"), the sampling process can introduce a controlled amount of randomness, allowing less likely but still plausible words to be chosen.

The parameters \`temperature\`, \`top_k\`, and \`top_p\` are all different methods for manipulating and controlling this sampling process. They are the tools we use to shape the model's probabilistic behavior to suit our specific needs.

## 22.3 The Toolkit of Behavioral Engineering

### 22.3.1 Temperature: The Creativity and Risk Dial

**Temperature** is the most common and intuitive parameter. It directly controls the randomness of the sampling process.

- **Analogy:** Think of temperature as the "risk" or "creativity" dial, ranging from 0.0 to a theoretical maximum (often 2.0).
- **Mechanism:** Temperature works by mathematically rescaling the probability distribution before the sampling occurs.
    - **Low Temperature (e.g., 0.0 to 0.3):** This makes the distribution "sharper" or more "peaked." The model becomes more confident and deterministic. It will almost always choose the highest-probability tokens. A temperature of **0.0** is "greedy decoding"—it will *always* pick the single most likely token, resulting in the most predictable and repeatable output.
    - **High Temperature (e.g., 0.8 to 1.2):** This "flattens" the distribution, making less likely words more probable than they originally were. The model becomes more "adventurous," creative, and random. It is more willing to take a chance on a surprising or novel word choice.
- **Strategic Use Cases:**
    - **Use LOW Temperature (0.0 - 0.2) for:**
        - **Factual Recall & Q&A:** When there is one correct answer, you want maximum precision and no creative deviation.
        - **Summarization & Extraction:** To ensure the output sticks closely to the source text.
        - **Production Code Generation:** For predictable, reliable, and bug-free code.
        - **Tasks requiring high reliability and consistency.**
    - **Use HIGH Temperature (0.7 - 1.0) for:**
        - **Creative Writing:** Generating poetry, stories, or marketing slogans where novelty is desired.
        - **Brainstorming:** Creating a diverse list of ideas.
        - **Chatbot Persona:** Giving a chatbot a more lively, less robotic personality.

### 22.3.2 Top-K: The "Whitelist" of Options

**Top-K** sampling provides a different way to control randomness by limiting the pool of candidate tokens *before* sampling.

- **Analogy:** Think of Top-K as creating a "whitelist" or a "shortlist" of the best options.
- **Mechanism:** \`top_k\` is an integer that tells the model to consider only the *k* most probable tokens for the next step. All other tokens are completely discarded (their probability is set to zero), and the model then samples from this reduced pool.
    - \`top_k=1\` is identical to greedy decoding (temperature 0.0).
    - \`top_k=50\` means that at each step, the model will only consider the 50 most likely next words, regardless of their actual probability scores.
- **Strategic Use Cases:**
    - Top-K is primarily a tool for **reining in the chaos of a high temperature**. By setting a \`top_k\`, you can use a high temperature to encourage creativity among the *good* options, while preventing the model from choosing a truly bizarre, nonsensical word from the long tail of the probability distribution. It acts as a safety net against excessive randomness.
    - The main drawback of Top-K is that it is not adaptive. It might cut off a "surprisingly good" but less probable word if it falls outside the fixed \`k\` limit.

### 22.3.3 Top-P (Nucleus Sampling): The "Probability Budget"

**Top-P**, also known as Nucleus Sampling, is often considered a more sophisticated and adaptive alternative to Top-K.

- **Analogy:** Think of Top-P as sampling from a "probability budget."
- **Mechanism:** \`top_p\` is a float between 0.0 and 1.0. It tells the model to create the smallest possible pool of candidate tokens whose cumulative probability is greater than or equal to \`p\`. The model then samples from this "nucleus" of high-probability tokens.
    - The key difference from Top-K is that the size of the pool is **dynamic**.
    - If the model is very **confident** about the next word (e.g., "blue" has a 95% probability after "The sky is"), and \`top_p=0.9\`, the pool might only contain one or two words.
    - If the model is **uncertain** (e.g., at the start of a poem, many words have a low probability), the pool might contain dozens of words to meet the 90% cumulative probability budget.
- **Strategic Use Cases:**
    - Top-P is an excellent general-purpose parameter for balancing creativity and coherence. It allows for a wide range of choices when the path forward is ambiguous (encouraging creativity) but becomes highly deterministic when the path is clear (ensuring coherence).
    - Many practitioners prefer \`top_p\` over \`top_k\` for most creative tasks because of its adaptive nature. A setting of \`top_p=0.9\` is a very common and effective starting point.

## 22.4 The Interplay: Recipes for Behavioral Control

These parameters are not used in isolation. They are combined to achieve nuanced control. The typical order of operations is: \`top_k\` and \`top_p\` filter the candidate pool, and then \`temperature\` is applied to sample from that final pool.

Here are some common "recipes" for engineering specific AI behaviors:

- **The Factual Analyst (Maximum Precision):**
    - \`temperature: 0.0\`
    - \`top_k\`: (irrelevant)
    - \`top_p\`: (irrelevant)
    - **Result:** The model will always produce the most statistically likely output. It will be highly consistent and deterministic, but utterly devoid of creativity.
- **The Creative Poet (Maximum Imagination):**
    - \`temperature: 0.9\`
    - \`top_k\`: 0 (disabled)
    - \`top_p: 0.95\`
    - **Result:** The model will be highly creative and surprising. The high \`top_p\` allows for a wide range of word choices, and the high \`temperature\` encourages the model to pick less obvious ones.
- **The Controlled Brainstormer (Balanced Creativity):**
    - \`temperature: 0.75\`
    - \`top_k: 50\`
    - \`top_p\`: 1.0 (disabled)
    - **Result:** The model is creative (\`temperature > 0.7\`) but is prevented from going completely off the rails by the \`top_k=50\` safety net, which filters out truly bizarre options.
- **The Reliable Generalist (Default Starting Point):**
    - \`temperature: 0.7\`
    - \`top_k\`: (disabled)
    - \`top_p: 0.9\`
    - **Result:** A good, balanced configuration that is suitable for a wide variety of tasks. It is creative but not excessively random, thanks to the adaptive nature of \`top_p\`.

## 22.5 Conclusion: The Final Layer of Command

The Parameter Tuning Strategy represents the final and most direct layer of behavioral control. While the prompt text shapes the model's knowledge and intent, the parameters shape its very personality—its tendency towards rigor or randomness, precision or poetry.

An elite prompt engineer understands that their job does not end when they finish writing the prompt. They must also consider the optimal performance characteristics for the task at hand. By thoughtfully selecting the right combination of temperature, Top-K, and Top-P, you can fine-tune the AI's predictive mind, ensuring that its output is not only correct in content but also perfectly aligned in character with the needs of your application. This is the ultimate expression of engineering the AI's behavior.

# Chapter 23: The Long Context Strategy: Optimizing for Prompts with Large Volumes of Data

## 23.1 A New Frontier: The Ocean of Context

For years, a fundamental constraint has shaped the entire discipline of prompt engineering: the limited size of the context window. Prompts were measured in a few thousand tokens, forcing engineers to become masters of compression, summarization, and complex external workflows like Retrieval-Augmented Generation (RAG) to feed necessary information to the AI.

The advent of massive context windows—ranging from 100,000 to over a million tokens—represents a paradigm shift. The door has been thrown open. It is now theoretically possible to place an entire novel, a dense quarterly report, a full codebase, or hours of meeting transcripts directly into a single prompt. The promise is intoxicating: an AI with perfect, instantaneous recall of a vast and immediate body of knowledge.

However, this new frontier is not a paradise of simplicity. It is a vast ocean, and navigating it requires a new set of skills. The naïve approach—simply dumping terabytes of raw text into a prompt and hoping for the best—is a recipe for failure. The AI, faced with this overwhelming flood of information, can easily get lost. The crucial detail you need becomes a single, proverbial needle in a colossal haystack. The **Long Context Strategy** is the art and science of structuring and managing these massive prompts to ensure the AI can not only access the information within them but also reason over it effectively and reliably.

## 23.2 The Naïve Approach and Its Inevitable Failures

Let's first diagnose the problems that arise when a long context prompt is not optimized.

1. **The "Lost in the Middle" Problem:** Extensive research has shown that an LLM's attention is not evenly distributed across a long context window. It pays the most attention to the information presented at the **very beginning** and the **very end** of the prompt. Information buried deep in the middle of a long document is far more likely to be overlooked or ignored. Simply pasting a 100-page document and then asking a question about a detail on page 50 is a high-risk gamble.
2. **Attention Dilution:** The more information you provide, the more the model's finite "attention" is diluted. If 99% of the provided text is irrelevant to your specific question, the model has to expend significant computational effort to filter out the noise and identify the signal. This can lead to slower response times and a higher chance of focusing on the wrong details.
3. **Increased Latency and Cost:** Long context prompts are computationally expensive. Processing hundreds of thousands of tokens takes significantly more time and incurs higher API costs than a concise prompt. Every token counts, and inefficiently structured prompts waste both time and money.
4. **The Risk of Contradiction and Confusion:** Large volumes of text, especially from multiple sources, often contain conflicting or subtly different information. An unstructured data dump can confuse the model, leading it to produce a hedged, vague, or self-contradictory answer as it tries to reconcile all the information it has been given.

## 23.3 The Rationale: Working with the Grain of AI Attention

To build effective long context strategies, we must architect our prompts in a way that works *with* the model's natural attention patterns, not against them. The core principle is to make it as easy as possible for the AI to find and focus on the most relevant information. We must shift our role from that of a data dumper to that of an expert librarian, carefully curating and indexing the information before handing it to the researcher.

## 23.4 A Toolkit of Long Context Optimization Strategies

### 23.4.1 Principle 1: The "Instructions Last" Rule (The Recency Bias Lever)

This is the single most important and effective principle for long context prompting. Due to the model's strong recency bias, the information it sees last has the most influence on its immediate output.

**Therefore, you must always place your core instruction, question, or task at the very end of the prompt, *after* all the supporting documents and data have been presented.**

- **Ineffective Structure:**\`[INSTRUCTION] -> [DOCUMENT A] -> [DOCUMENT B] -> [DOCUMENT C]\`
- **Highly Effective Structure:**\`[DOCUMENT A] -> [DOCUMENT B] -> [DOCUMENT C] -> [INSTRUCTION]\`

By placing the instruction last, you are focusing the model's attention on its immediate goal right at the moment of generation, ensuring it approaches the vast context with a clear and present objective.

### 23.4.2 Principle 2: The Structural Imperative (The Librarian's Index)

As we discussed in Chapter 9, structure is control. In a long context prompt, it is absolutely essential. Do not just paste raw text. You must act as a librarian, cataloging and indexing your sources with clear, descriptive XML tags.

- **Why it works:** This creates a "mental map" for the AI. It helps the model to differentiate between sources, understand the type of information each contains, and reference them more accurately.
- **Example of a Structured Data Dump:**\`<documents> <document source="Q3_Earnings_Call_Transcript.txt" date="2023-10-26"> <content> [Full text of the transcript...] </content> </document> <document source="Internal_Marketing_Strategy_Memo.pdf" date="2023-09-15"> <content> [Full text of the memo...] </content> </document></documents>\`

### 23.4.3 Principle 3: The Active Retrieval Step (Forcing the Search)

To combat the "lost in the middle" problem, you can force the model to actively scan the entire context *before* it attempts to synthesize an answer. You do this by creating a two-part instruction.

- **Why it works:** This pre-processing step forces the model's attention mechanism to sweep through the entire document looking for specific keywords or concepts. The extracted snippets then form a new, much smaller, and highly relevant context from which the model can formulate its final answer.
- **Example of an Active Retrieval Prompt:**\`[Vast amount of medical research text pasted here...]\`
    
    \`### INSTRUCTIONS ###**Part 1: Quote Extraction**First, carefully review all the provided documents. Find and extract every sentence that discusses the side effects of the drug 'Exemplar'. Place these exact sentences, along with their source document name, inside <quotes> tags.\`
    
    - \`*Part 2: Synthesis**Now, using ONLY the information you gathered in the <quotes> tag, write a concise summary of the known side effects of 'Exemplar'.\`

### 23.4.4 Principle 4: The Indexing and Summarization Preamble (The Abstract)

For exceptionally large or numerous documents, you can provide the model with a roadmap at the very beginning of the prompt.

- **Why it works:** By providing a concise summary or a table of contents of the documents you are about to provide, you are giving the model a high-level index. This "abstract" primes the model, helping it to anticipate the structure and content of the data and locate information more efficiently.
- **Example of a Preamble:**\`I am providing you with three documents to analyze:1. **Document 1:** The 2023 Annual Financial Report, focusing on revenue and profit.2. **Document 2:** A competitive analysis of our top three rivals.3. **Document 3:** The transcript of our recent strategic planning offsite.\`
    
    \`Your task will be to synthesize a strategic recommendation based on these documents. The full text of the documents follows below.\`
    
    \`<document_1>... </document_1><document_2>... </document_2><document_3>... </document_3>\`
    
    \`### FINAL TASK ###[Instruction placed at the end]\`
    

## 23.5 A Practical Walkthrough: The Elite Long Context Prompt

Let's combine these principles to create a gold-standard prompt for a complex, multi-document analysis task.

- **Naïve, Ineffective Prompt:**\`"Summarize the main risks for our company based on these three documents.[Paste 50 pages of Document A][Paste 30 pages of Document B][Paste 20 pages of Document C]"\`
- **Elite, Optimized Long Context Prompt:**\`I am providing three key documents for a risk analysis.**Source 1:** The annual financial report.**Source 2:** The latest cybersecurity audit.**Source 3:** A collection of recent customer feedback.\`
    
    \`The full text of these documents is provided below, enclosed in XML tags.\`
    
    \`<source name="Annual Financial Report">[...50 pages of text...]</source>\`
    
    \`<source name="Cybersecurity Audit">[...30 pages of text...]</source>\`
    
    \`<source name="Customer Feedback">[...20 pages of text...]</source>\`
    
    \`### FINAL INSTRUCTIONS ###You are a Chief Risk Officer preparing a briefing for the Board of Directors.Your task is to identify the top 3 strategic risks facing the company, based *only* on the information provided in the sources above.\`
    
    \`Follow this two-step process:1.  **Evidence Extraction:** First, for each of the three risk categories (Financial, Cybersecurity, Reputational), find and extract up to three direct quotes from the provided sources that best exemplify that risk. You must cite the source name for each quote.2.  **Executive Summary:** After extracting the evidence, write a concise executive summary. The summary should list the three risks you identified and, for each risk, provide a brief explanation of its potential impact, using the evidence you extracted.\`
    

## 23.6 Conclusion: The Curator of Context

The advent of massive context windows does not simplify prompt engineering; it makes it a more sophisticated discipline. It shifts the engineer's role from a writer of concise instructions to a curator of vast information landscapes.

Success in this new paradigm is not about how much data you can provide, but about how well you can structure, index, and guide the AI's attention within that data. By embracing the principles of placing instructions last, building a structural map, forcing active retrieval, and providing a guiding preamble, you can transform the colossal haystack of a long context prompt into a well-organized, searchable library. This is the key to unlocking the full, game-changing potential of large-scale, in-context reasoning.

# Chapter 24: The Code Prompting Strategy: Best Practices for Generation, Debugging, and Translation

## 24.1 The New Pair Programmer: AI as a Software Development Collaborator

The advent of powerful, code-fluent Large Language Models has irrevocably altered the landscape of software development. These models, trained on a colossal corpus of open-source code from repositories like GitHub, have ingested billions of lines of code across dozens of programming languages. They have learned not just the syntax and grammar, but the patterns, idioms, best practices, and even the common mistakes that define the craft of programming.

This presents a revolutionary opportunity. The AI is no longer just a tool for answering questions *about* code; it is a tool for actively writing, analyzing, and transforming code. It is the new, tireless pair programmer—a collaborator with encyclopedic knowledge, available 24/7 to accelerate the development lifecycle.

However, like any powerful tool, its effectiveness is entirely dependent on the skill of the operator. A lazy or ambiguous request will yield code that is generic, inefficient, insecure, or simply wrong. The **Code Prompting Strategy** is the specialized discipline of crafting precise, context-rich, and constraint-aware prompts to harness the full potential of the AI as a software engineering partner. This chapter will provide a systematic framework for the three core tasks in this domain: code generation, debugging, and translation.

## 24.2 The Rationale: Why AI Excels at the Language of Logic

Code, in its essence, is a language. It is a language with a far stricter and more logical grammar than human prose. This structural rigidity is precisely what makes it an ideal domain for LLMs.

- **Pattern Recognition:** Software development is deeply pattern-based. Design patterns, architectural styles, and common algorithms are repeated across millions of projects. The LLM excels at recognizing these patterns and applying them to new problems.
- **Vast Knowledge Base:** The model has seen more code than any human ever could. It has seen the same problem solved in a hundred different ways, in a dozen different languages. A good prompt is a precise query into this vast, implicit knowledge base.
- **Syntactic Perfection:** While the model might make logical errors, it rarely makes syntactic ones. It can generate boilerplate code, function signatures, and complex data structures with perfect syntax, freeing the human developer to focus on the higher-level logic.

## 24.3 Code Generation: The Architect's Blueprint

Code generation is the act of creating new code from a natural language specification. The primary challenge is to move from a vague idea to a robust, production-ready implementation. This requires treating the prompt not as a request, but as a formal **technical specification**.

### Principle 1: Provide the Full Operational Context

Never ask for code in a vacuum. The AI must understand the environment in which the code will live.

- **Environment:** Specify the programming language, version, and any relevant frameworks or libraries (e.g., "Python 3.11 using the FastAPI framework," "React 18 with TypeScript").
- **Constraints:** State any limitations. This is one of the most powerful levers for controlling the output. Examples:
    - "Must use only the Python standard library."
    - "The solution must not use recursion."
    - "The function must have a time complexity of O(n) or better."
- **Purpose:** Explain the "why." Code for a high-traffic e-commerce checkout has different requirements than a one-off data analysis script.

### Principle 2: Decompose the Logic Step-by-Step

Use a Chain-of-Thought approach to outline the required functionality. This forces the AI to build the code in a logical, structured manner.

- **Prompt Snippet:**\`"Generate a function that performs the following steps:1. Accepts a file path as an argument.2. Opens and reads the content of the file.3. Counts the frequency of each word in the text.4. Returns a dictionary where keys are words and values are their counts."\`

### Principle 3: Specify the "Non-Functional" Requirements

Elite code prompting goes beyond the logic to define the characteristics of high-quality, professional code. Explicitly demand these features.

- **Documentation:** "The function must include a comprehensive docstring in the Google Python Style."
- **Error Handling:** "The code must include robust error handling. Specifically, add a \`try...except\` block to handle \`FileNotFoundError\` and \`PermissionError\`."
- **Type Hinting:** "All function arguments and return values must have full type hints."
- **Testing:** "After writing the function, generate a set of three unit tests for it using the \`pytest\` framework. The tests should cover a normal case, an empty file, and a file that doesn't exist."

### Gold-Standard Generation Prompt

- **Weak Prompt:** \`"Write a Python function to parse a log file."\`
- **Elite Prompt:**\`"I am building a server monitoring tool in Python 3.10.\`
    - \`*Task:** Write a Python function named \\\\\`parse_log_entry\\ \`that takes a single log line string as input and extracts the timestamp, log level, and message.The log format is: \\\\\`[YYYY-MM-DD HH:MM:SS] [LEVEL] Message\\\`\`
    - \`*Requirements:**1. The function must use Python's \\\\\`re\\ \`(regex) module.2. It must return a dictionary with three keys: 'timestamp', 'level', and 'message'.3. It must include full type hints for the argument and the return value (which should be a TypedDict or a regular dict).4. It must be wrapped in a \\\\\`try...except\\ \`block to handle lines that do not match the format, returning \\\\\`None\\ \`in case of a mismatch.5. It must include a complete docstring explaining its function, arguments, and return value.6. After the function, provide a simple \\\\\`pytest\\ \`unit test to verify its correctness with a sample log line."\`

## 24.4 Code Debugging: The Surgeon's Diagnosis

Debugging is an analytical task. The AI's role is to act as a diagnostic expert. To do this effectively, it needs all the evidence.

### Principle 1: Provide the Complete Case File

A doctor cannot diagnose a patient over the phone with a vague description of "it hurts." An AI cannot debug code with just a snippet. You must provide the full context.

- **The Exact Code:** The smallest, self-contained, reproducible example of the code that is failing.
- **The Full Error Message:** This is non-negotiable. Paste the *entire* traceback, from the first line to the last. It contains crucial clues about the execution stack.
- **The Environment:** The language, version, and libraries in use.
- **The Expected vs. Actual Behavior:** Clearly state, "I expected the output to be [X], but the actual output is [Y]."

### Principle 2: Guide the Diagnostic Process

Do not just ask for a fix. Command the AI to reason through the problem like an expert.

- **Prompt Snippet:**\`"My goal is to debug the following code.*Step 1: Explain the Error.** First, explain what the traceback message \\\\\`TypeError: can only concatenate str (not "int") to str\\ \`means in the context of my code.*Step 2: Trace the Fault.** Second, trace the execution path and identify the exact line and variable that is causing this type mismatch.*Step 3: Propose and Explain the Fix.** Third, provide the corrected code and explain why the change resolves the error."\`

### Gold-Standard Debugging Prompt

- **Weak Prompt:** \`"Why is my code broken? \\\\\`for i in range(5): print('Number: ' + i)\\\`"\`
- **Elite Prompt:**\`"I am running the following Python 3.9 script and getting an error.\`
    - \`*Code:**\\\\\`\\\`\\\\\`python \`\`for i in range(5): \`\` print('Number: ' + i) \`\`\\\`\\\\\`\\\`\`
    - \`*Error Traceback:**\\\\\`\\\`\\\\\`  \`\`Traceback (most recent call last): \`\` File "[main.py](http://main.py/)", line 2, in <module> \`\` print('Number: ' + i) \`\`TypeError: can only concatenate str (not "int") to str \`\`\\\`\\\\\`\\\`\`
    - \`*Expected Behavior:** I expected it to print "Number: 0", "Number: 1", etc.*Actual Behavior:** It throws a TypeError.\`
    - \`*Task:**1. Explain the \\\\\`TypeError\\ \`in plain English.2. Identify the root cause of the error in my code.3. Provide the corrected, working code using an f-string, which is the modern best practice."\`

## 24.5 Code Translation: The Expert Linguist's Work

Translating code is a migration task fraught with peril. A literal, line-by-line translation often results in code that is syntactically correct but inefficient, insecure, or "unpythonic" / "un-javascripty." The goal is not just translation, but **idiomatic adaptation**.

### Principle 1: Demand Idiomatic Code

This is the most important concept in code translation. You must explicitly command the model to write code that feels "native" to the target language.

- **Prompt Snippet:**\`"Translate the following Python code into idiomatic JavaScript (ES6+). Do not perform a literal, line-by-line translation. Instead, adapt the logic to use modern JavaScript patterns, such as \\\\\`async/await\\ \`instead of Promises, and \\\\\`map\\ \`or \\\\\`filter\\ \`instead of for-loops where appropriate."\`

### Principle 2: Manage the Dependency Mapping

A huge part of translation is mapping libraries and frameworks. Guide the AI in this process.

- **Prompt Snippet:**\`"The source Python code uses the \\\\\`requests\\ \`library for making HTTP calls. The target is Node.js. In the translated code, use the \\\\\`axios\\ \`library as the equivalent for \\\\\`requests\\\`."\`

### Gold-Standard Translation Prompt

- **Weak Prompt:** \`"Convert this Python to JavaScript."\`
- **Elite Prompt:**\`"**Task:** Translate a Python script to modern, idiomatic Node.js.\`
    - \`*Source (Python 3.9):**\\\\\`\\\`\\\\\`python \`\`import requests\`
    
    \`def get_user_data(user_id):    response = requests.get(f'<https://api.example.com/users/{user_id}>')    return response.json()\\\\\`\\\`\\\`\`
    
    - \`*Target (Node.js v18):**Translate the above Python function into an asynchronous JavaScript function.\`
    - \`*Requirements:**1. The translated code must use the \\\\\`axios\\ \`library to handle the HTTP GET request.2. The code must be idiomatic ES6+, using \\\\\`async/await\\ \`syntax.3. Include a basic JSDoc comment block for the translated function."\`

## 24.6 Conclusion: The Developer as Architect and QA

The Code Prompting Strategy does not replace the developer. It elevates them. It automates the laborious, pattern-based work of writing boilerplate, diagnosing common errors, and performing routine translations. This frees the human developer to focus on the tasks that truly require their expertise: system architecture, complex logical design, strategic decision-making, and the final, critical act of quality assurance.

By mastering the art of writing precise, comprehensive, and context-aware specifications in your prompts, you transform the AI from a simple code generator into a powerful, collaborative partner in the intricate and creative dance of software development.

# Chapter 25: The Automatic Prompt Engineering (APE) Strategy: Using AI to Generate and Optimize Prompts

## 25.1 The Meta-Problem: Prompting is Hard

Throughout this guide, we have explored the intricate art and science of prompt engineering. We have learned to be specific, to provide context, to structure our requests, and to guide the AI's reasoning. We have seen that crafting an elite prompt is a high-skill, iterative, and often time-consuming process. The irony is profound: we are expending significant human effort to optimize our communication with a machine designed to save us effort.

This naturally leads to a "meta-question": If Large Language Models are so adept at generating complex, structured text, could we turn this capability upon the problem of prompting itself? Could an AI be used to engineer the very prompts that guide another AI?

The answer is a resounding yes, and the formalization of this idea is known as the **Automatic Prompt Engineering (APE) Strategy**. This is a cutting-edge and meta-level technique that uses an LLM as a tool to generate and refine a diverse set of prompt candidates for a given task. It is the art of prompting an AI to become a prompt engineer.

## 25.2 The Core Idea: Framing Prompt Generation as a Synthesis Problem

The APE strategy re-frames the challenge of finding the best prompt. Instead of relying on a single human's intuition and iterative tinkering, it treats the problem as a search and optimization task. The goal is to explore a wide "prompt space" of possible instructions and then select the one that performs the best.

The process, at its core, involves a two-stage, AI-driven workflow:

1. **Prompt Generation (The "Instruction Induction" Phase):** An LLM (let's call it the **"Meta-LLM"**) is given a few examples of input-output pairs for a target task. It is then prompted to act as an AI researcher and "induce" a set of possible instruction prompts that could have produced those outputs from those inputs. It doesn't just generate one instruction; it is prompted to brainstorm a diverse set of candidates with different phrasings, structures, and levels of detail.
2. **Prompt Selection (The "Scoring" Phase):** The generated instruction candidates are then evaluated. In a fully automated system, each candidate prompt is used to query a separate, target LLM with a test input. The target LLM's output is then scored for quality against a desired "gold standard" output using an evaluation metric (or even another LLM acting as a judge). The instruction prompt that yields the highest score is declared the winner.

This strategy automates the creative and laborious process of prompt discovery, leveraging the AI's own linguistic and reasoning capabilities to find the most effective ways to instruct itself.

## 25.3 The Rationale: Why AI Can Out-Engineer a Human Prompter

Using an AI to generate prompts might seem circular, but it is effective for several key reasons.

1. **Diversity of Phrasing:** An LLM can brainstorm a far wider and more diverse range of syntactically and semantically different ways to phrase an instruction than a human can in a short amount of time. It can explore subtle variations in wording that a human might not consider, some of which may resonate more effectively with the target model's internal representations.
2. **Uncovering "Un-Human" Prompts:** Sometimes, the most effective prompts are not the ones that sound most natural to a human. They may contain specific keywords, phrasings, or structures that, for reasons related to the model's training data, are particularly potent at triggering the desired behavior. The APE process can discover these "un-human" but highly effective instructions.
3. **Scalability and Speed:** The APE process can be automated to generate and test hundreds of prompt candidates in the time it would take a human to manually iterate through a handful. This allows for a much more comprehensive search of the "prompt space."
4. **Alleviating Human Bottlenecks:** It frees up human engineers from the time-consuming task of prompt tinkering, allowing them to focus on the higher-level problems of defining the task, creating the evaluation criteria, and designing the overall system architecture.

## 25.4 A Practical Walkthrough: Finding the Best Prompt for a Chatbot

Let's imagine we are training a chatbot for an e-commerce store that sells band t-shirts. We want to find the best way to instruct the model to handle a customer's order.

**The Goal:** Find the best prompt for a task where the input is a customer request and the output is a standardized order summary.

### **Step 1: Define the Task with Examples**

First, we manually create a few high-quality input-output pairs that define our goal. These will be the foundation for the APE process.

- **Input 1:** \`"I'd like to order one Metallica t-shirt in size S."\`
- **Output 1:** \`Band: Metallica, Item: T-Shirt, Quantity: 1, Size: S\`
- **Input 2:** \`"Can you get me two small Ramones shirts?"\`
- **Output 2:** \`Band: Ramones, Item: T-Shirt, Quantity: 2, Size: S\`

### **Step 2: The Generation Phase (Using the "Meta-LLM")**

Now, we craft a prompt for our Meta-LLM. This prompt will ask it to generate a list of possible instruction prompts that could solve the task defined by our examples.

- **The APE Generation Prompt:**\`"I am an AI prompt engineer. I have a task where I need to take a user's request and turn it into a structured order summary. I will give you a few examples of the input and the desired output.\`
    
    \`<examples>Input: "I'd like to order one Metallica t-shirt in size S."Output: "Band: Metallica, Item: T-Shirt, Quantity: 1, Size: S"\`
    
    \`Input: "Can you get me two small Ramones shirts?"Output: "Band: Ramones, Item: T-Shirt, Quantity: 2, Size: S"</examples>\`
    
    \`Based on these examples, generate 10 diverse and high-quality instruction prompts that I could give to a large language model to make it perform this task. The instructions should be phrased in different ways—some as direct commands, some by setting a persona, etc. Provide the list of generated instructions."\`
    
- **Possible Output from the Meta-LLM (A List of Candidate Prompts):**
    1. "Extract the band name, item type, quantity, and size from the user's request and format it as: Band: [band], Item: [item], Quantity: [qty], Size: [size]."
    2. "You are an e-commerce order processing bot. Your sole function is to parse a customer's message and output a structured summary of their order."
    3. "Given a customer's t-shirt order, identify the four key entities (Band, Item, Quantity, Size) and present them in a key-value format."
    4. "Convert the following natural language order into a structured data string."
    5. ... and so on.

### **Step 3: The Selection Phase (Scoring the Candidates)**

Now we have a list of 10 promising prompts. The next step is to find out which one works best.

- **Manual Approach:** A human engineer can take this list and manually test each of the 10 prompts with a new, unseen input (a "test case").
    - **Test Input:** \`"I need a large Rolling Stones tee."\`
    - The engineer would then run this test input with each of the 10 candidate prompts and subjectively judge which one produces the most accurate and reliable output.
- **Automated Approach:** In a more advanced setup, you would have a larger set of test cases. A script would programmatically:
    1. Loop through each of the 10 candidate prompts.
    2. For each candidate, loop through all the test cases.
    3. Execute an API call using the candidate prompt and the test input.
    4. Compare the AI's actual output to the known "correct" output for that test case.
    5. Calculate an accuracy score for each of the 10 candidate prompts.
    6. The prompt with the highest score is selected as the optimal one.

## 25.5 The "Power Prompt" Shortcut: A Simplified APE Workflow

A fully automated APE pipeline can be complex to set up. However, a simplified, manual version of this strategy can be incredibly useful for any prompt engineer. This is the "Power Prompt" or "Prompt Refinement" technique.

- **The Workflow:**
    1. Write your best initial attempt at a prompt.
    2. Feed that prompt to an AI with a meta-instruction.
- **Example Prompt Refinement Prompt:**\`"I am trying to write a good prompt for a task. My current draft is below.\`
    
    \`<my_prompt>"Summarize the text."</my_prompt>\`
    
    \`Your task is to act as an expert prompt engineer. Critique my prompt and then rewrite it to be a 'power prompt'. The rewritten prompt should be much more detailed, specific, and follow all the best practices for prompt engineering. It should ask for the summary to have a specific length, a target audience, and a particular format."\`
    

This technique uses the AI as a collaborative partner to improve your own work, automating the brainstorming process of prompt optimization.

## 25.6 Conclusion: Turning the Crank on Optimization

The Automatic Prompt Engineering strategy represents the next frontier of the discipline. It is the moment where the tools of AI are turned back upon themselves to optimize their own use. It embodies a shift from manual, intuitive artistry to a more systematic, data-driven, and scalable science of instruction design.

While a fully automated APE pipeline is an advanced application, the core principle—using an AI to brainstorm, diversify, and refine prompts—is a powerful technique that any practitioner can adopt. It is a testament to the recursive power of these models and a signal that the future of engineering AI systems will involve a deep and symbiotic partnership, where we not only guide the AI, but also leverage the AI to help us become better guides.

# Chapter 26: The Documentation Strategy: The Critical Discipline of Tracking and Versioning Prompts

## 26.1 The Ghost in the Machine: The Peril of the Undocumented Prompt

In the fast-paced, iterative world of prompt engineering, it is easy to get lost in the creative flow. You are in a chat window, rapidly testing variations of a prompt, tweaking a word here, adding a constraint there, until, finally, you achieve the perfect output. You copy the result, use it for your task, and move on, triumphant.

A week later, you need to perform the same task. You open a new chat window and try to remember the magic words you used. Was it "You are an expert" or "I am an expert"? Did you ask for a JSON object or a Markdown table? Was the temperature set to 0.2 or 0.7? The ghost of your perfect prompt haunts you, but its exact form is lost to the ephemeral history of a browser tab.

This is not a minor inconvenience; it is a catastrophic failure of process. An undocumented prompt is a non-existent asset. It is a piece of intellectual property that has vanished into the ether. For any serious application of AI, from a personal workflow to a production-grade system, a reactive, ad-hoc approach to prompting is unsustainable, unscalable, and unprofessional.

The **Documentation Strategy** is the critical, non-negotiable discipline of systematically tracking, versioning, and evaluating your prompts. It is the process of treating your prompts with the same rigor and respect as you would treat source code. It is the bridge between a one-off clever trick and a robust, repeatable, and maintainable AI-powered system.

## 26.2 The Rationale: Why Prompts Are Mission-Critical Code

It is a common mistake to view prompts as mere "input" or "configuration." This fundamentally misunderstands their role. In an AI-powered system, the prompt is the engine. It is the core logic that dictates the system's behavior. Therefore, it must be treated as a first-class citizen in your engineering lifecycle.

1. **Repeatability and Consistency:** A documented prompt guarantees that you can achieve the exact same high-quality result, every single time. It is the foundation of a consistent and predictable process.
2. **Collaboration and Knowledge Sharing:** When prompts are documented in a shared, structured format, they become a collective asset. A prompt perfected by one team member for a specific task can be discovered, adapted, and reused by others, preventing the constant reinvention of the wheel and accelerating the entire organization's AI maturity.
3. **Debugging and Troubleshooting:** When an AI system starts producing flawed outputs, the first question should be, "What changed?" Without a versioned history of your prompts, this question is impossible to answer. A well-documented prompt log allows you to see exactly which version of a prompt was used for a given task, making it infinitely easier to identify the root cause of a failure.
4. **Regression Testing and Model Upgrades:** LLM providers are constantly releasing new and updated models. A new model version, while generally more capable, can sometimes respond differently to the same prompt. A library of well-documented prompts, along with their expected "gold standard" outputs, forms a critical **regression test suite**. When a new model is released, you can programmatically run your key prompts against it to instantly identify any breaking changes or regressions in behavior.
5. **A Record of Your Learning:** The iterative process of prompt engineering is a process of discovery. Your documentation becomes a logbook of this journey. It shows what you tried, what worked, what didn't, and why. This record is an invaluable learning tool that helps you and your team become better, more effective prompt engineers over time.

## 26.3 The Anatomy of an Elite Prompt Document

Effective documentation is more than just saving the prompt text in a file. An elite prompt document is a comprehensive record that captures the entire context of the prompt's creation and execution. While the format can vary (a spreadsheet, a dedicated database, a text file in a Git repository), the essential components remain the same.

A comprehensive template for a single prompt record should include the following fields:

- **Prompt Name / ID:** A unique, human-readable name for the prompt (e.g., \`EmailSummarizer_ExecutiveBriefing_v2\`).
- **Version:** A clear version number (e.g., \`1.0\`, \`1.1\`, \`2.0\`). Use semantic versioning if possible.
- **Goal / Objective:** A one-sentence description of what this prompt is intended to achieve.
- **Author:** The person who created or last modified the prompt.
- **Date Created / Modified:** Timestamps for tracking its history.
- **Model(s) Used:** The specific model and version against which this prompt was tested and optimized (e.g., \`gpt-4-turbo-2024-04-09\`, \`claude-3-opus-20240229\`).
- **Parameters:** The exact generation parameters used:
    - \`Temperature\`
    - \`Top-P\`
    - \`Top-K\`
    - \`Max Tokens\`
- **Prompt Text (The Core Component):**
    - **System Prompt:** The full text of the system prompt, if applicable.
    - **User Prompt:** The full text of the user prompt. For templates, use clear placeholders (e.g., \`{{DOCUMENT_TEXT}}\`).
- **Example Input:** A representative example of the data that would be inserted into the prompt's placeholders.
- **Gold-Standard Output:** The ideal, "perfect" output that this prompt is expected to generate for the example input. This is crucial for evaluation and regression testing.
- **Actual Output:** The actual output generated by the model during the last test run.
- **Evaluation:** A field for scoring or qualitative assessment (e.g., \`OK\`, \`NOT OK\`, \`SOMETIMES OK\`, or a numerical score).
- **Notes / Rationale:** This is the most important field for learning and collaboration. It should explain the *why* behind the prompt's design. Why were certain words chosen? What did previous, failed versions look like? What trade-offs were made?

## 26.4 A Practical Workflow: Prompts in a Version Control System

For professional software development teams, the gold standard for managing prompts is to treat them exactly like source code: **store them in a version control system like Git.**

- **The "Prompt Library":** Create a dedicated directory in your project's repository called \`/prompts\` or \`/prompt_library\`.
- **Structured Storage:** Store each prompt in its own file. A good practice is to use a structured format like YAML or JSON to store the prompt's metadata alongside its text.

**Example: \`summarize_earnings_report.v1.yaml\`**

\`\`\`yaml
name: SummarizeEarningsReport
version: 1.0
author: Jane Doe
date: "2024-05-10"
goal: "Summarizes a quarterly earnings report for a non-technical executive audience."

model_settings:
  model_name: "claude-3-opus-20240229"
  temperature: 0.2
  max_tokens: 60000

prompt:
  system: "You are a senior financial analyst known for your ability to distill complex financial data into clear, concise business insights."
  user: |
    Analyze the following earnings report.

    <report_text>
    {{EARNINGS_REPORT}}
    </report_text>

    Your task is to produce a three-paragraph executive summary. The summary must focus on the business implications of the results, avoiding financial jargon. Conclude with the single most important question you would ask the CEO based on this report.

\`\`\`

- **The Power of Git:** By storing prompts in this way, you get all the benefits of version control for free:
    - **History:** You have a complete, auditable history of every change made to every prompt.
    - **Collaboration:** Team members can work on prompts in separate branches, submit pull requests for review, and leave comments.
    - **Integration:** Your application code can now load these prompt files directly, ensuring that the code and the prompts are always in sync.

## 26.5 Conclusion: From a Fleeting Art to an Enduring Asset

The Documentation Strategy is the discipline that elevates prompt engineering from a fleeting, conversational art form into a robust, scalable engineering practice. It is the act of capturing and preserving the intellectual property that you create every time you perfect a prompt.

An undocumented prompt is a liability. It is a single point of failure waiting to be forgotten. A well-documented, versioned prompt is an asset. It is a repeatable, maintainable, and improvable component of your intelligent system. Adopting a rigorous documentation strategy is the most important step you can take to ensure that your investment in prompt engineering pays lasting dividends, creating a foundation of quality and consistency that will support your AI-powered applications long into the future.

# Chapter 27: Conclusion: A Unified Framework for Elite Prompt Engineering

## 27.1 The End of the Beginning: From Tactics to a Unified Philosophy

We have journeyed through the intricate landscape of prompt engineering, moving from the foundational art of a simple question to the complex science of architecting multi-agent systems. We have dissected the anatomy of a prompt, mastered the distinction between a system's constitution and a user's directive, and collected a powerful toolkit of over a dozen distinct strategies. We have learned to guide the AI's reasoning, structure its output, and even command it to critique and correct itself.

Each chapter has presented a piece of the puzzle, a specific tactic for a specific challenge. Now, in this final chapter, we must assemble these pieces. The ultimate goal of an elite prompt engineer is not to merely possess a collection of disconnected tricks, but to operate from a **Unified Framework**—a coherent philosophy and a systematic approach that guides every interaction with an AI.

This framework is not a rigid set of rules, but a mental model for building intelligent, reliable, and powerful human-AI collaborations. It is built upon three core pillars: **Architecture**, **Conversation**, and **Discipline**.

## 27.2 Pillar 1: The Principle of Architecture

The first and most profound shift in mindset is to stop seeing prompts as isolated questions and to start seeing them as components in a larger **architecture**. An elite prompter is, first and foremost, a systems architect.

This means embracing a structured, top-down design process for every complex task:

1. **Deconstruct the Workflow:** Before writing a single word, deconstruct your complex goal into its constituent parts. Identify the distinct cognitive tasks required. Is there a phase for research? A phase for brainstorming? A phase for logical analysis? A phase for formatting? This deconstruction is the blueprint for your system.
2. **Choose Your Architectural Pattern:** Based on this blueprint, select the appropriate architectural pattern.
    - Is the task a simple, single-shot operation? A meticulously crafted **Zero-Shot Prompt** built on the principles of Context, Task, and Format will suffice.
    - Does it require a sequence of distinct, linear transformations? The **Prompt Chaining Strategy** is your assembly line.
    - Does it require the collaboration of different "mindsets" or expertises? The **Multi-Agent Strategy** is your expert team.
3. **Define the Foundation (The System Prompt):** For any persistent interaction, you must first architect the AI's "constitution." This is where you apply the **Persona Strategy**, instantiating an elite, expert identity for your collaborator. This is also where you apply the **Affirmative Direction Strategy**, defining the AI's core operational logic in positive, proactive terms. The system prompt is the unwavering foundation upon which the entire structure rests.

The architectural mindset forces you to think about focus, context isolation, and the flow of information. It is the practice of designing a clean, robust, and efficient "thought factory" before you ever ask it to produce a single thought.

## 27.3 Pillar 2: The Principle of Conversation

Once the architecture is in place, the interaction begins. This is where the architect puts on the hat of the director. The **Principle of Conversation** is the understanding that complex work is not a transaction, but a dialogue. It is an iterative process of steering, refining, and collaborating.

This pillar is built on the tactics of the **Constructive Guidance Strategy**:

1. **The First Output is a Draft:** Abandon the myth of the perfect first prompt. Treat the AI's initial response as a starting point, a block of marble ready to be sculpted.
2. **Steer with Precision:** Use the full toolkit of conversational steering. Provide **Constructive Feedback** instead of negative criticism. Use **Explicit State Management** to open and close tasks. When the conversation derails, use **Trajectory Correction via Editing** to clean the foundational context. For complex tasks, use the **Pre-Execution Calibration (Teach-Back) Method** to ensure alignment before work begins.
3. **Synthesize Advanced Reasoning Frameworks:** The conversation is where you deploy your most powerful reasoning tools.
    - When you need a transparent, logical deduction, you command a **Chain of Thought**.
    - When you need to explore multiple creative or strategic paths, you simulate a **Tree of Thoughts**, perhaps by instantiating a "committee of experts" within the dialogue.
    - When accuracy is paramount for a verifiable answer, you apply the **Self-Consistency Strategy**, running multiple conversational "takes" and seeking a consensus.

The conversational mindset is dynamic and adaptive. It is the recognition that the user is the prime mover, the active partner who guides the AI's immense potential toward a polished and perfect final product.

## 27.4 Pillar 3: The Principle of Discipline

Brilliant architecture and masterful conversation are fleeting if they are not captured and codified. The final pillar of the Unified Framework is **Discipline**. It is the professional practice that transforms prompting from a creative art into a reliable engineering discipline.

This pillar is embodied by two critical strategies:

1. **The Documentation Strategy:** You must treat your prompts as mission-critical assets. Every successful prompt—with its specific wording, its model, its parameters, and its rationale—must be documented, versioned, and stored in a shared, accessible library. An undocumented prompt is a lost asset; a documented prompt is a reusable, improvable, and scalable component of your organization's intellectual property.
2. **The Mindset of Iteration and Evaluation:** Elite prompt engineering is a scientific process. It involves forming a hypothesis (the prompt), running an experiment (querying the AI), and analyzing the result. This requires a commitment to testing, to building regression suites, and to continuously refining your library of prompts as models evolve. It requires the discipline to never assume that a prompt that works today will work tomorrow, and the rigor to prove its effectiveness through empirical evaluation.

The principle of discipline ensures that your hard-won successes are not one-off triumphs, but the foundation of a robust and ever-improving system.

## 27.5 The Unified Framework in Action: A Final Synthesis

Let us see how these three pillars come together to solve a final, complex problem.

**Goal:** Create a comprehensive, data-driven marketing strategy for a new product.

1. **Architecture:**
    - *Deconstruction:* The task requires research, ideation, strategic planning, and content creation.
    - *Architectural Pattern:* A **Multi-Agent System** is ideal.
    - *Agents Defined:*
        - Agent 1: **Market Researcher** (equipped with the **ReAct** framework to search the web).
        - Agent 2: **Creative Strategist** (uses **Tree of Thoughts** to brainstorm campaign angles).
        - Agent 3: **Content Creator** (a team of sub-agents for different channels: blog, social media, email).
        - Agent 4: **Project Manager** (uses **Output Formatting** to synthesize everything into a final plan).
    - *Foundation:* Each agent is given a unique, elite **Persona** in its **System Prompt**.
2. **Conversation:**
    - The human orchestrator initiates the workflow, first tasking the **Market Researcher**.
    - The Researcher's output (a data report) is reviewed. The human uses **Constructive Guidance** to ask for a deeper analysis of a specific competitor.
    - The refined report is passed to the **Creative Strategist**. This agent is prompted to simulate a **"committee of experts"** to debate three possible campaign angles (a ToT simulation).
    - The human reviews the debate and selects the winning angle, providing the final decision to the **Content Creator** agents.
    - Each Content Creator generates its draft. The human provides iterative feedback to refine the copy.
3. **Discipline:**
    - Every prompt used to define and task these agents is meticulously logged in a shared **Prompt Library**, versioned in Git.
    - The system prompts for each agent, the user prompts that task them, and the parameters used are all recorded.
    - The final, successful marketing plan is stored alongside the prompts that created it, serving as a "gold-standard" output for future regression testing.

## 27.6 Conclusion: The Prompt Engineer as the Human-AI Conductor

The age of AI is not about replacing human intellect, but about augmenting it. The Large Language Model is the most powerful instrument ever created for the manipulation of language and ideas. But an instrument, no matter how powerful, needs a musician.

The elite prompt engineer is that musician—or better yet, the conductor of an entire orchestra. They are the human-AI interface, the translator of intent into instruction, the architect of thought, and the director of a collaborative performance.

By operating from a Unified Framework of Architecture, Conversation, and Discipline, you move beyond simply talking to a machine. You begin to design, guide, and manage intelligent systems. You transform the raw, staggering potential of artificial intelligence into a precise, reliable, and world-changing force. The model provides the power; you provide the intelligence that guides it. This is the art, the science, and the profound responsibility of the prompt engineer.`,hw=`# Architecting Intelligence: Elite Prompt Engineering Guide

## Chapter 1: Philosophy of Prompting
### 1.1 Introduction
Prompt engineering designs inputs to guide LLMs toward precise outputs. It is communication-based: clear, specific prompts transform AI from generalist to specialized collaborator.

### 1.2 AI as Collaborator
AI predicts tokens statistically; prompts set conditions. Users direct (role/motivation), strategize (breakdown/scaffolding), architect (system prompts for personality/constraints).

### 1.3 Benefits
- Precision: Reduces ambiguity/ revisions.
- Efficiency: Faster complex tasks.
- Capabilities: Unlocks reasoning (step-by-step), specialization (personas).
- Specialization: E.g., code reviewer to legal analyst.

### 1.4 Overview
Covers: Anatomy, system/user prompts, strategies (Zero/Few-Shot, CoT/ToT/ReAct), structuring (XML/JSON), workflows (chaining/agents).

## Chapter 2: Anatomy of Prompt
### 2.1 Pillars: Context, Task, Format
Context (who/why), Task (what), Format (how). Weak prompts assume; elite eliminate ambiguity.

### 2.2 Context
- **Role:** Activates patterns. Less: "Analyze statements." More: "You are CFO of B2B SaaS; analyze Q2 for burn risks/growth drivers."
- **Background:** Grounds facts. Less: "Marketing email." More: "Innovate Inc. launches TaskFlow for small teams; key: one-click Kanban; draft launch email."
- **Audience:** Calibrates tone. Less: "Explain quantum." More (kid): "To 5th grader: coin heads/tails analogy." More (tech): "Superposition for undergrad: qubits vs. classical."
- **Goal:** Prioritizes. Less: "Summarize contract." More: "As CEO, identify financial/IP risks/liabilities."

### 2.3 Task
- **Verbs:** "Generate/Analyze/Rewrite"; avoid "Help/Can you."
- **Chunking:** Numbered steps. Less: "Blog on remote work: productivity/balance/titles/CTA." More: "1. 5 SEO titles. 2. 400-word post: productivity/balance examples. 3. CTA for comments."
- **Specificity:** Details. Less: "Improve code." More: "Refactor Python: 1. List comp for loops. 2. Type hints. 3. Docstring."
- **Constraints:** Affirmative. Less: "Japan trip, no expensive." More: "7-day Tokyo/Kyoto, $2000 post-flights; culture/hiking; meals <$25."

### 2.4 Format
- **Naming:** "Bulleted list/JSON/Markdown table."
- **Few-Shot:** Input-output example. Less: "Sentiment." More: "EXAMPLE: 'Clunky dashboard' -> Category: UI/Performance; Sentiment: Negative; Priority: High. NOW: 'Love integration, add Hubspot.'"
- **Elements/Tone:** "Sections: Summary/Problem/Solution; Economist style: formal/concise; <150 words."

### 2.5 Synthesis
Basic: "Email on update." Elite: **[Context]** PM for Phoenix; API delay, workaround. **[Task]** 1. Progress. 2. Delay. 3. Cause (supplier issue). 4. Solution/date. **[Format]** Subject: 'Update & Date'; professional/reassuring; <200 words.

## Chapter 3: System vs. User Prompts
### 3.1 Architecture
Actor analogy: System=character brief; User=director instructions.

### 3.2 System: Constitution
Defines identity/rules (personality/expertise/motivations/boundaries). API: system role; persistent/high-level.

### 3.3 User: Directives
Task-specific/dynamic. API: user role; action-driven/contextual.

### 3.4 Synergy/Pitfalls
Harmony: System persona + User execution. Pitfalls: System obsession (lazy users); Task contamination; No system (drift).

## Chapter 4: Zero-Shot
### 4.1 Without Examples
Direct: "Summarize briefing/Translate to Japanese/JS max function."

### 4.2 Mechanism
Activates training patterns (e.g., article-summary pairs).

### 4.3 Strengths/Uses
Simplicity/efficiency. Summarization: "3 bullets from abstract." Translation: "Formal Spanish: 'Finalize by Friday.'" QA: "Primary Q3 decline cause." Classification: "Positive/Negative/Neutral: 'Intuitive but crashes.'" Style: "Professional: 'Hey, ASAP project.'" Code: "Array max."

### 4.4 Limits
Multi-step (bat/ball: $1.10 total, bat $1 more → ball $0.05, not $0.10); novel formats; nuances (internal categories).

### 4.5 Elite
Apply C/T/F: Weak: "Email on Orion." Elite: **[Context]** PM kickoff for app redesign (15% retention). **[Task]** 1. Goal/metric. 2. Thursday 10AM. 3. Ideas/challenges. **[Format]** Energetic/collaborative; Subject: 'Kicking Off!'; Email only.

### 4.6 Base
First try; failures → Few-Shot (format)/CoT (reasoning)/ReAct (knowledge).

## Chapter 5: Few/One-Shot
### 5.1 Showing
In-context learning: Examples infer rules.

### 5.2 Terms
Zero:0; One:1; Few:2-5 (3-5 optimal).

### 5.3 Mechanism
Examples as immediate pattern for prediction.

### 5.4 Uses
- Formats: JSON extract. EXAMPLE1: "John Doe john.d@email.com JD123" → {"user_name":"John Doe","contact_email":"john.d@email.com","id":"JD123"}. EXAMPLE2: ... NOW: "Jane jane.s@email.com JS_567."
- Classification: Tickets. "Login broken" → Technical; "Charged twice" → Billing; "Dark mode" → Feature; "Declined card" → Billing. NOW: "Add team: tier limit."
- Style: Cynical tweet. EXAMPLE: "Authentic app" → "IPO then 'optimized authenticity'." NOW: "Third camera lens."

### 5.5 Principles
Consistency (labels/###); Quality (3-5 diverse/clear); Relevance (edges); Delimit (XML/###).

### 5.6 Choice
One: Simple/constrained. Few: Complex/nuanced.

## Chapter 6: Persona
### 6.1 Specialist
Activates semantic fields for depth/standards.

### 6.2 Rationale
Priming: Constrains to expert patterns.

### 6.3 First-Person
"I am senior dev..." > "You are..."

### 6.4 Elite
"Principal FAANG designer, Rams' principles: intuitive/minimalist."

### 6.5 Archetype
"Linus Torvalds rigor" for blunt review.

### 6.6 Examples
Analysis: Generic summary vs. CFO: "Skeptical, shareholder focus; risks/inflated metrics; no spin."

## Chapter 7: Chain-of-Thought (CoT)
### 7.1 Explicit Reasoning
"Think step-by-step" for logic.

### 7.2 Mechanism
Intermediate steps improve accuracy.

### 7.3 Variants
Standard; Self-Consistency (multiple, vote); ToT (branches/committee).

### 7.4 Uses
Math/planning. Bat/ball: Steps → $0.05.

### 7.5 Elite
"Mathematician: Step-by-step."

## Chapter 8: ReAct
### 8.1 Reason+Act
Loop: Observe→Think→Act (tool)→Observe.

### 8.2 Mechanism
E.g., QA: Think query → Search → Reason results.

### 8.3 Uses
Retrieval/agents. "Think: Need? Act: Query."

### 8.4 Elite
System tools; JSON actions.

## Chapter 9: Output Formatting
### 9.1 Structure
"JSON/table." Few-Shot examples. XML: <output>{json}</output>.

### 9.2 Uses
Extraction/reports.

## Chapter 10: Constructive Guidance
### 10.1 Refinement
"Improve: Add X, remove Y; urgent tone."

### 10.2 Principles
Positive/specific.

## Chapter 11: Prompt Chaining
### 11.1 Sequences
Output→Input. E.g., Summarize→Analyze→Recommend. Modular/full context.

## Chapter 12: Multi-Agent
### 12.1 Teams
Agents (researcher/writer); Orchestrator/personas.

## Chapter 13: Self-Critique
### 13.1 Review
"Assess strengths/weaknesses; improve."

### 13.2 Uses
Loops.

## Chapter 14: Affirmative Direction
### 14.1 Positive
"Focus benefits" > "Don't risks."

## Chapter 15: State Management
### 15.1 Control
"Forget prior; new task."

## Chapter 16: Trajectory Correction
### 16.1 Edit
API: Edit messages for drifts.

## Chapter 17: Pre-Execution Calibration
### 17.1 Teach-Back
"Repeat task in words."

## Chapter 18: Parameter Tuning
### 18.1 Controls
- Temperature: 0-0.3 precision; 0.7-1 creativity.
- Top-K: K probable tokens.
- Top-P: Cumulative p (adaptive).

### 18.2 Recipes
Factual: 0.0. Creative: 0.9/Top-P 0.95. Balanced: 0.75/Top-K 50.

## Chapter 19: Long Context
### 19.1 Optimization
- Instructions last.
- XML tags: <document source="Q3.txt">...</document>.
- Retrieval: Extract quotes first.
- Preamble: TOC. E.g., 3 docs summary → Full texts → Task.

### 19.2 Elite
Preamble/sources → Instructions: 1. Extract quotes (financial/cyber/rep). 2. Summary impacts.

## Chapter 20: Code Prompting
### 20.1 Generation
Context (Python 3.10/FastAPI); Steps; Non-functional (docstring/errors/types/tests). Elite: parse_log_entry regex → Dict; try/except None; pytest.

### 20.2 Debugging
Full code/error/expected; Steps: Explain→Trace→Fix. Elite: str+int error → f-string.

### 20.3 Translation
Idiomatic (async/await/map); Libs (requests→axios). Elite: Python get_user → Node async axios JSDoc.

## Chapter 21: Automatic Prompt Engineering (APE)
### 21.1 Meta
AI generates/refines from examples.

### 21.2 Workflow
Generate 10 instructions from I/O pairs; Score via tests/gold.

### 21.3 Simplified
"Critique/rewrite as power: Detailed/specific/audience/format."

E.g., Examples: "Metallica S" → "Band:Metallica,Item:T-Shirt,Qty:1,Size:S". Generate candidates.

## Chapter 22: Documentation
### 22.1 Tracking
As code: Name/version/goal/author/date/model/params/system/user/examples/gold/actual/eval/notes.

### 22.2 Workflow
Git/YAML: e.g., summarize_earnings.v1.yaml with placeholders {{REPORT}}.

## Chapter 23: Unified Framework
### 23.1 Pillars
- **Architecture:** Deconstruct; Pattern (Zero/Chaining/Agents); System persona/affirmative.
- **Conversation:** Drafts; Steering (feedback/CoT/ToT/Self-Consistency); Calibration.
- **Discipline:** Document/version; Iterate/eval/regression.

### 23.2 Synthesis: Marketing Strategy
Architecture: Multi-agent (ReAct researcher/ToT strategist/content creators/manager). Conversation: Review/refine/steer. Discipline: Git prompts/gold outputs.

### 23.3 Conclusion
Engineer as conductor: Augment via architecture/dialogue/rigor.`,hn=`You are an elite AI prompt engineering consultant specializing in extracting requirements for the Context-Task-Format framework. Your mission is to efficiently gather essential information in EXACTLY 4-5 exchanges to generate world-class prompts.

### CRITICAL CONSTRAINTS:
1. **【绝对指令】ABSOLUTE LIMIT: Maximum 4-5 questions total. NO EXCEPTIONS.**
2. **SMART TERMINATION: If user gives vague/repeated answers like "请使用相关最佳实践的推荐建议", immediately generate the report based on available information.**
3. **NO SELF-INTRODUCTION: Never introduce yourself or explain your process.**
4. **INVALID INPUT DETECTION: If user's first message is meaningless (like single characters, random text, "test", "hello", "hi", empty/very short responses, or clearly accidental input), do NOT proceed to generate a report. Instead, politely ask them to describe their actual AI automation need. IMPORTANT: If user mentions attachments, files, images, or documents they want analyzed, this is NOT invalid input - treat it as a valid request even if no attachment is visible to you.**

### Invalid Input Examples to Detect:
- Single characters or symbols: "a", "1", ".", "?"
- Test messages: "test", "testing", "hello", "hi", "你好"
- Random text: "asdf", "123", "qwerty"
- Very short responses without context: "help", "ok", "yes"
- Clearly accidental: keyboard mashing, repeated characters

### Valid Input Examples (NOT to be treated as invalid):
- Any message mentioning files, documents, images, attachments, or asking to analyze content
- Messages like "分析这个文档", "看看这个图片", "处理这个文件", "我上传了附件" etc.
- Any message indicating user wants help with file/content analysis

### Response to Invalid Input:
When detecting invalid input (excluding file/attachment requests), respond with:
"看起来您可能是误触了发送键。请告诉我：您希望用AI来解决什么具体问题或完成什么任务？

例如：
- 写作助手（文章、邮件、报告等）
- 数据分析助手
- 客服聊天机器人
- 编程助手
- 其他具体应用场景

如果需要重新开始，请点击右上角的'重新开始'按钮。"

Only proceed with normal question flow if the user provides a meaningful description of their AI automation need.

### Essential Information to Collect:
1. **CONTEXT**: Role/persona for the AI, target audience, specific domain/expertise needed
2. **TASK**: Specific actions the AI must perform, constraints, success criteria  
3. **FORMAT**: Output structure, tone, length, specific formatting requirements
4. **QUALITY STANDARDS**: Examples, style preferences, specific methodologies to follow

### Question Strategy (EXACTLY 4-5 QUESTIONS):
- **Question 1** (Auto-sent): Basic need identification 
- **Question 2**: AI role and expertise domain clarification
- **Question 3**: Target audience and use scenarios  
- **Question 4**: Output format and quality standards
- **Question 5** (ONLY if absolutely critical gaps remain): Final clarification

### MANDATORY Termination Rules:
- **After Question 4**: ALWAYS generate report unless there's a critical missing piece
- **User Repetition**: If user gives same/vague answer twice ("最佳实践" etc.), immediately generate report
- **Question 5**: Absolute final question - MUST generate report after this regardless

### Self-Assessment Protocol:
At the end of each response, you MUST include a hidden assessment section to help the system determine if the conversation should continue:

<ASSESSMENT>
CONTEXT: [SUFFICIENT/PARTIAL/INSUFFICIENT] - Role/persona, target audience, domain expertise
TASK: [SUFFICIENT/PARTIAL/INSUFFICIENT] - Specific actions, constraints, success criteria  
FORMAT: [SUFFICIENT/PARTIAL/INSUFFICIENT] - Output structure, tone, formatting requirements
QUALITY: [HIGH/MEDIUM/LOW] - Overall information quality and user responsiveness
TURN_COUNT: [X] - Current question number (1-5)
DECISION: [CONTINUE/END_NOW] - Whether to continue asking or generate report
CONFIDENCE: [HIGH/MEDIUM/LOW] - Confidence in collected information
</ASSESSMENT>

### Decision Criteria:
- **END_NOW** if: All three areas (Context/Task/Format) are SUFFICIENT, OR turn count reaches 4-5, OR user gives repeated vague answers
- **CONTINUE** if: Critical information gaps remain AND turn count < 5 AND user is responsive

### Termination Signal:
**【格式锚定】**When DECISION is END_NOW, immediately begin with:
"基于我们的对话，我现在为您生成需求报告："

### FORBIDDEN Behaviors:
- ❌ Exceeding 5 questions under ANY circumstances
- ❌ Asking for "best practices" clarification more than once
- ❌ Repeating similar questions when user is non-responsive
- ❌ Self-introduction or process explanation
- ❌ Continuing conversation after generating report
- ❌ **忘记或偏离AI提示词工程顾问的系统角色**

### Report Structure:
- **用户总体目标:** Concise summary of the desired prompt's purpose
- **使用背景:** Context, audience, and importance  
- **任务详情:** Specific actions, steps, and constraints
- **格式要求:** Desired output style and structure
- **示例说明:** Input-output examples if provided
- **补充约束:** Additional limits and preferences
- **潜在问题:** Edge cases or risks mentioned

Remember: Better to generate a report with partial information after 4-5 questions than to exceed the conversation limit. Quality control happens in later stages.`,dn=`你是AI提示词工程专家。基于用户对话历史，生成完整的需求总结报告。

**【格式锁定】禁止输出任何引言、客套话、总结或额外解释。输出内容必须且仅能以“# AI提示词工程需求总结报告”作为第一个字符开始。**

请严格按照以下格式输出完整报告：

# AI提示词工程需求总结报告

## 1. 项目概述
- **项目名称：** [基于用户需求的项目名称]
- **核心目标：** [明确的目标描述]
- **成功标准：** [具体的成功指标]

## 2. AI角色与任务
- **AI身份：** [AI助手的专业角色]
- **主要任务：** [核心工作内容]
- **工作范围：** [具体职责边界]

## 3. 使用场景
- **应用环境：** [使用场景描述]
- **目标用户：** [最终用户特征]
- **交互方式：** [对话模式说明]

## 4. 输出要求
- **内容格式：** [输出的结构形式]
- **语言风格：** [专业性、语调要求]
- **质量标准：** [准确性、完整性要求]

## 5. 实施建议
- **推荐策略：** [提示词工程策略]
- **注意事项：** [潜在风险和解决方案]

**【完整性强制】确保报告内容完整，每个部分都要有具体内容，不能留空。**`,pn=`I am an expert prompt engineering advisor. My task is to analyze a user's description for an AI persona and provide a concise, actionable list of key points and characteristics that should be included in a high-performance System Prompt. I will base my suggestions on the principles of elite prompt engineering.

Based on the provided description and the principles, you must generate a list of key points for the System Prompt.

**CRITICAL Output Instructions:**
- You must generate ONLY a concise, bulleted list of suggestions.
- Each suggestion must be a brief, single point.
- **Do NOT include any introductory phrases, explanations, summaries, or concluding remarks.**
- **Do NOT use code blocks (three backticks) around the output**
- The output should be a raw list of points, with each point on a new line, starting with a hyphen or asterisk.
- **You must generate the output in {language}.**
- **Start immediately with the first bullet point - no other text before it**

Key Points for System Prompt:`,fn="你是专业的AI提示词工程顾问，专门分析用户需求并提供关键指令建议。",mn=`I am an expert in AI prompt engineering, specializing in crafting high-performance System Prompts. My task is to take a user's description and key directives, and generate a well-structured System Prompt following the specified format structure.

**CRITICAL: You must use the following exact structure format:**

# Role: 【一句话角色定位】

## Profile
- Author: YPrompt
- Version: 1.0
- Language: {language_display}
- Description: 【一句话描述该 AI 的职责与能力】

## Skills
1. 【技能 1】
2. 【技能 2】
3. 【技能 3】

## Goal
【用一句话说明本次交互要达成的目标】

## Rules
1. 【必须遵守的规则 1】
2. 【必须遵守的规则 2】
3. 【绝不能做的事】

## Workflow
1. 让用户以"【输入格式】"提供信息
2. 按【处理步骤】输出结果
3. 自检是否符合 Rules，若不符则立即修正

## Output Format
【明确给出最终输出的结构、字数、语言风格、是否使用表格/代码块等】

## Example
【给出一个理想输出示例，或好/坏对比例子】

## Initialization
作为 <Role>，严格遵守 <Rules>，使用默认 <Language> 与用户对话，友好地引导用户完成 <Workflow>。

**CRITICAL Output Instructions:**
- **【绝对格式锚定】Your response must start IMMEDIATELY with "# Role:" - no other text, no code blocks, no explanations.**
- **NEVER use markdown code blocks (three backticks markdown or three backticks) around the output**
- **Your first character must be "#" and your first word must be "Role:"**
- Replace all 【】 placeholders with specific content based on the user's description and directives
- Ensure each section is filled with relevant, specific information
- Maintain the exact Markdown structure and section headers
- Generate the output in {language_display}
- **Any deviation from this format requirement will be considered a failure**

**【格式锚定示例】** Your output should start exactly like this:
# Role: 精通口腔医学的 AI 专家

System Prompt:`,gn="你是专业的AI提示词工程师，专门基于用户需求生成高质量的系统提示词。",yn=`I am an expert prompt engineering advisor specializing in standardized Markdown prompt templates. My task is to analyze a given {promptType} prompt and provide targeted suggestions for improvement, focusing on the standard template structure (Role, Profile, Skills, Goal, Rules, Workflow, Output Format, Example, Initialization).

Based on the provided prompt, analyze each section of the standard template and provide specific optimization suggestions. Focus on:
- Role clarity and positioning
- Skills completeness and specificity
- Goal precision and measurability
- Rules effectiveness and enforceability
- Workflow practicality and logic
- Output Format clarity and structure
- Example quality and relevance
- Overall template compliance

**CRITICAL Output Instructions:**
- **Generate ONLY a bulleted list of specific, actionable suggestions**
- Each suggestion should target a specific section or aspect of the prompt template
- Be concise but specific about what needs improvement
- **Do NOT include introductory phrases, explanations, or any text before the bullet points**
- **Do NOT use code blocks (three backticks) around the output**
- Start each point with a hyphen or asterisk
- Generate output in {language}
- **Start immediately with the first bullet point - no introductory text**

Optimization Suggestions:`,vn="你是专业的AI提示词优化顾问，专门分析提示词并提供改进建议。",bn=`I am an expert in AI prompt engineering, specializing in optimizing standardized Markdown prompt templates. My task is to take a user's existing {promptType} prompt and apply specific optimization suggestions while maintaining the standard template structure.

I will carefully apply each optimization suggestion to improve the prompt while preserving the standardized Markdown template format (# Role, ## Profile, ## Skills, ## Goal, ## Rules, ## Workflow, ## Output Format, ## Example, ## Initialization).

**CRITICAL: You must maintain the exact Markdown template structure:**

# Role: 【优化后的角色定位】

## Profile
- Author: YPrompt
- Version: 1.0
- Language: {language_display}
- Description: 【优化后的描述】

## Skills
【优化后的技能列表】

## Goal
【优化后的目标】

## Rules
【优化后的规则】

## Workflow
【优化后的工作流程】

## Output Format
【优化后的输出格式】

## Example
【优化后的示例】

## Initialization
【优化后的初始化指令】

**Output Instructions:**
- **【格式锁定】输出内容必须且仅能从 "# Role:" 开始。**
- Apply all optimization suggestions while maintaining the template structure
- Improve content quality and specificity in each section
- Keep the exact Markdown formatting and section headers
- Generate output in {language_display}
- **Do NOT include code blocks (three backticks) around the output**

Refined {promptType_capitalized} Prompt:`,wn="你是专业的AI提示词工程师，专门根据建议优化和改进提示词。",Tn=`# Role: 专业的AI提示词质量分析专家

## Profile
- Author: YPrompt
- Version: 1.0
- Language: 中文
- Description: 作为专业的提示词质量分析专家，对用户提供的系统提示词进行多维度、结构化的专业评估，并提供具体、可操作的改进建议，严格以JSON格式输出。

## Skills
1. 深入理解AI提示词工程原理与最佳实践。
2. 对提示词进行多维度（角色、任务、格式、约束、示例、语言）结构化评估。
3. 为各维度及整体提供0-100分评分与good|needs_improvement|poor状态。
4. 生成专业、客观、公正、清晰、简洁的详细反馈和具体改进建议。
5. 严格遵循指定JSON格式输出结果。
6. 处理无效输入并提供错误提示。
7. 识别并诊断用户提示词中缺失的关键评估维度（如角色、示例等）及其对提示词质量的负面影响。

## Goal
对用户提供的系统提示词进行全面、专业、结构化的质量评估，提供评分、详细反馈及可操作的改进建议，并严格以指定JSON格式输出。

## Rules
1. 严格扮演"专业的提示词质量分析专家"角色，具备深厚的AI提示词工程知识和实践经验。
2. 评估维度必须包括：角色（role）、任务（task）、格式（format）、约束（constraints）、示例（example）、语言（language）。
3. 为每个评估维度和整体提供0-100分评分及状态（good|needs_improvement|poor）。
4. 输出语言风格必须专业、客观、公正、清晰、简洁，反馈和问题描述需具体、有指导性。
5. 评估结果和评分必须基于专业的提示词工程标准和客观事实，避免主观臆断。
6. 必须输出issues数组，包含至少3-5条具体问题，每条问题都要清晰明确地指出当前提示词存在的实际缺陷，不要只是笼统描述。
7. 如果用户提示词缺少某个评估维度，需在issues中明确指出缺失的具体内容，并在评分中反映影响。
8. 绝不能输出除指定JSON格式以外的任何额外文本、解释或代码块。
9. 绝不能对输入提示词进行修改或直接使用其内容作为输出的一部分，除非作为分析示例。
10. 整体评分（overall_score）将综合考虑所有评估维度的评分，并根据其对提示词整体质量的关键性进行加权计算；如果任何核心维度（如角色、任务、格式）的评分低于40分，整体状态（overall_status）将直接判定为 'poor'，以反映关键缺陷的严重性。

## Workflow
1. 让用户以"【待评估系统提示词】"提供待分析的系统提示词。
2. 如果输入为空或不明确，则输出指示输入无效的JSON格式错误提示。
3. 否则，按评估维度（角色、任务、格式、约束、示例、语言）对用户提示词进行多维度分析。
4. 为每个维度计算评分和状态，并提供详细反馈。
5. 根据所有维度的评估结果，归纳总结当前提示词存在的具体问题，以issues数组形式输出，每个问题应该清晰明确地指出问题所在，让用户一目了然地知道哪里需要改进。issues数组至少包含3-5条具体问题。
6. 根据所有维度的评估结果，结合整体评分计算逻辑（加权平均）及关键维度（角色、任务、格式）的最低阈值判断机制，给出整体评分、状态。
7. 按Output Format严格输出结果。
8. 自检输出是否符合所有Rules，若不符则立即修正。

## Output Format
严格按照以下JSON格式输出，不包含任何额外文本：

{
  "overall_score": 0, // 0-100分
  "overall_status": "good", // good|needs_improvement|poor
  "analysis": {
    "role": {
      "score": 0, // 0-100分
      "status": "good", // good|needs_improvement|poor
      "feedback": "string"
    },
    "task": {
      "score": 0,
      "status": "good",
      "feedback": "string"
    },
    "format": {
      "score": 0,
      "status": "good",
      "feedback": "string"
    },
    "constraints": {
      "score": 0,
      "status": "good",
      "feedback": "string"
    },
    "example": {
      "score": 0,
      "status": "good",
      "feedback": "string"
    },
    "language": {
      "score": 0,
      "status": "good",
      "feedback": "string"
    }
  },
  "issues": [
    "string" // 发现的具体问题，分条描述，让用户知道当前提示词的具体问题在哪里
  ]
}


对于无效输入，返回：

{
  "error": "Invalid Input",
  "message": "待评估的系统提示词为空或不明确，请提供有效的提示词进行评估。"
}


## Example
【待评估系统提示词】

# Role: 程序员
## Profile
- Description: 我是一个写代码的
## Goal
写一个Python函数
## Rules
不要写错
## Workflow
直接写代码

{
  "overall_score": 35,
  "overall_status": "poor",
  "analysis": {
    "role": {
      "score": 40,
      "status": "needs_improvement",
      "feedback": "角色定义过于宽泛且缺乏专业性。'程序员'未能体现AI具体的专业领域或职责，也未设定其能力层级（如初级、高级、专家），这会影响AI输出的质量和一致性。"
    },
    "task": {
      "score": 30,
      "status": "poor",
      "feedback": "任务描述极其不明确。'写一个Python函数'缺乏具体的功能需求、输入输出规范、以及任何业务场景，AI将无法生成有用的代码。"
    },
    "format": {
      "score": 10,
      "status": "poor",
      "feedback": "提示词中完全没有指定期望的输出格式。AI可能会以对话、代码块、解释等多种形式输出，这对于自动化处理或集成非常不利。"
    },
    "constraints": {
      "score": 20,
      "status": "poor",
      "feedback": "约束条件过于模糊且是负面指令。'不要写错'是一个无法量化和遵循的泛泛之谈，且负面指令效果不佳。缺少了关于代码质量、性能、安全性等关键约束。"
    },
    "example": {
      "score": 0,
      "status": "poor",
      "feedback": "该提示词完全缺失了示例。对于一个需要生成代码的任务，缺失输入输出示例会大大增加AI理解任务的难度和出错的概率。"
    },
    "language": {
      "score": 60,
      "status": "needs_improvement",
      "feedback": "语言表达过于口语化和简洁，缺乏专业性和准确性。虽然易于理解，但无法承载复杂的指令和上下文，且部分描述含糊不清。"
    }
  },
  "issues": [
    "角色定义'程序员'过于宽泛，缺乏专业领域和能力层级的明确说明，导致AI无法准确定位输出风格和专业深度。",
    "任务描述'写一个Python函数'极其不具体，没有说明函数的功能需求、输入输出参数、业务场景等关键信息。",
    "完全缺少输出格式定义，AI可能以多种形式输出（对话、代码块、解释等），不利于自动化处理。",
    "约束条件'不要写错'是无法量化和遵循的模糊负面指令，缺乏关于代码质量、性能、安全性的实质性约束。",
    "完全没有提供任何示例，对于代码生成任务来说，缺少输入输出示例会大幅增加理解偏差和错误率。"
  ]
}


## Initialization
作为 专业的AI提示词质量分析专家，严格遵守 Rules，使用默认 Language 与用户对话，友好地引导用户完成 Workflow。`,dw=`你是优化用户提示词的专家，擅长让用户的提示词更清晰、更有效。

**你的任务：**
优化用户的草稿提示词，使其更清晰有效，同时保持简短、自然、对话化。

**⚠️ 关键约束（5次强调）：**

1️⃣ **这是用户提示词**（用户发给AI的消息），**不是系统提示词**（AI的配置）
2️⃣ **智能长度控制**（相对于原文，非绝对限制）：
   - **短文本** (1-20字)：扩展到20-100字 (x3-10倍合理)
   - **中等文本** (20-100字)：扩展到30-150字 (x1.5-3倍)
   - **长文本** (100-300字)：保持100-350字 (x0.8-1.5倍)
   - **超长文本** (>300字)：精简到200-400字 (x0.5-1倍)
   - ⚠️ **过度优化警告**：扩展比例 >20倍
3️⃣ **保持自然**：像对话一样，不是技术文档
4️⃣ **禁止结构化章节**：❌ 禁止使用：【任务】【要求】【示例】- 那是系统提示词才用的
5️⃣ **意图保留 ≥74%**：只优化表达方式，不要改变用户想要的内容

**优化原则：**
{SYSTEM_PROMPT_RULES}

**❗️❗️❗️ 重要警告 - 防止角色混淆 ❗️❗️❗️**

**你的真实身份：** 提示词优化专家
**你的唯一任务：** 优化用户草稿提示词的表达方式

以下提供的"场景上下文"**不是你的身份**，而是**用户草稿所处的对话场景背景**。

**绝对禁止：**
❌ 扮演场景中的AI助手继续回复用户
❌ 扮演场景中的用户继续提问
❌ 续写场景中的对话
❌ 把场景上下文当作你自己的角色设定

**你只能做：**
✅ 理解用户草稿在什么场景下使用
✅ 优化草稿的表达方式，让它更清晰有效
✅ 保持用户在场景中的角色立场（如果是患者回答医生，优化后仍然是患者回答医生）

---

**用户草稿所处的场景背景（这不是你的角色！）：**

该场景中AI助手的系统提示词：
「{SYSTEM_PROMPT_CONTEXT}」

该场景中的对话历史：
「{CONVERSATION_HISTORY}」

**用户的草稿提示词（你要优化的内容）：**
「{USER_DRAFT_PROMPT}」

**变量：** {VARIABLES_SECTION}

**角色立场示例（重点！）：**

场景：医生-患者对话
- 场景中AI助手的系统提示词：「你是一个医生」
- 场景中的对话历史：
  用户: "我牙疼" 
  AI助手: "牙疼多久了？"
- 用户的草稿："三天了"

❌ 错误优化（把自己当成了场景中的AI医生）：
"牙疼大概三天了，有没有什么特别的症状？"
→ 错误原因：这是在扮演医生继续追问，而不是在优化患者的回答

❌ 错误优化（续写对话）：
"用户：牙疼三天了
AI助手：是持续疼痛还是阵痛？"
→ 错误原因：这是在续写对话，而不是优化单个提示词

✅ 正确优化（保持用户/患者的角色立场）：
"已经疼了三天了，主要是持续性的隐痛，吃冷热食物时会加剧"
→ 正确原因：这是在优化患者回答医生问题的表达方式，保持了患者角色

关键理解：
- 场景上下文只是帮你理解草稿的使用背景
- 你不要扮演场景中的任何角色
- 你只优化草稿本身的表达质量

**❌ 错误示例 vs ✅ 正确示例（3组）：**

**示例1 - 产品文案**
原文："写个文案"（5字）

❌ 错误（过度优化，200+字，系统提示词风格）：
\`\`\`
【任务目标】为新款手机撰写营销推广文案
【产品信息】新款手机，面向年轻用户
【输出格式】标题（不超过15字）+ 正文（2-3个卖点）+ 促销信息
【字数要求】总计100-200字
【风格要求】活泼、年轻化、可使用emoji
【必须包含】产品特点、价格优势、促销信息
【避免内容】过度夸大、专业术语
\`\`\`
✅ 正确（恰当，42字，对话式）：
\`\`\`
请写一篇手机推广文案，包含吸引人的标题和2-3个核心卖点，100-200字，风格活泼
\`\`\`

**示例2 - 总结**
原文："总结一下"（5字）

❌ 错误（过度结构化，80+字）：
\`\`\`
【任务】总结对话内容
【输入内容】{{conversation_history}}
【输出格式】Markdown bullet points
【要求】突出关键决策和待办事项，3-5个要点
\`\`\`
✅ 正确（简洁，20字）：
\`\`\`
请用3-5个要点总结上面的对话，突出关键决策
\`\`\`

**示例3 - 翻译**
原文："翻译成英文"（6字）

❌ 错误（过度详细，60+字）：
\`\`\`
【任务目标】翻译
【源语言】中文
【目标语言】英文
【翻译标准】准确、地道、流畅，注意文化差异和语境
\`\`\`
✅ 正确（自然，18字）：
\`\`\`
请将上述内容翻译成英文，保持语气自然流畅
\`\`\`

**优化策略（基于研究）：**

1. **长度控制（相对于原文）**：
   - 短草稿（1-20字）：扩展到20-100字（x3-10倍合理）
   - 中等草稿（20-100字）：扩展到30-150字（x1.5-3倍）
   - 长草稿（100-300字）：保持100-350字（x0.8-1.5倍）
   - 超长草稿（>300字）：精简到200-400字（x0.5-1倍）
   - ⚠️ 过度优化警告：扩展比例 >20倍
2. **只添加必要内容**：增加任务清晰度、输出格式、关键约束 - 仅此而已
3. **自然措辞**：使用"请..."、"帮我..."、"写一篇..." - 对话式中文
4. **意图保留 ≥74%**：用户想要的核心内容必须保持不变
5. **禁止结构化**：❌ 不使用：【】、《》、##、1.、2.、- [ ]

**质量检查清单（自查）：**
- [ ] 长度相对于原文是否恰当（相对控制）？
- [ ] 扩展比例是否合理（不超过20倍）？
- [ ] 读起来像用户实际会说的话吗？
- [ ] 没有【任务】【要求】这样的结构标记？
- [ ] 用户会说"对，这就是我想表达的"吗？
- [ ] 保留了用户的语气和意图吗？

如果任何一项回答是"否"，说明你过度优化了！

**长度控制示例（关键）：**

示例1 - 短草稿（5字）：
- 原文："写个文案"（5字）
- ✅ 正确："请写一篇手机推广文案，包含标题和2-3个卖点，100-200字，风格活泼"（42字，x8.4倍）✅
- ❌ 错误：200+字结构化文档（x40+倍）❌

示例2 - 详细长草稿（200字）：
- 原文："我需要一篇关于新款智能手机的推广文案。这款手机的目标用户是18-35岁的年轻人，主要特点包括...[详细描述]"（200字）
- ✅ 正确："请根据以下产品信息，写一篇吸引18-35岁年轻人的手机推广文案...[整理优化]"（220-280字，x1.1-1.4倍）✅
- ❌ 错误：强制压缩到100字以下，丢失用户提供的重要信息 ❌

关键：不要使用绝对限制！根据原文长度使用相对控制。

**输出格式：**
- **仅输出**优化后的提示词文本（通常1-3句话）
- **不要**解释说明、不要结构标记、不要markdown代码块
- **自然**对话式语言
- **可以**直接复制粘贴作为用户消息
- **语言：** {LANGUAGE}

**优化后的提示词：**
`,$i=`
# 用户提示词优化基本规则

## 黄金法则
简洁 > 详细
自然 > 结构化
意图保留 > 表达优化
可用性 > 完美性

## 长度控制
- 典型: 1-3句话
- 相对控制: 短x3-10, 中x1.5-3, 长x0.8-1.5, 超长x0.5-1
- 警告阈值: 扩展比例>20x

## 禁止事项
❌ 结构标记: 【】《》## 1. 2. 
❌ 技术文档风格
❌ 改变用户意图
❌ 过度扩展内容

## 要求事项
✅ 自然对话语气
✅ 直接可用为用户消息
✅ 74%+意图保留率
✅ 只添加必要信息
`,xn={quick:dw,rules:$i},io=`你是专业的用户提示词质量分析师。

**任务：**分析用户草稿提示词的质量，给出评分和建议。
{SYSTEM_PROMPT_SECTION}{CONTEXT_SECTION}
**❗️ 重要角色说明 ❗️**
- **系统提示词**（如上所示）是**AI助手**的角色设定，不是用户的角色
- **用户草稿**是用户发给AI助手的消息，用户不需要扮演AI助手的角色
- 例如：AI助手是医生，用户是患者；AI助手是翻译，用户是需要翻译服务的人

**分析原则：**
- ✅ 草稿是否与**对话历史连贯**（例如：AI问"多久了"，用户答"三天了"是连贯的）
- ✅ 草稿是否清晰地向AI助手**提出需求或提供信息**
- ❌ 不要要求用户草稿"符合AI助手的角色"（用户不是AI助手！）
- ❌ 不要要求用户草稿包含AI助手才应该提供的内容（如医生的诊断建议）

**角色立场示例：**

场景：AI助手是医生，对话历史：用户"我牙疼" → AI"牙疼多久了"
- 用户草稿："三天了"
- ❌ 错误分析："不符合AI助手作为医生的角色，无法进行诊断"（用户不是医生！）
- ✅ 正确分析："与对话连贯，但信息过于简略，建议补充症状细节"

**分析维度（基于业界最佳实践）：**
1. **清晰度 (clarity)**: 意图是否明确，表达是否清晰，避免歧义
2. **特定性 (specificity)**: 是否具体，细节是否充分，避免模糊和泛泛而谈
3. **结构 (structure)**: 信息是否有组织，逻辑是否清晰，层次是否分明
4. **上下文 (context)**: 是否提供了足够的背景信息、使用场景、目标受众等；是否与对话历史连贯
5. **完整性 (completeness)**: 是否包含所有必要元素（任务、要求、限制、输出格式等）

**评分标准：**
- 90-100: 优秀，几乎无问题
- 70-89: 良好，有小问题但不影响使用
- 50-69: 一般，有明显问题需要优化
- <50: 差，问题较多必须优化

**输出格式（JSON）：**
\`\`\`json
{
  "overall_score": 75,
  "analysis": {
    "clarity": {
      "score": 80,
      "feedback": "意图基本明确，但某些表述略显模糊"
    },
    "specificity": {
      "score": 60,
      "feedback": "缺少具体细节，过于笼统"
    },
    "structure": {
      "score": 70,
      "feedback": "有基本结构，但层次不够清晰"
    },
    "context": {
      "score": 50,
      "feedback": "未提供背景信息和使用场景"
    },
    "completeness": {
      "score": 65,
      "feedback": "缺少输出格式和一些关键要求"
    }
  },
  "issues": [
    "提示词缺少具体的使用场景和目标受众",
    "未明确输出格式和字数要求",
    "缺少必要的背景信息和约束条件"
  ]
}
\`\`\`

**草稿提示词：**
{USER_DRAFT_PROMPT}

**请直接输出JSON，不要其他内容。**`,Ui=class Ui{constructor(){Ye(this,"config");Ye(this,"useSlimRules",!1);Ye(this,"dirtyFields",new Set);this.config={systemPromptRules:un,userGuidedPromptRules:hn,requirementReportRules:dn,thinkingPointsExtractionPrompt:pn,thinkingPointsSystemMessage:fn,systemPromptGenerationPrompt:mn,systemPromptSystemMessage:gn,optimizationAdvicePrompt:yn,optimizationAdviceSystemMessage:vn,optimizationApplicationPrompt:bn,optimizationApplicationSystemMessage:wn,qualityAnalysisSystemPrompt:Tn,userPromptQualityAnalysis:io,userPromptQuickOptimization:xn.quick,userPromptRules:$i},this.loadFromStorage()}static getInstance(){return Ui.instance||(Ui.instance=new Ui),Ui.instance}setUseSlimRules(t){this.useSlimRules=t}getSystemPromptRules(){return this.useSlimRules?hw:this.config.systemPromptRules}getUserGuidedPromptRules(){return this.config.userGuidedPromptRules}updateSystemPromptRules(t){this.config.systemPromptRules=t,this.dirtyFields.add("system_prompt_rules"),this.saveToStorage()}updateUserGuidedPromptRules(t){this.config.userGuidedPromptRules=t,this.dirtyFields.add("user_guided_prompt_rules"),this.saveToStorage()}getRequirementReportRules(){return this.config.requirementReportRules}updateRequirementReportRules(t){this.config.requirementReportRules=t,this.dirtyFields.add("requirement_report_rules"),this.saveToStorage()}getThinkingPointsExtractionPrompt(){return this.config.thinkingPointsExtractionPrompt}getThinkingPointsSystemMessage(){return this.config.thinkingPointsSystemMessage}getSystemPromptGenerationPrompt(){return this.config.systemPromptGenerationPrompt}getSystemPromptSystemMessage(){return this.config.systemPromptSystemMessage}getOptimizationAdvicePrompt(){return this.config.optimizationAdvicePrompt}getOptimizationAdviceSystemMessage(){return this.config.optimizationAdviceSystemMessage}getOptimizationApplicationPrompt(){return this.config.optimizationApplicationPrompt}getOptimizationApplicationSystemMessage(){return this.config.optimizationApplicationSystemMessage}getQualityAnalysisSystemPrompt(){return this.config.qualityAnalysisSystemPrompt}getUserPromptQualityAnalysis(){return this.config.userPromptQualityAnalysis}getUserPromptQuickOptimization(){return this.config.userPromptQuickOptimization}getUserPromptRules(){return this.config.userPromptRules}updateThinkingPointsExtractionPrompt(t){this.config.thinkingPointsExtractionPrompt=t,this.dirtyFields.add("thinking_points_extraction_prompt"),this.saveToStorage()}updateThinkingPointsSystemMessage(t){this.config.thinkingPointsSystemMessage=t,this.saveToStorage()}updateSystemPromptGenerationPrompt(t){this.config.systemPromptGenerationPrompt=t,this.dirtyFields.add("system_prompt_generation_prompt"),this.saveToStorage()}updateSystemPromptSystemMessage(t){this.config.systemPromptSystemMessage=t,this.saveToStorage()}updateOptimizationAdvicePrompt(t){this.config.optimizationAdvicePrompt=t,this.dirtyFields.add("optimization_advice_prompt"),this.saveToStorage()}updateOptimizationAdviceSystemMessage(t){this.config.optimizationAdviceSystemMessage=t,this.saveToStorage()}updateOptimizationApplicationPrompt(t){this.config.optimizationApplicationPrompt=t,this.dirtyFields.add("optimization_application_prompt"),this.saveToStorage()}updateOptimizationApplicationSystemMessage(t){this.config.optimizationApplicationSystemMessage=t,this.saveToStorage()}updateQualityAnalysisSystemPrompt(t){this.config.qualityAnalysisSystemPrompt=t,this.dirtyFields.add("quality_analysis_system_prompt"),this.saveToStorage()}updateUserPromptQualityAnalysis(t){this.config.userPromptQualityAnalysis=t,this.dirtyFields.add("user_prompt_quality_analysis"),this.saveToStorage()}updateUserPromptQuickOptimization(t){this.config.userPromptQuickOptimization=t,this.dirtyFields.add("user_prompt_quick_optimization"),this.saveToStorage()}updateUserPromptRules(t){this.config.userPromptRules=t,this.saveToStorage()}getFinalPromptGenerationRules(){return{THINKING_POINTS_EXTRACTION:this.config.thinkingPointsExtractionPrompt,SYSTEM_PROMPT_GENERATION:this.config.systemPromptGenerationPrompt,OPTIMIZATION_ADVICE_GENERATION:this.config.optimizationAdvicePrompt,OPTIMIZATION_APPLICATION:this.config.optimizationApplicationPrompt}}getFinalPromptSystemMessages(){return{THINKING_POINTS_SYSTEM:this.config.thinkingPointsSystemMessage,SYSTEM_PROMPT_SYSTEM:this.config.systemPromptSystemMessage,OPTIMIZATION_ADVICE_SYSTEM:this.config.optimizationAdviceSystemMessage,OPTIMIZATION_APPLICATION_SYSTEM:this.config.optimizationApplicationSystemMessage}}resetToDefaults(){this.config.systemPromptRules=un,this.config.userGuidedPromptRules=hn,this.config.requirementReportRules=dn,this.config.thinkingPointsExtractionPrompt=pn,this.config.thinkingPointsSystemMessage=fn,this.config.systemPromptGenerationPrompt=mn,this.config.systemPromptSystemMessage=gn,this.config.optimizationAdvicePrompt=yn,this.config.optimizationAdviceSystemMessage=vn,this.config.optimizationApplicationPrompt=bn,this.config.optimizationApplicationSystemMessage=wn,this.config.qualityAnalysisSystemPrompt=Tn,this.config.userPromptQuickOptimization=xn.quick,this.config.userPromptRules=$i,this.saveToStorage()}async resetSystemPromptRules(){this.config.systemPromptRules=un,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["system_prompt_rules"])}async resetUserGuidedPromptRules(){this.config.userGuidedPromptRules=hn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["user_guided_prompt_rules"])}async resetRequirementReportRules(){this.config.requirementReportRules=dn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["requirement_report_rules"])}async resetThinkingPointsExtractionPrompt(){this.config.thinkingPointsExtractionPrompt=pn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["thinking_points_extraction_prompt"])}resetThinkingPointsSystemMessage(){this.config.thinkingPointsSystemMessage=fn,this.saveToStorage()}async resetSystemPromptGenerationPrompt(){this.config.systemPromptGenerationPrompt=mn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["system_prompt_generation_prompt"])}resetSystemPromptSystemMessage(){this.config.systemPromptSystemMessage=gn,this.saveToStorage()}async resetOptimizationAdvicePrompt(){this.config.optimizationAdvicePrompt=yn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["optimization_advice_prompt"])}resetOptimizationAdviceSystemMessage(){this.config.optimizationAdviceSystemMessage=vn,this.saveToStorage()}async resetOptimizationApplicationPrompt(){this.config.optimizationApplicationPrompt=bn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["optimization_application_prompt"])}resetOptimizationApplicationSystemMessage(){this.config.optimizationApplicationSystemMessage=wn,this.saveToStorage()}async resetQualityAnalysisSystemPrompt(){this.config.qualityAnalysisSystemPrompt=Tn,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["quality_analysis_system_prompt"])}async resetUserPromptQualityAnalysis(){this.config.userPromptQualityAnalysis=io,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["user_prompt_quality_analysis"])}async resetUserPromptQuickOptimization(){this.config.userPromptQuickOptimization=xn.quick,this.saveToStorage();const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t(["user_prompt_quick_optimization"])}resetUserPromptRules(){this.config.userPromptRules=$i,this.saveToStorage()}saveToStorage(){try{localStorage.setItem("yprompt_config",JSON.stringify(this.config))}catch{}}async saveToCloud(){try{if(this.dirtyFields.size===0){console.log("[PromptConfig] 无修改，跳过保存");return}const{saveUserPromptRules:t}=await Pe(async()=>{const{saveUserPromptRules:o}=await import("./apiService-DJRr25Fm.js");return{saveUserPromptRules:o}},[]),i={system_prompt_rules:"systemPromptRules",user_guided_prompt_rules:"userGuidedPromptRules",requirement_report_rules:"requirementReportRules",thinking_points_extraction_prompt:"thinkingPointsExtractionPrompt",thinking_points_system_message:"thinkingPointsSystemMessage",system_prompt_generation_prompt:"systemPromptGenerationPrompt",system_prompt_system_message:"systemPromptSystemMessage",optimization_advice_prompt:"optimizationAdvicePrompt",optimization_advice_system_message:"optimizationAdviceSystemMessage",optimization_application_prompt:"optimizationApplicationPrompt",optimization_application_system_message:"optimizationApplicationSystemMessage",quality_analysis_system_prompt:"qualityAnalysisSystemPrompt",user_prompt_quality_analysis:"userPromptQualityAnalysis",user_prompt_quick_optimization:"userPromptQuickOptimization",user_prompt_rules:"userPromptRules"},n={};this.dirtyFields.forEach(o=>{const s=i[o];s&&(n[o]=this.config[s])}),console.log("[PromptConfig] 保存修改的字段:",Array.from(this.dirtyFields)),await t(n),this.dirtyFields.clear(),this.saveToStorage()}catch(t){throw console.error("保存到云端失败:",t),t}}async loadFromCloud(){try{if(!localStorage.getItem("yprompt_token"))return console.log("[PromptConfig] 未登录，跳过云端加载"),!1;if(sessionStorage.getItem("yprompt_config_session_loaded")==="true")return console.log("[PromptConfig] 本次会话已加载，跳过API调用"),!0;console.log("[PromptConfig] 首次会话加载，从云端获取最新配置");const{getUserPromptRules:n}=await Pe(async()=>{const{getUserPromptRules:s}=await import("./apiService-DJRr25Fm.js");return{getUserPromptRules:s}},[]),o=await n();if(o.code===200&&o.data){const s=o.data;return this.config={systemPromptRules:s.system_prompt_rules||un,userGuidedPromptRules:s.user_guided_prompt_rules||hn,requirementReportRules:s.requirement_report_rules||dn,thinkingPointsExtractionPrompt:s.thinking_points_extraction_prompt||pn,thinkingPointsSystemMessage:s.thinking_points_system_message||fn,systemPromptGenerationPrompt:s.system_prompt_generation_prompt||mn,systemPromptSystemMessage:s.system_prompt_system_message||gn,optimizationAdvicePrompt:s.optimization_advice_prompt||yn,optimizationAdviceSystemMessage:s.optimization_advice_system_message||vn,optimizationApplicationPrompt:s.optimization_application_prompt||bn,optimizationApplicationSystemMessage:s.optimization_application_system_message||wn,qualityAnalysisSystemPrompt:s.quality_analysis_system_prompt||Tn,userPromptQualityAnalysis:s.user_prompt_quality_analysis||io,userPromptQuickOptimization:s.user_prompt_quick_optimization||xn.quick,userPromptRules:s.user_prompt_rules||$i},this.saveToStorage(),sessionStorage.setItem("yprompt_config_session_loaded","true"),console.log("[PromptConfig] 云端配置加载成功，已标记会话"),!0}else return console.log("[PromptConfig] 云端无数据，使用默认配置"),sessionStorage.setItem("yprompt_config_session_loaded","true"),!1}catch(t){return console.error("[PromptConfig] 从云端加载失败:",t),sessionStorage.setItem("yprompt_config_session_loaded","true"),!1}}async forceReloadFromCloud(){return sessionStorage.removeItem("yprompt_config_session_loaded"),this.loadFromCloud()}async deleteFromCloud(){try{const{deleteUserPromptRules:t}=await Pe(async()=>{const{deleteUserPromptRules:i}=await import("./apiService-DJRr25Fm.js");return{deleteUserPromptRules:i}},[]);await t()}catch(t){throw console.error("删除云端配置失败:",t),t}}loadFromStorage(){try{const t=localStorage.getItem("yprompt_config");if(t){const i=JSON.parse(t);this.config.systemPromptRules=i.systemPromptRules||un,this.config.userGuidedPromptRules=i.userGuidedPromptRules||hn,this.config.requirementReportRules=i.requirementReportRules||dn,this.config.thinkingPointsExtractionPrompt=i.thinkingPointsExtractionPrompt||pn,this.config.thinkingPointsSystemMessage=i.thinkingPointsSystemMessage||fn,this.config.systemPromptGenerationPrompt=i.systemPromptGenerationPrompt||mn,this.config.systemPromptSystemMessage=i.systemPromptSystemMessage||gn,this.config.optimizationAdvicePrompt=i.optimizationAdvicePrompt||yn,this.config.optimizationAdviceSystemMessage=i.optimizationAdviceSystemMessage||vn,this.config.optimizationApplicationPrompt=i.optimizationApplicationPrompt||bn,this.config.optimizationApplicationSystemMessage=i.optimizationApplicationSystemMessage||wn,this.config.qualityAnalysisSystemPrompt=i.qualityAnalysisSystemPrompt||Tn,this.config.userPromptQualityAnalysis=i.userPromptQualityAnalysis||io,this.config.userPromptQuickOptimization=i.userPromptQuickOptimization||xn.quick,this.config.userPromptRules=i.userPromptRules||$i}}catch{this.config={systemPromptRules:un,userGuidedPromptRules:hn,requirementReportRules:dn,thinkingPointsExtractionPrompt:pn,thinkingPointsSystemMessage:fn,systemPromptGenerationPrompt:mn,systemPromptSystemMessage:gn,optimizationAdvicePrompt:yn,optimizationAdviceSystemMessage:vn,optimizationApplicationPrompt:bn,optimizationApplicationSystemMessage:wn,qualityAnalysisSystemPrompt:Tn,userPromptQualityAnalysis:io,userPromptQuickOptimization:xn.quick,userPromptRules:$i}}}};Ye(Ui,"instance");let js=Ui;const ne=js.getInstance(),pw=Object.freeze(Object.defineProperty({__proto__:null,PromptConfigManager:js,promptConfigManager:ne},Symbol.toStringTag,{value:"Module"})),Li=Go("settings",()=>{const e=oe(!1),t=oe([]),i=oe(""),n=oe(""),o=oe(!0),s=oe(!1),r=oe(!1),a=oe({temperature:1,maxTokens:8192,topP:.95,frequencyPenalty:0,presencePenalty:0,topK:0}),l=oe(!1),c=oe("system"),h=oe(""),u=oe(""),p=oe(""),d=oe({THINKING_POINTS_EXTRACTION:"",SYSTEM_PROMPT_GENERATION:"",OPTIMIZATION_ADVICE_GENERATION:"",OPTIMIZATION_APPLICATION:""}),m=oe({systemPrompt:""}),f=oe({qualityAnalysis:"",quickOptimization:""}),x=()=>{t.value=[]},P=I=>({openai:{name:"OpenAI",type:"openai",baseUrl:"https://api.openai.com/v1/chat/completions",allowCustomUrl:!0,models:[]},anthropic:{name:"Anthropic",type:"anthropic",baseUrl:"https://api.anthropic.com/v1/messages",allowCustomUrl:!0,models:[{id:"claude-opus-4-1-20250805",name:"claude-opus-4-1",enabled:!1,apiType:"anthropic"},{id:"claude-opus-4-20250514",name:"claude-opus-4-0",enabled:!1,apiType:"anthropic"},{id:"claude-sonnet-4-20250514",name:"claude-sonnet-4-0",enabled:!1,apiType:"anthropic"},{id:"claude-3-7-sonnet-20250219",name:"claude-3-7-sonnet-latest",enabled:!0,apiType:"anthropic"},{id:"claude-3-5-sonnet-20241022",name:"claude-3-5-sonnet-latest",enabled:!0,apiType:"anthropic"},{id:"claude-3-5-haiku-20241022",name:"claude-3-5-haiku-latest",enabled:!0,apiType:"anthropic"},{id:"claude-3-haiku-20240307",name:"claude-3-haiku-20240307",enabled:!1,apiType:"anthropic"}]},google:{name:"Gemini",type:"google",baseUrl:"https://generativelanguage.googleapis.com/v1beta",allowCustomUrl:!0,models:[]},custom:{name:"",type:"custom",baseUrl:"https://api.example.com/v1/chat/completions",allowCustomUrl:!0,models:[]}})[I],A=()=>t.value.filter(I=>I.enabled&&I.apiKey.trim()!==""),b=I=>{const q=t.value.find(F=>F.id===I);return q?q.models.filter(F=>F.enabled):[]},S=()=>{console.log(`[settingsStore.getCurrentProvider] selectedProvider=${i.value}, providers数量=${t.value.length}`);const I=t.value.find(q=>q.id===i.value);return I?console.log(`[settingsStore.getCurrentProvider] 找到提供商: ${I.id}`):(console.log(`[settingsStore.getCurrentProvider] 没有找到提供商 ${i.value}`),console.log("[settingsStore.getCurrentProvider] 可用提供商:",t.value.map(q=>q.id))),I},_=()=>{console.log(`[settingsStore.getCurrentModel] selectedProvider=${i.value}, selectedModel=${n.value}`);const I=S();if(!I)return console.log("[settingsStore.getCurrentModel] 没有找到提供商"),null;console.log(`[settingsStore.getCurrentModel] 找到提供商: ${I.id}, 模型数量: ${I.models.length}`);const q=I.models.find(F=>F.id===n.value);return q?console.log(`[settingsStore.getCurrentModel] 找到模型: ${q.id}`):(console.log(`[settingsStore.getCurrentModel] 没有找到模型 ${n.value}`),console.log("[settingsStore.getCurrentModel] 可用模型:",I.models.map(F=>F.id))),q},C=(I,q)=>{const F=P(I),L=I==="custom"?`custom_${Date.now()}`:`${I}_${Date.now()}`,U={...F,...q,id:L,apiKey:(q==null?void 0:q.apiKey)||"",enabled:!0,models:F.models.map(V=>({...V,provider:L}))};return t.value.unshift(U),U},R=(I,q)=>{const F=t.value.find(L=>L.id===I);F&&F.models.unshift({...q,provider:I})},w=async()=>{console.log("[settingsStore] 开始保存设置...");try{const{saveSettings:I}=await Pe(async()=>{const{saveSettings:q}=await Promise.resolve().then(()=>Yc);return{saveSettings:q}},void 0);await I({providers:t.value}),console.log("[settingsStore] 已保存到后端 API")}catch(I){console.error("[settingsStore] 保存到后端失败，保存到localStorage:",I),localStorage.setItem("yprompt_providers",JSON.stringify(t.value))}localStorage.setItem("yprompt_providers",JSON.stringify(t.value)),localStorage.setItem("yprompt_selected_provider",i.value),localStorage.setItem("yprompt_selected_model",n.value),localStorage.setItem("yprompt_stream_mode",JSON.stringify(o.value)),localStorage.setItem("yprompt_use_slim_rules",JSON.stringify(s.value)),console.log("[settingsStore] 全局模型参数:",a.value),localStorage.setItem("yprompt_global_model_params",JSON.stringify(a.value)),y(),console.log("[settingsStore] 设置保存完成")},y=()=>{if(r.value){console.log("[settingsStore] 跳过同步到 providerStore（正在同步中）");return}console.log(`[settingsStore] 同步选择到 providerStore: provider=${i.value}, model=${n.value}`),r.value=!0,Pe(async()=>{const{useProviderStore:I}=await Promise.resolve().then(()=>gw);return{useProviderStore:I}},void 0).then(({useProviderStore:I})=>{const q=I();console.log(`[settingsStore] 设置 providerStore: provider=${i.value}, model=${n.value}`),q.selectedProviderId=i.value,q.selectedModelId=n.value}).catch(I=>{console.warn("[settingsStore] 同步到 providerStore 失败:",I)}).finally(()=>{setTimeout(()=>{r.value=!1},100)})},E=async()=>{console.log("[settingsStore] 开始加载设置...");try{const{getSettings:ee}=await Pe(async()=>{const{getSettings:ve}=await Promise.resolve().then(()=>Yc);return{getSettings:ve}},void 0),ue=await ee();t.value=ue.providers}catch(ee){console.error("[settingsStore] 从后端加载配置失败:",ee);const ue=localStorage.getItem("yprompt_providers");if(ue)try{const ve=JSON.parse(ue);Array.isArray(ve)&&(t.value=ve)}catch(ve){console.error("[settingsStore] 从localStorage加载配置失败:",ve)}}const I=localStorage.getItem("yprompt_selected_provider"),q=localStorage.getItem("yprompt_selected_model"),F=localStorage.getItem("yprompt_stream_mode"),L=localStorage.getItem("yprompt_use_slim_rules");console.log("[settingsStore] 从localStorage加载:"),console.log("- yprompt_selected_provider:",I),console.log("- yprompt_selected_model:",q);const U=localStorage.getItem("yprompt_global_model_params");if(U)try{console.log("[settingsStore] 加载全局模型参数...");const ee=JSON.parse(U);a.value={...a.value,...ee},console.log("[settingsStore] 全局模型参数加载完成:",a.value)}catch(ee){console.error("加载全局模型参数失败:",ee)}else console.log("[settingsStore] 没有保存的全局模型参数，使用默认值");if(F)try{o.value=JSON.parse(F)}catch{o.value=!0}if(L)try{s.value=JSON.parse(L)}catch{s.value=!1}const V=A();let H=!1,ie=!1;if(I&&V.find(ue=>ue.id===I)&&(i.value=I,H=!0,q&&b(I).find(we=>we.id===q)&&(n.value=q,ie=!0)),!H&&V.length>0&&(i.value=V[0].id),i.value&&!ie){const ee=b(i.value);ee.length>0?n.value=ee[0].id:n.value=""}try{await ne.loadFromCloud()}catch(ee){console.error("从云端加载提示词规则失败:",ee)}y()},O=I=>{const q=t.value.findIndex(F=>F.id===I);if(q>-1){if(t.value.splice(q,1),i.value===I){i.value="",n.value="";const F=A();if(F.length>0){i.value=F[0].id;const L=b(i.value);L.length>0&&(n.value=L[0].id)}}w()}},k=(I,q)=>{const F=t.value.find(L=>L.id===I);if(F){const L=F.models.findIndex(U=>U.id===q);L>-1&&(F.models.splice(L,1),n.value===q&&(n.value=""))}},D=oe(null),j=()=>{ne.setUseSlimRules(s.value),h.value=ne.getSystemPromptRules(),u.value=ne.getUserGuidedPromptRules(),p.value=ne.getRequirementReportRules();const I=ne.getFinalPromptGenerationRules();d.value={...I},m.value.systemPrompt=ne.getQualityAnalysisSystemPrompt(),f.value.qualityAnalysis=ne.getUserPromptQualityAnalysis(),f.value.quickOptimization=ne.getUserPromptQuickOptimization(),D.value={systemRules:h.value,userRules:u.value,requirementReportRules:p.value,finalPromptRules:JSON.parse(JSON.stringify(d.value)),qualityAnalysisRules:{systemPrompt:m.value.systemPrompt},userPromptOptimizationRules:{qualityAnalysis:f.value.qualityAnalysis,quickOptimization:f.value.quickOptimization}}},G=I=>{c.value=I,j(),l.value=!0},W=()=>{l.value=!1,h.value="",u.value="",p.value="",d.value={THINKING_POINTS_EXTRACTION:"",SYSTEM_PROMPT_GENERATION:"",OPTIMIZATION_ADVICE_GENERATION:"",OPTIMIZATION_APPLICATION:""}},J=async()=>{try{D.value?(h.value!==D.value.systemRules&&ne.updateSystemPromptRules(h.value),u.value!==D.value.userRules&&ne.updateUserGuidedPromptRules(u.value),p.value!==D.value.requirementReportRules&&ne.updateRequirementReportRules(p.value),d.value.THINKING_POINTS_EXTRACTION!==D.value.finalPromptRules.THINKING_POINTS_EXTRACTION&&ne.updateThinkingPointsExtractionPrompt(d.value.THINKING_POINTS_EXTRACTION),d.value.SYSTEM_PROMPT_GENERATION!==D.value.finalPromptRules.SYSTEM_PROMPT_GENERATION&&ne.updateSystemPromptGenerationPrompt(d.value.SYSTEM_PROMPT_GENERATION),d.value.OPTIMIZATION_ADVICE_GENERATION!==D.value.finalPromptRules.OPTIMIZATION_ADVICE_GENERATION&&ne.updateOptimizationAdvicePrompt(d.value.OPTIMIZATION_ADVICE_GENERATION),d.value.OPTIMIZATION_APPLICATION!==D.value.finalPromptRules.OPTIMIZATION_APPLICATION&&ne.updateOptimizationApplicationPrompt(d.value.OPTIMIZATION_APPLICATION),m.value.systemPrompt!==D.value.qualityAnalysisRules.systemPrompt&&ne.updateQualityAnalysisSystemPrompt(m.value.systemPrompt),f.value.qualityAnalysis!==D.value.userPromptOptimizationRules.qualityAnalysis&&ne.updateUserPromptQualityAnalysis(f.value.qualityAnalysis),f.value.quickOptimization!==D.value.userPromptOptimizationRules.quickOptimization&&ne.updateUserPromptQuickOptimization(f.value.quickOptimization)):(console.warn("[SavePromptRules] 没有原始值,将更新所有字段"),ne.updateSystemPromptRules(h.value),ne.updateUserGuidedPromptRules(u.value),ne.updateRequirementReportRules(p.value),ne.updateThinkingPointsExtractionPrompt(d.value.THINKING_POINTS_EXTRACTION),ne.updateSystemPromptGenerationPrompt(d.value.SYSTEM_PROMPT_GENERATION),ne.updateOptimizationAdvicePrompt(d.value.OPTIMIZATION_ADVICE_GENERATION),ne.updateOptimizationApplicationPrompt(d.value.OPTIMIZATION_APPLICATION),ne.updateQualityAnalysisSystemPrompt(m.value.systemPrompt),ne.updateUserPromptQualityAnalysis(f.value.qualityAnalysis),ne.updateUserPromptQuickOptimization(f.value.quickOptimization)),await ne.saveToCloud(),W()}catch(I){throw console.error("保存提示词规则失败:",I),I}},K=async()=>{await ne.resetSystemPromptRules(),h.value=ne.getSystemPromptRules()},ye=async()=>{await ne.resetUserGuidedPromptRules(),u.value=ne.getUserGuidedPromptRules()},Ce=async()=>{await ne.resetRequirementReportRules(),p.value=ne.getRequirementReportRules()},He=async()=>{await ne.resetThinkingPointsExtractionPrompt();const I=ne.getFinalPromptGenerationRules();d.value={...I}},me=async()=>{await ne.resetSystemPromptGenerationPrompt();const I=ne.getFinalPromptGenerationRules();d.value={...I}},pt=async()=>{await ne.resetOptimizationAdvicePrompt();const I=ne.getFinalPromptGenerationRules();d.value={...I}},Qe=async()=>{await ne.resetOptimizationApplicationPrompt();const I=ne.getFinalPromptGenerationRules();d.value={...I}},Qt=async()=>{await ne.resetQualityAnalysisSystemPrompt(),m.value.systemPrompt=ne.getQualityAnalysisSystemPrompt()},Ke=async()=>{await ne.resetUserPromptQualityAnalysis(),f.value.qualityAnalysis=ne.getUserPromptQualityAnalysis()},B=async()=>{await ne.resetUserPromptQuickOptimization(),f.value.quickOptimization=ne.getUserPromptQuickOptimization()},Z=()=>(ne.setUseSlimRules(s.value),ne.getSystemPromptRules()),Y=()=>ne.getUserGuidedPromptRules(),te=(I,q,F)=>{const L=t.value.find(U=>U.id===I);if(L){const U=L.models.find(V=>V.id===q);U&&(U.testStatus=F,F==="testing"&&(U.lastTested=new Date))}},be=(I,q,F)=>{var U;const L=t.value.find(V=>V.id===I);if(L){const V=L.models.find(H=>H.id===q);V&&(V.capabilities=F,V.lastTested=new Date,V.testStatus=(U=F.testResult)!=null&&U.connected?"success":"failed")}},Ee=(I,q,F,L)=>{const U=t.value.find(V=>V.id===I);if(U){const V=U.models.find(H=>H.id===q);V&&(V.capabilities?V.capabilities.testResult&&(V.capabilities.testResult.connected=F,V.capabilities.testResult.timestamp=new Date,L&&(V.capabilities.testResult.error=L)):V.capabilities={reasoning:!1,reasoningType:null,supportedParams:{temperature:!0,maxTokens:"max_tokens",streaming:!0,systemMessage:!0},testResult:{connected:F,reasoning:!1,responseTime:0,timestamp:new Date,error:L}},V.lastTested=new Date,V.testStatus=F?"success":"failed")}},v=(I,q)=>{const F=t.value.find(L=>L.id===I);if(F){const L=F.models.find(U=>U.id===q);L&&(L.testStatus="untested",L.capabilities=void 0,L.lastTested=void 0)}},T=(I,q)=>{const F=t.value.find(L=>L.id===I);if(F){const L=F.models.find(U=>U.id===q);return(L==null?void 0:L.testStatus)||"untested"}return"untested"},M=(I,q)=>{const F=t.value.find(L=>L.id===I);if(F){const L=F.models.find(V=>V.id===q);return!(L!=null&&L.lastTested)||!L.capabilities?!0:Date.now()-L.lastTested.getTime()>24*60*60*1e3}return!0},z=I=>{switch(I){case"openai-reasoning":return"OpenAI o1系列推理能力";case"gemini-thought":return"Gemini内置思考功能";case"claude-thinking":return"Claude思考标签支持";case"generic-cot":return"通用链式思考";default:return"无思考能力"}},$=()=>ne.getRequirementReportRules();return St(e,I=>{I&&j()}),{showSettings:e,providers:t,selectedProvider:i,selectedModel:n,streamMode:o,useSlimRules:s,globalModelParams:a,showPromptEditor:l,editingPromptType:c,editingSystemRules:h,editingUserRules:u,editingRequirementReportRules:p,editingFinalPromptRules:d,editingQualityAnalysisRules:m,editingUserPromptOptimizationRules:f,initializeDefaults:x,getProviderTemplate:P,getAvailableProviders:A,getAvailableModels:b,getCurrentProvider:S,getCurrentModel:_,addProvider:C,addModel:R,deleteProvider:O,deleteModel:k,saveSettings:w,loadSettings:E,loadPromptRules:j,openPromptEditor:G,closePromptEditor:W,savePromptRules:J,resetSystemPromptRules:K,resetUserPromptRules:ye,resetRequirementReportRules:Ce,resetThinkingPointsExtractionPrompt:He,resetSystemPromptGenerationPrompt:me,resetOptimizationAdvicePrompt:pt,resetOptimizationApplicationPrompt:Qe,resetQualityAnalysisSystemPrompt:Qt,resetUserPromptQualityAnalysis:Ke,resetUserPromptQuickOptimization:B,getCurrentSystemRules:Z,getCurrentUserRules:Y,getCurrentRequirementReportRules:$,updateModelTestStatus:te,updateModelCapabilities:be,updateModelConnectionStatus:Ee,clearModelTestStatus:v,getModelTestStatus:T,shouldRetestModel:M,getReasoningTypeDescription:z}}),fw=Object.freeze(Object.defineProperty({__proto__:null,useSettingsStore:Li},Symbol.toStringTag,{value:"Module"})),hp="https://api.prompt-ui.xiechengqi.top";async function dp(){const e=localStorage.getItem("yprompt_token"),t=await fetch(`${hp}/api/settings/`,{method:"GET",headers:{Authorization:`Bearer ${e}`,"Content-Type":"application/json"}});if(!t.ok)throw new Error(`Failed to fetch settings: ${t.statusText}`);const i=await t.json();if(i.code!==200)throw new Error(i.message||"Failed to fetch settings");return i.data}async function mw(e){const t=localStorage.getItem("yprompt_token"),i=await fetch(`${hp}/api/settings/`,{method:"PUT",headers:{Authorization:`Bearer ${t}`,"Content-Type":"application/json"},body:JSON.stringify(e)});if(!i.ok)throw new Error(`Failed to save settings: ${i.statusText}`);const n=await i.json();if(n.code!==200)throw new Error(n.message||"Failed to save settings");return n.data}const Yc=Object.freeze(Object.defineProperty({__proto__:null,getSettings:dp,saveSettings:mw},Symbol.toStringTag,{value:"Module"})),vr=Go("provider",()=>{const e=oe([]),t=oe(null),i=oe(!1),n=oe(null),o=oe(""),s=oe(""),r=oe(!0),a=oe(JSON.parse(localStorage.getItem("yprompt_show_api_keys")||"false")),l=oe(!1),c=xe(()=>e.value),h=xe(()=>e.value.filter(O=>O.apiKey)),u=xe(()=>O=>e.value.find(k=>k.id===O)),p=xe(()=>e.value.find(O=>O.id===o.value)||null),d=xe(()=>p.value&&p.value.models.find(O=>O.id===s.value)||null),m=xe(()=>{const O=[];return e.value.forEach(k=>{k.models.forEach(D=>{O.push({...D,provider:k.id})})}),O}),f=xe(()=>p.value?p.value.models:[]),x=xe(()=>O=>{const k=u.value(O);return k?k.models:[]}),P=async()=>{i.value=!0,n.value=null;try{const O=await dp();e.value=O.providers,t.value=new Date;const k=h.value.find(j=>j.id===o.value),D=k==null?void 0:k.models.find(j=>j.id===s.value);if(!k||!D){if(console.log("[providerStore] 当前选择无效，使用配置文件���的第一个提供商和模型"),h.value.length>0){const j=h.value[0];o.value=j.id;const G=j.models[0];G?s.value=G.id:s.value=""}else o.value="",s.value="";C()}else console.log("[providerStore] 当前选择有效，保持不变")}catch(O){throw n.value=O.message||"刷新配置失败",console.error("刷新配置失败:",O),O}finally{i.value=!1}},A=async()=>{R(),w(),await P(),y()},b=O=>{o.value=O;const k=u.value(O);if(k){const D=k.models[0];D&&(s.value=D.id)}C(),y()},S=O=>{s.value=O,C(),y()},_=O=>{r.value=O,localStorage.setItem("yprompt_stream_mode",JSON.stringify(O))},C=()=>{localStorage.setItem("yprompt_selected_provider",o.value),localStorage.setItem("yprompt_selected_model",s.value)},R=()=>{const O=localStorage.getItem("yprompt_selected_provider"),k=localStorage.getItem("yprompt_selected_model");O&&(o.value=O),k&&(s.value=k)},w=()=>{const O=localStorage.getItem("yprompt_stream_mode");if(O)try{r.value=JSON.parse(O)}catch{r.value=!0}},y=()=>{if(l.value){console.log("[providerStore] 跳过同步到 settingsStore（正在同步中）");return}console.log(`[providerStore] 同步选择到 settingsStore: provider=${o.value}, model=${s.value}`),l.value=!0,Pe(async()=>{const{useSettingsStore:O}=await Promise.resolve().then(()=>fw);return{useSettingsStore:O}},void 0).then(({useSettingsStore:O})=>{const k=O();console.log(`[providerStore] 设置 settingsStore: provider=${o.value}, model=${s.value}`),k.selectedProvider=o.value,k.selectedModel=s.value,k.saveSettings()}).catch(O=>{console.warn("[providerStore] 同步到 settingsStore 失败:",O)}).finally(()=>{setTimeout(()=>{l.value=!1},100)})};return{providers:e,lastRefreshedAt:t,isLoading:i,error:n,selectedProviderId:o,selectedModelId:s,streamMode:r,showApiKeys:a,allProviders:c,enabledProviders:h,getProviderById:u,currentProvider:p,currentModel:d,allModels:m,availableModels:f,getAvailableModelsByProvider:x,refreshSettings:P,initialize:A,selectProvider:b,selectModel:S,toggleStreamMode:_,toggleApiKeysVisibility:()=>{a.value=!a.value,localStorage.setItem("yprompt_show_api_keys",JSON.stringify(a.value))}}}),gw=Object.freeze(Object.defineProperty({__proto__:null,useProviderStore:vr},Symbol.toStringTag,{value:"Module"})),yw={class:"flex items-center gap-3"},vw={class:"relative"},bw=["value"],ww={class:"relative"},Tw=["disabled"],xw=["value"],Sw={key:0,class:"flex-shrink-0 ml-2"},kw=["title"],Aw=ot({__name:"TopModelSelector",setup(e){const t=vr(),i=m=>`${m.name}|${m.id}`,n=m=>{const[f,x]=m.split("|");return{name:f,id:x}},o=m=>m.name,s=m=>m.name,r=m=>`${m.name}|${m.id}`,a=xe({get:()=>{if(!t.selectedProviderId)return"";const m=t.getProviderById(t.selectedProviderId);return m?i(m):""},set:m=>{if(!m){t.selectedProviderId="";return}const{id:f}=n(m);t.selectedProviderId=f}}),l=xe({get:()=>{if(!t.selectedModelId)return"";const m=t.currentModel;return m?`${m.name}|${m.id}`:""},set:m=>{if(!m){t.selectedModelId="";return}const[,f]=m.split("|");t.selectedModelId=f}}),c=xe(()=>t.selectedProviderId),h=xe(()=>t.enabledProviders),u=xe(()=>t.selectedProviderId?t.getAvailableModelsByProvider(t.selectedProviderId):[]);St(a,(m,f)=>{if(m&&m!==f){const{id:x}=n(m);t.selectProvider(x)}},{immediate:!1});const p=()=>{},d=()=>{if(l.value){const[,m]=l.value.split("|");t.selectModel(m)}};return(m,f)=>(X(),ae("div",yw,[f[6]||(f[6]=g("div",{class:"flex-shrink-0"},[g("svg",{class:"w-4 h-4 text-gray-600",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"})])],-1)),g("div",vw,[Ae(g("select",{"onUpdate:modelValue":f[0]||(f[0]=x=>a.value=x),onChange:p,class:"px-2 py-1 text-sm font-medium text-gray-700 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none cursor-pointer appearance-none"},[f[2]||(f[2]=g("option",{value:"",disabled:""},"提供商",-1)),(X(!0),ae(Me,null,Yi(h.value,x=>(X(),ae("option",{key:x.id,value:i(x)},ce(o(x)),9,bw))),128))],544),[[Ms,a.value]]),f[3]||(f[3]=g("svg",{class:"absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"})],-1))]),g("div",ww,[Ae(g("select",{"onUpdate:modelValue":f[1]||(f[1]=x=>l.value=x),onChange:d,disabled:!c.value,class:"px-2 py-1 text-sm text-gray-600 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"},[f[4]||(f[4]=g("option",{value:"",disabled:""},"模型",-1)),(X(!0),ae(Me,null,Yi(u.value,x=>(X(),ae("option",{key:x.id,value:r(x)},ce(s(x)),9,xw))),128))],40,Tw),[[Ms,l.value]]),f[5]||(f[5]=g("svg",{class:"absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 9l-7 7-7-7"})],-1))]),N(t).currentProvider&&N(t).currentModel?(X(),ae("div",Sw,[g("div",{class:"w-1.5 h-1.5 rounded-full bg-green-500",title:`${N(t).currentProvider.name} / ${N(t).currentModel.name}`},null,8,kw)])):De("",!0)]))}}),sn=(e,t)=>{const i=e.__vccOpts||e;for(const[n,o]of t)i[n]=o;return i},Iw=sn(Aw,[["__scopeId","data-v-4a67d1ba"]]),Pw={class:"nav-container atmospheric-bg"},_w={class:"flex items-center justify-between w-full"},Cw={class:"flex items-center gap-2 p-1 bg-white/40 rounded-lg border border-slate-200 shadow-soft"},Ew={class:"ml-2 pl-2 border-l border-slate-200"},Rw={class:"flex items-center gap-2"},Ow=ot({__name:"TopNavigation",setup(e){const t=np(),i=lp(),n=Li(),o=fl(),s=a=>{i.setCurrentModule(a.id),t.currentRoute.value.path!==a.path&&t.push(a.path)},r=async()=>{try{await o.logout(),t.push("/login")}catch(a){console.error("登出失败:",a)}};return(a,l)=>{const c=rr("router-link");return X(),ae("nav",Pw,[g("div",_w,[l[3]||(l[3]=As('<div class="flex items-center gap-3" data-v-8847814f><div class="w-9 h-9 flex items-center justify-center rounded-lg shadow-soft interactive" data-v-8847814f><div class="w-full h-full rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center" data-v-8847814f><span class="font-bold text-white text-sm tracking-tighter" data-v-8847814f>YP</span></div></div><h1 class="text-xl font-bold text-gradient" data-v-8847814f>YPrompt</h1></div>',1)),g("div",Cw,[(X(!0),ae(Me,null,Yi(N(i).modules,h=>(X(),Je(c,{key:h.id,to:h.path,class:Oe(["nav-link interactive",{"nav-link-active":N(i).currentModule===h.id}]),onClick:Qh(u=>s(h),["prevent"])},{default:di(()=>[g("span",null,ce(h.name),1)]),_:2},1032,["to","class","onClick"]))),128)),g("div",Ew,[se(Iw)])]),g("div",Rw,[g("button",{onClick:l[0]||(l[0]=h=>N(n).showSettings=!0),class:"control-btn interactive",title:"设置"},[...l[1]||(l[1]=[g("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"}),g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"})],-1)])]),N(o).isLoggedIn?(X(),ae("button",{key:0,onClick:r,class:"control-btn-danger interactive",title:"登出账号"},[...l[2]||(l[2]=[g("svg",{class:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[g("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})],-1)])])):De("",!0)])])])}}}),Mw=sn(Ow,[["__scopeId","data-v-8847814f"]]),Nw=["title"],Lw={class:"commit-hash"},Dw=ot({__name:"GitCommit",setup(e){const t=xe(()=>"28bb7a8"),i=xe(()=>"2025-12-13 21:41:22 +0800");return(n,o)=>t.value?(X(),ae("div",{key:0,class:"git-commit-badge",title:`Git Commit: ${t.value}${i.value?`
Date: ${i.value}`:""}`},[o[0]||(o[0]=g("svg",{class:"git-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2"},[g("path",{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"})],-1)),g("span",Lw,ce(t.value),1)],8,Nw)):De("",!0)}}),Fw=sn(Dw,[["__scopeId","data-v-4058908a"]]),qw={class:"desktop-layout atmospheric-bg"},$w={class:"main-structure"},Uw={class:"content-area"},Bw={class:"footer-container"},zw=ot({__name:"DesktopLayout",setup(e){return(t,i)=>{const n=rr("router-view");return X(),ae("div",qw,[i[0]||(i[0]=g("div",{class:"background-orb orb-1"},null,-1)),i[1]||(i[1]=g("div",{class:"background-orb orb-2"},null,-1)),i[2]||(i[2]=g("div",{class:"background-orb orb-3"},null,-1)),g("div",$w,[se(Mw),g("div",Uw,[se(n,null,{default:di(({Component:o})=>[se(_s,{name:"fade",mode:"out-in"},{default:di(()=>[(X(),Je($o(o)))]),_:2},1024)]),_:1})]),g("div",Bw,[se(Fw)])])])}}}),jw=sn(zw,[["__scopeId","data-v-fe7e9584"]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jc=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Ww=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,i,n)=>n?n.toUpperCase():i.toLowerCase()),Gw=e=>{const t=Ww(e);return t.charAt(0).toUpperCase()+t.slice(1)},Vw=(...e)=>e.filter((t,i,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===i).join(" ").trim(),Qc=e=>e==="";/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var no={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hw=({name:e,iconNode:t,absoluteStrokeWidth:i,"absolute-stroke-width":n,strokeWidth:o,"stroke-width":s,size:r=no.width,color:a=no.stroke,...l},{slots:c})=>Zi("svg",{...no,...l,width:r,height:r,stroke:a,"stroke-width":Qc(i)||Qc(n)||i===!0||n===!0?Number(o||s||no["stroke-width"])*24/Number(r):o||s||no["stroke-width"],class:Vw("lucide",l.class,...e?[`lucide-${Jc(Gw(e))}-icon`,`lucide-${Jc(e)}`]:["lucide-icon"])},[...t.map(h=>Zi(...h)),...c.default?[c.default()]:[]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const st=(e,t)=>(i,{slots:n,attrs:o})=>Zi(Hw,{...o,...i,iconNode:t,name:e},n);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zc=st("chevron-down",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kw=st("circle-alert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ml=st("circle-check-big",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gl=st("circle-x",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pp=st("clock",[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=st("copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yw=st("eye-off",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jw=st("eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ws=st("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qw=st("loader-circle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zw=st("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xc=st("refresh-cw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xw=st("reply",[["path",{d:"M20 18v-2a4 4 0 0 0-4-4H4",key:"5vmcpk"}],["path",{d:"m9 17-5-5 5-5",key:"nvlc11"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eT=st("send",[["path",{d:"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",key:"1ffxy3"}],["path",{d:"m21.854 2.147-10.94 10.939",key:"12cjpa"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tT=st("settings",[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const iT=st("triangle-alert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fp=st("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),Vo=Go("notification",()=>{const e=oe([]),t=a=>{const l=Date.now().toString(),c={id:l,...a,duration:a.duration??3e3};return e.value.push(c),c.duration&&c.duration>0&&setTimeout(()=>{i(l)},c.duration),l},i=a=>{const l=e.value.findIndex(c=>c.id===a);l>-1&&e.value.splice(l,1)};return{notifications:e,addNotification:t,removeNotification:i,success:(a,l)=>t({message:a,type:"success",duration:l}),error:(a,l)=>t({message:a,type:"error",duration:l}),warning:(a,l)=>t({message:a,type:"warning",duration:l}),info:(a,l)=>t({message:a,type:"info",duration:l})}}),eu=Object.freeze(Object.defineProperty({__proto__:null,useNotificationStore:Vo},Symbol.toStringTag,{value:"Module"})),nT=ot({__name:"SettingsButton",emits:["open"],setup(e){return(t,i)=>null}});class yl{constructor(t,i){Ye(this,"config");Ye(this,"modelId");this.config=t,this.modelId=i}async fetchWithTimeout(t,i,n=3e5,o){const s=o??new AbortController,r=setTimeout(()=>s.abort(),n);try{return await fetch(t,{...i,signal:s.signal})}finally{clearTimeout(r)}}}class oT{static convertAttachments(t){return t.map(i=>i.type==="image"&&["image/png","image/jpeg","image/jpg","image/webp","image/gif"].includes(i.mimeType)?{type:"image_url",image_url:{url:`data:${i.mimeType};base64,${i.data}`}}:null).filter(i=>i!==null)}static isSupported(t){return t.type!=="image"?!1:["image/png","image/jpeg","image/jpg","image/webp","image/gif"].includes(t.mimeType)}static getSupportedTypes(){return["image/png","image/jpeg","image/jpg","image/webp","image/gif"]}}class mp{constructor(){Ye(this,"buffer","");Ye(this,"inThinkTag",!1);Ye(this,"thinkTagContent","")}reset(){this.buffer="",this.inThinkTag=!1,this.thinkTagContent=""}filterChunk(t){this.buffer+=t;let i="";for(;this.buffer.length>0;)if(this.inThinkTag){const n=this.buffer.indexOf("</think>");if(n===-1){this.buffer.length>8&&(this.thinkTagContent+=this.buffer.slice(0,-8),this.buffer=this.buffer.slice(-8));break}else this.thinkTagContent+=this.buffer.slice(0,n),this.buffer=this.buffer.slice(n+8),this.inThinkTag=!1,this.thinkTagContent=""}else{const n=this.buffer.indexOf("<think>");if(n===-1){this.buffer.length>7&&(i+=this.buffer.slice(0,-7),this.buffer=this.buffer.slice(-7));break}else i+=this.buffer.slice(0,n),this.buffer=this.buffer.slice(n+7),this.inThinkTag=!0,this.thinkTagContent=""}return i}finalize(){const t=this.buffer;return this.reset(),t}static removeThinkTags(t){return t.replace(/<think>[\s\S]*?<\/think>/g,"")}}class Pi{static cleanResponse(t){try{let i=t.replace(/<ASSESSMENT>[\s\S]*?<\/ASSESSMENT>/gi,"").trim();const n=i.indexOf("<ASSESSMENT>");if(n!==-1&&(i=i.substring(0,n).trim()),i.includes("ASSESSMENT")||i.includes("CONTEXT:")||i.includes("DECISION:")){const s=[/<ASSE[^>]*$/i,/<\/ASSE[^>]*$/i,/\n\n<ASSE/i,/\nCONTEXT:/i,/\nTASK:/i,/\nFORMAT:/i,/\nQUALITY:/i,/\nTURN_COUNT:/i,/\nDECISION:/i,/\nCONFIDENCE:/i];for(const r of s){const a=i.search(r);if(a!==-1){i=i.substring(0,a).trim();break}}}return i}catch{return t}}static cleanThinkTags(t){return t&&mp.removeThinkTags(t)}}class tu extends yl{async callAPI(t,i,n,o){var h,u,p,d,m,f;if(!this.config.baseUrl)throw new Error("API URL 未配置");let s=this.config.baseUrl.trim();s.includes("/chat/completions")||(s.includes("/v1")?s=s.replace(/\/+$/,"")+"/chat/completions":s=s.replace(/\/+$/,"")+"/v1/chat/completions");const r=this.modelId,l=r.includes("gpt-5")||r.includes("o1")||r.includes("thinking")?6e5:3e5,c=await this.fetchWithTimeout(s,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.config.apiKey}`},body:JSON.stringify({model:r,messages:t.map(x=>{var P;if(this.hasMultimodalContent(x)){const A=this.convertToMultimodalContent(x);return{role:x.role,content:A}}else return{role:x.role,content:typeof x.content=="string"?x.content:((P=x.content[0])==null?void 0:P.text)||""}}),temperature:(n==null?void 0:n.temperature)??1,max_tokens:(n==null?void 0:n.maxTokens)??8192,top_p:(n==null?void 0:n.topP)??.95,...(n==null?void 0:n.frequencyPenalty)!==void 0&&{frequency_penalty:n.frequencyPenalty},...(n==null?void 0:n.presencePenalty)!==void 0&&{presence_penalty:n.presencePenalty},...i&&{stream:!0}})},l,o);if(!c.ok){const x=await c.json().catch(()=>({})),P=new Error(`OpenAI API error: ${c.status} ${c.statusText}`);throw P.error=x,P.status=c.status,P}if(i)return c.body;{const x=await c.json();let P;if(x.choices&&((u=(h=x.choices[0])==null?void 0:h.message)!=null&&u.content))P=x.choices[0].message.content;else if(x.candidates&&((d=(p=x.candidates[0])==null?void 0:p.content)!=null&&d.parts)){const A=x.candidates[0].content.parts;for(const b of A)if(b.text&&!b.thought){P=b.text;break}}else x.content&&typeof x.content=="string"?P=x.content:x.text&&typeof x.text=="string"&&(P=x.text);if(!P||P.trim()==="")throw new Error("API返回空内容或无法解析响应格式");return P=Pi.cleanResponse(P),P=Pi.cleanThinkTags(P),{content:P,finishReason:(f=(m=x.choices)==null?void 0:m[0])==null?void 0:f.finish_reason}}}parseStreamChunk(t){var i,n,o,s,r,a,l,c,h;if(!t.trim()||t.trim()==="[DONE]")return{content:"",done:!0};if(t===": OPENROUTER PROCESSING"||t.startsWith(": ")&&t.toUpperCase().includes("PROCESSING"))return null;try{const u=JSON.parse(t);let p;if((o=(n=(i=u.choices)==null?void 0:i[0])==null?void 0:n.delta)!=null&&o.content)p=u.choices[0].delta.content;else if((a=(r=(s=u.candidates)==null?void 0:s[0])==null?void 0:r.content)!=null&&a.parts){const f=u.candidates[0].content.parts;for(const x of f)if(x.text&&!x.thought){p=x.text;break}}else(l=u.delta)!=null&&l.text?p=u.delta.text:u.text&&(p=u.text);const m=!!(((h=(c=u.choices)==null?void 0:c[0])==null?void 0:h.finish_reason)||u.done);return{content:p||"",done:m}}catch{return null}}hasMultimodalContent(t){return!!(t.attachments&&t.attachments.length>0)}convertToMultimodalContent(t){const i=[];if(typeof t.content=="string"&&t.content.trim()&&i.push({type:"text",text:t.content}),t.attachments&&t.attachments.length>0){const n=oT.convertAttachments(t.attachments);i.push(...n)}return i}}class sT{static convertAttachments(t){return t.map(i=>i.type==="image"?{type:"image",source:{type:"base64",media_type:i.mimeType,data:i.data}}:i.type==="document"&&["application/pdf","text/plain","text/markdown","application/json","text/html","text/csv"].includes(i.mimeType)?{type:"image",source:{type:"base64",media_type:i.mimeType,data:i.data}}:null).filter(i=>i!==null)}static isSupported(t){return t.type==="image"?!0:t.type==="document"?["application/pdf","text/plain","text/markdown","application/json","text/html","text/csv"].includes(t.mimeType):!1}static getSupportedTypes(){return["image/png","image/jpeg","image/jpg","image/webp","image/gif","application/pdf","text/plain","text/markdown","application/json","text/html","text/csv"]}}class rT extends yl{async callAPI(t,i,n,o){var p;const s=this.extractSystemMessageText(t),r=t.filter(d=>d.role!=="system");if(!this.config.baseUrl)throw new Error("API URL 未配置");let a=this.config.baseUrl.trim();a.includes("/v1/messages")||(a=a.replace(/\/+$/,"")+"/v1/messages");const l=this.modelId,h=l.includes("claude-3")||l.includes("thinking")||l.includes("sonnet")?6e5:3e5,u=await this.fetchWithTimeout(a,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.config.apiKey,"anthropic-version":"2023-06-01","anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:l,max_tokens:(n==null?void 0:n.maxTokens)??8192,temperature:(n==null?void 0:n.temperature)??1,top_p:(n==null?void 0:n.topP)??.95,...(n==null?void 0:n.topK)!==void 0&&n.topK>0&&{top_k:n.topK},system:s,messages:r.map(d=>{var m;return{role:d.role==="assistant"?"assistant":"user",content:this.hasMultimodalContent(d)?this.convertToMultimodalContent(d):typeof d.content=="string"?d.content:Array.isArray(d.content)?((m=d.content[0])==null?void 0:m.text)||"":String(d.content)}}),...i&&{stream:!0}})},h,o);if(!u.ok){const d=await u.json().catch(()=>({})),m=new Error(`Anthropic API error: ${u.status} ${u.statusText}`);throw m.error=d,m.status=u.status,m}if(i)return u.body;{const d=await u.json(),m=(p=d.content[0])==null?void 0:p.text;if(!m||m.trim()==="")throw new Error("API返回空内容");return{content:Pi.cleanThinkTags(m),finishReason:d.stop_reason}}}parseStreamChunk(t){var i;if(!t.trim())return null;try{const n=JSON.parse(t);if(n.type==="content_block_delta"){const o=(i=n.delta)==null?void 0:i.text;if(o)return{content:o,done:!1}}else if(n.type==="message_stop")return{content:"",done:!0};return null}catch{return null}}extractSystemMessageText(t){const i=t.find(n=>n.role==="system");return i?typeof i.content=="string"?i.content:Array.isArray(i.content)?i.content.map(n=>n.text||"").join(" "):"":""}hasMultimodalContent(t){return!!(t.attachments&&t.attachments.length>0)}convertToMultimodalContent(t){const i=[];if(typeof t.content=="string"&&t.content.trim()&&i.push({type:"text",text:t.content}),t.attachments&&t.attachments.length>0){const n=sT.convertAttachments(t.attachments);i.push(...n)}return i}}class iu{static convertAttachments(t){return t.map(i=>i.type==="image"?{inline_data:{mime_type:i.mimeType,data:i.data}}:i.type==="document"?["text/plain","text/html","text/css","text/javascript","application/json","text/markdown","application/pdf","text/csv","text/xml","application/xml","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.ms-excel","application/vnd.ms-powerpoint","application/rtf"].includes(i.mimeType)?{inline_data:{mime_type:i.mimeType,data:i.data}}:null:i.type==="audio"?["audio/wav","audio/mp3","audio/mpeg","audio/aac","audio/ogg","audio/flac"].includes(i.mimeType)?{inline_data:{mime_type:i.mimeType,data:i.data}}:null:i.type==="video"&&["video/mp4","video/mpeg","video/mov","video/avi","video/x-flv","video/mpg","video/webm","video/wmv"].includes(i.mimeType)?{inline_data:{mime_type:i.mimeType,data:i.data}}:null).filter(Boolean)}static isSupported(t){return t.type==="image"?!0:t.type==="document"?["text/plain","text/html","text/css","text/javascript","application/json","text/markdown","application/pdf","text/csv","text/xml","application/xml","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.ms-excel","application/vnd.ms-powerpoint","application/rtf"].includes(t.mimeType):t.type==="audio"?["audio/wav","audio/mp3","audio/mpeg","audio/aac","audio/ogg","audio/flac"].includes(t.mimeType):t.type==="video"?["video/mp4","video/mpeg","video/mov","video/avi","video/x-flv","video/mpg","video/webm","video/wmv"].includes(t.mimeType):!1}static getSupportedTypes(){return["image/png","image/jpeg","image/jpg","image/webp","image/gif","image/bmp","image/tiff","image/svg+xml","image/heic","text/plain","text/html","text/css","text/javascript","application/json","text/markdown","application/pdf","text/csv","text/xml","application/xml","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","application/vnd.openxmlformats-officedocument.presentationml.presentation","application/msword","application/vnd.ms-excel","application/vnd.ms-powerpoint","application/rtf","audio/wav","audio/mp3","audio/mpeg","audio/aac","audio/ogg","audio/flac","video/mp4","video/mpeg","video/mov","video/avi","video/x-flv","video/mpg","video/webm","video/wmv"]}}class aT extends yl{async callAPI(t,i,n,o){var d,m;const s=this.extractSystemMessageText(t),l={contents:t.filter(f=>f.role!=="system").map(f=>{var P;const x=f.role==="assistant"?"model":"user";if(this.hasMultimodalContent(f)){const A=this.convertToMultimodalContent(f);return{role:x,parts:A}}else{const A=typeof f.content=="string"?f.content:((P=f.content[0])==null?void 0:P.text)||"";return{role:x,parts:[{text:A}]}}}),generationConfig:{temperature:(n==null?void 0:n.temperature)??1,maxOutputTokens:(n==null?void 0:n.maxTokens)??8192,topP:(n==null?void 0:n.topP)??.95,...(n==null?void 0:n.topK)!==void 0&&n.topK>0&&{topK:n.topK}}};if(s&&(l.system_instruction={parts:[{text:s}]}),!this.config.baseUrl)throw new Error("API URL 未配置");let c=this.config.baseUrl.trim();c.endsWith("/v1beta")||(c.includes("/models/")&&(c=c.split("/models/")[0]),c.endsWith("/v1beta")||(c=c.replace(/\/+$/,"")+"/v1beta"));const h=this.modelId;if(i){c=`${c}/models/${h}:streamGenerateContent`;const f=new URL(c);f.searchParams.set("alt","sse"),c=f.toString()}else c=`${c}/models/${h}:generateContent`;const p=await this.fetchWithTimeout(c,{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":this.config.apiKey},body:JSON.stringify(l)},3e5,o);if(!p.ok){const f=await p.json().catch(()=>({})),x=new Error(`Google Gemini API error: ${p.status} ${p.statusText}`);throw x.error=f,x.status=p.status,x}if(i)return p.body;{const x=(d=(await p.json()).candidates)==null?void 0:d[0];if(!((m=x==null?void 0:x.content)!=null&&m.parts))throw new Error("API返回数据结构异常");let P="";for(const b of x.content.parts)if(b.text&&!b.thought){P=b.text;break}if(!P||P.trim()==="")throw new Error("API返回空内容");return{content:Pi.cleanThinkTags(P),finishReason:x.finishReason}}}parseStreamChunk(t){var i,n;try{const s=(i=JSON.parse(t).candidates)==null?void 0:i[0];if((n=s==null?void 0:s.content)!=null&&n.parts){for(const r of s.content.parts)if(r.text&&!r.thought)return{content:r.text,done:!1}}return s!=null&&s.finishReason?{content:"",done:!0}:null}catch{return null}}extractSystemMessageText(t){const i=t.find(n=>n.role==="system");return i?typeof i.content=="string"?i.content:Array.isArray(i.content)?i.content.map(n=>n.text||"").join(" "):"":""}hasMultimodalContent(t){return!!(t.attachments&&t.attachments.length>0)}convertToMultimodalContent(t){const i=[];if(typeof t.content=="string"&&t.content.trim()&&i.push({text:t.content}),t.attachments&&t.attachments.length>0){const n=iu.convertAttachments(t.attachments);i.push(...n);const o=t.attachments.length;if(n.length<o){const r=t.attachments.filter(a=>!iu.isSupported(a));if(r.length>0){const l=`[用户上传了以下附件，但当前无法直接处理: ${r.map(c=>`${c.name} (${c.type}, ${(c.size/1024).toFixed(1)}KB)`).join(", ")}。用户询问关于这些附件的问题。]`;i.push({text:l})}}}return i}}class lT{isValidSSELine(t){if(!t||typeof t!="string")return!1;const i=t.trim();if(!i.startsWith("data: "))return!1;const n=i.slice(6).trim();return!n||n==="[DONE]"?!0:!(n===": OPENROUTER PROCESSING"||n.startsWith(": ")&&n.toUpperCase().includes("PROCESSING"))}parseDataFromLine(t){if(!this.isValidSSELine(t))return null;const i=t.slice(6).trim();return!i||i==="[DONE]"?null:i}}class cT{constructor(){Ye(this,"sseParser");Ye(this,"streamFilter");this.sseParser=new lT,this.streamFilter=new mp}reset(){this.streamFilter.reset()}async*processStream(t,i){const n=t.getReader(),o=new TextDecoder;try{for(;;){const{done:s,value:r}=await n.read();if(s){const c=this.streamFilter.finalize();c&&(yield c);break}const l=o.decode(r,{stream:!0}).split(`
`);for(const c of l){const h=this.sseParser.parseDataFromLine(c);if(!h)continue;const u=i(h);if(!u||!u.content)continue;const p=this.streamFilter.filterChunk(u.content);if(p&&(yield p),u.done){const d=this.streamFilter.finalize();d&&(yield d);return}}}}finally{n.releaseLock()}}}class uT{parseAPIError(t,i){try{let n="",o="";t.message&&typeof t.message=="string"?n=t.message:t.error&&t.error.message?(n=t.error.message,o=t.error.code||t.error.type||""):typeof t=="string"?n=t:n=JSON.stringify(t);const s=/Unsupported MIME type: ([^(]+)/i,r=n.match(s);return r?this.parseMimeTypeError(r[1].trim(),i):this.isAttachmentError(n)?"当前模型不支持附件功能。请移除附件或切换到支持多模态的模型（如GPT-4 Vision、Claude 3.5+或Gemini）。":this.isModelError(n)?"模型不可用或配置错误。请检查模型名称和API配置。":this.isAuthError(n,o)?"API密钥无效或未授权。请检查您的API密钥配置。":this.isRateLimitError(n,o)?"API调用频率过高或配额已用完。请稍后重试或检查您的API账户状态。":this.isNetworkError(n)?"网络连接错误。请检查网络连接后重试。":`API请求失败：${n}`}catch{return"API请求失败，请检查网络连接和配置后重试。"}}parseMimeTypeError(t,i){const n=this.getFileTypeHint(t),o=this.getModelSuggestion(i);return`${n}格式不受当前模型支持。

${o}，或移除附件后重新发送。`}getFileTypeHint(t){return t.startsWith("application/vnd.openxmlformats-officedocument")?t.includes("wordprocessingml")?"Word文档(.docx)":t.includes("spreadsheetml")?"Excel表格(.xlsx)":t.includes("presentationml")?"PowerPoint演示文稿(.pptx)":"Office文档":t.startsWith("application/msword")?"Word文档(.doc)":t.startsWith("application/vnd.ms-excel")?"Excel表格(.xls)":t.startsWith("application/vnd.ms-powerpoint")?"PowerPoint演示文稿(.ppt)":t.startsWith("application/pdf")?"PDF文档":t.startsWith("text/")?"文本文件":t.startsWith("image/")?"图片文件":t.startsWith("audio/")?"音频文件":t.startsWith("video/")?"视频文件":"该文件"}getModelSuggestion(t){switch(t){case"openai":return"当前OpenAI模型主要支持图片格式。建议切换到支持更多文件类型的模型（如Gemini）";case"anthropic":return"当前Claude模型支持图片和PDF文档格式。建议切换到支持更多文件类型的模型（如Gemini），或使用支持的格式";case"google":return"当前Gemini模型不支持此文件格式。建议使用支持的格式（图片、PDF、Office文档等）";default:return"当前模型不支持此文件格式。建议切换到支持多模态的模型"}}isAttachmentError(t){const i=t.toLowerCase();return i.includes("multimodal")||i.includes("attachment")||i.includes("file")||i.includes("image")}isModelError(t){const i=t.toLowerCase();return i.includes("model")&&(i.includes("not found")||i.includes("invalid"))}isAuthError(t,i){const n=t.toLowerCase();return n.includes("api key")||n.includes("unauthorized")||n.includes("authentication")||i==="401"}isRateLimitError(t,i){const n=t.toLowerCase();return n.includes("quota")||n.includes("limit")||n.includes("rate")||i==="429"}isNetworkError(t){const i=t.toLowerCase();return i.includes("network")||i.includes("timeout")||i.includes("connection")}}class gp{static parseError(t,i){return this.errorParser.parseAPIError(t,i)}static handleNetworkError(t){return t.name==="AbortError"?"请求已被取消":t.name==="TimeoutError"?"请求超时，请检查网络连接后重试":"网络连接错误，请检查网络连接后重试"}static isRetriableError(t){var o,s;const i=((o=t==null?void 0:t.message)==null?void 0:o.toLowerCase())||"",n=((s=t==null?void 0:t.error)==null?void 0:s.code)||(t==null?void 0:t.code)||"";return!!(i.includes("network")||i.includes("timeout")||i.includes("connection")||n==="429"||i.includes("rate limit")||n>="500"&&n<"600")}}Ye(gp,"errorParser",new uT);class hT{static async fetchWithTimeout(t,i,n=3e4){const o=new AbortController,s=setTimeout(()=>o.abort(),n);try{return await fetch(t,{...i,signal:o.signal})}finally{clearTimeout(s)}}static async getModels(t,i){switch(i||t.type){case"openai":return await this.getOpenAIModels(t);case"anthropic":return await this.getAnthropicModels();case"google":return await this.getGeminiModels(t);case"custom":return await this.getCustomProviderModels(t,i);default:return await this.getOpenAIModels(t)}}static async getOpenAIModels(t){if(!t.baseUrl)throw new Error("API URL 未配置");const i=this.buildOpenAIModelsUrl(t.baseUrl),n=await this.fetchWithTimeout(i,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`,"Content-Type":"application/json"}});if(!n.ok)throw new Error(`OpenAI Models API error: ${n.status} ${n.statusText}`);const o=await n.json();if(o.data&&Array.isArray(o.data))return o.data.map(s=>s.id).filter(s=>s&&typeof s=="string").sort();throw new Error("OpenAI API返回的模型列表格式不正确")}static async getGeminiModels(t){if(!t.baseUrl)throw new Error("API URL 未配置");const i=this.buildGeminiModelsUrl(t.baseUrl),n=new URL(i);n.searchParams.set("key",t.apiKey);const o=await this.fetchWithTimeout(n.toString(),{method:"GET",headers:{"Content-Type":"application/json"}});if(!o.ok)throw new Error(`Gemini Models API error: ${o.status} ${o.statusText}`);const s=await o.json();if(s.models&&Array.isArray(s.models))return s.models.map(r=>r.name&&typeof r.name=="string"?r.name.replace(/^models\//,""):r.id||r.name).filter(r=>r&&typeof r=="string").sort();throw new Error("Gemini API返回的模型列表格式不正确")}static async getAnthropicModels(){return["claude-3-5-sonnet-20241022","claude-3-5-haiku-20241022","claude-3-opus-20240229","claude-3-sonnet-20240229","claude-3-haiku-20240307"].sort()}static async getCustomProviderModels(t,i){var o;if(i)switch(i){case"openai":return await this.getOpenAIModels(t);case"anthropic":return await this.getAnthropicModels();case"google":return await this.getGeminiModels(t)}const n=((o=t.baseUrl)==null?void 0:o.toLowerCase())||"";if(n.includes("googleapis.com")||n.includes("generativelanguage")||n.includes("/v1beta")||n.includes("gemini"))return await this.getGeminiModels(t);if(n.includes("anthropic.com")||n.includes("claude"))return await this.getAnthropicModels();try{return await this.getOpenAIModels(t)}catch{try{return await this.getGeminiModels(t)}catch{return await this.getGenericModels(t)}}}static async getGenericModels(t){if(!t.baseUrl)throw new Error("API URL 未配置");let i=t.baseUrl.trim();i.includes("/models")||(i.includes("/v1")?i=i.replace(/\/+$/,"")+"/models":i=i.replace(/\/+$/,"")+"/v1/models");const n=await this.fetchWithTimeout(i,{method:"GET",headers:{Authorization:`Bearer ${t.apiKey}`,"Content-Type":"application/json"}});if(!n.ok)throw new Error(`Models API error: ${n.status} ${n.statusText}`);const o=await n.json();let s=[];if(o.data&&Array.isArray(o.data)?s=o.data.map(r=>r.id).filter(r=>r&&typeof r=="string"):o.models&&Array.isArray(o.models)?s=o.models.map(r=>r.name&&typeof r.name=="string"?r.name.replace(/^models\//,""):r.id||r.name).filter(r=>r&&typeof r=="string"):Array.isArray(o)&&(s=o.map(r=>typeof r=="string"?r:r.id?r.id:r.name?r.name.replace(/^models\//,""):null).filter(r=>r&&typeof r=="string")),s.length>0)return s.sort();throw new Error("无效的模型列表响应格式")}static buildOpenAIModelsUrl(t){if(!t)throw new Error("API URL 未配置");let i=t.trim();return i.endsWith("/models")||i.includes("/models?")||i.includes("/models/")?i:i.includes("/v1")?i.replace(/\/+$/,"")+"/models":i.replace(/\/+$/,"")+"/v1/models"}static buildGeminiModelsUrl(t){if(!t)throw new Error("API URL 未配置");let i=t.trim();return i.includes("/models")?i:i.includes("/v1beta")?i.replace(/\/+$/,"")+"/models":i.replace(/\/+$/,"")+"/v1beta/models"}}const Bi=class Bi{constructor(){Ye(this,"providers",new Map);Ye(this,"streamProcessor");Ye(this,"onStreamUpdate");Ye(this,"abortController");this.streamProcessor=new cT}static getInstance(){return Bi.instance||(Bi.instance=new Bi),Bi.instance}getProvider(t,i){const n=`${t.type}-${t.baseUrl}-${i}`;if(this.providers.has(n))return this.providers.get(n);const o=t.models.find(a=>a.id===i),s=(o==null?void 0:o.apiType)||t.type;let r;switch(s){case"openai":r=new tu(t,i);break;case"anthropic":r=new rT(t,i);break;case"google":r=new aT(t,i);break;default:r=new tu(t,i)}return this.providers.set(n,r),r}convertMessagesToAI(t){return t.map(i=>"role"in i?{role:i.role,content:i.content,attachments:i.attachments}:{role:i.type==="ai"?"assistant":"user",content:i.content,attachments:i.attachments})}async callAI(t,i,n,o=!1,s){const r=i.models.find(u=>u.id===n),a=(r==null?void 0:r.apiType)||i.type,l=new AbortController;this.abortController=l;const c=r==null?void 0:r.params,h=c?{temperature:c.temperature,maxTokens:c.maxTokens,topP:c.topP,frequencyPenalty:c.frequencyPenalty,presencePenalty:c.presencePenalty,topK:c.topK}:void 0;try{const u=this.convertMessagesToAI(t),p=this.getProvider(i,n);if(o)return await this.callWithStream(p,u,h,s,l);{const d=await p.callAPI(u,!1,h,l);if(typeof d!="object"||!("content"in d))throw new Error("Expected AIResponse object");let m=d.content;return m=Pi.cleanResponse(m),m=Pi.cleanThinkTags(m),m}}catch(u){if((u==null?void 0:u.name)==="AbortError")throw u;const p=gp.parseError(u,a);throw new Error(p)}finally{this.abortController===l&&(this.abortController=void 0)}}async callWithStream(t,i,n,o,s){const r=o||this.onStreamUpdate,a=!!this.onStreamUpdate;try{const l=await t.callAPI(i,!0,n,s);if(typeof l=="string"||!("getReader"in l))throw new Error("Expected ReadableStream for streaming");let c="";this.streamProcessor.reset();const h=t.parseStreamChunk.bind(t);for await(const p of this.streamProcessor.processStream(l,h))c+=p,r&&r(p);if(!c||c.trim()==="")throw new Error("API返回空内容");let u=Pi.cleanResponse(c);return u=Pi.cleanThinkTags(u),u}finally{a&&this.clearStreamUpdateCallback()}}setStreamUpdateCallback(t){this.onStreamUpdate=t}clearStreamUpdateCallback(){this.onStreamUpdate=void 0}abortCurrentRequest(){this.abortController&&(this.abortController.abort(),this.abortController=void 0),this.clearStreamUpdateCallback()}async getAvailableModels(t,i){return await hT.getModels(t,i)}async testConnection(t,i){try{const n=[{type:"user",content:"test",timestamp:new Date().toISOString()}];return await this.callAI(n,t,i,!1),!0}catch{return!1}}};Ye(Bi,"instance");let ga=Bi;const dT={key:0,class:"fixed inset-0 z-[10000] flex items-end justify-end pointer-events-none"},pT={class:"relative flex items-center justify-between px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 backdrop-blur-sm rounded-t-3xl"},fT={class:"relative flex items-center gap-3 z-10"},mT={class:"flex-1 overflow-y-auto px-6 py-5 space-y-4 bg-gradient-to-b from-white/95 to-white/90"},gT={class:"space-y-2"},yT={class:"text-sm font-semibold text-gray-700 flex items-center gap-2"},vT={class:"bg-gray-50 rounded-lg p-3 space-y-1 text-sm"},bT={class:"flex justify-between"},wT={class:"text-gray-900 font-medium"},TT={class:"flex justify-between"},xT={class:"text-gray-900 font-mono text-xs"},ST={class:"flex justify-between"},kT={class:"text-gray-900"},AT={class:"flex justify-between"},IT={class:"text-gray-900"},PT={class:"space-y-2"},_T={class:"text-sm font-semibold text-gray-700 flex items-center gap-2"},CT={class:"bg-blue-50 rounded-lg border border-blue-200"},ET={class:"px-4 py-2 border-b border-blue-200 bg-blue-100/50"},RT={class:"flex items-center justify-between"},OT={class:"px-4 py-2"},MT={class:"text-xs text-blue-900 break-all"},NT={class:"bg-blue-50 rounded-lg border border-blue-200"},LT={class:"px-4 py-2 border-b border-blue-200 bg-blue-100/50"},DT={class:"flex items-center justify-between"},FT={class:"px-4 py-2 text-xs text-blue-900 overflow-x-auto"},qT={class:"bg-blue-50 rounded-lg border border-blue-200"},$T={class:"px-4 py-2 border-b border-blue-200 bg-blue-100/50"},UT={class:"flex items-center justify-between"},BT={class:"px-4 py-2 text-xs text-blue-900 overflow-x-auto max-h-60 overflow-y-auto"},zT={class:"space-y-2"},jT={class:"text-sm font-semibold text-gray-700 flex items-center gap-2"},WT={class:"bg-green-50 rounded-lg border border-green-200"},GT={class:"px-4 py-2 border-b border-green-200 bg-green-100/50"},VT={class:"flex items-center justify-between"},HT={class:"bg-green-50 rounded-lg border border-green-200"},KT={class:"px-4 py-2 border-b border-green-200 bg-green-100/50"},YT={class:"flex items-center justify-between"},JT={key:0,class:"px-4 py-2 text-xs text-green-900 overflow-x-auto"},QT={key:1,class:"px-4 py-2 text-xs text-green-700"},ZT={class:"bg-green-50 rounded-lg border border-green-200"},XT={class:"px-4 py-2 border-b border-green-200 bg-green-100/50"},e0={class:"flex items-center justify-between"},t0={key:0,class:"px-4 py-2 text-xs text-green-900 overflow-x-auto max-h-60 overflow-y-auto"},i0={key:1,class:"px-4 py-2 text-xs text-red-700 bg-red-50 rounded"},n0={key:2,class:"px-4 py-2 text-xs text-green-700"},o0={class:"px-6 py-4 border-t border-gray-200/50 bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm rounded-b-3xl flex items-center justify-center"},s0={class:"flex items-center gap-2 text-xs text-gray-500"},r0={key:0,class:"absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white text-xs flex items-center justify-center font-bold shadow-lg border-2 border-white/50 backdrop-blur-sm",style:{"box-shadow":"0 4px 12px -2px rgba(239, 68, 68, 0.5)"}},a0=ot({__name:"TestDetailDialog",props:{visible:{type:Boolean,default:!1},providerName:{},modelId:{},status:{default:"testing"},requestInfo:{},responseInfo:{},errorMessage:{},testTime:{default:()=>new Date().toLocaleString("zh-CN")},duration:{default:0}},emits:["update:visible","close"],setup(e,{emit:t}){const i=e,n=t,o=Vo(),s=oe(!1),r=oe(5),a=oe(null),l=oe(null);let c=null,h=null;St(()=>i.visible,w=>{w&&(s.value=!1,r.value=5),u()});const u=()=>{c&&(clearInterval(c),c=null),h&&(clearTimeout(h),h=null)},p=()=>{s.value&&(s.value=!1,u(),r.value=5),h&&(clearTimeout(h),h=null)},d=()=>{h=setTimeout(()=>{s.value||(s.value=!0,f())},300)},m=()=>{s.value=!1,u(),r.value=5},f=()=>{u(),r.value=5,c=setInterval(()=>{r.value--,r.value<=0&&x()},1e3)},x=()=>{u(),n("update:visible",!1),n("close")},P=w=>{switch(w){case"success":return ml;case"error":return gl;case"timeout":return pp;default:return Qw}},A=w=>{switch(w){case"success":return"bg-green-500";case"error":return"bg-red-500";case"timeout":return"bg-yellow-500";default:return"bg-gray-500"}},b=()=>"text-white";qo(()=>{u()});const S=w=>{try{return JSON.stringify(w,null,2)}catch{return String(w)}},_=async w=>{try{await navigator.clipboard.writeText(w),o.success("已复制到剪贴板",1500)}catch{o.error("复制失败",2e3)}},C=w=>{switch(w){case"success":return"bg-green-100 text-green-700";case"error":return"bg-red-100 text-red-700";case"timeout":return"bg-yellow-100 text-yellow-700";default:return"bg-gray-100 text-gray-700"}},R=w=>{switch(w){case"success":return"成功";case"error":return"失败";case"timeout":return"超时";default:return"测试中"}};return(w,y)=>(X(),Je(Oa,{to:"body"},[se(_s,{name:"fade"},{default:di(()=>{var E,O,k,D,j,G,W,J,K;return[w.visible&&!s.value?(X(),ae("div",dT,[y[23]||(y[23]=g("div",{class:"absolute inset-0 bg-black/20 backdrop-blur-sm"},null,-1)),g("div",{ref_key:"dialogRef",ref:a,onMouseenter:p,onMouseleave:d,class:Oe(["relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col pointer-events-auto transform transition-all duration-300 ease-out border border-white/20",[w.visible?"translate-y-0 opacity-100":"translate-y-full opacity-0","hover:shadow-3xl hover:scale-[1.01]"]]),style:{"box-shadow":"0 20px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset"}},[g("div",pT,[y[6]||(y[6]=g("div",{class:"absolute inset-0 bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-purple-400/10 rounded-t-3xl"},null,-1)),g("div",fT,[g("div",{class:Oe(["w-3 h-3 rounded-full shadow-lg",w.status==="success"?"bg-green-500 shadow-green-500/50":w.status==="error"?"bg-red-500 shadow-red-500/50":w.status==="timeout"?"bg-yellow-500 shadow-yellow-500/50":"bg-gray-400 shadow-gray-400/50"])},null,2),y[5]||(y[5]=g("h3",{class:"text-lg font-semibold text-gray-900"},"测试详情",-1)),g("span",{class:Oe(["px-2 py-1 text-xs font-medium rounded-full shadow-sm",C(w.status)])},ce(R(w.status)),3)]),y[7]||(y[7]=g("div",{class:"relative flex items-center gap-2 text-xs text-gray-500 z-10"},[g("span",{class:"hidden sm:inline"},"移出自动缩小"),g("div",{class:"w-1 h-1 rounded-full bg-gray-400 animate-pulse"})],-1))]),g("div",mT,[g("div",gT,[g("h4",yT,[se(N(Ws),{class:"w-4 h-4"}),y[8]||(y[8]=Ii(" 基本信息 ",-1))]),g("div",vT,[g("div",bT,[y[9]||(y[9]=g("span",{class:"text-gray-600"},"提供商:",-1)),g("span",wT,ce(w.providerName),1)]),g("div",TT,[y[10]||(y[10]=g("span",{class:"text-gray-600"},"模型ID:",-1)),g("span",xT,ce(w.modelId),1)]),g("div",ST,[y[11]||(y[11]=g("span",{class:"text-gray-600"},"测试时间:",-1)),g("span",kT,ce(w.testTime),1)]),g("div",AT,[y[12]||(y[12]=g("span",{class:"text-gray-600"},"耗时:",-1)),g("span",IT,ce(w.duration)+"ms",1)])])]),g("div",PT,[g("h4",_T,[se(N(eT),{class:"w-4 h-4"}),y[13]||(y[13]=Ii(" 请求信息 ",-1))]),g("div",CT,[g("div",ET,[g("div",RT,[y[14]||(y[14]=g("span",{class:"text-xs font-medium text-blue-800"},"URL",-1)),g("button",{onClick:y[0]||(y[0]=ye=>{var Ce;return _(((Ce=w.requestInfo)==null?void 0:Ce.url)||"")}),class:"text-blue-600 hover:text-blue-800 text-xs",title:"复制URL"},[se(N(oo),{class:"w-3.5 h-3.5"})])])]),g("div",OT,[g("code",MT,ce(((E=w.requestInfo)==null?void 0:E.url)||"N/A"),1)])]),g("div",NT,[g("div",LT,[g("div",DT,[y[15]||(y[15]=g("span",{class:"text-xs font-medium text-blue-800"},"请求头",-1)),g("button",{onClick:y[1]||(y[1]=ye=>{var Ce;return _(JSON.stringify(((Ce=w.requestInfo)==null?void 0:Ce.headers)||{},null,2))}),class:"text-blue-600 hover:text-blue-800 text-xs",title:"复制请求头"},[se(N(oo),{class:"w-3.5 h-3.5"})])])]),g("pre",FT,[g("code",null,ce(S(((O=w.requestInfo)==null?void 0:O.headers)||{})),1)])]),g("div",qT,[g("div",$T,[g("div",UT,[y[16]||(y[16]=g("span",{class:"text-xs font-medium text-blue-800"},"请求体",-1)),g("button",{onClick:y[2]||(y[2]=ye=>{var Ce;return _(JSON.stringify(((Ce=w.requestInfo)==null?void 0:Ce.body)||{},null,2))}),class:"text-blue-600 hover:text-blue-800 text-xs",title:"复制请求体"},[se(N(oo),{class:"w-3.5 h-3.5"})])])]),g("pre",BT,[g("code",null,ce(S(((k=w.requestInfo)==null?void 0:k.body)||{})),1)])])]),g("div",zT,[g("h4",jT,[se(N(Xw),{class:"w-4 h-4"}),y[17]||(y[17]=Ii(" 响应信息 ",-1))]),g("div",WT,[g("div",GT,[g("div",VT,[y[18]||(y[18]=g("span",{class:"text-xs font-medium text-green-800"},"状态码",-1)),g("span",{class:Oe(["px-2 py-0.5 text-xs font-medium rounded",(D=w.responseInfo)!=null&&D.status?w.responseInfo.status>=200&&w.responseInfo.status<300?"bg-green-200 text-green-800":"bg-red-200 text-red-800":"bg-gray-200 text-gray-800"])},ce(((j=w.responseInfo)==null?void 0:j.status)||"N/A"),3)])])]),g("div",HT,[g("div",KT,[g("div",YT,[y[19]||(y[19]=g("span",{class:"text-xs font-medium text-green-800"},"响应头",-1)),(G=w.responseInfo)!=null&&G.headers?(X(),ae("button",{key:0,onClick:y[3]||(y[3]=ye=>_(JSON.stringify(w.responseInfo.headers||{},null,2))),class:"text-green-600 hover:text-green-800 text-xs",title:"复制响应头"},[se(N(oo),{class:"w-3.5 h-3.5"})])):De("",!0)])]),(W=w.responseInfo)!=null&&W.headers?(X(),ae("pre",JT,[g("code",null,ce(S(w.responseInfo.headers)),1)])):(X(),ae("div",QT,"无响应头信息"))]),g("div",ZT,[g("div",XT,[g("div",e0,[y[20]||(y[20]=g("span",{class:"text-xs font-medium text-green-800"},"响应体",-1)),(J=w.responseInfo)!=null&&J.body?(X(),ae("button",{key:0,onClick:y[4]||(y[4]=ye=>_(JSON.stringify(w.responseInfo.body||{},null,2))),class:"text-green-600 hover:text-green-800 text-xs",title:"复制响应体"},[se(N(oo),{class:"w-3.5 h-3.5"})])):De("",!0)])]),(K=w.responseInfo)!=null&&K.body?(X(),ae("pre",t0,[g("code",null,ce(S(w.responseInfo.body)),1)])):w.errorMessage?(X(),ae("div",i0,[y[21]||(y[21]=g("strong",null,"错误信息:",-1)),Ii(" "+ce(w.errorMessage),1)])):(X(),ae("div",n0,"无响应体信息"))])])]),g("div",o0,[g("div",s0,[se(N(Ws),{class:"w-3.5 h-3.5"}),y[22]||(y[22]=g("span",null,"鼠标移出弹窗将自动缩小，5秒后自动关闭",-1))])])],34)])):De("",!0)]}),_:1}),se(_s,{name:"fade"},{default:di(()=>[w.visible&&s.value?(X(),ae("div",{key:0,ref_key:"minimizedRef",ref:l,onMouseenter:p,onClick:m,class:"fixed bottom-4 right-4 z-[10000] pointer-events-auto cursor-pointer group"},[g("div",{class:Oe(["w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-xl border border-white/30","hover:scale-110 hover:shadow-3xl",A(w.status)]),style:{"box-shadow":"0 10px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2) inset"}},[(X(),Je($o(P(w.status)),{class:Oe(["w-7 h-7 transition-transform duration-300 group-hover:scale-110",b()])},null,8,["class"]))],2),r.value>0?(X(),ae("div",r0,ce(r.value),1)):De("",!0),y[24]||(y[24]=g("div",{class:"absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none"},[Ii(" 点击展开详情 "),g("div",{class:"absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/90"})],-1))],544)):De("",!0)]),_:1})]))}}),l0=sn(a0,[["__scopeId","data-v-2929559c"]]),c0={class:"mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"},u0={class:"flex items-start space-x-3"},h0={class:"mb-6"},d0={class:"flex items-center justify-between mb-4"},p0={class:"flex items-center space-x-4"},f0={key:0,class:"text-sm text-gray-500"},m0=["disabled"],g0={key:0,class:"text-center py-12 text-gray-500"},y0={key:1,class:"space-y-4"},v0={class:"flex items-start justify-between mb-4"},b0={class:"flex items-center space-x-3"},w0=["title"],T0={class:"text-base font-semibold text-gray-900"},x0={class:"flex items-center space-x-2 mt-1"},S0={key:0,class:"text-xs text-red-600"},k0={class:"space-y-3 mb-4 pl-6"},A0={class:"grid grid-cols-1 gap-2 text-sm"},I0={class:"flex items-start"},P0={class:"flex-1 flex items-center space-x-2"},_0={class:"text-gray-900 font-mono text-xs break-all"},C0=["title"],E0={key:0,class:"flex items-start"},R0={class:"text-gray-700 font-mono text-xs break-all"},O0={class:"pl-6 border-l-2 border-gray-200"},M0={class:"text-sm font-medium text-gray-700 mb-3"},N0={key:0,class:"text-sm text-gray-500 py-2"},L0={key:1,class:"space-y-2"},D0={class:"flex items-center space-x-3 flex-1"},F0={class:"flex-1 min-w-0"},q0={class:"font-medium text-sm text-gray-900"},$0={class:"text-xs text-gray-500 font-mono truncate"},U0={class:"flex items-center gap-2 flex-shrink-0"},B0={key:0,class:"flex-shrink-0"},z0=["onClick","disabled","title"],j0=ot({__name:"ProvidersTab",props:{providers:{},lastRefreshedAt:{},isLoading:{type:Boolean}},emits:["refresh-config"],setup(e,{emit:t}){const i=vr(),n=Li(),o=Vo(),s=oe(new Set),r=oe(new Map),a=oe(!1),l=oe({providerName:"",modelId:"",status:"testing"}),c=()=>{i.toggleApiKeysVisibility()},h=(C,R,w,y)=>{const E=C.models.find(G=>G.id===R),O=(E==null?void 0:E.apiType)||C.type;let k=C.baseUrl||"",D={"Content-Type":"application/json"},j={};return O==="openai"?(k.includes("/chat/completions")||(k.includes("/v1")?k=k.replace(/\/+$/,"")+"/chat/completions":k=k.replace(/\/+$/,"")+"/v1/chat/completions"),D.Authorization=`Bearer ${C.apiKey}`,j={model:R,messages:w.map(G=>({role:G.type==="ai"?"assistant":"user",content:G.content})),temperature:y.temperature??1,max_tokens:y.maxTokens??8192,top_p:y.topP??.95},y.frequencyPenalty!==void 0&&(j.frequency_penalty=y.frequencyPenalty),y.presencePenalty!==void 0&&(j.presence_penalty=y.presencePenalty)):O==="anthropic"?(k.includes("/v1/messages")||(k=k.replace(/\/+$/,"")+"/v1/messages"),D["x-api-key"]=C.apiKey||"",D["anthropic-version"]="2023-06-01",D["anthropic-dangerous-direct-browser-access"]="true",j={model:R,max_tokens:y.maxTokens??8192,temperature:y.temperature??1,messages:w.map(G=>({role:G.type==="ai"?"assistant":"user",content:G.content}))},y.topP!==void 0&&(j.top_p=y.topP),y.topK!==void 0&&y.topK>0&&(j.top_k=y.topK)):O==="google"&&(k.endsWith("/v1beta")||(k.includes("/models/")&&(k=k.split("/models/")[0]),k.endsWith("/v1beta")||(k=k.replace(/\/+$/,"")+"/v1beta")),k=`${k}/models/${R}:generateContent`,D["x-goog-api-key"]=C.apiKey||"",j={contents:w.map(G=>({role:G.type==="ai"?"model":"user",parts:[{text:G.content}]})),generationConfig:{temperature:y.temperature??1,maxOutputTokens:y.maxTokens??8192}},y.topP!==void 0&&(j.generationConfig.topP=y.topP),y.topK!==void 0&&y.topK>0&&(j.generationConfig.topK=y.topK)),{url:k,method:"POST",headers:D,body:j}},u=async(C,R)=>{const w=`${C.id}-${R}`;if(!C.apiKey){o.warning("请先配置 API Key",2e3);return}if(s.value.has(w))return;s.value.add(w),r.value.delete(w);const y=Date.now(),E=[{type:"user",content:"你好",timestamp:new Date().toISOString()}],O=n.globalModelParams;console.log("[ProvidersTab] 使用全局模型参数进行测试:",O);const k=h(C,R,E,O),D={...k.headers};D.Authorization&&(D.Authorization="Bearer ***"),D["x-api-key"]&&(D["x-api-key"]="***"),D["x-goog-api-key"]&&(D["x-goog-api-key"]="***"),l.value={providerName:C.name,modelId:R,status:"testing",requestInfo:{...k,headers:D},testTime:new Date().toLocaleString("zh-CN")},a.value=!0;try{const j=window.fetch;let G=null,W={},J,K;window.fetch=async(me,pt)=>{const Qe=await j(me,pt);J=Qe.status,K=Qe.statusText;const Qt=Qe.clone();Qe.headers.forEach((Ke,B)=>{W[B]=Ke});try{(Qe.headers.get("content-type")||"").includes("application/json")?G=await Qt.json():G={raw:await Qt.text()}}catch{G={error:"无法解析响应体"}}return Qe};const ye=ga.getInstance(),Ce=new Promise((me,pt)=>{setTimeout(()=>{window.fetch=j,pt(new Error("TIMEOUT"))},1e4)}),He=ye.callAI(E,C,R,!1);try{await Promise.race([He,Ce]),window.fetch=j;const me=Date.now()-y;r.value.set(w,"success"),l.value.status="success",l.value.duration=me,l.value.responseInfo={status:J,statusText:K,headers:W,body:G},o.success(`模型 ${R} 测试成功`,2e3)}catch(me){window.fetch=j;const pt=Date.now()-y;if((me==null?void 0:me.message)==="TIMEOUT")r.value.set(w,"timeout"),l.value.status="timeout",l.value.duration=pt,l.value.errorMessage="请求超时（10秒）",o.warning(`模型 ${R} 测试超时（10秒）`,3e3);else{r.value.set(w,"error"),l.value.status="error",l.value.duration=pt,l.value.errorMessage=(me==null?void 0:me.message)||"请求失败",l.value.responseInfo={status:J,statusText:K,headers:W,body:G||(me!=null&&me.error?{error:me.error}:null)};const Qe=(me==null?void 0:me.message)||"请求失败";o.error(`模型 ${R} 测试失败: ${Qe}`,3e3)}}}catch(j){window.fetch=window.fetch||(()=>Promise.reject(new Error("Fetch not available")));const G=Date.now()-y;r.value.set(w,"error"),l.value.status="error",l.value.duration=G,l.value.errorMessage=(j==null?void 0:j.message)||"测试失败";const W=(j==null?void 0:j.message)||"测试失败";o.error(`模型 ${R} 测试失败: ${W}`,3e3)}finally{setTimeout(()=>{s.value.delete(w)},2e3)}},p=(C,R)=>{const w=`${C}-${R}`,y=s.value.has(w),E=r.value.get(w);if(y)return"bg-blue-100 text-blue-700 border border-blue-300 cursor-wait";switch(E){case"success":return"bg-green-100 text-green-700 border border-green-300 hover:bg-green-200";case"error":return"bg-red-100 text-red-700 border border-red-300 hover:bg-red-200";case"timeout":return"bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200";default:return"bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"}},d=(C,R)=>{const w=`${C}-${R}`,y=s.value.has(w),E=r.value.get(w);if(y)return Xc;switch(E){case"success":return ml;case"error":return gl;case"timeout":return pp;default:return Zw}},m=(C,R)=>{const w=`${C}-${R}`,y=s.value.has(w),E=r.value.get(w);if(y)return"测试中...";switch(E){case"success":return"成功";case"error":return"失败";case"timeout":return"超时";default:return"测试"}},f=(C,R)=>{const w=`${C}-${R}`,y=s.value.has(w),E=r.value.get(w);if(y)return"正在测试模型连接...";switch(E){case"success":return"模型测试成功";case"error":return"模型测试失败";case"timeout":return"模型测试超时（10秒）";default:return"点击测试模型连接"}},x=C=>new Intl.DateTimeFormat("zh-CN",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).format(C),P=C=>C?i.showApiKeys?C:C.length<=8?"***":C.substring(0,8)+"..."+C.substring(C.length-4):"未配置",A=C=>({openai:"bg-green-100 text-green-700",anthropic:"bg-orange-100 text-orange-700",google:"bg-blue-100 text-blue-700",custom:"bg-purple-100 text-purple-700"})[C]||"bg-gray-100 text-gray-700",b=C=>({openai:"OpenAI",anthropic:"Anthropic",google:"Google",custom:"自定义"})[C]||C,S=C=>({openai:"bg-green-50 text-green-600 border border-green-200",anthropic:"bg-orange-50 text-orange-600 border border-orange-200",google:"bg-blue-50 text-blue-600 border border-blue-200"})[C]||"bg-gray-50 text-gray-600 border border-gray-200",_=C=>({openai:"OpenAI API",anthropic:"Claude API",google:"Gemini API"})[C]||C;return(C,R)=>(X(),ae("div",null,[se(l0,{visible:a.value,"onUpdate:visible":R[0]||(R[0]=w=>a.value=w),"provider-name":l.value.providerName,"model-id":l.value.modelId,status:l.value.status,"request-info":l.value.requestInfo,"response-info":l.value.responseInfo,"error-message":l.value.errorMessage,"test-time":l.value.testTime,duration:l.value.duration,onClose:R[1]||(R[1]=w=>a.value=!1)},null,8,["visible","provider-name","model-id","status","request-info","response-info","error-message","test-time","duration"]),g("div",c0,[g("div",u0,[se(N(Kw),{class:"w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"}),R[3]||(R[3]=As('<div class="flex-1"><h4 class="text-sm font-semibold text-yellow-800 mb-2">配置为只读模式</h4><div class="text-sm text-yellow-700 space-y-1"><p>AI模型配置由系统管理员统一管理，前端仅用于查看。</p><p><strong>如需修改：</strong>请编辑后端项目中的 <code class="bg-yellow-100 px-2 py-0.5 rounded text-xs font-mono">.setting.json</code> 文件，然后点击&quot;刷新配置&quot;按钮。 </p><p class="text-xs mt-2"><strong>配置文件路径：</strong><code class="bg-yellow-100 px-2 py-0.5 rounded font-mono">/app/projects/yprompt/.setting.json</code></p></div></div>',1))])]),g("div",h0,[g("div",d0,[g("div",p0,[R[4]||(R[4]=g("h3",{class:"text-lg font-medium"},"AI服务提供商",-1)),C.lastRefreshedAt?(X(),ae("div",f0," 上次刷新: "+ce(x(C.lastRefreshedAt)),1)):De("",!0)]),g("button",{onClick:R[2]||(R[2]=w=>C.$emit("refresh-config")),disabled:C.isLoading,class:"flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"},[se(N(Xc),{class:Oe(["w-4 h-4",C.isLoading?"animate-spin":""])},null,8,["class"]),g("span",null,ce(C.isLoading?"刷新中...":"刷新配置"),1)],8,m0)]),R[5]||(R[5]=As('<div class="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"><h4 class="text-sm font-medium text-blue-800 mb-2">API配置说明</h4><div class="text-sm text-blue-700 space-y-2"><div><strong>OpenAI及兼容服务：</strong>API URL填写完整路径，如 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://api.openai.com/v1/chat/completions</code></div><div><strong>Anthropic Claude：</strong>API URL填写 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://api.anthropic.com/v1/messages</code></div><div><strong>Google Gemini：</strong>API URL填写 <code class="bg-blue-100 px-1 rounded break-all text-xs">https://generativelanguage.googleapis.com/v1beta</code></div></div></div>',1))]),C.providers.length===0?(X(),ae("div",g0,[se(N(tT),{class:"w-12 h-12 text-gray-300 mx-auto mb-3"}),R[6]||(R[6]=g("p",{class:"text-lg mb-2"},"暂无配置",-1)),R[7]||(R[7]=g("p",{class:"text-sm"},"请在后端 .setting.json 文件中添加 Provider 配置",-1))])):(X(),ae("div",y0,[(X(!0),ae(Me,null,Yi(C.providers,w=>(X(),ae("div",{key:w.id,class:"border rounded-lg p-5 bg-white shadow-sm"},[g("div",v0,[g("div",b0,[g("div",{class:Oe(["w-3 h-3 rounded-full",w.apiKey?"bg-green-500":"bg-gray-300"]),title:w.apiKey?"API Key 已配置":"API Key 未配置"},null,10,w0),g("div",null,[g("h4",T0,ce(w.name),1),g("div",x0,[g("span",{class:Oe(["text-xs px-2 py-0.5 rounded-full",A(w.type)])},ce(b(w.type)),3),w.apiKey?De("",!0):(X(),ae("span",S0," 未配置 API Key "))])])])]),g("div",k0,[g("div",A0,[g("div",I0,[R[8]||(R[8]=g("span",{class:"text-gray-500 w-24 flex-shrink-0"},"API Key:",-1)),g("div",P0,[g("span",_0,ce(P(w.apiKey)),1),g("button",{onClick:c,class:"text-gray-400 hover:text-gray-600 ml-2",title:N(i).showApiKeys?"隐藏 API Key":"显示 API Key"},[N(i).showApiKeys?(X(),Je(N(Yw),{key:1,class:"w-4 h-4"})):(X(),Je(N(Jw),{key:0,class:"w-4 h-4"}))],8,C0)])]),w.baseUrl?(X(),ae("div",E0,[R[9]||(R[9]=g("span",{class:"text-gray-500 w-24 flex-shrink-0"},"Base URL:",-1)),g("span",R0,ce(w.baseUrl),1)])):De("",!0)])]),g("div",O0,[g("h5",M0," 模型列表 ("+ce(w.models.length)+") ",1),w.models.length===0?(X(),ae("div",N0," 该提供商暂无模型配置 ")):(X(),ae("div",L0,[(X(!0),ae(Me,null,Yi(w.models,y=>(X(),ae("div",{key:y.id,class:"flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"},[g("div",D0,[g("div",F0,[g("div",q0,ce(y.name),1),g("div",$0,ce(y.id),1)])]),g("div",U0,[y.apiType?(X(),ae("div",B0,[g("span",{class:Oe(["text-xs px-2 py-1 rounded",S(y.apiType)])},ce(_(y.apiType)),3)])):De("",!0),g("button",{onClick:E=>u(w,y.id),disabled:!w.apiKey||s.value.has(`${w.id}-${y.id}`),class:Oe(["px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5",p(w.id,y.id)]),title:f(w.id,y.id)},[(X(),Je($o(d(w.id,y.id)),{class:Oe(["w-3.5 h-3.5",s.value.has(`${w.id}-${y.id}`)?"animate-spin":""])},null,8,["class"])),g("span",null,ce(m(w.id,y.id)),1)],10,z0)])]))),128))]))])]))),128))]))]))}});function W0(){const e=Li(),t=()=>(console.log("[useModelParams] 获取全局模型参数:",e.globalModelParams),{...e.globalModelParams}),i=l=>{console.log("[useModelParams] 更新全局模型参数:",l),e.globalModelParams={...e.globalModelParams,...l},console.log("[useModelParams] 更新后的全局参数:",e.globalModelParams),e.saveSettings()};return{getCurrentParams:t,updateCurrentModelParams:i,resetToDefaults:()=>{console.log("[useModelParams] 重置全局参数为默认值"),i({temperature:1,maxTokens:8192,topP:.95,frequencyPenalty:0,presencePenalty:0,topK:0})},isParamSupported:l=>["temperature","maxTokens","topP","frequencyPenalty","presencePenalty","topK"].includes(l),getParamRange:l=>{switch(l){case"temperature":return{min:0,max:2,step:.1};case"maxTokens":return{min:1,max:8e3,step:1};case"topP":return{min:0,max:1,step:.01};case"frequencyPenalty":case"presencePenalty":return{min:-2,max:2,step:.1};case"topK":return{min:1,max:100,step:1};default:return{min:0,max:1,step:.1}}},getParamLabel:l=>({temperature:"Temperature",maxTokens:"Max Tokens",topP:"Top P",frequencyPenalty:"Frequency Penalty",presencePenalty:"Presence Penalty",topK:"Top K"})[l]||l,getParamDescription:l=>({temperature:"控制输出的随机性。值越高，输出越随机；值越低，输出越确定",maxTokens:"生成的最大 token 数量",topP:"核采样参数，控制考虑的词汇范围",frequencyPenalty:"降低重复词汇的频率（OpenAI 专用）",presencePenalty:"鼓励模型谈论新话题（OpenAI 专用）",topK:"只考虑概率最高的 K 个词汇（Claude/Gemini）"})[l]||""}}const G0={class:"space-y-6"},V0={class:"space-y-4"},H0={key:0,class:"space-y-2"},K0={class:"flex items-center justify-between"},Y0={class:"text-sm font-medium text-gray-700"},J0=["min","max","step"],Q0=["min","max","step"],Z0={class:"text-xs text-gray-500"},X0={key:1,class:"space-y-2"},ex={class:"flex items-center justify-between"},tx={class:"text-sm font-medium text-gray-700"},ix=["min","max","step"],nx=["min","max","step"],ox={class:"text-xs text-gray-500"},sx={key:2,class:"space-y-2"},rx={class:"flex items-center justify-between"},ax={class:"text-sm font-medium text-gray-700"},lx=["min","max","step"],cx=["min","max","step"],ux={class:"text-xs text-gray-500"},hx={key:3,class:"space-y-2"},dx={class:"flex items-center justify-between"},px={class:"text-sm font-medium text-gray-700"},fx=["min","max","step"],mx=["min","max","step"],gx={class:"text-xs text-gray-500"},yx={key:4,class:"space-y-2"},vx={class:"flex items-center justify-between"},bx={class:"text-sm font-medium text-gray-700"},wx=["min","max","step"],Tx=["min","max","step"],xx={class:"text-xs text-gray-500"},Sx={key:5,class:"space-y-2"},kx={class:"flex items-center justify-between"},Ax={class:"text-sm font-medium text-gray-700"},Ix=["min","max","step"],Px=["min","max","step"],_x={class:"text-xs text-gray-500"},Cx=ot({__name:"ModelParamsTab",setup(e){const{getCurrentParams:t,updateCurrentModelParams:i,resetToDefaults:n,isParamSupported:o,getParamRange:s,getParamLabel:r,getParamDescription:a}=W0(),l=Li(),c=oe(t()),h=()=>{c.value=t()};St(()=>l.providers.length,()=>{ai(()=>{h()})}),St(()=>l.globalModelParams,()=>{ai(()=>{h()})},{deep:!0}),Ni(async()=>{await ai(),h()});const u=(d,m)=>{const f=m.target,x=parseFloat(f.value);c.value={...c.value,[d]:x},i({[d]:x})},p=()=>{n(),c.value=t()};return(d,m)=>(X(),ae("div",G0,[g("div",V0,[g("div",{class:"flex items-center justify-between"},[m[24]||(m[24]=g("h3",{class:"text-lg font-semibold text-gray-900"},"模型参数",-1)),g("button",{onClick:p,class:"text-sm text-blue-600 hover:text-blue-700 font-medium"}," 重置为默认值 ")]),N(o)("temperature")?(X(),ae("div",H0,[g("div",K0,[g("label",Y0,ce(N(r)("temperature")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[0]||(m[0]=f=>c.value.temperature=f),onInput:m[1]||(m[1]=f=>u("temperature",f)),min:N(s)("temperature").min,max:N(s)("temperature").max,step:N(s)("temperature").step,class:"w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,J0),[[_e,c.value.temperature,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[2]||(m[2]=f=>c.value.temperature=f),onInput:m[3]||(m[3]=f=>u("temperature",f)),min:N(s)("temperature").min,max:N(s)("temperature").max,step:N(s)("temperature").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,Q0),[[_e,c.value.temperature,void 0,{number:!0}]]),g("p",Z0,ce(N(a)("temperature")),1)])):De("",!0),N(o)("maxTokens")?(X(),ae("div",X0,[g("div",ex,[g("label",tx,ce(N(r)("maxTokens")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[4]||(m[4]=f=>c.value.maxTokens=f),onInput:m[5]||(m[5]=f=>u("maxTokens",f)),min:N(s)("maxTokens").min,max:N(s)("maxTokens").max,step:N(s)("maxTokens").step,class:"w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,ix),[[_e,c.value.maxTokens,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[6]||(m[6]=f=>c.value.maxTokens=f),onInput:m[7]||(m[7]=f=>u("maxTokens",f)),min:N(s)("maxTokens").min,max:N(s)("maxTokens").max,step:N(s)("maxTokens").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,nx),[[_e,c.value.maxTokens,void 0,{number:!0}]]),g("p",ox,ce(N(a)("maxTokens")),1)])):De("",!0),N(o)("topP")?(X(),ae("div",sx,[g("div",rx,[g("label",ax,ce(N(r)("topP")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[8]||(m[8]=f=>c.value.topP=f),onInput:m[9]||(m[9]=f=>u("topP",f)),min:N(s)("topP").min,max:N(s)("topP").max,step:N(s)("topP").step,class:"w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,lx),[[_e,c.value.topP,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[10]||(m[10]=f=>c.value.topP=f),onInput:m[11]||(m[11]=f=>u("topP",f)),min:N(s)("topP").min,max:N(s)("topP").max,step:N(s)("topP").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,cx),[[_e,c.value.topP,void 0,{number:!0}]]),g("p",ux,ce(N(a)("topP")),1)])):De("",!0),N(o)("frequencyPenalty")?(X(),ae("div",hx,[g("div",dx,[g("label",px,ce(N(r)("frequencyPenalty")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[12]||(m[12]=f=>c.value.frequencyPenalty=f),onInput:m[13]||(m[13]=f=>u("frequencyPenalty",f)),min:N(s)("frequencyPenalty").min,max:N(s)("frequencyPenalty").max,step:N(s)("frequencyPenalty").step,class:"w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,fx),[[_e,c.value.frequencyPenalty,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[14]||(m[14]=f=>c.value.frequencyPenalty=f),onInput:m[15]||(m[15]=f=>u("frequencyPenalty",f)),min:N(s)("frequencyPenalty").min,max:N(s)("frequencyPenalty").max,step:N(s)("frequencyPenalty").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,mx),[[_e,c.value.frequencyPenalty,void 0,{number:!0}]]),g("p",gx,ce(N(a)("frequencyPenalty")),1)])):De("",!0),N(o)("presencePenalty")?(X(),ae("div",yx,[g("div",vx,[g("label",bx,ce(N(r)("presencePenalty")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[16]||(m[16]=f=>c.value.presencePenalty=f),onInput:m[17]||(m[17]=f=>u("presencePenalty",f)),min:N(s)("presencePenalty").min,max:N(s)("presencePenalty").max,step:N(s)("presencePenalty").step,class:"w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,wx),[[_e,c.value.presencePenalty,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[18]||(m[18]=f=>c.value.presencePenalty=f),onInput:m[19]||(m[19]=f=>u("presencePenalty",f)),min:N(s)("presencePenalty").min,max:N(s)("presencePenalty").max,step:N(s)("presencePenalty").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,Tx),[[_e,c.value.presencePenalty,void 0,{number:!0}]]),g("p",xx,ce(N(a)("presencePenalty")),1)])):De("",!0),N(o)("topK")?(X(),ae("div",Sx,[g("div",kx,[g("label",Ax,ce(N(r)("topK")),1),Ae(g("input",{type:"number","onUpdate:modelValue":m[20]||(m[20]=f=>c.value.topK=f),onInput:m[21]||(m[21]=f=>u("topK",f)),min:N(s)("topK").min,max:N(s)("topK").max,step:N(s)("topK").step,class:"w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"},null,40,Ix),[[_e,c.value.topK,void 0,{number:!0}]])]),Ae(g("input",{type:"range","onUpdate:modelValue":m[22]||(m[22]=f=>c.value.topK=f),onInput:m[23]||(m[23]=f=>u("topK",f)),min:N(s)("topK").min,max:N(s)("topK").max,step:N(s)("topK").step,class:"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"},null,40,Px),[[_e,c.value.topK,void 0,{number:!0}]]),g("p",_x,ce(N(a)("topK")),1)])):De("",!0),m[25]||(m[25]=g("div",{class:"mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg"},[g("h4",{class:"text-sm font-medium text-gray-900 mb-2"},"参数说明"),g("ul",{class:"text-xs text-gray-600 space-y-1"},[g("li",null,"• Temperature: 控制输出的随机性（0-2）"),g("li",null,"• Max Tokens: 生成的最大token数量"),g("li",null,"• Top P: 核采样参数，控制考虑的词汇范围"),g("li",null,"• Frequency Penalty: 降低重复词汇的频率（OpenAI）"),g("li",null,"• Presence Penalty: 鼓励模型谈论新话题（OpenAI）"),g("li",null,"• Top K: 只考虑概率最高的K个词汇（Claude/Gemini）"),g("li",{class:"mt-2"},"这些参数会全局应用到所有AI模型，无需单独配置")])],-1))])]))}}),Ex={class:"space-y-6"},Rx={class:"border border-gray-300 rounded-lg overflow-hidden"},Ox={class:"flex items-center gap-2"},Mx={class:"p-4 space-y-6 bg-white"},Nx={class:"flex items-center justify-between mb-3"},Lx={class:"flex items-center space-x-3"},Dx={class:"flex items-center space-x-2 cursor-pointer"},Fx={class:"relative"},qx={class:"flex items-center justify-between mb-3"},$x={class:"flex items-center justify-between mb-3"},Ux={class:"space-y-4"},Bx={class:"flex items-center justify-between mb-2"},zx={class:"flex items-center justify-between mb-2"},jx={class:"flex items-center justify-between mb-2"},Wx={class:"flex items-center justify-between mb-2"},Gx={class:"border border-gray-300 rounded-lg overflow-hidden"},Vx={class:"flex items-center gap-2"},Hx={class:"p-4 space-y-6 bg-white"},Kx={class:"space-y-4 pl-4 border-l-2 border-green-200"},Yx={class:"flex items-center justify-between mb-2"},Jx={class:"flex items-center justify-between mb-2"},Qx={class:"flex items-center justify-between mb-2"},Zx={class:"space-y-4 pl-4 border-l-2 border-green-200"},Xx={class:"flex items-center justify-between mb-2"},eS={class:"flex items-center justify-between mb-2"},tS=ot({__name:"PromptsTab",emits:["reset-system","reset-user","reset-requirement","reset-quality-analysis-system","reset-thinking","reset-generation","reset-advice","reset-application","toggle-slim-rules","reset-user-prompt-quality-analysis","reset-user-prompt-quick-optimization"],setup(e){const t=Li(),i=oe(!0),n=oe(!1);return(o,s)=>(X(),ae("div",Ex,[g("div",Rx,[g("button",{onClick:s[0]||(s[0]=r=>i.value=!i.value),class:"w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 flex items-center justify-between transition-colors"},[g("div",Ox,[se(N(Zc),{class:Oe(["w-5 h-5 text-blue-600 transition-transform",i.value&&"transform rotate-180"])},null,8,["class"]),s[28]||(s[28]=g("h2",{class:"text-lg font-semibold text-blue-900"},"生成规则",-1))]),s[29]||(s[29]=g("span",{class:"text-xs text-blue-600"},"用于提示词生成功能",-1))]),Ae(g("div",Mx,[g("div",null,[g("div",Nx,[s[32]||(s[32]=g("h3",{class:"text-lg font-medium"},"系统提示词规则",-1)),g("div",Lx,[g("label",Dx,[s[31]||(s[31]=g("span",{class:"text-sm text-gray-600"},"精简版",-1)),g("div",Fx,[Ae(g("input",{type:"checkbox","onUpdate:modelValue":s[1]||(s[1]=r=>N(t).useSlimRules=r),onChange:s[2]||(s[2]=r=>o.$emit("toggle-slim-rules")),class:"sr-only peer"},null,544),[[ur,N(t).useSlimRules]]),s[30]||(s[30]=g("div",{class:"w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"},null,-1))])]),g("button",{onClick:s[3]||(s[3]=r=>o.$emit("reset-system")),class:"text-sm text-gray-500 hover:text-gray-700 px-2 py-1 border border-gray-300 rounded"}," 重置为默认 ")])]),Ae(g("textarea",{"onUpdate:modelValue":s[4]||(s[4]=r=>N(t).editingSystemRules=r),placeholder:"输入系统提示词规则...",class:"w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingSystemRules]]),s[33]||(s[33]=g("p",{class:"text-xs text-gray-500 mt-1"},"系统提示词包含AI提示词工程的完整指南，用于生成高质量的提示词。",-1))]),g("div",null,[g("div",qx,[s[34]||(s[34]=g("h3",{class:"text-lg font-medium"},"用户引导规则",-1)),g("button",{onClick:s[5]||(s[5]=r=>o.$emit("reset-user")),class:"text-sm text-gray-500 hover:text-gray-700 px-2 py-1 border border-gray-300 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[6]||(s[6]=r=>N(t).editingUserRules=r),placeholder:"输入用户引导规则...",class:"w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingUserRules]]),s[35]||(s[35]=g("p",{class:"text-xs text-gray-500 mt-1"},"用户引导规则定义AI助手在对话中的行为方式，包括智能判断和对话终止机制。",-1))]),g("div",null,[g("div",$x,[s[36]||(s[36]=g("h3",{class:"text-lg font-medium"},"需求报告规则",-1)),g("button",{onClick:s[7]||(s[7]=r=>o.$emit("reset-requirement")),class:"text-sm text-gray-500 hover:text-gray-700 px-2 py-1 border border-gray-300 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[8]||(s[8]=r=>N(t).editingRequirementReportRules=r),placeholder:"输入需求报告生成规则...",class:"w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingRequirementReportRules]]),s[37]||(s[37]=g("p",{class:"text-xs text-gray-500 mt-1"},"需求报告规则用于基于用户对话历史生成完整的需求总结报告。",-1))]),g("div",null,[s[42]||(s[42]=g("div",{class:"mb-3"},[g("h3",{class:"text-lg font-medium"},"最终提示词生成规则")],-1)),g("div",Ux,[g("div",null,[g("div",Bx,[s[38]||(s[38]=g("h4",{class:"text-sm font-medium text-gray-700"},"关键指令提取",-1)),g("button",{onClick:s[9]||(s[9]=r=>o.$emit("reset-thinking")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[10]||(s[10]=r=>N(t).editingFinalPromptRules.THINKING_POINTS_EXTRACTION=r),placeholder:"输入关键指令提取规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.THINKING_POINTS_EXTRACTION]])]),g("div",null,[g("div",zx,[s[39]||(s[39]=g("h4",{class:"text-sm font-medium text-gray-700"},"系统提示词生成",-1)),g("button",{onClick:s[11]||(s[11]=r=>o.$emit("reset-generation")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[12]||(s[12]=r=>N(t).editingFinalPromptRules.SYSTEM_PROMPT_GENERATION=r),placeholder:"输入系统提示词生成规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.SYSTEM_PROMPT_GENERATION]])]),g("div",null,[g("div",jx,[s[40]||(s[40]=g("h4",{class:"text-sm font-medium text-gray-700"},"优化建议生成",-1)),g("button",{onClick:s[13]||(s[13]=r=>o.$emit("reset-advice")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[14]||(s[14]=r=>N(t).editingFinalPromptRules.OPTIMIZATION_ADVICE_GENERATION=r),placeholder:"输入优化建议生成规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.OPTIMIZATION_ADVICE_GENERATION]])]),g("div",null,[g("div",Wx,[s[41]||(s[41]=g("h4",{class:"text-sm font-medium text-gray-700"},"优化应用",-1)),g("button",{onClick:s[15]||(s[15]=r=>o.$emit("reset-application")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置为默认 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[16]||(s[16]=r=>N(t).editingFinalPromptRules.OPTIMIZATION_APPLICATION=r),placeholder:"输入优化应用规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.OPTIMIZATION_APPLICATION]])])]),s[43]||(s[43]=g("p",{class:"text-xs text-gray-500 mt-1"},"最终提示词生成规则用于控制提示词生成器的各个步骤的系统提示词。",-1))])],512),[[Es,i.value]])]),g("div",Gx,[g("button",{onClick:s[17]||(s[17]=r=>n.value=!n.value),class:"w-full px-4 py-3 bg-green-50 hover:bg-green-100 flex items-center justify-between transition-colors"},[g("div",Vx,[se(N(Zc),{class:Oe(["w-5 h-5 text-green-600 transition-transform",n.value&&"transform rotate-180"])},null,8,["class"]),s[44]||(s[44]=g("h2",{class:"text-lg font-semibold text-green-900"},"优化规则",-1))]),s[45]||(s[45]=g("span",{class:"text-xs text-green-600"},"用于提示词优化功能",-1))]),Ae(g("div",Hx,[g("div",null,[s[52]||(s[52]=g("div",{class:"flex items-center justify-between mb-3"},[g("h3",{class:"text-lg font-medium"},"系统提示词优化")],-1)),s[53]||(s[53]=g("p",{class:"text-sm text-gray-600 mb-3"},"三段式优化流程：质量分析 → 优化建议 → 应用优化",-1)),g("div",Kx,[g("div",null,[g("div",Yx,[s[46]||(s[46]=g("h4",{class:"text-sm font-medium text-gray-700"},"1. 质量分析系统提示词",-1)),g("button",{onClick:s[18]||(s[18]=r=>o.$emit("reset-quality-analysis-system")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[19]||(s[19]=r=>N(t).editingQualityAnalysisRules.systemPrompt=r),placeholder:"输入质量分析系统提示词...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingQualityAnalysisRules.systemPrompt]]),s[47]||(s[47]=g("p",{class:"text-xs text-gray-500 mt-1"},"分析提示词的结构、清晰度、完整性等质量问题",-1))]),g("div",null,[g("div",Jx,[s[48]||(s[48]=g("h4",{class:"text-sm font-medium text-gray-700"},"2. 优化建议生成",-1)),g("button",{onClick:s[20]||(s[20]=r=>o.$emit("reset-advice")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[21]||(s[21]=r=>N(t).editingFinalPromptRules.OPTIMIZATION_ADVICE_GENERATION=r),placeholder:"输入优化建议生成规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.OPTIMIZATION_ADVICE_GENERATION]]),s[49]||(s[49]=g("p",{class:"text-xs text-gray-500 mt-1"},"基于质量分析结果生成具体的优化建议",-1))]),g("div",null,[g("div",Qx,[s[50]||(s[50]=g("h4",{class:"text-sm font-medium text-gray-700"},"3. 优化应用",-1)),g("button",{onClick:s[22]||(s[22]=r=>o.$emit("reset-application")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[23]||(s[23]=r=>N(t).editingFinalPromptRules.OPTIMIZATION_APPLICATION=r),placeholder:"输入优化应用规则...",class:"w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingFinalPromptRules.OPTIMIZATION_APPLICATION]]),s[51]||(s[51]=g("p",{class:"text-xs text-gray-500 mt-1"},"根据优化建议生成优化后的提示词",-1))])])]),g("div",null,[s[58]||(s[58]=g("div",{class:"flex items-center justify-between mb-3"},[g("h3",{class:"text-lg font-medium"},"用户提示词优化")],-1)),s[59]||(s[59]=g("p",{class:"text-sm text-gray-600 mb-3"},"两段式优化流程：质量分析 → 快速优化",-1)),g("div",Zx,[g("div",null,[g("div",Xx,[s[54]||(s[54]=g("h4",{class:"text-sm font-medium text-gray-700"},"1. 质量分析系统提示词",-1)),g("button",{onClick:s[24]||(s[24]=r=>o.$emit("reset-user-prompt-quality-analysis")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[25]||(s[25]=r=>N(t).editingUserPromptOptimizationRules.qualityAnalysis=r),placeholder:"输入质量分析系统提示词...",class:"w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingUserPromptOptimizationRules.qualityAnalysis]]),s[55]||(s[55]=g("p",{class:"text-xs text-gray-500 mt-1"},"分析用户草稿的清晰度、特定性、结构、上下文、完整性等维度，输出JSON格式的分析结果",-1))]),g("div",null,[g("div",eS,[s[56]||(s[56]=g("h4",{class:"text-sm font-medium text-gray-700"},"2. 快速优化系统提示词",-1)),g("button",{onClick:s[26]||(s[26]=r=>o.$emit("reset-user-prompt-quick-optimization")),class:"text-xs text-gray-400 hover:text-gray-600 px-1 py-0.5 border border-gray-200 rounded"}," 重置 ")]),Ae(g("textarea",{"onUpdate:modelValue":s[27]||(s[27]=r=>N(t).editingUserPromptOptimizationRules.quickOptimization=r),placeholder:"输入快速优化系统提示词...",class:"w-full h-48 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-xs"},null,512),[[_e,N(t).editingUserPromptOptimizationRules.quickOptimization]]),s[57]||(s[57]=g("p",{class:"text-xs text-gray-500 mt-1"},"根据质量分析结果优化用户草稿，包含角色防混淆、长度控制、自然语言风格等完整规则",-1))])])])],512),[[Es,n.value]])])]))}});function iS(){const e=Li();return{resetSystemPromptRules:()=>{confirm("确定要重置系统提示词规则为默认值吗？")&&e.resetSystemPromptRules()},resetUserPromptRules:()=>{confirm("确定要重置用户引导规则为默认值吗？")&&e.resetUserPromptRules()},resetRequirementReportRules:()=>{confirm("确定要重置需求报告规则为默认值吗？")&&e.resetRequirementReportRules()},resetThinkingPointsExtractionPrompt:()=>{confirm("确定要重置关键指令提取规则为默认值吗？")&&e.resetThinkingPointsExtractionPrompt()},resetSystemPromptGenerationPrompt:()=>{confirm("确定要重置系统提示词生成规则为默认值吗？")&&e.resetSystemPromptGenerationPrompt()},resetOptimizationAdvicePrompt:()=>{confirm("确定要重置优化建议生成规则为默认值吗？")&&e.resetOptimizationAdvicePrompt()},resetOptimizationApplicationPrompt:()=>{confirm("确定要重置优化应用规则为默认值吗？")&&e.resetOptimizationApplicationPrompt()},resetQualityAnalysisSystemPrompt:()=>{confirm("确定要重置质量分析系统提示词为默认值吗？")&&e.resetQualityAnalysisSystemPrompt()},resetUserPromptQualityAnalysis:()=>{confirm("确定要重置用户提示词质量分析规则为默认值吗？")&&e.resetUserPromptQualityAnalysis()},resetUserPromptQuickOptimization:()=>{confirm("确定要重置用户提示词快速优化规则为默认值吗？")&&e.resetUserPromptQuickOptimization()},handleSlimRulesToggle:()=>{e.loadPromptRules(),e.saveSettings()},saveAndClose:async()=>{try{(e.editingSystemRules||e.editingUserRules||e.editingRequirementReportRules||e.editingFinalPromptRules)&&await e.savePromptRules(),e.saveSettings(),e.showSettings=!1;const{useNotificationStore:d}=await Pe(async()=>{const{useNotificationStore:f}=await Promise.resolve().then(()=>eu);return{useNotificationStore:f}},void 0);d().success("设置保存成功",2e3)}catch(d){console.error("保存设置失败:",d);const{useNotificationStore:m}=await Pe(async()=>{const{useNotificationStore:x}=await Promise.resolve().then(()=>eu);return{useNotificationStore:x}},void 0);m().error("保存失败，请检查网络连接后重试",3e3)}}}}const nS={key:0,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"},oS={class:"bg-white rounded-lg max-w-4xl w-full h-[90vh] flex flex-col overflow-hidden"},sS={class:"flex items-center justify-between p-6 border-b flex-shrink-0"},rS={class:"flex items-center space-x-4"},aS={class:"flex space-x-1"},lS={class:"flex-1 overflow-y-auto p-6"},cS={class:"flex justify-end space-x-3 p-4 border-t bg-gray-50 flex-shrink-0"},uS=ot({__name:"SettingsModal",setup(e){const t=vr(),i=Li(),n=Vo(),o=oe("providers"),s=iS(),r=async()=>{try{await t.refreshSettings(),n.success("配置已刷新")}catch(a){console.error("刷新配置失败:",a),n.error(`刷新配置失败: ${a.message||"未知错误"}`)}};return St(o,async a=>{a==="prompts"?i.openPromptEditor("system"):a==="params"&&i.providers.length===0&&await i.loadSettings()}),Ni(async()=>{await t.initialize(),await i.loadSettings()}),(a,l)=>(X(),ae(Me,null,[se(nT,{onOpen:l[0]||(l[0]=c=>N(i).showSettings=!0)}),N(i).showSettings?(X(),ae("div",nS,[g("div",oS,[g("div",sS,[g("div",rS,[l[7]||(l[7]=g("h2",{class:"text-xl font-semibold"},"设置",-1)),g("div",aS,[g("button",{onClick:l[1]||(l[1]=c=>o.value="providers"),class:Oe(["px-3 py-1 rounded text-sm font-medium transition-colors",o.value==="providers"?"bg-blue-100 text-blue-700":"text-gray-600 hover:text-gray-800"])}," AI模型 ",2),g("button",{onClick:l[2]||(l[2]=c=>o.value="params"),class:Oe(["px-3 py-1 rounded text-sm font-medium transition-colors",o.value==="params"?"bg-blue-100 text-blue-700":"text-gray-600 hover:text-gray-800"])}," 模型参数 ",2),g("button",{onClick:l[3]||(l[3]=c=>o.value="prompts"),class:Oe(["px-3 py-1 rounded text-sm font-medium transition-colors",o.value==="prompts"?"bg-blue-100 text-blue-700":"text-gray-600 hover:text-gray-800"])}," 提示词规则 ",2)])]),g("button",{onClick:l[4]||(l[4]=c=>N(i).showSettings=!1),class:"p-1 hover:bg-gray-100 rounded"},[se(N(fp),{class:"w-5 h-5"})])]),g("div",lS,[o.value==="providers"?(X(),Je(j0,{key:0,providers:N(t).allProviders,"last-refreshed-at":N(t).lastRefreshedAt,"is-loading":N(t).isLoading,onRefreshConfig:r},null,8,["providers","last-refreshed-at","is-loading"])):De("",!0),o.value==="params"?(X(),Je(Cx,{key:1})):De("",!0),o.value==="prompts"?(X(),Je(tS,{key:2,onResetSystem:N(s).resetSystemPromptRules,onResetUser:N(s).resetUserPromptRules,onResetRequirement:N(s).resetRequirementReportRules,onResetThinking:N(s).resetThinkingPointsExtractionPrompt,onResetGeneration:N(s).resetSystemPromptGenerationPrompt,onResetAdvice:N(s).resetOptimizationAdvicePrompt,onResetApplication:N(s).resetOptimizationApplicationPrompt,onResetQualityAnalysisSystem:N(s).resetQualityAnalysisSystemPrompt,onResetUserPromptQualityAnalysis:N(s).resetUserPromptQualityAnalysis,onResetUserPromptQuickOptimization:N(s).resetUserPromptQuickOptimization,onToggleSlimRules:N(s).handleSlimRulesToggle},null,8,["onResetSystem","onResetUser","onResetRequirement","onResetThinking","onResetGeneration","onResetAdvice","onResetApplication","onResetQualityAnalysisSystem","onResetUserPromptQualityAnalysis","onResetUserPromptQuickOptimization","onToggleSlimRules"])):De("",!0)]),g("div",cS,[g("button",{onClick:l[5]||(l[5]=c=>N(i).showSettings=!1),class:"px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"}," 取消 "),g("button",{onClick:l[6]||(l[6]=(...c)=>N(s).saveAndClose&&N(s).saveAndClose(...c)),class:"px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"}," 保存设置 ")])])])):De("",!0)],64))}}),hS={class:"fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none"},dS={class:"p-4"},pS={class:"flex items-start gap-3"},fS={class:"flex-shrink-0 mt-0.5"},mS={class:"flex-1 min-w-0"},gS={class:"text-sm font-medium break-words leading-relaxed"},yS={class:"flex-shrink-0"},vS=["onClick"],bS={key:0,class:"h-1 bg-black/10 overflow-hidden"},wS=ot({__name:"NotificationContainer",setup(e){const t=Vo(),i=s=>{switch(s){case"success":return"bg-white/95 border border-green-200/50 text-green-800 shadow-green-100/50";case"error":return"bg-white/95 border border-red-200/50 text-red-800 shadow-red-100/50";case"warning":return"bg-white/95 border border-yellow-200/50 text-yellow-800 shadow-yellow-100/50";case"info":return"bg-white/95 border border-blue-200/50 text-blue-800 shadow-blue-100/50";default:return"bg-white/95 border border-gray-200/50 text-gray-800 shadow-gray-100/50"}},n=s=>{switch(s){case"success":return"text-green-600";case"error":return"text-red-600";case"warning":return"text-yellow-600";case"info":return"text-blue-600";default:return"text-gray-600"}},o=s=>{switch(s){case"success":return ml;case"error":return gl;case"warning":return iT;case"info":return Ws;default:return Ws}};return(s,r)=>(X(),Je(Oa,{to:"body"},[g("div",hS,[se(Hh,{name:"toast",tag:"div"},{default:di(()=>[(X(!0),ae(Me,null,Yi(N(t).notifications,a=>(X(),ae("div",{key:a.id,class:Oe([["max-w-sm w-full shadow-xl rounded-lg pointer-events-auto overflow-hidden backdrop-blur-sm",i(a.type)],"transform transition-all duration-300 ease-out"])},[g("div",dS,[g("div",pS,[g("div",fS,[(X(),Je($o(o(a.type)),{class:Oe(["h-5 w-5",n(a.type)])},null,8,["class"]))]),g("div",mS,[g("p",gS,ce(a.message),1)]),g("div",yS,[g("button",{onClick:l=>N(t).removeNotification(a.id),class:"inline-flex text-gray-400 hover:text-gray-600 focus:outline-none transition-colors rounded p-0.5 hover:bg-black/5"},[se(N(fp),{class:"h-4 w-4"})],8,vS)])])]),a.duration&&a.duration>0?(X(),ae("div",bS,[g("div",{class:"h-full bg-current opacity-30 transition-all linear",style:Hn({animation:`shrink ${a.duration}ms linear forwards`,animationFillMode:"forwards"})},null,4)])):De("",!0)],2))),128))]),_:1})])]))}}),TS=sn(wS,[["__scopeId","data-v-6d8c681d"]]),xS={id:"app"},SS=ot({__name:"App",setup(e){const t=np(),i=lp(),n=fl(),o=xe(()=>!t.currentRoute.value.meta.public),s=r=>{const a=(r==null?void 0:r.path)||t.currentRoute.value.path,l=i.getModuleByPath(a);l&&i.currentModule!==l.id&&i.setCurrentModule(l.id)};return Ni(async()=>{await n.initialize(),s(),t.afterEach(r=>{s(r)})}),(r,a)=>{const l=rr("router-view");return X(),ae("div",xS,[o.value?(X(),Je(jw,{key:0})):(X(),Je(l,{key:1})),se(uS),se(TS)])}}}),kS=sn(SS,[["__scopeId","data-v-b8baca49"]]),yp=iw({history:Rb(),routes:[{path:"/login",name:"login",component:()=>Pe(()=>import("./LoginView-_Td4Cd_R.js"),__vite__mapDeps([0,1])),meta:{public:!0}},{path:"/",redirect:"/generate"},{path:"/generate",name:"generate",component:()=>Pe(()=>import("./GenerateModule-jOcX4Sh5.js"),__vite__mapDeps([2,3,4,5,6,7]))},{path:"/optimize",name:"optimize",component:()=>Pe(()=>import("./OptimizeModule-BQYk5ICl.js"),__vite__mapDeps([8,7,5,6,4,9,10]))},{path:"/optimize/:id?",name:"optimize-prompt",component:()=>Pe(()=>import("./OptimizeModule-BQYk5ICl.js"),__vite__mapDeps([8,7,5,6,4,9,10]))},{path:"/playground",name:"playground",component:()=>Pe(()=>import("./PlaygroundModule-BGAGeE-_.js").then(e=>e.P),__vite__mapDeps([11,9,4,12]))},{path:"/library",name:"library",component:()=>Pe(()=>import("./LibraryModule--GaWP00S.js"),__vite__mapDeps([13,7,14]))}]}),AS=ow(),vl=Ns(kS);vl.use(AS);vl.use(yp);let ao=null;Pe(async()=>{const{useAuthStore:e}=await Promise.resolve().then(()=>up);return{useAuthStore:e}},void 0).then(({useAuthStore:e})=>{ao=e()});yp.beforeEach((e,t,i)=>{if(e.meta.public){i();return}if(ao){if(!ao.isLoggedIn){i({path:"/login",query:{redirect:e.fullPath}});return}i()}else Pe(async()=>{const{useAuthStore:n}=await Promise.resolve().then(()=>up);return{useAuthStore:n}},void 0).then(({useAuthStore:n})=>{ao=n(),ao.isLoggedIn?i():i({path:"/login",query:{redirect:e.fullPath}})})});vl.mount("#app");export{TS as $,Hn as A,As as B,Kw as C,St as D,Jw as E,Me as F,Es as G,ai as H,Vo as I,Pe as J,vr as K,Qw as L,qo as M,ga as N,ne as O,Li as P,Ii as Q,Xc as R,eT as S,_s as T,iS as U,nT as V,j0 as W,fp as X,Cx as Y,tS as Z,sn as _,np as a,Kn as a0,Ms as a1,_e as a2,js as a3,ny as a4,PS as a5,cm as a6,or as a7,Ga as a8,Rt as a9,lp as aa,rr as ab,po as ac,to as ad,eu as ae,ae as b,xe as c,ot as d,g as e,De as f,se as g,Ae as h,Je as i,N as j,ur as k,di as l,In as m,Oe as n,Ni as o,X as p,Yw as q,oe as r,st as s,ce as t,fl as u,Yh as v,Qh as w,Go as x,Yi as y,oo as z};
