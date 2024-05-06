import { encodeSequence } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

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
export interface NegativeLookahead extends RegexConstruct {
  type: 'negativeLookahead';
  children: RegexElement[];
}

export function negativeLookahead(sequence: RegexSequence): NegativeLookahead {
  return {
    type: 'negativeLookahead',
    children: ensureArray(sequence),
    encode: encodeNegativeLookahead,
  };
}

function encodeNegativeLookahead(this: NegativeLookahead): EncodedRegex {
  return {
    precedence: 'atom',
    pattern: `(?!${encodeSequence(this.children).pattern})`,
  };
}
