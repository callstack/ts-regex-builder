import { buildRegExp, choiceOf, wordBoundary } from '..';

test('example: find specific words', () => {
  const wordsToFind = ['word', 'date'];

  const regex = buildRegExp([
    wordBoundary, // match whole words only
    choiceOf(...wordsToFind),
    wordBoundary,
  ]);

  expect(regex).toMatchString('word');
  expect(regex).toMatchString('some date');
  expect(regex).toMatchString('date and word');

  expect(regex).not.toMatchString('sword');
  expect(regex).not.toMatchString('keywords');
  expect(regex).not.toMatchString('words');
  expect(regex).not.toMatchString('update');
  expect(regex).not.toMatchString('dates');

  expect(regex).toEqualRegex(/\b(?:word|date)\b/);
});
