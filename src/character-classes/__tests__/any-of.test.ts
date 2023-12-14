import { buildPattern } from '../..';
import { oneOrMore } from '../../quantifiers/base';
import { anyOf } from '../any-of';

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
