import { encode } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

/**
 * Positive lookbehind assertion.
 *
 * A positive lookbehind assertion is a zero-width assertion that matches a group of characters only if it is preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * lookbehind("a");
 * // /(?<=a)/
 *
 * lookbehind(["a", "b", "c"]);
 * // /(?<=abc)/
 * ```
 */
export function lookbehind(sequence: RegexSequence): EncodedRegex {
  return {
    precedence: 0,
    pattern: `(?<=${encode(sequence).pattern})`,
  };
}
