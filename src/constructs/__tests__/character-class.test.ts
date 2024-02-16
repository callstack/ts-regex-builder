import {
  any,
  anyOf,
  buildRegExp,
  charClass,
  charRange,
  digit,
  inverted,
  notDigit,
  notWhitespace,
  notWord,
  oneOrMore,
  optional,
  whitespace,
  word,
  zeroOrMore,
} from '../..';

test('`any` character class', () => {
  expect(any).toEqualRegex(/./);
  expect(['x', any]).toEqualRegex(/x./);
  expect(['x', any, 'x']).toEqualRegex(/x.x/);
});

test('`digit` character class', () => {
  expect(digit).toEqualRegex(/\d/);
  expect(['x', digit]).toEqualRegex(/x\d/);
  expect(['x', digit, 'x']).toEqualRegex(/x\dx/);
  expect(digit).toMatchString('1');
  expect(digit).not.toMatchString('A');
});

test('`notDigit` character class', () => {
  expect(notDigit).toEqualRegex(/\D/);
  expect(['x', notDigit]).toEqualRegex(/x\D/);
  expect(['x', notDigit, 'x']).toEqualRegex(/x\Dx/);
  expect(notDigit).not.toMatchString('1');
  expect(notDigit).toMatchString('A');
});

test('`word` character class', () => {
  expect(word).toEqualRegex(/\w/);
  expect(['x', word]).toEqualRegex(/x\w/);
  expect(['x', word, 'x']).toEqualRegex(/x\wx/);
  expect(word).toMatchString('A');
  expect(word).toMatchString('1');
  expect(word).not.toMatchString('$');
});

test('`notWord` character class', () => {
  expect(notWord).toEqualRegex(/\W/);
  expect(['x', notWord]).toEqualRegex(/x\W/);
  expect(['x', notWord, 'x']).toEqualRegex(/x\Wx/);
  expect(notWord).not.toMatchString('A');
  expect(notWord).not.toMatchString('1');
  expect(notWord).toMatchString('$');
});

test('`whitespace` character class', () => {
  expect(whitespace).toEqualRegex(/\s/);
  expect(['x', whitespace]).toEqualRegex(/x\s/);
  expect(['x', whitespace, 'x']).toEqualRegex(/x\sx/);
  expect(whitespace).toMatchString(' ');
  expect(whitespace).toMatchString('\t');
  expect(whitespace).not.toMatchString('A');
  expect(whitespace).not.toMatchString('1');
});

test('`notWhitespace` character class', () => {
  expect(notWhitespace).toEqualRegex(/\S/);
  expect(['x', notWhitespace]).toEqualRegex(/x\S/);
  expect(['x', notWhitespace, 'x']).toEqualRegex(/x\Sx/);
  expect(notWhitespace).not.toMatchString(' ');
  expect(notWhitespace).not.toMatchString('\t');
  expect(notWhitespace).toMatchString('A');
  expect(notWhitespace).toMatchString('1');
});

test('`charClass` base cases', () => {
  expect(charClass(charRange('a', 'z'))).toEqualRegex(/[a-z]/);
  expect(charClass(charRange('a', 'z'), charRange('A', 'Z'))).toEqualRegex(/[a-zA-Z]/);
  expect(charClass(charRange('a', 'z'), anyOf('05'))).toEqualRegex(/[a-z05]/);
  expect(charClass(charRange('a', 'z'), whitespace, anyOf('05'))).toEqualRegex(/[a-z\s05]/);
});

test('`charClass` throws on inverted arguments', () => {
  expect(() => charClass(inverted(whitespace))).toThrowErrorMatchingInlineSnapshot(
    `"\`charClass\` should receive only non-inverted character classes"`,
  );
});

test('`charRange` base cases', () => {
  expect(charRange('a', 'z')).toEqualRegex(/[a-z]/);
  expect(['x', charRange('0', '9')]).toEqualRegex(/x[0-9]/);
  expect([charRange('A', 'F'), 'x']).toEqualRegex(/[A-F]x/);
});

test('`charRange` throws on incorrect arguments', () => {
  expect(() => charRange('z', 'a')).toThrowErrorMatchingInlineSnapshot(
    `"\`start\` should be before or equal to \`end\`"`,
  );
  expect(() => charRange('aa', 'z')).toThrowErrorMatchingInlineSnapshot(
    `"\`charRange\` should receive only single character \`start\` string"`,
  );
  expect(() => charRange('a', 'zz')).toThrowErrorMatchingInlineSnapshot(
    `"\`charRange\` should receive only single character \`end\` string"`,
  );
});

test('`anyOf` base cases', () => {
  expect(anyOf('a')).toEqualRegex(/a/);
  expect(['x', anyOf('a'), 'x']).toEqualRegex(/xax/);
  expect(anyOf('ab')).toEqualRegex(/[ab]/);
  expect(['x', anyOf('ab')]).toEqualRegex(/x[ab]/);
  expect(['x', anyOf('ab'), 'x']).toEqualRegex(/x[ab]x/);
});

test('`anyOf` with quantifiers', () => {
  expect(['x', oneOrMore(anyOf('abc')), 'x']).toEqualRegex(/x[abc]+x/);
  expect(['x', optional(anyOf('abc')), 'x']).toEqualRegex(/x[abc]?x/);
  expect(['x', zeroOrMore(anyOf('abc')), 'x']).toEqualRegex(/x[abc]*x/);
});

test('`anyOf` escapes special characters', () => {
  expect(anyOf('abc-+.]\\')).toEqualRegex(/[abc+.\]\\-]/);
});

test('`anyOf` moves hyphen to the last position', () => {
  expect(anyOf('a-bc')).toEqualRegex(/[abc-]/);
});

test('`anyOf` edge case caret and  hyphen', () => {
  expect(anyOf('^-')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^a')).toEqualRegex(/[a^-]/);
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`,
  );
});

test('`inverted` character class', () => {
  expect(inverted(anyOf('a'))).toEqualRegex(/[^a]/);
  expect(inverted(anyOf('abc'))).toEqualRegex(/[^abc]/);
});

test('`inverted` character class double inversion', () => {
  expect(inverted(inverted(anyOf('a')))).toEqualRegex(/a/);
  expect(inverted(inverted(anyOf('abc')))).toEqualRegex(/[abc]/);
});

test('`inverted` character class execution', () => {
  expect(inverted(anyOf('a'))).not.toMatchString('aa');
  expect(inverted(anyOf('a'))).toMatchGroups('aba', ['b']);
});

test('`encodeCharacterClass` throws on empty text', () => {
  expect(() =>
    buildRegExp(
      // @ts-expect-error
      inverted({
        type: 'characterClass',
        chars: [],
        ranges: [],
        isInverted: false,
      }),
    ),
  ).toThrowErrorMatchingInlineSnapshot(
    `"Character class should contain at least one character or character range"`,
  );
});

test('showcase: negated character classes', () => {
  expect(notDigit).toEqualRegex(/\D/);
  expect(notWord).toEqualRegex(/\W/);
  expect(notWhitespace).toEqualRegex(/\S/);

  expect(notDigit).toMatchString('A');
  expect(notDigit).not.toMatchString('1');
  expect(notDigit).toMatchString(' ');
  expect(notDigit).toMatchString('#');

  expect(notWord).not.toMatchString('A');
  expect(notWord).not.toMatchString('1');
  expect(notWord).toMatchString(' ');
  expect(notWord).toMatchString('#');

  expect(notWhitespace).toMatchString('A');
  expect(notWhitespace).toMatchString('1');
  expect(notWhitespace).not.toMatchString(' ');
  expect(notWhitespace).toMatchString('#');
});
