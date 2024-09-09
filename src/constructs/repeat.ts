import { encodeAtomic } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

export function repeat(sequence: RegexSequence, options: RepeatOptions): EncodedRegex {
  const elements = ensureElements(sequence);

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
