import { positiveLookbehind } from '../positive-lookbehind';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { anyOf, digit, whitespace, word } from '../character-class';

test('`Positive Lookbehind` base cases', () => {
  expect(positiveLookbehind('a')).toEqualRegex(/(?<=a)/);
  expect(positiveLookbehind('abc')).toEqualRegex(/(?<=abc)/);
  expect(positiveLookbehind(oneOrMore('abc'))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(positiveLookbehind('abc')).toEqualRegex(/(?<=abc)/);
});

test('`Positve Lookbehind` use cases', () => {
  expect([
    zeroOrMore(whitespace),
    word,
    positiveLookbehind('s'),
    oneOrMore(whitespace),
  ]).toMatchString('too many cats to feed.');

  expect([positiveLookbehind('USD'), zeroOrMore(whitespace), oneOrMore(digit)]).toMatchString(
    'The price is USD 30',
  );

  expect([positiveLookbehind('USD'), zeroOrMore(whitespace), oneOrMore(digit)]).not.toMatchString(
    'The price is CDN 30',
  );

  expect([positiveLookbehind('a'), 'b']).toMatchString('abba');

  const mjsImport = [positiveLookbehind('.mjs')];
  expect(mjsImport).toMatchString("import {Person} from './person.mjs';");
  expect(mjsImport).not.toMatchString("import {Person} from './person.js';");
  expect([anyOf('+-'), oneOrMore(digit), positiveLookbehind('-')]).not.toMatchString('+123');
});

test('`Positive Lookbehind` with multiple elements', () => {
  expect(positiveLookbehind(['abc', 'def'])).toEqualRegex(/(?<=abcdef)/);
  expect(positiveLookbehind([oneOrMore('abc'), 'def'])).toEqualRegex(/(?<=(?:abc)+def)/);
  expect(positiveLookbehind(['abc', oneOrMore('def')])).toEqualRegex(/(?<=abc(?:def)+)/);
});

test('`Positive Lookbehind` with special characters', () => {
  expect(positiveLookbehind(['$', '+'])).toEqualRegex(/(?<=\$\+)/);
  expect(positiveLookbehind(['[', ']'])).toEqualRegex(/(?<=\[\])/);
  expect(positiveLookbehind(['\\', '\\'])).toEqualRegex(/(?<=\\\\)/);
});

test('`Positive Lookbehind` with quantifiers', () => {
  expect(positiveLookbehind(zeroOrMore('abc'))).toEqualRegex(/(?<=(?:abc)*)/);
  expect(positiveLookbehind(oneOrMore('abc'))).toEqualRegex(/(?<=(?:abc)+)/);
  expect(positiveLookbehind(['abc', zeroOrMore('def')])).toEqualRegex(/(?<=abc(?:def)*)/);
});

test('`Positive Lookbehind` with character classes', () => {
  expect(positiveLookbehind(word)).toEqualRegex(/(?<=\w)/);
  expect(positiveLookbehind(whitespace)).toEqualRegex(/(?<=\s)/);
  expect(positiveLookbehind(digit)).toEqualRegex(/(?<=\d)/);
  expect(positiveLookbehind(anyOf('abc'))).toEqualRegex(/(?<=[abc])/);
});
