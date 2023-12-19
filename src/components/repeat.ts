import { encodeSequence } from '../encoder/encoder';
import { EncoderPrecedence, type EncoderResult } from '../encoder/types';
import { toAtom } from '../utils';
import type { RegexElement, Repeat, RepeatConfig } from './types';

export function repeat(
  config: RepeatConfig,
  ...children: Array<RegexElement | string>
): Repeat {
  if (children.length === 0) {
    throw new Error('`repeat` should receive at least one element');
  }

  return {
    type: 'repeat',
    children,
    config,
    encode: encodeRepeat,
  };
}

function encodeRepeat(this: Repeat): EncoderResult {
  const children = encodeSequence(this.children);
  if ('count' in this.config) {
    return {
      precedence: EncoderPrecedence.Sequence,
      pattern: `${toAtom(children)}{${this.config.count}}`,
    };
  }

  return {
    precedence: EncoderPrecedence.Sequence,
    pattern: `${toAtom(children)}{${this.config.min},${
      this.config?.max ?? ''
    }}`,
  };
}
