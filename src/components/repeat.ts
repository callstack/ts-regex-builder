import { type EncoderNode, EncoderPrecedence } from '../encoder/types';
import { toAtom } from '../encoder/utils';
import { asElementArray } from '../utils/elements';
import type { RegexElement, Repeat, RepeatConfig } from './types';

export function repeat(
  config: RepeatConfig,
  children: RegexElement | RegexElement[]
): Repeat {
  children = asElementArray(children);

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
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(node)}{${config.count}}`,
    };
  }

  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(node)}{${config.min},${config?.max ?? ''}}`,
  };
}
