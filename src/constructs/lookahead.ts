import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

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
export interface Lookahead extends RegexConstruct {
  type: 'lookahead';
  children: RegexElement[];
}

export function lookahead(sequence: RegexSequence): Lookahead {
  return {
    type: 'lookahead',
    children: ensureArray(sequence),
    encode: encodeLookahead,
  };
}

function encodeLookahead(this: Lookahead): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(?=${encodeSequence(this.children).pattern})`,
  };
}
