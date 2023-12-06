import { buildPattern, buildRegex } from '../compiler';
import { oneOrMore, optionally, one, zeroOrMore } from '../quantifiers';

test('basic quantifies', () => {
  expect(buildPattern('a')).toEqual('a');
  expect(buildPattern('a', 'b')).toEqual('ab');

  expect(buildPattern(oneOrMore('a'))).toEqual('a+');
  expect(buildPattern(optionally('a'))).toEqual('a?');

  expect(buildPattern('a', oneOrMore('b'))).toEqual('ab+');
  expect(buildPattern('a', oneOrMore('bc'))).toEqual('a(bc)+');
  expect(buildPattern('a', oneOrMore('bc'))).toEqual('a(bc)+');

  expect(buildPattern('a', zeroOrMore('b'))).toEqual('ab*');
  expect(buildPattern('a', zeroOrMore('bc'))).toEqual('a(bc)*');
  expect(buildPattern('a', zeroOrMore('bc'))).toEqual('a(bc)*');

  expect(buildPattern(optionally('a'), 'b')).toEqual('a?b');

  expect(buildPattern(optionally('a'), 'b', one('d'))).toEqual('a?bd');
});

test('regex constructor', () => {
  expect(buildRegex('a').test('a')).toBeTruthy();
  expect(buildRegex('a').test('b')).toBeFalsy();
});
