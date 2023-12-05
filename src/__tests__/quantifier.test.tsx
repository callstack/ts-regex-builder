import { one, oneOrMore, optionally } from '../quantifiers';
import { buildPattern } from '../compiler';

test('"oneOrMore" quantifier', () => {
  expect(buildPattern(oneOrMore('a'))).toEqual('a+');
  expect(buildPattern(oneOrMore('ab'))).toEqual('(ab)+');
});

test('"one" quantifier', () => {
  expect(buildPattern(one('a'))).toEqual('a');
  expect(buildPattern(one('ab'))).toEqual('ab');
});

test('"optionally" quantifier', () => {
  expect(buildPattern(optionally('a'))).toEqual('a?');
  expect(buildPattern(optionally('ab'))).toEqual('(ab)?');
});
