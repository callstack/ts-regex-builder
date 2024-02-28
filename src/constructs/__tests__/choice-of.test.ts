import { choiceOf, oneOrMore, repeat, zeroOrMore } from '../..';

test('`choiceOf` pattern', () => {
  expect(choiceOf('a')).toEqualRegex(/a/);
  expect(choiceOf('a', 'b')).toEqualRegex(/a|b/);
  expect(choiceOf('a', 'b', 'c')).toEqualRegex(/a|b|c/);
  expect(choiceOf('aaa', 'bbb')).toEqualRegex(/aaa|bbb/);
});

test('`choiceOf` pattern in sequence', () => {
  expect(['x', choiceOf('a'), 'x']).toEqualRegex(/xax/);
  expect([choiceOf('a', 'b'), 'x']).toEqualRegex(/(?:a|b)x/);
  expect(['x', choiceOf('a', 'b')]).toEqualRegex(/x(?:a|b)/);

  expect(choiceOf('a', 'b', 'c')).toEqualRegex(/a|b|c/);
  expect(['x', choiceOf('a', 'b', 'c')]).toEqualRegex(/x(?:a|b|c)/);
  expect([choiceOf('a', 'b', 'c'), 'x']).toEqualRegex(/(?:a|b|c)x/);

  expect(choiceOf('aaa', 'bbb')).toEqualRegex(/aaa|bbb/);
});

test('`choiceOf` pattern with sequence options', () => {
  expect([choiceOf(['a', 'b'])]).toEqualRegex(/ab/);
  expect([choiceOf(['a', 'b'], ['c', 'd'])]).toEqualRegex(/ab|cd/);
  expect([choiceOf(['a', zeroOrMore('b')], [oneOrMore('c'), 'd'])]).toEqualRegex(/ab*|c+d/);
});

test('`choiceOf` pattern using nested regex', () => {
  expect(choiceOf(oneOrMore('a'), zeroOrMore('b'))).toEqualRegex(/a+|b*/);
  expect(choiceOf(repeat('a', { min: 1, max: 3 }), repeat('bx', 5))).toEqualRegex(
    /a{1,3}|(?:bx){5}/,
  );
});

test('`choiceOf` throws on empty options', () => {
  expect(() => choiceOf()).toThrowErrorMatchingInlineSnapshot(
    `"\`choiceOf\` should receive at least one alternative"`,
  );
});
