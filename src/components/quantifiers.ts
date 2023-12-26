import { encodeAtom, encodeSequence } from '../encoder/encoder';
import type { EncodeOutput } from '../encoder/types';
import { asArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from '../types';

export interface One extends RegexElement {
  type: 'one';
  children: RegexNode[];
}

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

export function one(children: RegexNode | RegexNode[]): One {
  return {
    type: 'one',
    children: asArray(children),
    encode: encodeOne,
  };
}

export function oneOrMore(children: RegexNode | RegexNode[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children: asArray(children),
    encode: encodeOneOrMore,
  };
}

export function optionally(children: RegexNode | RegexNode[]): Optionally {
  return {
    type: 'optionally',
    children: asArray(children),
    encode: encodeOptionally,
  };
}

export function zeroOrMore(children: RegexNode | RegexNode[]): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: asArray(children),
    encode: encodeZeroOrMore,
  };
}

function encodeOne(this: One) {
  return encodeSequence(this.children);
}

function encodeOneOrMore(this: OneOrMore): EncodeOutput {
  const atomicChildren = encodeAtom(this.children);
  return {
    precedence: 'sequence',
    pattern: `${atomicChildren.pattern}+`,
  };
}

function encodeOptionally(this: Optionally): EncodeOutput {
  const atomicChildren = encodeAtom(this.children);
  return {
    precedence: 'sequence',
    pattern: `${atomicChildren.pattern}?`,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncodeOutput {
  const atomicChildren = encodeAtom(this.children);
  return {
    precedence: 'sequence',
    pattern: `${atomicChildren.pattern}*`,
  };
}
