---
id: unicode
title: Unicode
---

### Unicode-aware mode

JavaScript `RegExp` object offers [Unicode-aware](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).

### Character escapes

```ts
function charCode(codePoint: number): CharacterEscape;
```

Regex syntax:

- `\uXXXX`: 4-digit hex escape for code points below 0x10000.
- `\u{X}`: Unicode code point escape for code points above 0xFFFF.

Note: for code points above 0xFFFF, the regex engine must be [unicode-aware](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode#unicode-aware_mode).

### Unicode character property escapes

```ts
function charProperty(property: string, value?: string): CharacterEscape;
```

Unicode character property escape matching a set of characters specified by a Unicode property.

Regex syntax: `\p{Property}` or `\p{Property=Value}`

@see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Unicode_character_class_escape
@see https://www.unicode.org/reports/tr18/
