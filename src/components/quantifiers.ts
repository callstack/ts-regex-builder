import { type EncoderResult, EncoderPrecedence } from '../encoder/types';
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
  };
}

export function oneOrMore(
  ...children: Array<RegexElement | string>
): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
  };
}

export function optionally(
  ...children: Array<RegexElement | string>
): Optionally {
  return {
    type: 'optionally',
    children,
  };
}

export function zeroOrMore(
  ...children: Array<RegexElement | string>
): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children,
  };
}

export function encodeOne(node: EncoderResult) {
  return node;
}

export function encodeOneOrMore(node: EncoderResult): EncoderResult {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}+`,
  };
}

export function encodeOptionally(node: EncoderResult): EncoderResult {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}?`,
  };
}

export function encodeZeroOrMore(node: EncoderResult): EncoderResult {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}*`,
  };
}
