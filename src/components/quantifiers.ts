import { encodeAtom } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface OneOrMore extends RegexElement {
  type: 'oneOrMore';
  children: RegexNode[];
}

export interface Optionally extends RegexElement {
  type: 'optionally';
  children: RegexNode[];
}

export interface ZeroOrMore extends RegexElement {
  type: 'zeroOrMore';
  children: RegexNode[];
}

export function oneOrMore(nodes: RegexNode | RegexNode[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children: asNodeArray(nodes),
    encode: encodeOneOrMore,
  };
}

export function optionally(nodes: RegexNode | RegexNode[]): Optionally {
  return {
    type: 'optionally',
    children: asNodeArray(nodes),
    encode: encodeOptionally,
  };
}

export function zeroOrMore(nodes: RegexNode | RegexNode[]): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: asNodeArray(nodes),
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
