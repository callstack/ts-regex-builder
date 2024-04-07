---
id: constructs
title: Constructs
---

These functions and objects represent available regex constructs.

### `choiceOf()`

```ts
function choiceOf(
  ...alternatives: RegexSequence[],
): ChoiceOf {
```

Regex syntax: `a|b|c`.

The `choiceOf` (disjunction) construct matches one out of several possible sequences. It functions similarly to a logical OR operator in programming. It can match simple string options as well as complex patterns.

Example: `choiceOf("color", "colour")` matches either `color` or `colour` pattern.

### `regex()`

```ts
function regex(sequence: RegexSequence): Regex;
```

Regex syntax: the pattern remains unchanged when wrapped by this construct.

This construct is a no-op operator that groups array of `RegexElements` into a single element for composition purposes. This is particularly useful for defining smaller sequence patterns as separate variables.

Without `regex()`:

```ts
const exponent = [anyOf('eE'), optional(anyOf('+-')), oneOrMore(digit)];
const numberWithExponent = buildRegExp([
  oneOrMore(digit),
  ...exponent, // Need to spread "exponent" as it's an array.
]);
```

With `regex()`:

```ts
const exponent = regex([anyOf('eE'), optional(anyOf('+-')), oneOrMore(digit)]);
const numberWithExponent = buildRegExp([
  oneOrMore(digit),
  exponent, // Easily compose "exponent" sequence as a single element.
]);
```
