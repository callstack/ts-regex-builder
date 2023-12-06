import { buildPattern } from '../compiler';
import { repeat, zeroOrMore, oneOrMore } from '../quantifiers';

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
