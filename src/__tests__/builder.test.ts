import { buildRegex } from '../builders';

test('`regexBuilder` flags', () => {
  expect(buildRegex('a').flags).toBe('');
  expect(buildRegex('a', {}).flags).toBe('');

  expect(buildRegex('a', { global: true }).flags).toBe('g');
  expect(buildRegex('a', { global: false }).flags).toBe('');

  expect(buildRegex('a', { ignoreCase: true }).flags).toBe('i');
  expect(buildRegex('a', { ignoreCase: false }).flags).toBe('');

  expect(buildRegex('a', { multiline: true }).flags).toBe('m');
  expect(buildRegex('a', { multiline: false }).flags).toBe('');

  expect(buildRegex('a', { hasIndices: true }).flags).toBe('d');
  expect(buildRegex('a', { hasIndices: false }).flags).toBe('');

  expect(buildRegex('a', { sticky: true }).flags).toBe('y');
  expect(buildRegex('a', { sticky: false }).flags).toBe('');

  expect(
    buildRegex('a', { global: true, ignoreCase: true, multiline: false }).flags
  ).toBe('gi');
});
