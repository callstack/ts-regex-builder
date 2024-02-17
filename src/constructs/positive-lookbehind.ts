import { encodeSequence } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

/**
 * Positive lookbehind assertion.
 *
 * A positive lookbehind assertion is a zero-width assertion that matches a group of characters only if it is preceded by a specific group of characters.
 *
 * @example
 * ```ts
 * positiveLookbehind("a");
 * // /(?<=a)/
 *
 * positiveLookbehind(["a", "b", "c"]);
 * // /(?<=abc)/
 * ```
 */
export interface PositiveLookbehind extends RegexConstruct {
  type: 'PositiveLookbehind';
  children: RegexElement[];
}

export function positiveLookbehind(sequence: RegexSequence): PositiveLookbehind {
  return {
    type: 'PositiveLookbehind',
    children: ensureArray(sequence),
    encode: encodePositiveLookbehind,
  };
}

function encodePositiveLookbehind(this: PositiveLookbehind): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(?<=${encodeSequence(this.children).pattern})`,
  };
}
