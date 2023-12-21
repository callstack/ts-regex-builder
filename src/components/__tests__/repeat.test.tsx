import { expectPattern } from '../../test-utils';
import { digit } from '../character-class';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';

test('"repeat" quantifier', () => {
  expectPattern('a', repeat({ min: 1, max: 5 }, 'b')).toBe('ab{1,5}');
  expectPattern('a', repeat({ min: 1 }, 'b')).toBe('ab{1,}');
  expectPattern('a', repeat({ count: 1 }, 'b')).toBe('ab{1}');

  expectPattern('a', repeat({ count: 1 }, 'a', zeroOrMore('b'))).toBe(
    'a(?:ab*){1}'
  );
  expectPattern(repeat({ count: 5 }, 'text', ' ', oneOrMore('d'))).toBe(
    '(?:text d+){5}'
  );
});

test('"repeat"" optimizes grouping for atoms', () => {
  expectPattern(repeat({ count: 2 }, digit)).toBe('\\d{2}');
  expectPattern(repeat({ min: 2 }, digit)).toBe('\\d{2,}');
  expectPattern(repeat({ min: 1, max: 5 }, digit)).toBe('\\d{1,5}');
});

test('`repeat` throws on no children', () => {
  expect(() => repeat({ count: 1 })).toThrowErrorMatchingInlineSnapshot(
    `"\`repeat\` should receive at least one element"`
  );
});
