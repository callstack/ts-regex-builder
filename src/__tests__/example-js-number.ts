import {
  anyOf,
  buildRegExp,
  choiceOf,
  digit,
  endOfString,
  oneOrMore,
  optional,
  startOfString,
  zeroOrMore,
} from '..';

test('example: validate JavaScript number', () => {
  const sign = anyOf('+-');
  const exponent = [anyOf('eE'), optional(sign), oneOrMore(digit)];

  const regex = buildRegExp([
    startOfString,
    optional(sign),
    choiceOf(
      [oneOrMore(digit), optional(['.', zeroOrMore(digit)])], // leading digit
      ['.', oneOrMore(digit)], // leading dot
    ),
    optional(exponent), // exponent
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

  expect(regex).toEqualRegex(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/);
});
