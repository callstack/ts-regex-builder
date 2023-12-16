import type { RegexElement } from './components/types';
import { encodeSequence } from './encoder/encoder';

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
