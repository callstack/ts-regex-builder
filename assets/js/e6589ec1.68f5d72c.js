"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[995],{832:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>t,toc:()=>l});var s=r(4848),i=r(8453);const o={id:"quantifiers",title:"Quantifiers",sidebar_position:4},c=void 0,t={id:"api/quantifiers",title:"Quantifiers",description:"Quantifiers in regex define the number of occurrences to match for a pattern.",source:"@site/docs/api/quantifiers.md",sourceDirName:"api",slug:"/api/quantifiers",permalink:"/ts-regex-builder/docs/api/quantifiers",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{id:"quantifiers",title:"Quantifiers",sidebar_position:4},sidebar:"docs",previous:{title:"Constructs",permalink:"/ts-regex-builder/docs/api/constructs"},next:{title:"Character Classes",permalink:"/ts-regex-builder/docs/api/character-classes"}},a={},l=[{value:"<code>zeroOrMore()</code>",id:"zeroormore",level:3},{value:"<code>oneOrMore()</code>",id:"oneormore",level:3},{value:"<code>optional()</code>",id:"optional",level:3},{value:"<code>repeat()</code>",id:"repeat",level:3}];function d(e){const n={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"Quantifiers in regex define the number of occurrences to match for a pattern."}),"\n",(0,s.jsx)(n.h3,{id:"zeroormore",children:(0,s.jsx)(n.code,{children:"zeroOrMore()"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function zeroOrMore(\n  sequence: RegexSequence,\n  options?: {\n    greedy?: boolean; // default=true\n  },\n): ZeroOrMore;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Regex syntax:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x*"})," for default greedy behavior (match as many characters as possible)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x*?"})," for non-greedy behavior (match as few characters as possible)"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"zeroOrMore"})," quantifier matches zero or more occurrences of a given pattern, allowing a flexible number of repetitions of that element."]}),"\n",(0,s.jsx)(n.h3,{id:"oneormore",children:(0,s.jsx)(n.code,{children:"oneOrMore()"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function oneOrMore(\n  sequence: RegexSequence,\n  options?: {\n    greedy?: boolean; // default=true\n  },\n): OneOrMore;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Regex syntax:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x+"})," for default greedy behavior (match as many characters as possible)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x+?"})," for non-greedy behavior (match as few characters as possible)"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"oneOrMore"})," quantifier matches one or more occurrences of a given pattern, allowing a flexible number of repetitions of that element."]}),"\n",(0,s.jsx)(n.h3,{id:"optional",children:(0,s.jsx)(n.code,{children:"optional()"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function optional(\n  sequence: RegexSequence,\n  options?: {\n    greedy?: boolean; // default=true\n  },\n): Optionally;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Regex syntax:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x?"})," for default greedy behavior (match as many characters as possible)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x??"})," for non-greedy behavior (match as few characters as possible)"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"optional"})," quantifier matches zero or one occurrence of a given pattern, making it optional."]}),"\n",(0,s.jsx)(n.h3,{id:"repeat",children:(0,s.jsx)(n.code,{children:"repeat()"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"function repeat(\n  sequence: RegexSequence,\n  options:\n    | number\n    | {\n        min: number;\n        max?: number;\n        greedy?: boolean; // default=true\n      },\n): Repeat;\n"})}),"\n",(0,s.jsx)(n.p,{children:"Regex syntax:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x{n}"}),", ",(0,s.jsx)(n.code,{children:"x{min,}"}),", ",(0,s.jsx)(n.code,{children:"x{min, max}"})," for default greedy behavior (match as many characters as possible)"]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"x{min,}?"}),", ",(0,s.jsx)(n.code,{children:"x{min, max}?"})," for non-greedy behavior (match as few characters as possible)"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"repeat"})," quantifier in regex matches either exactly ",(0,s.jsx)(n.code,{children:"count"})," times or between ",(0,s.jsx)(n.code,{children:"min"})," and ",(0,s.jsx)(n.code,{children:"max"})," times. If only ",(0,s.jsx)(n.code,{children:"min"})," is provided, it matches at least ",(0,s.jsx)(n.code,{children:"min"})," times."]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>c,x:()=>t});var s=r(6540);const i={},o=s.createContext(i);function c(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function t(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);