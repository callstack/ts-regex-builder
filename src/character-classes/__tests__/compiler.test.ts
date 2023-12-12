import { compileCharacterClass } from '../compiler';

test('buildPattern throws on empty text', () => {
  expect(() =>
    compileCharacterClass({
      type: 'characterClass',
      characters: [],
    })
  ).toThrowErrorMatchingInlineSnapshot(
    `"Character class should contain at least one character"`
  );
});
