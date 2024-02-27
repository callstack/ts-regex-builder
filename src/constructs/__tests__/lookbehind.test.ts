import { anyOf, digit, whitespace, word } from '../character-class';
import { lookbehind } from '../lookbehind';
import { oneOrMore, zeroOrMore } from '../quantifiers';

test('` lookbehind` base cases', () => {
  expect(lookbehind('a')).toEqualRegex(/(?<=a)/);
  expect(lookbehind('abc')).toEqualRegex(/(?<=abc)/);
  expect(lookbehind(oneOrMore('abc'))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(lookbehind('abc')).toEqualRegex(/(?<=abc)/);
});

test('`Positve lookbehind` use cases', () => {
  expect([zeroOrMore(whitespace), word, lookbehind('s'), oneOrMore(whitespace)]).toMatchString(
    'too many cats to feed.',
  );

  expect([lookbehind('USD'), zeroOrMore(whitespace), oneOrMore(digit)]).toMatchString(
    'The price is USD 30',
  );

  expect([lookbehind('USD'), zeroOrMore(whitespace), oneOrMore(digit)]).not.toMatchString(
    'The price is CDN 30',
  );

  expect([lookbehind('a'), 'b']).toMatchString('abba');

  const mjsImport = [lookbehind('.mjs')];
  expect(mjsImport).toMatchString("import {Person} from './person.mjs';");
  expect(mjsImport).not.toMatchString("import {Person} from './person.js';");
  expect([anyOf('+-'), oneOrMore(digit), lookbehind('-')]).not.toMatchString('+123');
});

test('` lookbehind` with multiple elements', () => {
  expect(lookbehind(['abc', 'def'])).toEqualRegex(/(?<=abcdef)/);
  expect(lookbehind([oneOrMore('abc'), 'def'])).toEqualRegex(/(?<=(?:abc)+def)/);
  expect(lookbehind(['abc', oneOrMore('def')])).toEqualRegex(/(?<=abc(?:def)+)/);
});

test('` lookbehind` with special characters', () => {
  expect(lookbehind(['$', '+'])).toEqualRegex(/(?<=\$\+)/);
  expect(lookbehind(['[', ']'])).toEqualRegex(/(?<=\[\])/);
  expect(lookbehind(['\\', '\\'])).toEqualRegex(/(?<=\\\\)/);
});

test('` lookbehind` with quantifiers', () => {
  expect(lookbehind(zeroOrMore('abc'))).toEqualRegex(/(?<=(?:abc)*)/);
  expect(lookbehind(oneOrMore('abc'))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(lookbehind(['abc', zeroOrMore('def')])).toEqualRegex(/(?<=abc(?:def)*)/);
});

test('` lookbehind` with character classes', () => {
  expect(lookbehind(word)).toEqualRegex(/(?<=\w)/);
  expect(lookbehind(whitespace)).toEqualRegex(/(?<=\s)/);
  expect(lookbehind(digit)).toEqualRegex(/(?<=\d)/);
  expect(lookbehind(anyOf('abc'))).toEqualRegex(/(?<=[abc])/);
});
