import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

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
export function lookahead(sequence: RegexSequence): EncodedRegex {
  return {
    precedence: 0,
    pattern: `(?=${encode(sequence).pattern})`,
  };
}
