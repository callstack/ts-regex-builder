import {
  anyOf,
  buildRegExp,
  choiceOf,
  digit,
  endOfString,
  oneOrMore,
  optional,
  regex,
  startOfString,
  zeroOrMore,
} from '..';

test('example: validate JavaScript number', () => {
  const sign = anyOf('+-');
  const exponent = regex([anyOf('eE'), optional(sign), oneOrMore(digit)]);

  const numberValidator = buildRegExp([
    startOfString,
    optional(sign),
    choiceOf(
      [oneOrMore(digit), optional(['.', zeroOrMore(digit)])], // leading digit
      ['.', oneOrMore(digit)], // leading dot
    ),
    optional(exponent), // exponent
    endOfString,
  ]);

  expect(numberValidator).toMatchString('0');
  expect(numberValidator).toMatchString('-1');
  expect(numberValidator).toMatchString('+1');
  expect(numberValidator).toMatchString('1.0');
  expect(numberValidator).toMatchString('1.1234');
  expect(numberValidator).toMatchString('1.');
  expect(numberValidator).toMatchString('.1');
  expect(numberValidator).toMatchString('-.1234');
  expect(numberValidator).toMatchString('+.5');
  expect(numberValidator).toMatchString('1e21');
  expect(numberValidator).toMatchString('1e-21');
  expect(numberValidator).toMatchString('+1e+42');
  expect(numberValidator).toMatchString('-1e-42');

  expect(numberValidator).not.toMatchString('');
  expect(numberValidator).not.toMatchString('a');
  expect(numberValidator).not.toMatchString('1a');
  expect(numberValidator).not.toMatchString('1.0.');
  expect(numberValidator).not.toMatchString('.1.1');
  expect(numberValidator).not.toMatchString('.');

  expect(numberValidator).toEqualRegex(/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/);
});
