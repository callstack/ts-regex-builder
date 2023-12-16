import { EncoderPrecedence, type EncoderNode } from '../encoder/types';
import { toAtom } from '../utils';
import type {
  One,
  OneOrMore,
  Optionally,
  RegexElement,
  ZeroOrMore,
} from './types';

export function one(...children: RegexElement[]): One {
  return {
    type: 'one',
    children,
  };
}

export function oneOrMore(...children: RegexElement[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
  };
}

export function optionally(...children: RegexElement[]): Optionally {
  return {
    type: 'optionally',
    children,
  };
}

export function zeroOrMore(...children: RegexElement[]): ZeroOrMore {
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
