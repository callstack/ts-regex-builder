import {
  buildRegExp,
  charClass,
  endOfString,
  type RegexSequence,
  startOfString,
  unicodeChar,
  unicodeProp,
} from '../../index';

function u(sequence: RegexSequence) {
  return buildRegExp(sequence, { unicode: true });
}

test('`unicodeChar` pattern', () => {
  // eslint-disable-next-line no-control-regex
  expect(unicodeChar(0)).toEqualRegex(/\u0000/);
  // eslint-disable-next-line no-control-regex
  expect(unicodeChar(0x1)).toEqualRegex(/\u0001/);
  // eslint-disable-next-line no-control-regex
  expect(unicodeChar(0x12)).toEqualRegex(/\u0012/);
  expect(unicodeChar(0x123)).toEqualRegex(/\u0123/);
  expect(unicodeChar(0x1234)).toEqualRegex(/\u1234/);

  // eslint-disable-next-line no-control-regex
  expect(u(unicodeChar(0))).toEqualRegex(new RegExp('\\u0000', 'u'));
  // eslint-disable-next-line no-control-regex
  expect(u(unicodeChar(0x1))).toEqualRegex(new RegExp('\\u0001', 'u'));
  expect(u(unicodeChar(0x12))).toEqualRegex(
    // eslint-disable-next-line no-control-regex
    new RegExp('\\u0012', 'u'),
  );
  expect(unicodeChar(0x0123)).toEqualRegex(/\u0123/);
  expect(unicodeChar(0x1234)).toEqualRegex(/\u1234/);

  expect(u(unicodeChar(0x0123))).toEqualRegex(/\u0123/u);
  expect(u(unicodeChar(0x1234))).toEqualRegex(/\u1234/u);
  expect(u(unicodeChar(0x12345))).toEqualRegex(new RegExp('\\u{12345}', 'u'));
  expect(u(unicodeChar(0x103456))).toEqualRegex(new RegExp('\\u{103456}', 'u'));
});

test('`unicodeChar` matching', () => {
  expect(unicodeChar(0)).toMatchString('\u{0}');
  expect(unicodeChar(0x1)).toMatchString('\u{1}');
  expect(unicodeChar(0x12)).toMatchString('\u{12}}');
  expect(unicodeChar(0x123)).toMatchString('\u{123}');
  expect(unicodeChar(0x1234)).toMatchString('\u{1234}}');
  expect(unicodeChar(0x12345)).not.toMatchString('\u{12345}');
  expect(unicodeChar(0x103456)).not.toMatchString('\u{103456}');

  expect(unicodeChar('a'.codePointAt(0)!)).toMatchString('a');
  expect(unicodeChar('ą'.codePointAt(0)!)).toMatchString('ą');
  expect(unicodeChar('©'.codePointAt(0)!)).toMatchString('©');
  expect(unicodeChar('😎'.codePointAt(0)!)).not.toMatchString('😎');

  expect(u(unicodeChar(0))).toMatchString('\u{0}');
  expect(u(unicodeChar(0))).not.toMatchString('a');
  expect(u(unicodeChar(0x1))).toMatchString('\u{1}');
  expect(u(unicodeChar(0x12))).toMatchString('\u{12}');
  expect(u(unicodeChar(0x123))).toMatchString('\u{123}');
  expect(u(unicodeChar(0x1234))).toMatchString('\u{1234}');
  expect(u(unicodeChar(0x12345))).toMatchString('\u{12345}');
  expect(u(unicodeChar(0x103456))).toMatchString('\u{103456}');

  expect(u(unicodeChar('a'.codePointAt(0)!))).toMatchString('a');
  expect(u(unicodeChar('ą'.codePointAt(0)!))).toMatchString('ą');
  expect(u(unicodeChar('©'.codePointAt(0)!))).toMatchString('©');
  expect(u(unicodeChar('😎'.codePointAt(0)!))).toMatchString('😎');
  expect(u(unicodeChar('😎'.codePointAt(0)!))).toMatchString('\u{1f60e}');
});

test('`unicodeChar` nesting matching', () => {
  expect(
    u(charClass(unicodeChar('a'.codePointAt(0)!), unicodeChar('ą'.codePointAt(0)!))),
  ).toMatchString('a');
  expect(
    u(charClass(unicodeChar('a'.codePointAt(0)!), unicodeChar('ą'.codePointAt(0)!))),
  ).toMatchString('ą');
  expect(
    u(charClass(unicodeChar('a'.codePointAt(0)!), unicodeChar('ą'.codePointAt(0)!))),
  ).not.toMatchString('b');
});

