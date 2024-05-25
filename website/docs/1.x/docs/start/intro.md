# Introduction

Regular expressions are a powerful tool for matching text patterns, yet they are notorious for their hard-to-parse syntax, especially in the case of more complex patterns.

## Goal

This library allows users to create regular expressions in a structured way, making them easy to write and review. It provides a domain-specific language for defining regular expressions, which are finally turned into JavaScript-native `RegExp` objects for fast execution.

## Example

```ts
// Regular JS RegExp
const hexColor = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

// TS Regex Builder DSL
const hexDigit = charClass(
  charRange('a', 'f'),
  charRange('A', 'F'),
  charRange('0', '9'),
);

const hexColor = buildRegExp([
  startOfString,
  optional('#'),
  capture(
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3) // #rgb
    )
  ),
  endOfString,
]);
```