import { capture, oneOrMore, regex, word } from '..';

test('example: extracting hashtags', () => {
  const hashtagFinder = regex([
    '#', // prettier break-line
    capture(oneOrMore(word)),
  ]).build({ global: true });

  expect(hashtagFinder).toMatchAllGroups('Hello #world!', [['#world', 'world']]);
  expect(hashtagFinder).toMatchAllGroups('#Hello #world!', [
    ['#Hello', 'Hello'],
    ['#world', 'world'],
  ]);

  expect(hashtagFinder).not.toMatchString('aa');
  expect(hashtagFinder).not.toMatchString('#');
  expect(hashtagFinder).not.toMatchString('a# ');

  expect(hashtagFinder).toEqualRegex(/#(\w+)/g);
});
