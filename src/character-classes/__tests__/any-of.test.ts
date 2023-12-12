import { buildPattern as p } from '../../compiler';
import { oneOrMore } from '../../quantifiers/base';
import { anyOf } from '../any-of';

test('"anyOf" base cases', () => {
  expect(p(anyOf(''))).toBe('');
  expect(p(anyOf('a'))).toBe('a');
  expect(p(anyOf('abc'))).toBe('[abc]');
});

test('"anyOf" in context', () => {
  expect(p('x', anyOf('a'), 'x')).toBe('xax');
  expect(p('x', anyOf('abc'), 'x')).toBe('x[abc]x');
  expect(p('x', oneOrMore(anyOf('abc')), 'x')).toBe('x[abc]+x');
});

test('"anyOf" escapes special characters', () => {
  expect(p(anyOf('abc-+.'))).toBe('[-abc\\+\\.]');
});

test('"anyOf" moves hyphen to the first position', () => {
  expect(p(anyOf('a-bc'))).toBe('[-abc]');
});
