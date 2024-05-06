import { encodeSequence } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import type { RegexSequence } from '../types';

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
export function negativeLookbehind(sequence: RegexSequence): EncodedRegex {
  return {
    precedence: 'atom',
    pattern: `(?<!${encodeSequence(sequence).pattern})`,
  };
}
