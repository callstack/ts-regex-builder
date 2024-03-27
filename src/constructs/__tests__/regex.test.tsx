import { regex } from '../..';

test('`regex` no-op pattern', () => {
  expect(regex('a')).toEqualRegex(/a/);
  expect(regex(['a', 'b'])).toEqualRegex(/ab/);
  expect([regex('a'), regex(['b', 'c'])]).toEqualRegex(/abc/);
});

test('`regex` throws on empty children', () => {
  expect(() => regex([])).toThrowErrorMatchingInlineSnapshot(
    `"\`regex\` should receive at least one element"`,
  );
});
