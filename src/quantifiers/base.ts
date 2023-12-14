import type {
  One,
  OneOrMore,
  Optionally,
  Quantifier,
  RegexElement,
  ZeroOrMore,
} from '../types';
import { toAtom } from '../utils';
import { EncoderPriority, type EncoderNode } from '../types-internal';

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

export const baseQuantifiers = {
  one: (node) => {
    return node;
  },
  oneOrMore: (node) => {
    return {
      priority: EncoderPriority.Sequence,
      pattern: `${toAtom(node)}+`,
    };
  },
  optionally: (node) => {
    return {
      priority: EncoderPriority.Sequence,
      pattern: `${toAtom(node)}?`,
    };
  },
  zeroOrMore: (node) => {
    return {
      priority: EncoderPriority.Sequence,
      pattern: `${toAtom(node)}*`,
    };
  },
} as const satisfies Record<string, (node: EncoderNode) => EncoderNode>;

export function isBaseQuantifier(
  element: Exclude<RegexElement, string>
): element is Quantifier {
  return element.type in baseQuantifiers;
}
