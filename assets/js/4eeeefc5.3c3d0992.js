"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[421],{5631:(e,c,s)=>{s.r(c),s.d(c,{assets:()=>d,contentTitle:()=>t,default:()=>o,frontMatter:()=>r,metadata:()=>l,toc:()=>i});var a=s(4848),n=s(8453);const r={id:"character-classes",title:"Character Classes"},t=void 0,l={id:"api/character-classes",title:"Character Classes",description:"Character classes are a set of characters that match any one of the characters in the set.",source:"@site/docs/api/character-classes.md",sourceDirName:"api",slug:"/api/character-classes",permalink:"/ts-regex-builder/api/character-classes",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"character-classes",title:"Character Classes"},sidebar:"docs",previous:{title:"Assertions",permalink:"/ts-regex-builder/api/assertions"},next:{title:"Unicode",permalink:"/ts-regex-builder/api/unicode"}},d={},i=[{value:"Common character class escapes",id:"common-character-class-escapes",level:3},{value:"<code>anyOf()</code>",id:"anyof",level:3},{value:"<code>charRange()</code>",id:"charrange",level:3},{value:"<code>charClass()</code>",id:"charclass",level:3},{value:"<code>negated()</code>",id:"negated",level:3}];function h(e){const c={code:"code",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,n.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(c.p,{children:"Character classes are a set of characters that match any one of the characters in the set."}),"\n",(0,a.jsx)(c.h3,{id:"common-character-class-escapes",children:"Common character class escapes"}),"\n",(0,a.jsx)(c.pre,{children:(0,a.jsx)(c.code,{className:"language-ts",children:"const any: RegexConstruct;\nconst word: CharacterEscape;\nconst nonWord: CharacterEscape;\nconst digit: CharacterEscape;\nconst nonDigit: CharacterEscape;\nconst whitespace: CharacterEscape;\nconst nonWhitespace: CharacterEscape;\n"})}),"\n",(0,a.jsxs)(c.ul,{children:["\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"any"})," matches any character except newline characters. Regex syntax: ",(0,a.jsx)(c.code,{children:"."}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"word"})," matches any word character (letters, digits & underscore). Regex syntax: ",(0,a.jsx)(c.code,{children:"\\w"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"nonWord"})," matches any character ",(0,a.jsx)(c.strong,{children:"except"})," word characters (letters, digits & underscore). Regex syntax: ",(0,a.jsx)(c.code,{children:"\\W"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"digit"})," matches any digit. Regex syntax: ",(0,a.jsx)(c.code,{children:"\\d"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"nonDigit"})," matches any character ",(0,a.jsx)(c.strong,{children:"except"})," digits. Regex syntax: ",(0,a.jsx)(c.code,{children:"\\D"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"whitespace"})," matches any whitespace character (spaces, tabs, line breaks). Regex syntax: ",(0,a.jsx)(c.code,{children:"\\s"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"nonWhitespace"})," matches any character ",(0,a.jsx)(c.strong,{children:"except"})," whitespace characters (spaces, tabs, line breaks). Regex syntax: ",(0,a.jsx)(c.code,{children:"\\S"}),"."]}),"\n"]}),"\n",(0,a.jsx)(c.h3,{id:"anyof",children:(0,a.jsx)(c.code,{children:"anyOf()"})}),"\n",(0,a.jsx)(c.pre,{children:(0,a.jsx)(c.code,{className:"language-ts",children:"function anyOf(characters: string): CharacterClass;\n"})}),"\n",(0,a.jsxs)(c.p,{children:["Regex syntax: ",(0,a.jsx)(c.code,{children:"[abc]"}),"."]}),"\n",(0,a.jsxs)(c.p,{children:["The ",(0,a.jsx)(c.code,{children:"anyOf"})," class matches any character in the ",(0,a.jsx)(c.code,{children:"character"})," string."]}),"\n",(0,a.jsxs)(c.p,{children:["Example: ",(0,a.jsx)(c.code,{children:"anyOf('aeiou')"})," will match either ",(0,a.jsx)(c.code,{children:"a"}),", ",(0,a.jsx)(c.code,{children:"e"}),", ",(0,a.jsx)(c.code,{children:"i"})," ",(0,a.jsx)(c.code,{children:"o"})," or ",(0,a.jsx)(c.code,{children:"u"})," characters."]}),"\n",(0,a.jsx)(c.h3,{id:"charrange",children:(0,a.jsx)(c.code,{children:"charRange()"})}),"\n",(0,a.jsx)(c.pre,{children:(0,a.jsx)(c.code,{className:"language-ts",children:"function charRange(start: string, end: string): CharacterClass;\n"})}),"\n",(0,a.jsxs)(c.p,{children:["Regex syntax: ",(0,a.jsx)(c.code,{children:"[a-z]"}),"."]}),"\n",(0,a.jsxs)(c.p,{children:["The ",(0,a.jsx)(c.code,{children:"charRange"})," class matches any characters in the range from ",(0,a.jsx)(c.code,{children:"start"})," to ",(0,a.jsx)(c.code,{children:"end"})," (inclusive)."]}),"\n",(0,a.jsx)(c.p,{children:"Examples:"}),"\n",(0,a.jsxs)(c.ul,{children:["\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"charRange('a', 'z')"})," will match all lowercase characters from ",(0,a.jsx)(c.code,{children:"a"})," to ",(0,a.jsx)(c.code,{children:"z"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"charRange('A', 'Z')"})," will match all uppercase characters from ",(0,a.jsx)(c.code,{children:"A"})," to ",(0,a.jsx)(c.code,{children:"Z"}),"."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"charRange('0', '9')"})," will match all digit characters from ",(0,a.jsx)(c.code,{children:"0"})," to ",(0,a.jsx)(c.code,{children:"9"}),"."]}),"\n"]}),"\n",(0,a.jsx)(c.h3,{id:"charclass",children:(0,a.jsx)(c.code,{children:"charClass()"})}),"\n",(0,a.jsx)(c.pre,{children:(0,a.jsx)(c.code,{className:"language-ts",children:"function charClass(...elements: CharacterClass[]): CharacterClass;\n"})}),"\n",(0,a.jsxs)(c.p,{children:["Regex syntax: ",(0,a.jsx)(c.code,{children:"[...]"}),"."]}),"\n",(0,a.jsxs)(c.p,{children:["The ",(0,a.jsx)(c.code,{children:"charClass"})," construct creates a new character class that includes all passed character classes."]}),"\n",(0,a.jsx)(c.p,{children:"Examples:"}),"\n",(0,a.jsxs)(c.ul,{children:["\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"charClass(charRange('a', 'f'), digit)"})," will match all lowercase hex digits (",(0,a.jsx)(c.code,{children:"0"})," to ",(0,a.jsx)(c.code,{children:"9"})," and ",(0,a.jsx)(c.code,{children:"a"})," to ",(0,a.jsx)(c.code,{children:"f"}),")."]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"charClass(charRange('a', 'z'), digit, anyOf(\"._-\"))"})," will match any digit, lowercase Latin letter from ",(0,a.jsx)(c.code,{children:"a"})," to ",(0,a.jsx)(c.code,{children:"z"}),", and either of ",(0,a.jsx)(c.code,{children:"."}),", ",(0,a.jsx)(c.code,{children:"_"}),", and ",(0,a.jsx)(c.code,{children:"-"})," characters."]}),"\n"]}),"\n",(0,a.jsx)(c.h3,{id:"negated",children:(0,a.jsx)(c.code,{children:"negated()"})}),"\n",(0,a.jsx)(c.pre,{children:(0,a.jsx)(c.code,{className:"language-ts",children:"function negated(element: CharacterClass): RegexConstruct;\n"})}),"\n",(0,a.jsxs)(c.p,{children:["Regex syntax: ",(0,a.jsx)(c.code,{children:"[^...]"}),"."]}),"\n",(0,a.jsxs)(c.p,{children:["The ",(0,a.jsx)(c.code,{children:"negated"})," construct creates a new character class that matches any character not present in the passed character class."]}),"\n",(0,a.jsx)(c.p,{children:"Examples:"}),"\n",(0,a.jsxs)(c.ul,{children:["\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"negated(digit)"})," matches any character that is not a digit"]}),"\n",(0,a.jsxs)(c.li,{children:[(0,a.jsx)(c.code,{children:"negated(anyOf('aeiou'))"})," matches any character that is not a lowercase vowel."]}),"\n"]})]})}function o(e={}){const{wrapper:c}={...(0,n.R)(),...e.components};return c?(0,a.jsx)(c,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8453:(e,c,s)=>{s.d(c,{R:()=>t,x:()=>l});var a=s(6540);const n={},r=a.createContext(n);function t(e){const c=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(c):{...c,...e}}),[c,e])}function l(e){let c;return c=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:t(e.components),a.createElement(r.Provider,{value:c},e.children)}}}]);