import {
  any,
  anyOf,
  buildRegExp,
  charClass,
  charRange,
  digit,
  inverted,
  nonDigit,
  nonWhitespace,
  nonWord,
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

test('`nonDigit` character class', () => {
  expect(nonDigit).toEqualRegex(/\D/);
  expect(['x', nonDigit]).toEqualRegex(/x\D/);
  expect(['x', nonDigit, 'x']).toEqualRegex(/x\Dx/);
  expect(nonDigit).not.toMatchString('1');
  expect(nonDigit).toMatchString('A');
});

test('`word` character class', () => {
  expect(word).toEqualRegex(/\w/);
  expect(['x', word]).toEqualRegex(/x\w/);
  expect(['x', word, 'x']).toEqualRegex(/x\wx/);
  expect(word).toMatchString('A');
  expect(word).toMatchString('1');
  expect(word).not.toMatchString('$');
});

test('`nonWord` character class', () => {
  expect(nonWord).toEqualRegex(/\W/);
  expect(['x', nonWord]).toEqualRegex(/x\W/);
  expect(['x', nonWord, 'x']).toEqualRegex(/x\Wx/);
  expect(nonWord).not.toMatchString('A');
  expect(nonWord).not.toMatchString('1');
  expect(nonWord).toMatchString('$');
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

test('`nonWhitespace` character class', () => {
  expect(nonWhitespace).toEqualRegex(/\S/);
  expect(['x', nonWhitespace]).toEqualRegex(/x\S/);
  expect(['x', nonWhitespace, 'x']).toEqualRegex(/x\Sx/);
  expect(nonWhitespace).not.toMatchString(' ');
  expect(nonWhitespace).not.toMatchString('\t');
  expect(nonWhitespace).toMatchString('A');
  expect(nonWhitespace).toMatchString('1');
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

test('`charRange` pattern', () => {
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

test('`anyOf` pattern', () => {
  expect(anyOf('a')).toEqualRegex(/a/);
  expect(['x', anyOf('a'), 'x']).toEqualRegex(/xax/);
  expect(anyOf('ab')).toEqualRegex(/[ab]/);
  expect(['x', anyOf('ab')]).toEqualRegex(/x[ab]/);
  expect(['x', anyOf('ab'), 'x']).toEqualRegex(/x[ab]x/);
});

test('`anyOf` pattern with quantifiers', () => {
  expect(['x', oneOrMore(anyOf('abc')), 'x']).toEqualRegex(/x[abc]+x/);
  expect(['x', optional(anyOf('abc')), 'x']).toEqualRegex(/x[abc]?x/);
  expect(['x', zeroOrMore(anyOf('abc')), 'x']).toEqualRegex(/x[abc]*x/);
});

test('`anyOf` pattern escapes special characters', () => {
  expect(anyOf('abc-+.]\\')).toEqualRegex(/[abc+.\]\\-]/);
});

test('`anyOf` pattern moves hyphen to the last position', () => {
  expect(anyOf('a-bc')).toEqualRegex(/[abc-]/);
});

test('`anyOf` pattern edge case caret and  hyphen', () => {
  expect(anyOf('^-')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^a')).toEqualRegex(/[a^-]/);
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`,
  );
});

test('`inverted` character class pattern', () => {
  expect(inverted(anyOf('a'))).toEqualRegex(/[^a]/);
  expect(inverted(anyOf('abc'))).toEqualRegex(/[^abc]/);
});

test('`inverted` character class pattern double inversion', () => {
  expect(inverted(inverted(anyOf('a')))).toEqualRegex(/a/);
  expect(inverted(inverted(anyOf('abc')))).toEqualRegex(/[abc]/);
});

test('`inverted` character class matching', () => {
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
  expect(nonDigit).toEqualRegex(/\D/);
  expect(nonWord).toEqualRegex(/\W/);
  expect(nonWhitespace).toEqualRegex(/\S/);

  expect(nonDigit).toMatchString('A');
  expect(nonDigit).not.toMatchString('1');
  expect(nonDigit).toMatchString(' ');
  expect(nonDigit).toMatchString('#');

  expect(nonWord).not.toMatchString('A');
  expect(nonWord).not.toMatchString('1');
  expect(nonWord).toMatchString(' ');
  expect(nonWord).toMatchString('#');

  expect(nonWhitespace).toMatchString('A');
  expect(nonWhitespace).toMatchString('1');
  expect(nonWhitespace).not.toMatchString(' ');
  expect(nonWhitespace).toMatchString('#');
});
