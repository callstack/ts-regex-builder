import { encodeCharacterClass } from '../encoder';

test('buildPattern throws on empty text', () => {
  expect(() =>
    encodeCharacterClass({
      type: 'characterClass',
      characters: [],
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Character class should contain at least one character"`
  );
});
