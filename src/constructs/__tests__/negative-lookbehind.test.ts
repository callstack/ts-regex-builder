import { negativeLookbehind } from '../negative-lookbehind';
import { oneOrMore } from '../quantifiers';

test('`negativeLookbehind` pattern', () => {
  expect(negativeLookbehind('a')).toEqualRegex(/(?<!a)/);
  expect(negativeLookbehind('b')).toEqualRegex(/(?<!b)/);
  expect(negativeLookbehind('c')).toEqualRegex(/(?<!c)/);
});

test('`negativeLookbehind` matching with multiple characters', () => {
  expect(negativeLookbehind('abc')).toEqualRegex(/(?<!abc)/);
  expect(negativeLookbehind('def')).toEqualRegex(/(?<!def)/);
  expect(negativeLookbehind('xyz')).toEqualRegex(/(?<!xyz)/);
});

test('`negativeLookbehind` matching with quantifiers', () => {
  expect(negativeLookbehind(oneOrMore('abc'))).toEqualRegex(/(?<!(?:abc)+)/);
  expect(negativeLookbehind(oneOrMore('def'))).toEqualRegex(/(?<!(?:def)+)/);
  expect(negativeLookbehind(oneOrMore('xyz'))).toEqualRegex(/(?<!(?:xyz)+)/);
});

test('`negativeLookbehind` matching with special characters', () => {
  expect(negativeLookbehind('-')).toEqualRegex(/(?<!-)/);
  expect(negativeLookbehind('$')).toEqualRegex(/(?<!\$)/);
  expect(negativeLookbehind('@')).toEqualRegex(/(?<!@)/);
});
