import { digit } from '../character-class';
import { oneOrMore, optional, zeroOrMore } from '../quantifiers';

test('`oneOrMore` quantifier', () => {
  expect(oneOrMore('a')).toEqualRegex(/a+/);
  expect(oneOrMore('ab')).toEqualRegex(/(?:ab)+/);
});

test('`optional` quantifier', () => {
  expect(optional('a')).toEqualRegex(/a?/);
  expect(optional('ab')).toEqualRegex(/(?:ab)?/);
});

test('`zeroOrMore` quantifier', () => {
  expect(zeroOrMore('a')).toEqualRegex(/a*/);
  expect(zeroOrMore('ab')).toEqualRegex(/(?:ab)*/);
});

test('`oneOrMore` does not generate capture when grouping', () => {
  expect(oneOrMore('aa')).toMatchGroups('aa', ['aa']);
});

test('`optional` does not generate capture when grouping', () => {
  expect(optional('aa')).toMatchGroups('aa', ['aa']);
});

test('`zeroOrMore` does not generate capture when grouping', () => {
  expect(zeroOrMore('aa')).toMatchGroups('aa', ['aa']);
});

test('base quantifiers optimize grouping for atoms', () => {
  expect(oneOrMore(digit)).toEqualRegex(/\d+/);
  expect(optional(digit)).toEqualRegex(/\d?/);
  expect(zeroOrMore(digit)).toEqualRegex(/\d*/);

  expect(oneOrMore('a')).toEqualRegex(/a+/);
  expect(optional('a')).toEqualRegex(/a?/);
  expect(zeroOrMore('a')).toEqualRegex(/a*/);
});

test('greedy quantifiers', () => {
  expect(oneOrMore('a', 'greedy')).toEqualRegex(/a+/);
  expect(oneOrMore('ab', 'greedy')).toEqualRegex(/(?:ab)+/);

  expect(optional('a', 'greedy')).toEqualRegex(/a?/);
  expect(optional('ab', 'greedy')).toEqualRegex(/(?:ab)?/);

  expect(zeroOrMore('a', { behavior: 'lazy' })).toEqualRegex(/a*/);
  expect(zeroOrMore('ab', { behavior: 'lazy' })).toEqualRegex(/(?:ab)*/);
});

test('lazy quantifiers', () => {
  expect(oneOrMore('a', 'lazy')).toEqualRegex(/a+?/);
  expect(oneOrMore('ab', 'lazy')).toEqualRegex(/(?:ab)+?/);

  expect(optional('a', 'lazy')).toEqualRegex(/a??/);
  expect(optional('ab', 'lazy')).toEqualRegex(/(?:ab)??/);

  expect(zeroOrMore('a', { behavior: 'lazy' })).toEqualRegex(/a*?/);
  expect(zeroOrMore('ab', { behavior: 'lazy' })).toEqualRegex(/(?:ab)*?/);
});
