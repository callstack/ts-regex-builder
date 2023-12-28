import { oneOrMore, optionally, zeroOrMore } from '../quantifiers';
import {
  any,
  anyOf,
  charClass,
  charRange,
  digit,
  inverted,
  whitespace,
  word,
} from '../character-class';
import { buildRegex } from '../../builders';

test('`any` character class', () => {
  expect(any).toHavePattern(/./);
  expect(['x', any]).toHavePattern(/x./);
  expect(['x', any, 'x']).toHavePattern(/x.x/);
});

test('`digit` character class', () => {
  expect(digit).toHavePattern(/\d/);
  expect(['x', digit]).toHavePattern(/x\d/);
  expect(['x', digit, 'x']).toHavePattern(/x\dx/);
});

test('`word` character class', () => {
  expect(word).toHavePattern(/\w/);
  expect(['x', word]).toHavePattern(/x\w/);
  expect(['x', word, 'x']).toHavePattern(/x\wx/);
});

test('`whitespace` character class', () => {
  expect(whitespace).toHavePattern(/\s/);
  expect(['x', whitespace]).toHavePattern(/x\s/);
  expect(['x', whitespace, 'x']).toHavePattern(/x\sx/);
});

test('`charClass` base cases', () => {
  expect(charClass(charRange('a', 'z'))).toHavePattern(/[a-z]/);
  expect(charClass(charRange('a', 'z'), charRange('A', 'Z'))).toHavePattern(/[a-zA-Z]/);
  expect(charClass(charRange('a', 'z'), anyOf('05'))).toHavePattern(/[a-z05]/);
  expect(charClass(charRange('a', 'z'), whitespace, anyOf('05'))).toHavePattern(/[a-z\s05]/);
});

test('`charClass` throws on inverted arguments', () => {
  expect(() => charClass(inverted(whitespace))).toThrowErrorMatchingInlineSnapshot(
    `"\`charClass\` should receive only non-inverted character classes"`
  );
});

test('`charRange` base cases', () => {
  expect(charRange('a', 'z')).toHavePattern(/[a-z]/);
  expect(['x', charRange('0', '9')]).toHavePattern(/x[0-9]/);
  expect([charRange('A', 'F'), 'x']).toHavePattern(/[A-F]x/);
});

test('`charRange` throws on incorrect arguments', () => {
  expect(() => charRange('z', 'a')).toThrowErrorMatchingInlineSnapshot(
    `"\`start\` should be before or equal to \`end\`"`
  );
  expect(() => charRange('aa', 'z')).toThrowErrorMatchingInlineSnapshot(
    `"\`charRange\` should receive only single character \`start\` string"`
  );
  expect(() => charRange('a', 'zz')).toThrowErrorMatchingInlineSnapshot(
    `"\`charRange\` should receive only single character \`end\` string"`
  );
});

test('`anyOf` base cases', () => {
  expect(anyOf('a')).toHavePattern(/a/);
  expect(['x', anyOf('a'), 'x']).toHavePattern(/xax/);
  expect(anyOf('ab')).toHavePattern(/[ab]/);
  expect(['x', anyOf('ab')]).toHavePattern(/x[ab]/);
  expect(['x', anyOf('ab'), 'x']).toHavePattern(/x[ab]x/);
});

test('`anyOf` with quantifiers', () => {
  expect(['x', oneOrMore(anyOf('abc')), 'x']).toHavePattern(/x[abc]+x/);
  expect(['x', optionally(anyOf('abc')), 'x']).toHavePattern(/x[abc]?x/);
  expect(['x', zeroOrMore(anyOf('abc')), 'x']).toHavePattern(/x[abc]*x/);
});

test('`anyOf` escapes special characters', () => {
  expect(anyOf('abc-+.]\\')).toHavePattern(/[abc+.\]\\-]/);
});

test('`anyOf` moves hyphen to the last position', () => {
  expect(anyOf('a-bc')).toHavePattern(/[abc-]/);
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`
  );
});

test('`inverted` character class', () => {
  expect(inverted(anyOf('a'))).toHavePattern(/[^a]/);
  expect(inverted(anyOf('abc'))).toHavePattern(/[^abc]/);
});

test('`inverted` character class double inversion', () => {
  expect(inverted(inverted(anyOf('a')))).toHavePattern(/a/);
  expect(inverted(inverted(anyOf('abc')))).toHavePattern(/[abc]/);
});

test('`inverted` character class execution', () => {
  expect(inverted(anyOf('a'))).not.toMatchString('aa');
  expect(inverted(anyOf('a'))).toMatchGroups('aba', ['b']);
});

test('`encodeCharacterClass` throws on empty text', () => {
  expect(() =>
    buildRegex(
      // @ts-expect-error
      inverted({
        type: 'characterClass',
        characters: [],
        ranges: [],
        isInverted: false,
      })
    )
  ).toThrowErrorMatchingInlineSnapshot(
    `"Character class should contain at least one character or character range"`
  );
});
