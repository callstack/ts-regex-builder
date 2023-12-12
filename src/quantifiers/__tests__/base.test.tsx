import { one, oneOrMore, optionally, zeroOrMore } from '../base';
import { buildPattern, buildRegex } from '../../compiler';

test('"oneOrMore" quantifier', () => {
  expect(buildPattern(oneOrMore('a'))).toEqual('a+');
  expect(buildPattern(oneOrMore('ab'))).toEqual('(?:ab)+');
});

test('"one" quantifier', () => {
  expect(buildPattern(one('a'))).toEqual('a');
  expect(buildPattern(one('ab'))).toEqual('ab');
});

test('"optionally" quantifier', () => {
  expect(buildPattern(optionally('a'))).toEqual('a?');
  expect(buildPattern(optionally('ab'))).toEqual('(?:ab)?');
});

test('"zeroOrMore" quantifier', () => {
  expect(buildPattern(zeroOrMore('a'))).toEqual('a*');
  expect(buildPattern(zeroOrMore('ab'))).toEqual('(?:ab)*');
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
