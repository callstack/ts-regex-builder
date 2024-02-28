"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[544],{6639:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>l,frontMatter:()=>o,metadata:()=>i,toc:()=>d});var t=r(4848),s=r(8453);const o={id:"anchors",title:"Anchors",sidebar_position:6},c=void 0,i={id:"api/anchors",title:"Anchors",description:"Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters.",source:"@site/docs/api/anchors.md",sourceDirName:"api",slug:"/api/anchors",permalink:"/ts-regex-builder/docs/api/anchors",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{id:"anchors",title:"Anchors",sidebar_position:6},sidebar:"docs",previous:{title:"Character Classes",permalink:"/ts-regex-builder/docs/api/character-classes"},next:{title:"Examples",permalink:"/ts-regex-builder/docs/examples"}},a={},d=[{value:"Start and end of string",id:"start-and-end-of-string",level:3},{value:"Word boundary",id:"word-boundary",level:3}];function h(e){const n={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters."}),"\n",(0,t.jsx)(n.h3,{id:"start-and-end-of-string",children:"Start and end of string"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const startOfString: Anchor;\nconst endOfString: Anchor;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"startOfString"})," anchor matches the start of a string (or line, if multiline mode is enabled). Regex syntax: ",(0,t.jsx)(n.code,{children:"^"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"endOfString"})," anchor matches the end of a string (or line, if multiline mode is enabled). Regex syntax: ",(0,t.jsx)(n.code,{children:"$"}),"."]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"word-boundary",children:"Word boundary"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"const wordBoundary: Anchor;\nconst notWordBoundary: Anchor;\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"wordBoundary"})," matches the positions where a word character is not followed or preceded by another word character, effectively indicating the start or end of a word. Regex syntax: ",(0,t.jsx)(n.code,{children:"\\b"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"notWordBoundary"})," matches the positions where a word character is followed or preceded by another word character, indicating that it is not at the start or end of a word. Regex syntax: ",(0,t.jsx)(n.code,{children:"\\B"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Note: word characters are letters, digits, and underscore (",(0,t.jsx)(n.code,{children:"_"}),"). Other special characters like ",(0,t.jsx)(n.code,{children:"#"}),", ",(0,t.jsx)(n.code,{children:"$"}),", etc are not considered word characters."]})]})}function l(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>i});var t=r(6540);const s={},o=t.createContext(s);function c(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);