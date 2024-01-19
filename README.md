# TS Regex Builder

A user-friendly regular expression builder for TypeScript and JavaScript.

## Goal

Regular expressions are a powerful tool for matching simple and complex text patterns, yet they are notorious for their hard-to-parse syntax.

This library allows users to create regular expressions in a structured way, making them ease to understand.

```ts
// Before
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// After
const hexDigit = charClass(
  charRange('a', 'f'), //
  charRange('A', 'F'),
  charRange('0', '9'),
);

const hexColor = buildRegExp(
  startOfString,
  optionally('#'),
  capture(
    choiceOf(
      repeat(hexDigit, { count: 6 }), // #rrggbb
      repeat(hexDigit, { count: 3 }), // #rgb
    ),
  ),
  endOfString,
);
```

## Installation

```sh
npm install ts-regex-builder
```

or

```sh
yarn add ts-regex-builder
```

## Basic usage

```js
import { buildRegExp, capture, oneOrMore } from 'ts-regex-builder';

// /Hello (\w+)/
const regex = buildRegExp(['Hello ', capture(oneOrMore(word))]);
```

## Regex domain-specific language

TS Regex Builder allows you to build complex regular expressions using domain-specific language.

Terminology:

- regex construct (`RegexConstruct`) - common name for all regex constructs like character classes, quantifiers, and anchors.

- regex element (`RegexElement`) - fundamental building block of a regular expression, defined as either a regex construct or a string.

- regex sequence (`RegexSequence`) - a sequence of regex elements forming a regular expression. For developer convenience it also accepts a single element instead of array.

Most of the regex constructs accept a regex sequence as their argument.

Examples of sequences:
- array of elements: `['USD', oneOrMore(digit)]`
- single construct: `capture('abc')`
- single string: `'Hello'`

Regex components can be composed into a tree:

```ts
const currencyAmount = buildRegExp([
  choiceOf(
    '$',
    '€',
    repeat({ count: 3 }, charRange('A', 'Z')), // ISO currency code
  ),
  capture(
    oneOrMore(digit), // Integer part
    optionally(['.', repeat({ count: 2 }, digit)]), // Fractional part
  ),
]);
```

### Regex Builders

| Regex Component                         | Regex Pattern | Description                         |
| --------------------------------------- | ------------- | ----------------------------------- |
| `buildRegExp(...)`                       | `/.../`       | Create `RegExp` instance            |
| `buildRegExp(..., { ignoreCase: true })` | `/.../i`      | Create `RegExp` instance with flags |

### Components

| Regex Component     | Regex Pattern | Notes                           |
| ------------------- | ------------- | ------------------------------- |
| `capture(...)`      | `(...)`       | Create a capture group          |
| `choiceOf(x, y, z)` | `x\|y\|z`     | Match one of provided sequences |

Notes:

- `capture` accepts a sequence of elements
- `choiceOf()` accepts a variable number of sequences

### Quantifiers

| Regex Component                  | Regex Pattern | Description                                       |
| -------------------------------- | ------------- | ------------------------------------------------- |
| `zeroOrMore(x)`                  | `x*`          | Zero or more occurence of a pattern               |
| `oneOrMore(x)`                   | `x+`          | One or more occurence of a pattern                |
| `optionally(x)`                  | `x?`          | Zero or one occurence of a pattern                |
| `repeat(x, { count: n })`        | `x{n}`        | Pattern repeats exact number of times             |
| `repeat(x, { min: n, })`         | `x{n,}`       | Pattern repeats at least given number of times    |
| `repeat(x, { min: n, max: n2 })` | `x{n1,n2}`    | Pattern repeats between n1 and n2 number of times |

All quantifiers accept sequence of elements

### Character classes

| Regex Component       | Regex Pattern | Description                                 |
| --------------------- | ------------- | ------------------------------------------- |
| `any`                 | `.`           | Any character                               |
| `word`                | `\w`          | Word characters                             |
| `digit`               | `\d`          | Digit characters                            |
| `whitespace`          | `\s`          | Whitespace characters                       |
| `anyOf('abc')`        | `[abc]`       | Any of supplied characters                  |
| `charRange('a', 'z')` | `[a-z]`       | Range of characters                         |
| `charClass(...)`      | `[...]`       | Concatenation of multiple character classes |
| `inverted(...)`       | `[^...]`      | Negation of a given character class         |

Notes:

- `any`, `word`, `digit`, `whitespace` are objects, no need to call them
- `anyOf` accepts a single string of characters to match
- `charRange` accepts exactly **two single character** strings representing range start and end (inclusive)
- `charClass` accepts a variable number of character classes to join into a single class
- `inverted` accepts a single character class to be inverted

### Anchors

| Regex Component | Regex Pattern | Description                                                      |
| --------------- | ------------- | ---------------------------------------------------------------- |
| `startOfString` | `^`           | Match start of the string (or start of a line in multiline mode) |
| `endOfString`   | `$`           | Match end of the string (or end of a line in multiline mode)     |

Notes:

- `startOfString`, `endOfString` are objects, no need to call them.

## Examples

See [Examples document](./docs/Examples.md).

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
See the [project guidelines](GUIDELINES.md) to understand our core principles.

## License

MIT

## Reference

- [Swift Regex Builder API docs](https://developer.apple.com/documentation/regexbuilder)
- [Swift Evolution 351: Regex Builder DSL](https://github.com/apple/swift-evolution/blob/main/proposals/0351-regex-builder.md)
- [ECMAScript Regular Expression BNF Grammar](https://262.ecma-international.org/7.0/#sec-regular-expressions)

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
