import { buildPattern } from '../../builders';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';
import { choiceOf } from '../choice-of';
import { expectPattern } from '../../test-utils';

test('"choiceOf" using basic strings', () => {
  expectPattern(choiceOf('a')).toBe('a');
  expectPattern(choiceOf('a', 'b')).toBe('a|b');
  expectPattern(choiceOf('a', 'b', 'c')).toBe('a|b|c');
  expectPattern(choiceOf('aaa', 'bbb')).toBe('aaa|bbb');
});

test('"choiceOf" used in sequence', () => {
  expectPattern('x', choiceOf('a'), 'x').toBe('xax');
  expectPattern(choiceOf('a', 'b'), 'x').toBe('(?:a|b)x');
  expectPattern('x', choiceOf('a', 'b')).toBe('x(?:a|b)');

  expectPattern(choiceOf('a', 'b', 'c')).toBe('a|b|c');
  expectPattern('x', choiceOf('a', 'b', 'c')).toBe('x(?:a|b|c)');
  expectPattern(choiceOf('a', 'b', 'c'), 'x').toBe('(?:a|b|c)x');

  expectPattern(choiceOf('aaa', 'bbb')).toBe('aaa|bbb');
});

test('"choiceOf" using nested regex', () => {
  expectPattern(choiceOf(oneOrMore('a'), zeroOrMore('b'))).toBe('a+|b*');
  expect(
    buildPattern(
      choiceOf(repeat({ min: 1, max: 3 }, 'a'), repeat({ count: 5 }, 'bx'))
    )
  ).toBe('a{1,3}|(?:bx){5}');
});

test('`choiceOf` throws on empty options', () => {
  expect(() => choiceOf()).toThrowErrorMatchingInlineSnapshot(
    `"\`choiceOf\` should receive at least one option"`
  );
});
