import{m as v,a as t,aN as B,j as e,aA as m,aC as g,g as o,B as r,u as N,bc as T,b1 as j,aB as U,af as I,T as h,c as A,ae as F,r as d,N as W,at as q,aY as z,G as S,P as f,F as x,bz as C}from"./index.5f659e0f.js";import{s as D}from"./siteTitles.45ed3843.js";import{R as G,S as M}from"./ResourceItem.b09bd6e7.js";import"./ResourceMoreIcon.859fe371.js";import"./Edit.aa6ffe9d.js";import"./ResourceThumbnail.11ac4099.js";import"./colors.f3739cc4.js";const $=s=>{const i=E();return t(B,{component:"nav","aria-label":"Search page sidebar",style:{paddingRight:24},children:[e(m,{button:!0,selected:s.value==="all",onClick:()=>{s.onChange("all")},children:e(g,{children:t(o,{justifyContent:"space-between",children:[e(r,{children:"All"}),e(r,{className:i.counter,children:s.results.resources.length+s.results.users.length+s.results.skills.length})]})})}),e(m,{button:!0,selected:s.value==="resources",onClick:()=>{s.onChange("resources")},children:e(g,{children:t(o,{justifyContent:"space-between",children:[e(r,{children:"Resources"}),e(r,{className:i.counter,children:s.results.resources.length})]})})}),e(m,{button:!0,selected:s.value==="users",onClick:()=>{s.onChange("users")},children:e(g,{children:t(o,{justifyContent:"space-between",children:[e(r,{children:"Users"}),e(r,{className:i.counter,children:s.results.users.length})]})})}),e(m,{button:!0,selected:s.value==="skills",onClick:()=>{s.onChange("skills")},children:e(g,{children:t(o,{justifyContent:"space-between",children:[e(r,{children:"Skills"}),e(r,{className:i.counter,children:s.results.skills.length})]})})})]})},E=v(s=>({counter:{color:s.palette.grey[400]}})),Q=s=>{const i=N();return e(r,{children:s.userProfiles.map((a,b)=>t(o,{py:1,borderBottom:b===s.userProfiles.length-1?"none":"1px solid rgb(255 255 255 / 0.1)",children:[e(T,{isLink:!0,pictureUrl:a.pictureUrl,username:a.username,size:36}),t(r,{ml:2,children:[e(j,{component:U,variant:"body1",color:"inherit",to:I.user.index(a.username),children:e("b",{children:a.username})}),e(h,{style:{color:i.palette.grey[400]},children:a.fullName}),e(r,{mt:2,children:e(h,{style:{whiteSpace:"pre-line"},children:a.bio})})]})]},a.userId))})},V=s=>{const i=F(),[a,b]=d.exports.useState(""),[P,y]=d.exports.useState(!0),[l,L]=d.exports.useState(null),[n,k]=d.exports.useState("all"),R=()=>{let c=0;return l&&(c+=l.resources.length,c+=l.users.length,c+=l.skills.length),c},p=()=>n==="resources"?l.resources:l.resources.slice(0,3);return d.exports.useEffect(()=>{y(!0);const u=new URLSearchParams(i.search).get("q");b(u),document.title=D.search(u),W.get(q.api.search(u)).then(w=>{L(w.data)}).finally(()=>{y(!1)})},[i,s.resources]),e(r,{p:3,children:P?e(z,{}):e(r,{children:R()?t(S,{container:!0,children:[e(S,{item:!0,xs:3,children:e($,{value:n,onChange:k,results:l})}),t(S,{item:!0,xs:9,children:[e(r,{pt:2,children:t(h,{style:{fontSize:20},children:["Results for ",e("b",{children:a})]})}),t(r,{maxWidth:600,mt:3,children:[l.resources.length>0&&(n==="all"||n==="resources")&&e(r,{mb:4,children:e(f,{children:t(r,{p:2,children:[e(x,{mb:2,children:e(h,{children:t("b",{children:[l.resources.length," Resources"]})})}),p().map((c,u)=>e(r,{p:1,borderBottom:u===p().length-1?"none":"1px solid rgb(255 255 255 / 0.1)",children:e(G,{resource:c,showTag:!0})},c.id)),l.resources.length>3&&n==="all"&&e(r,{mt:2,children:e(C,{fullWidth:!0,onClick:()=>{k("resources")},children:"Show More"})})]})})}),l.users.length>0&&(n==="all"||n==="users")&&e(r,{mb:4,children:e(f,{children:t(r,{p:2,children:[e(x,{mb:2,children:e(h,{children:t("b",{children:[l.users.length," Users"]})})}),e(Q,{userProfiles:n==="users"?l.users:l.users.slice(0,3)}),l.users.length>3&&n==="all"&&e(r,{mt:2,children:e(C,{fullWidth:!0,onClick:()=>{k("users")},children:"Show More"})})]})})}),l.skills.length>0&&(n==="all"||n==="skills")&&e(f,{children:t(r,{p:2,children:[e(x,{mb:2,children:e(h,{children:t("b",{children:[l.skills.length," Skill"]})})}),e(o,{flexWrap:"wrap",children:l.skills.map(c=>e(M,{skill:c},c.id))})]})})]})]})]}):e(r,{children:e(h,{children:"No results :("})})})})},Y=s=>({resources:s.relearn.resources}),H=s=>({});var se=A(Y,H)(V);export{se as default};
