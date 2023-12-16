import { buildPattern, buildRegex } from '../../builders';
import {
  one,
  oneOrMore,
  optionally,
  zeroOrMore,
} from '../../components/quantifiers';
import { repeat } from '../../components/repeat';

test('basic quantifies', () => {
  expect(buildPattern('a')).toEqual('a');
  expect(buildPattern('a', 'b')).toEqual('ab');

  expect(buildPattern(oneOrMore('a'))).toEqual('a+');
  expect(buildPattern(optionally('a'))).toEqual('a?');

  expect(buildPattern('a', oneOrMore('b'))).toEqual('ab+');
  expect(buildPattern('a', oneOrMore('bc'))).toEqual('a(?:bc)+');
  expect(buildPattern('a', oneOrMore('bc'))).toEqual('a(?:bc)+');

  expect(buildPattern('a', repeat({ min: 1, max: 5 }, 'b'))).toEqual('ab{1,5}');

  expect(buildPattern('a', zeroOrMore('b'))).toEqual('ab*');
  expect(buildPattern('a', zeroOrMore('bc'))).toEqual('a(?:bc)*');
  expect(buildPattern('a', zeroOrMore('bc'))).toEqual('a(?:bc)*');

  expect(buildPattern(optionally('a'), 'b')).toEqual('a?b');

  expect(buildPattern(optionally('a'), 'b', one('d'))).toEqual('a?bd');
});

test('regex constructor', () => {
  expect(buildRegex('a').test('a')).toBeTruthy();
  expect(buildRegex('a').test('b')).toBeFalsy();
});

test('"buildPattern" escapes special characters', () => {
  expect(buildPattern('.')).toBe('\\.');
  expect(buildPattern('*')).toBe('\\*');
  expect(buildPattern('+')).toBe('\\+');
  expect(buildPattern('?')).toBe('\\?');
  expect(buildPattern('^')).toBe('\\^');
  expect(buildPattern('$')).toBe('\\$');
  expect(buildPattern('{')).toBe('\\{');
  expect(buildPattern('}')).toBe('\\}');
  expect(buildPattern('|')).toBe('\\|');
  expect(buildPattern('[')).toBe('\\[');
  expect(buildPattern(']')).toBe('\\]');
  expect(buildPattern('\\')).toBe('\\\\');

  expect(buildPattern('*.*')).toBe('\\*\\.\\*');

  expect(buildPattern(oneOrMore('.*'), zeroOrMore('[]{}'))).toBe(
    '(?:\\.\\*)+(?:\\[\\]\\{\\})*'
  );
});

test('buildRegex throws error on unknown element', () => {
  expect(() =>
    // @ts-expect-error intentionally passing incorrect object
    buildRegex({ type: 'unknown' })
  ).toThrowErrorMatchingInlineSnapshot(`"Unknown elements type unknown"`);
});

test('buildPattern throws on empty text', () => {
  expect(() => buildPattern('')).toThrowErrorMatchingInlineSnapshot(
    `"\`encodeText\`: received text should not be empty"`
  );
});
