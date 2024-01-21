# Regex Examples

## Match hashtags

```ts
const hashtags = buildRegExp(
    [
      '#',
      capture(oneOrMore(word)),
    ],
    { global: true },
  );

const hashtagMatches = '#hello #world'.matchAll(hashtags);
```

It matches and captures all hashtags in a given string.

See tests: [exampple-hashtags.ts](../src/__tests__/example-hashtags.ts).

## JavaScript number validation

```ts
const sign = anyOf('+-');
const exponent = [anyOf('eE'), optional(sign), oneOrMore(digit)];

const regex = buildRegExp([
  startOfString,
  optional(sing),
  choiceOf(
    [oneOrMore(digit), optional(['.', zeroOrMore(digit)])], // leading digit
    ['.', oneOrMore(digit)], // leading dot
  ),
  optional(exponent), // exponent
  endOfString,
]);

const isValid = regex.test("1.0e+27");
```

It validates if given string is a valid JavaScript number.

See tests: [exampple-hashtags.ts](../src/__tests__/example-js-number.ts).

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

See tests: [exampple-hashtags.ts](../src/__tests__/example-ipv4.ts).