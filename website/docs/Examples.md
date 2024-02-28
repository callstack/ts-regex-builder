---
id: examples
title: Examples
---

## Match hashtags

This regex matches and captures all hashtags in a given string.

```ts
const hashtags = buildRegExp(['#', capture(oneOrMore(word))], { global: true });

const hashtagMatches = '#hello #world'.matchAll(hashtags);
```

Encoded regex: `/#(\w+)/g`.

See tests: [example-hashtags.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-hashtags.ts).

## Hex color validation

This regex validates whether a given string is a valid hex color, with 6 or 3 hex digits.

```ts
const hexDigit = charClass(digit, charRange('a', 'f'));

const regex = buildRegExp(
  [
    startOfString,
    optional('#'),
    choiceOf(
      repeat(hexDigit, 6), // #rrggbb
      repeat(hexDigit, 3), // #rgb
    ),
    endOfString,
  ],
  { ignoreCase: true },
);

const isValid = regex.test('#ffffff');
```

Encoded regex: `/^#?(?:[a-f\d]{6}|[a-f\d]{3})$/i`.

See tests: [example-hex-color.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-hex-color.ts).

## URL validation

This regex validates (in a simplified way) whether a given string is a URL.

```ts
const protocol = [choiceOf('http', 'https'), '://'];
const domainChars = charClass(charRange('a', 'z'), digit);
const domainCharsHypen = charClass(domainChars, anyOf('-'));

const domainSegment = choiceOf(
  domainChars, // single char
  [domainChars, zeroOrMore(domainCharsHypen), domainChars], // multi char
);

const regex = buildRegExp([
  startOfString,
  optional(protocol),
  oneOrMore([domainSegment, '.']), // domain segment
  charRange('a', 'z'), // TLD first char
  oneOrMore(domainChars), // TLD remaining chars
  endOfString,
]);

const isValid = regex.test('https://hello.github.com');
```

Encoded regex: `/^(?:(?:http|https):\/\/)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+[a-z][a-z\d]+$/`.

See tests: [example-url-simple.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-url-simple.ts).

For more advanced URL validation check: [example-url-advanced.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-url-advanced.ts).

## Email address validation

This regex validates whether a given string is a properly formatted email address.

```ts
const hostnameChars = charClass(charRange('a', 'z'), digit, anyOf('-.'));
const domainChars = charRange('a', 'z');

const regex = buildRegExp(
  [
    startOfString,
    oneOrMore(usernameChars),
    '@',
    oneOrMore(hostnameChars),
    '.',
    repeat(domainChars, { min: 2 }),
    endOfString,
  ],
  { ignoreCase: true },
);

const isValid = regex.test('user@example.com');
```

Encoded regex: `/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i`.

See tests: [example-email.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-email.ts).

## JavaScript number validation

This regex validates if a given string is a valid JavaScript number.

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

const isValid = regex.test('1.0e+27');
```

Encoded regex: `/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/`.

See tests: [example-js-number.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-js-number.ts).

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

const isValid = regex.test(192.168.0.1");
```

Encoded regex: `/^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/`.

See tests: [example-ipv4.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-ipv4.ts).

## Mixing with RegExp literals

```ts
// Match integers from 0-255
const octet = choiceOf(
  /[0-9]/, // 0-9
  /[1-9][0-9]/, // 10-99
  /1[0-9][0-9]/, // 100-199
  /2[0-4][0-9]/, // 200-249
  /25[0-5]/, // 250-255
);

// Match
const regex = buildRegExp([
  startOfString, //
  repeat([octet, '.'], 3),
  octet,
  endOfString,
]);

const isValid = regex.test(192.168.0.1");
```

Encoded regex: `/^(?:(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/,`.

See tests: [example-regexp.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-regexp.ts).

## Simple password validation

This regex corresponds to following password policy:

- at least one uppercase letter
- at least one lowercase letter
- at least one digit
- at least one special character
- at least 8 characters long

```ts
const atLeastOneUppercase = lookahead([zeroOrMore(any), /[A-Z]/]);
const atLeastOneLowercase = lookahead([zeroOrMore(any), /[a-z]/]);
const atLeastOneDigit = lookahead([zeroOrMore(any), /[0-9]/]);
const atLeastOneSpecialChar = lookahead([zeroOrMore(any), /[^A-Za-z0-9\s]/]);
const atLeastEightChars = /.{8,}/;

// Match
const validPassword = buildRegExp([
  startOfString,
  atLeastOneUppercase,
  atLeastOneLowercase,
  atLeastOneDigit,
  atLeastOneSpecialChar,
  atLeastEightChars,
  endOfString,
]);

const isValid = regex.test('Aa$123456');
```

Encoded regex: `/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9\s])(?:.{8,})$/`.

See tests: [example-password.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-password.ts).

## Match currency values

```ts
const currencySymbol = '$€£¥R₿';
const decimalSeparator = '.';

const firstThousandsClause = repeat(digit, { min: 1, max: 3 });
const thousandsSeparator = ',';
const thousands = repeat(digit, 3);
const thousandsClause = [optional(thousandsSeparator), thousands];
const cents = repeat(digit, 2);
const isCurrency = lookbehind(anyOf(currencySymbol));

const currencyRegex = buildRegExp([
  isCurrency,
  optional(whitespace),
  firstThousandsClause,
  zeroOrMore(thousandsClause),
  optional([decimalSeparator, cents]),
  endOfString,
]);

const isValid = regex.test('£1,000');
```

Encoded regex: `/(?<=[$€£¥R₿])\s?\d{1,3}(?:,?\d{3})*(?:\.\d{2})?$/`.

See tests: [example-currency.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-currency.ts).

## Finding specific whole words

Ignoring cases where given word is part of a bigger word.

```ts
const wordsToFind = ['word', 'date'];

const regex = buildRegExp([
  wordBoundary, // match whole words only
  choiceOf(...wordsToFind),
  wordBoundary,
]);

expect(regex).toMatchString('word');
expect(regex).toMatchString('date');

expect(regex).not.toMatchString('sword');
expect(regex).not.toMatchString('update');
```

Encoded regex: `/\b(?:word|date)\b/`.

See tests: [example-find-words.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-find-words.ts).

## Finding specific suffixes

Ignoring cases where given word is part of a bigger word.

```ts
const suffixesToFind = ['acy', 'ism'];

const regex = buildRegExp([
  notWordBoundary, // match suffixes only
  choiceOf(...suffixesToFind),
  wordBoundary,
]);

expect(regex).toMatchString('privacy ');
expect(regex).toMatchString('democracy');

expect(regex).not.toMatchString('acy');
expect(regex).not.toMatchString('ism');
```

Encoded regex: `/\B(?:acy|ism)\b/`.

See tests: [example-find-suffixes.ts](https://github.com/callstack/ts-regex-builder/blob/main/src/__tests__/example-find-suffixes.ts).
