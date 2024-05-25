---
id: getting-started
title: Getting Started
slug: /
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

<Tabs>
<TabItem value="npm" label="npm">

```sh
npm install ts-regex-builder
```

</TabItem>
<TabItem value="yarn" label="yarn">

```sh
yarn add ts-regex-builder
```

</TabItem>
</Tabs>

## Basic usage

```js
import { buildRegExp, capture, oneOrMore } from 'ts-regex-builder';

// /Hello (\w+)/
const regex = buildRegExp(['Hello ', capture(oneOrMore(word))]);
```

## Performance

Regular expressions created with this library are executed at runtime, so you should avoid creating them in a context where they would need to be executed multiple times, e.g., inside loops or functions. We recommend that you create a top-level object for each required regex.

## License

MIT

## Inspiration

TS Regex Builder is inspired by [Swift Regex Builder API](https://developer.apple.com/documentation/regexbuilder).
