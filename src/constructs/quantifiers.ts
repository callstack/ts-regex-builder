import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface ZeroOrMore extends RegexConstruct {
  type: 'zeroOrMore';
  children: RegexElement[];
}

export interface OneOrMore extends RegexConstruct {
  type: 'oneOrMore';
  children: RegexElement[];
}

export interface Optional extends RegexConstruct {
  type: 'optional';
  children: RegexElement[];
}

export function zeroOrMore(sequence: RegexSequence): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: ensureArray(sequence),
    encode: encodeZeroOrMore,
  };
}

export function oneOrMore(sequence: RegexSequence): OneOrMore {
  return {
    type: 'oneOrMore',
    children: ensureArray(sequence),
    encode: encodeOneOrMore,
  };
}

export function optional(sequence: RegexSequence): Optional {
  return {
    type: 'optional',
    children: ensureArray(sequence),
    encode: encodeOptional,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}*`,
  };
}

function encodeOneOrMore(this: OneOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}+`,
  };
}

function encodeOptional(this: Optional): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}?`,
  };
}
