import { encodeAtom } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexComponentResult, RegexElement, RegexSequence } from '../types';

export interface OneOrMore extends RegexComponentResult {
  type: 'oneOrMore';
  children: RegexElement[];
}

export interface Optionally extends RegexComponentResult {
  type: 'optionally';
  children: RegexElement[];
}

export interface ZeroOrMore extends RegexComponentResult {
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

function encodeOneOrMore(this: OneOrMore): EncodeOutput {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}+`,
  };
}

function encodeOptionally(this: Optionally): EncodeOutput {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}?`,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeOutput {
  return {
    precedence: 'sequence',
    pattern: `${encodeAtom(this.children).pattern}*`,
  };
}
