import type { RegexElement, Repeat, RepeatConfig } from '../types';
import { EncoderPriority, type EncoderNode } from '../types-internal';
import { toAtom } from '../utils';

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

export function encodeRepeat(
  config: RepeatConfig,
  node: EncoderNode
): EncoderNode {
  if ('count' in config) {
    return {
      priority: EncoderPriority.Sequence,
      pattern: `${toAtom(node)}{${config.count}}`,
    };
  }

  return {
    priority: EncoderPriority.Sequence,
    pattern: `${toAtom(node)}{${config.min},${config?.max ?? ''}}`,
  };
}
