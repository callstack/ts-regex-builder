import { negativeLookbehind } from '../negative-lookbehind';
import { oneOrMore } from '../quantifiers';

test('`Negative Lookbehind` with single character', () => {
  expect(negativeLookbehind('a')).toEqualRegex(/(?<!a)/);
  expect(negativeLookbehind('b')).toEqualRegex(/(?<!b)/);
  expect(negativeLookbehind('c')).toEqualRegex(/(?<!c)/);
});

test('`Negative Lookbehind` with multiple characters', () => {
  expect(negativeLookbehind('abc')).toEqualRegex(/(?<!abc)/);
  expect(negativeLookbehind('def')).toEqualRegex(/(?<!def)/);
  expect(negativeLookbehind('xyz')).toEqualRegex(/(?<!xyz)/);
});

test('`Negative Lookbehind` with quantifiers', () => {
  expect(negativeLookbehind(oneOrMore('abc'))).toEqualRegex(/(?<!(?:abc)+)/);
  expect(negativeLookbehind(oneOrMore('def'))).toEqualRegex(/(?<!(?:def)+)/);
  expect(negativeLookbehind(oneOrMore('xyz'))).toEqualRegex(/(?<!(?:xyz)+)/);
});

test('`Negative Lookbehind` with special characters', () => {
  expect(negativeLookbehind('-')).toEqualRegex(/(?<!-)/);
  expect(negativeLookbehind('$')).toEqualRegex(/(?<!\$)/);
  expect(negativeLookbehind('@')).toEqualRegex(/(?<!@)/);
});
