(this.webpackJsonpmarvel=this.webpackJsonpmarvel||[]).push([[3],{29:function(e,t,c){"use strict";var a=c.p+"static/media/error.42292aa1.gif",s=c(3);t.a=()=>Object(s.jsx)("img",{style:{display:"block",width:"250px",height:"250px",objectFit:"contain",margin:"0 auto"},src:a,alt:"error"})},30:function(e,t,c){"use strict";var a=c(0);t.a=()=>{const{loading:e,request:t,error:c,clearError:s}=(()=>{const[e,t]=Object(a.useState)(!0),[c,s]=Object(a.useState)(null);return{loading:e,request:Object(a.useCallback)((async function(e){let c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{"Content-Type":"application/json"};t(!0);try{const s=await fetch(e,{method:c,body:a,headers:n});if(!s.ok)throw new Error("Could not fetch ".concat(e,", status: ").concat(s.status));const r=await s.json();return t(!1),r}catch(r){throw t(!1),s(r.message),r}}),[]),error:c,clearError:Object(a.useCallback)((()=>s(null)),[])}})(),n="https://gateway.marvel.com:443/v1/public/",r="apikey=64e87f61f8b009b9b44a4206749f6d05",i=220,l=e=>({id:e.id,name:e.name,description:e.description?"".concat(e.description.slice(0,210),"..."):"There is no description for this character",thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,homepage:e.urls[0].url,wiki:e.urls[1].url,comics:e.comics.items}),o=e=>{var t;return{id:e.id,title:e.title,thumbnail:e.thumbnail.path+"."+e.thumbnail.extension,price:e.prices[0].price?"".concat(e.prices[0].price,"$"):"not available",description:e.description||"There is no description",pageCount:e.pageCount?"".concat(e.pageCount," p."):"No information about the number of pages",language:(null===(t=e.textObjects[0])||void 0===t?void 0:t.language)||"en-us"}};return{loading:e,error:c,getAllCharacters:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;const c=await t("".concat(n,"characters?limit=9&offset=").concat(e,"&").concat(r));return c.data.results.map(l)},getCharacter:async e=>{const c=await t("".concat(n,"characters/").concat(e,"?").concat(r));return l(c.data.results[0])},clearError:s,getAllComics:async function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i;const c=await t("\n    ".concat(n,"/comics?limit=8&offset=").concat(e,"&").concat(r,"\n    "));return c.data.results.map(o)},getComic:async e=>{const c=await t("\n    ".concat(n,"/comics/").concat(e,"?").concat(r,"\n    "));return o(c.data.results[0])}}}},31:function(e,t,c){},32:function(e,t,c){},33:function(e,t,c){},34:function(e,t,c){},40:function(e,t,c){"use strict";c.r(t);var a=c(0),s=c(10),n=c(29),r=c(30),i=(c(31),c.p+"static/media/mjolnir.61f31e18.png"),l=c(3);const o=e=>{let{char:t}=e;const{name:c,description:a,thumbnail:s,homepage:n,wiki:r}=t;return Object(l.jsxs)("div",{className:"randomchar__block",children:[Object(l.jsx)("img",{src:s,alt:"Random character",className:"randomchar__img",style:"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===s?{objectFit:"contain"}:{}}),Object(l.jsxs)("div",{className:"randomchar__info",children:[Object(l.jsx)("p",{className:"randomchar__name",children:c}),Object(l.jsx)("p",{className:"randomchar__descr",children:a}),Object(l.jsxs)("div",{className:"randomchar__btns",children:[Object(l.jsx)("a",{href:n,className:"button button__main",children:Object(l.jsx)("div",{className:"inner",children:"homepage"})}),Object(l.jsx)("a",{href:r,className:"button button__secondary",children:Object(l.jsx)("div",{className:"inner",children:"Wiki"})})]})]})]})};var j=()=>{const[e,t]=Object(a.useState)({}),{loading:c,error:j,getCharacter:h,clearError:d}=Object(r.a)();Object(a.useEffect)((()=>{m()}),[]);const b=e=>{t(e)},m=()=>{d();const e=Math.floor(400*Math.random()+1011e3);h(e).then(b)},u=j?Object(l.jsx)(n.a,{}):null,O=c?Object(l.jsx)(s.a,{}):null,_=c||j?null:Object(l.jsx)(o,{char:e});return Object(l.jsxs)("div",{className:"randomchar",children:[u,O,_,Object(l.jsxs)("div",{className:"randomchar__static",children:[Object(l.jsxs)("p",{className:"randomchar__title",children:["Random character for today!",Object(l.jsx)("br",{}),"Do you want to get to know him better?"]}),Object(l.jsx)("p",{className:"randomchar__title",children:"Or choose another one"}),Object(l.jsx)("button",{className:"button button__main",onClick:m,children:Object(l.jsx)("div",{className:"inner",children:"try it"})}),Object(l.jsx)("img",{src:i,alt:"mjolnir",className:"randomchar__decoration"})]})]})},h=c(27),d=c(28);c(32);var b=e=>{const[t,c]=Object(a.useState)([]),[i,o]=Object(a.useState)(!1),[j,b]=Object(a.useState)(210),[m,u]=Object(a.useState)(!1),{loading:O,error:_,getAllCharacters:x}=Object(r.a)();Object(a.useEffect)((()=>(p(j,!0),()=>{})),[]),Object(a.useEffect)((()=>{i&&!O&&p(j)}),[i]);const p=(e,t)=>{o(!t),x(e).then(g).finally((()=>o(!1)))},g=e=>{let t=!1;e.length<9&&(t=!0);const a=s=>{s<e.length?(c((t=>[...t,e[s]])),setTimeout((()=>a(s+1)),100)):(b((t=>t+e.length)),u(t))};a(0)},v=Object(a.useRef)([]),f=e=>{v.current.forEach((e=>{e.classList.remove("char__item_selected")})),v.current[e].classList.add("char__item_selected"),v.current[e].focus()};const N=function(t){const c=t.map(((t,c)=>{let a={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===t.thumbnail&&(a={objectFit:"unset"}),Object(l.jsx)(h.a,{timeout:500,classNames:"char__item",children:Object(l.jsxs)("li",{className:"char__item",ref:e=>v.current[c]=e,onClick:()=>{e.onCharSelected(t.id),f(c)},onKeyDown:a=>{" "!==a.key&&"Enter"!==a.key||(e.onCharSelected(t.id),f(c))},tabIndex:0,children:[Object(l.jsx)("img",{src:t.thumbnail,alt:t.name,style:a}),Object(l.jsx)("div",{className:"char__name",children:t.name})]},t.id)},t.id)}));return Object(l.jsx)(d.a,{component:"ul",className:"char__grid",children:c})}(t),k=_?Object(l.jsx)(n.a,{}):null,y=O&&!i?Object(l.jsx)(s.a,{}):null;return Object(l.jsxs)("div",{className:"char__list",children:[k,y,N,Object(l.jsx)("button",{className:"button button__main button__long",disabled:i,style:{display:m?"none":"block"},onClick:()=>o(!0),children:Object(l.jsx)("div",{className:"inner",children:"load more"})})]})};c(33);var m=()=>Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)("p",{className:"char__select",children:"Please select a character to see information"}),Object(l.jsxs)("div",{className:"skeleton",children:[Object(l.jsxs)("div",{className:"pulse skeleton__header",children:[Object(l.jsx)("div",{className:"pulse skeleton__circle"}),Object(l.jsx)("div",{className:"pulse skeleton__mini"})]}),Object(l.jsx)("div",{className:"pulse skeleton__block"}),Object(l.jsx)("div",{className:"pulse skeleton__block"}),Object(l.jsx)("div",{className:"pulse skeleton__block"})]})]});c(34);const u=e=>{let{char:t}=e;const{name:c,description:a,thumbnail:s,homepage:n,wiki:r,comics:i}=t;let o={objectFit:"cover"};return"http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"===s&&(o={objectFit:"unset"}),i.length,Object(l.jsxs)(l.Fragment,{children:[Object(l.jsxs)("div",{className:"char__basics",children:[Object(l.jsx)("img",{src:s,alt:c,style:o}),Object(l.jsxs)("div",{children:[Object(l.jsx)("div",{className:"char__info-name",children:c}),Object(l.jsxs)("div",{className:"char__btns",children:[Object(l.jsx)("a",{href:n,className:"button button__main",children:Object(l.jsx)("div",{className:"inner",children:"homepage"})}),Object(l.jsx)("a",{href:r,className:"button button__secondary",children:Object(l.jsx)("div",{className:"inner",children:"wiki"})})]})]})]}),Object(l.jsx)("div",{className:"char__descr",children:a}),Object(l.jsx)("div",{className:"char__comics",children:"Comics:"}),Object(l.jsxs)("ul",{className:"char__comics-list",children:[i.length>0?null:"Comics not found",i.map(((e,t)=>{const c=e.resourceURI.slice(-5);if(!(t>9))return Object(l.jsx)("li",{className:"char__comics-item",children:Object(l.jsx)("a",{href:"/comics/".concat(c),children:e.name})},t)}))]})]})};var O=e=>{const[t,c]=Object(a.useState)(null),[i,o]=Object(a.useState)(!1),{error:j,getCharacter:h,clearError:d}=Object(r.a)();Object(a.useEffect)((()=>{O()}),[]),Object(a.useEffect)((()=>{O()}),[e.charId]);const b=e=>{c(e),o(!1)},O=()=>{const{charId:t}=e;t&&(o(!0),d(),h(t).then(b))},_=t||i||j?null:Object(l.jsx)(m,{}),x=j?Object(l.jsx)(n.a,{}):null,p=i?Object(l.jsx)(s.a,{}):null,g=i||j||!t?null:Object(l.jsx)(u,{char:t});return Object(l.jsxs)("div",{className:"char__info",children:[_,x,p,g]})};class _ extends a.Component{constructor(){super(...arguments),this.state={error:!1}}componentDidCatch(e,t){console.log(e,t),this.setState({error:!0})}render(){return this.state.error?Object(l.jsx)(n.a,{}):this.props.children}}var x=_;t.default=()=>{const[e,t]=Object(a.useState)(null);return Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(x,{children:Object(l.jsx)(j,{})}),Object(l.jsxs)("div",{className:"char__content",children:[Object(l.jsx)(x,{children:Object(l.jsx)(b,{onCharSelected:e=>{t(e)}})}),Object(l.jsx)(x,{children:Object(l.jsx)(O,{charId:e})})]})]})}}}]);
//# sourceMappingURL=3.9621048a.chunk.js.map