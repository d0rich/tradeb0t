export default (function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,_,$,aa,ab,ac,ad,ae,af,ag,ah,ai,aj,ak,al,am,an,ao,ap,aq,ar,as,at,au,av,aw,ax,ay,az,aA,aB,aC,aD,aE,aF,aG,aH,aI,aJ,aK,aL,aM,aN,aO,aP){return {data:{"page-data/":{_path:"\u002F",_dir:v,_draft:Y,_partial:Y,_locale:v,_empty:Y,title:R,description:v,body:{type:"root",children:[{type:a,tag:"h1",props:{id:R},children:[{type:b,value:R}]},{type:a,tag:"alert",props:{type:"warning"},children:[{type:a,tag:s,props:{},children:[{type:b,value:"This project is under development. It might be updated in near future."}]}]},{type:a,tag:"h2",props:{id:an},children:[{type:b,value:ao}]},{type:a,tag:s,props:{},children:[{type:b,value:"Install core:"}]},{type:a,tag:r,props:{code:"npm install tradeb0t-core\n",language:"sh",meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:"ct-47a63c"},children:[{type:b,value:"npm"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"install"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:R}]}]}]}]}]},{type:a,tag:Z,props:{id:ap},children:[{type:b,value:aq}]},{type:a,tag:s,props:{},children:[{type:b,value:"Domain includes types of entities in the integrated exchange."}]},{type:a,tag:s,props:{},children:[{type:b,value:"Technically, you can provide "},{type:a,tag:k,props:{},children:[{type:b,value:"any"}]},{type:b,value:" types for "},{type:a,tag:k,props:{},children:[{type:b,value:_}]},{type:b,value:". But it is not recommended, as these types will be helpful in process of creating other modules."}]},{type:a,tag:r,props:{code:"import {DomainTemplate} from 'tradeb0t-core'\nimport {\n    CurrencyType,\n    CurrencyBalanceType,\n    SecurityType,\n    SecurityBalanceType,\n    OrderType\n} from '@exchange\u002Fsdk'\n\n\u002F\u002F Order of arguments matters\nexport type Domain = DomainTemplate\u003CCurrencyType, CurrencyBalanceType, SecurityType, SecurityBalanceType, OrderType\u003E\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:as}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:at}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:au}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:av}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:aw}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:x},children:[{type:b,value:"\u002F\u002F Order of arguments matters"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"type"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:S},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:_}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:ar}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:as}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:at}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:au}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:av}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"\u003E"}]}]}]}]}]},{type:a,tag:Z,props:{id:ax},children:[{type:b,value:ay}]},{type:a,tag:s,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:u}]},{type:b,value:" is layer between exchange and tradebot internal logic."}]},{type:a,tag:s,props:{},children:[{type:b,value:"It also includes two submodules for splitting logic:"}]},{type:a,tag:az,props:{},children:[{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:L}]},{type:b,value:" - get different information from exchange;"}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:M}]},{type:b,value:" - send requests to place orders to exchange;"}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:N}]},{type:b,value:" - for translation exchange types to tradebot types."}]}]},{type:a,tag:s,props:{},children:[{type:b,value:"You can access "},{type:a,tag:k,props:{},children:[{type:b,value:u}]},{type:b,value:" instance with "},{type:a,tag:k,props:{},children:[{type:b,value:"this.exchangeClient"}]},{type:b,value:" from these modules."}]},{type:a,tag:s,props:{},children:[{type:b,value:"Note, that you can provide object containing API methods to exchange ("},{type:a,tag:k,props:{},children:[{type:b,value:aa}]},{type:b,value:" in example). It will be available in "},{type:a,tag:k,props:{},children:[{type:b,value:u}]},{type:b,value:" instance as "},{type:a,tag:k,props:{},children:[{type:b,value:aA}]},{type:b,value:O}]},{type:a,tag:r,props:{code:"import {AbstractExchangeClient} from 'tradeb0t-core'\nimport API from '@exchange\u002Fsdk'\n\nimport {Domain} from '..\u002FDomain'\nimport {TradeModule} from '.\u002FTradeModule'\nimport {InfoModule} from '.\u002FInfoModule'\nimport {Translator} from \".\u002FTranslator\"\n\nexport class ExchangeClient extends AbstractExchangeClient\u003CDomain, API\u003E{\n    constructor(token: string){\n        super({\n            infoModule: new InfoModule(),\n            tradeModule: new TradeModule(),\n            translator: new Translator()\n        }, new OpenAPI({\n            apiURL: 'https:\u002F\u002Fapi-invest.tinkoff.ru\u002Fopenapi\u002Fsandbox',\n            socketURL: 'wss:\u002F\u002Fapi-invest.tinkoff.ru\u002Fopenapi\u002Fmd\u002Fv1\u002Fmd-openapi\u002Fws',\n            secretToken: token\n        }))\n    }\n\n    protected async initAccount(){\n        const { api } = this\n        \u002F\u002F Something to prepare your client\n        this.isAccountInitialized = true\n    }\n\n    async getPortfolio() {\u002F*...*\u002F}\n\n    async getCurrenciesBalance() {\u002F*...*\u002F}\n}\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aB}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:aw}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'..\u002FDomain'"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'.\u002FTradeModule'"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'.\u002FInfoModule'"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"\".\u002FTranslator\""}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aB}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:aa}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"constructor"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:aC},children:[{type:b,value:aD}]},{type:a,tag:c,props:{class:ac},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:"string"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"){"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:"super"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"infoModule"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aE}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"tradeModule"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aE}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"translator"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"()"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        }, "}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"OpenAPI"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"apiURL"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'https:\u002F\u002Fapi-invest.tinkoff.ru\u002Fopenapi\u002Fsandbox'"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"socketURL"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'wss:\u002F\u002Fapi-invest.tinkoff.ru\u002Fopenapi\u002Fmd\u002Fv1\u002Fmd-openapi\u002Fws'"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:I}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"secretToken"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aD}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"        }))"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"protected"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"initAccount"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"(){"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:"const"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" { "}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aA}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:" } "}]},{type:a,tag:c,props:{class:S},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aF}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:"\u002F\u002F Something to prepare your client"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aF}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"isAccountInitialized"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:S},children:[{type:b,value:$}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:"ct-ad9dce"},children:[{type:b,value:"true"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"getPortfolio"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aG}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:"getCurrenciesBalance"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:aG}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]}]}]}]},{type:a,tag:s,props:{},children:[{type:b,value:"Don't forget to implement "},{type:a,tag:k,props:{},children:[{type:b,value:L}]},{type:b,value:" and "},{type:a,tag:k,props:{},children:[{type:b,value:M}]},{type:b,value:O}]},{type:a,tag:r,props:{code:"import {AbstractInfoModule} from 'tradeb0t-core'\n\nimport {ExchangeClient} from '.\u002FExchangeClient'\n\nexport class InfoModule extends AbstractInfoModule\u003CExchangeClient\u003E{\u002F*...*\u002F}\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aH}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:L}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aH}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]}]}]}]},{type:a,tag:r,props:{code:"import {AbstractTradeModule} from 'tradeb0t-core'\n\nimport {ExchangeClient} from '.\u002FExchangeClient'\n\nexport class TradeModule extends AbstractTradeModule\u003CExchangeClient\u003E{\u002F*...*\u002F}\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aI}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:M}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aI}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:X}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]}]}]}]},{type:a,tag:s,props:{},children:[{type:b,value:"Also, you should implement "},{type:a,tag:k,props:{},children:[{type:b,value:N}]},{type:b,value:" to make it possible for tradebot to understand types of your exchange."}]},{type:a,tag:s,props:{},children:[{type:b,value:"Internal domain of tradebot is provided by "},{type:a,tag:k,props:{},children:[{type:b,value:ah}]},{type:b,value:" type in core library."}]},{type:a,tag:r,props:{code:"import {OperationType, OrderStatus, CommonDomain,\n    AbstractTranslator,\n    GetCurrencyBalanceType,\n    GetCurrencyType,\n    GetOrderType,\n    GetSecurityBalanceType,\n    GetSecurityType} from 'tradeb0t-core'\n\nimport {ExchangeClient} from '.\u002FExchangeClient'\nimport {Domain} from \"..\u002FDomain\";\nexport class Translator extends AbstractTranslator\u003CExchangeClient\u003E{\n    async currency(currency: GetCurrencyType\u003CDomain\u003E): Promise\u003CGetCurrencyType\u003CCommonDomain\u003E\u003E{\n        \u002F\u002F...\n    }\n    \u002F\u002F...\n}\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"OperationType"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"OrderStatus"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:E}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aJ}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"GetCurrencyBalanceType"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"GetOrderType"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"GetSecurityBalanceType"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"GetSecurityType"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:ag}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"\"..\u002FDomain\""}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:";"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:K}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:T}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:N}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:U}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:y},children:[{type:b,value:aJ}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:V}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:W}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:aK}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:aC},children:[{type:b,value:aK}]},{type:a,tag:c,props:{class:ac},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:H}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"\u003E)"}]},{type:a,tag:c,props:{class:ac},children:[{type:b,value:ad}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:"Promise"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:ai}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:A}]},{type:a,tag:c,props:{class:l},children:[{type:b,value:ah}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"\u003E\u003E{"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:P}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:aL}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:af}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:q}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:aL}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:J}]}]}]}]}]},{type:a,tag:s,props:{},children:[{type:b,value:"Note, that you can extract specific domains types from "},{type:a,tag:k,props:{},children:[{type:b,value:H}]},{type:b,value:" or "},{type:a,tag:k,props:{},children:[{type:b,value:u}]},{type:b,value:" with following generic types:"}]},{type:a,tag:az,props:{},children:[{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:"GetCurrencyType\u003CT\u003E"}]}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:"GetCurrencyBalanceType\u003CT\u003E"}]}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:"GetSecurityType\u003CT\u003E"}]}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:"GetSecurityBalanceType\u003CT\u003E"}]}]},{type:a,tag:B,props:{},children:[{type:a,tag:k,props:{},children:[{type:b,value:"GetOrderType\u003CT\u003E"}]}]}]},{type:a,tag:Z,props:{id:aM},children:[{type:b,value:aN}]},{type:a,tag:s,props:{},children:[{type:b,value:"Finally, start tradebot with "},{type:a,tag:k,props:{},children:[{type:b,value:aj}]},{type:b,value:" function:"}]},{type:a,tag:r,props:{code:"import {runTradeBot} from 'tradeb0t-core'\n\nimport {ExchangeClient} from '.\u002Fexchange-client'\nimport {initAlgorithms} from '.\u002Falgorithms'\n\nrunTradeBot({\n  exchangeClient: new ExchangeClient(\u002F*your exchange client args*\u002F),\n  botToken: process.env.BOT_TOKEN || '',\n  initAlgorithmsCallback: initAlgorithms\n})\n",language:F,meta:C},children:[{type:a,tag:D,props:{},children:[{type:a,tag:r,props:{__ignoreMap:v},children:[{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:G}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'.\u002Fexchange-client'"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:g},children:[{type:b,value:m}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:o}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aO}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:p}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:n}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"'.\u002Falgorithms'"}]}]},{type:a,tag:e,props:{class:f},children:[]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:w},children:[{type:b,value:aj}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ae}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"exchangeClient"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:g},children:[{type:b,value:Q}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:w},children:[{type:b,value:u}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:ab}]},{type:a,tag:c,props:{class:x},children:[{type:b,value:"\u002F*your exchange client args*\u002F"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:"),"}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"botToken"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:aP},children:[{type:b,value:"process"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:aP},children:[{type:b,value:"env"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:O}]},{type:a,tag:c,props:{class:"ct-b42ef3"},children:[{type:b,value:"BOT_TOKEN"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:S},children:[{type:b,value:"||"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:h}]},{type:a,tag:c,props:{class:j},children:[{type:b,value:"''"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:t}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:ak}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:"initAlgorithmsCallback"}]},{type:a,tag:c,props:{class:d},children:[{type:b,value:z}]},{type:a,tag:c,props:{class:i},children:[{type:b,value:aO}]}]},{type:a,tag:e,props:{class:f},children:[{type:a,tag:c,props:{class:d},children:[{type:b,value:"})"}]}]}]}]}]},{type:a,tag:"style",children:[{type:b,value:".ct-b42ef3{color:#0550AE}\n.ct-da2b1f{color:#24292F}\n.ct-ad9dce{color:#0550AE}\n.ct-92612c{color:#8250DF}\n.ct-389725{color:#CF222E}\n.ct-91a73f{color:#953800}\n.ct-323759{color:#0550AE}\n.ct-57f088{color:#CF222E}\n.ct-80c4ea{color:#953800}\n.ct-f2e3a0{color:#6E7781}\n.ct-1d353d{color:#24292F}\n.ct-e6fdf9{color:#CF222E}\n.ct-31ce96{color:#0A3069}\n.ct-2ad946{color:#24292F}\n.ct-47a63c{color:#953800}\n.dark .ct-47a63c{color:#ABB2BF}\n.dark .ct-2ad946{color:#ABB2BF}\n.dark .ct-31ce96{color:#98C379}\n.dark .ct-e6fdf9{color:#C678DD}\n.dark .ct-1d353d{color:#E06C75}\n.dark .ct-f2e3a0{color:#7F848E}\n.dark .ct-80c4ea{color:#E5C07B}\n.dark .ct-57f088{color:#56B6C2}\n.dark .ct-323759{color:#E5C07B}\n.dark .ct-91a73f{color:#E06C75}\n.dark .ct-389725{color:#ABB2BF}\n.dark .ct-92612c{color:#61AFEF}\n.dark .ct-ad9dce{color:#D19A66}\n.dark .ct-da2b1f{color:#E5C07B}\n.dark .ct-b42ef3{color:#E06C75}"}]}],toc:{title:v,searchDepth:al,depth:al,links:[{id:an,depth:al,text:ao,children:[{id:ap,depth:am,text:aq},{id:ax,depth:am,text:ay},{id:aM,depth:am,text:aN}]}]}},_type:"markdown",_id:"content:index.md",_source:"content",_file:"index.md",_extension:"md"}},prerenderedAt:void 0}}("element","text","span","ct-2ad946","div","line","ct-e6fdf9"," ","ct-1d353d","ct-31ce96","code-inline","ct-80c4ea","import","from"," {","} ","    ","code","p",",","ExchangeClient","","ct-92612c","ct-f2e3a0","ct-323759",": ","\u003C","li",null,"pre",", ","typescript","'tradeb0t-core'","Domain","            ","}","export","InfoModule","TradeModule","Translator",".","        ","new","tradeb0t-core","ct-57f088","class","extends","\u003E{","async","\u002F*...*\u002F",false,"h3","DomainTemplate","=","API","(","ct-389725",":","({","    }","'.\u002FExchangeClient'","CommonDomain","GetCurrencyType","runTradeBot","  ",2,3,"getting-started","Getting started","describe-your-domain","Describe your domain","CurrencyType","CurrencyBalanceType","SecurityType","SecurityBalanceType","OrderType","'@exchange\u002Fsdk'","implement-exchangeclient","Implement ExchangeClient","ul","api","AbstractExchangeClient","ct-91a73f","token","(),","this","() {","AbstractInfoModule","AbstractTradeModule","AbstractTranslator","currency","\u002F\u002F...","start-tradebot","Start tradebot","initAlgorithms","ct-da2b1f"))