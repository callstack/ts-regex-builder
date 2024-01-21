import { endOfString, startOfString } from '../anchors';
import { oneOrMore } from '../quantifiers';

test('`startOfString` basic cases', () => {
  expect(startOfString).toEqualRegex(/^/);
  expect([startOfString, 'a', 'b']).toEqualRegex(/^ab/);
});

test('`startOfString` regex tests', () => {
  expect([startOfString, oneOrMore('a')]).toMatchGroups('a aa aaa', ['a']);
});

test('`endOfString` basic cases', () => {
  expect(endOfString).toEqualRegex(/$/);
  expect(['a', 'b', endOfString]).toEqualRegex(/ab$/);
});

test('`endOfString` regex tests', () => {
  expect([oneOrMore('a'), endOfString]).toMatchGroups('a aa aaa', ['aaa']);
});
