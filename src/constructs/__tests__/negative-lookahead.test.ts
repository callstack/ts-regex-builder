import { negativeLookahead } from '../negative-lookahead';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { anyOf, digit } from '../character-class';
import { capture } from '../capture';

test('`Negative Lookahead` base cases', () => {
  expect(negativeLookahead('a')).toEqualRegex(/(?!a)/);
  expect(negativeLookahead('abc')).toEqualRegex(/(?!abc)/);
  expect(negativeLookahead(oneOrMore('abc'))).toEqualRegex(/(?!(?:abc)+)/);
  expect(oneOrMore(negativeLookahead('abc'))).toEqualRegex(/(?!abc)+/);
});

test('`Negative Lookahead` use cases', () => {
  expect([negativeLookahead('$'), oneOrMore(digit)]).toMatchString('1 turkey costs 30$');
  expect([negativeLookahead('a'), 'b']).toMatchString('abba');
  expect(['a', negativeLookahead(capture('bba'))]).not.toMatchGroups('abba', ['a', 'bba']);
  expect([negativeLookahead('-'), anyOf('+-'), zeroOrMore(digit)]).not.toMatchString('-123');
  expect([negativeLookahead('-'), anyOf('+-'), zeroOrMore(digit)]).toMatchString('+123');
});

test('`Negative Lookahead` with multiple elements', () => {
  expect(negativeLookahead(['abc', 'def'])).toEqualRegex(/(?!abcdef)/);
  expect(negativeLookahead([oneOrMore('abc'), 'def'])).toEqualRegex(/(?!(?:abc)+def)/);
  expect(negativeLookahead(['abc', oneOrMore('def')])).toEqualRegex(/(?!abc(?:def)+)/);
});

test('`Negative Lookahead` with special characters', () => {
  expect(negativeLookahead(['$', '+'])).toEqualRegex(/(?!\$\+)/);
  expect(negativeLookahead(['[', ']'])).toEqualRegex(/(?!\[\])/);
  expect(negativeLookahead(['\\', '\\'])).toEqualRegex(/(?!\\\\)/);
});

test('`Negative Lookahead` with quantifiers', () => {
  expect(negativeLookahead(zeroOrMore('abc'))).toEqualRegex(/(?!(?:abc)*)/);
  expect(negativeLookahead(oneOrMore('abc'))).toEqualRegex(/(?!(?:abc)+)/);
  expect(negativeLookahead(['abc', zeroOrMore('def')])).toEqualRegex(/(?!abc(?:def)*)/);
});
