import { positiveLookahead } from '../positive-lookahead';
import { capture } from '../capture';
import { oneOrMore, zeroOrMore } from '../quantifiers';
import { digit, word } from '../character-class';

test('`Positive Lookahead` base cases', () => {
  expect(positiveLookahead('a')).toEqualRegex(/(?=a)/);
  expect([digit, positiveLookahead('abc')]).toEqualRegex(/\d(?=abc)/);
  expect(positiveLookahead(oneOrMore('abc'))).toEqualRegex(/(?=(?:abc)+)/);
  expect([zeroOrMore(word), positiveLookahead('abc')]).toEqualRegex(/\w*(?=abc)/);
});

test('`Positive Lookahead` use cases', () => {
  expect([oneOrMore(digit), positiveLookahead('$')]).toMatchString('1 turkey costs 30$');
  expect(['q', positiveLookahead('u')]).toMatchString('queen');
  expect(['a', positiveLookahead('b'), positiveLookahead('c')]).not.toMatchString('abc');
  expect(['a', positiveLookahead(capture('bba'))]).toMatchGroups('abba', ['a', 'bba']);
});

test('`Positive Lookahead` with multiple elements', () => {
  expect(positiveLookahead(['a', 'b', 'c'])).toEqualRegex(/(?=abc)/);
});

test('`Positive Lookahead` with nested constructs', () => {
  expect(positiveLookahead(oneOrMore(capture('abc')))).toEqualRegex(/(?=(abc)+)/);
  expect(positiveLookahead([zeroOrMore(word), capture('abc')])).toEqualRegex(/(?=\w*(abc))/);
});

test('`Positive Lookahead` with special characters', () => {
  expect(positiveLookahead(['$', capture('abc')])).toEqualRegex(/(?=\$(abc))/);
  expect(positiveLookahead(['q', capture('u')])).toEqualRegex(/(?=q(u))/);
});

test('`Positive Lookahead` with capture group', () => {
  expect(positiveLookahead(capture('bba'))).toEqualRegex(/(?=(bba))/);
});

test('`Positive Lookahead` with digit character class', () => {
  expect(positiveLookahead([digit, 'abc'])).toEqualRegex(/(?=\dabc)/);
});
