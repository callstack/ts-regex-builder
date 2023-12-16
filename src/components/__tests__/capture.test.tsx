import { buildPattern } from '../..';
import { capture } from '../capture';
import { oneOrMore } from '../quantifiers';
import { execRegex } from '../../test-utils';

test('"capture" base cases', () => {
  expect(buildPattern(capture('a'))).toBe('(a)');
  expect(buildPattern(capture('abc'))).toBe('(abc)');
  expect(buildPattern(capture(oneOrMore('abc')))).toBe('((?:abc)+)');
  expect(buildPattern(oneOrMore(capture('abc')))).toBe('(abc)+');
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
