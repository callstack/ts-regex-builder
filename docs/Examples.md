# Regex Examples

## JavaScript number

```ts
const optionalSign = optionally(anyOf('+-'));
const exponent = [anyOf('eE'), optionalSign, oneOrMore(digit)];

const regex = buildRegExp([
  optionalSign,
  choiceOf(
    [oneOrMore(digit), optionally(['.', zeroOrMore(digit)])], // leading digit
    ['.', oneOrMore(digit)], // leading dot
  ),
  optionally(exponent), // exponent
]);
```

## IPv4 address validation

```ts
// Match integers from 0-255
const octet = choiceOf(
  [digit],
  [charRange('1', '9'), digit],
  ['1', repeat(digit, 2)],
  ['2', charRange('0', '4'), digit],
  ['25', charRange('0', '5')],
);

// Match
const regex = buildRegExp([
  startOfString, //
  repeat([octet, '.'], 3),
  octet,
  endOfString,
]);
```

This code generates the following regex pattern:

```ts
const regex =
  /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
```
