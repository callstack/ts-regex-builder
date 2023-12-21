import { capture } from '../capture';
import { oneOrMore } from '../quantifiers';
import { execRegex, expectPattern } from '../../test-utils';

test('"capture" base cases', () => {
  expectPattern(capture('a')).toBe('(a)');
  expectPattern(capture('abc')).toBe('(abc)');
  expectPattern(capture(oneOrMore('abc'))).toBe('((?:abc)+)');
  expectPattern(oneOrMore(capture('abc'))).toBe('(abc)+');
});

test('"capture" captures group', () => {
  expect(execRegex('ab', [capture('b')])).toEqual(['b', 'b']);
  expect(execRegex('ab', ['a', capture('b')])).toEqual(['ab', 'b']);
  expect(execRegex('abc', ['a', capture('b'), capture('c')])).toEqual([
    'abc',
    'b',
    'c',
  ]);
});
