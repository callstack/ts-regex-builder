import { encodeAtomicPattern } from '../encoder';
import { ensureArray } from '../utils/elements';
import type { EncodedRegex, RegexSequence } from '../types';

export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

export function repeat(sequence: RegexSequence, options: RepeatOptions): EncodedRegex {
  const children = ensureArray(sequence);

  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  if (typeof options === 'number') {
    return {
      precedence: 'sequence',
      pattern: `${encodeAtomicPattern(sequence)}{${options}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${encodeAtomicPattern(sequence)}{${options.min},${options?.max ?? ''}}${
      options.greedy === false ? '?' : ''
    }`,
  };
}
