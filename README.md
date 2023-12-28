# TS Regex Builder

A user-friendly regular expression builder for TypeScript and JavaScript.

## Goal

Regular expressions are a powerful tool for matching simple and complex text patterns, yet they are notorious for their hard-to-understand syntax.

Inspired by Swift's Regex Builder, this library allows users to write and understand regular expressions easily.

```ts
// Before
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// After
const hexDigit = characterClass(
  characterRange('a', 'f'),
  characterRange('A', 'F'),
  characterRange('0', '9')
);

// prettier-ignore
const hexColor = buildRegex(
  startOfString,
  optionally('#'),
  capture(
    choiceOf(
      repeat({ count: 6 }, hexDigit),
      repeat({ count: 3 }, hexDigit),
    )
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
import { buildRegex, capture, oneOrMore } from 'ts-regex-builder';

// /Hello (\w+)/
const regex = buildRegex(['Hello ', capture(oneOrMore(word))]);
```

## Domain-specific language

TS Regex Builder allows you to build complex regular expressions using domain-specific language or regex components.

Terminology:
* regex component (e.g., `capture()`, `oneOrMore()`, `word`) - function or object representing a regex construct
* regex element (`RegexElement`) - object returned by regex components
* regex sequence (`RegexSequence`) - single regex element or string (`RegexElement | string`) or array of such elements and strings (`Array<RegexElement | string>`)

Most of the regex components accept a regex sequence. Examples of sequences:
* single string: `'Hello World'` - note all characters will be automatically escaped in the resulting regex
* single element: `capture('abc')`
* array of elements and strings: `['$', oneOrMore(digit)]`

Regex components can be composed into a complex tree:

```ts
const currencyAmount = buildRegex([
  choiceOf('$', '€', repeat({ count: 3 }, characterRange('A', 'Z'))),
  oneOrMore(digit),
  optionally([
    '.',
    repeat({ count: 2}, digit),
  ]),
])
```


### Building regex

| Regex Component                         | Regex Pattern | Type                                                | Description                         |
| --------------------------------------- | ------------- | --------------------------------------------------- | ----------------------------------- |
| `buildRegex(...)`                       | `/.../`       | `(seq: RegexSequence) => RegExp`                    | Create `RegExp` instance            |
| `buildRegex({ ignoreCase: true }, ...)` | `/.../i`      | `(flags: RegexFlags, seq: RegexSequence) => RegExp` | Create `RegExp` instance with flags |

### Components

| Regex Component     | Regex Pattern | Type                                                 | Notes                       |
| ------------------- | ------------- | ---------------------------------------------------- | --------------------------- |
| `capture(...)`      | `(...)`       | `(seq: RegexSequence) => RegexElement`               | Capture group               |
| `choiceOf(x, y, z)` | `x\|y\|z`     | `(...alternatives: RegexSequence[]) => RegexElement` | Either of provided patterns |

Notes:
* `choiceOf()` accepts a variable number of sequences.


### Quantifiers

| Regex Component                  | Regex Pattern | Type                                                                 | Description                                       |
| -------------------------------- | ------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `zeroOrMore(x)`                  | `x*`          | `(seq: RegexSequence) => RegexElement`                               | Zero or more occurence of a pattern               |
| `oneOrMore(x)`                   | `x+`          | `(seq: RegexSequence) => RegexElement`                               | One or more occurence of a pattern                |
| `optionally(x)`                  | `x?`          | `(seq: RegexSequence) => RegexElement`                               | Zero or one occurence of a pattern                |
| `repeat({ count: n }, x)`        | `x{n}`        | `({ count: number }, seq: RegexSequence) => RegexElement`            | Pattern repeats exact number of times             |
| `repeat({ min: n, }, x)`         | `x{n,}`       | `({ min: number }, seq: RegexSequence) => RegexElement`              | Pattern repeats at least given number of times    |
| `repeat({ min: n, max: n2 }, x)` | `x{n1,n2}`    | `({ min: number, max: number }, seq: RegexSequence) => RegexElement` | Pattern repeats between n1 and n2 number of times |

### Character classes

| Regex Component            | Regex Pattern | Type                                                   | Description                                 |
| -------------------------- | ------------- | ------------------------------------------------------ | ------------------------------------------- |
| `any`                      | `.`           | `CharacterClass`                                       | Any character                               |
| `word`                     | `\w`          | `CharacterClass`                                       | Word characters                             |
| `digit`                    | `\d`          | `CharacterClass`                                       | Digit characters                            |
| `whitespace`               | `\s`          | `CharacterClass`                                       | Whitespace characters                       |
| `anyOf('abc')`             | `[abc]`       | `(chars: string) => CharacterClass`                    | Any of supplied characters                  |
| `characterRange('a', 'z')` | `[a-z]`       | `(from: string, to: string) => CharacterClass`         | Range of characters                         |
| `characterClass(...)`      | `[...]`       | `(...charClasses: CharacterClass[]) => CharacterClass` | Concatenation of multiple character classes |
| `inverted(...)`            | `[^...]`      | `(charClass: CharacterClass) => CharacterClass`        | Inverts character class                     |

Notes:
* `any`, `word`, `digit`, `whitespace` - are objects, no need to call them.
* `anyof` accepts a single string of characters to match
* `characterRange` accepts exactly **two single character** strings representing range start and end (inclusive).
* `characterClass` accepts a variable number of character classes to join into a single class
* `inverted` accepts a single character class to be inverted


### Anchors

| Regex Component | Regex Pattern | Type     | Notes                                                      |
| --------------- | ------------- | -------- | ---------------------------------------------------------- |
| `startOfString` | `^`           | `Anchor` | Start of the string (or start of a line in multiline mode) |
| `endOfString`   | `$`           | `Anchor` | End of the string (or end of a line in multiline mode)     |

Notes:
* `startOfString`, `endOfString` - are objects, no need to call them.

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
