import type { RegexElement, Repeat, RepeatConfig } from '../types';
import type { RegexNode } from '../types-internal';
import { asAtom } from '../utils';

export function repeat(
  config: RepeatConfig,
  ...children: RegexElement[]
): Repeat {
  return {
    type: 'repeat',
    children,
    config,
  };
}

export function compileRepeat(
  config: RepeatConfig,
  node: RegexNode
): RegexNode {
  if ('count' in config) {
    return {
      type: 'sequence',
      pattern: `${asAtom(node)}{${config.count}}`,
    };
  }

  return {
    type: 'sequence',
    pattern: `${asAtom(node)}{${config.min},${config?.max ?? ''}}`,
  };
}
