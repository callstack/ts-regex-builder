import { encodeAtom } from '../encoder';
import type { EncodedRegex, RegexSequence } from '../types';

export interface QuantifierOptions {
  greedy?: boolean;
}

export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}*${options?.greedy === false ? '?' : ''}`,
  };
}

export function oneOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}+${options?.greedy === false ? '?' : ''}`,
  };
}

export function optional(sequence: RegexSequence, options?: QuantifierOptions): EncodedRegex {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}?${options?.greedy === false ? '?' : ''}`,
  };
}
