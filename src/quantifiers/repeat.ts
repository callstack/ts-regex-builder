import type { RegexElement, Repeat, RepeatConfig } from '../types';
import { RegexNodePriority, type RegexNode } from '../types-internal';
import { asAtom } from '../utils';

export function repeat(
  config: RepeatConfig,
  ...children: RegexElement[]
): Repeat {
  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

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
      priority: RegexNodePriority.Sequence,
      pattern: `${asAtom(node)}{${config.count}}`,
    };
  }

  return {
    priority: RegexNodePriority.Sequence,
    pattern: `${asAtom(node)}{${config.min},${config?.max ?? ''}}`,
  };
}
