import { buildRegExp, char, charProperty } from '..';

test('`regexBuilder` flags', () => {
  expect(buildRegExp('a').flags).toBe('');
  expect(buildRegExp('a', {}).flags).toBe('');

  expect(buildRegExp('a', { global: true }).flags).toBe('g');
  expect(buildRegExp('a', { global: false }).flags).toBe('');

  expect(buildRegExp('a', { ignoreCase: true }).flags).toBe('i');
  expect(buildRegExp('a', { ignoreCase: false }).flags).toBe('');

  expect(buildRegExp('a', { multiline: true }).flags).toBe('m');
  expect(buildRegExp('a', { multiline: false }).flags).toBe('');

  expect(buildRegExp('a', { hasIndices: true }).flags).toBe('d');
  expect(buildRegExp('a', { hasIndices: false }).flags).toBe('');

  expect(buildRegExp('a', { dotAll: true }).flags).toBe('s');
  expect(buildRegExp('a', { dotAll: false }).flags).toBe('');

  expect(buildRegExp('a', { sticky: true }).flags).toBe('y');
  expect(buildRegExp('a', { sticky: false }).flags).toBe('');

  expect(
    buildRegExp('a', {
      global: true, //
      ignoreCase: true,
      multiline: false,
      dotAll: true,
      sticky: true,
    }).flags,
  ).toBe('gisy');
});

test('`regexBuilder` throws when using unicode-aware features without `unicode` flag', () => {
  expect(() => buildRegExp(char(0x1234))).not.toThrow();
  expect(() => buildRegExp(char(0x12345), { unicode: true })).not.toThrow();
  expect(() => buildRegExp(charProperty('Emoji_Presentation'), { unicode: true })).not.toThrow();

  expect(() => buildRegExp(char(0x123456))).toThrowErrorMatchingInlineSnapshot(
    `"Expected a valid unicode code point but received 1193046"`,
  );
  expect(() => buildRegExp(char(0x12345))).toThrowErrorMatchingInlineSnapshot(
    `"The pattern "\\u{12345}" requires Unicode-aware mode. Please ensure the "unicode" flag is set."`,
  );
  expect(() => buildRegExp(charProperty('Emoji_Presentation'))).toThrowErrorMatchingInlineSnapshot(
    `"The pattern "\\p{Emoji_Presentation}" requires Unicode-aware mode. Please ensure the "unicode" flag is set."`,
  );
  expect(() => buildRegExp(/\P{Letter}/u)).toThrowErrorMatchingInlineSnapshot(
    `"The pattern "\\P{Letter}" requires Unicode-aware mode. Please ensure the "unicode" flag is set."`,
  );
});
