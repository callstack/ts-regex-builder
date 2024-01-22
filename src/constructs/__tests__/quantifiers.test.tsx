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
