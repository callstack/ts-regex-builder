import {
  any,
  anyOf,
  buildRegExp,
  capture,
  digit,
  negated,
  oneOrMore,
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

test('`ref` function', () => {
  const someCapture = capture(any, { name: 'ref0' });
  expect([someCapture, ' ', someCapture.ref()]).toEqualRegex('(?<ref0>.) \\k<ref0>');

  const otherCapture = capture(any, { name: 'r123' });
  expect(['xx', otherCapture, ' ', otherCapture.ref(), 'xx']).toEqualRegex(
    'xx(?<r123>.) \\k<r123>xx',
  );
});

test('`reference` matching basic case', () => {
  const wordCapture = capture(word, { name: 'word' });
  expect([wordCapture, wordCapture.ref()]).toMatchString('aa');

  const digitCapture = capture(digit, { name: 'digit' });
  expect([digitCapture, digitCapture.ref()]).toMatchString('11');

  const anyCapture = capture(any, { name: 'any' });
  expect([anyCapture, anyCapture.ref()]).not.toMatchString('ab');

  expect([digitCapture, digitCapture.ref()]).not.toMatchString('1a');
  expect([digitCapture, digitCapture.ref()]).not.toMatchString('a1');
});

test('`reference` matching HTML attributes', () => {
  const quote = anyOf('"\'');
  const quoteCapture = capture(quote, { name: 'quote' });

  const htmlAttributeRegex = buildRegExp([
    wordBoundary,
    capture(oneOrMore(word), { name: 'name' }),
    '=',
    quoteCapture,
    capture(oneOrMore(negated(quote)), { name: 'value' }),
    quoteCapture.ref(),
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
