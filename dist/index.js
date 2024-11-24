import{mkdirSync as Rn,writeFileSync as Wn}from"node:fs";class s extends Map{obj(n){n&&h(n).forEach(([f,o])=>this.set(f,o))}map(n){n.forEach((f,o)=>{this.set(o,f)})}ass(n,f){if(!this.has(n))this.set(n,{});L(this.get(n),f)}}var $n=(n)=>Array.from({length:n},(f,o)=>o),qn="ABCDEFGHIJKLMNOPQRSTUVWXYZ",Gn="abcdefghijklmnopqrstuvwxyz",hn=$n(10).join(""),Pn=new RegExp(/(\d+)(\d*)/,"m"),G=(n)=>typeof n==="function";var M=(n)=>{return!isNaN(parseFloat(n))&&isFinite(n)},d=(n)=>{return typeof n==="object"&&n!==null&&!Array.isArray(n)};var v=(n)=>typeof n==="boolean",u=(n)=>typeof n==="string",F=(n)=>Array.isArray(n),w=(n)=>typeof n==="object",a=(n)=>typeof n==="number";var{entries:h,hasOwn:en}=Object;var L=Object.assign,nn=(n)=>{return Object.keys(n).length};var fn=(n)=>JSON.stringify(n);var on=(n)=>{if(n.startsWith("webkit"))n="--"+n;return n.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()};var m=(n)=>{let f=qn+Gn;return Array.from({length:n},(o,E)=>f+(E?hn:"")).reduce((o,E)=>{return o+=E.charAt(Math.floor(Math.random()*E.length))},"")};class En{n;opt;constructor(n){this.e=n;this.opt={duration:500,easing:"ease-in-out",fill:"forwards"}}animate(n,f={}){return this.e.animate(n,f)}get slide(){let n=({x:f=0,y:o=0},E={})=>{L(this.opt,E);let b=[[f,o],[0,0]].map(([H,Y])=>({transform:`translateX(${H}rem) translateY(${Y}rem)`}));return this.e.animate(b,this.opt),this};return{left:(f={})=>{return n({x:-2},f)},right:(f={})=>{return n({x:2},f)},up:(f={})=>{return n({y:2},f)},down:(f={})=>{return n({y:-2},f)}}}fade(n={}){L(this.opt,n);let f=[0,1].map((o)=>({opacity:o}));return this.e.animate(f,this.opt),this}shake(n="Y",f={}){L(this.opt,f);let o=[0,5,-5,5,0].map((E)=>({transform:`translate${n}(${E}px)`}));return this.e.animate(o,this.opt),this}color(n=[],f={}){L(this.opt,f);let o=Array.isArray(n)?n.map((E)=>({color:E})):{color:n};return this.e.animate(o,this.opt),this}bg(n=[],f={}){L(this.opt,f);let o=Array.isArray(n)?n.map((E)=>({backgroundColor:E})):{backgroundColor:n};return this.e.animate(o,this.opt),this}bounce(n=1,f={}){L(this.opt,f);let o=[0.5,n,1].map((E)=>({transform:`scale(${E})`}));return this.e.animate(o),this}}class bn{n;f;constructor(n,f){this.e=n;this.query=f}get a(){return new En(this)}get all(){if(this.query){let n=document.querySelectorAll(this.query);if(n.length)return Array.from(n).map((f)=>$(f))}return[]}get attr(){let n=this.e;return{has:(f)=>{return n.hasAttribute(f)},get:(f)=>{return n.getAttribute(f)},del:(f)=>{return n.removeAttribute(f),this},set:(f)=>{for(let o in f){let E=f[o];if(f[o]!==void 0)n.setAttribute(o,E?E:"")}return this}}}get children(){return Array.from(this.e.children).map((n)=>$(n))}get click(){return this.e.click(),this}get delete(){return this.e.remove(),this}get disabled(){return this.e.disabled??!1}get focus(){return this.e.focus(),this}get id(){return this.e.id}get inner(){return this.e.innerHTML}get offsetParent(){let n=this.e.offsetParent;if(n)return new e(n);return}get parent(){let n=this.e.parentElement;if(n)return new e(n);return}get rect(){return this.e.getBoundingClientRect()}get remove_element(){return this.e.remove(),this}get style(){let n=this.e.style,f=this;return{set:(o,E=0)=>{let b=n,H=()=>{h(o).forEach(([Y,j])=>{if(Y in b){if(b[Y]!==j)b[Y]=j}else if(j!==null)n.setProperty(Y,String(j))})};if(G(E))f.on("transitionend",E);if(a(E))setTimeout(H,E);else H();return f},get:(o)=>{return n.getPropertyValue(o.toString())},del:(...o)=>{o.forEach((E)=>{n.removeProperty(E.toString())})}}}get submit(){let n=this.e;if("submit"in n)return n.submit();return!1}get tag(){return this.e.tagName.toLowerCase()}get value(){return this.e.value??""}set append(n){if(n instanceof O){let f=n.__();C(f.attr),this.e.insertAdjacentHTML("beforeend",f.ctx)}else this.e.insertAdjacentHTML("beforeend",n)}set appendfirst(n){if(n instanceof O){let f=n.__();C(f.attr),this.e.insertAdjacentHTML("afterbegin",f.ctx)}else this.e.insertAdjacentHTML("afterbegin",n)}set disabled(n){let f=this.e;if("disabled"in f)f.disabled=n}set inner(n){let f=n;if(n instanceof O){let o=n.__();C(o.attr),f=o.ctx}this.e.innerHTML=f}set id(n){this.e.id=n}set value(n){let f=this.e;f.value=n}}class e extends bn{constructor(n,f){super(n,f)}add(...n){return this.e.classList.add(...n.map((f)=>f.replace(/[^\w-]/,""))),this}remove(...n){return this.e.classList.remove(...n.map((f)=>f.replace(/[^\w-]/,""))),this}toggle(n,f){let o=typeof n!="string"?n.apply(this):n,E=this.e.classList;return o.split(" ").forEach((b)=>{E.toggle(b,f)}),this}has(n){return this.e.contains(n)}insert(n){return{HTML:(...f)=>{return f.forEach((o)=>{this.e.insertAdjacentHTML(n,o)}),this},element:(...f)=>{return f.forEach((o)=>{this.e.insertAdjacentElement(n,o)}),this},text:function(...f){return f.forEach((o)=>{this.e.insertAdjacentText(n,o)}),this}}}is(n){let f=this.e.classList.value.split(" "),o=this.e.tagName.toLocaleLowerCase(),E=!0,b=!0;if(n.dom)b=n.dom==o?!0:!1;if(n.class)if(Array.isArray(n.class))n.class.forEach((H)=>{E=E?f.includes(H):!1});else E=E?f.includes(n.class):!1;return E&&b}on(n,f,o=!1){let E=!1;if(n.indexOf("touch")>-1)E=!0;return this.e.addEventListener(n,f,{capture:o,passive:E}),this}remove_on(n,f,o=!1){return this.e.removeEventListener(n,f,o),this}timed(n,f=250){return setTimeout(()=>n(this),f),this}animate(n,f,o){let E={duration:300,easing:"ease",fill:"forwards"};if(G(f))o=f;else L(E,f);let b=this.e.animate(n,E);if(o)b.finished.then(o);return this}}function $(n){if(u(n)){let f=document.querySelector(n);if(f)return new e(f,n);return}else return new e(n)}var q=new s,z=new s,c=new s;class S{_c=0;id="";constructor(n){if(this._c=0,this.id=n??m(5),n&&n.includes("_")){let f=n.split("_"),o=f.slice(-1).toString(),E=M(o);this.id=f.slice(0,-1).join("_"),this._c=E?parseInt(o):0}}get mid(){return this.id+"_"+ ++this._c}}var On=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],sn=(n)=>On.includes(n);function Fn(){let n=window,f=document;n.addEventListener("resize",function(o){z.forEach((E,b)=>{if(E.resize){let H=f.getElementById(b);if(H)E.resize.call(H,o.target);else z.delete(b)}})}),n.addEventListener("beforeunload",function(o){z.forEach((E,b)=>{if(E.unload){let H=f.getElementById(b);if(H)E.unload.call(H,o.target);else z.delete(b)}})}),n.addEventListener("popstate",function(o){z.forEach((E,b)=>{if(E.popstate){let H=f.getElementById(b);if(H)E.popstate.call(H,o.target);else z.delete(b)}})})}function zn(n,f,o,E){let[b,H]=E,Y=b(o.e),j=o.id;if(j){let Q=new S(j),K=new s,[B,J]=X(Y,K,Q);if(H!==B)return q.get(n).get(f)[1]=B,K.size&&C(K),o.inner=B,!0}return!1}function _(n,f=!1,o=!0){let E=document;if(q.size)for(let[b,H]of q)if(H.size){let Y=E.getElementById(b);if(Y){let j=$(Y),Q=!1,K=f?"dom":"dom_ctx",B=H.get(K);if(o&&B)Q=zn(b,K,j,B);if(Q)_("doms",!1,!1);else for(let[J,Z]of H)switch(J){case"dom":case"dom_ctx":break;case"ctx":let[D,x]=Z,N=new s,[R]=X(D(Y),N);if(x!=R){j.inner=R,N.size&&C(N);let g=q.get(b)?.get(J);if(g)g[1]=R}break;case"on":q.get(b)?.delete(J),h(Z).forEach(([g,U])=>{if(G(U)){let P=U;if(g==="ready")U.apply(Y);else if(["resize","unload","popstate"].includes(g))z.set(b,{[g]:P});else if(g==="watch"){let T=U.apply(Y);if(T){let A=F(T)?T:[T];A.length&&c.set(b,A)}}else j.on(g,P)}});break;case"style":let W={};h(Z).forEach(([g,U])=>{let[P,T]=U,A=P(Y);if(A!==T)W[g]=A,L(q.get(b)?.get(J)??{},{[g]:[P,A]})}),nn(W)&&j.style.set(W);break;default:let[l,Ln]=Z,i=l(Y);if(Array.isArray(i))i=i.filter((g)=>g!="").join(" ");if(i!=Ln)j.attr.set({[J]:i}),q.get(b)?.set(J,[l,i]);break}}else q.delete(b)}else q.delete(b);c.forEach((b)=>{b.forEach((H)=>{if("update"in H)H.update})})}var k=(n,f)=>{if(n instanceof O&&f)n.component=!1;else if(F(n))n.forEach((o)=>k(o,f))};function Sn(n,f){if(typeof f==="object"&&F(f)&&!w(f[0]))return f.join("")===n.join("");return n===f}function Hn(n,f,o){let[E,b]=n,H=E==="style";if(G(b)){let Y=b();Hn([E,Y],f,o),o.set(E,[b,Y])}else if(d(b)){if(H){let Y=h(b).map(([j,Q])=>{let K=on(j),B=Q;if(G(Q)){if(B=Q(),!o.has("style"))o.set("style",{});L(o.get("style"),{[K]:[Q,B]})}return`${K}:${B}`}).join(";");f.set("style",Y)}else if(E==="on")o.set(E,b)}else{let Y=(F(b)?b.flat():[b]).filter((j)=>j!==void 0);f.set(E,Y.map((j)=>v(j)?j?"":"false":String(j)).join(" "))}}function X(n,f,o=new S){let E=F(n)?n.flat():[n],b=!0,H=!1;return[E.map((j)=>{if(j instanceof O){H=!0,b=j.component;let Q=j.__(o);return f.map(Q.attr),Q.ctx}if(w(j))return JSON.stringify(j);return String(j===void 0?"":j)}).join(""),H,b]}function t(n,f=!1){k(n,f);let o=n;return[()=>o,(Y)=>{if(Sn(o,Y))return;k(Y,f),o=Y,_("state",f)},{}]}class O{n;f;o;component=!0;constructor(n,f,o=[]){this.tag=n;this._attr=f;this._ctx=o}__(n=new S){let f=n.mid,o=new s,E=new s,b=[],H=new s;if(this._attr)h(this._attr).forEach((J)=>{Hn(J,E,o)});let Y=this._ctx.length,j=[];if(this._ctx.forEach((J)=>{if(G(J))if(Y>1){let[Z]=X(y("div",{},J),H,n);b.push(Z)}else{let Z=J(),D=new S(f+"_0");f=D.mid;let[x,N,R]=X(Z,H,D),W=N?R?"dom_ctx":"dom":"ctx";o.set(W,[J,x]),b.push(x)}else{let[Z]=X(J,H,n);b.push(Z)}}),o.size)f=E.get("id")??E.set("id",f).get("id"),H.set(f,o);let Q=[[],...E].map(([J,Z])=>{return Z?`${J}="${Z}"`:J}).join(" "),K=this.tag,B=`<${K}${Q}>`;if(!sn(K)){if(b.length)B+=b.join("");B+=`</${K}>`}return{ctx:B,attr:H}}}function y(n,f,...o){let E=o;if(f&&f.__)E=f.__,delete f.__;if(G(n))return n(E?{...f,__:E}:E,...o);else return new O(n,f,o)}function yn(n,...f){return f.flat()}function C(n){n.size&&n.keys().forEach((f)=>{q.delete(f),c.delete(f),z.delete(f)}),q.map(n)}class Yn{n;path="";constructor(n,f){this.app=n;this.path=f?f.replace(".tsx",".js"):""}async ctx(n={}){await this.dom(n,!0)}async dom(n={},f=!1){let o="<noscript>You need to enable JavaScript to run this app.</noscript>",E=$(document.body),b=E.id;if(b){let H=new S(b+"_0"),Y=await this.app(n),j=F(Y)?Y:[Y];if(f)E.inner="";if(j.forEach((Q)=>{if(Q instanceof O){let K=Q.__(H);if(q.map(K.attr),f)E.appendfirst=K.ctx}else if(f)E.appendfirst=Q}),f)E.appendfirst=o;_("render"),Fn()}}async ssr(n={}){let f=await this.app(n),o=m(5),E=new S(o+"_0"),b=F(f)?f:[f],H=[];return b.forEach((Y)=>{if(Y instanceof O){let j=Y.__(E);H.push(j.ctx)}else H.push(Y)}),{script:`<script type="module">import x from "./${this.path}";x.dom(${fn(n)});</script>`,body:`<body id="${o}">${H.join("")}</body>`}}}class jn{n;val;_do=[];constructor(n){this.watching=n;this.val=n()}on(n,f=!0){if(this._do.push(n),f)n(this.val);return this}get update(){let n=this.watching();if(this.val!==n)this.val=n,this._do.forEach((f)=>{f(n)});return}}var In=(n,f,o="url")=>{if(n.attr.get(o)==f)n.attr.set({slc:""});else n.attr.del("slc")};class I{static _parseURL(n){let f=[],o=[],E=n,b="",H=n.match(/(?<=\?)[^/].*=?(?=\/|$)/g);if(H?.[0])b=H?.[0],E=n.slice(0,n.indexOf(b)-1);let Y=E.match(/(?<=\/)[^/].*?(?=\/|$)/g)??["/"],j={};if(Y?.forEach((Q)=>{if(Q.indexOf("<")>=0){let K=Q.match(/(?<=<)[^/].*?(?=>|$)/g);if(K?.length){let B=K[0];if(B.indexOf(":")>-1){let[J,Z]=B.split(":");f.push(J),o.push(Z)}else f.push(B)}}else f.push(Q)}),n.slice(-1)=="/"&&n.length>1)f.push("/");if(b)decodeURIComponent(b).split("&").forEach((B)=>{let[J,Z]=B.split(/\=(.*)/,2);j[J]=Z});return{parsed:f,wcard:o,query:j}}static _type(n,f=!1){let o=[];if(M(n))o=[Number(n),"number"];else if(f&&n.indexOf(".")>=1)o=[n,"file"];else{let E="-";if(n.length==36){let b=n.match(/\-/g);if(b&&b.length==4)E="uuid";else E="string"}else if(n!="/")E="string";o=[n,E]}return o}}function Vn(n,f){let o=n[0],E=n.slice(1);switch(o){case"*":return f.includes(E);case"^":return f.startsWith(E);case"&":return f.endsWith(E);default:return!1}}class Kn{n;maps={};wild=[];pathname;constructor(n){this.basePath=n;this.pathname="pathname"in location?location?.pathname.slice(0,-1):""}push(n){let f=["string","number","uuid"],{parsed:o,wcard:E}=I._parseURL(n);if(E.length)this.wild.push(n);else for(let b=0;b<o.length;b++)if(f.includes(o[b])){this.wild.push(n);break}}match(n){let f=this.wild,{parsed:o}=I._parseURL(n),E="",b="",H=0,Y=0;if(o.forEach((j,Q)=>{for(let K=0;K<f.length;K++){let{parsed:B,wcard:J}=I._parseURL(f[K]);if(B.length==o.length&&J.length)if(j==B[Q]){b=f[K],H++;break}else if(J[Y]){let Z=J[Y];if(Y++,Vn(Z,j)){b=f[K],H++;break}}else{let Z=I._type(j);if(B[Q]==Z[1]){b=f[K],H++;break}}}}),!b||H!=o.length)o.forEach((j,Q)=>{for(let K=0;K<f.length;K++){let{parsed:B}=I._parseURL(f[K]);if(B.length==o.length)if(j==B[Q]){E=f[K];break}else{let[J,Z]=I._type(j);if(B[Q]==Z){E=f[K];break}}}});return H==o.length?b:E}url(n){if(n in this.maps)return[n,!1];else{let f=this.match(n);if(f&&f in this.maps)return[f,!0]}return["",!1]}path(n,{file:f,title:o=""}){let E=this.basePath;if(this.push(n),G(f))this.maps[n]={js:f,title:o};else{let b=this.pathname+(E?E+f:f);this.maps[n]={js:b.replaceAll("//","/"),title:o}}}}class Qn{map;pushState;url="";attr;isSheet;_page;_nav;_title;page;nav;title;e;constructor(n={}){[this.page,this._page]=t(y("div",void 0,""),!0),[this.nav,this._nav]=t("/"),[this.title,this._title]=t(""),this.pushState=n.pushState??!0,this.isSheet=n.isSheet??!1,this.attr=n.isSheet?"surl":"url",this.map=new Kn(n.basePath)}init(n,...f){this.e=n;let o=this.nav,E=this._nav,b=this.attr,H=(Y,j)=>{if(Y!==j)this.get(Y,j),E(Y);f.forEach((Q,K)=>{Q(this.isSheet&&K==0?!0:!1)})};return $(`[${b}]`)?.all.forEach((Y)=>{if(!Y.attr.has("nav"))Y.attr.set({nav:null}),Y.on("click",function(Q){Q.preventDefault();let K=$(this),B=K.attr.get(b);if(B)H(B,o())})}),this}afterImp(n,f,o,E=!1){if(this._title(f),this.init(this.e),!this.isSheet){if(location.pathname!==o)this.pushState&&history.pushState({},f,o);!E&&this.e&&this.e.scrollTo({top:n.sT,behavior:"instant"})}}async import(n,f,o=!1){let E=async(b)=>{this._page(await b()),this.afterImp(n,document.title,f)};if(u(n.js)){let b=await import((location.pathname?"":".")+n.js);if("default"in b){this._page(await b.default({...o&&{url:f}}));let H=n.title??document.title;!this.isSheet&&(document.title=H),this.afterImp(n,H,f)}else this._page(y("div",void 0,"error: js has no export defaults."))}else E(n.js)}sheet(n){let[f,o]=this.map.url(n);if(f)this.import(this.map.maps[f],n,o);return this}reset(){this._page(y("div",void 0,""))}async get(n,f){if(f){let[b,H]=this.map.url(f);if(b&&this.e)this.map.maps[b].sT=this.e.scrollTop??0}let[o,E]=this.map.url(n);if(o)this.url=n,this._nav(n),!this.isSheet&&$(`[${this.attr}]`)?.all.forEach((b)=>In(b,n)),await this.import(this.map.maps[o],n,E);else this._page(y("div",void 0,`"${n}" - not found...`));return this}path(n,{file:f,title:o=""}){return this.map.path(n,{file:f,title:o}),this}}var r={},V={};class Jn{stream;url;constructor(n,f){if(this.url=n,n in r)this.stream=r[n];else this.stream=new EventSource(n,{withCredentials:f}),r[n]=this.stream,V[this.url]={}}on(n){let f=this.stream;return h(n).forEach(([o,E])=>{if(o in V[this.url])V[this.url][o].forEach((b)=>{this.stream.removeEventListener(o,b)}),V[this.url][o]=[];if(f.addEventListener(o,E),!(o in V[this.url]))V[this.url][o]=[];V[this.url][o].push(E)}),this}}function bf(n,f=!0){return new Jn(n,f)}function Bn(n){return!isNaN(parseFloat(n))&&isFinite(n)}class Zn{n;constructor(n){this.value=n}get str(){return String(this.value).toString()=="null"?null:String(this.value).toString()}get int(){if(Bn(this.value))return parseInt(this.value);else return null}get float(){if(Bn(this.value))return parseFloat(this.value);else return null}get bool(){if(this.value==="true")return!0;else if(this.value=="false")return!1;else return null}get json(){if(this.value)return JSON.parse(this.value);return null}}class p{key;func;storage;constructor(n,f="local"){if(typeof n=="object"){let[o,E]=h(n)[0];this.key=o,this.func=E}else this.key=n,this.func=null;this.storage=f=="local"?localStorage:sessionStorage}get as(){return new Zn(this.storage.getItem(this.key))}get value(){return this.storage.getItem(this.key)}get save(){if(this.func)this.set=this.func();return}set set(n){if(typeof n=="object")this.storage.setItem(this.key,JSON.stringify(n));else this.storage.setItem(this.key,String(n))}get remove(){this.storage.removeItem(this.key);return}}var Hf={get:(n)=>new p(n)},Yf={get:(n)=>new p(n,"session")};class Un{static set p(n){if(F(n))console.log(...n);else console.log(n)}static get isDark(){return window.matchMedia("(prefers-color-scheme: dark)").matches}}if(typeof window==="undefined")Object.assign(global,{window:{location:{pathname:""}},document:{querySelector:()=>({}),querySelectorAll:()=>({})},location:{location:{pathname:""}},localStorage:{},sessionStorage:{},navigator:{},history:{},screen:{},performance:{}});var Tn=new RegExp(/\/\/(.*?\w.*?$)/);function An(n,f){let o=f;if(n){let E=Tn.exec(n);if(E?.length==2){let b=0;if(f.startsWith("..")){f.split("/").forEach((Q)=>{if(Q=="..")b+=1});let H=f.split("/").slice(b).join("/"),Y=E[1].split("/").slice(1,-1);o=Y.slice(0,Y.length-b).join("/")+"/"+H}else if(f.startsWith(".")){let H=f.split("/").slice(1).join("/");o=E[1].split("/").slice(1,-1).join("/")+"/"+H}}return"./"+o}return o}function gn(n){let f=document.querySelectorAll("head link");for(let o of f)if("rel"in o){if(o.href.indexOf(n.slice(1))>-1)return!0}return!1}async function Cn(n,f){if(Array.isArray(n)){for(let E of n)await Cn(E,f);return}let o=An(f,n);if(gn(o))return;return new Promise((E,b)=>{let H=document.createElement("link");$(H).attr.set({id:"_css",rel:"preload stylesheet",type:"text/css",as:"style",href:o}),H.onload=()=>E(),H.onerror=()=>b(),$('script[type="module"]')?.insert("beforebegin").element(H)})}function qf(n,f,o){if(gn(n))return n;let E=document.createElement("link");if(E.rel="preload",E.type=o,E.as=f,E.href=n,f==="font")E.crossOrigin="anonymous";return document.head.appendChild(E),n}export{t as state,Yf as session,qf as preload,Hf as local,Cn as loadCSS,yn as frag,bf as eventStream,y as dom,jn as Watcher,Qn as Router,Yn as Render,O as Dom,Un as $$,$};