import type { One, OneOrMore, Optionally, RegexComponent } from './types';
import type { CompilerMap } from './types-internal';
import { wrapGroup } from './utils';

export function oneOrMore(...children: RegexComponent[]): OneOrMore {
  return {
    type: 'oneOrMore',
    children,
  };
}

export function optionally(...children: RegexComponent[]): Optionally {
  return {
    type: 'optionally',
    children,
  };
}

export function one(...children: RegexComponent[]): One {
  return {
    type: 'one',
    children,
  };
}

export const compilers = {
  oneOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}+`,
  optionally: (compiledChildren) => `${wrapGroup(compiledChildren)}?`,
  one: (compiledChildren) => compiledChildren,
} satisfies CompilerMap;
