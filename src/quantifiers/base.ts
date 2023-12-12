import type {
  One,
  OneOrMore,
  Optionally,
  Quantifier,
  RegexElement,
  ZeroOrMore,
} from '../types';
import { asAtom } from '../utils';
import { RegexNodePriority, type RegexNode } from '../types-internal';

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
      priority: RegexNodePriority.Sequence,
      pattern: `${asAtom(node)}+`,
    };
  },
  optionally: (node) => {
    return {
      priority: RegexNodePriority.Sequence,
      pattern: `${asAtom(node)}?`,
    };
  },
  zeroOrMore: (node) => {
    return {
      priority: RegexNodePriority.Sequence,
      pattern: `${asAtom(node)}*`,
    };
  },
} as const satisfies Record<string, (node: RegexNode) => RegexNode>;

export function isBaseQuantifier(
  element: Exclude<RegexElement, string>
): element is Quantifier {
  return element.type in baseQuantifiers;
}
