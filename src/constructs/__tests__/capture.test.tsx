import {
  any,
  anyOf,
  buildRegExp,
  capture,
  digit,
  inverted,
  oneOrMore,
  reference,
  word,
  wordBoundary,
} from '../..';

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
  expect(capture('a', { name: 'xyz' })).toEqualRegex('(?<xyz>a)');
  expect(capture('abc', { name: 'xyz' })).toEqualRegex('(?<xyz>abc)');
  expect(capture(oneOrMore('abc'), { name: 'xyz' })).toEqualRegex('(?<xyz>(?:abc)+)');
  expect(oneOrMore(capture('abc', { name: 'xyz' }))).toEqualRegex('(?<xyz>abc)+');
});

test('named `capture` matching', () => {
  expect(capture('b', { name: 'x1' })).toMatchGroups('ab', ['b', 'b']);
  expect(capture('b', { name: 'x1' })).toMatchNamedGroups('ab', { x1: 'b' });

  expect(['a', capture('b', { name: 'x1' })]).toMatchGroups('ab', ['ab', 'b']);
  expect(['a', capture('b', { name: 'x1' })]).toMatchNamedGroups('ab', { x1: 'b' });

  expect([capture('a'), capture('b', { name: 'x1' }), capture('c', { name: 'x2' })]).toMatchGroups(
    'abc',
    ['abc', 'a', 'b', 'c'],
  );
  expect([
    capture('a'),
    capture('b', { name: 'x1' }),
    capture('c', { name: 'x2' }),
  ]).toMatchNamedGroups('abc', { x1: 'b', x2: 'c' });
});

// Should have `ref0` as name.
const firstRef = reference();

test('`reference` pattern', () => {
  expect([firstRef]).toEqualRegex(/\k<ref0>/);
  expect([reference('xyz')]).toEqualRegex(/\k<xyz>/);
  expect([capture(any, { name: firstRef }), ' ', firstRef]).toEqualRegex('(?<ref0>.) \\k<ref0>');

  const otherRef = reference('r123');
  expect(['xx', capture(any, { name: otherRef }), ' ', otherRef, 'xx']).toEqualRegex(
    'xx(?<r123>.) \\k<r123>xx',
  );
});

test('`reference` matching basic case', () => {
  const someRef = reference();
  expect([capture(word, { name: someRef }), someRef]).toMatchString('aa');
  expect([capture(digit, { name: someRef }), someRef]).toMatchString('11');

  expect([capture(any, { name: someRef }), someRef]).not.toMatchString('ab');

  expect([capture(digit, { name: someRef }), someRef]).not.toMatchString('1a');
  expect([capture(digit, { name: someRef }), someRef]).not.toMatchString('a1');
});

test('`reference` matching HTML attributes', () => {
  const quoteRef = reference('quote');
  const quote = anyOf('"\'');
  const htmlAttributeRegex = buildRegExp([
    wordBoundary,
    capture(oneOrMore(word), { name: 'name' }),
    '=',
    capture(quote, { name: quoteRef }),
    capture(oneOrMore(inverted(quote)), { name: 'value' }),
    quoteRef,
  ]);

  expect(htmlAttributeRegex).toMatchNamedGroups('a="b"', {
    name: 'a',
    quote: '"',
    value: 'b',
  });
  expect(htmlAttributeRegex).toMatchNamedGroups('aa="bbb"', {
    name: 'aa',
    quote: '"',
    value: 'bbb',
  });
  expect(htmlAttributeRegex).toMatchNamedGroups(`aa='bbb'`, {
    name: 'aa',
    quote: `'`,
    value: 'bbb',
  });
  expect(htmlAttributeRegex).toMatchNamedGroups('<input type="number" />', {
    quote: '"',
    name: 'type',
    value: 'number',
  });
  expect(htmlAttributeRegex).toMatchNamedGroups(`<input type='number' />`, {
    quote: "'",
    name: 'type',
    value: 'number',
  });

  expect(htmlAttributeRegex).not.toMatchString(`aa="bbb'`);
  expect(htmlAttributeRegex).not.toMatchString(`aa='bbb"`);
  expect(htmlAttributeRegex).not.toMatchString(`<input type='number" />`);
  expect(htmlAttributeRegex).not.toMatchString(`<input type="number' />`);
});
