import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';
/**
 * Negative lookbehind assertion.
 *
 * A negative lookbehind assertion is a zero-width assertion that matches a group of characters only if it is not preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * negativeLookbehind("a");
 * // /(?<!a)/
 *
 * negativeLookbehind(["a", "b", "c"]);
 * // /(?<!abc)/
 * ```
 */
export function negativeLookbehind(sequence: RegexSequence): EncodedRegex | null {
  const elements = ensureElements(sequence);
  if (elements.length === 0) {
    return null;
  }

  return {
    precedence: 'atom',
    pattern: `(?<!${encode(sequence).pattern})`,
  };
}
