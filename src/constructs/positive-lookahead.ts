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
 * positiveLookahead("a");
 * // /(?=a)/
 *
 * positiveLookahead(["a", "b", "c"]);
 * // /(?=abc)/
 * ```
 */
export interface PositiveLookahead extends RegexConstruct {
  type: 'PositiveLookahead';
  children: RegexElement[];
}

export function positiveLookahead(sequence: RegexSequence): PositiveLookahead {
  return {
    type: 'PositiveLookahead',
    children: ensureArray(sequence),
    encode: encodePositiveLookahead,
  };
}

function encodePositiveLookahead(this: PositiveLookahead): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(?=${encodeSequence(this.children).pattern})`,
  };
}
