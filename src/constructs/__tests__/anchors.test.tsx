import {
  buildRegExp,
  digit,
  endOfString,
  nonWhitespace,
  nonWordBoundary,
  oneOrMore,
  startOfString,
  wordBoundary,
  zeroOrMore,
} from '../..';

test('`startOfString` pattern', () => {
  expect(startOfString).toEqualRegex(/^/);
  expect([startOfString, 'a', 'b']).toEqualRegex(/^ab/);
});

test('`startOfString` matching', () => {
  expect([startOfString, oneOrMore('a')]).toMatchGroups('a aa aaa', ['a']);
});

test('`endOfString` pattern', () => {
  expect(endOfString).toEqualRegex(/$/);
  expect(['a', 'b', endOfString]).toEqualRegex(/ab$/);
});

test('`endOfString` matching', () => {
  expect([oneOrMore('a'), endOfString]).toMatchGroups('a aa aaa', ['aaa']);
});

test('`wordBoundary` pattern', () => {
  expect(wordBoundary).toEqualRegex(/\b/);
  expect([wordBoundary, 'a', 'b']).toEqualRegex(/\bab/);
});

test('`wordBoundary` matching', () => {
  expect(
    buildRegExp([wordBoundary, 'a', zeroOrMore(nonWhitespace)], { global: true }),
  ).toMatchGroups('a ba ab aa', ['a', 'ab', 'aa']);

  expect(
    buildRegExp([zeroOrMore(nonWhitespace), 'a', wordBoundary], { global: true }),
  ).toMatchGroups('a ba ab aa', ['a', 'ba', 'aa']);
});

test('`nonWordBoundary` pattern', () => {
  expect(nonWordBoundary).toEqualRegex(/\B/);
  expect([nonWordBoundary, 'a', 'b']).toEqualRegex(/\Bab/);
  expect(['a', nonWordBoundary, 'b']).toEqualRegex(/a\Bb/);
  expect(['a', 'b', nonWordBoundary]).toEqualRegex(/ab\B/);
});

test('`nonWordBoundary` matching', () => {
  expect(buildRegExp([nonWordBoundary, 'abc', digit], { global: true })).toMatchGroups(
    'abc1 xabc2 xxabc3',
    ['abc2', 'abc3'],
  );

  expect(buildRegExp([digit, 'abc', nonWordBoundary], { global: true })).toMatchGroups(
    '1abc 2abcx 3abcxx',
    ['2abc', '3abc'],
  );
});
