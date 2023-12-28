import { endOfString, startOfString } from '../anchors';
import { oneOrMore } from '../quantifiers';

test('`startOfString` basic cases', () => {
  expect(startOfString).toHavePattern(/^/);
  expect([startOfString, 'a', 'b']).toHavePattern(/^ab/);
});

test('`startOfString` regex tests', () => {
  expect([startOfString, oneOrMore('a')]).toMatchGroups('a aa aaa', ['a']);
});

test('`endOfString` basic cases', () => {
  expect(endOfString).toHavePattern(/$/);
  expect(['a', 'b', endOfString]).toHavePattern(/ab$/);
});

test('`endOfString` regex tests', () => {
  expect([oneOrMore('a'), endOfString]).toMatchGroups('a aa aaa', ['aaa']);
});
