import type {
  One,
  OneOrMore,
  Optionally,
  RegexElement,
  Repeat,
  ZeroOrMore,
} from '../types';
import type { CompilerMap } from '../types-internal';
import { wrapGroup } from '../utils';

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

export function repeat(
  config: Repeat['config'],
  ...children: RegexElement[]
): Repeat {
  return {
    type: 'repeat',
    children,
    config,
  };
}

export const compilers = {
  one: (compiledChildren) => compiledChildren,
  oneOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}+`,
  optionally: (compiledChildren) => `${wrapGroup(compiledChildren)}?`,
  zeroOrMore: (compiledChildren) => `${wrapGroup(compiledChildren)}*`,
} satisfies CompilerMap;
