import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface QuantifierOptions {
  greedy?: boolean;
}
export interface ZeroOrMore extends RegexConstruct {
  type: 'zeroOrMore';
  children: RegexElement[];
  options?: QuantifierOptions;
}

export interface OneOrMore extends RegexConstruct {
  type: 'oneOrMore';
  children: RegexElement[];
  options?: QuantifierOptions;
}

export interface Optional extends RegexConstruct {
  type: 'optional';
  children: RegexElement[];
  options?: QuantifierOptions;
}

export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: ensureArray(sequence),
    options,
    encode: encodeZeroOrMore,
  };
}

export function oneOrMore(sequence: RegexSequence, options?: QuantifierOptions): OneOrMore {
  return {
    type: 'oneOrMore',
    children: ensureArray(sequence),
    options,
    encode: encodeOneOrMore,
  };
}

export function optional(sequence: RegexSequence, options?: QuantifierOptions): Optional {
  return {
    type: 'optional',
    children: ensureArray(sequence),
    options,
    encode: encodeOptional,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}*${this.options?.greedy === false ? '?' : ''}`,
  };
}

function encodeOneOrMore(this: OneOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}+${this.options?.greedy === false ? '?' : ''}`,
  };
}

function encodeOptional(this: Optional): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}?${this.options?.greedy === false ? '?' : ''}`,
  };
}
