import { buildRegExp, namedBackreference, namedCapture } from '../..';

describe('named-backreference function', () => {
  it('should create a backreference to a previously captured group', () => {
    const group = namedCapture('a', 'groupA');
    const groupRef = namedBackreference('groupA');
    const groupRegex = buildRegExp([group, groupRef]);

    const match = groupRegex.exec('aa');
    expect(match).not.toBeNull();
    expect(match?.[0]).toBe('aa');
  });

  it('should not match when the backreference does not match the captured group', () => {
    const group = namedCapture('a', 'groupA');
    const groupRef = namedBackreference('groupA');
    const groupRegex = buildRegExp([group, groupRef]);

    const match = groupRegex.exec('a\\1');
    expect(match).toBeNull();
  });

  it('should allow references in multiple backreferences', () => {
    const group1 = namedCapture('a', 'groupA');
    const group2 = namedCapture('b', 'groupB');
    const groupARef = namedBackreference('groupA');
    const groupBRef = namedBackreference('groupB');
    const groupRegex = buildRegExp([group1, group2, groupARef, groupBRef]);

    const match = groupRegex.exec('aabb');
    expect(match).toBeNull();
  });

  it('should handle multiple valid backreferences', () => {
    const group1 = namedCapture('ab', 'groupA');
    const group2 = namedCapture('ba', 'groupB');
    const groupARef = namedBackreference('groupA');
    const groupBRef = namedBackreference('groupB');
    const groupRegex = buildRegExp([group1, group2, groupARef, groupBRef]);
    const match = groupRegex.exec('abbaabba');
    expect(match).not.toBeNull();
  });
});
