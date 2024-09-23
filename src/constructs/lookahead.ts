import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

/**
 * Positive lookahead assertion.
 *
 * A positive lookahead assertion is a zero-width assertion that matches a group of characters only if it is followed by a specific group of characters.
 *
 * @example
 * ```ts
 * lookahead("a");
 * // /(?=a)/
 *
 * lookahead(["a", "b", "c"]);
 * // /(?=abc)/
 * ```
 */
export function lookahead(sequence: RegexSequence): EncodedRegex | null {
  const elements = ensureElements(sequence);
  if (elements.length === 0) {
    return null;
  }

  return {
    precedence: 'atom',
    pattern: `(?=${encode(sequence).pattern})`,
  };
}
