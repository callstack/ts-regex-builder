import { backreference, buildRegExp, capture } from '../..';

describe('backreference function', () => {
  it('should create a backreference to a previously captured group', () => {
    const group = capture('a');
    const backRef = backreference(1);
    const groupRegex = buildRegExp([group, backRef]);

    const match = groupRegex.exec('aa');
    expect(match).not.toBeNull();
    expect(match?.[0]).toBe('aa');
  });

  it('should not match when the backreference does not match the captured group', () => {
    const group = capture('a');
    const backRef = backreference(1);
    const groupRegex = buildRegExp([group, backRef]);

    const match = groupRegex.exec('a\\1');
    expect(match).toBeNull();
  });

  it('should allow references in multiple backreferences', () => {
    const group1 = capture('a');
    const group2 = capture('b');
    const backRef1 = backreference(1);
    const backRef2 = backreference(2);
    const groupRegex = buildRegExp([group1, group2, backRef1, backRef2]);
    const match = groupRegex.exec('aabb');
    expect(match).toBeNull();
  });

  it('should handle multiple valid backreferences', () => {
    const group1 = capture('a');
    const group2 = capture('b');
    const backRef1 = backreference(1);
    const backRef2 = backreference(2);
    const groupRegex = buildRegExp([group1, group2, backRef1, backRef2]);

    const match = groupRegex.exec('aabb');
    expect(match).toBeNull();
  });
});

it('should handle backreferences in different order', () => {
  const group1 = capture('a');
  const group2 = capture('b');
  const backRef1 = backreference(2);
  const backRef2 = backreference(1);
  const groupRegex = buildRegExp([group1, group2, backRef1, backRef2]);

  const match = groupRegex.exec('abba');
  expect(match).not.toBeNull();
  expect(match?.[0]).toBe('abba');
});

it('should not match when the backreference does not match the captured group', () => {
  const group = capture('a');
  const backRef = backreference(1);
  const groupRegex = buildRegExp([group, backRef]);

  const match = groupRegex.exec('abba');
  expect(match).toBeNull();
});

it('should handle multiple backreferences to the same group', () => {
  const group1 = capture('a');
  const backRef1 = backreference(1);
  const backRef2 = backreference(1);
  const groupRegex = buildRegExp([group1, backRef1, backRef2]);

  const match = groupRegex.exec('aaa');
  expect(match).not.toBeNull();
  expect(match?.[0]).toBe('aaa');
});
