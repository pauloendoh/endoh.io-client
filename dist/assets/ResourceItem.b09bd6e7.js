var Be=Object.defineProperty,Fe=Object.defineProperties;var Ue=Object.getOwnPropertyDescriptors;var be=Object.getOwnPropertySymbols;var Ke=Object.prototype.hasOwnProperty,Ve=Object.prototype.propertyIsEnumerable;var Re=(e,t,n)=>t in e?Be(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,ae=(e,t)=>{for(var n in t||(t={}))Ke.call(t,n)&&Re(e,n,t[n]);if(be)for(var n of be(t))Ve.call(t,n)&&Re(e,n,t[n]);return e},ie=(e,t)=>Fe(e,Ue(t));import{r as $,k as G,l as J,n as Q,aZ as ke,d as Ze,F as W,ad as Ge,j as c,a as h,g as H,B as le,ar as we,au as T,aS as Je,aT as Qe,b0 as We,a5 as Xe,P as Ye,T as et,c as tt,a1 as rt,u as nt,a7 as N,b1 as at,D as it,b2 as ot,b3 as oe,b4 as lt,b5 as ct,b6 as ut,aq as st,a4 as ft,N as Te,O as Se}from"./index.5f659e0f.js";import{R as dt,v as pt}from"./ResourceMoreIcon.859fe371.js";import{R as ht}from"./ResourceThumbnail.11ac4099.js";import{c as mt}from"./colors.f3739cc4.js";var de={},vt=J.exports,yt=Q.exports;Object.defineProperty(de,"__esModule",{value:!0});var ce=de.default=void 0,gt=yt($.exports),_t=vt(G),bt=(0,_t.default)(gt.createElement("path",{d:"M16.01 11H4v2h12.01v3L20 12l-3.99-4z"}),"ArrowRightAlt");ce=de.default=bt;const xe={SkillButton:ke(Ze)(({theme:e})=>({marginRight:8,marginBottom:8,fontWeight:400})),InnerChip:ke(W)(({theme:e})=>({background:"#393939",paddingLeft:4,paddingRight:4,borderRadius:3}))};function ur(e){const{setEditingSkill:t}=Ge();return c(xe.SkillButton,{variant:"outlined",size:"small",onClick:()=>{t(e.skill)},children:h(H,{children:[c(le,{children:e.skill.name}),(e.skill.currentLevel||e.skill.goalLevel)&&h(xe.InnerChip,{ml:1,children:[e.skill.currentLevel&&!e.skill.goalLevel&&e.skill.currentLevel,!e.skill.currentLevel&&e.skill.goalLevel&&h(we,{children:["?",c(ce,{}),e.skill.goalLevel]}),e.skill.currentLevel&&e.skill.goalLevel&&h(we,{children:[e.skill.currentLevel,c(ce,{}),e.skill.goalLevel]})]})]})},e.skill.id)}var pe={},Rt=J.exports,kt=Q.exports;Object.defineProperty(pe,"__esModule",{value:!0});var Ce=pe.default=void 0,wt=kt($.exports),Tt=Rt(G),St=(0,Tt.default)(wt.createElement("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");Ce=pe.default=St;var he={},xt=J.exports,Pt=Q.exports;Object.defineProperty(he,"__esModule",{value:!0});var Ee=he.default=void 0,Ot=Pt($.exports),Mt=xt(G),Wt=(0,Mt.default)(Ot.createElement("path",{d:"M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"}),"Event");Ee=he.default=Wt;var me={},Ct=J.exports,Et=Q.exports;Object.defineProperty(me,"__esModule",{value:!0});var Le=me.default=void 0,U=Et($.exports),Lt=Ct(G),$t=(0,Lt.default)(U.createElement(U.Fragment,null,U.createElement("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"}),U.createElement("path",{d:"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"})),"Schedule");Le=me.default=$t;const Dt=()=>{const[e,t]=$.exports.useState(!1);return{isHovering:e,handleMouseEnter:()=>{t(!0)},handleMouseLeave:()=>{t(!1)}}},S={ResourceItemRoot:T(H)({}),Content:T(le)(({theme:e})=>({flexGrow:1})),TitleLinkMoreWrapper:T(H)({justifyContent:"space-between",minHeight:32}),TitleLinkWrapper:T(le)({}),IconsRow:T(W)({justifyContent:"space-between"}),IconsWrapper:T(W)(({theme:e})=>({gap:e.spacing(2)})),DueDateWrapper:T(W)(({theme:e})=>({})),CompletedWrapper:T(W)(({theme:e})=>({})),DurationWrapper:T(W)(({theme:e})=>({})),PublicReviewWrapper:T(H)(({theme:e})=>({flexDirection:"column",marginTop:e.spacing(2),marginBottom:e.spacing(1),gap:e.spacing(1)})),PrivateNoteWrapper:T(H)(({theme:e})=>({flexDirection:"column",marginTop:e.spacing(2),marginBottom:e.spacing(1),gap:e.spacing(1)}))};function It({resource:e,onChange:t}){var r;const n=((r=e.completedAt)==null?void 0:r.length)>0;return c(Je,{control:c(Qe,{checked:n,color:"primary",onChange:a=>{t(a.target.checked)}}),label:n?"Uncomplete this task":"Complete this task"})}var ve={},X={};Object.defineProperty(X,"__esModule",{value:!0});X.default=void 0;var x=$e($.exports),E=$e(We.exports);function $e(e){return e&&e.__esModule?e:{default:e}}function K(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?K=function(n){return typeof n}:K=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},K(e)}function ue(){return ue=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},ue.apply(this,arguments)}function zt(e,t){if(e==null)return{};var n=Nt(e,t),r,a;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],!(t.indexOf(r)>=0)&&(!Object.prototype.propertyIsEnumerable.call(e,r)||(n[r]=e[r]))}return n}function Nt(e,t){if(e==null)return{};var n={},r=Object.keys(e),a,o;for(o=0;o<r.length;o++)a=r[o],!(t.indexOf(a)>=0)&&(n[a]=e[a]);return n}function Ht(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Pe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function qt(e,t,n){return t&&Pe(e.prototype,t),n&&Pe(e,n),e}function At(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&se(e,t)}function se(e,t){return se=Object.setPrototypeOf||function(r,a){return r.__proto__=a,r},se(e,t)}function jt(e){var t=Ft();return function(){var r=V(e),a;if(t){var o=V(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return Bt(this,a)}}function Bt(e,t){return t&&(K(t)==="object"||typeof t=="function")?t:p(e)}function p(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Ft(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function V(e){return V=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},V(e)}function m(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ye=function(e){At(n,e);var t=jt(n);function n(){for(var r,a=arguments.length,o=new Array(a),u=0;u<a;u++)o[u]=arguments[u];return Ht(this,n),r=t.call.apply(t,[this].concat(o)),m(p(r),"state",{}),m(p(r),"extractReplaceLinksKeys",function(i){var l=p(r),f=0;return r.replacedLinks=[],i.replace(/(<a[\s]+([^>]+)>((?:.(?!\<\/a\>))*.)<\/a>)/g,function(){var s=Array.prototype.slice.call(arguments,1,4);s.key="["+"@".repeat(s[2].length-1)+"="+f+++"]",l.replacedLinks.push(s),i=i.replace(s[0],s.key)}),i}),m(p(r),"restoreReplacedLinks",function(i){return r.replacedLinks.forEach(function(l){i=i.replace(l.key,l[0])}),r.createMarkup(i)}),m(p(r),"innerText",function(i){var l=document.createElement("div"),f="innerText"in window.HTMLElement.prototype?"innerText":"textContent",s=i.innerHTML.replace(/\r\n|\r|\n/g," ");l.innerHTML=r.extractReplaceLinksKeys(s);var _=l[f],b=document.createElement("div");return b.innerHTML="foo<br/>bar",b[f].replace(/\r\n|\r/g,`
`)!==`foo
bar`&&(l.innerHTML=l.innerHTML.replace(/<br.*?[\/]?>/gi,`
`),_=l[f]),_}),m(p(r),"onResize",function(){r.calcTargetWidth()}),m(p(r),"onTruncate",function(i){var l=r.props.onTruncate;typeof l=="function"&&(r.timeout=window.requestAnimationFrame(function(){l(i)}))}),m(p(r),"calcTargetWidth",function(i){var l=p(r),f=l.elements.target,s=l.calcTargetWidth,_=l.canvasContext,b=l.props.width;if(!!f){var R=b||Math.floor(f.parentNode.getBoundingClientRect().width);if(!R)return window.requestAnimationFrame(function(){return s(i)});var v=window.getComputedStyle(f),d=[v["font-weight"],v["font-style"],v["font-size"],v["font-family"]].join(" ");_.font=d,r.setState({targetWidth:R},i)}}),m(p(r),"measureWidth",function(i){return r.canvasContext.measureText(i).width}),m(p(r),"ellipsisWidth",function(i){return i.offsetWidth}),m(p(r),"trimRight",function(i){return i.replace(/\s+$/,"")}),m(p(r),"createMarkup",function(i){return x.default.createElement("span",{dangerouslySetInnerHTML:{__html:i}})}),m(p(r),"getLines",function(){for(var i=p(r),l=i.elements,f=i.props,s=f.lines,_=f.ellipsis,b=f.trimWhitespace,R=i.state.targetWidth,v=i.innerText,d=i.measureWidth,k=i.onTruncate,y=i.trimRight,L=i.renderLine,P=i.restoreReplacedLinks,C=[],ze=v(l.text),B=ze.split(`
`).map(function(je){return je.split(" ")}),_e=!0,Ne=r.ellipsisWidth(r.elements.ellipsis),z=1;z<=s;z++){var D=B[0];if(D.length===0){C.push(),B.shift(),z--;continue}var O=D.join(" ");if(d(O)<=R&&B.length===1){_e=!1,O=P(O),C.push(O);break}if(z===s){for(var Y=D.join(" "),F=0,ee=Y.length-1;F<=ee;){var te=Math.floor((F+ee)/2),He=Y.slice(0,te+1);d(He)+Ne<=R?F=te+1:ee=te-1}var g=Y.slice(0,F);if(b)for(g=y(g);!g.length&&C.length;){var qe=C.pop();g=y(qe)}g.substr(g.length-2)==="]["&&(g=g.substring(0,g.length-1)),g=g.replace(/\[@+$/,""),g=P(g),O=x.default.createElement("span",null,g,_)}else{for(var I=0,re=D.length-1;I<=re;){var ne=Math.floor((I+re)/2),Ae=D.slice(0,ne+1).join(" ");d(Ae)<=R?I=ne+1:re=ne-1}if(I===0){z=s-1;continue}O=D.slice(0,I).join(" "),O=P(O),B[0].splice(0,I)}C.push(O)}return k(_e),C.map(L)}),m(p(r),"renderLine",function(i,l,f){if(l===f.length-1)return x.default.createElement("span",{key:l},i);var s=x.default.createElement("br",{key:l+"br"});return i?[x.default.createElement("span",{key:l},i),s]:s}),m(p(r),"styles",{ellipsis:{position:"fixed",visibility:"hidden",top:0,left:0}}),r.elements={},r.replacedLinks=[],r}return qt(n,[{key:"componentDidMount",value:function(){var a=this.elements.text,o=this.calcTargetWidth,u=this.onResize,i=document.createElement("canvas");this.canvasContext=i.getContext("2d"),o(function(){a&&a.parentNode.removeChild(a)}),window.addEventListener("resize",u)}},{key:"componentDidUpdate",value:function(a){this.props.children!==a.children&&this.forceUpdate(),this.props.width!==a.width&&this.calcTargetWidth()}},{key:"componentWillUnmount",value:function(){var a=this.elements.ellipsis,o=this.onResize,u=this.timeout;a.parentNode.removeChild(a),window.removeEventListener("resize",o),window.cancelAnimationFrame(u)}},{key:"render",value:function(){var a=this,o=this.elements.target,u=this.props,i=u.children,l=u.ellipsis,f=u.lines,s=zt(u,["children","ellipsis","lines"]),_=this.state.targetWidth,b=this.getLines,R=this.onTruncate,v,d=!!(o&&_);return typeof window!="undefined"&&d&&(f>0?v=b():(v=i,R(!1))),delete s.onTruncate,delete s.trimWhitespace,x.default.createElement("span",ue({},s,{ref:function(y){a.elements.target=y}}),x.default.createElement("span",null,v),x.default.createElement("span",{ref:function(y){a.elements.text=y}},i),x.default.createElement("span",{ref:function(y){a.elements.ellipsis=y},style:this.styles.ellipsis},l))}}]),n}(x.default.Component);X.default=ye;m(ye,"propTypes",{children:E.default.node,ellipsis:E.default.node,lines:E.default.oneOfType([E.default.oneOf([!1]),E.default.number]),trimWhitespace:E.default.bool,width:E.default.number,onTruncate:E.default.func});m(ye,"defaultProps",{children:"",ellipsis:"\u2026",lines:1,trimWhitespace:!1,width:0});Object.defineProperty(ve,"__esModule",{value:!0});var De=ve.default=void 0,M=Vt($.exports),w=We.exports,Ut=Kt(X);function Kt(e){return e&&e.__esModule?e:{default:e}}function Ie(){if(typeof WeakMap!="function")return null;var e=new WeakMap;return Ie=function(){return e},e}function Vt(e){if(e&&e.__esModule)return e;if(e===null||A(e)!=="object"&&typeof e!="function")return{default:e};var t=Ie();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){var o=r?Object.getOwnPropertyDescriptor(e,a):null;o&&(o.get||o.set)?Object.defineProperty(n,a,o):n[a]=e[a]}return n.default=e,t&&t.set(e,n),n}function A(e){return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?A=function(n){return typeof n}:A=function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},A(e)}function Zt(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function Oe(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Gt(e,t,n){return t&&Oe(e.prototype,t),n&&Oe(e,n),e}function Jt(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&fe(e,t)}function fe(e,t){return fe=Object.setPrototypeOf||function(r,a){return r.__proto__=a,r},fe(e,t)}function Qt(e){var t=Yt();return function(){var r=Z(e),a;if(t){var o=Z(this).constructor;a=Reflect.construct(r,arguments,o)}else a=r.apply(this,arguments);return Xt(this,a)}}function Xt(e,t){return t&&(A(t)==="object"||typeof t=="function")?t:q(e)}function q(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function Yt(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch{return!1}}function Z(e){return Z=Object.setPrototypeOf?Object.getPrototypeOf:function(n){return n.__proto__||Object.getPrototypeOf(n)},Z(e)}function j(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var ge=function(e){Jt(n,e);var t=Qt(n);function n(r){var a;return Zt(this,n),a=t.call(this,r),j(q(a),"_isMounted",!1),j(q(a),"handleTruncate",function(o){a._isMounted&&o!==a.state.truncated&&(a.setState({truncated:o}),o&&a.truncateRef.onResize())}),j(q(a),"toggleLines",function(o){o.preventDefault();var u=q(a);if(!u.props.expandByClick){u.props.onClick&&u.props.onClick(u.state.expanded);return}a._isMounted&&a.setState({expanded:!a.state.expanded},function(){u.props.onClick&&u.props.onClick(u.state.expanded)})}),a.state={expanded:!1,truncated:!1},a}return Gt(n,[{key:"componentDidMount",value:function(){this._isMounted=!0;var a=this;this._isMounted&&this.setState({expanded:a.props.expanded})}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"render",value:function(){var a=this,o=this.props,u=o.children,i=o.more,l=o.less,f=o.lines,s=o.anchorClass,_=o.className,b=o.width,R=o.keepNewLines,v=o.truncatedEndingComponent,d=this.state,k=d.expanded,y=d.truncated;return M.default.createElement("div",{className:_},M.default.createElement(Ut.default,{width:b,lines:!k&&f,ellipsis:M.default.createElement("span",null,v,M.default.createElement("a",{href:"",className:s,onClick:this.toggleLines},i)),onTruncate:this.handleTruncate,ref:function(P){return a.truncateRef=P}},R?u.split(`
`).map(function(L,P,C){return L=M.default.createElement("span",{key:P},L),P===C.length-1?L:[L,M.default.createElement("br",{key:P+"br"})]}):u),!y&&k&&M.default.createElement("span",null," ",M.default.createElement("a",{href:"",className:s,onClick:this.toggleLines},l)))}}]),n}(M.Component);j(ge,"defaultProps",{lines:3,more:"Show more",less:"Show less",anchorClass:"",onClick:void 0,expanded:!1,width:0,keepNewLines:!1,truncatedEndingComponent:"... ",expandByClick:!0});j(ge,"propTypes",{children:w.PropTypes.node,lines:w.PropTypes.number,more:w.PropTypes.node,less:w.PropTypes.node,anchorClass:w.PropTypes.string,className:w.PropTypes.string,onClick:w.PropTypes.func,expanded:w.PropTypes.bool,width:w.PropTypes.number,keepNewLines:w.PropTypes.bool,truncatedEndingComponent:w.PropTypes.node,expandByClick:w.PropTypes.bool});var er=ge;De=ve.default=er;function Me(e){const t=Xe();return c(Ye,{style:{padding:16,background:t.palette.grey[900],border:mt.border},children:c(et,{color:"textSecondary",style:{whiteSpace:"pre-line"},children:c(De,{keepNewLines:!0,children:e.text})})})}function tr(e){var f,s,_,b,R,v;const{setSuccessMessage:t}=rt(),{handleMouseEnter:n,handleMouseLeave:r,isHovering:a}=Dt(),o=d=>{const k=ie(ae({},e.resource),{rating:d});Te.post(Se.relearn.resource,k).then(y=>{e.setResources(y.data),k.rating?t("Resource rated!"):t("Rating removed!")})},u=d=>{const k=ie(ae({},e.resource),{completedAt:d?new Date().toISOString():"",rating:null});Te.post(Se.relearn.resource,k).then(y=>{e.setResources(y.data),t(d?"Task completed!":"Task uncompleted!")})},i=e.resource.dueDate.length>0&&e.resource.completedAt.length===0,l=nt();return h(S.ResourceItemRoot,{onClick:d=>{d.altKey&&(d.preventDefault(),e.editResource(e.resource))},onMouseEnter:n,onMouseLeave:r,className:"resource-item",children:[c(ht,{resourceUrl:e.resource.url,thumbnailSrc:e.resource.thumbnail,linkable:!0}),h(S.Content,{children:[h(S.TitleLinkMoreWrapper,{children:[h(S.TitleLinkWrapper,{children:[c(N,{children:e.resource.title}),e.resource.url.length>0&&c(at,{href:e.resource.url,target:"_blank",onClick:d=>{d.altKey||d.stopPropagation()},style:{maxWidth:400,overflow:"hidden",marginRight:16},children:c(N,{noWrap:!0,style:{maxWidth:"inherit"},children:e.resource.url})})]}),c(dt,{resource:e.resource,isHovered:a})]}),h(S.IconsRow,{children:[h(S.IconsWrapper,{children:[i&&h(S.DueDateWrapper,{children:[c(Ee,{fontSize:"inherit",style:{marginRight:4}}),it.fromISO(e.resource.dueDate).toFormat("LLL dd")]}),e.resource.completedAt.length>0&&h(S.CompletedWrapper,{children:[c(Ce,{})," ",c(ot,{date:e.resource.completedAt,live:!1})]}),pt(e.resource.estimatedTime)&&h(S.DurationWrapper,{children:[c(Le,{style:{marginRight:4}}),e.resource.estimatedTime]}),e.showTag&&Boolean((f=e.resource.tag)==null?void 0:f.id)&&h(W,{style:{gap:4},children:[c(oe.Label,{style:{color:(s=e.resource.tag)==null?void 0:s.color}}),c(N,{variant:"body2",noWrap:!0,style:{width:150},children:(_=e.resource.tag)==null?void 0:_.name})]})]}),((b=e.resource.url)==null?void 0:b.length)>0?c(lt,{resource:e.resource,onChange:o}):c(It,{resource:e.resource,onChange:u})]}),((R=e.resource.publicReview)==null?void 0:R.length)>0&&h(S.PublicReviewWrapper,{children:[h(W,{style:{gap:4},children:[c(oe.Public,{style:{color:l.palette.text.secondary}}),c(N,{color:"textSecondary",children:"Public review"})]}),c(Me,{text:e.resource.publicReview})]}),((v=e.resource.privateNote)==null?void 0:v.length)>0&&h(S.PrivateNoteWrapper,{children:[h(W,{style:{gap:4},children:[" ",c(oe.Lock,{style:{color:l.palette.text.secondary}}),c(N,{color:"textSecondary",children:"Private notes"})]}),c(Me,{text:e.resource.privateNote})]})]})]})}const rr=e=>({}),nr=e=>({editResource:t=>e(ct(t)),removeResource:t=>e(ut(t)),moveResource:t=>e(st(t)),setResources:t=>e(ft(t))});var sr=tt(rr,nr)(tr);export{sr as R,ur as S};
