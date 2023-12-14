import type { RegexElement } from './types';
import { encodeSequence } from './encoder';

export type * from './types';

export { any, digit, whitespace, word } from './character-classes/base';
export { anyOf } from './character-classes/any-of';
export { one, oneOrMore, optionally, zeroOrMore } from './quantifiers/base';
export { repeat } from './quantifiers/repeat';
export { choiceOf } from './components/choiceOf';

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(...elements: RegexElement[]): RegExp {
  const pattern = encodeSequence(elements).pattern;
  return new RegExp(pattern);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(...elements: RegexElement[]): string {
  return encodeSequence(elements).pattern;
}
