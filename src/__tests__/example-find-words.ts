import { buildRegExp, choiceOf, wordBoundary } from '..';

test('example: find specific words', () => {
  const wordsToFind = ['word', 'date'];

  const regex = buildRegExp([
    wordBoundary, // match whole words only
    choiceOf(...wordsToFind),
    wordBoundary,
  ]);

  expect(regex).toMatchString('word', { exactString: false });
  expect(regex).toMatchString('some date', { exactString: false });
  expect(regex).toMatchString('date and word', { exactString: false });

  expect(regex).not.toMatchString('sword', { exactString: false });
  expect(regex).not.toMatchString('keywords', { exactString: false });
  expect(regex).not.toMatchString('words', { exactString: false });
  expect(regex).not.toMatchString('update', { exactString: false });
  expect(regex).not.toMatchString('dates', { exactString: false });

  expect(regex).toEqualRegex(/\b(?:word|date)\b/);
});
