import { digit } from '../character-class';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';

test('`repeat` quantifier', () => {
  expect(['a', repeat('b', { min: 1, max: 5 })]).toHavePattern(/ab{1,5}/);
  expect(['a', repeat('b', { min: 1 })]).toHavePattern(/ab{1,}/);
  expect(['a', repeat('b', { count: 1 })]).toHavePattern(/ab{1}/);

  expect(['a', repeat(['a', zeroOrMore('b')], { count: 1 })]).toHavePattern(/a(?:ab*){1}/);
  expect(repeat(['text', ' ', oneOrMore('d')], { count: 5 })).toHavePattern(/(?:text d+){5}/);
});

test('`repeat` optimizes grouping for atoms', () => {
  expect(repeat(digit, { count: 2 })).toHavePattern(/\d{2}/);
  expect(repeat(digit, { min: 2 })).toHavePattern(/\d{2,}/);
  expect(repeat(digit, { min: 1, max: 5 })).toHavePattern(/\d{1,5}/);
});

test('`repeat` throws on no children', () => {
  expect(() => repeat([], { count: 1 })).toThrowErrorMatchingInlineSnapshot(
    `"\`repeat\` should receive at least one element"`
  );
});