test('`unicodeChar` edge cases handling', () => {
  expect(() => u(unicodeChar(NaN))).toThrowErrorMatchingInlineSnapshot(
    `""unicodeChar": expected valid unicode code point but got: NaN"`,
  );
  expect(() => u(unicodeChar(1.5))).toThrowErrorMatchingInlineSnapshot(
    `""unicodeChar": expected valid unicode code point but got: 1.5"`,
  );
  expect(() => u(unicodeChar(-1))).toThrowErrorMatchingInlineSnapshot(
    `""unicodeChar": expected valid unicode code point but got: -1"`,
  );
  expect(() => u(unicodeChar(0x110000))).toThrowErrorMatchingInlineSnapshot(
    `""unicodeChar": expected valid unicode code point but got: 1114112"`,
  );

  expect(u(unicodeChar(0x10ffff))).toEqualRegex(/\u{10ffff}/u);
});

test('`unicodeProp` pattern', () => {
  expect(unicodeProp('General_Category', 'Letter')).toEqualRegex(/\p{General_Category=Letter}/);
  expect(unicodeProp('Letter')).toEqualRegex(/\p{Letter}/);
  expect(unicodeProp('L')).toEqualRegex(/\p{L}/);
  expect(unicodeProp('Lu')).toEqualRegex(/\p{Lu}/);
  expect(unicodeProp('Ll')).toEqualRegex(/\p{Ll}/);
  expect(unicodeProp('Lt')).toEqualRegex(/\p{Lt}/);
  expect(unicodeProp('Lm')).toEqualRegex(/\p{Lm}/);
  expect(unicodeProp('Lo')).toEqualRegex(/\p{Lo}/);

  expect(unicodeProp('Script', 'Latin')).toEqualRegex('\\p{Script=Latin}');
  expect(unicodeProp('Script', 'Grek')).toEqualRegex('\\p{Script=Grek}');
  expect(unicodeProp('sc', 'Cyrillic')).toEqualRegex('\\p{sc=Cyrillic}');

  expect(unicodeProp('Script', 'Thaana')).toEqualRegex('\\p{Script=Thaana}');
  expect(unicodeProp('Script_Extensions', 'Thaana')).toEqualRegex('\\p{Script_Extensions=Thaana}');
  expect(unicodeProp('scx', 'Thaana')).toEqualRegex('\\p{scx=Thaana}');

  expect(unicodeProp('Emoji')).toEqualRegex('\\p{Emoji}');
});

test('`unicodeProp` matching', () => {
  expect(u(unicodeProp('General_Category', 'Letter'))).toMatchString('A');
  expect(u(unicodeProp('Letter'))).toMatchString('A');
  expect(u(unicodeProp('L'))).toMatchString('A');

  expect(u(unicodeProp('Uppercase'))).toMatchString('A');
  expect(u(unicodeProp('Uppercase'))).not.toMatchString('a');
  expect(u(unicodeProp('Lu'))).toMatchString('A');

  expect(u(unicodeProp('Lowercase'))).toMatchString('a');
  expect(u(unicodeProp('Lowercase'))).not.toMatchString('A');
  expect(u(unicodeProp('Ll'))).toMatchString('a');

  expect(u(unicodeProp('Script', 'Latin'))).toMatchString('A');
  expect(u(unicodeProp('Script', 'Latin'))).not.toMatchString('α');
  expect(u(unicodeProp('Script', 'Grek'))).toMatchString('α');
  expect(u(unicodeProp('Script', 'Grek'))).not.toMatchString('A');

  // Basic emoji
  expect(u([startOfString, unicodeProp('Emoji'), endOfString])).toMatchString('😎');
  expect(u([startOfString, unicodeProp('Emoji'), endOfString])).toMatchString('🐌');

  // Complex emoji with skin tone modifier
  expect(u(unicodeProp('Emoji'))).toMatchString('☝🏼');
  expect(u([startOfString, unicodeProp('Emoji'), endOfString])).not.toMatchString('☝🏼');
});

test('`unicodeProp` nesting matching', () => {
  expect(u(charClass(unicodeProp('Lowercase'), unicodeProp('White_Space')))).toMatchString('a');
  expect(u(charClass(unicodeProp('Lowercase'), unicodeProp('White_Space')))).toMatchString(' ');
  expect(u(charClass(unicodeProp('Lowercase'), unicodeProp('White_Space')))).not.toMatchString('A');
});
