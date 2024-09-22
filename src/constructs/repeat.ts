import { encodeAtomic } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

/**
 * Options for the `repeat` function.
 *
 * @param min - Minimum number of times to match.
 * @param max - Maximum number of times to match (default: unlimited).
 * @param greedy - Whether to use greedy quantifiers (default: true).
 */
export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

/**
 * Creates a quantifier which matches the given sequence a specific number of times.
 *
 * @param sequence - Sequence to match.
 * @param options - Quantifier options.
 */
export function repeat(sequence: RegexSequence, options: RepeatOptions): EncodedRegex {
  const elements = ensureElements(sequence);

  if (typeof options === 'number') {
    return {
      precedence: 1,
      pattern: `${encodeAtomic(elements)}{${options}}`,
    };
  }

  return {
    precedence: 1,
    pattern: `${encodeAtomic(elements)}{${options.min},${options?.max ?? ''}}${
      options.greedy === false ? '?' : ''
    }`,
  };
}
