import { oneOrMore, optionally, zeroOrMore } from '../quantifiers';
import {
  any,
  anyOf,
  digit,
  encodeCharacterClass,
  inverted,
  whitespace,
  word,
} from '../character-class';
import { execRegex, expectPattern } from '../../test-utils';

test('"any" character class', () => {
  expectPattern(any).toBe('.');
  expectPattern('x', any).toBe('x.');
  expectPattern('x', any, 'x').toBe('x.x');
});

test('"digit" character class', () => {
  expectPattern(digit).toBe('\\d');
  expectPattern('x', digit).toBe('x\\d');
  expectPattern('x', digit, 'x').toBe('x\\dx');
});

test('"word" character class', () => {
  expectPattern(word).toBe('\\w');
  expectPattern('x', word).toBe('x\\w');
  expectPattern('x', word, 'x').toBe('x\\wx');
});

test('"whitespace" character class', () => {
  expectPattern(whitespace).toBe('\\s');
  expectPattern('x', whitespace).toBe('x\\s');
  expectPattern('x', whitespace, 'x').toBe('x\\sx');
});

test('"anyOf" base cases', () => {
  expectPattern(anyOf('a')).toBe('a');
  expectPattern('x', anyOf('a'), 'x').toBe('xax');
  expectPattern(anyOf('ab')).toBe('[ab]');
  expectPattern('x', anyOf('ab')).toBe('x[ab]');
  expectPattern('x', anyOf('ab'), 'x').toBe('x[ab]x');
});

test('"anyOf" with quantifiers', () => {
  expectPattern('x', oneOrMore(anyOf('abc')), 'x').toBe('x[abc]+x');
  expectPattern('x', optionally(anyOf('abc')), 'x').toBe('x[abc]?x');
  expectPattern('x', zeroOrMore(anyOf('abc')), 'x').toBe('x[abc]*x');
});

test('"anyOf" escapes special characters', () => {
  expectPattern(anyOf('abc-+.')).toBe('[-abc\\+\\.]');
});

test('"anyOf" moves hyphen to the first position', () => {
  expectPattern(anyOf('a-bc')).toBe('[-abc]');
});

test('"anyOf" throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`
  );
});

test('"inverted" character class', () => {
  expectPattern(inverted(anyOf('a'))).toBe('[^a]');
  expectPattern(inverted(anyOf('abc'))).toBe('[^abc]');
});

test('"inverted" character class double inversion', () => {
  expectPattern(inverted(inverted(anyOf('a')))).toBe('a');
  expectPattern(inverted(inverted(anyOf('abc')))).toBe('[abc]');
});

test('"inverted" character class execution', () => {
  expect(execRegex('aa', [inverted(anyOf('a'))])).toBeNull();
  expect(execRegex('aba', [inverted(anyOf('a'))])).toEqual(['b']);
});

test('buildPattern throws on empty text', () => {
  expect(() =>
    encodeCharacterClass({
      type: 'characterClass',
      characters: [],
      inverted: false,
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Character class should contain at least one character"`
  );
});
