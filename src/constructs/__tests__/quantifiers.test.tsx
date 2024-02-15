import { buildRegExp } from '../../builders';
import { any, digit } from '../character-class';
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
  expect(oneOrMore('a', { greedy: true })).toEqualRegex(/a+/);
  expect(oneOrMore('ab', { greedy: true })).toEqualRegex(/(?:ab)+/);

  expect(optional('a', { greedy: true })).toEqualRegex(/a?/);
  expect(optional('ab', { greedy: true })).toEqualRegex(/(?:ab)?/);

  expect(zeroOrMore('a', { greedy: true })).toEqualRegex(/a*/);
  expect(zeroOrMore('ab', { greedy: true })).toEqualRegex(/(?:ab)*/);
});

test('non-greedy quantifiers', () => {
  expect(oneOrMore('a', { greedy: false })).toEqualRegex(/a+?/);
  expect(oneOrMore('ab', { greedy: false })).toEqualRegex(/(?:ab)+?/);

  expect(optional('a', { greedy: false })).toEqualRegex(/a??/);
  expect(optional('ab', { greedy: false })).toEqualRegex(/(?:ab)??/);

  expect(zeroOrMore('a', { greedy: false })).toEqualRegex(/a*?/);
  expect(zeroOrMore('ab', { greedy: false })).toEqualRegex(/(?:ab)*?/);
});

test('showcase: greedy vs non-greedy quantifiers', () => {
  const html = '<div>Hello <em>World!</em></div>';

  const greedyTag = buildRegExp(['<', oneOrMore(any), '>'], { global: true });
  expect(greedyTag).toMatchGroups(html, ['<div>Hello <em>World!</em></div>']);

  const nonGreedyTag = buildRegExp(['<', oneOrMore(any, { greedy: false }), '>'], { global: true });
  expect(nonGreedyTag).toMatchGroups(html, ['<div>', '<em>', '</em>', '</div>']);
});
