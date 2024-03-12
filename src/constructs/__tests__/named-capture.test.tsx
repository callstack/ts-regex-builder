import { buildRegExp, namedCapture, oneOrMore } from '../..';

describe('namedCapture function', () => {
  it('should create a named capture group', () => {
    const regex = buildRegExp(namedCapture('a', 'group1'));
    const match = regex.exec('a');
    expect(match?.groups?.group1).toBe('a');
  });

  it('should not match when the named capture group does not match the input', () => {
    const regex = buildRegExp(namedCapture('a', 'group1'));
    const match = regex.exec('b');
    expect(match).toBeNull();
  });

  it('should handle multiple named capture groups', () => {
    const regex = buildRegExp(namedCapture(['a', namedCapture('b', 'group2')], 'group1'));
    const match = regex.exec('ab');
    expect(match).not.toBeNull();
    expect(match?.groups?.group1).toBe('ab');
    expect(match?.groups?.group2).toBe('b');
  });

  it('should handle nested named capture groups', () => {
    const regex = buildRegExp(namedCapture(['a', namedCapture('b', 'group2')], 'group1'));
    const match = regex.exec('ab');
    expect(match?.groups?.group1).toBe('ab');
    expect(match?.groups?.group2).toBe('b');
  });
});

describe('namedCapture RegEx matching', () => {
  test('`named-capture` pattern', () => {
    expect(namedCapture('a', 'abba')).toEqualRegex(/(?<abba>a)/);
    expect(namedCapture('abc', 'abc')).toEqualRegex(/(?<abc>abc)/);
    expect(namedCapture(oneOrMore('abc'), 'ababab')).toEqualRegex(/(?<ababab>(?:abc)+)/);
    expect(oneOrMore(namedCapture('abc', 'abacab'))).toEqualRegex(/(?<abacab>abc)+/);
  });

  test('`named-capture` matching', () => {
    expect(namedCapture('b', 'b')).toMatchGroups('ab', ['b', 'b']);
    expect(['a', namedCapture('b', 'b')]).toMatchGroups('ab', ['ab', 'b']);
    expect(['a', namedCapture('b', 'b'), namedCapture('c', 'c')]).toMatchGroups('abc', [
      'abc',
      'b',
      'c',
    ]);
  });
});
