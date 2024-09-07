import { encodeAtomic } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

export function repeat(sequence: RegexSequence, options: RepeatOptions): EncodedRegex {
  const elements = Array.isArray(sequence) ? sequence : [sequence];
  if (elements.length === 0) {
    throw new Error('Expected at least one element');
  }

  if (typeof options === 'number') {
    return {
      precedence: 'sequence',
      pattern: `${encodeAtomic(elements)}{${options}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${encodeAtomic(elements)}{${options.min},${options?.max ?? ''}}${
      options.greedy === false ? '?' : ''
    }`,
  };
}
