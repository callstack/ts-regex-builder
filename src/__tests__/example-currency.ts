import { buildRegExp } from '../builders';
import { anyOf, digit, endOfString, optional, repeat, whitespace, zeroOrMore } from '../index';
import { lookbehind } from '../constructs/lookbehind';

const currencySymbol = '$€£¥R₿';
const decimalSeparator = '.';
const firstThousandsClause = repeat(digit, { min: 1, max: 3 });
const thousandsSeparator = ',';
const thousands = repeat(digit, 3);
const thousandsClause = [optional(thousandsSeparator), thousands];
const cents = repeat(digit, 2);
const isCurrency = lookbehind(anyOf(currencySymbol));

test('example: extracting currency values', () => {
  const currencyRegex = buildRegExp([
    isCurrency,
    optional(whitespace),
    firstThousandsClause,
    zeroOrMore(thousandsClause),
    optional([decimalSeparator, cents]),
    endOfString,
  ]);

  expect(currencyRegex).toMatchString('$10');
  expect(currencyRegex).toMatchString('$ 10');
  expect(currencyRegex).not.toMatchString('$ 10.');
  expect(currencyRegex).toMatchString('$ 10');
  expect(currencyRegex).not.toMatchString('$10.5');
  expect(currencyRegex).toMatchString('$10.50');
  expect(currencyRegex).not.toMatchString('$10.501');
  expect(currencyRegex).toMatchString('€100');
  expect(currencyRegex).toMatchString('£1,000');
  expect(currencyRegex).toMatchString('$ 100000000000000000');
  expect(currencyRegex).toMatchString('€ 10000');
  expect(currencyRegex).toMatchString('₿ 100,000');
  expect(currencyRegex).not.toMatchString('10$');
  expect(currencyRegex).not.toMatchString('£A000');
});
