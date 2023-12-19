import { buildPattern } from '../../builders';
import { one, oneOrMore } from '../quantifiers';
import { any, anyOf, digit, whitespace, word } from '../character-class';

test('"whitespace" character class', () => {
  expect(buildPattern(whitespace)).toEqual(`\\s`);

  expect(buildPattern(one('ab'), whitespace)).toEqual(`ab\\s`);

  expect(buildPattern(one('ab'), whitespace, one('c'))).toEqual(`ab\\sc`);
});

test('"digit" character class', () => {
  expect(buildPattern(digit)).toEqual(`\\d`);

  expect(buildPattern(one('ab'), digit)).toEqual(`ab\\d`);

  expect(buildPattern(one('ab'), digit, one('c'))).toEqual(`ab\\dc`);
});

test('"word" character class', () => {
  expect(buildPattern(word)).toEqual(`\\w`);

  expect(buildPattern(one('ab'), word)).toEqual(`ab\\w`);

  expect(buildPattern(one('ab'), word, one('c'))).toEqual(`ab\\wc`);
});

test('"any" character class', () => {
  expect(buildPattern(any)).toEqual(`.`);

  expect(buildPattern(one('ab'), any)).toEqual(`ab.`);

  expect(buildPattern(one('ab'), any, one('c'))).toEqual(`ab.c`);
});

test('"anyOf" base cases', () => {
  expect(buildPattern(anyOf('a'))).toBe('a');
  expect(buildPattern(anyOf('abc'))).toBe('[abc]');
});

test('"anyOf" in context', () => {
  expect(buildPattern('x', anyOf('a'), 'x')).toBe('xax');
  expect(buildPattern('x', anyOf('abc'), 'x')).toBe('x[abc]x');
  expect(buildPattern('x', oneOrMore(anyOf('abc')), 'x')).toBe('x[abc]+x');
});

test('"anyOf" escapes special characters', () => {
  expect(buildPattern(anyOf('abc-+.'))).toBe('[-abc\\+\\.]');
});

test('"anyOf" moves hyphen to the first position', () => {
  expect(buildPattern(anyOf('a-bc'))).toBe('[-abc]');
});

test('`anyOf` throws on empty text', () => {
  expect(() => anyOf('')).toThrowErrorMatchingInlineSnapshot(
    `"\`anyOf\` should received at least one character"`
  );
});
