---
id: getting-started
title: Getting Started
slug: /
---

## Goal

Regular expressions are a powerful tool for matching text patterns, yet they are notorious for their hard-to-parse syntax, especially in the case of more complex patterns.

This library allows users to create regular expressions in a structured way, making them easy to write and review. It provides a domain-specific language for defining regular expressions, which are finally turned into JavaScript-native `RegExp` objects for fast execution.

```ts
// Regular JS RegExp
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// TS Regex Builder DSL
const hexDigit = charClass(charRange('a', 'f'), charRange('A', 'F'), charRange('0', '9'));

const hexColor = buildRegExp([
  startOfString,
  optional('#'),
  capture(
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
  ),
  endOfString,
]);
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

## Performance

Regular expressions created with this library are executed at runtime, so you should avoid creating them in a context where they would need to be executed multiple times, e.g., inside loops or functions. We recommend that you create a top-level object for each required regex.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.
See the [project guidelines](GUIDELINES.md) to understand our core principles.

## License

MIT

## Inspiration

TS Regex Builder is inspired by [Swift Regex Builder API](https://developer.apple.com/documentation/regexbuilder).

## Reference

- [ECMAScript Regular Expression BNF Grammar](https://262.ecma-international.org/7.0/#sec-regular-expressions)
- [Swift Regex Builder API docs](https://developer.apple.com/documentation/regexbuilder)
- [Swift Evolution 351: Regex Builder DSL](https://github.com/apple/swift-evolution/blob/main/proposals/0351-regex-builder.md)
