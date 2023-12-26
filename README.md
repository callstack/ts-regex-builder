# TS Regex Builder

User-friendly Regular Expression builder for TypeScript and JavaScript.

## Goal

Regular expressions are a powerful tool for matching complex text patterns, yet they are notorious for their hard-to-understand syntax.

Inspired by Swift's Regex Builder, this library allows users to write easily and understand regular expressions.

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
      repeat({ count: 3 }, hexDigit)
    )
  ),
  endOfString
);
```

## Installation

```sh
npm install ts-regex-builder
```

## Usage

```js
import { buildRegex, capture, oneOrMore } from 'ts-regex-builder';

// /Hello (\w+)/
const regex = buildRegex(['Hello ', capture(oneOrMore(word))]);
```

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
