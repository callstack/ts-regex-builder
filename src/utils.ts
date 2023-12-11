import type { RegexElement } from './types';

/**
 * Wraps regex string in a non-capturing group if it is more than one character long.
 *
 * @param regex
 * @returns
 */
export function wrapGroup(regex: string): string {
  return regex.length === 1 ? regex : `(?:${regex})`;
}

// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions#escaping
export function escapeText(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
