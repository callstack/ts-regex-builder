import { encodeSequence } from '../encoder/encoder';
import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { toAtom } from '../encoder/utils';
import { asNodeArray } from '../utils/nodes';
import type { RegexElement, RegexNode } from './types';

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
    children: asNodeArray(children),
    encode: encodeOne,
  };
}

export function oneOrMore(children: RegexNode | RegexNode[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children: asNodeArray(children),
    encode: encodeOneOrMore,
  };
}

export function optionally(children: RegexNode | RegexNode[]): Optionally {
  return {
    type: 'optionally',
    children: asNodeArray(children),
    encode: encodeOptionally,
  };
}

export function zeroOrMore(children: RegexNode | RegexNode[]): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: asNodeArray(children),
    encode: encodeZeroOrMore,
  };
}

function encodeOne(this: One) {
  return encodeSequence(this.children);
}

function encodeOneOrMore(this: OneOrMore): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(encodeSequence(this.children))}+`,
  };
}

function encodeOptionally(this: Optionally): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(encodeSequence(this.children))}?`,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(encodeSequence(this.children))}*`,
  };
}
