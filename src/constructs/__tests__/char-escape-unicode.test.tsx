import {
  buildRegExp,
  char,
  charClass,
  charProperty,
  endOfString,
  type RegexSequence,
  startOfString,
} from '../..';

function u(sequence: RegexSequence) {
  return buildRegExp(sequence, { unicode: true });
}

test('`char` pattern', () => {
  // eslint-disable-next-line no-control-regex
  expect(char(0)).toEqualRegex(/\u0000/);
  // eslint-disable-next-line no-control-regex
  expect(char(0x1)).toEqualRegex(/\u0001/);
  // eslint-disable-next-line no-control-regex
  expect(char(0x12)).toEqualRegex(/\u0012/);
  expect(char(0x123)).toEqualRegex(/\u0123/);
  expect(char(0x1234)).toEqualRegex(/\u1234/);

  // eslint-disable-next-line no-control-regex
  expect(u(char(0))).toEqualRegex(new RegExp('\\u0000', 'u'));
  // eslint-disable-next-line no-control-regex
  expect(u(char(0x1))).toEqualRegex(new RegExp('\\u0001', 'u'));
  expect(u(char(0x12))).toEqualRegex(
    // eslint-disable-next-line no-control-regex
    new RegExp('\\u0012', 'u'),
  );
  expect(char(0x0123)).toEqualRegex(/\u0123/);
  expect(char(0x1234)).toEqualRegex(/\u1234/);

  expect(u(char(0x0123))).toEqualRegex(/\u0123/u);
  expect(u(char(0x1234))).toEqualRegex(/\u1234/u);
  expect(u(char(0x12345))).toEqualRegex(new RegExp('\\u{12345}', 'u'));
  expect(u(char(0x103456))).toEqualRegex(new RegExp('\\u{103456}', 'u'));
});

test('`char` matching', () => {
  expect(char(0)).toMatchString('\u{0}');
  expect(char(0x1)).toMatchString('\u{1}');
  expect(char(0x12)).toMatchString('\u{12}}');
  expect(char(0x123)).toMatchString('\u{123}');
  expect(char(0x1234)).toMatchString('\u{1234}}');

  expect(char('a'.codePointAt(0)!)).toMatchString('a');
  expect(char('ą'.codePointAt(0)!)).toMatchString('ą');
  expect(char('©'.codePointAt(0)!)).toMatchString('©');

  expect(u(char(0))).toMatchString('\u{0}');
  expect(u(char(0))).not.toMatchString('a');
  expect(u(char(0x1))).toMatchString('\u{1}');
  expect(u(char(0x12))).toMatchString('\u{12}');
  expect(u(char(0x123))).toMatchString('\u{123}');
  expect(u(char(0x1234))).toMatchString('\u{1234}');
  expect(u(char(0x12345))).toMatchString('\u{12345}');
  expect(u(char(0x103456))).toMatchString('\u{103456}');

  expect(u(char('a'.codePointAt(0)!))).toMatchString('a');
  expect(u(char('ą'.codePointAt(0)!))).toMatchString('ą');
  expect(u(char('©'.codePointAt(0)!))).toMatchString('©');
  expect(u(char('😎'.codePointAt(0)!))).toMatchString('😎');
  expect(u(char('😎'.codePointAt(0)!))).toMatchString('\u{1f60e}');
});

test('`char` nesting matching', () => {
  expect(u(charClass(char('a'.codePointAt(0)!), char('ą'.codePointAt(0)!)))).toMatchString('a');
  expect(u(charClass(char('a'.codePointAt(0)!), char('ą'.codePointAt(0)!)))).toMatchString('ą');
  expect(u(charClass(char('a'.codePointAt(0)!), char('ą'.codePointAt(0)!)))).not.toMatchString('b');
});

