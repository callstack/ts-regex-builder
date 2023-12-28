import { digit } from '../character-class';
import { oneOrMore, optionally, zeroOrMore } from '../quantifiers';

test('`oneOrMore` quantifier', () => {
  expect(oneOrMore('a')).toHavePattern(/a+/);
  expect(oneOrMore('ab')).toHavePattern(/(?:ab)+/);
});

test('`optionally` quantifier', () => {
  expect(optionally('a')).toHavePattern(/a?/);
  expect(optionally('ab')).toHavePattern(/(?:ab)?/);
});

test('`zeroOrMore` quantifier', () => {
  expect(zeroOrMore('a')).toHavePattern(/a*/);
  expect(zeroOrMore('ab')).toHavePattern(/(?:ab)*/);
});

test('`oneOrMore` does not generate capture when grouping', () => {
  expect(oneOrMore('aa')).toMatchGroups('aa', ['aa']);
});

test('`optionally` does not generate capture when grouping', () => {
  expect(optionally('aa')).toMatchGroups('aa', ['aa']);
});

test('`zeroOrMore` does not generate capture when grouping', () => {
  expect(zeroOrMore('aa')).toMatchGroups('aa', ['aa']);
});

test('base quantifiers optimize grouping for atoms', () => {
  expect(oneOrMore(digit)).toHavePattern(/\d+/);
  expect(optionally(digit)).toHavePattern(/\d?/);
  expect(zeroOrMore(digit)).toHavePattern(/\d*/);

  expect(oneOrMore('a')).toHavePattern(/a+/);
  expect(optionally('a')).toHavePattern(/a?/);
  expect(zeroOrMore('a')).toHavePattern(/a*/);
});
