# Regex Examples

## Match hashtags

This regex matches and captures all hashtags in a given string.

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

Encoded regex: `/#(\w+)/g`.

See tests: [example-hashtags.ts](../src/__tests__/example-hashtags.ts).

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

const isValid = regex.test("#ffffff");
```

Encoded regex: `/^#?(?:[a-f\d]{6}|[a-f\d]{3})$/i`.

See tests: [example-hex-color.ts](../src/__tests__/example-hex-color.ts).

## Simple URL validation

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

const isValid = regex.test("https://hello.github.com");
```

Encoded regex: `/^(?:(?:http|https):\/\/)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+[a-z][a-z\d]+$/`.

See tests: [example-url.ts](../src/__tests__/example-url.ts).

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

const isValid = regex.test("user@example.com");
```

Encoded regex: `/^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i`.

See tests: [example-email.ts](../src/__tests__/example-email.ts).

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

const isValid = regex.test("1.0e+27");
```

Encoded regex: `/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/`.

See tests: [example-js-number.ts](../src/__tests__/example-js-number.ts).

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

See tests: [example-ipv4.ts](../src/__tests__/example-ipv4.ts).

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

See tests: [example-regexp.ts](../src/__tests__/example-regexp.ts).

## Paasword validation

//
// The password policy is as follows:
//  - At least one uppercase letter
//  - At least one lowercase letter
//  - At least one digit
//  - At least one special character
//  - At least 8 characters long
//

```ts
const atLeastOneUppercase = lookahead([oneOrMore(word), charRange('A', 'Z')]);
const atLeastOneLowercase = lookahead([oneOrMore(word), charRange('a', 'z')]);
const atLeastOneDigit = lookahead([oneOrMore(word), digit]);
const atLeastOneSpecialChar = lookahead([oneOrMore(word), anyOf('$@*$&!/')]);
const atLeast8Chars = /.{8,}/;

// Match
  const validPassword = buildRegExp(
      [
          startOfString,
          atLeastOneUppercase,
          atLeastOneLowercase,
          atLeastOneDigit,
          atLeastOneSpecialChar,
          atLeast8Chars,
          endOfString
      ]
  );

const isValid = regex.test("Aa$123456");
```

Encoded regex: `/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/`.

See tests: [example-password.ts](../src/__tests__/example-password.ts).
