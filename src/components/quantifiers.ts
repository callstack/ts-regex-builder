import { encodeSequence } from '../encoder';
import { toAtom } from '../utils';
import {
  EncoderPrecedence,
  type EncoderResult,
  type RegexComponent,
} from '../types';

export interface One extends RegexComponent {
  type: 'one';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export interface OneOrMore extends RegexComponent {
  type: 'oneOrMore';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export interface Optionally extends RegexComponent {
  type: 'optionally';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export interface ZeroOrMore extends RegexComponent {
  type: 'zeroOrMore';
  children: Array<RegexComponent | string>;
  encode: () => EncoderResult;
}

export function one(...children: Array<RegexComponent | string>): One {
  return {
    type: 'one',
    children,
    encode: encodeOne,
  };
}

export function oneOrMore(
  ...children: Array<RegexComponent | string>
): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
    encode: encodeOneOrMore,
  };
}

export function optionally(
  ...children: Array<RegexComponent | string>
): Optionally {
  return {
    type: 'optionally',
    children,
    encode: encodeOptionally,
  };
}

export function zeroOrMore(
  ...children: Array<RegexComponent | string>
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
