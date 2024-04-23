"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[909],{6386:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>u,frontMatter:()=>l,metadata:()=>o,toc:()=>c});var t=i(4848),s=i(8453);const l={id:"builder",title:"Builder"},r=void 0,o={id:"api/builder",title:"Builder",description:"buildRegExp()",source:"@site/docs/api/builder.md",sourceDirName:"api",slug:"/api/builder",permalink:"/ts-regex-builder/api/builder",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"builder",title:"Builder"},sidebar:"docs",previous:{title:"Types",permalink:"/ts-regex-builder/api/types"},next:{title:"Constructs",permalink:"/ts-regex-builder/api/constructs"}},d={},c=[{value:"<code>buildRegExp()</code>",id:"buildregexp",level:3}];function a(e){const n={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h3,{id:"buildregexp",children:(0,t.jsx)(n.code,{children:"buildRegExp()"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"function buildRegExp(\n  sequence: RegexSequence,\n  flags?: {\n    global?: boolean;\n    ignoreCase?: boolean;\n    multiline?: boolean;\n    hasIndices?: boolean;\n    dotAll?: boolean;\n    sticky?: boolean;\n  },\n): RegExp;\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"buildRegExp"})," is a top-level function responsible for building a JavaScript-native ",(0,t.jsx)(n.code,{children:"RegExp"})," object from passed regex sequence."]}),"\n",(0,t.jsx)(n.p,{children:"It optionally accepts a list of regex flags:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"global"})," - find all matches in a string instead of just the first one."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"ignoreCase"})," - perform case-insensitive matching."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"multiline"})," - treat the start and end of each line in a string as the beginning and end of the string."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"hasIndices"})," - provide each captured group's start and end indices in a match."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"dotAll"})," - allows ",(0,t.jsx)(n.code,{children:"."})," to match newlines."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"sticky"})," - matches only from the index indicated by the ",(0,t.jsx)(n.code,{children:"lastIndex"})," property, does not attempt to match from any later indexes."]}),"\n"]})]})}function u(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>o});var t=i(6540);const s={},l=t.createContext(s);function r(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);