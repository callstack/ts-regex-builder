import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

/**
 * Negative lookahead assertion.
 *
 * A negative lookahead assertion is a zero-width assertion that matches a group of characters only if it is not followed by a specific group of characters.
 *
 * @example
 * ```ts
 * negativeLookahead("a");
 * // /(?=a)/
 *
 * negativeLookahead(["a", "b", "c"]);
 * // /(?=abc)/
 * ```
 */
export function negativeLookahead(sequence: RegexSequence): EncodedRegex | null {
  const elements = ensureElements(sequence);
  if (elements.length === 0) {
    return null;
  }

  return {
    precedence: 'atom',
    pattern: `(?!${encode(sequence).pattern})`,
  };
}
