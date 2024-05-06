import { encodeAtom } from '../encoder/encoder';
import type { EncodedRegex } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexSequence } from '../types';

export type RepeatOptions = number | { min: number; max?: number; greedy?: boolean };

export function repeat(sequence: RegexSequence, options: RepeatOptions): EncodedRegex {
  const children = ensureArray(sequence);

  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  const atomicNodes = encodeAtom(sequence);

  if (typeof options === 'number') {
    return {
      precedence: 'sequence',
      pattern: `${atomicNodes.pattern}{${options}}`,
    };
  }

  return {
    precedence: 'sequence',
    pattern: `${atomicNodes.pattern}{${options.min},${options?.max ?? ''}}${
      options.greedy === false ? '?' : ''
    }`,
  };
}
