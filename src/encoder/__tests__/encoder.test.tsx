import { buildPattern, buildRegExp } from '../../builders';
import { oneOrMore, optional, zeroOrMore } from '../../constructs/quantifiers';
import { repeat } from '../../constructs/repeat';

test('basic quantifies', () => {
  expect('a').toEqualRegex(/a/);
  expect(['a', 'b']).toEqualRegex(/ab/);

  expect(oneOrMore('a')).toEqualRegex(/a+/);
  expect(optional('a')).toEqualRegex(/a?/);

  expect(['a', oneOrMore('b')]).toEqualRegex(/ab+/);
  expect(['a', oneOrMore('bc')]).toEqualRegex(/a(?:bc)+/);
  expect(['a', oneOrMore('bc')]).toEqualRegex(/a(?:bc)+/);

  expect(['a', repeat('b', { min: 1, max: 5 })]).toEqualRegex(/ab{1,5}/);

  expect(['a', zeroOrMore('b')]).toEqualRegex(/ab*/);
  expect(['a', zeroOrMore('bc')]).toEqualRegex(/a(?:bc)*/);
  expect(['a', zeroOrMore('bc')]).toEqualRegex(/a(?:bc)*/);

  expect([optional('a'), 'b']).toEqualRegex(/a?b/);

  expect([optional('a'), 'b', oneOrMore('d')]).toEqualRegex(/a?bd+/);
});

test('`buildPattern` escapes special characters', () => {
  expect('.').toEqualRegex(/\./);
  expect('*').toEqualRegex(/\*/);
  expect('+').toEqualRegex(/\+/);
  expect('?').toEqualRegex(/\?/);
  expect('^').toEqualRegex(/\^/);
  expect('$').toEqualRegex(/\$/);
  expect('{').toEqualRegex(/\{/);
  expect('}').toEqualRegex(/\}/);
  expect('|').toEqualRegex(/\|/);
  expect('[').toEqualRegex(/\[/);
  expect(']').toEqualRegex(/\]/);
  expect('\\').toEqualRegex(/\\/);

  expect('*.*').toEqualRegex(/\*\.\*/);

  expect([oneOrMore('.*'), zeroOrMore('[]{}')]).toEqualRegex(/(?:\.\*)+(?:\[\]\{\})*/);
});

test('`buildRegExp` throws error on unknown element', () => {
  expect(() =>
    // @ts-expect-error intentionally passing incorrect object
    buildRegExp({ type: 'unknown' }),
  ).toThrowErrorMatchingInlineSnapshot(`"\`encodeNode\`: unknown element type unknown"`);
});

test('`buildPattern` throws on empty text', () => {
  expect(() => buildPattern('')).toThrowErrorMatchingInlineSnapshot(
    `"\`encodeText\`: received text should not be empty"`,
  );
});
