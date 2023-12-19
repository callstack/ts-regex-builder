import { encodeSequence } from '../encoder/encoder';
import { EncoderPrecedence, type EncoderResult } from '../encoder/types';
import { toAtom } from '../utils';
import type {
  One,
  OneOrMore,
  Optionally,
  RegexElement,
  ZeroOrMore,
} from './types';

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
