import { capture } from '../capture';
import { oneOrMore } from '../quantifiers';

test('`capture` base cases', () => {
  expect(capture('a')).toHavePattern('(a)');
  expect(capture('abc')).toHavePattern('(abc)');
  expect(capture(oneOrMore('abc'))).toHavePattern('((?:abc)+)');
  expect(oneOrMore(capture('abc'))).toHavePattern('(abc)+');
});

test('`capture` captures group', () => {
  expect(capture('b')).toMatchGroups('ab', ['b', 'b']);
  expect(['a', capture('b')]).toMatchGroups('ab', ['ab', 'b']);
  expect(['a', capture('b'), capture('c')]).toMatchGroups('abc', [
    'abc',
    'b',
    'c',
  ]);
});
