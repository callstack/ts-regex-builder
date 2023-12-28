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

Terminology:
* regex component (e.g., `capture()`, `oneOrMore()`, `word`) - function or object representing regex construct
* regex element (`RegexElement`) - object returned by regex components
* regex node (`RegexNode`) - regex element or string
* regex sequence - single regex node (`RegexElement | string`) or array of such nodes (`Array<RegexElement | string>`)

Most components accept a regex sequence.

### Building regex

| Regex Component                         | Regex construct | Type                                                             | Description                         |
| --------------------------------------- | --------------- | ---------------------------------------------------------------- | ----------------------------------- |
| `buildRegex(...)`                       | `/.../`         | `(nodes: RegexNode \| RegexNode[]) => RegExp`                    | Create `RegExp` instance            |
| `buildRegex({ ignoreCase: true }, ...)` | `/.../i`        | `(flags: RegexFlags, nodes: RegexNode \| RegexNode[]) => RegExp` | Create `RegExp` instance with flags |

Builders accept either a single element (`oneOrMore('a')`) or string (`'a'`)  or array of multiple elements and strings (`[oneOrMore('a'), 'b']`).

### Components

| Regex Component     | Regex construct | Type                                                                 | Notes                       |
| ------------------- | --------------- | -------------------------------------------------------------------- | --------------------------- |
| `capture(...)`      | `(...)`         | `(nodes: RegexNode \| RegexNode[]) => RegexElement`                  | Capture group               |
| `choiceOf(x, y, z)` | `x\|y\|z`       | `(...alternatives: Array<RegexNode \| RegexNode[]>) => RegexElement` | Either of provided patterns |

Notes:
* `capture()` accepts either a single element (`oneOrMore('a')`) or string (`'a'`)  or array of multiple elements and strings (`[oneOrMore('a'), 'b']`).
* `choiceOf()` accepts a variable number of elements or sequences.


### Quantifiers

| Regex Component                    | Regex construct | Type                                                                              | Description                                       |
| ---------------------------------- | --------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- |
| `zeroOrMore(x)`                    | `x*`            | `(nodes: RegexNode \| RegexNode[]) => RegexElement`                               | Zero or more occurence of a pattern               |
| `oneOrMore(x)`                     | `x+`            | `(nodes: RegexNode \| RegexNode[]) => RegexElement`                               | One or more occurence of a pattern                |
| `optionally(x)`                    | `x?`            | `(nodes: RegexNode \| RegexNode[]) => RegexElement`                               | Zero or one occurence of a pattern                |
| `repeat({ count: n }, ...)`        | `x{n}`          | `({ count: number }, nodes: RegexNode \| RegexNode[]) => RegexElement`            | Pattern repeats exact number of times             |
| `repeat({ min: n, }, ...)`         | `x{n,}`         | `({ min: number }, nodes: RegexNode \| RegexNode[]) => RegexElement`              | Pattern repeats at least given number of times    |
| `repeat({ min: n, max: n2 }, ...)` | `x{n1,n2}`      | `({ min: number, max: number }, nodes: RegexNode \| RegexNode[]) => RegexElement` | Pattern repeats between n1 and n2 number of times |

All quantifiers accept a single element or array of elements.

### Character classes

| Regex Component            | Regex construct | Type                                                   | Description                                 |
| -------------------------- | --------------- | ------------------------------------------------------ | ------------------------------------------- |
| `any`                      | `.`             | `CharacterClass`                                       | Any character                               |
| `word`                     | `\w`            | `CharacterClass`                                       | Word characters                             |
| `digit`                    | `\d`            | `CharacterClass`                                       | Digit characters                            |
| `whitespace`               | `\s`            | `CharacterClass`                                       | Whitespace characters                       |
| `anyOf('abc')`             | `[abc]`         | `(chars: string) => CharacterClass`                    | Any of supplied characters                  |
| `characterRange('a', 'z')` | `[a-z]`         | `(from: string, to: string) => CharacterClass`         | Range of characters                         |
| `characterClass(...)`      | `[...]`         | `(...charClasses: CharacterClass[]) => CharacterClass` | Concatenation of multiple character classes |
| `inverted(...)`            | `[^...]`        | `(charClass: CharacterClass) => CharacterClass`        | Inverts character class                     |

Notes:
* `any`, `word`, `digit`, `whitespace` - are objects, no need to call them.
* `anyof` accepts a single string of characters to match
* `characterRange` accepts exactly two **single character** strings representing range start and end (inclusive).
* `characterClass` accepts a variable number of character classes to join
* `inverted` accepts a single character class to be inverted


### Anchors

| Regex Component | Regex construct | Type     | Notes                                                 |
| --------------- | --------------- | -------- | ----------------------------------------------------- |
| `startOfString` | `^`             | `Anchor` | Start of the string (or start of a line in multiline mode) |
| `endOfString`   | `$`             | `Anchor` | End of the string (or end of a line in multiline mode)      |

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
