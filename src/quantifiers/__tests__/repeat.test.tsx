import { buildPattern } from '../..';
import { digit } from '../../character-classes/base';
import { zeroOrMore, oneOrMore } from '../base';
import { repeat } from '../repeat';

test('"repeat" quantifier', () => {
  expect(buildPattern('a', repeat({ min: 1, max: 5 }, 'b'))).toEqual('ab{1,5}');
  expect(buildPattern('a', repeat({ min: 1 }, 'b'))).toEqual('ab{1,}');
  expect(buildPattern('a', repeat({ count: 1 }, 'b'))).toEqual('ab{1}');

  expect(buildPattern('a', repeat({ count: 1 }, 'a', zeroOrMore('b')))).toEqual(
    'a(?:ab*){1}'
  );
  expect(
    buildPattern(repeat({ count: 5 }, 'text', ' ', oneOrMore('d')))
  ).toEqual('(?:text d+){5}');
});

test('"repeat"" optimizes grouping for atoms', () => {
  expect(buildPattern(repeat({ count: 2 }, digit))).toBe('\\d{2}');
  expect(buildPattern(repeat({ min: 2 }, digit))).toBe('\\d{2,}');
  expect(buildPattern(repeat({ min: 1, max: 5 }, digit))).toBe('\\d{1,5}');
});

test('`repeat` throws on no children', () => {
  expect(() => repeat({ count: 1 })).toThrowErrorMatchingInlineSnapshot(
    `"\`repeat\` should receive at least one element"`
  );
});
