import { oneOrMore, zeroOrMore } from '../quantifiers';
import { repeat } from '../repeat';
import { choiceOf } from '../choice-of';

test('`choiceOf` using basic strings', () => {
  expect(choiceOf('a')).toHavePattern(/a/);
  expect(choiceOf('a', 'b')).toHavePattern(/a|b/);
  expect(choiceOf('a', 'b', 'c')).toHavePattern(/a|b|c/);
  expect(choiceOf('aaa', 'bbb')).toHavePattern(/aaa|bbb/);
});

test('`choiceOf` used in sequence', () => {
  expect(['x', choiceOf('a'), 'x']).toHavePattern(/xax/);
  expect([choiceOf('a', 'b'), 'x']).toHavePattern(/(?:a|b)x/);
  expect(['x', choiceOf('a', 'b')]).toHavePattern(/x(?:a|b)/);

  expect(choiceOf('a', 'b', 'c')).toHavePattern(/a|b|c/);
  expect(['x', choiceOf('a', 'b', 'c')]).toHavePattern(/x(?:a|b|c)/);
  expect([choiceOf('a', 'b', 'c'), 'x']).toHavePattern(/(?:a|b|c)x/);

  expect(choiceOf('aaa', 'bbb')).toHavePattern(/aaa|bbb/);
});

test('`choiceOf` with sequence options', () => {
  expect([choiceOf(['a', 'b'])]).toHavePattern(/ab/);
  expect([choiceOf(['a', 'b'], ['c', 'd'])]).toHavePattern(/ab|cd/);
  expect([choiceOf(['a', zeroOrMore('b')], [oneOrMore('c'), 'd'])]).toHavePattern(/ab*|c+d/);
});

test('`choiceOf` using nested regex', () => {
  expect(choiceOf(oneOrMore('a'), zeroOrMore('b'))).toHavePattern(/a+|b*/);
  expect(choiceOf(repeat('a', { min: 1, max: 3 }), repeat('bx', { count: 5 }))).toHavePattern(
    /a{1,3}|(?:bx){5}/
  );
});

test('`choiceOf` throws on empty options', () => {
  expect(() => choiceOf()).toThrowErrorMatchingInlineSnapshot(
    `"\`choiceOf\` should receive at least one alternative"`
  );
});
