import { buildRegex } from '../builders';

test('`regexBuilder` flags', () => {
  expect(buildRegex('a').flags).toBe('');
  expect(buildRegex({}, 'a').flags).toBe('');

  expect(buildRegex({ global: true }, 'a').flags).toBe('g');
  expect(buildRegex({ global: false }, 'a').flags).toBe('');

  expect(buildRegex({ ignoreCase: true }, 'a').flags).toBe('i');
  expect(buildRegex({ ignoreCase: false }, 'a').flags).toBe('');

  expect(buildRegex({ multiline: true }, 'a').flags).toBe('m');
  expect(buildRegex({ multiline: false }, 'a').flags).toBe('');

  expect(buildRegex({ hasIndices: true }, 'a').flags).toBe('d');
  expect(buildRegex({ hasIndices: false }, 'a').flags).toBe('');

  expect(buildRegex({ sticky: true }, 'a').flags).toBe('y');
  expect(buildRegex({ sticky: false }, 'a').flags).toBe('');

  expect(buildRegex({ global: true, ignoreCase: true, multiline: false }, 'a').flags).toBe('gi');
});
