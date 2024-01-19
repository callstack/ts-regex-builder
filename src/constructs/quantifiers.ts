import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { ensureArray } from '../utils/elements';
import type { RegexConstruct, RegexElement, RegexSequence } from '../types';

export interface OneOrMore extends RegexConstruct {
  type: 'oneOrMore';
  children: RegexElement[];
}

export interface Optionally extends RegexConstruct {
  type: 'optionally';
  children: RegexElement[];
}

export interface ZeroOrMore extends RegexConstruct {
  type: 'zeroOrMore';
  children: RegexElement[];
}

export function oneOrMore(sequence: RegexSequence): OneOrMore {
  return {
    type: 'oneOrMore',
    children: ensureArray(sequence),
    encode: encodeOneOrMore,
  };
}

export function optionally(sequence: RegexSequence): Optionally {
  return {
    type: 'optionally',
    children: ensureArray(sequence),
    encode: encodeOptionally,
  };
}

export function zeroOrMore(sequence: RegexSequence): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: ensureArray(sequence),
    encode: encodeZeroOrMore,
  };
}

function encodeOneOrMore(this: OneOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}+`,
  };
}

function encodeOptionally(this: Optionally): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}?`,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeResult {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}*`,
  };
}
