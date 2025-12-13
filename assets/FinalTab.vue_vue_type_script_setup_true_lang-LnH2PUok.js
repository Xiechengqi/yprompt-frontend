var U=Object.defineProperty;var Y=(l,t,n)=>t in l?U(l,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):l[t]=n;var L=(l,t,n)=>Y(l,typeof t!="symbol"?t+"":t,n);import{s as R,N as W,K as X,O as I,d as N,r as O,o as B,b as f,e as a,f as w,a6 as D,g as P,j as u,p,R as M,_ as K,n as z,D as Z,H as q,i as C,F as Q,y as J,t as F,z as H}from"./index-CPHoan2D.js";/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=R("arrow-left-right",[["path",{d:"M8 3 4 7l4 4",key:"9rb6wj"}],["path",{d:"M4 7h16",key:"6tx8e3"}],["path",{d:"m16 21 4-4-4-4",key:"siv7j2"}],["path",{d:"M20 17H4",key:"h6l3hr"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=R("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=R("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pe=R("pen",[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]]);/**
 * @license lucide-vue-next v0.544.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=R("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]),A=class A{constructor(){L(this,"aiService");this.aiService=W.getInstance()}static getInstance(){return A.instance||(A.instance=new A),A.instance}formatVariablesForPrompt(t){if(!t||t.length===0||t.every(i=>i.trim()===""))return"";const n=t.filter(i=>i.trim()!=="");return n.length===0?"":`
---
Variable Integration:
The final prompt must be designed to be used in a programmatic context. As such, it needs to include specific placeholders or variables. You must incorporate the following variables into the generated prompt where it makes logical sense to do so.

Variable List:
${n.map(i=>`- \`${i}\``).join(`
`)}

For example, if a variable is \`{{user_topic}}\`, you might include a sentence like "The user will provide the \`{{user_topic}}\` for you to write about."
---
    `}getStreamMode(){return X().streamMode}async getSystemPromptThinkingPoints(t,n,i,r,o,e){const s=this.formatVariablesForPrompt(r),m=I.getFinalPromptGenerationRules().THINKING_POINTS_EXTRACTION.replace("{language}",i),d=`${s}
User's Description for AI Persona:
---
${t}
---`,k={role:"system",content:m},x={role:"user",content:d};if(!o)throw new Error("请先配置AI提供商");const h=this.getStreamMode();e&&h&&this.aiService.setStreamUpdateCallback(y=>{e(y)});const b=await this.aiService.callAI([k,x],o,n,h);return e&&h&&this.aiService.clearStreamUpdateCallback(),b.split(`
`).map(y=>y.replace(/^[*-]\s*/,"").trim()).filter(Boolean)}async generateSystemPrompt(t,n,i,r,o,e,s){const c=I.getSystemPromptRules(),m=this.formatVariablesForPrompt(r),d=o&&o.length>0&&o.some(v=>v.trim()!=="")?`
---
Key Directives to Incorporate:
You must intelligently integrate the following specific directives into the final System Prompt. These are non-negotiable and should guide the core logic and personality of the AI.

Directives:
${o.filter(v=>v.trim()!=="").map(v=>`- ${v}`).join(`
`)}
---
      `:"",k=I.getFinalPromptGenerationRules(),x=i==="zh"?"中文":"English",h=`${k.SYSTEM_PROMPT_GENERATION}

---
Here are the prompt engineering rules I will follow:
${c}
---`.replace("{language_display}",x),b=`${m}
${d}
User's Original Description:
---
${t}
---`,S={role:"system",content:h},y={role:"user",content:b};if(!e)throw new Error("请先配置AI提供商");const T=this.getStreamMode();s&&T&&this.aiService.setStreamUpdateCallback(v=>{s(v)});const $=await this.aiService.callAI([S,y],e,n,T);s&&T&&this.aiService.clearStreamUpdateCallback();let g=$.replace(/```/g,"").trim();return g.startsWith(`markdown
`)?g=g.substring(9):g.startsWith("markdown")&&(g=g.substring(8)),g.trim()}async getOptimizationAdvice(t,n,i,r,o,e,s){const c=this.formatVariablesForPrompt(o),m=I.getFinalPromptGenerationRules(),d=n.charAt(0).toUpperCase()+n.slice(1),k=m.OPTIMIZATION_ADVICE_GENERATION.replace("{promptType}",n).replace("{language}",r),x=`${c}
${d} Prompt to Analyze:
---
${t}
---`,h={role:"system",content:k},b={role:"user",content:x};if(!e)throw new Error("请先配置AI提供商");const S=this.getStreamMode();s&&S&&this.aiService.setStreamUpdateCallback($=>{s($)});const y=await this.aiService.callAI([h,b],e,i,S);return s&&S&&this.aiService.clearStreamUpdateCallback(),y.split(`
`).map($=>$.replace(/^[*-]\s*/,"").trim()).filter(Boolean)}async applyOptimizationAdvice(t,n,i,r,o,e,s,c){const m=I.getSystemPromptRules(),d=this.formatVariablesForPrompt(e),k=n.map(j=>`- ${j}`).join(`
`),x=I.getFinalPromptGenerationRules(),h=o==="zh"?"中文":"English",b=i.charAt(0).toUpperCase()+i.slice(1),S=`${x.OPTIMIZATION_APPLICATION}

---
Here are the core principles of elite prompt engineering I will follow:
${m}
---`.replace("{promptType}",i).replace("{language_display}",h).replace("{promptType_capitalized}",b),y=`${d}
Original ${b} Prompt:
---
${t}
---

Optimization Suggestions to Apply:
---
${k}
---`,T={role:"system",content:S},$={role:"user",content:y};if(!s)throw new Error("请先配置AI提供商");const g=this.getStreamMode();c&&g&&this.aiService.setStreamUpdateCallback(j=>{c(j)});const v=await this.aiService.callAI([T,$],s,r,g);c&&g&&this.aiService.clearStreamUpdateCallback();let E=v.replace(/```/g,"").trim();return E.startsWith(`markdown
`)?E=E.substring(9):E.startsWith("markdown")&&(E=E.substring(8)),E.trim()}};L(A,"instance");let _=A;const Ne=l=>{try{let t=l.replace(/<think>[\s\S]*?<\/think>/gi,"").trim();t=t.replace(/<ASSESSMENT>[\s\S]*?<\/ASSESSMENT>/gi,"").trim();const n=t.indexOf("<think>");n!==-1&&(t=t.substring(0,n).trim());const i=t.indexOf("<ASSESSMENT>");i!==-1&&(t=t.substring(0,i).trim());const r=[/<thin[^>]*$/i,/<\/thin[^>]*$/i,/\n\n<thin/i,/<ASSE[^>]*$/i,/<\/ASSE[^>]*$/i,/\n\n<ASSE/i,/CONTEXT:/i,/TASK:/i,/FORMAT:/i,/QUALITY:/i,/TURN_COUNT:/i,/DECISION:/i,/CONFIDENCE:/i];for(const o of r){const e=t.search(o);if(e!==-1){t=t.substring(0,e).trim();break}}return t}catch{return l}},Oe=l=>{let t=l.replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/^Here is the.*?translation.*?:\s*/i,"").replace(/^Here is the.*?converted.*?:\s*/i,"").replace(/^Here is.*?:\s*/i,"").replace(/^以下是.*?翻译.*?：\s*/i,"").replace(/^以下是.*?转换.*?：\s*/i,"").replace(/^以下是.*?：\s*/i,"").replace(/^.*?翻译结果.*?：\s*/i,"").replace(/^.*?转换结果.*?：\s*/i,"").trim();return t=t.replace(/^```[\w]*\n?/,""),t=t.replace(/\n?```$/,""),t.trim()},Fe=l=>{if(!l)return"";let t=l.trim();t=t.replace(/^```[a-z]*\n?/i,""),t=t.replace(/\n?```\s*$/i,"");const n=[/^Here\s+is\s+the.*?:\s*/i,/^以下是.*?：\s*/i,/^这是.*?：\s*/i,/^.*?如下.*?：\s*/i,/^.*?结果.*?：\s*/i];for(const i of n)t=t.replace(i,"");return t.trim()},Be=l=>{try{const t=l.match(/<ASSESSMENT>([\s\S]*?)<\/ASSESSMENT>/i);if(!t)return!1;const i=t[1].match(/DECISION:\s*\[([^\]]+)\]/i);return i?i[1].trim().toUpperCase()==="END_NOW":!1}catch{return!1}},se={class:"flex space-x-2 min-w-max px-1"},ne={key:0,class:"flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm whitespace-nowrap"},ie=N({__name:"TabContainer",props:{isGenerating:{type:Boolean}},emits:["mounted"],setup(l,{emit:t}){const n=O(),i=t;return B(()=>{n.value&&i("mounted",n.value)}),(r,o)=>(p(),f("div",{ref_key:"tabContainerEl",ref:n,class:"flex space-x-2 mb-4 flex-shrink-0 overflow-x-auto scrollbar-hide scroll-smooth"},[a("div",se,[r.isGenerating?(p(),f("div",ne,[P(u(M),{class:"w-3 h-3 animate-spin mr-1"}),o[0]||(o[0]=a("span",null,"生成中",-1))])):w("",!0),D(r.$slots,"default",{},void 0,!0)])],512))}}),je=K(ie,[["__scopeId","data-v-e788a309"]]),Le=N({__name:"TabButton",props:{isActive:{type:Boolean},activeClass:{}},emits:["click","mounted"],setup(l,{emit:t}){const n=t,i=O();return B(()=>{i.value&&n("mounted",i.value)}),(r,o)=>(p(),f("button",{ref_key:"buttonRef",ref:i,onClick:o[0]||(o[0]=e=>r.$emit("click")),class:z(["px-3 py-1 rounded text-sm transition-colors whitespace-nowrap flex-shrink-0",r.isActive?r.activeClass:"bg-gray-200 text-gray-700 hover:bg-gray-300"])},[D(r.$slots,"default")],2))}}),oe={class:"flex-1 flex items-center justify-center p-6 text-center text-gray-500"},ze=N({__name:"EmptyState",setup(l){return(t,n)=>(p(),f("div",oe,[a("div",null,[P(u(te),{class:"w-12 h-12 text-gray-300 mx-auto mb-3"})])]))}});function G(l,t){const n=O(null),i=o=>{n.value=o},r=()=>{q(()=>{if(n.value){const o=n.value;o.tagName,o.scrollTop=o.scrollHeight,requestAnimationFrame(()=>{if(n.value){const e=n.value;e.tagName,e.scrollTop=e.scrollHeight}})}})};return Z(l,(o,e)=>{t()&&o!==e&&r()},{flush:"post",deep:!0,immediate:!1}),{setScrollContainer:i,scrollToBottom:r}}const ae={class:"border rounded-lg overflow-hidden flex flex-col flex-1 min-h-0"},re={class:"bg-yellow-50 px-3 py-2 text-sm font-medium text-yellow-700 flex items-center justify-between flex-shrink-0"},le={class:"flex items-center space-x-2"},ce=["disabled"],pe={class:"bg-white flex flex-col p-3 flex-1"},de=["value","onInput"],ue=["onClick"],me={class:"pt-4 flex justify-between flex-shrink-0 border-t border-gray-100 mt-4"},ge={key:0},fe=["disabled"],_e=N({__name:"AdviceTab",props:{advice:{},isAutoMode:{type:Boolean},isExecuting:{type:Boolean},isGenerating:{type:Boolean},currentExecutionStep:{},isCopied:{type:Boolean}},emits:["regenerate","copy","add-item","remove-item","update-item","execute-final","scroll-mounted"],setup(l,{emit:t}){const n=l,i=t,r=O(),{setScrollContainer:o}=G(()=>n.advice,()=>n.isGenerating);return B(()=>{r.value&&(o(r.value),i("scroll-mounted",r.value))}),(e,s)=>(p(),f("div",ae,[a("div",re,[s[5]||(s[5]=a("span",null,"优化建议",-1)),a("div",le,[a("button",{onClick:s[0]||(s[0]=c=>e.$emit("regenerate")),disabled:e.isExecuting||e.isGenerating,class:"text-yellow-500 hover:text-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed",title:"重新生成优化建议"},[P(u(M),{class:z(["w-4 h-4",e.isExecuting&&e.currentExecutionStep==="advice"&&"animate-spin"])},null,8,["class"])],8,ce),a("button",{onClick:s[1]||(s[1]=c=>e.$emit("copy")),class:"text-yellow-500 hover:text-yellow-600",title:"复制到剪贴板"},[e.isCopied?(p(),C(u(V),{key:0,class:"w-4 h-4"})):(p(),C(u(H),{key:1,class:"w-4 h-4"}))])])]),a("div",pe,[a("div",{ref_key:"scrollContainer",ref:r,class:"space-y-2 overflow-y-auto flex-1",style:{"max-height":"calc(100vh - 400px)"}},[(p(!0),f(Q,null,J(e.advice,(c,m)=>(p(),f("div",{key:m,class:"flex items-start"},[s[6]||(s[6]=a("span",{class:"text-yellow-500 mr-2 mt-2"},"•",-1)),a("input",{value:c,onInput:d=>e.$emit("update-item",m,d.target.value),onFocus:s[2]||(s[2]=d=>d.target.setSelectionRange(d.target.value.length,d.target.value.length)),class:"flex-1 px-3 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-transparent"},null,40,de),a("button",{onClick:d=>e.$emit("remove-item",m),class:"ml-2 px-2 py-1 text-red-500 hover:text-red-700 text-sm",title:"删除这条建议"}," × ",8,ue)]))),128))],512),a("div",me,[a("button",{onClick:s[3]||(s[3]=c=>e.$emit("add-item")),class:"px-3 py-1 text-yellow-600 hover:text-yellow-800 text-sm"}," + 添加建议 "),e.isAutoMode?w("",!0):(p(),f("div",ge,[a("button",{onClick:s[4]||(s[4]=c=>e.$emit("execute-final")),disabled:!e.advice||e.advice.length===0||e.isExecuting,class:"px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"},[e.isExecuting&&e.currentExecutionStep==="final"?(p(),C(u(M),{key:0,class:"w-4 h-4 animate-spin"})):w("",!0),a("span",null,F(e.isExecuting&&e.currentExecutionStep==="final"?"执行中...":"生成最终提示词"),1)],8,fe)]))])])]))}}),he={class:"border rounded-lg overflow-hidden flex flex-col flex-1"},ye={class:"bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 flex items-center justify-between flex-shrink-0"},ve={class:"flex items-center space-x-2"},be=["disabled"],Se={class:"p-3 bg-white flex-1 flex flex-col overflow-hidden"},we=["value"],Ce={key:0,class:"space-y-2 pt-4 flex-shrink-0"},ke={class:"flex space-x-2"},xe=["disabled"],$e=["disabled"],Ee=["disabled"],Ae={key:0,class:"flex"},Me=["disabled"],De=N({__name:"FinalTab",props:{generatedPrompt:{},isExecuting:{type:Boolean},isGenerating:{type:Boolean},currentExecutionStep:{},isCopied:{type:Boolean},isConvertingFormat:{type:Boolean},isConvertingLanguage:{type:Boolean},isSaving:{type:Boolean},formatState:{},languageState:{},showCompareButton:{type:Boolean,default:!1}},emits:["update:generatedPrompt","regenerate","copy","toggle-format","toggle-language","save-prompt","compare","scroll-mounted"],setup(l,{emit:t}){const n=l,i=t,r=O(),{setScrollContainer:o}=G(()=>n.generatedPrompt,()=>n.isGenerating);return B(()=>{r.value&&(o(r.value),i("scroll-mounted",r.value))}),(e,s)=>(p(),f("div",he,[a("div",ye,[s[7]||(s[7]=a("span",null,"最终提示词",-1)),a("div",ve,[a("button",{onClick:s[0]||(s[0]=c=>e.$emit("regenerate")),disabled:e.isExecuting||e.isGenerating,class:"text-blue-500 hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed",title:"重新生成最终提示词"},[P(u(M),{class:z(["w-4 h-4",e.isExecuting&&e.currentExecutionStep==="final"&&"animate-spin"])},null,8,["class"])],8,be),a("button",{onClick:s[1]||(s[1]=c=>e.$emit("copy")),class:"text-blue-500 hover:text-blue-600",title:"复制到剪贴板"},[e.isCopied?(p(),C(u(V),{key:0,class:"w-4 h-4"})):(p(),C(u(H),{key:1,class:"w-4 h-4"}))])])]),a("div",Se,[a("textarea",{ref_key:"textareaRef",ref:r,value:e.generatedPrompt,onInput:s[2]||(s[2]=c=>e.$emit("update:generatedPrompt",c.target.value)),class:"w-full flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none resize-none"},null,40,we),e.generatedPrompt?(p(),f("div",Ce,[a("div",ke,[a("button",{onClick:s[3]||(s[3]=c=>e.$emit("toggle-format")),disabled:!e.generatedPrompt||e.isConvertingFormat||e.isConvertingLanguage,class:"flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"},[e.isConvertingFormat?(p(),C(u(M),{key:0,class:"w-4 h-4 animate-spin"})):w("",!0),a("span",null,F(e.isConvertingFormat?"转换中...":e.formatState==="markdown"?"转为XML格式":"转为Markdown格式"),1)],8,xe),a("button",{onClick:s[4]||(s[4]=c=>e.$emit("toggle-language")),disabled:!e.generatedPrompt||e.isConvertingFormat||e.isConvertingLanguage,class:"flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"},[e.isConvertingLanguage?(p(),C(u(M),{key:0,class:"w-4 h-4 animate-spin"})):w("",!0),a("span",null,F(e.isConvertingLanguage?"转换中...":e.languageState==="zh"?"转为英文版":"转为中文版"),1)],8,$e),a("button",{onClick:s[5]||(s[5]=c=>e.$emit("save-prompt")),disabled:!e.generatedPrompt||e.isConvertingFormat||e.isConvertingLanguage||e.isSaving,class:"flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"},[e.isSaving?(p(),C(u(M),{key:0,class:"w-4 h-4 animate-spin"})):w("",!0),a("span",null,F(e.isSaving?"保存中...":"保存到数据库"),1)],8,Ee)]),e.showCompareButton?(p(),f("div",Ae,[a("button",{onClick:s[6]||(s[6]=c=>e.$emit("compare")),disabled:!e.generatedPrompt,class:"w-full flex items-center justify-center space-x-1 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"},[P(u(ee),{class:"w-4 h-4"}),s[8]||(s[8]=a("span",null,"对比优化效果",-1))],8,Me)])):w("",!0)])):w("",!0)])]))}});export{ee as A,V as C,Pe as P,Re as T,Le as _,Be as a,_ as b,Ne as c,Fe as d,Oe as e,je as f,_e as g,De as h,ze as i,G as u};
