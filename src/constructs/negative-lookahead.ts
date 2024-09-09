import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

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
export function negativeLookahead(sequence: RegexSequence): EncodedRegex {
  return {
    type: 'atom',
    pattern: `(?!${encode(sequence).pattern})`,
  };
}
