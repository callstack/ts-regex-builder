import {
  anyOf,
  buildRegExp,
  charRange,
  choiceOf,
  digit,
  endOfString,
  oneOrMore,
  optionally,
  repeat,
  startOfString,
  zeroOrMore,
} from '../index';

test('example: validate JavaScript number', () => {
  const optionalSign = optionally(anyOf('+-'));
  const exponent = [anyOf('eE'), optionalSign, oneOrMore(digit)];

  const regex = buildRegExp([
    startOfString,
    optionalSign,
    choiceOf(
      [oneOrMore(digit), optionally(['.', zeroOrMore(digit)])], // leading digit
      ['.', oneOrMore(digit)], // leading dot
    ),
    optionally(exponent), // exponent
    endOfString,
  ]);

  expect(regex).toMatchString('0');
  expect(regex).toMatchString('-1');
  expect(regex).toMatchString('+1');
  expect(regex).toMatchString('1.0');
  expect(regex).toMatchString('1.1234');
  expect(regex).toMatchString('1.');
  expect(regex).toMatchString('.1');
  expect(regex).toMatchString('-.1234');
  expect(regex).toMatchString('+.5');
  expect(regex).toMatchString('1e21');
  expect(regex).toMatchString('1e-21');
  expect(regex).toMatchString('+1e+42');
  expect(regex).toMatchString('-1e-42');

  expect(regex).not.toMatchString('');
  expect(regex).not.toMatchString('a');
  expect(regex).not.toMatchString('1a');
  expect(regex).not.toMatchString('1.0.');
  expect(regex).not.toMatchString('.1.1');
  expect(regex).not.toMatchString('.');

  expect(regex).toHavePattern(/a/);
});

test('example: IPv4 address validator', () => {
  const octet = choiceOf(
    [digit],
    [charRange('1', '9'), digit],
    ['1', repeat(digit, 2)],
    ['2', charRange('0', '4'), digit],
    ['25', charRange('0', '5')],
  );

  const regex = buildRegExp([
    startOfString, //
    repeat([octet, '.'], 3),
    octet,
    endOfString,
  ]);

  expect(regex).toMatchString('0.0.0.0');
  expect(regex).toMatchString('192.168.0.1');
  expect(regex).toMatchString('1.99.100.249');
  expect(regex).toMatchString('255.255.255.255');
  expect(regex).toMatchString('123.45.67.89');

  expect(regex).not.toMatchString('0.0.0.');
  expect(regex).not.toMatchString('0.0.0.0.');
  expect(regex).not.toMatchString('0.-1.0.0');
  expect(regex).not.toMatchString('0.1000.0.0');
  expect(regex).not.toMatchString('0.0.300.0');
  expect(regex).not.toMatchString('255.255.255.256');

  expect(regex).toHavePattern(
    /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/,
  );
});
