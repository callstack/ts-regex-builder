import type {
  One,
  OneOrMore,
  Optionally,
  Quantifier,
  RegexElement,
  ZeroOrMore,
} from '../types';
import { wrapGroup } from '../utils';

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
  one: (compiledChildren) => compiledChildren,
  oneOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}+`,
  optionally: (compiledChildren) => `${wrapGroup(compiledChildren)}?`,
  zeroOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}*`,
} as const satisfies Record<string, (compiledChildren: string) => string>;

export function isBaseQuantifier(
  element: Exclude<RegexElement, string>
): element is Quantifier {
  return element.type in baseQuantifiers;
}
