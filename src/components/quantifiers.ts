import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
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

export function encodeOne(node: EncoderNode) {
  return node;
}

export function encodeOneOrMore(node: EncoderNode): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}+`,
  };
}

export function encodeOptionally(node: EncoderNode): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}?`,
  };
}

export function encodeZeroOrMore(node: EncoderNode): EncoderNode {
  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}*`,
  };
}
