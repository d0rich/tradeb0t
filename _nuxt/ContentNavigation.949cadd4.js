import{u}from"./asyncData.69b7221c.js";import{a as l,Y as d,j as m,W as v,a7 as c,a8 as y,$ as g,L as x,N as i}from"./entry.f8f7a6e3.js";import{_ as f}from"./nuxt-link.dd64120d.js";/* empty css                    *//* empty css                    *//* empty css                  *//* empty css                  *//* empty css                 *//* empty css                            *//* empty css                */import"./Icon.vue.97b87ad6.js";/* empty css                   *//* empty css                      *//* empty css                            *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                    *//* empty css                     *//* empty css                    *//* empty css                    *//* empty css                   *//* empty css                        *//* empty css                       *//* empty css                    *//* empty css                    *//* empty css                       *//* empty css                    *//* empty css                    *//* empty css                    */import"https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs";const te=l({name:"ContentNavigation",props:{query:{type:Object,required:!1,default:void 0}},async setup(s){const{query:e}=d(s),_=m(()=>{var t;return typeof((t=e.value)==null?void 0:t.params)=="function"?e.value.params():e.value});if(!_.value&&v("dd-navigation").value){const{navigation:t}=c();return{navigation:t}}const{data:o}=await u(`content-navigation-${g(_.value)}`,()=>y(_.value));return{navigation:o}},render(s){const e=x(),{navigation:_}=s,o=n=>i(f,{to:n._path},()=>n.title),t=(n,r)=>i("ul",r?{"data-level":r}:null,n.map(a=>a.children?i("li",null,[o(a),t(a.children,r+1)]):i("li",null,o(a)))),p=n=>t(n,0);return e!=null&&e.default?e.default({navigation:_,...this.$attrs}):p(_)}});export{te as default};