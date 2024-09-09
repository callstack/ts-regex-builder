import { encodeAtomic } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';
import { ensureElements } from '../utils';

export interface QuantifierOptions {
  greedy?: boolean;
}

export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  const elements = ensureElements(sequence);
  return {
    type: 'sequence',
    pattern: `${encodeAtomic(elements)}*${options?.greedy === false ? '?' : ''}`,
  };
}

export function oneOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  const elements = ensureElements(sequence);
  return {
    type: 'sequence',
    pattern: `${encodeAtomic(elements)}+${options?.greedy === false ? '?' : ''}`,
  };
}

export function optional(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  const elements = ensureElements(sequence);
  return {
    type: 'sequence',
    pattern: `${encodeAtomic(elements)}?${options?.greedy === false ? '?' : ''}`,
  };
}
