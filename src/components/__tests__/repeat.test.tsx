import { digit } from '../character-class';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';

test('`repeat` quantifier', () => {
  expect(['a', repeat({ min: 1, max: 5 }, 'b')]).toHavePattern('ab{1,5}');
  expect(['a', repeat({ min: 1 }, 'b')]).toHavePattern('ab{1,}');
  expect(['a', repeat({ count: 1 }, 'b')]).toHavePattern('ab{1}');

  expect(['a', repeat({ count: 1 }, ['a', zeroOrMore('b')])]).toHavePattern('a(?:ab*){1}');
  expect(repeat({ count: 5 }, ['text', ' ', oneOrMore('d')])).toHavePattern('(?:text d+){5}');
});

test('`repeat` optimizes grouping for atoms', () => {
  expect(repeat({ count: 2 }, digit)).toHavePattern('\\d{2}');
  expect(repeat({ min: 2 }, digit)).toHavePattern('\\d{2,}');
  expect(repeat({ min: 1, max: 5 }, digit)).toHavePattern('\\d{1,5}');
});

test('`repeat` throws on no children', () => {
  expect(() => repeat({ count: 1 }, [])).toThrowErrorMatchingInlineSnapshot(
    `"\`repeat\` should receive at least one element"`
  );
});
