import { nonCaptureGroup } from '../non-capture-group';
import { oneOrMore } from '../quantifiers';

test('`NonCaptureGroup` base cases', () => {
  expect(nonCaptureGroup('a')).toEqualRegex(/(:a)/);
  expect(nonCaptureGroup('abc')).toEqualRegex(/(:abc)/);
  expect(nonCaptureGroup(oneOrMore('abc'))).toEqualRegex(/(:(?:abc)+)/);
  expect(oneOrMore(nonCaptureGroup('abc'))).toEqualRegex(/(:abc)+/);
});

test('`NonCaptureGroup` does not capture group', () => {
  expect(nonCaptureGroup('b')).not.toMatchGroups('ab', ['b']);
  expect(['a', nonCaptureGroup('b')]).not.toMatchGroups('ab', ['ab']);
  expect(['a', nonCaptureGroup('b'), nonCaptureGroup('c')]).not.toMatchGroups('abc', ['abc']);
});

test('`NonCaptureGroup` with special characters', () => {
  expect(nonCaptureGroup('$')).toEqualRegex(/(:\$)/);
  expect(nonCaptureGroup('+')).toEqualRegex(/(:\+)/);
  expect(nonCaptureGroup('\\')).toEqualRegex(/(:\\)/);
});

test('`NonCaptureGroup` with quantifiers', () => {
  expect(nonCaptureGroup(oneOrMore('abc'))).toEqualRegex(/(:(?:abc)+)/);
  expect(nonCaptureGroup(oneOrMore('def'))).toEqualRegex(/(:(?:def)+)/);
  expect(nonCaptureGroup(oneOrMore('xyz'))).toEqualRegex(/(:(?:xyz)+)/);
});
