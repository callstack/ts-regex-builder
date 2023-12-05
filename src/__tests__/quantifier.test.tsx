import { one, oneOrMore, optionally, zeroOrMore } from '../quantifiers';
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

test('"zeroOrMore" quantifier', () => {
  expect(buildPattern(zeroOrMore('a'))).toEqual('a*');
  expect(buildPattern(zeroOrMore('ab'))).toEqual('(ab)*');
});
