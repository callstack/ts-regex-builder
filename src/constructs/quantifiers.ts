import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import type { RegexSequence } from '../types';

export interface QuantifierOptions {
  greedy?: boolean;
}

export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}*${options?.greedy === false ? '?' : ''}`,
  };
}

export function oneOrMore(sequence: RegexSequence, options?: QuantifierOptions): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}+${options?.greedy === false ? '?' : ''}`,
  };
}

export function optional(sequence: RegexSequence, options?: QuantifierOptions): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(sequence).pattern}?${options?.greedy === false ? '?' : ''}`,
  };
}
