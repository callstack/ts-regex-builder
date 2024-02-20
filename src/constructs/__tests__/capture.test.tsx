import { capture, oneOrMore } from '../..';

test('`capture` pattern', () => {
  expect(capture('a')).toEqualRegex(/(a)/);
  expect(capture('abc')).toEqualRegex(/(abc)/);
  expect(capture(oneOrMore('abc'))).toEqualRegex(/((?:abc)+)/);
  expect(oneOrMore(capture('abc'))).toEqualRegex(/(abc)+/);
});

test('`capture` matching', () => {
  expect(capture('b')).toMatchGroups('ab', ['b', 'b']);
  expect(['a', capture('b')]).toMatchGroups('ab', ['ab', 'b']);
  expect(['a', capture('b'), capture('c')]).toMatchGroups('abc', ['abc', 'b', 'c']);
});

test('named `capture` pattern', () => {
  // Note: using regex literal causes them lose the capture name for unknown reason.
  expect(capture('a', { name: 'x' })).toEqualRegex(new RegExp('(?<x>a)'));
  expect(capture('abc', { name: 'xyz' })).toEqualRegex(new RegExp('(?<xyz>abc)'));
  expect(oneOrMore(capture('abc', { name: 'A' }))).toEqualRegex(new RegExp('(?<A>abc)+'));
  expect([capture('aaa', { name: 'A' }), capture('bbb', { name: 'BB' })]).toEqualRegex(
    new RegExp('(?<A>aaa)(?<BB>bbb)'),
  );
});

test('named `capture` matching', () => {
  expect(capture('b', { name: 'g1' })).toMatchGroups('ab', ['b', 'b']);
  expect(capture('b', { name: 'g1' })).toMatchNamedGroups('ab', { g1: 'b' });

  expect(['a', capture('b', { name: 'g2' })]).toMatchGroups('ab', ['ab', 'b']);
  expect(['a', capture('b', { name: 'g2' })]).toMatchNamedGroups('ab', { g2: 'b' });

  expect(['a', capture('b', { name: 'g3' }), capture('c', { name: 'g4' })]).toMatchGroups('abc', [
    'abc',
    'b',
    'c',
  ]);
  expect(['a', capture('b', { name: 'g3' }), capture('c', { name: 'g4' })]).toMatchNamedGroups(
    'abc',
    { g3: 'b', g4: 'c' },
  );

  expect(['a', capture('b'), capture('c', { name: 'g4' })]).toMatchNamedGroups('abc', { g4: 'c' });
});
