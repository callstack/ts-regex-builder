# `regex()`

```ts
function regex(sequence: RegexSequence): Regex;
```

Regex syntax: the pattern remains unchanged when wrapped by this construct.

This construct is a no-op operator that groups array of `RegexElements` into a single element for composition purposes. This is particularly useful for defining smaller sequence patterns as separate variables.

### Example

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
  exponent, // Compose "exponent" sequence as a single element.
]);
```
