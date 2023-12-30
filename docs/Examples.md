# Regex Examples

## IPv4 address validation

```ts
// Match integers from 0-255
const octet = choiceOf(
  [digit],
  [charRange('1', '9'), digit],
  ['1', repeat({ count: 2 }, digit)],
  ['2', charRange('0', '4'), digit],
  ['25', charRange('0', '5')]
);

// Match
const regex = buildRegex([
  startOfString,
  capture(octet),
  '.',
  capture(octet),
  '.',
  capture(octet),
  '.',
  capture(octet),
  endOfString,
]);
```

This code generates the following regex pattern:

```ts
const regex =
  /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
```

This pattern uses repetition of the `capture(octet)` elements to generate capture groups for each of the IPv4 octets:

```ts
// Matched groups ['192.168.0.1', '192', '168', '0', '1',]
const match = regex.exec('192.168.0.1');
```
