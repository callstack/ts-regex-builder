import { buildPattern, buildRegex } from '../../builders';
import { oneOrMore, optionally, zeroOrMore } from '../../components/quantifiers';
import { repeat } from '../../components/repeat';

test('basic quantifies', () => {
  expect('a').toHavePattern(/a/);
  expect(['a', 'b']).toHavePattern(/ab/);

  expect(oneOrMore('a')).toHavePattern(/a+/);
  expect(optionally('a')).toHavePattern(/a?/);

  expect(['a', oneOrMore('b')]).toHavePattern(/ab+/);
  expect(['a', oneOrMore('bc')]).toHavePattern(/a(?:bc)+/);
  expect(['a', oneOrMore('bc')]).toHavePattern(/a(?:bc)+/);

  expect(['a', repeat({ min: 1, max: 5 }, 'b')]).toHavePattern(/ab{1,5}/);

  expect(['a', zeroOrMore('b')]).toHavePattern(/ab*/);
  expect(['a', zeroOrMore('bc')]).toHavePattern(/a(?:bc)*/);
  expect(['a', zeroOrMore('bc')]).toHavePattern(/a(?:bc)*/);

  expect([optionally('a'), 'b']).toHavePattern(/a?b/);

  expect([optionally('a'), 'b', oneOrMore('d')]).toHavePattern(/a?bd+/);
});

test('`buildPattern` escapes special characters', () => {
  expect('.').toHavePattern(/\./);
  expect('*').toHavePattern(/\*/);
  expect('+').toHavePattern(/\+/);
  expect('?').toHavePattern(/\?/);
  expect('^').toHavePattern(/\^/);
  expect('$').toHavePattern(/\$/);
  expect('{').toHavePattern(/\{/);
  expect('}').toHavePattern(/\}/);
  expect('|').toHavePattern(/\|/);
  expect('[').toHavePattern(/\[/);
  expect(']').toHavePattern(/\]/);
  expect('\\').toHavePattern(/\\/);

  expect('*.*').toHavePattern(/\*\.\*/);

  expect([oneOrMore('.*'), zeroOrMore('[]{}')]).toHavePattern(/(?:\.\*)+(?:\[\]\{\})*/);
});

test('`buildRegex` throws error on unknown element', () => {
  expect(() =>
    // @ts-expect-error intentionally passing incorrect object
    buildRegex({ type: 'unknown' })
  ).toThrowErrorMatchingInlineSnapshot(`"\`encodeNode\`: unknown element type unknown"`);
});

test('`buildPattern` throws on empty text', () => {
  expect(() => buildPattern('')).toThrowErrorMatchingInlineSnapshot(
    `"\`encodeText\`: received text should not be empty"`
  );
});
