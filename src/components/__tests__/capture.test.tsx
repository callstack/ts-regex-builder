import { capture } from '../capture';
import { oneOrMore } from '../quantifiers';
import { execRegex } from '../../test-utils';

test('`capture` base cases', () => {
  expect(capture('a')).toHavePattern('(a)');
  expect(capture('abc')).toHavePattern('(abc)');
  expect(capture(oneOrMore('abc'))).toHavePattern('((?:abc)+)');
  expect(oneOrMore(capture('abc'))).toHavePattern('(abc)+');
});

test('`capture` captures group', () => {
  expect(execRegex('ab', [capture('b')])).toEqual(['b', 'b']);
  expect(execRegex('ab', ['a', capture('b')])).toEqual(['ab', 'b']);
  expect(execRegex('abc', ['a', capture('b'), capture('c')])).toEqual([
    'abc',
    'b',
    'c',
  ]);
});
