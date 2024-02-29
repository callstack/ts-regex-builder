import { choiceOf, regex, wordBoundary } from '..';

test('example: find specific words', () => {
  const wordsToFind = ['word', 'date'];

  const wordsRegex = regex([
    wordBoundary, // match whole words only
    choiceOf(...wordsToFind),
    wordBoundary,
  ]).build();

  expect(wordsRegex).toMatchString('word');
  expect(wordsRegex).toMatchString('some date');
  expect(wordsRegex).toMatchString('date and word');

  expect(wordsRegex).not.toMatchString('sword');
  expect(wordsRegex).not.toMatchString('keywords');
  expect(wordsRegex).not.toMatchString('words');
  expect(wordsRegex).not.toMatchString('update');
  expect(wordsRegex).not.toMatchString('dates');

  expect(wordsRegex).toEqualRegex(/\b(?:word|date)\b/);
});
