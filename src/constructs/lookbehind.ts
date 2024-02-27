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
 * lookbehind("a");
 * // /(?<=a)/
 *
 * lookbehind(["a", "b", "c"]);
 * // /(?<=abc)/
 * ```
 */
export interface Lookbehind extends RegexConstruct {
  type: 'lookbehind';
  children: RegexElement[];
}

export function lookbehind(sequence: RegexSequence): Lookbehind {
  return {
    type: 'lookbehind',
    children: ensureArray(sequence),
    encode: encodeLookbehind,
  };
}

function encodeLookbehind(this: Lookbehind): EncodeResult {
  return {
    precedence: 'atom',
    pattern: `(?<=${encodeSequence(this.children).pattern})`,
  };
}
