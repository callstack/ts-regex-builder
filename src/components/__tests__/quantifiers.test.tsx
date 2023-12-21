import { buildRegex } from '../../builders';
import { expectPattern } from '../../test-utils';
import { digit } from '../character-class';
import { one, oneOrMore, optionally, zeroOrMore } from '../quantifiers';

test('"oneOrMore" quantifier', () => {
  expectPattern(oneOrMore('a')).toBe('a+');
  expectPattern(oneOrMore('ab')).toBe('(?:ab)+');
});

test('"one" quantifier', () => {
  expectPattern(one('a')).toBe('a');
  expectPattern(one('ab')).toBe('ab');
});

test('"optionally" quantifier', () => {
  expectPattern(optionally('a')).toBe('a?');
  expectPattern(optionally('ab')).toBe('(?:ab)?');
});

test('"zeroOrMore" quantifier', () => {
  expectPattern(zeroOrMore('a')).toBe('a*');
  expectPattern(zeroOrMore('ab')).toBe('(?:ab)*');
});

test('oneOrMore does not generate capture when grouping', () => {
  const regex = buildRegex(oneOrMore('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('one does not generate capture when grouping', () => {
  const regex = buildRegex(one('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('optionally does not generate capture when grouping', () => {
  const regex = buildRegex(optionally('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('zeroOrMore does not generate capture when grouping', () => {
  const regex = buildRegex(zeroOrMore('aa'));
  const groups = [...'aa'.match(regex)!];
  expect(groups).toEqual(['aa']);
});

test('base quantifiers optimize grouping for atoms', () => {
  expectPattern(one(digit)).toBe('\\d');
  expectPattern(oneOrMore(digit)).toBe('\\d+');
  expectPattern(optionally(digit)).toBe('\\d?');
  expectPattern(zeroOrMore(digit)).toBe('\\d*');

  expectPattern(oneOrMore('a')).toBe('a+');
  expectPattern(optionally('a')).toBe('a?');
  expectPattern(zeroOrMore('a')).toBe('a*');
});
