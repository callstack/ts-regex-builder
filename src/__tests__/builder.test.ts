import { buildRegExp } from '../builders';

test('`regexBuilder` flags', () => {
  expect(buildRegExp('a').flags).toBe('');
  expect(buildRegExp('a', {}).flags).toBe('');

  expect(buildRegExp('a', { global: true }).flags).toBe('g');
  expect(buildRegExp('a', { global: false }).flags).toBe('');

  expect(buildRegExp('a', { ignoreCase: true }).flags).toBe('i');
  expect(buildRegExp('a', { ignoreCase: false }).flags).toBe('');

  expect(buildRegExp('a', { multiline: true }).flags).toBe('m');
  expect(buildRegExp('a', { multiline: false }).flags).toBe('');

  expect(buildRegExp('a', { hasIndices: true }).flags).toBe('d');
  expect(buildRegExp('a', { hasIndices: false }).flags).toBe('');

  expect(buildRegExp('a', { sticky: true }).flags).toBe('y');
  expect(buildRegExp('a', { sticky: false }).flags).toBe('');

  expect(
    buildRegExp('a', {
      global: true, //
      ignoreCase: true,
      multiline: false,
    }).flags,
  ).toBe('gi');
});