test('`char` edge cases handling', () => {
  expect(() => u(char(NaN))).toThrowErrorMatchingInlineSnapshot(
    `"Expected a valid unicode code point but received NaN"`,
  );
  expect(() => u(char(1.5))).toThrowErrorMatchingInlineSnapshot(
    `"Expected a valid unicode code point but received 1.5"`,
  );
  expect(() => u(char(-1))).toThrowErrorMatchingInlineSnapshot(
    `"Expected a valid unicode code point but received -1"`,
  );
  expect(() => u(char(0x110000))).toThrowErrorMatchingInlineSnapshot(
    `"Expected a valid unicode code point but received 1114112"`,
  );

  expect(u(char(0x10ffff))).toEqualRegex(/\u{10ffff}/u);
});

test('`charProperty` pattern', () => {
  expect(u(charProperty('General_Category', 'Letter'))).toEqualRegex(
    /\p{General_Category=Letter}/u,
  );
  expect(u(charProperty('Letter'))).toEqualRegex(/\p{Letter}/u);
  expect(u(charProperty('L'))).toEqualRegex(/\p{L}/u);
  expect(u(charProperty('Lu'))).toEqualRegex(/\p{Lu}/u);
  expect(u(charProperty('Ll'))).toEqualRegex(/\p{Ll}/u);
  expect(u(charProperty('Lt'))).toEqualRegex(/\p{Lt}/u);
  expect(u(charProperty('Lm'))).toEqualRegex(/\p{Lm}/u);
  expect(u(charProperty('Lo'))).toEqualRegex(/\p{Lo}/u);

  expect(u(charProperty('Script', 'Latin'))).toEqualRegex('\\p{Script=Latin}');
  expect(u(charProperty('Script', 'Grek'))).toEqualRegex('\\p{Script=Grek}');
  expect(u(charProperty('sc', 'Cyrillic'))).toEqualRegex('\\p{sc=Cyrillic}');

  expect(u(charProperty('Script', 'Thaana'))).toEqualRegex('\\p{Script=Thaana}');
  expect(u(charProperty('Script_Extensions', 'Thaana'))).toEqualRegex(
    '\\p{Script_Extensions=Thaana}',
  );
  expect(u(charProperty('scx', 'Thaana'))).toEqualRegex('\\p{scx=Thaana}');

  expect(u(charProperty('Emoji'))).toEqualRegex('\\p{Emoji}');
});

test('`charProperty` matching', () => {
  expect(u(charProperty('General_Category', 'Letter'))).toMatchString('A');
  expect(u(charProperty('Letter'))).toMatchString('A');
  expect(u(charProperty('L'))).toMatchString('A');

  expect(u(charProperty('Uppercase'))).toMatchString('A');
  expect(u(charProperty('Uppercase'))).not.toMatchString('a');
  expect(u(charProperty('Lu'))).toMatchString('A');

  expect(u(charProperty('Lowercase'))).toMatchString('a');
  expect(u(charProperty('Lowercase'))).not.toMatchString('A');
  expect(u(charProperty('Ll'))).toMatchString('a');

  expect(u(charProperty('Script', 'Latin'))).toMatchString('A');
  expect(u(charProperty('Script', 'Latin'))).not.toMatchString('α');
  expect(u(charProperty('Script', 'Grek'))).toMatchString('α');
  expect(u(charProperty('Script', 'Grek'))).not.toMatchString('A');

  // Basic emoji
  expect(u([startOfString, charProperty('Emoji'), endOfString])).toMatchString('😎');
  expect(u([startOfString, charProperty('Emoji'), endOfString])).toMatchString('🐌');

  // Complex emoji with skin tone modifier
  expect(u(charProperty('Emoji'))).toMatchString('☝🏼');
  expect(u([startOfString, charProperty('Emoji'), endOfString])).not.toMatchString('☝🏼');
});

test('`charProperty` nesting matching', () => {
  expect(u(charClass(charProperty('Lowercase'), charProperty('White_Space')))).toMatchString('a');
  expect(u(charClass(charProperty('Lowercase'), charProperty('White_Space')))).toMatchString(' ');
  expect(u(charClass(charProperty('Lowercase'), charProperty('White_Space')))).not.toMatchString(
    'A',
  );
});
