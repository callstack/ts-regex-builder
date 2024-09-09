import {
  anyOf,
  charClass,
  charRange,
  digit,
  negated,
  nonDigit,
  nonWhitespace,
  nonWord,
  oneOrMore,
  optional,
  whitespace,
  word,
  zeroOrMore,
} from '../..';

test('`charClass` base cases', () => {
  expect(charClass(charRange('a', 'z'))).toEqualRegex(/[a-z]/);
  expect(charClass(charRange('a', 'z'), charRange('A', 'Z'))).toEqualRegex(/[a-zA-Z]/);
  expect(charClass(charRange('a', 'z'), anyOf('05'))).toEqualRegex(/[a-z05]/);
  expect(charClass(charRange('a', 'z'), whitespace, anyOf('05'))).toEqualRegex(/[a-z\s05]/);
});

test('`charClass` joins character escapes', () => {
  expect(charClass(word)).toEqualRegex(/[\w]/);
  expect(charClass(digit)).toEqualRegex(/[\d]/);
  expect(charClass(whitespace)).toEqualRegex(/[\s]/);
  expect(charClass(nonWord)).toEqualRegex(/[\W]/);
  expect(charClass(nonDigit)).toEqualRegex(/[\D]/);
  expect(charClass(nonWhitespace)).toEqualRegex(/[\S]/);

  expect(charClass(whitespace, nonWhitespace)).toEqualRegex(/[\s\S]/);

  expect(charClass(word, whitespace)).toEqualRegex(/[\w\s]/);
  expect(charClass(word, digit, whitespace)).toEqualRegex(/[\w\d\s]/);
  expect(charClass(word, nonDigit)).toEqualRegex(/[\w\D]/);
});

test('`charClass` throws on empty text', () => {
  expect(() => charClass()).toThrowErrorMatchingInlineSnapshot(`"Expected at least one element"`);
});

test('`charRange` pattern', () => {
  expect(charRange('a', 'z')).toEqualRegex(/[a-z]/);
  expect(['x', charRange('0', '9')]).toEqualRegex(/x[0-9]/);
  expect([charRange('A', 'F'), 'x']).toEqualRegex(/[A-F]x/);
});

test('`charRange` works both ways', () => {
  expect(charRange('a', 'z')).toEqualRegex(/[a-z]/);
  expect(charRange('z', 'a')).toEqualRegex(/[a-z]/);
});

test('`charRange` throws on incorrect arguments', () => {
  expect(() => charRange('aa', 'z')).toThrowErrorMatchingInlineSnapshot(
    `"Expected single characters, but received "aa" & "z""`,
  );
  expect(() => charRange('a', 'zz')).toThrowErrorMatchingInlineSnapshot(
    `"Expected single characters, but received "a" & "zz""`,
  );
  expect(() => charRange('', 'z')).toThrowErrorMatchingInlineSnapshot(
    `"Expected single characters, but received "" & "z""`,
  );
  expect(() => charRange('a', '')).toThrowErrorMatchingInlineSnapshot(
    `"Expected single characters, but received "a" & """`,
  );
});

test('`anyOf` pattern', () => {
  expect(anyOf('a')).toEqualRegex(/[a]/);
  expect(['x', anyOf('a'), 'x']).toEqualRegex(/x[a]x/);
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

test('`anyOf` pattern edge cases', () => {
  expect(anyOf('^-')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^')).toEqualRegex(/[\^-]/);
  expect(anyOf('-^a')).toEqualRegex(/[a^-]/);

  expect(anyOf('.')).toEqualRegex(/[.]/);
  expect(anyOf('*')).toEqualRegex(/[*]/);
  expect(anyOf('+')).toEqualRegex(/[+]/);
  expect(anyOf('?')).toEqualRegex(/[?]/);
  expect(anyOf('^')).toEqualRegex(/[^]/);
  expect(anyOf('$')).toEqualRegex(/[$]/);
  expect(anyOf('{')).toEqualRegex(/[{]/);
  expect(anyOf('}')).toEqualRegex(/[}]/);
  expect(anyOf('(')).toEqualRegex(/[(]/);
  expect(anyOf(')')).toEqualRegex(/[)]/);
  expect(anyOf('|')).toEqualRegex(/[|]/);
  expect(anyOf('[')).toEqualRegex(/[[]/);
  expect(anyOf(']')).toEqualRegex(/[\]]/);
  expect(anyOf('\\')).toEqualRegex(/[\\]/);
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(`"Expected at least one character"`);
});

test('`negated` character class pattern', () => {
  expect(negated(anyOf('a'))).toEqualRegex(/[^a]/);
  expect(negated(anyOf('abc'))).toEqualRegex(/[^abc]/);
});

test('`negated` character class matching', () => {
  expect(negated(anyOf('a'))).not.toMatchString('aa');
  expect(negated(anyOf('a'))).toMatchGroups('aba', ['b']);
});
