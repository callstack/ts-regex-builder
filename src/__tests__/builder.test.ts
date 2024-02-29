import { regex } from '..';

test('`regexBuilder` flags', () => {
  expect(regex('a').build().flags).toBe('');
  expect(regex('a').build({}).flags).toBe('');

  expect(regex('a').build({ global: true }).flags).toBe('g');
  expect(regex('a').build({ global: false }).flags).toBe('');

  expect(regex('a').build({ ignoreCase: true }).flags).toBe('i');
  expect(regex('a').build({ ignoreCase: false }).flags).toBe('');

  expect(regex('a').build({ multiline: true }).flags).toBe('m');
  expect(regex('a').build({ multiline: false }).flags).toBe('');

  expect(regex('a').build({ hasIndices: true }).flags).toBe('d');
  expect(regex('a').build({ hasIndices: false }).flags).toBe('');

  expect(
    regex('a').build({
      global: true, //
      ignoreCase: true,
      multiline: false,
    }).flags,
  ).toBe('gi');
});
