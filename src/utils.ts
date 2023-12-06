/**
 * Wraps regex string in a non-capturing group if it is more than one character long.
 *
 * @param regex
 * @returns
 */
export function wrapGroup(regex: string): string {
  return regex.length === 1 ? regex : `(?:${regex})`;
}
