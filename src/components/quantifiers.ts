import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { toArray, toAtom } from '../utils';
import type {
  One,
  OneOrMore,
  Optionally,
  RegexElement,
  ZeroOrMore,
} from './types';

export function one(children: RegexElement | RegexElement[]): One {
  return {
    type: 'one',
    children: toArray(children),
  };
}

export function oneOrMore(children: RegexElement | RegexElement[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children: toArray(children),
  };
}

export function optionally(
  children: RegexElement | RegexElement[]
): Optionally {
  return {
    type: 'optionally',
    children: toArray(children),
  };
}

export function zeroOrMore(
  children: RegexElement | RegexElement[]
): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children: toArray(children),
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
