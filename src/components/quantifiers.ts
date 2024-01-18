import { encodeAtom } from '../encoder/encoder';
import type { EncodeResult } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexOperator, RegexSequence } from '../types';

export interface OneOrMore extends RegexOperator {
  type: 'oneOrMore';
  children: RegexElement[];
}

export interface Optionally extends RegexOperator {
  type: 'optionally';
  children: RegexElement[];
}

export interface ZeroOrMore extends RegexOperator {
  type: 'zeroOrMore';
  children: RegexElement[];
}

export function oneOrMore(sequence: RegexSequence): OneOrMore {
  return {
    type: 'oneOrMore',
    children: asNodeArray(sequence),
    encode: encodeOneOrMore,
  };
}

export function optionally(sequence: RegexSequence): Optionally {
  return {
    type: 'optionally',
    children: asNodeArray(sequence),
    encode: encodeOptionally,
  };
}

export function zeroOrMore(sequence: RegexSequence): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: asNodeArray(sequence),
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
