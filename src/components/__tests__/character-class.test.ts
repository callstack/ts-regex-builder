import { oneOrMore, optionally, zeroOrMore } from '../quantifiers';
import {
  any,
  anyOf,
  characterClass,
  characterRange,
  digit,
  inverted,
  whitespace,
  word,
} from '../character-class';
import { buildRegex } from '../../builders';

test('`any` character class', () => {
  expect(any).toHavePattern('.');
  expect(['x', any]).toHavePattern('x.');
  expect(['x', any, 'x']).toHavePattern('x.x');
});

test('`digit` character class', () => {
  expect(digit).toHavePattern('\\d');
  expect(['x', digit]).toHavePattern('x\\d');
  expect(['x', digit, 'x']).toHavePattern('x\\dx');
});

test('`word` character class', () => {
  expect(word).toHavePattern('\\w');
  expect(['x', word]).toHavePattern('x\\w');
  expect(['x', word, 'x']).toHavePattern('x\\wx');
});

test('`whitespace` character class', () => {
  expect(whitespace).toHavePattern('\\s');
  expect(['x', whitespace]).toHavePattern('x\\s');
  expect(['x', whitespace, 'x']).toHavePattern('x\\sx');
});

test('`characterClass` base cases', () => {
  expect(characterClass(characterRange('a', 'z'))).toHavePattern('[a-z]');
  expect(characterClass(characterRange('a', 'z'), characterRange('A', 'Z'))).toHavePattern(
    '[a-zA-Z]'
  );
  expect(characterClass(characterRange('a', 'z'), anyOf('05'))).toHavePattern('[a-z05]');
  expect(characterClass(characterRange('a', 'z'), whitespace, anyOf('05'))).toHavePattern(
    '[a-z\\s05]'
  );
});

test('`characterClass` throws on inverted arguments', () => {
  expect(() => characterClass(inverted(whitespace))).toThrowErrorMatchingInlineSnapshot(
    `"\`characterClass\` should receive only non-inverted character classes"`
  );
});

test('`characterRange` base cases', () => {
  expect(characterRange('a', 'z')).toHavePattern('[a-z]');
  expect(['x', characterRange('0', '9')]).toHavePattern('x[0-9]');
  expect([characterRange('A', 'F'), 'x']).toHavePattern('[A-F]x');
});

test('`characterRange` throws on incorrect arguments', () => {
  expect(() => characterRange('z', 'a')).toThrowErrorMatchingInlineSnapshot(
    `"\`start\` should be before or equal to \`end\`"`
  );
  expect(() => characterRange('aa', 'z')).toThrowErrorMatchingInlineSnapshot(
    `"\`characterRange\` should receive only single character \`start\` string"`
  );
  expect(() => characterRange('a', 'zz')).toThrowErrorMatchingInlineSnapshot(
    `"\`characterRange\` should receive only single character \`end\` string"`
  );
});

test('`anyOf` base cases', () => {
  expect(anyOf('a')).toHavePattern('a');
  expect(['x', anyOf('a'), 'x']).toHavePattern('xax');
  expect(anyOf('ab')).toHavePattern('[ab]');
  expect(['x', anyOf('ab')]).toHavePattern('x[ab]');
  expect(['x', anyOf('ab'), 'x']).toHavePattern('x[ab]x');
});

test('`anyOf` with quantifiers', () => {
  expect(['x', oneOrMore(anyOf('abc')), 'x']).toHavePattern('x[abc]+x');
  expect(['x', optionally(anyOf('abc')), 'x']).toHavePattern('x[abc]?x');
  expect(['x', zeroOrMore(anyOf('abc')), 'x']).toHavePattern('x[abc]*x');
});

test('`anyOf` escapes special characters', () => {
  expect(anyOf('abc-+.]\\')).toHavePattern('[abc+.\\]\\\\-]');
});

test('`anyOf` moves hyphen to the last position', () => {
  expect(anyOf('a-bc')).toHavePattern('[abc-]');
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`
  );
});

test('`inverted` character class', () => {
  expect(inverted(anyOf('a'))).toHavePattern('[^a]');
  expect(inverted(anyOf('abc'))).toHavePattern('[^abc]');
});

test('`inverted` character class double inversion', () => {
  expect(inverted(inverted(anyOf('a')))).toHavePattern('a');
  expect(inverted(inverted(anyOf('abc')))).toHavePattern('[abc]');
});

test('`inverted` character class execution', () => {
  expect(inverted(anyOf('a'))).toMatchGroups('aa', []);
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
