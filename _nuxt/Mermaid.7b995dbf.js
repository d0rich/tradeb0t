import{a as f,i as _,j as C,r as v,k as g,l as n,m as k,o as s,b as r,e as c,p as h,u as o,t as y,c as x,q as B,s as M,v as D}from"./entry.f8f7a6e3.js";/* empty css                    */import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const N={ref:"root",class:"mermaid-container"},V=["textContent"],b={key:0,class:"mermaid-placeholder font-serif"},w=f({__name:"Mermaid",props:{code:null},setup(i){const d=i,{$mermaid:t}=_(),l=C(()=>atob(d.code)),m=v(g().contentMermaid.spinnerComponent),a=n(null),e=n(!0);async function p(){if(e.value=!0,a.value&&t){try{await t.run({nodes:[a.value],suppressErrors:!0})}catch{}e.value=!1}}return k(()=>{p()}),(u,A)=>(s(),r("figure",N,[c("pre",{ref_key:"codeBlock",ref:a,class:h({"opacity-0":o(e)}),textContent:y(o(l))},null,10,V),c("div",null,[o(e)?(s(),r("div",b,[(s(),x(B(o(m)),{class:"mermaid-placeholder__spinner"})),M(" Mermaid diagram is loading... ")])):D("",!0)])],512))}});export{w as default};