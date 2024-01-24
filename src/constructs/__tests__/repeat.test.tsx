import { digit } from '../character-class';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';

test('`repeat` quantifier', () => {
  expect(['a', repeat('b', { min: 1, max: 5 })]).toEqualRegex(/ab{1,5}/);
  expect(['a', repeat('b', { min: 1 })]).toEqualRegex(/ab{1,}/);
  expect(['a', repeat('b', 1)]).toEqualRegex(/ab{1}/);

  expect(['a', repeat(['a', zeroOrMore('b')], 1)]).toEqualRegex(/a(?:ab*){1}/);
  expect(repeat(['text', ' ', oneOrMore('d')], 5)).toEqualRegex(/(?:text d+){5}/);
});

test('`repeat` optimizes grouping for atoms', () => {
  expect(repeat(digit, 2)).toEqualRegex(/\d{2}/);
  expect(repeat(digit, { min: 2 })).toEqualRegex(/\d{2,}/);
  expect(repeat(digit, { min: 1, max: 5 })).toEqualRegex(/\d{1,5}/);
});

test('`repeat` throws on no children', () => {
  expect(() => repeat([], 1)).toThrowErrorMatchingInlineSnapshot(
    `"\`repeat\` should receive at least one element"`,
  );
});

test('greedy `repeat` quantifier', () => {
  expect(repeat('a', 2, 'greedy')).toEqualRegex(/a{2}/);
  expect(repeat('a', { min: 1 }, 'greedy')).toEqualRegex(/a{1,}/);
  expect(repeat('a', { min: 1, max: 5 }, 'greedy')).toEqualRegex(/a{1,5}/);
});

test('lazy `repeat` quantifier', () => {
  expect(repeat('a', 2, 'lazy')).toEqualRegex(/a{2}?/);
  expect(repeat('a', { min: 1 }, 'lazy')).toEqualRegex(/a{1,}?/);
  expect(repeat('a', { min: 1, max: 5 }, 'lazy')).toEqualRegex(/a{1,5}?/);
});
