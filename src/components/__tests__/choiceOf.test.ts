import { buildPattern } from '../../compiler';
import { oneOrMore, zeroOrMore } from '../../quantifiers/base';
import { repeat } from '../../quantifiers/repeat';
import { choiceOf } from '../choiceOf';

test('"choiceOf" using basic strings', () => {
  expect(buildPattern(choiceOf('a'))).toEqual('a');
  expect(buildPattern(choiceOf('a', 'b'))).toEqual('a|b');
  expect(buildPattern(choiceOf('a', 'b', 'c'))).toEqual('a|b|c');
  expect(buildPattern(choiceOf('aaa', 'bbb'))).toEqual('aaa|bbb');
});

test('"choiceOf" used in sequence', () => {
  expect(buildPattern('x', choiceOf('a'), 'x')).toEqual('xax');
  expect(buildPattern(choiceOf('a', 'b'), 'x')).toEqual('(?:a|b)x');
  expect(buildPattern('x', choiceOf('a', 'b'))).toEqual('x(?:a|b)');

  expect(buildPattern(choiceOf('a', 'b', 'c'))).toEqual('a|b|c');
  expect(buildPattern('x', choiceOf('a', 'b', 'c'))).toEqual('x(?:a|b|c)');
  expect(buildPattern(choiceOf('a', 'b', 'c'), 'x')).toEqual('(?:a|b|c)x');

  expect(buildPattern(choiceOf('aaa', 'bbb'))).toEqual('aaa|bbb');
});

test('"choiceOf" using nested regex', () => {
  expect(buildPattern(choiceOf(oneOrMore('a'), zeroOrMore('b')))).toBe('a+|b*');
  expect(
    buildPattern(
      choiceOf(repeat({ min: 1, max: 3 }, 'a'), repeat({ count: 5 }, 'bx'))
    )
  ).toBe('a{1,3}|(?:bx){5}');
});
