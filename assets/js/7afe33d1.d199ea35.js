"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[691],{5868:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>t,default:()=>h,frontMatter:()=>o,metadata:()=>d,toc:()=>a});var r=s(4848),i=s(8453);const o={id:"assertions",title:"Assertions"},t=void 0,d={id:"api/assertions",title:"Assertions",description:"Anchors",source:"@site/docs/api/assertions.md",sourceDirName:"api",slug:"/api/assertions",permalink:"/ts-regex-builder/api/assertions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"assertions",title:"Assertions"},sidebar:"docs",previous:{title:"Quantifiers",permalink:"/ts-regex-builder/api/quantifiers"},next:{title:"Character Classes",permalink:"/ts-regex-builder/api/character-classes"}},c={},a=[{value:"Anchors",id:"anchors",level:2},{value:"Start and end of string",id:"start-and-end-of-string",level:3},{value:"Word boundary",id:"word-boundary",level:3},{value:"Lookarounds",id:"lookarounds",level:2},{value:"<code>lookahead()</code>",id:"lookahead",level:3},{value:"<code>negativeLookahead()</code>",id:"negativelookahead",level:3},{value:"<code>lookbehind()</code>",id:"lookbehind",level:3},{value:"<code>negativeLookbehind()</code>",id:"negativelookbehind",level:3}];function l(e){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{id:"anchors",children:"Anchors"}),"\n",(0,r.jsx)(n.p,{children:"Anchors are special characters or sequences that specify positions in the input string rather than matching specific characters."}),"\n",(0,r.jsx)(n.h3,{id:"start-and-end-of-string",children:"Start and end of string"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const startOfString: RegexConstruct;\nconst endOfString: RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"startOfString"})," anchor matches the start of a string (or line, if multiline mode is enabled). Regex syntax: ",(0,r.jsx)(n.code,{children:"^"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"endOfString"})," anchor matches the end of a string (or line, if multiline mode is enabled). Regex syntax: ",(0,r.jsx)(n.code,{children:"$"}),"."]}),"\n"]}),"\n",(0,r.jsx)(n.h3,{id:"word-boundary",children:"Word boundary"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:"This API was added in version 1.3.0."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"const wordBoundary: RegexConstruct;\nconst nonWordBoundary: RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"wordBoundary"})," matches the positions where a word character is not followed or preceded by another word character, effectively indicating the start or end of a word. Regex syntax: ",(0,r.jsx)(n.code,{children:"\\b"}),"."]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"nonWordBoundary"})," matches the positions where a word character is followed or preceded by another word character, indicating that it is not at the start or end of a word. Regex syntax: ",(0,r.jsx)(n.code,{children:"\\B"}),"."]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["Note: word characters are letters, digits, and underscore (",(0,r.jsx)(n.code,{children:"_"}),"). Other special characters like ",(0,r.jsx)(n.code,{children:"#"}),", ",(0,r.jsx)(n.code,{children:"$"}),", etc are not considered word characters."]}),"\n",(0,r.jsx)(n.h2,{id:"lookarounds",children:"Lookarounds"}),"\n",(0,r.jsx)(n.p,{children:"Lookarounds in regex are used for asserting that some pattern is or isn't followed or preceded by another pattern, without including the latter in the match."}),"\n",(0,r.jsx)(n.h3,{id:"lookahead",children:(0,r.jsx)(n.code,{children:"lookahead()"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:"This API was added in version 1.3.0."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function lookahead(sequence: RegexSequence): RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Regex syntax: ",(0,r.jsx)(n.code,{children:"(?=...)"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Allows for conditional matching by checking for subsequent patterns in regexes without consuming them."}),"\n",(0,r.jsx)(n.h3,{id:"negativelookahead",children:(0,r.jsx)(n.code,{children:"negativeLookahead()"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:"This API was added in version 1.3.0."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function negativeLookahead(sequence: RegexSequence): RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Regex syntax: ",(0,r.jsx)(n.code,{children:"(?!...)"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Allows for matches to be rejected if a specified subsequent pattern is present, without consuming any characters."}),"\n",(0,r.jsx)(n.h3,{id:"lookbehind",children:(0,r.jsx)(n.code,{children:"lookbehind()"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:"This API was added in version 1.3.0."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function lookbehind(sequence: RegexSequence): RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Regex syntax: ",(0,r.jsx)(n.code,{children:"(?<=...)"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Allows for conditional matching by checking for preceeding patterns in regexes without consuming them."}),"\n",(0,r.jsx)(n.h3,{id:"negativelookbehind",children:(0,r.jsx)(n.code,{children:"negativeLookbehind()"})}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:"This API was added in version 1.3.0."})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"function negativeLookahead(sequence: RegexSequence): RegexConstruct;\n"})}),"\n",(0,r.jsxs)(n.p,{children:["Regex syntax: ",(0,r.jsx)(n.code,{children:"(?<!...)"}),"."]}),"\n",(0,r.jsx)(n.p,{children:"Allows for matches to be rejected if a specified preceeding pattern is present, without consuming any characters."})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>t,x:()=>d});var r=s(6540);const i={},o=r.createContext(i);function t(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);