---
id: overview
title: Overview
slug: /api
---

TS Regex Builder allows you to build complex regular expressions using domain-specific language.

### Terminology

- regex construct (`RegexConstruct`) - common name for all regex constructs like character classes, quantifiers, and anchors.
- regex element (`RegexElement`) - a fundamental building block of a regular expression, defined as either a regex construct, a string, or `RegExp` literal (`/.../`).
- regex sequence (`RegexSequence`) - a sequence of regex elements forming a regular expression. For developer convenience, it also accepts a single element instead of an array.

Most of the regex constructs accept a regex sequence as their argument.

#### Examples of sequences

- single element (construct): `capture('Hello')`
- single element (string): `'Hello'`
- single element (`RegExp` literal): `/Hello/`
- array of elements: `['USD', oneOrMore(digit), /Hello/]`

Regex constructs can be composed into a tree structure:

```ts
const currencyCode = repeat(charRange('A', 'Z'), 3);
const currencyAmount = buildRegExp([
  choiceOf('$', '€', currencyCode), // currency
  capture(
    oneOrMore(digit), // integer part
    optional(['.', repeat(digit, 2)]), // fractional part
  ),
]);
```

See [Types](./api/types) for more info.

### Regex Builders

| Builder                                  | Regex Syntax | Description                         |
| ---------------------------------------- | ------------ | ----------------------------------- |
| `buildRegExp(...)`                       | `/.../`      | Create `RegExp` instance            |
| `buildRegExp(..., { ignoreCase: true })` | `/.../i`     | Create `RegExp` instance with flags |

See [Builder](./api/builder) for more info.

### Regex Constructs

| Construct           | Regex Syntax | Notes                           |
| ------------------- | ------------ | ------------------------------- |
| `choiceOf(x, y, z)` | `x\|y\|z`    | Match one of provided sequences |
| `capture(...)`      | `(...)`      | Create a capture group          |

See [Constructs](./api/constructs) for more info.

> [!NOTE]
> TS Regex Builder does not have a construct for non-capturing groups. Such groups are implicitly added when required.

### Quantifiers

| Quantifier                       | Regex Syntax | Description                                       |
| -------------------------------- | ------------ | ------------------------------------------------- |
| `zeroOrMore(x)`                  | `x*`         | Zero or more occurence of a pattern               |
| `oneOrMore(x)`                   | `x+`         | One or more occurence of a pattern                |
| `optional(x)`                    | `x?`         | Zero or one occurence of a pattern                |
| `repeat(x, n)`                   | `x{n}`       | Pattern repeats exact number of times             |
| `repeat(x, { min: n, })`         | `x{n,}`      | Pattern repeats at least given number of times    |
| `repeat(x, { min: n, max: n2 })` | `x{n1,n2}`   | Pattern repeats between n1 and n2 number of times |

See [Quantifiers](./api/quantifiers) for more info.

### Character classes

| Character class       | Regex Syntax | Description                                       |
| --------------------- | ------------ | ------------------------------------------------- |
| `any`                 | `.`          | Any character                                     |
| `word`                | `\w`         | Word character: letter, digit, underscore         |
| `digit`               | `\d`         | Digit character: 0 to 9                           |
| `whitespace`          | `\s`         | Whitespace character: space, tab, line break, ... |
| `anyOf('abc')`        | `[abc]`      | Any of provided characters                        |
| `charRange('a', 'z')` | `[a-z]`      | Character in a range                              |
| `charClass(...)`      | `[...]`      | Union of multiple character classes               |
| `inverted(...)`       | `[^...]`     | Negation of a given character class               |

See [Character Classes](./api/character-classes) for more info.

### Assertions

| Assertion                 | Regex Syntax | Description                                                              |
| ------------------------- | ------------ | ------------------------------------------------------------------------ |
| `startOfString`           | `^`          | Match the start of the string (or the start of a line in multiline mode) |
| `endOfString`             | `$`          | Match the end of the string (or the end of a line in multiline mode)     |
| `wordBoundary`            | `\b`         | Match the start or end of a word without consuming characters            |
| `lookahead(...)`          | `(?=...)`    | Match subsequent text without consuming it                               |
| `negativeLookhead(...)`   | `(?!...)`    | Reject subsequent text without consuming it                              |
| `lookbehind(...)`         | `(?<=...)`   | Match preceding text without consuming it                                |
| `negativeLookbehind(...)` | `(?<!...)`   | Reject preceding text without consuming it                               |


See [Assertions](./api/assertions) for more info.
