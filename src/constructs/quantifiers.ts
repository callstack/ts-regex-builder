import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export type QuantifierBehavior = 'greedy' | 'lazy';

export type QuantifierOptions = { behavior?: QuantifierBehavior };

export interface ZeroOrMore extends RegexConstruct {
  type: 'zeroOrMore';
  children: RegexElement[];
  options: QuantifierOptions;
}

export interface OneOrMore extends RegexConstruct {
  type: 'oneOrMore';
  children: RegexElement[];
  behavior: QuantifierBehavior;
}

export interface Optional extends RegexConstruct {
  type: 'optional';
  children: RegexElement[];
  behavior: QuantifierBehavior;
}

export function zeroOrMore(sequence: RegexSequence, options?: QuantifierOptions): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    options: { behavior: validateBehavior(options?.behavior) },
    children: ensureArray(sequence),
    encode: encodeZeroOrMore,
  };
}

export function oneOrMore(sequence: RegexSequence, behavior?: QuantifierBehavior): OneOrMore {
  return {
    type: 'oneOrMore',
    behavior: validateBehavior(behavior),
    children: ensureArray(sequence),
    encode: encodeOneOrMore,
  };
}

export function optional(sequence: RegexSequence, behavior?: QuantifierBehavior): Optional {
  return {
    type: 'optional',
    behavior: validateBehavior(behavior),
    children: ensureArray(sequence),
    encode: encodeOptional,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}*${this.options.behavior === 'lazy' ? '?' : ''}`,
  };
}

function encodeOneOrMore(this: OneOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}+${this.behavior === 'lazy' ? '?' : ''}`,
  };
}

function encodeOptional(this: Optional): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}?${this.behavior === 'lazy' ? '?' : ''}`,
  };
}

export function validateBehavior(behavior: QuantifierBehavior | undefined): QuantifierBehavior {
  if (behavior !== undefined && behavior !== 'lazy' && behavior !== 'greedy') {
    throw new Error(`Invalid quantifier behavior: ${behavior}`);
  }

  return behavior ?? 'greedy';
}
