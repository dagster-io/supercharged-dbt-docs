(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[856],{4045:function(e,t,s){!function(e,t){"use strict";var s=function(e){if(e&&e.__esModule)return e;var t=Object.create(null);return e&&Object.keys(e).forEach(function(s){if("default"!==s){var n=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(t,s,n.get?n:{enumerable:!0,get:function(){return e[s]}})}}),t.default=e,Object.freeze(t)}(t);/**
   * virtual-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */function n(e,t,s){let n,l=[];return()=>{let i,r;s.key&&null!=s.debug&&s.debug()&&(i=Date.now());let o=e();if(!(o.length!==l.length||o.some((e,t)=>l[t]!==e)))return n;if(l=o,s.key&&null!=s.debug&&s.debug()&&(r=Date.now()),n=t(...o),null==s||null==s.onChange||s.onChange(n),s.key&&null!=s.debug&&s.debug()){let e=Math.round(100*(Date.now()-i))/100,t=Math.round(100*(Date.now()-r))/100,n=t/16,l=(e,t)=>{for(e=String(e);e.length<t;)e=" "+e;return e};console.info("%c⏱ "+l(t,5)+" /"+l(e,5)+" ms","\n            font-size: .6rem;\n            font-weight: bold;\n            color: hsl("+Math.max(0,Math.min(120-120*n,120))+"deg 100% 31%);",null==s?void 0:s.key)}return n}}let l=e=>e,i=e=>{let t=Math.max(e.startIndex-e.overscan,0),s=Math.min(e.endIndex+e.overscan,e.count-1),n=[];for(let e=t;e<=s;e++)n.push(e);return n},r=(e,t)=>{let s=new ResizeObserver(e=>{var s,n;t({width:null==(s=e[0])?void 0:s.contentRect.width,height:null==(n=e[0])?void 0:n.contentRect.height})});if(e.scrollElement)return t(e.scrollElement.getBoundingClientRect()),s.observe(e.scrollElement),()=>{s.unobserve(e.scrollElement)}},o=(e,t)=>{let s;let n=(s={height:-1,width:-1},n=>{(e.options.horizontal?n.width!==s.width:n.height!==s.height)&&t(n),s=n}),l=()=>n({width:e.scrollElement.innerWidth,height:e.scrollElement.innerHeight});if(e.scrollElement)return l(),e.scrollElement.addEventListener("resize",l,{capture:!1,passive:!0}),()=>{e.scrollElement.removeEventListener("resize",l)}},a={element:["scrollLeft","scrollTop"],window:["scrollX","scrollY"]},c=e=>(t,s)=>{if(!t.scrollElement)return;let n=a[e][0],l=a[e][1],i=t.scrollElement[n],r=t.scrollElement[l],o=()=>{s(t.scrollElement[t.options.horizontal?n:l])};o();let c=e=>{let s=e.currentTarget,a=s[n],c=s[l];(t.options.horizontal?i-a:r-c)&&o(),i=a,r=c};return t.scrollElement.addEventListener("scroll",c,{capture:!1,passive:!0}),()=>{t.scrollElement.removeEventListener("scroll",c)}},h=c("element"),u=c("window"),d=(e,t)=>e.getBoundingClientRect()[t.options.horizontal?"width":"height"],m=(e,t,s)=>{var n;null==(n=s.scrollElement)||null==n.scrollTo||n.scrollTo({[s.options.horizontal?"left":"top"]:e,behavior:t?"smooth":void 0})},p=(e,t,s)=>{var n;null==(n=s.scrollElement)||null==n.scrollTo||n.scrollTo({[s.options.horizontal?"left":"top"]:e,behavior:t?"smooth":void 0})};class g{constructor(e){var t=this;this.unsubs=[],this.scrollElement=null,this.measurementsCache=[],this.itemMeasurementsCache={},this.pendingMeasuredCacheIndexes=[],this.measureElementCache={},this.range={startIndex:0,endIndex:0},this.setOptions=e=>{Object.entries(e).forEach(t=>{let[s,n]=t;void 0===n&&delete e[s]}),this.options={debug:!1,initialOffset:0,overscan:1,paddingStart:0,paddingEnd:0,scrollPaddingStart:0,scrollPaddingEnd:0,horizontal:!1,getItemKey:l,rangeExtractor:i,enableSmoothScroll:!0,onChange:()=>{},measureElement:d,initialRect:{width:0,height:0},...e}},this.notify=()=>{var e,t;null==(e=(t=this.options).onChange)||e.call(t,this)},this.cleanup=()=>{this.unsubs.filter(Boolean).forEach(e=>e()),this.unsubs=[],this.scrollElement=null},this._didMount=()=>()=>{this.cleanup()},this._willUpdate=()=>{let e=this.options.getScrollElement();this.scrollElement!==e&&(this.cleanup(),this.scrollElement=e,this._scrollToOffset(this.scrollOffset,!1),this.unsubs.push(this.options.observeElementRect(this,e=>{this.scrollRect=e,this.calculateRange()})),this.unsubs.push(this.options.observeElementOffset(this,e=>{this.scrollOffset=e,this.calculateRange()})))},this.getSize=()=>this.scrollRect[this.options.horizontal?"width":"height"],this.getMeasurements=n(()=>[this.options.count,this.options.paddingStart,this.options.getItemKey,this.itemMeasurementsCache],(e,t,s,n)=>{let l=this.pendingMeasuredCacheIndexes.length>0?Math.min(...this.pendingMeasuredCacheIndexes):0;this.pendingMeasuredCacheIndexes=[];let i=this.measurementsCache.slice(0,l);for(let r=l;r<e;r++){let e=s(r),l=n[e],o=i[r-1]?i[r-1].end:t,a="number"==typeof l?l:this.options.estimateSize(r),c=o+a;i[r]={index:r,start:o,size:a,end:c,key:e}}return this.measurementsCache=i,i},{key:!1,debug:()=>this.options.debug}),this.calculateRange=n(()=>[this.getMeasurements(),this.getSize(),this.scrollOffset],(e,t,s)=>{let n=function(e){let{measurements:t,outerSize:s,scrollOffset:n}=e,l=t.length-1,i=((e,t,s,n)=>{for(;e<=t;){let l=(e+t)/2|0,i=s(l);if(i<n)e=l+1;else{if(!(i>n))return l;t=l-1}}return e>0?e-1:0})(0,l,e=>t[e].start,n),r=i;for(;r<l&&t[r].end<n+s;)r++;return{startIndex:i,endIndex:r}}({measurements:e,outerSize:t,scrollOffset:s});return n.startIndex===this.range.startIndex&&n.endIndex===this.range.endIndex||(this.range=n,this.notify()),this.range},{key:!1,debug:()=>this.options.debug}),this.getIndexes=n(()=>[this.options.rangeExtractor,this.range,this.options.overscan,this.options.count],(e,t,s,n)=>e({...t,overscan:s,count:n}),{key:!1,debug:()=>this.options.debug}),this.getVirtualItems=n(()=>[this.getIndexes(),this.getMeasurements(),this.options.measureElement],(e,t,s)=>{let n=e=>t=>{var n;let l=this.measurementsCache[e];if(!t)return;let i=s(t,this),r=null!=(n=this.itemMeasurementsCache[l.key])?n:l.size;i!==r&&(l.start<this.scrollOffset&&(this.destinationOffset||this._scrollToOffset(this.scrollOffset+(i-r),!1)),this.pendingMeasuredCacheIndexes.push(e),this.itemMeasurementsCache={...this.itemMeasurementsCache,[l.key]:i},this.notify())},l=[],i={};for(let s=0,o=e.length;s<o;s++){var r;let o=e[s],a={...t[o],measureElement:i[o]=null!=(r=this.measureElementCache[o])?r:n(o)};l.push(a)}return this.measureElementCache=i,l},{key:!1,debug:()=>this.options.debug}),this.scrollToOffset=function(e,s){let{align:n="start",smoothScroll:l=t.options.enableSmoothScroll}=void 0===s?{}:s,i=t.scrollOffset,r=t.getSize();"auto"===n&&(n=e<=i?"start":e>=i+r?"end":"start"),"start"===n?t._scrollToOffset(e,l):"end"===n?t._scrollToOffset(e-r,l):"center"===n&&t._scrollToOffset(e-r/2,l)},this.scrollToIndex=function(e,s){let{align:n="auto",smoothScroll:l=t.options.enableSmoothScroll,...i}=void 0===s?{}:s,r=t.scrollOffset,o=t.getSize(),{count:a}=t.options,c=t.getMeasurements()[Math.max(0,Math.min(e,a-1))];if(!c)return;if("auto"===n){if(c.end>=r+o-t.options.scrollPaddingEnd)n="end";else{if(!(c.start<=r+t.options.scrollPaddingStart))return;n="start"}}let h="end"===n?c.end+t.options.scrollPaddingEnd:c.start-t.options.scrollPaddingStart;t.scrollToOffset(h,{align:n,smoothScroll:l,...i})},this.getTotalSize=()=>{var e;return((null==(e=this.getMeasurements()[this.options.count-1])?void 0:e.end)||this.options.paddingStart)+this.options.paddingEnd},this._scrollToOffset=(e,t)=>{let s;clearTimeout(this.scrollCheckFrame),this.destinationOffset=e,this.options.scrollToFn(e,t,this);let n=()=>{let e=this.scrollOffset;this.scrollCheckFrame=s=setTimeout(()=>{this.scrollCheckFrame===s&&(this.scrollOffset!==e?(e=this.scrollOffset,n()):this.destinationOffset=void 0)},100)};n()},this.measure=()=>{this.itemMeasurementsCache={},this.notify()},this.setOptions(e),this.scrollRect=this.options.initialRect,this.scrollOffset=this.options.initialOffset,this.calculateRange()}}let f="undefined"!=typeof window?s.useLayoutEffect:s.useEffect;function x(e){let t=s.useReducer(()=>({}),{})[1],n={...e,onChange:s=>{t(),null==e.onChange||e.onChange(s)}},[l]=s.useState(()=>new g(n));return l.setOptions(n),s.useEffect(()=>l._didMount(),[]),f(()=>l._willUpdate()),l}e.Virtualizer=g,e.defaultKeyExtractor=l,e.defaultRangeExtractor=i,e.elementScroll=p,e.measureElement=d,e.memo=n,e.observeElementOffset=h,e.observeElementRect=r,e.observeWindowOffset=u,e.observeWindowRect=o,e.useVirtualizer=function(e){return x({observeElementRect:r,observeElementOffset:h,scrollToFn:p,...e})},e.useWindowVirtualizer=function(e){return x({getScrollElement:()=>"undefined"!=typeof window?window:null,observeElementRect:o,observeElementOffset:u,scrollToFn:m,...e})},e.windowScroll=m,Object.defineProperty(e,"__esModule",{value:!0})}(t,s(2265))},7185:function(e,t,s){"use strict";s.r(t),s.d(t,{SearchResults:function(){return u}});var n=s(7437),l=s(2890),i=s.n(l),r=s(1396),o=s.n(r),a=s(2265),c=s(4045),h=s(3395);function u(e){let{query:t,searchable:s,clearQuery:l}=e,[r,u]=a.useState({show_names:!1,show_descriptions:!1,show_columns:!1,show_column_descriptions:!1,show_code:!1,show_tags:!1});function d(e){return"source"==e.resource_type?e.source_name+"."+e.name:"macro"==e.resource_type?e.package_name+"."+e.name:"metric"==e.resource_type||"exposure"==e.resource_type?e.label:"model"==e.resource_type&&null!=e.version?e.label:e.name}let m=a.useMemo(()=>(function(e,t){if(!i().some(i().values(t)))return e;let s=[],n=[],{show_names:l,show_descriptions:r,show_columns:o,show_column_descriptions:a,show_code:c,show_tags:h}=t;for(let t of e)for(let e of t.matches)if(!n.includes(t.model.unique_id)){let i=l&&("name"===e.key||"label"==e.key),u=r&&"description"==e.key,d=o&&"columns"===e.key,m=a&&"column_description"===e.key,p=c&&"raw_code"===e.key,g=h&&"tags"===e.key;(i||u||d||m||p||g)&&(n.push(t.model.unique_id),s.push(t))}return s})(function(e,t){if(0==e.length)return i().map(t,function(e){return{model:e,matches:[]}});let s=[];return i().each(t,function(t){var n=function(e,t){var s=[],n={name:"string",description:"string",raw_code:"string",columns:"object",column_description:"n/a",tags:"array",arguments:"array",label:"string"};let l=i().words(e.toLowerCase());for(let i in n)if("column_description"===i)for(var r in t.columns)null!=t.columns[r].description&&l.every(e=>-1!=t.columns[r].description.toLowerCase().indexOf(e))&&s.push({key:i,value:e});else if(!t[i])continue;else if("string"===n[i]&&l.every(e=>-1!=t[i].toLowerCase().indexOf(e)))s.push({key:i,value:e});else if("object"===n[i])for(var r in t[i])null!=t[i][r].name&&l.every(e=>-1!=t[i][r].name.toLowerCase().indexOf(e))&&s.push({key:i,value:e});else if("array"===n[i])for(var o of t[i])l.every(e=>-1!=JSON.stringify(o).toLowerCase().indexOf(e))&&s.push({key:i,value:e});return s}(e,t);n.length&&s.push({model:t,matches:n})}),s}(t,s),r),[t,s,r]);function p(e){if(null!=e&&e.trim().length>0&&null!=t&&t.trim().length>0){let s=e.replace(/\s+/g," "),n=f(x(t)[0]),l=s.search(new RegExp(n)),i=l+75>s.length?s.length:l+75;return"..."+s.substring(l-75<0?0:l-75,i)+"..."}return e}function g(e){if(!t||!e)return e||"";let s="("+x(t).map(e=>f(e)).join(")|(")+")";return e.replace(RegExp(s,"gi"),'<span class="search-result-match">$&</span>')}function f(e){return e.replace(/[.*+\-?^${}()|[\]\\]/g,"\\$&")}function x(e){return i().words(e.toLowerCase())}let v=a.useRef(null),y=(0,c.useVirtualizer)({count:m.length,getScrollElement:()=>v.current,estimateSize:()=>100}),b=y.getTotalSize(),w=y.getVirtualItems();return a.useLayoutEffect(()=>{y.measure(),requestAnimationFrame(y.measure)},[m]),(0,n.jsx)("div",{style:{position:"relative",height:"100%"},children:(0,n.jsxs)("div",{ref:v,style:{overflowY:"scroll",position:"absolute",top:0,left:0,right:0,bottom:0},children:[(0,n.jsx)("div",{className:"app-title",children:(0,n.jsxs)("div",{className:"app-frame app-pad",style:{marginBottom:0,paddingBottom:0},children:[(0,n.jsxs)("h1",{children:[(0,n.jsx)("span",{className:"break",children:t}),(0,n.jsxs)("small",{children:[(0,n.jsx)("span",{children:m.length})," search results"]})]}),(0,n.jsx)("input",{type:"checkbox",id:"name",checked:r.show_names,onChange:e=>{u(t=>({...t,show_names:e.target.checked}))},style:{marginLeft:"10px",marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"name",style:{marginRight:"25px"},children:"Name"}),(0,n.jsx)("input",{type:"checkbox",id:"desc",checked:r.show_descriptions,onChange:e=>{u(t=>({...t,show_descriptions:e.target.checked}))},style:{marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"desc",style:{marginRight:"25px"},children:"Description"}),(0,n.jsx)("input",{type:"checkbox",id:"column",checked:r.show_columns,onChange:e=>{u(t=>({...t,show_columns:e.target.checked}))},style:{marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"column",style:{marginRight:"25px"},children:"Column"}),(0,n.jsx)("input",{type:"checkbox",id:"column_description",checked:r.show_column_descriptions,onChange:e=>{u(t=>({...t,show_column_descriptions:e.target.checked}))},style:{marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"column_description",style:{marginRight:"25px"},children:"Column Description"}),(0,n.jsx)("input",{type:"checkbox",id:"code",checked:r.show_code,onChange:e=>{u(t=>({...t,show_code:e.target.checked}))},style:{marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"code",style:{marginRight:"15px"},children:"SQL"}),(0,n.jsx)("input",{type:"checkbox",id:"tag",checked:r.show_tags,onChange:e=>{u(t=>({...t,show_tags:e.target.checked}))},style:{marginRight:"5px"}}),(0,n.jsx)("label",{htmlFor:"tag",style:{marginRight:"15px"},children:"Tags"})]})}),(0,n.jsx)("div",{className:"app-details",children:(0,n.jsx)("div",{className:"app-frame app-pad",style:{paddingTop:0},children:(0,n.jsx)("div",{className:"results",style:{height:b+"px"},children:w.map(e=>{let{index:s,key:i,start:a,measureElement:c}=e,u=m[s];return(0,n.jsx)("div",{style:{transform:"translateY(".concat(a,"px)"),position:"absolute",width:"100%"},ref:e=>{c(e),requestAnimationFrame(()=>c(e))},children:(0,n.jsx)(o(),{href:(0,h.a)(u.model),onClick:e=>{e.ctrlKey||e.metaKey||l()},children:(0,n.jsxs)("div",{className:"result search-result",children:[(0,n.jsxs)("div",{className:"result-content",children:[(0,n.jsx)("div",{className:"result-icn",children:(0,n.jsx)("svg",{className:"icn ",children:(0,n.jsx)("use",{xlinkHref:"#icn-doc"})})}),(0,n.jsxs)("div",{className:"result-body",children:[(0,n.jsxs)("h4",{className:"a",children:[(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:r.show_names?g(d(u.model)):d(u.model)}}),(0,n.jsx)("small",{children:u.model.resource_type})]}),(0,n.jsx)("p",{dangerouslySetInnerHTML:{__html:r.show_descriptions?g(p(u.model.description)):p(u.model.description)}})]})]}),t.length>0?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{className:"sub-results",children:(0,n.jsx)("div",{style:{display:"grid"},children:(0,n.jsx)("div",{style:{display:"flex",flexWrap:"wrap",rowGap:"2px",columnGap:"4px"},children:(function(e){var s=[];let n=x(t);for(var l in e)n.every(e=>-1!=l.toLowerCase().indexOf(e))&&s.push(l);return s})(u.model.columns).map((e,t,s)=>(0,n.jsxs)("span",{children:[0===t?(0,n.jsx)("span",{children:"columns: "}):null,(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:r.show_columns?g(e+(s.length-1===t?"":",")):e+(s.length-1===t?"":",")}})]},t))})})}),(0,n.jsx)("div",{className:"sub-results",children:(0,n.jsx)("span",{children:(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:g(p(u.model.raw_code))}})})}),(0,n.jsx)("div",{className:"sub-results",children:u.model.tags.length?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("span",{children:"tags: "}),u.model.tags.map((e,t,s)=>(0,n.jsx)("span",{children:(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:g(e+(t===s.length-1?"":","))}})},e))]}):null})]}):null]})})},i)})})})})]})})}}}]);