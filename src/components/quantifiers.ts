import { encodeSequence } from '../encoder';
import { toAtom } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexElement,
} from '../types';

export interface One extends RegexElement {
  type: 'one';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

export interface OneOrMore extends RegexElement {
  type: 'oneOrMore';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

export interface Optionally extends RegexElement {
  type: 'optionally';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

export interface ZeroOrMore extends RegexElement {
  type: 'zeroOrMore';
  children: Array<RegexElement | string>;
  encode: () => EncoderResult;
}

export function one(...children: Array<RegexElement | string>): One {
  return {
    type: 'one',
    children,
    encode: encodeOne,
  };
}

export function oneOrMore(
  ...children: Array<RegexElement | string>
): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
    encode: encodeOneOrMore,
  };
}

export function optionally(
  ...children: Array<RegexElement | string>
): Optionally {
  return {
    type: 'optionally',
    children,
    encode: encodeOptionally,
  };
}

export function zeroOrMore(
  ...children: Array<RegexElement | string>
): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children,
    encode: encodeZeroOrMore,
  };
}

function encodeOne(this: One): EncoderResult {
  return encodeSequence(this.children);
}

function encodeOneOrMore(this: OneOrMore): EncoderResult {
  const children = encodeSequence(this.children);
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(children)}+`,
  };
}

function encodeOptionally(this: Optionally): EncoderResult {
  const children = encodeSequence(this.children);
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(children)}?`,
  };
}

function encodeZeroOrMore(this: ZeroOrMore): EncoderResult {
  const children = encodeSequence(this.children);
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(children)}*`,
  };
}
