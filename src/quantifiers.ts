import type {
  One,
  OneOrMore,
  Optionally,
  RegexElement,
  ZeroOrMore,
} from './types';
import type { CompilerMap } from './types-internal';
import { wrapGroup } from './utils';

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

export function one(...children: RegexElement[]): One {
  return {
    type: 'one',
    children,
  };
}

export function zeroOrMore(...children: RegexElement[]): ZeroOrMore {
  return {
    type: 'zeroOrMore',
    children,
  };
}

export const compilers = {
  one: (compiledChildren) => compiledChildren,
  oneOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}+`,
  optionally: (compiledChildren: string) => `${wrapGroup(compiledChildren)}?`,
  zeroOrMore: (compiledChildren: string) => `${wrapGroup(compiledChildren)}*`,
} satisfies CompilerMap;
