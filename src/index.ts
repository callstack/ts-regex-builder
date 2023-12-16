import type { RegexElement } from './components/types';
import { encodeSequence } from './encoder/encoder';

export type * from './components/types';

export {
  any,
  anyOf,
  digit,
  whitespace,
  word,
} from './components/character-class';
export { choiceOf } from './components/choice-of';
export {
  one,
  oneOrMore,
  optionally,
  zeroOrMore,
} from './components/quantifiers';
export { repeat } from './components/repeat';

/**
 * Generate RegExp object for elements.
 *
 * @param elements
 * @returns
 */
export function buildRegex(...elements: Array<RegexElement | string>): RegExp {
  const pattern = encodeSequence(elements).pattern;
  return new RegExp(pattern);
}

/**
 * Generate regex pattern for elements.
 * @param elements
 * @returns
 */
export function buildPattern(
  ...elements: Array<RegexElement | string>
): string {
  return encodeSequence(elements).pattern;
}
