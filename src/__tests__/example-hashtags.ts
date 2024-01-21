import { buildRegExp } from '../builders';
import { capture, oneOrMore, word } from '../index';

test('example: extracting hashtags', () => {
  const regex = buildRegExp(
    [
      '#', // prettier break-line
      capture(oneOrMore(word)),
    ],
    { global: true },
  );

  expect(regex).toMatchAllGroups('Hello #world!', [['#world', 'world']]);
  expect(regex).toMatchAllGroups('#Hello #world!', [
    ['#Hello', 'Hello'],
    ['#world', 'world'],
  ]);

  expect(regex).not.toMatchString('aa');
  expect(regex).not.toMatchString('#');
  expect(regex).not.toMatchString('a# ');

  expect(regex).toHavePattern(/#(\w+)/g);
});
